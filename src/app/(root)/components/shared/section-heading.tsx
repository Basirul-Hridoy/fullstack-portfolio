import { FC, ReactNode } from "react";

type Props = {
  eyebrow?: string;
  title: ReactNode;
  description?: string;
  align?: "left" | "center";
};

const SectionHeading: FC<Props> = ({
  eyebrow,
  title,
  description,
  align = "left",
}) => (
  <div
    className={`${align === "center" ? "mx-auto text-center" : ""} max-w-2xl`}
  >
    {eyebrow && (
      <div className="mb-3 inline-flex items-center gap-2 rounded-full border border-accent/40 bg-accent/5 px-3 py-1 text-[10px] font-semibold uppercase tracking-[0.18em] text-accent">
        {eyebrow}
      </div>
    )}
    <h2 className="text-2xl font-bold tracking-tight text-white sm:text-3xl md:text-4xl">
      {title}
    </h2>
    {description && (
      <p className="mt-3 text-sm leading-6 text-muted md:text-base">
        {description}
      </p>
    )}
  </div>
);

export default SectionHeading;
