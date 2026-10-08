"use client";
import { usePresence } from "framer-motion";
import { FC, useEffect, useState } from "react";

const TypeWriter: FC<{ text: string; speed?: number; delay?: number }> = ({
  text,
  speed,
}) => {
  const [displayedText, setDisplayedText] = useState("");
  const [isPresent] = usePresence();

  useEffect(() => {
    if (isPresent) {
      let currentIndex = 0;
      const interval = setInterval(() => {
        if (currentIndex <= text.length) {
          setDisplayedText(text.slice(0, currentIndex));
          currentIndex++;
        } else {
          clearInterval(interval);
        }
      }, speed || 50);

      return () => clearInterval(interval);
    }
  }, [text, isPresent]);

  return <span>{displayedText}</span>;
};

export default TypeWriter;
