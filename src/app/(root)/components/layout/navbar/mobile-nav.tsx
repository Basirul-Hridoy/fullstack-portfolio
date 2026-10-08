"use client";

import Link from "next/link";
import { Dispatch, FC, SetStateAction } from "react";
import { AnimatePresence, motion } from "framer-motion";


type Props = {
  navLinks: { path: string; name: string }[];
  isOpen: boolean;
  setIsOpen: Dispatch<SetStateAction<boolean>>;
};

const MobileNav: FC<Props> = ({ navLinks, isOpen, setIsOpen }) => (
  <AnimatePresence>
    {isOpen && (
      <motion.div
        className="fixed inset-0 z-[60] md:hidden"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.18, ease: "easeOut" }}
        aria-label="Mobile navigation"
      >
        {/* Click/tap anywhere outside the menu to close it. */}
        <button
          type="button"
          aria-label="Close menu"
          className="absolute inset-0 cursor-default bg-black/45 backdrop-blur-[4px]"
          onClick={() => setIsOpen(false)}
        />

        <motion.nav
          initial={{ opacity: 0, y: -8, scale: 0.98 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: -8, scale: 0.98 }}
          transition={{ duration: 0.2, ease: "easeOut" }}
          className="absolute left-4 right-4 top-[72px] z-[70] rounded-2xl border border-accent/25 bg-[#030b18]/95 p-3 shadow-[0_20px_70px_rgba(0,0,0,.55)] backdrop-blur-xl"
        >
          {navLinks.map((item) => (
            <Link
              key={item.path}
              href={`#${item.path}`}
              onClick={() => setIsOpen(false)}
              className="block rounded-xl px-4 py-3 text-sm font-medium text-slate-300 transition-colors hover:bg-accent/10 hover:text-white"
            >
              {item.name}
            </Link>
          ))}
        </motion.nav>
      </motion.div>
    )}
  </AnimatePresence>
);

export default MobileNav;
