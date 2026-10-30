import { forwardRef, useLayoutEffect, useRef } from "react";
import {
  BACKGROUNDS,
  FAMILIES,
  LAYOUTS,
  PALETTES,
  type Design,
} from "./catalog";
import { MotifArt } from "./Artwork";

export const CoverCanvas = forwardRef<
  HTMLDivElement,
  { design: Design; preview?: boolean; onOverflow?: (value: boolean) => void }
>(function CoverCanvas({ design: d, preview = false, onOverflow }, ref) {
  const copyRef = useRef<HTMLDivElement>(null);
  useLayoutEffect(() => {
    const copy = copyRef.current;
    const title = copy?.querySelector<HTMLElement>(".cover-title");
    if (!copy || !title) return;
    title.style.fontSize = "";
    let size = parseFloat(getComputedStyle(title).fontSize);
    while (
      size > 18 &&
      (copy.scrollHeight > copy.clientHeight + 1 ||
        (d.layout === "song-0" && title.scrollHeight > title.clientHeight + 6))
    ) {
      size -= 1;
      title.style.fontSize = `${size}px`;
    }
    onOverflow?.(
      copy.scrollHeight > copy.clientHeight + 2 ||
        (d.layout === "song-0" && title.scrollHeight > title.clientHeight + 6),
    );
  }, [d, onOverflow]);
  const p = PALETTES.find((p) => p.id === d.palette) || PALETTES[0];
  const layout = LAYOUTS.find((l) => l.id === d.layout) || LAYOUTS[0];
  const bg = BACKGROUNDS.find((b) => b.id === d.background) || BACKGROUNDS[0];
  const family = layout.family;
  const variant = layout.variant;
  return (
    <div
      ref={ref}
      id={preview ? undefined : "wechat-cover-canvas"}
      className={`cover-canvas family-${family} composition-${variant} font-${d.font} pattern-${bg.pattern} texture-${bg.family}`}
      style={
        {
          "--paper": p.bg,
          "--ink": p.ink,
          "--accent": p.accent,
          "--muted": p.muted,
          "--title-size": `${d.titleSize}px`,
          "--tracking": `${d.tracking}px`,
          "--art-opacity": d.artOpacity / 100,
          backgroundColor: p.bg,
          color: p.ink,
        } as React.CSSProperties
      }
    >
      <div className={`cover-background tint-${bg.tint}`} />
      <div className="cover-decoration" aria-hidden="true">
        <span />
        <span />
        <span />
      </div>
      <div
        className="artwork-layer"
        style={{
          opacity: d.artOpacity / 100,
          transform: `scale(${d.artScale / 100})`,
        }}
      >
        {d.elements.map((id) => (
          <MotifArt key={id} id={id} color={p.accent} />
        ))}
      </div>
      <div className="cover-topline">
        {d.showBrand ? (
          <span className="cover-brand">
            <b>豆</b>
            {d.brand}
          </span>
        ) : (
          <span />
        )}
        <span>{d.issue}</span>
      </div>
      <div className="cover-copy" ref={copyRef}>
        <div className="cover-eyebrow">{d.eyebrow}</div>
        <h2 className="cover-title">{d.title || "写下你的标题"}</h2>
        <div className="cover-rule" />
        <p className="cover-subtitle">{d.subtitle}</p>
        <div className="cover-author">{d.author}</div>
      </div>
      <div className="cover-bottomline">
        <span>{FAMILIES.find((f) => f.id === family)?.en}</span>
        <span>
          {family === "tech"
            ? "SYSTEM / READING / 026"
            : "一页一世界 · 阅读有回响"}
        </span>
      </div>
      {d.showGuides && !preview && (
        <div className="safe-guides" data-export-ignore="true">
          <span>安全区域</span>
          <i />
        </div>
      )}
    </div>
  );
});
