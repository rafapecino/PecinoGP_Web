"use client";

import type { AnchorHTMLAttributes } from "react";
import { trackEvent, type AnalyticsEvent } from "@/lib/analytics";

type TrackedLinkProps = AnchorHTMLAttributes<HTMLAnchorElement> & {
  event: AnalyticsEvent;
  eventParams?: Record<string, string | number | boolean | undefined>;
};

/**
 * <a> normal que además manda un evento a GA4 al hacer clic.
 * Existe para poder medir CTAs que viven en páginas de servidor
 * (la de membresía, por ejemplo) sin convertirlas en client components.
 */
export function TrackedLink({
  event,
  eventParams,
  onClick,
  children,
  ...props
}: TrackedLinkProps) {
  return (
    <a
      {...props}
      onClick={(e) => {
        trackEvent(event, eventParams);
        onClick?.(e);
      }}
    >
      {children}
    </a>
  );
}
