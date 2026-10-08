import { NextResponse, type NextRequest } from "next/server";
import { createClient } from "@/lib/supabase/server";

const allowedNextPaths = new Set([
  "/admin/reset-password",
  "/admin/setup-password",
]);

export async function GET(request: NextRequest) {
  const requestUrl = new URL(request.url);
  const code = requestUrl.searchParams.get("code");
  const requestedNext = requestUrl.searchParams.get("next") || "/admin/login";
  const next = allowedNextPaths.has(requestedNext)
    ? requestedNext
    : "/admin/login";

  if (code) {
    const supabase = await createClient();
    const { error } = await supabase.auth.exchangeCodeForSession(code);

    if (!error) {
      return NextResponse.redirect(new URL(next, requestUrl.origin));
    }
  }

  return NextResponse.redirect(
    new URL("/admin/login?error=auth-callback", requestUrl.origin),
  );
}
