import Link from "next/link";
import { FaArrowLeft, FaArrowRight } from "react-icons/fa";
import type { Metadata } from "next";
import Navbar from "../(root)/components/layout/navbar/navbar";
import Footer from "../(root)/components/footer";
import { getProfile, getReviews } from "@/lib/content";
import { ReviewCard } from "../(root)/components/reviews/review-card";
import BackLink from "@/components/back-link";

export const metadata: Metadata = { title: "Client Reviews", description: "Read client feedback and experiences from digital marketing projects and growth campaigns.", alternates: process.env.NEXT_PUBLIC_SITE_URL ? { canonical: `${process.env.NEXT_PUBLIC_SITE_URL}/reviews` } : undefined };

export default async function ReviewsPage() {
  const [reviews, profile] = await Promise.all([getReviews(), getProfile()]);
  return (
    <main>
      <Navbar profile={profile} />
      <div className="wrapper pt-32 pb-20">
        <BackLink fallbackHref="/#reviews" className="mb-8 inline-flex items-center gap-2 text-xs font-semibold text-slate-400 transition hover:text-white">
          <FaArrowLeft className="text-[10px]" /> Back to Home
        </BackLink>
        <div className="max-w-3xl">
          <span className="eyebrow">Client Reviews</span>
          <h1 className="mt-5 text-4xl font-extrabold tracking-[-.04em] text-white sm:text-5xl md:text-6xl">
            What My Clients <span className="gradient-text">Say</span>
          </h1>
          <p className="mt-5 max-w-2xl text-sm leading-7 text-slate-400 sm:text-base">
            A complete collection of client feedback and experiences from projects, campaigns, and growth work.
          </p>
        </div>

        <div className="mt-12 grid gap-5 md:grid-cols-2 lg:grid-cols-3">
          {reviews.map((review) => (
            <ReviewCard
              key={`${review.name}-${review.company || "client"}`}
              review={review}
              paused={false}
              onTogglePause={() => undefined}
              staticCard
            />
          ))}
        </div>

        <div className="reviews-page-actions mt-10 flex flex-nowrap gap-3">
          <Link href="/reviews/videos" className="gradient-button whitespace-nowrap">
            Client Video Reviews <FaArrowRight className="text-[10px]" />
          </Link>
          <Link href="/#contact" className="outline-button whitespace-nowrap">
            Work With Me
          </Link>
        </div>
      </div>
      <div className="wrapper"><Footer profile={profile} /></div>
    </main>
  );
}
