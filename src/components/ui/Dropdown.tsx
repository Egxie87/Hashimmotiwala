import React, { useEffect, useId, useRef, useState } from 'react';

export interface DropdownItem {
  label: string;
  icon?: string;
  active?: boolean;
  onSelect: () => void;
}

interface DropdownProps {
  /** Visible trigger content. Defaults to a "more" icon. */
  trigger?: React.ReactNode;
  ariaLabel: string;
  items: DropdownItem[];
  align?: 'start' | 'end';
  /** Card footers open upward; header controls open downward. */
  placement?: 'up' | 'down';
  triggerClassName?: string;
  className?: string;
}

const defaultTrigger =
  'inline-flex size-9 items-center justify-center rounded-lg border border-outline-variant text-on-surface-variant transition-colors hover:bg-surface-container hover:text-on-surface aria-expanded:bg-surface-container aria-expanded:text-on-surface';

const Dropdown: React.FC<DropdownProps> = ({
  trigger,
  ariaLabel,
  items,
  align = 'end',
  placement = 'up',
  triggerClassName = defaultTrigger,
  className = '',
}) => {
  const [open, setOpen] = useState(false);
  const rootRef = useRef<HTMLDivElement>(null);
  const triggerRef = useRef<HTMLButtonElement>(null);
  const menuRef = useRef<HTMLDivElement>(null);
  const menuId = useId();

  useEffect(() => {
    if (!open) return;

    const onPointerDown = (e: PointerEvent) => {
      if (!rootRef.current?.contains(e.target as Node)) setOpen(false);
    };
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setOpen(false);
        triggerRef.current?.focus();
      }
    };

    document.addEventListener('pointerdown', onPointerDown);
    document.addEventListener('keydown', onKeyDown);
    menuRef.current?.querySelector<HTMLButtonElement>('[role="menuitem"]')?.focus();

    return () => {
      document.removeEventListener('pointerdown', onPointerDown);
      document.removeEventListener('keydown', onKeyDown);
    };
  }, [open]);

  const onMenuKeyDown = (e: React.KeyboardEvent) => {
    if (e.key !== 'ArrowDown' && e.key !== 'ArrowUp') return;
    e.preventDefault();
    const options = Array.from(
      menuRef.current?.querySelectorAll<HTMLButtonElement>('[role="menuitem"]') ?? []
    );
    const idx = options.indexOf(document.activeElement as HTMLButtonElement);
    const next = e.key === 'ArrowDown' ? idx + 1 : idx - 1;
    options[(next + options.length) % options.length]?.focus();
  };

  return (
    <div className={`relative inline-flex ${className}`} ref={rootRef}>
      <button
        ref={triggerRef}
        type="button"
        className={triggerClassName}
        aria-label={ariaLabel}
        aria-haspopup="menu"
        aria-expanded={open}
        aria-controls={menuId}
        onClick={() => setOpen((o) => !o)}
      >
        {trigger ?? <span className="material-symbols-outlined icon-sm">more_horiz</span>}
      </button>
      {open && (
        <div
          id={menuId}
          ref={menuRef}
          role="menu"
          onKeyDown={onMenuKeyDown}
          className={`animate-pop-in absolute z-[60] flex min-w-[200px] flex-col rounded-lg border border-surface-container-high bg-surface-container-lowest p-1 shadow-lg ${
            placement === 'up' ? 'bottom-full mb-1.5' : 'top-full mt-1.5'
          } ${align === 'end' ? 'right-0' : 'left-0'}`}
        >
          {items.map((item) => (
            <button
              key={item.label}
              type="button"
              role="menuitem"
              className={`flex w-full items-center gap-2 rounded-md px-2.5 py-2 text-left text-[13px] whitespace-nowrap transition-colors hover:bg-surface-container-low focus-visible:bg-surface-container-low ${
                item.active ? 'font-bold text-primary' : 'font-medium text-on-surface'
              }`}
              onClick={() => {
                setOpen(false);
                item.onSelect();
              }}
            >
              {item.icon && (
                <span className="material-symbols-outlined icon-sm text-on-surface-variant">{item.icon}</span>
              )}
              <span>{item.label}</span>
              {item.active && (
                <span className="material-symbols-outlined icon-xs ml-auto text-primary">check</span>
              )}
            </button>
          ))}
        </div>
      )}
    </div>
  );
};

export default Dropdown;
