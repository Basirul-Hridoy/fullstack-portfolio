"use client";
import { AdminProfile } from "@/lib/admin/types";
import { motion } from "framer-motion";
import Link from "next/link";
import {
  FaArrowRight,
  FaBriefcase,
  FaChartLine,
  FaSearch,
  FaUsers,
} from "react-icons/fa";
import {
  SiGoogleads,
  SiGoogleanalytics,
  SiMeta,
  SiSemrush,
  SiShopify,
} from "react-icons/si";
import CampaignDashboard from "./campaign-dashboard";
import CountUp from "./count-up";

const heroStats = (profile: AdminProfile) => [
  { Icon: FaBriefcase, value: Number.parseInt(profile.stats.experience) || 0, suffix: profile.stats.experience.replace(/\d/g, ""), label: "Years Experience" },
  { Icon: FaChartLine, value: Number.parseInt(profile.stats.projects) || 0, suffix: profile.stats.projects.replace(/\d/g, ""), label: "Projects Completed" },
  { Icon: FaUsers, value: Number.parseInt(profile.stats.clients) || 0, suffix: profile.stats.clients.replace(/\d/g, ""), label: "Happy Clients" },
];

const trustedBrands = [
  { name: "Google Ads", Icon: SiGoogleads },
  { name: "Meta", Icon: SiMeta },
  { name: "shopify", Icon: SiShopify },
  { name: "SEO", Icon: FaSearch },
  { name: "Google Analytics", Icon: SiGoogleanalytics },
  { name: "SEMRUSH", Icon: SiSemrush },
];

const Banner = ({ profile, settings }: { profile: AdminProfile; settings: any }) => (
  <section
    id="home"
    className="wrapper relative flex min-h-[820px] items-center overflow-hidden md:overflow-visible pt-28 pb-44 md:min-h-[860px] md:pb-48"
  >
    <div className="hero-orb hero-orb-one" />
    <div className="hero-orb hero-orb-two" />
    <div className="grid w-full items-center gap-12 lg:grid-cols-[.95fr_1.05fr]">
      <motion.div
        initial={{ opacity: 0, x: -25 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.7 }}
      >
        <span className="eyebrow">
          <span className="status-dot" aria-hidden="true">
            <span />
          </span>
          {settings.hero_badge}
        </span>
        <h1 className="mt-5 text-5xl font-extrabold leading-[.98] tracking-[-.045em] text-white sm:text-6xl md:text-7xl">
          Hi, I’m
          <br />
          <span className="gradient-text">{profile.name}</span>
        </h1>
        <p className="mt-5 text-base font-semibold text-white sm:text-lg">
          {profile.designation}
        </p>
        <p className="mt-4 max-w-xl text-sm leading-6 text-slate-400 sm:text-base">
          {profile.bio}
        </p>
        <div className="mt-7 flex flex-wrap gap-3">
          <Link href="#services" className="gradient-button">
            {settings.hero_cta} <FaArrowRight />
          </Link>
          <Link href="#contact" className="outline-button">
            {settings.hero_secondary_cta}
          </Link>
        </div>
        <div className="mt-9 grid max-w-lg grid-cols-3 gap-4">
          {heroStats(profile).map(({ Icon, value, suffix, label }) => (
            <div key={label} className="flex items-center gap-2">
              <span className="stat-icon">
                <Icon />
              </span>
              <span>
                <b className="block text-sm text-white">
                  <CountUp value={value} suffix={suffix} />
                </b>
                <small className=" block text-[10px] text-slate-500">
                  {label}
                </small>
              </span>
            </div>
          ))}
        </div>
      </motion.div>
      <motion.div
        initial={{ opacity: 0, x: 25, scale: 0.98 }}
        animate={{ opacity: 1, x: 0, scale: 1 }}
        transition={{ duration: 0.8, delay: 0.1 }}
      >
        <div className="relative">
          <div className="hero-float-chip hero-float-chip-one">
            <span className="hero-chip-dot" /> Campaigns Active
          </div>
          <div className="hero-float-chip hero-float-chip-two">
            ↗ <span>Growth Focused</span>
          </div>
          <CampaignDashboard />
        </div>
      </motion.div>
    </div>

    <div
      className="hero-trust-strip"
      aria-label="Platforms and tools I work with"
    >
      <div className="hero-trust-label">
        <span className="hero-trust-pulse" aria-hidden="true"><span /></span>
        <span>{settings.trust_label}</span>
        <span className="hero-trust-pulse" aria-hidden="true"><span /></span>
      </div>
      <div className="hero-trust-logos">
        {trustedBrands.map(({ name, Icon }) => (
          <span key={name} className="hero-brand-logo">
            <Icon aria-hidden="true" />
            <span>{name}</span>
          </span>
        ))}
      </div>
    </div>
  </section>
);
export default Banner;
