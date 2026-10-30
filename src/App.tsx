import { CLASSIC_BOOKS } from "./ClassicScene";
import { AidouBrandBadge } from "./BrandBadge";
import { useCallback, useEffect, useRef, useState } from "react";
import { domToPng } from "modern-screenshot";
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
    for (const key of [
      "title",
      "subtitle",
      "eyebrow",
      "author",
      "brand",
      "issue",
      "quote",
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
        .slice(0, 4);
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
    if (v.font === "serif" || v.font === "sans") d.font = v.font;
    if (["top-left", "top-right", "bottom-left"].includes(v.brandPosition))
      d.brandPosition = v.brandPosition;
    if (["gold-dark", "ivory-crimson", "frosted-glass"].includes(v.brandTheme))
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
    hint: `${LAYOUTS.length} 种排版灵感`,
  },
  { id: "theme", name: "主题", icon: "◐", hint: "色彩与背景" },
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
function App() {
  const [history, setHistory] = useState<{
    past: Design[];
    present: Design;
    future: Design[];
  }>(() => ({ past: [], present: readDraft(), future: [] }));
  const d = history.present;
  const [tab, setTab] = useState<Tab>("copy");
  const [familyFilter, setFamilyFilter] = useState<Family | "all">("all");
  const [category, setCategory] =
    useState<(typeof categories)[number]["id"]>("center");
  const [themeFilter, setThemeFilter] = useState<
    "all" | "classic" | "category" | "modern"
  >("all");
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
    update({ ...PRESETS[family], family });
    setFamilyFilter(family);
  };
  const toggleMotif = (id: string) => {
    const target = MOTIFS.find((m) => m.id === id);
    if (!target) return;
    const active = d.elements.includes(id);
    const patch: Partial<Design> = {
      elements: active
        ? d.elements.filter((x) => x !== id)
        : [
            ...d.elements.filter(
              (x) =>
                MOTIFS.find((m) => m.id === x)?.category !== target.category,
            ),
            id,
          ],
    };
    if (d.family === "classic")
      patch.classicElements = {
        ...d.classicElements,
        [target.category]: active
          ? "none"
          : id.startsWith("original:")
            ? id.slice(9)
            : "none",
      };
    update(patch);
  };
  async function download() {
    if (!canvasRef.current || exporting.current) return;
    exporting.current = true;
    setBusy(true);
    setMessage("");
    try {
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
  const shownMotifs = MOTIFS.filter(
    (m) =>
      m.category === category &&
      (!query ||
        `${m.name} ${m.tag || ""} ${FAMILIES.find((f) => f.id === m.family)?.name}`.includes(
          query,
        )),
  );
  const field = (
    key:
      "title" | "subtitle" | "eyebrow" | "author" | "brand" | "issue" | "quote",
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
    key: "titleSize" | "tracking" | "artOpacity" | "artScale" | "subtitleSize",
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
            <span className="edition">YOUR LITTLE STUDIO</span>
          </div>
          <nav className="editor-tabs" aria-label="编辑步骤">
            {TABS.map((t) => (
              <button
                key={t.id}
                aria-pressed={tab === t.id}
                onClick={() => setTab(t.id)}
              >
                <b>{t.icon}</b>
                {t.name}
              </button>
            ))}
          </nav>
          <div className="panel-scroll">
            <div className="panel-heading">
              <span className="overline">
                0{TABS.findIndex((t) => t.id === tab) + 1} / MAKE IT YOURS
              </span>
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
                <div className="section-label">字体与节奏</div>
                <div className="segmented">
                  <button
                    aria-pressed={d.font === "serif"}
                    onClick={() => update({ font: "serif" })}
                  >
                    宋体 · 书卷感
                  </button>
                  <button
                    aria-pressed={d.font === "sans"}
                    onClick={() => update({ font: "sans" })}
                  >
                    黑体 · 现代感
                  </button>
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
                <div className="filter-row">
                  <button
                    aria-pressed={familyFilter === "all"}
                    onClick={() => setFamilyFilter("all")}
                  >
                    全部 {LAYOUTS.length}
                  </button>
                  {FAMILIES.map((f) => (
                    <button
                      key={f.id}
                      aria-pressed={familyFilter === f.id}
                      onClick={() => setFamilyFilter(f.id)}
                    >
                      {f.name}
                    </button>
                  ))}
                </div>
                <div className="layout-grid">
                  {LAYOUTS.filter(
                    (l) => familyFilter === "all" || l.family === familyFilter,
                  ).map((l) => (
                    <button
                      key={l.id}
                      className={`layout-card ${d.layout === l.id ? "selected" : ""}`}
                      aria-pressed={d.layout === l.id}
                      onClick={() => update({ layout: l.id, family: l.family })}
                    >
                      <div
                        className={`layout-mini mini-${l.variant} mini-family-${l.family}`}
                      >
                        <i />
                        <span />
                        <b />
                        <em />
                      </div>
                      <span>
                        {l.name}
                        <small>
                          {d.layout === l.id
                            ? "✓"
                            : String(l.variant + 1).padStart(2, "0")}
                        </small>
                      </span>
                    </button>
                  ))}
                </div>
                <div className="quiet-note">
                  只切换构图会保留当前文案、配色和元素。主题页可一键应用整套风格。
                </div>
              </>
            )}
            {tab === "theme" && (
              <>
                <div className="section-label">
                  整套风格<span>组合构图、色彩与意象</span>
                </div>
                <div className="filter-row theme-filter">
                  {(
                    [
                      ["all", "全部风格"],
                      ["classic", "原版经典"],
                      ["category", "图书分类"],
                      ["modern", "现代风格"],
                    ] as const
                  ).map(([id, name]) => (
                    <button
                      key={id}
                      aria-pressed={themeFilter === id}
                      onClick={() => setThemeFilter(id)}
                    >
                      {name}
                    </button>
                  ))}
                </div>
                <div className="family-grid">
                  {FAMILIES.filter(
                    (f, i) =>
                      themeFilter === "all" ||
                      (themeFilter === "classic"
                        ? f.id === "classic"
                        : themeFilter === "modern"
                          ? i < 6
                          : i > 6),
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
                            elements: [],
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
                  视觉表现<span>同样的元素，不同的质感</span>
                </div>
                <div className="segmented">
                  {(
                    [
                      ["line", "清简线描"],
                      ["painted", "填色浮雕"],
                      ["luminous", "光影辉光"],
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
                <label className="ornament-toggle">
                  <input
                    type="checkbox"
                    checked={d.ornament}
                    onChange={(e) => update({ ornament: e.target.checked })}
                  />
                  装帧增强 · 金线边框、角花与星尘
                </label>
                <div className="section-label">
                  主题颜色<span>{PALETTES.length} 套可混搭</span>
                </div>
                <div className="palette-grid">
                  {PALETTES.map((p) => (
                    <button
                      key={p.id}
                      aria-label={p.name}
                      title={p.name}
                      aria-pressed={d.palette === p.id}
                      className={d.palette === p.id ? "selected" : ""}
                      onClick={() => update({ palette: p.id })}
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
                <div className="section-label">
                  背景肌理<span>{BACKGROUNDS.length} 种 · 全部本地绘制</span>
                </div>
                <div className="filter-row">
                  <button
                    aria-pressed={familyFilter === "all"}
                    onClick={() => setFamilyFilter("all")}
                  >
                    全部
                  </button>
                  {FAMILIES.map((f) => (
                    <button
                      key={f.id}
                      aria-pressed={familyFilter === f.id}
                      onClick={() => setFamilyFilter(f.id)}
                    >
                      {f.name}
                    </button>
                  ))}
                </div>
                <div className="background-grid">
                  {BACKGROUNDS.filter(
                    (b) => familyFilter === "all" || b.family === familyFilter,
                  ).map((b) => (
                    <button
                      key={b.id}
                      aria-pressed={d.background === b.id}
                      onClick={() => update({ background: b.id })}
                      className={d.background === b.id ? "selected" : ""}
                    >
                      <span
                        className={`background-sample pattern-${b.pattern} texture-${b.family}`}
                        style={
                          {
                            "--accent": palette.accent,
                            "--paper": palette.bg,
                            background: b.gradient || palette.bg,
                          } as React.CSSProperties
                        }
                      >
                        <i className="cover-background" />
                        {d.background === b.id && <b>✓</b>}
                      </span>
                      <small>{b.name}</small>
                    </button>
                  ))}
                </div>
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
                <div className="category-tabs">
                  {categories.map((c) => (
                    <button
                      key={c.id}
                      aria-pressed={category === c.id}
                      onClick={() => setCategory(c.id)}
                    >
                      {c.name}
                      <small>
                        {MOTIFS.filter((m) => m.category === c.id).length}
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
                <div className="selected-elements">
                  {d.elements.length ? (
                    d.elements.map((id) => (
                      <button
                        key={id}
                        onClick={() => toggleMotif(id)}
                        title="点击移除"
                      >
                        {MOTIFS.find((m) => m.id === id)?.name}
                        <span>×</span>
                      </button>
                    ))
                  ) : (
                    <p>纯文字也很好看，试着留一点白。</p>
                  )}
                </div>
                {range("artOpacity", "元素浓度", 10, 100, "%")}
                {range("artScale", "元素大小", 60, 140, "%")}
                <div className="quiet-note">
                  每个位置可选 1 个元素，最多组合 4 层。再次点击即可移除。
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
              <span className="overline">THE CANVAS</span>
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
              <span>{activeLayout.name}</span>
              {d.family !== "classic" && (
                <button
                  className="classic-return"
                  onClick={() => applyFamily("classic")}
                >
                  ↶ 回到原版经典
                </button>
              )}
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
            <div className="reading-preview">
              <span className="overline">IN THE FEED</span>
              <h3>出现在读者眼前</h3>
              <p>看看封面在消息卡片里的实际阅读感受。</p>
              <div className="feed-card">
                <div className="feed-cover">
                  <div
                    style={{
                      width: 1000,
                      height: 426,
                      transform: "scale(.28)",
                      transformOrigin: "top left",
                    }}
                  >
                    <CoverCanvas design={d} preview />
                  </div>
                </div>
                <div className="feed-text">
                  <b>{d.title.replace(/\n/g, "")}</b>
                  <small>
                    {d.brand || "你的公众号"}
                    <span>刚刚</span>
                  </small>
                </div>
              </div>
            </div>
            <div className="design-note">
              <span className="note-symbol">✳</span>
              <span className="overline">A LITTLE DESIGN NOTE</span>
              <h3>让好书，自带光芒。</h3>
              <p>
                原版装帧与新的灵感，
                <br />
                为每一种阅读偏好，
                <br />
                找到属于它的视觉语言。
              </p>
              <span className="note-rule" />
              <small>DESIGNED FOR YOUR WORDS</small>
            </div>
          </div>
          <div className="preview-bottom">
            <span>
              {FAMILIES.length} 类风格 · {LAYOUTS.length} 种构图 ·{" "}
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
