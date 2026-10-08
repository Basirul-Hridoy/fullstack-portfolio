"use client";

import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import { FaArrowUp } from "react-icons/fa";

const BackToTop = () => {
  const pathname = usePathname();
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    if (pathname.startsWith("/admin")) return;

    const onScroll = () => setVisible(window.scrollY > 220);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, [pathname]);

  if (pathname.startsWith("/admin")) return null;

  const scrollToTop = () =>
    window.scrollTo({ top: 0, behavior: "smooth" });

  return (
    <button
      type="button"
      onClick={scrollToTop}
      aria-label="Back to top"
      className={`fixed bottom-5 right-5 z-[90] flex h-11 w-11 items-center justify-center rounded-full border border-accent/30 bg-[#061224]/85 text-accent shadow-[0_10px_35px_rgba(0,132,255,.18)] backdrop-blur-xl transition-all duration-300 hover:-translate-y-1 hover:border-accent/60 hover:bg-accent hover:text-white md:bottom-7 md:right-7 ${
        visible
          ? "translate-y-0 opacity-100"
          : "pointer-events-none translate-y-4 opacity-0"
      }`}
    >
      <FaArrowUp className="text-xs" />
    </button>
  );
};

export default BackToTop;
