import { useId } from "react";
import type { Design } from "./catalog";
export function coverFill(d: Design, fallback: string): string | undefined {
  const a = d.fillColor || fallback,
    b = d.gradientColor;
  if (d.fillMode === "theme") return undefined;
  if (d.fillMode === "solid") return a;
  if (d.fillMode === "linear")
    return `linear-gradient(${d.gradientAngle}deg,${a},${b})`;
  if (d.fillMode === "radial")
    return `radial-gradient(ellipse at center,${b},${a})`;
  return `radial-gradient(ellipse at 15% 15%,${b},transparent 65%),radial-gradient(ellipse at 90% 80%,${b}bb,transparent 65%),linear-gradient(120deg,${a},${a})`;
}
export function SurfacePattern({
  kind,
  color,
  opacity = 1,
  scale = 100,
}: {
  kind: string;
  color: string;
  opacity?: number;
  scale?: number;
}) {
  const id = "stamp-" + useId().replace(/:/g, "");
  const shape =
    kind === "dots" ? (
      <circle cx="15" cy="15" r="2" fill={color} />
    ) : kind === "grid" ? (
      <path d="M0 0H80V80" />
    ) : kind === "waves" ? (
      <>
        <path d="M-10 20Q10 0 30 20T70 20T110 20M-10 60Q10 40 30 60T70 60T110 60" />
      </>
    ) : kind === "books" ? (
      <g transform="rotate(-15 40 40)">
        <path d="M14 21Q27 15 40 24Q53 15 66 21V58Q53 52 40 61Q27 52 14 58ZM40 24V61M21 30L32 31M48 31L59 30M21 40L32 41M48 41L59 40" />
      </g>
    ) : kind === "stars" ? (
      <path d="M40 16Q42 38 64 40Q42 42 40 64Q38 42 16 40Q38 38 40 16Z" />
    ) : kind === "arches" ? (
      <path d="M10 80V38A30 30 0 0 1 70 38V80M20 80V38A20 20 0 0 1 60 38V80M30 80V38A10 10 0 0 1 50 38V80" />
    ) : kind === "ink" ? (
      <>
        <path
          d="M12 32Q18 5 41 22T62 59Q38 72 19 52Z"
          fill={color}
          stroke="none"
        />
        {[
          [9, 12, 2],
          [65, 18, 3],
          [72, 64, 2],
          [16, 70, 4],
          [45, 8, 1],
        ].map(([x, y, r], i) => (
          <circle key={i} cx={x} cy={y} r={r} fill={color} />
        ))}
      </>
    ) : (
      <>
        {Array.from({ length: 28 }, (_, i) => (
          <circle
            key={i}
            cx={(i * 31.7) % 80}
            cy={(i * i * 17.3) % 80}
            r={i % 3 === 0 ? 1.1 : 0.45}
            fill={color}
          />
        ))}
      </>
    );
  if (kind === "none") return null;
  return (
    <svg className="surface-pattern" aria-hidden="true" style={{ opacity }}>
      <defs>
        <pattern
          id={id}
          width={(80 * scale) / 100}
          height={(80 * scale) / 100}
          patternUnits="userSpaceOnUse"
        >
          <g
            transform={`scale(${scale / 100})`}
            stroke={color}
            strokeWidth="1"
            fill="none"
          >
            {shape}
          </g>
        </pattern>
      </defs>
      <rect width="100%" height="100%" fill={`url(#${id})`} />
    </svg>
  );
}
export function InkArt({
  kind,
  thumbnail = false,
}: {
  kind: string;
  thumbnail?: boolean;
}) {
  const uid = useId().replace(/:/g, "");
  const brush = kind === "inkburst";
  return (
    <svg
      className="rich-scene ink-art"
      data-ink-art={kind}
      viewBox={thumbnail ? "460 0 540 426" : "0 0 1000 426"}
      aria-hidden="true"
    >
      <defs>
        <filter
          id={uid + "-rough"}
          x="-20%"
          y="-20%"
          width="140%"
          height="140%"
        >
          <feTurbulence
            type="fractalNoise"
            baseFrequency=".045"
            numOctaves="3"
            seed="8"
            result="noise"
          />
          <feDisplacementMap in="SourceGraphic" in2="noise" scale="14" />
        </filter>
        <linearGradient id={uid + "-wash"} x2=".9" y2="1">
          <stop stopColor="#151b20" />
          <stop offset=".65" stopColor="#394947" stopOpacity=".85" />
          <stop offset="1" stopColor="#667d77" stopOpacity=".15" />
        </linearGradient>
      </defs>
      <g filter={`url(#${uid}-rough)`}>
        {brush ? (
          <>
            <path
              d="M895 65C688-13 525 112 584 264C630 376 850 374 900 259"
              fill="none"
              stroke={`url(#${uid}-wash)`}
              strokeWidth="68"
            />
            <path
              d="M889 58C714-15 529 122 600 277"
              fill="none"
              stroke="#111b1c"
              strokeWidth="14"
              opacity=".8"
            />
            {Array.from({ length: 18 }, (_, i) => (
              <path
                key={i}
                d={`M${595 + i * 1.9} ${140 + i * 5}Q${512 + i * 6} ${240 + i * 2} ${660 + i * 10} ${320 - i * 2}`}
                stroke="#1b2725"
                opacity={0.1 + (i % 4) * 0.1}
                fill="none"
                strokeWidth="1.8"
              />
            ))}
          </>
        ) : (
          <>
            <path
              d="M506 304Q650 224 613 117T838 126T958 36Q882 273 729 241T506 304Z"
              fill={`url(#${uid}-wash)`}
            />
            <path
              d="M530 335Q689 254 742 287T962 173"
              fill="none"
              stroke="#1b2725"
              strokeWidth="25"
              opacity=".45"
            />
            {Array.from({ length: 12 }, (_, i) => (
              <path
                key={i}
                d={`M${520 + i * 5} ${340 - i * 2}Q720 ${250 + i * 3} 910 ${175 + i * 5}`}
                fill="none"
                stroke="#25332f"
                opacity=".3"
                strokeWidth="2"
              />
            ))}
          </>
        )}
      </g>
      {Array.from({ length: 55 }, (_, i) => {
        const x = 560 + (Math.sin(i * 17.7) * 0.5 + 0.5) * 380,
          y = 30 + (Math.cos(i * i * 2.1) * 0.5 + 0.5) * 345;
        return (
          <ellipse
            key={i}
            cx={x}
            cy={y}
            rx={i % 7 === 0 ? 10 : 1 + (i % 4)}
            ry={i % 7 === 0 ? 5 : 1 + (i % 3)}
            fill="#1d2928"
            opacity={0.15 + (i % 6) * 0.12}
            transform={`rotate(${i * 29} ${x} ${y})`}
          />
        );
      })}
      <path d="M870 325H903V368H870Z" fill="#9b302b" />
      <text
        x="887"
        y="343"
        fill="#f0dfca"
        fontSize="11"
        textAnchor="middle"
        fontFamily="serif"
      >
        墨
      </text>
      <text
        x="887"
        y="358"
        fill="#f0dfca"
        fontSize="11"
        textAnchor="middle"
        fontFamily="serif"
      >
        韵
      </text>
    </svg>
  );
}
