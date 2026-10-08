"use client";

import { Certificate } from "@/constant/certificates";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { FaArrowRight } from "react-icons/fa";
import { MdKeyboardArrowLeft, MdKeyboardArrowRight } from "react-icons/md";

const Certificates = ({ certificates }: { certificates: Certificate[] }) => {
  const [start, setStart] = useState(0);
  const [direction, setDirection] = useState<"left" | "right">("left");
  const visibleCount = 3;
  const total = certificates.length;
  const visible: Certificate[] = Array.from(
    { length: Math.min(visibleCount, total) },
    (_, offset) => certificates[(start + offset) % total],
  );

  const move = (step: number) => {
    setDirection(step > 0 ? "left" : "right");
    setStart((current) => (current + step + total) % total);
  };

  return (
    <section id="certificates" className="section-divider py-20">
      <div className="certificates-layout">
        <div className="certificates-copy">
          <div className="eyebrow">Certifications & Expertise</div>
          <h2 className="mt-5 text-3xl font-extrabold tracking-[-.04em] text-white sm:text-4xl">
            My Certifications & <span className="gradient-text">Expertise</span>
          </h2>
          <p className="mt-4 max-w-xl text-sm leading-6 text-slate-400 sm:text-base">
            Professionally certified and continuously learning to stay updated
            with the latest digital marketing trends and tools.
          </p>
          <Link href="/certificates" className="outline-button mt-7">
            View All Certificates <FaArrowRight className="ml-2 text-[10px]" />
          </Link>
        </div>

        <div className="certificates-showcase">
          <div className="certificate-controls">
            <button type="button" onClick={() => move(-1)} aria-label="Previous certificates" className="certificate-arrow">
              <MdKeyboardArrowLeft />
            </button>
            <button type="button" onClick={() => move(1)} aria-label="Next certificates" className="certificate-arrow">
              <MdKeyboardArrowRight />
            </button>
          </div>

          <div className={`certificate-grid certificate-slide-${direction}`} key={`${start}-${direction}`}>
            {visible.map((certificate) => (
              <Link
                key={certificate.id}
                href={`/certificates/${certificate.id}`}
                className="certificate-preview-card certificate-image-card block"
                aria-label={`View ${certificate.title}`}
              >
                <div className="certificate-image-frame">
                  <Image
                    src={certificate.image!}
                    alt={certificate.title}
                    fill
                    sizes="(max-width: 767px) 100vw, 300px"
                    className="object-cover"
                  />
                </div>
              </Link>
            ))}
          </div>

          <div className="certificate-pagination" aria-hidden="true">
            {Array.from({ length: Math.max(total, 1) }, (_, index) => (
              <span key={index} className={index === start ? "active" : ""} />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Certificates;
