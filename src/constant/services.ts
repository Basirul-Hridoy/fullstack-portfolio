export type Service = {
  title: string;
  description: string;
  icon: string;
  color: string;
};

// Store icon names as strings so service data stays serializable for
// Server -> Client Components and can also be stored safely in Supabase.
export const services: Service[] = [
  {
    title: "Social Media Management",
    description:
      "Plan, manage, publish, and optimize social content to build a consistent brand presence and stronger audience engagement.",
    icon: "users",
    color: "#E1306C",
  },
  {
    title: "Meta Ads",
    description:
      "Plan, launch, test, and optimize Facebook and Instagram ad campaigns focused on qualified reach, leads, and sales.",
    icon: "facebook",
    color: "#0866FF",
  },
  {
    title: "Google Ads",
    description:
      "Build and optimize search and performance campaigns around high-intent traffic, conversions, and measurable growth.",
    icon: "google",
    color: "#4285F4",
  },
  {
    title: "YouTube Marketing",
    description:
      "Support channel setup, video SEO, content strategy, monetization, management, promotion, and YouTube Ads.",
    icon: "youtube",
    color: "#FF0000",
  },
  {
    title: "Local SEO",
    description:
      "Improve local search visibility, Google Business presence, rankings, and discovery for customers ready to take action.",
    icon: "location",
    color: "#34A853",
  },
  {
    title: "Video Editing & Thumbnails",
    description:
      "Create clean, engaging video edits and click-focused thumbnails that support stronger content performance and retention.",
    icon: "video",
    color: "#F43F5E",
  },
  {
    title: "Web Design & Development",
    description:
      "Create modern, responsive, conversion-focused websites that support your brand, campaigns, and marketing goals.",
    icon: "code",
    color: "#8B5CF6",
  },
  {
    title: "Content Marketing",
    description:
      "Build strategic content around audience needs, search intent, brand trust, and clear actions that support growth.",
    icon: "pen",
    color: "#F59E0B",
  },
];
