export type BackgroundTemplateId =
  | "bg-digital-lab"
  | "bg-botanical"
  | "bg-ocean-route"
  | "bg-paper-studio"
  | "bg-book-default"
  | "bg-wall-street-brick"
  | "bg-ice-fire-epic"
  | "bg-rainy-eaves"
  | "bg-imperial-sunset"
  | "bg-awakening-mind"
  | "bg-vintage-parchment"
  | "bg-cosmic-nebula"
  | "bg-bianjing-scroll"
  | "bg-cyber-matrix"
  | "bg-nordic-mist"
  | "bg-renaissance-oil";

export interface BackgroundTemplateConfig {
  id: BackgroundTemplateId;
  name: string;
  desc: string;
  swatchLeft: string;
  swatchRight: string;
  bgImage: string;
  leftTint: string;
  rightTint: string;
  accentColor: string;
  patternType?: "brick-wall" | "grid-ledger" | "none";
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
    bgImage: "",
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
    bgImage: "",
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
    bgImage: "",
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
    bgImage: "",
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
    bgImage: "",
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
    bgImage: "",
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
    bgImage: "",
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
    bgImage: "",
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
    bgImage: "",
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
    bgImage: "",
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
    bgImage: "",
    leftTint: "rgba(39, 23, 14, 0.94)",
    rightTint: "rgba(107, 20, 20, 0.90)",
    accentColor: "#fbbf24",
  },
];
