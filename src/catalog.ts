import { COLOR_PALETTES } from "./paletteLibrary";
export const FAMILIES = [
  {
    id: "minimal",
    name: "轻盈浅色",
    en: "LIGHT & AIRY",
    desc: "留白、柔和色彩与清晰的阅读节奏",
    color: "#e8eee5",
  },
  {
    id: "song",
    name: "宋韵东方",
    en: "SONG DYNASTY",
    desc: "绢纸、山水、竖排与东方留白",
    color: "#e5e4d4",
  },
  {
    id: "tech",
    name: "未来科技",
    en: "FUTURE LAB",
    desc: "网格、数据坐标与几何秩序",
    color: "#dbe7ee",
  },
  {
    id: "editorial",
    name: "独立杂志",
    en: "THE EDITORIAL",
    desc: "大字、分栏与鲜明的编辑感",
    color: "#eadfd4",
  },
  {
    id: "literary",
    name: "文学书房",
    en: "READING ROOM",
    desc: "衬线字体、藏书与温暖的阅读氛围",
    color: "#e4dce4",
  },
  {
    id: "poster",
    name: "艺术海报",
    en: "ART & FORM",
    desc: "大胆构成、色块与抽象图形",
    color: "#e9dfcf",
  },
] as const;
export type Family = (typeof FAMILIES)[number]["id"];
export type Palette = {
  id: string;
  name: string;
  bg: string;
  ink: string;
  accent: string;
  muted: string;
  family: Family;
};
const newColors: [string, string, string, string, Family][] = [
  ["雾白鼠尾草", "#f1f3eb", "#253e33", "#61795a", "minimal"],
  ["奶油杏桃", "#fff2df", "#4e3429", "#b55f3a", "minimal"],
  ["燕麦蓝灰", "#eeece5", "#303f4a", "#637b8c", "minimal"],
  ["柠檬午后", "#faf7dc", "#3d4227", "#778039", "minimal"],
  ["海盐浅蓝", "#eaf4f6", "#203f51", "#397c96", "minimal"],
  ["樱粉来信", "#f8e9e9", "#633e48", "#a65b6b", "minimal"],
  ["汝窑天青", "#dce8df", "#294740", "#657862", "song"],
  ["绢本赭石", "#eee4ce", "#493c2d", "#a65d3b", "song"],
  ["雨过天青", "#e4ece8", "#254c4b", "#4d827c", "song"],
  ["月白朱砂", "#f6f1e7", "#37372f", "#aa3f32", "song"],
  ["青绿山水", "#e4e8d5", "#30443b", "#7c773c", "song"],
  ["墨色松风", "#1d302c", "#eee9d8", "#c5b17c", "song"],
  ["量子冰蓝", "#0c192c", "#e4f5ff", "#76d4f3", "tech"],
  ["终端荧绿", "#111d1a", "#e9ffeb", "#a2ed79", "tech"],
  ["银白实验室", "#edf1f4", "#293949", "#496bf1", "tech"],
  ["数字紫罗兰", "#201c39", "#f2efff", "#b9a5ff", "tech"],
  ["日落电波", "#28213b", "#fff2e9", "#ffab82", "tech"],
  ["极地青电", "#092c32", "#e4fffc", "#6ce6ce", "tech"],
  ["报刊红黑", "#f4eee3", "#292827", "#bd3f2d", "editorial"],
  ["钴蓝专栏", "#efeee8", "#203a7e", "#3054b0", "editorial"],
  ["墨绿特刊", "#e8e8dc", "#273d32", "#a95c3b", "editorial"],
  ["焦糖书页", "#e8d9c3", "#493c30", "#8e592e", "literary"],
  ["暮色诗集", "#342c38", "#f5e7e1", "#d8a59c", "literary"],
  ["复古橙蓝", "#f3e3c9", "#244763", "#d96938", "poster"],
];
export const PALETTES: Palette[] = [
  ...newColors.map(([name, bg, ink, accent, family], i) => ({
    id: `new-${i}`,
    name,
    bg,
    ink,
    accent,
    muted: ink + "aa",
    family,
  })),
  ...Object.values(COLOR_PALETTES).map((p) => ({
    id: p.id,
    name: p.name.replace(/^\d+\. /, ""),
    bg: p.canvasBg,
    ink: p.titleColor,
    accent: p.accentHex,
    muted: p.subtitleColor,
    family: (p.isLight ? "minimal" : "literary") as Family,
  })),
];
const names: Record<Family, string[]> = {
  minimal: ["呼吸留白", "小字序言", "日常侧记", "温柔居中", "一页书签"],
  song: ["宋刊竖题", "山水长卷", "朱印题签", "对开笺纸", "月下小窗"],
  tech: ["终端坐标", "数据分屏", "轨道核心", "代码序列", "未来视窗"],
  editorial: ["杂志封面", "编辑专栏", "大字宣言", "双栏叙事", "档案目录"],
  literary: ["书房夜读", "扉页题记", "经典装帧", "诗歌留白", "读书札记"],
  poster: ["几何拼贴", "色块分割", "圆形剧场", "倾斜构成", "展览标签"],
};
export const LAYOUTS = FAMILIES.flatMap((f) =>
  names[f.id].map((name, variant) => ({
    id: `${f.id}-${variant}`,
    family: f.id,
    name,
    variant,
  })),
);
export type Pattern =
  | "plain"
  | "paper"
  | "grid"
  | "dots"
  | "waves"
  | "sun"
  | "arch"
  | "lines"
  | "mountains";
export const BACKGROUNDS = FAMILIES.flatMap((f, group) =>
  ["素色留白", "细纹纸感", "经纬网格", "微光点阵", "水波流线", "半日光影"].map(
    (name, i) => ({
      id: `bg-${group}-${i}`,
      family: f.id,
      name: `${["清晨", "绢本", "数码", "印刷", "书页", "画布"][group]}·${name}`,
      pattern: (["plain", "paper", "grid", "dots", "waves", "sun"] as const)[i],
      tint: i === 5 ? "warm" : i === 4 ? "cool" : "neutral",
    }),
  ),
);
export type Motif = {
  id: string;
  name: string;
  category: "center" | "side" | "sky" | "bottom";
  family: Family;
  shape: number;
};
const motifNames = {
  center: [
    "行星轨道",
    "嫩芽标本",
    "群山旭日",
    "圆月山窗",
    "宋瓷花瓶",
    "折扇清风",
    "芯片核心",
    "量子环",
    "开放书卷",
    "沙漏时光",
    "几何圆环",
    "螺旋阶梯",
    "荷花一枝",
    "古琴清音",
    "茶盏烟气",
    "竹简长卷",
    "智能网络",
    "实验烧瓶",
    "城市之眼",
    "航海罗盘",
    "雕塑拱门",
    "唱片回声",
    "灯塔远光",
    "日食光轮",
  ],
  side: [
    "橄榄枝",
    "银杏对叶",
    "竹影双枝",
    "梅花疏影",
    "卷轴题签",
    "对称云纹",
    "电路节点",
    "信号天线",
    "书脊陈列",
    "羽毛钢笔",
    "几何括号",
    "胶片边框",
    "松枝入画",
    "双鹤相望",
    "庭院花窗",
    "双鱼游弋",
    "数据接口",
    "光纤通路",
    "旅行邮戳",
    "山形屏风",
    "剧院帷幕",
    "棋盘双子",
    "藤蔓花边",
    "双翼徽章",
  ],
  sky: [
    "纸飞机",
    "漂浮气泡",
    "流星轨迹",
    "弯月疏星",
    "飞鹤过云",
    "宋云舒卷",
    "星座连接",
    "数据光点",
    "浮动字母",
    "飞鸟书页",
    "几何碎片",
    "细线光芒",
    "飘落银杏",
    "春日燕子",
    "孔明灯",
    "花瓣微雨",
    "卫星航迹",
    "二进制雨",
    "蝴蝶轻舞",
    "雪花缓落",
    "声波起伏",
    "太阳光芒",
    "虹光弧线",
    "星芒十字",
  ],
  bottom: [
    "城市天际",
    "梯田曲线",
    "沙丘露营",
    "远山层叠",
    "荷塘水纹",
    "江上扁舟",
    "数字地平线",
    "等距立方",
    "藏书长廊",
    "石阶小径",
    "几何波浪",
    "棋盘地面",
    "松林山谷",
    "竹桥流水",
    "亭台楼阁",
    "田野麦穗",
    "电路基座",
    "数据柱阵",
    "海浪潮汐",
    "公路远行",
    "古典柱廊",
    "岩石海岸",
    "地形等高线",
    "湖畔芦苇",
  ],
} as const;
export const MOTIFS: Motif[] = Object.entries(motifNames).flatMap(
  ([category, names]) =>
    names.map((name, i) => ({
      id: `${category}-${i}`,
      name,
      category: category as Motif["category"],
      family: FAMILIES[Math.floor(i / 4) % 6].id,
      shape: i,
    })),
);
export interface Design {
  title: string;
  subtitle: string;
  eyebrow: string;
  author: string;
  brand: string;
  issue: string;
  family: Family;
  layout: string;
  palette: string;
  background: string;
  elements: string[];
  titleSize: number;
  tracking: number;
  artOpacity: number;
  artScale: number;
  showBrand: boolean;
  showGuides: boolean;
  font: "serif" | "sans";
}
export const INITIAL: Design = {
  title: "把日子，\n读成一首诗",
  subtitle: "在书页之间，重新发现生活的辽阔。",
  eyebrow: "READ A LITTLE · LIVE A LITTLE",
  author: "爱豆书单 · 每周共读",
  brand: "爱豆书单",
  issue: "VOL. 026",
  family: "minimal",
  layout: "minimal-0",
  palette: "new-0",
  background: "bg-0-1",
  elements: ["center-1", "sky-3", "bottom-3"],
  titleSize: 68,
  tracking: 2,
  artOpacity: 55,
  artScale: 100,
  showBrand: true,
  showGuides: false,
  font: "serif",
};
export const PRESETS: Record<Family, Partial<Design>> = {
  minimal: {
    layout: "minimal-0",
    palette: "new-0",
    background: "bg-0-1",
    elements: ["center-1", "sky-3", "bottom-3"],
    font: "serif",
  },
  song: {
    layout: "song-0",
    palette: "new-6",
    background: "bg-1-1",
    elements: ["center-4", "sky-5", "bottom-3"],
    font: "serif",
  },
  tech: {
    layout: "tech-0",
    palette: "new-12",
    background: "bg-2-2",
    elements: ["center-6", "side-6", "sky-6", "bottom-6"],
    font: "sans",
  },
  editorial: {
    layout: "editorial-0",
    palette: "new-18",
    background: "bg-3-0",
    elements: ["center-10", "side-10"],
    font: "sans",
  },
  literary: {
    layout: "literary-0",
    palette: "new-21",
    background: "bg-4-1",
    elements: ["center-8", "side-9", "bottom-8"],
    font: "serif",
  },
  poster: {
    layout: "poster-0",
    palette: "new-23",
    background: "bg-5-5",
    elements: ["center-10", "sky-10", "bottom-10"],
    font: "sans",
  },
};
