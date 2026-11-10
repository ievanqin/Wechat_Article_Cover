import { SurfacePattern, coverFill } from "./SurfaceArt";
import { AidouBrandBadge } from "./BrandBadge";
import { ClassicScene, ClassicMotif } from "./ClassicScene";
import { RichScene } from "./RichScene";
import { forwardRef, useLayoutEffect, useRef } from "react";
import {
  COMPOSITIONS,
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
  const rootRef = useRef<HTMLDivElement>(null);
  useLayoutEffect(() => {
    for(const [key,value] of Object.entries(d.textSizes)){const text=String(d[key as keyof Design]||"").trim();if(text)rootRef.current?.querySelectorAll<HTMLElement>(".classic-canvas-scene *").forEach(node=>{if(!node.childElementCount&&node.textContent?.trim()===text)node.style.setProperty("font-size",value+"px","important");});}
    const copy = copyRef.current;
    const title = copy?.querySelector<HTMLElement>(".cover-title");
    for(const [key,selector] of Object.entries({subtitle:".cover-subtitle",eyebrow:".cover-eyebrow",author:".cover-author"})){const node=copy?.querySelector<HTMLElement>(selector);if(node&&d.textSizes[key])node.style.setProperty("font-size",d.textSizes[key]+"px","important");}

    if (!copy || !title) {
      onOverflow?.(false);
      return;
    }
    title.style.fontSize = "";
    title.style.setProperty("font-size", `${d.titleSize}px`, "important");
    let size = d.titleSize;
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
  useLayoutEffect(()=>{
    const root=rootRef.current;if(!root)return;
    const centered=COMPOSITIONS.some(c=>c.id===d.composition&&c.group==="居中");
    root.querySelectorAll<HTMLElement>(".art-center-normalizer").forEach(node=>{
      node.style.transform="none";
      if(!centered)return;
      const layer=node.parentElement!;const width=layer.getBoundingClientRect().width;if(!width)return;
      const points:DOMPoint[]=[];
      node.querySelectorAll<SVGSVGElement>("svg").forEach(svg=>{if(svg.parentElement?.closest("svg"))return;try{const b=svg.getBBox(),m=svg.getScreenCTM();if(!m||!b.width)return;for(const [x,y] of [[b.x,b.y],[b.x+b.width,b.y],[b.x,b.y+b.height],[b.x+b.width,b.y+b.height]])points.push(new DOMPoint(x,y).matrixTransform(m));}catch{/* Invisible SVGs can have no measurable geometry. */}});
      if(!points.length)return;
      const left=Math.min(...points.map(p=>p.x)),right=Math.max(...points.map(p=>p.x));
      const box=root.getBoundingClientRect();const id=layer.dataset.layerId||"";
      const scale=(d.layerTransforms[id]?.scale||100)/100;
      const parentScale=width/1000/scale;
      const target=box.left+box.width/2+(d.layerTransforms[id]?.x||0)*parentScale;
      node.style.transform=`translateX(${(target-(left+right)/2)/(width/1000)}px)`;
    });
  },[d]);
  const p = PALETTES.find((p) => p.id === d.palette) || PALETTES[0];
  const layout = LAYOUTS.find((l) => l.id === d.layout) || LAYOUTS[0];
  const bg = BACKGROUNDS.find((b) => b.id === d.background) || BACKGROUNDS[0];
  const family = d.family;
  const free = d.composition !== "legacy";
  const fill = coverFill(d, p.bg);
  const classic = !free && family === "classic" && layout.family === "classic";
  const variant = free
    ? 0
    : layout.variant % (layout.family === "classic" ? 12 : 6);
  return (
    <div
      data-composition={d.composition}
      data-fill-mode={d.fillMode}
      data-background-visible={d.showBackground}
      data-decoration-visible={d.showTemplateArt && d.ornament}
      ref={node=>{rootRef.current=node;if(typeof ref==="function")ref(node);else if(ref)ref.current=node;}}
      id={preview ? undefined : "wechat-cover-canvas"}
      className={`cover-canvas family-${family} composition-${variant} font-${d.font} visual-${d.visualMode} brand-${d.brandPosition} pattern-${bg.pattern} texture-${bg.family}`}
      style={
        {
          ...Object.fromEntries(Object.entries(d.textSizes).map(([k,v])=>["--text-"+k,v+"px"])),
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
                <div className="art-center-normalizer">
                {id.startsWith("original:") ? (
                  <ClassicMotif
                    id={id}
                    design={{ ...d, artOpacity: 100, artScale: 100 }}
                  />
                ) : (
                  <MotifArt id={id} color={p.accent} mode={d.visualMode} />
                )}
                </div>
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
