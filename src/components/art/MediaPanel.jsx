import { useEffect, useRef, useState } from "react";
import { useReducedMotion } from "framer-motion";
import Art from "./Art";
import ImageSlideshow from "./ImageSlideshow";
import { cn } from "../../utils/cn";

const dataSaverOn = () => typeof navigator !== "undefined" && Boolean(navigator.connection?.saveData);

// Picks what to show beside page text, in this order:
//   1. looping muted video  (media.video)   2. photo / slideshow  (media.images)   3. illustration (art)
// Video only plays while on screen, and is skipped for reduced motion or Data Saver.
export default function MediaPanel({ media, art, label, radius = "rounded-3xl", shadow = "shadow-lift", className }) {
  const reduced = useReducedMotion();
  const [videoFailed, setVideoFailed] = useState(false);
  const [photosFailed, setPhotosFailed] = useState(false);
  const ref = useRef(null);
  const video = media?.video;
  const canPlay = Boolean(video?.src) && !videoFailed && !reduced && !dataSaverOn();

  useEffect(() => {
    const el = ref.current;
    if (!el) return undefined;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) el.play().catch(() => {});
        else el.pause();
      },
      { threshold: 0.25 }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, [canPlay]);

  if (canPlay) {
    return (
      <div className={cn("relative aspect-[4/3] overflow-hidden bg-navy-900", radius, shadow, className)}>
        <video
          ref={ref}
          src={video.src}
          poster={video.poster}
          aria-label={label}
          aria-hidden={label ? undefined : "true"}
          className="h-full w-full object-cover saturate-[.9]"
          muted
          loop
          playsInline
          preload="metadata"
          onError={() => setVideoFailed(true)}
        />
        <div className="pointer-events-none absolute inset-0 bg-gradient-to-tr from-navy-950/35 via-transparent to-transparent" />
      </div>
    );
  }

  if (media?.images?.length && !photosFailed) {
    return (
      <ImageSlideshow
        images={media.images}
        radius={radius}
        shadow={shadow}
        className={className}
        onEmpty={() => setPhotosFailed(true)}
      />
    );
  }

  return <Art name={art} label={label} className={cn(radius, shadow, className)} />;
}
