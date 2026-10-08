export type Json = Record<string, unknown>;

export type AdminProfile = {
  id: string;
  name: string;
  designation: string;
  email: string;
  whatsapp: string;
  profile_image: string;
  about_image: string;
  resume_url: string;
  facebook: string;
  instagram: string;
  twitter: string;
  linkedin: string;
  location: string;
  bio: string;
  about_text: string;
  stats: { experience: string; projects: string; clients: string };
  impact_stats: { value: number; suffix: string; label: string }[];
};
