import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useRfq } from '../hooks/useRfq';
import Logo from './Logo';
import Dropdown from './ui/Dropdown';
import '../styles/components/Header.css';

const navLinks = [
  { path: '/', label: 'Home' },
  { path: '/products', label: 'Products' },
  { path: '/custom-moulding', label: 'Custom Moulding' },
  { path: '/contact', label: 'Contact' },
];

const Header: React.FC = () => {
  const location = useLocation();
  const { currency, setCurrency, items, setIsDrawerOpen } = useRfq();
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 10);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <header className={`site-header${scrolled ? ' scrolled' : ''}`}>
      {/* Top Info Bar */}
      <div className="header-topbar">
        <div className="container header-topbar-inner">
          <div className="topbar-left">
            <span className="topbar-cert">
              <span className="material-symbols-outlined icon-xs">verified</span>
              ISO 9001:2015 CERTIFIED FOUNDRY
            </span>
            <span className="topbar-divider hide-mobile">|</span>
            <span className="topbar-facility hide-mobile">
              <span className="material-symbols-outlined icon-xs">precision_manufacturing</span>
              50T – 1800T INJECTION CAPACITY (TTC NAVI MUMBAI)
            </span>
          </div>
          <div className="topbar-right">
            <a href="tel:+912268428900" className="topbar-item topbar-link">
              <span className="material-symbols-outlined icon-xs">call</span>
              +91 (022) 6842-8900
            </a>
            <span className="topbar-divider">|</span>
            <span className="topbar-item">
              <span className="material-symbols-outlined icon-xs">directions_boat</span>
              DIRECT JNPT (NHAVA SHEVA) EXPORT
            </span>
          </div>
        </div>
      </div>

      {/* Main Nav */}
      <div className="header-main">
        <div className="container header-main-inner">
          {/* Brand */}
          <Link to="/" className="header-brand">
            <Logo size={40} />
            <div className="brand-text">
              <span className="brand-name">HASHIM MOTIWALA</span>
              <span className="brand-tagline">PLASTIC & POLYMER ENGINEERING</span>
            </div>
          </Link>

          {/* Desktop Nav */}
          <nav className="header-nav hide-mobile" aria-label="Main navigation">
            {navLinks.map((link) => (
              <Link
                key={link.path}
                to={link.path}
                className={`nav-link${location.pathname === link.path ? ' active' : ''}`}
              >
                <span>{link.label}</span>
              </Link>
            ))}
          </nav>

          {/* Actions */}
          <div className="header-actions">
            {/* Currency is a secondary preference — tucked into a compact menu */}
            <div className="hidden lg:block">
              <Dropdown
                placement="down"
                ariaLabel={`Pricing currency: ${currency}`}
                triggerClassName="inline-flex h-9 items-center gap-0.5 rounded-full px-2.5 font-mono text-xs font-bold text-on-surface-variant transition-colors hover:bg-surface-container hover:text-on-surface aria-expanded:bg-surface-container"
                trigger={
                  <>
                    {currency === 'USD' ? '$ USD' : '₹ INR'}
                    <span className="material-symbols-outlined icon-sm">expand_more</span>
                  </>
                }
                items={[
                  { label: 'US Dollar ($)', active: currency === 'USD', onSelect: () => setCurrency('USD') },
                  { label: 'Indian Rupee (₹)', active: currency === 'INR', onSelect: () => setCurrency('INR') },
                ]}
              />
            </div>

            {/* Functional RFQ Manifest Cart Button */}
            <button
              type="button"
              className={`btn-manifest-trigger${items.length > 0 ? ' has-items' : ''}`}
              onClick={() => setIsDrawerOpen(true)}
              aria-label={`Open RFQ Manifest with ${items.length} items`}
            >
              <span className="material-symbols-outlined icon-sm">inventory_2</span>
              <span className="manifest-btn-text">Manifest</span>
              <span className="manifest-count-pill">{items.length}</span>
            </button>

            <Link to="/contact" className="btn btn-primary btn-rfq">
              <span className="material-symbols-outlined icon-sm">request_quote</span>
              <span className="rfq-btn-text">Get Quote</span>
            </Link>

            {/* Hamburger */}
            <button
              className="hamburger"
              onClick={() => setMobileOpen(!mobileOpen)}
              aria-label={mobileOpen ? 'Close navigation menu' : 'Open navigation menu'}
              aria-expanded={mobileOpen}
            >
              <span className="material-symbols-outlined icon-md">
                {mobileOpen ? 'close' : 'menu'}
              </span>
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Drawer */}
      <div className={`mobile-drawer${mobileOpen ? ' open' : ''}`}>
        <div className="mobile-drawer-header">
          <Link to="/" className="mobile-drawer-brand" onClick={() => setMobileOpen(false)}>
            <Logo size={32} />
            <div className="mobile-drawer-brand-text">
              <span className="drawer-brand-name">HASHIM MOTIWALA</span>
              <span className="drawer-brand-tagline">PLASTIC & POLYMER ENG</span>
            </div>
          </Link>
          <button
            className="mobile-drawer-close"
            onClick={() => setMobileOpen(false)}
            aria-label="Close navigation menu"
          >
            <span className="material-symbols-outlined">close</span>
          </button>
        </div>
        <nav className="mobile-nav" aria-label="Mobile navigation">
          {navLinks.map((link) => (
            <Link
              key={link.path}
              to={link.path}
              className={`mobile-nav-link${location.pathname === link.path ? ' active' : ''}`}
              onClick={() => setMobileOpen(false)}
            >
              {link.label}
            </Link>
          ))}
        </nav>
        <div className="mobile-drawer-footer">
          <div className="mobile-currency-row">
            <span className="text-body-sm font-semibold">Pricing Currency:</span>
            <div className="currency-segmented">
              <button
                type="button"
                className={`currency-btn${currency === 'USD' ? ' active' : ''}`}
                onClick={() => setCurrency('USD')}
              >
                USD ($)
              </button>
              <button
                type="button"
                className={`currency-btn${currency === 'INR' ? ' active' : ''}`}
                onClick={() => setCurrency('INR')}
              >
                INR (₹)
              </button>
            </div>
          </div>
          <button
            type="button"
            className="btn btn-outline mt-3 w-full"
            onClick={() => {
              setMobileOpen(false);
              setIsDrawerOpen(true);
            }}
          >
            <span className="material-symbols-outlined icon-sm">inventory_2</span>
            View RFQ Manifest ({items.length})
          </button>
        </div>
      </div>
      {mobileOpen && <div className="mobile-backdrop" onClick={() => setMobileOpen(false)} />}
    </header>
  );
};

export default Header;
