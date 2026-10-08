import { AdminProfile } from "@/lib/admin/types";
import Image from "next/image";
import {
  FaArrowRight,
  FaBullseye,
  FaChartLine,
  FaDownload,
  FaMapMarkerAlt,
  FaUserCheck,
} from "react-icons/fa";
import aboutImage from "../../../../../public/images/profile/about img.png";
import CountUp from "../banner/count-up";

const About = ({ profile }: { profile: AdminProfile }) => (
  <section id="about" className="section-divider py-20 overflow-hidden">
    <div className="about-layout">
      <div className="about-visual">
        <div className="">
          <div className="about-photo-glow" />
          <Image
            src={profile.about_image || aboutImage}
            alt={profile.name}
            fill
            className="object-cover object-center rounded-md"
           
            sizes="(max-width: 1024px) 80vw, 480px"
          />
        </div>
        {/* <div className="about-hand-note">
          Always
          <br />
          Learning.
          <br />
          Always
          <br />
          Growing
        </div> */}
      </div>

      <div className="about-content">
        <div className="eyebrow">About Me</div>
        <h2 className="mt-5 text-3xl font-extrabold tracking-[-.04em] text-white sm:text-4xl">
          Turning Clicks Into <span className="gradient-text">Customers</span>
        </h2>
        <p className="mt-4 max-w-2xl text-sm leading-6 text-slate-400 sm:text-base">
          {profile.about_text}
        </p>

        <div className="mt-7 grid gap-3 sm:grid-cols-3">
          {[
            [FaChartLine, "Data-Driven Strategy"],
            [FaBullseye, "Performance Focused"],
            [FaUserCheck, "Client-Centered"],
          ].map(([Icon, label]) => {
            const I = Icon as any;
            return (
              <div key={label as string} className="about-value-card">
                <span className="about-value-icon">
                  <I />
                </span>
                <span>{label as string}</span>
              </div>
            );
          })}
        </div>

        <div className="mt-6 flex flex-wrap items-center gap-4">
          <a
            href={profile.resume_url}
            target="_blank"
            rel="noopener noreferrer"
            className="gradient-button"
          >
            <FaDownload /> Download My Resume{" "}
            <FaArrowRight className="text-[10px]" />
          </a>
          <div className="about-location-card relative">
            <FaMapMarkerAlt className="text-accent" />
            <div>
              <span className="label text-white">Based in</span>
              <b>{profile.location}</b>
            </div>
            <div className="absolute right-2 top-1/2 -translate-y-1/2">
              <Image
                src="/images/bd-flag/images.png"
                alt="Bangladesh Flag"
                width={35}
                height={35}
              />
            </div>
          </div>
        </div>
      </div>
    </div>

    <div className="about-impact">
      <div>
        <div className="eyebrow">My Impact</div>
        <h3 className="mt-3 text-2xl font-extrabold text-white sm:text-3xl">
          Numbers That{" "}
          <span className="gradient-text">Speak for Themselves</span>
        </h3>
        <p className="mt-3 text-sm text-slate-400">
          Real results. Happy clients. Continuous growth.
        </p>
      </div>
      <div className="about-impact-stats">
        {(profile.impact_stats || []).map(({ value, suffix, label }) => (
          <div key={label} className="about-impact-stat">
            <strong>
              <CountUp value={Number(value)} suffix={String(suffix)} />
            </strong>
            <span>{label}</span>
          </div>
        ))}
      </div>
    </div>
  </section>
);
export default About;
