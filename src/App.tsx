import { SurfacePattern } from "./SurfaceArt";
import { COMPOSITIONS, WATERMARKS, FONT_SETS, THEME_GROUPS } from "./catalog";
import { WeChatPreview } from "./WeChatPreview";
import { LayerPanel } from "./LayerPanel";
import { classicLayerIds } from "./catalog";
import { CLASSIC_BOOKS } from "./ClassicScene";
import { AidouBrandBadge } from "./BrandBadge";
import { useCallback, useEffect, useRef, useState } from "react";
import {
  BACKGROUNDS,
  FAMILIES,
  INITIAL,
  LAYOUTS,
  MOTIFS,
  PALETTES,
  PRESETS,
  type Design,
  type Family,
} from "./catalog";
import { MotifArt } from "./Artwork";
import { CoverCanvas } from "./CoverCanvas";

const STORAGE = "wechat-cover-studio:v2";
function readDraft(): Design {
  try {
    const data = JSON.parse(localStorage.getItem(STORAGE) || "null");
    const v = data?.version === 2 ? data.design : null;
    if (!v || typeof v !== "object") return INITIAL;
    const d = { ...INITIAL };
    if (typeof v.watermarkVisible === "boolean")
      d.watermarkVisible = v.watermarkVisible;
    if (
      COMPOSITIONS.some((c) => c.id === v.composition) ||
      v.composition === "legacy"
    )
      d.composition = v.composition;
    if (["theme", "solid", "linear", "radial", "mesh"].includes(v.fillMode))
      d.fillMode = v.fillMode;
    for (const k of ["fillColor", "gradientColor", "watermarkColor"] as const)
      if (typeof v[k] === "string" && /^#[0-9a-f]{6}$/i.test(v[k])) d[k] = v[k];
    if (WATERMARKS.some((w) => w.id === v.watermark)) d.watermark = v.watermark;
    for (const [k, min, max] of [
      ["gradientAngle", 0, 360],
      ["watermarkOpacity", 0, 70],
      ["watermarkScale", 50, 200],
    ] as const)
      if (Number.isFinite(v[k])) d[k] = Math.max(min, Math.min(max, v[k]));

    for (const key of [
      "title",
      "subtitle",
      "eyebrow",
      "author",
      "brand",
      "issue",
      "quote",
      "footerText",
      "articleTitle",
    ] as const)
      if (typeof v[key] === "string")
        d[key] = v[key].slice(0, key === "title" ? 80 : 160);
    if (FAMILIES.some((f) => f.id === v.family)) d.family = v.family;
    if (LAYOUTS.some((x) => x.id === v.layout)) d.layout = v.layout;
    if (PALETTES.some((x) => x.id === v.palette)) d.palette = v.palette;
    if (BACKGROUNDS.some((x) => x.id === v.background))
      d.background = v.background;
    if (Array.isArray(v.elements))
      d.elements = v.elements
        .filter(
          (id: unknown) =>
            typeof id === "string" && MOTIFS.some((m) => m.id === id),
        )
        .slice(0, 24);
    for (const [key, min, max] of [
      ["titleSize", 32, 96],
      ["tracking", -2, 12],
      ["artOpacity", 10, 100],
      ["artScale", 60, 140],
    ] as const)
      if (Number.isFinite(v[key]))
        d[key] = Math.max(min, Math.min(max, v[key]));
    for (const key of ["showBrand", "showGuides"] as const)
      if (typeof v[key] === "boolean") d[key] = v[key];
    if (FONT_SETS.some((f) => f.id === v.font)) d.font = v.font;
    if (["top-left", "top-right", "bottom-left"].includes(v.brandPosition))
      d.brandPosition = v.brandPosition;
    if (
      [
        "gold-dark",
        "ivory-crimson",
        "frosted-glass",
        "ruby-seal",
        "jade-ink",
        "cyber-neon",
        "platinum",
        "sunset",
        "sticker",
        "chrome-cut",
        "orbital-mark",
        "editorial-block",
        "holo-ticket",
        "soft-capsule",
        "monogram",
      ].includes(v.brandTheme)
    )
      d.brandTheme = v.brandTheme;
    if (["line", "painted", "luminous"].includes(v.visualMode))
      d.visualMode = v.visualMode;
    if (
      ["royal-sealed-tome", "open-starlight-book", "stacked-classics"].includes(
        v.bookStyle,
      )
    )
      d.bookStyle = v.bookStyle;
    if (typeof v.ornament === "boolean") d.ornament = v.ornament;
    if (CLASSIC_BOOKS.some((b) => b.id === v.classicBook))
      d.classicBook = v.classicBook;
    if (v.classicElements && typeof v.classicElements === "object")
      d.classicElements = Object.fromEntries(
        Object.entries(v.classicElements).filter(
          ([k, id]) =>
            ["center", "side", "sky", "bottom"].includes(k) &&
            typeof id === "string" &&
            (id === "none" || MOTIFS.some((m) => m.id === "original:" + id)),
        ),
      );
    if (Number.isFinite(v.subtitleSize))
      d.subtitleSize = Math.max(12, Math.min(28, v.subtitleSize));
    if (v.layerVersion === 1) {
      d.layerVersion = 1;
      d.hiddenElements = Array.isArray(v.hiddenElements)
        ? v.hiddenElements.filter(
            (id: unknown) => typeof id === "string" && d.elements.includes(id),
          )
        : [];
      for (const key of [
        "showThemeArtwork",
        "showBook",
        "showTemplateArt",
      ] as const)
        if (typeof v[key] === "boolean") d[key] = v[key];
    } else {
      if (d.family === "classic") {
        const defaults = classicLayerIds(d.classicBook);
        const categories = ["center", "side", "sky", "bottom"] as const;
        d.elements = [
          ...new Set([
            ...defaults.filter((_, i) => !d.classicElements[categories[i]]),
            ...Object.values(d.classicElements)
              .filter((id) => id !== "none")
              .map((id) => "original:" + id),
            ...d.elements,
          ]),
        ];
      } else if (d.visualMode !== "line")
        d.elements = [...new Set(["scene:" + d.family, ...d.elements])];
    }
    if (v.layerTransforms && typeof v.layerTransforms === "object")
      d.layerTransforms = Object.fromEntries(
        Object.entries(v.layerTransforms)
          .filter(
            ([id, t]) =>
              d.elements.includes(id) &&
              t &&
              typeof t === "object" &&
              ["x", "y", "scale"].every((k) =>
                Number.isFinite((t as Record<string, unknown>)[k]),
              ),
          )
          .map(([id, t]) => {
            const v = t as { x: number; y: number; scale: number };
            return [
              id,
              {
                x: Math.max(-400, Math.min(400, v.x)),
                y: Math.max(-180, Math.min(180, v.y)),
                scale: Math.max(40, Math.min(160, v.scale)),
              },
            ];
          }),
      );
    return d;
  } catch {
    return INITIAL;
  }
}
const TABS = [
  { id: "copy", name: "文案", icon: "T", hint: "写下你的故事" },
  {
    id: "layout",
    name: "构图",
    icon: "▦",
    hint: "实时预览，独立排版",
  },
  { id: "theme", name: "主题", icon: "◐", hint: "主题与元素效果" },
  { id: "surface", name: "背景", icon: "◒", hint: "底色、渐变与图案" },
  {
    id: "elements",
    name: "元素",
    icon: "✳",
    hint: `${MOTIFS.length} 个视觉意象`,
  },
] as const;
type Tab = (typeof TABS)[number]["id"];
const categories = [
  { id: "center", name: "主视觉" },
  { id: "side", name: "两侧" },
  { id: "sky", name: "天空" },
  { id: "bottom", name: "前景" },
] as const;
function LayoutPreview({ design }: { design: Design }) {
  const host = useRef<HTMLDivElement>(null);
  const [width, setWidth] = useState(170);
  useEffect(() => {
    const e = host.current;
    if (!e) return;
    const ro = new ResizeObserver(() => setWidth(e.clientWidth));
    ro.observe(e);
    return () => ro.disconnect();
  }, []);
  return (
    <div
      ref={host}
      className="live-layout-thumb"
      style={{ height: width * 0.426 }}
    >
      <div
        style={{
          transform: `scale(${width / 1000})`,
          transformOrigin: "top left",
          width: 1000,
          height: 426,
        }}
      >
        <CoverCanvas design={design} preview />
      </div>
    </div>
  );
}
function App() {
  const [history, setHistory] = useState<{
    past: Design[];
    present: Design;
    future: Design[];
  }>(() => ({ past: [], present: readDraft(), future: [] }));
  const d = history.present;
  const [tab, setTab] = useState<Tab>("copy");
  const [patternGroup, setPatternGroup] = useState(
    d.watermark.startsWith("scene-")
      ? "整幅背景"
      : d.watermark.startsWith("mix-")
        ? "组合背景"
        : "平铺纹样",
  );
  const [assetRequest, setAssetRequest] = useState(0);
  const panelRef = useRef<HTMLDivElement>(null);
  const [layoutGroup, setLayoutGroup] = useState("全部");
  const [showAllPalettes, setShowAllPalettes] = useState(false);
  const [familyFilter, setFamilyFilter] = useState<Family | "all">("all");
  const [category, setCategory] =
    useState<(typeof categories)[number]["id"]>("center");
  const [themeFilter, setThemeFilter] =
    useState<(typeof THEME_GROUPS)[number]["id"]>("featured");
  const [themeSearch, setThemeSearch] = useState("");
  const [assetGroup, setAssetGroup] = useState("all");
  const [showLayers, setShowLayers] = useState(true);
  const [query, setQuery] = useState("");
  const [hasOverflow, setHasOverflow] = useState(false);
  const [saving, setSaving] = useState("已自动保存");
  const [busy, setBusy] = useState(false);
  const [message, setMessage] = useState("");
  const [mobilePanel, setMobilePanel] = useState(false);
  const [scale, setScale] = useState(0.7);
  const [crop, setCrop] = useState(false);
  const canvasRef = useRef<HTMLDivElement>(null);
  const stageRef = useRef<HTMLDivElement>(null);
  const exporting = useRef(false);
  const openElements = () => {
    setTab("elements");
    setMobilePanel(true);
    setQuery("");
    setAssetGroup("all");
    setCategory("center");
    setAssetRequest((v) => v + 1);
  };
  useEffect(() => {
    if (!assetRequest) return;
    const frame = requestAnimationFrame(() => {
      panelRef.current?.scrollTo({ top: 0, behavior: "auto" });
      panelRef.current
        ?.querySelector<HTMLInputElement>('[aria-label="搜索元素"]')
        ?.focus({ preventScroll: true });
    });
    return () => cancelAnimationFrame(frame);
  }, [assetRequest]);

  const update = useCallback(
    (patch: Partial<Design>) =>
      setHistory((h) => ({
        past: [...h.past, h.present].slice(-60),
        present: { ...h.present, ...patch },
        future: [],
      })),
    [],
  );
  const undo = useCallback(
    () =>
      setHistory((h) =>
        h.past.length
          ? {
              past: h.past.slice(0, -1),
              present: h.past[h.past.length - 1],
              future: [h.present, ...h.future],
            }
          : h,
      ),
    [],
  );
  const redo = useCallback(
    () =>
      setHistory((h) =>
        h.future.length
          ? {
              past: [...h.past, h.present],
              present: h.future[0],
              future: h.future.slice(1),
            }
          : h,
      ),
    [],
  );
  useEffect(() => {
    setSaving("保存中…");
    const timer = setTimeout(() => {
      try {
        localStorage.setItem(
          STORAGE,
          JSON.stringify({ version: 2, design: d }),
        );
        setSaving("已自动保存");
      } catch {
        setSaving("浏览器存储不可用");
      }
    }, 450);
    return () => clearTimeout(timer);
  }, [d]);
  useEffect(() => {
    const node = stageRef.current;
    if (!node) return;
    const ro = new ResizeObserver(() =>
      setScale(Math.min(1, (node.clientWidth - 48) / 1000)),
    );
    ro.observe(node);
    return () => ro.disconnect();
  }, []);
  useEffect(() => {
    function key(e: KeyboardEvent) {
      if (
        (e.metaKey || e.ctrlKey) &&
        e.key.toLowerCase() === "z" &&
        !(
          e.target instanceof HTMLInputElement ||
          e.target instanceof HTMLTextAreaElement
        )
      ) {
        e.preventDefault();
        if (e.shiftKey) redo();
        else undo();
      }
    }
    window.addEventListener("keydown", key);
    return () => window.removeEventListener("keydown", key);
  }, [undo, redo]);
  const palette = PALETTES.find((p) => p.id === d.palette) || PALETTES[0];
  const activeLayout = LAYOUTS.find((l) => l.id === d.layout) || LAYOUTS[0];
  const applyFamily = (family: Family) => {
    const { layout: _layout, ...style } = PRESETS[family];
    update({ ...style, family, fillMode: "theme", fillColor: "" });
  };
  const toggleMotif = (id: string) => {
    const active = d.elements.includes(id);
    const category = MOTIFS.find((m) => m.id === id)?.category;
    const count = d.elements.filter(
      (x) => MOTIFS.find((m) => m.id === x)?.category === category,
    ).length;
    const layerTransforms = { ...d.layerTransforms };
    if (active) delete layerTransforms[id];
    else
      layerTransforms[id] = {
        x: -Math.min(3, count) * 85,
        y: Math.min(3, count) * 24,
        scale: count ? 80 : 100,
      };
    update({
      elements: active
        ? d.elements.filter((x) => x !== id)
        : [...d.elements, id],
      hiddenElements: d.hiddenElements.filter((x) => x !== id),
      showThemeArtwork: true,
      layerTransforms,
    });
  };
  async function download() {
    if (!canvasRef.current || exporting.current) return;
    exporting.current = true;
    setBusy(true);
    setMessage("");
    try {
      const { domToPng } = await import("modern-screenshot");
      await document.fonts.ready;
      const url = await domToPng(canvasRef.current, {
        width: 1000,
        height: 426,
        scale: 2,
        backgroundColor: palette.bg,
        style: { transform: "none", margin: "0" },
        filter: (node) =>
          !(
            node instanceof HTMLElement && node.dataset.exportIgnore === "true"
          ),
      });
      const a = document.createElement("a");
      a.download = `${d.title.replace(/[\\/:*?"<>|\n]/g, "_").slice(0, 60) || "我的封面"}_2000x852.png`;
      a.href = url;
      a.click();
      setMessage("封面已导出 · 2000 × 852 PNG");
    } catch {
      setMessage("导出失败，请稍后重试。也可刷新页面恢复已保存的草稿。");
    } finally {
      setBusy(false);
      exporting.current = false;
    }
  }
  const matchesAsset = (m: (typeof MOTIFS)[number]) =>
    assetGroup === "all" ||
    (assetGroup === "3d"
      ? m.id.startsWith("virtual:") ||
        m.id.startsWith("sculpt:") ||
        [
          "crystalwater",
          "papercanyon",
          "ceramicwave",
          "bookarchitecture",
        ].includes(m.family)
      : assetGroup === "water"
        ? /水|海|浪|湖|涟漪|倒影/.test(m.name)
        : assetGroup === "landscape"
          ? /山|墨|松|雪|岚|竹/.test(m.name)
          : assetGroup === "books"
            ? /书|图书馆|藏书|纸页/.test(m.name)
            : assetGroup === "space"
              ? /星|宇宙|太空|深空|际|飞碟|轨道/.test(m.name)
              : assetGroup === "classic"
                ? m.id.startsWith("original:")
                : m.id.startsWith("emoji:"));
  const shownMotifs = MOTIFS.filter(
    (m) =>
      m.category === category &&
      matchesAsset(m) &&
      (!query ||
        `${m.name} ${m.tag || ""} ${FAMILIES.find((f) => f.id === m.family)?.name}`.includes(
          query,
        )),
  );
  const field = (
    key:
      | "title"
      | "subtitle"
      | "eyebrow"
      | "author"
      | "brand"
      | "issue"
      | "quote"
      | "footerText",
    label: string,
    multiline = false,
  ) => (
    <label className="field" key={key}>
      <span>
        {label}
        <small>
          {d[key].length}/{key === "title" ? 80 : 160}
        </small>
      </span>
      {multiline ? (
        <textarea
          rows={key === "title" ? 3 : 2}
          maxLength={key === "title" ? 80 : 160}
          value={d[key]}
          onChange={(e) => update({ [key]: e.target.value })}
        />
      ) : (
        <input
          maxLength={160}
          value={d[key]}
          onChange={(e) => update({ [key]: e.target.value })}
        />
      )}
    </label>
  );
  const range = (
    key:
      | "titleSize"
      | "tracking"
      | "artOpacity"
      | "artScale"
      | "subtitleSize"
      | "watermarkOpacity"
      | "watermarkScale",
    label: string,
    min: number,
    max: number,
    unit: string,
  ) => (
    <label className="range-field">
      <span>
        {label}
        <b>
          {d[key]}
          {unit}
        </b>
      </span>
      <input
        type="range"
        min={min}
        max={max}
        value={d[key]}
        onChange={(e) => update({ [key]: Number(e.target.value) })}
      />
    </label>
  );
  return (
    <div className="studio">
      <header className="app-header">
        <a className="wordmark" href="#">
          <div className="header-brand">
            <AidouBrandBadge position="top-left" theme="gold-dark" />
          </div>
          <span className="header-product">
            封面创作室<small>THE BOOK COVER STUDIO</small>
          </span>
        </a>
        <div className="header-middle">为每一本好书，设计值得停留的一眼。</div>
        <div className="header-actions">
          <span className="save-status">
            <i />
            {saving}
          </span>
          <button className="export-button" onClick={download} disabled={busy}>
            {busy ? "正在导出…" : "↗ 导出封面"}
          </button>
        </div>
      </header>
      <div className="workspace">
        <aside className={`editor ${mobilePanel ? "mobile-visible" : ""}`}>
          <div className="editor-heading">
            <span>创作工作台</span>
          </div>
          <nav className="editor-tabs" aria-label="编辑步骤">
            {TABS.map((t) => (
              <button
                key={t.id}
                aria-pressed={tab === t.id}
                onClick={() => {
                  setTab(t.id);
                  panelRef.current?.scrollTo({ top: 0 });
                }}
              >
                <b>{t.icon}</b>
                {t.name}
              </button>
            ))}
          </nav>
          <div className="panel-scroll" ref={panelRef}>
            <div className="panel-heading">
              <h1>{TABS.find((t) => t.id === tab)?.hint}</h1>
              <p>
                {tab === "copy"
                  ? "一段文字，一种心情。剩下的交给画面。"
                  : tab === "layout"
                    ? "先选一种叙事方式，再慢慢调整细节。"
                    : tab === "theme"
                      ? "从一张纸的颜色，开始今天的灵感。"
                      : "用一个小小的意象，让画面更有故事。"}
              </p>
            </div>
            {tab === "copy" && (
              <>
                <div className="section-label">
                  文字内容<span>支持手动换行</span>
                </div>
                {field("title", "主标题", true)}
                {field("subtitle", "副标题", true)}
                {d.family === "classic" &&
                  field("quote", "原版引言 / 金句", true)}
                <div className="two-fields">
                  {field("eyebrow", "眉题 / 英文")}
                  {field("issue", "期刊 / 编号")}
                </div>
                {field("author", "作者 / 底部署名")}
                {field("footerText", "右下角角标（留空可隐藏）")}
                <div className="section-label">字体与节奏</div>
                <div className="font-set-grid">
                  {FONT_SETS.map((f) => (
                    <button
                      key={f.id}
                      aria-pressed={d.font === f.id}
                      onClick={() => update({ font: f.id })}
                    >
                      <strong>{f.name}</strong>
                      <span className={`font-demo font-${f.id}`}>
                        {f.sample}
                      </span>
                    </button>
                  ))}
                </div>
                {range("titleSize", "标题字号", 32, 96, "px")}
                {d.family === "classic" &&
                  range("subtitleSize", "副标题字号", 12, 28, "px")}
                {range("tracking", "标题字距", -2, 12, "px")}
                <div className="section-label">
                  品牌标识
                  <label className="switch">
                    <input
                      aria-label="显示品牌标识"
                      type="checkbox"
                      checked={d.showBrand}
                      onChange={(e) => update({ showBrand: e.target.checked })}
                    />
                    <span />
                  </label>
                </div>
                {d.showBrand && (
                  <>
                    {field("brand", "品牌名称")}
                    <div className="control-caption">原版品牌锚点</div>
                    <div className="segmented">
                      {(
                        [
                          ["top-left", "左上"],
                          ["top-right", "右上"],
                          ["bottom-left", "左下"],
                        ] as const
                      ).map(([id, name]) => (
                        <button
                          key={id}
                          aria-pressed={d.brandPosition === id}
                          onClick={() => update({ brandPosition: id })}
                        >
                          {name}
                        </button>
                      ))}
                    </div>
                    <div className="control-caption">徽章风格</div>
                    <div className="segmented">
                      {(
                        [
                          ["gold-dark", "曜石黑金"],
                          ["ivory-crimson", "象牙朱砂"],
                          ["frosted-glass", "磨砂琉璃"],
                          ["ruby-seal", "赤金印章"],
                          ["jade-ink", "青玉墨韵"],
                          ["cyber-neon", "赛博霓虹"],
                          ["platinum", "铂金银白"],
                          ["sunset", "落日琉光"],
                          ["sticker", "紫糖贴纸"],
                          ["chrome-cut", "铬金切片"],
                          ["orbital-mark", "轨道书星"],
                          ["editorial-block", "先锋字标"],
                          ["holo-ticket", "全息票签"],
                          ["soft-capsule", "软胶胶囊"],
                          ["monogram", "几何书章"],
                        ] as const
                      ).map(([id, name]) => (
                        <button
                          key={id}
                          aria-pressed={d.brandTheme === id}
                          onClick={() => update({ brandTheme: id })}
                        >
                          {name}
                        </button>
                      ))}
                    </div>
                  </>
                )}
                <div className="quiet-note">
                  小提示：主标题建议 8—20 字，按 Enter
                  换行。长标题会自动缩小，避免超出画布。
                </div>
              </>
            )}
            {tab === "layout" && (
              <>
                <div className="section-label">
                  排版方式<span>只调整文字与图形的位置</span>
                </div>
                <div className="composition-filters" aria-label="构图分类">
                  {["全部", "左右", "上下", "居中"].map((g) => (
                    <button
                      key={g}
                      aria-pressed={layoutGroup === g}
                      onClick={() => setLayoutGroup(g)}
                    >
                      {g}
                    </button>
                  ))}
                </div>
                <div className="layout-grid live-layout-grid">
                  {COMPOSITIONS.filter(
                    (c) => layoutGroup === "全部" || c.group === layoutGroup,
                  ).map((c) => (
                    <button
                      key={c.id}
                      aria-label={c.name}
                      aria-pressed={d.composition === c.id}
                      className={`layout-card ${d.composition === c.id ? "selected" : ""}`}
                      onClick={() => update({ composition: c.id })}
                    >
                      <LayoutPreview design={{ ...d, composition: c.id }} />
                      <span>
                        {c.name}
                        <small>{d.composition === c.id ? "✓" : ""}</small>
                      </span>
                      <p>{c.hint}</p>
                    </button>
                  ))}
                </div>
                <details className="legacy-layouts">
                  <summary>经典模板排版 · 保留原版</summary>
                  <div className="layout-grid live-layout-grid">
                    {LAYOUTS.filter((l) => l.family === "classic").map((l) => (
                      <button
                        key={l.id}
                        className={`layout-card ${d.composition === "legacy" && d.layout === l.id ? "selected" : ""}`}
                        onClick={() =>
                          update({ layout: l.id, composition: "legacy" })
                        }
                      >
                        <LayoutPreview
                          design={{ ...d, layout: l.id, composition: "legacy" }}
                        />
                        <span>{l.name}</span>
                      </button>
                    ))}
                  </div>
                </details>
                <div className="quiet-note">
                  缩略图使用当前文案、颜色和元素实时绘制。切换主题会保留所选排版。
                </div>
              </>
            )}
            {tab === "theme" && (
              <>
                <div className="section-label">
                  主题风格<span>更换色彩与元素，保留排版</span>
                </div>
                <label className="theme-search">
                  <input
                    aria-label="搜索主题"
                    placeholder="搜索水纹、图书馆、雪山、3D…"
                    value={themeSearch}
                    onChange={(e) => setThemeSearch(e.target.value)}
                  />
                  {themeSearch && (
                    <button
                      aria-label="清空主题搜索"
                      onClick={() => setThemeSearch("")}
                    >
                      ×
                    </button>
                  )}
                </label>
                <div className="theme-category-grid" aria-label="主题分类">
                  {THEME_GROUPS.map((g) => (
                    <button
                      key={g.id}
                      aria-pressed={themeFilter === g.id}
                      onClick={() => setThemeFilter(g.id)}
                    >
                      {g.name}
                      <small>{g.families.length}</small>
                    </button>
                  ))}
                </div>
                <p className="theme-result-note">
                  {themeSearch
                    ? "全库搜索结果"
                    : "按分类浏览；默认展示精选组合"}
                </p>
                <div className="family-grid">
                  {FAMILIES.filter((f) =>
                    themeSearch.trim()
                      ? `${f.name} ${f.en} ${f.desc} ${THEME_GROUPS.filter(
                          (g) =>
                            (g.families as readonly string[]).includes(f.id),
                        )
                          .map((g) => g.name)
                          .join(" ")}`
                          .toLowerCase()
                          .includes(themeSearch.trim().toLowerCase())
                      : (
                          THEME_GROUPS.find((g) => g.id === themeFilter)
                            ?.families as readonly string[]
                        )?.includes(f.id),
                  ).map((f) => (
                    <button
                      key={f.id}
                      className={d.family === f.id ? "selected" : ""}
                      aria-pressed={d.family === f.id}
                      title={f.desc}
                      onClick={() => applyFamily(f.id)}
                    >
                      <span className="family-art">
                        <span className="theme-thumb">
                          <CoverCanvas
                            preview
                            design={{
                              ...d,
                              ...PRESETS[f.id],
                              title: f.name,
                              subtitle: f.desc,
                              eyebrow: f.en,
                              family: f.id,
                              showBrand: false,
                              showGuides: false,
                              titleSize: 68,
                            }}
                          />
                        </span>
                        <i>{d.family === f.id ? "✓ 已应用" : "应用风格 ↗"}</i>
                      </span>
                      <strong>{f.name}</strong>
                      <small>{f.en}</small>
                      <p>{f.desc}</p>
                    </button>
                  ))}
                </div>
                {d.family === "classic" && (
                  <div className="classic-controls">
                    <div className="section-label">
                      原版书籍意象套件<span>完整保留原始设计</span>
                    </div>
                    <label className="field">
                      <span>书籍主题</span>
                      <select
                        value={d.classicBook}
                        onChange={(e) =>
                          update({
                            classicBook: e.target.value,
                            classicElements: {},
                            elements: classicLayerIds(e.target.value),
                            hiddenElements: [],
                            layerTransforms: {},
                            showThemeArtwork: true,
                            showBook: true,
                            showTemplateArt: true,
                          })
                        }
                      >
                        {CLASSIC_BOOKS.map((b) => (
                          <option key={b.id} value={b.id}>
                            {b.title}
                          </option>
                        ))}
                      </select>
                    </label>
                    <button
                      className="sample-copy-button"
                      onClick={() => {
                        const b = CLASSIC_BOOKS.find(
                          (b) => b.id === d.classicBook,
                        )!;
                        update({
                          title: b.title,
                          subtitle: b.subtitle,
                          eyebrow: b.englishTitle,
                          author: b.author,
                          issue: b.issueNumber,
                          quote: b.quote,
                          titleSize: 54,
                        });
                      }}
                    >
                      使用这本书的原版文案 ↗
                    </button>
                    <label className="field">
                      <span>原版立体书造型</span>
                      <select
                        value={d.bookStyle}
                        onChange={(e) =>
                          update({
                            bookStyle: e.target.value as Design["bookStyle"],
                            showBook: true,
                            showThemeArtwork: true,
                          })
                        }
                      >
                        <option value="open-starlight-book">
                          翻开的星芒古籍
                        </option>
                        <option value="royal-sealed-tome">
                          烫金火漆精装书
                        </option>
                        <option value="stacked-classics">
                          典藏书堆与羽毛笔
                        </option>
                      </select>
                    </label>
                  </div>
                )}
                <div className="section-label">
                  元素效果<span>颜色、阴影与发光</span>
                </div>
                <div className="segmented">
                  {(
                    [
                      ["line", "无阴影"],
                      ["painted", "立体阴影"],
                      ["luminous", "发光效果"],
                    ] as const
                  ).map(([id, name]) => (
                    <button
                      key={id}
                      aria-pressed={d.visualMode === id}
                      onClick={() => update({ visualMode: id })}
                    >
                      {name}
                    </button>
                  ))}
                </div>
                <p className="quiet-note">
                  调整元素的整体阴影或光晕，元素本身的材质与颜色保留。
                </p>
                <label className="ornament-toggle">
                  <input
                    type="checkbox"
                    checked={d.ornament}
                    onChange={(e) => update({ ornament: e.target.checked })}
                  />
                  装帧增强 · 金线边框、角花与星尘
                </label>
              </>
            )}
            {tab === "surface" && (
              <>
                <div className="section-label">
                  封面底色<span>纯色或渐变</span>
                </div>
                <div className="segmented">
                  {(
                    [
                      ["solid", "纯色"],
                      ["linear", "线性渐变"],
                      ["radial", "中心渐变"],
                      ["mesh", "柔光渐变"],
                    ] as const
                  ).map(([id, name]) => (
                    <button
                      key={id}
                      aria-pressed={
                        d.fillMode === id ||
                        (id === "solid" && d.fillMode === "theme")
                      }
                      onClick={() => update({ fillMode: id })}
                    >
                      {name}
                    </button>
                  ))}
                </div>
                <div className="fill-colors">
                  <label>
                    底色
                    <input
                      aria-label="底色"
                      type="color"
                      value={d.fillColor || palette.bg}
                      onChange={(e) =>
                        update({
                          fillColor: e.target.value,
                          fillMode:
                            d.fillMode === "theme" ? "solid" : d.fillMode,
                        })
                      }
                    />
                  </label>
                  {!["theme", "solid"].includes(d.fillMode) && (
                    <label>
                      渐变颜色
                      <input
                        aria-label="渐变颜色"
                        type="color"
                        value={d.gradientColor}
                        onChange={(e) =>
                          update({ gradientColor: e.target.value })
                        }
                      />
                    </label>
                  )}
                </div>
                {d.fillMode === "linear" && (
                  <>
                    <label className="catalog-select">
                      渐变方向
                      <select
                        aria-label="渐变方向"
                        value={d.gradientAngle}
                        onChange={(e) =>
                          update({ gradientAngle: Number(e.target.value) })
                        }
                      >
                        {[
                          [0, "向上"],
                          [45, "右上"],
                          [90, "向右"],
                          [135, "右下"],
                          [180, "向下"],
                          [225, "左下"],
                          [270, "向左"],
                          [315, "左上"],
                        ].map(([v, n]) => (
                          <option key={v} value={v}>
                            {n}
                          </option>
                        ))}
                      </select>
                    </label>
                  </>
                )}
                <div className="section-label">
                  配色方案<span>同时搭配文字与元素颜色</span>
                </div>
                <div className="palette-grid">
                  {(showAllPalettes
                    ? PALETTES
                    : PALETTES.filter(
                        (p) =>
                          p.family === d.family ||
                          p.id === d.palette ||
                          [
                            "new-0",
                            "new-12",
                            "new-18",
                            "new-22",
                            "new-38",
                            "new-45",
                          ].includes(p.id),
                      )
                  ).map((p) => (
                    <button
                      key={p.id}
                      aria-label={p.name}
                      title={p.name}
                      aria-pressed={d.palette === p.id}
                      className={d.palette === p.id ? "selected" : ""}
                      onClick={() => update({ palette: p.id, fillColor: "" })}
                    >
                      <span style={{ background: p.bg, color: p.ink }}>
                        <b>Aa</b>
                        <i style={{ background: p.accent }} />
                        {d.palette === p.id && <em>✓</em>}
                      </span>
                      <small>{p.name}</small>
                    </button>
                  ))}
                </div>
                <button
                  className="catalog-more"
                  onClick={() => setShowAllPalettes(!showAllPalettes)}
                >
                  {showAllPalettes
                    ? "收起配色"
                    : "查看全部配色（" + PALETTES.length + "）"}
                </button>
                <div className="section-label">
                  背景图案
                  <button
                    className="pattern-visibility"
                    aria-label={
                      d.watermarkVisible ? "隐藏背景图案" : "显示背景图案"
                    }
                    aria-pressed={d.watermarkVisible}
                    onClick={() =>
                      update({ watermarkVisible: !d.watermarkVisible })
                    }
                  >
                    {d.watermarkVisible ? "◉ 显示中" : "⊘ 已隐藏"}
                  </button>
                </div>
                <div className="composition-filters" aria-label="背景图案类型">
                  {["平铺纹样", "整幅背景", "组合背景"].map((g) => (
                    <button
                      key={g}
                      aria-pressed={patternGroup === g}
                      onClick={() => setPatternGroup(g)}
                    >
                      {g}
                    </button>
                  ))}
                </div>
                <div className="watermark-grid">
                  {WATERMARKS.filter(
                    (w) =>
                      w.id === "none" ||
                      (patternGroup === "整幅背景"
                        ? w.id.startsWith("scene-")
                        : patternGroup === "组合背景"
                          ? w.id.startsWith("mix-")
                          : !w.id.startsWith("scene-") &&
                            !w.id.startsWith("mix-")),
                  ).map((w) => (
                    <button
                      key={w.id}
                      aria-pressed={d.watermark === w.id}
                      onClick={() =>
                        update({ watermark: w.id, watermarkVisible: true })
                      }
                    >
                      <div className={`watermark-sample stamp-${w.id}`}>
                        <SurfacePattern
                          kind={w.id}
                          color="#c4b58e"
                          scale={55}
                        />
                      </div>
                      {w.name}
                    </button>
                  ))}
                </div>
                {d.watermark !== "none" && (
                  <>
                    {range("watermarkOpacity", "图案透明度", 0, 70, "%")}{" "}
                    {range(
                      "watermarkScale",
                      d.watermark.startsWith("scene-") ||
                        d.watermark.startsWith("mix-")
                        ? "背景缩放"
                        : "图案大小",
                      50,
                      200,
                      "%",
                    )}
                    <label className="fill-colors">
                      图案颜色
                      <input
                        aria-label="图案颜色"
                        type="color"
                        value={d.watermarkColor || palette.accent}
                        onChange={(e) =>
                          update({ watermarkColor: e.target.value })
                        }
                      />
                    </label>
                  </>
                )}
                <details className="legacy-layouts">
                  <summary>更多背景纹理 · 保留原版</summary>
                  <label className="catalog-select">
                    背景风格
                    <select
                      aria-label="背景风格"
                      value={familyFilter}
                      onChange={(e) =>
                        setFamilyFilter(e.target.value as Family | "all")
                      }
                    >
                      <option value="all">全部背景</option>
                      {FAMILIES.map((f) => (
                        <option key={f.id} value={f.id}>
                          {f.name}
                        </option>
                      ))}
                    </select>
                  </label>
                  <div className="background-grid">
                    {BACKGROUNDS.filter(
                      (b) =>
                        familyFilter === "all" || b.family === familyFilter,
                    ).map((b) => (
                      <button
                        key={b.id}
                        aria-pressed={d.background === b.id}
                        onClick={() => update({ background: b.id })}
                      >
                        <span
                          className={`background-sample pattern-${b.pattern}`}
                          style={
                            {
                              "--accent": palette.accent,
                              "--paper": palette.bg,
                              background: b.gradient || palette.bg,
                            } as React.CSSProperties
                          }
                        >
                          <i className="cover-background" />
                        </span>
                        <small>{b.name}</small>
                      </button>
                    ))}
                  </div>
                </details>
              </>
            )}
            {tab === "elements" && (
              <>
                <label className="search-field">
                  <span>⌕</span>
                  <input
                    aria-label="搜索元素"
                    placeholder="搜索山水、科技、书卷…"
                    value={query}
                    onChange={(e) => setQuery(e.target.value)}
                  />
                  {query && (
                    <button aria-label="清空搜索" onClick={() => setQuery("")}>
                      ×
                    </button>
                  )}
                </label>
                <label className="asset-filter">
                  素材类别
                  <select
                    aria-label="素材类别"
                    value={assetGroup}
                    onChange={(e) => {
                      setAssetGroup(e.target.value);
                      setCategory("center");
                    }}
                  >
                    <option value="all">全部素材</option>
                    <option value="3d">3D 与立体材质</option>
                    <option value="water">水纹与海洋</option>
                    <option value="landscape">山水、水墨与雪山</option>
                    <option value="books">图书与图书馆</option>
                    <option value="space">科幻与太空</option>
                    <option value="classic">原版经典</option>
                    <option value="emoji">Emoji</option>
                  </select>
                </label>
                <div className="category-tabs">
                  {categories.map((c) => (
                    <button
                      key={c.id}
                      aria-pressed={category === c.id}
                      onClick={() => setCategory(c.id)}
                    >
                      {c.name}
                      <small>
                        {
                          MOTIFS.filter(
                            (m) => m.category === c.id && matchesAsset(m),
                          ).length
                        }
                      </small>
                    </button>
                  ))}
                </div>
                <div className="element-grid">
                  {shownMotifs.map((m) => (
                    <button
                      key={m.id}
                      aria-pressed={d.elements.includes(m.id)}
                      className={d.elements.includes(m.id) ? "selected" : ""}
                      onClick={() => toggleMotif(m.id)}
                    >
                      <div>
                        <MotifArt
                          id={m.id}
                          color={palette.accent}
                          thumbnail
                          mode={d.visualMode}
                        />
                      </div>
                      <span>{m.name}</span>
                      {d.elements.includes(m.id) && <i>✓</i>}
                    </button>
                  ))}
                </div>
                {!shownMotifs.length && (
                  <div className="empty-state">
                    还没找到这个意象。
                    <br />
                    试试“山”“月”“数据”，或切换分类。
                  </div>
                )}
                <div className="section-label">
                  画面中的元素
                  <button
                    className="text-button"
                    disabled={!d.elements.length}
                    onClick={() =>
                      update({
                        elements: [],
                        hiddenElements: [],
                        showBook: false,
                        showTemplateArt: false,
                        classicElements: {
                          center: "none",
                          side: "none",
                          sky: "none",
                          bottom: "none",
                        },
                      })
                    }
                  >
                    清空
                  </button>
                </div>
                <LayerPanel design={d} onChange={update} onAdd={openElements} />
                {range("artOpacity", "元素浓度", 10, 100, "%")}
                {range("artScale", "元素大小", 60, 140, "%")}
                <div className="quiet-note">
                  同一位置可叠加多个元素。选中主题后，可逐层隐藏、删除、替换，也可以继续添加。
                </div>
              </>
            )}
          </div>
          <footer className="editor-footer">
            <span>创作会自动保存在此浏览器</span>
            <button
              className="text-button"
              onClick={() => {
                update(INITIAL);
                setMessage("已恢复初始设计，可撤销。");
              }}
            >
              重新开始
            </button>
          </footer>
        </aside>
        <main className="preview-area">
          <div className="preview-top">
            <div>
              <h2>
                让灵感，慢慢成形<span>实时预览</span>
              </h2>
            </div>
            <div className="history-actions">
              <button
                aria-label="撤销"
                title="撤销 ⌘Z"
                disabled={!history.past.length}
                onClick={undo}
              >
                ↶
              </button>
              <button
                aria-label="重做"
                title="重做 ⇧⌘Z"
                disabled={!history.future.length}
                onClick={redo}
              >
                ↷
              </button>
            </div>
          </div>
          {hasOverflow && (
            <p className="overflow-notice" role="status">
              文案超出安全区域，请精简文字、减少换行或调小字号。
            </p>
          )}
          <div className="canvas-stage" ref={stageRef}>
            <div className="canvas-meta">
              <span>
                {COMPOSITIONS.find((c) => c.id === d.composition)?.name ||
                  activeLayout.name}
              </span>
              <span>公众号头图 · 2.35 : 1</span>
            </div>
            <div
              className="scaled-canvas"
              style={{ width: 1000 * scale, height: 426 * scale }}
            >
              <div
                style={{
                  width: 1000,
                  height: 426,
                  transform: `scale(${scale})`,
                  transformOrigin: "top left",
                }}
              >
                <CoverCanvas
                  ref={canvasRef}
                  design={d}
                  onOverflow={setHasOverflow}
                />
              </div>
              {crop && (
                <div className="square-crop" aria-label="方图裁切区域" />
              )}
            </div>
            <div className="canvas-toolbar">
              <span>
                {Math.round(scale * 100)}%<i />
                2000 × 852 px · PNG
              </span>
              <label>
                <input
                  type="checkbox"
                  checked={d.showGuides}
                  onChange={(e) => update({ showGuides: e.target.checked })}
                />
                安全线
              </label>
              <label>
                <input
                  type="checkbox"
                  checked={crop}
                  onChange={(e) => setCrop(e.target.checked)}
                />
                方图裁切
              </label>
            </div>
          </div>
          <div className="below-canvas">
            <WeChatPreview design={d} onChange={update} />
            <section className="layer-panel">
              <header>
                <h3>当前主题与图层</h3>
                <button onClick={() => setShowLayers(!showLayers)}>
                  {showLayers ? "收起面板" : "展开面板"}
                </button>
              </header>
              {showLayers && (
                <LayerPanel design={d} onChange={update} onAdd={openElements} />
              )}
            </section>
          </div>
          <div className="preview-bottom">
            <span>
              {FAMILIES.length} 类风格 · {COMPOSITIONS.length} 种独立排版 ·{" "}
              {MOTIFS.length} 个意象
            </span>
            <span>在方寸之间，认真表达。</span>
          </div>
        </main>
      </div>
      <button
        className="mobile-toggle"
        onClick={() => setMobilePanel(!mobilePanel)}
      >
        {mobilePanel ? "查看画布 ↗" : "打开编辑器 ☷"}
      </button>
      {message && (
        <div className="toast" role="status">
          {message}
          <button aria-label="关闭提示" onClick={() => setMessage("")}>
            ×
          </button>
        </div>
      )}
    </div>
  );
}
export default App;
