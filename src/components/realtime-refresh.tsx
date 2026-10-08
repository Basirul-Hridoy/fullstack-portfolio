"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { createClient } from "@/lib/supabase/browser";

const TABLES = [
  "profiles",
  "site_settings",
  "services",
  "certificates",
  "case_studies",
  "reviews",
  "video_reviews",
  "process_steps",
] as const;

export default function RealtimeRefresh() {
  const router = useRouter();

  useEffect(() => {
    const supabase = createClient();
    let refreshTimer: ReturnType<typeof setTimeout> | undefined;

    const refresh = () => {
      if (refreshTimer) clearTimeout(refreshTimer);
      refreshTimer = setTimeout(() => router.refresh(), 120);
    };

    const channels = TABLES.map((table) =>
      supabase
        .channel(`public-content-${table}`)
        .on(
          "postgres_changes",
          { event: "*", schema: "public", table },
          refresh
        )
        .subscribe()
    );

    return () => {
      if (refreshTimer) clearTimeout(refreshTimer);
      channels.forEach((channel) => supabase.removeChannel(channel));
    };
  }, [router]);

  return null;
}
