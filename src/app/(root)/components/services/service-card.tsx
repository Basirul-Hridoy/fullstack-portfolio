import { Service } from "@/constant/services";
import type { CSSProperties } from "react";
import { FaArrowRight, FaChartLine } from "react-icons/fa";
import { ServiceIcon } from "./service-icon";

const GoogleLogo = () => (
  <svg viewBox="0 0 32 32" className="h-8 w-8" aria-label="Google Ads">
    <path fill="#4285F4" d="M16 6.2c2.8 0 5 .9 6.8 2.6l3.1-3.1C23.3 3.3 20.1 2 16 2 10.5 2 5.8 3.2 3.5 9.9l4 3.1C8.9 9 12.1 6.2 16 6.2Z" />
    <path fill="#34A853" d="M3.5 9.9C2.5 11.8 2 13.8 2 16s.5 4.2 1.5 6.1l4-3.1c-.5-1-.8-2.1-.8-3s.3-2 .8-3l-4-3.1Z" />
    <path fill="#FBBC05" d="M3.5 22.1C5.8 26.8 10.5 30 16 30c3.9 0 7.2-1.3 9.6-3.6l-3.6-2.8c-1.2.8-3 1.5-6 1.5-3.9 0-7.1-2.8-8.3-6.5l-4.2 3.5Z" />
    <path fill="#EA4335" d="M30 16c0-1-.1-1.7-.3-2.5H16v5.1h7.8c-.4 2-1.5 3.4-3.3 4.5l3.6 2.8C27.5 23.7 30 20.3 30 16Z" />
  </svg>
);

const ServiceCard = ({ service }: { service: Service }) => {
  const isSeo = service.title === "SEO";
  const shadowColor = service.color || "#168bff";

  return (
    <article
      className="service-card group rounded-2xl border border-accent/25 bg-[#061224]/55 p-5 transition-all duration-300 hover:-translate-y-1 hover:border-accent/70 hover:bg-[#081a32]"
      style={{ "--service-color": shadowColor } as CSSProperties}
    >
      <div
        className="service-icon flex h-14 w-14 items-center justify-center rounded-2xl border border-white/10 bg-white/[.035]"
        style={{ color: service.color }}
      >
        {isSeo ? (
          <FaChartLine className="h-8 w-8" aria-label="SEO growth" />
        ) : service.title === "Google Ads" ? (
          <GoogleLogo />
        ) : (
          <ServiceIcon name={service.icon} />
        )}
      </div>
      <h3 className="mt-5 text-sm font-bold text-white">{service.title}</h3>
      <p className="mt-2 text-xs leading-5 text-slate-400">{service.description}</p>
      <span className="mt-5 flex h-7 w-7 items-center justify-center rounded-full bg-accent/15 text-[10px] text-accent transition group-hover:translate-x-1">
        <FaArrowRight />
      </span>
    </article>
  );
};

export default ServiceCard;
