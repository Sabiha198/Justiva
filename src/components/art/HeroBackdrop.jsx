import { useReducedMotion } from "framer-motion";

// Animated background for dark hero sections (pure SVG, no video file needed).
//   variant="rings": soft pulses spreading from the right (emergency / safety)
//   variant="paths": dashed routes that keep flowing between nodes (how it works)
export default function HeroBackdrop({ variant = "rings" }) {
  const reduced = useReducedMotion();

  return (
    <svg
      aria-hidden="true"
      className="pointer-events-none absolute inset-0 h-full w-full"
      viewBox="0 0 1200 600"
      preserveAspectRatio="xMidYMid slice"
    >
      <defs>
        <radialGradient id="hb-glow" cx="78%" cy="40%" r="60%">
          <stop offset="0" stopColor="#b8862e" stopOpacity=".20" />
          <stop offset="1" stopColor="#b8862e" stopOpacity="0" />
        </radialGradient>
      </defs>
      <rect width="1200" height="600" fill="url(#hb-glow)" />

      {variant === "rings" && (
        <g fill="none" stroke="#fff">
          {[120, 220, 320, 420, 520].map((r) => (
            <circle key={r} cx="930" cy="300" r={r} strokeOpacity=".06" />
          ))}
          {!reduced &&
            [0, 2.5].map((delay) => (
              <circle key={delay} cx="930" cy="300" r="100" stroke="#e4c77a" strokeOpacity="0">
                <animate attributeName="r" values="100;560" dur="5s" begin={`${delay}s`} repeatCount="indefinite" />
                <animate attributeName="stroke-opacity" values=".35;0" dur="5s" begin={`${delay}s`} repeatCount="indefinite" />
              </circle>
            ))}
        </g>
      )}

      {variant === "paths" && (
        <g fill="none" strokeLinecap="round">
          {[
            "M-20 470C240 380 380 520 640 400S980 250 1240 330",
            "M-20 540C260 470 420 580 700 470S1000 360 1240 420",
            "M-20 380C200 300 420 400 640 320S1000 170 1240 240",
          ].map((d, i) => (
            <path key={d} d={d} stroke="#e4c77a" strokeOpacity={0.18 + i * 0.07} strokeWidth="2" strokeDasharray="4 14">
              {!reduced && (
                <animate attributeName="stroke-dashoffset" values="0;-180" dur={`${9 + i * 3}s`} repeatCount="indefinite" />
              )}
            </path>
          ))}
          {[[640, 400], [980, 262], [240, 424], [700, 470]].map(([x, y], i) => (
            <circle key={i} cx={x} cy={y} r="5" fill="#e4c77a" fillOpacity=".7">
              {!reduced && (
                <animate attributeName="r" values="4;9;4" dur="4s" begin={`${i * 0.8}s`} repeatCount="indefinite" />
              )}
            </circle>
          ))}
        </g>
      )}
    </svg>
  );
}
