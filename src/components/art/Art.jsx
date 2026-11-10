import { useId } from "react";
import { useReducedMotion } from "framer-motion";
import { cn } from "../../utils/cn";

// Original Justiva illustrations (inline SVG): no downloads, no licences, always load.
// Palette matches the site: navy + brass on soft paper. Each scene is 400x300.
// Usage: <Art name="report" className="w-full rounded-2xl" />

const C = {
  n9: "#102943", n8: "#14304d", n7: "#1c3f61", n6: "#2a5279",
  n1: "#e4eaf1", n0: "#f2f5f8", paper: "#fffdf8",
  b6: "#b8862e", b5: "#cc9c3d", b3: "#e4c77a", b1: "#f4e9cc",
  al: "#b3402a", pine: "#29684e",
};

/* ---------- small building blocks ---------- */
const Sheet = ({ x, y, w, h }) => (
  <g>
    <rect x={x + 6} y={y + 9} width={w} height={h} rx="14" fill={C.n8} opacity=".10" />
    <rect x={x} y={y} width={w} height={h} rx="14" fill={C.paper} stroke={C.n1} strokeWidth="2" />
  </g>
);

const Bars = ({ x, y, widths, gap = 16, h = 7, fill = C.n1 }) =>
  widths.map((w, i) => <rect key={i} x={x} y={y + i * gap} width={w} height={h} rx={h / 2} fill={fill} />);

const Tick = ({ cx, cy, s = 1, stroke = "#fff", sw = 3 }) => (
  <path
    d="M-6 0l4.5 4.5L7 -5"
    transform={`translate(${cx} ${cy}) scale(${s})`}
    fill="none" stroke={stroke} strokeWidth={sw} strokeLinecap="round" strokeLinejoin="round"
  />
);

const Person = ({ cx, cy, r, body, head }) => (
  <g>
    <circle cx={cx} cy={cy - r * 0.28} r={r * 0.3} fill={head} />
    <path d={`M${cx - r * 0.6} ${cy + r * 0.62}a${r * 0.6} ${r * 0.52} 0 0 1 ${r * 1.2} 0z`} fill={body} />
  </g>
);

const Spark = ({ x, y, s = 1, fill = C.b3 }) => (
  <path d="M0 -10Q1.5 -1.5 10 0Q1.5 1.5 0 10Q-1.5 1.5 -10 0Q-1.5 -1.5 0 -10z" transform={`translate(${x} ${y}) scale(${s})`} fill={fill} />
);

/* ---------- scenes ---------- */
const scenes = {
  report: () => (
    <>
      <Sheet x={118} y={42} w={150} h={204} />
      <rect x={134} y={60} width={64} height={11} rx="5.5" fill={C.b5} />
      <Bars x={134} y={92} widths={[116, 98, 116, 80, 104]} gap={19} />
      <path d="M268 158c-17 0-30 13-30 30 0 22 30 48 30 48s30-26 30-48c0-17-13-30-30-30z" fill={C.al} />
      <circle cx="268" cy="188" r="10" fill="#fff" />
      <circle cx="262" cy="56" r="21" fill={C.n8} />
      <path d="M262 44l12 5v9c0 8-6 13-12 16-6-3-12-8-12-16v-9z" fill="none" stroke={C.b3} strokeWidth="3" strokeLinejoin="round" />
    </>
  ),
  idcard: () => (
    <>
      <rect x="70" y="88" width="260" height="130" rx="18" fill={C.n8} opacity=".12" transform="translate(6 9)" />
      <rect x="70" y="88" width="260" height="130" rx="18" fill={C.n8} />
      <rect x="70" y="116" width="260" height="22" fill={C.n9} />
      <circle cx="114" cy="174" r="24" fill="none" stroke={C.b3} strokeWidth="3" />
      <circle cx="114" cy="174" r="12" fill="none" stroke={C.b3} strokeWidth="2" />
      <text x="152" y="172" fill={C.b3} fontFamily="IBM Plex Mono, monospace" fontSize="19" fontWeight="600">JST-88C0B2</text>
      <text x="152" y="194" fill={C.n1} fontFamily="Inter, sans-serif" fontSize="12">Your private tracking ID</text>
      <circle cx="318" cy="94" r="20" fill={C.pine} />
      <Tick cx={318} cy={94} s={1.1} />
      <rect x="130" y="238" width="140" height="10" rx="5" fill={C.n8} opacity=".15" />
    </>
  ),
  review: () => (
    <>
      <Sheet x={92} y={50} w={150} h={196} />
      <circle cx="120" cy="82" r="14" fill={C.n8} />
      <Tick cx={120} cy={82} s={0.9} stroke={C.b3} />
      <Bars x={142} y={76} widths={[70, 46]} gap={14} h={7} fill={C.n6} />
      <Bars x={110} y={118} widths={[116, 96, 116, 70]} gap={19} />
      <circle cx="244" cy="172" r="44" fill="#fff" fillOpacity=".55" stroke={C.b6} strokeWidth="9" />
      <line x1="276" y1="206" x2="312" y2="244" stroke={C.b6} strokeWidth="11" strokeLinecap="round" />
      <path d="M226 172l13 13 24-26" fill="none" stroke={C.pine} strokeWidth="6" strokeLinecap="round" strokeLinejoin="round" />
    </>
  ),
  track: () => (
    <>
      <line x1="150" y1="64" x2="150" y2="236" stroke={C.n1} strokeWidth="5" strokeLinecap="round" />
      <line x1="150" y1="64" x2="150" y2="176" stroke={C.pine} strokeWidth="5" strokeLinecap="round" />
      {[64, 120, 176].map((y, i) => (
        <g key={y}>
          <circle cx="150" cy={y} r="15" fill={C.pine} />
          <Tick cx={150} cy={y} s={0.9} />
          <rect x="182" y={y - 11} width={[120, 100, 130][i]} height="10" rx="5" fill={C.n7} />
          <rect x="182" y={y + 5} width={[80, 90, 70][i]} height="6" rx="3" fill={C.n1} />
        </g>
      ))}
      <circle cx="150" cy="236" r="15" fill="#fff" stroke={C.b6} strokeWidth="5" />
      <rect x="182" y="225" width="96" height="10" rx="5" fill={C.n1} />
      <rect x="182" y="241" width="60" height="6" rx="3" fill={C.n1} />
    </>
  ),
  search: () => (
    <>
      {[0, 1, 2].map((i) => (
        <g key={i}>
          <rect x="70" y={62 + i * 58} width="214" height="46" rx="12" fill={C.paper} stroke={C.n1} strokeWidth="2" />
          <circle cx="98" cy={85 + i * 58} r="13" fill={i === 0 ? C.b5 : C.n8} />
          <rect x="122" y={76 + i * 58} width={[96, 82, 90][i]} height="8" rx="4" fill={C.n7} />
          <rect x="122" y={91 + i * 58} width={[60, 70, 54][i]} height="6" rx="3" fill={C.n1} />
        </g>
      ))}
      <circle cx="292" cy="112" r="46" fill="#fff" fillOpacity=".6" stroke={C.b6} strokeWidth="9" />
      <line x1="325" y1="146" x2="352" y2="178" stroke={C.b6} strokeWidth="11" strokeLinecap="round" />
      <rect x="70" y="244" width="64" height="24" rx="12" fill={C.n8} />
      <rect x="142" y="244" width="64" height="24" rx="12" fill={C.b5} />
    </>
  ),
  profile: () => (
    <>
      <rect x="102" y="56" width="208" height="206" rx="20" fill={C.n8} opacity=".10" />
      <rect x="96" y="48" width="208" height="206" rx="20" fill={C.paper} stroke={C.n1} strokeWidth="2" />
      <path d="M96 68a20 20 0 0 1 20-20h168a20 20 0 0 1 20 20v44H96z" fill={C.n8} />
      <circle cx="200" cy="112" r="36" fill={C.n6} stroke="#fff" strokeWidth="6" />
      <Person cx={200} cy={116} r={34} body={C.n1} head={C.n1} />
      <circle cx="228" cy="140" r="11" fill={C.pine} stroke="#fff" strokeWidth="3" />
      <Tick cx={228} cy={140} s={0.65} />
      <rect x="148" y="166" width="104" height="10" rx="5" fill={C.n8} />
      <rect x="166" y="184" width="68" height="7" rx="3.5" fill={C.n1} />
      <text x="200" y="218" textAnchor="middle" fill={C.b5} fontSize="22" letterSpacing="3">★★★★★</text>
      <rect x="132" y="228" width="136" height="16" rx="8" fill={C.b6} />
    </>
  ),
  calendar: () => (
    <>
      <rect x="90" y="66" width="232" height="188" rx="18" fill={C.n8} opacity=".10" />
      <rect x="84" y="58" width="232" height="188" rx="18" fill={C.paper} stroke={C.n1} strokeWidth="2" />
      <path d="M84 76a18 18 0 0 1 18-18h196a18 18 0 0 1 18 18v28H84z" fill={C.n8} />
      <rect x="124" y="44" width="9" height="26" rx="4.5" fill={C.b5} />
      <rect x="267" y="44" width="9" height="26" rx="4.5" fill={C.b5} />
      {[0, 1, 2, 3].map((r) =>
        [0, 1, 2, 3, 4].map((c) => {
          const sel = r === 1 && c === 2;
          return sel ? (
            <circle key={`${r}${c}`} cx={118 + c * 41} cy={134 + r * 31} r="14" fill={C.b6} />
          ) : (
            <rect key={`${r}${c}`} x={107 + c * 41} y={127 + r * 31} width="22" height="14" rx="5" fill={C.n1} />
          );
        })
      )}
      <circle cx="312" cy="236" r="30" fill={C.n8} stroke="#fff" strokeWidth="5" />
      <path d="M312 218v18l12 7" fill="none" stroke={C.b3} strokeWidth="4" strokeLinecap="round" strokeLinejoin="round" />
    </>
  ),
  chat: () => (
    <>
      <rect x="70" y="60" width="200" height="76" rx="20" fill={C.n8} />
      <path d="M96 136l-8 24 30-24z" fill={C.n8} />
      <Bars x={92} y={82} widths={[150, 120, 90]} gap={16} h={8} fill={C.n1} />
      <rect x="132" y="156" width="200" height="76" rx="20" fill={C.paper} stroke={C.n1} strokeWidth="2" />
      <path d="M306 232l8 24-30-24z" fill={C.paper} stroke={C.n1} strokeWidth="2" />
      <Bars x={154} y={178} widths={[150, 100]} gap={18} h={8} fill={C.n1} />
      <rect x="154" y="214" width="56" height="10" rx="5" fill={C.b5} />
      <rect x="70" y="244" width="64" height="30" rx="15" fill={C.b1} />
      {[88, 102, 116].map((x) => <circle key={x} cx={x} cy="259" r="4" fill={C.b6} />)}
    </>
  ),
  book: () => (
    <>
      <path d="M206 92C174 70 122 70 84 88V236C122 218 174 218 206 240z" fill={C.n8} opacity=".10" transform="translate(6 8)" />
      <path d="M200 90C168 68 118 68 80 86V234C118 216 168 216 200 238z" fill={C.paper} stroke={C.n8} strokeWidth="3" strokeLinejoin="round" />
      <path d="M200 90C232 68 282 68 320 86V234C282 216 232 216 200 238z" fill={C.paper} stroke={C.n8} strokeWidth="3" strokeLinejoin="round" />
      <path d="M200 90V238" stroke={C.n8} strokeWidth="3" />
      {[0, 1, 2, 3, 4].map((i) => (
        <g key={i}>
          <path d={`M104 ${112 + i * 22}Q148 ${100 + i * 22} 182 ${116 + i * 22}`} fill="none" stroke={C.n1} strokeWidth="6" strokeLinecap="round" />
          <path d={`M218 ${116 + i * 22}Q252 ${100 + i * 22} 296 ${112 + i * 22}`} fill="none" stroke={C.n1} strokeWidth="6" strokeLinecap="round" />
        </g>
      ))}
      <path d="M248 78h16v74l-8-8-8 8z" fill={C.b6} />
      <Spark x={118} y={52} s={1.3} />
      <Spark x={330} y={62} s={0.9} fill={C.b5} />
    </>
  ),
  match: () => (
    <>
      <circle cx="108" cy="168" r="46" fill={C.n8} />
      <Person cx={108} cy={172} r={42} body={C.n1} head={C.n1} />
      <circle cx="292" cy="168" r="46" fill={C.b6} />
      <Person cx={292} cy={172} r={42} body="#fff" head="#fff" />
      <path d="M154 160Q200 66 246 160" fill="none" stroke={C.n6} strokeWidth="4" strokeDasharray="3 10" strokeLinecap="round" />
      <circle cx="200" cy="113" r="20" fill={C.pine} stroke="#fff" strokeWidth="4" />
      <Tick cx={200} cy={113} s={1.1} />
      <rect x="108" y="236" width="184" height="10" rx="5" fill={C.n8} opacity=".15" />
      <Spark x={76} y={78} s={1} />
      <Spark x={330} y={86} s={0.8} fill={C.b5} />
    </>
  ),
  scales: (reduced) => (
    <>
      <rect x="146" y="252" width="108" height="16" rx="8" fill={C.n8} />
      <rect x="172" y="238" width="56" height="16" rx="6" fill={C.n7} />
      <rect x="194" y="96" width="12" height="146" fill={C.n7} />
      <g transform="translate(200 88)">
        <g>
          {!reduced && (
            <animateTransform attributeName="transform" type="rotate" values="-4 0 0;4 0 0;-4 0 0" dur="7s" repeatCount="indefinite" calcMode="spline" keyTimes="0;.5;1" keySplines=".45 0 .55 1;.45 0 .55 1" />
          )}
          <line x1="-122" y1="0" x2="122" y2="0" stroke={C.b6} strokeWidth="9" strokeLinecap="round" />
          {[-122, 122].map((px) => (
            <g key={px} transform={`translate(${px} 0)`}>
              <g>
                {!reduced && (
                  <animateTransform attributeName="transform" type="rotate" values="4 0 0;-4 0 0;4 0 0" dur="7s" repeatCount="indefinite" calcMode="spline" keyTimes="0;.5;1" keySplines=".45 0 .55 1;.45 0 .55 1" />
                )}
                <line x1="0" y1="0" x2="-34" y2="78" stroke={C.n6} strokeWidth="2.5" />
                <line x1="0" y1="0" x2="34" y2="78" stroke={C.n6} strokeWidth="2.5" />
                <path d="M-44 78h88a44 28 0 0 1 -88 0z" fill={C.n8} />
                <rect x="-38" y="72" width="76" height="6" rx="3" fill={C.b5} />
              </g>
            </g>
          ))}
        </g>
      </g>
      <circle cx="200" cy="88" r="13" fill={C.b6} stroke="#fff" strokeWidth="3" />
      <Spark x={68} y={64} s={1.2} />
      <Spark x={338} y={52} s={0.8} fill={C.b5} />
    </>
  ),
  shield: (reduced) => (
    <>
      {[0, 1.5].map((delay) => (
        <circle key={delay} cx="200" cy="154" r="70" fill="none" stroke={C.n6} strokeWidth="2" opacity=".0">
          {!reduced && (
            <>
              <animate attributeName="r" values="70;150" dur="3s" begin={`${delay}s`} repeatCount="indefinite" />
              <animate attributeName="opacity" values=".35;0" dur="3s" begin={`${delay}s`} repeatCount="indefinite" />
            </>
          )}
        </circle>
      ))}
      <path d="M200 66l72 28v66c0 48-33 78-72 94-39-16-72-46-72-94V94z" fill={C.n8} />
      <path d="M200 82l58 23v55c0 38-26 63-58 77-32-14-58-39-58-77v-55z" fill={C.n7} stroke={C.b3} strokeWidth="2.5" />
      <path d="M170 156l22 22 40-46" fill="none" stroke={C.b3} strokeWidth="14" strokeLinecap="round" strokeLinejoin="round" />
      <rect x="258" y="206" width="84" height="36" rx="18" fill={C.al} />
      <text x="300" y="231" textAnchor="middle" fill="#fff" fontFamily="Inter, sans-serif" fontSize="19" fontWeight="700" letterSpacing="1">999</text>
    </>
  ),
  mail: () => (
    <>
      <rect x="116" y="64" width="168" height="96" rx="10" fill={C.paper} stroke={C.n1} strokeWidth="2" />
      <Bars x={134} y={84} widths={[110, 90, 70]} gap={16} h={7} />
      <rect x="84" y="108" width="232" height="142" rx="16" fill={C.n8} opacity=".10" transform="translate(6 8)" />
      <rect x="84" y="108" width="232" height="142" rx="16" fill={C.paper} stroke={C.n8} strokeWidth="3" />
      <path d="M84 126l116 74 116-74" fill={C.n0} stroke={C.n8} strokeWidth="3" strokeLinejoin="round" />
      <rect x="258" y="52" width="92" height="52" rx="16" fill={C.b6} />
      <path d="M284 104l-6 20 24-20z" fill={C.b6} />
      {[284, 304, 324].map((x) => <circle key={x} cx={x} cy="78" r="5" fill="#fff" />)}
    </>
  ),
  faq: () => (
    <>
      <rect x="96" y="52" width="208" height="134" rx="30" fill={C.n8} />
      <path d="M144 186l-8 40 42-40z" fill={C.n8} />
      <text x="200" y="152" textAnchor="middle" fill={C.b3} fontFamily="Fraunces, Georgia, serif" fontSize="98" fontWeight="700">?</text>
      <rect x="244" y="176" width="104" height="70" rx="22" fill={C.paper} stroke={C.n1} strokeWidth="2" />
      <path d="M326 246l6 20-26-20z" fill={C.paper} stroke={C.n1} strokeWidth="2" />
      <Bars x={262} y={196} widths={[68, 50]} gap={16} h={8} />
      <circle cx="318" cy="228" r="8" fill={C.pine} />
      <Tick cx={318} cy={228} s={0.5} />
      <Spark x={70} y={70} s={1.1} />
    </>
  ),
  aid: () => (
    <>
      <path d="M200 60l76 30v68c0 50-34 82-76 98-42-16-76-48-76-98V90z" fill={C.n8} />
      <path d="M200 206c-52-36-52-80-22-80 12 0 20 8 22 14 2-6 10-14 22-14 30 0 30 44-22 80z" fill={C.b5} />
      <Person cx={78} cy={214} r={34} body={C.n6} head={C.n6} />
      <Person cx={322} cy={214} r={34} body={C.b6} head={C.b6} />
      <Spark x={92} y={70} s={1.1} />
      <Spark x={318} y={78} s={0.8} fill={C.b5} />
    </>
  ),
  phone: () => (
    <>
      <rect x="146" y="44" width="120" height="230" rx="24" fill={C.n8} opacity=".12" transform="translate(6 8)" />
      <rect x="140" y="36" width="120" height="230" rx="24" fill={C.n8} />
      <rect x="150" y="54" width="100" height="194" rx="14" fill={C.paper} />
      <rect x="172" y="62" width="56" height="7" rx="3.5" fill={C.n1} />
      <circle cx="200" cy="130" r="44" fill="none" stroke={C.n1} strokeWidth="3" />
      <circle cx="200" cy="130" r="26" fill="none" stroke={C.n1} strokeWidth="3" />
      <path d="M200 100c-12 0-21 9-21 21 0 16 21 34 21 34s21-18 21-34c0-12-9-21-21-21z" fill={C.al} />
      <circle cx="200" cy="121" r="7" fill="#fff" />
      <Bars x={166} y={182} widths={[68, 52]} gap={14} h={7} />
      <rect x="166" y="214" width="68" height="22" rx="11" fill={C.b6} />
      <circle cx="270" cy="62" r="22" fill={C.al} />
      <path d="M270 50v14" stroke="#fff" strokeWidth="4" strokeLinecap="round" />
      <circle cx="270" cy="73" r="2.6" fill="#fff" />
    </>
  ),
  progress: () => (
    <>
      <circle cx="140" cy="150" r="64" fill="none" stroke={C.n1} strokeWidth="18" />
      <circle cx="140" cy="150" r="64" fill="none" stroke={C.pine} strokeWidth="18" strokeLinecap="round" strokeDasharray="300 402" transform="rotate(-90 140 150)" />
      <text x="140" y="162" textAnchor="middle" fill={C.n8} fontFamily="Fraunces, Georgia, serif" fontSize="34" fontWeight="700">75%</text>
      {[104, 150, 196].map((y, i) => (
        <g key={y}>
          <circle cx="248" cy={y} r="13" fill={i < 2 ? C.pine : "#fff"} stroke={i < 2 ? C.pine : C.b6} strokeWidth="4" />
          {i < 2 && <Tick cx={248} cy={y} s={0.75} />}
          <rect x="272" y={y - 9} width={[70, 58, 64][i]} height="9" rx="4.5" fill={C.n7} />
          <rect x="272" y={y + 4} width={[44, 50, 38][i]} height="6" rx="3" fill={C.n1} />
        </g>
      ))}
    </>
  ),
  courthouse: () => (
    <>
      <path d="M200 52L88 108h224z" fill={C.n8} />
      <circle cx="200" cy="88" r="10" fill={C.b3} />
      <rect x="92" y="108" width="216" height="16" fill={C.n7} />
      {[0, 1, 2, 3].map((i) => (
        <g key={i}>
          <rect x={112 + i * 54} y="124" width="22" height="100" rx="4" fill={C.paper} stroke={C.n1} strokeWidth="2" />
          <rect x={108 + i * 54} y="124" width="30" height="8" rx="3" fill={C.n1} />
        </g>
      ))}
      <rect x="84" y="224" width="232" height="14" rx="4" fill={C.n7} />
      <rect x="70" y="238" width="260" height="16" rx="4" fill={C.n8} />
    </>
  ),
};

export default function Art({ name = "scales", className, label, animate = true }) {
  const uid = useId().replace(/:/g, "");
  const reduced = useReducedMotion() || !animate;
  const Scene = scenes[name] || scenes.scales;

  return (
    <svg
      viewBox="0 0 400 300"
      className={cn("block h-auto w-full", className)}
      role={label ? "img" : undefined}
      aria-label={label}
      aria-hidden={label ? undefined : "true"}
    >
      <defs>
        <linearGradient id={`${uid}bg`} x1="0" y1="0" x2="1" y2="1">
          <stop offset="0" stopColor={C.n0} />
          <stop offset="1" stopColor={C.n1} />
        </linearGradient>
        <pattern id={`${uid}dots`} width="18" height="18" patternUnits="userSpaceOnUse">
          <circle cx="2" cy="2" r="1.3" fill={C.n6} opacity=".16" />
        </pattern>
      </defs>
      <rect width="400" height="300" rx="26" fill={`url(#${uid}bg)`} />
      <rect width="400" height="300" rx="26" fill={`url(#${uid}dots)`} />
      <circle cx="340" cy="52" r="74" fill={C.b3} opacity=".30" />
      <circle cx="44" cy="274" r="64" fill={C.n6} opacity=".10" />
      <g>
        {!reduced && name !== "scales" && (
          <animateTransform attributeName="transform" type="translate" values="0 0;0 -6;0 0" dur="6s" repeatCount="indefinite" calcMode="spline" keyTimes="0;.5;1" keySplines=".45 0 .55 1;.45 0 .55 1" />
        )}
        {Scene(reduced)}
      </g>
    </svg>
  );
}
