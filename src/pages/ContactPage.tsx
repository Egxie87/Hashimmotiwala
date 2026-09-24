import React, { useState, useRef } from 'react';
import { useLocation, Link } from 'react-router-dom';
import { useScrollReveal } from '../hooks/useAnimations';
import { useRfq } from '../hooks/useRfq';
import Disclosure from '../components/ui/Disclosure';
import StatStrip, { type Stat } from '../components/ui/StatStrip';
import Tabs from '../components/ui/Tabs';
import '../styles/pages/ContactPage.css';

const freightServices = [
  {
    icon: 'local_shipping',
    title: '40ft HC & 20ft Direct Bay Stuffing',
    desc: '18 articulated hydraulic dock levellers align directly with heavy export containers. In-factory palletization prevents shock load and stack compression during sea transit.',
    badge: '100% Floor & Slip-Sheet Palletized',
  },
  {
    icon: 'shield',
    title: 'Moisture Barrier & VCI Packaging',
    desc: 'Export moulds and high-precision polymer components sealed with heavy-gauge LDPE shrink wrap, industrial desiccant sachets, and Volatile Corrosion Inhibitor (VCI) jackets.',
    badge: 'MIL-Spec Sea-Safe Humidity Barrier',
  },
  {
    icon: 'directions_boat',
    title: 'JNPT Port Express Corridor',
    desc: 'Strategically situated 28 km from Jawaharlal Nehru Port (Nhava Sheva). Direct container gate-in within 40 minutes of factory dispatch, minimizing demurrage risk.',
    badge: 'Direct Port Delivery [DPD] Enabled',
  },
];

const globalRoutes = [
  { region: 'GCC REGION', dest: 'Jebel Ali & Dammam', transit: '3 – 5', unit: 'Days', freq: 'Sailing: 4x Weekly', carriers: 'Carriers: Maersk / MSC / Hapag' },
  { region: 'EUROPE & UK', dest: 'Rotterdam & Antwerp', transit: '18 – 22', unit: 'Days', freq: 'Sailing: 3x Weekly', carriers: 'Carriers: CMA CGM / ONE / MSC' },
  { region: 'NORTH AMERICA', dest: 'Newark, Houston, LA', transit: '24 – 28', unit: 'Days', freq: 'Sailing: 2x Weekly', carriers: 'Carriers: Hapag-Lloyd / Maersk' },
  { region: 'SOUTHEAST ASIA', dest: 'Singapore & Port Klang', transit: '7 – 10', unit: 'Days', freq: 'Sailing: 5x Weekly', carriers: 'Carriers: Evergreen / Wan Hai / COSCO' },
];

const heroStats: Stat[] = [
  { label: 'Monthly Polymer Melt', value: '3,200+', unit: 'MT', sub: 'Prime virgin engineering resins' },
  { label: 'Dispatch Bays', value: '18', unit: 'Bays', sub: 'Hydraulic dock levellers (40ft HC)' },
  { label: 'JNPT Port Express', value: '28', unit: 'km', sub: 'Direct access (~45 min drayage)' },
  { label: 'Quality Certification', value: 'ISO 9001', sub: 'PPAP Level III & CE compliant' },
];

const logisticsTabs = [
  { key: 'transit', label: 'Transit Times', icon: 'public' },
  { key: 'dispatch', label: 'Packing & Dispatch', icon: 'local_shipping' },
];

const processOptions = [
  'Hot Runner System Required',
  'Moldflow DFM Fill Simulation',
  'In-Mould Labeling / Decoration',
  'FDA Food-Contact Certification',
  'Zeiss CMM Inspection Report',
  'Custom Masterbatch Color Match',
];

const ContactPage: React.FC = () => {
  const location = useLocation();
  const { items, clearItems, showToast } = useRfq();

  const heroRef = useScrollReveal<HTMLElement>();
  const formRef = useScrollReveal<HTMLElement>();
  const logisticsRef = useScrollReveal<HTMLElement>();

  const fileInputRef = useRef<HTMLInputElement>(null);

  const [formData, setFormData] = useState({
    fullName: '',
    company: '',
    email: '',
    phone: '',
    resin: 'High-Density Polyethylene (HDPE)',
    volume: '',
    specialRequirements: '',
    selectedOptions: [] as string[],
  });

  const [attachedFile, setAttachedFile] = useState<File | null>(null);
  const [passedFileName, setPassedFileName] = useState<string | null>(() => {
    return (location.state as { attachedFileName?: string } | null)?.attachedFileName || null;
  });
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [quoteRefNumber, setQuoteRefNumber] = useState('');
  const [logisticsTab, setLogisticsTab] = useState('transit');

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: '' }));
    }
  };

  const handleOptionToggle = (opt: string) => {
    setFormData((prev) => {
      const exists = prev.selectedOptions.includes(opt);
      return {
        ...prev,
        selectedOptions: exists
          ? prev.selectedOptions.filter((o) => o !== opt)
          : [...prev.selectedOptions, opt],
      };
    });
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      setAttachedFile(file);
      setPassedFileName(null);
      showToast(`Attached ${file.name}`, 'success');
    }
  };

  const validateForm = () => {
    const newErrors: Record<string, string> = {};
    if (!formData.fullName.trim()) newErrors.fullName = 'Full name is required';
    if (!formData.company.trim()) newErrors.company = 'Company name is required';
    if (!formData.email.trim()) {
      newErrors.email = 'Corporate email is required';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'Enter a valid corporate email address';
    }
    if (!formData.phone.trim()) newErrors.phone = 'Phone / WhatsApp number is required';
    if (!formData.volume.trim()) newErrors.volume = 'Production volume or batch size is required';

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!validateForm()) {
      showToast('Please fill all required fields', 'info');
      return;
    }

    setIsSubmitting(true);
    // Simulate enterprise quote transmission
    setTimeout(() => {
      const ref = `HM-RFQ-${new Date().getFullYear()}-${Math.floor(1000 + Math.random() * 9000)}`;
      setQuoteRefNumber(ref);
      setIsSubmitting(false);
      setIsSubmitted(true);
      showToast(`RFQ ${ref} generated successfully!`, 'success');
    }, 900);
  };

  const resetForm = () => {
    setFormData({
      fullName: '',
      company: '',
      email: '',
      phone: '',
      resin: 'High-Density Polyethylene (HDPE)',
      volume: '',
      specialRequirements: '',
      selectedOptions: [],
    });
    setAttachedFile(null);
    setPassedFileName(null);
    setIsSubmitted(false);
    clearItems();
  };

  return (
    <main className="contact-page">
      {/* Hero */}
      <section className="contact-hero section" ref={heroRef}>
        <div className="container reveal">
          <div className="badge badge-surface mb-2 w-fit">
            <span className="material-symbols-outlined icon-xs">factory</span>
            WORKS HQ & GLOBAL PROCUREMENT
          </div>
          <h1 className="hero-title max-w-[720px]">
            Procurement Desk, CAD Validation & Tooling RFQ
          </h1>
          <p className="hero-desc">
            Direct coordination with our TTC Navi Mumbai engineering plant. Transmit 3D CAD models (.STEP, .IGES, .SLDPRT) directly to our toolroom engineers under mutual NDA protection.
          </p>
          <div className="contact-hero-actions">
            <button
              type="button"
              className="btn btn-primary btn-lg"
              onClick={() => document.getElementById('rfq-form')?.scrollIntoView({ behavior: 'smooth' })}
            >
              <span className="material-symbols-outlined icon-sm">edit_document</span>
              Start Quotation Form
            </button>
            <button
              type="button"
              className="btn btn-outline btn-lg"
              onClick={() => document.getElementById('freight-section')?.scrollIntoView({ behavior: 'smooth' })}
            >
              <span className="material-symbols-outlined icon-sm text-primary">directions_boat</span>
              Shipping & Transit Times
            </button>
          </div>
          <StatStrip stats={heroStats} tone="plain" className="mt-4 md:mt-8" />
        </div>
      </section>

      {/* RFQ Form & Location */}
      <section className="section section-alt" id="rfq-form" ref={formRef}>
        <div className="container reveal">
          <div className="contact-grid">
            {/* Form */}
            <div className="rfq-form-wrap card">
              <div className="card-body">
                <div className="mb-2 flex items-center gap-2">
                  <span className="material-symbols-outlined icon-sm text-primary">request_quote</span>
                  <h2 className="text-headline-md font-bold">Enterprise Polymer & Tooling RFQ</h2>
                </div>
                <p className="text-body-sm text-on-surface-variant mb-5">
                  Queue your specifications directly to our Lead Tooling and Procurement Engineers. Non-Disclosure Agreement (NDA) applies automatically upon submission.
                </p>

                {/* RFQ Manifest Banner if items are in cart */}
                {items.length > 0 && (
                  <div className="rfq-manifest-attachment-card">
                    <div className="rma-header">
                      <div className="rma-title-group">
                        <span className="material-symbols-outlined icon-sm text-primary">inventory_2</span>
                        <strong>Attached Catalog Components ({items.length})</strong>
                      </div>
                      <Link to="/products" className="rma-edit-link">Edit in Catalog</Link>
                    </div>
                    <div className="rma-list">
                      {items.map((item) => (
                        <span key={item.sku} className="rma-chip">
                          {item.sku} ({item.quantity || 1}x)
                        </span>
                      ))}
                    </div>
                  </div>
                )}

                {/* Active Form */}
                <form onSubmit={handleSubmit} noValidate className="flex flex-col gap-6">
                  <fieldset className="flex min-w-0 flex-col gap-3">
                  <legend className="mb-3 flex items-center gap-2 font-mono text-xs font-semibold tracking-[0.06em] text-on-surface uppercase">
                    <span className="inline-flex size-5 items-center justify-center rounded-full bg-primary text-[11px] text-on-primary">1</span>
                    Contact details
                  </legend>
                  <div className="form-grid-2">
                    <div className="form-group">
                      <label className="form-label" htmlFor="fullName">Full Name *</label>
                      <input
                        id="fullName"
                        name="fullName"
                        className={`input${errors.fullName ? ' input-error' : ''}`}
                        placeholder="e.g., Rajesh Mehta / John Vance"
                        value={formData.fullName}
                        onChange={handleInputChange}
                      />
                      {errors.fullName && <span className="form-error-msg">{errors.fullName}</span>}
                    </div>
                    <div className="form-group">
                      <label className="form-label" htmlFor="company">Company / Industrial Entity *</label>
                      <input
                        id="company"
                        name="company"
                        className={`input${errors.company ? ' input-error' : ''}`}
                        placeholder="e.g., Apex Automotive OEM LLC"
                        value={formData.company}
                        onChange={handleInputChange}
                      />
                      {errors.company && <span className="form-error-msg">{errors.company}</span>}
                    </div>
                    <div className="form-group">
                      <label className="form-label" htmlFor="email">Corporate Email *</label>
                      <input
                        id="email"
                        name="email"
                        type="email"
                        className={`input${errors.email ? ' input-error' : ''}`}
                        placeholder="procurement@company.com"
                        value={formData.email}
                        onChange={handleInputChange}
                      />
                      {errors.email && <span className="form-error-msg">{errors.email}</span>}
                    </div>
                    <div className="form-group">
                      <label className="form-label" htmlFor="phone">Direct Phone / WhatsApp *</label>
                      <input
                        id="phone"
                        name="phone"
                        className={`input${errors.phone ? ' input-error' : ''}`}
                        placeholder="+91 / +1 (Code + Number)"
                        value={formData.phone}
                        onChange={handleInputChange}
                      />
                      {errors.phone && <span className="form-error-msg">{errors.phone}</span>}
                    </div>
                  </div>
                  </fieldset>

                  <fieldset className="flex min-w-0 flex-col gap-3">
                  <legend className="mb-3 flex items-center gap-2 font-mono text-xs font-semibold tracking-[0.06em] text-on-surface uppercase">
                    <span className="inline-flex size-5 items-center justify-center rounded-full bg-primary text-[11px] text-on-primary">2</span>
                    Project scope
                  </legend>
                  <div className="form-grid-2">
                    <div className="form-group">
                      <label className="form-label" htmlFor="resin">Target Polymer Resin *</label>
                      <select
                        id="resin"
                        name="resin"
                        className="select"
                        value={formData.resin}
                        onChange={handleInputChange}
                      >
                        <option value="High-Density Polyethylene (HDPE)">High-Density Polyethylene (HDPE)</option>
                        <option value="PP Copolymer (Impact Grade)">PP Copolymer (Impact Grade)</option>
                        <option value="Polycarbonate (Lexan Optical)">Polycarbonate (Lexan Optical)</option>
                        <option value="Delrin POM Polyacetal">Delrin POM Polyacetal</option>
                        <option value="ABS (Impact / Flame Retardant)">ABS (Impact / Flame Retardant)</option>
                        <option value="Nylon PA66 (Glass Filled)">Nylon PA66 (Glass Filled)</option>
                      </select>
                    </div>
                    <div className="form-group">
                      <label className="form-label" htmlFor="volume">Initial Batch / Annual Run Volume *</label>
                      <input
                        id="volume"
                        name="volume"
                        className={`input${errors.volume ? ' input-error' : ''}`}
                        placeholder="e.g., 25,000 pcs / 100,000 annual"
                        value={formData.volume}
                        onChange={handleInputChange}
                      />
                      {errors.volume && <span className="form-error-msg">{errors.volume}</span>}
                    </div>
                  </div>

                  {/* CAD File Attachment */}
                  <div className="form-group">
                    <label className="form-label">CAD / Drawing Attachment <span className="font-normal text-on-surface-variant">(optional)</span></label>
                    <input
                      type="file"
                      ref={fileInputRef}
                      onChange={handleFileChange}
                      accept=".stp,.step,.iges,.igs,.sldprt,.x_t,.dwg,.dxf,.pdf"
                      hidden
                    />
                    <div
                      className="file-drop-interactive"
                      onClick={() => fileInputRef.current?.click()}
                      role="button"
                      tabIndex={0}
                    >
                      {attachedFile || passedFileName ? (
                        <div className="file-drop-selected">
                          <span className="material-symbols-outlined icon-md text-primary">verified</span>
                          <div>
                            <strong>Attached: {attachedFile ? attachedFile.name : passedFileName}</strong>
                            <span className="text-body-sm text-on-surface-variant">
                              {attachedFile ? `${(attachedFile.size / (1024 * 1024)).toFixed(1)} MB` : 'From CAD Portal'} • Click to change file
                            </span>
                          </div>
                        </div>
                      ) : (
                        <>
                          <span className="material-symbols-outlined icon-md text-primary">cloud_upload</span>
                          <p className="text-body-sm text-on-surface-variant">Click to browse CAD or 2D drawings</p>
                          <span className="text-body-sm text-outline">.STEP · .IGES · .SLDPRT · .DWG · .PDF — max 150 MB, NDA protected</span>
                        </>
                      )}
                    </div>
                  </div>
                  </fieldset>

                  {/* Optional engineering detail — collapsed so the required path stays short */}
                  <Disclosure
                    icon="tune"
                    summary="Technical requirements"
                    meta={
                      formData.selectedOptions.length > 0
                        ? `${formData.selectedOptions.length} selected`
                        : 'Optional'
                    }
                    defaultOpen={formData.selectedOptions.length > 0 || !!formData.specialRequirements}
                  >
                    <div className="form-group">
                      <span className="form-label">Quality requirements & add-ons</span>
                      <div className="checkbox-grid">
                        {processOptions.map((opt) => (
                          <label className="checkbox-wrapper" key={opt}>
                            <input
                              type="checkbox"
                              checked={formData.selectedOptions.includes(opt)}
                              onChange={() => handleOptionToggle(opt)}
                            />
                            <span className="text-body-sm">{opt}</span>
                          </label>
                        ))}
                      </div>
                    </div>
                    <div className="form-group mt-4">
                      <label className="form-label" htmlFor="specialRequirements">
                        Tolerances, critical dimensions & surface finish
                      </label>
                      <textarea
                        id="specialRequirements"
                        name="specialRequirements"
                        className="input"
                        rows={3}
                        placeholder="State critical dimensions (e.g. ±0.03mm), surface texture (SPI-A2 / VDI 3400), target cycle-time, or custom masterbatch RAL/Pantone..."
                        value={formData.specialRequirements}
                        onChange={handleInputChange}
                      />
                    </div>
                  </Disclosure>

                  <button
                    type="submit"
                    className="btn btn-primary btn-lg w-full"
                    disabled={isSubmitting}
                  >
                    <span className="material-symbols-outlined icon-sm">
                      {isSubmitting ? 'hourglass_top' : 'send'}
                    </span>
                    {isSubmitting
                      ? 'Transmitting RFQ to Toolroom...'
                      : 'Submit RFQ to Tooling Engineering'}
                  </button>
                </form>
              </div>
            </div>

            {/* Plant Info Column */}
            <div className="contact-info-col">
              <div className="card">
                <div className="card-body gap-4">
                  <div>
                    <span className="section-tag">Central Injection Works</span>
                    <h3 className="text-headline-sm font-bold">Toolroom & Foundry HQ</h3>
                    <p className="text-body-sm text-on-surface-variant">Hashim Motiwala Plastic & Polymer Engineering Pvt. Ltd.</p>
                  </div>
                  <div className="contact-address">
                    <strong>Pawane Industrial Complex:</strong>
                    <p>Plot W-14, TTC Industrial Area, MIDC, Pawane,</p>
                    <p>Thane-Belapur Corridor, Navi Mumbai, MH 400705, India.</p>
                    <p className="text-body-sm text-primary mt-1">
                      → Direct corridor access via Thane-Belapur Expressway
                    </p>
                  </div>
                  <div className="contact-lines">
                    <div className="contact-line">
                      <span className="material-symbols-outlined icon-sm text-primary">build</span>
                      <div>
                        <strong>Tooling & Moldflow Engineering</strong>
                        <a href="tel:+912268428810">+91 (022) 6842-8810</a>
                      </div>
                    </div>
                    <div className="contact-line">
                      <span className="material-symbols-outlined icon-sm text-primary">shopping_cart</span>
                      <div>
                        <strong>Commercial Procurement Desk</strong>
                        <a href="tel:+912268428822">+91 (022) 6842-8822</a>
                      </div>
                    </div>
                    <div className="contact-line">
                      <span className="material-symbols-outlined icon-sm text-primary">local_shipping</span>
                      <div>
                        <strong>Container Dispatch & Logistics</strong>
                        <a href="tel:+912268428845">+91 (022) 6842-8845</a>
                      </div>
                    </div>
                  </div>
                  <div className="cert-badges-row">
                    {['ISO 9001:2015 QMS', 'ASTM D638 TESTED', 'REACH / RoHS PASS', 'CE COMPLIANT'].map((b) => (
                      <span className="badge badge-surface" key={b}>{b}</span>
                    ))}
                  </div>
                  <Disclosure icon="visibility" summary="Plant visits & mould trials" meta="08:00 – 20:00 IST">
                    <p className="text-body-sm text-on-surface-variant">
                      Customer visits for tooling qualification (T0 / T1 / T2 trials) and pilot inspection
                      require 48-hour prior clearance. Factory safety orientation and PPE provided at Gate 01.
                    </p>
                  </Disclosure>
                </div>
              </div>

            </div>
          </div>
        </div>
      </section>

      {/* Logistics — one section, two views */}
      <section className="section" id="freight-section" ref={logisticsRef}>
        <div className="container reveal">
          <div className="section-header">
            <div>
              <span className="section-tag">Logistics Infrastructure</span>
              <h2 className="section-title">Ocean Freight & Export Dispatch</h2>
            </div>
            <span className="badge badge-surface">Origin: JNPT / Nhava Sheva (INNSA)</span>
          </div>

          <Tabs
            tabs={logisticsTabs}
            active={logisticsTab}
            onChange={setLogisticsTab}
            ariaLabel="Logistics information"
          />

          {logisticsTab === 'transit' ? (
            <div className="transit-grid" role="tabpanel">
              {globalRoutes.map((r) => (
                <div className="transit-card card" key={r.region}>
                  <div className="card-body">
                    <span className="transit-region">{r.region}</span>
                    <h3 className="transit-dest">{r.dest}</h3>
                    <div className="transit-time">
                      <span className="transit-label">Average transit</span>
                      <span className="transit-val">{r.transit} <small>{r.unit}</small></span>
                    </div>
                    <div className="transit-meta">
                      <span>{r.freq}</span>
                      <span className="text-outline">{r.carriers}</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="freight-cards" role="tabpanel">
              {freightServices.map((f) => (
                <div className="freight-card card" key={f.title}>
                  <div className="card-body gap-3">
                    <span className="material-symbols-outlined icon-lg text-primary">{f.icon}</span>
                    <h3 className="text-headline-sm font-bold">{f.title}</h3>
                    <p className="text-body-sm text-on-surface-variant">{f.desc}</p>
                    <span className="badge badge-surface mt-auto self-start">{f.badge}</span>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* Confirmation Modal */}
      {isSubmitted && (
        <div className="rfq-confirm-overlay">
          <div className="rfq-confirm-dialog card" role="alertdialog">
            <div className="card-body p-8! text-center">
              <div className="confirm-icon-wrap">
                <span className="material-symbols-outlined">check_circle</span>
              </div>
              <h2 className="text-headline-md font-bold mt-4 mb-2">
                RFQ Submission Received
              </h2>
              <div className="confirm-ref-badge">
                <span>INQUIRY REFERENCE:</span>
                <strong>{quoteRefNumber}</strong>
              </div>
              <p className="text-body-md text-on-surface-variant mx-auto my-4 max-w-[440px]">
                Thank you, <strong>{formData.fullName}</strong>. Your engineering inquiry for{' '}
                <strong>{formData.company}</strong> has been logged directly with our Head of Tooling Engineering.
              </p>

              <div className="confirm-specs-box">
                <div className="confirm-spec-row">
                  <span>Selected Resin:</span>
                  <strong>{formData.resin}</strong>
                </div>
                <div className="confirm-spec-row">
                  <span>Batch Volume:</span>
                  <strong>{formData.volume}</strong>
                </div>
                {attachedFile && (
                  <div className="confirm-spec-row">
                    <span>CAD Attachment:</span>
                    <strong>{attachedFile.name}</strong>
                  </div>
                )}
                {items.length > 0 && (
                  <div className="confirm-spec-row">
                    <span>Catalog Items:</span>
                    <strong>{items.length} SKUs Attached</strong>
                  </div>
                )}
                <div className="confirm-spec-row">
                  <span>Response SLA:</span>
                  <strong>24 Hours (Guaranteed)</strong>
                </div>
              </div>

              <div className="confirm-actions">
                <button
                  type="button"
                  className="btn btn-primary btn-lg w-full"
                  onClick={resetForm}
                >
                  Return to Procurement Desk
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </main>
  );
};

export default ContactPage;
