import { unstable_cache } from "next/cache";
import { createClient as createSupabaseClient } from "@supabase/supabase-js";
import { infos as fallbackInfo } from "@/constant/info";
import { services as fallbackServices } from "@/constant/services";
import { certificates as fallbackCertificates } from "@/constant/certificates";
import { caseStudies as fallbackCaseStudies } from "@/constant/case-studies";
import { reviews as fallbackReviews } from "@/constant/reviews";
import { videoReviews as fallbackVideoReviews } from "@/constant/video-reviews";
import { processSteps as fallbackProcess } from "@/constant/process";
import type { CaseStudy } from "@/constant/case-studies";
import type { Certificate } from "@/constant/certificates";
import type { Review } from "@/constant/reviews";
import type { VideoReview } from "@/constant/video-reviews";
import type { Service } from "@/constant/services";
import type { AdminProfile } from "@/lib/admin/types";

type DbRow = Record<string, any>;

const configured = () =>
  Boolean(
    process.env.NEXT_PUBLIC_SUPABASE_URL &&
      process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY,
  );

const createPublicClient = () =>
  createSupabaseClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY!,
  );

const getProfileCached = unstable_cache(
  async () => {
    const { data } = await createPublicClient()
      .from("profiles")
      .select("*")
      .eq("singleton", true)
      .maybeSingle();
    return data as AdminProfile | null;
  },
  ["portfolio-profile"],
  { revalidate: 600 },
);

const getServicesCached = unstable_cache(
  async () => {
    const { data, error } = await createPublicClient()
      .from("services")
      .select("*")
      .eq("published", true)
      .order("sort_order");
    if (error) return null;
    return data || [];
  },
  ["portfolio-services"],
  { revalidate: 600 },
);

const getCertificatesCached = unstable_cache(
  async () => {
    const { data, error } = await createPublicClient()
      .from("certificates")
      .select("*")
      .eq("published", true)
      .order("sort_order");
    if (error) return null;
    return data || [];
  },
  ["portfolio-certificates"],
  { revalidate: 600 },
);

const getCaseStudiesCached = unstable_cache(
  async () => {
    const { data, error } = await createPublicClient()
      .from("case_studies")
      .select("*")
      .eq("published", true)
      .order("sort_order");
    if (error) return null;
    return data || [];
  },
  ["portfolio-case-studies"],
  { revalidate: 600 },
);

const getReviewsCached = unstable_cache(
  async () => {
    const { data, error } = await createPublicClient()
      .from("reviews")
      .select("*")
      .eq("published", true)
      .order("sort_order");
    if (error) return null;
    return data || [];
  },
  ["portfolio-reviews"],
  { revalidate: 600 },
);

const getVideoReviewsCached = unstable_cache(
  async () => {
    const { data, error } = await createPublicClient()
      .from("video_reviews")
      .select("*")
      .eq("published", true)
      .order("sort_order");
    if (error) return null;
    return data || [];
  },
  ["portfolio-video-reviews"],
  { revalidate: 600 },
);

const getProcessCached = unstable_cache(
  async () => {
    const { data, error } = await createPublicClient()
      .from("process_steps")
      .select("*")
      .eq("published", true)
      .order("sort_order");
    if (error) return null;
    return data || [];
  },
  ["portfolio-process"],
  { revalidate: 600 },
);

const getSettingsCached = unstable_cache(
  async () => {
    const { data } = await createPublicClient()
      .from("site_settings")
      .select("*")
      .eq("singleton", true)
      .maybeSingle();
    return data || null;
  },
  ["portfolio-settings"],
  { revalidate: 600 },
);

const fallbackProfile = (): AdminProfile => ({
  id: "fallback",
  name: fallbackInfo.name,
  designation: fallbackInfo.designation,
  email: fallbackInfo.email,
  whatsapp: fallbackInfo.whatsapp,
  profile_image: fallbackInfo.profileImage,
  about_image: "/images/profile/about img.png",
  resume_url: fallbackInfo.resumeUrl,
  facebook: fallbackInfo.facebook,
  instagram: fallbackInfo.instagram,
  twitter: fallbackInfo.twitter,
  linkedin: fallbackInfo.linkedin,
  location: fallbackInfo.location,
  bio: fallbackInfo.bio,
  about_text:
    "I’m Ridoy Ahmed, a digital marketer and SEO specialist with a passion for helping businesses grow online. I focus on data-driven strategies, creative content, and effective SEO techniques to increase visibility, traffic, and sales.",
  stats: fallbackInfo.stats,
  impact_stats: [
    { value: 150, suffix: "+", label: "Projects Completed" },
    { value: 2, suffix: "+", label: "Years Experience" },
    { value: 100, suffix: "%", label: "Client Satisfaction" },
    { value: 25, suffix: "+", label: "Global Clients" },
  ],
});

export async function getProfile(): Promise<AdminProfile> {
  if (!configured()) return fallbackProfile();
  try {
    return (await getProfileCached()) || fallbackProfile();
  } catch {
    return fallbackProfile();
  }
}

export async function getServices(): Promise<Service[]> {
  if (!configured()) return fallbackServices;
  try {
    const data = await getServicesCached();
    if (!data?.length) return fallbackServices;
    return data.map((row: DbRow) => ({
      title: row.title,
      description: row.description,
      color: row.color,
      icon: row.icon || "code",
    }));
  } catch {
    return fallbackServices;
  }
}

export async function getCertificates(): Promise<Certificate[]> {
  if (!configured()) return fallbackCertificates;
  try {
    const data = await getCertificatesCached();
    if (!data?.length) return fallbackCertificates;
    return data.map((r: DbRow) => ({
      id: r.slug,
      title: r.title,
      issuer: r.issuer,
      year: r.year,
      image: r.image,
      credentialUrl: r.credential_url || undefined,
      description: r.description,
    }));
  } catch {
    return fallbackCertificates;
  }
}

const parseCase = (r: DbRow): CaseStudy => ({
  id: r.slug || r.id,
  category: r.category,
  title: r.title,
  description: r.description,
  metrics: r.metrics || [],
  visual: r.visual,
  challenge: r.challenge,
  strategy: r.strategy || [],
  outcome: r.outcome,
  before: r.before_stats || [],
  after: r.after_stats || [],
  cardImage: r.card_image || "",
  beforeImage: r.before_image,
  afterImage: r.after_image,
});

export async function getCaseStudies(): Promise<CaseStudy[]> {
  if (!configured()) return fallbackCaseStudies;
  try {
    const data = await getCaseStudiesCached();
    if (!data?.length) return fallbackCaseStudies;
    return data.map(parseCase);
  } catch {
    return fallbackCaseStudies;
  }
}

export async function getReviews(): Promise<Review[]> {
  if (!configured()) return fallbackReviews;
  try {
    const data = await getReviewsCached();
    if (!data?.length) return fallbackReviews;
    return data.map((r: DbRow) => ({
      name: r.name,
      role: r.role,
      company: r.company || undefined,
      photo: r.photo || undefined,
      review: r.review,
      rating: r.rating,
    }));
  } catch {
    return fallbackReviews;
  }
}

export async function getVideoReviews(): Promise<VideoReview[]> {
  if (!configured()) return fallbackVideoReviews;
  try {
    const data = await getVideoReviewsCached();
    if (!data?.length) return fallbackVideoReviews;
    return data.map((r: DbRow) => ({
      id: r.id,
      clientName: r.client_name,
      role: r.role || undefined,
      company: r.company || undefined,
      thumbnail: r.thumbnail || undefined,
      videoUrl: r.video_url || undefined,
      quote: r.quote || undefined,
    }));
  } catch {
    return fallbackVideoReviews;
  }
}

export async function getProcessSteps() {
  if (!configured()) return fallbackProcess;
  try {
    const data = await getProcessCached();
    if (!data?.length) return fallbackProcess;
    return data.map((r: DbRow) => ({
      number: r.number,
      title: r.title,
      description: r.description,
    }));
  } catch {
    return fallbackProcess;
  }
}

export async function getSiteSettings() {
  const fallback = {
    site_title: "Ridoy Ahmed | Digital Marketer | Growth Strategist",
    site_description:
      "Digital marketing portfolio of Ridoy Ahmed — Google Ads, Meta Ads, YouTube Ads, SEO, social media and performance-focused growth strategies.",
    hero_badge: "Digital Marketing Specialist",
    hero_cta: "View My Services",
    hero_secondary_cta: "Let’s Work Together",
    trust_label: "Trusted by Businesses Worldwide",
    footer_tagline: "More Traffic • More Leads • More Sales",
  };
  if (!configured()) return fallback;
  try {
    return (await getSettingsCached()) || fallback;
  } catch {
    return fallback;
  }
}
