import { useId } from "react";
export function LandscapeArt({
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
  const mountain = (
    <g>
      <path d="M0 215L80 69L139 147L208 30L324 218Z" fill={paint("mountain")} />
      <path
        d="M54 116L80 69L112 112L89 106L82 127L70 105Z M166 94L208 30L250 100L226 79L214 104L201 80L187 102Z"
        fill="#ecf8ff"
      />
      <path
        d="M80 69L139 147L113 175L74 145L85 114Z M208 30L250 100L324 218L220 171L197 122Z"
        fill="#375f7b"
        opacity=".7"
      />
    </g>
  );
  return (
    <svg
      className={thumbnail ? "sculpt-thumb" : "rich-scene"}
      viewBox={thumbnail ? "0 0 340 310" : "0 0 1000 426"}
      aria-hidden="true"
    >
      <defs>
        <linearGradient id={id("water")} x1="0" y1="0" x2="0" y2="1">
          <stop stopColor="#b6e8ed" />
          <stop offset=".35" stopColor={accent} />
          <stop offset="1" stopColor="#0e354c" />
        </linearGradient>
        <linearGradient id={id("mountain")}>
          <stop stopColor="#d7edf6" />
          <stop offset=".5" stopColor={accent} />
          <stop offset="1" stopColor="#1c435d" />
        </linearGradient>
        <linearGradient id={id("pages")} x1="0" y1="0" x2="1" y2="1">
          <stop stopColor="#fff3d9" />
          <stop offset=".45" stopColor="#dbc4a0" />
          <stop offset="1" stopColor="#997454" />
        </linearGradient>
        <radialGradient id={id("star")} cx="30%" cy="25%">
          <stop stopColor="#f7f7ff" />
          <stop offset=".25" stopColor={accent} />
          <stop offset=".7" stopColor="#4b479b" />
          <stop offset="1" stopColor="#0a1533" />
        </radialGradient>
        <radialGradient id={id("mist")}>
          <stop stopColor={accent} stopOpacity=".75" />
          <stop offset="1" stopColor={accent} stopOpacity="0" />
        </radialGradient>
        <linearGradient id={id("ink")} x1="0" y1="0" x2="0" y2="1">
          <stop stopColor="#283d39" />
          <stop offset="1" stopColor="#88938a" stopOpacity=".15" />
        </linearGradient>
        <filter id={id("shadow")} x="-50%" y="-50%" width="200%" height="200%">
          <feDropShadow
            dx="3"
            dy="10"
            stdDeviation="8"
            floodColor="#06172b"
            floodOpacity=".3"
          />
        </filter>
        <filter id={id("cloud")}>
          <feGaussianBlur stdDeviation="12" />
        </filter>
        <clipPath id={id("surface")}>
          <rect x="0" y="165" width="340" height="145" />
        </clipPath>
      </defs>
      <g transform={thumbnail ? undefined : "translate(635 67)"}>
        {kind === "ripple-plane" || kind === "crystal-rings" ? (
          <g filter={paint("shadow")}>
            <ellipse
              cx="170"
              cy="201"
              rx="159"
              ry="82"
              fill={paint("water")}
              opacity=".3"
            />
            {Array.from({ length: 9 }, (_, i) => (
              <g key={i}>
                <ellipse
                  cx="170"
                  cy="190"
                  rx={25 + i * 15}
                  ry={10 + i * 7.1}
                  fill="none"
                  stroke={i % 2 ? "#d4f5ff" : accent}
                  strokeWidth={kind === "crystal-rings" ? 5 : 2}
                  opacity={0.9 - i * 0.06}
                />
                {i % 2 === 0 && (
                  <ellipse
                    cx="170"
                    cy="187"
                    rx={27 + i * 15}
                    ry={11 + i * 7}
                    fill="none"
                    stroke="#f4fbff"
                    strokeWidth="1"
                    opacity=".5"
                  />
                )}
              </g>
            ))}
            <path
              d="M170 54C137 103 133 130 170 137C206 132 199 103 170 54Z"
              fill={paint("water")}
              stroke="#cbefff"
              strokeWidth="1"
            />
          </g>
        ) : kind === "fold-book" || kind === "page-canyon" ? (
          <g filter={paint("shadow")}>
            {Array.from({ length: 12 }, (_, i) => (
              <path
                key={i}
                d={`M${29 + i * 2} ${57 + i * 9}Q105 ${7 + i * 12} 170 ${81 + i * 9}Q235 ${7 + i * 12} ${311 - i * 2} ${57 + i * 9}L${300 - i * 2} ${233 + i * 3}Q230 ${195 + i * 4} 170 ${255 + i * 3}Q110 ${195 + i * 4} ${40 + i * 2} ${233 + i * 3}Z`}
                fill={i % 2 ? "#e7d2ad" : paint("pages")}
                stroke="#b99c77"
                strokeWidth=".6"
              />
            ))}
            <path d="M170 81V288" stroke="#9d7b56" strokeWidth="2" />
            {kind === "fold-book" && (
              <path
                d="M169 239L187 232L188 303L177 292L168 305Z"
                fill="#a45159"
              />
            )}
          </g>
        ) : kind === "library-vault" ? (
          <g filter={paint("shadow")}>
            <path
              d="M20 294V102a150 95 0 0 1 300 0V294Z"
              fill="#342c28"
              stroke={accent}
              strokeWidth="3"
            />
            {[0, 1, 2, 3].map((i) => (
              <path
                key={i}
                d={`M${36 + i * 24} 294V${115 + i * 10}a${134 - i * 24} ${85 - i * 15} 0 0 1 ${268 - i * 48} 0V294`}
                fill="none"
                stroke={i % 2 ? "#e0bd83" : "#8e6846"}
                strokeWidth="6"
              />
            ))}
            {[44, 76, 112, 224, 260, 292].map((x, i) => (
              <g key={x}>
                {Array.from({ length: 7 }, (_, j) => (
                  <path
                    key={j}
                    d={`M${x} ${156 + j * 17}h15m-15 5h15`}
                    stroke={["#b58b5d", "#88644c", "#b9a27b"][i % 3]}
                    strokeWidth="5"
                  />
                ))}
              </g>
            ))}
            <path
              d="M58 294L170 220L284 294 M86 294L170 237L252 294"
              stroke={accent}
              fill="none"
              opacity=".6"
            />
            <circle cx="170" cy="93" r="12" fill="#fce4ab" />
          </g>
        ) : kind === "ocean-swell" || kind === "ceramic-surf" ? (
          <g filter={paint("shadow")}>
            {Array.from({ length: 8 }, (_, i) => (
              <path
                key={i}
                d={`M3 ${87 + i * 24}C65 ${4 + i * 30} 110 ${171 + i * 10} 169 ${111 + i * 19}S269 ${9 + i * 28} 337 ${115 + i * 20}L337 309H3Z`}
                fill={
                  i % 2
                    ? paint("water")
                    : ["#386c83", "#438899", "#6eb0b9", "#9dd3d3"][i % 4]
                }
                stroke={kind === "ceramic-surf" ? "#d9efed" : "#badfe8"}
                strokeWidth={kind === "ceramic-surf" ? 3 : 1}
                opacity=".94"
              />
            ))}
            {Array.from({ length: 13 }, (_, i) => (
              <circle
                key={i}
                cx={20 + i * 25}
                cy={111 + Math.sin(i) * 27}
                r="2"
                fill="#e4fbff"
                opacity=".7"
              />
            ))}
          </g>
        ) : kind === "snow-massif" ? (
          <g filter={paint("shadow")}>
            <circle cx="263" cy="64" r="34" fill="#e7eff0" opacity=".8" />
            {mountain}
            <path d="M0 253Q105 202 173 243T340 225V310H0Z" fill="#d3e7ee" />
            <path
              d="M0 274Q105 225 173 264T340 245"
              fill="none"
              stroke={accent}
              opacity=".5"
            />
          </g>
        ) : kind === "lake-mirror" ? (
          <g>
            <circle cx="233" cy="61" r="35" fill="#dfebdf" opacity=".8" />
            <g transform="translate(7 10) scale(.96 .7)">{mountain}</g>
            <g clipPath={paint("surface")} opacity=".37">
              <g transform="translate(7 317) scale(.96 -.7)">{mountain}</g>
            </g>
            <path d="M0 166H340" stroke={accent} />
            {Array.from({ length: 13 }, (_, i) => (
              <path
                key={i}
                d={`M${i % 2 ? 18 : 0} ${179 + i * 9}Q170 ${169 + i * 10} ${i % 2 ? 320 : 340} ${181 + i * 9}`}
                stroke={i % 3 ? "#adcfcd" : accent}
                fill="none"
                opacity=".6"
              />
            ))}
          </g>
        ) : kind === "ink-peaks" || kind === "mist-mountains" ? (
          <g>
            {Array.from({ length: 4 }, (_, i) => (
              <path
                key={i}
                d={`M${-20 + i * 24} 297L${58 + i * 48} ${38 + i * 32}L${131 + i * 21} ${152 + i * 18}L${188 + i * 29} ${65 + i * 38}L${348 - i * 2} 298Z`}
                fill={
                  kind === "ink-peaks"
                    ? paint("ink")
                    : ["#9aaea0", "#6d9684", "#3d6c63", "#294c46"][i]
                }
                opacity={0.2 + i * 0.16}
              />
            ))}
            <ellipse
              cx="173"
              cy="212"
              rx="175"
              ry="25"
              fill="#dce4d8"
              opacity=".7"
              filter={paint("cloud")}
            />
            <path
              d="M255 267L280 267L274 272H260Z M267 266V246L279 263H267"
              fill={kind === "ink-peaks" ? "#43514a" : accent}
            />
            <circle
              cx="269"
              cy="50"
              r="26"
              fill={kind === "ink-peaks" ? "#a7574d" : "#d7c99c"}
              opacity=".75"
            />
          </g>
        ) : kind === "orbital-world" ? (
          <g>
            <circle
              cx="175"
              cy="154"
              r="100"
              fill={paint("star")}
              filter={paint("shadow")}
            />
            <ellipse
              cx="175"
              cy="158"
              rx="155"
              ry="45"
              fill="none"
              stroke={accent}
              strokeWidth="12"
              transform="rotate(-28 175 158)"
              opacity=".7"
            />
            <ellipse
              cx="175"
              cy="158"
              rx="160"
              ry="50"
              fill="none"
              stroke="#e1e1ff"
              strokeWidth="1"
              transform="rotate(-28 175 158)"
            />
            <circle cx="290" cy="51" r="23" fill={paint("star")} />
            <circle cx="48" cy="252" r="13" fill={paint("star")} />
          </g>
        ) : kind === "cosmic-gateway" ? (
          <g>
            {Array.from({ length: 7 }, (_, i) => (
              <ellipse
                key={i}
                cx="175"
                cy="150"
                rx={132 - i * 15}
                ry={143 - i * 15}
                fill="none"
                stroke={i % 2 ? accent : "#e5eaff"}
                strokeWidth={i ? 2 : 9}
                opacity={0.9 - i * 0.1}
              />
            ))}
            <path
              d="M10 306L143 176M330 306L204 176 M0 273H340 M33 248H308 M72 219H272"
              stroke={accent}
              opacity=".4"
            />
            <ellipse cx="175" cy="150" rx="96" ry="108" fill={paint("mist")} />
          </g>
        ) : (
          <g>
            <ellipse
              cx="176"
              cy="148"
              rx="151"
              ry="124"
              fill={paint("mist")}
              filter={paint("cloud")}
            />
            <ellipse
              cx="155"
              cy="166"
              rx="126"
              ry="26"
              fill={paint("mist")}
              transform="rotate(-35 155 166)"
            />
            <path
              d="M25 263Q90 50 307 77"
              fill="none"
              stroke={accent}
              strokeWidth="1"
              opacity=".6"
            />
            {Array.from({ length: 75 }, (_, i) => (
              <circle
                key={i}
                cx={8 + ((i * 47) % 323)}
                cy={10 + ((i * 71) % 284)}
                r={i % 9 === 0 ? 2.5 : 1}
                fill={i % 3 ? "#e3efff" : accent}
                opacity={0.3 + (i % 5) * 0.13}
              />
            ))}
            <circle cx="255" cy="78" r="26" fill={paint("star")} />
          </g>
        )}
      </g>
    </svg>
  );
}
