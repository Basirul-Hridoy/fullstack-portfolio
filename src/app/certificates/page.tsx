import Link from "next/link";
import { FaArrowLeft, FaArrowRight } from "react-icons/fa";
import type { Metadata } from "next";
import { getCertificates } from "@/lib/content";
import BackLink from "@/components/back-link";
import CertificateGrid from "./certificate-grid";


export const metadata: Metadata = { title: "Certificates", description: "Professional digital marketing, advertising, SEO, social media and analytics certifications.", alternates: process.env.NEXT_PUBLIC_SITE_URL ? { canonical: `${process.env.NEXT_PUBLIC_SITE_URL}/certificates` } : undefined };

export default async function CertificatesPage() {
  const certificates = await getCertificates();
  return <main className="min-h-screen pt-32 pb-20"><div className="wrapper"><BackLink fallbackHref="/#certificates" className="inline-flex items-center gap-2 text-xs font-semibold text-slate-400 transition hover:text-white"><FaArrowLeft className="text-[10px]"/> Back to Home</BackLink><div className="mt-8 max-w-3xl"><div className="eyebrow">Credentials</div><h1 className="mt-5 text-4xl font-extrabold tracking-[-.04em] text-white sm:text-5xl md:text-6xl">My Certifications & <span className="gradient-text">Expertise</span></h1><p className="mt-5 text-sm leading-7 text-slate-400 sm:text-base">A complete collection of my professional certifications and continuous learning across digital marketing, advertising, SEO, social media, and analytics.</p></div><CertificateGrid certificates={certificates}/><div className="mt-12 flex items-center justify-between border-t border-white/10 pt-7"><BackLink fallbackHref="/#certificates" className="outline-button"><FaArrowLeft className="mr-2 text-[10px]"/> Home</BackLink><Link href="/#contact" className="gradient-button">Let&apos;s Work Together <FaArrowRight/></Link></div></div></main>;
}
