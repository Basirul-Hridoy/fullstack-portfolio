export type VideoReview = {
  id: string;
  clientName: string;
  role?: string;
  company?: string;
  thumbnail?: string;
  videoUrl?: string;
  quote?: string;
};

// Add each real client video here. Keep videoUrl empty until the client video is ready.
export const videoReviews: VideoReview[] = [
  {
    id: "client-video-1",
    clientName: "Client Video Review",
    role: "Client",
    company: "",
    videoUrl: "https://www.youtube.com/embed/lapEzkx5In8",
    quote: "Add the client quote from the real testimonial here.",
  },
  {
    id: "client-video-2",
    clientName: "Client Video Review",
    role: "Client",
    company: "",
    videoUrl: "https://www.youtube.com/embed/6unRPgLSJ8o",
    quote: "Add the client quote from the real testimonial here.",
  },
];
