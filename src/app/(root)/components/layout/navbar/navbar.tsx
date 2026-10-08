"use client";
import { AdminProfile } from "@/lib/admin/types";
import Image from "next/image";
import Link from "next/link";
import { FC, useEffect, useState } from "react";
import { IoClose, IoMenu } from "react-icons/io5";
import MobileNav from "./mobile-nav";

const navigation = [
  { path: "home", name: "Home" },
  { path: "about", name: "About" },
  { path: "services", name: "Services" },
  { path: "certificates", name: "Certificates" },
  { path: "case-studies", name: "Case Studies" },
  { path: "reviews", name: "Reviews" },
  { path: "contact", name: "Contact" },
];

const Navbar: FC<{ profile: AdminProfile }> = ({ profile }) => {
  const [isOpen, setIsOpen] = useState(false);
  useEffect(() => {
    document.body.style.overflow = isOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [isOpen]);

  useEffect(() => {
    if (!isOpen) return;

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") setIsOpen(false);
    };

    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [isOpen]);

  return (
    <header className="fixed left-0 top-0 z-[100] w-full px-4 py-3 md:px-6">
      <div className="mx-auto flex max-w-6xl items-center justify-between rounded-full border border-white/10 bg-[#030b18]/75 px-3 py-2 shadow-[0_10px_50px_rgba(0,0,0,.3)] backdrop-blur-xl">
        <Link
          href="/#home"
          className="flex items-center gap-2 px-2 text-sm font-bold text-white"
        >
          <Image
            src={profile.profile_image}
            alt={profile.name}
            width={24}
            height={24}
            className="h-8 w-8 rounded-full object-cover"
           
            priority
          />
          <span>{profile.name}</span>
        </Link>
        <nav className="hidden items-center gap-1 md:flex">
          {navigation.map((item) => (
            <Link
              key={item.path}
              href={`/#${item.path}`}
              className="nav-link rounded-full px-3 py-2 text-xs font-medium text-slate-300 transition hover:bg-accent/10 hover:text-white"
            >
              {item.name}
            </Link>
          ))}
        </nav>
        <Link
          href="/#contact"
          className="hidden rounded-full bg-gradient-to-r from-accent to-[#7357ff] px-4 py-2 text-xs font-semibold text-white shadow-[0_8px_30px_rgba(0,132,255,.22)] transition hover:-translate-y-0.5 md:block"
        >
          Let's Talk →
        </Link>
        <button
          aria-label="Toggle menu"
          className="relative z-[80] rounded-full border border-white/10 p-2 text-white md:hidden"
          onClick={() => setIsOpen(!isOpen)}
        >
          {isOpen ? <IoClose /> : <IoMenu />}
        </button>
      </div>
      <MobileNav navLinks={navigation} isOpen={isOpen} setIsOpen={setIsOpen} />
    </header>
  );
};
export default Navbar;
