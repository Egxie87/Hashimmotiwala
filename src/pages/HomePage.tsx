import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useScrollReveal } from '../hooks/useAnimations';
import StatStrip, { type Stat } from '../components/ui/StatStrip';
import Tabs from '../components/ui/Tabs';
import '../styles/pages/HomePage.css';

/* ── Resin Data ── */
const resinData: Record<string, {
  title: string; short: string; grade: string; desc: string; tag: string;
  density: string; mfi: string; tensile: string; shrinkage: string;
  bars: { label: string; value: string; pct: number }[];
}> = {
  hdpe: {
    title: 'HDPE (High-Density Polyethylene)', short: 'HDPE', tag: 'Automotive & Packaging',
    grade: 'Grade: HM-5010 // Blow & Heavy Injection',
    desc: 'Exceptional environmental stress crack resistance (ESCR), low moisture absorption, and high impact strength even at cryogenic temperatures down to -40°C.',
    density: '0.952 g/cm³', mfi: '7.0 g/10min', tensile: '26.5 MPa', shrinkage: '1.8 – 2.5%',
    bars: [
      { label: 'Impact Strength (Izod Notched)', value: '85 J/m', pct: 75 },
      { label: 'Flexural Modulus (Rigidity)', value: '1,150 MPa', pct: 55 },
      { label: 'Heat Deflection Temp (0.45 MPa)', value: '78°C', pct: 45 },
      { label: 'Chemical & Hydrocarbon Resistance', value: '96%', pct: 95 },
    ],
  },
  pp: {
    title: 'PP Copolymer (Impact Grade)', short: 'PP Copolymer', tag: 'Logistics & Storage',
    grade: 'Grade: PP-CP-300 // Nucleated Automotive Grade',
    desc: 'Balanced flexural modulus, superior fatigue resistance for living hinges, and reduced warpage in wide-surface industrial crates and storage units.',
    density: '0.905 g/cm³', mfi: '12.0 g/10min', tensile: '31.0 MPa', shrinkage: '1.2 – 1.8%',
    bars: [
      { label: 'Impact Strength (Izod Notched)', value: '95 J/m', pct: 82 },
      { label: 'Flexural Modulus (Rigidity)', value: '1,450 MPa', pct: 68 },
      { label: 'Heat Deflection Temp (0.45 MPa)', value: '98°C', pct: 60 },
      { label: 'Chemical & Hydrocarbon Resistance', value: '91%', pct: 90 },
    ],
  },
  pc: {
    title: 'Lexan™ Polycarbonate (Optical Clear)', short: 'Polycarbonate', tag: 'Optical & Safety',
    grade: 'Grade: PC-141R // Flame Retardant UL94 V-0',
    desc: 'Virtually unbreakable impact resistance, crystal clarity with 89% optical transmission, and dimensional stability under elevated working temperatures up to 135°C.',
    density: '1.20 g/cm³', mfi: '10.5 g/10min', tensile: '66.0 MPa', shrinkage: '0.5 – 0.7%',
    bars: [
      { label: 'Impact Strength (Izod Notched)', value: '750 J/m', pct: 98 },
      { label: 'Flexural Modulus (Rigidity)', value: '2,350 MPa', pct: 88 },
      { label: 'Heat Deflection Temp (0.45 MPa)', value: '135°C', pct: 85 },
      { label: 'Chemical & Hydrocarbon Resistance', value: '74%', pct: 65 },
    ],
  },
  pom: {
    title: 'Delrin™ POM Polyacetal', short: 'POM Acetal', tag: 'Gears & Mechanisms',
    grade: 'Grade: POM-FG-100 // Low Friction Gear Grade',
    desc: 'Outstanding dimensional stability, high stiffness, low coefficient of friction against metals, and high resistance to organic solvents and greases.',
    density: '1.42 g/cm³', mfi: '9.0 g/10min', tensile: '71.0 MPa', shrinkage: '1.9 – 2.3%',
    bars: [
      { label: 'Impact Strength (Izod Notched)', value: '68 J/m', pct: 60 },
      { label: 'Flexural Modulus (Rigidity)', value: '2,900 MPa', pct: 95 },
      { label: 'Heat Deflection Temp (0.45 MPa)', value: '122°C', pct: 78 },
      { label: 'Chemical & Hydrocarbon Resistance', value: '94%', pct: 92 },
    ],
  },
};

const resinTabs = Object.entries(resinData).map(([key, r]) => ({ key, label: r.short }));

const heroStats: Stat[] = [
  { label: 'Injection Cells', value: '35+', sub: '50T – 1800T Clamping' },
  { label: 'Annual Parts', value: '12M+', sub: 'Automotive & FMCG' },
  { label: 'Tolerance', value: '±0.02', unit: 'mm', sub: 'Optical CMM Verified' },
  { label: 'Dispatch SLA', value: '48-Hr', sub: 'Standard SKU Docks' },
];

/* ── Process Steps ── */
const processSteps = [
  { num: '01', badge: 'Purity Lab', title: 'Polymer Granule Intake', desc: 'Dessicant dehumidifying hopper drying down to <0.02% moisture content. Rigorous spectrophotometer color-matching and melt flow index (MFI) verification.', metric: 'RESIN: VIRGIN / REPRO', icon: 'grain' },
  { num: '02', badge: 'Thermal Zone', title: 'Extrusion & Plasticizing', desc: 'Multi-zone bimetallic screw geometry ensures uniform shear melt with zero thermal degradation. Closed-loop PID temperature regulation across 5 zones.', metric: 'BARREL: 180°C – 320°C', icon: 'tune' },
  { num: '03', badge: 'Hydraulics', title: 'High-Tonnage Clamping', desc: 'Hydraulic double-toggle and all-electric clamping units delivering 50T to 1800T lock force. Hot-runner valve gates minimize gating vestige and runner scrap.', metric: 'CLAMP: UP TO 1800 TON', icon: 'compress' },
  { num: '04', badge: 'QA Gate', title: 'Optical Inspection & Eject', desc: 'High-speed robotic servo pickers paired with multi-axis automated telecentric vision inspection for flash, warpage, and short-shot detection before palletizing.', metric: 'ACCURACY: ±0.02 MM', icon: 'verified' },
];

/* ── Product Divisions ── */
const divisions = [
  { tag: 'Heavy Logistics', title: 'Industrial Crates & Euro Pallets', desc: 'High-density structural foam polypropylene crates engineered for automated conveyor storage, 500kg rack load capacity.', resin: 'RESIN: HDPE / PP COPO', moq: 'MOQ: 500 PCS', cta: 'View Specifications', ctaLink: '/products', img: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBNupFlnCxjA3-IP7V1mBLbomfHR-QDR5YPZTEcWhz6-B7u49tiRbXw5LQKbkJdeslCJ1zGjlU3s1jFHPNcmhnk2guHF67O0o4W3CpVBA6KmZgikCuKy1PW2l70wqelGZ1_0bjyXPv4mrbuzYTT3LsHT3toS8J77ZS0AawTBbfrY_Y1b6fI-ITNbPyJ7ahlOkVQVOJ0dRsumKlFfpYr2q6EZKbZoXVYkKJYd5CYKU4TB8ac6dGRtHZ7', badge: 'SERIES #CR-800' },
  { tag: 'Automotive & Motion', title: 'Precision Technical Moulding', desc: 'Tight-tolerance spur gears, POM bushings, and insert-moulded electrical switch housings with micron-level concentricity.', resin: 'RESIN: DELRIN / NYLON PA66', moq: 'MOQ: CONTRACT', cta: 'Request DFM Review', ctaLink: '/custom-moulding', img: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCvIeSY7uHPxJ25i-RjRt2kXHlfHSgpyZYpxipnIzQjWdu-DjrDIORXoDMUcsikZKAgmYKeh4i75j-T-xeidpxO1d9GqMa6Ks1ZmEBQ64VqaqO4YUCa49hSSQdCC48I1O0XYUMy0ge9R49vjwZGq0HJGuJncuVtuzy-5hvQxWoOxv95YEdRQjModTcr_OKZWRTT-tpWIHneX0F7rhTXyflvbGSXsQfhv1UOIUDjhjfFHwD0By__J4AQ', badge: 'DFM CUSTOM' },
  { tag: 'Bulk Chemical', title: 'Chemical Packaging & Drums 200L', desc: 'Extrusion blow-moulded and injection-moulded HM-HDPE tight-head drums with certified hazardous chemical drop-resistance.', resin: 'RESIN: HM-HDPE BLOW', moq: 'MOQ: 200 PCS', cta: 'View UN Ratings', ctaLink: '/products', img: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDmdlbyFlKKMAtUqKCJwfQzrgYMH9RyBbgVz3xHsIb9mSZV1mh-QIswHqDN5EGh9q1K8SSwXlaJMRxJz5bwzcfgdd6-WOy0RIZB0Ts2ldR3rWCta8NYV71mLWPG05zB8OtNCBbLMoC_OUmb8HiErcnxdaLOyEgvYwbfx7RecTDt9ziT4KbyMziFxfnUp5kfxjItaDQfJI4F2Aeqerz3iLqb2V6I_sFTsi8uzAg-7q8Hvc_Ytz6NpGXE', badge: 'UN CERTIFIED' },
  { tag: 'Profiles & Extrusion', title: 'Engineering Sheets & Profiles', desc: 'Continuous extruded profiles, guide rails, and UV-stabilized polycarbonate glazing panels for architectural & machine guarding.', resin: 'RESIN: PC / UHMWPE', moq: 'MOQ: 100 METERS', cta: 'Custom Dies', ctaLink: '/products', img: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDvIMKepds4oUjVnX8noOL5PNbllGC0rzF4dt8EkrUiooFBn7qKVWP4AFmpIyBD1RkiEsaRSi4LZ0DG5zBJPghcJ8anI6fxFUonxFMDWI1h0p5zv4QLM2qVLpDfU7Ao0-7CwugM_LT_WmyNpCuzO9WU_kMhHb-6PGvn4wDJk5SKjO0VdC67SpaQLXrX8lTqwOua5rJzTKlWWk6OMxxrXEFx5S1HjezZ4hIYs2URU3A29j2PU0mpte8i', badge: 'PROFILES' },
];

/* ── Machines ── */
const machines = [
  { icon: 'precision_manufacturing', title: 'Servo Hydraulic Injection Press Line', desc: 'Engel & Haitian 50T to 1800T, tie-bar spacing up to 1550mm', units: '26 UNITS' },
  { icon: 'hardware', title: '5-Axis High-Speed VMC & CNC Milling', desc: 'Spindle speed 24,000 RPM, repeatability ±0.002mm', units: '6 UNITS' },
  { icon: 'bolt', title: 'Mirror EDM & Submerged Wire Cut', desc: 'Surface finish Ra 0.1μm for high-polish optical moulds', units: '4 UNITS' },
];

const HomePage: React.FC = () => {
  const [activeResin, setActiveResin] = useState('hdpe');
  const currentResin = resinData[activeResin];

  const heroRef = useScrollReveal<HTMLElement>();
  const processRef = useScrollReveal<HTMLElement>();
  const divRef = useScrollReveal<HTMLElement>();
  const resinRef = useScrollReveal<HTMLElement>();
  const machRef = useScrollReveal<HTMLElement>();
  const ctaRef = useScrollReveal<HTMLElement>();

  return (
    <main className="home-page">
      {/* ── Hero Section ── */}
      <section className="hero section" ref={heroRef}>
        <div className="container hero-grid reveal">
          {/* Left */}
          <div className="hero-content">
            <div className="pill badge-surface">
              <span className="material-symbols-outlined icon-sm">precision_manufacturing</span>
              TIER-1 OEM & INDUSTRIAL THERMOPLASTICS
            </div>
            <h1 className="hero-title">
              High-Precision <span className="text-primary">Injection Moulding</span> & Contract Tooling.
            </h1>
            <p className="hero-desc">
              End-to-end engineered contract manufacturing from virgin polymer granules to certified zero-defect components. Hashim Motiwala delivers multi-cavity hot runner moulds, structural foam storage bins, automotive gears, and high-impact logistics containers with micron-level repeatability.
            </p>
            <div className="hero-actions">
              <Link to="/products" className="btn btn-primary btn-lg">
                Explore 450+ Product Catalog
                <span className="material-symbols-outlined icon-sm">arrow_forward</span>
              </Link>
              <Link to="/contact" className="btn btn-outline btn-lg">
                <span className="material-symbols-outlined icon-sm text-primary">upload_file</span>
                Submit CAD / Request RFQ
              </Link>
            </div>
            <StatStrip stats={heroStats} className="mt-2" />
          </div>
          {/* Right */}
          <div className="hero-visual">
            <Link to="/custom-moulding" className="hero-image-card" aria-label="View tooling capabilities">
              <div className="hero-img-wrapper">
                <img
                  src="https://lh3.googleusercontent.com/aida-public/AB6AXuBUW1fN4JT6f57W6ETlVr-OeE4wQZyZOPwWgVX1eb3tifzOXrrxJ4EcOUfubEvwRPyEXoMx4ungmCj6FvQF8-GtnTbWEj6fOIyjZyRdL-J54-tXvfK8u5VlhR9p66-NtEKrxMKRyva8gLVvznp_JCTsx7tanUycqRis1LiMu6-xLB2VU5_tZycmKXOWhLnUBW5YHRgRcsuCuSX3IMXVbDTjFUoNkhQjK1BHd4RtBFM8OoX4-D2PL_XWBZWDlh9ENzC-9Q"
                  alt="Industrial injection moulding warehouse with stacked storage crates"
                  loading="eager"
                />
                <div className="hero-img-overlay">
                  <span className="overlay-label">TTC Industrial Works</span>
                  <span className="overlay-title">High-Density Polyolefin Production Floor</span>
                  <span className="overlay-sub">
                    Granule formulation → Mould design → Global export
                    <span className="material-symbols-outlined icon-sm overlay-arrow">arrow_forward</span>
                  </span>
                </div>
              </div>
            </Link>
            <ul className="hero-trust">
              <li>
                <span className="material-symbols-outlined icon-sm text-primary">verified</span>
                ISO 9001:2015
              </li>
              <li>
                <span className="material-symbols-outlined icon-sm text-primary">directions_boat</span>
                JNPT 28 km
              </li>
              <li>
                <span className="material-symbols-outlined icon-sm text-primary">handshake</span>
                Mutual NDA
              </li>
            </ul>
          </div>
        </div>
      </section>

      {/* ── 4-Stage Process Pipeline ── */}
      <section className="section section-alt" ref={processRef}>
        <div className="container reveal">
          <div className="section-header">
            <div>
              <span className="section-tag">Manufacturing Quality</span>
              <h2 className="section-title">From Virgin Polymers to Zero-Defect Components</h2>
            </div>
            <p className="section-desc">
              Every production cycle is synchronized through our closed-loop controller system, eliminating sink marks, flash, and internal stresses before dispatch.
            </p>
          </div>
          <div className="process-grid">
            {processSteps.map((step, i) => (
              <div className={`process-card reveal reveal-delay-${i + 1}`} key={step.num}>
                <div className="process-top">
                  <span className="process-num">{step.num}</span>
                  <span className="badge badge-surface">{step.badge}</span>
                </div>
                <h3 className="process-title">{step.title}</h3>
                <p className="process-desc">{step.desc}</p>
                <div className="process-footer">
                  <span className="process-metric">{step.metric}</span>
                  <span className="material-symbols-outlined icon-sm text-primary">{step.icon}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Product Divisions ── */}
      <section className="section" ref={divRef}>
        <div className="container reveal">
          <div className="section-header">
            <div>
              <span className="section-tag">Core Production Divisions</span>
              <h2 className="section-title">Engineered Polymer Products & Custom Tooling</h2>
            </div>
            <Link to="/products" className="btn btn-outline btn-sm">
              View All 450+ SKUs →
            </Link>
          </div>
          <div className="divisions-grid">
            {divisions.map((div, i) => (
              <div className={`division-card card reveal reveal-delay-${i + 1}`} key={div.title}>
                <div className="division-img-wrap">
                  <img src={div.img} alt={div.title} loading="lazy" />
                  <span className="division-badge">{div.badge}</span>
                </div>
                <div className="card-body division-body">
                  <span className="division-tag">{div.tag}</span>
                  <h3 className="division-title">{div.title}</h3>
                  <p className="division-desc">{div.desc}</p>
                  <div className="division-footer">
                    <div className="division-meta">
                      <span>{div.resin}</span>
                      <span className="division-moq">{div.moq}</span>
                    </div>
                    <Link to={div.ctaLink} className="division-cta">
                      {div.cta}
                      <span className="material-symbols-outlined icon-sm">arrow_forward</span>
                    </Link>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Resin Mechanical Matrix ── */}
      <section className="section section-alt" ref={resinRef}>
        <div className="container reveal">
          <div className="section-header">
            <div>
              <span className="section-tag">Polymer Science Desk</span>
              <h2 className="section-title">Interactive Resin Mechanical Matrix</h2>
            </div>
            <p className="section-desc">
              Calibrated tensile yield, flexural modulus, and mold shrinkage characteristics for primary engineering grades handled in our pawane facility.
            </p>
          </div>
          {/* Tabs */}
          <Tabs
            tabs={resinTabs}
            active={activeResin}
            onChange={setActiveResin}
            ariaLabel="Resin grade"
          />
          {/* Content */}
          <div className="resin-card card" key={activeResin}>
            <div className="card-body resin-content">
              <div className="resin-left">
                <div className="resin-header">
                  <div>
                    <h3 className="resin-title">{currentResin.title}</h3>
                    <span className="resin-grade">{currentResin.grade}</span>
                  </div>
                  <span className="pill bg-surface-container-high text-primary">{currentResin.tag}</span>
                </div>
                <p className="resin-desc">{currentResin.desc}</p>
                <div className="resin-metrics">
                  <div className="resin-metric-box">
                    <span className="rm-label">Density</span>
                    <span className="rm-value">{currentResin.density}</span>
                    <span className="rm-sub">ASTM D792</span>
                  </div>
                  <div className="resin-metric-box">
                    <span className="rm-label">Melt Flow (MFI)</span>
                    <span className="rm-value">{currentResin.mfi}</span>
                    <span className="rm-sub">190°C / 2.16kg</span>
                  </div>
                  <div className="resin-metric-box">
                    <span className="rm-label">Tensile Yield</span>
                    <span className="rm-value">{currentResin.tensile}</span>
                    <span className="rm-sub">ASTM D638</span>
                  </div>
                  <div className="resin-metric-box">
                    <span className="rm-label">Mould Shrinkage</span>
                    <span className="rm-value">{currentResin.shrinkage}</span>
                    <span className="rm-sub">Parallel flow</span>
                  </div>
                </div>
              </div>
              <div className="resin-right">
                <div className="resin-bars-header">
                  <span>Mechanical Stress Vector Profile</span>
                  <span className="text-primary">SPECS ASTM</span>
                </div>
                <div className="resin-bars">
                  {currentResin.bars.map((bar) => (
                    <div className="bar-group" key={bar.label}>
                      <div className="bar-label-row">
                        <span>{bar.label}</span>
                        <span className="bar-val">{bar.value}</span>
                      </div>
                      <div className="progress-bar">
                        <div className="progress-bar-fill" style={{ width: `${bar.pct}%` }} />
                      </div>
                    </div>
                  ))}
                </div>
                <div className="resin-bars-footer">
                  <span>TOOLING STEEL: P20 / H13</span>
                  <span>VENTING DEPTH: 0.025 MM</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── Toolroom & Facility ── */}
      <section className="section" ref={machRef}>
        <div className="container reveal">
          <div className="facility-grid">
            <div className="facility-left">
              <span className="section-tag">In-House Infrastructure</span>
              <h2 className="section-title">Engineered Moulding & High-Speed Toolroom Cells</h2>
              <p className="section-desc max-w-none!">
                Equipped with European and Japanese servo-electric injection presses, 5-axis Makino vertical machining centers, and automated wire EDM stations for turnkey mould building.
              </p>
              <div className="machines-list">
                {machines.map((m) => (
                  <div className="machine-item card" key={m.title}>
                    <div className="machine-info">
                      <span className="material-symbols-outlined icon-md text-primary">{m.icon}</span>
                      <div>
                        <h4 className="machine-title">{m.title}</h4>
                        <p className="machine-desc">{m.desc}</p>
                      </div>
                    </div>
                    <span className="machine-units">{m.units}</span>
                  </div>
                ))}
              </div>
            </div>
            <div className="facility-right">
              <div className="facility-card card">
                <div className="facility-card-header">
                  <div>
                    <span className="facility-label">Facility Location</span>
                    <span className="facility-name">TTC Industrial Area, Navi Mumbai Works</span>
                  </div>
                  <span className="facility-zone">
                    <span className="material-symbols-outlined icon-xs">fmd_good</span>
                    ZONE W-14
                  </span>
                </div>
                <div className="facility-map">
                  <img
                    src="https://lh3.googleusercontent.com/aida-public/AB6AXuCv7CxJsRPPXuHt15hIVAg8XrNgKBgTavoW9LGaGctRmXJOEnc9vrnzKtfvr-VyuY3_J-K4ekz9vS1pdZhLyg6pL4_LyOvDBXyaA7nFWuP6qf3_TQiXJLh8KX_8MJ8jduDrg3eLI_3GHOY1IprkuxKtlTZhxO9aYO6e7z7FRj6KqUSbGt5ByCU_MaFvwiM49lqgaE8GWiObEBGs440xSy5hczrzDeqqCqPuCUZKsjgqFhuoNoMPVuIq"
                    alt="MIDC Industrial Area, TTC Pawane, Navi Mumbai"
                    loading="lazy"
                  />
                </div>
                <div className="facility-stats">
                  <div className="facility-stat">
                    <span className="stat-label">AIR DRAFT</span>
                    <span className="stat-value">ISO CLASS 8</span>
                  </div>
                  <div className="facility-stat">
                    <span className="stat-label">CRANE LOAD</span>
                    <span className="stat-value">30 TON OVERHEAD</span>
                  </div>
                  <div className="facility-stat">
                    <span className="stat-label">POWER GRID</span>
                    <span className="stat-value">2.5 MVA DEDICATED</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── CTA Banner ── */}
      <section className="section section-highlight" ref={ctaRef}>
        <div className="container reveal">
          <div className="cta-banner card">
            <div className="cta-content">
              <div className="badge badge-surface w-fit">
                <span className="material-symbols-outlined icon-xs">bolt</span>
                Fast-Track Engineering Quote
              </div>
              <h2 className="cta-title">Ready for Mould Tooling or Mass Contract Manufacturing?</h2>
              <p className="cta-desc">
                Upload your 3D CAD files (.STEP, .IGES, .SLDPRT) or select standard tooling for rapid quotation. Non-Disclosure Agreement (NDA) automatically generated upon upload.
              </p>
            </div>
            <div className="cta-actions">
              <Link to="/contact" className="btn btn-primary btn-lg">
                <span className="material-symbols-outlined icon-sm">cloud_upload</span>
                Submit CAD for Quote
              </Link>
              <Link to="/contact" className="btn btn-outline btn-lg">
                <span className="material-symbols-outlined icon-sm text-primary">call</span>
                Talk to a Polymer Engineer
              </Link>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
};

export default HomePage;
