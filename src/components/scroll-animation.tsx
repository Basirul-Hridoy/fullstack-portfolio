"use client";

import { usePathname } from "next/navigation";
import { useEffect } from "react";

const ScrollAnimation = () => {
  const pathname = usePathname();

  useEffect(() => {
    const setupObserver = () => {
      const elements = Array.from(
        document.querySelectorAll<HTMLElement>("[data-reveal]"),
      );

      if (!elements.length) return;

      const reducedMotion = window.matchMedia(
        "(prefers-reduced-motion: reduce)",
      ).matches;

      if (reducedMotion) {
        elements.forEach((element) => {
          element.classList.add("is-visible");
        });

        return;
      }

      const observer = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting) {
              entry.target.classList.add("is-visible");
              observer.unobserve(entry.target);
            }
          });
        },
        {
          threshold: 0.12,
          rootMargin: "0px 0px -60px 0px",
        },
      );

      elements.forEach((element) => {
        element.classList.add("is-visible");
        observer.observe(element);
      });

      return () => observer.disconnect();
    };

    const frame = requestAnimationFrame(setupObserver);

    return () => cancelAnimationFrame(frame);
  }, [pathname]);

  return null;
};

export default ScrollAnimation;
