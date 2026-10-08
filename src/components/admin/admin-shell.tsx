"use client";

import { createClient } from "@/lib/supabase/browser";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { ReactNode, useState } from "react";
import {
  FaBars,
  FaChartPie,
  FaCog,
  FaEnvelope,
  FaFileAlt,
  FaFolderOpen,
  FaImages,
  FaList,
  FaQuoteRight,
  FaSignOutAlt,
  FaTimes,
  FaUser,
  FaVideo,
} from "react-icons/fa";

const links = [
  ["/admin/dashboard", "Dashboard", FaChartPie],
  ["/admin/profile", "Profile", FaUser],
  ["/admin/services", "Services", FaList],
  ["/admin/certificates", "Certificates", FaImages],
  ["/admin/case-studies", "Case Studies", FaFolderOpen],
  ["/admin/reviews", "Reviews", FaQuoteRight],
  ["/admin/video-reviews", "Video Reviews", FaVideo],
  ["/admin/process", "Process", FaFileAlt],
  ["/admin/messages", "Messages", FaEnvelope],
  ["/admin/settings", "Settings", FaCog],
] as const;

export default function AdminShell({ children }: { children: ReactNode }) {
  const pathname = usePathname();
  const router = useRouter();
  const [open, setOpen] = useState(false);

  const logout = async () => {
    await createClient().auth.signOut();
    router.push("/admin/login");
    router.refresh();
  };

  return (
    <div className="min-h-screen bg-[#020916] text-white md:flex">
      {!open && (
        <button
          aria-label="Open admin menu"
          className="fixed right-4 top-4 z-[130] rounded-xl border border-white/10 bg-[#061224]/90 p-3 md:hidden"
          onClick={() => setOpen(true)}
        >
          <FaBars />
        </button>
      )}

      {open && (
        <button
          type="button"
          aria-label="Close admin menu"
          className="fixed inset-0 z-[110] bg-black/45 backdrop-blur-[2px] md:hidden"
          onClick={() => setOpen(false)}
        />
      )}

      <aside
        className={`fixed inset-y-0 left-0 z-[120] w-72 border-r border-white/10 bg-[#030d1d] p-5 transition-transform md:static md:translate-x-0 ${open ? "translate-x-0" : "-translate-x-full"}`}
      >
        <button
          type="button"
          aria-label="Close admin menu"
          className="absolute right-4 top-4 rounded-lg border border-white/10 p-2 text-slate-300 hover:text-white md:hidden"
          onClick={() => setOpen(false)}
        >
          <FaTimes />
        </button>

        <Link
          href="/admin/dashboard"
          onClick={() => setOpen(false)}
          className="block border-b border-white/10 pb-5 pr-10"
        >
          <div className="text-lg font-extrabold">
            Ridoy <span className="gradient-text">Admin</span>
          </div>
          <p className="mt-1 text-[10px] text-slate-500">
            Portfolio management panel
          </p>
        </Link>

        <nav className="mt-5 space-y-1">
          {links.map(([href, label, Icon]) => (
            <Link
              key={href}
              href={href}
              onClick={() => setOpen(false)}
              className={`flex items-center gap-3 rounded-xl px-3 py-2.5 text-xs font-semibold transition ${pathname === href ? "bg-accent/15 text-white border border-accent/20" : "text-slate-400 hover:bg-white/[.03] hover:text-white"}`}
            >
              <Icon />
              {label}
            </Link>
          ))}
        </nav>

        <button
          onClick={logout}
          className="mt-6 flex w-full items-center gap-3 rounded-xl border border-red-400/15 px-3 py-2.5 text-xs font-semibold text-red-300 hover:bg-red-500/10"
        >
          <FaSignOutAlt /> Sign out
        </button>
        <Link
          href="/"
          onClick={() => setOpen(false)}
          className="mt-2 block rounded-xl px-3 py-2.5 text-center text-xs text-slate-500 hover:text-white"
        >
          View Website
        </Link>
      </aside>

      <main className="min-w-0 flex-1 px-4 py-6 md:px-8 md:py-8">
        <div className="mx-auto max-w-7xl">{children}</div>
      </main>
    </div>
  );
}
