import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import Logo from './Logo';
import './Header.css';

const navLinks = [
  { path: '/', label: 'Home' },
  { path: '/products', label: 'Product Catalog', badge: '450+ SKUs' },
  { path: '/custom-moulding', label: 'Custom Moulding & DFM' },
  { path: '/contact', label: 'Contact & Procurement' },
];

const Header: React.FC = () => {
  const location = useLocation();
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 10);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  // Close mobile menu on route change
  useEffect(() => {
    setMobileOpen(false);
  }, [location.pathname]);

  return (
    <header className={`site-header${scrolled ? ' scrolled' : ''}`}>
      {/* Top Info Bar */}
      <div className="header-topbar">
        <div className="container header-topbar-inner">
          <div className="topbar-left">
            <span className="topbar-cert">
              <span className="material-symbols-outlined icon-xs">verified</span>
              ISO 9001:2015 & CE CERTIFIED
            </span>
            <span className="topbar-divider hide-mobile">|</span>
            <span className="topbar-facility hide-mobile">
              <span className="material-symbols-outlined icon-xs">precision_manufacturing</span>
              TTC PRECISION INJECTION FACILITY
            </span>
          </div>
          <div className="topbar-right">
            <span className="topbar-item">
              <span className="material-symbols-outlined icon-xs">call</span>
              +91 (022) 6842-8900
            </span>
            <span className="topbar-divider">|</span>
            <span className="topbar-item">
              <span className="material-symbols-outlined icon-xs">schedule</span>
              24/7 OEM PRODUCTION DISPATCH
            </span>
          </div>
        </div>
      </div>

      {/* Main Nav */}
      <div className="header-main">
        <div className="container header-main-inner">
          {/* Brand */}
          <Link to="/" className="header-brand">
            <Logo size={44} />
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
                {link.badge && (
                  <span className="nav-badge">{link.badge}</span>
                )}
              </Link>
            ))}
          </nav>

          {/* Actions */}
          <div className="header-actions">
            <div className="currency-toggle hide-mobile">
              <span className="currency-active">USD</span>
              <span className="currency-divider">/</span>
              <span>INR</span>
            </div>
            <div className="plant-status hide-mobile">
              <span className="status-dot">
                <span className="status-dot-ping" />
                <span className="status-dot-core" />
              </span>
              <span className="status-text">Plant Active: 35 Cells</span>
            </div>
            <Link to="/contact" className="btn btn-primary btn-rfq">
              <span className="material-symbols-outlined icon-sm">request_quote</span>
              <span className="hide-mobile">RFQ / Quick Quote</span>
              <span className="hide-desktop">RFQ</span>
            </Link>

            {/* Hamburger */}
            <button
              className="hamburger hide-desktop"
              onClick={() => setMobileOpen(!mobileOpen)}
              aria-label="Toggle navigation menu"
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
        <nav className="mobile-nav" aria-label="Mobile navigation">
          {navLinks.map((link) => (
            <Link
              key={link.path}
              to={link.path}
              className={`mobile-nav-link${location.pathname === link.path ? ' active' : ''}`}
            >
              {link.label}
              {link.badge && <span className="nav-badge">{link.badge}</span>}
            </Link>
          ))}
        </nav>
        <div className="mobile-drawer-footer">
          <div className="plant-status">
            <span className="status-dot">
              <span className="status-dot-ping" />
              <span className="status-dot-core" />
            </span>
            <span className="status-text">Plant Active: 35 Cells</span>
          </div>
        </div>
      </div>
      {mobileOpen && <div className="mobile-backdrop" onClick={() => setMobileOpen(false)} />}
    </header>
  );
};

export default Header;
