import { useId } from "react";
import type { Family } from "./catalog";

/** Filled editorial illustrations, drawn locally and exported as real SVG layers. */
export function RichScene({
  family,
  accent,
  ink,
  mode = "painted",
}: {
  family: Family;
  accent: string;
  ink: string;
  mode?: string;
}) {
  const uid = useId().replace(/:/g, "");
  const id = (s: string) => `${uid}-${s}`;
  const fill = (s: string) => `url(#${id(s)})`;
  const isBook = ["library", "literary", "editorial"].includes(family);
  const isCosmos = ["science", "tech"].includes(family);
  return (
    <svg
      className={`rich-scene scene-${family}`}
      viewBox="0 0 1000 426"
      aria-hidden="true"
    >
      <defs>
        <linearGradient id={id("metal")} x1="0" y1="0" x2="1" y2="1">
          <stop stopColor="#fff2b8" />
          <stop offset=".32" stopColor={accent} />
          <stop offset=".6" stopColor="#80522e" />
          <stop offset=".82" stopColor={accent} />
          <stop offset="1" stopColor="#e9d499" />
        </linearGradient>
        <linearGradient id={id("cover")} x1="0" y1="0" x2="1" y2="1">
          <stop stopColor={accent} />
          <stop offset="1" stopColor="#15172b" />
        </linearGradient>
        <linearGradient id={id("pages")} x1="0" y1="0" x2="1" y2="1">
          <stop stopColor="#fffae4" />
          <stop offset=".5" stopColor="#d6c6a5" />
          <stop offset="1" stopColor="#fff4d2" />
        </linearGradient>
        <radialGradient id={id("orb")} cx="30%" cy="25%">
          <stop stopColor="#e0faff" />
          <stop offset=".25" stopColor={accent} />
          <stop offset=".7" stopColor="#394c99" />
          <stop offset="1" stopColor="#07142c" />
        </radialGradient>
        <radialGradient id={id("glow")}>
          <stop stopColor={accent} stopOpacity=".65" />
          <stop offset="1" stopColor={accent} stopOpacity="0" />
        </radialGradient>
        <linearGradient id={id("land")} x1="0" y1="0" x2="0" y2="1">
          <stop stopColor={accent} />
          <stop offset="1" stopColor="#122c35" />
        </linearGradient>
        <filter id={id("shadow")} x="-60%" y="-60%" width="220%" height="220%">
          <feDropShadow
            dx="0"
            dy="12"
            stdDeviation="12"
            floodColor="#020713"
            floodOpacity=".5"
          />
        </filter>
        <filter id={id("light")} x="-100%" y="-100%" width="300%" height="300%">
          <feGaussianBlur stdDeviation="5" />
        </filter>
      </defs>
      <ellipse
        cx="805"
        cy="205"
        rx="255"
        ry="200"
        fill={fill("glow")}
        opacity=".6"
      />
      <g opacity=".6" fill={accent}>
        {Array.from({ length: 38 }, (_, i) => (
          <circle
            key={i}
            cx={565 + ((i * 71) % 420)}
            cy={55 + ((i * 43) % 310)}
            r={i % 6 === 0 ? 2.5 : 1}
          />
        ))}
      </g>
      {isBook ? (
        <g filter={fill("shadow")}>
          <ellipse
            cx="790"
            cy="360"
            rx="170"
            ry="18"
            fill="#020713"
            opacity=".35"
          />
          <g transform="translate(675 83) rotate(-9 110 130)">
            <path d="M0 0L176 0L207 24L207 273L29 273L0 249Z" fill="#150e1c" />
            <path d="M10 4L176 4L198 23L29 23Z" fill={fill("pages")} />
            <path d="M29 23H207V273H29Z" fill={fill("cover")} />
            <path d="M0 0L29 23V273L0 249Z" fill="#11182b" />
            <rect
              x="42"
              y="36"
              width="151"
              height="220"
              rx="2"
              fill="none"
              stroke={fill("metal")}
              strokeWidth="2"
            />
            <rect
              x="48"
              y="42"
              width="139"
              height="208"
              fill="none"
              stroke={accent}
              opacity=".5"
            />
            {[0, 1, 2, 3].map((i) => (
              <path
                key={i}
                d={`M4 ${45 + i * 54}L24 ${61 + i * 54}`}
                stroke={accent}
                strokeWidth="4"
              />
            ))}
            <circle
              cx="117"
              cy="135"
              r="44"
              fill="none"
              stroke={fill("metal")}
              strokeWidth="2"
            />
            <path
              d="M117 84L125 124L165 135L125 146L117 186L108 146L69 135L108 124Z"
              fill={fill("metal")}
            />
            <path d="M70 207H164 M83 216H151" stroke={accent} />
            <path
              d="M156 245L170 244L170 296L162 284L156 296Z"
              fill="#c43b44"
            />
          </g>
          <path
            d="M620 330Q693 297 766 327Q841 298 923 329L930 356Q850 330 766 358Q691 329 611 356Z"
            fill={fill("pages")}
          />
          <path
            d="M611 356Q691 329 766 358Q850 330 930 356L934 365Q850 342 766 368Q687 342 605 364Z"
            fill="#713b32"
          />
          <path d="M766 327V360" stroke="#a89574" />
        </g>
      ) : isCosmos ? (
        <g>
          {family === "science" ? (
            <>
              <circle
                cx="803"
                cy="206"
                r="109"
                fill={fill("orb")}
                filter={fill("shadow")}
              />
              <ellipse
                cx="803"
                cy="206"
                rx="178"
                ry="42"
                fill="none"
                stroke={accent}
                strokeWidth="7"
                transform="rotate(-25 803 206)"
                opacity=".6"
              />
              <ellipse
                cx="803"
                cy="206"
                rx="185"
                ry="47"
                fill="none"
                stroke="#eaf9ff"
                strokeWidth="1"
                transform="rotate(-25 803 206)"
              />
              <circle cx="663" cy="90" r="26" fill={fill("orb")} />
              <path
                d="M640 340Q810 15 962 315"
                stroke={accent}
                fill="none"
                strokeDasharray="4 9"
              />
            </>
          ) : (
            <>
              <g stroke={accent} fill="none" opacity=".5">
                {Array.from({ length: 12 }, (_, i) => (
                  <path
                    key={i}
                    d={`M${650 + i * 22} 80V${120 + (i % 3) * 25}L803 206L${650 + i * 22} 310V365`}
                  />
                ))}
                <circle cx="803" cy="206" r="142" strokeDasharray="4 10" />
                <circle cx="803" cy="206" r="119" />
              </g>
              <g transform="translate(735 140) rotate(45 68 68)">
                <rect
                  width="136"
                  height="136"
                  rx="15"
                  fill={fill("cover")}
                  stroke={accent}
                  strokeWidth="3"
                />
                <rect
                  x="17"
                  y="17"
                  width="102"
                  height="102"
                  rx="8"
                  fill="#0d2038"
                  stroke="#bceaff"
                />
                <path d="M35 35H101V101H35Z" fill={fill("orb")} />
              </g>
              <circle cx="803" cy="206" r="38" fill={fill("glow")} />
              <text
                x="803"
                y="214"
                fill="#f0faff"
                textAnchor="middle"
                fontFamily="monospace"
                fontSize="22"
                fontWeight="bold"
              >
                AI
              </text>
            </>
          )}
          <path d="M590 370H970 M640 380H920" stroke={accent} opacity=".5" />
        </g>
      ) : ["history", "song", "epic"].includes(family) ? (
        <g>
          <circle cx="821" cy="145" r="81" fill={fill("metal")} opacity=".7" />
          {[0, 1, 2].map((i) => (
            <path
              key={i}
              d={`M500 ${375 + i * 20}L${630 + i * 20} ${220 + i * 40}L${730 + i * 10} ${305 + i * 30}L${855 + i * 20} ${175 + i * 65}L1000 ${330 + i * 20}V426H500Z`}
              fill={i === 0 ? accent : i === 1 ? "#2e5053" : "#172d35"}
              opacity={0.25 + i * 0.2}
            />
          ))}
          <g transform="translate(725 148)" filter={fill("shadow")}>
            <path d="M15 196V90H165V196Z" fill="#5a2a2c" stroke={accent} />
            <path
              d="M0 90L90 42L180 90L155 101H25Z M20 50L90 8L160 50L143 58H37Z"
              fill={fill("metal")}
            />
            <path
              d="M77 196V125H108V196 M35 120V180 M145 120V180"
              fill="#151c25"
              stroke={accent}
              strokeWidth="3"
            />
            <path
              d="M-10 199H190 M-20 208H200"
              stroke={accent}
              strokeWidth="5"
            />
          </g>
          <path
            d="M620 60Q680 25 730 52T850 45 M600 72Q650 50 705 69"
            fill="none"
            stroke={accent}
            opacity=".5"
          />
        </g>
      ) : family === "children" ? (
        <g>
          <circle cx="811" cy="207" r="126" fill="#e9a378" />
          <circle cx="772" cy="171" r="64" fill="#ebbd6f" />
          <path
            d="M684 272Q760 110 875 230Q950 220 958 325Q790 378 684 272Z"
            fill="#6a94a6"
          />
          <path
            d="M735 243Q780 195 826 240L871 285Q781 319 735 243"
            fill="#fff0d5"
          />
          <path d="M870 284L932 250L919 309Z" fill="#4d6d91" />
          <circle cx="769" cy="247" r="6" fill="#353551" />
          <path
            d="M786 255Q800 269 812 253"
            fill="none"
            stroke="#353551"
            strokeWidth="3"
          />
          <path
            d="M723 99L732 119L755 121L738 136L741 159L722 147L702 157L708 133L691 118L714 117Z"
            fill="#f0c65d"
          />
          <circle cx="924" cy="104" r="33" fill="#ae99ba" />
          <path
            d="M917 91Q940 109 921 119"
            fill="none"
            stroke="#fff1db"
            strokeWidth="3"
          />
        </g>
      ) : family === "mystery" ? (
        <g>
          <path
            d="M610 350V180H660V110H705V210H735V155H780V260H820V140H870V85H919V175H965V350Z"
            fill="#1b2333"
            stroke={accent}
            strokeOpacity=".2"
          />
          <path
            d="M625 80H905 M590 130L940 290 M615 300L930 100"
            stroke="#a63a45"
            opacity=".45"
          />
          <circle
            cx="802"
            cy="201"
            r="83"
            fill="#162738"
            stroke={accent}
            strokeWidth="9"
          />
          <circle cx="802" cy="201" r="66" fill={fill("glow")} />
          <path
            d="M858 261L918 325"
            stroke={accent}
            strokeWidth="24"
            strokeLinecap="round"
          />
          {[0, 1, 2, 3].map((i) => (
            <path
              key={i}
              d={`M${760 + i * 10} 227Q${735 + i * 10} ${145 + i * 10} 803 ${145 + i * 11}Q${867 - i * 10} ${150 + i * 10} ${832 - i * 7} 240`}
              fill="none"
              stroke={accent}
              strokeWidth="2"
              opacity=".7"
            />
          ))}
        </g>
      ) : family === "mind" ? (
        <g>
          <path
            d="M685 355V155a110 110 0 0 1 220 0V355Z"
            fill="#30273e"
            stroke={accent}
            strokeWidth="2"
          />
          <path d="M717 355V165a78 78 0 0 1 156 0V355Z" fill={fill("glow")} />
          <path
            d="M795 126L740 192L772 235L742 294L795 261L842 294L820 235L853 192Z"
            fill={fill("cover")}
            stroke={accent}
          />
          {[
            [795, 126],
            [740, 192],
            [772, 235],
            [742, 294],
            [795, 261],
            [842, 294],
            [820, 235],
            [853, 192],
          ].map(([x, y]) => (
            <circle key={x + "-" + y} cx={x} cy={y} r="6" fill="#ffdfa5" />
          ))}
          <path
            d="M650 365H940 M670 378H920 M690 390H900"
            stroke={accent}
            opacity=".65"
          />
        </g>
      ) : family === "business" ? (
        <g>
          {[65, 115, 165, 220, 270].map((h, i) => (
            <g key={h}>
              <path
                d={`M${650 + i * 56} 350V${350 - h}L${678 + i * 56} ${335 - h}L${706 + i * 56} ${350 - h}V350Z`}
                fill={fill("cover")}
                stroke={accent}
              />
              <path
                d={`M${678 + i * 56} ${335 - h}V335`}
                stroke={accent}
                opacity=".5"
              />
            </g>
          ))}
          <path
            d="M620 294L710 235L770 249L870 136L950 89"
            fill="none"
            stroke={fill("metal")}
            strokeWidth="7"
          />
          <path
            d="M921 88L952 87L946 118"
            fill="none"
            stroke={accent}
            strokeWidth="7"
          />
        </g>
      ) : family === "biography" ? (
        <g>
          <rect
            x="676"
            y="71"
            width="248"
            height="286"
            fill="#291f25"
            stroke={accent}
          />
          <rect x="688" y="83" width="224" height="262" fill={fill("cover")} />
          <circle cx="801" cy="166" r="55" fill={fill("pages")} />
          <path d="M701 337Q700 228 799 233Q904 226 900 337Z" fill="#2d3440" />
          <path
            d="M770 222L800 263L828 222L817 303H785Z"
            fill={fill("metal")}
          />
          <path d="M690 370H915" stroke={accent} />
          <text
            x="804"
            y="395"
            textAnchor="middle"
            fill={accent}
            fontSize="10"
            letterSpacing="7"
          >
            A LIFE IN WORDS
          </text>
        </g>
      ) : family === "philosophy" ? (
        <g>
          <path
            d="M652 125L802 50L952 125Z M649 140H955 M635 360H970 M645 345H960"
            fill={fill("metal")}
            stroke={accent}
            strokeWidth="4"
          />
          {[680, 742, 804, 866, 928].map((x) => (
            <g key={x}>
              <path
                d={`M${x - 16} 157H${x + 16}V330H${x - 16}Z`}
                fill={fill("pages")}
              />
              <path
                d={`M${x} 163V324 M${x - 10} 163V324 M${x + 10} 163V324`}
                stroke="#9c8a68"
              />
            </g>
          ))}
        </g>
      ) : (
        <g>
          <circle cx="827" cy="129" r="73" fill={fill("pages")} opacity=".9" />
          <path
            d="M500 360L652 226L768 325L894 190L1000 310V426H500Z"
            fill={fill("land")}
            opacity=".65"
          />
          <path
            d="M500 400L640 320L770 370L950 280L1000 320V426H500Z"
            fill="#183e42"
            opacity=".85"
          />
          {[0, 1, 2, 3].map((i) => (
            <path
              key={i}
              d={`M600 ${367 + i * 11}Q770 ${335 + i * 13} 980 ${370 + i * 10}`}
              stroke={accent}
              fill="none"
              opacity=".4"
            />
          ))}
          <path
            d="M795 350V252Q755 249 755 218Q794 214 795 252Q801 219 832 219Q835 253 795 252 M795 252Q774 204 795 181Q818 204 795 252"
            fill={family === "poetry" ? "#c996b8" : accent}
            opacity=".8"
          />
        </g>
      )}
      {mode === "luminous" && (
        <g filter={fill("light")} opacity=".45">
          <ellipse
            cx="803"
            cy="205"
            rx="142"
            ry="120"
            fill="none"
            stroke={accent}
            strokeWidth="8"
          />
        </g>
      )}
    </svg>
  );
}
