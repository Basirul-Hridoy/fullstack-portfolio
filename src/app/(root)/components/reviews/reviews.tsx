"use client";

import { Review } from "@/constant/reviews";
import Link from "next/link";
import { useMemo, useState } from "react";
import { FaArrowRight } from "react-icons/fa";
import SectionHeading from "../shared/section-heading";
import { ReviewCard } from "./review-card";

const Reviews = ({ reviews }: { reviews: Review[] }) => {
  const [locked, setLocked] = useState(false);
  const loopReviews = useMemo(() => [...reviews, ...reviews], []);

  return (
    <section id="reviews" className="section-divider overflow-hidden py-20">
      <SectionHeading
        eyebrow="Client Reviews"
        title={
          <>
            What My Clients <span className="gradient-text">Say</span>
          </>
        }
        description="Real feedback from clients I have worked with. Hover or click any review to pause the carousel and read it comfortably."
      />

      <div className="relative mt-10 overflow-hidden [mask-image:linear-gradient(to_right,transparent,black_6%,black_94%,transparent)]">
        <div
          className={`reviews-track flex w-max gap-5 pr-5 ${locked ? "reviews-paused" : ""}`}
        >
          {loopReviews.map((review, index) => (
            <div
              key={`${review.name}-${index}`}
              className="w-[calc(100vw-48px)] max-w-[390px] shrink-0 md:w-[390px] lg:w-[calc((72rem-40px)/3)]"
            >
              <ReviewCard
                review={review}
                paused={locked}
                onTogglePause={() => setLocked((current) => !current)}
              />
            </div>
          ))}
        </div>
      </div>

      <div className="reviews-page-actions mt-8 flex flex-nowrap gap-3">
        <Link href="/reviews" className="outline-button whitespace-nowrap">
          View All Client Reviews <FaArrowRight className="ml-2 text-[10px]" />
        </Link>
        <Link
          href="/reviews/videos"
          className="gradient-button whitespace-nowrap"
        >
          Client Video Reviews <FaArrowRight className="text-[10px]" />
        </Link>
      </div>
    </section>
  );
};

export default Reviews;
