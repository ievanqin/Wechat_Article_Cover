import { useState } from "react";
import { FAMILIES, MOTIFS, type Design } from "./catalog";
export function LayerPanel({
  design: d,
  onChange,
  onAdd,
}: {
  design: Design;
  onChange: (patch: Partial<Design>) => void;
  onAdd: () => void;
}) {
  const [adjusting, setAdjusting] = useState<string | null>(null);
  const remove = (id: string) =>
    onChange({
      elements: d.elements.filter((x) => x !== id),
      hiddenElements: d.hiddenElements.filter((x) => x !== id),
    });
  const replace = (id: string, next: string) => {
    if (!next) return;
    onChange({
      elements: [...new Set(d.elements.map((x) => (x === id ? next : x)))],
      hiddenElements: d.hiddenElements.filter((x) => x !== id && x !== next),
      showThemeArtwork: true,
    });
  };
  const row = (
    name: string,
    visible: boolean,
    toggle: () => void,
    key: string,
    removable = false,
  ) => (
    <div
      className={`layer-row ${visible ? "is-visible" : "is-hidden"}`}
      key={key}
    >
      <div className="layer-info">
        <span className="layer-dot" />
        <span className="layer-name" title={name}>
          {name}
        </span>
        <span className="layer-state">{visible ? "显示中" : "已隐藏"}</span>
      </div>
      <div className="layer-actions">
        <button
          className="layer-eye"
          aria-pressed={visible}
          title={`${visible ? "隐藏" : "显示"}${name}`}
          aria-label={`${visible ? "隐藏" : "显示"}${name}`}
          onClick={toggle}
        >
          <EyeIcon visible={visible} />
        </button>
        {removable && (
          <>
            <button
              aria-label={`调整${name}`}
              onClick={() => setAdjusting(adjusting === key ? null : key)}
            >
              调整
            </button>
            <select
              aria-label={`替换${name}`}
              value=""
              onChange={(e) => replace(key, e.target.value)}
            >
              <option value="">替换</option>
              {MOTIFS.filter((m) => m.id !== key).map((m) => (
                <option key={m.id} value={m.id}>
                  {m.name}
                </option>
              ))}
            </select>
            <button
              className="layer-delete"
              aria-label={`删除${name}`}
              onClick={() => remove(key)}
            >
              ×
            </button>
          </>
        )}
      </div>
    </div>
  );
  return (
    <div className="layer-controls">
      <div className="current-theme">
        <strong>{FAMILIES.find((f) => f.id === d.family)?.name}</strong>
        <button
          aria-label={
            d.showThemeArtwork ? "隐藏全部主题图形" : "显示全部主题图形"
          }
          onClick={() => onChange({ showThemeArtwork: !d.showThemeArtwork })}
        >
          {d.showThemeArtwork ? "图形已显示" : "图形已隐藏"}
        </button>
      </div>
      {d.watermark !== "none" &&
        row(
          "背景图案",
          d.watermarkVisible,
          () => onChange({ watermarkVisible: !d.watermarkVisible }),
          "watermark",
        )}
      {row(
        "品牌徽章",
        d.showBrand,
        () => onChange({ showBrand: !d.showBrand }),
        "brand",
      )}
      {row(
        "装帧边框",
        d.ornament,
        () => onChange({ ornament: !d.ornament }),
        "ornament",
      )}
      {d.family === "classic" && (
        <>
          {row(
            "原版立体书",
            d.showBook,
            () => onChange({ showBook: !d.showBook }),
            "book",
          )}
          {row(
            "构图内置图形",
            d.showTemplateArt,
            () => onChange({ showTemplateArt: !d.showTemplateArt }),
            "template",
          )}
          <select
            className="native-layer-replace"
            aria-label="替换原版主题图形"
            value=""
            onChange={(e) => {
              if (e.target.value)
                onChange({
                  showBook: false,
                  showTemplateArt: false,
                  showThemeArtwork: true,
                  elements: [...new Set([...d.elements, e.target.value])],
                });
            }}
          >
            <option value="">用其它插画替换立体书与构图图形…</option>
            {MOTIFS.map((m) => (
              <option key={m.id} value={m.id}>
                {m.name}
              </option>
            ))}
          </select>
          <p className="layer-hint">
            原版立体书可在主题页更换造型；其它插画可在下方替换。
          </p>
        </>
      )}
      <div className="layer-section-title">
        自由图层 <span>{d.elements.length}</span>
      </div>
      {d.elements.map((id) => (
        <div key={id}>
          {row(
            MOTIFS.find((m) => m.id === id)?.name || id,
            !d.hiddenElements.includes(id),
            () =>
              onChange({
                hiddenElements: d.hiddenElements.includes(id)
                  ? d.hiddenElements.filter((x) => x !== id)
                  : [...d.hiddenElements, id],
              }),
            id,
            true,
          )}
          {adjusting === id && (
            <div className="layer-transform">
              {(
                [
                  ["x", "水平位置", -400, 400],
                  ["y", "垂直位置", -180, 180],
                  ["scale", "图层大小", 40, 160],
                ] as const
              ).map(([key, label, min, max]) => (
                <label key={key}>
                  <span>{label}</span>
                  <input
                    type="range"
                    aria-label={label}
                    min={min}
                    max={max}
                    value={
                      d.layerTransforms[id]?.[key] ??
                      (key === "scale" ? 100 : 0)
                    }
                    onChange={(e) =>
                      onChange({
                        layerTransforms: {
                          ...d.layerTransforms,
                          [id]: {
                            ...(d.layerTransforms[id] ?? {
                              x: 0,
                              y: 0,
                              scale: 100,
                            }),
                            [key]: Number(e.target.value),
                          },
                        },
                      })
                    }
                  />
                </label>
              ))}
            </div>
          )}
        </div>
      ))}
      {!d.elements.length && (
        <p className="layer-empty">还没有插画，添加一个喜欢的元素吧。</p>
      )}
      <button className="layer-add" onClick={onAdd}>
        ＋ 添加元素 / 插画
      </button>
    </div>
  );
}

function EyeIcon({ visible }: { visible: boolean }) {
  return (
    <svg
      width="19"
      height="19"
      viewBox="0 0 24 24"
      aria-hidden="true"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.7"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M2 12s3.5-7 10-7 10 7 10 7-3.5 7-10 7S2 12 2 12Z" />
      <circle cx="12" cy="12" r="3" />
      {!visible && <path d="M3 3L21 21" strokeWidth="2.5" />}
    </svg>
  );
}
