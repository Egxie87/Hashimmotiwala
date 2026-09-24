import React from 'react';
import { Link } from 'react-router-dom';
import Logo from './Logo';
import '../styles/components/Footer.css';

const Footer: React.FC = () => {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="site-footer">
      <div className="container footer-inner">
        <div className="footer-grid">
          {/* Brand Column */}
          <div className="footer-brand-col">
            <Link to="/" className="footer-brand">
              <Logo size={36} />
              <div className="brand-text">
                <span className="brand-name">HASHIM MOTIWALA</span>
                <span className="brand-tagline">PLASTIC & POLYMER ENGINEERING</span>
              </div>
            </Link>
            <p className="footer-desc">
              Pioneering high-precision thermoplastic injection moulding,
              toolmaking, and contract engineering solutions for enterprise
              automotive, healthcare, and industrial applications globally.
            </p>
            <div className="footer-certs">
              <span className="cert-badge">ISO 9001:2015</span>
              <span className="cert-badge">ASTM D638</span>
              <span className="cert-badge">RoHS & REACH</span>
            </div>
          </div>

          {/* Divisions */}
          <div className="footer-col">
            <h4 className="footer-heading">Divisions</h4>
            <ul className="footer-links">
              <li><Link to="/custom-moulding">Precision Injection Moulding</Link></li>
              <li><Link to="/custom-moulding">In-House Toolroom & CNC</Link></li>
              <li><Link to="/products">Technical Polymer Extrusion</Link></li>
              <li><Link to="/custom-moulding">Insert & Over-Moulding</Link></li>
              <li><Link to="/products">OEM Assembly & Packaging</Link></li>
            </ul>
          </div>

          {/* Plant & Facility */}
          <div className="footer-col">
            <h4 className="footer-heading">Plant & Facility</h4>
            <div className="footer-address">
              <p className="address-label">Navi Mumbai Works:</p>
              <p>Plot W-14, MIDC Industrial Area,</p>
              <p>TTC Industrial Zone, Pawane,</p>
              <p>Navi Mumbai, MH 400705, India</p>
              <div className="address-coords">
                <span className="material-symbols-outlined icon-xs">pin_drop</span>
                <span>Lat: 19.0760° N, Long: 73.0118° E</span>
              </div>
            </div>
          </div>

          {/* Procurement Desk */}
          <div className="footer-col">
            <h4 className="footer-heading">Procurement Desk</h4>
            <div className="footer-contacts">
              <div className="contact-block">
                <span className="contact-label">DIRECT PROCUREMENT</span>
                <a href="mailto:procurement@hashimmotiwala.com" className="contact-email">
                  procurement@hashimmotiwala.com
                </a>
              </div>
              <div className="contact-block">
                <span className="contact-label">TECHNICAL DFM SUPPORT</span>
                <a href="mailto:engineering@hashimmotiwala.com" className="contact-email">
                  engineering@hashimmotiwala.com
                </a>
              </div>
              <div className="contact-compliance">
                <span className="material-symbols-outlined icon-xs text-primary">verified_user</span>
                <span>ITAR & NDA Compliant Facility</span>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="footer-bottom">
          <p>© 2025 Hashim Motiwala Plastic & Polymer Engineering Pvt. Ltd. All rights reserved.</p>
          <div className="footer-bottom-links">
            <Link to="/contact">Vendor Terms</Link>
            <Link to="/contact">Quality Assurance Manual</Link>
            <Link to="/contact">Privacy & Compliance</Link>
          </div>
        </div>
      </div>

      {/* Back to Top */}
      <button
        className="back-to-top"
        onClick={scrollToTop}
        aria-label="Back to top"
        title="Back to top"
      >
        <span className="material-symbols-outlined">keyboard_arrow_up</span>
      </button>
    </footer>
  );
};

export default Footer;
