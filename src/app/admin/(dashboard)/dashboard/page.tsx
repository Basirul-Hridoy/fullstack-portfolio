"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { createClient } from "@/lib/supabase/browser";
import { AdminHeader } from "@/components/admin/admin-ui";
import { AdminPageSkeleton } from "@/components/admin/admin-skeleton";

const cards = [
  ["services", "Services", "Manage your offer"],
  ["certificates", "Certificates", "Manage credentials"],
  ["case_studies", "Case Studies", "Manage results"],
  ["reviews", "Reviews", "Manage testimonials"],
  ["video_reviews", "Video Reviews", "Manage video proof"],
  ["process_steps", "Process", "Manage workflow"],
  ["contact_messages", "Messages", "Read inquiries"],
] as const;

export default function Dashboard() {
  const [counts, setCounts] = useState<Record<string, number>>({});
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const supabase = createClient();
    let active = true;

    const load = async () => {
      const out: Record<string, number> = {};
      for (const [table] of cards) {
        const { count } = await supabase.from(table).select("id", { count: "exact", head: true });
        out[table] = count || 0;
      }
      if (active) {
        setCounts(out);
        setLoading(false);
      }
    };

    void load();
    const channels = cards.map(([table]) =>
      supabase.channel(`dashboard-${table}`).on(
        "postgres_changes",
        { event: "*", schema: "public", table },
        () => void load()
      ).subscribe()
    );

    return () => {
      active = false;
      channels.forEach((channel) => void supabase.removeChannel(channel));
    };
  }, []);

  if (loading) return <AdminPageSkeleton cards={3} />;

  return (
    <div>
      <AdminHeader
        eyebrow="Control Center"
        title="Portfolio Dashboard"
        description="Manage the content that powers your public portfolio without editing the frontend data files."
      />
      <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {cards.map(([table, label, desc]) => (
          <Link
            key={table}
            href={`/admin/${table.replace("_", "-")}`}
            className="rounded-2xl border border-accent/20 bg-[#061224]/60 p-5 transition hover:-translate-y-1 hover:border-accent/60"
          >
            <div className="flex items-center justify-between">
              <h2 className="font-bold text-white">{label}</h2>
              <span className="text-2xl font-extrabold text-cyan-300">{counts[table] ?? 0}</span>
            </div>
            <p className="mt-2 text-xs text-slate-500">{desc}</p>
          </Link>
        ))}
      </div>
      <div className="mt-8 rounded-2xl border border-accent/15 bg-[#061224]/40 p-5">
        <h2 className="font-bold">Recommended workflow</h2>
        <p className="mt-2 text-xs leading-6 text-slate-500">
          Update content here, upload media into Supabase Storage, publish when ready. Public pages subscribe to content changes and refresh automatically when Supabase Realtime is enabled.
        </p>
      </div>
    </div>
  );
}
