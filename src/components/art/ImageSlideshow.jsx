import { useEffect, useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { cn } from "../../utils/cn";

// Crossfading photo slideshow. Pauses on hover/focus, never auto-plays for people who
// prefer reduced motion, and drops any photo that fails to load.
// Returns null when no photo is left, so the caller can show a fallback.
export default function ImageSlideshow({
  images,
  interval = 5000,
  radius = "rounded-3xl",
  shadow = "shadow-lift",
  className,
  onEmpty,
}) {
  const reduced = useReducedMotion();
  const [broken, setBroken] = useState([]);
  const [index, setIndex] = useState(0);
  const [paused, setPaused] = useState(false);

  const slides = images.filter((s) => !broken.includes(s.src));
  const current = slides[index % Math.max(slides.length, 1)];

  useEffect(() => {
    if (slides.length === 0) onEmpty?.();
  }, [slides.length, onEmpty]);

  useEffect(() => {
    if (reduced || paused || slides.length < 2) return undefined;
    const timer = setInterval(() => setIndex((i) => (i + 1) % slides.length), interval);
    return () => clearInterval(timer);
  }, [reduced, paused, slides.length, interval]);

  if (!current) return null;

  return (
    <div
      className={cn("relative aspect-[4/3] overflow-hidden bg-navy-900", radius, shadow, className)}
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
      onFocus={() => setPaused(true)}
      onBlur={() => setPaused(false)}
    >
      <AnimatePresence mode="sync" initial={false}>
        <motion.img
          key={current.src}
          src={current.src}
          alt={current.alt}
          loading="lazy"
          initial={{ opacity: 0, scale: 1.04 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.9 }}
          onError={() => setBroken((b) => [...b, current.src])}
          className="absolute inset-0 h-full w-full object-cover saturate-[.85]"
        />
      </AnimatePresence>

      {/* one consistent navy tint over every photo */}
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-navy-950/45 via-navy-900/5 to-navy-900/10" />

      {slides.length > 1 && (
        <div className="absolute bottom-3 left-1/2 flex -translate-x-1/2 gap-1.5" role="tablist" aria-label="Photo slides">
          {slides.map((s, i) => (
            <button
              key={s.src}
              type="button"
              role="tab"
              aria-selected={i === index % slides.length}
              aria-label={`Show photo ${i + 1}`}
              onClick={() => setIndex(i)}
              className={cn(
                "h-1.5 rounded-full transition-all",
                i === index % slides.length ? "w-5 bg-brass-300" : "w-1.5 bg-white/60 hover:bg-white"
              )}
            />
          ))}
        </div>
      )}
    </div>
  );
}
