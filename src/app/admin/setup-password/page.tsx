"use client";

import { FormEvent, useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { createClient } from "@/lib/supabase/browser";

export default function SetupPasswordPage() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirm, setConfirm] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    (async () => {
      const { data: { user } } = await createClient().auth.getUser();
      if (!user) {
        setError("This invitation link is missing or has expired.");
        setLoading(false);
        return;
      }
      setEmail(user.email || "");
      setLoading(false);
    })();
  }, []);

  const submit = async (event: FormEvent) => {
    event.preventDefault();
    setError("");

    if (password.length < 8) {
      setError("Password must be at least 8 characters.");
      return;
    }
    if (password !== confirm) {
      setError("Passwords do not match.");
      return;
    }

    setSaving(true);
    const { error } = await createClient().auth.updateUser({ password });
    setSaving(false);

    if (error) {
      setError(error.message);
      return;
    }

    router.replace("/admin/dashboard");
    router.refresh();
  };

  if (loading) {
    return (
      <main className="min-h-screen bg-[#020916] px-4 py-20 text-white">
        <div className="mx-auto max-w-md rounded-3xl border border-white/10 bg-[#061224]/80 p-7">
          <p className="text-sm text-slate-400">Checking invitation…</p>
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-[#020916] px-4 py-20 text-white">
      <div className="mx-auto max-w-md rounded-3xl border border-accent/25 bg-[#061224]/80 p-7 shadow-2xl">
        <div className="eyebrow">Admin Invitation</div>
        <h1 className="mt-4 text-3xl font-extrabold">
          Set your <span className="gradient-text">password</span>
        </h1>
        <p className="mt-3 text-sm text-slate-400">
          Finish setting up <span className="text-white">{email}</span>.
        </p>

        <form onSubmit={submit} className="mt-7 space-y-4">
          <label className="block">
            <span className="field-label">Password</span>
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
            <span className="field-label">Confirm password</span>
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

          <button disabled={saving} className="gradient-button w-full justify-center">
            {saving ? "Saving…" : "Finish setup"}
          </button>
        </form>
      </div>
    </main>
  );
}
