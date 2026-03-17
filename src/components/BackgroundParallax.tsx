import { useEffect } from "react";

export default function BackgroundParallax() {
  useEffect(() => {
    if (typeof window === "undefined") return;

    const prefersReduced =
      window.matchMedia?.("(prefers-reduced-motion: reduce)")?.matches ?? false;
    if (prefersReduced) return;

    let raf = 0;

    const update = () => {
      raf = 0;
      const y = window.scrollY || 0;

      const parallaxY = Math.max(-80, Math.min(0, -y * 0.06));
      const parallaxX = Math.sin(y * 0.002) * 10;

      document.body.style.setProperty("--bg-parallax-y", `${parallaxY}px`);
      document.body.style.setProperty("--bg-parallax-x", `${parallaxX}px`);
    };

    const onScroll = () => {
      if (raf) return;
      raf = window.requestAnimationFrame(update);
    };

    update();
    window.addEventListener("scroll", onScroll, { passive: true });

    return () => {
      if (raf) window.cancelAnimationFrame(raf);
      window.removeEventListener("scroll", onScroll);
    };
  }, []);

  return null;
}

