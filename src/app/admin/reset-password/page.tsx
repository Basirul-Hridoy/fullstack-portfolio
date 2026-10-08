"use client";

import { FormEvent, useState } from "react";
import { useRouter } from "next/navigation";
import { createClient } from "@/lib/supabase/browser";

export default function ResetPasswordPage() {
  const router = useRouter();
  const [password, setPassword] = useState("");
  const [confirm, setConfirm] = useState("");
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const submit = async (event: FormEvent) => {
    event.preventDefault();
    setError("");
    setMessage("");

    if (password.length < 8) {
      setError("Password must be at least 8 characters.");
      return;
    }
    if (password !== confirm) {
      setError("Passwords do not match.");
      return;
    }

    setLoading(true);
    const { error } = await createClient().auth.updateUser({ password });
    setLoading(false);

    if (error) {
      setError(error.message);
      return;
    }

    setMessage("Password updated successfully. Redirecting to login…");
    await createClient().auth.signOut({ scope: "global" });
    setTimeout(() => router.replace("/admin/login"), 700);
  };

  return (
    <main className="min-h-screen bg-[#020916] px-4 py-20 text-white">
      <div className="mx-auto max-w-md rounded-3xl border border-accent/25 bg-[#061224]/80 p-7 shadow-2xl">
        <div className="eyebrow">Account Recovery</div>
        <h1 className="mt-4 text-3xl font-extrabold">
          Set a new <span className="gradient-text">password</span>
        </h1>
        <p className="mt-3 text-sm text-slate-400">
          Choose a new password for your Admin account.
        </p>

        <form onSubmit={submit} className="mt-7 space-y-4">
          <label className="block">
            <span className="field-label">New password</span>
            <input
              className="field"
              type="password"
              minLength={8}
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </label>

          <label className="block">
            <span className="field-label">Confirm new password</span>
            <input
              className="field"
              type="password"
              minLength={8}
              required
              value={confirm}
              onChange={(e) => setConfirm(e.target.value)}
            />
          </label>

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
            {loading ? "Updating…" : "Update password"}
          </button>
        </form>
      </div>
    </main>
  );
}
