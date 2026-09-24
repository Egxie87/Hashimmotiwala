import React from 'react';

interface DisclosureProps {
  summary: React.ReactNode;
  /** Muted text shown on the right of the summary row (e.g. a count). */
  meta?: React.ReactNode;
  metaClassName?: string;
  icon?: string;
  defaultOpen?: boolean;
  /** boxed: tinted panel. inline: bare row, for use inside cards or divided lists. */
  variant?: 'inline' | 'boxed';
  className?: string;
  children: React.ReactNode;
}

/* Native <details> keeps keyboard + screen-reader behaviour for free. */
const Disclosure: React.FC<DisclosureProps> = ({
  summary,
  meta,
  metaClassName = 'text-on-surface-variant',
  icon,
  defaultOpen = false,
  variant = 'boxed',
  className = '',
  children,
}) => {
  const boxed = variant === 'boxed';

  return (
    <details
      className={`group/disclosure rounded-lg ${
        boxed ? 'border border-surface-container bg-surface-container-low' : ''
      } ${className}`}
      open={defaultOpen}
    >
      <summary
        className={`flex cursor-pointer list-none items-center gap-2 rounded-[inherit] py-2.5 font-mono text-xs font-semibold text-on-surface select-none transition-colors [&::-webkit-details-marker]:hidden ${
          boxed ? 'px-3 hover:bg-surface-container' : 'hover:text-primary'
        }`}
      >
        {icon && <span className="material-symbols-outlined icon-sm text-primary">{icon}</span>}
        <span className="min-w-0 flex-1">{summary}</span>
        {meta && <span className={`font-medium whitespace-nowrap ${metaClassName}`}>{meta}</span>}
        <span
          className="material-symbols-outlined icon-sm text-on-surface-variant transition-transform duration-200 group-open/disclosure:rotate-180"
          aria-hidden="true"
        >
          expand_more
        </span>
      </summary>
      <div className={`animate-pop-in pb-3 ${boxed ? 'px-3' : ''}`}>{children}</div>
    </details>
  );
};

export default Disclosure;
