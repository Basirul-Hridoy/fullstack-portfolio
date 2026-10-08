"use server";

import { revalidatePath } from "next/cache";
import { createClient } from "@/lib/supabase/server";
import { createAdminClient } from "@/lib/supabase/admin";

async function requireAdmin() {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) throw new Error("Unauthorized");

  const { data, error } = await supabase.rpc("is_admin");
  if (error || !data) throw new Error("Admin access required");

  return user;
}

export async function refreshPublicContent() {
  await requireAdmin();
  revalidatePath("/", "layout");
}

export async function listAdminUsers() {
  await requireAdmin();

  const admin = createAdminClient();
  const { data, error } = await admin
    .from("admin_users")
    .select("user_id,email,created_at")
    .order("created_at", { ascending: true });

  if (error) throw new Error(error.message);
  return data ?? [];
}

export async function addAdminUser(emailInput: string) {
  const currentUser = await requireAdmin();
  const email = emailInput.trim().toLowerCase();

  if (!email || !/^\S+@\S+\.\S+$/.test(email)) {
    throw new Error("Enter a valid email address.");
  }

  if (email === currentUser.email?.toLowerCase()) {
    throw new Error("This account is already an admin.");
  }

  const admin = createAdminClient();

  const { data: existingAdmins, error: existingAdminError } = await admin
    .from("admin_users")
    .select("user_id,email")
    .ilike("email", email)
    .limit(1);

  if (existingAdminError) throw new Error(existingAdminError.message);
  if (existingAdmins?.length) {
    throw new Error("That email already has admin access.");
  }

  // If the email already has a Supabase Auth account, grant admin access
  // immediately. Otherwise invite the person to create their account.
  const { data: usersData, error: usersError } = await admin.auth.admin.listUsers({
    page: 1,
    perPage: 1000,
  });

  if (usersError) throw new Error(usersError.message);

  const existingUser = usersData.users.find(
    (u) => u.email?.toLowerCase() === email,
  );

  let userId = existingUser?.id;

  if (!userId) {
    const siteUrl =
      process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000";
    const redirectTo = `${siteUrl.replace(/\/$/, "")}/auth/callback?next=/admin/setup-password`;

    const { data, error } = await admin.auth.admin.inviteUserByEmail(email, {
      redirectTo,
    });

    if (error || !data.user) {
      throw new Error(error?.message || "Could not send the admin invitation.");
    }

    userId = data.user.id;
  }

  const { error: insertError } = await admin.from("admin_users").insert({
    user_id: userId,
    email,
  });

  if (insertError) {
    // If the Auth user was invited successfully but the membership insert
    // failed, do not hide the database error.
    throw new Error(insertError.message);
  }

  revalidatePath("/admin/settings");
  return existingUser
    ? "Admin access granted to the existing Supabase user."
    : "Invitation sent. The user can accept it and set a password.";
}

export async function removeAdminUser(userId: string) {
  const currentUser = await requireAdmin();

  if (userId === currentUser.id) {
    throw new Error("You cannot remove your own admin access.");
  }

  const admin = createAdminClient();

  const { error } = await admin
    .from("admin_users")
    .delete()
    .eq("user_id", userId);

  if (error) throw new Error(error.message);

  revalidatePath("/admin/settings");
  return "Admin access removed.";
}


export async function syncAdminEmail(email: string) {
  const user = await requireAdmin();
  const nextEmail = email.trim().toLowerCase();

  const admin = createAdminClient();
  const { error } = await admin
    .from("admin_users")
    .update({ email: nextEmail })
    .eq("user_id", user.id);

  if (error) throw new Error(error.message);

  revalidatePath("/admin/settings");
  return "Admin email synchronized.";
}
