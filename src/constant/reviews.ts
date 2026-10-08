export type Review = {
  name: string;
  role: string;
  company?: string;
  photo?: string;
  review: string;
  rating: number;
};

export const reviews: Review[] = [
  {
    name: "Tanvir Rahman",
    role: "CEO",
    company: "TechForward",
    review:
      "Ridoy's campaign strategy brought us significantly more qualified leads in just a few months. Highly recommended.",
    rating: 5,
  },
  {
    name: "Nusrat Jahan",
    role: "Marketing Manager",
    company: "TechHive",
    review:
      "Professional, responsive, and results-driven. He understood our goals and delivered beyond expectations.",
    rating: 5,
  },
  {
    name: "Sheikh Rafi",
    role: "Founder",
    company: "LocalBazaar",
    review:
      "His SEO work helped us improve our search visibility and bring more relevant traffic to the website.",
    rating: 5,
  },
];
