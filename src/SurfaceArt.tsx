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
  if (kind.startsWith("scene-") || kind.startsWith("mix-"))
    return (
      <FullSurface kind={kind} color={color} opacity={opacity} scale={scale} />
    );
  const shape =
    kind === "contours" ? (
      <>
        {Array.from({ length: 7 }, (_, i) => (
          <ellipse
            key={i}
            cx="40"
            cy="40"
            rx={9 + i * 7}
            ry={5 + i * 5}
            transform="rotate(-25 40 40)"
          />
        ))}
      </>
    ) : kind === "hexagons" ? (
      <path d="M20 5L60 5L80 40L60 75H20L0 40ZM20 5L20-5M60 75V85M0 40H-10M80 40H90" />
    ) : kind === "diagonal" ? (
      <path d="M-40 80L40 0M-20 80L60 0M0 80L80 0M20 80L100 0M40 80L120 0" />
    ) : kind === "checker" ? (
      <path d="M0 0H40V40H0ZM40 40H80V80H40Z" fill={color} stroke="none" />
    ) : kind === "circuits" ? (
      <>
        <path d="M0 20H20L40 40V80M80 15H60V35L40 55M0 65H16V42M60 80V60H80" />
        <circle cx="20" cy="20" r="3" />
        <circle cx="60" cy="15" r="3" />
        <circle cx="16" cy="42" r="3" />
      </>
    ) : kind === "bubbles" ? (
      <>
        <circle cx="25" cy="25" r="18" />
        <circle cx="61" cy="53" r="23" />
        <circle cx="12" cy="69" r="6" />
        <circle cx="68" cy="11" r="7" />
        <path d="M15 18Q20 10 29 12M47 44Q54 32 64 35" />
      </>
    ) : kind === "petals" ? (
      <g transform="translate(40 40)">
        {[0, 90, 180, 270].map((a) => (
          <path
            key={a}
            transform={`rotate(${a})`}
            d="M0 0Q-30-40 0-35Q30-40 0 0Z"
          />
        ))}
      </g>
    ) : kind === "isometric" ? (
      <path d="M40 2L75 22V62L40 82L5 62V22ZM5 22L40 42L75 22M40 42V82M40 2V-10M5 62L-10 71M75 62L90 71" />
    ) : kind === "soundlines" ? (
      <>
        {Array.from({ length: 15 }, (_, i) => (
          <path
            key={i}
            d={`M${i * 5 + 5} ${40 - 10 - 22 * Math.sin(i * 0.5) ** 2}V${40 + 10 + 22 * Math.sin(i * 0.5) ** 2}`}
          />
        ))}
      </>
    ) : kind === "orbitals" ? (
      <>
        <ellipse
          cx="40"
          cy="40"
          rx="36"
          ry="13"
          transform="rotate(-35 40 40)"
        />
        <ellipse
          cx="40"
          cy="40"
          rx="13"
          ry="36"
          transform="rotate(-35 40 40)"
        />
        <circle cx="40" cy="40" r="7" />
      </>
    ) : kind === "dots" ? (
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
function FullSurface({
  kind,
  color,
  opacity,
  scale,
}: {
  kind: string;
  color: string;
  opacity: number;
  scale: number;
}) {
  const star = (x: number, y: number, r = 10) => (
    <path
      d={`M${x} ${y - r}Q${x + 2} ${y - 2} ${x + r} ${y}Q${x + 2} ${y + 2} ${x} ${y + r}Q${x - 2} ${y + 2} ${x - r} ${y}Q${x - 2} ${y - 2} ${x} ${y - r}Z`}
    />
  );
  const book = (x: number, y: number, a: number) => (
    <g transform={`translate(${x} ${y}) rotate(${a}) scale(1.6)`}>
      <path d="M-38-25Q-18-33 0-20Q18-33 38-25V28Q18 20 0 33Q-18 20-38 28ZM0-20V33M-30-12L-9-10M-30 0L-9 2M-30 12L-9 14M9-10L30-12M9 2L30 0M9 14L30 12" />
    </g>
  );
  const leaf = (x: number, y: number, a: number) => (
    <g transform={`translate(${x} ${y}) rotate(${a})`}>
      <path d="M0 0Q70-90 0-150Q-70-90 0 0ZM0 0V-140M0-30L30-70M0-60L-30-100" />
    </g>
  );
  let art;
  switch (kind) {
    case "scene-ridges":
      art = (
        <>
          {Array.from({ length: 20 }, (_, i) => (
            <path
              key={i}
              d={`M-100 ${360 - i * 14}Q90 ${235 - i * 22} 260 ${330 - i * 8}T590 ${270 - i * 9}T1100 ${290 - i * 13}`}
              strokeWidth={i % 5 === 0 ? 2 : 1}
            />
          ))}
          <circle cx="830" cy="92" r="51" />
        </>
      );
      break;
    case "scene-orbits":
      art = (
        <>
          <g transform="rotate(-24 700 215)">
            {[90, 140, 200, 265, 340, 430, 530].map((r, i) => (
              <ellipse
                key={r}
                cx="700"
                cy="215"
                rx={r}
                ry={r * 0.48}
                strokeWidth={i % 2 ? 1 : 2}
              />
            ))}
          </g>
          <circle cx="700" cy="215" r="62" />
          <circle cx="335" cy="280" r="21" />
          <circle cx="860" cy="54" r="13" />
          {star(210, 110, 26)}
        </>
      );
      break;
    case "scene-tides":
      art = (
        <>
          {Array.from({ length: 23 }, (_, i) => (
            <path
              key={i}
              d={`M-80 ${150 + i * 13}C180 ${-80 + i * 17} 480 ${490 - i * 5} 1080 ${70 + i * 9}`}
              strokeWidth={i % 6 === 0 ? 3 : 1}
            />
          ))}
          <path d="M-20 20Q250 160 400 40T1050 0" />
        </>
      );
      break;
    case "scene-vault":
      art = (
        <>
          {Array.from({ length: 9 }, (_, i) => {
            const x = i * 48,
              y = i * 21;
            return (
              <path
                key={i}
                d={`M${-90 + x} 450V${160 + y}Q${-90 + x} ${-290 + y * 2} 500 ${-290 + y * 2}Q${1090 - x} ${-290 + y * 2} ${1090 - x} ${160 + y}V450`}
              />
            );
          })}
          {[0, 150, 300, 700, 850, 1000].map((x) => (
            <path key={x} d={`M500 200L${x} 426`} />
          ))}
          {[300, 340, 380, 415].map((y) => (
            <path key={y} d={`M0 ${y}H1000`} />
          ))}
        </>
      );
      break;
    case "scene-rays":
      art = (
        <>
          {Array.from({ length: 38 }, (_, i) => {
            const a = (i * Math.PI * 2) / 38;
            return (
              <path
                key={i}
                d={`M500 213L${500 + 1100 * Math.cos(a)} ${213 + 650 * Math.sin(a)}`}
                strokeWidth={i % 4 === 0 ? 3 : 1}
              />
            );
          })}
          <circle cx="500" cy="213" r="78" />
          <circle cx="500" cy="213" r="112" />
        </>
      );
      break;
    case "mix-reading":
      art = (
        <>
          {book(98, 95, -18)}
          {book(880, 312, 15)}
          <path d="M-10 380Q90 280 225 350M805-10Q830 100 1030 140" />
          {[
            [260, 60],
            [800, 85],
            [75, 285],
            [720, 360],
            [930, 160],
          ].map(([x, y], i) => (
            <g key={i}>{star(x, y, 12 + i * 3)}</g>
          ))}
          <circle cx="870" cy="85" r="30" />
          {Array.from({ length: 30 }, (_, i) => (
            <circle
              key={i}
              cx={(i * 153.3) % 1000}
              cy={(i * i * 39.7) % 426}
              r={(i % 3) + 1}
              fill={color}
              stroke="none"
            />
          ))}
        </>
      );
      break;
    case "mix-botanical":
      art = (
        <>
          <path d="M-30 410Q165 320 100-30M1030 440Q830 290 930-20" />
          {leaf(90, 340, -30)}
          {leaf(105, 195, 22)}
          {leaf(885, 365, 30)}
          {leaf(913, 210, -22)}
          <circle cx="500" cy="65" r="25" />
          <path d="M494 40Q470 64 494 90" />
          {star(240, 80, 10)}
          {star(770, 344, 14)}
        </>
      );
      break;
    case "mix-celestial":
      art = (
        <>
          <g transform="rotate(-25 860 100)">
            <ellipse cx="860" cy="100" rx="145" ry="45" />
            <circle cx="860" cy="100" r="69" />
          </g>
          <path d="M-30 410Q260 210 590 440M-40 440Q210 240 500 430" />
          <circle cx="140" cy="90" r="30" />
          {Array.from({ length: 55 }, (_, i) => (
            <g key={i}>
              {i % 6 === 0 ? (
                star((i * 173) % 1000, (i * i * 71) % 426, 7)
              ) : (
                <circle
                  cx={(i * 173) % 1000}
                  cy={(i * i * 71) % 426}
                  r={(i % 3) + 1}
                />
              )}
            </g>
          ))}
        </>
      );
      break;
    case "mix-geometry":
      art = (
        <>
          <circle cx="900" cy="55" r="145" />
          <circle cx="900" cy="55" r="104" />
          <path d="M-60 140L180-30L280 160L40 330ZM800 320L1000 180L1130 420Z" />
          {Array.from({ length: 9 }, (_, i) => (
            <path key={i} d={`M${20 + i * 16} 425L${190 + i * 16} 305`} />
          ))}
          <path d="M300 28H650M475 10V48M760 360H905M850 325V390" />
          <circle cx="300" cy="330" r="45" fill={color} opacity=".2" />
        </>
      );
      break;
    default:
      art = (
        <>
          <path
            d="M-70 426L70 290L150 355L250 210L400 390L510 315L660 426ZM580 426L730 290L815 350L940 245L1100 426Z"
            fill={color}
            opacity=".35"
          />
          <circle cx="835" cy="80" r="48" />
          <path d="M150 100Q165 80 180 100Q195 80 210 100M270 62Q282 48 294 62Q306 48 318 62M720 165Q733 150 746 165Q759 150 772 165" />
          {Array.from({ length: 22 }, (_, i) => (
            <circle
              key={i}
              cx={(i * 147.5) % 1000}
              cy={(i * i * 33.7) % 426}
              r={(i % 4) + 1}
              fill={color}
              opacity=".5"
            />
          ))}
        </>
      );
  }
  return (
    <svg
      className="surface-pattern full-surface"
      data-surface-kind={kind}
      viewBox="0 0 1000 426"
      preserveAspectRatio="none"
      aria-hidden="true"
      style={{ opacity }}
    >
      <g
        transform={`translate(500 213) scale(${scale / 100}) translate(-500 -213)`}
        stroke={color}
        strokeWidth="1.5"
        fill="none"
      >
        {art}
      </g>
    </svg>
  );
}
