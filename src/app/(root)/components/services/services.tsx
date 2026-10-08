import { Service } from "@/constant/services";
import SectionHeading from "../shared/section-heading";
import ServiceCard from "./service-card";

const Services = ({ services }: { services: Service[] }) => (
  <section id="services" className="section-divider py-20">
    <SectionHeading
      eyebrow="What I Offer"
      title={
        <>
          Digital Marketing <span className="gradient-text">Services</span>
        </>
      }
      description="End-to-end digital marketing solutions designed to improve visibility, attract the right audience, and generate measurable growth."
    />
    <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
      {services.map((service) => (
        <ServiceCard key={service.title} service={service} />
      ))}
    </div>
  </section>
);
export default Services;
