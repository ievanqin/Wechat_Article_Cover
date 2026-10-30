export type BrandPosition = "top-left" | "top-right" | "bottom-left";
export type BrandTheme =
  | "gold-dark"
  | "ivory-crimson"
  | "frosted-glass"
  | "ruby-seal"
  | "jade-ink"
  | "cyber-neon"
  | "platinum"
  | "sunset"
  | "sticker";
export function AidouBrandBadge({
  position,
  theme,
  brand = "爱豆书单",
}: {
  position: BrandPosition;
  brand?: string;
  theme: BrandTheme;
}) {
  const posClasses: Record<BrandPosition, string> = {
    "top-left": "top-[6.5%] left-[4.2%]",
    "top-right": "top-[6.5%] right-[4.2%]",
    "bottom-left": "bottom-[7.5%] left-[4.2%]",
  };

  const themeStyles: Record<
    BrandTheme,
    {
      wrapper: string;
      iconBg: string;
      title: string;
      sub: string;
    }
  > = {
    "gold-dark": {
      wrapper:
        "bg-[#0b0e14]/95 border border-[#e5a93c]/60 shadow-[0_8px_28px_rgba(0,0,0,0.65)]",
      iconBg:
        "bg-gradient-to-br from-[#f6d365] via-[#e5a93c] to-[#b47615] text-[#0b0e14]",
      title: "text-[#fdf6e7]",
      sub: "text-[#e5a93c]",
    },
    "ivory-crimson": {
      wrapper:
        "bg-[#F9F6F0]/95 border border-[#8B1E1E]/40 shadow-[0_8px_24px_rgba(0,0,0,0.5)]",
      iconBg: "bg-[#8B1E1E] text-[#F9F6F0]",
      title: "text-[#1c1917]",
      sub: "text-[#8B1E1E]",
    },
    "frosted-glass": {
      wrapper:
        "bg-[#1e293b]/90 border border-white/35 shadow-[0_8px_30px_rgba(0,0,0,0.45)]",
      iconBg: "bg-white text-slate-900",
      title: "text-white",
      sub: "text-amber-300",
    },
    "ruby-seal": {
      wrapper: "brand-extra brand-ruby-seal",
      iconBg: "brand-icon-ruby-seal",
      title: "brand-title-ruby-seal",
      sub: "brand-sub-ruby-seal",
    },
    "jade-ink": {
      wrapper: "brand-extra brand-jade-ink",
      iconBg: "brand-icon-jade-ink",
      title: "brand-title-jade-ink",
      sub: "brand-sub-jade-ink",
    },
    "cyber-neon": {
      wrapper: "brand-extra brand-cyber-neon",
      iconBg: "brand-icon-cyber-neon",
      title: "brand-title-cyber-neon",
      sub: "brand-sub-cyber-neon",
    },
    platinum: {
      wrapper: "brand-extra brand-platinum",
      iconBg: "brand-icon-platinum",
      title: "brand-title-platinum",
      sub: "brand-sub-platinum",
    },
    sunset: {
      wrapper: "brand-extra brand-sunset",
      iconBg: "brand-icon-sunset",
      title: "brand-title-sunset",
      sub: "brand-sub-sunset",
    },
    sticker: {
      wrapper: "brand-extra brand-sticker",
      iconBg: "brand-icon-sticker",
      title: "brand-title-sticker",
      sub: "brand-sub-sticker",
    },
  };

  const st = themeStyles[theme] || themeStyles["gold-dark"];

  return (
    <div
      data-brand-theme={theme}
      className={`absolute z-30 ${posClasses[position]} flex items-center gap-2.5 rounded-full pl-1.5 pr-4 py-1.5 ${st.wrapper}`}
    >
      {/* 品牌星芒书页徽标 */}
      <div
        className={`w-8 h-8 rounded-full flex items-center justify-center shrink-0 shadow-inner ${st.iconBg}`}
      >
        <svg
          viewBox="0 0 24 24"
          className="w-4 h-4"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
        >
          <path
            d="M4 19.5v-15A2.5 2.5 0 0 1 6.5 2H19a1 1 0 0 1 1 1v18a1 1 0 0 1-1 1H6.5a2.5 2.5 0 0 1 0-5H20"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <path
            d="M12 6.5l1.1 2.4 2.4 1.1-2.4 1.1-1.1 2.4-1.1-2.4-2.4-1.1 2.4-1.1L12 6.5z"
            fill="currentColor"
            stroke="none"
          />
        </svg>
      </div>

      {/* 品牌主视觉字样 */}
      <div className="flex flex-col leading-none pr-1">
        <div className="flex items-center gap-1.5">
          <span
            className={`font-serif-sc font-black tracking-wider text-sm ${st.title}`}
          >
            {brand}
          </span>
        </div>
        <span
          className={`text-[9px] font-cinzel tracking-[0.18em] mt-0.5 font-semibold ${st.sub}`}
        >
          IDOL BOOKLIST
        </span>
      </div>
    </div>
  );
}
