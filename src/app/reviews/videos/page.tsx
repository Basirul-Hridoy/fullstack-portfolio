import Link from "next/link";
import { FaArrowLeft, FaPlay, FaArrowRight } from "react-icons/fa";
import type { Metadata } from "next";
import Navbar from "../../(root)/components/layout/navbar/navbar";
import Footer from "../../(root)/components/footer";
import { getProfile, getVideoReviews } from "@/lib/content";
import BackLink from "@/components/back-link";

export const metadata: Metadata = { title: "Client Video Reviews", description: "Watch client video testimonials and real experiences from digital marketing projects.", alternates: process.env.NEXT_PUBLIC_SITE_URL ? { canonical: `${process.env.NEXT_PUBLIC_SITE_URL}/reviews/videos` } : undefined };

export default async function ClientVideoReviewsPage() {
  const [videoReviews, profile] = await Promise.all([getVideoReviews(), getProfile()]);
  return (
    <main>
      <Navbar profile={profile} />
      <div className="wrapper pt-32 pb-20">
        <BackLink fallbackHref="/reviews" className="mb-8 inline-flex items-center gap-2 text-xs font-semibold text-slate-400 transition hover:text-white">
          <FaArrowLeft className="text-[10px]" /> All Client Reviews
        </BackLink>
        <div className="max-w-3xl">
          <span className="eyebrow">Client Video Reviews</span>
          <h1 className="mt-5 text-4xl font-extrabold tracking-[-.04em] text-white sm:text-5xl md:text-6xl">Real People. <span className="gradient-text">Real Experiences.</span></h1>
          <p className="mt-5 max-w-2xl text-sm leading-7 text-slate-400 sm:text-base">Video testimonials from clients sharing their experience of working together.</p>
        </div>

        <div className="mt-12 grid gap-5 md:grid-cols-2 lg:grid-cols-3">
          {videoReviews.map((review) => (
            <article key={review.id} className="overflow-hidden rounded-2xl border border-accent/20 bg-[#061224]/60">
              <div className="relative aspect-video bg-[#020b18]">
                {review.videoUrl ? (
                  <iframe src={review.videoUrl} title={`${review.clientName} video review`} className="h-full w-full" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowFullScreen />
                ) : (
                  <div className="absolute inset-0 flex flex-col items-center justify-center gap-3 text-center text-slate-500">
                    <span className="flex h-12 w-12 items-center justify-center rounded-full border border-accent/30 bg-accent/10 text-accent"><FaPlay /></span>
                    <span className="px-6 text-[10px] uppercase tracking-[.14em]">Video will be added here</span>
                  </div>
                )}
              </div>
              <div className="p-5">
                <h2 className="text-sm font-bold text-white">{review.clientName}</h2>
                <p className="mt-1 text-[10px] text-slate-500">{review.role}{review.company ? `, ${review.company}` : ""}</p>
                {review.quote && <p className="mt-4 text-xs leading-6 text-slate-400">“{review.quote}”</p>}
              </div>
            </article>
          ))}
        </div>

        <div className="mt-10"><BackLink fallbackHref="/reviews" className="outline-button">Back to Reviews <FaArrowRight className="ml-2 text-[10px]" /></BackLink></div>
      </div>
      <div className="wrapper"><Footer profile={profile} /></div>
    </main>
  );
}
