import React, { useState, useMemo } from 'react';
import { useScrollReveal } from '../hooks/useAnimations';
import './ProductsPage.css';

const products = [
  { sku: 'CRT-6432-PP', resinTag: 'PP Virgin', category: 'crates', resin: 'PP', stock: '14,200', sector: 'Material Handling', cert: 'FDA 21 CFR Compliant', title: 'Euro Stacking Crate 600x400x320mm', desc: 'Reinforced rib design engineered for dynamic automated warehouse racking and conveyor transfers.', specs: [['Dimensions:', '600 x 400 x 320 mm'], ['Internal Vol / Weight:', '60 Litres / 2.85 kg'], ['Dynamic Payload:', '45 kg (Stacking: 500 kg)'], ['Operating Range:', '-20°C to +80°C']], price: '$14.50', unit: '/ unit (FOB JNPT)', moq: 'MOQ: 50 Units', img: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBjhTQBVqK4cL9eVBp27_9iXYQYAEa1lu0aWSbiCNh4lJs2bh9W6TpxggUlZgYYN4tbimjQgczZClBPJHhE9hYxpSfChIwmlb9btXMVS4d1vvQHDZWgN8T4PYHcowedECYoLRuu3uoYtVVqx_utOTU08PiKPGHcmqquLaekg8BZNoWUB9-1EvOeemk1xmhDO_etFhXjHICCHfWP9lO-OuBvFM36N2o-qTUTsURyDddpwbfiSuirfZd9' },
  { sku: 'POM-GEAR-M2', resinTag: 'Delrin 500P', category: 'precision', resin: 'POM', stock: '88,500', sector: 'Powertrain & Robotics', cert: 'DIN 3967 Gr. 8', title: 'Precision POM Industrial Spur Gears', desc: 'Self-lubricating homopolymer acetal gear trains with micro-moulded tooth flanks for silent kinematic operation.', specs: [['Gear Module / Pitch:', 'Module 2.0 / 36 Teeth'], ['Pitch Diameter:', '72.0 mm (±0.015mm)'], ['Tensile Strength:', '71 MPa (ISO 527)'], ['Coefficient of Friction:', '0.25 (Dry on steel)']], price: '$3.80', unit: '/ unit (FOB JNPT)', moq: 'MOQ: 100 Units', img: 'https://lh3.googleusercontent.com/aida-public/AB6AXuC5e9QQWcsraSVRun9uFtFCUZUykThNNesW_jYBwo0Ycc_qoOh4_aJnvquB8nA97dy9NcBoCCrcLfYELBHib039NasAxs9TYxMqBXW50bPG_oSj4fVplwPhsv_A8JDwpDBaSAb4QMVwVSk8x1Khff_ESHqsMwkfG6H7jg0e2wSp1T4qfCgFxd3zvW3JAlLHRV79ESWPf3BCd-DK-Z89UpkE5xmQC8mCstWT2JM8aclh91BKDOqoc9u6' },
  { sku: 'DRM-200-UN', resinTag: 'HMW-HDPE', category: 'drums', resin: 'HDPE', stock: '3,400', sector: 'Chemical & Petrochem', cert: 'UN 1H1/Y1.9/200', title: 'Hermetic Leak-Proof HDPE Drum 200L', desc: 'Triple-tested seamless blow moulded container for aggressive acids, solvents, and bulk specialty chemicals.', specs: [['Nominal Volume:', '200 Litres (53 Gal)'], ['Drop Test Rating:', '1.9m at -18°C'], ['Bung Configuration:', '2" Buttress + 2" NPS'], ['Tare Weight:', '8.6 kg ± 0.2 kg']], price: '$38.00', unit: '/ unit (FOB JNPT)', moq: 'MOQ: 10 Units', img: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAAzj17IImQVz6C3MVK_NKYPuMaQ84_NZbhfdCxeek3GQ0qGvZ4dBx12EwLeWKU_nfP2SEmoWCzeOQH554_EL1BIkA-dSNuBrd1OpV-M0HvBPYjAI81GCMNVt1-a4GfqJ9xwTT_RfTXYONvDuguS2kluDJwPhwpjCf2PuANbQU3xMIvTcIWS9-gYUqvbS2CmLo21PlkdgPJtU4MGF0SxH2jKpEkodwF2tPWWah-CZvLJ-jOLOe-vlRo' },
  { sku: 'PNL-LX-400', resinTag: 'Lexan 103R', category: 'panels', resin: 'PC', stock: '1,200 m²', sector: 'Cleanroom & Shielding', cert: 'UL94 V-0 Rated', title: 'Optical Polycarbonate Safety Panels', desc: 'Impact-resistant transparent polymer barrier sheets with dual-side anti-scratch and UV weathering stabilization.', specs: [['Sheet Thickness:', '4.0 mm / 6.0 mm / 8.0 mm'], ['Light Transmission:', '89% (ASTM D1003)'], ['Charpy Impact:', 'No Break (ISO 179)'], ['Flame Class:', 'UL94 V-0 at 3.0mm']], price: '$72.00', unit: '/ m² (FOB JNPT)', moq: 'MOQ: 5 m²', img: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCQDiwpljWDYpglTed7tq4qSLAwZqi4_l_ZUg1Ufy39rKSf479590jAhoDYN0sU-Ytf3LhUy6JyiW4xDHM72fz3puI2Y2hTWUXCMmkFFpoLnP3S9xLfFulkKJGlL-dDMT-2QwmbvljtylOWCAw0UF3-ywb3_TvzLEWvH7MQZuFKzwrhGaKikBghAY259AmJGYpLKJ27wrWUlf6OwXDmRTAIk0ZoyZ1ovRICat96An2J7qNznxuNfwQH' },
  { sku: 'CRT-AGR-5428', resinTag: 'HDPE Copolymer', category: 'crates', resin: 'HDPE', stock: '32,000', sector: 'Cold Chain & Agri', cert: 'Cold Shock Tested -30°C', title: 'Ventilated Cold-Storage Agri Crate', desc: 'Engineered slot perforation matrix optimizes hydro-cooling airflow and flash refrigeration efficiency.', specs: [['Footprint:', '540 x 360 x 280 mm'], ['Max Load Capacity:', '25 kg (Static stack: 300 kg)'], ['Resin Melt Index:', '7.0 g/10min (ISO 1133)'], ['Cleaning Suitability:', 'Steam sanitized at 110°C']], price: '$9.90', unit: '/ unit (FOB JNPT)', moq: 'MOQ: 100 Units', img: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBtfRIMELzbiJDYcALvrclBNkmdRhGcqcClGP_nSV54QURPgYvPllyy2SKmsYZXjhtps2M8mwaGmlRYEZqQtXDJKeasA8eubfiwJR3eBra1GKoKnb5u4ySJ5Tip8v_Tguzg3viRF13tWFo8EiYu1T1txtXRZScxiYMEiVLPHAbkZiHEwKQRi56EDdBgg0UlbNvmHI0nOPxHxxSTIcM9eK2G9qwzv53RUdBI_i6vVC9ZZqdHhKC-c4Lw' },
  { sku: 'ENC-IP67-ABS', resinTag: 'FR-ABS + Brass', category: 'precision', resin: 'ABS', stock: '23,200', sector: 'IoT & Automation', cert: 'IP67 Ingress Rated', title: 'IP67 Electronic Injection Enclosures', desc: 'Features robotic liquid PUR gasket channel and pre-moulded knurled brass inserts for rugged industrial telemetry.', specs: [['Chassis Dimensions:', '180 x 130 x 65 mm'], ['Moulding Inserts:', '4x M4 Brass blind nuts'], ['Flammability Index:', 'UL94 V-0 self-extinguishing'], ['Wall Thickness:', '3.2 mm uniform draft']], price: '$6.40', unit: '/ unit (FOB JNPT)', moq: 'MOQ: 250 Units', img: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBrmO4bYfPLiEoHlU5wmRkNk1OAnpKn_pkDCvgZ5IjixFBtiIYFeR-_v9I8hfm_47sVdJv6x3j1qZJcRwuBIcQ15xUDQgcPUs9ljSeKviDT0_8ENQ6DTvcc-aaKXvzfnF6EpACO4DIO6VBbo7hGoBSIobu8M3QWaAubL4x6edAytzv1J7otEVIOpPrD39IxS8xvbOn42n--m1wT1R4t1xKIrDLspiGq_ucXqa80p9VqXLIXuUDSFt_9' },
];

const categories = [
  { key: 'all', label: 'All Products (450+)' },
  { key: 'crates', label: 'Crates & Pallets' },
  { key: 'precision', label: 'Precision Injection Parts' },
  { key: 'drums', label: 'Chemical Drums & Pails' },
  { key: 'panels', label: 'Polymer Panels & Housings' },
];

const resinTable = [
  { name: 'High-Density PE (HDPE)', test: 'ASTM D638 / ISO 527', yield: '28 - 32 MPa', chem: 'Acids / Bases: Superior', hdt: '75°C @ 0.45 MPa', app: 'UN Drums, Agri Crates' },
  { name: 'Polypropylene (PP Virgin)', test: 'ASTM D790 / ISO 178', yield: '35 - 40 MPa', chem: 'Aqueous Salts: High', hdt: '102°C @ 0.45 MPa', app: 'Euro Crates, Food Pails' },
  { name: 'Delrin POM Acetal', test: 'ASTM D695 / ISO 604', yield: '70 - 75 MPa', chem: 'Fuel / Solvents: High', hdt: '158°C @ 0.45 MPa', app: 'Kinematic Gears, Bushings' },
  { name: 'Lexan Polycarbonate (PC)', test: 'ASTM D256 / ISO 180', yield: '65 - 72 MPa', chem: 'Hydrocarbons: Moderate', hdt: '120°C @ 0.45 MPa', app: 'Safety Shields, Lenses' },
];

const transitRoutes = [
  { region: 'GCC REGION', dest: 'Jebel Ali & Dammam', desc: 'Direct sailings to UAE, Saudi Arabia, Oman & Qatar ports.', transit: '3 – 5', unit: 'Days', freq: 'Sailing: 4x Weekly', carriers: 'Carriers: Maersk / MSC / Hapag' },
  { region: 'EUROPE & UK', dest: 'Rotterdam & Antwerp', desc: 'Direct calls via Suez Canal to Genoa, Hamburg, Felixstowe.', transit: '18 – 22', unit: 'Days', freq: 'Sailing: 3x Weekly', carriers: 'Carriers: CMA CGM / ONE / MSC' },
  { region: 'NORTH AMERICA', dest: 'Newark, Houston, LA', desc: 'US East & Gulf Coast express routes, Savannah & Los Angeles.', transit: '24 – 28', unit: 'Days', freq: 'Sailing: 2x Weekly', carriers: 'Carriers: Hapag-Lloyd / Maersk' },
  { region: 'SOUTHEAST ASIA', dest: 'Singapore & Port Klang', desc: 'Rapid feeder & mainline transit to ASEAN logistics hubs.', transit: '7 – 10', unit: 'Days', freq: 'Sailing: 5x Weekly', carriers: 'Carriers: Evergreen / Wan Hai / COSCO' },
];

const ProductsPage: React.FC = () => {
  const [activeCategory, setActiveCategory] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [resinFilter, setResinFilter] = useState('');
  const [rfqItems, setRfqItems] = useState<string[]>([]);

  const heroRef = useScrollReveal<HTMLElement>();
  const tableRef = useScrollReveal<HTMLElement>();
  const freightRef = useScrollReveal<HTMLElement>();

  const filteredProducts = useMemo(() => {
    return products.filter((p) => {
      const catMatch = activeCategory === 'all' || p.category === activeCategory;
      const resinMatch = !resinFilter || p.resin === resinFilter;
      const searchMatch = !searchQuery || p.title.toLowerCase().includes(searchQuery.toLowerCase()) || p.sku.toLowerCase().includes(searchQuery.toLowerCase()) || p.resin.toLowerCase().includes(searchQuery.toLowerCase());
      return catMatch && resinMatch && searchMatch;
    });
  }, [activeCategory, resinFilter, searchQuery]);

  const addToRfq = (sku: string) => {
    setRfqItems((prev) => prev.includes(sku) ? prev : [...prev, sku]);
  };

  return (
    <main className="products-page">
      {/* Hero */}
      <section className="products-hero section" ref={heroRef}>
        <div className="container reveal">
          <div className="products-hero-top">
            <div className="products-hero-content">
              <div className="badge badge-light">
                <span className="ticker-dot animate-pulse" /> LIVE FACTORY INVENTORY FEED // NAVI MUMBAI CENTRAL PLANT
              </div>
              <h1 className="hero-title" style={{ fontSize: '40px', lineHeight: '48px' }}>
                Production-Ready Injection Components & Industrial Assemblies
              </h1>
              <p className="hero-desc">
                Direct high-tonnage moulding dispatch across heavy-duty Euro crates, UN-certified chemical containers, aerospace Delrin gears, and cleanroom optical enclosures.
              </p>
            </div>
            <div className="products-hero-actions">
              <button className="btn btn-outline">
                <span className="material-symbols-outlined icon-sm text-primary">download</span>
                Download Master TDS (PDF)
              </button>
              <button className="btn btn-primary">
                <span className="material-symbols-outlined icon-sm">inventory_2</span>
                Batch RFQ Manifest ({rfqItems.length})
              </button>
            </div>
          </div>
          <div className="products-metrics">
            <div className="pm-card"><span className="pm-label">Active Stock On Floor</span><div className="pm-val">162,500 <small>SKUs</small></div><span className="pm-sub">Validated 18 mins ago by Plant ERP</span></div>
            <div className="pm-card"><span className="pm-label">Port Drayage Direct</span><div className="pm-val">38 <small>Mins</small></div><span className="pm-sub">Navi Mumbai MIDC to JNPT Port</span></div>
            <div className="pm-card"><span className="pm-label">Tooling Capability</span><div className="pm-val">450+ <small>Active Dies</small></div><span className="pm-sub">In-house EDM & CNC maintenance</span></div>
            <div className="pm-card"><span className="pm-label">SPC Process Capability</span><div className="pm-val">Cpk 1.67 <small>Pass</small></div><span className="pm-sub">Six Sigma tolerance validation</span></div>
          </div>
        </div>
      </section>

      {/* Sticky Filter */}
      <section className="products-filter-bar">
        <div className="container filter-bar-inner">
          <div className="filter-pills">
            {categories.map((cat) => (
              <button key={cat.key} className={`filter-pill${activeCategory === cat.key ? ' active' : ''}`} onClick={() => setActiveCategory(cat.key)}>
                {cat.label}
              </button>
            ))}
          </div>
          <div className="filter-controls">
            <div className="search-box">
              <span className="material-symbols-outlined icon-sm">search</span>
              <input type="text" placeholder="Search SKU, resin, standard..." value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)} className="search-input" />
            </div>
            <select className="select" value={resinFilter} onChange={(e) => setResinFilter(e.target.value)}>
              <option value="">Resin: All Grades</option>
              <option value="PP">PP (Polypropylene Virgin)</option>
              <option value="HDPE">HDPE (High-Density PE)</option>
              <option value="POM">POM (Delrin Acetal)</option>
              <option value="PC">PC (Lexan Polycarbonate)</option>
              <option value="ABS">ABS (Impact Grade)</option>
            </select>
          </div>
        </div>
      </section>

      {/* Product Grid */}
      <section className="section">
        <div className="container">
          <div className="products-grid-header">
            <div className="flex items-center gap-xs">
              <h2 className="text-headline-md font-bold">Standard Manufacturing Catalog</h2>
              <span className="badge badge-light">Showing {filteredProducts.length} High-Volume Assemblies</span>
            </div>
          </div>
          <div className="products-grid">
            {filteredProducts.map((p) => (
              <div className="product-card card" key={p.sku}>
                <div className="product-img-wrap">
                  <img src={p.img} alt={p.title} loading="lazy" />
                  <div className="product-badges">
                    <span className="product-sku-badge">SKU: {p.sku}</span>
                    <span className="badge badge-primary">{p.resinTag}</span>
                  </div>
                  <div className="product-stock">
                    <span className="ticker-dot animate-pulse" /> {p.stock} In Stock
                  </div>
                </div>
                <div className="card-body product-body">
                  <div className="product-meta-row">
                    <span className="product-sector">{p.sector}</span>
                    <span className="product-cert">{p.cert}</span>
                  </div>
                  <h3 className="product-title">{p.title}</h3>
                  <p className="product-desc">{p.desc}</p>
                  <div className="product-specs">
                    {p.specs.map(([k, v]) => (<div className="spec-row" key={k}><span>{k}</span><span className="spec-val">{v}</span></div>))}
                  </div>
                  <div className="product-pricing">
                    <div><span className="product-price">{p.price}</span><span className="product-unit">{p.unit}</span></div>
                    <span className="product-moq">{p.moq}</span>
                  </div>
                  <div className="product-actions">
                    <button className="btn btn-outline btn-sm"><span className="material-symbols-outlined icon-xs">visibility</span> View TDS</button>
                    <button className="btn btn-primary btn-sm" onClick={() => addToRfq(p.sku)} disabled={rfqItems.includes(p.sku)}>
                      <span className="material-symbols-outlined icon-xs">{rfqItems.includes(p.sku) ? 'check_circle' : 'add_circle'}</span>
                      {rfqItems.includes(p.sku) ? 'Added' : 'Add to RFQ'}
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
          {filteredProducts.length === 0 && (
            <div className="no-results">
              <span className="material-symbols-outlined icon-lg text-primary">search_off</span>
              <p>No products match your current filters. Try adjusting the category or resin grade.</p>
            </div>
          )}
        </div>
      </section>

      {/* ASTM Table */}
      <section className="section section-alt" ref={tableRef}>
        <div className="container reveal">
          <div className="section-header">
            <div><span className="section-tag">Polymer Engineering Matrix</span><h2 className="section-title">Resin Characteristics & Standard ASTM Validation</h2></div>
            <p className="section-desc">Every batch undergoes in-house melt flow indexing (MFI), differential scanning calorimetry (DSC), and tensile elongation testing prior to mould ejection.</p>
          </div>
          <div className="card table-scroll-wrap">
            <table className="data-table">
              <thead><tr><th>Polymer Classification</th><th>ASTM / ISO Test</th><th>Yield Strength</th><th>Chemical Resistance</th><th>Heat Deflection (HDT)</th><th style={{ textAlign: 'right' }}>Primary Application</th></tr></thead>
              <tbody>
                {resinTable.map((r) => (
                  <tr key={r.name}><td className="text-primary font-bold">{r.name}</td><td className="text-on-surface-variant">{r.test}</td><td className="font-semibold">{r.yield}</td><td><span className="badge badge-surface">{r.chem}</span></td><td>{r.hdt}</td><td style={{ textAlign: 'right' }}>{r.app}</td></tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </section>

      {/* Freight */}
      <section className="section" ref={freightRef}>
        <div className="container reveal">
          <div className="section-header">
            <div><span className="section-tag">JNPT Port Export Gateway (Nhava Sheva)</span><h2 className="section-title">High-Cube Freight Optimization & LCL / FCL Container Consolidation</h2></div>
          </div>
          <div className="transit-grid">
            {transitRoutes.map((r) => (
              <div className="transit-card card" key={r.region}>
                <div className="card-body">
                  <span className="transit-region">{r.region}</span>
                  <h3 className="transit-dest">{r.dest}</h3>
                  <p className="transit-desc">{r.desc}</p>
                  <div className="transit-time">
                    <span className="transit-label">AVERAGE TRANSIT</span>
                    <span className="transit-val">{r.transit} <small>{r.unit}</small></span>
                  </div>
                  <div className="transit-meta">
                    <span>{r.freq}</span>
                    <span>{r.carriers}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
};

export default ProductsPage;
