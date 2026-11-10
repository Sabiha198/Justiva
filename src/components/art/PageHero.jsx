import { motion } from "framer-motion";
import MediaPanel from "./MediaPanel";
import HeroBackdrop from "./HeroBackdrop";

// Hero used across the site.
//   variant="split"    text on the left, illustration on the right (light page)
//   variant="animated" dark hero with an animated SVG backdrop + illustration
//   variant="inline"   compact header for pages that already sit inside a container
// Pass media={pageMedia.x} (see data/media.js) to show a video / photo slideshow instead of the illustration.
export default function PageHero({
  variant = "split",
  title,
  subtitle,
  art = "scales",
  media,
  badge,
  leading,
  backdrop = "rings",
  children,
}) {
  if (variant === "inline") {
    return (
      <div className="grid items-center gap-6 sm:grid-cols-[1fr_auto]">
        <div className="max-w-xl">
          {leading}
          <h2 className="font-display text-2xl font-semibold text-ink">{title}</h2>
          {subtitle && <p className="mt-1.5 text-sm text-slate-500">{subtitle}</p>}
          {children}
        </div>
        <motion.div
          initial={{ opacity: 0, scale: 0.94 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5 }}
          className="hidden w-44 sm:block lg:w-52"
        >
          <MediaPanel media={media} art={art} radius="rounded-2xl" shadow="shadow-card" />
        </motion.div>
      </div>
    );
  }

  const dark = variant === "animated";

  return (
    <section className={dark ? "relative overflow-hidden bg-navy-950 text-white" : "relative overflow-hidden"}>
      {dark ? (
        <HeroBackdrop variant={backdrop} />
      ) : (
        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,rgba(184,134,46,0.10),transparent_55%)]" />
      )}

      <div className="container-page relative grid items-center gap-10 py-14 sm:py-16 lg:grid-cols-[1.1fr_0.9fr] lg:py-20">
        <motion.div initial={{ opacity: 0, y: 14 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
          {badge}
          <h1
            className={`text-balance font-display text-4xl font-semibold leading-[1.1] sm:text-5xl ${
              badge ? "mt-5" : ""
            } ${dark ? "text-white" : "text-ink"}`}
          >
            {title}
          </h1>
          {subtitle && (
            <p className={`mt-4 max-w-xl text-base leading-relaxed ${dark ? "text-slate-300" : "text-slate-500"}`}>
              {subtitle}
            </p>
          )}
          {children && <div className="mt-6">{children}</div>}
        </motion.div>

        <motion.div
          initial={{ opacity: 0, scale: 0.94 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="mx-auto w-full max-w-sm lg:max-w-md"
        >
          <MediaPanel media={media} art={art} />
        </motion.div>
      </div>
    </section>
  );
}
