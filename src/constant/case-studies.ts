export type CaseStudyCategory =
  | "Google Ads"
  | "Meta Ads"
  | "SEO"
  | "Social Media"
  | "YouTube";

export type CaseStudy = {
  id: string | number;
  category: CaseStudyCategory;
  title: string;
  description: string;
  metrics: { label: string; value: string }[];
  visual: "google" | "meta" | "seo" | "social" | "youtube";
  challenge: string;
  strategy: string[];
  outcome: string;
  before: { label: string; value: string; note: string }[];
  after: { label: string; value: string; note: string }[];
  cardImage?: string;
  beforeImage: string;
  afterImage: string;
};

export const caseStudies: CaseStudy[] = [
  {
    id: 1,
    category: "Google Ads",
    title: "E-commerce Store Growth",
    description:
      "Improved sales efficiency with a focused search and shopping campaign strategy.",
    metrics: [
      { label: "Sales", value: "+245%" },
      { label: "ROAS", value: "3.8x" },
      { label: "CPA", value: "-42%" },
    ],
    visual: "google",
    challenge:
      "The store needed more qualified search traffic and stronger purchase efficiency without scaling spend blindly.",
    strategy: [
      "Search intent mapping",
      "Shopping campaign restructuring",
      "Conversion-focused landing pages",
      "Weekly search-term optimization",
    ],
    outcome:
      "Higher sales volume with stronger efficiency across the core acquisition campaigns.",
    before: [
      { label: "Sales", value: "100", note: "Baseline index" },
      { label: "CPA", value: "$100", note: "Baseline cost" },
      { label: "ROAS", value: "1.9x", note: "Starting point" },
    ],
    after: [
      { label: "Sales", value: "+245%", note: "Growth" },
      { label: "CPA", value: "-42%", note: "Lower cost" },
      { label: "ROAS", value: "3.8x", note: "Efficiency" },
    ],
    beforeImage: "/images/case-studies/case-1-before.png",
    afterImage: "/images/case-studies/case-1-after.png",
  },
  {
    id: 2,
    category: "Meta Ads",
    title: "Brand Awareness Campaign",
    description:
      "Expanded reach and engagement with creative testing and audience segmentation.",
    metrics: [
      { label: "Reach", value: "+210%" },
      { label: "ROAS", value: "3.8x" },
      { label: "Engagement", value: "+68%" },
    ],
    visual: "meta",
    challenge:
      "The brand needed wider qualified reach while keeping creative testing and audience learning structured.",
    strategy: [
      "Audience segmentation",
      "Creative angle testing",
      "Retargeting flows",
      "Performance-led budget allocation",
    ],
    outcome:
      "A broader audience footprint with stronger engagement and measurable campaign efficiency.",
    before: [
      { label: "Reach", value: "100", note: "Baseline index" },
      { label: "Engagement", value: "1x", note: "Baseline" },
      { label: "ROAS", value: "1.7x", note: "Starting point" },
    ],
    after: [
      { label: "Reach", value: "+210%", note: "Growth" },
      { label: "Engagement", value: "+68%", note: "Growth" },
      { label: "ROAS", value: "3.8x", note: "Efficiency" },
    ],
    beforeImage: "/images/case-studies/case-2-before.png",
    afterImage: "/images/case-studies/case-2-after.png",
  },
  {
    id: 3,
    category: "SEO",
    title: "SEO Growth Strategy",
    description:
      "Built organic visibility through technical cleanup, content, and keyword strategy.",
    metrics: [
      { label: "Organic Traffic", value: "+72%" },
      { label: "Avg. Position", value: "#3" },
      { label: "Keywords", value: "+54%" },
    ],
    visual: "seo",
    challenge:
      "Organic visibility was limited by technical gaps and content that was not aligned tightly enough with search intent.",
    strategy: [
      "Technical SEO cleanup",
      "Keyword clustering",
      "Content optimization",
      "Internal-link architecture",
    ],
    outcome:
      "Steadier organic visibility with stronger rankings across priority topics.",
    before: [
      { label: "Traffic", value: "100", note: "Baseline index" },
      { label: "Position", value: "#18", note: "Starting point" },
      { label: "Keywords", value: "100", note: "Baseline index" },
    ],
    after: [
      { label: "Traffic", value: "+72%", note: "Growth" },
      { label: "Position", value: "#3", note: "Average" },
      { label: "Keywords", value: "+54%", note: "Growth" },
    ],
    beforeImage: "/images/case-studies/case-3-before.png",
    afterImage: "/images/case-studies/case-3-after.png",
  },
  {
    id: 4,
    category: "Social Media",
    title: "Social Growth Campaign",
    description:
      "Improved consistency, audience engagement, and content performance across social channels.",
    metrics: [
      { label: "Followers", value: "+140%" },
      { label: "Engagement", value: "3.6x" },
      { label: "Traffic", value: "+62%" },
    ],
    visual: "social",
    challenge:
      "The social presence needed a clearer content system, stronger consistency, and better audience interaction.",
    strategy: [
      "Content pillars",
      "Publishing system",
      "Engagement optimization",
      "Channel performance review",
    ],
    outcome:
      "More consistent social growth and stronger engagement signals across the content mix.",
    before: [
      { label: "Followers", value: "100", note: "Baseline index" },
      { label: "Engagement", value: "1x", note: "Baseline" },
      { label: "Traffic", value: "100", note: "Baseline index" },
    ],
    after: [
      { label: "Followers", value: "+140%", note: "Growth" },
      { label: "Engagement", value: "3.6x", note: "Growth" },
      { label: "Traffic", value: "+62%", note: "Growth" },
    ],
    beforeImage: "/images/case-studies/case-4-before.png",
    afterImage: "/images/case-studies/case-4-after.png",
  },
  {
    id: 5,
    category: "YouTube",
    title: "YouTube Channel Growth",
    description:
      "Improved discoverability with channel optimization, video SEO, and promotion.",
    metrics: [
      { label: "Views", value: "+185%" },
      { label: "CTR", value: "+41%" },
      { label: "Subscribers", value: "+96%" },
    ],
    visual: "youtube",
    challenge:
      "The channel needed stronger discoverability and packaging so more of the content could reach relevant viewers.",
    strategy: [
      "Video SEO",
      "Title and thumbnail optimization",
      "Channel positioning",
      "Promotion and retention review",
    ],
    outcome:
      "Improved discoverability, click-through performance, and subscriber growth.",
    before: [
      { label: "Views", value: "100", note: "Baseline index" },
      { label: "CTR", value: "2.9%", note: "Starting point" },
      { label: "Subscribers", value: "100", note: "Baseline index" },
    ],
    after: [
      { label: "Views", value: "+185%", note: "Growth" },
      { label: "CTR", value: "+41%", note: "Growth" },
      { label: "Subscribers", value: "+96%", note: "Growth" },
    ],
    beforeImage: "/images/case-studies/case-5-before.png",
    afterImage: "/images/case-studies/case-5-after.png",
  },
];
