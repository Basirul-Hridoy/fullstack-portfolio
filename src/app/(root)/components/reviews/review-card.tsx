import { reviews } from "@/constant/reviews";
import Image from "next/image";
import { FaQuoteRight, FaStar } from "react-icons/fa";

type ReviewCardProps = {
  review: (typeof reviews)[number];
  paused?: boolean;
  onTogglePause?: () => void;
  staticCard?: boolean;
};

const initials = (name: string) =>
  name
    .split(" ")
    .map((part) => part[0])
    .slice(0, 2)
    .join("")
    .toUpperCase();

export const ReviewCard = ({ review }: ReviewCardProps) => {
  return (
    <article className="rounded-2xl border border-accent/25 bg-[#061224]/55 p-5 transition-all duration-300 hover:-translate-y-1 hover:border-accent/60 hover:bg-[#081a32]">
      <div className="flex items-start justify-between gap-4">
        <div className="flex min-w-0 items-center gap-3">
          <div className="relative flex h-11 w-11 shrink-0 items-center justify-center overflow-hidden rounded-full border border-accent/30 bg-gradient-to-br from-accent/20 to-purple-500/20 text-xs font-bold text-accent md:text-sm">
            {review.photo ? (
              <Image
                src={review.photo}
                alt={`${review.name} profile photo`}
                fill
                sizes="44px"
                className="object-cover"
              />
            ) : (
              <span>{initials(review.name)}</span>
            )}
          </div>

          <div className="min-w-0">
            <h3 className="truncate text-sm font-bold text-white md:text-base">
              {review.name}
            </h3>

            <p className="mt-1 truncate text-[10px] text-slate-500 md:text-xs">
              {review.role}
              {review.company ? `, ${review.company}` : ""}
            </p>
          </div>
        </div>

        <FaQuoteRight className="shrink-0 text-accent/60" />
      </div>

      <div
        className="mt-4 flex gap-1 text-[10px] text-yellow-300 md:text-xs"
        aria-label={`${review.rating} out of 5 stars`}
      >
        {Array.from({ length: review.rating }).map((_, index) => (
          <FaStar key={index} />
        ))}
      </div>

      <p className="mt-4 text-sm leading-6 text-slate-400">“{review.review}”</p>
    </article>
  );
};
