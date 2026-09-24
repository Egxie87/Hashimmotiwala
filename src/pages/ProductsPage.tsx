import React, { useState, useMemo } from 'react';
import { useScrollReveal } from '../hooks/useAnimations';
import { useRfq } from '../hooks/useRfq';
import TdsModal, { type TdsData } from '../components/TdsModal';
import Disclosure from '../components/ui/Disclosure';
import Dropdown from '../components/ui/Dropdown';
import StatStrip, { type Stat } from '../components/ui/StatStrip';
import '../styles/pages/ProductsPage.css';

interface ProductItem extends TdsData {
  category: string;
  stock: string;
  sector: string;
  desc: string;
  priceUsd: number;
  priceInr: number;
  unit: string;
  moq: string;
  img: string;
}

const products: ProductItem[] = [
  {
    sku: 'CRT-6432-PP',
    resinTag: 'PP Virgin',
    category: 'crates',
    resin: 'PP',
    stock: '14,200',
    sector: 'Material Handling',
    cert: 'FDA 21 CFR Compliant',
    title: 'Euro Stacking Crate 600x400x320mm',
    desc: 'Reinforced rib design engineered for dynamic automated warehouse racking and conveyor transfers.',
    specs: [
      ['Dimensions:', '600 x 400 x 320 mm'],
      ['Internal Vol / Weight:', '60 Litres / 2.85 kg'],
      ['Dynamic Payload:', '45 kg (Stacking: 500 kg)'],
      ['Operating Range:', '-20°C to +80°C'],
    ],
    technicalDetails: {
      density: '0.905 g/cm³',
      meltFlowIndex: '12.0 g/10min',
      tensileStrength: '31.0 MPa',
      flexuralModulus: '1,450 MPa',
      heatDeflection: '98°C',
      mouldShrinkage: '1.2 – 1.8%',
      processingTemp: '200°C – 240°C',
    },
    priceUsd: 14.50,
    priceInr: 1210,
    unit: '/ unit (FOB JNPT)',
    moq: 'MOQ: 50 Units',
    img: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBjhTQBVqK4cL9eVBp27_9iXYQYAEa1lu0aWSbiCNh4lJs2bh9W6TpxggUlZgYYN4tbimjQgczZClBPJHhE9hYxpSfChIwmlb9btXMVS4d1vvQHDZWgN8T4PYHcowedECYoLRuu3uoYtVVqx_utOTU08PiKPGHcmqquLaekg8BZNoWUB9-1EvOeemk1xmhDO_etFhXjHICCHfWP9lO-OuBvFM36N2o-qTUTsURyDddpwbfiSuirfZd9',
  },
  {
    sku: 'POM-GEAR-M2',
    resinTag: 'Delrin 500P',
    category: 'precision',
    resin: 'POM',
    stock: '88,500',
    sector: 'Powertrain & Robotics',
    cert: 'DIN 3967 Gr. 8',
    title: 'Precision POM Industrial Spur Gears',
    desc: 'Self-lubricating homopolymer acetal gear trains with micro-moulded tooth flanks for silent kinematic operation.',
    specs: [
      ['Gear Module / Pitch:', 'Module 2.0 / 36 Teeth'],
      ['Pitch Diameter:', '72.0 mm (±0.015mm)'],
      ['Tensile Strength:', '71 MPa (ISO 527)'],
      ['Coefficient of Friction:', '0.25 (Dry on steel)'],
    ],
    technicalDetails: {
      density: '1.42 g/cm³',
      meltFlowIndex: '9.0 g/10min',
      tensileStrength: '71.0 MPa',
      flexuralModulus: '2,900 MPa',
      heatDeflection: '122°C',
      mouldShrinkage: '1.9 – 2.3%',
      processingTemp: '205°C – 225°C',
    },
    priceUsd: 3.80,
    priceInr: 315,
    unit: '/ unit (FOB JNPT)',
    moq: 'MOQ: 100 Units',
    img: 'https://lh3.googleusercontent.com/aida-public/AB6AXuC5e9QQWcsraSVRun9uFtFCUZUykThNNesW_jYBwo0Ycc_qoOh4_aJnvquB8nA97dy9NcBoCCrcLfYELBHib039NasAxs9TYxMqBXW50bPG_oSj4fVplwPhsv_A8JDwpDBaSAb4QMVwVSk8x1Khff_ESHqsMwkfG6H7jg0e2wSp1T4qfCgFxd3zvW3JAlLHRV79ESWPf3BCd-DK-Z89UpkE5xmQC8mCstWT2JM8aclh91BKDOqoc9u6',
  },
  {
    sku: 'DRM-200-UN',
    resinTag: 'HMW-HDPE',
    category: 'drums',
    resin: 'HDPE',
    stock: '3,400',
    sector: 'Chemical & Petrochem',
    cert: 'UN 1H1/Y1.9/200',
    title: 'Hermetic Leak-Proof HDPE Drum 200L',
    desc: 'Triple-tested seamless blow moulded container for aggressive acids, solvents, and bulk specialty chemicals.',
    specs: [
      ['Nominal Volume:', '200 Litres (53 Gal)'],
      ['Drop Test Rating:', '1.9m at -18°C'],
      ['Bung Configuration:', '2" Buttress + 2" NPS'],
      ['Tare Weight:', '8.6 kg ± 0.2 kg'],
    ],
    technicalDetails: {
      density: '0.952 g/cm³',
      meltFlowIndex: '7.0 g/10min',
      tensileStrength: '28.5 MPa',
      flexuralModulus: '1,150 MPa',
      heatDeflection: '78°C',
      mouldShrinkage: '1.8 – 2.5%',
      processingTemp: '190°C – 220°C',
    },
    priceUsd: 38.00,
    priceInr: 3180,
    unit: '/ unit (FOB JNPT)',
    moq: 'MOQ: 10 Units',
    img: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAAzj17IImQVz6C3MVK_NKYPuMaQ84_NZbhfdCxeek3GQ0qGvZ4dBx12EwLeWKU_nfP2SEmoWCzeOQH554_EL1BIkA-dSNuBrd1OpV-M0HvBPYjAI81GCMNVt1-a4GfqJ9xwTT_RfTXYONvDuguS2kluDJwPhwpjCf2PuANbQU3xMIvTcIWS9-gYUqvbS2CmLo21PlkdgPJtU4MGF0SxH2jKpEkodwF2tPWWah-CZvLJ-jOLOe-vlRo',
  },
  {
    sku: 'PNL-LX-400',
    resinTag: 'Lexan 103R',
    category: 'panels',
    resin: 'PC',
    stock: '1,200 m²',
    sector: 'Cleanroom & Shielding',
    cert: 'UL94 V-0 Rated',
    title: 'Optical Polycarbonate Safety Panels',
    desc: 'Impact-resistant transparent polymer barrier sheets with dual-side anti-scratch and UV weathering stabilization.',
    specs: [
      ['Sheet Thickness:', '4.0 mm / 6.0 mm / 8.0 mm'],
      ['Light Transmission:', '89% (ASTM D1003)'],
      ['Charpy Impact:', 'No Break (ISO 179)'],
      ['Flame Class:', 'UL94 V-0 at 3.0mm'],
    ],
    technicalDetails: {
      density: '1.20 g/cm³',
      meltFlowIndex: '10.5 g/10min',
      tensileStrength: '66.0 MPa',
      flexuralModulus: '2,350 MPa',
      heatDeflection: '135°C',
      mouldShrinkage: '0.5 – 0.7%',
      processingTemp: '280°C – 310°C',
    },
    priceUsd: 72.00,
    priceInr: 6020,
    unit: '/ m² (FOB JNPT)',
    moq: 'MOQ: 5 m²',
    img: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCQDiwpljWDYpglTed7tq4qSLAwZqi4_l_ZUg1Ufy39rKSf479590jAhoDYN0sU-Ytf3LhUy6JyiW4xDHM72fz3puI2Y2hTWUXCMmkFFpoLnP3S9xLfFulkKJGlL-dDMT-2QwmbvljtylOWCAw0UF3-ywb3_TvzLEWvH7MQZuFKzwrhGaKikBghAY259AmJGYpLKJ27wrWUlf6OwXDmRTAIk0ZoyZ1ovRICat96An2J7qNznxuNfwQH',
  },
  {
    sku: 'CRT-AGR-5428',
    resinTag: 'HDPE Copolymer',
    category: 'crates',
    resin: 'HDPE',
    stock: '32,000',
    sector: 'Cold Chain & Agri',
    cert: 'Cold Shock Tested -30°C',
    title: 'Ventilated Cold-Storage Agri Crate',
    desc: 'Engineered slot perforation matrix optimizes hydro-cooling airflow and flash refrigeration efficiency.',
    specs: [
      ['Footprint:', '540 x 360 x 280 mm'],
      ['Max Load Capacity:', '25 kg (Static stack: 300 kg)'],
      ['Resin Melt Index:', '7.0 g/10min (ISO 1133)'],
      ['Cleaning Suitability:', 'Steam sanitized at 110°C'],
    ],
    technicalDetails: {
      density: '0.950 g/cm³',
      meltFlowIndex: '7.5 g/10min',
      tensileStrength: '26.0 MPa',
      flexuralModulus: '1,100 MPa',
      heatDeflection: '76°C',
      mouldShrinkage: '1.9 – 2.4%',
      processingTemp: '190°C – 220°C',
    },
    priceUsd: 9.90,
    priceInr: 825,
    unit: '/ unit (FOB JNPT)',
    moq: 'MOQ: 100 Units',
    img: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBtfRIMELzbiJDYcALvrclBNkmdRhGcqcClGP_nSV54QURPgYvPllyy2SKmsYZXjhtps2M8mwaGmlRYEZqQtXDJKeasA8eubfiwJR3eBra1GKoKnb5u4ySJ5Tip8v_Tguzg3viRF13tWFo8EiYu1T1txtXRZScxiYMEiVLPHAbkZiHEwKQRi56EDdBgg0UlbNvmHI0nOPxHxxSTIcM9eK2G9qwzv53RUdBI_i6vVC9ZZqdHhKC-c4Lw',
  },
  {
    sku: 'ENC-IP67-ABS',
    resinTag: 'FR-ABS + Brass',
    category: 'precision',
    resin: 'ABS',
    stock: '23,200',
    sector: 'IoT & Automation',
    cert: 'IP67 Ingress Rated',
    title: 'IP67 Electronic Injection Enclosures',
    desc: 'Features robotic liquid PUR gasket channel and pre-moulded knurled brass inserts for rugged industrial telemetry.',
    specs: [
      ['Chassis Dimensions:', '180 x 130 x 65 mm'],
      ['Moulding Inserts:', '4x M4 Brass blind nuts'],
      ['Flammability Index:', 'UL94 V-0 self-extinguishing'],
      ['Wall Thickness:', '3.2 mm uniform draft'],
    ],
    technicalDetails: {
      density: '1.08 g/cm³',
      meltFlowIndex: '18.0 g/10min',
      tensileStrength: '45.0 MPa',
      flexuralModulus: '2,400 MPa',
      heatDeflection: '88°C',
      mouldShrinkage: '0.4 – 0.7%',
      processingTemp: '220°C – 250°C',
    },
    priceUsd: 6.40,
    priceInr: 535,
    unit: '/ unit (FOB JNPT)',
    moq: 'MOQ: 250 Units',
    img: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBrmO4bYfPLiEoHlU5wmRkNk1OAnpKn_pkDCvgZ5IjixFBtiIYFeR-_v9I8hfm_47sVdJv6x3j1qZJcRwuBIcQ15xUDQgcPUs9ljSeKviDT0_8ENQ6DTvcc-aaKXvzfnF6EpACO4DIO6VBbo7hGoBSIobu8M3QWaAubL4x6edAytzv1J7otEVIOpPrD39IxS8xvbOn42n--m1wT1R4t1xKIrDLspiGq_ucXqa80p9VqXLIXuUDSFt_9',
  },
];

const categories = [
  { key: 'all', label: 'All Products (450+)' },
  { key: 'crates', label: 'Crates & Pallets' },
  { key: 'precision', label: 'Precision Injection Parts' },
  { key: 'drums', label: 'Chemical Drums & Pails' },
  { key: 'panels', label: 'Polymer Panels & Housings' },
];

const heroStats: Stat[] = [
  { label: 'In-House Tooling', value: '450+', unit: 'Dies', sub: 'EDM & 5-Axis CNC maintained' },
  { label: 'Clamping Capacity', value: '50T – 1800T', sub: 'Engel & Haitian press cells' },
  { label: 'Port Drayage', value: '28', unit: 'km', sub: 'Direct access to JNPT Nhava Sheva' },
  { label: 'Quality Standard', value: '±0.02', unit: 'mm', sub: 'Optical CMM & PPAP Level III' },
];

const resinTable = [
  { name: 'High-Density PE (HDPE)', test: 'ASTM D638 / ISO 527', yield: '28 - 32 MPa', chem: 'Acids / Bases: Superior', hdt: '75°C @ 0.45 MPa', app: 'UN Drums, Agri Crates' },
  { name: 'Polypropylene (PP Virgin)', test: 'ASTM D790 / ISO 178', yield: '35 - 40 MPa', chem: 'Aqueous Salts: High', hdt: '102°C @ 0.45 MPa', app: 'Euro Crates, Food Pails' },
  { name: 'Delrin POM Acetal', test: 'ASTM D695 / ISO 604', yield: '70 - 75 MPa', chem: 'Fuel / Solvents: High', hdt: '158°C @ 0.45 MPa', app: 'Kinematic Gears, Bushings' },
  { name: 'Lexan Polycarbonate (PC)', test: 'ASTM D256 / ISO 180', yield: '65 - 72 MPa', chem: 'Hydrocarbons: Moderate', hdt: '120°C @ 0.45 MPa', app: 'Safety Shields, Lenses' },
];

const ProductsPage: React.FC = () => {
  const [activeCategory, setActiveCategory] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [resinFilter, setResinFilter] = useState('');
  const [selectedTdsProduct, setSelectedTdsProduct] = useState<TdsData | null>(null);

  const { items, addItem, formatPrice, showToast } = useRfq();

  const heroRef = useScrollReveal<HTMLElement>();
  const tableRef = useScrollReveal<HTMLElement>();

  const filteredProducts = useMemo(() => {
    return products.filter((p) => {
      const catMatch = activeCategory === 'all' || p.category === activeCategory;
      const resinMatch = !resinFilter || p.resin === resinFilter;
      const searchMatch =
        !searchQuery ||
        p.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        p.sku.toLowerCase().includes(searchQuery.toLowerCase()) ||
        p.resin.toLowerCase().includes(searchQuery.toLowerCase());
      return catMatch && resinMatch && searchMatch;
    });
  }, [activeCategory, resinFilter, searchQuery]);

  const handleDownloadMasterTds = () => {
    const summary = `========================================================================
HASHIM MOTIWALA PLASTIC & POLYMER ENGINEERING PVT. LTD.
MASTER TECHNICAL DATA SHEET & PRODUCT SPECIFICATION MATRIX
========================================================================
Headquarters: Plot W-14, TTC Industrial Area, MIDC Pawane, Navi Mumbai, India
Export Gateway: Direct Port Delivery [DPD] via JNPT (Nhava Sheva)
Quality Certifications: ISO 9001:2015, REACH, RoHS, FDA 21 CFR Compliant

CATALOG SPECIFICATIONS:
------------------------------------------------------------------------
${products
  .map(
    (p, idx) => `
[${idx + 1}] ${p.title}
SKU: ${p.sku} | Resin: ${p.resinTag} | Certification: ${p.cert}
MOQ: ${p.moq} | Standard Pricing: $${p.priceUsd.toFixed(2)} / ₹${p.priceInr.toLocaleString('en-IN')}
Specifications:
${p.specs.map(([k, v]) => `  - ${k} ${v}`).join('\n')}
ASTM Properties:
  - Density: ${p.technicalDetails?.density}
  - Melt Flow Index: ${p.technicalDetails?.meltFlowIndex}
  - Tensile Strength: ${p.technicalDetails?.tensileStrength}
  - Heat Deflection Temp: ${p.technicalDetails?.heatDeflection}
`
  )
  .join('\n------------------------------------------------------------------------\n')}

For custom mold tooling inquiries, CAD validation, or direct volume RFQs:
Email: procurement@hashimmotiwala.com | Phone: +91 (022) 6842-8900
========================================================================
`;

    const blob = new Blob([summary], { type: 'text/plain;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `Hashim_Motiwala_Master_TDS_Catalog.txt`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
    showToast('Master Technical Spec Catalog downloaded', 'info');
  };

  const copySku = (sku: string) => {
    navigator.clipboard
      ?.writeText(sku)
      .then(() => showToast(`Copied ${sku}`, 'info'))
      .catch(() => showToast('Could not access clipboard', 'info'));
  };

  const addToRfq = (p: ProductItem) =>
    addItem({
      sku: p.sku,
      title: p.title,
      resinTag: p.resinTag,
      priceUsd: p.priceUsd,
      priceInr: p.priceInr,
      unit: p.unit,
      moq: p.moq,
      img: p.img,
    });

  return (
    <main className="products-page">
      {/* Hero */}
      <section className="products-hero section" ref={heroRef}>
        <div className="container reveal">
          <div className="products-hero-top">
            <div className="products-hero-content">
              <div className="badge badge-surface">
                <span className="material-symbols-outlined icon-xs text-primary">verified</span>
                PRODUCTION-GRADE INDUSTRIAL THERMOPLASTICS
              </div>
              <h1 className="hero-title lg:text-[40px]! lg:leading-[48px]!">
                Precision Injection Components & Standard Tooling Assemblies
              </h1>
              <p className="hero-desc">
                High-tonnage moulding dispatch across heavy-duty Euro crates, UN-certified chemical containers, aerospace Delrin gears, and optical enclosures. Direct factory delivery via JNPT (Nhava Sheva).
              </p>
            </div>
            {/* The RFQ manifest already lives in the header — only the catalog download stays here */}
            <div className="products-hero-actions">
              <button
                type="button"
                className="btn btn-outline"
                onClick={handleDownloadMasterTds}
              >
                <span className="material-symbols-outlined icon-sm text-primary">download</span>
                Download Master TDS
              </button>
            </div>
          </div>
          <StatStrip stats={heroStats} tone="plain" className="mt-4 md:mt-8" />
        </div>
      </section>

      {/* Sticky Filter */}
      <section className="products-filter-bar">
        <div className="container filter-bar-inner">
          <div className="filter-pills">
            {categories.map((cat) => (
              <button
                key={cat.key}
                type="button"
                className={`filter-pill${activeCategory === cat.key ? ' active' : ''}`}
                onClick={() => setActiveCategory(cat.key)}
              >
                {cat.label}
              </button>
            ))}
          </div>
          <div className="filter-controls">
            <div className="search-box">
              <span className="material-symbols-outlined icon-sm">search</span>
              <input
                type="text"
                placeholder="Search SKU, resin, standard..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="search-input"
              />
            </div>
            <select
              className="select"
              value={resinFilter}
              onChange={(e) => setResinFilter(e.target.value)}
            >
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
              <span className="badge badge-light">Showing {filteredProducts.length} Assemblies</span>
            </div>
          </div>
          <div className="products-grid">
            {filteredProducts.map((p) => {
              const inManifest = items.some((item) => item.sku === p.sku);

              return (
                <article className="product-card card" key={p.sku}>
                  <div className="product-img-wrap">
                    <img src={p.img} alt={p.title} loading="lazy" />
                    <span className="badge badge-primary product-resin-badge">{p.resinTag}</span>
                    {/* Hover-revealed quick action; always visible on touch devices */}
                    <button
                      type="button"
                      className="product-quickview"
                      onClick={() => setSelectedTdsProduct(p)}
                    >
                      <span className="material-symbols-outlined icon-xs">visibility</span>
                      Quick view TDS
                    </button>
                  </div>
                  <div className="card-body product-body">
                    <div className="product-meta-row">
                      <span className="product-sector">{p.sector}</span>
                      <span className="product-sku">{p.sku}</span>
                    </div>
                    <h3 className="product-title">{p.title}</h3>
                    <p className="product-desc">{p.desc}</p>

                    <Disclosure
                      summary="Key specifications"
                      meta={p.cert}
                      metaClassName="text-[11px] text-primary"
                      className="mt-1"
                    >
                      <dl className="flex flex-col gap-1.5 pt-0.5">
                        {p.specs.map(([k, v]) => (
                          <div className="spec-row" key={k}>
                            <dt>{k.replace(/:$/, '')}</dt>
                            <dd className="spec-val">{v}</dd>
                          </div>
                        ))}
                      </dl>
                    </Disclosure>

                    <div className="product-footer">
                      <div className="product-pricing">
                        <span className="product-price">
                          {formatPrice(p.priceUsd, p.priceInr)}
                        </span>
                        <span className="product-unit">{p.unit}</span>
                        <span className="product-moq">{p.moq}</span>
                      </div>
                      <div className="product-actions">
                        <button
                          type="button"
                          className={`btn btn-sm ${inManifest ? 'btn-secondary' : 'btn-primary'}`}
                          onClick={() => addToRfq(p)}
                        >
                          <span className="material-symbols-outlined icon-xs">
                            {inManifest ? 'check_circle' : 'add_circle'}
                          </span>
                          {inManifest ? 'In RFQ · Add more' : 'Add to RFQ'}
                        </button>
                        <Dropdown
                          ariaLabel={`More actions for ${p.title}`}
                          items={[
                            { label: 'View technical data sheet', icon: 'description', onSelect: () => setSelectedTdsProduct(p) },
                            { label: 'Copy SKU', icon: 'content_copy', onSelect: () => copySku(p.sku) },
                          ]}
                        />
                      </div>
                    </div>
                  </div>
                </article>
              );
            })}
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
            <div>
              <span className="section-tag">Polymer Engineering Matrix</span>
              <h2 className="section-title">Resin Characteristics & Standard ASTM Validation</h2>
            </div>
            <p className="section-desc">
              Every batch undergoes in-house melt flow indexing (MFI), differential scanning calorimetry (DSC), and tensile elongation testing prior to mould ejection.
            </p>
          </div>
          <div className="card table-scroll-wrap">
            <table className="data-table">
              <thead>
                <tr>
                  <th>Polymer Classification</th>
                  <th>ASTM / ISO Test</th>
                  <th>Yield Strength</th>
                  <th>Chemical Resistance</th>
                  <th>Heat Deflection (HDT)</th>
                  <th className="text-right">Primary Application</th>
                </tr>
              </thead>
              <tbody>
                {resinTable.map((r) => (
                  <tr key={r.name}>
                    <td className="text-primary font-bold">{r.name}</td>
                    <td className="text-on-surface-variant">{r.test}</td>
                    <td className="font-semibold">{r.yield}</td>
                    <td><span className="badge badge-surface">{r.chem}</span></td>
                    <td>{r.hdt}</td>
                    <td className="text-right">{r.app}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </section>

      {/* TDS Modal */}
      <TdsModal
        product={selectedTdsProduct}
        onClose={() => setSelectedTdsProduct(null)}
      />
    </main>
  );
};

export default ProductsPage;
