"use client";

import { useEffect } from "react";

export function UmamiClickEvents() {
  useEffect(() => {
    const handleClick = (e: MouseEvent) => {
      const target = (e.target as HTMLElement).closest("[data-umami-click]");
      if (target) {
        const eventName = target.getAttribute("data-umami-click");
        if (eventName && typeof window !== "undefined" && (window as any).umami) {
          (window as any).umami.track("clicked: " + eventName);
        }
      }
    };

    document.addEventListener("click", handleClick);
    return () => document.removeEventListener("click", handleClick);
  }, []);

  return null;
}