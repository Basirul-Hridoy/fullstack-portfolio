export type Certificate = {
  id: string;
  title: string;
  issuer: string;
  year: string;
  image?: string;
  credentialUrl?: string;
  description: string;
};

export const certificates: Certificate[] = [
  {
    id: "google-ads-display",
    title: "Google Ads Display Certification",
    issuer: "Google",
    year: "2026",
    image: "/images/certificates/ads display.jpg",
    description: "Certification focused on display advertising strategy, campaign setup, audience targeting, and performance measurement.",
  },
  {
    id: "google-ads-search",
    title: "Google Ads Search Certification",
    issuer: "Google",
    year: "2026",
    image: "/images/certificates/ads search.jpg",
    description: "Certification focused on search campaign strategy, keyword intent, optimization, and performance-focused advertising.",
  },
  {
    id: "google-ads-video",
    title: "Google Ads Video Certification",
    issuer: "Google",
    year: "2026",
    image: "/images/certificates/ads video.jpg",
    description: "Certification focused on video advertising strategy, audience reach, campaign setup, and measurable growth.",
  },
  {
    id: "social-media-marketing",
    title: "Social Media Marketing Crash Course",
    issuer: "Meta",
    year: "2026",
    image: "/images/certificates/social media.jpg",
    description: "Training focused on social media strategy, content planning, audience growth, and performance marketing.",
  },
  {
    id: "local-seo-semrush",
    title: "Local SEO Essentials with Semrush",
    issuer: "Semrush",
    year: "2026",
    image: "/images/certificates/local seo.jpg",
    description: "Training focused on local search visibility, local optimization, and practical SEO workflows.",
  },
  {
    id: "keyword-research-semrush",
    title: "Keyword Research Essentials with Semrush",
    issuer: "Semrush",
    year: "2026",
    image: "/images/certificates/keyword.jpg",
    description: "Training focused on keyword research, search intent, topic discovery, and SEO planning.",
  },
  {
    id: "on-page-seo-ai-search",
    title: "On Page SEO and AI Search",
    issuer: "Semrush",
    year: "2026",
    image: "/images/certificates/on page seo.jpg",
    description: "Training focused on on-page SEO, content optimization, and adapting search strategy for AI-driven discovery.",
  },
];
