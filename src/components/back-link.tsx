"use client";

import { usePathname, useRouter } from "next/navigation";
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
  const pathname = usePathname();

  const goBack = () => {
    // Return to the correct homepage section based on the current detail page.
    if (pathname.startsWith("/case-studies")) {
      router.push("/#case-studies");
      return;
    }

    if (pathname.startsWith("/reviews")) {
      router.push("/#reviews");
      return;
    }

    if (pathname.startsWith("/certificates")) {
      router.push("/#certificates");
      return;
    }

    // Fallback for any other detail page.
    router.push(fallbackHref);
  };

  return (
    <button type="button" onClick={goBack} className={className}>
      {children}
    </button>
  );
}
