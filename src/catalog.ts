import { BACKGROUND_TEMPLATES as CLASSIC_BACKGROUNDS } from "./classicBackgrounds";
import { CLASSIC_MOTIFS } from "./classicOptions";
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
  {
    id: "classic",
    name: "原版经典",
    en: "IDOL ORIGINALS",
    desc: "原版完整图腾、装帧与十二种经典构图",
    color: "#20283a",
  },
  {
    id: "epic",
    name: "奇幻史诗",
    en: "FANTASY & EPIC",
    desc: "铁王座、龙焰、城堡与冰火对峙",
    color: "#442e4f",
  },
  {
    id: "history",
    name: "历史人文",
    en: "HISTORY & CULTURE",
    desc: "宫阙、山河、古卷与时代纵深",
    color: "#8b4b32",
  },
  {
    id: "science",
    name: "科普宇宙",
    en: "SCIENCE & COSMOS",
    desc: "星云、行星、实验与太空探索",
    color: "#204e7e",
  },
  {
    id: "mind",
    name: "心理成长",
    en: "MIND & GROWTH",
    desc: "意识之门、大脑网络与觉醒光束",
    color: "#b37b36",
  },
  {
    id: "business",
    name: "商业经管",
    en: "BUSINESS & FINANCE",
    desc: "黑金城市、上升曲线与理性秩序",
    color: "#303d39",
  },
  {
    id: "mystery",
    name: "悬疑推理",
    en: "MYSTERY & CRIME",
    desc: "迷雾街道、侦探镜头与暗夜红线",
    color: "#343749",
  },
  {
    id: "nature",
    name: "自然旅行",
    en: "NATURE & JOURNEY",
    desc: "层叠山峦、海洋、森林与自然光",
    color: "#285a4c",
  },
  {
    id: "children",
    name: "童书绘本",
    en: "CHILDREN & WONDER",
    desc: "童话星球、明亮色块与轻松想象",
    color: "#df8866",
  },
  {
    id: "biography",
    name: "人物传记",
    en: "LIVES & BIOGRAPHY",
    desc: "人物剪影、档案肖像与时代印记",
    color: "#765349",
  },
  {
    id: "philosophy",
    name: "哲学社科",
    en: "PHILOSOPHY & SOCIETY",
    desc: "古典柱廊、思辨之门与人文结构",
    color: "#666454",
  },
  {
    id: "poetry",
    name: "诗词散文",
    en: "POETRY & ESSAYS",
    desc: "月、花、山水与细腻的情绪",
    color: "#7b687b",
  },
  {
    id: "library",
    name: "图书典藏",
    en: "THE BOOK COLLECTION",
    desc: "立体精装书、书页、烫金与藏书票",
    color: "#6b3b32",
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
  ["龙焰熔金", "#120e20", "#fff4dd", "#f5b44b", "epic"],
  ["朱砂山河", "#301716", "#fff0cf", "#e6b56b", "history"],
  ["星云蓝紫", "#0a102c", "#effbff", "#73d6fa", "science"],
  ["觉醒琥珀", "#17172a", "#fff4dc", "#ffbd60", "mind"],
  ["资本黑金", "#0d171b", "#f8f5e5", "#dbbf75", "business"],
  ["深夜红线", "#101725", "#f1f3f8", "#f16868", "mystery"],
  ["群青秘境", "#0e3534", "#eef9e3", "#a5d18d", "nature"],
  ["蜜桃童话", "#ffebc9", "#453c69", "#d36754", "children"],
  ["档案棕金", "#332824", "#fff1d9", "#d9ad79", "biography"],
  ["古典石阶", "#e6dfcc", "#353e3e", "#827655", "philosophy"],
  ["月色荷香", "#18313e", "#eff6ee", "#d8c59c", "poetry"],
  ["藏书红金", "#2e1020", "#fff0d6", "#e3bd75", "library"],
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
  classic: [
    "经典左文右书",
    "居中徽章圣殿",
    "黄金分割画廊",
    "极简藏书票",
    "国风竖题长卷",
    "宽银幕电影",
    "戏剧斜切",
    "暗黑史诗全元素",
    "长爪巨剑",
    "羊皮古卷双徽",
    "血色彗星王座",
    "北境白雪心树",
  ],
  epic: ["龙焰启幕", "冰火双极", "王座史诗"],
  history: ["山河题卷", "宫阙对开", "盛世长歌"],
  science: ["深空航行", "宇宙分野", "引力中心"],
  mind: ["觉醒之门", "内在探索", "向光而生"],
  business: ["黑金商业", "城市决策", "趋势焦点"],
  mystery: ["午夜线索", "案卷重构", "迷雾之眼"],
  nature: ["山海远行", "森林来信", "自然之境"],
  children: ["奇想星球", "彩色冒险", "童话剧场"],
  biography: ["人物档案", "时代回声", "人生侧写"],
  philosophy: ["思辨之门", "人文对话", "秩序之美"],
  poetry: ["月下花影", "山水寄情", "诗意中轴"],
  library: ["精装典藏", "藏书对开", "经典扉页"],
};
export const LAYOUTS = FAMILIES.flatMap((f) =>
  names[f.id].map((name, variant) => ({
    id:
      f.id === "classic"
        ? `classic:${["tpl-1-magazine-book", "tpl-2-center-emblem", "tpl-3-editorial-split", "tpl-4-minimal-frame", "tpl-5-chinese-scroll", "tpl-6-cinema-widescreen", "tpl-7-split-diagonal", "style-1-epic-original", "style-2-minimal-sword", "style-3-woodcut-heraldry", "style-4-red-comet-throne", "style-5-weirwood-snow"][variant]}`
        : `${f.id}-${variant}`,
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
      name: `${["清晨", "绢本", "数码", "印刷", "书页", "画布"][group] || f.name}·${name}`,
      pattern: (["plain", "paper", "grid", "dots", "waves", "sun"] as const)[i],
      tint: i === 5 ? "warm" : i === 4 ? "cool" : "neutral",
      gradient: undefined as string | undefined,
    }),
  ),
);
BACKGROUNDS.push(
  ...CLASSIC_BACKGROUNDS.filter((b) => b.id !== "bg-book-default").map((b) => ({
    id: "original-bg:" + b.id,
    family: "classic" as Family,
    name: "原版 · " + b.name.replace(/^\d+\. /, ""),
    pattern:
      b.patternType === "brick-wall"
        ? ("paper" as const)
        : b.patternType === "grid-ledger"
          ? ("grid" as const)
          : ("sun" as const),
    tint: "neutral",
    gradient: `linear-gradient(112deg,${b.leftTint},${b.rightTint})`,
  })),
);
export type Motif = {
  id: string;
  name: string;
  category: "center" | "side" | "sky" | "bottom";
  family: Family;
  shape: number;
  tag?: string;
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
MOTIFS.push(
  ...CLASSIC_MOTIFS.map((m) => ({
    id: m.id,
    name: m.name,
    category: m.category,
    family: "classic" as Family,
    shape: -1,
    tag: m.tag,
  })),
);
export interface Design {
  classicBook: string;
  classicElements: Partial<
    Record<"center" | "side" | "sky" | "bottom", string>
  >;
  brandPosition: "top-left" | "top-right" | "bottom-left";
  brandTheme: "gold-dark" | "ivory-crimson" | "frosted-glass";
  bookStyle: "open-starlight-book" | "royal-sealed-tome" | "stacked-classics";
  ornament: boolean;
  visualMode: "line" | "painted" | "luminous";
  subtitleSize: number;
  quote: string;
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
  classicBook: "along-the-river-code",
  classicElements: {},
  brandPosition: "top-left",
  brandTheme: "gold-dark",
  bookStyle: "open-starlight-book",
  ornament: true,
  visualMode: "painted",
  subtitleSize: 18,
  quote: "一幅画里的盛世与危局，一本书里的山河与人心。",

  title: "清明上河图密码",
  subtitle: "一幅名画藏尽帝国盛衰，八百二十四人皆在惊天杀局之中",
  eyebrow: "READ A LITTLE · LIVE A LITTLE",
  author: "爱豆书单 · 每周共读",
  brand: "爱豆书单",
  issue: "VOL. 026",
  family: "classic",
  layout: "classic:style-1-epic-original",
  palette: "ice-fire-gold",
  background: "bg-6-0",
  elements: [],
  titleSize: 54,
  tracking: 2,
  artOpacity: 85,
  artScale: 100,
  showBrand: true,
  showGuides: false,
  font: "serif",
};
export const PRESETS: Record<Family, Partial<Design>> = {
  minimal: {
    visualMode: "line",
    artOpacity: 55,
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
    elements: [],
    visualMode: "luminous",
    artOpacity: 90,
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
    elements: [],
    visualMode: "painted",
    artOpacity: 85,
    font: "serif",
  },
  poster: {
    layout: "poster-0",
    palette: "new-23",
    background: "bg-5-5",
    elements: ["center-10", "sky-10", "bottom-10"],
    font: "sans",
  },
  classic: {
    layout: "classic:style-1-epic-original",
    palette: "ice-fire-gold",
    background: "bg-6-0",
    elements: [],
    font: "serif",
    artOpacity: 85,
    visualMode: "painted",
    classicElements: {},
  },
  epic: {
    layout: "epic-0",
    palette: "new-24",
    background: "bg-7-5",
    elements: [],
    font: "serif",
    artOpacity: 90,
    visualMode: "luminous",
  },
  history: {
    layout: "history-0",
    palette: "new-25",
    background: "bg-8-5",
    elements: [],
    font: "serif",
    artOpacity: 90,
    visualMode: "painted",
  },
  science: {
    layout: "science-0",
    palette: "new-26",
    background: "bg-9-5",
    elements: [],
    font: "sans",
    artOpacity: 90,
    visualMode: "luminous",
  },
  mind: {
    layout: "mind-0",
    palette: "new-27",
    background: "bg-10-5",
    elements: [],
    font: "sans",
    artOpacity: 90,
    visualMode: "painted",
  },
  business: {
    layout: "business-0",
    palette: "new-28",
    background: "bg-11-5",
    elements: [],
    font: "sans",
    artOpacity: 90,
    visualMode: "painted",
  },
  mystery: {
    layout: "mystery-0",
    palette: "new-29",
    background: "bg-12-5",
    elements: [],
    font: "serif",
    artOpacity: 90,
    visualMode: "luminous",
  },
  nature: {
    layout: "nature-0",
    palette: "new-30",
    background: "bg-13-5",
    elements: [],
    font: "serif",
    artOpacity: 90,
    visualMode: "painted",
  },
  children: {
    layout: "children-0",
    palette: "new-31",
    background: "bg-14-5",
    elements: [],
    font: "sans",
    artOpacity: 90,
    visualMode: "painted",
  },
  biography: {
    layout: "biography-0",
    palette: "new-32",
    background: "bg-15-5",
    elements: [],
    font: "serif",
    artOpacity: 90,
    visualMode: "painted",
  },
  philosophy: {
    layout: "philosophy-0",
    palette: "new-33",
    background: "bg-16-5",
    elements: [],
    font: "serif",
    artOpacity: 90,
    visualMode: "painted",
  },
  poetry: {
    layout: "poetry-0",
    palette: "new-34",
    background: "bg-17-5",
    elements: [],
    font: "serif",
    artOpacity: 90,
    visualMode: "painted",
  },
  library: {
    layout: "library-0",
    palette: "new-35",
    background: "bg-18-5",
    elements: [],
    font: "serif",
    artOpacity: 90,
    visualMode: "painted",
  },
};
