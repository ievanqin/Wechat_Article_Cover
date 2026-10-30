import { useState, useRef, useEffect } from "react";
import { CoverCanvas } from "./CoverCanvas";
import type { Design } from "./catalog";
export function WeChatPreview({
  design: d,
  onChange,
}: {
  design: Design;
  onChange: (patch: Partial<Design>) => void;
}) {
  const [mode, setMode] = useState<"single" | "multi" | "square">("single");
  const phoneRef = useRef<HTMLDivElement>(null);
  const [previewWidth, setPreviewWidth] = useState(320);
  useEffect(() => {
    const node = phoneRef.current;
    if (!node) return;
    const ro = new ResizeObserver(() => setPreviewWidth(node.clientWidth));
    ro.observe(node);
    return () => ro.disconnect();
  }, []);
  const title = d.articleTitle || d.title.replace(/\n/g, "");
  const cover = (
    <div
      className="wechat-cover-scaled"
      style={{ transform: `scale(${previewWidth / 1000})` }}
    >
      <CoverCanvas design={d} preview />
    </div>
  );
  return (
    <section className="wechat-preview">
      <h3>微信公众号预览</h3>
      <div className="wechat-modes" aria-label="微信预览方式">
        {(
          [
            ["single", "单图文"],
            ["multi", "多图文叠题"],
            ["square", "次条方图"],
          ] as const
        ).map(([id, label]) => (
          <button
            key={id}
            aria-pressed={mode === id}
            onClick={() => setMode(id)}
          >
            {label}
          </button>
        ))}
      </div>
      <label className="wechat-title-input">
        推文标题（仅用于模拟预览）
        <input
          value={d.articleTitle}
          onChange={(e) => onChange({ articleTitle: e.target.value })}
          maxLength={120}
          placeholder="默认跟随封面主标题，可测试长标题"
        />
      </label>
      <div ref={phoneRef} className={`wechat-phone mode-${mode}`}>
        <div className="wechat-account">
          <i>豆</i>
          <b>{d.brand || "我的公众号"}</b>
          <span>刚刚</span>
        </div>
        {mode === "single" ? (
          <div className="wechat-message">
            <div
              className="wechat-hero"
              style={{ width: previewWidth, height: previewWidth * 0.426 }}
            >
              {cover}
            </div>
            <div className="wechat-single-caption">
              <b>{title}</b>
              <small>{d.subtitle}</small>
            </div>
          </div>
        ) : mode === "multi" ? (
          <div className="wechat-message">
            <div
              className="wechat-hero"
              style={{ width: previewWidth, height: previewWidth * 0.426 }}
            >
              {cover}
              <div className="wechat-title-overlay">
                <b>{title}</b>
              </div>
            </div>
            <div className="wechat-secondary">
              <span>本期延伸阅读：从一本书，读懂一个世界</span>
              <div className="wechat-square">{cover}</div>
            </div>
            <div className="wechat-secondary">
              <span>编辑手记：那些值得再次翻开的书页</span>
              <div className="wechat-square">{cover}</div>
            </div>
          </div>
        ) : (
          <div className="wechat-message">
            <div className="wechat-secondary">
              <span>{title}</span>
              <div className="wechat-square">{cover}</div>
            </div>
          </div>
        )}
        <footer>
          {mode === "multi"
            ? "首条标题叠图，下方模拟次条方形封面"
            : mode === "square"
              ? "中心方图裁切 · 检查文字与主体是否完整"
              : "单图文 · 标题置于封面下方"}
        </footer>
      </div>
      <p className="wechat-disclaimer">
        模拟常见卡片样式，微信版本和展示入口可能不同；请以公众号后台预览及手机实际效果为准。叠加标题不会写入导出图片。
      </p>
    </section>
  );
}
