import { useId } from "react";

/** Static 3D art: local SVG geometry, studio lighting and export-safe material shaders. */
export function VirtualArt({
  kind,
  accent,
  thumbnail = false,
}: {
  kind: string;
  accent: string;
  thumbnail?: boolean;
}) {
  const uid = useId().replace(/:/g, "");
  const id = (s: string) => `${uid}-${s}`;
  const paint = (s: string) => `url(#${id(s)})`;
  const material = paint(
    kind === "metal" || kind === "flower"
      ? "chrome"
      : kind === "jelly" || kind === "soft"
        ? "gel"
        : "spectrum",
  );
  const body = (() => {
    switch (kind) {
      case "wavefold":
        return (
          <g transform="rotate(-16 260 180)">
            {Array.from({ length: 33 }, (_, i) => {
              const t = i / 32,
                y = 65 + i * 7;
              return (
                <path
                  key={i}
                  d={`M85 ${y}C170 ${y - 100 * Math.sin(t * 3.14)} 310 ${y + 110 * Math.sin(t * 3.14)} 437 ${y - 55}`}
                  fill="none"
                  stroke={paint("chrome")}
                  strokeWidth="6"
                />
              );
            })}
            <path
              d="M85 65L85 290M437 10L437 234"
              stroke={accent}
              opacity=".25"
            />
          </g>
        );
      case "torusfield":
        return (
          <g transform="rotate(-28 260 180)">
            {Array.from({ length: 42 }, (_, i) => {
              const a = (i * Math.PI * 2) / 42,
                x = 260 + 139 * Math.cos(a),
                y = 180 + 80 * Math.sin(a);
              return (
                <ellipse
                  key={i}
                  cx={x}
                  cy={y}
                  rx={19 + 11 * Math.sin(a) ** 2}
                  ry="67"
                  transform={`rotate(${(i * 360) / 42 + 40} ${x} ${y})`}
                  fill="none"
                  stroke={paint("chrome")}
                  strokeWidth="5"
                />
              );
            })}
          </g>
        );
      case "silkhelix":
        return (
          <>
            {Array.from({ length: 27 }, (_, i) => (
              <path
                key={i}
                d={`M${91 + i * 3} ${55 + i * 2}C${490 - i * 2} ${85 + i * 2} ${24 + i * 3} ${282 - i * 2} ${385 + i * 2} ${302 - i * 2}`}
                fill="none"
                stroke={paint("spectrum")}
                strokeWidth="2.2"
                opacity={0.5 + i / 54}
              />
            ))}
            <ellipse cx="400" cy="297" rx="35" ry="12" fill={paint("glass")} />
          </>
        );
      case "bubblecluster":
        return (
          <>
            {[
              [190, 102, 69],
              [302, 93, 73],
              [360, 191, 83],
              [238, 225, 92],
              [133, 206, 62],
              [307, 294, 44],
              [402, 57, 20],
              [80, 92, 16],
            ].map(([x, y, r], i) => (
              <g key={i}>
                <circle
                  cx={x}
                  cy={y}
                  r={r}
                  fill={paint("gel")}
                  fillOpacity=".89"
                  stroke="#fff8"
                  strokeWidth="1.2"
                />
                <ellipse
                  cx={x - r * 0.3}
                  cy={y - r * 0.5}
                  rx={r * 0.28}
                  ry={r * 0.13}
                  fill="white"
                  opacity=".64"
                  transform={`rotate(-28 ${x} ${y})`}
                />
                <path
                  d={`M${x - r * 0.6} ${y + r * 0.4}Q${x} ${y + r * 0.95} ${x + r * 0.55} ${y + r * 0.3}`}
                  fill="none"
                  stroke="white"
                  opacity=".24"
                  strokeWidth="2"
                />
              </g>
            ))}
          </>
        );
      case "pillowstack":
        return (
          <>
            {[
              [160, 245, -13],
              [278, 205, 12],
              [195, 142, -9],
              [300, 91, 17],
            ].map(([x, y, a], i) => (
              <g key={i} transform={`rotate(${a} ${x} ${y})`}>
                <rect
                  x={x - 90}
                  y={y - 50}
                  width="180"
                  height="100"
                  rx="34"
                  fill={paint("gel")}
                />
                <rect
                  x={x - 79}
                  y={y - 41}
                  width="158"
                  height="80"
                  rx="28"
                  fill="none"
                  stroke="#fffb"
                  strokeWidth="1"
                />
                <path
                  d={`M${x - 57} ${y - 32}Q${x} ${y - 49} ${x + 45} ${y - 28}`}
                  stroke="white"
                  opacity=".5"
                  strokeWidth="5"
                  fill="none"
                />
              </g>
            ))}
            <ellipse
              cx="260"
              cy="319"
              rx="165"
              ry="12"
              fill="#62352f"
              opacity=".13"
            />
          </>
        );
      case "gummyorbit":
        return (
          <>
            <g transform="rotate(-28 260 180)">
              <ellipse
                cx="260"
                cy="194"
                rx="180"
                ry="103"
                fill="none"
                stroke="#382058"
                strokeWidth="55"
              />
              <ellipse
                cx="260"
                cy="179"
                rx="180"
                ry="103"
                fill="none"
                stroke={paint("gel")}
                strokeWidth="48"
              />
              <ellipse
                cx="260"
                cy="166"
                rx="180"
                ry="103"
                fill="none"
                stroke="white"
                strokeWidth="2"
                opacity=".5"
              />
            </g>
            <circle
              cx="264"
              cy="143"
              r="57"
              fill={paint("glass")}
              stroke="#fff9"
            />
            <circle cx="425" cy="63" r="24" fill={paint("gel")} />
            <circle cx="108" cy="291" r="17" fill={paint("gel")} />
          </>
        );
      case "holostack":
        return (
          <g transform="rotate(-17 260 180)">
            {Array.from({ length: 7 }, (_, i) => {
              const x = 95 + i * 30,
                y = 50 + i * 17;
              return (
                <g key={i}>
                  <path
                    d={`M${x} ${y}L${x + 165} ${y - 24}V${y + 193}L${x} ${y + 215}Z`}
                    fill={paint("glass")}
                    fillOpacity=".62"
                    stroke={i % 2 ? "#f0d1ff" : "#a4fff6"}
                    strokeWidth="1.3"
                  />
                  <path
                    d={`M${x + 9} ${y + 11}L${x + 155} ${y - 12}`}
                    stroke="white"
                    opacity=".7"
                  />
                  <path
                    d={`M${x + 15} ${y + 183}L${x + 145} ${y + 165}`}
                    stroke={paint("spectrum")}
                    strokeWidth="4"
                  />
                </g>
              );
            })}
          </g>
        );
      case "spectraldoor":
        return (
          <>
            <ellipse
              cx="265"
              cy="325"
              rx="178"
              ry="17"
              fill={paint("spectrum")}
              opacity=".35"
            />
            {Array.from({ length: 6 }, (_, i) => {
              const x = 110 + i * 23,
                y = 19 + i * 20,
                w = 300 - i * 40,
                h = 292 - i * 32;
              return (
                <g key={i} transform={`rotate(${i * 3 - 9} 260 180)`}>
                  <path
                    d={`M${x} ${y + h}V${y + 62}Q${x} ${y} ${x + w / 2} ${y}Q${x + w} ${y} ${x + w} ${y + 62}V${y + h}H${x + w - 17}V${y + 65}Q${x + w - 17} ${y + 19} ${x + w / 2} ${y + 19}Q${x + 17} ${y + 19} ${x + 17} ${y + 65}V${y + h}Z`}
                    fill={paint("glass")}
                    stroke={i % 2 ? accent : "#e8dbff"}
                    strokeWidth="1.5"
                  />
                </g>
              );
            })}
            <circle cx="270" cy="220" r="35" fill={paint("spectrum")} />
          </>
        );
      case "glassbloom":
        return (
          <>
            {Array.from({ length: 8 }, (_, i) => (
              <g key={i} transform={`rotate(${i * 45} 260 180)`}>
                <path
                  d="M260 180C185 155 119 59 181 33C249 5 294 95 260 180Z"
                  fill={paint("glass")}
                  stroke="#d7fff3"
                  strokeWidth="1"
                  fillOpacity=".75"
                />
                <path
                  d="M260 180Q166 71 195 49"
                  fill="none"
                  stroke="white"
                  opacity=".35"
                />
              </g>
            ))}
            <circle cx="260" cy="180" r="47" fill={paint("spectrum")} />
            <ellipse
              cx="246"
              cy="161"
              rx="17"
              ry="8"
              fill="white"
              opacity=".6"
            />
          </>
        );

      case "metal":
        return (
          <>
            <path
              d="M144 205C80 128 133 30 220 64C262 81 243 145 287 146C333 146 321 65 381 67C442 69 460 141 413 178C365 217 430 271 385 311C332 361 267 319 256 269C242 210 192 261 144 205Z"
              fill={material}
            />
            <path
              d="M149 106Q176 67 215 99M338 106Q392 79 402 123M285 290Q340 322 365 286"
              fill="none"
              stroke="white"
              strokeWidth="8"
              opacity=".6"
            />
            {[
              [105, 276, 27],
              [405, 36, 17],
              [457, 252, 34],
            ].map(([cx, cy, r], i) => (
              <circle key={i} cx={cx} cy={cy} r={r} fill={material} />
            ))}
          </>
        );
      case "prism":
        return (
          <>
            <path
              d="M260 25L432 125L411 279L245 353L91 251L111 102Z"
              fill={paint("glass")}
              stroke="#e6e3ff"
              strokeWidth="2"
            />
            <path
              d="M260 25L245 185L91 251M245 185L432 125M245 185V353M111 102L411 279"
              fill="none"
              stroke="white"
              opacity=".55"
              strokeWidth="2"
            />
            <path
              d="M105 222L425 104L397 160L129 275Z"
              fill={paint("spectrum")}
              opacity=".75"
            />
            <path
              d="M157 73L345 306"
              stroke="white"
              strokeWidth="4"
              opacity=".45"
            />
          </>
        );
      case "jelly":
        return (
          <>
            {[
              [0, 0, 0],
              [130, -25, 30],
              [60, 120, -20],
            ].map(([x, y, rot], i) => (
              <g
                key={i}
                transform={`translate(${x} ${y}) rotate(${rot} 225 150)`}
              >
                <rect
                  x="95"
                  y="50"
                  width="200"
                  height="145"
                  rx="65"
                  fill={paint("gel")}
                  stroke="#fff8"
                />
                <ellipse
                  cx="158"
                  cy="80"
                  rx="32"
                  ry="10"
                  fill="white"
                  opacity=".55"
                />
                <path
                  d="M120 149Q190 213 265 146"
                  stroke="#fff5"
                  strokeWidth="2"
                  fill="none"
                />
              </g>
            ))}
          </>
        );
      case "ribs":
        return (
          <g transform="rotate(-24 260 180)">
            {Array.from({ length: 29 }, (_, i) => {
              const t = i / 28;
              const h = 65 + 120 * Math.sin(t * Math.PI);
              return (
                <ellipse
                  key={i}
                  cx={100 + i * 11}
                  cy={180 + 35 * Math.sin(t * Math.PI * 2)}
                  rx={30 + 16 * Math.sin(t * 6)}
                  ry={h}
                  fill="none"
                  stroke={paint("chrome")}
                  strokeWidth="7"
                />
              );
            })}
          </g>
        );
      case "orbit":
        return (
          <>
            <circle cx="269" cy="180" r="96" fill={paint("dark")} />
            <g transform="rotate(-35 260 185)">
              <ellipse
                cx="260"
                cy="185"
                rx="211"
                ry="86"
                fill="none"
                stroke="#281b29"
                strokeWidth="36"
              />
              <ellipse
                cx="260"
                cy="179"
                rx="211"
                ry="86"
                fill="none"
                stroke={paint("chrome")}
                strokeWidth="26"
              />
            </g>
            <circle cx="406" cy="62" r="37" fill={paint("spectrum")} />
          </>
        );
      case "stairs":
        return (
          <>
            <g transform="translate(40 28)">
              {Array.from({ length: 9 }, (_, i) => (
                <g key={i} transform={`translate(${i * 31} ${190 - i * 18})`}>
                  <path d="M0 0L71-35L112-10L41 26Z" fill="#f4ffe4" />
                  <path d="M41 26L112-10V35L41 71Z" fill="#43887c" />
                  <path d="M0 0L41 26V71L0 45Z" fill="#97bfa7" />
                </g>
              ))}
            </g>
            <path
              d="M265 85V22H391V155H353V61H303V108Z"
              fill={paint("chrome")}
            />
          </>
        );
      case "acid":
        return (
          <>
            <path
              d="M61 114C146-21 196 125 273 57S502 112 403 172S463 339 353 321S245 247 163 308S-10 226 61 114Z"
              fill={paint("dark")}
            />
            {Array.from({ length: 13 }, (_, i) => (
              <path
                key={i}
                d={`M${65 + i * 12} ${170 + i * 5}C160 ${-45 + i * 12} 350 ${420 - i * 10} ${440 - i * 5} ${112 + i * 9}`}
                fill="none"
                stroke={accent}
                opacity={0.25 + i * 0.035}
                strokeWidth="2"
              />
            ))}
            <ellipse cx="268" cy="177" rx="64" ry="84" fill={paint("chrome")} />
          </>
        );
      case "holo":
        return (
          <>
            <ellipse cx="265" cy="310" rx="174" ry="28" fill={paint("dark")} />
            <ellipse
              cx="265"
              cy="299"
              rx="174"
              ry="25"
              fill={paint("spectrum")}
            />
            <g transform="rotate(18 260 150)">
              <path
                d="M180 30H330V249H180Z"
                fill={paint("glass")}
                stroke="#d4ffff"
              />
              <path
                d="M180 30L145 63V280L180 249M330 249L295 280H145"
                stroke={accent}
                fill={paint("glass")}
              />
              {Array.from({ length: 15 }, (_, i) => (
                <path
                  key={i}
                  d={`M190 ${47 + i * 13}H318`}
                  stroke="#fff"
                  opacity={0.1 + (i % 3) * 0.15}
                />
              ))}
            </g>
            <path
              d="M102 292L182 74M424 292L329 50"
              stroke={accent}
              opacity=".25"
            />
          </>
        );
      case "hole":
        return (
          <>
            <g transform="rotate(-22 260 180)">
              {Array.from({ length: 19 }, (_, i) => (
                <ellipse
                  key={i}
                  cx="260"
                  cy="180"
                  rx={75 + i * 8}
                  ry={49 + i * 4}
                  fill="none"
                  stroke={paint("spectrum")}
                  strokeWidth={i < 5 ? 4 : 1.5}
                  opacity={1 - i * 0.037}
                />
              ))}
            </g>
            <circle cx="260" cy="180" r="73" fill="#04030b" />
            <circle
              cx="260"
              cy="180"
              r="74"
              fill="none"
              stroke="#fff0ca"
              strokeWidth="3"
            />
            <path
              d="M28 206Q245 125 492 162"
              stroke={paint("spectrum")}
              strokeWidth="12"
              fill="none"
            />
          </>
        );
      case "soft":
        return (
          <>
            <path
              d="M121 298V159C121 13 390 13 390 159V298H312V161C312 94 202 94 202 161V298Z"
              fill={paint("gel")}
            />
            <path
              d="M132 292V158Q139 61 253 57"
              fill="none"
              stroke="white"
              strokeWidth="5"
              opacity=".5"
            />
            <ellipse
              cx="260"
              cy="305"
              rx="190"
              ry="16"
              fill="#3a182d"
              opacity=".15"
            />
            <circle cx="265" cy="221" r="57" fill={paint("chrome")} />
          </>
        );
      case "flower":
        return (
          <>
            {Array.from({ length: 12 }, (_, i) => (
              <path
                key={i}
                transform={`rotate(${i * 30} 260 180)`}
                d="M260 180C117 108 149-16 240 37C289 64 278 125 260 180Z"
                fill={material}
                stroke="#fff3"
              />
            ))}
            <circle cx="260" cy="180" r="38" fill={paint("gel")} />
          </>
        );
      default:
        return (
          <>
            {Array.from({ length: 5 }, (_, i) => (
              <g
                key={i}
                transform={`translate(${i * 13 - 30} ${i * 8 - 25}) rotate(${i * 17 - 32} 260 180)`}
              >
                <path
                  d="M96 82C165 299 353-31 420 232"
                  stroke="#03091f"
                  strokeWidth="37"
                  fill="none"
                />
                <path
                  d="M96 76C165 293 353-37 420 226"
                  stroke={paint("spectrum")}
                  strokeWidth="31"
                  fill="none"
                />
                <path
                  d="M96 65C165 282 353-48 420 215"
                  stroke="white"
                  opacity=".5"
                  strokeWidth="2"
                  fill="none"
                />
              </g>
            ))}
          </>
        );
    }
  })();
  return (
    <svg
      className="rich-scene virtual-scene"
      data-virtual-kind={kind}
      viewBox={thumbnail ? "30 -10 470 380" : "0 0 1000 426"}
      aria-hidden="true"
    >
      <defs>
        <linearGradient id={id("chrome")} x1="0" y1="0" x2=".85" y2="1">
          <stop stopColor="#f6fdff" />
          <stop offset=".16" stopColor="#9cb5c6" />
          <stop offset=".29" stopColor="#18232f" />
          <stop offset=".41" stopColor="#f7ffff" />
          <stop offset=".49" stopColor={accent} />
          <stop offset=".6" stopColor="#253742" />
          <stop offset=".79" stopColor="#f4fdff" />
          <stop offset="1" stopColor="#3d536a" />
        </linearGradient>
        <linearGradient id={id("spectrum")} x1="0" y1="0" x2="1" y2="1">
          <stop stopColor="#f1ffb7" />
          <stop offset=".2" stopColor={accent} />
          <stop offset=".43" stopColor="#f3b5ff" />
          <stop offset=".61" stopColor="#4b50db" />
          <stop offset=".79" stopColor="#76ffef" />
          <stop offset="1" stopColor="#f9eeff" />
        </linearGradient>
        <linearGradient id={id("glass")} x1="0" y1="0" x2="1" y2=".7">
          <stop stopColor="#d4ffff" stopOpacity=".8" />
          <stop offset=".3" stopColor="#5049d0" stopOpacity=".2" />
          <stop offset=".5" stopColor="#efcaff" stopOpacity=".75" />
          <stop offset=".7" stopColor="#3e78e4" stopOpacity=".2" />
          <stop offset="1" stopColor="#b3ffed" stopOpacity=".9" />
        </linearGradient>
        <radialGradient id={id("gel")} cx=".26" cy=".2" r=".9">
          <stop stopColor="#fff7fc" />
          <stop offset=".22" stopColor={accent} />
          <stop offset=".65" stopColor="#bf6fb6" />
          <stop offset="1" stopColor="#51245f" />
        </radialGradient>
        <radialGradient id={id("dark")} cx=".3" cy=".2">
          <stop stopColor="#5b566c" />
          <stop offset=".6" stopColor="#242237" />
          <stop offset="1" stopColor="#070a15" />
        </radialGradient>
        <filter id={id("shadow")} x="-40%" y="-40%" width="180%" height="200%">
          <feDropShadow
            dx="10"
            dy="20"
            stdDeviation="13"
            floodColor="#000"
            floodOpacity=".35"
          />
        </filter>
      </defs>
      <g
        transform={thumbnail ? undefined : "translate(480 30) scale(.97)"}
        filter={paint("shadow")}
      >
        {body}
      </g>
    </svg>
  );
}
