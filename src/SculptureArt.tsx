import { useId } from "react";
export function SculptureArt({
  kind,
  accent,
  thumbnail = false,
}: {
  kind: string;
  accent: string;
  thumbnail?: boolean;
}) {
  const u = useId().replace(/:/g, "");
  const id = (s: string) => u + s;
  const paint = (s: string) => `url(#${id(s)})`;
  return (
    <svg
      className={thumbnail ? "sculpt-thumb" : "rich-scene"}
      aria-hidden="true"
      viewBox={thumbnail ? "0 0 340 300" : "0 0 1000 426"}
    >
      <defs>
        <linearGradient id={id("chrome")} x1="0" y1="0" x2="1" y2="1">
          <stop stopColor="#f7fbff" />
          <stop offset=".18" stopColor="#8997ae" />
          <stop offset=".37" stopColor="#1c2941" />
          <stop offset=".46" stopColor="#e6f3ff" />
          <stop offset=".52" stopColor="#fff" />
          <stop offset=".62" stopColor={accent} />
          <stop offset=".8" stopColor="#25314e" />
          <stop offset="1" stopColor="#dbeaff" />
        </linearGradient>
        <linearGradient id={id("clay")} x1="0" y1="0" x2="1" y2="1">
          <stop stopColor="#ffe4cc" />
          <stop offset=".4" stopColor={accent} />
          <stop offset="1" stopColor="#744c45" />
        </linearGradient>
        <linearGradient id={id("glass")}>
          <stop stopColor="#dfecff" stopOpacity=".8" />
          <stop offset=".3" stopColor="#898bea" stopOpacity=".3" />
          <stop offset=".6" stopColor={accent} stopOpacity=".8" />
          <stop offset="1" stopColor="#d9e9ff" stopOpacity=".2" />
        </linearGradient>
        <radialGradient id={id("disc")} cx="35%" cy="25%">
          <stop stopColor="#f4d7bd" />
          <stop offset=".5" stopColor={accent} />
          <stop offset="1" stopColor="#82544b" />
        </radialGradient>
        <filter id={id("shadow")} x="-60%" y="-60%" width="220%" height="220%">
          <feDropShadow
            dx="9"
            dy="16"
            stdDeviation="10"
            floodColor="#060c1d"
            floodOpacity=".4"
          />
        </filter>
      </defs>
      <g
        transform={thumbnail ? undefined : "translate(635 65)"}
        filter={paint("shadow")}
      >
        {kind === "chrome-orbit" ? (
          <g transform="rotate(-24 170 150)">
            <ellipse
              cx="170"
              cy="150"
              rx="124"
              ry="76"
              fill="none"
              stroke={paint("chrome")}
              strokeWidth="35"
            />
            <ellipse
              cx="170"
              cy="150"
              rx="121"
              ry="71"
              fill="none"
              stroke="#dbeeff"
              strokeWidth="2"
              opacity=".6"
            />
            <ellipse
              cx="170"
              cy="150"
              rx="68"
              ry="120"
              fill="none"
              stroke={paint("chrome")}
              strokeWidth="22"
            />
            <circle cx="247" cy="66" r="24" fill={paint("chrome")} />
          </g>
        ) : kind === "clay-disc" ? (
          <g>
            <circle cx="170" cy="150" r="117" fill={paint("disc")} />
            {[90, 69, 48, 27].map((r, i) => (
              <circle
                key={r}
                cx="170"
                cy="150"
                r={r}
                fill="none"
                stroke={i % 2 ? "#e9c1a3" : "#87594e"}
                strokeWidth="13"
                opacity=".7"
              />
            ))}
            <path
              d="M113 92Q170 49 233 107"
              fill="none"
              stroke="#ffe3c7"
              strokeWidth="3"
              opacity=".8"
            />
          </g>
        ) : kind === "glass-loop" ? (
          <>
            <path
              d="M75 130C70-10 322 20 243 155C174 273 28 269 102 154C179 34 326 175 243 249"
              fill="none"
              stroke={paint("glass")}
              strokeWidth="40"
            />
            <path
              d="M71 129C70 5 309 31 240 150"
              fill="none"
              stroke="#e6ecff"
              strokeWidth="2"
              opacity=".9"
            />
          </>
        ) : kind === "ribbed-wave" ? (
          <g transform="rotate(-18 170 150)">
            {Array.from({ length: 16 }, (_, i) => (
              <path
                key={i}
                d={`M${48 + i * 15} ${85 + Math.sin(i * 0.6) * 36}Q${86 + i * 11} 150 ${48 + i * 15} ${225 + Math.sin(i * 0.6) * 36}`}
                fill="none"
                stroke={paint("chrome")}
                strokeWidth="12"
                strokeLinecap="round"
              />
            ))}
          </g>
        ) : kind === "emboss-seal" ? (
          <>
            <rect
              x="54"
              y="34"
              width="236"
              height="236"
              rx="32"
              fill={paint("clay")}
            />
            {[0, 1, 2, 3].map((i) => (
              <rect
                key={i}
                x={77 + i * 16}
                y={57 + i * 16}
                width={190 - i * 32}
                height={190 - i * 32}
                rx="20"
                fill="none"
                stroke={i % 2 ? "#ffe3c6" : "#84584a"}
                strokeWidth="8"
                opacity=".8"
              />
            ))}
            <path
              d="M170 108L180 141L213 151L180 162L170 195L160 162L127 151L160 141Z"
              fill={paint("clay")}
            />
          </>
        ) : kind === "folded-paper" ? (
          <g>
            <path
              d="M170 24L296 95L296 218L170 286L44 218V95Z"
              fill={paint("clay")}
            />
            <path d="M44 95L170 167L296 95L170 24Z" fill="#f5dfc6" />
            <path d="M170 167V286L296 218V95Z" fill={accent} />
            <path
              d="M170 24V167L44 218L44 95Z"
              fill={paint("chrome")}
              opacity=".8"
            />
          </g>
        ) : kind === "liquid-blob" ? (
          <>
            <path
              d="M142 25C217-15 221 93 281 106C359 129 278 183 276 230C272 299 193 231 138 263C64 311 84 218 44 175C-10 116 85 112 93 75C98 43 108 38 142 25Z"
              fill={paint("chrome")}
            />
            <path
              d="M119 61Q171 14 189 82Q205 121 260 132"
              fill="none"
              stroke="#f4faff"
              strokeWidth="5"
              opacity=".65"
            />
          </>
        ) : (
          <g>
            {[0, 1, 2, 3, 4, 5].map((i) => (
              <path
                key={i}
                d={`M${45 + i * 18} 270V${140 + i * 8}Q170 ${-40 + i * 36} ${295 - i * 18} ${140 + i * 8}V270`}
                fill="none"
                stroke={i % 2 ? "#f1d5b8" : accent}
                strokeWidth="17"
              />
            ))}
          </g>
        )}
      </g>
    </svg>
  );
}
