import React from 'react';
import { useScrollReveal } from '../hooks/useAnimations';
import './ContactPage.css';

const freightServices = [
  { icon: 'local_shipping', title: '40ft HC & 20ft Direct Bay Stuffing', desc: '18 articulated hydraulic dock levellers align directly with heavy export containers. In-factory palletization prevents shock load and stack compression during sea transit.', badge: '100% Floor & Slip-Sheet Palletized' },
  { icon: 'shield', title: 'Moisture Barrier & VCI Packaging', desc: 'Export moulds and high-precision polymer components sealed with heavy-gauge LDPE shrink wrap, industrial desiccant sachets, and Volatile Corrosion Inhibitor (VCI) jackets.', badge: 'MIL-Spec Sea-Safe Humidity Barrier' },
  { icon: 'directions_boat', title: 'JNPT Port Express Corridor', desc: 'Strategically situated 28 km from Jawaharlal Nehru Port (Nhava Sheva). Guaranteed direct container gate-in within 40 minutes of factory dispatch, reducing demurrage.', badge: 'Direct Port Delivery [DPD] Enabled' },
];

const globalRoutes = [
  { region: 'GCC REGION', dest: 'Jebel Ali & Dammam', desc: 'Direct sailings to UAE, Saudi Arabia, Oman & Qatar ports.', transit: '3 – 5', unit: 'Days', freq: 'Sailing: 4x Weekly', carriers: 'Carriers: Maersk / MSC / Hapag' },
  { region: 'EUROPE & UK', dest: 'Rotterdam & Antwerp', desc: 'Direct calls via Suez Canal to Genoa, Hamburg, Felixstowe.', transit: '18 – 22', unit: 'Days', freq: 'Sailing: 3x Weekly', carriers: 'Carriers: CMA CGM / ONE / MSC' },
  { region: 'NORTH AMERICA', dest: 'Newark, Houston, LA', desc: 'US East & Gulf Coast express routes, Savannah & Los Angeles.', transit: '24 – 28', unit: 'Days', freq: 'Sailing: 2x Weekly', carriers: 'Carriers: Hapag-Lloyd / Maersk' },
  { region: 'SOUTHEAST ASIA', dest: 'Singapore & Port Klang', desc: 'Rapid feeder & mainline transit to ASEAN logistics hubs.', transit: '7 – 10', unit: 'Days', freq: 'Sailing: 5x Weekly', carriers: 'Carriers: Evergreen / Wan Hai / COSCO' },
];

const ContactPage: React.FC = () => {
  const heroRef = useScrollReveal<HTMLElement>();
  const formRef = useScrollReveal<HTMLElement>();
  const freightRef = useScrollReveal<HTMLElement>();
  const globalRef = useScrollReveal<HTMLElement>();

  return (
    <main className="contact-page">
      {/* Hero */}
      <section className="contact-hero section" ref={heroRef}>
        <div className="container reveal">
          <div className="badge badge-surface" style={{ width: 'fit-content', marginBottom: 'var(--space-xs)' }}>
            <span className="material-symbols-outlined icon-xs">factory</span>
            OPERATIONAL ACCESS POINT // NAVI MUMBAI INDUSTRIAL CORRIDOR
          </div>
          <h1 className="hero-title" style={{ maxWidth: 700 }}>
            Factory HQ, Direct Procurement & Tooling Foundry
          </h1>
          <p className="hero-desc">
            Direct integration with TTC Navi Mumbai plant operations. Dispatch 3D CAD files (.STEP, .IGES) directly to our toolroom metallurgy and DFM engineers with full NDA encryption.
          </p>
          <div className="contact-hero-actions">
            <button className="btn btn-primary btn-lg" onClick={() => document.getElementById('rfq-form')?.scrollIntoView({ behavior: 'smooth' })}>
              <span className="material-symbols-outlined icon-sm">arrow_downward</span> Jump to RFQ Form
            </button>
            <button className="btn btn-outline btn-lg" onClick={() => document.getElementById('freight-section')?.scrollIntoView({ behavior: 'smooth' })}>
              <span className="material-symbols-outlined icon-sm text-primary">directions_boat</span> Ocean Freight Matrix
            </button>
          </div>
          <div className="dfm-metrics-row">
            <div className="dfm-metric"><span className="dfm-metric-label">Monthly Melt Run</span><span className="dfm-metric-val">3,200+ MT</span><span className="dfm-metric-sub">Virgin Polyolefins & Engineering Grades</span></div>
            <div className="dfm-metric"><span className="dfm-metric-label">Dispatch Docks</span><span className="dfm-metric-val">18 Bays</span><span className="dfm-metric-sub">Hydraulic Dock Levellers (40ft HC)</span></div>
            <div className="dfm-metric"><span className="dfm-metric-label">JNPT Port Arterial</span><span className="dfm-metric-val">28 km</span><span className="dfm-metric-sub">NH-348 Express Corridor (~55 min)</span></div>
            <div className="dfm-metric"><span className="dfm-metric-label">Quality Governance</span><span className="dfm-metric-val">ISO 9001</span><span className="dfm-metric-sub">Dun & Bradstreet Reg. Verified Foundry</span></div>
          </div>
        </div>
      </section>

      {/* RFQ Form & Location */}
      <section className="section section-alt" id="rfq-form" ref={formRef}>
        <div className="container reveal">
          <div className="contact-grid">
            <div className="rfq-form-wrap card">
              <div className="card-body" style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-md)' }}>
                <div className="flex items-center gap-xs"><span className="material-symbols-outlined icon-sm text-primary">request_quote</span><h2 className="text-headline-md font-bold">Enterprise Polymer & Tooling RFQ</h2></div>
                <p className="text-body-sm text-on-surface-variant">Direct queue to Head of Tooling Engineering. Attach production drawings, surface roughness specifications (VDI 3400 / SPI), and estimated annual run rates.</p>
                <div className="form-grid-2">
                  <div className="form-group"><label className="form-label">Full Name *</label><input className="input" placeholder="e.g., Rajesh Mehta / John Vance" /></div>
                  <div className="form-group"><label className="form-label">Company / Industrial Entity *</label><input className="input" placeholder="e.g., Apex Automotive OEM LLC" /></div>
                  <div className="form-group"><label className="form-label">Corporate Email *</label><input className="input" type="email" placeholder="procurement@entity.com" /></div>
                  <div className="form-group"><label className="form-label">Direct Phone / WhatsApp *</label><input className="input" placeholder="+91 (+1) Country Code + Number" /></div>
                </div>
                <div className="form-grid-2">
                  <div className="form-group"><label className="form-label">Target Polymer Resin *</label><select className="select"><option>High-Density Polyethylene (HDPE – Injec...</option><option>PP Copolymer (Impact)</option><option>Polycarbonate (Lexan)</option><option>POM Delrin</option><option>ABS</option></select></div>
                  <div className="form-group"><label className="form-label">Initial Production Batch Volume *</label><input className="input" placeholder="Pilot Run: 10,000 to 25,000 pcs" /></div>
                </div>
                <div><label className="form-label">Process Specifications & Quality Demands</label>
                  <div className="checkbox-grid">
                    {['Hot Runner System', 'Moldflow DFM Simulation', 'In-Mould Labeling (IML)', 'FDA Food-Contact Cert', 'CMM Inspection Report'].map(c => (<label className="checkbox-wrapper" key={c}><input type="checkbox" /><span className="text-body-sm">{c}</span></label>))}
                  </div>
                </div>
                <div className="form-group"><label className="form-label">CAD / 3D Model Attachment (.STEP, .STP, .IGES, .X_T, .DWG)</label>
                  <div className="file-drop"><span className="material-symbols-outlined icon-md text-primary">cloud_upload</span><p className="text-body-sm text-on-surface-variant">Drag and drop CAD data or browse files</p><span className="text-body-sm text-on-surface-variant">Max 120MB</span></div>
                </div>
                <div className="form-group"><label className="form-label">Geometry, Critical Dimensions & Special Requirements</label><textarea className="input" rows={3} placeholder="State critical tolerances (e.g., +/- 0.05 mm), surface finish requirements (e.g., SPI-A2, VDI 24), cycle-time goals, or custom masterbatch/Pantone codes..." /></div>
                <button className="btn btn-primary btn-lg w-full">
                  <span className="material-symbols-outlined icon-sm">play_arrow</span>
                  SUBMIT ENTERPRISE RFQ DIRECT TO TOOLING ENGINEERING
                </button>
              </div>
            </div>
            <div className="contact-info-col">
              <div className="card">
                <div className="card-body" style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-md)' }}>
                  <div><span className="section-tag">TTC Industrial Plant #1</span><h3 className="text-headline-sm font-bold">Toolroom & Works HQ</h3><p className="text-body-sm text-on-surface-variant">Hashim Motiwala Plastic & Polymer Engineering Pvt. Ltd.</p></div>
                  <div className="contact-address">
                    <strong>Pawane Industrial Complex:</strong>
                    <p>Plot W-14, TTC Industrial Area, MIDC, Pawane,</p>
                    <p>Thane-Belapur Corridor, Navi Mumbai, MH 400705.</p>
                    <p className="text-body-sm text-primary" style={{ marginTop: 4 }}>→ Direct Access via Thane-Belapur Expressway</p>
                  </div>
                  <div className="contact-lines">
                    <div className="contact-line"><span className="material-symbols-outlined icon-sm text-primary">build</span><div><strong>Tooling & Moldflow Engineering</strong><span>+91 (022) 6842-8810</span></div></div>
                    <div className="contact-line"><span className="material-symbols-outlined icon-sm text-primary">shopping_cart</span><div><strong>Commercial Procurement & Resins</strong><span>+91 (022) 6842-8822</span></div></div>
                    <div className="contact-line"><span className="material-symbols-outlined icon-sm text-primary">local_shipping</span><div><strong>Bay Dispatch & Freight Dock Desk</strong><span>+91 (022) 6842-8845</span></div></div>
                  </div>
                  <div className="cert-badges-row">
                    {['ISO 9001:2015 QMS', 'ASTM D838 TESTING', 'REACH / RoHS PASS', 'CE COMPLIANT'].map(b => <span className="badge badge-surface" key={b}>{b}</span>)}
                  </div>
                </div>
              </div>
              <div className="card">
                <div className="card-body">
                  <div className="flex items-center gap-xs"><span className="material-symbols-outlined icon-sm text-primary">visibility</span><h3 className="text-headline-sm font-bold">Visit & Tool Inspection Protocol</h3></div>
                  <p className="text-body-sm text-on-surface-variant" style={{ marginTop: 'var(--space-xs)' }}>Plant visits for mould trials (T0/T1/T2) and pilot tool inspection require 48-hour prior clearance. Factory safety orientation and PPE provided at Security Gate 01.</p>
                  <p className="text-body-sm" style={{ marginTop: 'var(--space-xs)' }}><strong>Gate Hours: 08:00 – 20:00 IST</strong></p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Freight */}
      <section className="section" id="freight-section" ref={freightRef}>
        <div className="container reveal">
          <div className="section-header">
            <div><span className="section-tag">Export Infrastructure</span><h2 className="section-title">Intermodal Ocean Freight & Direct Container Stuffing</h2></div>
            <p className="section-desc">Factory-floor container stuffing minimizes handling, prevents abrasion, and speeds up customs dispatch directly via JNPT Port.</p>
          </div>
          <div className="freight-cards">
            {freightServices.map(f => (
              <div className="freight-card card" key={f.title}>
                <div className="card-body" style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-sm)' }}>
                  <span className="material-symbols-outlined icon-lg text-primary">{f.icon}</span>
                  <h3 className="text-headline-sm font-bold">{f.title}</h3>
                  <p className="text-body-sm text-on-surface-variant">{f.desc}</p>
                  <span className="badge badge-surface">{f.badge}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Global Transit */}
      <section className="section section-alt" ref={globalRef}>
        <div className="container reveal">
          <div className="section-header">
            <div><span className="section-tag">Worldwide Export Reach</span><h2 className="section-title">Global Freight Hub & Maritime Transit Matrix</h2></div>
            <span className="badge badge-surface">Origin Terminal: JNPT / Nhava Sheva (INNSA)</span>
          </div>
          <div className="transit-grid">
            {globalRoutes.map(r => (
              <div className="transit-card card" key={r.region}>
                <div className="card-body">
                  <span className="transit-region">{r.region}</span>
                  <h3 className="transit-dest">{r.dest}</h3>
                  <p className="transit-desc">{r.desc}</p>
                  <div className="transit-time"><span className="transit-label">AVERAGE TRANSIT</span><span className="transit-val">{r.transit} <small>{r.unit}</small></span></div>
                  <div className="transit-meta"><span>{r.freq}</span><span>{r.carriers}</span></div>
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
              <h2 className="cta-title">Need Incoterms (FOB JNPT / CIF Port of Destination) Matrix?</h2>
              <p className="cta-desc">Our export logistics desk computes landed container costs, insurance, and export custom tariffs within 6 working hours.</p>
            </div>
            <div className="cta-actions">
              <button className="btn btn-primary btn-lg w-full">
                <span className="material-symbols-outlined icon-sm">play_arrow</span>
                INITIATE PORT COST CALCULATION & CONTAINER BOOKING
              </button>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
};

export default ContactPage;
