import React, { useId, useRef } from 'react';

export interface TabDef {
  key: string;
  label: string;
  icon?: string;
}

interface TabsProps {
  tabs: TabDef[];
  active: string;
  onChange: (key: string) => void;
  ariaLabel: string;
  className?: string;
}

/* Underline tab list following the WAI-ARIA tabs pattern (arrow-key navigation). */
const Tabs: React.FC<TabsProps> = ({ tabs, active, onChange, ariaLabel, className = '' }) => {
  const baseId = useId();
  const listRef = useRef<HTMLDivElement>(null);

  const onKeyDown = (e: React.KeyboardEvent, idx: number) => {
    if (e.key !== 'ArrowRight' && e.key !== 'ArrowLeft') return;
    e.preventDefault();
    const next = (idx + (e.key === 'ArrowRight' ? 1 : -1) + tabs.length) % tabs.length;
    onChange(tabs[next].key);
    listRef.current?.querySelectorAll<HTMLButtonElement>('[role="tab"]')[next]?.focus();
  };

  return (
    <div
      ref={listRef}
      role="tablist"
      aria-label={ariaLabel}
      className={`mb-4 flex touch-pan-x touch-pan-y gap-4 overflow-x-auto border-b border-outline-variant [scrollbar-width:none] md:mb-6 md:gap-6 [&::-webkit-scrollbar]:hidden ${className}`}
    >
      {tabs.map((t, i) => {
        const selected = t.key === active;
        return (
          <button
            key={t.key}
            id={`${baseId}-${t.key}`}
            type="button"
            role="tab"
            aria-selected={selected}
            tabIndex={selected ? 0 : -1}
            onClick={() => onChange(t.key)}
            onKeyDown={(e) => onKeyDown(e, i)}
            className={`-mb-px inline-flex shrink-0 items-center gap-1.5 border-b-2 pt-2.5 pb-3 font-mono text-xs font-semibold tracking-[0.02em] whitespace-nowrap transition-colors md:text-[13px] ${
              selected
                ? 'border-primary text-primary'
                : 'border-transparent text-on-surface-variant hover:text-on-surface'
            }`}
          >
            {t.icon && <span className="material-symbols-outlined icon-sm">{t.icon}</span>}
            {t.label}
          </button>
        );
      })}
    </div>
  );
};

export default Tabs;
