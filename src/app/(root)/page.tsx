import About from "./components/about/about";
import Banner from "./components/banner/banner";
import CaseStudies from "./components/case-studies/case-studies";
import Certificates from "./components/certificates/certificates";
import Contact from "./components/contact/contact";
import Footer from "./components/footer";
import Process from "./components/process/process";
import Reviews from "./components/reviews/reviews";
import Services from "./components/services/services";
import { getCaseStudies, getCertificates, getProcessSteps, getProfile, getReviews, getServices, getSiteSettings } from "@/lib/content";

const HomePage = async () => {
  const [profile, services, certificates, processSteps, caseStudies, reviews, settings] = await Promise.all([getProfile(), getServices(), getCertificates(), getProcessSteps(), getCaseStudies(), getReviews(), getSiteSettings()]);
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL;

  const personSchema = {
    "@context": "https://schema.org",
    "@type": "Person",
    name: profile.name,
    jobTitle: profile.designation,
    description: profile.bio,
    ...(siteUrl ? { url: siteUrl } : {}),
    sameAs: [profile.facebook, profile.instagram, profile.twitter, profile.linkedin].filter(Boolean),
  };

  return <div className="home-wrapper">
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(personSchema) }}
    />
    <Banner profile={profile} settings={settings} />
    <div data-reveal className="reveal-section"><Services services={services} /></div>
    <div data-reveal className="reveal-section"><About profile={profile} /></div>
    <div data-reveal className="reveal-section"><Certificates certificates={certificates} /></div>
    <div data-reveal className="reveal-section"><Process steps={processSteps} /></div>
    <div data-reveal className="reveal-section"><CaseStudies caseStudies={caseStudies} /></div>
    <div data-reveal className="reveal-section"><Reviews reviews={reviews} /></div>
    <div data-reveal className="reveal-section"><Contact profile={profile} services={services} /></div>
    <Footer profile={profile} settings={settings} />
  </div>;
};
export default HomePage;
