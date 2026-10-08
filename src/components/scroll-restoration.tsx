"use client";

import { useEffect } from "react";

const ScrollRestoration = () => {
  useEffect(() => {
    if ("scrollRestoration" in window.history) {
      window.history.scrollRestoration = "auto";
    }
  }, []);

  return null;
};

export default ScrollRestoration;
