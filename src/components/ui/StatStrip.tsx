import React from 'react';

export interface Stat {
  label: string;
  value: string;
  unit?: string;
  /** Supporting detail — shown quietly on desktop, full text on hover via title. */
  sub?: string;
}

interface StatStripProps {
  stats: Stat[];
  tone?: 'surface' | 'plain';
  className?: string;
}

/* One grouped surface instead of N floating cards.
   gap-px over a tinted background draws the hairline dividers at every breakpoint. */
const StatStrip: React.FC<StatStripProps> = ({ stats, tone = 'surface', className = '' }) => {
  const cellBg = tone === 'surface' ? 'bg-surface-container-lowest' : 'bg-surface-container-low';

  return (
    <dl
      className={`grid w-full grid-cols-2 gap-px overflow-hidden rounded-xl bg-surface-container-high lg:grid-cols-4 ${
        tone === 'surface' ? 'border border-surface-container-high shadow-sm' : ''
      } ${className}`}
    >
      {stats.map((s) => (
        <div key={s.label} title={s.sub} className={`flex min-w-0 flex-col gap-0.5 px-3 py-2.5 md:p-4 ${cellBg}`}>
          <dt className="font-mono text-[10px] font-semibold tracking-[0.06em] text-secondary uppercase md:text-[11px]">
            {s.label}
          </dt>
          <dd className="font-display text-xl leading-tight font-extrabold tracking-tight text-on-surface md:text-[26px]">
            {s.value}
            {s.unit && <small className="ml-1 text-[13px] font-semibold text-primary">{s.unit}</small>}
          </dd>
          {s.sub && (
            <dd className="hidden truncate text-xs text-on-surface-variant md:block">{s.sub}</dd>
          )}
        </div>
      ))}
    </dl>
  );
};

export default StatStrip;
