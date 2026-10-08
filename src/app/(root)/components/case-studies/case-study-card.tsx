import { CaseStudy } from "@/constant/case-studies";
import Link from "next/link";
import Image from "next/image";
import {
  FaExternalLinkAlt,
  FaFacebookF,
  FaGoogle,
  FaInstagram,
  FaSearch,
  FaYoutube,
} from "react-icons/fa";

const iconMap: Record<CaseStudy["visual"], any> = {
  google: FaGoogle,
  meta: FaFacebookF,
  seo: FaSearch,
  social: FaInstagram,
  youtube: FaYoutube,
};
const colorMap: Record<CaseStudy["visual"], string> = {
  google: "from-blue-500/25 to-cyan-500/5",
  meta: "from-violet-500/25 to-blue-500/5",
  seo: "from-emerald-500/20 to-blue-500/5",
  social: "from-pink-500/20 to-violet-500/5",
  youtube: "from-red-500/20 to-blue-500/5",
};

const CaseStudyCard = ({ study }: { study: CaseStudy }) => {
  const Icon = iconMap[study.visual];
  return (
    <Link href={`/case-studies/${study.id}`} className="group block overflow-hidden rounded-2xl border border-accent/25 bg-[#061224]/60 transition hover:-translate-y-1 hover:border-accent/70 hover:shadow-[0_22px_60px_rgba(0,132,255,.12)]">
      <div className={`relative h-36 overflow-hidden bg-gradient-to-br ${colorMap[study.visual]}`}>
        {study.cardImage ? (
          <Image
            src={study.cardImage}
            alt={`${study.title} case study`}
            fill
            sizes="(max-width: 767px) calc(100vw - 48px), (max-width: 1023px) 50vw, 33vw"
            className="object-cover transition duration-500 group-hover:scale-[1.03]"
           
          />
        ) : (
          <div className="absolute inset-4 rounded-xl border border-white/10 bg-[#08111f]/80 p-3 shadow-2xl">
            <div className="flex items-center justify-between">
              <span className="flex items-center gap-1.5 text-[9px] font-semibold text-slate-300">
                <Icon className="text-accent" />
                {study.category}
              </span>
              <span className="h-2 w-2 rounded-full bg-emerald-400 shadow-[0_0_10px_rgba(52,211,153,.8)]" />
            </div>
            <div className="mt-5 h-1.5 w-2/3 rounded-full bg-white/10" />
            <div className="mt-3 flex items-end gap-1">
              <span className="h-8 w-1/6 rounded-t bg-accent/30" />
              <span className="h-12 w-1/6 rounded-t bg-accent/40" />
              <span className="h-9 w-1/6 rounded-t bg-accent/50" />
              <span className="h-16 w-1/6 rounded-t bg-[#7658ff]/60" />
              <span className="h-20 w-1/6 rounded-t bg-[#7658ff]" />
            </div>
          </div>
        )}
        {study.cardImage && <div className="absolute inset-0 bg-gradient-to-t from-black/55 via-transparent to-transparent" />}
      </div>
      <div className="p-4">
        <div className="flex items-start justify-between gap-3">
          <div>
            <h3 className="text-sm font-bold text-white">{study.title}</h3>
            <p className="mt-2 text-[10px] leading-5 text-slate-500">
              {study.description}
            </p>
          </div>
          <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full border border-accent/30 text-[10px] text-accent">
            <FaExternalLinkAlt />
          </span>
        </div>
        <div className="mt-4 grid grid-cols-3 border-t border-white/10 pt-3">
          {study.metrics.map((metric) => (
            <div key={metric.label}>
              <strong className="block text-sm text-cyan-300">
                {metric.value}
              </strong>
              <span className="text-[8px] text-slate-500">{metric.label}</span>
            </div>
          ))}
        </div>
      </div>
    </Link>
  );
};
export default CaseStudyCard;
