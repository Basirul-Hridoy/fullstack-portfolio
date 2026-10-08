import Link from "next/link";
import { CaseStudyCategory } from "@/constant/case-studies";

export const categories: ("All" | CaseStudyCategory)[] = ["All", "Google Ads", "Meta Ads", "SEO", "Social Media", "YouTube"];

const slugMap: Record<CaseStudyCategory, string> = {
  "Google Ads": "google-ads",
  "Meta Ads": "meta-ads",
  SEO: "seo",
  "Social Media": "social-media",
  YouTube: "youtube",
};

export const CaseStudyTabs = ({
  active,
  homeMode = false,
}: {
  active: "All" | CaseStudyCategory | null;
  homeMode?: boolean;
}) => (
  <div className="flex flex-wrap justify-center gap-2 md:justify-start">
    {categories.map((category) => {
      const href = category === "All" ? "/case-studies" : `/case-studies/${slugMap[category]}`;
      const isActive = !homeMode && active === category;
      return (
        <Link
          key={category}
          href={href}
          className={`rounded-full border px-3 py-1.5 text-[10px] transition ${isActive ? "border-accent bg-accent text-white" : "border-white/10 bg-white/[.02] text-slate-400 hover:border-accent/40 hover:text-white"}`}
          aria-current={isActive ? "page" : undefined}
        >
          {category}
        </Link>
      );
    })}
  </div>
);
