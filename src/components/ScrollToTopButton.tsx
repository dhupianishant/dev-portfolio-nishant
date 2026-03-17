import { useEffect, useMemo, useRef, useState } from "react";
import {
  AnimatePresence,
  motion,
  useMotionValue,
  useReducedMotion,
  useSpring,
} from "framer-motion";
import { ArrowUp } from "lucide-react";

export default function ScrollToTopButton() {
  const [visible, setVisible] = useState(false);
  const [isLaunching, setIsLaunching] = useState(false);
  const prefersReducedMotion = useReducedMotion();
  const buttonRef = useRef<HTMLButtonElement | null>(null);
  const launchTimerRef = useRef<number | null>(null);

  useEffect(() => {
    if (typeof window === "undefined") return;

    const onScroll = () => {
      if (isLaunching) return;
      setVisible(window.scrollY > 600);
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();

    return () => window.removeEventListener("scroll", onScroll);
  }, [isLaunching]);

  useEffect(() => {
    return () => {
      if (launchTimerRef.current) window.clearTimeout(launchTimerRef.current);
    };
  }, []);

  const scrollToTop = () => {
    const prefersReduced =
      window.matchMedia?.("(prefers-reduced-motion: reduce)")?.matches ?? false;
    window.scrollTo({ top: 0, behavior: prefersReduced ? "auto" : "smooth" });
  };

  // Magnetic hover (subtle)
  const rawX = useMotionValue(0);
  const rawY = useMotionValue(0);
  const x = useSpring(rawX, { stiffness: 420, damping: 28, mass: 0.25 });
  const y = useSpring(rawY, { stiffness: 420, damping: 28, mass: 0.25 });

  const magneticMax = 8;

  const baseButtonStyle = useMemo(
    () => ({
      background: "linear-gradient(135deg, hsl(239 84% 67%), hsl(270 75% 60%))",
    }),
    [],
  );

  const onPointerMove: React.PointerEventHandler<HTMLButtonElement> = (e) => {
    if (prefersReducedMotion || isLaunching) return;
    const el = buttonRef.current;
    if (!el) return;

    const rect = el.getBoundingClientRect();
    const cx = rect.left + rect.width / 2;
    const cy = rect.top + rect.height / 2;
    const dx = e.clientX - cx;
    const dy = e.clientY - cy;

    const dist = Math.hypot(dx, dy) || 1;
    const maxDist = rect.width * 0.9;
    const strength = Math.min(1, dist / maxDist);

    rawX.set((dx / dist) * magneticMax * strength);
    rawY.set((dy / dist) * magneticMax * strength);
  };

  const onPointerLeave: React.PointerEventHandler<HTMLButtonElement> = () => {
    rawX.set(0);
    rawY.set(0);
  };

  const onClick: React.MouseEventHandler<HTMLButtonElement> = () => {
    if (isLaunching) return;

    // Start scrolling immediately.
    scrollToTop();

    if (prefersReducedMotion) return;

    setIsLaunching(true);
    rawX.set(0);
    rawY.set(0);

    // Let the launch animation play, then hand back to normal visibility logic.
    launchTimerRef.current = window.setTimeout(() => {
      setIsLaunching(false);
      setVisible(window.scrollY > 600);
      launchTimerRef.current = null;
    }, 420);
  };

  return (
    <AnimatePresence>
      {(visible || isLaunching) && (
        <motion.button
          ref={buttonRef}
          type="button"
          aria-label="Scroll to top"
          onClick={onClick}
          onPointerMove={onPointerMove}
          onPointerLeave={onPointerLeave}
          initial={{ opacity: 0, scale: 0.92, y: 8 }}
          animate={
            isLaunching
              ? { opacity: 0, scale: 1.06, y: -220 }
              : { opacity: 1, scale: 1, y: 0 }
          }
          exit={{ opacity: 0, scale: 0.94, y: 8 }}
          transition={
            isLaunching
              ? { duration: 0.42, ease: [0.22, 1, 0.36, 1] }
              : { duration: 0.18 }
          }
          className="fixed bottom-6 right-6 z-[60] h-12 w-12 rounded-full flex items-center justify-center glow-primary shadow-lg outline-none"
          style={{
            ...baseButtonStyle,
            x: prefersReducedMotion ? 0 : x,
            y: prefersReducedMotion ? 0 : y,
          }}
          whileHover={prefersReducedMotion || isLaunching ? undefined : { scale: 1.05 }}
          whileTap={{ scale: 0.96 }}
        >
          {/* Rocket trail */}
          <AnimatePresence>
            {isLaunching && !prefersReducedMotion && (
              <motion.span
                aria-hidden="true"
                className="absolute left-1/2 bottom-0 -translate-x-1/2 w-3 rounded-full"
                style={{
                  background: "linear-gradient(180deg, hsl(239 84% 67%), hsl(270 75% 60%))",
                  filter: "blur(0px)",
                  boxShadow:
                    "0 0 26px hsl(239 84% 67% / 0.35), 0 0 30px hsl(270 75% 60% / 0.25)",
                }}
                initial={{ height: 0, opacity: 0.0 }}
                animate={{ height: 110, opacity: 0.9 }}
                exit={{ height: 0, opacity: 0 }}
                transition={{ duration: 0.22, ease: [0.22, 1, 0.36, 1] }}
              />
            )}
          </AnimatePresence>

          <ArrowUp className="relative z-10 h-5 w-5 text-white" />
        </motion.button>
      )}
    </AnimatePresence>
  );
}

