"use client";

import { FormEvent, useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { createClient } from "@/lib/supabase/browser";

export default function AdminLoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const [resetLoading, setResetLoading] = useState(false);

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const reason = params.get("error");
    if (reason === "not-admin") {
      setError("This account does not have admin access.");
    } else if (reason === "auth-callback") {
      setError("The authentication link could not be completed. Please request a new one.");
    }
  }, []);

  const submit = async (event: FormEvent) => {
    event.preventDefault();
    setLoading(true);
    setError("");
    setMessage("");

    const { error } = await createClient().auth.signInWithPassword({ email, password });
    setLoading(false);

    if (error) {
      setError(error.message);
      return;
    }

    const { data: isAdmin, error: adminError } = await createClient().rpc("is_admin");
    if (adminError || !isAdmin) {
      await createClient().auth.signOut({ scope: "local" });
      setError("This account is not authorized to access the Admin Panel.");
      return;
    }

    router.push("/admin/dashboard");
    router.refresh();
  };

  const forgotPassword = async () => {
    setError("");
    setMessage("");

    if (!email.trim()) {
      setError("Enter your admin email first, then click Forgot password.");
      return;
    }

    setResetLoading(true);
    const siteUrl = window.location.origin;
    const { error } = await createClient().auth.resetPasswordForEmail(email.trim(), {
      redirectTo: `${siteUrl}/auth/callback?next=/admin/reset-password`,
    });
    setResetLoading(false);

    if (error) {
      setError(error.message);
      return;
    }

    setMessage("If that email belongs to an account, a password reset link has been sent.");
  };

  return (
    <main className="min-h-screen bg-[#020916] px-4 py-20 text-white">
      <div className="mx-auto max-w-md rounded-3xl border border-accent/25 bg-[#061224]/80 p-7 shadow-2xl">
        <div className="eyebrow">Private Area</div>
        <h1 className="mt-4 text-3xl font-extrabold">
          Admin <span className="gradient-text">Login</span>
        </h1>
        <p className="mt-3 text-sm text-slate-400">
          Use an approved Supabase Auth account for this portfolio.
        </p>

        <form onSubmit={submit} className="mt-7 space-y-4">
          <label className="block">
            <span className="field-label">Email</span>
            <input
              className="field"
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </label>

          <label className="block">
            <span className="field-label">Password</span>
            <input
              className="field"
              type="password"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </label>

          <div className="flex justify-end">
            <button
              type="button"
              onClick={forgotPassword}
              disabled={resetLoading}
              className="text-xs font-semibold text-accent hover:underline disabled:opacity-50"
            >
              {resetLoading ? "Sending…" : "Forgot password?"}
            </button>
          </div>

          {error && (
            <p className="rounded-xl border border-red-400/20 bg-red-500/10 p-3 text-xs text-red-300">
              {error}
            </p>
          )}
          {message && (
            <p className="rounded-xl border border-emerald-400/20 bg-emerald-500/10 p-3 text-xs text-emerald-300">
              {message}
            </p>
          )}

          <button disabled={loading} className="gradient-button w-full justify-center">
            {loading ? "Signing in…" : "Sign in"}
          </button>
        </form>
      </div>
    </main>
  );
}
