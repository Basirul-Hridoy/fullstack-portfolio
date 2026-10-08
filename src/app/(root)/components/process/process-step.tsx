import { FaArrowRight } from "react-icons/fa";

export const ProcessStep = ({ number, title, description, last }: { number: string; title: string; description: string; last?: boolean }) => (
  <div className="relative">
    <div className="soft-card group h-full">
      <span className="mb-3 inline-flex h-7 w-7 items-center justify-center rounded-lg bg-accent/15 text-[10px] font-bold text-accent">{number}</span>
      <h3 className="text-xs font-bold text-white">{title}</h3>
      <p className="mt-2 text-[10px] leading-5 text-slate-500">{description}</p>
    </div>
    {!last && <FaArrowRight className="process-arrow absolute -right-2 top-1/2 hidden -translate-y-1/2 text-accent md:block" />}
  </div>
);
