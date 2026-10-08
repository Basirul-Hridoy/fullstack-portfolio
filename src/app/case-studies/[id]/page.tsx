import Link from "next/link";
import Image from "next/image";
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import {
  FaArrowLeft, FaArrowRight, FaCheck, FaGoogle,
  FaFacebookF, FaInstagram, FaSearch, FaYoutube
} from "react-icons/fa";
import { CaseStudyCategory } from "@/constant/case-studies";
import { getCaseStudies, getProfile } from "@/lib/content";
import Navbar from "../../(root)/components/layout/navbar/navbar";
import Footer from "../../(root)/components/footer";
import CaseStudyCard from "../../(root)/components/case-studies/case-study-card";
import { CaseStudyTabs } from "../../(root)/components/case-studies/case-study-tabs";
import BackLink from "@/components/back-link";

const iconMap: Record<string, any> = {
  google: FaGoogle,
  meta: FaFacebookF,
  seo: FaSearch,
  social: FaInstagram,
  youtube: FaYoutube,
};

const gradientMap: Record<string, string> = {
  google: "from-blue-500/30 via-cyan-500/10 to-transparent",
  meta: "from-violet-500/30 via-blue-500/10 to-transparent",
  seo: "from-emerald-500/25 via-blue-500/10 to-transparent",
  social: "from-pink-500/25 via-violet-500/10 to-transparent",
  youtube: "from-red-500/25 via-blue-500/10 to-transparent",
};

const categoryBySlug: Record<string, CaseStudyCategory> = {
  "google-ads": "Google Ads",
  "meta-ads": "Meta Ads",
  seo: "SEO",
  "social-media": "Social Media",
  youtube: "YouTube",
};


export async function generateStaticParams() {
  const caseStudies = await getCaseStudies();
  return [
    ...caseStudies.map((study) => ({ id: String(study.id) })),
    ...Object.keys(categoryBySlug).map((id) => ({ id })),
  ];
}

export async function generateMetadata({ params }: { params: Promise<{ id: string }> }): Promise<Metadata> {
  const { id } = await params;
  const category = categoryBySlug[id];
  const caseStudies = await getCaseStudies();
  const study = caseStudies.find((item) => String(item.id) === id || String((item as any).slug) === id);

  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL;
  const canonical = siteUrl ? `${siteUrl}/case-studies/${id}` : undefined;

  if (category) {
    return {
      title: `${category} Case Studies`,
      description: `Explore ${category.toLowerCase()} case studies, strategy, execution and measurable results.`,
      alternates: canonical ? { canonical } : undefined,
    };
  }

  if (!study) return { title: "Case Study" };
  return {
    title: study.title,
    description: study.description,
    alternates: canonical ? { canonical } : undefined,
  };
}

export default async function CaseStudyRoute({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const [caseStudies, profile] = await Promise.all([getCaseStudies(), getProfile()]);
  const category = categoryBySlug[id];

  // Category routes keep the filters shareable and give every service a meaningful URL.
  if (category) {
    const filtered = caseStudies.filter((study) => study.category === category);
    return (
      <main>
        <Navbar profile={profile} />
        <div className="wrapper pt-32 pb-20">
          <BackLink fallbackHref="/case-studies" className="mb-8 inline-flex items-center gap-2 text-xs font-semibold text-slate-400 transition hover:text-white">
            <FaArrowLeft className="text-[10px]" /> All Case Studies
          </BackLink>
          <div className="max-w-3xl">
            <span className="eyebrow">Portfolio • {category}</span>
            <h1 className="mt-5 text-4xl font-extrabold tracking-[-.04em] text-white sm:text-5xl md:text-6xl">
              {category} <span className="gradient-text">Case Studies</span>
            </h1>
            <p className="mt-5 max-w-2xl text-sm leading-7 text-slate-400 sm:text-base">
              Explore projects, strategy, execution, and measurable results from my {category.toLowerCase()} work.
            </p>
          </div>
          <div className="mt-10 flex items-center justify-between border-y border-white/[.07] py-5">
            <CaseStudyTabs active={category} />
            <span className="text-[10px] uppercase tracking-[.15em] text-slate-600">{filtered.length} projects</span>
          </div>
          <div className="mt-8 grid gap-5 md:grid-cols-2 lg:grid-cols-3">
            {filtered.map((study) => <CaseStudyCard key={study.id} study={study} />)}
          </div>
        </div>
        <div className="wrapper"><Footer profile={profile} /></div>
      </main>
    );
  }

  const study = caseStudies.find((item) => String(item.id) === id || String((item as any).slug) === id);
  if (!study) notFound();

  const Icon = iconMap[study.visual];
  const gradient = gradientMap[study.visual];
  const index = caseStudies.findIndex((item) => item.id === study.id);
  const nextStudy = caseStudies[(index + 1) % caseStudies.length];

  return (
    <main>
      <Navbar profile={profile} />
      <div className="wrapper pt-32 pb-20">
        <BackLink fallbackHref="/case-studies" className="mb-8 inline-flex items-center gap-2 text-xs font-semibold text-slate-400 transition hover:text-white">
          <FaArrowLeft className="text-[10px]" /> All Case Studies
        </BackLink>
        <header className="max-w-4xl">
          <div className="flex flex-wrap items-center gap-3">
            <span className="eyebrow"><Icon /> {study.category}</span>
            <span className="text-[10px] uppercase tracking-[.16em] text-slate-600">Case Study</span>
          </div>
          <h1 className="mt-5 text-4xl font-extrabold tracking-[-.04em] text-white sm:text-5xl md:text-6xl">{study.title}</h1>
          <p className="mt-5 max-w-3xl text-sm leading-7 text-slate-400 sm:text-base">{study.description}</p>
        </header>

        <div className={`case-hero-visual mt-10 overflow-hidden rounded-3xl border border-white/10 bg-gradient-to-br ${gradient}`}>
          <div className="relative min-h-[280px] p-5 sm:p-8">
            <div className="absolute -right-20 -top-20 h-64 w-64 rounded-full bg-accent/10 blur-3xl" />
            <div className="relative mx-auto max-w-4xl rounded-2xl border border-white/10 bg-[#071321]/90 p-4 shadow-2xl backdrop-blur-xl sm:p-6">
              <div className="flex items-center justify-between border-b border-white/10 pb-4">
                <div className="flex items-center gap-3">
                  <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-white/5 text-accent"><Icon /></span>
                  <div><p className="text-xs font-bold text-white">{study.title}</p><p className="mt-1 text-[9px] text-slate-500">Campaign performance snapshot</p></div>
                </div>
                <span className="flex items-center gap-1.5 rounded-full border border-emerald-400/20 bg-emerald-400/5 px-2.5 py-1 text-[9px] text-emerald-300"><span className="h-1.5 w-1.5 rounded-full bg-emerald-400" /> Growth</span>
              </div>
              <div className="mt-5 grid gap-3 sm:grid-cols-3">
                {study.metrics.map((metric) => (
                  <div key={metric.label} className="rounded-xl border border-white/10 bg-white/[.025] p-4">
                    <p className="text-[9px] uppercase tracking-[.12em] text-slate-500">{metric.label}</p>
                    <p className="mt-2 text-2xl font-extrabold text-white">{metric.value}</p>
                    <div className="mt-3 h-1.5 overflow-hidden rounded-full bg-white/5"><div className="h-full w-4/5 rounded-full bg-gradient-to-r from-accent to-violet-500" /></div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        <div className="mt-10 grid gap-6 lg:grid-cols-[1.05fr_.95fr]">
          <section className="soft-card"><span className="label">The challenge</span><h2 className="mt-2 text-xl font-bold text-white">What needed to improve</h2><p className="mt-4 text-sm leading-7 text-slate-400">{study.challenge}</p><div className="mt-7 grid gap-3 sm:grid-cols-2">{study.strategy.map((item) => <div key={item} className="flex items-start gap-2 rounded-xl border border-white/5 bg-white/[.02] p-3 text-xs text-slate-300"><FaCheck className="mt-0.5 shrink-0 text-accent" /> {item}</div>)}</div></section>
          <section className="soft-card"><span className="label">The outcome</span><h2 className="mt-2 text-xl font-bold text-white">What changed</h2><p className="mt-4 text-sm leading-7 text-slate-400">{study.outcome}</p><div className="mt-7 grid grid-cols-3 gap-2">{study.metrics.map((metric) => <div key={metric.label} className="rounded-xl bg-accent/[.06] p-3"><strong className="block text-lg text-cyan-300">{metric.value}</strong><span className="mt-1 block text-[8px] leading-3 text-slate-500">{metric.label}</span></div>)}</div></section>
        </div>

        <section className="mt-10">
          <div className="mb-5"><span className="label">Performance comparison</span><h2 className="mt-2 text-2xl font-bold text-white">Before <span className="gradient-text">→</span> After</h2><p className="mt-2 max-w-2xl text-sm leading-6 text-slate-500">Visual results are presented as image snapshots so the complete performance information stays together inside each before-and-after creative.</p></div>
          <div className="grid gap-5 lg:grid-cols-2">
            <figure className="case-result-image-card"><div className="case-result-image-head"><div><span className="label">Before</span><h3>Starting point</h3></div><span className="case-result-badge muted">Baseline</span></div><div className="case-result-image-wrap"><Image src={study.beforeImage} alt={`${study.title} before results`} width={1600} height={900} className="case-result-image" /></div></figure>
            <figure className="case-result-image-card result"><div className="case-result-image-head"><div><span className="label">After</span><h3>Measured result</h3></div><span className="case-result-badge">Result</span></div><div className="case-result-image-wrap"><Image src={study.afterImage} alt={`${study.title} after results`} width={1600} height={900} className="case-result-image" /></div></figure>
          </div>
        </section>

        <div className="mt-12 flex flex-col gap-4 border-t border-white/10 pt-7 sm:flex-row sm:items-center sm:justify-between">
          <BackLink fallbackHref="/case-studies" className="outline-button"><FaArrowLeft className="mr-2 text-[10px]" /> Back to Projects</BackLink>
          <Link href={`/case-studies/${nextStudy.id}`} className="gradient-button">Next Case Study <FaArrowRight /></Link>
        </div>
      </div>
      <div className="wrapper"><Footer profile={profile} /></div>
    </main>
  );
}
