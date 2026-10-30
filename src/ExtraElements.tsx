import type { ReactNode } from "react"

/** Vector artwork shared by all layouts and exports, without remote requests. */
export const EXTRA_ELEMENTS = {
  center: [
    { id: "orbital-planet", label: "行星与交错轨道", tag: "科技" },
    { id: "botanical-sprout", label: "嫩芽与植物标本", tag: "自然" },
    { id: "mountain-sun", label: "群山与旭日", tag: "旅行" },
  ],
  side: [
    { id: "olive-branches", label: "橄榄枝与叶脉", tag: "自然" },
    { id: "travel-stamps", label: "邮戳与旅行印记", tag: "旅行" },
    { id: "circuit-nodes", label: "电路与数据节点", tag: "科技" },
  ],
  sky: [
    { id: "paper-planes", label: "纸飞机与航迹", tag: "成长" },
    { id: "floating-bubbles", label: "漂浮气泡与微光", tag: "治愈" },
    { id: "meteor-trails", label: "流星与星芒", tag: "科幻" },
  ],
  bottom: [
    { id: "city-skyline", label: "城市天际线", tag: "建筑" },
    { id: "terraced-fields", label: "梯田与山间小路", tag: "自然" },
    { id: "desert-camp", label: "沙丘与露营帐篷", tag: "旅行" },
  ],
} as const

export function ExtraElement({ id, color }: { id: string; color: string }) {
  if (
    !Object.values(EXTRA_ELEMENTS).some((entries) =>
      entries.some((entry) => entry.id === id),
    )
  )
    return null
  const shapes: Record<string, ReactNode> = {
    "orbital-planet": (
      <>
        <circle cx="450" cy="200" r="75" />
        <ellipse
          cx="450"
          cy="200"
          rx="155"
          ry="38"
          transform="rotate(-25 450 200)"
        />
        <ellipse
          cx="450"
          cy="200"
          rx="110"
          ry="95"
          transform="rotate(32 450 200)"
        />
        <circle cx="574" cy="133" r="8" fill={color} />
      </>
    ),
    "botanical-sprout": (
      <>
        <ellipse cx="450" cy="327" rx="90" ry="12" />
        <path d="M450 320 Q470 220 440 130 M450 250 C355 245 365 170 385 175 Q460 190 450 250 M451 214 C530 205 550 135 520 142 Q450 150 451 214 M444 166 C405 143 403 105 420 100 Q458 125 444 166 M395 193 L448 242 M514 160 L455 205" />
      </>
    ),
    "mountain-sun": (
      <>
        <circle cx="488" cy="135" r="52" />
        <path d="M285 325 L394 161 L465 263 L514 192 L630 325 Z M365 204 L394 161 L425 205 L405 200 L394 215 L380 200 M294 340 Q450 300 622 340" />
      </>
    ),
    "olive-branches": (
      <>
        {[false, true].map((m) => (
          <g
            key={String(m)}
            transform={m ? "translate(900 0) scale(-1 1)" : undefined}
          >
            <path d="M60 325 Q158 230 115 95" />
            {[0, 1, 2, 3, 4].map((i) => (
              <g
                key={i}
                transform={`translate(120 ${135 + i * 36}) rotate(${i * 8})`}
              >
                <ellipse
                  cx="-18"
                  cy="0"
                  rx="24"
                  ry="8"
                  transform="rotate(35)"
                />
                <ellipse
                  cx="18"
                  cy="-15"
                  rx="24"
                  ry="8"
                  transform="rotate(-35)"
                />
              </g>
            ))}
          </g>
        ))}
      </>
    ),
    "travel-stamps": (
      <>
        {[100, 800].map((x, i) => (
          <g key={x} transform={`translate(${x} 218) rotate(${i ? 15 : -15})`}>
            <rect
              x="-57"
              y="-76"
              width="114"
              height="152"
              strokeDasharray="5 4"
            />
            <circle r="44" />
            <path d="M-30 15 L0 -28 L30 15 Z M-35 55 H35 M-35 -55 H35" />
            <text
              y="37"
              textAnchor="middle"
              fontSize="11"
              fill={color}
              stroke="none"
            >
              JOURNEY
            </text>
          </g>
        ))}
      </>
    ),
    "circuit-nodes": (
      <>
        {[false, true].map((m) => (
          <g
            key={String(m)}
            transform={m ? "translate(900 0) scale(-1 1)" : undefined}
          >
            <path d="M0 95 H70 L120 145 V275 H175 M0 215 H45 L85 255 V330 M0 165 H45 L165 285" />
            {[
              [70, 95],
              [175, 275],
              [85, 330],
              [165, 285],
            ].map(([x, y]) => (
              <circle key={`${x}-${y}`} cx={x} cy={y} r="7" fill={color} />
            ))}
          </g>
        ))}
      </>
    ),
    "paper-planes": (
      <>
        <path d="M590 44 L690 65 L620 100 L630 71 Z M630 71 L690 65 M620 100 L617 77 M170 72 L231 86 L188 111 L194 89 Z M194 89 L231 86" />
        <path d="M188 120 Q240 185 310 115 T570 80" strokeDasharray="5 7" />
      </>
    ),
    "floating-bubbles": (
      <>
        {[
          [100, 60, 15],
          [260, 110, 28],
          [540, 45, 18],
          [720, 90, 33],
          [830, 45, 9],
        ].map(([x, y, r]) => (
          <g key={x}>
            <circle cx={x} cy={y} r={r} />
            <circle cx={x - r * 0.3} cy={y - r * 0.3} r="3" fill={color} />
          </g>
        ))}
      </>
    ),
    "meteor-trails": (
      <>
        {[
          [220, 40],
          [480, 30],
          [750, 65],
        ].map(([x, y]) => (
          <g key={x}>
            <path
              d={`M${x - 85} ${y - 30} L${x} ${y} M${x - 65} ${y - 30} L${x - 10} ${y - 5}`}
            />
            <path d={`M${x - 7} ${y} h14 M${x} ${y - 7} v14`} strokeWidth="3" />
          </g>
        ))}
      </>
    ),
    "city-skyline": (
      <>
        <path
          d="M0 370 H40 V310 H80 V345 H120 V265 H175 V330 H220 V285 H270 V355 H330 V290 H385 V345 H440 V245 H475 V225 H490 V245 H525 V340 H565 V300 H615 V330 H660 V275 H710 V350 H765 V295 H820 V330 H865 V305 H900 V383 H0 Z"
          fill={color}
          fillOpacity=".12"
        />
        {[130, 145, 345, 360, 455, 500, 675, 690, 780, 795].map((x) => (
          <path key={x} d={`M${x} 310 v8 m0 9 v8 m0 9 v8`} strokeWidth="4" />
        ))}
      </>
    ),
    "terraced-fields": (
      <>
        {[0, 1, 2, 3, 4].map((i) => (
          <path
            key={i}
            d={`M0 ${325 + i * 15} Q160 ${240 + i * 18} 320 ${325 + i * 12} T650 ${310 + i * 16} T900 ${315 + i * 18}`}
          />
        ))}
        <path d="M650 288 Q500 320 580 340 T510 383" strokeWidth="5" />
      </>
    ),
    "desert-camp": (
      <>
        <path d="M0 350 Q160 250 360 345 Q620 245 900 340 M0 375 Q320 300 520 370 Q740 300 900 365 M620 362 L685 278 L750 362 Z M685 278 L695 362 M695 330 L717 362 H681 Z M760 365 H795 M778 353 V378" />
        <circle cx="778" cy="350" r="8" />
      </>
    ),
  }
  return (
    <svg
      aria-hidden="true"
      viewBox="0 0 900 383"
      className="absolute inset-0 w-full h-full pointer-events-none"
      fill="none"
      stroke={color}
      strokeWidth="1.7"
      strokeLinecap="round"
      strokeLinejoin="round"
      opacity=".65"
    >
      {shapes[id]}
    </svg>
  )
}
