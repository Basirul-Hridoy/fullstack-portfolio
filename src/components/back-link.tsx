"use client";

import { useRouter } from "next/navigation";
import { ReactNode } from "react";

type Props = {
  fallbackHref: string;
  children: ReactNode;
  className?: string;
};

export default function BackLink({ fallbackHref, children, className = "" }: Props) {
  const router = useRouter();

  const goBack = () => {
    if (window.history.length > 1) {
      router.back();
      return;
    }
    router.push(fallbackHref);
  };

  return (
    <button type="button" onClick={goBack} className={className}>
      {children}
    </button>
  );
}
