import React from 'react';

interface GroloLogoMarkProps {
  size?: number;
  className?: string;
}

/**
 * Grolo Logo Mark — Custom SVG icon
 * Represents: AI Growth Network (3 nodes connected on an upward trajectory)
 * Style: Minimal, geometric, enterprise SaaS
 */
export const GroloLogoMark: React.FC<GroloLogoMarkProps> = ({ size = 36, className = '' }) => {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 36 36"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
    >
      {/* Background rounded square */}
      <rect width="36" height="36" rx="9" fill="#2563EB" />

      {/* Growth curve path (smooth bezier, bottom-left → top-right) */}
      <path
        d="M8 25 C10 22, 14 20, 17 17 C20 14, 23 13, 28 10"
        stroke="white"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        opacity="0.5"
      />

      {/* Node 1 — bottom left (starting point) */}
      <circle cx="8" cy="25" r="2.5" fill="white" opacity="0.7" />

      {/* Node 2 — midpoint */}
      <circle cx="17.5" cy="17" r="3" fill="white" />

      {/* Node 3 — top right (peak) */}
      <circle cx="27.5" cy="10" r="2.5" fill="white" />

      {/* Spark dot above top node — AI element */}
      <circle cx="27.5" cy="6" r="1.2" fill="white" opacity="0.6" />

      {/* Tick/up arrow accent at top node */}
      <path
        d="M25 12.5 L27.5 10 L30 12.5"
        stroke="white"
        strokeWidth="1.8"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
};

/**
 * Full Grolo wordmark with logomark — used in Sidebar
 */
export const GroloWordmark: React.FC<{ showBadge?: boolean }> = ({ showBadge = true }) => {
  return (
    <div className="flex items-center gap-3">
      <GroloLogoMark size={38} />
      <div className="flex flex-col">
        <div className="flex items-center gap-2">
          <span
            className="font-bold text-[18px] text-[#111827] tracking-[-0.02em] leading-none"
            style={{ fontFamily: 'Inter, system-ui, sans-serif', letterSpacing: '-0.4px' }}
          >
            Grolo
          </span>
          {showBadge && (
            <span className="text-[9px] uppercase tracking-[0.08em] font-bold px-1.5 py-[2px] rounded bg-[#2563EB]/10 text-[#2563EB] border border-[#2563EB]/20 leading-none">
              PRO
            </span>
          )}
        </div>
        <span
          className="text-[11px] text-[#6B7280] font-medium tracking-tight mt-0.5 leading-none"
          style={{ letterSpacing: '-0.1px' }}
        >
          AI Business Growth Platform
        </span>
      </div>
    </div>
  );
};
