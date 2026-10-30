import React, { useState, useRef, useEffect } from "react"
import { ExtraElement, EXTRA_ELEMENTS } from "./ExtraElements"
import { domToPng } from "modern-screenshot"

export type BrandPosition = "top-left" | "top-right" | "bottom-left"
export type BrandTheme = "gold-dark" | "ivory-crimson" | "frosted-glass"
export type CoverStyleVariant = "tpl-1-magazine-book" | "tpl-2-center-emblem" | "tpl-3-editorial-split" | "tpl-4-minimal-frame" | "tpl-5-chinese-scroll" | "tpl-6-cinema-widescreen" | "tpl-7-split-diagonal" | "style-1-epic-original" | "style-2-minimal-sword" | "style-3-woodcut-heraldry" | "style-4-red-comet-throne" | "style-5-weirwood-snow"

export type ColorSchemeId = "terracotta-earth" | "electric-lime" | "ocean-atlas" | "lavender-letter" | "apricot-journal" | "tea-paper" | "ice-fire-gold" | "obsidian-gold" | "forest-emerald" | "burgundy-velvet" | "cosmic-indigo" | "oriental-ivory" | "song-cyan-gold" | "amber-noir" | "sakura-dusk" | "titanium-silver"

export interface ColorPalette {
  id: ColorSchemeId
  name: string
  scene: string
  swatchLeft: string
  swatchRight: string
  isLight?: boolean
  canvasBg: string
  bgGradient: string
  glowLeft: string
  glowRight: string
  borderMain: string
  borderSub: string
  titleColor: string
  subtitleColor: string
  accentHex: string
  tagBg: string
  tagText: string
  bookCoverBg: string
  bookSpineBg: string
}

export const COLOR_PALETTES: Record<ColorSchemeId, ColorPalette> = {
  "tea-paper": {
    id: "tea-paper",
    name: "11. 茶白竹青",
    scene: "自然 / 生活 / 随笔",
    swatchLeft: "#eff3e5",
    swatchRight: "#1d6653",
    isLight: true,
    canvasBg: "#eff3e5",
    bgGradient:
      "linear-gradient(115deg, #eff3e5 0%, #eff3e5 58%, #1d665355 100%)",
    glowLeft: "#1d665318",
    glowRight: "#1d665328",
    borderMain: "#1d665380",
    borderSub: "#1d665330",
    titleColor: "#243c32",
    subtitleColor: "#1d6653",
    accentHex: "#1d6653",
    tagBg: "#1d665320",
    tagText: "#1d6653",
    bookCoverBg: "linear-gradient(145deg, #1d6653, #eff3e5)",
    bookSpineBg: "#eff3e5",
  },
  "apricot-journal": {
    id: "apricot-journal",
    name: "12. 杏橘手记",
    scene: "成长 / 日常 / 旅行",
    swatchLeft: "#fff0dc",
    swatchRight: "#b64e24",
    isLight: true,
    canvasBg: "#fff0dc",
    bgGradient:
      "linear-gradient(115deg, #fff0dc 0%, #fff0dc 58%, #b64e2455 100%)",
    glowLeft: "#b64e2418",
    glowRight: "#b64e2428",
    borderMain: "#b64e2480",
    borderSub: "#b64e2430",
    titleColor: "#482b20",
    subtitleColor: "#b64e24",
    accentHex: "#b64e24",
    tagBg: "#b64e2420",
    tagText: "#b64e24",
    bookCoverBg: "linear-gradient(145deg, #b64e24, #fff0dc)",
    bookSpineBg: "#fff0dc",
  },
  "lavender-letter": {
    id: "lavender-letter",
    name: "13. 雾紫来信",
    scene: "女性 / 情感 / 诗歌",
    swatchLeft: "#f0ebfa",
    swatchRight: "#765591",
    isLight: true,
    canvasBg: "#f0ebfa",
    bgGradient:
      "linear-gradient(115deg, #f0ebfa 0%, #f0ebfa 58%, #76559155 100%)",
    glowLeft: "#76559118",
    glowRight: "#76559128",
    borderMain: "#76559180",
    borderSub: "#76559130",
    titleColor: "#322442",
    subtitleColor: "#765591",
    accentHex: "#765591",
    tagBg: "#76559120",
    tagText: "#765591",
    bookCoverBg: "linear-gradient(145deg, #765591, #f0ebfa)",
    bookSpineBg: "#f0ebfa",
  },
  "ocean-atlas": {
    id: "ocean-atlas",
    name: "14. 蔚蓝航线",
    scene: "旅行 / 地理 / 探索",
    swatchLeft: "#082b46",
    swatchRight: "#28b4b8",
    isLight: false,
    canvasBg: "#082b46",
    bgGradient:
      "linear-gradient(115deg, #082b46 0%, #082b46 58%, #28b4b855 100%)",
    glowLeft: "#28b4b818",
    glowRight: "#28b4b828",
    borderMain: "#28b4b880",
    borderSub: "#28b4b830",
    titleColor: "#edfaff",
    subtitleColor: "#28b4b8",
    accentHex: "#28b4b8",
    tagBg: "#28b4b820",
    tagText: "#28b4b8",
    bookCoverBg: "linear-gradient(145deg, #28b4b8, #082b46)",
    bookSpineBg: "#082b46",
  },
  "electric-lime": {
    id: "electric-lime",
    name: "15. 荧光实验室",
    scene: "AI / 科技 / 创意",
    swatchLeft: "#111b20",
    swatchRight: "#b8ed62",
    isLight: false,
    canvasBg: "#111b20",
    bgGradient:
      "linear-gradient(115deg, #111b20 0%, #111b20 58%, #b8ed6255 100%)",
    glowLeft: "#b8ed6218",
    glowRight: "#b8ed6228",
    borderMain: "#b8ed6280",
    borderSub: "#b8ed6230",
    titleColor: "#f6ffe6",
    subtitleColor: "#b8ed62",
    accentHex: "#b8ed62",
    tagBg: "#b8ed6220",
    tagText: "#b8ed62",
    bookCoverBg: "linear-gradient(145deg, #b8ed62, #111b20)",
    bookSpineBg: "#111b20",
  },
  "terracotta-earth": {
    id: "terracotta-earth",
    name: "16. 赤陶大地",
    scene: "人文 / 建筑 / 艺术",
    swatchLeft: "#351c19",
    swatchRight: "#df9975",
    isLight: false,
    canvasBg: "#351c19",
    bgGradient:
      "linear-gradient(115deg, #351c19 0%, #351c19 58%, #df997555 100%)",
    glowLeft: "#df997518",
    glowRight: "#df997528",
    borderMain: "#df997580",
    borderSub: "#df997530",
    titleColor: "#fff2e5",
    subtitleColor: "#df9975",
    accentHex: "#df9975",
    tagBg: "#df997520",
    tagText: "#df9975",
    bookCoverBg: "linear-gradient(145deg, #df9975, #351c19)",
    bookSpineBg: "#351c19",
  },
  "ice-fire-gold": {
    id: "ice-fire-gold",
    name: "01. 冰火鎏金",
    scene: "奇幻 / 史诗 / 巨著",
    swatchLeft: "#0e3a5c",
    swatchRight: "#9a2b17",
    canvasBg: "#060911",
    bgGradient:
      "linear-gradient(110deg, rgba(10, 37, 64, 0.94) 0%, rgba(9, 13, 22, 0.96) 50%, rgba(105, 20, 15, 0.92) 100%)",
    glowLeft: "rgba(56, 189, 248, 0.22)",
    glowRight: "rgba(249, 115, 22, 0.25)",
    borderMain: "rgba(229, 169, 60, 0.45)",
    borderSub: "rgba(229, 169, 60, 0.18)",
    titleColor: "#fdf8ee",
    subtitleColor: "#fde68a",
    accentHex: "#e5a93c",
    tagBg: "rgba(229, 169, 60, 0.16)",
    tagText: "#fcd34d",
    bookCoverBg:
      "linear-gradient(145deg, #102338 0%, #14161f 52%, #4a1512 100%)",
    bookSpineBg: "#090d14",
  },
  "obsidian-gold": {
    id: "obsidian-gold",
    name: "02. 曜石黑金",
    scene: "商业 / 社科 / 经典必读",
    swatchLeft: "#111318",
    swatchRight: "#d4af37",
    canvasBg: "#08080a",
    bgGradient:
      "linear-gradient(115deg, #0b0c10 0%, #14161d 52%, #211a10 100%)",
    glowLeft: "rgba(212, 175, 55, 0.12)",
    glowRight: "rgba(245, 158, 11, 0.22)",
    borderMain: "rgba(212, 175, 55, 0.5)",
    borderSub: "rgba(212, 175, 55, 0.2)",
    titleColor: "#ffffff",
    subtitleColor: "#f3d28c",
    accentHex: "#d4af37",
    tagBg: "rgba(212, 175, 55, 0.18)",
    tagText: "#fde68a",
    bookCoverBg: "linear-gradient(145deg, #1d1f27 0%, #0f1015 100%)",
    bookSpineBg: "#07080a",
  },
  "forest-emerald": {
    id: "forest-emerald",
    name: "03. 松烟墨绿",
    scene: "文学 / 散文 / 哲学 / 治愈",
    swatchLeft: "#0c2e24",
    swatchRight: "#d8b474",
    canvasBg: "#071410",
    bgGradient:
      "linear-gradient(112deg, #071914 0%, #0d2922 55%, #1b2e23 100%)",
    glowLeft: "rgba(52, 211, 153, 0.16)",
    glowRight: "rgba(217, 169, 92, 0.20)",
    borderMain: "rgba(216, 180, 116, 0.45)",
    borderSub: "rgba(216, 180, 116, 0.18)",
    titleColor: "#f4fbf7",
    subtitleColor: "#e6c994",
    accentHex: "#d8b474",
    tagBg: "rgba(216, 180, 116, 0.18)",
    tagText: "#f1dca7",
    bookCoverBg: "linear-gradient(145deg, #11332a 0%, #091c17 100%)",
    bookSpineBg: "#05110e",
  },
  "burgundy-velvet": {
    id: "burgundy-velvet",
    name: "04. 勃艮第红",
    scene: "诺奖名著 / 传记 / 艺术",
    swatchLeft: "#4a0e17",
    swatchRight: "#f3d28c",
    canvasBg: "#170709",
    bgGradient:
      "linear-gradient(112deg, #1f080b 0%, #380d14 55%, #2b1410 100%)",
    glowLeft: "rgba(244, 63, 94, 0.18)",
    glowRight: "rgba(251, 191, 36, 0.22)",
    borderMain: "rgba(243, 210, 140, 0.48)",
    borderSub: "rgba(243, 210, 140, 0.2)",
    titleColor: "#fff8f1",
    subtitleColor: "#f7d99b",
    accentHex: "#f3d28c",
    tagBg: "rgba(243, 210, 140, 0.18)",
    tagText: "#fde68a",
    bookCoverBg: "linear-gradient(145deg, #4c1118 0%, #24070b 100%)",
    bookSpineBg: "#160406",
  },
  "cosmic-indigo": {
    id: "cosmic-indigo",
    name: "05. 深空星蓝",
    scene: "科幻 / 悬疑推理 / 前沿",
    swatchLeft: "#0f2147",
    swatchRight: "#38bdf8",
    canvasBg: "#060b19",
    bgGradient:
      "linear-gradient(112deg, #070d21 0%, #101d42 52%, #1d1538 100%)",
    glowLeft: "rgba(56, 189, 248, 0.24)",
    glowRight: "rgba(168, 85, 247, 0.24)",
    borderMain: "rgba(125, 211, 252, 0.45)",
    borderSub: "rgba(125, 211, 252, 0.18)",
    titleColor: "#f0f9ff",
    subtitleColor: "#bae6fd",
    accentHex: "#7dd3fc",
    tagBg: "rgba(56, 189, 248, 0.18)",
    tagText: "#bae6fd",
    bookCoverBg: "linear-gradient(145deg, #152854 0%, #0b132b 100%)",
    bookSpineBg: "#060a17",
  },
  "oriental-ivory": {
    id: "oriental-ivory",
    name: "06. 宋韵宣纸",
    scene: "国学 / 诗词 / 浅色极简",
    swatchLeft: "#efe7d8",
    swatchRight: "#991b1b",
    isLight: true,
    canvasBg: "#f4efe6",
    bgGradient:
      "linear-gradient(112deg, #f7f3eb 0%, #efe7d8 56%, #e5dac6 100%)",
    glowLeft: "rgba(180, 83, 9, 0.08)",
    glowRight: "rgba(153, 27, 27, 0.10)",
    borderMain: "rgba(120, 53, 15, 0.35)",
    borderSub: "rgba(120, 53, 15, 0.15)",
    titleColor: "#1c1917",
    subtitleColor: "#7c2d12",
    accentHex: "#991b1b",
    tagBg: "rgba(153, 27, 27, 0.10)",
    tagText: "#991b1b",
    bookCoverBg: "linear-gradient(145deg, #881b1b 0%, #4a0e0e 100%)",
    bookSpineBg: "#2e0707",
  },
  "song-cyan-gold": {
    id: "song-cyan-gold",
    name: "07. 千里江山",
    scene: "宋韵 / 历史悬疑 / 国风",
    swatchLeft: "#0d3b3e",
    swatchRight: "#c28e3a",
    canvasBg: "#071a1c",
    bgGradient:
      "linear-gradient(112deg, #071f24 0%, #103236 52%, #2e2214 100%)",
    glowLeft: "rgba(45, 212, 191, 0.20)",
    glowRight: "rgba(234, 179, 8, 0.22)",
    borderMain: "rgba(234, 179, 8, 0.48)",
    borderSub: "rgba(45, 212, 191, 0.22)",
    titleColor: "#fef9eb",
    subtitleColor: "#fde68a",
    accentHex: "#eab308",
    tagBg: "rgba(234, 179, 8, 0.18)",
    tagText: "#fde047",
    bookCoverBg: "linear-gradient(145deg, #0f3d3e 0%, #1f170d 100%)",
    bookSpineBg: "#061517",
  },
  "amber-noir": {
    id: "amber-noir",
    name: "08. 迷雾侦探",
    scene: "悬疑推理 / 罪案 / 心理",
    swatchLeft: "#18181b",
    swatchRight: "#f59e0b",
    canvasBg: "#09090b",
    bgGradient:
      "linear-gradient(112deg, #090a0f 0%, #18181b 55%, #271c0c 100%)",
    glowLeft: "rgba(148, 163, 184, 0.15)",
    glowRight: "rgba(245, 158, 11, 0.25)",
    borderMain: "rgba(245, 158, 11, 0.5)",
    borderSub: "rgba(148, 163, 184, 0.2)",
    titleColor: "#f8fafc",
    subtitleColor: "#fbbf24",
    accentHex: "#f59e0b",
    tagBg: "rgba(245, 158, 11, 0.18)",
    tagText: "#fcd34d",
    bookCoverBg: "linear-gradient(145deg, #27272a 0%, #09090b 100%)",
    bookSpineBg: "#050507",
  },
  "sakura-dusk": {
    id: "sakura-dusk",
    name: "09. 暮春绯樱",
    scene: "治愈散文 / 情感 / 诗歌",
    swatchLeft: "#2e1028",
    swatchRight: "#f472b6",
    canvasBg: "#160814",
    bgGradient:
      "linear-gradient(112deg, #1b0a18 0%, #33142b 52%, #3b1d1e 100%)",
    glowLeft: "rgba(244, 114, 182, 0.20)",
    glowRight: "rgba(251, 191, 36, 0.18)",
    borderMain: "rgba(249, 168, 212, 0.45)",
    borderSub: "rgba(249, 168, 212, 0.18)",
    titleColor: "#fdf2f8",
    subtitleColor: "#fbcfe8",
    accentHex: "#f472b6",
    tagBg: "rgba(244, 114, 182, 0.18)",
    tagText: "#fbcfe8",
    bookCoverBg: "linear-gradient(145deg, #4a153b 0%, #1f0919 100%)",
    bookSpineBg: "#12040e",
  },
  "titanium-silver": {
    id: "titanium-silver",
    name: "10. 钛金包豪斯",
    scene: "现代商业 / 科技 / 建筑",
    swatchLeft: "#0f172a",
    swatchRight: "#94a3b8",
    canvasBg: "#0b0f19",
    bgGradient:
      "linear-gradient(112deg, #0b0f19 0%, #1e293b 55%, #0f172a 100%)",
    glowLeft: "rgba(148, 163, 184, 0.18)",
    glowRight: "rgba(56, 189, 248, 0.18)",
    borderMain: "rgba(226, 232, 240, 0.45)",
    borderSub: "rgba(148, 163, 184, 0.2)",
    titleColor: "#ffffff",
    subtitleColor: "#cbd5e1",
    accentHex: "#e2e8f0",
    tagBg: "rgba(226, 232, 240, 0.15)",
    tagText: "#f1f5f9",
    bookCoverBg: "linear-gradient(145deg, #334155 0%, #0f172a 100%)",
    bookSpineBg: "#090d16",
  },
}

export type RightVisualSymbol = "sword-crown" | "direwolf-dragon" | "planet-orbit" | "feather-quill" | "compass-rose"

export type RightBookGraphicStyle = "royal-sealed-tome" | "open-starlight-book" | "stacked-classics" // 无字皇家烫金火漆法典（金属护角 + 宝石星盘 + 垂落书签带，无任何书名文字） // 翻开的星芒古籍（摊开书页 + 鹅毛笔 + 冰火星轨，一眼识书） // 典藏古籍书堆与羽毛笔

export interface NovelElementsToggle {
  ironThrone: boolean // 铁王座千剑剪影
  wolfAndDragon: boolean // 史塔克冰原狼 vs 坦格利安火龙
  threeEyedRaven: boolean // 三眼乌鸦与鱼梁木心树红叶
  theWall: boolean // 绝境长城冰崖
  handOfTheKing: boolean // 国王之手徽章与家族箴言
}

export interface FontSizesConfig {
  categoryTag: number
  title: number
  subtitle: number
  author: number
  englishTitle: number
  quote: number
  badgeLabel: number
  topMotto: number
  sideEmblem: number
}

const DEFAULT_FONT_SIZES: FontSizesConfig = {
  categoryTag: 12,
  title: 52,
  subtitle: 16,
  author: 13,
  englishTitle: 11,
  quote: 12,
  badgeLabel: 10,
  topMotto: 9,
  sideEmblem: 10,
}

export interface BookCoverConfig {
  id: string
  issueNumber: string
  categoryTag: string
  title: string
  subtitle: string
  englishTitle: string
  author: string
  quote: string
  bgImage: string
  leftTint: string
  rightTint: string
  accentColor: string
  emblemType: "ice-fire" | "awakening" | "prosperous-hunger" | "gentle-rain" | "bartleby-wall" | "bianjing-code" | "galaxy" | "classic"
  bookSpineText: string
  houseMottoLeft: string
  houseMottoRight: string
  badgeLabel?: string
  topMottoLeft?: string
  topMottoRight?: string
  archTopText?: string
  archBottomText?: string
  shieldLeftText?: string
  shieldRightText?: string
}

// 根据书籍预设与具体模板生成该模板专属的初始文案（不同模板各自独立编辑）
function buildInitialTemplateCopy(
  book: BookCoverConfig,
  style: CoverStyleVariant,
): BookCoverConfig {
  const shortSubtitle =
    book.id === "song-of-ice-and-fire"
      ? "凛冬将至 · 血火同源"
      : book.id === "cognitive-awakening"
        ? "开启自我改变的原动力"
        : book.id === "hungry-prosperous-age"
          ? "乾隆时代的得与失 · 盛世繁华下的苍生饥馑"
          : book.id === "rain-falling-on-me"
            ? "万物皆有裂痕，那是光照进来的地方"
            : book.id === "bartleby-the-scrivener"
              ? "我宁愿不 · 面对华尔街高墙的沉默抵抗"
              : book.id === "along-the-river-code"
                ? "画中八百二十四人，皆是北宋盛世危局棋子"
                : book.id === "three-body"
                  ? "给岁月以文明，而不是给文明以岁月"
                  : "魔幻现实主义巅峰巨著"

  const isMinimalStyle =
    style === "tpl-2-center-emblem" ||
    style === "tpl-4-minimal-frame" ||
    style === "style-2-minimal-sword" ||
    style === "style-3-woodcut-heraldry" ||
    style === "style-4-red-comet-throne" ||
    style === "style-5-weirwood-snow"

  return {
    ...book,
    subtitle: isMinimalStyle ? shortSubtitle : book.subtitle,
    categoryTag:
      style === "style-5-weirwood-snow"
        ? book.id === "cognitive-awakening"
          ? "元认知觉醒 · 心智进化"
          : book.id === "hungry-prosperous-age"
            ? "乾隆时代 · 盛世背面"
            : book.id === "rain-falling-on-me"
              ? "故乡烟火 · 岁月深情"
              : book.id === "bartleby-the-scrivener"
                ? "华尔街故事 · 存在主义先声"
                : book.id === "along-the-river-code"
                  ? "北宋汴京 · 旷世奇局"
                  : "旧神信仰 · 鱼梁木心树"
        : book.categoryTag,
    englishTitle:
      style === "style-3-woodcut-heraldry"
        ? book.id === "cognitive-awakening"
          ? "ZHOU LING · AWAKENING"
          : book.id === "hungry-prosperous-age"
            ? "ZHANG HONGJIE · QIANLONG ERA"
            : book.id === "rain-falling-on-me"
              ? "LU QINGYI · FOUR SPRINGS"
              : book.id === "bartleby-the-scrivener"
                ? "HERMAN MELVILLE · 1853"
                : book.id === "along-the-river-code"
                  ? "YE WENBIAO · NORTHERN SONG"
                  : "GEORGE R.R. MARTIN"
        : style === "style-4-red-comet-throne"
          ? book.id === "cognitive-awakening"
            ? "METACOGNITION"
            : book.id === "hungry-prosperous-age"
              ? "1793 MACARTNEY EMBASSY"
              : book.id === "rain-falling-on-me"
                ? "THE RAIN FALLING ON ME"
                : book.id === "bartleby-the-scrivener"
                  ? "I WOULD PREFER NOT TO"
                  : book.id === "along-the-river-code"
                    ? "824 FIGURES IN THE SCROLL"
                    : "VALAR MORGHULIS"
          : book.englishTitle,
    badgeLabel:
      book.badgeLabel ||
      (book.id === "cognitive-awakening"
        ? "元认知·觉醒精读"
        : book.id === "hungry-prosperous-age"
          ? "乾隆得失·历史深读"
          : book.id === "rain-falling-on-me"
            ? "四个春天·治愈散文"
            : book.id === "bartleby-the-scrivener"
              ? "文学经典·荒诞哲思"
              : book.id === "along-the-river-code"
                ? "国风悬疑·神作精读"
                : "国王之手·典藏精读"),
    topMottoLeft:
      book.topMottoLeft ||
      (book.id === "cognitive-awakening"
        ? "THREE-BRAIN THEORY"
        : book.id === "hungry-prosperous-age"
          ? "PROSPEROUS ILLUSION"
          : book.id === "rain-falling-on-me"
            ? "HOMETOWN & PARENTS"
            : book.id === "bartleby-the-scrivener"
              ? "I WOULD PREFER NOT TO"
              : book.id === "along-the-river-code"
                ? "BIANJING RAINBOW BRIDGE"
                : "WINTER IS COMING"),
    topMottoRight:
      book.topMottoRight ||
      (book.id === "cognitive-awakening"
        ? "METACOGNITIVE AWAKENING"
        : book.id === "hungry-prosperous-age"
          ? "HUNGRY EMPIRE"
          : book.id === "rain-falling-on-me"
            ? "GENTLE RAIN OF TIME"
            : book.id === "bartleby-the-scrivener"
              ? "WALL STREET & DEAD LETTERS"
              : book.id === "along-the-river-code"
                ? "824 SECRETS IN THE SCROLL"
                : "FIRE AND BLOOD"),
    archTopText: "EX LIBRIS",
    archBottomText: "IDOL BOOKLIST",
    shieldLeftText:
      book.id === "cognitive-awakening"
        ? "SUBCONSCIOUS"
        : book.id === "hungry-prosperous-age"
          ? "STARVING PEOPLE"
          : book.id === "rain-falling-on-me"
            ? "DISTANT TRAIN"
            : book.id === "bartleby-the-scrivener"
              ? "WALL STREET"
              : book.id === "along-the-river-code"
                ? "RAINBOW BRIDGE"
                : "HOUSE STARK",
    shieldRightText:
      book.id === "cognitive-awakening"
        ? "METACOGNITION"
        : book.id === "hungry-prosperous-age"
          ? "IMPERIAL THRONE"
          : book.id === "rain-falling-on-me"
            ? "WARM EAVES"
            : book.id === "bartleby-the-scrivener"
              ? "PREFER NOT TO"
              : book.id === "along-the-river-code"
                ? "BIANJING CIPHER"
                : "TARGARYEN",
  }
}

const PRESET_COVERS: BookCoverConfig[] = [
  {
    id: "song-of-ice-and-fire",
    issueNumber: "NO. 042",
    categoryTag: "史诗奇幻 · 维斯特洛编年史",
    title: "冰与火之歌",
    subtitle: "铁王座上的千刃博弈，北境狼嚎与龙焰齐鸣",
    englishTitle: "A SONG OF ICE AND FIRE",
    author: "[美] 乔治·R·R·马丁 著",
    quote: "“凛冬将至 · 血火同源 · 凡人皆有一死”",
    bgImage:
      "https://images.unsplash.com/photo-1534237266271-1b42933ee8fd?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwyfHxkYXJrJTIwZ290aGljJTIwY2FzdGxlJTIwc25vdyUyMG1vdW50YWluJTIwZmlyZXxlbnwxfHx8fDE3OTMxNjQ0MTl8MA&ixlib=rb-4.1.0&q=80&w=1080",
    leftTint: "rgba(8, 28, 52, 0.92)",
    rightTint: "rgba(115, 18, 14, 0.88)",
    accentColor: "#e5a93c",
    emblemType: "ice-fire",
    bookSpineText: "A SONG OF ICE & FIRE",
    houseMottoLeft: "WINTER IS COMING · 史塔克冰原狼",
    houseMottoRight: "FIRE AND BLOOD · 坦格利安三头龙",
    badgeLabel: "国王之手·典藏精读",
    topMottoLeft: "WINTER IS COMING",
    topMottoRight: "FIRE AND BLOOD",
  },
  {
    id: "cognitive-awakening",
    issueNumber: "NO. 045",
    categoryTag: "思维跃迁 · 自我改变原动力",
    title: "认知觉醒",
    subtitle: "开启自我改变的原动力，从本能脑走向元认知觉醒",
    englishTitle: "COGNITIVE AWAKENING",
    author: "周岭 著",
    quote: "“人生所有的改变，都始于心智的觉醒与舒适区边缘的精进。”",
    bgImage:
      "https://images.unsplash.com/photo-1534237266271-1b42933ee8fd?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwyfHxkYXJrJTIwZ290aGljJTIwY2FzdGxlJTIwc25vdyUyMG1vdW50YWluJTIwZmlyZXxlbnwxfHx8fDE3OTMxNjQ0MTl8MA&ixlib=rb-4.1.0&q=80&w=1080",
    leftTint: "rgba(10, 26, 54, 0.93)",
    rightTint: "rgba(120, 62, 12, 0.88)",
    accentColor: "#f59e0b",
    emblemType: "awakening",
    bookSpineText: "COGNITIVE AWAKENING",
    houseMottoLeft: "SUBCONSCIOUS · 潜意识与三重大脑",
    houseMottoRight: "METACOGNITION · 元认知与深度学习",
    badgeLabel: "元认知·觉醒精读",
    topMottoLeft: "THREE-BRAIN THEORY",
    topMottoRight: "METACOGNITIVE AWAKENING",
  },
  {
    id: "hungry-prosperous-age",
    issueNumber: "NO. 046",
    categoryTag: "历史深读 · 乾隆时代的得与失",
    title: "饥饿的盛世",
    subtitle: "天朝上国的黄金幻象与滑向深渊的帝国背影",
    englishTitle: "THE HUNGRY PROSPEROUS AGE",
    author: "张宏杰 著",
    quote:
      "“乾隆盛世是一座建立在泥沙之上的金字塔，辉煌背面是苍生的饥馑与精神的窒息。”",
    bgImage:
      "https://images.unsplash.com/photo-1549696504-d2aec6b214f2?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxkYXJrJTIwZ290aGljJTIwY2FzdGxlJTIwc25vdyUyMG1vdW50YWluJTIwZmlyZXxlbnwxfHx8fDE3OTMxNjQ0MTl8MA&ixlib=rb-4.1.0&q=80&w=1080",
    leftTint: "rgba(18, 28, 36, 0.94)",
    rightTint: "rgba(112, 22, 16, 0.90)",
    accentColor: "#eab308",
    emblemType: "prosperous-hunger",
    bookSpineText: "HUNGRY PROSPEROUS AGE",
    houseMottoLeft: "FAMINE & TOIL · 苍生饥馑与内卷",
    houseMottoRight: "QIANLONG REIGN · 十全武功与天朝迷梦",
    badgeLabel: "乾隆得失·历史深读",
    topMottoLeft: "PROSPEROUS ILLUSION",
    topMottoRight: "HUNGRY EMPIRE",
  },
  {
    id: "rain-falling-on-me",
    issueNumber: "NO. 047",
    categoryTag: "人间烟火 · 故乡与岁月散文",
    title: "落在我身上的雨",
    subtitle: "穿过半生风雨与万里归途，回望故乡屋檐下最温柔的灯火",
    englishTitle: "THE RAIN FALLING ON ME · LU QINGYI",
    author: "陆庆屹 著",
    quote: "“生命里那些落在我身上的雨，最终都化作了屋檐下温柔的光与春天。”",
    bgImage:
      "https://images.unsplash.com/photo-1534237266271-1b42933ee8fd?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwyfHxkYXJrJTIwZ290aGljJTIwY2FzdGxlJTIwc25vdyUyMG1vdW50YWluJTIwZmlyZXxlbnwxfHx8fDE3OTMxNjQ0MTl8MA&ixlib=rb-4.1.0&q=80&w=1080",
    leftTint: "rgba(12, 34, 46, 0.93)",
    rightTint: "rgba(92, 45, 16, 0.88)",
    accentColor: "#f59e0b",
    emblemType: "gentle-rain",
    bookSpineText: "THE RAIN FALLING ON ME",
    houseMottoLeft: "FOUR SPRINGS · 四个春天与胶片记忆",
    houseMottoRight: "WARM EAVES · 故乡青瓦与父母灯火",
    badgeLabel: "四个春天·深情散文",
    topMottoLeft: "HOMETOWN & PARENTS",
    topMottoRight: "GENTLE RAIN OF TIME",
  },
  {
    id: "bartleby-the-scrivener",
    issueNumber: "NO. 048",
    categoryTag: "存在主义先声 · 现代人的精神困境",
    title: "抄写员巴托比",
    subtitle: "面对华尔街高墙的温柔抵抗：“我宁愿不”",
    englishTitle: "BARTLEBY, THE SCRIVENER · HERMAN MELVILLE",
    author: "[美] 赫尔曼·梅尔维尔 著",
    quote:
      "“我宁愿不（I would prefer not to）——在荒诞的规训世界里，守住最后的沉默。”",
    bgImage:
      "https://images.unsplash.com/photo-1600181982553-ce7d36051c01?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxhbmNpZW50JTIwbGlicmFyeSUyMGJvb2tzJTIwdmludGFnZSUyMGRhcmt8ZW58MXx8fHwxNzkzMTY0NDIwfDA&ixlib=rb-4.1.0&q=80&w=1080",
    leftTint: "rgba(15, 23, 34, 0.95)",
    rightTint: "rgba(68, 42, 22, 0.91)",
    accentColor: "#eab308",
    emblemType: "bartleby-wall",
    bookSpineText: "BARTLEBY, THE SCRIVENER",
    houseMottoLeft: "WALL STREET · 华尔街高墙与屏风隔间",
    houseMottoRight: "DEAD LETTER OFFICE · 死信邮局与绝对沉默",
    badgeLabel: "文学经典·荒诞哲思",
    topMottoLeft: "I WOULD PREFER NOT TO",
    topMottoRight: "WALL STREET & DEAD LETTERS",
  },
  {
    id: "along-the-river-code",
    issueNumber: "NO. 049",
    categoryTag: "历史悬疑巨著 · 北宋东京全景解密",
    title: "清明上河图密码",
    subtitle: "一幅名画藏尽帝国盛衰，八百二十四人皆在惊天杀局之中",
    englishTitle: "ALONG THE RIVER DURING THE QINGMING FESTIVAL CODE",
    author: "冶文彪 著",
    quote: "“梅船撞向汴河虹桥的那一刻，画中八百二十四人的命运齿轮同时转动。”",
    bgImage:
      "https://images.unsplash.com/photo-1549696504-d2aec6b214f2?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxkYXJrJTIwZ290aGljJTIwY2FzdGxlJTIwc25vdyUyMG1vdW50YWluJTIwZmlyZXxlbnwxfHx8fDE3OTMxNjQ0MTl8MA&ixlib=rb-4.1.0&q=80&w=1080",
    leftTint: "rgba(8, 36, 42, 0.94)",
    rightTint: "rgba(110, 52, 14, 0.90)",
    accentColor: "#eab308",
    emblemType: "bianjing-code",
    bookSpineText: "QINGMING SCROLL CODE",
    houseMottoLeft: "RAINBOW BRIDGE · 汴河虹桥与梅船奇案",
    houseMottoRight: "824 FIGURES · 盛世迷局与靖康前夜",
    badgeLabel: "国风悬疑·神作精读",
    topMottoLeft: "BIANJING RAINBOW BRIDGE",
    topMottoRight: "824 SECRETS IN THE SCROLL",
  },
  {
    id: "three-body",
    issueNumber: "NO. 043",
    categoryTag: "硬核科幻 · 宇宙社会学",
    title: "三体全集",
    subtitle: "给岁月以文明，而不是给文明以岁月",
    englishTitle: "REMEMBRANCE OF EARTH’S PAST",
    author: "刘慈欣 著",
    quote: "“弱小和无知不是生存的障碍，傲慢才是。”",
    bgImage:
      "https://images.unsplash.com/photo-1549696504-d2aec6b214f2?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxkYXJrJTIwZ290aGljJTIwY2FzdGxlJTIwc25vdyUyMG1vdW50YWluJTIwZmlyZXxlbnwxfHx8fDE3OTMxNjQ0MTl8MA&ixlib=rb-4.1.0&q=80&w=1080",
    leftTint: "rgba(10, 22, 48, 0.88)",
    rightTint: "rgba(49, 20, 74, 0.78)",
    accentColor: "#38bdf8",
    emblemType: "galaxy",
    bookSpineText: "THE THREE-BODY PROBLEM",
    houseMottoLeft: "DARK FOREST · 黑暗森林法则",
    houseMottoRight: "SOPHON · 智子高维展开",
  },
  {
    id: "one-hundred-years",
    issueNumber: "NO. 044",
    categoryTag: "魔幻现实 · 诺奖经典",
    title: "百年孤独",
    subtitle: "布恩迪亚家族七代人的传奇与马孔多兴衰",
    englishTitle: "ONE HUNDRED YEARS OF SOLITUDE",
    author: "[哥] 加西亚·马尔克斯 著",
    quote: "“生命中真正重要的不是你遭遇了什么，而是你记住了哪些事。”",
    bgImage:
      "https://images.unsplash.com/photo-1600181982553-ce7d36051c01?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxhbmNpZW50JTIwbGlicmFyeSUyMGJvb2tzJTIwdmludGFnZSUyMGRhcmt8ZW58MXx8fHwxNzkzMTY0NDIwfDA&ixlib=rb-4.1.0&q=80&w=1080",
    leftTint: "rgba(26, 23, 18, 0.88)",
    rightTint: "rgba(92, 54, 18, 0.78)",
    accentColor: "#f59e0b",
    emblemType: "classic",
    bookSpineText: "CIEN AÑOS DE SOLEDAD",
    houseMottoLeft: "MACONDO · 马孔多百年大雨",
    houseMottoRight: "ALCHEMY · 梅尔基亚德斯羊皮卷",
  },
]

/**
 * 固定可复用的品牌组件：「爱豆书单」
 * 无论背景与书籍如何更换，始终锁定在封面的固定坐标锚点，形成公众号家族式视觉锤
 */
function AidouBrandBadge({
  position,
  theme,
}: {
  position: BrandPosition
  theme: BrandTheme
}) {
  const posClasses: Record<BrandPosition, string> = {
    "top-left": "top-[6.5%] left-[4.2%]",
    "top-right": "top-[6.5%] right-[4.2%]",
    "bottom-left": "bottom-[7.5%] left-[4.2%]",
  }

  const themeStyles: Record<BrandTheme, {
    wrapper: string
    iconBg: string
    title: string
    sub: string
  }> = {
    "gold-dark": {
      wrapper:
        "bg-[#0b0e14]/95 border border-[#e5a93c]/60 shadow-[0_8px_28px_rgba(0,0,0,0.65)]",
      iconBg:
        "bg-gradient-to-br from-[#f6d365] via-[#e5a93c] to-[#b47615] text-[#0b0e14]",
      title: "text-[#fdf6e7]",
      sub: "text-[#e5a93c]",
    },
    "ivory-crimson": {
      wrapper:
        "bg-[#F9F6F0]/95 border border-[#8B1E1E]/40 shadow-[0_8px_24px_rgba(0,0,0,0.5)]",
      iconBg: "bg-[#8B1E1E] text-[#F9F6F0]",
      title: "text-[#1c1917]",
      sub: "text-[#8B1E1E]",
    },
    "frosted-glass": {
      wrapper:
        "bg-[#1e293b]/90 border border-white/35 shadow-[0_8px_30px_rgba(0,0,0,0.45)]",
      iconBg: "bg-white text-slate-900",
      title: "text-white",
      sub: "text-amber-300",
    },
  }

  const st = themeStyles[theme]

  return (
    <div
      className={`absolute z-30 ${posClasses[position]} flex items-center gap-2.5 rounded-full pl-1.5 pr-4 py-1.5 ${st.wrapper}`}
    >
      {/* 品牌星芒书页徽标 */}
      <div
        className={`w-8 h-8 rounded-full flex items-center justify-center shrink-0 shadow-inner ${st.iconBg}`}
      >
        <svg
          viewBox="0 0 24 24"
          className="w-4 h-4"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
        >
          <path
            d="M4 19.5v-15A2.5 2.5 0 0 1 6.5 2H19a1 1 0 0 1 1 1v18a1 1 0 0 1-1 1H6.5a2.5 2.5 0 0 1 0-5H20"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <path
            d="M12 6.5l1.1 2.4 2.4 1.1-2.4 1.1-1.1 2.4-1.1-2.4-2.4-1.1 2.4-1.1L12 6.5z"
            fill="currentColor"
            stroke="none"
          />
        </svg>
      </div>

      {/* 品牌主视觉字样 */}
      <div className="flex flex-col leading-none pr-1">
        <div className="flex items-center gap-1.5">
          <span
            className={`font-serif-sc font-black tracking-wider text-sm ${st.title}`}
          >
            爱豆书单
          </span>
        </div>
        <span
          className={`text-[9px] font-cinzel tracking-[0.18em] mt-0.5 font-semibold ${st.sub}`}
        >
          IDOL BOOKLIST
        </span>
      </div>
    </div>
  )
}

/**
 * 小说核心元素 1：铁王座 (The Iron Throne) 居中背光千剑剪影 + 瓦雷利亚巨剑放射
 */
function IronThroneSilhouette() {
  return (
    <svg
      viewBox="0 0 500 320"
      className="absolute left-1/2 bottom-0 -translate-x-1/2 h-[96%] w-auto opacity-85 pointer-events-none z-10"
      fill="none"
    >
      <defs>
        <linearGradient id="throneMetal" x1="50%" y1="0%" x2="50%" y2="100%">
          <stop offset="0%" stopColor="#fde68a" stopOpacity="0.9" />
          <stop offset="35%" stopColor="#92400e" stopOpacity="0.65" />
          <stop offset="100%" stopColor="#090b10" stopOpacity="0.98" />
        </linearGradient>
        <linearGradient id="bladeEdge" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#bae6fd" stopOpacity="0.75" />
          <stop offset="50%" stopColor="#fef3c7" stopOpacity="0.9" />
          <stop offset="100%" stopColor="#f97316" stopOpacity="0.75" />
        </linearGradient>
        <radialGradient id="throneGlow" cx="50%" cy="58%" r="48%">
          <stop offset="0%" stopColor="#f59e0b" stopOpacity="0.42" />
          <stop offset="55%" stopColor="#b91c1c" stopOpacity="0.16" />
          <stop offset="100%" stopColor="#000000" stopOpacity="0" />
        </radialGradient>
      </defs>

      {/* 王座背后熔炉烈焰光晕 */}
      <circle cx="250" cy="180" r="150" fill="url(#throneGlow)" />

      {/* 放射状千剑剑轮（象征征服者伊耿熔铸的千把败军之剑） */}
      <g stroke="url(#bladeEdge)" strokeWidth="1.2" opacity="0.65">
        <path d="M250 185 L250 14 M246 42 L254 42" />
        <path d="M250 185 L215 22 M213 48 L223 46" />
        <path d="M250 185 L285 22 M277 46 L287 48" />
        <path d="M250 185 L182 38 M184 62 L194 58" />
        <path d="M250 185 L318 38 M306 58 L316 62" />
        <path d="M250 185 L150 62 M156 84 L166 78" />
        <path d="M250 185 L350 62 M334 78 L344 84" />
        <path d="M250 185 L122 94 M134 112 L142 104" />
        <path d="M250 185 L378 94 M358 104 L366 112" />
        <path d="M250 185 L102 132" />
        <path d="M250 185 L398 132" />
        <path d="M250 185 L90 172" />
        <path d="M250 185 L410 172" />
      </g>

      {/* 铁王座高耸密集的剑刃靠背实体剪影 */}
      <path
        d="M175 310 L190 210 L165 185 L198 175 L178 115 L208 135 L198 68 L224 108 L222 36 L240 88 L250 12 L260 88 L278 36 L276 108 L302 68 L292 135 L322 115 L302 175 L335 185 L310 210 L325 310 Z"
        fill="url(#throneMetal)"
        stroke="#f59e0b"
        strokeWidth="0.9"
        strokeOpacity="0.6"
      />

      {/* 王座阶梯底座 */}
      <path
        d="M135 320 L155 278 L345 278 L365 320 Z"
        fill="#0b0f17"
        stroke="#e5a93c"
        strokeWidth="1"
        strokeOpacity="0.45"
      />
      <path
        d="M158 296 L342 296 M148 310 L352 310"
        stroke="#e5a93c"
        strokeWidth="0.8"
        strokeOpacity="0.35"
      />

      {/* 中央主剑（长爪/寒冰巨剑）高光 */}
      <path
        d="M250 8 L254 195 L250 215 L246 195 Z"
        fill="#fef3c7"
        fillOpacity="0.85"
      />
      <path d="M230 92 L270 92 L264 97 L236 97 Z" fill="#f59e0b" />
    </svg>
  )
}

/**
 * 小说核心元素 2：左侧北境史塔克冰原狼 (Direwolf) + 右侧坦格利安三头巨龙 (Dragon) 史诗图腾对峙
 */
function WolfAndDragonTotems() {
  return (
    <>
      {/* 左侧背景：北境寒冰奔狼图腾 (House Stark Direwolf) */}
      <svg
        viewBox="0 0 260 260"
        className="absolute left-[1.5%] bottom-[-4%] w-[36%] h-[92%] opacity-30 pointer-events-none z-10"
        fill="none"
      >
        <defs>
          <linearGradient id="starkIce" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#e0f2fe" />
            <stop offset="60%" stopColor="#38bdf8" />
            <stop offset="100%" stopColor="#0369a1" stopOpacity="0.2" />
          </linearGradient>
        </defs>
        <path
          d="M35 235 L52 168 L34 142 L64 118 L58 82 L88 96 L118 64 L114 42 L140 58 L176 44 L162 72 L198 78 L178 102 L212 112 L175 134 L154 128 L138 158 L162 195 L130 235 Z"
          fill="url(#starkIce)"
          stroke="#bae6fd"
          strokeWidth="1.5"
        />
        <polygon points="142,76 154,72 148,82" fill="#ffffff" />
        <g stroke="#7dd3fc" strokeWidth="1" opacity="0.65">
          <path d="M48 54 L48 82 M34 68 L62 68 M38 58 L58 78 M58 58 L38 78" />
        </g>
      </svg>

      {/* 右侧背景：坦格利安展翅火龙图腾 (House Targaryen Dragon) */}
      <svg
        viewBox="0 0 300 260"
        className="absolute right-[1%] top-[-2%] w-[42%] h-[96%] opacity-40 pointer-events-none z-10"
        fill="none"
      >
        <defs>
          <linearGradient id="dragonFire" x1="100%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="#fde047" />
            <stop offset="45%" stopColor="#f97316" />
            <stop offset="100%" stopColor="#991b1b" stopOpacity="0.2" />
          </linearGradient>
        </defs>
        <path
          d="M275 24 C230 32, 185 56, 156 94 L134 68 L108 74 L126 88 L95 104 L124 110 C102 138, 92 175, 112 218 C118 182, 136 156, 166 142 L152 178 L188 156 C210 182, 245 205, 282 215 C258 178, 254 144, 272 116 L232 124 L268 82 L226 92 L275 24 Z"
          fill="url(#dragonFire)"
          stroke="#fdba74"
          strokeWidth="1.4"
        />
        <path
          d="M92 104 C64 96, 38 108, 16 92 C42 122, 68 124, 96 112 Z"
          fill="#fde047"
          opacity="0.85"
        />
      </svg>
    </>
  )
}

/**
 * 小说核心元素 3：绝境长城冰崖 (The Wall) + 鱼梁木血色心树叶片与三眼乌鸦 (Three-Eyed Raven)
 */
function WallAndRavenOverlay({
  showWall,
  showRaven,
}: {
  showWall: boolean
  showRaven: boolean
}) {
  return (
    <>
      {showWall && (
        <svg
          viewBox="0 0 400 90"
          className="absolute left-0 bottom-0 w-[48%] h-[24%] opacity-45 pointer-events-none z-10"
          preserveAspectRatio="none"
        >
          <defs>
            <linearGradient id="wallIceGrad" x1="0%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" stopColor="#bae6fd" stopOpacity="0.75" />
              <stop offset="40%" stopColor="#0284c7" stopOpacity="0.45" />
              <stop offset="100%" stopColor="#082f49" stopOpacity="0.95" />
            </linearGradient>
          </defs>
          <path
            d="M0 90 L0 38 L28 32 L54 36 L88 24 L132 28 L168 18 L215 26 L260 34 L310 48 L365 68 L400 90 Z"
            fill="url(#wallIceGrad)"
          />
          <path
            d="M0 38 L28 32 L54 36 L88 24 L132 28 L168 18 L215 26 L260 34"
            stroke="#e0f2fe"
            strokeWidth="1.5"
            fill="none"
          />
        </svg>
      )}

      {showRaven && (
        <div className="absolute inset-0 pointer-events-none z-20 overflow-hidden">
          {/* 三眼乌鸦展翅剪影 */}
          <svg
            viewBox="0 0 120 70"
            className="absolute top-[11%] left-[47%] w-16 sm:w-20 h-auto opacity-85 drop-shadow-[0_4px_12px_rgba(0,0,0,0.9)]"
          >
            <path
              d="M60 34 C42 14, 18 8, 2 18 C18 24, 32 32, 46 42 L34 56 L54 48 L60 62 L66 48 L86 56 L74 42 C88 32, 102 24, 118 18 C102 8, 78 14, 60 34 Z"
              fill="#0f172a"
              stroke="#fbbf24"
              strokeWidth="1"
            />
            <circle cx="60" cy="29" r="2" fill="#ef4444" />
            <circle cx="56" cy="33" r="1.2" fill="#fde047" />
            <circle cx="64" cy="33" r="1.2" fill="#fde047" />
          </svg>

          {/* 鱼梁木（Weirwood）血色叶片飘落 */}
          <svg
            viewBox="0 0 40 40"
            className="absolute top-[18%] right-[33%] w-5 h-5 opacity-80 rotate-12"
          >
            <path
              d="M20 2 L24 14 L36 12 L27 21 L32 34 L20 26 L8 34 L13 21 L4 12 L16 14 Z"
              fill="#dc2626"
              stroke="#fca5a5"
              strokeWidth="0.8"
            />
          </svg>
          <svg
            viewBox="0 0 40 40"
            className="absolute bottom-[20%] left-[43%] w-4 h-4 opacity-70 -rotate-25"
          >
            <path
              d="M20 2 L24 14 L36 12 L27 21 L32 34 L20 26 L8 34 L13 21 L4 12 L16 14 Z"
              fill="#b91c1c"
              stroke="#fda4af"
              strokeWidth="0.8"
            />
          </svg>
        </div>
      )}
    </>
  )
}

/**
 * 《认知觉醒》专属核心视觉图层（参考原版风格一的全元素结构，量身绘制周岭《认知觉醒》5 大概念图腾）
 * 1. 居中：思维跃迁金字塔与破局觉醒光锥（对应三重大脑进化阶梯）
 * 2. 左右：左潜意识迷宫脑波 vs 右理智脑星轨罗盘
 * 3. 上方：元认知「高维审视之眼」与飞升金羽
 * 4. 左下：弗洛伊德潜意识冰山与舒适区边缘攀升线
 */
function CognitiveAwakeningElements({
  elements,
}: {
  elements: NovelElementsToggle
}) {
  return (
    <>
      {/* 左：本能/情绪脑深海神经元网络 & 右：理智脑觉醒金翼星轨 */}
      {elements.wolfAndDragon && (
        <>
          <svg
            viewBox="0 0 260 260"
            className="absolute left-[1.5%] bottom-[-4%] w-[36%] h-[92%] opacity-30 pointer-events-none z-10"
            fill="none"
          >
            <circle
              cx="110"
              cy="135"
              r="78"
              stroke="#38bdf8"
              strokeWidth="1"
              strokeDasharray="4 4"
            />
            <circle
              cx="110"
              cy="135"
              r="52"
              stroke="#7dd3fc"
              strokeWidth="1.2"
            />
            {/* 神经网络突触连线（象征本能脑与情绪脑潜意识连接） */}
            <g stroke="#bae6fd" strokeWidth="1.3" opacity="0.8">
              <line x1="65" y1="95" x2="110" y2="135" />
              <line x1="155" y1="90" x2="110" y2="135" />
              <line x1="58" y1="165" x2="110" y2="135" />
              <line x1="162" y1="172" x2="110" y2="135" />
              <line x1="110" y1="62" x2="110" y2="135" />
              <line x1="65" y1="95" x2="110" y2="62" />
              <line x1="155" y1="90" x2="162" y2="172" />
            </g>
            <circle cx="110" cy="135" r="6" fill="#e0f2fe" />
            <circle cx="65" cy="95" r="4" fill="#38bdf8" />
            <circle cx="155" cy="90" r="4" fill="#38bdf8" />
            <circle cx="58" cy="165" r="4" fill="#38bdf8" />
            <circle cx="162" cy="172" r="4" fill="#38bdf8" />
            <circle cx="110" cy="62" r="4.5" fill="#bae6fd" />
          </svg>

          <svg
            viewBox="0 0 300 260"
            className="absolute right-[1%] top-[-2%] w-[42%] h-[96%] opacity-35 pointer-events-none z-10"
            fill="none"
          >
            <defs>
              <linearGradient
                id="awakenGold"
                x1="100%"
                y1="0%"
                x2="0%"
                y2="100%"
              >
                <stop offset="0%" stopColor="#fef08a" />
                <stop offset="50%" stopColor="#f59e0b" />
                <stop offset="100%" stopColor="#b45309" stopOpacity="0.2" />
              </linearGradient>
            </defs>
            {/* 破茧飞升的理智金翼与复利增长曲线 */}
            <path
              d="M270 30 C220 42, 178 72, 152 118 C178 96, 218 82, 262 78 C222 104, 188 134, 168 172 C198 152, 232 142, 268 140 C236 168, 212 195, 198 225 C165 182, 142 135, 136 88 L270 30 Z"
              fill="url(#awakenGold)"
              stroke="#fde68a"
              strokeWidth="1.2"
            />
          </svg>
        </>
      )}

      {/* 正中：三重大脑（本能·情绪·理智）进化阶梯金字塔 + 觉醒破局光束（居中适配 1:1 转发） */}
      {elements.ironThrone && (
        <svg
          viewBox="0 0 500 320"
          className="absolute left-1/2 bottom-0 -translate-x-1/2 h-[96%] w-auto opacity-85 pointer-events-none z-10"
          fill="none"
        >
          <defs>
            <radialGradient id="awakenCenterGlow" cx="50%" cy="48%" r="48%">
              <stop offset="0%" stopColor="#fbbf24" stopOpacity="0.45" />
              <stop offset="55%" stopColor="#d97706" stopOpacity="0.16" />
              <stop offset="100%" stopColor="#000000" stopOpacity="0" />
            </radialGradient>
            <linearGradient
              id="pyramidGrad"
              x1="50%"
              y1="0%"
              x2="50%"
              y2="100%"
            >
              <stop offset="0%" stopColor="#fef3c7" stopOpacity="0.95" />
              <stop offset="45%" stopColor="#d97706" stopOpacity="0.65" />
              <stop offset="100%" stopColor="#090d16" stopOpacity="0.95" />
            </linearGradient>
          </defs>

          <circle cx="250" cy="155" r="145" fill="url(#awakenCenterGlow)" />

          {/* 放射状认知觉醒智慧光芒 */}
          <g
            stroke="#fde68a"
            strokeWidth="1.1"
            opacity="0.55"
            strokeDasharray="3 5"
          >
            <line x1="250" y1="130" x2="250" y2="10" />
            <line x1="250" y1="130" x2="180" y2="24" />
            <line x1="250" y1="130" x2="320" y2="24" />
            <line x1="250" y1="130" x2="125" y2="62" />
            <line x1="250" y1="130" x2="375" y2="62" />
            <line x1="250" y1="130" x2="95" y2="115" />
            <line x1="250" y1="130" x2="405" y2="115" />
          </g>

          {/* 三重大脑阶梯金字塔（底层本能脑 -> 中层情绪脑 -> 顶层理智脑灯塔） */}
          <polygon
            points="250,48 348,295 152,295"
            fill="url(#pyramidGrad)"
            stroke="#fbbf24"
            strokeWidth="1.4"
          />
          {/* 金字塔三层分割线 */}
          <line
            x1="214"
            y1="138"
            x2="286"
            y2="138"
            stroke="#fef08a"
            strokeWidth="1.5"
          />
          <line
            x1="182"
            y1="218"
            x2="318"
            y2="218"
            stroke="#f59e0b"
            strokeWidth="1.5"
          />
          {/* 中轴觉醒利剑/灯塔光柱 */}
          <path
            d="M250 12 L254 295 L246 295 Z"
            fill="#fffbeb"
            fillOpacity="0.85"
          />
          {/* 塔尖觉醒星芒 */}
          <circle cx="250" cy="48" r="7" fill="#ffffff" />
          <circle cx="250" cy="48" r="16" stroke="#fde047" strokeWidth="1.5" />
        </svg>
      )}

      {/* 左下：潜意识冰山与「舒适区边缘」复利攀升曲线 */}
      {elements.theWall && (
        <svg
          viewBox="0 0 400 90"
          className="absolute left-0 bottom-0 w-[48%] h-[24%] opacity-45 pointer-events-none z-10"
          preserveAspectRatio="none"
        >
          <path
            d="M0 90 L0 48 L45 36 L95 44 L148 22 L205 32 L265 16 L330 42 L400 90 Z"
            fill="url(#wallIceGrad)"
          />
          {/* 复利成长 S 曲线 */}
          <path
            d="M10 82 Q 140 76, 220 45 T 380 8"
            stroke="#fbbf24"
            strokeWidth="2"
            strokeDasharray="4 3"
            fill="none"
          />
        </svg>
      )}

      {/* 中上：元认知「第三视角审视之眼」与飞升灵感光点 */}
      {elements.threeEyedRaven && (
        <div className="absolute inset-0 pointer-events-none z-20 overflow-hidden">
          <svg
            viewBox="0 0 120 60"
            className="absolute top-[10%] left-[46.5%] w-16 sm:w-20 h-auto opacity-90 drop-shadow-[0_4px_12px_rgba(251,191,36,0.5)]"
            fill="none"
          >
            <path
              d="M10 30 Q60 2 110 30 Q60 58 10 30 Z"
              fill="#090d16"
              stroke="#fbbf24"
              strokeWidth="1.8"
            />
            <circle
              cx="60"
              cy="30"
              r="11"
              stroke="#38bdf8"
              strokeWidth="1.5"
              fill="#0c2d48"
            />
            <circle cx="60" cy="30" r="4.5" fill="#fef08a" />
          </svg>
        </div>
      )}
    </>
  )
}

/**
 * 《饥饿的盛世》专属核心历史元素图层（5 大原著意象，支持独立图层开关）
 * 1. 居中：紫禁城太和殿金銮重檐剪影 + 贯穿殿宇的“盛世裂痕”
 * 2. 左右：左「饥民枯穗与裂口空碗」vs 右「乾隆蟠龙御玺与天朝金辉」
 * 3. 上方：1793 马戛尔尼英国使团三桅风帆战舰（工业文明叩关）
 * 4. 左下：万里长城残垣古垛口与盛极而衰曲线
 */
function HungryProsperousElements({
  elements,
}: {
  elements: NovelElementsToggle
}) {
  return (
    <>
      {/* 左：苍生饥馑（枯垂谷穗与裂纹空碗） vs 右：天朝皇权（蟠龙云纹与乾隆御玺方印） */}
      {elements.wolfAndDragon && (
        <>
          <svg
            viewBox="0 0 260 260"
            className="absolute left-[1.5%] bottom-[-4%] w-[36%] h-[92%] opacity-35 pointer-events-none z-10"
            fill="none"
          >
            {/* 低垂枯萎的麦穗与饥荒干裂大地纹 */}
            <path
              d="M72 225 C72 155, 92 102, 138 76"
              stroke="#94a3b8"
              strokeWidth="2.2"
              strokeLinecap="round"
            />
            {/* 下垂枯穗颗粒 */}
            <ellipse
              cx="118"
              cy="92"
              rx="9"
              ry="4"
              transform="rotate(-25 118 92)"
              fill="#94a3b8"
            />
            <ellipse
              cx="134"
              cy="84"
              rx="9"
              ry="4"
              transform="rotate(-15 134 84)"
              fill="#94a3b8"
            />
            <ellipse
              cx="148"
              cy="88"
              rx="9"
              ry="4"
              transform="rotate(20 148 88)"
              fill="#94a3b8"
            />
            <ellipse
              cx="102"
              cy="112"
              rx="9"
              ry="4"
              transform="rotate(-35 102 112)"
              fill="#64748b"
            />
            <ellipse
              cx="122"
              cy="108"
              rx="9"
              ry="4"
              transform="rotate(15 122 108)"
              fill="#64748b"
            />
            {/* 底部饥民缺口破碗剪影 */}
            <path
              d="M44 176 L62 176 L68 188 L76 176 L156 176 C152 212, 128 228, 100 228 C72 228, 48 212, 44 176 Z"
              fill="#1e293b"
              stroke="#94a3b8"
              strokeWidth="1.5"
            />
            <rect x="78" y="228" width="44" height="8" rx="2" fill="#64748b" />
          </svg>

          <svg
            viewBox="0 0 300 260"
            className="absolute right-[1%] top-[-2%] w-[42%] h-[96%] opacity-38 pointer-events-none z-10"
            fill="none"
          >
            {/* 右侧：乾隆御览之宝篆刻方印 + 皇家升龙祥云 */}
            <rect
              x="162"
              y="36"
              width="86"
              height="86"
              rx="4"
              fill="#7f1d1d"
              fillOpacity="0.45"
              stroke="#f59e0b"
              strokeWidth="2.2"
            />
            <rect
              x="169"
              y="43"
              width="72"
              height="72"
              stroke="#fca5a5"
              strokeWidth="1"
              strokeDasharray="6 3"
            />
            {/* 篆书回纹抽象印记 */}
            <path
              d="M182 58 H202 V76 H182 V96 H202 M212 58 V96 H230 V58 H218 V76"
              stroke="#fde68a"
              strokeWidth="2.4"
              strokeLinecap="square"
            />
            {/* 盘旋皇室龙纹与祥云 */}
            <path
              d="M115 185 C135 145, 178 135, 215 155 C242 170, 265 152, 278 125"
              stroke="#fbbf24"
              strokeWidth="3"
              strokeLinecap="round"
            />
            <path
              d="M135 205 C162 178, 198 175, 235 192"
              stroke="#f97316"
              strokeWidth="1.8"
              strokeDasharray="4 4"
            />
          </svg>
        </>
      )}

      {/* 正中：紫禁城太和殿金銮重檐剪影 + 贯穿殿宇的「盛世裂痕」（居中适配 1:1 转发） */}
      {elements.ironThrone && (
        <svg
          viewBox="0 0 500 320"
          className="absolute left-1/2 bottom-0 -translate-x-1/2 h-[96%] w-auto opacity-88 pointer-events-none z-10"
          fill="none"
        >
          <defs>
            <radialGradient id="palaceGlow" cx="50%" cy="52%" r="48%">
              <stop offset="0%" stopColor="#eab308" stopOpacity="0.42" />
              <stop offset="55%" stopColor="#991b1b" stopOpacity="0.22" />
              <stop offset="100%" stopColor="#000000" stopOpacity="0" />
            </radialGradient>
            <linearGradient id="palaceGold" x1="50%" y1="0%" x2="50%" y2="100%">
              <stop offset="0%" stopColor="#fef08a" />
              <stop offset="45%" stopColor="#b45309" />
              <stop offset="100%" stopColor="#090c12" />
            </linearGradient>
          </defs>

          {/* 皇城夕照背光大日轮 */}
          <circle cx="250" cy="165" r="142" fill="url(#palaceGlow)" />
          <circle
            cx="250"
            cy="155"
            r="96"
            stroke="#eab308"
            strokeWidth="1"
            strokeOpacity="0.4"
          />

          {/* 太和殿第一重上檐（飞檐翘角 + 正脊鸱吻） */}
          <path
            d="M192 52 L192 40 L202 44 L250 34 L298 44 L308 40 L308 52 C328 74, 352 88, 378 92 C356 102, 332 104, 312 104 H188 C168 104, 144 102, 122 92 C148 88, 172 74, 192 52 Z"
            fill="url(#palaceGold)"
            stroke="#fde047"
            strokeWidth="1.2"
          />

          {/* 太和殿第二重下檐（重檐庑殿顶） */}
          <path
            d="M158 108 H342 C364 128, 392 140, 418 144 C394 156, 368 158, 344 158 H156 C132 158, 106 156, 82 144 C108 140, 136 128, 158 108 Z"
            fill="url(#palaceGold)"
            stroke="#fbbf24"
            strokeWidth="1.2"
          />

          {/* 朱红宫殿立柱与雕花格扇门 */}
          <rect
            x="148"
            y="158"
            width="204"
            height="72"
            fill="#1c0a0a"
            stroke="#eab308"
            strokeWidth="1.2"
          />
          <g stroke="#f59e0b" strokeWidth="2.2" opacity="0.75">
            <line x1="172" y1="158" x2="172" y2="230" />
            <line x1="204" y1="158" x2="204" y2="230" />
            <line x1="234" y1="158" x2="234" y2="230" />
            <line x1="266" y1="158" x2="266" y2="230" />
            <line x1="296" y1="158" x2="296" y2="230" />
            <line x1="328" y1="158" x2="328" y2="230" />
          </g>

          {/* 三层汉白玉丹陛须弥座台基 */}
          <path
            d="M122 230 H378 L392 256 H108 Z"
            fill="#161922"
            stroke="#eab308"
            strokeWidth="1"
          />
          <path
            d="M104 256 H396 L412 284 H88 Z"
            fill="#11131a"
            stroke="#eab308"
            strokeWidth="1"
          />
          <path
            d="M84 284 H416 L432 318 H68 Z"
            fill="#090b10"
            stroke="#eab308"
            strokeWidth="1"
          />
          {/* 中央御道丹陛石雕 */}
          <path
            d="M226 230 L216 318 H284 L274 230 Z"
            fill="#451a03"
            stroke="#fbbf24"
            strokeWidth="1.2"
          />

          {/* 贯穿盛世皇宫的闪电状「饥饿裂痕」（点题“饥饿的盛世”） */}
          <path
            d="M254 28 L242 92 L262 135 L238 196 L258 242 L244 316"
            stroke="#fef08a"
            strokeWidth="2.4"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <path
            d="M242 92 L218 118 M262 135 L288 162 M238 196 L212 218"
            stroke="#f87171"
            strokeWidth="1.5"
          />
        </svg>
      )}

      {/* 左下：万里长城古垛口剪影 & 盛极而衰国运曲线 */}
      {elements.theWall && (
        <svg
          viewBox="0 0 400 90"
          className="absolute left-0 bottom-0 w-[48%] h-[24%] opacity-48 pointer-events-none z-10"
          preserveAspectRatio="none"
        >
          <path
            d="M0 90 L0 42 L18 42 L18 28 L34 28 L34 42 L52 42 L52 28 L68 28 L68 42 L95 48 L125 34 L142 34 L142 20 L160 20 L160 34 L178 34 L178 20 L196 20 L196 34 L250 56 L330 74 L400 90 Z"
            fill="#0f172a"
            stroke="#94a3b8"
            strokeWidth="1.2"
          />
        </svg>
      )}

      {/* 中上：1793 马戛尔尼使团西洋三桅风帆船剪影（象征近代海洋文明叩关） */}
      {elements.threeEyedRaven && (
        <div className="absolute inset-0 pointer-events-none z-20 overflow-hidden">
          <svg
            viewBox="0 0 120 90"
            className="absolute top-[8%] left-[46%] w-16 sm:w-20 h-auto opacity-90 drop-shadow-[0_4px_12px_rgba(0,0,0,0.9)]"
            fill="none"
          >
            {/* 船体 */}
            <path
              d="M24 64 L96 64 L84 78 L36 78 Z"
              fill="#1e293b"
              stroke="#fbbf24"
              strokeWidth="1.4"
            />
            {/* 主桅与风帆 */}
            <line
              x1="60"
              y1="12"
              x2="60"
              y2="64"
              stroke="#fde68a"
              strokeWidth="1.6"
            />
            <line
              x1="38"
              y1="24"
              x2="38"
              y2="64"
              stroke="#fde68a"
              strokeWidth="1.2"
            />
            <line
              x1="82"
              y1="22"
              x2="82"
              y2="64"
              stroke="#fde68a"
              strokeWidth="1.2"
            />
            <path
              d="M60 16 C74 24, 76 42, 60 54 Z"
              fill="#fef3c7"
              fillOpacity="0.85"
            />
            <path
              d="M38 26 C48 32, 50 46, 38 56 Z"
              fill="#bae6fd"
              fillOpacity="0.75"
            />
            <path
              d="M82 24 C92 30, 94 46, 82 56 Z"
              fill="#fcd34d"
              fillOpacity="0.8"
            />
            {/* 海浪纹 */}
            <path
              d="M16 82 Q38 76 60 82 T104 82"
              stroke="#38bdf8"
              strokeWidth="1.4"
            />
          </svg>
        </div>
      )}
    </>
  )
}

/**
 * 陆庆屹《落在我身上的雨》专属高密度多层视觉组件
 */
function RainFallingOnMeElements({
  elements,
}: {
  elements: NovelElementsToggle
}) {
  return (
    <>
      {/* 全景底层：穿透云层的丁达尔暖金光束 + 全画幅斜织银丝细雨 */}
      <svg
        viewBox="0 0 900 383"
        className="absolute inset-0 w-full h-full pointer-events-none z-10"
        preserveAspectRatio="none"
        fill="none"
      >
        <defs>
          <linearGradient id="tyndallBeam" x1="0%" y1="0%" x2="35%" y2="100%">
            <stop offset="0%" stopColor="#fde68a" stopOpacity="0.22" />
            <stop offset="60%" stopColor="#f59e0b" stopOpacity="0.06" />
            <stop offset="100%" stopColor="#000000" stopOpacity="0" />
          </linearGradient>
          <linearGradient id="rainThread" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="#bae6fd" stopOpacity="0" />
            <stop offset="65%" stopColor="#e0f2fe" stopOpacity="0.65" />
            <stop offset="100%" stopColor="#fef08a" stopOpacity="0.85" />
          </linearGradient>
        </defs>

        {/* 丁达尔斜射云隙光束 */}
        <polygon
          points="320,0 440,0 620,383 450,383"
          fill="url(#tyndallBeam)"
        />
        <polygon
          points="510,0 590,0 760,383 650,383"
          fill="url(#tyndallBeam)"
        />

        {/* 漫天斜织的春雨丝 */}
        <g
          stroke="url(#rainThread)"
          strokeWidth="1.2"
          strokeLinecap="round"
          opacity="0.75"
        >
          <line x1="78" y1="18" x2="54" y2="112" />
          <line x1="142" y1="45" x2="116" y2="148" />
          <line x1="210" y1="12" x2="184" y2="118" />
          <line x1="286" y1="68" x2="262" y2="165" />
          <line x1="348" y1="15" x2="322" y2="124" />
          <line x1="418" y1="32" x2="394" y2="136" />
          <line x1="485" y1="10" x2="458" y2="115" />
          <line x1="552" y1="52" x2="528" y2="152" />
          <line x1="628" y1="18" x2="602" y2="122" />
          <line x1="704" y1="42" x2="678" y2="146" />
          <line x1="785" y1="14" x2="758" y2="118" />
          <line x1="846" y1="58" x2="820" y2="162" />
          <line x1="115" y1="185" x2="92" y2="278" />
          <line x1="248" y1="195" x2="224" y2="292" />
          <line x1="382" y1="175" x2="358" y2="268" />
          <line x1="518" y1="202" x2="494" y2="298" />
          <line x1="654" y1="182" x2="630" y2="275" />
          <line x1="812" y1="198" x2="788" y2="288" />
        </g>

        <circle cx="54" cy="112" r="2" fill="#e0f2fe" opacity="0.8" />
        <circle cx="184" cy="118" r="2.2" fill="#fef08a" opacity="0.85" />
        <circle cx="322" cy="124" r="2" fill="#bae6fd" opacity="0.8" />
        <circle cx="458" cy="115" r="2.5" fill="#fef08a" opacity="0.9" />
        <circle cx="602" cy="122" r="2" fill="#e0f2fe" opacity="0.8" />
        <circle cx="758" cy="118" r="2.2" fill="#fde68a" opacity="0.85" />
      </svg>

      {/* 左：远行火车铁轨、老式胶片相机与家书 vs 右：院角老梅花枝、双燕归巢与炊烟 */}
      {elements.wolfAndDragon && (
        <>
          <svg
            viewBox="0 0 280 260"
            className="absolute left-[1%] bottom-[-2%] w-[38%] h-[92%] opacity-42 pointer-events-none z-10"
            fill="none"
          >
            <path
              d="M18 250 C52 195, 96 156, 158 128"
              stroke="#7dd3fc"
              strokeWidth="2"
            />
            <path
              d="M58 255 C86 202, 122 164, 172 134"
              stroke="#7dd3fc"
              strokeWidth="2"
            />
            <g stroke="#bae6fd" strokeWidth="1.5" opacity="0.7">
              <line x1="28" y1="232" x2="66" y2="238" />
              <line x1="48" y1="206" x2="82" y2="212" />
              <line x1="72" y1="182" x2="104" y2="188" />
              <line x1="98" y1="162" x2="126" y2="168" />
              <line x1="126" y1="145" x2="148" y2="150" />
            </g>

            <rect
              x="36"
              y="72"
              width="76"
              height="52"
              rx="6"
              fill="#0c1926"
              stroke="#fbbf24"
              strokeWidth="1.8"
            />
            <rect
              x="46"
              y="63"
              width="22"
              height="9"
              rx="2"
              fill="#0c1926"
              stroke="#fbbf24"
              strokeWidth="1.4"
            />
            <circle cx="88" cy="66" r="4" fill="#fbbf24" />
            <circle
              cx="74"
              cy="98"
              r="18"
              fill="#082f49"
              stroke="#fde68a"
              strokeWidth="2"
            />
            <circle cx="74" cy="98" r="10" stroke="#7dd3fc" strokeWidth="1.2" />
            <circle cx="70" cy="94" r="3" fill="#ffffff" opacity="0.85" />
          </svg>

          <svg
            viewBox="0 0 300 260"
            className="absolute right-[0.5%] top-[-2%] w-[44%] h-[96%] opacity-55 pointer-events-none z-10"
            fill="none"
          >
            <path
              d="M300 28 C252 46, 214 68, 172 104 M236 56 C216 84, 198 112, 188 138 M210 74 L165 72"
              stroke="#d97706"
              strokeWidth="2.8"
              strokeLinecap="round"
            />
            <g fill="#fef08a" stroke="#f59e0b" strokeWidth="1">
              <circle cx="172" cy="104" r="7" />
              <circle cx="165" cy="72" r="6" />
              <circle cx="188" cy="138" r="6.5" />
              <circle cx="212" cy="74" r="5.5" />
              <circle cx="242" cy="54" r="6" />
            </g>
            <circle cx="172" cy="104" r="2.5" fill="#dc2626" />
            <circle cx="165" cy="72" r="2" fill="#dc2626" />
            <circle cx="188" cy="138" r="2.2" fill="#dc2626" />

            <path
              d="M148 235 Q132 195 154 162 T146 95"
              stroke="#fde68a"
              strokeWidth="2"
              strokeDasharray="4 4"
              opacity="0.55"
            />
          </svg>
        </>
      )}

      {/* 正中主视觉：故乡青瓦老屋飞檐 + 父母守候的暖橘木格花窗灯火 + 屋檐滴水珠串 + 底部多层雨水涟漪 */}
      {elements.ironThrone && (
        <svg
          viewBox="0 0 520 320"
          className="absolute left-1/2 bottom-0 -translate-x-1/2 h-[96%] w-auto opacity-92 pointer-events-none z-10"
          fill="none"
        >
          <defs>
            <radialGradient id="windowWarmGlow" cx="50%" cy="54%" r="46%">
              <stop offset="0%" stopColor="#fbbf24" stopOpacity="0.55" />
              <stop offset="48%" stopColor="#ea580c" stopOpacity="0.22" />
              <stop offset="100%" stopColor="#000000" stopOpacity="0" />
            </radialGradient>
            <linearGradient
              id="roofTileGrad"
              x1="50%"
              y1="0%"
              x2="50%"
              y2="100%"
            >
              <stop offset="0%" stopColor="#94a3b8" />
              <stop offset="40%" stopColor="#1e293b" />
              <stop offset="100%" stopColor="#090d16" />
            </linearGradient>
          </defs>

          <circle cx="260" cy="172" r="145" fill="url(#windowWarmGlow)" />

          <path
            d="M92 126 C135 118, 195 92, 260 64 C325 92, 385 118, 428 126 C408 136, 382 138, 356 138 H164 C138 138, 112 136, 92 126 Z"
            fill="url(#roofTileGrad)"
            stroke="#fde68a"
            strokeWidth="1.5"
          />
          <path
            d="M140 124 L260 76 L380 124"
            stroke="#38bdf8"
            strokeWidth="1"
            opacity="0.6"
          />

          <line
            x1="388"
            y1="134"
            x2="388"
            y2="156"
            stroke="#fde68a"
            strokeWidth="1.2"
          />
          <ellipse
            cx="388"
            cy="166"
            rx="11"
            ry="14"
            fill="#dc2626"
            stroke="#fbbf24"
            strokeWidth="1.4"
          />
          <line
            x1="388"
            y1="180"
            x2="388"
            y2="196"
            stroke="#f87171"
            strokeWidth="1.5"
          />

          <g fill="#bae6fd">
            <circle cx="132" cy="144" r="2" />
            <circle cx="132" cy="158" r="2.2" />
            <circle cx="132" cy="174" r="2.5" />
            <circle cx="132" cy="192" r="2" />
            <circle cx="168" cy="146" r="1.8" />
            <circle cx="168" cy="164" r="2.2" />
            <circle cx="352" cy="146" r="1.8" />
            <circle cx="352" cy="166" r="2.2" />
          </g>

          <rect
            x="188"
            y="142"
            width="144"
            height="92"
            rx="4"
            fill="#451a03"
            stroke="#fbbf24"
            strokeWidth="2"
          />
          <rect
            x="196"
            y="150"
            width="60"
            height="76"
            fill="#f59e0b"
            fillOpacity="0.82"
          />
          <rect
            x="264"
            y="150"
            width="60"
            height="76"
            fill="#fbbf24"
            fillOpacity="0.85"
          />
          <g stroke="#451a03" strokeWidth="2.2">
            <line x1="226" y1="150" x2="226" y2="226" />
            <line x1="294" y1="150" x2="294" y2="226" />
            <line x1="196" y1="175" x2="324" y2="175" />
            <line x1="196" y1="200" x2="324" y2="200" />
          </g>

          <g stroke="#7dd3fc" strokeWidth="1.2" opacity="0.75">
            <ellipse cx="260" cy="276" rx="52" ry="12" />
            <ellipse
              cx="260"
              cy="276"
              rx="88"
              ry="20"
              stroke="#fde68a"
              strokeOpacity="0.65"
            />
            <ellipse
              cx="260"
              cy="276"
              rx="128"
              ry="28"
              strokeDasharray="6 4"
              strokeOpacity="0.45"
            />
            <ellipse cx="132" cy="262" rx="22" ry="6" />
            <ellipse cx="132" cy="262" rx="38" ry="10" strokeOpacity="0.45" />
            <ellipse cx="388" cy="268" rx="24" ry="6" stroke="#fde68a" />
            <ellipse
              cx="388"
              cy="268"
              rx="42"
              ry="11"
              stroke="#fde68a"
              strokeOpacity="0.45"
            />
          </g>
        </svg>
      )}

      {/* 左下：黔南独山连绵喀斯特青黛远山与云雾 */}
      {elements.theWall && (
        <svg
          viewBox="0 0 420 95"
          className="absolute left-0 bottom-0 w-[52%] h-[26%] opacity-50 pointer-events-none z-10"
          preserveAspectRatio="none"
        >
          <path
            d="M0 95 L0 52 Q36 22 72 48 T148 32 T228 46 T312 28 T420 95 Z"
            fill="#0c2536"
            stroke="#7dd3fc"
            strokeWidth="1.2"
          />
          <path
            d="M0 72 Q85 58 175 68 T360 64"
            stroke="#e0f2fe"
            strokeWidth="1.5"
            strokeDasharray="8 4"
            fill="none"
            opacity="0.6"
          />
        </svg>
      )}

      {/* 中上：《四个春天》穿雨归巢的双飞春燕剪影 */}
      {elements.threeEyedRaven && (
        <div className="absolute inset-0 pointer-events-none z-20 overflow-hidden">
          <svg
            viewBox="0 0 100 70"
            className="absolute top-[9%] left-[44%] w-14 sm:w-18 h-auto opacity-92 drop-shadow-[0_4px_10px_rgba(0,0,0,0.85)]"
            fill="none"
          >
            <path
              d="M52 30 C36 12, 16 8, 4 16 C18 22, 30 30, 42 38 L24 58 L46 46 L52 38 L58 46 L80 58 L62 38 C74 30, 86 22, 96 16 C84 8, 66 12, 52 30 Z"
              fill="#0f172a"
              stroke="#fde68a"
              strokeWidth="1.3"
            />
            <circle cx="52" cy="24" r="2" fill="#f97316" />
          </svg>
          <svg
            viewBox="0 0 100 70"
            className="absolute top-[15%] left-[53%] w-10 sm:w-12 h-auto opacity-85 rotate-[-12deg]"
            fill="none"
          >
            <path
              d="M52 30 C36 12, 16 8, 4 16 C18 22, 30 30, 42 38 L24 58 L46 46 L52 38 L58 46 L80 58 L62 38 C74 30, 86 22, 96 16 C84 8, 66 12, 52 30 Z"
              fill="#1e293b"
              stroke="#7dd3fc"
              strokeWidth="1.3"
            />
          </svg>
        </div>
      )}
    </>
  )
}

/**
 * 全局通用「高定装帧精雕细节增强层」(Rich Design Overlay)
 */
function RichDesignOverlay({
  accentColor = "#e5a93c",
}: {
  accentColor?: string
}) {
  return (
    <div className="absolute inset-0 pointer-events-none z-20 overflow-hidden">
      <div
        className="absolute inset-[2.6%] rounded-lg"
        style={{ border: `1px solid ${accentColor}55` }}
      />
      <div
        className="absolute inset-[3.5%] rounded"
        style={{ border: `1px dashed ${accentColor}30` }}
      />

      {([
        "top-[2.6%] left-[2.6%] rotate-0",
        "top-[2.6%] right-[2.6%] rotate-90",
        "bottom-[2.6%] left-[2.6%] -rotate-90",
        "bottom-[2.6%] right-[2.6%] rotate-180",
      ] as const).map((posCls, idx) => (
        <svg
          key={idx}
          viewBox="0 0 36 36"
          className={`absolute ${posCls} w-6 h-6 sm:w-7 sm:h-7 opacity-80`}
          fill="none"
        >
          <path d="M2 34 V2 H34" stroke={accentColor} strokeWidth="2.2" />
          <path d="M8 26 V8 H26" stroke={accentColor} strokeWidth="1.2" />
          <rect
            x="8"
            y="8"
            width="7"
            height="7"
            stroke={accentColor}
            strokeWidth="1.2"
          />
          <circle cx="18" cy="18" r="2" fill={accentColor} />
        </svg>
      ))}

      <svg
        viewBox="0 0 240 20"
        className="absolute bottom-[3.2%] left-1/2 -translate-x-1/2 w-44 h-4 opacity-65"
        fill="none"
      >
        <line
          x1="10"
          y1="10"
          x2="96"
          y2="10"
          stroke={accentColor}
          strokeWidth="1"
        />
        <line
          x1="144"
          y1="10"
          x2="230"
          y2="10"
          stroke={accentColor}
          strokeWidth="1"
        />
        <polygon points="120,2 125,10 120,18 115,10" fill={accentColor} />
        <circle cx="104" cy="10" r="2" fill={accentColor} />
        <circle cx="136" cy="10" r="2" fill={accentColor} />
      </svg>

      <svg
        viewBox="0 0 900 383"
        className="absolute inset-0 w-full h-full opacity-75"
        fill="none"
      >
        <g fill={accentColor}>
          <circle cx="88" cy="142" r="1.5" opacity="0.7" />
          <circle cx="156" cy="84" r="2" opacity="0.5" />
          <circle cx="295" cy="52" r="1.5" opacity="0.8" />
          <circle cx="412" cy="96" r="2.2" opacity="0.6" />
          <circle cx="548" cy="48" r="1.8" opacity="0.75" />
          <circle cx="672" cy="88" r="1.5" opacity="0.65" />
          <circle cx="818" cy="128" r="2" opacity="0.7" />
          <circle cx="512" cy="312" r="1.6" opacity="0.6" />
          <circle cx="635" cy="328" r="2" opacity="0.5" />
        </g>
        <path
          d="M585 62 L587 68 L593 70 L587 72 L585 78 L583 72 L577 70 L583 68 Z"
          fill="#fef08a"
          opacity="0.85"
        />
        <path
          d="M368 42 L369.5 46.5 L374 48 L369.5 49.5 L368 54 L366.5 49.5 L362 48 L366.5 46.5 Z"
          fill="#bae6fd"
          opacity="0.8"
        />
      </svg>
    </div>
  )
}

/**
 * 赫尔曼·梅尔维尔《抄写员巴托比》专属视觉元素套件（可独立拆分调用）
 */
function BartlebyCenterWall() {
  return (
    <svg
      viewBox="0 0 520 320"
      className="absolute left-1/2 bottom-0 -translate-x-1/2 h-[96%] w-auto opacity-92 pointer-events-none z-10"
      fill="none"
    >
      <defs>
        <radialGradient id="gasLampGlow" cx="50%" cy="48%" r="46%">
          <stop offset="0%" stopColor="#fde047" stopOpacity="0.38" />
          <stop offset="52%" stopColor="#b45309" stopOpacity="0.16" />
          <stop offset="100%" stopColor="#000000" stopOpacity="0" />
        </radialGradient>
        <linearGradient id="brickWallGrad" x1="50%" y1="0%" x2="50%" y2="100%">
          <stop offset="0%" stopColor="#1e293b" />
          <stop offset="50%" stopColor="#0f172a" />
          <stop offset="100%" stopColor="#05070b" />
        </linearGradient>
      </defs>

      <circle cx="260" cy="155" r="145" fill="url(#gasLampGlow)" />

      <rect
        x="162"
        y="24"
        width="196"
        height="286"
        rx="3"
        fill="url(#brickWallGrad)"
        stroke="#eab308"
        strokeWidth="1.4"
        strokeOpacity="0.7"
      />

      <g stroke="#475569" strokeWidth="1" opacity="0.55">
        <line x1="162" y1="54" x2="358" y2="54" />
        <line x1="162" y1="84" x2="358" y2="84" />
        <line x1="162" y1="114" x2="358" y2="114" />
        <line x1="162" y1="144" x2="358" y2="144" />
        <line x1="162" y1="174" x2="358" y2="174" />
        <line x1="162" y1="204" x2="358" y2="204" />
        <line x1="162" y1="234" x2="358" y2="234" />
        <line x1="162" y1="264" x2="358" y2="264" />
        <line x1="210" y1="24" x2="210" y2="54" />
        <line x1="295" y1="24" x2="295" y2="54" />
        <line x1="188" y1="54" x2="188" y2="84" />
        <line x1="322" y1="54" x2="322" y2="84" />
      </g>

      <path
        d="M222 72 C222 50, 298 50, 298 72 V198 H222 Z"
        fill="#090d16"
        stroke="#fbbf24"
        strokeWidth="2"
      />
      <path
        d="M227 74 C227 56, 293 56, 293 74 V193 H227 Z"
        fill="#eab308"
        fillOpacity="0.22"
      />
      <line
        x1="260"
        y1="56"
        x2="260"
        y2="198"
        stroke="#fbbf24"
        strokeWidth="1.8"
      />
      <line
        x1="222"
        y1="108"
        x2="298"
        y2="108"
        stroke="#fbbf24"
        strokeWidth="1.5"
      />
      <line
        x1="222"
        y1="152"
        x2="298"
        y2="152"
        stroke="#fbbf24"
        strokeWidth="1.5"
      />

      <polygon
        points="136,305 136,168 172,154 172,292"
        fill="#064e3b"
        fillOpacity="0.82"
        stroke="#fbbf24"
        strokeWidth="1.3"
      />
      <polygon
        points="172,292 172,154 206,168 206,305"
        fill="#047857"
        fillOpacity="0.78"
        stroke="#fbbf24"
        strokeWidth="1.3"
      />

      <circle
        cx="260"
        cy="176"
        r="11"
        fill="#090b10"
        stroke="#fde68a"
        strokeWidth="1.4"
      />
      <path
        d="M238 308 L244 202 C244 192, 276 192, 276 202 L282 308 Z"
        fill="#090b10"
        stroke="#fde68a"
        strokeWidth="1.4"
      />

      <rect
        x="184"
        y="274"
        width="152"
        height="22"
        rx="3"
        fill="#090b10"
        stroke="#eab308"
        strokeWidth="1"
      />
      <text
        x="260"
        y="289"
        textAnchor="middle"
        fill="#fde68a"
        fontSize="9.5"
        fontFamily="Cinzel, serif"
        letterSpacing="2"
      >
        I WOULD PREFER NOT TO
      </text>
    </svg>
  )
}

function BartlebySidesScrollsAndQuill() {
  return (
    <>
      <svg
        viewBox="0 0 280 260"
        className="absolute left-[1%] bottom-[-2%] w-[38%] h-[92%] opacity-48 pointer-events-none z-10"
        fill="none"
      >
        <g stroke="#fbbf24" strokeWidth="1.5" fill="#1e293b">
          <rect x="28" y="198" width="128" height="22" rx="4" />
          <rect x="36" y="172" width="116" height="22" rx="4" />
          <rect x="24" y="146" width="124" height="22" rx="4" />
          <rect x="42" y="120" width="104" height="22" rx="4" />
          <rect x="48" y="88" width="88" height="26" rx="13" fill="#0f172a" />
          <circle cx="62" cy="101" r="8" fill="#fde68a" fillOpacity="0.3" />
        </g>
        <path
          d="M88 88 V220 M62 146 V172 M116 172 V198"
          stroke="#dc2626"
          strokeWidth="3"
        />
        <circle
          cx="88"
          cy="101"
          r="5"
          fill="#dc2626"
          stroke="#fde68a"
          strokeWidth="1"
        />
      </svg>

      <svg
        viewBox="0 0 300 260"
        className="absolute right-[1%] top-[-2%] w-[42%] h-[96%] opacity-52 pointer-events-none z-10"
        fill="none"
      >
        <path
          d="M188 156 H222 L232 174 V208 H178 V174 L188 156 Z"
          fill="#0f172a"
          stroke="#fbbf24"
          strokeWidth="1.8"
        />
        <rect
          x="193"
          y="144"
          width="24"
          height="12"
          fill="#1e293b"
          stroke="#fbbf24"
          strokeWidth="1.5"
        />
        <path
          d="M268 42 C238 56, 218 88, 208 136 L202 156 L214 138 C238 124, 258 92, 268 42 Z"
          fill="#fbbf24"
          fillOpacity="0.85"
        />
        <path d="M204 152 L262 50" stroke="#fffbeb" strokeWidth="1.6" />
        <g transform="rotate(-12 142 185)">
          <rect
            x="108"
            y="166"
            width="68"
            height="44"
            rx="3"
            fill="#1e293b"
            stroke="#fde68a"
            strokeWidth="1.5"
          />
          <path
            d="M108 166 L142 192 L176 166"
            stroke="#fde68a"
            strokeWidth="1.4"
          />
          <circle cx="142" cy="190" r="4.5" fill="#dc2626" />
        </g>
      </svg>
    </>
  )
}

function BartlebySkyLettersAndLamp() {
  return (
    <div className="absolute inset-0 pointer-events-none z-20 overflow-hidden">
      <svg
        viewBox="0 0 100 110"
        className="absolute top-0 left-[46%] w-14 sm:w-16 h-auto opacity-90 drop-shadow-[0_6px_16px_rgba(251,191,36,0.6)]"
        fill="none"
      >
        <line x1="50" y1="0" x2="50" y2="34" stroke="#fbbf24" strokeWidth="2" />
        <path
          d="M32 34 H68 L62 76 H38 Z"
          fill="#fef08a"
          fillOpacity="0.25"
          stroke="#fbbf24"
          strokeWidth="1.8"
        />
        <path
          d="M26 34 H74 M34 76 H66 L50 90 Z"
          fill="#0f172a"
          stroke="#fbbf24"
          strokeWidth="1.5"
        />
        <circle cx="50" cy="56" r="8" fill="#fef08a" />
      </svg>

      <svg
        viewBox="0 0 60 40"
        className="absolute top-[18%] right-[32%] w-9 h-6 opacity-80 rotate-15"
        fill="none"
      >
        <rect
          x="4"
          y="4"
          width="52"
          height="32"
          rx="2"
          fill="#0f172a"
          stroke="#fde68a"
          strokeWidth="1.5"
        />
        <path d="M4 4 L30 22 L56 4" stroke="#fde68a" strokeWidth="1.4" />
        <circle cx="30" cy="21" r="3.5" fill="#dc2626" />
      </svg>
      <svg
        viewBox="0 0 60 40"
        className="absolute bottom-[24%] left-[41%] w-8 h-5 opacity-75 -rotate-20"
        fill="none"
      >
        <rect
          x="4"
          y="4"
          width="52"
          height="32"
          rx="2"
          fill="#0f172a"
          stroke="#94a3b8"
          strokeWidth="1.5"
        />
        <path d="M4 4 L30 22 L56 4" stroke="#94a3b8" strokeWidth="1.4" />
      </svg>
    </div>
  )
}

function BartlebyBottomWallStreet() {
  return (
    <svg
      viewBox="0 0 420 95"
      className="absolute left-0 bottom-0 w-[52%] h-[25%] opacity-55 pointer-events-none z-10"
      preserveAspectRatio="none"
      fill="none"
    >
      <path
        d="M0 95 V32 H38 V52 H64 V18 H108 V46 H138 V24 H182 V58 H220 V36 H262 V68 H310 V48 H356 V95 Z"
        fill="#090d16"
        stroke="#64748b"
        strokeWidth="1.2"
      />
      <g stroke="#eab308" strokeWidth="1.2" opacity="0.55">
        <line x1="16" y1="55" x2="16" y2="95" />
        <line x1="32" y1="55" x2="32" y2="95" />
        <line x1="48" y1="55" x2="48" y2="95" />
        <line x1="64" y1="55" x2="64" y2="95" />
        <line x1="80" y1="55" x2="80" y2="95" />
        <line x1="96" y1="55" x2="96" y2="95" />
        <line x1="8" y1="68" x2="108" y2="68" />
      </g>
    </svg>
  )
}

export default function App() {
  const [selectedBookId, setSelectedBookId] = useState<string>(
    "along-the-river-code",
  )
  const [coverStyle, setCoverStyle] = useState<CoverStyleVariant>(
    "style-1-epic-original",
  )
  const [colorScheme, setColorScheme] = useState<ColorSchemeId>("ice-fire-gold")
  const [rightSymbol, setRightSymbol] =
    useState<RightVisualSymbol>("sword-crown")
  const [rightBookStyle, setRightBookStyle] = useState<RightBookGraphicStyle>(
    "open-starlight-book",
  )
  const [styleTab, setStyleTab] = useState<"universal" | "icefire">("icefire")
  const [showAllGallery, setShowAllGallery] = useState<boolean>(true)
  const [showRichOrnament, setShowRichOrnament] = useState<boolean>(true)

  // ==================== 背景模板库 & 自由混搭元素选择器状态 ====================
  const [selectedBgId, setSelectedBgId] =
    useState<BackgroundTemplateId>("bg-book-default")
  const [centerElement, setCenterElement] =
    useState<CenterElementId>("auto-book")
  const [sideElement, setSideElement] = useState<SideElementId>("auto-book")
  const [skyElement, setSkyElement] = useState<SkyElementId>("auto-book")
  const [bottomElement, setBottomElement] =
    useState<BottomElementId>("auto-book")
  const [extraRainOverlay, setExtraRainOverlay] = useState<boolean>(false)
  const [elementQuery, setElementQuery] = useState("")
  const [exportError, setExportError] = useState("")
  const [elementPage, setElementPage] = useState<1 | 2 | 3 | 4>(1)
  const [expandAllElementPages, setExpandAllElementPages] =
    useState<boolean>(false)
  const [brandPosition, setBrandPosition] = useState<BrandPosition>("top-left")
  const [brandTheme, setBrandTheme] = useState<BrandTheme>("gold-dark")
  const [showSafeZone, setShowSafeZone] = useState<boolean>(false)
  const [showCenterCrop, setShowCenterCrop] = useState<boolean>(false)
  const [isDownloading, setIsDownloading] = useState<boolean>(false)

  // 按「书籍ID__模板ID」独立存储每个模板的文案与字号，不同模板互不干扰且 100% 实时生效
  const [templateCopyStore, setTemplateCopyStore] =
    useState<Record<string, BookCoverConfig>>({})
  const [templateFontStore, setTemplateFontStore] =
    useState<Record<string, FontSizesConfig>>({})

  const basePreset =
    PRESET_COVERS.find((b) => b.id === selectedBookId) || PRESET_COVERS[0]
  const storeKey = `${selectedBookId}__${coverStyle}`

  const activeConfig: BookCoverConfig =
    templateCopyStore[storeKey] ||
    buildInitialTemplateCopy(basePreset, coverStyle)
  const fontSizes: FontSizesConfig =
    templateFontStore[storeKey] || DEFAULT_FONT_SIZES

  const mainCanvasRef = useRef<HTMLDivElement | null>(null)
  const previewWrapperRef = useRef<HTMLDivElement | null>(null)
  const [previewScale, setPreviewScale] = useState<number>(0.48)
  const [baseCanvasWidth, setBaseCanvasWidth] = useState<number>(820)

  useEffect(() => {
    const updateScale = () => {
      const mainW = mainCanvasRef.current?.clientWidth || 820
      const prevW = previewWrapperRef.current?.clientWidth || 400
      setBaseCanvasWidth(mainW)
      setPreviewScale(prevW / mainW)
    }
    updateScale()
    const ro = new ResizeObserver(updateScale)
    if (mainCanvasRef.current) ro.observe(mainCanvasRef.current)
    if (previewWrapperRef.current) ro.observe(previewWrapperRef.current)
    window.addEventListener("resize", updateScale)
    return () => {
      ro.disconnect()
      window.removeEventListener("resize", updateScale)
    }
  }, [])

  const [novelElements, setNovelElements] = useState<NovelElementsToggle>({
    ironThrone: true,
    wolfAndDragon: true,
    threeEyedRaven: true,
    theWall: true,
    handOfTheKing: true,
  })

  const toggleElement = (key: keyof NovelElementsToggle) => {
    setNovelElements((prev) => ({ ...prev, [key]: !prev[key] }))
  }

  const updateField = <K extends keyof BookCoverConfig,>(
    key: K,
    value: BookCoverConfig[K],
  ) => {
    setTemplateCopyStore((prev) => {
      const current =
        prev[storeKey] || buildInitialTemplateCopy(basePreset, coverStyle)
      return {
        ...prev,
        [storeKey]: { ...current, [key]: value },
      }
    })
  }

  const updateFontSize = (key: keyof FontSizesConfig, val: number) => {
    const clamped = Math.max(
      8,
      Math.min(120, Number.isNaN(val) ? DEFAULT_FONT_SIZES[key] : val),
    )
    setTemplateFontStore((prev) => {
      const current = prev[storeKey] || DEFAULT_FONT_SIZES
      return {
        ...prev,
        [storeKey]: { ...current, [key]: clamped },
      }
    })
  }

  const resetCurrentTemplateCopy = () => {
    setTemplateCopyStore((prev) => {
      const next = { ...prev }
      delete next[storeKey]
      return next
    })
    setTemplateFontStore((prev) => {
      const next = { ...prev }
      delete next[storeKey]
      return next
    })
  }

  const isIceAndFire = activeConfig.emblemType === "ice-fire"
  const isAwakening = activeConfig.emblemType === "awakening"
  const isProsperousHunger = activeConfig.emblemType === "prosperous-hunger"
  const isGentleRain = activeConfig.emblemType === "gentle-rain"
  const isBartleby = activeConfig.emblemType === "bartleby-wall"
  const isBianjingCode = activeConfig.emblemType === "bianjing-code"
  const palette = COLOR_PALETTES[colorScheme]

  const activeBgTemplate =
    BACKGROUND_TEMPLATES.find((b) => b.id === selectedBgId) ||
    BACKGROUND_TEMPLATES[0]
  const effectiveBgImage =
    selectedBgId === "bg-book-default"
      ? activeConfig.bgImage
      : activeBgTemplate.bgImage

  // 当用户切换了 6 套配色方案或 8 套背景模板时，所有 9 款风格统一计算最终生效的色彩与渐变
  const effectiveLeftTint =
    selectedBgId !== "bg-book-default"
      ? activeBgTemplate.leftTint
      : colorScheme !== "ice-fire-gold"
        ? palette.swatchLeft
        : activeConfig.leftTint
  const effectiveRightTint =
    selectedBgId !== "bg-book-default"
      ? activeBgTemplate.rightTint
      : colorScheme !== "ice-fire-gold"
        ? palette.swatchRight
        : activeConfig.rightTint
  const effectiveAccentColor =
    colorScheme !== "ice-fire-gold"
      ? palette.accentHex
      : selectedBgId !== "bg-book-default"
        ? activeBgTemplate.accentColor
        : activeConfig.accentColor
  const effectiveUnifiedBgGradient =
    selectedBgId !== "bg-book-default"
      ? `linear-gradient(110deg, ${activeBgTemplate.leftTint} 0%, ${palette.canvasBg} 50%, ${activeBgTemplate.rightTint} 100%)`
      : palette.bgGradient

  const resolvedCenter: CenterElementId =
    centerElement !== "auto-book"
      ? centerElement
      : !novelElements.ironThrone
        ? "none"
        : isBianjingCode
          ? "bianjing-rainbow-bridge"
          : isBartleby
            ? "bartleby-wall-window"
            : isGentleRain
              ? "hometown-eaves"
              : isProsperousHunger
                ? "imperial-palace"
                : isAwakening
                  ? "brain-pyramid"
                  : "iron-throne"

  const resolvedSide: SideElementId =
    sideElement !== "auto-book"
      ? sideElement
      : !novelElements.wolfAndDragon
        ? "none"
        : isBianjingCode
          ? "bianjing-fanlou-scroll"
          : isBartleby
            ? "bartleby-scrolls-quill"
            : isGentleRain
              ? "train-plum"
              : isProsperousHunger
                ? "famine-seal"
                : isAwakening
                  ? "brain-wings"
                  : "wolf-dragon"

  const resolvedSky: SkyElementId =
    skyElement !== "auto-book"
      ? skyElement
      : !novelElements.threeEyedRaven
        ? "none"
        : isBianjingCode
          ? "song-cranes-clouds"
          : isBartleby
            ? "bartleby-dead-letters"
            : isGentleRain
              ? "spring-swallows"
              : isProsperousHunger
                ? "macartney-ship"
                : isAwakening
                  ? "meta-eye"
                  : "raven-leaves"

  const resolvedBottom: BottomElementId =
    bottomElement !== "auto-book"
      ? bottomElement
      : !novelElements.theWall
        ? "none"
        : isBianjingCode
          ? "bianhe-river-boats"
          : isBartleby
            ? "bartleby-wallstreet"
            : isGentleRain
              ? "karst-hills"
              : isProsperousHunger
                ? "great-wall"
                : isAwakening
                  ? "iceberg-curve"
                  : "ice-wall"

  const UNIVERSAL_TEMPLATES: {
    id: CoverStyleVariant
    name: string
    badge: string
    desc: string
  }[] = [
    {
      id: "tpl-1-magazine-book",
      name: "通用母版 A：左文右书（静态精装）",
      badge: "万书百搭",
      desc: "左侧精简大字标题，右侧纯静态精装硬壳书封（无任何动效，自动同步书名与配色）",
    },
    {
      id: "tpl-2-center-emblem",
      name: "通用母版 B：居中徽章圣殿",
      badge: "1:1 转发最稳",
      desc: "中轴对称构图 + 顶部静态图腾徽章 + 居中书名，微信 1:1 转发卡片不裁一字",
    },
    {
      id: "tpl-3-editorial-split",
      name: "通用母版 C：黄金分割画廊",
      badge: "杂志画报风",
      desc: "左侧干净留白排字，右侧古典拱门画框呈现核心静态图腾，书单专栏高级感拉满",
    },
    {
      id: "tpl-4-minimal-frame",
      name: "通用母版 D：极简藏书票线框",
      badge: "超少字留白",
      desc: "80% 纯粹色彩与光影留白 + 双金线藏书票内框，仅突出核心大书名与一句短语",
    },
    {
      id: "tpl-5-chinese-scroll",
      name: "通用母版 E：国风画卷·竖题朱印",
      badge: "宋韵国风",
      desc: "东方长卷宣纸绫边构图 + 右侧古典朱砂藏书印与竖排题签，极配历史/国学/悬疑",
    },
    {
      id: "tpl-6-cinema-widescreen",
      name: "通用母版 F：宽银幕电影·上下遮幅",
      badge: "电影大片",
      desc: "2.35:1 变形宽银幕电影上下黑遮幅 + 居中电影片名与经典台词字幕感排版",
    },
    {
      id: "tpl-7-split-diagonal",
      name: "通用母版 G：戏剧斜切·双极锋芒",
      badge: "先锋张力",
      desc: "115° 黄金斜切光带分割左右视觉区，左侧凌厉大字，右侧立体书模与徽章",
    },
  ]

  const ICEFIRE_STYLES: {
    id: CoverStyleVariant
    name: string
    badge: string
    desc: string
  }[] = [
    {
      id: "style-2-minimal-sword",
      name: "风格二：极简黑金·长爪巨剑",
      badge: "冰火专属",
      desc: "75% 极简留白 + 瓦雷利亚钢剑「长爪」竖贯冰火 + 仅主书名与 8 字箴言",
    },
    {
      id: "style-3-woodcut-heraldry",
      name: "风格三：羊皮古卷·狼龙双徽",
      badge: "冰火专属",
      desc: "复古学城羊皮纸 + 左冰原狼右三头龙对称圆盾纹章 + 居中典藏大字",
    },
    {
      id: "style-4-red-comet-throne",
      name: "风格四：血色彗星·王座孤影",
      badge: "冰火专属",
      desc: "超大暗夜留白 + 血色彗星划过逆光铁王座剪影 + 极致克制电影排版",
    },
    {
      id: "style-5-weirwood-snow",
      name: "风格五：北境白雪·鱼梁木心树",
      badge: "冰火专属",
      desc: "苍茫雪原留白 + 白干红叶的鱼梁木心树与三眼乌鸦 + 东方留白意境",
    },
    {
      id: "style-1-epic-original",
      name: "风格一：暗黑史诗·全元素版",
      badge: "原版保留",
      desc: "完整保留之前的左文右书 + 铁王座 + 狼龙 + 绝境长城全元素版",
    },
  ]

  const STYLE_OPTIONS = [...UNIVERSAL_TEMPLATES, ...ICEFIRE_STYLES]

  // 所有模板统一使用当前模板自己的可编辑 subtitle，不再写死任何短句
  const minimalTagline = activeConfig.subtitle

  /**
   * 一键将当前主画布 (#wechat-cover-canvas) 1:1 真实截图导出为 2x 超清 PNG 图片并下载
   * 使用 modern-screenshot 直接捕获真实 DOM 树、全部 Tailwind 样式与 SVG 图腾，确保 100% 所见即所得
   */
  const handleDownloadCoverPng = async () => {
    const sourceEl =
      mainCanvasRef.current || document.getElementById("wechat-cover-canvas")
    if (!sourceEl || isDownloading) return
    setExportError("")
    setIsDownloading(true)
    try {
      await document.fonts.ready
      const rect = sourceEl.getBoundingClientRect()
      const exportW = Math.round(rect.width) || 900
      const exportH = Math.round(exportW / 2.35)

      const dataUrl = await domToPng(sourceEl, {
        width: exportW,
        height: exportH,
        scale: 2,
        backgroundColor: palette.canvasBg,
        style: {
          width: `${exportW}px`,
          height: `${exportH}px`,
          maxWidth: "none",
          maxHeight: "none",
          margin: "0",
          transform: "none",
        },
        fetch: {
          requestInit: {
            mode: "cors",
          },
          bypassingCache: true,
        },
        filter: (node) => {
          if (
            node instanceof HTMLElement &&
            node.dataset.exportIgnore === "true"
          ) {
            return false
          }
          return true
        },
      })

      const link = document.createElement("a")
      link.download = `爱豆书单_${activeConfig.title.replace(/[\\/:*?"<>|]/g, "_").slice(0, 80)}_2.35x1封面.png`
      link.href = dataUrl
      document.body.appendChild(link)
      link.click()
      document.body.removeChild(link)
    } catch (error) {
      console.error("封面导出失败", error)
      setExportError(
        "导出失败，请检查网络图片是否可访问，或改用无需外部图片的背景后重试。",
      )
    } finally {
      setIsDownloading(false)
    }
  }

  const renderStaticSymbol = (sizeClass = "w-16 h-16 sm:w-20 sm:h-20") => {
    const strokeColor = palette.accentHex
    if (rightSymbol === "sword-crown") {
      return (
        <svg viewBox="0 0 100 100" className={sizeClass} fill="none">
          <circle
            cx="50"
            cy="50"
            r="40"
            stroke={strokeColor}
            strokeWidth="1.4"
            strokeOpacity="0.65"
          />
          <circle
            cx="50"
            cy="50"
            r="30"
            stroke={strokeColor}
            strokeWidth="0.9"
            strokeDasharray="3 3"
            strokeOpacity="0.5"
          />
          <path
            d="M34 32 L42 22 L50 30 L58 22 L66 32 Z"
            fill={strokeColor}
            fillOpacity="0.85"
          />
          <path d="M50 10 L53.5 70 L50 80 L46.5 70 Z" fill="#fffbeb" />
          <path d="M34 66 L66 66 L61 71 L39 71 Z" fill={strokeColor} />
          <rect x="48.2" y="71" width="3.6" height="14" fill={strokeColor} />
          <circle cx="50" cy="88" r="3.5" fill="#fffbeb" />
        </svg>
      )
    }
    if (rightSymbol === "direwolf-dragon") {
      return (
        <svg viewBox="0 0 100 100" className={sizeClass} fill="none">
          <circle
            cx="50"
            cy="50"
            r="42"
            stroke={strokeColor}
            strokeWidth="1.5"
            strokeOpacity="0.7"
          />
          <path
            d="M50 16 C26 24, 18 52, 36 78 C28 58, 35 38, 50 28 Z"
            fill="#38bdf8"
            fillOpacity="0.85"
          />
          <path
            d="M50 16 C74 24, 82 52, 64 78 C72 58, 65 38, 50 28 Z"
            fill="#f97316"
            fillOpacity="0.9"
          />
          <path d="M50 10 L53 72 L50 82 L47 72 Z" fill="#fffbeb" />
          <path d="M35 68 L65 68 L60 72 L40 72 Z" fill={strokeColor} />
        </svg>
      )
    }
    if (rightSymbol === "planet-orbit") {
      return (
        <svg viewBox="0 0 100 100" className={sizeClass} fill="none">
          <circle
            cx="50"
            cy="50"
            r="38"
            stroke={strokeColor}
            strokeWidth="1.2"
            strokeDasharray="4 4"
            strokeOpacity="0.6"
          />
          <ellipse
            cx="50"
            cy="50"
            rx="44"
            ry="16"
            transform="rotate(-24 50 50)"
            stroke={strokeColor}
            strokeWidth="1.5"
          />
          <circle
            cx="50"
            cy="50"
            r="16"
            fill={strokeColor}
            fillOpacity="0.85"
          />
          <circle cx="76" cy="34" r="4.5" fill="#ffffff" />
          <circle cx="24" cy="66" r="3" fill="#ffffff" />
        </svg>
      )
    }
    if (rightSymbol === "feather-quill") {
      return (
        <svg viewBox="0 0 100 100" className={sizeClass} fill="none">
          <circle
            cx="50"
            cy="50"
            r="40"
            stroke={strokeColor}
            strokeWidth="1.2"
            strokeOpacity="0.55"
          />
          <path
            d="M72 20 C48 24, 34 42, 30 68 L22 82 L26 84 L35 70 C54 64, 68 48, 72 20 Z"
            fill={strokeColor}
            fillOpacity="0.85"
          />
          <path d="M24 82 L68 26" stroke="#ffffff" strokeWidth="1.5" />
          <circle cx="50" cy="24" r="2.5" fill="#ffffff" />
        </svg>
      )
    }
    return (
      <svg viewBox="0 0 100 100" className={sizeClass} fill="none">
        <circle
          cx="50"
          cy="50"
          r="40"
          stroke={strokeColor}
          strokeWidth="1.5"
          strokeOpacity="0.7"
        />
        <circle
          cx="50"
          cy="50"
          r="28"
          stroke={strokeColor}
          strokeWidth="0.8"
          strokeOpacity="0.4"
        />
        <polygon
          points="50,10 57,43 90,50 57,57 50,90 43,57 10,50 43,43"
          fill={strokeColor}
          fillOpacity="0.85"
        />
        <circle cx="50" cy="50" r="5" fill="#ffffff" />
      </svg>
    )
  }

  /**
   * 右侧纯图案「书籍视觉组件」（完全不印书名，不与左侧主标题重复，粉丝一眼看出是书，且换任何书都通用）
   */
  const renderRightBookArtwork = (
    accent = palette.accentHex,
    isEpicIceFire = false,
  ) => {
    if (rightBookStyle === "open-starlight-book") {
      // 图案 B：翻开的星芒古籍（摊开厚重羊皮书页 + 升腾星芒与羽毛笔/纹章）
      return (
        <div className="relative flex items-center justify-center w-44 h-44 sm:w-56 sm:h-52">
          <svg
            viewBox="0 0 240 210"
            className="w-full h-full drop-shadow-[0_18px_32px_rgba(0,0,0,0.88)]"
            fill="none"
          >
            <defs>
              <linearGradient
                id="pageLeftGrad"
                x1="0%"
                y1="0%"
                x2="100%"
                y2="0%"
              >
                <stop offset="0%" stopColor="#d6c7ac" />
                <stop offset="85%" stopColor="#f5eedc" />
                <stop offset="100%" stopColor="#b8a686" />
              </linearGradient>
              <linearGradient
                id="pageRightGrad"
                x1="0%"
                y1="0%"
                x2="100%"
                y2="0%"
              >
                <stop offset="0%" stopColor="#b8a686" />
                <stop offset="15%" stopColor="#f5eedc" />
                <stop offset="100%" stopColor="#d6c7ac" />
              </linearGradient>
            </defs>

            {/* 背后升腾的魔法星轨罗盘 */}
            <circle
              cx="120"
              cy="86"
              r="64"
              stroke={accent}
              strokeWidth="1.2"
              strokeDasharray="4 4"
              strokeOpacity="0.55"
            />
            <circle
              cx="120"
              cy="86"
              r="48"
              stroke={accent}
              strokeWidth="1"
              strokeOpacity="0.35"
            />

            {/* 书页上方悬浮的发光图腾与星芒 */}
            <path
              d="M120 16 L125 46 L155 51 L125 56 L120 86 L115 56 L85 51 L115 46 Z"
              fill={accent}
              fillOpacity="0.85"
            />
            <circle cx="76" cy="42" r="3" fill="#7dd3fc" />
            <circle cx="164" cy="42" r="3" fill="#fb923c" />
            <circle cx="120" cy="51" r="4" fill="#fffbeb" />

            {/* 翻开的精装书底座暗红色硬壳封面 */}
            <path
              d="M22 146 Q70 132 120 152 Q170 132 218 146 L226 164 Q172 150 120 172 Q68 150 14 164 Z"
              fill="#3b1212"
              stroke={accent}
              strokeWidth="2"
            />

            {/* 厚叠左书页与右书页 */}
            <path
              d="M28 142 Q72 124 120 148 L120 102 Q74 80 32 96 Z"
              fill="url(#pageLeftGrad)"
              stroke="#8c7853"
              strokeWidth="1.2"
            />
            <path
              d="M212 142 Q168 124 120 148 L120 102 Q166 80 208 96 Z"
              fill="url(#pageRightGrad)"
              stroke="#8c7853"
              strokeWidth="1.2"
            />

            {/* 书页上的抽象古籍排版线条与插画符文（无具体文字） */}
            <g
              stroke="#5c4d3c"
              strokeWidth="1.5"
              strokeLinecap="round"
              opacity="0.6"
            >
              <path d="M48 106 Q78 96 104 110" />
              <path d="M46 116 Q78 106 104 120" />
              <path d="M44 126 Q76 116 102 130" />
              <circle
                cx="164"
                cy="114"
                r="12"
                stroke="#8b1e1e"
                strokeWidth="1.4"
              />
              <path d="M158 114 L170 114 M164 108 L164 120" stroke="#8b1e1e" />
              <path d="M138 130 Q166 120 194 128" />
            </g>

            {/* 书脊垂下的金色丝带书签 */}
            <path
              d="M120 152 Q116 178 106 196 L116 194 L122 202 Q126 178 120 152 Z"
              fill="#dc2626"
              stroke={accent}
              strokeWidth="0.8"
            />
          </svg>
        </div>
      )
    }

    if (rightBookStyle === "stacked-classics") {
      // 图案 C：层叠的三本精装古籍 + 鎏金墨水瓶与羽毛笔
      return (
        <div className="relative flex items-center justify-center w-44 h-44 sm:w-52 sm:h-52">
          <svg
            viewBox="0 0 220 210"
            className="w-full h-full drop-shadow-[0_18px_32px_rgba(0,0,0,0.88)]"
            fill="none"
          >
            <circle
              cx="110"
              cy="105"
              r="76"
              stroke={accent}
              strokeWidth="1"
              strokeDasharray="4 4"
              strokeOpacity="0.4"
            />

            {/* 底层第一本厚书（深蓝烫金书脊） */}
            <rect
              x="34"
              y="146"
              width="152"
              height="30"
              rx="5"
              fill="#10253e"
              stroke={accent}
              strokeWidth="1.8"
            />
            <rect
              x="44"
              y="152"
              width="132"
              height="18"
              rx="2"
              fill="#f5eedc"
            />
            <path
              d="M62 146 V176 M158 146 V176"
              stroke={accent}
              strokeWidth="2"
            />

            {/* 中层第二本厚书（暗红皮革书脊） */}
            <rect
              x="42"
              y="116"
              width="138"
              height="28"
              rx="5"
              fill="#4c1118"
              stroke={accent}
              strokeWidth="1.8"
            />
            <line
              x1="56"
              y1="130"
              x2="164"
              y2="130"
              stroke={accent}
              strokeWidth="1.2"
              strokeOpacity="0.6"
            />
            <circle cx="110" cy="130" r="5" fill={accent} />

            {/* 顶层第三本厚书（玄黑鎏金） */}
            <rect
              x="52"
              y="88"
              width="120"
              height="26"
              rx="5"
              fill="#141824"
              stroke={accent}
              strokeWidth="1.8"
            />
            <rect x="60" y="93" width="104" height="16" rx="2" fill="#efe6d2" />
            {/* 夹在书里的红色丝带书签 */}
            <path
              d="M92 102 L86 138 L94 134 L100 140 L102 102 Z"
              fill="#dc2626"
            />

            {/* 书堆顶部的古典金色羽毛笔 */}
            <path
              d="M156 22 C126 30, 108 52, 102 82 L94 92 L106 84 C128 76, 148 56, 156 22 Z"
              fill={accent}
            />
            <path d="M96 90 L150 28" stroke="#fffbeb" strokeWidth="1.6" />
          </svg>
        </div>
      )
    }

    // 默认图案 A：无字皇家烫金火漆法典（欧式金属包角 + 宝石星盘纹章 + 火漆印章 + 丝带书签，完全不印书名）
    return (
      <div className="relative">
        <div className="absolute -bottom-3.5 left-2 right-2 h-5 bg-black/80 blur-md rounded-full" />
        <div className="absolute -right-2 top-1.5 bottom-1.5 w-2.5 bg-gradient-to-r from-[#c8bca2] via-[#f7f1e1] to-[#a8997c] rounded-r-sm border-r border-amber-300/40" />

        <div
          className="relative flex items-stretch rounded-r-md rounded-l-sm shadow-[0_18px_40px_rgba(0,0,0,0.9)] overflow-hidden w-28 h-40 sm:w-36 sm:h-50"
          style={{
            background: isEpicIceFire
              ? "linear-gradient(145deg, #162236 0%, #11131b 50%, #3d1411 100%)"
              : palette.bookCoverBg,
            border: `1.5px solid ${accent}`,
          }}
        >
          <div
            className="w-3.5 sm:w-4 flex flex-col justify-evenly items-center py-2"
            style={{
              backgroundColor: palette.bookSpineBg,
              borderRight: `1px solid ${accent}66`,
            }}
          >
            <span
              className="w-full h-[1.5px]"
              style={{ backgroundColor: accent, opacity: 0.65 }}
            />
            <span
              className="w-full h-[1.5px]"
              style={{ backgroundColor: accent, opacity: 0.65 }}
            />
            <span
              className="w-full h-[1.5px]"
              style={{ backgroundColor: accent, opacity: 0.65 }}
            />
            <span
              className="w-full h-[1.5px]"
              style={{ backgroundColor: accent, opacity: 0.65 }}
            />
            <span
              className="w-full h-[1.5px]"
              style={{ backgroundColor: accent, opacity: 0.65 }}
            />
          </div>

          <div className="flex-1 p-2.5 flex flex-col items-center justify-center relative">
            <div
              className="absolute inset-1.5 pointer-events-none"
              style={{ border: `1px solid ${accent}77` }}
            />
            <div
              className="absolute inset-2.5 pointer-events-none"
              style={{ border: `1px dashed ${accent}44` }}
            />

            <span
              className="absolute top-1.5 left-1.5 w-2.5 h-2.5 border-t-2 border-l-2"
              style={{ borderColor: accent }}
            />
            <span
              className="absolute top-1.5 right-1.5 w-2.5 h-2.5 border-t-2 border-r-2"
              style={{ borderColor: accent }}
            />
            <span
              className="absolute bottom-1.5 left-1.5 w-2.5 h-2.5 border-b-2 border-l-2"
              style={{ borderColor: accent }}
            />
            <span
              className="absolute bottom-1.5 right-1.5 w-2.5 h-2.5 border-b-2 border-r-2"
              style={{ borderColor: accent }}
            />

            <div className="flex items-center gap-1.5 opacity-80 mb-auto mt-1">
              <span
                className="w-4 h-[1px]"
                style={{ backgroundColor: accent }}
              />
              <span
                className="w-1.5 h-1.5 rotate-45"
                style={{ backgroundColor: accent }}
              />
              <span
                className="w-4 h-[1px]"
                style={{ backgroundColor: accent }}
              />
            </div>

            <div className="my-auto flex items-center justify-center z-10">
              {renderStaticSymbol("w-16 h-16 sm:w-22 sm:h-22")}
            </div>

            <div className="flex items-center gap-1.5 opacity-80 mt-auto mb-1">
              <span
                className="w-5 h-[1px]"
                style={{ backgroundColor: accent }}
              />
              <span
                className="w-1.5 h-1.5 rounded-full"
                style={{ backgroundColor: accent }}
              />
              <span
                className="w-5 h-[1px]"
                style={{ backgroundColor: accent }}
              />
            </div>
          </div>
        </div>

        <svg
          viewBox="0 0 24 30"
          className="absolute -bottom-4 left-6 w-5 h-6 z-20 drop-shadow"
          fill="none"
        >
          <path
            d="M6 0 L6 26 L12 20 L18 26 L18 0 Z"
            fill="#b91c1c"
            stroke={accent}
            strokeWidth="1"
          />
        </svg>

        <div
          className="absolute -bottom-2.5 -right-2.5 w-9 h-9 sm:w-10 sm:h-10 rounded-full bg-gradient-to-br from-[#dc2626] via-[#991b1b] to-[#450a0a] shadow-lg flex items-center justify-center border"
          style={{ borderColor: accent }}
        >
          <svg
            viewBox="0 0 24 24"
            className="w-5 h-5 text-amber-200"
            fill="currentColor"
          >
            <path d="M12 2L14.2 8.8L21 11L14.2 13.2L12 20L9.8 13.2L3 11L9.8 8.8L12 2Z" />
          </svg>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-[#090b10] text-slate-100 flex flex-col">
      {/* 顶部导航栏 */}
      <header className="border-b border-white/10 bg-[#0d1017]/90 backdrop-blur-md sticky top-0 z-40">
        <div className="max-w-7xl mx-auto px-6 py-3.5 flex flex-wrap items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-lg bg-gradient-to-br from-amber-400 to-amber-600 text-slate-950 flex items-center justify-center font-serif-sc font-black text-lg shadow-lg shadow-amber-500/20">
              爱
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h1 className="font-serif-sc font-bold text-base sm:text-lg text-white tracking-wide">
                  「爱豆书单」公众号 2.35:1 封面母版系统
                </h1>
                <span className="text-xs px-2 py-0.5 rounded-full bg-amber-500/15 text-amber-300 border border-amber-500/30 font-medium">
                  900 × 383 px 标准比例
                </span>
              </div>
              <p className="text-xs text-slate-400">
                本期主打：《冰与火之歌》·
                含固定坐标可复用品牌徽章（支持一键切换书单验证复用性）
              </p>
            </div>
          </div>

          {/* 预设书单快速切换（验证品牌模板复用） */}
          <div className="flex flex-wrap items-center gap-2">
            <span className="text-xs text-slate-400 mr-1">模板复用预览：</span>
            {PRESET_COVERS.map((preset) => {
              const isCurrent = selectedBookId === preset.id
              return (
                <button
                  key={preset.id}
                  onClick={() => setSelectedBookId(preset.id)}
                  className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-all cursor-pointer ${
                    isCurrent
                      ? "bg-amber-500 text-slate-950 font-bold shadow-md shadow-amber-500/25"
                      : "bg-white/5 hover:bg-white/10 text-slate-300 border border-white/10"
                  }`}
                >
                  《{preset.title}》
                </button>
              )
            })}
            <button
              onClick={handleDownloadCoverPng}
              disabled={isDownloading}
              className="ml-2 px-4 py-1.5 rounded-lg text-xs font-bold bg-gradient-to-r from-emerald-400 to-teal-500 text-slate-950 shadow-lg shadow-emerald-500/25 hover:brightness-110 cursor-pointer flex items-center gap-1.5"
            >
              <svg
                viewBox="0 0 24 24"
                className="w-4 h-4"
                fill="none"
                stroke="currentColor"
                strokeWidth="2.4"
              >
                <path
                  d="M12 3v12m0 0l-4-4m4 4l4-4M4 17v2a2 2 0 002 2h12a2 2 0 002-2v-2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
              {isDownloading ? "正在生成..." : "下载高清封面 PNG"}
            </button>
          </div>
        </div>
      </header>

      {/* 主体区域：左侧为 4 步选择工作台，右侧为成品封面画布 + 微信渲染效果 + 下方品牌设置与文案定制 */}
      <main className="flex-1 max-w-[1440px] w-full mx-auto px-5 py-6 grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        {exportError && (
          <p
            role="alert"
            className="my-3 rounded-lg border border-red-400/40 bg-red-950/50 p-3 text-sm text-red-200"
          >
            {exportError}
          </p>
        )}
        {/* ==================== 左侧：4 步模块化选择元素工作台 ==================== */}
        <div className="lg:col-span-5 flex flex-col gap-5 lg:sticky lg:top-20">
          {/* ==================== 全局统一的 4 步模块化封面拼装工作台（所有风格和模板 100% 生效） ==================== */}
          <div className="bg-[#121620] border border-amber-500/35 rounded-2xl p-4 shadow-lg space-y-4">
            {/* 第 1 步：选择排版构图模板（扩充至 12 款，全部合并平铺展示） */}
            <div className="flex flex-wrap items-center justify-between gap-2">
              <span className="text-xs font-bold text-amber-300">
                第 1 步 · 选择排版构图模板（共 12
                款版式平铺，下方背景/颜色/元素对所有版式通用生效）：
              </span>
              <span className="text-[11px] text-emerald-400 font-medium">
                共 12 款构图 · 点击直接切换
              </span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 lg:grid-cols-3 gap-2">
              {STYLE_OPTIONS.map((st) => {
                const active = coverStyle === st.id
                return (
                  <button
                    key={st.id}
                    onClick={() => setCoverStyle(st.id)}
                    className={`text-left p-2.5 rounded-xl border cursor-pointer flex flex-col justify-between ${
                      active
                        ? "bg-gradient-to-br from-amber-500/25 to-amber-600/10 border-amber-400 shadow-md shadow-amber-500/10"
                        : "bg-[#0b0e15] hover:bg-white/5 border-white/10"
                    }`}
                  >
                    <div className="flex items-center justify-between gap-1 mb-1">
                      <span className="text-xs font-bold text-white leading-snug truncate">
                        {st.name}
                      </span>
                      <span
                        className={`text-[10px] px-1.5 py-0.5 rounded font-semibold shrink-0 ${
                          active
                            ? "bg-amber-400 text-slate-950"
                            : "bg-white/10 text-slate-300"
                        }`}
                      >
                        {st.badge}
                      </span>
                    </div>
                    <div className="text-[10px] text-slate-400 line-clamp-1 leading-relaxed">
                      {st.desc}
                    </div>
                  </button>
                )
              })}
            </div>

            {/* 第 2 步：选择背景氛围底纹模板（扩充至 12 款，所有版式全部生效） */}
            <div className="pt-3 border-t border-white/10">
              <div className="flex items-center justify-between mb-2">
                <span className="text-xs font-bold text-amber-300">
                  第 2 步 · 选择背景氛围模板（共 {BACKGROUND_TEMPLATES.length}{" "}
                  款底图与肌理，对所有模板全部生效）：
                </span>
                <span className="text-[11px] text-slate-400">
                  切换后所有版式立即同步该背景
                </span>
              </div>
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
                {BACKGROUND_TEMPLATES.map((bg) => {
                  const active = selectedBgId === bg.id
                  return (
                    <button
                      key={bg.id}
                      onClick={() => setSelectedBgId(bg.id)}
                      className={`p-2 rounded-lg border text-left cursor-pointer ${
                        active
                          ? "border-amber-400 bg-amber-500/20 text-white"
                          : "border-white/10 bg-[#090b10] text-slate-300 hover:border-white/25"
                      }`}
                    >
                      <div className="flex items-center gap-1.5">
                        <span
                          className="w-3 h-3 rounded-full shrink-0 border border-white/30"
                          style={{
                            background: `linear-gradient(135deg, ${bg.swatchLeft} 50%, ${bg.swatchRight} 50%)`,
                          }}
                        />
                        <span className="text-[11px] font-bold truncate">
                          {bg.name}
                        </span>
                      </div>
                      <div className="text-[10px] text-slate-400 truncate mt-0.5">
                        {bg.desc}
                      </div>
                    </button>
                  )
                })}
              </div>
            </div>

            {/* 第 3 步：选择主题颜色方案（扩充至 10 套，所有版式全部生效） */}
            <div className="pt-3 border-t border-white/10 space-y-2.5">
              <div className="flex flex-wrap items-center justify-between gap-2">
                <span className="text-xs font-bold text-sky-300">
                  第 3 步 · 选择主题颜色方案（共{" "}
                  {Object.keys(COLOR_PALETTES).length}{" "}
                  套高定书单色彩，对所有模板全部生效）：
                </span>
                <span className="text-[11px] text-slate-400">
                  实时改变所有风格的画框、标题与渐变色调
                </span>
              </div>
              <div className="grid grid-cols-2 sm:grid-cols-5 gap-2">
                {(Object.values(COLOR_PALETTES) as ColorPalette[]).map((p) => {
                  const isSelected = colorScheme === p.id
                  return (
                    <button
                      key={p.id}
                      onClick={() => setColorScheme(p.id)}
                      className={`p-2 rounded-xl border text-left cursor-pointer ${
                        isSelected
                          ? "border-amber-400 bg-amber-500/15"
                          : "border-white/10 bg-[#0b0e15] hover:border-white/25"
                      }`}
                    >
                      <div className="flex items-center gap-1.5 mb-1">
                        <span
                          className="w-3.5 h-3.5 rounded-full border border-white/30"
                          style={{
                            background: `linear-gradient(135deg, ${p.swatchLeft} 50%, ${p.swatchRight} 50%)`,
                          }}
                        />
                        <span className="text-xs font-bold text-white truncate">
                          {p.name}
                        </span>
                      </div>
                      <div className="text-[10px] text-slate-400 truncate">
                        {p.scene}
                      </div>
                    </button>
                  )
                })}
              </div>
            </div>

            {/* 第 4 步：从视觉元素库中挑选元素放到背景上（扩充至 60 款元素平铺直选 + 再次点击即可取消选中） */}
            <div className="pt-3 border-t border-white/10 space-y-3">
              <div className="flex flex-wrap items-center justify-between gap-2">
                <div className="flex items-center gap-2">
                  <span className="text-xs font-bold text-emerald-300">
                    第 4 步 · 挑选视觉元素（共 72 款 ·
                    点击选中，再次点击已选中项即可取消）：
                  </span>
                </div>

                {/* 翻页控制器 + 一键展开/重置按钮 */}
                <div className="flex flex-wrap items-center gap-2">
                  <button
                    onClick={() => setExpandAllElementPages((v) => !v)}
                    className="text-[11px] px-2.5 py-1 rounded-lg bg-white/5 hover:bg-white/15 border border-white/10 text-slate-300 cursor-pointer"
                  >
                    {expandAllElementPages
                      ? "收起为分页浏览"
                      : "同屏展开全部 72 款元素"}
                  </button>

                  <button
                    onClick={() => {
                      setCenterElement("none")
                      setSideElement("none")
                      setSkyElement("none")
                      setBottomElement("none")
                      setExtraRainOverlay(false)
                    }}
                    className="text-[11px] px-2.5 py-1 rounded-lg bg-rose-500/15 hover:bg-rose-500/25 border border-rose-400/30 text-rose-300 cursor-pointer"
                  >
                    ✕ 一键清空全部元素
                  </button>

                  <button
                    onClick={() => {
                      setCenterElement("auto-book")
                      setSideElement("auto-book")
                      setSkyElement("auto-book")
                      setBottomElement("auto-book")
                      setExtraRainOverlay(false)
                    }}
                    className="text-[11px] px-2.5 py-1 rounded-lg bg-amber-500/15 hover:bg-amber-500/25 border border-amber-400/30 text-amber-300 cursor-pointer"
                  >
                    恢复当前书默认
                  </button>
                </div>
              </div>

              {/* 4 页分类翻页导航条 */}
              {!expandAllElementPages && (
                <div className="flex flex-wrap items-center justify-between gap-1.5 bg-[#090b10] p-1.5 rounded-xl border border-white/10">
                  {([
                    {
                      page: 1,
                      title: "① 居中主视觉 (19款)",
                      activeVal: resolvedCenter,
                    },
                    {
                      page: 2,
                      title: "② 左右对称元素 (18款)",
                      activeVal: resolvedSide,
                    },
                    {
                      page: 3,
                      title: "③ 空中意境元素 (18款)",
                      activeVal: resolvedSky,
                    },
                    {
                      page: 4,
                      title: "④ 底部前景地貌 (17款)",
                      activeVal: resolvedBottom,
                    },
                  ] as const).map((tab) => {
                    const isCurr = elementPage === tab.page
                    const hasActive = tab.activeVal !== "none"
                    return (
                      <button
                        key={tab.page}
                        onClick={() => setElementPage(tab.page)}
                        className={`flex-1 min-w-[115px] py-1.5 px-2 rounded-lg text-[11px] font-medium cursor-pointer flex items-center justify-center gap-1 ${
                          isCurr
                            ? "bg-emerald-500 text-slate-950 font-bold shadow"
                            : "text-slate-300 hover:bg-white/5"
                        }`}
                      >
                        <span>{tab.title}</span>
                        {hasActive && (
                          <span
                            className={`w-1.5 h-1.5 rounded-full ${
                              isCurr ? "bg-slate-950" : "bg-emerald-400"
                            }`}
                          />
                        )}
                      </button>
                    )
                  })}
                </div>
              )}

              <label className="block text-xs text-slate-300">
                搜索视觉元素
                <input
                  value={elementQuery}
                  onChange={(e) => {
                    setElementQuery(e.target.value)
                    if (e.target.value) setExpandAllElementPages(true)
                  }}
                  placeholder="输入自然、旅行、科技或元素名称"
                  className="mt-2 w-full rounded-lg border border-white/20 bg-slate-950 px-3 py-2 text-white"
                />
              </label>
              {/* ==================== 第 1 页：① 居中主视觉元素（16 款平铺，点击已选即取消） ==================== */}
              {(expandAllElementPages || elementPage === 1) && (
                <div className="bg-[#090b10] border border-white/10 rounded-xl p-3">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-xs font-bold text-amber-300">
                      ① 居中主视觉元素（共 19 款 ·
                      再次点击已高亮项即可取消选中）
                    </span>
                    <div className="flex items-center gap-2">
                      {resolvedCenter !== "none" && (
                        <button
                          onClick={() => setCenterElement("none")}
                          className="text-[10px] px-2 py-0.5 rounded bg-rose-500/20 border border-rose-400/40 text-rose-300 cursor-pointer"
                        >
                          ✕ 取消居中元素
                        </button>
                      )}
                      <button
                        onClick={() => setElementPage(2)}
                        className="text-[10px] text-amber-300 hover:underline cursor-pointer"
                      >
                        下一页：② 左右元素 ▸
                      </button>
                    </div>
                  </div>
                  <div className="grid grid-cols-2 sm:grid-cols-3 gap-1.5">
                    {([
                      ...EXTRA_ELEMENTS.center,
                      {
                        id: "bianjing-rainbow-bridge",
                        label: "汴京虹桥与失控撞桥梅船",
                        tag: "清明密码",
                      },
                      {
                        id: "bartleby-wall-window",
                        label: "华尔街高墙与孤窗屏风",
                        tag: "巴托比",
                      },
                      {
                        id: "hometown-eaves",
                        label: "故乡青瓦飞檐与暖窗涟漪",
                        tag: "落雨",
                      },
                      {
                        id: "imperial-palace",
                        label: "紫禁城太和殿与盛世裂痕",
                        tag: "盛世",
                      },
                      {
                        id: "brain-pyramid",
                        label: "三重大脑金字塔与光柱",
                        tag: "觉醒",
                      },
                      {
                        id: "iron-throne",
                        label: "铁王座千剑背光剪影",
                        tag: "冰火",
                      },
                      {
                        id: "longclaw-eclipse",
                        label: "瓦雷利亚巨剑与日食金环",
                        tag: "奇幻",
                      },
                      {
                        id: "weirwood-heart-tree",
                        label: "白干红叶鱼梁木心树",
                        tag: "文学",
                      },
                      {
                        id: "babel-library",
                        label: "巴别塔无限拱门图书馆",
                        tag: "名著",
                      },
                      {
                        id: "hourglass-time",
                        label: "古典流沙沙漏与时间齿轮",
                        tag: "历史",
                      },
                      {
                        id: "lighthouse-beacon",
                        label: "暗夜沧海孤岛灯塔光束",
                        tag: "治愈",
                      },
                      {
                        id: "scales-justice",
                        label: "真理天平与圣剑徽章",
                        tag: "社科",
                      },
                      {
                        id: "astro-compass",
                        label: "古典天文星盘与罗盘",
                        tag: "百搭",
                      },
                      {
                        id: "forbidden-scroll-seal",
                        label: "展开古画长卷与传国玉玺",
                        tag: "国风",
                      },
                      {
                        id: "sherlock-magnifying-maze",
                        label: "指纹迷宫与侦探放大镜",
                        tag: "悬疑",
                      },
                      {
                        id: "phoenix-nirvana-sun",
                        label: "涅槃火凤展翅与金日轮",
                        tag: "史诗",
                      },
                    ] as const)
                      .filter((opt) =>
                        `${opt.label} ${opt.tag}`
                          .toLowerCase()
                          .includes(elementQuery.trim().toLowerCase()),
                      )
                      .map((opt) => {
                        const active = resolvedCenter === opt.id
                        return (
                          <button
                            key={opt.id}
                            aria-pressed={active}
                            onClick={() =>
                              setCenterElement(active ? "none" : opt.id)
                            }
                            className={`px-2.5 py-2 rounded-lg border text-left flex items-center justify-between gap-1 cursor-pointer ${
                              active
                                ? "bg-amber-500/25 border-amber-400 text-white font-bold shadow-sm"
                                : "bg-[#121620] border-white/10 text-slate-300 hover:border-white/25"
                            }`}
                          >
                            <span className="text-[11px] truncate">
                              {active ? `✓ ${opt.label}` : opt.label}
                            </span>
                            <span
                              className={`text-[9px] px-1.5 py-0.5 rounded shrink-0 ${
                                active
                                  ? "bg-amber-400 text-slate-950 font-bold"
                                  : "bg-white/10 text-amber-200"
                              }`}
                            >
                              {active ? "已选·点此取消" : opt.tag}
                            </span>
                          </button>
                        )
                      })}
                  </div>
                </div>
              )}

              {/* ==================== 第 2 页：② 左右对称意象元素（15 款平铺，点击已选即取消） ==================== */}
              {(expandAllElementPages || elementPage === 2) && (
                <div className="bg-[#090b10] border border-white/10 rounded-xl p-3">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-xs font-bold text-amber-300">
                      ② 左右对称意象元素（共 18 款 ·
                      再次点击已高亮项即可取消选中）
                    </span>
                    <div className="flex items-center gap-2">
                      {resolvedSide !== "none" && (
                        <button
                          onClick={() => setSideElement("none")}
                          className="text-[10px] px-2 py-0.5 rounded bg-rose-500/20 border border-rose-400/40 text-rose-300 cursor-pointer"
                        >
                          ✕ 取消左右元素
                        </button>
                      )}
                      <button
                        onClick={() => setElementPage(3)}
                        className="text-[10px] text-amber-300 hover:underline cursor-pointer"
                      >
                        下一页：③ 空中元素 ▸
                      </button>
                    </div>
                  </div>
                  <div className="grid grid-cols-2 sm:grid-cols-3 gap-1.5">
                    {([
                      ...EXTRA_ELEMENTS.side,
                      {
                        id: "bianjing-fanlou-scroll",
                        label: "汴京樊楼灯笼 vs 折扇铜钱",
                        tag: "清明密码",
                      },
                      {
                        id: "bartleby-scrolls-quill",
                        label: "公文卷宗 vs 鹅毛笔墨水",
                        tag: "巴托比",
                      },
                      {
                        id: "train-plum",
                        label: "远行铁轨相机 vs 老梅炊烟",
                        tag: "落雨",
                      },
                      {
                        id: "famine-seal",
                        label: "饥民枯穗破碗 vs 乾隆御玺",
                        tag: "盛世",
                      },
                      {
                        id: "brain-wings",
                        label: "潜意识脑网 vs 理智金翼",
                        tag: "觉醒",
                      },
                      {
                        id: "wolf-dragon",
                        label: "北境冰原狼 vs 三头火龙",
                        tag: "冰火",
                      },
                      {
                        id: "heraldic-shields",
                        label: "左狼圆盾 vs 右火龙圆盾",
                        tag: "版画",
                      },
                      {
                        id: "sun-moon-pillars",
                        label: "左日轮神柱 vs 右月相神柱",
                        tag: "古典",
                      },
                      {
                        id: "bamboo-plum-ink",
                        label: "左墨竹清风 vs 右苍松云鹤",
                        tag: "东方",
                      },
                      {
                        id: "chess-royals",
                        label: "左象棋国王 vs 右皇后博弈",
                        tag: "策略",
                      },
                      {
                        id: "masks-curtain",
                        label: "左悲欢戏剧面具 vs 右帷幕",
                        tag: "人性",
                      },
                      {
                        id: "dna-circuit",
                        label: "左生命基因链 vs 右矩阵波",
                        tag: "科幻",
                      },
                      {
                        id: "sword-shield-duel",
                        label: "左骑士纹章盾 vs 右双手重剑",
                        tag: "史诗",
                      },
                      {
                        id: "abacus-coin-scale",
                        label: "左古算盘铜钱 vs 右商道天平",
                        tag: "经管",
                      },
                      {
                        id: "piano-violin-symphony",
                        label: "左古典琴键 vs 右小提琴弓",
                        tag: "艺术",
                      },
                    ] as const)
                      .filter((opt) =>
                        `${opt.label} ${opt.tag}`
                          .toLowerCase()
                          .includes(elementQuery.trim().toLowerCase()),
                      )
                      .map((opt) => {
                        const active = resolvedSide === opt.id
                        return (
                          <button
                            key={opt.id}
                            aria-pressed={active}
                            onClick={() =>
                              setSideElement(active ? "none" : opt.id)
                            }
                            className={`px-2.5 py-2 rounded-lg border text-left flex items-center justify-between gap-1 cursor-pointer ${
                              active
                                ? "bg-amber-500/25 border-amber-400 text-white font-bold shadow-sm"
                                : "bg-[#121620] border-white/10 text-slate-300 hover:border-white/25"
                            }`}
                          >
                            <span className="text-[11px] truncate">
                              {active ? `✓ ${opt.label}` : opt.label}
                            </span>
                            <span
                              className={`text-[9px] px-1.5 py-0.5 rounded shrink-0 ${
                                active
                                  ? "bg-amber-400 text-slate-950 font-bold"
                                  : "bg-white/10 text-amber-200"
                              }`}
                            >
                              {active ? "已选·点此取消" : opt.tag}
                            </span>
                          </button>
                        )
                      })}
                  </div>
                </div>
              )}

              {/* ==================== 第 3 页：③ 空中/中景意境元素（15 款平铺，点击已选即取消） ==================== */}
              {(expandAllElementPages || elementPage === 3) && (
                <div className="bg-[#090b10] border border-white/10 rounded-xl p-3">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-xs font-bold text-emerald-300">
                      ③ 空中/中景意境元素（共 18 款 ·
                      再次点击已高亮项即可取消选中）
                    </span>
                    <div className="flex items-center gap-2">
                      {resolvedSky !== "none" && (
                        <button
                          onClick={() => setSkyElement("none")}
                          className="text-[10px] px-2 py-0.5 rounded bg-rose-500/20 border border-rose-400/40 text-rose-300 cursor-pointer"
                        >
                          ✕ 取消空中元素
                        </button>
                      )}
                      <button
                        onClick={() => setElementPage(4)}
                        className="text-[10px] text-emerald-300 hover:underline cursor-pointer"
                      >
                        下一页：④ 底部地貌 ▸
                      </button>
                    </div>
                  </div>
                  <div className="grid grid-cols-2 sm:grid-cols-3 gap-1.5">
                    {([
                      ...EXTRA_ELEMENTS.sky,
                      {
                        id: "song-cranes-clouds",
                        label: "北宋瑞鹤翔云与金色祥云",
                        tag: "清明密码",
                      },
                      {
                        id: "bartleby-dead-letters",
                        label: "飘落死信与煤气吊灯",
                        tag: "巴托比",
                      },
                      {
                        id: "spring-swallows",
                        label: "四个春天双燕穿雨归巢",
                        tag: "落雨",
                      },
                      {
                        id: "macartney-ship",
                        label: "1793 西洋三桅风帆船",
                        tag: "盛世",
                      },
                      {
                        id: "meta-eye",
                        label: "元认知第三视角之眼",
                        tag: "觉醒",
                      },
                      {
                        id: "raven-leaves",
                        label: "三眼乌鸦与心树红叶",
                        tag: "冰火",
                      },
                      {
                        id: "red-comet-arc",
                        label: "划破夜空的血色彗星长尾",
                        tag: "史诗",
                      },
                      {
                        id: "macondo-butterflies",
                        label: "马孔多漫天飞舞黄蝴蝶",
                        tag: "孤独",
                      },
                      {
                        id: "three-body-suns",
                        label: "三体三星凌日与水滴探针",
                        tag: "三体",
                      },
                      {
                        id: "sky-lanterns",
                        label: "漫天升起的祈愿孔明灯",
                        tag: "温情",
                      },
                      {
                        id: "constellation-astrolabe",
                        label: "古星图连线与黄道星轨",
                        tag: "哲思",
                      },
                      {
                        id: "music-notes-feather",
                        label: "随风飘散的五线谱音符与白羽",
                        tag: "艺术",
                      },
                      {
                        id: "detective-cipher-code",
                        label: "悬浮密码矩阵与推理线索网",
                        tag: "悬疑",
                      },
                      {
                        id: "aurora-borealis",
                        label: "极夜绚丽极光星辰飘带",
                        tag: "北欧",
                      },
                      {
                        id: "falling-ginkgo-leaves",
                        label: "金秋漫天飞舞银杏叶片",
                        tag: "文学",
                      },
                    ] as const)
                      .filter((opt) =>
                        `${opt.label} ${opt.tag}`
                          .toLowerCase()
                          .includes(elementQuery.trim().toLowerCase()),
                      )
                      .map((opt) => {
                        const active = resolvedSky === opt.id
                        return (
                          <button
                            key={opt.id}
                            aria-pressed={active}
                            onClick={() =>
                              setSkyElement(active ? "none" : opt.id)
                            }
                            className={`px-2.5 py-2 rounded-lg border text-left flex items-center justify-between gap-1 cursor-pointer ${
                              active
                                ? "bg-emerald-500/25 border-emerald-400 text-white font-bold shadow-sm"
                                : "bg-[#121620] border-white/10 text-slate-300 hover:border-white/25"
                            }`}
                          >
                            <span className="text-[11px] truncate">
                              {active ? `✓ ${opt.label}` : opt.label}
                            </span>
                            <span
                              className={`text-[9px] px-1.5 py-0.5 rounded shrink-0 ${
                                active
                                  ? "bg-emerald-400 text-slate-950 font-bold"
                                  : "bg-white/10 text-emerald-200"
                              }`}
                            >
                              {active ? "已选·点此取消" : opt.tag}
                            </span>
                          </button>
                        )
                      })}
                  </div>
                </div>
              )}

              {/* ==================== 第 4 页：④ 底部前景地貌元素（14 款平铺，点击已选即取消） ==================== */}
              {(expandAllElementPages || elementPage === 4) && (
                <div className="bg-[#090b10] border border-white/10 rounded-xl p-3">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-xs font-bold text-emerald-300">
                      ④ 底部前景地貌元素（共 17 款 ·
                      再次点击已高亮项即可取消选中）
                    </span>
                    <div className="flex items-center gap-2">
                      {resolvedBottom !== "none" && (
                        <button
                          onClick={() => setBottomElement("none")}
                          className="text-[10px] px-2 py-0.5 rounded bg-rose-500/20 border border-rose-400/40 text-rose-300 cursor-pointer"
                        >
                          ✕ 取消底部地貌
                        </button>
                      )}
                      <button
                        onClick={() => setElementPage(1)}
                        className="text-[10px] text-emerald-300 hover:underline cursor-pointer"
                      >
                        返回第 1 页 ◂
                      </button>
                    </div>
                  </div>
                  <div className="grid grid-cols-2 sm:grid-cols-3 gap-1.5">
                    {([
                      ...EXTRA_ELEMENTS.bottom,
                      {
                        id: "bianhe-river-boats",
                        label: "汴河漕运木船群与水波市井",
                        tag: "清明密码",
                      },
                      {
                        id: "bartleby-wallstreet",
                        label: "华尔街高楼黑影与铁栏",
                        tag: "巴托比",
                      },
                      {
                        id: "karst-hills",
                        label: "黔南青黛远山与云雾",
                        tag: "落雨",
                      },
                      {
                        id: "great-wall",
                        label: "万里长城古垛口残垣",
                        tag: "盛世",
                      },
                      {
                        id: "iceberg-curve",
                        label: "潜意识冰山与复利曲线",
                        tag: "觉醒",
                      },
                      {
                        id: "ice-wall",
                        label: "绝境长城万仞冰崖",
                        tag: "冰火",
                      },
                      {
                        id: "ocean-storm-waves",
                        label: "古典暗金翻涌巨浪海潮",
                        tag: "海洋",
                      },
                      {
                        id: "greek-colonnade",
                        label: "古希腊神庙残柱与石阶",
                        tag: "哲学",
                      },
                      {
                        id: "silk-road-dunes",
                        label: "大漠沙丘与丝路驼队剪影",
                        tag: "历史",
                      },
                      {
                        id: "lotus-water-ripples",
                        label: "静谧湖面同心金波与残荷",
                        tag: "意境",
                      },
                      {
                        id: "pine-forest-deer",
                        label: "迷雾针叶林海与孤鹿剪影",
                        tag: "自然",
                      },
                      {
                        id: "labyrinth-maze-floor",
                        label: "透视空间迷宫与命运棋盘",
                        tag: "悬疑",
                      },
                      {
                        id: "ancient-bookshelf-wall",
                        label: "通天古典藏书阁书架剪影",
                        tag: "书房",
                      },
                      {
                        id: "misty-bamboo-bridge",
                        label: "烟雨江南石拱桥与乌篷船",
                        tag: "国风",
                      },
                    ] as const)
                      .filter((opt) =>
                        `${opt.label} ${opt.tag}`
                          .toLowerCase()
                          .includes(elementQuery.trim().toLowerCase()),
                      )
                      .map((opt) => {
                        const active = resolvedBottom === opt.id
                        return (
                          <button
                            key={opt.id}
                            aria-pressed={active}
                            onClick={() =>
                              setBottomElement(active ? "none" : opt.id)
                            }
                            className={`px-2.5 py-2 rounded-lg border text-left flex items-center justify-between gap-1 cursor-pointer ${
                              active
                                ? "bg-emerald-500/25 border-emerald-400 text-white font-bold shadow-sm"
                                : "bg-[#121620] border-white/10 text-slate-300 hover:border-white/25"
                            }`}
                          >
                            <span className="text-[11px] truncate">
                              {active ? `✓ ${opt.label}` : opt.label}
                            </span>
                            <span
                              className={`text-[9px] px-1.5 py-0.5 rounded shrink-0 ${
                                active
                                  ? "bg-emerald-400 text-slate-950 font-bold"
                                  : "bg-white/10 text-emerald-200"
                              }`}
                            >
                              {active ? "已选·点此取消" : opt.tag}
                            </span>
                          </button>
                        )
                      })}
                  </div>
                </div>
              )}

              {/* 右侧书本造型、徽章图腾与附加雨幕开关（全局展示） */}
              <div className="flex flex-wrap items-center justify-between gap-2 pt-1">
                <div className="flex flex-wrap items-center gap-1.5">
                  <span className="text-[11px] text-slate-400">
                    右侧书本造型：
                  </span>
                  {([
                    { id: "royal-sealed-tome", label: "火漆精装书(无字)" },
                    { id: "open-starlight-book", label: "翻开星芒古籍" },
                    { id: "stacked-classics", label: "书堆与羽毛笔" },
                  ] as const).map((bk) => (
                    <button
                      key={bk.id}
                      onClick={() => setRightBookStyle(bk.id)}
                      className={`px-2 py-0.5 rounded text-[11px] border cursor-pointer ${
                        rightBookStyle === bk.id
                          ? "bg-emerald-500/25 border-emerald-400 text-emerald-200 font-bold"
                          : "bg-white/5 border-white/10 text-slate-400 hover:text-white"
                      }`}
                    >
                      {bk.label}
                    </button>
                  ))}
                  <button
                    onClick={() => setExtraRainOverlay((v) => !v)}
                    className={`px-2 py-0.5 rounded text-[11px] border cursor-pointer ${
                      extraRainOverlay || isGentleRain
                        ? "bg-sky-500/25 border-sky-400 text-sky-200 font-bold"
                        : "bg-white/5 border-white/10 text-slate-400"
                    }`}
                  >
                    叠加细雨幕 & 丁达尔光束
                  </button>
                </div>

                <div className="flex flex-wrap items-center gap-1.5">
                  <span className="text-[11px] text-slate-400">徽章符号：</span>
                  {([
                    { id: "sword-crown", label: "王权剑冠" },
                    { id: "direwolf-dragon", label: "冰狼火龙" },
                    { id: "planet-orbit", label: "星际轨道" },
                    { id: "feather-quill", label: "文学羽笔" },
                    { id: "compass-rose", label: "命运罗盘" },
                  ] as const).map((sym) => (
                    <button
                      key={sym.id}
                      onClick={() => setRightSymbol(sym.id)}
                      className={`px-2 py-0.5 rounded text-[11px] border cursor-pointer ${
                        rightSymbol === sym.id
                          ? "bg-amber-500/25 border-amber-400 text-amber-200 font-semibold"
                          : "bg-white/5 border-white/10 text-slate-400 hover:text-white"
                      }`}
                    >
                      {sym.label}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* ==================== 右侧：成品画布 + 微信渲染效果 + 下方品牌与文案设置 ==================== */}
        <div className="lg:col-span-7 flex flex-col gap-6">
          {/* 画布工具栏 */}
          <div className="flex flex-wrap items-center justify-between gap-3 bg-[#121620] border border-white/10 rounded-xl px-4 py-2.5">
            <div className="flex items-center gap-2 text-xs text-slate-300">
              <span className="inline-block w-2 h-2 rounded-full bg-emerald-400"></span>
              <span>画布比例：</span>
              <strong className="text-amber-300 font-mono">2.35 : 1</strong>
              <span className="text-slate-500">|</span>
              <span className="text-slate-400">
                当前：{STYLE_OPTIONS.find((s) => s.id === coverStyle)?.name}
              </span>
            </div>

            <div className="flex items-center gap-3">
              <label className="flex items-center gap-1.5 text-xs text-amber-300 font-medium cursor-pointer select-none">
                <input
                  type="checkbox"
                  checked={showRichOrnament}
                  onChange={(e) => setShowRichOrnament(e.target.checked)}
                  className="accent-amber-400 rounded"
                />
                高定装帧精雕细节层
              </label>
              <label className="flex items-center gap-1.5 text-xs text-slate-300 cursor-pointer select-none">
                <input
                  type="checkbox"
                  checked={showSafeZone}
                  onChange={(e) => setShowSafeZone(e.target.checked)}
                  className="accent-amber-400 rounded"
                />
                品牌锚点网格
              </label>
              <label className="flex items-center gap-1.5 text-xs text-slate-300 cursor-pointer select-none">
                <input
                  type="checkbox"
                  checked={showCenterCrop}
                  onChange={(e) => setShowCenterCrop(e.target.checked)}
                  className="accent-amber-400 rounded"
                />
                1:1 转发裁切线
              </label>
              <button
                onClick={handleDownloadCoverPng}
                disabled={isDownloading}
                className="px-3.5 py-1.5 rounded-lg text-xs font-bold bg-amber-400 hover:bg-amber-300 text-slate-950 shadow cursor-pointer flex items-center gap-1.5"
              >
                <svg
                  viewBox="0 0 24 24"
                  className="w-3.5 h-3.5"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2.5"
                >
                  <path
                    d="M12 3v12m0 0l-4-4m4 4l4-4M4 17v2a2 2 0 002 2h12a2 2 0 002-2v-2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
                下载 2.35:1 封面图 (PNG)
              </button>
            </div>
          </div>

          {/* ==================== 核心 2.35:1 公众号封面画布（与下方微信卡片 100% 同源渲染） ==================== */}
          {(() => {
            // 全局公共的模块化视觉元素层：在全部 9 款模板和风格下均统一渲染所选的居中、左右、空中、底部元素
            const renderGlobalModularElements = () => (
              <div className="absolute inset-0 pointer-events-none z-10 overflow-hidden">
                {/* 附加或原配细雨幕 & 丁达尔光束 */}
                {(isGentleRain || extraRainOverlay) && (
                  <RainFallingOnMeElements
                    elements={{
                      ironThrone: false,
                      wolfAndDragon: false,
                      threeEyedRaven: false,
                      theWall: false,
                      handOfTheKing: false,
                    }}
                  />
                )}

                {/* 1. 居中主视觉元素 */}
                <ExtraElement
                  id={resolvedCenter}
                  color={effectiveAccentColor}
                />
                {resolvedCenter === "bianjing-rainbow-bridge" && (
                  <svg
                    viewBox="0 0 540 320"
                    className="absolute left-1/2 bottom-0 -translate-x-1/2 h-[96%] w-auto opacity-92"
                    fill="none"
                  >
                    <defs>
                      <radialGradient
                        id="bianjingGlow"
                        cx="50%"
                        cy="52%"
                        r="48%"
                      >
                        <stop
                          offset="0%"
                          stopColor="#fbbf24"
                          stopOpacity="0.45"
                        />
                        <stop
                          offset="55%"
                          stopColor="#0d9488"
                          stopOpacity="0.18"
                        />
                        <stop
                          offset="100%"
                          stopColor="#000000"
                          stopOpacity="0"
                        />
                      </radialGradient>
                    </defs>
                    <circle
                      cx="270"
                      cy="160"
                      r="145"
                      fill="url(#bianjingGlow)"
                    />
                    <path
                      d="M65 235 Q270 115 475 235 L455 255 Q270 148 85 255 Z"
                      fill="#451a03"
                      stroke="#fbbf24"
                      strokeWidth="2"
                    />
                    <path
                      d="M80 218 Q270 102 460 218"
                      stroke="#fde68a"
                      strokeWidth="1.5"
                      strokeDasharray="8 4"
                    />
                    <rect
                      x="235"
                      y="138"
                      width="70"
                      height="28"
                      rx="2"
                      fill="#1e293b"
                      stroke="#fbbf24"
                      strokeWidth="1.4"
                    />
                    <path
                      d="M225 138 L270 118 L315 138 Z"
                      fill="#b45309"
                      stroke="#fde68a"
                      strokeWidth="1.2"
                    />
                    <path
                      d="M185 268 L335 252 L312 288 L205 292 Z"
                      fill="#0f172a"
                      stroke="#fbbf24"
                      strokeWidth="1.8"
                    />
                    <line
                      x1="268"
                      y1="68"
                      x2="258"
                      y2="262"
                      stroke="#fde68a"
                      strokeWidth="2.8"
                    />
                    <path
                      d="M268 78 C312 98, 324 146, 262 178 Z"
                      fill="#fef3c7"
                      fillOpacity="0.82"
                      stroke="#f59e0b"
                      strokeWidth="1.2"
                    />
                    <line
                      x1="268"
                      y1="78"
                      x2="195"
                      y2="255"
                      stroke="#fca5a5"
                      strokeWidth="1.2"
                      strokeDasharray="4 3"
                    />
                    <path
                      d="M95 296 Q180 282 270 296 T445 296"
                      stroke="#2dd4bf"
                      strokeWidth="1.6"
                    />
                    <path
                      d="M135 310 Q220 298 305 310 T415 310"
                      stroke="#fde68a"
                      strokeWidth="1.2"
                      opacity="0.7"
                    />
                  </svg>
                )}
                {resolvedCenter === "forbidden-scroll-seal" && (
                  <svg
                    viewBox="0 0 520 320"
                    className="absolute left-1/2 bottom-0 -translate-x-1/2 h-[92%] w-auto opacity-88"
                    fill="none"
                  >
                    <rect
                      x="125"
                      y="72"
                      width="270"
                      height="176"
                      rx="4"
                      fill="#1c1917"
                      fillOpacity="0.8"
                      stroke={effectiveAccentColor}
                      strokeWidth="2"
                    />
                    <rect
                      x="112"
                      y="62"
                      width="14"
                      height="196"
                      rx="4"
                      fill={effectiveAccentColor}
                    />
                    <rect
                      x="394"
                      y="62"
                      width="14"
                      height="196"
                      rx="4"
                      fill={effectiveAccentColor}
                    />
                    <rect
                      x="215"
                      y="115"
                      width="90"
                      height="90"
                      rx="4"
                      fill="#991b1b"
                      fillOpacity="0.55"
                      stroke="#fca5a5"
                      strokeWidth="2"
                    />
                    <path
                      d="M235 135 H285 V185 H235 Z M260 135 V185 M235 160 H285"
                      stroke="#fde68a"
                      strokeWidth="2"
                    />
                  </svg>
                )}
                {resolvedCenter === "sherlock-magnifying-maze" && (
                  <svg
                    viewBox="0 0 500 320"
                    className="absolute left-1/2 bottom-0 -translate-x-1/2 h-[92%] w-auto opacity-85"
                    fill="none"
                  >
                    <circle
                      cx="240"
                      cy="145"
                      r="88"
                      stroke={effectiveAccentColor}
                      strokeWidth="3.5"
                      fill="#090d16"
                      fillOpacity="0.6"
                    />
                    <circle
                      cx="240"
                      cy="145"
                      r="66"
                      stroke="#38bdf8"
                      strokeWidth="1.2"
                      strokeDasharray="8 4"
                    />
                    <circle
                      cx="240"
                      cy="145"
                      r="44"
                      stroke={effectiveAccentColor}
                      strokeWidth="1.2"
                      strokeDasharray="6 4"
                    />
                    <circle
                      cx="240"
                      cy="145"
                      r="22"
                      stroke="#fef08a"
                      strokeWidth="1.5"
                    />
                    <line
                      x1="302"
                      y1="207"
                      x2="368"
                      y2="275"
                      stroke={effectiveAccentColor}
                      strokeWidth="9"
                      strokeLinecap="round"
                    />
                  </svg>
                )}
                {resolvedCenter === "phoenix-nirvana-sun" && (
                  <svg
                    viewBox="0 0 520 320"
                    className="absolute left-1/2 bottom-0 -translate-x-1/2 h-[94%] w-auto opacity-88"
                    fill="none"
                  >
                    <circle
                      cx="260"
                      cy="155"
                      r="95"
                      fill="#f97316"
                      fillOpacity="0.22"
                      stroke="#fbbf24"
                      strokeWidth="1.5"
                    />
                    <path
                      d="M260 55 C215 95, 145 105, 95 75 C135 135, 185 165, 245 175 L220 275 L260 235 L300 275 L275 175 C335 165, 385 135, 425 75 C375 105, 305 95, 260 55 Z"
                      fill="#ea580c"
                      fillOpacity="0.7"
                      stroke="#fef08a"
                      strokeWidth="1.8"
                    />
                  </svg>
                )}
                {resolvedCenter === "bartleby-wall-window" && (
                  <BartlebyCenterWall />
                )}
                {resolvedCenter === "iron-throne" && <IronThroneSilhouette />}
                {resolvedCenter === "brain-pyramid" && (
                  <CognitiveAwakeningElements
                    elements={{
                      ironThrone: true,
                      wolfAndDragon: false,
                      threeEyedRaven: false,
                      theWall: false,
                      handOfTheKing: false,
                    }}
                  />
                )}
                {resolvedCenter === "imperial-palace" && (
                  <HungryProsperousElements
                    elements={{
                      ironThrone: true,
                      wolfAndDragon: false,
                      threeEyedRaven: false,
                      theWall: false,
                      handOfTheKing: false,
                    }}
                  />
                )}
                {resolvedCenter === "hometown-eaves" && (
                  <RainFallingOnMeElements
                    elements={{
                      ironThrone: true,
                      wolfAndDragon: false,
                      threeEyedRaven: false,
                      theWall: false,
                      handOfTheKing: false,
                    }}
                  />
                )}
                {resolvedCenter === "astro-compass" && (
                  <svg
                    viewBox="0 0 400 320"
                    className="absolute left-1/2 bottom-0 -translate-x-1/2 h-[92%] w-auto opacity-75 pointer-events-none"
                    fill="none"
                  >
                    <circle
                      cx="200"
                      cy="160"
                      r="118"
                      stroke={effectiveAccentColor}
                      strokeWidth="1.5"
                      strokeDasharray="6 4"
                    />
                    <circle
                      cx="200"
                      cy="160"
                      r="88"
                      stroke={effectiveAccentColor}
                      strokeWidth="1.2"
                    />
                    <polygon
                      points="200,24 214,142 332,160 214,178 200,296 186,178 68,160 186,142"
                      fill={effectiveAccentColor}
                      fillOpacity="0.28"
                      stroke="#fef08a"
                      strokeWidth="1.2"
                    />
                  </svg>
                )}
                {resolvedCenter === "longclaw-eclipse" && (
                  <svg
                    viewBox="0 0 600 383"
                    className="absolute inset-0 w-full h-full"
                    fill="none"
                  >
                    <circle
                      cx="300"
                      cy="192"
                      r="118"
                      stroke={effectiveAccentColor}
                      strokeOpacity="0.3"
                      strokeWidth="1.2"
                    />
                    <circle
                      cx="300"
                      cy="192"
                      r="92"
                      stroke={effectiveAccentColor}
                      strokeOpacity="0.5"
                      strokeWidth="1.2"
                      strokeDasharray="4 4"
                    />
                    <circle
                      cx="300"
                      cy="36"
                      r="7"
                      fill="#fef3c7"
                      stroke="#b45309"
                      strokeWidth="1.5"
                    />
                    <rect
                      x="297.5"
                      y="43"
                      width="5"
                      height="28"
                      rx="2"
                      fill="#d97706"
                    />
                    <path
                      d="M262 72 L338 72 L328 79 L272 79 Z"
                      fill={effectiveAccentColor}
                    />
                    <path
                      d="M300 79 L306 342 L300 362 L294 342 Z"
                      fill="#fef3c7"
                      fillOpacity="0.88"
                    />
                  </svg>
                )}
                {resolvedCenter === "weirwood-heart-tree" && (
                  <svg
                    viewBox="0 0 500 320"
                    className="absolute left-1/2 bottom-0 -translate-x-1/2 h-[94%] w-auto opacity-85"
                    fill="none"
                  >
                    <circle
                      cx="250"
                      cy="135"
                      r="82"
                      fill="#dc2626"
                      fillOpacity="0.45"
                    />
                    <circle
                      cx="205"
                      cy="145"
                      r="52"
                      fill="#b91c1c"
                      fillOpacity="0.55"
                    />
                    <circle
                      cx="295"
                      cy="145"
                      r="52"
                      fill="#ef4444"
                      fillOpacity="0.55"
                    />
                    <path
                      d="M236 315 L244 165 L256 165 L264 315 Z"
                      fill="#f8fafc"
                    />
                    <path
                      d="M250 175 L205 125 M250 165 L295 122 M250 155 L250 105"
                      stroke="#f8fafc"
                      strokeWidth="6"
                      strokeLinecap="round"
                    />
                  </svg>
                )}
                {resolvedCenter === "babel-library" && (
                  <svg
                    viewBox="0 0 500 320"
                    className="absolute left-1/2 bottom-0 -translate-x-1/2 h-[95%] w-auto opacity-80"
                    fill="none"
                  >
                    <path
                      d="M150 315 V125 C150 65, 350 65, 350 125 V315"
                      stroke={effectiveAccentColor}
                      strokeWidth="2"
                      fill="#090d16"
                      fillOpacity="0.65"
                    />
                    <path
                      d="M180 315 V140 C180 95, 320 95, 320 140 V315"
                      stroke={effectiveAccentColor}
                      strokeWidth="1.2"
                      strokeDasharray="4 4"
                    />
                    <g
                      stroke={effectiveAccentColor}
                      strokeWidth="1"
                      opacity="0.55"
                    >
                      <line x1="150" y1="165" x2="350" y2="165" />
                      <line x1="150" y1="205" x2="350" y2="205" />
                      <line x1="150" y1="245" x2="350" y2="245" />
                      <line x1="150" y1="285" x2="350" y2="285" />
                    </g>
                    <circle
                      cx="250"
                      cy="120"
                      r="18"
                      stroke="#fef08a"
                      strokeWidth="1.5"
                    />
                  </svg>
                )}
                {resolvedCenter === "hourglass-time" && (
                  <svg
                    viewBox="0 0 500 320"
                    className="absolute left-1/2 bottom-0 -translate-x-1/2 h-[92%] w-auto opacity-85"
                    fill="none"
                  >
                    <circle
                      cx="250"
                      cy="160"
                      r="115"
                      stroke={effectiveAccentColor}
                      strokeWidth="1.2"
                      strokeDasharray="5 5"
                    />
                    <rect
                      x="195"
                      y="48"
                      width="110"
                      height="10"
                      rx="3"
                      fill={effectiveAccentColor}
                    />
                    <rect
                      x="195"
                      y="262"
                      width="110"
                      height="10"
                      rx="3"
                      fill={effectiveAccentColor}
                    />
                    <path
                      d="M208 58 L250 160 L292 58 Z"
                      fill={effectiveAccentColor}
                      fillOpacity="0.25"
                      stroke="#fef08a"
                      strokeWidth="1.5"
                    />
                    <path
                      d="M208 262 L250 160 L292 262 Z"
                      fill={effectiveAccentColor}
                      fillOpacity="0.45"
                      stroke="#fef08a"
                      strokeWidth="1.5"
                    />
                  </svg>
                )}
                {resolvedCenter === "lighthouse-beacon" && (
                  <svg
                    viewBox="0 0 500 320"
                    className="absolute left-1/2 bottom-0 -translate-x-1/2 h-[96%] w-auto opacity-88"
                    fill="none"
                  >
                    <polygon
                      points="250,78 45,18 45,138"
                      fill="#fef08a"
                      fillOpacity="0.22"
                    />
                    <polygon
                      points="250,78 455,18 455,138"
                      fill="#fef08a"
                      fillOpacity="0.22"
                    />
                    <path
                      d="M222 310 L234 95 H266 L278 310 Z"
                      fill="#1e293b"
                      stroke={effectiveAccentColor}
                      strokeWidth="1.8"
                    />
                    <rect
                      x="236"
                      y="68"
                      width="28"
                      height="27"
                      fill="#fef08a"
                      stroke={effectiveAccentColor}
                      strokeWidth="1.5"
                    />
                    <polygon
                      points="250,44 228,68 272,68"
                      fill={effectiveAccentColor}
                    />
                  </svg>
                )}
                {resolvedCenter === "scales-justice" && (
                  <svg
                    viewBox="0 0 500 320"
                    className="absolute left-1/2 bottom-0 -translate-x-1/2 h-[92%] w-auto opacity-85"
                    fill="none"
                  >
                    <line
                      x1="250"
                      y1="36"
                      x2="250"
                      y2="295"
                      stroke={effectiveAccentColor}
                      strokeWidth="3"
                    />
                    <line
                      x1="155"
                      y1="96"
                      x2="345"
                      y2="96"
                      stroke="#fef08a"
                      strokeWidth="2.2"
                    />
                    <path
                      d="M155 96 L132 168 H178 Z"
                      fill={effectiveAccentColor}
                      fillOpacity="0.35"
                      stroke="#fef08a"
                      strokeWidth="1.4"
                    />
                    <path
                      d="M345 96 L322 168 H368 Z"
                      fill={effectiveAccentColor}
                      fillOpacity="0.35"
                      stroke="#fef08a"
                      strokeWidth="1.4"
                    />
                    <circle cx="250" cy="96" r="9" fill="#fef08a" />
                  </svg>
                )}

                {/* 2. 左右对称意象元素 */}
                <ExtraElement id={resolvedSide} color={effectiveAccentColor} />
                {resolvedSide === "bianjing-fanlou-scroll" && (
                  <>
                    <svg
                      viewBox="0 0 280 260"
                      className="absolute left-[1%] bottom-[-2%] w-[38%] h-[92%] opacity-52"
                      fill="none"
                    >
                      <path
                        d="M24 115 L88 82 L152 115 Z"
                        fill="#1e293b"
                        stroke="#fbbf24"
                        strokeWidth="1.6"
                      />
                      <rect
                        x="42"
                        y="115"
                        width="92"
                        height="45"
                        fill="#0f172a"
                        stroke="#fbbf24"
                        strokeWidth="1.4"
                      />
                      <path
                        d="M16 160 L88 135 L160 160 Z"
                        fill="#1e293b"
                        stroke="#fbbf24"
                        strokeWidth="1.6"
                      />
                      <rect
                        x="34"
                        y="160"
                        width="108"
                        height="75"
                        fill="#0f172a"
                        stroke="#fbbf24"
                        strokeWidth="1.4"
                      />
                      <circle
                        cx="28"
                        cy="128"
                        r="7"
                        fill="#dc2626"
                        stroke="#fde68a"
                        strokeWidth="1"
                      />
                      <circle
                        cx="148"
                        cy="128"
                        r="7"
                        fill="#dc2626"
                        stroke="#fde68a"
                        strokeWidth="1"
                      />
                    </svg>
                    <svg
                      viewBox="0 0 300 260"
                      className="absolute right-[1%] top-[-2%] w-[42%] h-[96%] opacity-55"
                      fill="none"
                    >
                      <path
                        d="M135 165 C155 95, 235 95, 265 165 L200 205 Z"
                        fill="#1e293b"
                        stroke="#fde68a"
                        strokeWidth="1.8"
                      />
                      <line
                        x1="200"
                        y1="205"
                        x2="165"
                        y2="122"
                        stroke="#fbbf24"
                        strokeWidth="1.2"
                      />
                      <line
                        x1="200"
                        y1="205"
                        x2="200"
                        y2="112"
                        stroke="#fbbf24"
                        strokeWidth="1.2"
                      />
                      <line
                        x1="200"
                        y1="205"
                        x2="235"
                        y2="122"
                        stroke="#fbbf24"
                        strokeWidth="1.2"
                      />
                      <circle
                        cx="238"
                        cy="68"
                        r="22"
                        fill="#b45309"
                        fillOpacity="0.6"
                        stroke="#fde68a"
                        strokeWidth="1.8"
                      />
                      <rect
                        x="231"
                        y="61"
                        width="14"
                        height="14"
                        stroke="#fde68a"
                        strokeWidth="1.5"
                        fill="#090d16"
                      />
                    </svg>
                  </>
                )}
                {resolvedSide === "sword-shield-duel" && (
                  <svg
                    viewBox="0 0 900 383"
                    className="absolute inset-0 w-full h-full opacity-50"
                    fill="none"
                  >
                    <path
                      d="M48 95 L98 75 L148 95 V175 C148 225, 98 255, 98 255 C98 255, 48 225, 48 175 Z"
                      fill="#0f172a"
                      stroke={effectiveAccentColor}
                      strokeWidth="2"
                    />
                    <path
                      d="M815 62 L822 255 L815 278 L808 255 Z"
                      fill="#fef3c7"
                    />
                    <path
                      d="M778 242 H852 L842 250 H788 Z"
                      fill={effectiveAccentColor}
                    />
                  </svg>
                )}
                {resolvedSide === "abacus-coin-scale" && (
                  <svg
                    viewBox="0 0 900 383"
                    className="absolute inset-0 w-full h-full opacity-48"
                    fill="none"
                  >
                    <rect
                      x="42"
                      y="105"
                      width="96"
                      height="145"
                      rx="4"
                      fill="#0f172a"
                      stroke={effectiveAccentColor}
                      strokeWidth="2"
                    />
                    <line
                      x1="42"
                      y1="145"
                      x2="138"
                      y2="145"
                      stroke={effectiveAccentColor}
                      strokeWidth="1.8"
                    />
                    <line
                      x1="66"
                      y1="105"
                      x2="66"
                      y2="250"
                      stroke={effectiveAccentColor}
                      strokeWidth="1.2"
                    />
                    <line
                      x1="90"
                      y1="105"
                      x2="90"
                      y2="250"
                      stroke={effectiveAccentColor}
                      strokeWidth="1.2"
                    />
                    <line
                      x1="114"
                      y1="105"
                      x2="114"
                      y2="250"
                      stroke={effectiveAccentColor}
                      strokeWidth="1.2"
                    />
                    <circle
                      cx="812"
                      cy="175"
                      r="46"
                      stroke={effectiveAccentColor}
                      strokeWidth="2"
                      fill="#0f172a"
                    />
                    <rect
                      x="796"
                      y="159"
                      width="32"
                      height="32"
                      stroke="#fde68a"
                      strokeWidth="1.8"
                    />
                  </svg>
                )}
                {resolvedSide === "piano-violin-symphony" && (
                  <svg
                    viewBox="0 0 900 383"
                    className="absolute inset-0 w-full h-full opacity-48"
                    fill="none"
                  >
                    <rect
                      x="42"
                      y="110"
                      width="84"
                      height="160"
                      rx="4"
                      fill="#f8fafc"
                      stroke={effectiveAccentColor}
                      strokeWidth="1.8"
                    />
                    <rect
                      x="56"
                      y="110"
                      width="12"
                      height="95"
                      fill="#090d16"
                    />
                    <rect
                      x="78"
                      y="110"
                      width="12"
                      height="95"
                      fill="#090d16"
                    />
                    <rect
                      x="102"
                      y="110"
                      width="12"
                      height="95"
                      fill="#090d16"
                    />
                    <ellipse
                      cx="815"
                      cy="165"
                      rx="28"
                      ry="38"
                      fill="#7c2d12"
                      stroke="#fde68a"
                      strokeWidth="1.8"
                    />
                    <ellipse
                      cx="815"
                      cy="225"
                      rx="36"
                      ry="44"
                      fill="#7c2d12"
                      stroke="#fde68a"
                      strokeWidth="1.8"
                    />
                    <line
                      x1="815"
                      y1="72"
                      x2="815"
                      y2="268"
                      stroke="#fef08a"
                      strokeWidth="2.5"
                    />
                  </svg>
                )}
                {resolvedSide === "bartleby-scrolls-quill" && (
                  <BartlebySidesScrollsAndQuill />
                )}
                {resolvedSide === "wolf-dragon" && <WolfAndDragonTotems />}
                {resolvedSide === "brain-wings" && (
                  <CognitiveAwakeningElements
                    elements={{
                      ironThrone: false,
                      wolfAndDragon: true,
                      threeEyedRaven: false,
                      theWall: false,
                      handOfTheKing: false,
                    }}
                  />
                )}
                {resolvedSide === "famine-seal" && (
                  <HungryProsperousElements
                    elements={{
                      ironThrone: false,
                      wolfAndDragon: true,
                      threeEyedRaven: false,
                      theWall: false,
                      handOfTheKing: false,
                    }}
                  />
                )}
                {resolvedSide === "train-plum" && (
                  <RainFallingOnMeElements
                    elements={{
                      ironThrone: false,
                      wolfAndDragon: true,
                      threeEyedRaven: false,
                      theWall: false,
                      handOfTheKing: false,
                    }}
                  />
                )}
                {resolvedSide === "heraldic-shields" && (
                  <div className="absolute inset-0 flex items-center justify-between px-[6%] opacity-55">
                    <div className="w-28 h-28 rounded-full border-2 border-sky-300/60 bg-[#0b1520]/80 flex items-center justify-center">
                      <svg viewBox="0 0 100 100" className="w-18 h-18">
                        <circle
                          cx="50"
                          cy="50"
                          r="42"
                          fill="none"
                          stroke="#7dd3fc"
                          strokeWidth="1.2"
                          strokeDasharray="3 3"
                        />
                        <path
                          d="M24 78 L34 48 L24 38 L42 28 L40 14 L56 24 L70 16 L66 32 L82 38 L68 52 L78 60 L60 66 L52 82 Z"
                          fill="#bae6fd"
                        />
                      </svg>
                    </div>
                    <div className="w-28 h-28 rounded-full border-2 border-amber-400/60 bg-[#240d0b]/80 flex items-center justify-center">
                      <svg viewBox="0 0 100 100" className="w-18 h-18">
                        <circle
                          cx="50"
                          cy="50"
                          r="42"
                          fill="none"
                          stroke="#fb923c"
                          strokeWidth="1.2"
                          strokeDasharray="3 3"
                        />
                        <path
                          d="M78 20 C60 26, 46 38, 38 52 L26 40 L16 46 L28 56 C22 68, 26 80, 40 84 C38 70, 46 62, 58 58 L52 74 L68 62 C76 70, 84 76, 88 80 C80 64, 78 48, 86 36 L68 42 L78 20 Z"
                          fill="#fb923c"
                        />
                      </svg>
                    </div>
                  </div>
                )}
                {resolvedSide === "sun-moon-pillars" && (
                  <svg
                    viewBox="0 0 900 383"
                    className="absolute inset-0 w-full h-full opacity-45"
                    fill="none"
                  >
                    <rect
                      x="42"
                      y="55"
                      width="36"
                      height="280"
                      stroke={effectiveAccentColor}
                      strokeWidth="1.5"
                      fill="#090d16"
                    />
                    <circle cx="60" cy="36" r="14" fill="#fbbf24" />
                    <rect
                      x="822"
                      y="55"
                      width="36"
                      height="280"
                      stroke="#7dd3fc"
                      strokeWidth="1.5"
                      fill="#090d16"
                    />
                    <path
                      d="M846 22 C834 24, 830 38, 842 46 C832 48, 822 38, 828 24 C832 18, 840 18, 846 22 Z"
                      fill="#bae6fd"
                    />
                  </svg>
                )}
                {resolvedSide === "bamboo-plum-ink" && (
                  <svg
                    viewBox="0 0 900 383"
                    className="absolute inset-0 w-full h-full opacity-50"
                    fill="none"
                  >
                    <g stroke="#34d399" strokeWidth="2.5" strokeLinecap="round">
                      <line x1="68" y1="360" x2="82" y2="45" />
                      <line x1="98" y1="360" x2="116" y2="95" />
                      <path
                        d="M76 140 L42 118 M78 210 L112 188 M108 165 L142 145"
                        strokeWidth="2"
                      />
                    </g>
                    <path
                      d="M880 85 C820 95, 775 128, 735 168 M815 108 L765 102"
                      stroke={effectiveAccentColor}
                      strokeWidth="3"
                      strokeLinecap="round"
                    />
                  </svg>
                )}
                {resolvedSide === "chess-royals" && (
                  <svg
                    viewBox="0 0 900 383"
                    className="absolute inset-0 w-full h-full opacity-45"
                    fill="none"
                  >
                    <path
                      d="M55 320 H115 L105 185 H65 Z M75 185 V145 H95 V185 M85 120 V145 M73 132 H97"
                      stroke="#7dd3fc"
                      strokeWidth="2"
                      fill="#0c1926"
                    />
                    <path
                      d="M785 320 H845 L835 185 H795 Z M790 185 L782 142 L802 160 L815 138 L828 160 L848 142 L840 185 Z"
                      stroke={effectiveAccentColor}
                      strokeWidth="2"
                      fill="#2b1210"
                    />
                  </svg>
                )}
                {resolvedSide === "masks-curtain" && (
                  <svg
                    viewBox="0 0 900 383"
                    className="absolute inset-0 w-full h-full opacity-45"
                    fill="none"
                  >
                    <ellipse
                      cx="82"
                      cy="175"
                      rx="34"
                      ry="44"
                      stroke="#7dd3fc"
                      strokeWidth="1.8"
                      fill="#090d16"
                    />
                    <path
                      d="M68 195 Q82 180 96 195"
                      stroke="#7dd3fc"
                      strokeWidth="2"
                    />
                    <ellipse
                      cx="818"
                      cy="175"
                      rx="34"
                      ry="44"
                      stroke={effectiveAccentColor}
                      strokeWidth="1.8"
                      fill="#090d16"
                    />
                    <path
                      d="M804 185 Q818 202 832 185"
                      stroke={effectiveAccentColor}
                      strokeWidth="2"
                    />
                  </svg>
                )}
                {resolvedSide === "dna-circuit" && (
                  <svg
                    viewBox="0 0 900 383"
                    className="absolute inset-0 w-full h-full opacity-45"
                    fill="none"
                  >
                    <path
                      d="M52 40 Q112 110 52 180 T52 320"
                      stroke="#38bdf8"
                      strokeWidth="2"
                    />
                    <path
                      d="M112 40 Q52 110 112 180 T112 320"
                      stroke={effectiveAccentColor}
                      strokeWidth="2"
                    />
                    <g stroke="#a855f7" strokeWidth="1.5">
                      <polyline points="840,50 790,50 765,85 720,85" />
                      <polyline points="850,140 800,140 775,180 735,180" />
                      <circle cx="720" cy="85" r="4" fill="#a855f7" />
                      <circle cx="735" cy="180" r="4" fill="#38bdf8" />
                    </g>
                  </svg>
                )}

                {/* 3. 空中/中景意境元素 */}
                <ExtraElement id={resolvedSky} color={effectiveAccentColor} />
                {resolvedSky === "song-cranes-clouds" && (
                  <svg
                    viewBox="0 0 900 383"
                    className="absolute inset-0 w-full h-full opacity-90"
                    fill="none"
                  >
                    <path
                      d="M445 58 C422 32, 392 28, 368 42 C392 48, 415 58, 434 72 L412 92 L442 78 L468 88 L452 72 C472 58, 496 48, 522 42 C496 28, 468 32, 445 58 Z"
                      fill="#f8fafc"
                      stroke="#fbbf24"
                      strokeWidth="1.2"
                    />
                    <circle cx="445" cy="48" r="2.5" fill="#dc2626" />
                    <path
                      d="M535 68 Q555 54 575 68 T615 68"
                      stroke="#fde68a"
                      strokeWidth="1.8"
                      strokeLinecap="round"
                    />
                    <path
                      d="M310 82 Q330 68 350 82 T390 82"
                      stroke="#2dd4bf"
                      strokeWidth="1.6"
                      strokeLinecap="round"
                    />
                  </svg>
                )}
                {resolvedSky === "detective-cipher-code" && (
                  <svg
                    viewBox="0 0 900 383"
                    className="absolute inset-0 w-full h-full opacity-75"
                    fill="none"
                  >
                    <g stroke="#fbbf24" strokeWidth="1" strokeDasharray="3 3">
                      <line x1="340" y1="45" x2="450" y2="85" />
                      <line x1="450" y1="85" x2="565" y2="42" />
                      <line x1="565" y1="42" x2="640" y2="92" />
                    </g>
                    <circle
                      cx="340"
                      cy="45"
                      r="6"
                      fill="#090d16"
                      stroke="#fbbf24"
                      strokeWidth="2"
                    />
                    <circle
                      cx="450"
                      cy="85"
                      r="8"
                      fill="#dc2626"
                      stroke="#fde68a"
                      strokeWidth="2"
                    />
                    <circle
                      cx="565"
                      cy="42"
                      r="6"
                      fill="#090d16"
                      stroke="#38bdf8"
                      strokeWidth="2"
                    />
                    <circle
                      cx="640"
                      cy="92"
                      r="6"
                      fill="#090d16"
                      stroke="#fbbf24"
                      strokeWidth="2"
                    />
                  </svg>
                )}
                {resolvedSky === "aurora-borealis" && (
                  <svg
                    viewBox="0 0 900 383"
                    className="absolute inset-0 w-full h-full opacity-65"
                    fill="none"
                  >
                    <path
                      d="M120 75 Q 290 18, 460 68 T 790 42"
                      stroke="#34d399"
                      strokeWidth="18"
                      strokeLinecap="round"
                      opacity="0.35"
                    />
                    <path
                      d="M160 92 Q 330 35, 500 82 T 820 58"
                      stroke="#38bdf8"
                      strokeWidth="10"
                      strokeLinecap="round"
                      opacity="0.45"
                    />
                  </svg>
                )}
                {resolvedSky === "falling-ginkgo-leaves" && (
                  <svg
                    viewBox="0 0 900 383"
                    className="absolute inset-0 w-full h-full opacity-88"
                    fill="none"
                  >
                    {([
                      [385, 48, 15],
                      [475, 72, -20],
                      [568, 42, 25],
                      [645, 86, -12],
                    ] as const).map(([x, y, rot], i) => (
                      <g
                        key={i}
                        transform={`translate(${x},${y}) rotate(${rot})`}
                      >
                        <path
                          d="M0 16 L-14 -4 C-8 -14, 8 -14, 14 -4 Z"
                          fill="#facc15"
                          stroke="#eab308"
                          strokeWidth="1"
                        />
                        <line
                          x1="0"
                          y1="16"
                          x2="0"
                          y2="24"
                          stroke="#ca8a04"
                          strokeWidth="1.5"
                        />
                      </g>
                    ))}
                  </svg>
                )}
                {resolvedSky === "bartleby-dead-letters" && (
                  <BartlebySkyLettersAndLamp />
                )}
                {resolvedSky === "raven-leaves" && (
                  <WallAndRavenOverlay showWall={false} showRaven={true} />
                )}
                {resolvedSky === "meta-eye" && (
                  <CognitiveAwakeningElements
                    elements={{
                      ironThrone: false,
                      wolfAndDragon: false,
                      threeEyedRaven: true,
                      theWall: false,
                      handOfTheKing: false,
                    }}
                  />
                )}
                {resolvedSky === "macartney-ship" && (
                  <HungryProsperousElements
                    elements={{
                      ironThrone: false,
                      wolfAndDragon: false,
                      threeEyedRaven: true,
                      theWall: false,
                      handOfTheKing: false,
                    }}
                  />
                )}
                {resolvedSky === "spring-swallows" && (
                  <RainFallingOnMeElements
                    elements={{
                      ironThrone: false,
                      wolfAndDragon: false,
                      threeEyedRaven: true,
                      theWall: false,
                      handOfTheKing: false,
                    }}
                  />
                )}
                {resolvedSky === "red-comet-arc" && (
                  <svg
                    viewBox="0 0 900 383"
                    className="absolute inset-0 w-full h-full"
                    fill="none"
                  >
                    <path
                      d="M90 128 Q 380 78, 720 46"
                      stroke="#ef4444"
                      strokeWidth="3"
                      strokeLinecap="round"
                    />
                    <circle cx="720" cy="46" r="5" fill="#fef08a" />
                    <circle
                      cx="720"
                      cy="46"
                      r="14"
                      fill="#ef4444"
                      fillOpacity="0.38"
                    />
                  </svg>
                )}
                {resolvedSky === "macondo-butterflies" && (
                  <svg
                    viewBox="0 0 900 383"
                    className="absolute inset-0 w-full h-full"
                    fill="none"
                  >
                    {([
                      [410, 58, 1],
                      [485, 42, 0.8],
                      [555, 76, 0.9],
                      [350, 92, 0.7],
                      [625, 52, 0.85],
                    ] as const).map(([x, y, sc], i) => (
                      <g
                        key={i}
                        transform={`translate(${x},${y}) scale(${sc})`}
                        fill="#facc15"
                        opacity="0.88"
                      >
                        <path d="M0 0 C-14 -16, -24 -6, -12 8 C-20 16, -8 24, 0 12 C8 24, 20 16, 12 8 C24 -6, 14 -16, 0 0 Z" />
                      </g>
                    ))}
                  </svg>
                )}
                {resolvedSky === "three-body-suns" && (
                  <svg
                    viewBox="0 0 900 383"
                    className="absolute inset-0 w-full h-full"
                    fill="none"
                  >
                    <ellipse
                      cx="480"
                      cy="68"
                      rx="110"
                      ry="28"
                      stroke="#38bdf8"
                      strokeWidth="1"
                      strokeDasharray="4 4"
                    />
                    <circle cx="420" cy="58" r="12" fill="#f97316" />
                    <circle cx="495" cy="44" r="8" fill="#fef08a" />
                    <circle cx="545" cy="76" r="10" fill="#38bdf8" />
                  </svg>
                )}
                {resolvedSky === "sky-lanterns" && (
                  <svg
                    viewBox="0 0 900 383"
                    className="absolute inset-0 w-full h-full"
                    fill="none"
                  >
                    {([
                      [390, 48],
                      [465, 32],
                      [538, 66],
                      [615, 42],
                    ] as const).map(([x, y], i) => (
                      <g key={i} transform={`translate(${x},${y})`}>
                        <rect
                          x="-10"
                          y="-14"
                          width="20"
                          height="26"
                          rx="5"
                          fill="#f59e0b"
                          fillOpacity="0.85"
                          stroke="#fef08a"
                          strokeWidth="1"
                        />
                        <circle cx="0" cy="6" r="4" fill="#ffffff" />
                      </g>
                    ))}
                  </svg>
                )}
                {resolvedSky === "constellation-astrolabe" && (
                  <svg
                    viewBox="0 0 900 383"
                    className="absolute inset-0 w-full h-full opacity-80"
                    fill="none"
                  >
                    <polyline
                      points="340,68 412,42 486,62 552,36 618,74"
                      stroke="#fde68a"
                      strokeWidth="1.2"
                      strokeDasharray="3 3"
                    />
                    <circle cx="340" cy="68" r="3.5" fill="#fffbeb" />
                    <circle cx="412" cy="42" r="4" fill="#38bdf8" />
                    <circle cx="486" cy="62" r="3.5" fill="#fffbeb" />
                    <circle cx="552" cy="36" r="4.5" fill="#fbbf24" />
                    <circle cx="618" cy="74" r="3.5" fill="#fffbeb" />
                  </svg>
                )}
                {resolvedSky === "music-notes-feather" && (
                  <svg
                    viewBox="0 0 900 383"
                    className="absolute inset-0 w-full h-full opacity-75"
                    fill="none"
                  >
                    <path
                      d="M310 78 Q 460 32, 640 68"
                      stroke={effectiveAccentColor}
                      strokeWidth="1"
                    />
                    <path
                      d="M310 88 Q 460 42, 640 78"
                      stroke={effectiveAccentColor}
                      strokeWidth="1"
                    />
                    <circle cx="395" cy="64" r="5" fill="#fef08a" />
                    <line
                      x1="400"
                      y1="64"
                      x2="400"
                      y2="38"
                      stroke="#fef08a"
                      strokeWidth="2"
                    />
                    <circle cx="515" cy="58" r="5" fill="#7dd3fc" />
                    <line
                      x1="520"
                      y1="58"
                      x2="520"
                      y2="32"
                      stroke="#7dd3fc"
                      strokeWidth="2"
                    />
                  </svg>
                )}

                {/* 4. 底部前景地貌元素 */}
                <ExtraElement
                  id={resolvedBottom}
                  color={effectiveAccentColor}
                />
                {resolvedBottom === "bianhe-river-boats" && (
                  <svg
                    viewBox="0 0 460 95"
                    className="absolute left-0 bottom-0 w-[56%] h-[25%] opacity-65"
                    preserveAspectRatio="none"
                    fill="none"
                  >
                    <path
                      d="M0 95 V68 Q75 52 150 68 T300 66 T460 74 V95 Z"
                      fill="#082f49"
                      stroke="#2dd4bf"
                      strokeWidth="1.3"
                    />
                    <path
                      d="M36 66 L118 66 L104 80 L50 80 Z"
                      fill="#451a03"
                      stroke="#fbbf24"
                      strokeWidth="1.4"
                    />
                    <path
                      d="M56 66 C64 48, 90 48, 98 66 Z"
                      fill="#1e293b"
                      stroke="#fde68a"
                      strokeWidth="1.2"
                    />
                    <path
                      d="M185 70 L255 70 L242 82 L198 82 Z"
                      fill="#451a03"
                      stroke="#fbbf24"
                      strokeWidth="1.3"
                    />
                  </svg>
                )}
                {resolvedBottom === "labyrinth-maze-floor" && (
                  <svg
                    viewBox="0 0 460 95"
                    className="absolute left-0 bottom-0 w-[56%] h-[24%] opacity-50"
                    preserveAspectRatio="none"
                    fill="none"
                  >
                    <g stroke={effectiveAccentColor} strokeWidth="1.2">
                      <line x1="0" y1="52" x2="420" y2="52" />
                      <line x1="0" y1="72" x2="450" y2="72" />
                      <line x1="85" y1="52" x2="35" y2="95" />
                      <line x1="165" y1="52" x2="135" y2="95" />
                      <line x1="245" y1="52" x2="235" y2="95" />
                      <line x1="325" y1="52" x2="345" y2="95" />
                    </g>
                  </svg>
                )}
                {resolvedBottom === "ancient-bookshelf-wall" && (
                  <svg
                    viewBox="0 0 420 95"
                    className="absolute left-0 bottom-0 w-[50%] h-[25%] opacity-55"
                    preserveAspectRatio="none"
                    fill="none"
                  >
                    <rect
                      x="12"
                      y="28"
                      width="18"
                      height="67"
                      fill="#1e293b"
                      stroke={effectiveAccentColor}
                      strokeWidth="1.2"
                    />
                    <rect
                      x="32"
                      y="18"
                      width="22"
                      height="77"
                      fill="#3b1212"
                      stroke={effectiveAccentColor}
                      strokeWidth="1.2"
                    />
                    <rect
                      x="56"
                      y="34"
                      width="16"
                      height="61"
                      fill="#0f172a"
                      stroke={effectiveAccentColor}
                      strokeWidth="1.2"
                    />
                    <rect
                      x="74"
                      y="22"
                      width="24"
                      height="73"
                      fill="#1e293b"
                      stroke={effectiveAccentColor}
                      strokeWidth="1.2"
                    />
                    <rect
                      x="108"
                      y="26"
                      width="20"
                      height="69"
                      transform="rotate(12 108 26)"
                      fill="#451a03"
                      stroke={effectiveAccentColor}
                      strokeWidth="1.2"
                    />
                  </svg>
                )}
                {resolvedBottom === "misty-bamboo-bridge" && (
                  <svg
                    viewBox="0 0 450 95"
                    className="absolute left-0 bottom-0 w-[54%] h-[25%] opacity-60"
                    preserveAspectRatio="none"
                    fill="none"
                  >
                    <path
                      d="M18 90 Q115 32 212 90"
                      stroke={effectiveAccentColor}
                      strokeWidth="3"
                      fill="#0f172a"
                      fillOpacity="0.7"
                    />
                    <circle
                      cx="115"
                      cy="78"
                      r="18"
                      stroke="#7dd3fc"
                      strokeWidth="1.2"
                    />
                  </svg>
                )}
                {resolvedBottom === "bartleby-wallstreet" && (
                  <BartlebyBottomWallStreet />
                )}
                {resolvedBottom === "ice-wall" && (
                  <WallAndRavenOverlay showWall={true} showRaven={false} />
                )}
                {resolvedBottom === "iceberg-curve" && (
                  <CognitiveAwakeningElements
                    elements={{
                      ironThrone: false,
                      wolfAndDragon: false,
                      threeEyedRaven: false,
                      theWall: true,
                      handOfTheKing: false,
                    }}
                  />
                )}
                {resolvedBottom === "great-wall" && (
                  <HungryProsperousElements
                    elements={{
                      ironThrone: false,
                      wolfAndDragon: false,
                      threeEyedRaven: false,
                      theWall: true,
                      handOfTheKing: false,
                    }}
                  />
                )}
                {resolvedBottom === "karst-hills" && (
                  <RainFallingOnMeElements
                    elements={{
                      ironThrone: false,
                      wolfAndDragon: false,
                      threeEyedRaven: false,
                      theWall: true,
                      handOfTheKing: false,
                    }}
                  />
                )}
                {resolvedBottom === "ocean-storm-waves" && (
                  <svg
                    viewBox="0 0 450 95"
                    className="absolute left-0 bottom-0 w-[55%] h-[25%] opacity-55"
                    preserveAspectRatio="none"
                    fill="none"
                  >
                    <path
                      d="M0 95 V55 Q45 25 90 55 T180 50 T270 58 T360 52 T450 95 Z"
                      fill="#0c2536"
                      stroke="#38bdf8"
                      strokeWidth="1.5"
                    />
                    <path
                      d="M0 75 Q60 48 120 75 T240 72 T360 78"
                      stroke={effectiveAccentColor}
                      strokeWidth="1.2"
                    />
                  </svg>
                )}
                {resolvedBottom === "greek-colonnade" && (
                  <svg
                    viewBox="0 0 420 95"
                    className="absolute left-0 bottom-0 w-[48%] h-[25%] opacity-55"
                    preserveAspectRatio="none"
                    fill="none"
                  >
                    <polygon
                      points="16,32 105,8 194,32"
                      fill="#1e293b"
                      stroke={effectiveAccentColor}
                      strokeWidth="1.4"
                    />
                    <rect
                      x="26"
                      y="32"
                      width="12"
                      height="58"
                      fill="#0f172a"
                      stroke={effectiveAccentColor}
                      strokeWidth="1.2"
                    />
                    <rect
                      x="64"
                      y="32"
                      width="12"
                      height="58"
                      fill="#0f172a"
                      stroke={effectiveAccentColor}
                      strokeWidth="1.2"
                    />
                    <rect
                      x="102"
                      y="32"
                      width="12"
                      height="58"
                      fill="#0f172a"
                      stroke={effectiveAccentColor}
                      strokeWidth="1.2"
                    />
                    <rect
                      x="140"
                      y="32"
                      width="12"
                      height="58"
                      fill="#0f172a"
                      stroke={effectiveAccentColor}
                      strokeWidth="1.2"
                    />
                    <rect
                      x="172"
                      y="46"
                      width="12"
                      height="44"
                      fill="#0f172a"
                      stroke={effectiveAccentColor}
                      strokeWidth="1.2"
                    />
                  </svg>
                )}
                {resolvedBottom === "silk-road-dunes" && (
                  <svg
                    viewBox="0 0 450 95"
                    className="absolute left-0 bottom-0 w-[55%] h-[24%] opacity-55"
                    preserveAspectRatio="none"
                    fill="none"
                  >
                    <path
                      d="M0 95 L0 64 Q85 24 195 58 T420 42 L450 95 Z"
                      fill="#451a03"
                      stroke="#f59e0b"
                      strokeWidth="1.4"
                    />
                  </svg>
                )}
                {resolvedBottom === "lotus-water-ripples" && (
                  <svg
                    viewBox="0 0 450 95"
                    className="absolute left-0 bottom-0 w-[55%] h-[24%] opacity-65"
                    fill="none"
                  >
                    <ellipse
                      cx="145"
                      cy="72"
                      rx="85"
                      ry="14"
                      stroke={effectiveAccentColor}
                      strokeWidth="1.2"
                    />
                    <ellipse
                      cx="145"
                      cy="72"
                      rx="135"
                      ry="22"
                      stroke="#7dd3fc"
                      strokeWidth="1"
                      strokeDasharray="5 4"
                    />
                  </svg>
                )}
                {resolvedBottom === "pine-forest-deer" && (
                  <svg
                    viewBox="0 0 420 95"
                    className="absolute left-0 bottom-0 w-[50%] h-[25%] opacity-55"
                    preserveAspectRatio="none"
                    fill="none"
                  >
                    <polygon
                      points="24,25 8,88 40,88"
                      fill="#064e3b"
                      stroke="#34d399"
                      strokeWidth="1"
                    />
                    <polygon
                      points="58,14 38,88 78,88"
                      fill="#065f46"
                      stroke="#34d399"
                      strokeWidth="1"
                    />
                    <polygon
                      points="94,32 78,88 110,88"
                      fill="#064e3b"
                      stroke="#34d399"
                      strokeWidth="1"
                    />
                    <polygon
                      points="132,20 112,88 152,88"
                      fill="#047857"
                      stroke="#34d399"
                      strokeWidth="1"
                    />
                  </svg>
                )}
              </div>
            )

            // 全局公共的背景底图与纹理层：当选择了具体背景模板时，所有 9 款版式统一叠加该底图与肌理
            const renderGlobalBackdropTexture = () => (
              <div className="absolute inset-0 pointer-events-none z-0 overflow-hidden">
                {effectiveBgImage && (
                  <img
                    src={effectiveBgImage}
                    alt={activeConfig.title}
                    crossOrigin="anonymous"
                    className="absolute inset-0 w-full h-full object-cover object-center scale-105 opacity-30"
                  />
                )}
                {(activeBgTemplate.patternType === "brick-wall" ||
                  (selectedBgId === "bg-book-default" && isBartleby)) && (
                  <svg
                    viewBox="0 0 900 383"
                    className="absolute inset-0 w-full h-full opacity-15 pointer-events-none"
                    fill="none"
                  >
                    <g stroke="#94a3b8" strokeWidth="0.7">
                      <line x1="0" y1="48" x2="900" y2="48" />
                      <line x1="0" y1="96" x2="900" y2="96" />
                      <line x1="0" y1="144" x2="900" y2="144" />
                      <line x1="0" y1="192" x2="900" y2="192" />
                      <line x1="0" y1="240" x2="900" y2="240" />
                      <line x1="0" y1="288" x2="900" y2="288" />
                      <line x1="0" y1="336" x2="900" y2="336" />
                    </g>
                  </svg>
                )}
              </div>
            )

            const renderCoverScene = (includeGuides: boolean) => (
              <>
                {/* 固定位置的可复用品牌组件：「爱豆书单」（5 种风格共享同一锚点坐标） */}
                <AidouBrandBadge position={brandPosition} theme={brandTheme} />

                {/* 全局统一的模块化元素层（对所有 9 款版式模板全部生效） */}
                {renderGlobalModularElements()}

                {/* 全局高定装帧细节增强层（四角镂空角花 + 中轴星盘标尺 + 金尘微粒） */}
                {showRichOrnament && (
                  <RichDesignOverlay accentColor={effectiveAccentColor} />
                )}
                {/* ==================== 通用母版 A：经典左文右书（100% 静态精装书封，少字清爽） ==================== */}
                {coverStyle === "tpl-1-magazine-book" && (
                  <div
                    className="absolute inset-0 overflow-hidden flex items-center justify-between px-[6%]"
                    style={{ background: effectiveUnifiedBgGradient }}
                  >
                    {renderGlobalBackdropTexture()}
                    <div
                      className="absolute -left-16 -bottom-16 w-80 h-80 rounded-full blur-3xl pointer-events-none"
                      style={{ background: palette.glowLeft }}
                    />
                    <div
                      className="absolute -right-12 -top-16 w-80 h-80 rounded-full blur-3xl pointer-events-none"
                      style={{ background: palette.glowRight }}
                    />
                    <div
                      className="absolute inset-[3.2%] rounded-lg pointer-events-none"
                      style={{ border: `1px solid ${palette.borderMain}` }}
                    />
                    <div
                      className="absolute inset-[4%] rounded pointer-events-none"
                      style={{ border: `1px solid ${palette.borderSub}` }}
                    />

                    <div
                      className={`relative z-20 flex flex-col max-w-[60%] ${
                        brandPosition === "top-left" ? "pt-[6%]" : ""
                      }`}
                    >
                      <div className="flex items-center gap-2 mb-2">
                        <span
                          className="px-2.5 py-0.5 font-semibold tracking-wider rounded"
                          style={{
                            fontSize: `${fontSizes.categoryTag}px`,
                            backgroundColor: palette.tagBg,
                            color: palette.tagText,
                            border: `1px solid ${palette.borderMain}`,
                          }}
                        >
                          {activeConfig.categoryTag}
                        </span>
                        <span
                          className="hidden sm:inline font-cinzel tracking-[0.22em] opacity-75"
                          style={{
                            fontSize: `${fontSizes.englishTitle}px`,
                            color: palette.subtitleColor,
                          }}
                        >
                          {activeConfig.englishTitle}
                        </span>
                      </div>

                      <h2
                        className="font-serif-sc font-black tracking-[0.08em] leading-[1.12]"
                        style={{
                          fontSize: `${fontSizes.title}px`,
                          color: palette.titleColor,
                          textShadow: palette.isLight
                            ? "none"
                            : "0 4px 24px rgba(0,0,0,0.75)",
                        }}
                      >
                        {activeConfig.title}
                      </h2>

                      <p
                        className="mt-2.5 font-serif-sc tracking-wider font-medium"
                        style={{
                          fontSize: `${fontSizes.subtitle}px`,
                          color: palette.subtitleColor,
                        }}
                      >
                        {minimalTagline}
                      </p>

                      <div
                        className="mt-3 pt-2 flex flex-wrap items-center gap-2 opacity-85"
                        style={{
                          borderTop: `1px solid ${palette.borderSub}`,
                          color: palette.titleColor,
                        }}
                      >
                        <span style={{ fontSize: `${fontSizes.author}px` }}>
                          {activeConfig.author}
                        </span>
                        {activeConfig.quote && (
                          <>
                            <span className="opacity-40">·</span>
                            <span
                              className="italic opacity-85 line-clamp-1"
                              style={{ fontSize: `${fontSizes.quote}px` }}
                            >
                              {activeConfig.quote}
                            </span>
                          </>
                        )}
                      </div>
                    </div>

                    {/* 右侧：100% 纯静态书籍图案（无重复书名文字，粉丝一眼识书） */}
                    <div className="relative z-20 flex items-center justify-center w-[32%] h-full">
                      <svg
                        viewBox="0 0 200 200"
                        className="absolute w-44 h-44 sm:w-56 sm:h-56 pointer-events-none opacity-35"
                        fill="none"
                      >
                        <circle
                          cx="100"
                          cy="100"
                          r="88"
                          stroke={palette.accentHex}
                          strokeWidth="1"
                          strokeDasharray="4 4"
                        />
                        <circle
                          cx="100"
                          cy="100"
                          r="70"
                          stroke={palette.accentHex}
                          strokeWidth="1"
                        />
                      </svg>

                      {renderRightBookArtwork(palette.accentHex, false)}
                    </div>
                  </div>
                )}

                {/* ==================== 通用母版 B：居中皇家图腾（中轴对称，1:1 转发最稳） ==================== */}
                {coverStyle === "tpl-2-center-emblem" && (
                  <div
                    className="absolute inset-0 overflow-hidden flex flex-col items-center justify-center px-[8%]"
                    style={{ background: effectiveUnifiedBgGradient }}
                  >
                    {renderGlobalBackdropTexture()}
                    <div
                      className="absolute inset-[3.4%] rounded-lg pointer-events-none"
                      style={{ border: `1.5px solid ${palette.borderMain}` }}
                    />
                    <div
                      className="absolute inset-[4.4%] rounded pointer-events-none"
                      style={{ border: `1px solid ${palette.borderSub}` }}
                    />

                    <svg
                      viewBox="0 0 600 300"
                      className="absolute inset-0 w-full h-full pointer-events-none opacity-25"
                      fill="none"
                    >
                      <circle
                        cx="300"
                        cy="150"
                        r="120"
                        stroke={palette.accentHex}
                        strokeWidth="1"
                      />
                      <circle
                        cx="300"
                        cy="150"
                        r="95"
                        stroke={palette.accentHex}
                        strokeWidth="1"
                        strokeDasharray="4 4"
                      />
                      <line
                        x1="60"
                        y1="150"
                        x2="200"
                        y2="150"
                        stroke={palette.accentHex}
                        strokeWidth="1"
                      />
                      <line
                        x1="400"
                        y1="150"
                        x2="540"
                        y2="150"
                        stroke={palette.accentHex}
                        strokeWidth="1"
                      />
                    </svg>

                    <div className="relative z-20 flex flex-col items-center text-center">
                      <div className="mb-1.5">
                        {renderStaticSymbol("w-12 h-12 sm:w-14 sm:h-14")}
                      </div>
                      <span
                        className="font-cinzel tracking-[0.3em] uppercase mb-1"
                        style={{
                          fontSize: `${fontSizes.englishTitle}px`,
                          color: palette.accentHex,
                        }}
                      >
                        {activeConfig.englishTitle}
                      </span>
                      <h2
                        className="font-serif-sc font-black tracking-[0.16em] pl-[0.16em] leading-tight"
                        style={{
                          fontSize: `${fontSizes.title}px`,
                          color: palette.titleColor,
                        }}
                      >
                        {activeConfig.title}
                      </h2>
                      <div className="mt-2.5 flex items-center gap-3">
                        <span
                          className="w-8 h-[1px]"
                          style={{ backgroundColor: palette.accentHex }}
                        />
                        <span
                          className="font-serif-sc tracking-[0.22em]"
                          style={{
                            fontSize: `${fontSizes.subtitle}px`,
                            color: palette.subtitleColor,
                          }}
                        >
                          {minimalTagline}
                        </span>
                        <span
                          className="w-8 h-[1px]"
                          style={{ backgroundColor: palette.accentHex }}
                        />
                      </div>
                    </div>
                  </div>
                )}

                {/* ==================== 通用母版 C：黄金分割画廊（左极简文字 + 右拱门静态插画窗） ==================== */}
                {coverStyle === "tpl-3-editorial-split" && (
                  <div
                    className="absolute inset-0 overflow-hidden flex items-center justify-between px-[6.5%]"
                    style={{ background: effectiveUnifiedBgGradient }}
                  >
                    {renderGlobalBackdropTexture()}
                    <div
                      className="absolute inset-[3.2%] pointer-events-none"
                      style={{ border: `1px solid ${palette.borderMain}` }}
                    />

                    <div
                      className={`relative z-20 max-w-[56%] ${
                        brandPosition === "top-left" ? "pt-[6%]" : ""
                      }`}
                    >
                      <div
                        className="font-cinzel tracking-[0.3em] uppercase mb-1.5"
                        style={{
                          fontSize: `${fontSizes.categoryTag}px`,
                          color: palette.accentHex,
                        }}
                      >
                        {activeConfig.categoryTag}
                      </div>
                      <h2
                        className="font-serif-sc font-black tracking-[0.1em] leading-tight"
                        style={{
                          fontSize: `${fontSizes.title}px`,
                          color: palette.titleColor,
                        }}
                      >
                        {activeConfig.title}
                      </h2>
                      <p
                        className="mt-2.5 font-serif-sc tracking-[0.2em]"
                        style={{
                          fontSize: `${fontSizes.subtitle}px`,
                          color: palette.subtitleColor,
                        }}
                      >
                        {minimalTagline}
                      </p>
                      <div
                        className="mt-3 opacity-75"
                        style={{
                          fontSize: `${fontSizes.author}px`,
                          color: palette.titleColor,
                        }}
                      >
                        {activeConfig.author}
                      </div>
                    </div>

                    <div className="relative z-20 w-[34%] h-[78%] flex items-center justify-center">
                      <div
                        className="w-full h-full rounded-t-full flex flex-col items-center justify-between p-4 relative overflow-hidden shadow-2xl"
                        style={{
                          background: palette.bookCoverBg,
                          border: `1.5px solid ${palette.accentHex}`,
                        }}
                      >
                        <div
                          className="absolute inset-2 rounded-t-full pointer-events-none"
                          style={{ border: `1px dashed ${palette.borderMain}` }}
                        />
                        <span
                          className="font-cinzel tracking-[0.24em] mt-2"
                          style={{
                            fontSize: `${fontSizes.topMotto}px`,
                            color: palette.accentHex,
                          }}
                        >
                          {activeConfig.archTopText || "EX LIBRIS"}
                        </span>
                        <div className="my-auto">
                          {renderStaticSymbol("w-20 h-20 sm:w-24 sm:h-24")}
                        </div>
                        <span
                          className="font-cinzel tracking-[0.2em] text-[#fffbeb]/80"
                          style={{ fontSize: `${fontSizes.sideEmblem}px` }}
                        >
                          {activeConfig.archBottomText || "IDOL BOOKLIST"}
                        </span>
                      </div>
                    </div>
                  </div>
                )}

                {/* ==================== 通用母版 D：极简藏书票线框（80% 大留白，超少字） ==================== */}
                {coverStyle === "tpl-4-minimal-frame" && (
                  <div
                    className="absolute inset-0 overflow-hidden flex items-center justify-center"
                    style={{ background: effectiveUnifiedBgGradient }}
                  >
                    {renderGlobalBackdropTexture()}
                    <div
                      className="absolute inset-[4.5%] pointer-events-none"
                      style={{ border: `1.5px solid ${palette.borderMain}` }}
                    />
                    <div
                      className="absolute inset-[5.8%] pointer-events-none"
                      style={{ border: `1px solid ${palette.borderSub}` }}
                    />
                    <div className="absolute opacity-12 pointer-events-none">
                      {renderStaticSymbol("w-64 h-64")}
                    </div>

                    <div className="relative z-20 text-center px-8">
                      <div
                        className="inline-block px-3 py-0.5 rounded-full font-cinzel tracking-[0.28em] mb-2.5"
                        style={{
                          fontSize: `${fontSizes.categoryTag}px`,
                          backgroundColor: palette.tagBg,
                          color: palette.tagText,
                          border: `1px solid ${palette.borderMain}`,
                        }}
                      >
                        {activeConfig.categoryTag}
                      </div>
                      <h2
                        className="font-serif-sc font-black tracking-[0.2em] pl-[0.2em] leading-tight"
                        style={{
                          fontSize: `${fontSizes.title}px`,
                          color: palette.titleColor,
                        }}
                      >
                        {activeConfig.title}
                      </h2>
                      <p
                        className="mt-3 font-serif-sc tracking-[0.28em]"
                        style={{
                          fontSize: `${fontSizes.subtitle}px`,
                          color: palette.subtitleColor,
                        }}
                      >
                        {activeConfig.subtitle}
                        {activeConfig.author ? ` · ${activeConfig.author}` : ""}
                      </p>
                    </div>
                  </div>
                )}

                {/* ==================== 通用母版 E：国风画卷·竖题朱印（宋韵长卷绫边 + 朱砂印章） ==================== */}
                {coverStyle === "tpl-5-chinese-scroll" && (
                  <div
                    className="absolute inset-0 overflow-hidden flex items-center justify-between px-[7%]"
                    style={{ background: effectiveUnifiedBgGradient }}
                  >
                    {renderGlobalBackdropTexture()}
                    <div
                      className="absolute inset-y-0 left-[3.2%] w-2 pointer-events-none"
                      style={{
                        borderLeft: `2px solid ${effectiveAccentColor}`,
                        borderRight: `1px solid ${palette.borderSub}`,
                      }}
                    />
                    <div
                      className="absolute inset-y-0 right-[3.2%] w-2 pointer-events-none"
                      style={{
                        borderLeft: `1px solid ${palette.borderSub}`,
                        borderRight: `2px solid ${effectiveAccentColor}`,
                      }}
                    />

                    <div
                      className={`relative z-20 max-w-[62%] ${
                        brandPosition === "top-left" ? "pt-[7%]" : ""
                      }`}
                    >
                      <div className="flex items-center gap-2 mb-2">
                        <span
                          className="px-2 py-0.5 rounded-sm font-serif-sc font-bold tracking-widest"
                          style={{
                            fontSize: `${fontSizes.categoryTag}px`,
                            backgroundColor: "#991b1b",
                            color: "#fef2f2",
                            border: `1px solid ${effectiveAccentColor}`,
                          }}
                        >
                          {activeConfig.categoryTag}
                        </span>
                      </div>
                      <h2
                        className="font-serif-sc font-black tracking-[0.14em] leading-tight"
                        style={{
                          fontSize: `${fontSizes.title}px`,
                          color: palette.titleColor,
                          textShadow: palette.isLight
                            ? "none"
                            : "0 4px 24px rgba(0,0,0,0.85)",
                        }}
                      >
                        {activeConfig.title}
                      </h2>
                      <p
                        className="mt-2.5 font-serif-sc tracking-[0.18em]"
                        style={{
                          fontSize: `${fontSizes.subtitle}px`,
                          color: palette.subtitleColor,
                        }}
                      >
                        {activeConfig.subtitle}
                      </p>
                      <div
                        className="mt-3 pt-2 flex items-center gap-3 opacity-90"
                        style={{
                          borderTop: `1px solid ${palette.borderMain}`,
                          color: palette.titleColor,
                        }}
                      >
                        <span style={{ fontSize: `${fontSizes.author}px` }}>
                          {activeConfig.author}
                        </span>
                        {activeConfig.quote && (
                          <span
                            className="italic opacity-80 line-clamp-1"
                            style={{ fontSize: `${fontSizes.quote}px` }}
                          >
                            {activeConfig.quote}
                          </span>
                        )}
                      </div>
                    </div>

                    <div className="relative z-20 flex items-center gap-4">
                      {renderRightBookArtwork(effectiveAccentColor, false)}
                      <div className="w-10 py-3 px-1.5 rounded-sm bg-[#881313]/95 border border-[#fca5a5]/60 shadow-lg flex flex-col items-center justify-center text-center">
                        <span className="font-serif-sc font-black text-[11px] leading-tight text-[#fef2f2] tracking-widest">
                          爱豆藏书
                        </span>
                      </div>
                    </div>
                  </div>
                )}

                {/* ==================== 通用母版 F：宽银幕电影·上下黑遮幅（2.35:1 电影海报感） ==================== */}
                {coverStyle === "tpl-6-cinema-widescreen" && (
                  <div
                    className="absolute inset-0 overflow-hidden flex flex-col items-center justify-center px-[8%]"
                    style={{ background: effectiveUnifiedBgGradient }}
                  >
                    {renderGlobalBackdropTexture()}
                    <div className="absolute top-0 inset-x-0 h-[12%] bg-black/80 border-b border-white/15 z-10" />
                    <div className="absolute bottom-0 inset-x-0 h-[14%] bg-black/85 border-t border-white/15 z-10 flex items-center justify-center">
                      <span
                        className="font-serif-sc tracking-[0.25em] text-amber-200/95 italic"
                        style={{ fontSize: `${fontSizes.quote}px` }}
                      >
                        {activeConfig.quote || activeConfig.subtitle}
                      </span>
                    </div>

                    <div className="relative z-20 text-center">
                      <div
                        className="font-cinzel tracking-[0.42em] uppercase mb-2"
                        style={{
                          fontSize: `${fontSizes.englishTitle}px`,
                          color: effectiveAccentColor,
                        }}
                      >
                        {activeConfig.englishTitle}
                      </div>
                      <h2
                        className="font-serif-sc font-black tracking-[0.22em] pl-[0.22em] leading-tight drop-shadow-[0_6px_28px_rgba(0,0,0,0.95)]"
                        style={{
                          fontSize: `${fontSizes.title}px`,
                          color: palette.titleColor,
                        }}
                      >
                        {activeConfig.title}
                      </h2>
                      <p
                        className="mt-2 font-serif-sc tracking-[0.28em]"
                        style={{
                          fontSize: `${fontSizes.subtitle}px`,
                          color: palette.subtitleColor,
                        }}
                      >
                        {activeConfig.subtitle} · {activeConfig.author}
                      </p>
                    </div>
                  </div>
                )}

                {/* ==================== 通用母版 G：戏剧斜切·双极锋芒（115° 几何斜切分割） ==================== */}
                {coverStyle === "tpl-7-split-diagonal" && (
                  <div
                    className="absolute inset-0 overflow-hidden flex items-center justify-between px-[6%]"
                    style={{ background: effectiveUnifiedBgGradient }}
                  >
                    {renderGlobalBackdropTexture()}
                    <svg
                      viewBox="0 0 900 383"
                      className="absolute inset-0 w-full h-full pointer-events-none z-10"
                      preserveAspectRatio="none"
                    >
                      <polygon
                        points="540,0 900,0 900,383 420,383"
                        fill="#000000"
                        fillOpacity="0.38"
                      />
                      <line
                        x1="540"
                        y1="0"
                        x2="420"
                        y2="383"
                        stroke={effectiveAccentColor}
                        strokeWidth="2"
                        strokeOpacity="0.65"
                      />
                      <line
                        x1="552"
                        y1="0"
                        x2="432"
                        y2="383"
                        stroke={effectiveAccentColor}
                        strokeWidth="0.8"
                        strokeDasharray="6 4"
                        strokeOpacity="0.45"
                      />
                    </svg>

                    <div
                      className={`relative z-20 max-w-[56%] ${
                        brandPosition === "top-left" ? "pt-[6%]" : ""
                      }`}
                    >
                      <span
                        className="inline-block px-2.5 py-0.5 rounded font-semibold tracking-wider mb-2"
                        style={{
                          fontSize: `${fontSizes.categoryTag}px`,
                          backgroundColor: palette.tagBg,
                          color: palette.tagText,
                          border: `1px solid ${effectiveAccentColor}`,
                        }}
                      >
                        {activeConfig.categoryTag}
                      </span>
                      <h2
                        className="font-serif-sc font-black tracking-[0.08em] leading-tight"
                        style={{
                          fontSize: `${fontSizes.title}px`,
                          color: palette.titleColor,
                        }}
                      >
                        {activeConfig.title}
                      </h2>
                      <p
                        className="mt-2 font-serif-sc tracking-wider"
                        style={{
                          fontSize: `${fontSizes.subtitle}px`,
                          color: palette.subtitleColor,
                        }}
                      >
                        {activeConfig.subtitle}
                      </p>
                      <div
                        className="mt-3 text-xs opacity-85"
                        style={{
                          fontSize: `${fontSizes.author}px`,
                          color: palette.titleColor,
                        }}
                      >
                        {activeConfig.author}
                      </div>
                    </div>

                    <div className="relative z-20 w-[34%] h-full flex items-center justify-center">
                      {renderRightBookArtwork(effectiveAccentColor, true)}
                    </div>
                  </div>
                )}

                {/* ==================== 风格二：极简黑金 · 长爪巨剑破冰火（超少文案） ==================== */}
                {coverStyle === "style-2-minimal-sword" && (
                  <div
                    className="absolute inset-0 overflow-hidden flex items-center justify-center"
                    style={{ background: effectiveUnifiedBgGradient }}
                  >
                    {renderGlobalBackdropTexture()}
                    <div
                      className="absolute inset-0"
                      style={{
                        background:
                          "radial-gradient(circle at 22% 55%, rgba(14, 116, 144, 0.24) 0%, transparent 55%), radial-gradient(circle at 78% 45%, rgba(180, 83, 9, 0.24) 0%, transparent 55%)",
                      }}
                    />
                    <div className="absolute inset-[4%] border border-[#e5a93c]/25 pointer-events-none" />
                    {resolvedCenter !== "none" && (
                      <svg
                        viewBox="0 0 600 383"
                        className="absolute inset-0 w-full h-full pointer-events-none"
                        fill="none"
                      >
                        <defs>
                          <linearGradient
                            id="minimalBlade"
                            x1="0%"
                            y1="0%"
                            x2="0%"
                            y2="100%"
                          >
                            <stop offset="0%" stopColor="#ffffff" />
                            <stop offset="50%" stopColor="#fde68a" />
                            <stop offset="100%" stopColor="#78350f" />
                          </linearGradient>
                          <linearGradient
                            id="splitHorizon"
                            x1="0%"
                            y1="0%"
                            x2="100%"
                            y2="0%"
                          >
                            <stop offset="0%" stopColor="transparent" />
                            <stop
                              offset="25%"
                              stopColor="#38bdf8"
                              stopOpacity="0.6"
                            />
                            <stop
                              offset="50%"
                              stopColor="#fef3c7"
                              stopOpacity="0.95"
                            />
                            <stop
                              offset="75%"
                              stopColor="#f97316"
                              stopOpacity="0.6"
                            />
                            <stop offset="100%" stopColor="transparent" />
                          </linearGradient>
                        </defs>
                        <line
                          x1="60"
                          y1="192"
                          x2="540"
                          y2="192"
                          stroke="url(#splitHorizon)"
                          strokeWidth="1"
                        />
                        <circle
                          cx="300"
                          cy="192"
                          r="118"
                          stroke="#e5a93c"
                          strokeOpacity="0.22"
                          strokeWidth="1"
                        />
                        <circle
                          cx="300"
                          cy="192"
                          r="96"
                          stroke="#e5a93c"
                          strokeOpacity="0.4"
                          strokeWidth="1"
                          strokeDasharray="3 5"
                        />
                        <path
                          d="M190 192 C190 132, 238 84, 300 84"
                          stroke="#38bdf8"
                          strokeOpacity="0.55"
                          strokeWidth="1.5"
                        />
                        <path
                          d="M410 192 C410 252, 362 300, 300 300"
                          stroke="#f97316"
                          strokeOpacity="0.55"
                          strokeWidth="1.5"
                        />
                        <circle
                          cx="300"
                          cy="36"
                          r="7"
                          fill="#fef3c7"
                          stroke="#b45309"
                          strokeWidth="1.5"
                        />
                        <rect
                          x="297.5"
                          y="43"
                          width="5"
                          height="28"
                          rx="2"
                          fill="#d97706"
                        />
                        <path
                          d="M262 72 L338 72 L328 79 L272 79 Z"
                          fill="#e5a93c"
                        />
                        <path
                          d="M300 79 L306 342 L300 362 L294 342 Z"
                          fill="url(#minimalBlade)"
                          opacity="0.9"
                        />
                        <line
                          x1="300"
                          y1="82"
                          x2="300"
                          y2="345"
                          stroke="#ffffff"
                          strokeWidth="0.9"
                          opacity="0.85"
                        />
                        <path
                          d="M342 132 L346 141 L356 139 L349 146 L353 156 L342 150 L331 156 L335 146 L328 139 L338 141 Z"
                          fill="#dc2626"
                        />
                      </svg>
                    )}
                    <div className="relative z-20 text-center px-6 py-4 rounded-2xl bg-[#06080d]/85 border border-[#e5a93c]/25 shadow-[0_12px_40px_rgba(0,0,0,0.85)]">
                      <div
                        className="font-cinzel tracking-[0.38em] text-[#e5a93c] uppercase mb-1.5"
                        style={{ fontSize: `${fontSizes.englishTitle}px` }}
                      >
                        {activeConfig.englishTitle}
                      </div>
                      <h2
                        className="font-serif-sc font-black tracking-[0.22em] text-[#fdf8ee] pl-[0.22em] leading-tight drop-shadow-[0_4px_20px_rgba(0,0,0,0.95)]"
                        style={{ fontSize: `${fontSizes.title}px` }}
                      >
                        {activeConfig.title}
                      </h2>
                      <div
                        className="mt-2.5 flex items-center justify-center gap-3 font-serif-sc tracking-[0.28em] text-amber-200/90"
                        style={{ fontSize: `${fontSizes.subtitle}px` }}
                      >
                        <span className="w-6 h-[1px] bg-sky-400/70" />
                        <span>{minimalTagline}</span>
                        <span className="w-6 h-[1px] bg-orange-400/70" />
                      </div>
                    </div>
                  </div>
                )}

                {/* ==================== 风格三：维斯特洛羊皮卷 · 冰狼与火龙对称纹章版画（少字） ==================== */}
                {coverStyle === "style-3-woodcut-heraldry" && (
                  <div
                    className="absolute inset-0 overflow-hidden flex items-center justify-center"
                    style={{ background: effectiveUnifiedBgGradient }}
                  >
                    {renderGlobalBackdropTexture()}
                    <div
                      className="absolute inset-0"
                      style={{
                        background: `radial-gradient(ellipse at center, ${effectiveLeftTint} 0%, rgba(12,10,8,0.85) 75%, ${effectiveRightTint} 100%)`,
                      }}
                    />
                    <div className="absolute inset-[3.8%] border-2 border-[#d4af37]/45 pointer-events-none" />
                    <div className="absolute inset-[4.8%] border border-[#d4af37]/20 pointer-events-none" />
                    <div className="absolute inset-0 z-10 flex items-center justify-center px-[8%]">
                      {resolvedSide !== "none" && (
                        <div className="flex flex-col items-center gap-2 opacity-90 mr-auto">
                          <div className="w-24 h-24 sm:w-32 sm:h-32 rounded-full border-2 border-sky-300/50 bg-[#0b1520]/90 flex items-center justify-center shadow-[0_0_35px_rgba(56,189,248,0.2)]">
                            <svg
                              viewBox="0 0 120 120"
                              className="w-16 h-16 sm:w-22 sm:h-22"
                            >
                              <circle
                                cx="60"
                                cy="60"
                                r="52"
                                fill="none"
                                stroke="#7dd3fc"
                                strokeWidth="1"
                                strokeDasharray="3 3"
                              />
                              <path
                                d="M28 92 L40 58 L28 46 L48 36 L46 18 L64 30 L82 20 L78 38 L98 44 L82 60 L94 70 L72 76 L64 96 Z"
                                fill="#bae6fd"
                              />
                              <circle cx="68" cy="44" r="2.2" fill="#090d16" />
                            </svg>
                          </div>
                          <span
                            className="font-cinzel tracking-[0.25em] text-sky-300/80"
                            style={{ fontSize: `${fontSizes.sideEmblem}px` }}
                          >
                            {activeConfig.shieldLeftText || "HOUSE STARK"}
                          </span>
                        </div>
                      )}

                      <div className="text-center px-4 z-20">
                        <div
                          className="inline-flex items-center gap-2 px-3 py-0.5 rounded-full border border-[#d4af37]/40 bg-[#d4af37]/10 font-cinzel tracking-[0.22em] text-[#f3d28c] mb-2"
                          style={{ fontSize: `${fontSizes.englishTitle}px` }}
                        >
                          {activeConfig.englishTitle}
                        </div>
                        <h2
                          className="font-serif-sc font-black tracking-[0.16em] text-[#fdf6e7] pl-[0.16em] leading-tight drop-shadow-[0_4px_16px_rgba(0,0,0,0.9)]"
                          style={{ fontSize: `${fontSizes.title}px` }}
                        >
                          {activeConfig.title}
                        </h2>
                        <div className="w-24 h-[1px] bg-gradient-to-r from-transparent via-[#d4af37] to-transparent mx-auto my-2.5" />
                        <p
                          className="font-serif-sc tracking-[0.3em] text-[#d4af37]"
                          style={{ fontSize: `${fontSizes.subtitle}px` }}
                        >
                          {activeConfig.subtitle}
                        </p>
                      </div>

                      {resolvedSide !== "none" && (
                        <div className="flex flex-col items-center gap-2 opacity-90 ml-auto">
                          <div className="w-24 h-24 sm:w-32 sm:h-32 rounded-full border-2 border-amber-400/50 bg-[#240d0b]/90 flex items-center justify-center shadow-[0_0_35px_rgba(249,115,22,0.22)]">
                            <svg
                              viewBox="0 0 120 120"
                              className="w-16 h-16 sm:w-22 sm:h-22"
                            >
                              <circle
                                cx="60"
                                cy="60"
                                r="52"
                                fill="none"
                                stroke="#fb923c"
                                strokeWidth="1"
                                strokeDasharray="3 3"
                              />
                              <path
                                d="M92 24 C70 30, 54 44, 46 62 L32 48 L20 54 L34 66 C26 80, 32 94, 48 100 C46 84, 56 74, 70 68 L62 88 L82 74 C92 84, 100 90, 104 94 C96 76, 94 58, 102 44 L82 50 L92 24 Z"
                                fill="#fb923c"
                              />
                              <circle cx="44" cy="54" r="2" fill="#fde047" />
                            </svg>
                          </div>
                          <span
                            className="font-cinzel tracking-[0.25em] text-amber-400/80"
                            style={{ fontSize: `${fontSizes.sideEmblem}px` }}
                          >
                            {activeConfig.shieldRightText || "TARGARYEN"}
                          </span>
                        </div>
                      )}
                    </div>
                  </div>
                )}

                {/* ==================== 风格四：血色彗星 · 铁王座孤影电影海报（大留白） ==================== */}
                {coverStyle === "style-4-red-comet-throne" && (
                  <div
                    className="absolute inset-0 overflow-hidden flex items-center justify-between px-[7%]"
                    style={{ background: effectiveUnifiedBgGradient }}
                  >
                    {renderGlobalBackdropTexture()}
                    <div
                      className="absolute inset-0"
                      style={{
                        background:
                          "radial-gradient(circle at 72% 62%, rgba(220, 38, 38, 0.35) 0%, rgba(217, 119, 6, 0.15) 38%, #050608 75%)",
                      }}
                    />
                    <svg
                      viewBox="0 0 800 340"
                      className="absolute inset-0 w-full h-full pointer-events-none"
                      fill="none"
                    >
                      <defs>
                        <linearGradient
                          id="cometTail"
                          x1="0%"
                          y1="0%"
                          x2="100%"
                          y2="0%"
                        >
                          <stop
                            offset="0%"
                            stopColor="#ef4444"
                            stopOpacity="0"
                          />
                          <stop
                            offset="70%"
                            stopColor="#ef4444"
                            stopOpacity="0.65"
                          />
                          <stop
                            offset="100%"
                            stopColor="#fef08a"
                            stopOpacity="1"
                          />
                        </linearGradient>
                      </defs>
                      <path
                        d="M80 120 Q 340 82, 620 54"
                        stroke="url(#cometTail)"
                        strokeWidth="3"
                        strokeLinecap="round"
                      />
                      <circle cx="620" cy="54" r="4.5" fill="#fef08a" />
                      <circle
                        cx="620"
                        cy="54"
                        r="12"
                        fill="#ef4444"
                        fillOpacity="0.4"
                      />
                    </svg>

                    <div className="relative z-20 max-w-[54%] pt-6">
                      <div
                        className="font-cinzel tracking-[0.35em] text-red-400 font-semibold mb-2"
                        style={{ fontSize: `${fontSizes.englishTitle}px` }}
                      >
                        {activeConfig.englishTitle}
                      </div>
                      <h2
                        className="font-serif-sc font-black tracking-[0.14em] text-white leading-tight drop-shadow-[0_6px_30px_rgba(0,0,0,0.95)]"
                        style={{ fontSize: `${fontSizes.title}px` }}
                      >
                        {activeConfig.title}
                      </h2>
                      <p
                        className="mt-3 font-serif-sc tracking-[0.25em] text-amber-300/90"
                        style={{ fontSize: `${fontSizes.subtitle}px` }}
                      >
                        {activeConfig.subtitle}
                      </p>
                    </div>

                    <div className="relative z-10 w-[42%] h-full flex items-end justify-center">
                      {resolvedCenter !== "none" && (
                        <svg
                          viewBox="0 0 320 300"
                          className="w-full h-[94%]"
                          fill="none"
                        >
                          <circle
                            cx="160"
                            cy="175"
                            r="105"
                            fill="#dc2626"
                            fillOpacity="0.18"
                          />
                          <g
                            stroke="#f59e0b"
                            strokeOpacity="0.55"
                            strokeWidth="1.2"
                          >
                            <line x1="160" y1="180" x2="160" y2="18" />
                            <line x1="160" y1="180" x2="118" y2="28" />
                            <line x1="160" y1="180" x2="202" y2="28" />
                            <line x1="160" y1="180" x2="82" y2="54" />
                            <line x1="160" y1="180" x2="238" y2="54" />
                            <line x1="160" y1="180" x2="58" y2="95" />
                            <line x1="160" y1="180" x2="262" y2="95" />
                          </g>
                          <path
                            d="M95 295 L112 195 L92 172 L120 162 L106 105 L130 122 L124 62 L145 96 L146 32 L160 78 L174 32 L175 96 L196 62 L190 122 L214 105 L200 162 L228 172 L208 195 L225 295 Z"
                            fill="#090a0f"
                            stroke="#fbbf24"
                            strokeWidth="1.2"
                          />
                          <path
                            d="M60 300 L88 262 L232 262 L260 300 Z"
                            fill="#050608"
                            stroke="#f59e0b"
                            strokeOpacity="0.5"
                          />
                        </svg>
                      )}
                    </div>
                  </div>
                )}

                {/* ==================== 风格五：北境白雪 · 鱼梁木心树与三眼乌鸦（东方留白） ==================== */}
                {coverStyle === "style-5-weirwood-snow" && (
                  <div
                    className="absolute inset-0 overflow-hidden flex items-center justify-between px-[7.5%]"
                    style={{ background: effectiveUnifiedBgGradient }}
                  >
                    {renderGlobalBackdropTexture()}
                    <div
                      className="absolute inset-0"
                      style={{
                        background: `linear-gradient(125deg, ${effectiveLeftTint} 0%, rgba(16,24,38,0.82) 52%, ${effectiveRightTint} 100%)`,
                      }}
                    />
                    <svg
                      viewBox="0 0 900 383"
                      className="absolute inset-0 w-full h-full pointer-events-none"
                      preserveAspectRatio="none"
                    >
                      <path
                        d="M0 383 L0 295 Q 180 260, 380 310 T 900 275 L900 383 Z"
                        fill="#070c14"
                        opacity="0.85"
                      />
                      <circle
                        cx="160"
                        cy="88"
                        r="1.5"
                        fill="#e0f2fe"
                        opacity="0.6"
                      />
                      <circle
                        cx="280"
                        cy="140"
                        r="2"
                        fill="#e0f2fe"
                        opacity="0.45"
                      />
                      <circle
                        cx="420"
                        cy="68"
                        r="1.5"
                        fill="#e0f2fe"
                        opacity="0.7"
                      />
                      <circle
                        cx="520"
                        cy="210"
                        r="1.8"
                        fill="#fca5a5"
                        opacity="0.7"
                      />
                    </svg>

                    <div className="relative z-20 max-w-[52%] pt-6">
                      <span
                        className="inline-block px-2.5 py-0.5 rounded-full bg-red-500/20 border border-red-400/40 text-red-200 tracking-[0.2em] mb-2"
                        style={{ fontSize: `${fontSizes.categoryTag}px` }}
                      >
                        {activeConfig.categoryTag}
                      </span>
                      <h2
                        className="font-serif-sc font-black tracking-[0.16em] text-[#f8fafc] leading-tight drop-shadow-[0_4px_20px_rgba(0,0,0,0.8)]"
                        style={{ fontSize: `${fontSizes.title}px` }}
                      >
                        {activeConfig.title}
                      </h2>
                      <p
                        className="mt-2.5 font-serif-sc tracking-[0.28em] text-sky-200/85"
                        style={{ fontSize: `${fontSizes.subtitle}px` }}
                      >
                        {activeConfig.subtitle}
                      </p>
                    </div>

                    <div className="relative z-20 w-[44%] h-full flex items-end justify-center">
                      {resolvedCenter !== "none" && (
                        <svg
                          viewBox="0 0 320 280"
                          className="w-full h-[94%]"
                          fill="none"
                        >
                          <circle
                            cx="175"
                            cy="125"
                            r="78"
                            fill="#e0f2fe"
                            fillOpacity="0.1"
                          />
                          <circle
                            cx="175"
                            cy="105"
                            r="64"
                            fill="#991b1b"
                            fillOpacity="0.55"
                          />
                          <circle
                            cx="125"
                            cy="122"
                            r="46"
                            fill="#dc2626"
                            fillOpacity="0.65"
                          />
                          <circle
                            cx="222"
                            cy="118"
                            r="48"
                            fill="#b91c1c"
                            fillOpacity="0.65"
                          />
                          <circle
                            cx="155"
                            cy="78"
                            r="42"
                            fill="#ef4444"
                            fillOpacity="0.6"
                          />
                          <circle
                            cx="198"
                            cy="84"
                            r="38"
                            fill="#dc2626"
                            fillOpacity="0.7"
                          />
                          <path
                            d="M142 275 C154 235, 160 195, 160 155 L118 118 M160 165 L138 102 M175 155 L215 112 M172 145 L188 92 M188 275 C178 235, 174 195, 174 155"
                            stroke="#f1f5f9"
                            strokeWidth="7"
                            strokeLinecap="round"
                          />
                          <path
                            d="M150 275 L162 152 L176 152 L186 275 Z"
                            fill="#f8fafc"
                          />
                          <circle cx="163" cy="205" r="2" fill="#dc2626" />
                          <circle cx="173" cy="205" r="2" fill="#dc2626" />
                          <path
                            d="M163 207 L163 220 M173 207 L173 220"
                            stroke="#dc2626"
                            strokeWidth="1.2"
                          />
                          <path
                            d="M164 222 Q168 218 172 222"
                            stroke="#991b1b"
                            strokeWidth="1.5"
                          />
                          <path
                            d="M72 68 C58 54, 42 52, 30 58 C42 62, 52 68, 62 74 L54 84 L68 78 L72 88 L76 78 L90 84 L82 74 C92 68, 102 62, 114 58 C102 52, 86 54, 72 68 Z"
                            fill="#090d16"
                            stroke="#fca5a5"
                            strokeWidth="0.8"
                          />
                          <circle cx="72" cy="64" r="1.6" fill="#ef4444" />
                        </svg>
                      )}
                    </div>
                  </div>
                )}

                {/* ==================== 风格一：完整保留之前的暗黑史诗全元素版 ==================== */}
                {coverStyle === "style-1-epic-original" && (
                  <div className="absolute inset-0 overflow-hidden">
                    <div
                      className="absolute inset-0"
                      style={{
                        background: `linear-gradient(108deg, ${effectiveLeftTint} 0%, rgba(10, 14, 23, 0.92) 48%, ${effectiveRightTint} 100%)`,
                      }}
                    />
                    {renderGlobalBackdropTexture()}
                    <div className="absolute -left-16 -bottom-16 w-80 h-80 rounded-full bg-sky-400/20 blur-3xl pointer-events-none" />
                    <div className="absolute -right-12 -top-16 w-80 h-80 rounded-full bg-orange-500/25 blur-3xl pointer-events-none" />
                    <div className="absolute right-[22%] bottom-[-15%] w-64 h-64 rounded-full bg-amber-500/20 blur-2xl pointer-events-none" />
                    <div className="absolute top-[13%] right-[6%] w-44 h-[2px] bg-gradient-to-r from-transparent via-red-500 to-amber-200 rotate-[-12deg] opacity-85 pointer-events-none" />

                    <svg
                      className="absolute right-[6%] top-1/2 -translate-y-1/2 w-[44%] h-[115%] opacity-20 pointer-events-none"
                      viewBox="0 0 400 400"
                      fill="none"
                    >
                      <circle
                        cx="200"
                        cy="200"
                        r="175"
                        stroke={activeConfig.accentColor}
                        strokeWidth="1"
                        strokeDasharray="6 6"
                      />
                      <circle
                        cx="200"
                        cy="200"
                        r="142"
                        stroke={activeConfig.accentColor}
                        strokeWidth="1.5"
                      />
                      <circle
                        cx="200"
                        cy="200"
                        r="105"
                        stroke={activeConfig.accentColor}
                        strokeWidth="0.75"
                      />
                      <path
                        d="M200 10 L200 390 M10 200 L390 200 M65 65 L335 335 M335 65 L65 335"
                        stroke={activeConfig.accentColor}
                        strokeWidth="0.6"
                      />
                    </svg>

                    <div className="absolute inset-[3.2%] border border-[#e5a93c]/25 rounded-lg pointer-events-none" />

                    {novelElements.handOfTheKing && (
                      <div className="absolute top-[6.8%] right-[35%] hidden md:flex items-center gap-2 z-20 px-3 py-1 rounded-full bg-[#070a0f]/85 border border-amber-400/35">
                        <span
                          className="font-cinzel tracking-[0.16em] text-sky-300 font-semibold"
                          style={{ fontSize: `${fontSizes.topMotto}px` }}
                        >
                          {activeConfig.topMottoLeft || "WINTER IS COMING"}
                        </span>
                        <span className="text-amber-400 text-[10px]">⚔</span>
                        <span
                          className="font-cinzel tracking-[0.16em] text-orange-300 font-semibold"
                          style={{ fontSize: `${fontSizes.topMotto}px` }}
                        >
                          {activeConfig.topMottoRight || "FIRE AND BLOOD"}
                        </span>
                      </div>
                    )}

                    <div className="absolute inset-0 z-20 flex items-center justify-between px-[5.5%]">
                      <div
                        className={`flex flex-col max-w-[60%] ${
                          brandPosition === "top-left" ? "pt-[7%]" : ""
                        }`}
                      >
                        <div className="flex items-center gap-2.5 mb-1.5">
                          {novelElements.handOfTheKing && (
                            <span
                              className="inline-flex items-center gap-1 px-2 py-0.5 rounded bg-amber-500/25 border border-amber-400/60 text-amber-200 font-serif-sc font-bold shadow"
                              style={{ fontSize: `${fontSizes.badgeLabel}px` }}
                            >
                              {activeConfig.badgeLabel || "国王之手·典藏精读"}
                            </span>
                          )}
                          <span
                            className="px-2 py-0.5 font-medium tracking-widest uppercase rounded bg-gradient-to-r from-sky-500/25 via-amber-500/20 to-rose-500/25 border border-amber-400/40 text-amber-200"
                            style={{ fontSize: `${fontSizes.categoryTag}px` }}
                          >
                            {activeConfig.categoryTag}
                          </span>
                        </div>
                        <div className="relative inline-flex items-center">
                          <h2
                            className="font-serif-sc font-black tracking-[0.06em] leading-[1.12] text-[#fff6e0] drop-shadow-[0_4px_24px_rgba(0,0,0,0.9)]"
                            style={{ fontSize: `${fontSizes.title}px` }}
                          >
                            {activeConfig.title}
                          </h2>
                        </div>
                        <p
                          className="mt-2 font-serif-sc font-medium text-amber-100/95 tracking-wider drop-shadow"
                          style={{ fontSize: `${fontSizes.subtitle}px` }}
                        >
                          {activeConfig.subtitle}
                        </p>
                        <div className="mt-3 pt-2.5 border-t border-white/15 flex flex-wrap items-center gap-x-4 gap-y-1 text-slate-300/90">
                          <span
                            className="text-amber-300/95 font-medium"
                            style={{ fontSize: `${fontSizes.author}px` }}
                          >
                            {activeConfig.author}
                          </span>
                          <span className="text-slate-500">·</span>
                          <span
                            className="italic text-slate-200/85 line-clamp-1"
                            style={{ fontSize: `${fontSizes.quote}px` }}
                          >
                            {activeConfig.quote}
                          </span>
                        </div>
                      </div>

                      <div className="relative flex items-center justify-center w-[32%] h-full">
                        <div className="absolute w-36 h-36 sm:w-48 sm:h-48 rounded-full bg-gradient-to-tr from-sky-500/25 via-transparent to-orange-500/35 blur-md border border-amber-300/30" />
                        {renderRightBookArtwork(effectiveAccentColor, true)}
                      </div>
                    </div>
                  </div>
                )}

                {/* 右下角极简固定角标 */}
                <div className="absolute bottom-[6%] right-[4.2%] z-20 flex items-center gap-1.5 text-[9px] font-cinzel tracking-[0.22em] text-amber-200/70">
                  <span>IDOL BOOKLIST</span>
                </div>

                {/* 可选：安全网格参考层 */}
                {includeGuides && showSafeZone && (
                  <div
                    data-export-ignore="true"
                    className="absolute inset-0 z-40 pointer-events-none border-2 border-dashed border-emerald-400/60"
                  >
                    <div className="absolute top-[6.5%] left-[4.2%] right-[4.2%] bottom-[6.5%] border border-emerald-400/40 bg-emerald-500/5 flex items-start justify-end p-2">
                      <span className="text-[10px] bg-emerald-950/90 text-emerald-300 px-2 py-0.5 rounded border border-emerald-500/40">
                        四周安全边距 & 品牌固定锚点区
                      </span>
                    </div>
                  </div>
                )}

                {/* 可选：微信转发卡片 1:1 居中裁切预览线 */}
                {includeGuides && showCenterCrop && (
                  <div
                    data-export-ignore="true"
                    className="absolute inset-0 z-40 pointer-events-none flex items-center justify-center"
                  >
                    <div
                      style={{ aspectRatio: "1 / 1" }}
                      className="h-full border-x-2 border-dashed border-sky-400 bg-sky-500/10 flex items-end justify-center pb-2"
                    >
                      <span className="text-[10px] bg-sky-950/90 text-sky-300 px-2 py-0.5 rounded border border-sky-400/40">
                        1:1 分享卡片居中区
                      </span>
                    </div>
                  </div>
                )}
              </>
            )

            return (
              <>
                <div className="relative w-full rounded-2xl p-3 sm:p-5 bg-gradient-to-b from-white/[0.06] to-white/[0.02] border border-white/10 shadow-2xl">
                  <div
                    ref={mainCanvasRef}
                    id="wechat-cover-canvas"
                    style={{ aspectRatio: "2.35 / 1" }}
                    className="relative w-full overflow-hidden rounded-xl bg-[#070a0f] select-none shadow-[0_25px_70px_rgba(0,0,0,0.85)] border border-white/15"
                  >
                    {renderCoverScene(true)}
                  </div>
                </div>

                {/* ==================== 微信公众号真实订阅号消息流模拟预览（100% 实时镜像上方画布） ==================== */}
                <div className="bg-[#121620] border border-white/10 rounded-2xl p-5">
                  <div className="flex items-center justify-between mb-3">
                    <h3 className="text-sm font-semibold text-white flex items-center gap-2">
                      <span className="w-2 h-2 rounded-full bg-emerald-400" />
                      微信公众号消息卡片真实渲染效果（与上方主画布 100%
                      实时同步镜像）
                    </h3>
                    <span className="text-xs text-emerald-400">
                      所见即所得 · 零偏差
                    </span>
                  </div>

                  <div className="max-w-md mx-auto bg-[#1b1e26] rounded-xl overflow-hidden border border-white/10 shadow-xl">
                    {/* 公众号头部信息 */}
                    <div className="px-3.5 py-2.5 flex items-center justify-between border-b border-white/5">
                      <div className="flex items-center gap-2">
                        <div className="w-6 h-6 rounded-full bg-gradient-to-br from-amber-400 to-amber-600 text-slate-950 font-serif-sc font-black text-xs flex items-center justify-center">
                          爱
                        </div>
                        <span className="text-xs font-medium text-slate-200">
                          爱豆书单
                        </span>
                      </div>
                      <span className="text-[11px] text-slate-500">刚刚</span>
                    </div>

                    {/* 100% 同源渲染并精确等比缩放到微信卡片宽度的 2.35:1 封面 */}
                    <div
                      ref={previewWrapperRef}
                      style={{ aspectRatio: "2.35 / 1" }}
                      className="relative w-full overflow-hidden bg-[#070a0f]"
                    >
                      <div
                        style={{
                          width: `${baseCanvasWidth}px`,
                          height: `${baseCanvasWidth / 2.35}px`,
                          transform: `scale(${previewScale})`,
                          transformOrigin: "top left",
                        }}
                        className="relative overflow-hidden pointer-events-none select-none"
                      >
                        {renderCoverScene(false)}
                      </div>
                    </div>

                    {/* 公众号文章标题栏 */}
                    <div className="p-3.5 bg-[#20242e]">
                      <h4 className="text-sm font-medium text-white leading-snug">
                        深度共读《{activeConfig.title}》：
                        {activeConfig.subtitle} | 爱豆书单
                      </h4>
                      <p className="text-xs text-slate-400 mt-1 line-clamp-1">
                        {activeConfig.quote}
                      </p>
                    </div>
                  </div>
                </div>
              </>
            )
          })()}

          {/* ==================== 渲染图下方：当前模板专属文案定制 & 固定品牌「爱豆书单」设置 ==================== */}
          <div className="grid grid-cols-1 xl:grid-cols-12 gap-5 items-start">
            {/* 1. 品牌视觉锤固定设计规范卡片 */}
            <div className="xl:col-span-5 bg-[#121620] border border-amber-500/30 rounded-2xl p-5 shadow-lg flex flex-col gap-4">
              <div className="flex items-center justify-between mb-3">
                <span className="text-xs font-bold uppercase tracking-wider text-amber-400">
                  FIXED BRAND SYSTEM
                </span>
                <span className="text-[11px] px-2 py-0.5 rounded bg-amber-500/15 text-amber-300">
                  可跨期复用组件
                </span>
              </div>
              <h2 className="font-serif-sc font-bold text-base text-white mb-1">
                「爱豆书单」固定品牌位设置
              </h2>
              <p className="text-xs text-slate-400 leading-relaxed mb-4">
                采用胶囊式徽章结构（星芒书卷图标 + 「爱豆书单」衬线主字 + IDOL
                BOOKLIST
                英文副标），无期数干扰，永久通用，无论底图是深色还是浅色都清晰醒目。
              </p>

              {/* 品牌固定位置切换 */}
              <div className="mb-4">
                <label className="block text-xs font-medium text-slate-300 mb-2">
                  固定锚点位置（建议长期锁定左上角）：
                </label>
                <div className="grid grid-cols-3 gap-2">
                  {([
                    { id: "top-left", label: "左上角 (推荐)" },
                    { id: "top-right", label: "右上角" },
                    { id: "bottom-left", label: "左下角" },
                  ] as const).map((pos) => (
                    <button
                      key={pos.id}
                      onClick={() => setBrandPosition(pos.id)}
                      className={`py-2 px-2 rounded-lg text-xs font-medium border transition-all cursor-pointer ${
                        brandPosition === pos.id
                          ? "bg-amber-500/20 border-amber-400 text-amber-200 font-bold"
                          : "bg-white/5 border-white/10 text-slate-400 hover:text-slate-200"
                      }`}
                    >
                      {pos.label}
                    </button>
                  ))}
                </div>
              </div>

              {/* 品牌配色皮肤切换 */}
              <div>
                <label className="block text-xs font-medium text-slate-300 mb-2">
                  品牌徽章配色方案：
                </label>
                <div className="grid grid-cols-3 gap-2">
                  {([
                    { id: "gold-dark", label: "黑金典藏" },
                    { id: "ivory-crimson", label: "羊皮火漆" },
                    { id: "frosted-glass", label: "冰晶毛玻璃" },
                  ] as const).map((t) => (
                    <button
                      key={t.id}
                      onClick={() => setBrandTheme(t.id)}
                      className={`py-2 px-2 rounded-lg text-xs font-medium border transition-all cursor-pointer ${
                        brandTheme === t.id
                          ? "bg-amber-500/20 border-amber-400 text-amber-200 font-bold"
                          : "bg-white/5 border-white/10 text-slate-400 hover:text-slate-200"
                      }`}
                    >
                      {t.label}
                    </button>
                  ))}
                </div>
              </div>
            </div>

            {/* 2. 当前模板专属文案 & 字号实时编辑器（不同模板显示各自对应的文案编辑项，独立保存） */}
            <div className="xl:col-span-7 bg-[#121620] border border-white/10 rounded-2xl p-5 flex flex-col gap-3.5">
              <div className="flex items-center justify-between gap-2">
                <div>
                  <h3 className="font-serif-sc font-bold text-sm text-white">
                    当前模板专属文案 & 字号编辑
                  </h3>
                  <p className="text-[11px] text-amber-300/90 mt-0.5">
                    正在编辑：
                    {STYLE_OPTIONS.find((s) => s.id === coverStyle)?.name}
                  </p>
                </div>
                <button
                  onClick={resetCurrentTemplateCopy}
                  className="text-xs text-amber-400 hover:text-amber-300 cursor-pointer shrink-0"
                >
                  重置本模板
                </button>
              </div>

              {/* 1. 主书名标题（所有模板通用必有） */}
              <div>
                <div className="flex items-center justify-between mb-1">
                  <label className="text-[11px] text-slate-300 font-medium">
                    主书名标题
                  </label>
                  <span className="text-[10px] text-amber-300/90 font-mono">
                    字号: {fontSizes.title}px
                  </span>
                </div>
                <div className="flex items-center gap-2">
                  <input
                    type="text"
                    value={activeConfig.title}
                    onChange={(e) => updateField("title", e.target.value)}
                    className="flex-1 bg-[#090b10] border border-white/15 rounded-lg px-3 py-1.5 text-xs text-white focus:border-amber-400 focus:outline-none"
                  />
                  <div className="flex items-center bg-[#090b10] border border-white/15 rounded-lg px-2 py-1 shrink-0">
                    <input
                      type="number"
                      min={20}
                      max={110}
                      value={fontSizes.title}
                      onChange={(e) =>
                        updateFontSize("title", Number(e.target.value))
                      }
                      className="w-10 bg-transparent text-xs text-amber-300 font-mono text-center focus:outline-none"
                    />
                    <span className="text-[10px] text-slate-500">px</span>
                  </div>
                </div>
              </div>

              {/* 2. 副标题 / 核心短句（所有模板均实时生效） */}
              <div>
                <div className="flex items-center justify-between mb-1">
                  <label className="text-[11px] text-slate-300 font-medium">
                    {coverStyle === "style-1-epic-original" ||
                    coverStyle === "tpl-1-magazine-book" ||
                    coverStyle === "tpl-3-editorial-split"
                      ? "副标题 / 导读看点"
                      : "核心短句 / 箴言副标"}
                  </label>
                  <span className="text-[10px] text-amber-300/90 font-mono">
                    字号: {fontSizes.subtitle}px
                  </span>
                </div>
                <div className="flex items-center gap-2">
                  <input
                    type="text"
                    value={activeConfig.subtitle}
                    onChange={(e) => updateField("subtitle", e.target.value)}
                    className="flex-1 bg-[#090b10] border border-white/15 rounded-lg px-3 py-1.5 text-xs text-white focus:border-amber-400 focus:outline-none"
                  />
                  <div className="flex items-center bg-[#090b10] border border-white/15 rounded-lg px-2 py-1 shrink-0">
                    <input
                      type="number"
                      min={10}
                      max={48}
                      value={fontSizes.subtitle}
                      onChange={(e) =>
                        updateFontSize("subtitle", Number(e.target.value))
                      }
                      className="w-10 bg-transparent text-xs text-amber-300 font-mono text-center focus:outline-none"
                    />
                    <span className="text-[10px] text-slate-500">px</span>
                  </div>
                </div>
              </div>

              {/* 3. 分类标签 / 意境胶囊（适用于：母版A、母版C、母版D、风格一、风格五） */}
              {(coverStyle === "tpl-1-magazine-book" ||
                coverStyle === "tpl-3-editorial-split" ||
                coverStyle === "tpl-4-minimal-frame" ||
                coverStyle === "style-1-epic-original" ||
                coverStyle === "style-5-weirwood-snow") && (
                <div>
                  <div className="flex items-center justify-between mb-1">
                    <label className="text-[11px] text-slate-400">
                      {coverStyle === "style-5-weirwood-snow"
                        ? "顶部意境胶囊标签"
                        : "分类标签"}
                    </label>
                    <span className="text-[10px] text-amber-300/90 font-mono">
                      字号: {fontSizes.categoryTag}px
                    </span>
                  </div>
                  <div className="flex items-center gap-2">
                    <input
                      type="text"
                      value={activeConfig.categoryTag}
                      onChange={(e) =>
                        updateField("categoryTag", e.target.value)
                      }
                      className="flex-1 bg-[#090b10] border border-white/15 rounded-lg px-3 py-1.5 text-xs text-white focus:border-amber-400 focus:outline-none"
                    />
                    <div className="flex items-center bg-[#090b10] border border-white/15 rounded-lg px-2 py-1 shrink-0">
                      <input
                        type="number"
                        min={8}
                        max={40}
                        value={fontSizes.categoryTag}
                        onChange={(e) =>
                          updateFontSize("categoryTag", Number(e.target.value))
                        }
                        className="w-10 bg-transparent text-xs text-amber-300 font-mono text-center focus:outline-none"
                      />
                      <span className="text-[10px] text-slate-500">px</span>
                    </div>
                  </div>
                </div>
              )}

              {/* 4. 英文副标 / 顶部西文铭文（适用于：母版A、母版B、风格二、风格三、风格四） */}
              {(coverStyle === "tpl-1-magazine-book" ||
                coverStyle === "tpl-2-center-emblem" ||
                coverStyle === "style-2-minimal-sword" ||
                coverStyle === "style-3-woodcut-heraldry" ||
                coverStyle === "style-4-red-comet-throne") && (
                <div>
                  <div className="flex items-center justify-between mb-1">
                    <label className="text-[11px] text-slate-400">
                      {coverStyle === "style-3-woodcut-heraldry"
                        ? "顶部胶囊铭文"
                        : coverStyle === "style-4-red-comet-throne"
                          ? "顶部赤红铭文"
                          : "英文副标 / 顶部西文"}
                    </label>
                    <span className="text-[10px] text-amber-300/90 font-mono">
                      字号: {fontSizes.englishTitle}px
                    </span>
                  </div>
                  <div className="flex items-center gap-2">
                    <input
                      type="text"
                      value={activeConfig.englishTitle}
                      onChange={(e) =>
                        updateField("englishTitle", e.target.value)
                      }
                      className="flex-1 bg-[#090b10] border border-white/15 rounded-lg px-3 py-1.5 text-xs text-white focus:border-amber-400 focus:outline-none"
                    />
                    <div className="flex items-center bg-[#090b10] border border-white/15 rounded-lg px-2 py-1 shrink-0">
                      <input
                        type="number"
                        min={8}
                        max={32}
                        value={fontSizes.englishTitle}
                        onChange={(e) =>
                          updateFontSize("englishTitle", Number(e.target.value))
                        }
                        className="w-10 bg-transparent text-xs text-amber-300 font-mono text-center focus:outline-none"
                      />
                      <span className="text-[10px] text-slate-500">px</span>
                    </div>
                  </div>
                </div>
              )}

              {/* 5. 作者信息（适用于：母版A、母版C、母版D、风格一） */}
              {(coverStyle === "tpl-1-magazine-book" ||
                coverStyle === "tpl-3-editorial-split" ||
                coverStyle === "tpl-4-minimal-frame" ||
                coverStyle === "style-1-epic-original") && (
                <div>
                  <div className="flex items-center justify-between mb-1">
                    <label className="text-[11px] text-slate-400">
                      作者信息
                    </label>
                    <span className="text-[10px] text-amber-300/90 font-mono">
                      字号: {fontSizes.author}px
                    </span>
                  </div>
                  <div className="flex items-center gap-2">
                    <input
                      type="text"
                      value={activeConfig.author}
                      onChange={(e) => updateField("author", e.target.value)}
                      className="flex-1 bg-[#090b10] border border-white/15 rounded-lg px-3 py-1.5 text-xs text-white focus:border-amber-400 focus:outline-none"
                    />
                    <div className="flex items-center bg-[#090b10] border border-white/15 rounded-lg px-2 py-1 shrink-0">
                      <input
                        type="number"
                        min={8}
                        max={36}
                        value={fontSizes.author}
                        onChange={(e) =>
                          updateFontSize("author", Number(e.target.value))
                        }
                        className="w-10 bg-transparent text-xs text-amber-300 font-mono text-center focus:outline-none"
                      />
                      <span className="text-[10px] text-slate-500">px</span>
                    </div>
                  </div>
                </div>
              )}

              {/* 6. 书中金句引言（适用于：母版A、风格一） */}
              {(coverStyle === "tpl-1-magazine-book" ||
                coverStyle === "style-1-epic-original") && (
                <div>
                  <div className="flex items-center justify-between mb-1">
                    <label className="text-[11px] text-slate-400">
                      书中金句引言
                    </label>
                    <span className="text-[10px] text-amber-300/90 font-mono">
                      字号: {fontSizes.quote}px
                    </span>
                  </div>
                  <div className="flex items-center gap-2">
                    <input
                      type="text"
                      value={activeConfig.quote}
                      onChange={(e) => updateField("quote", e.target.value)}
                      className="flex-1 bg-[#090b10] border border-white/15 rounded-lg px-3 py-1.5 text-xs text-white focus:border-amber-400 focus:outline-none"
                    />
                    <div className="flex items-center bg-[#090b10] border border-white/15 rounded-lg px-2 py-1 shrink-0">
                      <input
                        type="number"
                        min={8}
                        max={32}
                        value={fontSizes.quote}
                        onChange={(e) =>
                          updateFontSize("quote", Number(e.target.value))
                        }
                        className="w-10 bg-transparent text-xs text-amber-300 font-mono text-center focus:outline-none"
                      />
                      <span className="text-[10px] text-slate-500">px</span>
                    </div>
                  </div>
                </div>
              )}

              {/* 7. 风格一专属：荣誉徽章标签 & 顶部双箴言 */}
              {coverStyle === "style-1-epic-original" && (
                <>
                  <div>
                    <div className="flex items-center justify-between mb-1">
                      <label className="text-[11px] text-amber-300/90">
                        金色荣誉徽章标签
                      </label>
                      <span className="text-[10px] text-amber-300/90 font-mono">
                        字号: {fontSizes.badgeLabel}px
                      </span>
                    </div>
                    <div className="flex items-center gap-2">
                      <input
                        type="text"
                        value={activeConfig.badgeLabel || ""}
                        onChange={(e) =>
                          updateField("badgeLabel", e.target.value)
                        }
                        className="flex-1 bg-[#090b10] border border-white/15 rounded-lg px-3 py-1.5 text-xs text-white focus:border-amber-400 focus:outline-none"
                      />
                      <div className="flex items-center bg-[#090b10] border border-white/15 rounded-lg px-2 py-1 shrink-0">
                        <input
                          type="number"
                          min={8}
                          max={28}
                          value={fontSizes.badgeLabel}
                          onChange={(e) =>
                            updateFontSize("badgeLabel", Number(e.target.value))
                          }
                          className="w-10 bg-transparent text-xs text-amber-300 font-mono text-center focus:outline-none"
                        />
                        <span className="text-[10px] text-slate-500">px</span>
                      </div>
                    </div>
                  </div>

                  <div>
                    <div className="flex items-center justify-between mb-1">
                      <label className="text-[11px] text-amber-300/90">
                        顶部双箴言铭文（左 / 右）
                      </label>
                      <span className="text-[10px] text-amber-300/90 font-mono">
                        字号: {fontSizes.topMotto}px
                      </span>
                    </div>
                    <div className="flex items-center gap-2">
                      <input
                        type="text"
                        value={activeConfig.topMottoLeft || ""}
                        onChange={(e) =>
                          updateField("topMottoLeft", e.target.value)
                        }
                        className="w-1/2 bg-[#090b10] border border-white/15 rounded-lg px-2.5 py-1.5 text-xs text-white focus:border-amber-400 focus:outline-none"
                      />
                      <input
                        type="text"
                        value={activeConfig.topMottoRight || ""}
                        onChange={(e) =>
                          updateField("topMottoRight", e.target.value)
                        }
                        className="w-1/2 bg-[#090b10] border border-white/15 rounded-lg px-2.5 py-1.5 text-xs text-white focus:border-amber-400 focus:outline-none"
                      />
                      <div className="flex items-center bg-[#090b10] border border-white/15 rounded-lg px-2 py-1 shrink-0">
                        <input
                          type="number"
                          min={7}
                          max={24}
                          value={fontSizes.topMotto}
                          onChange={(e) =>
                            updateFontSize("topMotto", Number(e.target.value))
                          }
                          className="w-9 bg-transparent text-xs text-amber-300 font-mono text-center focus:outline-none"
                        />
                        <span className="text-[10px] text-slate-500">px</span>
                      </div>
                    </div>
                  </div>
                </>
              )}

              {/* 8. 风格三专属：左右圆盾纹章铭文 */}
              {coverStyle === "style-3-woodcut-heraldry" && (
                <div>
                  <div className="flex items-center justify-between mb-1">
                    <label className="text-[11px] text-amber-300/90">
                      左右圆盾下方铭文
                    </label>
                    <span className="text-[10px] text-amber-300/90 font-mono">
                      字号: {fontSizes.sideEmblem}px
                    </span>
                  </div>
                  <div className="flex items-center gap-2">
                    <input
                      type="text"
                      value={activeConfig.shieldLeftText || ""}
                      onChange={(e) =>
                        updateField("shieldLeftText", e.target.value)
                      }
                      className="w-1/2 bg-[#090b10] border border-white/15 rounded-lg px-2.5 py-1.5 text-xs text-white focus:border-amber-400 focus:outline-none"
                    />
                    <input
                      type="text"
                      value={activeConfig.shieldRightText || ""}
                      onChange={(e) =>
                        updateField("shieldRightText", e.target.value)
                      }
                      className="w-1/2 bg-[#090b10] border border-white/15 rounded-lg px-2.5 py-1.5 text-xs text-white focus:border-amber-400 focus:outline-none"
                    />
                    <div className="flex items-center bg-[#090b10] border border-white/15 rounded-lg px-2 py-1 shrink-0">
                      <input
                        type="number"
                        min={7}
                        max={24}
                        value={fontSizes.sideEmblem}
                        onChange={(e) =>
                          updateFontSize("sideEmblem", Number(e.target.value))
                        }
                        className="w-9 bg-transparent text-xs text-amber-300 font-mono text-center focus:outline-none"
                      />
                      <span className="text-[10px] text-slate-500">px</span>
                    </div>
                  </div>
                </div>
              )}

              {/* 9. 通用母版C专属：右侧拱门画框上下铭文 */}
              {coverStyle === "tpl-3-editorial-split" && (
                <div>
                  <div className="flex items-center justify-between mb-1">
                    <label className="text-[11px] text-amber-300/90">
                      右侧拱门画框上/下铭文
                    </label>
                    <span className="text-[10px] text-amber-300/90 font-mono">
                      字号: {fontSizes.sideEmblem}px
                    </span>
                  </div>
                  <div className="flex items-center gap-2">
                    <input
                      type="text"
                      value={activeConfig.archTopText || ""}
                      onChange={(e) =>
                        updateField("archTopText", e.target.value)
                      }
                      className="w-1/2 bg-[#090b10] border border-white/15 rounded-lg px-2.5 py-1.5 text-xs text-white focus:border-amber-400 focus:outline-none"
                    />
                    <input
                      type="text"
                      value={activeConfig.archBottomText || ""}
                      onChange={(e) =>
                        updateField("archBottomText", e.target.value)
                      }
                      className="w-1/2 bg-[#090b10] border border-white/15 rounded-lg px-2.5 py-1.5 text-xs text-white focus:border-amber-400 focus:outline-none"
                    />
                    <div className="flex items-center bg-[#090b10] border border-white/15 rounded-lg px-2 py-1 shrink-0">
                      <input
                        type="number"
                        min={7}
                        max={24}
                        value={fontSizes.sideEmblem}
                        onChange={(e) =>
                          updateFontSize("sideEmblem", Number(e.target.value))
                        }
                        className="w-9 bg-transparent text-xs text-amber-300 font-mono text-center focus:outline-none"
                      />
                      <span className="text-[10px] text-slate-500">px</span>
                    </div>
                  </div>
                </div>
              )}
            </div>

            {/* 3. 设计亮点说明 */}
            <div className="xl:col-span-12 bg-[#121620]/70 border border-white/10 rounded-2xl p-4 text-xs text-slate-300 space-y-2">
              <div className="font-semibold text-amber-300">
                设计拆解与复用指南：
              </div>
              <p className="text-slate-400 leading-relaxed">
                1. <strong className="text-slate-200">冰与火双极视觉：</strong>
                左侧北境寒冰冷蓝（凛冬将至）与右侧龙焰暗红鎏金交汇，配合精装烫金立体书模与瓦雷利亚钢剑星盘。
              </p>
              <p className="text-slate-400 leading-relaxed">
                2.{" "}
                <strong className="text-slate-200">
                  「爱豆书单」固定视觉锤：
                </strong>
                锁定在左上角安全区内（距顶 6.5%、距左
                4.2%），带独立背板与期数标签，后续做任何新书只需替换主图与书名即可保持品牌统一。
              </p>
            </div>
          </div>
        </div>
      </main>
    </div>
  )
}
export type BackgroundTemplateId = "bg-digital-lab" | "bg-botanical" | "bg-ocean-route" | "bg-paper-studio" | "bg-book-default" | "bg-wall-street-brick" | "bg-ice-fire-epic" | "bg-rainy-eaves" | "bg-imperial-sunset" | "bg-awakening-mind" | "bg-vintage-parchment" | "bg-cosmic-nebula" | "bg-bianjing-scroll" | "bg-cyber-matrix" | "bg-nordic-mist" | "bg-renaissance-oil"

export interface BackgroundTemplateConfig {
  id: BackgroundTemplateId
  name: string
  desc: string
  swatchLeft: string
  swatchRight: string
  bgImage: string
  leftTint: string
  rightTint: string
  accentColor: string
  patternType?: "brick-wall" | "grid-ledger" | "none"
}

export const BACKGROUND_TEMPLATES: BackgroundTemplateConfig[] = [
  {
    id: "bg-paper-studio",
    name: "留白纸间",
    desc: "纸感留白，适合生活与随笔 · 无需外部图片",
    swatchLeft: "#ece7d8",
    swatchRight: "#d5c5a7",
    bgImage: "",
    leftTint: "#ece7d8",
    rightTint: "#d5c5a7",
    accentColor: "#665443",
  },
  {
    id: "bg-ocean-route",
    name: "深海航线",
    desc: "冷蓝海域，适合旅行与探索 · 无需外部图片",
    swatchLeft: "#092b45",
    swatchRight: "#164d62",
    bgImage: "",
    leftTint: "#092b45",
    rightTint: "#164d62",
    accentColor: "#67d7d5",
  },
  {
    id: "bg-botanical",
    name: "植物档案",
    desc: "森林绿调，适合自然与生态 · 无需外部图片",
    swatchLeft: "#102c23",
    swatchRight: "#355846",
    bgImage: "",
    leftTint: "#102c23",
    rightTint: "#355846",
    accentColor: "#b4d39a",
  },
  {
    id: "bg-digital-lab",
    name: "数字实验室",
    desc: "青绿暗调，适合科技与创新 · 无需外部图片",
    swatchLeft: "#0b1720",
    swatchRight: "#253a20",
    bgImage: "",
    leftTint: "#0b1720",
    rightTint: "#253a20",
    accentColor: "#b8ed62",
  },
  {
    id: "bg-book-default",
    name: "00. 跟随当前书籍原配背景",
    desc: "自动使用当前所选书籍的专属色调与底图",
    swatchLeft: "#1e293b",
    swatchRight: "#d97706",
    bgImage: "",
    leftTint: "",
    rightTint: "",
    accentColor: "#e5a93c",
  },
  {
    id: "bg-wall-street-brick",
    name: "01. 华尔街高墙·煤气灯暗格",
    desc: "深灰蓝砖墙肌理 × 煤气灯昏黄微光（巴托比/社科/存在主义）",
    swatchLeft: "#111827",
    swatchRight: "#78350f",
    bgImage:
      "https://images.unsplash.com/photo-1600181982553-ce7d36051c01?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxhbmNpZW50JTIwbGlicmFyeSUyMGJvb2tzJTIwdmludGFnZSUyMGRhcmt8ZW58MXx8fHwxNzkzMTY0NDIwfDA&ixlib=rb-4.1.0&q=80&w=1080",
    leftTint: "rgba(15, 23, 34, 0.95)",
    rightTint: "rgba(68, 42, 22, 0.91)",
    accentColor: "#eab308",
    patternType: "brick-wall",
  },
  {
    id: "bg-ice-fire-epic",
    name: "02. 冰火苍穹·雪山古堡",
    desc: "北境寒冰冷蓝 × 龙焰熔金暗红（奇幻/史诗/巨著）",
    swatchLeft: "#082f49",
    swatchRight: "#7f1d1d",
    bgImage:
      "https://images.unsplash.com/photo-1534237266271-1b42933ee8fd?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwyfHxkYXJrJTIwZ290aGljJTIwY2FzdGxlJTIwc25vdyUyMG1vdW50YWluJTIwZmlyZXxlbnwxfHx8fDE3OTMxNjQ0MTl8MA&ixlib=rb-4.1.0&q=80&w=1080",
    leftTint: "rgba(8, 28, 52, 0.92)",
    rightTint: "rgba(115, 18, 14, 0.88)",
    accentColor: "#e5a93c",
  },
  {
    id: "bg-rainy-eaves",
    name: "03. 烟雨青瓦·暖橘灯火",
    desc: "黔南烟雨青黛 × 老屋窗棂暖橘（散文/故乡/文学治愈）",
    swatchLeft: "#0c2536",
    swatchRight: "#7c2d12",
    bgImage:
      "https://images.unsplash.com/photo-1534237266271-1b42933ee8fd?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwyfHxkYXJrJTIwZ290aGljJTIwY2FzdGxlJTIwc25vdyUyMG1vdW50YWluJTIwZmlyZXxlbnwxfHx8fDE3OTMxNjQ0MTl8MA&ixlib=rb-4.1.0&q=80&w=1080",
    leftTint: "rgba(12, 34, 46, 0.93)",
    rightTint: "rgba(92, 45, 16, 0.88)",
    accentColor: "#f59e0b",
  },
  {
    id: "bg-imperial-sunset",
    name: "04. 紫禁暮色·朱红泥金",
    desc: "苍青冷铁 × 故宫朱红泥金（历史/政经/传记深读）",
    swatchLeft: "#121c24",
    swatchRight: "#701610",
    bgImage:
      "https://images.unsplash.com/photo-1549696504-d2aec6b214f2?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxkYXJrJTIwZ290aGljJTIwY2FzdGxlJTIwc25vdyUyMG1vdW50YWluJTIwZmlyZXxlbnwxfHx8fDE3OTMxNjQ0MTl8MA&ixlib=rb-4.1.0&q=80&w=1080",
    leftTint: "rgba(18, 28, 36, 0.94)",
    rightTint: "rgba(112, 22, 16, 0.90)",
    accentColor: "#eab308",
  },
  {
    id: "bg-awakening-mind",
    name: "05. 潜意识深海·觉醒琥珀",
    desc: "深海神经蓝 × 觉醒琥珀金（心理/认知/个人成长）",
    swatchLeft: "#0a1a36",
    swatchRight: "#783e0c",
    bgImage:
      "https://images.unsplash.com/photo-1534237266271-1b42933ee8fd?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwyfHxkYXJrJTIwZ290aGljJTIwY2FzdGxlJTIwc25vdyUyMG1vdW50YWluJTIwZmlyZXxlbnwxfHx8fDE3OTMxNjQ0MTl8MA&ixlib=rb-4.1.0&q=80&w=1080",
    leftTint: "rgba(10, 26, 54, 0.93)",
    rightTint: "rgba(120, 62, 12, 0.88)",
    accentColor: "#f59e0b",
  },
  {
    id: "bg-vintage-parchment",
    name: "06. 19世纪古籍·羊皮手稿",
    desc: "古典暗棕书房 × 账本横线暗纹（世界名著/哲学/档案）",
    swatchLeft: "#1c1917",
    swatchRight: "#5c3612",
    bgImage:
      "https://images.unsplash.com/photo-1600181982553-ce7d36051c01?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxhbmNpZW50JTIwbGlicmFyeSUyMGJvb2tzJTIwdmludGFnZSUyMGRhcmt8ZW58MXx8fHwxNzkzMTY0NDIwfDA&ixlib=rb-4.1.0&q=80&w=1080",
    leftTint: "rgba(26, 22, 18, 0.94)",
    rightTint: "rgba(82, 48, 20, 0.90)",
    accentColor: "#d4af37",
    patternType: "grid-ledger",
  },
  {
    id: "bg-cosmic-nebula",
    name: "07. 深空星云·冷冽苍穹",
    desc: "午夜深空靛蓝 × 星际暗紫（科幻/推理/硬核科普）",
    swatchLeft: "#0a1630",
    swatchRight: "#31144a",
    bgImage:
      "https://images.unsplash.com/photo-1549696504-d2aec6b214f2?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxkYXJrJTIwZ290aGljJTIwY2FzdGxlJTIwc25vdyUyMG1vdW50YWluJTIwZmlyZXxlbnwxfHx8fDE3OTMxNjQ0MTl8MA&ixlib=rb-4.1.0&q=80&w=1080",
    leftTint: "rgba(10, 22, 48, 0.92)",
    rightTint: "rgba(49, 20, 74, 0.88)",
    accentColor: "#38bdf8",
  },
  {
    id: "bg-bianjing-scroll",
    name: "08. 汴京古绢·清明墨韵",
    desc: "北宋古画绢本暖褐 × 汴河青绿（清明上河图密码/国风历史）",
    swatchLeft: "#08242a",
    swatchRight: "#6e340e",
    bgImage:
      "https://images.unsplash.com/photo-1549696504-d2aec6b214f2?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxkYXJrJTIwZ290aGljJTIwY2FzdGxlJTIwc25vdyUyMG1vdW50YWluJTIwZmlyZXxlbnwxfHx8fDE3OTMxNjQ0MTl8MA&ixlib=rb-4.1.0&q=80&w=1080",
    leftTint: "rgba(8, 36, 42, 0.94)",
    rightTint: "rgba(110, 52, 14, 0.90)",
    accentColor: "#eab308",
    patternType: "grid-ledger",
  },
  {
    id: "bg-cyber-matrix",
    name: "09. 赛博霓虹·未来矩阵",
    desc: "暗夜黑曜 × 青紫数据光网（科幻/悬疑推理/前沿科技）",
    swatchLeft: "#090d16",
    swatchRight: "#4c1d95",
    bgImage:
      "https://images.unsplash.com/photo-1534237266271-1b42933ee8fd?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwyfHxkYXJrJTIwZ290aGljJTIwY2FzdGxlJTIwc25vdyUyMG1vdW50YWluJTIwZmlyZXxlbnwxfHx8fDE3OTMxNjQ0MTl8MA&ixlib=rb-4.1.0&q=80&w=1080",
    leftTint: "rgba(9, 13, 22, 0.95)",
    rightTint: "rgba(76, 29, 149, 0.88)",
    accentColor: "#2dd4bf",
    patternType: "brick-wall",
  },
  {
    id: "bg-nordic-mist",
    name: "10. 北欧极夜·冷杉迷雾",
    desc: "冰川冷灰 × 极光森林绿（北欧悬疑/心理/自然文学）",
    swatchLeft: "#0f172a",
    swatchRight: "#064e3b",
    bgImage:
      "https://images.unsplash.com/photo-1534237266271-1b42933ee8fd?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwyfHxkYXJrJTIwZ290aGljJTIwY2FzdGxlJTIwc25vdyUyMG1vdW50YWluJTIwZmlyZXxlbnwxfHx8fDE3OTMxNjQ0MTl8MA&ixlib=rb-4.1.0&q=80&w=1080",
    leftTint: "rgba(15, 23, 42, 0.94)",
    rightTint: "rgba(6, 78, 59, 0.88)",
    accentColor: "#34d399",
  },
  {
    id: "bg-renaissance-oil",
    name: "11. 文艺复兴·古典油画",
    desc: "佛罗伦萨暗金 × 威尼斯深红（艺术史/哲学/世界名著）",
    swatchLeft: "#27170e",
    swatchRight: "#6b1414",
    bgImage:
      "https://images.unsplash.com/photo-1600181982553-ce7d36051c01?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxhbmNpZW50JTIwbGlicmFyeSUyMGJvb2tzJTIwdmludGFnZSUyMGRhcmt8ZW58MXx8fHwxNzkzMTY0NDIwfDA&ixlib=rb-4.1.0&q=80&w=1080",
    leftTint: "rgba(39, 23, 14, 0.94)",
    rightTint: "rgba(107, 20, 20, 0.90)",
    accentColor: "#fbbf24",
  },
]

export type CenterElementId = "orbital-planet" | "botanical-sprout" | "mountain-sun" | "auto-book" | "none" | "bianjing-rainbow-bridge" | "bartleby-wall-window" | "iron-throne" | "brain-pyramid" | "imperial-palace" | "hometown-eaves" | "astro-compass" | "longclaw-eclipse" | "weirwood-heart-tree" | "babel-library" | "hourglass-time" | "lighthouse-beacon" | "scales-justice" | "forbidden-scroll-seal" | "sherlock-magnifying-maze" | "phoenix-nirvana-sun"

export type SideElementId = "olive-branches" | "travel-stamps" | "circuit-nodes" | "auto-book" | "none" | "bianjing-fanlou-scroll" | "bartleby-scrolls-quill" | "wolf-dragon" | "brain-wings" | "famine-seal" | "train-plum" | "heraldic-shields" | "sun-moon-pillars" | "bamboo-plum-ink" | "chess-royals" | "masks-curtain" | "dna-circuit" | "sword-shield-duel" | "abacus-coin-scale" | "piano-violin-symphony"

export type SkyElementId = "paper-planes" | "floating-bubbles" | "meteor-trails" | "auto-book" | "none" | "song-cranes-clouds" | "bartleby-dead-letters" | "spring-swallows" | "raven-leaves" | "meta-eye" | "macartney-ship" | "red-comet-arc" | "macondo-butterflies" | "three-body-suns" | "sky-lanterns" | "constellation-astrolabe" | "music-notes-feather" | "detective-cipher-code" | "aurora-borealis" | "falling-ginkgo-leaves"

export type BottomElementId = "city-skyline" | "terraced-fields" | "desert-camp" | "auto-book" | "none" | "bianhe-river-boats" | "bartleby-wallstreet" | "ice-wall" | "iceberg-curve" | "great-wall" | "karst-hills" | "ocean-storm-waves" | "greek-colonnade" | "silk-road-dunes" | "lotus-water-ripples" | "pine-forest-deer" | "labyrinth-maze-floor" | "ancient-bookshelf-wall" | "misty-bamboo-bridge"
