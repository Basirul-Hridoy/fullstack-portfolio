import Link from "next/link";
import { FaArrowRight } from "react-icons/fa";
import SectionHeading from "../shared/section-heading";
import CaseStudyCard from "./case-study-card";
import { CaseStudy } from "@/constant/case-studies";
import { CaseStudyTabs } from "./case-study-tabs";

const CaseStudies = ({ caseStudies }: { caseStudies: CaseStudy[] }) => {
  const featured = caseStudies.slice(0, 3);

  return (
    <section id="case-studies" className="section-divider py-20">
      <div className="flex flex-col gap-5 lg:flex-row lg:items-end lg:justify-between">
        <SectionHeading
          eyebrow="My Proven Case Studies"
          title={<>Real Results. <span className="gradient-text">Happy Clients.</span></>}
          description="A curated look at campaign strategy, execution, and measurable performance improvements."
        />
        <Link href="/case-studies" className="case-studies-view-link self-start lg:self-auto">
          View All Projects <FaArrowRight className="ml-2 text-[10px]" />
        </Link>
      </div>

      <div className="mt-7">
        <CaseStudyTabs active={null} homeMode />
      </div>

      <div className="mt-7 grid gap-5 md:grid-cols-2 lg:grid-cols-3">
        {featured.map((study) => <CaseStudyCard key={study.id} study={study} />)}
      </div>
    </section>
  );
};

export default CaseStudies;
