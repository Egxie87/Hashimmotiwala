import React, { useState, useRef } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useScrollReveal } from '../hooks/useAnimations';
import { useRfq } from '../hooks/useRfq';
import Disclosure from '../components/ui/Disclosure';
import StatStrip, { type Stat } from '../components/ui/StatStrip';
import '../styles/pages/CustomMouldingPage.css';

const toolingSteps = [
  { num: '01', badge: 'DFM & Moldflow', title: 'Moldflow Fill & Gate Simulation', desc: 'Fill simulations, shear stress profiling, injection clamp tonnage optimization, and clamp-up/ejection simulation.', metric: 'Simulation: Autodesk Moldflow', metricSub: 'Weld line & sink mark prediction' },
  { num: '02', badge: 'Compound Selection', title: 'Polymer Resin Formulation', desc: 'Prime virgin resin with specified masterbatch, flame retardants, glass fibers, and UV stabilizers tailored to operational environment.', metric: 'Blending: Gravimetric Dosing', metricSub: 'Moisture Control: < 0.02% Desiccant' },
  { num: '03', badge: '5-Axis CNC & EDM', title: 'Precision Toolmaking', desc: 'Sub-micron CNC machining of hardened mould cores. Submerged wire EDM, copper electrodes, and mirror-polish cavity treatment.', metric: 'High-Speed Spindle: 24,000 RPM', metricSub: 'Tolerance: ±0.005 mm' },
  { num: '04', badge: 'CMM Metrology', title: 'Zeiss Optical Inspection', desc: 'Full 3D optical scanning, coordinate measurement machine touchprobes, First Article Inspection (FAI), and PPAP Level III compliance.', metric: 'Metrology: Optical CMM Scanner', metricSub: 'Statistical Capability: Cpk > 1.67' },
];

const heroStats: Stat[] = [
  { label: 'Clamping Scope', value: '50T – 1800T', sub: '35 Servo & Hydraulic Cells' },
  { label: 'Mould Life Guarantee', value: 'Class 101', sub: '1,000,000+ Cycles Certified' },
  { label: 'DFM Engineering Review', value: '24 – 48', unit: 'Hrs', sub: 'Full Moldflow Simulation' },
  { label: 'Core & Cavity Steels', value: 'H13 / S136 / P20', sub: 'Hardened to 48-52 HRC' },
];

const dfmRules = [
  { title: 'Draft Angle Analysis', desc: '1.0° to 2.0° standard for effortless core/cavity release.' },
  { title: 'Nominal Wall Thickness Uniformity', desc: 'Rib-to-wall ratio 40–60% to prevent sink marks and internal voids.' },
  { title: 'Gate Location & Knit Line Optimization', desc: 'Sub-gates, hot tips, or valve gates positioned for structural integrity.' },
  { title: 'Radius & Fillet Integrity', desc: 'Min. 0.5R fillets at sharp transitions to eliminate notch concentration.' },
];

const toolingSteels = [
  { steel: 'Stavax ESR (S136)', hardness: '48 – 52 HRC', corrosion: 'Superior (Mirror Polish)', apps: 'Medical packaging, optical lenses, clear polycarbonate parts' },
  { steel: 'Orvar Supreme (H13)', hardness: '46 – 50 HRC', corrosion: 'Good (High Thermal Toughness)', apps: 'Heavy-duty transport crates, chemical pails, 1M+ cycle moulds' },
  { steel: 'P20 + Ni (Pre-hardened)', hardness: '28 – 32 HRC', corrosion: 'Standard', apps: 'Automotive prototype tooling, pilot batches (up to 250k cycles)' },
  { steel: 'Beryllium Copper (BeCu)', hardness: '38 – 42 HRC', corrosion: 'High Thermal Dissipation', apps: 'Critical core cooling pins, hot spot reduction, cycle reduction' },
];

const dispatches = [
  { badge: '16-Cavity Medical', title: 'Polypropylene Syringe Barrel Suite', metric1: 'Cycle: 6.8s', metric2: 'Tolerances: ±0.008mm', img: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBNupFlnCxjA3-IP7V1mBLbomfHR-QDR5YPZTEcWhz6-B7u49tiRbXw5LQKbkJdeslCJ1zGjlU3s1jFHPNcmhnk2guHF67O0o4W3CpVBA6KmZgikCuKy1PW2l70wqelGZ1_0bjyXPv4mrbuzYTT3LsHT3toS8J77ZS0AawTBbfrY_Y1b6fI-ITNbPyJ7ahlOkVQVOJ0dRsumKlFfpYr2q6EZKbZoXVYkKJYd5CYKU4TB8ac6dGRtHZ7' },
  { badge: 'Heavy Automotive', title: 'Under-the-Hood Cooling Duct', metric1: 'Clamp: 850T', metric2: 'Weight: 425g', img: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCvIeSY7uHPxJ25i-RjRt2kXHlfHSgpyZYpxipnIzQjWdu-DjrDIORXoDMUcsikZKAgmYKeh4i75j-T-xeidpxO1d9GqMa6Ks1ZmEBQ64VqaqO4YUCa49hSSQdCC48I1O0XYUMy0ge9R49vjwZGq0HJGuJncuVtuzy-5hvQxWoOxv95YEdRQjModTcr_OKZWRTT-tpWIHneX0F7rhTXyflvbGSXsQfhv1UOIUDjhjfFHwD0By__J4AQ' },
  { badge: 'Large Logistics', title: 'Heavy Stackable Crate Mould', metric1: 'Clamp: 1000T', metric2: 'Cycle: 34.2s', img: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDmdlbyFlKKMAtUqKCJwfQzrgYMH9RyBbgVz3xHsIb9mSZV1mh-QIswHqDN5EGh9q1K8SSwXlaJMRxJz5bwzcfgdd6-WOy0RIZB0Ts2ldR3rWCta8NYV71mLWPG05zB8OtNCBbLMoC_OUmb8HiErcnxdaLOyEgvYwbfx7RecTDt9ziT4KbyMziFxfnUp5kfxjItaDQfJI4F2Aeqerz3iLqb2V6I_sFTsi8uzAg-7q8Hvc_Ytz6NpGXE' },
];

const CustomMouldingPage: React.FC = () => {
  const [dragActive, setDragActive] = useState(false);
  const [uploadedFile, setUploadedFile] = useState<File | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const navigate = useNavigate();
  const { showToast } = useRfq();

  const heroRef = useScrollReveal<HTMLElement>();
  const cadRef = useScrollReveal<HTMLElement>();
  const archRef = useScrollReveal<HTMLElement>();
  const matRef = useScrollReveal<HTMLElement>();
  const dispRef = useScrollReveal<HTMLElement>();

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      setUploadedFile(file);
      showToast(`Attached ${file.name} for DFM review`, 'success');
    }
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setDragActive(false);
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      const file = e.dataTransfer.files[0];
      setUploadedFile(file);
      showToast(`Attached ${file.name} for DFM review`, 'success');
    }
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setDragActive(true);
  };

  const handleDragLeave = (e: React.DragEvent) => {
    e.preventDefault();
    setDragActive(false);
  };

  const removeFile = (e: React.MouseEvent) => {
    e.stopPropagation();
    setUploadedFile(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
    showToast('Removed attached CAD file', 'info');
  };

  const proceedToQuote = () => {
    navigate('/contact', {
      state: {
        attachedFileName: uploadedFile ? uploadedFile.name : undefined,
        service: 'Custom Moulding & Tooling',
      },
    });
  };

  const formatFileSize = (bytes: number) => {
    if (bytes < 1024) return `${bytes} B`;
    if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)} KB`;
    return `${(bytes / (1024 * 1024)).toFixed(1)} MB`;
  };

  return (
    <main className="dfm-page">
      {/* Hero */}
      <section className="dfm-hero section" ref={heroRef}>
        <div className="container reveal">
          <div className="badge badge-surface mb-2 w-fit">
            <span className="material-symbols-outlined icon-xs">precision_manufacturing</span>
            IN-HOUSE TOOLROOM & CONTRACT MOULDING
          </div>
          <h1 className="hero-title max-w-[700px]">
            Precision Mould Tooling & Engineering DFM Review
          </h1>
          <p className="hero-desc">
            Direct access to Hashim Motiwala's precision toolroom engineering. Submit 3D CAD files for draft angle validation, gating optimization, and turnkey multi-cavity injection tooling quotes.
          </p>
          <StatStrip stats={heroStats} tone="plain" className="mt-4 md:mt-8" />
        </div>
      </section>

      {/* CAD Pre-Flight */}
      <section className="section section-alt" ref={cadRef}>
        <div className="container reveal">
          <div className="section-header">
            <div>
              <span className="section-tag">Direct Engineering Portal</span>
              <h2 className="section-title">Submit 3D CAD for Tooling Feasibility & Quote</h2>
            </div>
          </div>
          <div className="cad-grid">
            <div className="cad-upload-area card">
              <div className="card-body gap-4">
                {/* Hidden File Input */}
                <input
                  type="file"
                  ref={fileInputRef}
                  onChange={handleFileChange}
                  accept=".stp,.step,.iges,.igs,.sldprt,.x_t,.dwg,.dxf,.pdf"
                  hidden
                />

                {/* Dropzone */}
                <div
                  className={`cad-dropzone${dragActive ? ' drag-active' : ''}${uploadedFile ? ' has-file' : ''}`}
                  onClick={() => fileInputRef.current?.click()}
                  onDragOver={handleDragOver}
                  onDragLeave={handleDragLeave}
                  onDrop={handleDrop}
                  role="button"
                  tabIndex={0}
                  aria-label="Upload CAD file"
                >
                  {uploadedFile ? (
                    <div className="cad-file-preview">
                      <div className="file-icon-wrap">
                        <span className="material-symbols-outlined icon-lg text-primary">description</span>
                      </div>
                      <div className="file-info-text">
                        <span className="file-name">{uploadedFile.name}</span>
                        <span className="file-size">{formatFileSize(uploadedFile.size)} • Ready for submission</span>
                      </div>
                      <button
                        type="button"
                        className="file-remove-btn"
                        onClick={removeFile}
                        title="Remove file"
                      >
                        <span className="material-symbols-outlined icon-sm">close</span>
                      </button>
                    </div>
                  ) : (
                    <>
                      <span className="material-symbols-outlined icon-lg text-primary">cloud_upload</span>
                      <h3 className="text-headline-sm font-bold">Select or Drag & Drop 3D CAD Geometry</h3>
                      <p className="text-body-sm text-on-surface-variant">
                        Click to browse or drop your model — up to 150 MB.
                      </p>
                      <div className="cad-formats">
                        {['.STP', '.STEP', '.IGES', '.SLDPRT', '.X_T', '.PDF'].map((f) => (
                          <span key={f} className="badge badge-surface">{f}</span>
                        ))}
                      </div>
                    </>
                  )}
                </div>

                <div className="cad-features">
                  <div className="cad-feature">
                    <span className="material-symbols-outlined icon-xs text-primary">shield</span>
                    <span>Mutual NDA Protection — Automatic confidentiality</span>
                  </div>
                  <div className="cad-feature">
                    <span className="material-symbols-outlined icon-xs text-primary">schedule</span>
                    <span>24-Hour Tooling Review — Lead engineer assignment</span>
                  </div>
                  <div className="cad-feature">
                    <span className="material-symbols-outlined icon-xs text-primary">precision_manufacturing</span>
                    <span>Direct Moldflow Feasibility & Cycle-Time Estimation</span>
                  </div>
                </div>

                <button
                  type="button"
                  className="btn btn-primary btn-lg w-full"
                  onClick={proceedToQuote}
                >
                  <span className="material-symbols-outlined icon-sm">send</span>
                  {uploadedFile
                    ? `Proceed to RFQ with ${uploadedFile.name}`
                    : 'Submit RFQ Direct to Tooling Engineering'}
                </button>
              </div>
            </div>

            <div className="cad-rules card">
              <div className="card-body gap-3">
                <div>
                  <span className="section-tag">Engineering Rules</span>
                  <h3 className="text-headline-sm font-bold">Design For Manufacturing Checklist</h3>
                  <p className="text-body-sm text-on-surface-variant">Standard ASTM / ISO practice we check on every upload.</p>
                </div>
                <div className="divide-y divide-surface-container">
                  {dfmRules.map((rule, i) => (
                    <Disclosure
                      key={rule.title}
                      variant="inline"
                      icon="check_circle"
                      summary={rule.title}
                      defaultOpen={i === 0}
                    >
                      <p className="pl-7 text-body-sm text-on-surface-variant">{rule.desc}</p>
                    </Disclosure>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Tooling Architecture */}
      <section className="section" ref={archRef}>
        <div className="container reveal">
          <div className="mb-8 text-center">
            <span className="section-tag">From Pellet to Precision Component</span>
            <h2 className="section-title mx-auto max-w-[700px]!">
              Turnkey Mould Building & Manufacturing Stages
            </h2>
            <p className="section-desc mx-auto mt-2 max-w-[600px]!">
              Engineered for zero-defect production. Every custom project proceeds through our unified TTC Industrial facility with strict quality stage gates.
            </p>
          </div>
          <div className="process-grid">
            {toolingSteps.map((s, i) => (
              <div className={`process-card reveal reveal-delay-${i + 1}`} key={s.num}>
                <div className="process-top">
                  <span className="process-num">{s.num}</span>
                  <span className="badge badge-surface">{s.badge}</span>
                </div>
                <h3 className="process-title">{s.title}</h3>
                <p className="process-desc">{s.desc}</p>
                <div className="process-footer flex-col items-start! gap-0.5">
                  <span className="process-metric">{s.metric}</span>
                  <span className="process-metric opacity-70">{s.metricSub}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Tooling Steel Compatibility */}
      <section className="section section-alt" ref={matRef}>
        <div className="container reveal">
          <div className="section-header">
            <div>
              <span className="section-tag">Toolroom Metallurgy</span>
              <h2 className="section-title">Core & Cavity Tooling Steel Selection Guide</h2>
            </div>
            <p className="section-desc">Selected based on production volume, resin abrasiveness, and optical surface finish demands.</p>
          </div>
          <div className="card table-scroll-wrap">
            <table className="data-table">
              <thead>
                <tr>
                  <th>Tooling Steel Grade</th>
                  <th>Core Hardness</th>
                  <th>Corrosion & Polish Resistance</th>
                  <th className="text-right">Recommended Production Scope</th>
                </tr>
              </thead>
              <tbody>
                {toolingSteels.map((s) => (
                  <tr key={s.steel}>
                    <td>
                      <span className="text-primary font-bold">{s.steel}</span>
                    </td>
                    <td>{s.hardness}</td>
                    <td>{s.corrosion}</td>
                    <td className="text-body-sm text-right">{s.apps}</td>
                  </tr>
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
            <div>
              <span className="section-tag">Proven Production Cases</span>
              <h2 className="section-title">Recent Custom Injection Tooling Projects</h2>
            </div>
            <Link to="/products" className="btn btn-outline btn-sm">
              Explore Standard Catalog →
            </Link>
          </div>
          <div className="dispatches-grid">
            {dispatches.map((d) => (
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
    </main>
  );
};

export default CustomMouldingPage;
