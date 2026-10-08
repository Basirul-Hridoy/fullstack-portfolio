import Link from "next/link";
import type { Metadata } from "next";
import { FaArrowLeft, FaDownload, FaExternalLinkAlt } from "react-icons/fa";
import { getProfile } from "@/lib/content";

export const metadata: Metadata = { title: "Resume", description: "View and download Ridoy Ahmed’s digital marketing resume.", alternates: process.env.NEXT_PUBLIC_SITE_URL ? { canonical: `${process.env.NEXT_PUBLIC_SITE_URL}/resume` } : undefined };

export default async function ResumePage() {
  const profile = await getProfile();
  const resumeUrl = profile.resume_url;
  return (
    <main className="min-h-screen pt-32 pb-20">
      <div className="wrapper">
        <div className="flex flex-col gap-5 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <Link href="/#about" className="inline-flex items-center gap-2 text-xs font-semibold text-slate-400 transition hover:text-white"><FaArrowLeft className="text-[10px]" /> Back to About</Link>
            <h1 className="mt-5 text-4xl font-extrabold tracking-[-.04em] text-white sm:text-5xl">My <span className="gradient-text">Resume</span></h1>
            <p className="mt-3 text-sm text-slate-400">{profile.name} · {profile.designation}</p>
          </div>
          <div className="flex flex-wrap gap-3">
            <a href={resumeUrl} download className="gradient-button"><FaDownload /> Download PDF</a>
            <a href={resumeUrl} target="_blank" rel="noreferrer" className="outline-button"><FaExternalLinkAlt /> Open PDF</a>
          </div>
        </div>

        <div className="mt-10 overflow-hidden rounded-3xl border border-white/10 bg-[#061224]/70 p-2 shadow-[0_30px_100px_rgba(0,0,0,.35)]">
          <iframe title="Ridoy Ahmed Resume" src={`${resumeUrl}#view=FitH`} className="h-[78vh] min-h-[620px] w-full rounded-2xl bg-white" />
        </div>
      </div>
    </main>
  );
}
