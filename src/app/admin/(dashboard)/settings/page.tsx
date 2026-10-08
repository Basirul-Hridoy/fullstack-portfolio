"use client";

import { FormEvent, useEffect, useState } from "react";
import { FaEnvelope, FaLock, FaSignOutAlt, FaUserShield, FaTrash } from "react-icons/fa";
import { useRouter } from "next/navigation";
import { createClient } from "@/lib/supabase/browser";
import {
  addAdminUser,
  listAdminUsers,
  removeAdminUser,
  syncAdminEmail,
} from "@/app/admin/actions";
import { AdminHeader, Field, Input, SaveButton } from "@/components/admin/admin-ui";
import { AdminPageSkeleton } from "@/components/admin/admin-skeleton";

type AdminUser = {
  user_id: string;
  email: string;
  created_at: string;
};

export default function Settings() {
  const router = useRouter();
  const [f, setF] = useState<any>({});
  const [loading, setLoading] = useState(false);
  const [msg, setMsg] = useState("");
  const [loadingData, setLoadingData] = useState(true);

  const [userEmail, setUserEmail] = useState("");
  const [newEmail, setNewEmail] = useState("");
  const [emailLoading, setEmailLoading] = useState(false);
  const [emailMessage, setEmailMessage] = useState("");
  const [emailError, setEmailError] = useState("");

  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [passwordLoading, setPasswordLoading] = useState(false);
  const [passwordMessage, setPasswordMessage] = useState("");
  const [passwordError, setPasswordError] = useState("");

  const [admins, setAdmins] = useState<AdminUser[]>([]);
  const [adminEmail, setAdminEmail] = useState("");
  const [adminLoading, setAdminLoading] = useState(false);
  const [adminMessage, setAdminMessage] = useState("");
  const [adminError, setAdminError] = useState("");

  useEffect(() => {
    (async () => {
      const supabase = createClient();
      const [{ data }, { data: userData }] = await Promise.all([
        supabase.from("site_settings").select("*").eq("singleton", true).maybeSingle(),
        supabase.auth.getUser(),
      ]);

      if (data) setF(data);
      if (userData.user?.email) {
        setUserEmail(userData.user.email);
        setNewEmail(userData.user.email);
        try {
          await syncAdminEmail(userData.user.email);
        } catch {
          // Keep the page usable even if the optional membership sync is unavailable.
        }
      }

      try {
        setAdmins(await listAdminUsers());
      } catch {
        // The page still works if the optional admin-management setup is not configured.
      }

      setLoadingData(false);
    })();
  }, []);

  const save = async (e: FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setMsg("");

    const { error } = await createClient()
      .from("site_settings")
      .upsert({ ...f, singleton: true }, { onConflict: "singleton" });

    setLoading(false);
    setMsg(error ? error.message : "Settings saved.");
  };

  const changeEmail = async (e: FormEvent) => {
    e.preventDefault();
    setEmailError("");
    setEmailMessage("");

    const email = newEmail.trim().toLowerCase();
    if (!email || email === userEmail.toLowerCase()) {
      setEmailError("Enter a different email address.");
      return;
    }

    setEmailLoading(true);
    const { error } = await createClient().auth.updateUser(
      { email },
      { emailRedirectTo: `${window.location.origin}/admin/settings` },
    );
    setEmailLoading(false);

    if (error) {
      setEmailError(error.message);
      return;
    }

    setEmailMessage(
      "Confirmation email sent. Confirm the new address to finish the change. After confirmation, sign in again with the new email.",
    );
  };

  const changePassword = async (e: FormEvent) => {
    e.preventDefault();
    setPasswordError("");
    setPasswordMessage("");

    if (newPassword.length < 8) {
      setPasswordError("New password must be at least 8 characters.");
      return;
    }
    if (newPassword !== confirmPassword) {
      setPasswordError("New passwords do not match.");
      return;
    }

    setPasswordLoading(true);
    const supabase = createClient();

    // Re-authenticate before changing the password.
    const { error: signInError } = await supabase.auth.signInWithPassword({
      email: userEmail,
      password: currentPassword,
    });

    if (signInError) {
      setPasswordLoading(false);
      setPasswordError("Current password is incorrect.");
      return;
    }

    const { error } = await supabase.auth.updateUser({ password: newPassword });
    if (error) {
      setPasswordLoading(false);
      setPasswordError(error.message);
      return;
    }

    await supabase.auth.signOut({ scope: "global" });
    setPasswordLoading(false);
    setPasswordMessage("Password changed. Redirecting to login…");
    setTimeout(() => router.replace("/admin/login"), 700);
  };

  const signOutAll = async () => {
    setPasswordError("");
    const { error } = await createClient().auth.signOut({ scope: "global" });

    if (error) {
      setPasswordError(error.message);
      return;
    }

    router.replace("/admin/login");
    router.refresh();
  };

  const addAdmin = async (e: FormEvent) => {
    e.preventDefault();
    setAdminLoading(true);
    setAdminMessage("");
    setAdminError("");

    try {
      const result = await addAdminUser(adminEmail);
      setAdminMessage(result);
      setAdminEmail("");
      setAdmins(await listAdminUsers());
    } catch (error) {
      setAdminError(error instanceof Error ? error.message : "Could not add admin.");
    } finally {
      setAdminLoading(false);
    }
  };

  const removeAdmin = async (id: string) => {
    setAdminLoading(true);
    setAdminMessage("");
    setAdminError("");

    try {
      const result = await removeAdminUser(id);
      setAdminMessage(result);
      setAdmins(await listAdminUsers());
    } catch (error) {
      setAdminError(error instanceof Error ? error.message : "Could not remove admin.");
    } finally {
      setAdminLoading(false);
    }
  };

  if (loadingData) return <AdminPageSkeleton cards={2} />;

  return (
    <div>
      <AdminHeader
        eyebrow="Site Settings"
        title="SEO & Global Settings"
        description="Manage the metadata and small global labels that are safe to change without touching layout code."
      />

      <div className="mt-8 grid gap-6 xl:grid-cols-2">
        <section className="rounded-2xl border border-accent/20 bg-[#061224]/60 p-5">
          <div className="flex items-center gap-3">
            <FaEnvelope className="text-accent" />
            <div>
              <h2 className="font-bold">Change Email</h2>
              <p className="mt-1 text-xs text-slate-500">
                Current: {userEmail || "Loading…"}
              </p>
            </div>
          </div>

          <form onSubmit={changeEmail} className="mt-5 space-y-4">
            <Field label="New email">
              <Input
                type="email"
                required
                value={newEmail}
                onChange={(e: any) => setNewEmail(e.target.value)}
              />
            </Field>
            {emailError && (
              <p className="text-xs text-red-300">{emailError}</p>
            )}
            {emailMessage && (
              <p className="text-xs text-emerald-300">{emailMessage}</p>
            )}
            <button disabled={emailLoading} className="gradient-button">
              {emailLoading ? "Sending…" : "Change Email"}
            </button>
          </form>
        </section>

        <section className="rounded-2xl border border-accent/20 bg-[#061224]/60 p-5">
          <div className="flex items-center gap-3">
            <FaLock className="text-accent" />
            <div>
              <h2 className="font-bold">Change Password</h2>
              <p className="mt-1 text-xs text-slate-500">
                You will be signed out of all devices after changing it.
              </p>
            </div>
          </div>

          <form onSubmit={changePassword} className="mt-5 space-y-4">
            <Field label="Current password">
              <Input
                type="password"
                required
                value={currentPassword}
                onChange={(e: any) => setCurrentPassword(e.target.value)}
              />
            </Field>
            <Field label="New password">
              <Input
                type="password"
                minLength={8}
                required
                value={newPassword}
                onChange={(e: any) => setNewPassword(e.target.value)}
              />
            </Field>
            <Field label="Confirm new password">
              <Input
                type="password"
                minLength={8}
                required
                value={confirmPassword}
                onChange={(e: any) => setConfirmPassword(e.target.value)}
              />
            </Field>

            {passwordError && (
              <p className="text-xs text-red-300">{passwordError}</p>
            )}
            {passwordMessage && (
              <p className="text-xs text-emerald-300">{passwordMessage}</p>
            )}

            <button disabled={passwordLoading} className="gradient-button">
              {passwordLoading ? "Updating…" : "Change Password"}
            </button>
          </form>
        </section>

        <section className="rounded-2xl border border-red-400/15 bg-[#061224]/60 p-5 xl:col-span-2">
          <div className="flex items-center gap-3">
            <FaSignOutAlt className="text-red-300" />
            <div>
              <h2 className="font-bold">Sign Out All Sessions</h2>
              <p className="mt-1 text-xs text-slate-500">
                Sign out this account from every device and browser.
              </p>
            </div>
          </div>
          <button
            type="button"
            onClick={signOutAll}
            className="mt-5 rounded-xl border border-red-400/20 px-4 py-2.5 text-xs font-semibold text-red-300 hover:bg-red-500/10"
          >
            Sign Out All Sessions
          </button>
        </section>

        <section className="rounded-2xl border border-accent/20 bg-[#061224]/60 p-5 xl:col-span-2">
          <div className="flex items-center gap-3">
            <FaUserShield className="text-accent" />
            <div>
              <h2 className="font-bold">Admin Access</h2>
              <p className="mt-1 text-xs text-slate-500">
                Add another Supabase user as an administrator. Existing users are granted access immediately; new emails receive an invitation.
              </p>
            </div>
          </div>

          <form onSubmit={addAdmin} className="mt-5 flex flex-col gap-3 sm:flex-row">
            <Input
              type="email"
              required
              placeholder="admin@example.com"
              value={adminEmail}
              onChange={(e: any) => setAdminEmail(e.target.value)}
              className="flex-1"
            />
            <button disabled={adminLoading} className="gradient-button whitespace-nowrap">
              {adminLoading ? "Adding…" : "Add Admin"}
            </button>
          </form>

          {adminError && <p className="mt-3 text-xs text-red-300">{adminError}</p>}
          {adminMessage && (
            <p className="mt-3 text-xs text-emerald-300">{adminMessage}</p>
          )}

          <div className="mt-6 overflow-hidden rounded-xl border border-white/10">
            {admins.map((admin) => (
              <div
                key={admin.user_id}
                className="flex flex-col gap-3 border-b border-white/10 p-4 last:border-b-0 sm:flex-row sm:items-center sm:justify-between"
              >
                <div>
                  <p className="text-sm font-semibold text-white">{admin.email}</p>
                  <p className="mt-1 text-[10px] text-slate-500">
                    Added {new Date(admin.created_at).toLocaleString()}
                  </p>
                </div>
                {admin.email.toLowerCase() !== userEmail.toLowerCase() && (
                  <button
                    type="button"
                    onClick={() => removeAdmin(admin.user_id)}
                    disabled={adminLoading}
                    className="inline-flex items-center gap-2 self-start rounded-xl border border-red-400/20 px-3 py-2 text-xs font-semibold text-red-300 hover:bg-red-500/10"
                  >
                    <FaTrash /> Remove Access
                  </button>
                )}
              </div>
            ))}
          </div>
        </section>
      </div>

      <form
        onSubmit={save}
        className="mt-8 max-w-3xl rounded-2xl border border-accent/20 bg-[#061224]/60 p-5 space-y-4"
      >
        <Field label="Site title">
          <Input
            value={f.site_title || ""}
            onChange={(e: any) => setF({ ...f, site_title: e.target.value })}
          />
        </Field>
        <Field label="Meta description">
          <Input
            value={f.site_description || ""}
            onChange={(e: any) => setF({ ...f, site_description: e.target.value })}
          />
        </Field>
        <Field label="Hero badge">
          <Input
            value={f.hero_badge || ""}
            onChange={(e: any) => setF({ ...f, hero_badge: e.target.value })}
          />
        </Field>
        <Field label="Hero primary CTA">
          <Input
            value={f.hero_cta || ""}
            onChange={(e: any) => setF({ ...f, hero_cta: e.target.value })}
          />
        </Field>
        <Field label="Hero secondary CTA">
          <Input
            value={f.hero_secondary_cta || ""}
            onChange={(e: any) => setF({ ...f, hero_secondary_cta: e.target.value })}
          />
        </Field>
        <Field label="Trust strip label">
          <Input
            value={f.trust_label || ""}
            onChange={(e: any) => setF({ ...f, trust_label: e.target.value })}
          />
        </Field>
        <Field label="Footer tagline">
          <Input
            value={f.footer_tagline || ""}
            onChange={(e: any) => setF({ ...f, footer_tagline: e.target.value })}
          />
        </Field>
        <div className="flex items-center gap-3">
          <SaveButton loading={loading} />
          {msg && <span className="text-xs text-emerald-300">{msg}</span>}
        </div>
      </form>
    </div>
  );
}
