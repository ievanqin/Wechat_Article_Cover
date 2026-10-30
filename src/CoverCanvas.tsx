import { SurfacePattern, coverFill } from "./SurfaceArt";
import { AidouBrandBadge } from "./BrandBadge";
import { ClassicScene, ClassicMotif } from "./ClassicScene";
import { RichScene } from "./RichScene";
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
    if (!copy || !title) {
      onOverflow?.(false);
      return;
    }
    title.style.fontSize = "";
    let size = parseFloat(getComputedStyle(title).fontSize);
    while (
      size > 18 &&
      (copy.scrollHeight > copy.clientHeight + 1 ||
        (d.layout === "song-0" && title.scrollHeight > title.clientHeight + 6))
    ) {
      size -= 1;
      title.style.setProperty("font-size", `${size}px`, "important");
    }
    onOverflow?.(
      copy.scrollHeight > copy.clientHeight + 2 ||
        (d.layout === "song-0" && title.scrollHeight > title.clientHeight + 6),
    );
  }, [d, onOverflow]);
  const p = PALETTES.find((p) => p.id === d.palette) || PALETTES[0];
  const layout = LAYOUTS.find((l) => l.id === d.layout) || LAYOUTS[0];
  const bg = BACKGROUNDS.find((b) => b.id === d.background) || BACKGROUNDS[0];
  const family = d.family;
  const free = d.composition !== "legacy";
  const fill = coverFill(d, p.bg);
  const classic = !free && layout.family === "classic";
  const variant = free
    ? 0
    : layout.variant % (layout.family === "classic" ? 12 : 6);
  return (
    <div
      data-composition={d.composition}
      data-fill-mode={d.fillMode}
      ref={ref}
      id={preview ? undefined : "wechat-cover-canvas"}
      className={`cover-canvas family-${family} composition-${variant} font-${d.font} visual-${d.visualMode} brand-${d.brandPosition} pattern-${bg.pattern} texture-${bg.family}`}
      style={
        {
          "--paper": p.bg,
          "--ink": p.ink,
          "--accent": p.accent,
          "--muted": p.muted,
          "--title-size": `${d.titleSize}px`,
          "--tracking": `${d.tracking}px`,
          "--art-opacity": d.artOpacity / 100,
          "--art-scale": d.artScale / 100,
          backgroundColor: p.bg,
          background: fill || p.bg,
          color: p.ink,
        } as React.CSSProperties
      }
    >
      {classic ? (
        <div className="classic-canvas-scene">
          <ClassicScene
            design={{
              ...d,
              classicElements: {
                center: "none",
                side: "none",
                sky: "none",
                bottom: "none",
              },
            }}
          />
        </div>
      ) : (
        <>
          {" "}
          <div
            className={`cover-background tint-${bg.tint}`}
            style={
              fill
                ? { display: "none" }
                : bg.gradient
                  ? { background: bg.gradient, opacity: 1 }
                  : undefined
            }
          />
          {d.ornament && (
            <div className="cover-decoration" aria-hidden="true">
              <span />
              <span />
              <span />
            </div>
          )}
          <div className="cover-topline">
            <span />
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
            <span />
            {d.footerText && <span>{d.footerText}</span>}
          </div>
        </>
      )}
      {d.watermarkVisible && (
        <SurfacePattern
          kind={d.watermark}
          color={d.watermarkColor || p.accent}
          opacity={d.watermarkOpacity / 100}
          scale={d.watermarkScale}
        />
      )}
      {d.showThemeArtwork && (
        <div
          className="artwork-layer"
          style={{
            opacity: d.artOpacity / 100,
            transform: `scale(${d.artScale / 100})`,
          }}
        >
          {d.elements
            .filter((id) => !d.hiddenElements.includes(id))
            .map((id) => (
              <div
                className="editable-art-layer"
                data-layer-id={id}
                key={id}
                style={{
                  transform: `translate(${d.layerTransforms[id]?.x || 0}px,${d.layerTransforms[id]?.y || 0}px) scale(${(d.layerTransforms[id]?.scale || 100) / 100})`,
                  transformOrigin: "80% 50%",
                }}
              >
                {id.startsWith("original:") ? (
                  <ClassicMotif
                    id={id}
                    design={{ ...d, artOpacity: 100, artScale: 100 }}
                  />
                ) : (
                  <MotifArt id={id} color={p.accent} mode={d.visualMode} />
                )}
              </div>
            ))}
        </div>
      )}
      {d.showBrand && (
        <div className="brand-layer">
          <AidouBrandBadge
            position={d.brandPosition}
            theme={d.brandTheme}
            brand={d.brand}
          />
        </div>
      )}
      {d.showGuides && !preview && (
        <div className="safe-guides" data-export-ignore="true">
          <span>安全区域</span>
          <i />
        </div>
      )}
    </div>
  );
});
