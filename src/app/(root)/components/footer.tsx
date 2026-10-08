import { AdminProfile } from "@/lib/admin/types";
import Link from "next/link";
import {
  FaFacebookF,
  FaInstagram,
  FaLinkedinIn,
  FaTwitter,
} from "react-icons/fa";
const Footer = ({ profile, settings }: { profile: AdminProfile; settings?: any }) => (
  <footer className="border-t border-white/10 py-8">
    <div className="flex flex-col gap-5 md:flex-row items-center md:justify-between">
      <Link
        href="/#home"
        className="flex items-center gap-2 text-sm font-bold text-white"
      >
        <span className="brand-mark">↗</span>{profile.name}
      </Link>
      <div className="flex flex-wrap gap-4 lg:text-[12px] text-[10px] text-slate-400">
        {[
          "Home",
          "About",
          "Services",
          "Case Studies",
          "Reviews",
          "Contact",
        ].map((x) => (
          <Link
            key={x}
            href={`/#${x.toLowerCase().replaceAll(" ", "-")}`}
            className="hover:text-white"
          >
            {x}
          </Link>
        ))}
      </div>
      {/* Keep all social URLs in src/constant/info.ts so they are easy to update. */}
      <div className="flex gap-2">
        {[
          { label: "LinkedIn", href: profile.linkedin, icon: <FaLinkedinIn /> },
          { label: "Instagram", href: profile.instagram, icon: <FaInstagram /> },
          { label: "Facebook", href: profile.facebook, icon: <FaFacebookF /> },
          { label: "Twitter / X", href: profile.twitter, icon: <FaTwitter /> },
        ].map((social) => (
          <a
            key={social.label}
            href={social.href || "#"}
            target={social.href ? "_blank" : undefined}
            rel={social.href ? "noreferrer" : undefined}
            aria-label={social.label}
            title={social.href ? social.label : `Add your ${social.label} URL in src/constant/info.ts`}
            className="social-icon"
          >
            {social.icon}
          </a>
        ))}
      </div>
    </div>
    <div className="mt-6 flex flex-col justify-between items-center gap-2 border-t border-white/5 pt-5 text-[10px] text-slate-500 sm:flex-row">
      <span>{settings?.footer_tagline || "More Traffic • More Leads • More Sales"}</span>
      <span>© 2026 {profile.name}. All rights reserved.</span>
    </div>
  </footer>
);
export default Footer;
