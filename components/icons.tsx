// Ícones desenhados no mesmo traço (2px, cantos retos), no espírito dos cortes do X.
type P = { className?: string; size?: number; stroke?: number };

const base = (size = 20, stroke = 2.2) => ({
  width: size,
  height: size,
  viewBox: "0 0 24 24",
  fill: "none",
  stroke: "currentColor",
  strokeWidth: stroke,
  strokeLinecap: "square" as const,
  strokeLinejoin: "miter" as const,
  "aria-hidden": true,
  focusable: false,
});

export const ArrowRight = ({ className, size }: P) => (
  <svg {...base(size)} className={className}><path d="M4 12h15M13 6l6 6-6 6" /></svg>
);
export const ArrowUpRight = ({ className, size }: P) => (
  <svg {...base(size)} className={className}><path d="M7 17 17 7M9 7h8v8" /></svg>
);
export const ChevronLeft = ({ className, size, stroke }: P) => (
  <svg {...base(size, stroke)} className={className}><path d="m15 5-7 7 7 7" /></svg>
);
export const ChevronRight = ({ className, size, stroke }: P) => (
  <svg {...base(size, stroke)} className={className}><path d="m9 5 7 7-7 7" /></svg>
);
export const Close = ({ className, size }: P) => (
  <svg {...base(size)} className={className}><path d="M5 5l14 14M19 5 5 19" /></svg>
);
export const Menu = ({ className, size }: P) => (
  <svg {...base(size)} className={className}><path d="M3 7h18M3 12h18M9 17h12" /></svg>
);
export const Play = ({ className, size = 28 }: P) => (
  <svg width={size} height={size} viewBox="0 0 24 24" aria-hidden="true" focusable="false" className={className}>
    <path d="M7 4.5v15l12.5-7.5z" fill="currentColor" />
  </svg>
);
