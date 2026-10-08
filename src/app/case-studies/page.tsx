import Link from "next/link";
import { FaArrowLeft, FaArrowRight } from "react-icons/fa";
import type { Metadata } from "next";
import Navbar from "../(root)/components/layout/navbar/navbar";
import Footer from "../(root)/components/footer";
import CaseStudyCard from "../(root)/components/case-studies/case-study-card";
import { CaseStudyTabs } from "../(root)/components/case-studies/case-study-tabs";
import { getCaseStudies, getProfile } from "@/lib/content";
import BackLink from "@/components/back-link";

export const metadata: Metadata = { title: "Case Studies", description: "Explore digital marketing case studies covering Google Ads, Meta Ads, SEO, social media and YouTube campaigns.", alternates: process.env.NEXT_PUBLIC_SITE_URL ? { canonical: `${process.env.NEXT_PUBLIC_SITE_URL}/case-studies` } : undefined };

export default async function CaseStudiesPage() {
  const [caseStudies, profile] = await Promise.all([getCaseStudies(), getProfile()]);
  const active: "All" = "All";
  const filtered = caseStudies;

  return (
    <main>
      <Navbar profile={profile} />
      <div className="wrapper pt-32 pb-20">
        <BackLink fallbackHref="/#case-studies" className="mb-8 inline-flex items-center gap-2 text-xs font-semibold text-slate-400 transition hover:text-white">
          <FaArrowLeft className="text-[10px]" /> Back to home
        </BackLink>

        <div className="max-w-3xl">
          <span className="eyebrow">Portfolio • Case Studies</span>
          <h1 className="mt-5 text-4xl font-extrabold tracking-[-.04em] text-white sm:text-5xl md:text-6xl">
            Proven work, <span className="gradient-text">built around results.</span>
          </h1>
          <p className="mt-5 max-w-2xl text-sm leading-7 text-slate-400 sm:text-base">
            Explore the strategy, execution, and performance story behind each project. Select a case study to see the full breakdown.
          </p>
        </div>

        <div className="mt-10 flex flex-col gap-5 border-y border-white/[.07] py-5 md:flex-row md:items-center md:justify-between">
          <CaseStudyTabs active={active} />
          <span className="text-[10px] uppercase tracking-[.15em] text-slate-600">{filtered.length} projects</span>
        </div>

        <div className="mt-8 grid gap-5 md:grid-cols-2 lg:grid-cols-3">
          {filtered.map((study) => <CaseStudyCard key={study.id} study={study} />)}
        </div>

        <div className="mt-12 rounded-2xl border border-accent/15 bg-gradient-to-r from-accent/[.07] to-violet-500/[.05] p-6 text-center sm:p-8">
          <p className="text-xs uppercase tracking-[.18em] text-accent">Have a growth goal?</p>
          <h2 className="mt-2 text-xl font-bold text-white">Let’s turn the next project into a case study.</h2>
          <Link href="/#contact" className="gradient-button mt-5">Start a Conversation <FaArrowRight /></Link>
        </div>
      </div>
      <div className="wrapper"><Footer profile={profile} /></div>
    </main>
  );
}
