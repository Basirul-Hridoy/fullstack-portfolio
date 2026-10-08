"use client";

import { useEffect, useState } from "react";
import { createClient } from "@/lib/supabase/browser";
import { AdminHeader } from "@/components/admin/admin-ui";
import { AdminListSkeleton } from "@/components/admin/admin-skeleton";

export default function Messages() {
  const [rows, setRows] = useState<any[]>([]);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const supabase = createClient();
    let active = true;
    const load = async () => {
      const { data, error } = await supabase.from("contact_messages").select("*").order("created_at", { ascending: false });
      if (!active) return;
      if (error) setError(error.message);
      else setRows(data || []);
      setLoading(false);
    };

    void load();
    const channel = supabase.channel("admin-contact-messages").on(
      "postgres_changes",
      { event: "*", schema: "public", table: "contact_messages" },
      () => void load()
    ).subscribe();

    return () => {
      active = false;
      void supabase.removeChannel(channel);
    };
  }, []);

  const setStatus = async (id: string, status: string) => {
    await createClient().from("contact_messages").update({ status }).eq("id", id);
  };

  const remove = async (id: string) => {
    if (!confirm("Delete this message?")) return;
    await createClient().from("contact_messages").delete().eq("id", id);
  };

  return (
    <div>
      <AdminHeader
        eyebrow="Inbox"
        title="Contact Messages"
        description="Messages submitted through your portfolio contact form. New messages appear here automatically when Realtime is enabled."
      />
      <div className="mt-8 space-y-3">
        {error && <p className="text-xs text-red-300">{error}</p>}
        {loading ? (
          <AdminListSkeleton />
        ) : (
          <>
            {rows.map((row) => (
              <article key={row.id} className="rounded-2xl border border-white/10 bg-[#061224]/60 p-5">
                <div className="flex flex-col justify-between gap-4 md:flex-row">
                  <div>
                    <div className="flex flex-wrap items-center gap-2">
                      <h2 className="font-bold">{row.name}</h2>
                      <span className="rounded-full border border-accent/20 px-2 py-1 text-[9px] text-accent">{row.status}</span>
                    </div>
                    <p className="mt-1 text-xs text-slate-500">{row.email} · {row.service}</p>
                    <p className="mt-4 whitespace-pre-wrap text-sm leading-6 text-slate-300">{row.message}</p>
                  </div>
                  <div className="flex shrink-0 gap-2">
                    <button onClick={() => void setStatus(row.id, "read")} className="outline-button">Read</button>
                    <button onClick={() => void setStatus(row.id, "archived")} className="outline-button">Archive</button>
                    <button onClick={() => void remove(row.id)} className="rounded-xl border border-red-400/20 px-3 py-2 text-xs text-red-300">Delete</button>
                  </div>
                </div>
              </article>
            ))}
            {!rows.length && !error && <div className="rounded-2xl border border-white/10 p-8 text-center text-sm text-slate-500">No messages yet.</div>}
          </>
        )}
      </div>
    </div>
  );
}
