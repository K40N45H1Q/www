"use client";

import type { ReactNode } from "react";

type ExploreServicesButtonProps = {
  className?: string;
  children: ReactNode;
};

const SCROLL_DURATION_MS = 1000;
let activeAnimationFrame: number | null = null;

function easeInOutCubic(progress: number) {
  return progress < 0.5
    ? 4 * progress * progress * progress
    : 1 - Math.pow(-2 * progress + 2, 3) / 2;
}

export default function ExploreServicesButton({
  className,
  children,
}: ExploreServicesButtonProps) {
  function handleClick() {
    const target = document.getElementById("services");
    const scroller = document.scrollingElement;

    if (!target || !scroller) {
      return;
    }

    if (activeAnimationFrame !== null) {
      window.cancelAnimationFrame(activeAnimationFrame);
      activeAnimationFrame = null;
    }

    const pageScroller = scroller;
    const header = document.querySelector("header");
    const headerHeight = header?.getBoundingClientRect().height ?? 0;
    const rawTargetTop =
      target.getBoundingClientRect().top + window.scrollY - headerHeight;
    const maxScrollTop = pageScroller.scrollHeight - window.innerHeight;
    const targetTop = Math.max(0, Math.min(rawTargetTop, maxScrollTop));

    window.history.replaceState(
      null,
      "",
      `${window.location.pathname}${window.location.search}`,
    );

    const root = document.documentElement;
    const body = document.body;
    const previousScrollBehavior = root.style.scrollBehavior;
    const previousBodyScrollBehavior = body.style.scrollBehavior;

    root.style.scrollBehavior = "auto";
    body.style.scrollBehavior = "auto";

    const startTop = pageScroller.scrollTop;
    const distance = targetTop - startTop;
    const startTime = performance.now();

    if (Math.abs(distance) < 1) {
      root.style.scrollBehavior = previousScrollBehavior;
      body.style.scrollBehavior = previousBodyScrollBehavior;
      return;
    }

    function step(currentTime: number) {
      const elapsed = currentTime - startTime;
      const progress = Math.min(elapsed / SCROLL_DURATION_MS, 1);
      const nextTop = startTop + distance * easeInOutCubic(progress);

      pageScroller.scrollTop = nextTop;

      if (progress < 1) {
        activeAnimationFrame = window.requestAnimationFrame(step);
        return;
      }

      pageScroller.scrollTop = targetTop;
      activeAnimationFrame = null;
      root.style.scrollBehavior = previousScrollBehavior;
      body.style.scrollBehavior = previousBodyScrollBehavior;
    }

    activeAnimationFrame = window.requestAnimationFrame(step);
  }

  return (
    <button type="button" className={className} onClick={handleClick}>
      {children}
    </button>
  );
}
