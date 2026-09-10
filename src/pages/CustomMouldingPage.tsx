import React from 'react';
import { Link } from 'react-router-dom';
import { useScrollReveal } from '../hooks/useAnimations';
import './CustomMouldingPage.css';

const toolingSteps = [
  { num: '01', badge: 'FEA & MFI', title: 'Moldflow Fill Analysis', desc: 'Fill simulations, shear stress profiling, injection clamp tonnage optimization, and clamp-up/ejection simulation.', metric: 'Clamp Sizing: Autodesk Moldflow', metricSub: 'Shear Rate Limit: < 49,000 1/s' },
  { num: '02', badge: 'Compound', title: 'Polymer Formulation', desc: 'Geometric closeup of prime-listed virgin resin with specified masterbatch, flame retardants, glass fibers, and UV stabilizers.', metric: 'Blending: Magazine Gravimetric', metricSub: 'Moisture PPM: < 0.02% Dessicant' },
  { num: '03', badge: '5-Axis CNC', title: 'Toolmaking & EDM', desc: 'Sub-micron CNC machining of Stavax® mould cores. Machine-cut EDM, copper electrodes, and SPL-Addmanship polish cavity treatment.', metric: 'High-Speed Spindle: 42,000 RPM', metricSub: 'Tolerance: < 0.005 mm' },
  { num: '04', badge: 'Metrology', title: 'Zeiss CMM Inspection', desc: 'Full 3D optical scanning, coordinate measurement machine touchprobes A5/622, First Article Inspection (FAI), and Cpk > 1.67 statistical.', metric: 'Optical Scanner: GOM ATOS Q', metricSub: 'Compliance: PPAP Level III' },
];

const polymerMatrix = [
  { name: '±HDPE (High-Density Polyethylene)', sub: 'Commodity Polyolefin', density: '0.86 – 0.97', tensile: '22 – 32', flexural: '1.0 – 1.4', hdt: '70°C', shrinkage: '1.8 – 2.8%', apps: 'Industrial crates, bulk chemical containers, pallet components' },
  { name: 'PP Copolymer (Impact Modified)', sub: 'Technical Polyolefin', density: '0.90 – 0.91', tensile: '26 – 34', flexural: '1.3 – 1.6', hdt: '95°C', shrinkage: '1.2 – 1.8%', apps: 'Automotive battery casings, snap-fit chassis, structural seating' },
  { name: 'Polycarbonate (Lexan / Makrolon)', sub: 'Amorphous Engineering Thermoplastic', density: '1.20 – 1.22', tensile: '50 – 72', flexural: '2.3 – 2.5', hdt: '130°C', shrinkage: '0.5 – 0.7%', apps: 'Optical housings, electrical switchgear, high-impact faceplates' },
  { name: 'POM (Polyoxymethylene) Delrin', sub: 'Semi-Crystalline Acetal', density: '1.41 – 1.43', tensile: '68 – 80', flexural: '2.8 – 3.2', hdt: '124°C', shrinkage: '1.8 – 2.3%', apps: 'Precision gears, valve components, bearings, fuel sender mechanisms' },
];

const dispatches = [
  { badge: '16-Cavity Medical', title: 'Polypropylene Syringe Barrel Suite', metric1: 'Cycle: 6.8s', metric2: 'Tolerances: ±0.008mm', img: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBNupFlnCxjA3-IP7V1mBLbomfHR-QDR5YPZTEcWhz6-B7u49tiRbXw5LQKbkJdeslCJ1zGjlU3s1jFHPNcmhnk2guHF67O0o4W3CpVBA6KmZgikCuKy1PW2l70wqelGZ1_0bjyXPv4mrbuzYTT3LsHT3toS8J77ZS0AawTBbfrY_Y1b6fI-ITNbPyJ7ahlOkVQVOJ0dRsumKlFfpYr2q6EZKbZoXVYkKJYd5CYKU4TB8ac6dGRtHZ7' },
  { badge: 'Heavy Automotive', title: 'Under-the-Hood Cooling Duct', metric1: 'Clamp: 850T', metric2: 'Weight: 425g', img: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCvIeSY7uHPxJ25i-RjRt2kXHlfHSgpyZYpxipnIzQjWdu-DjrDIORXoDMUcsikZKAgmYKeh4i75j-T-xeidpxO1d9GqMa6Ks1ZmEBQ64VqaqO4YUCa49hSSQdCC48I1O0XYUMy0ge9R49vjwZGq0HJGuJncuVtuzy-5hvQxWoOxv95YEdRQjModTcr_OKZWRTT-tpWIHneX0F7rhTXyflvbGSXsQfhv1UOIUDjhjfFHwD0By__J4AQ' },
  { badge: 'Large Logistics', title: 'Heavy Stackable Crate Mould', metric1: 'Clamp: 1000T', metric2: 'Cycle: 34.2s', img: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDmdlbyFlKKMAtUqKCJwfQzrgYMH9RyBbgVz3xHsIb9mSZV1mh-QIswHqDN5EGh9q1K8SSwXlaJMRxJz5bwzcfgdd6-WOy0RIZB0Ts2ldR3rWCta8NYV71mLWPG05zB8OtNCBbLMoC_OUmb8HiErcnxdaLOyEgvYwbfx7RecTDt9ziT4KbyMziFxfnUp5kfxjItaDQfJI4F2Aeqerz3iLqb2V6I_sFTsi8uzAg-7q8Hvc_Ytz6NpGXE' },
];

const CustomMouldingPage: React.FC = () => {
  const heroRef = useScrollReveal<HTMLElement>();
  const cadRef = useScrollReveal<HTMLElement>();
  const archRef = useScrollReveal<HTMLElement>();
  const matRef = useScrollReveal<HTMLElement>();
  const dispRef = useScrollReveal<HTMLElement>();

  return (
    <main className="dfm-page">
      {/* Hero */}
      <section className="dfm-hero section" ref={heroRef}>
        <div className="container reveal">
          <div className="badge badge-surface" style={{ width: 'fit-content', marginBottom: 'var(--space-xs)' }}>
            <span className="material-symbols-outlined icon-xs">precision_manufacturing</span>
            ENGINEERING MOULD PORTAL // INJECTION MOULDING & DFM
          </div>
          <h1 className="hero-title" style={{ maxWidth: 700 }}>
            Precision Mould Tooling & Computational DFM Telemetry
          </h1>
          <p className="hero-desc">
            Direct cloud interface into Hashim Motiwala's precision tooling engine. Run instantaneous design-for-manufacturing checks, evaluate volumetric resin rheology, and configure production-grade injection mould suites.
          </p>
          <div className="dfm-metrics-row">
            <div className="dfm-metric"><span className="dfm-metric-label">Clamping Scope</span><span className="dfm-metric-val">120T – 2,200T</span><span className="dfm-metric-sub">30 Hydraulic Cells</span></div>
            <div className="dfm-metric"><span className="dfm-metric-label">Mould Life Class</span><span className="dfm-metric-val">Class 101</span><span className="dfm-metric-sub">1,000,000+ Cycles Guaranteed</span></div>
            <div className="dfm-metric"><span className="dfm-metric-label">DFM Turnaround</span><span className="dfm-metric-val">&lt; 3 Hours</span><span className="dfm-metric-sub">Automated AI Telemetry</span></div>
            <div className="dfm-metric"><span className="dfm-metric-label">Core & Cavity Steels</span><span className="dfm-metric-val">H13 / S136 / H13</span><span className="dfm-metric-sub">50-55HRC Hardened</span></div>
          </div>
        </div>
      </section>

      {/* CAD Pre-Flight */}
      <section className="section section-alt" ref={cadRef}>
        <div className="container reveal">
          <div className="section-header">
            <div><span className="section-tag">Module 01 // Computational Injection</span><h2 className="section-title">CAD Pre-Flight & Moldflow Analysis Engine</h2></div>
            <div className="badge badge-surface">256-Bit Encrypted ITAR & ISO 27001 Secure File Vault</div>
          </div>
          <div className="cad-grid">
            <div className="cad-upload-area card">
              <div className="card-body" style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-md)' }}>
                <div className="cad-dropzone">
                  <span className="material-symbols-outlined icon-lg text-primary">cloud_upload</span>
                  <h3 className="text-headline-sm font-bold">Transmit 3D Native Geometry</h3>
                  <p className="text-body-sm text-on-surface-variant">Drag & drop your CAD model here, or browse from disk. We accept STEP, IGES, SLDPRT, DWG, DXF, and Parasolid files up to 350 MB.</p>
                  <div className="cad-formats">
                    {['.STP', '.STEP', '.IGES', '.IGS', '.SLDPRT', '.X_T'].map(f => <span key={f} className="badge badge-surface">{f}</span>)}
                  </div>
                </div>
                <div className="cad-features">
                  <div className="cad-feature"><span className="material-symbols-outlined icon-xs text-primary">shield</span> Mutual NDA Protection — Active upon receipt</div>
                  <div className="cad-feature"><span className="material-symbols-outlined icon-xs text-primary">speed</span> 48-Hour Pre-Process — Dx Materialized Response</div>
                  <div className="cad-feature"><span className="material-symbols-outlined icon-xs text-primary">person</span> Senior Tooling Lead — Assigned with 5 min</div>
                </div>
                <button className="btn btn-primary btn-lg w-full">
                  <span className="material-symbols-outlined icon-sm">play_arrow</span>
                  SUBMIT ENTERPRISE RFQ DIRECT TO TOOLING ENGINEERING
                </button>
              </div>
            </div>
            <div className="cad-rules card">
              <div className="card-body" style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-sm)' }}>
                <div><span className="section-tag">Diagnostics</span><h3 className="text-headline-sm font-bold">Active DFM Ruleset</h3><span className="badge badge-surface">ASTM D3835</span></div>
                <div className="rule-item"><span className="material-symbols-outlined icon-xs text-primary">check_circle</span><div><strong>Draft Angle Validation (Core / Cavity)</strong><p className="text-body-sm text-on-surface-variant">1.5° Standard</p></div></div>
                <div className="rule-item"><span className="material-symbols-outlined icon-xs text-primary">check_circle</span><div><strong>Wall Thickness & Sink Risk</strong><p className="text-body-sm text-on-surface-variant">1.2 mm – 4.1 mm</p></div></div>
                <div className="rule-item"><span className="material-symbols-outlined icon-xs text-primary">check_circle</span><div><strong>Gate Topology & Weld Lines</strong><p className="text-body-sm text-on-surface-variant">Sub-Gate / Hot Tip</p></div></div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Tooling Architecture */}
      <section className="section" ref={archRef}>
        <div className="container reveal">
          <div style={{ textAlign: 'center', marginBottom: 'var(--space-xl)' }}>
            <span className="section-tag">From Pellet to Precision Component</span>
            <h2 className="section-title" style={{ maxWidth: 700, margin: '0 auto' }}>End-to-End Tooling & Moulding Architecture</h2>
            <p className="section-desc" style={{ maxWidth: 600, margin: 'var(--space-xs) auto 0' }}>Engineered for zero-defect production. Every project proceeds through our unified TTC Industrial facility with deterministic stage gates.</p>
          </div>
          <div className="process-grid">
            {toolingSteps.map((s, i) => (
              <div className={`process-card reveal reveal-delay-${i + 1}`} key={s.num}>
                <div className="process-top"><span className="process-num">{s.num}</span><span className="badge badge-surface">{s.badge}</span></div>
                <h3 className="process-title">{s.title}</h3>
                <p className="process-desc">{s.desc}</p>
                <div className="process-footer" style={{ flexDirection: 'column', alignItems: 'flex-start', gap: '2px' }}>
                  <span className="process-metric">{s.metric}</span>
                  <span className="process-metric" style={{ opacity: 0.7 }}>{s.metricSub}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Polymer Material Matrix */}
      <section className="section section-alt" ref={matRef}>
        <div className="container reveal">
          <div className="section-header">
            <div><span className="section-tag">Module 02 // Rheology & Chemistry</span><h2 className="section-title">Engineering Polymer Material Matrix</h2></div>
            <p className="section-desc">Standard test conditions: 23°C @ 50% RH</p>
          </div>
          <div className="card table-scroll-wrap">
            <table className="data-table">
              <thead><tr><th>Polymer Classification</th><th>Density (g/cm³)</th><th>Tensile Strength (MPa)</th><th>Flexural Modulus (GPa)</th><th>HDT @ 0.45 MPa (°C)</th><th>Shrinkage Rate (%)</th><th>Typical Applications</th></tr></thead>
              <tbody>
                {polymerMatrix.map(r => (
                  <tr key={r.name}><td><span className="text-primary font-bold">{r.name}</span><br /><span className="text-body-sm text-on-surface-variant">{r.sub}</span></td><td>{r.density}</td><td>{r.tensile}</td><td>{r.flexural}</td><td>{r.hdt}</td><td>{r.shrinkage}</td><td className="text-body-sm">{r.apps}</td></tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </section>

      {/* Recent Dispatches */}
      <section className="section" ref={dispRef}>
        <div className="container reveal">
          <div className="section-header">
            <div><span className="section-tag">Factory Proven Tooling Cases</span><h2 className="section-title">Recent Enterprise Production Dispatches</h2></div>
            <Link to="/products" className="btn btn-outline btn-sm">Explore Complete SKU Catalog →</Link>
          </div>
          <div className="dispatches-grid">
            {dispatches.map(d => (
              <div className="dispatch-card card" key={d.title}>
                <div className="dispatch-img-wrap">
                  <img src={d.img} alt={d.title} loading="lazy" />
                  <span className="division-badge">{d.badge}</span>
                </div>
                <div className="card-body">
                  <h3 className="division-title">{d.title}</h3>
                  <div className="dispatch-metrics">
                    <span className="text-body-sm text-on-surface-variant">{d.metric1}</span>
                    <span className="text-body-sm text-on-surface-variant">{d.metric2}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="section section-highlight">
        <div className="container">
          <div className="cta-banner card">
            <div className="cta-content">
              <h2 className="cta-title">Have an urgent RFQ or proprietary CAD file?</h2>
              <p className="cta-desc">Our tooling engineering team provides signed non-disclosure agreements prior to CAD review.</p>
            </div>
            <div className="cta-actions">
              <Link to="/contact" className="btn btn-outline btn-lg">Email Engineering Desk</Link>
              <Link to="/contact" className="btn btn-primary btn-lg">Instant RFQ Portal</Link>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
};

export default CustomMouldingPage;
