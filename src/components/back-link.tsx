"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { ReactNode } from "react";

type Props = {
  fallbackHref: string;
  children: ReactNode;
  className?: string;
};

export default function BackLink({
  fallbackHref,
  children,
  className = "",
}: Props) {
  const router = useRouter();
  const searchParams = useSearchParams();

  const goBack = () => {
    const from = searchParams.get("from");

    if (from) {
      router.push(`/#${from}`);
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
