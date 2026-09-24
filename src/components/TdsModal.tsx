import React from 'react';
import '../styles/components/TdsModal.css';

export interface TdsData {
  sku: string;
  title: string;
  resinTag: string;
  resin: string;
  cert: string;
  specs: [string, string][];
  technicalDetails?: {
    density: string;
    meltFlowIndex: string;
    tensileStrength: string;
    flexuralModulus: string;
    heatDeflection: string;
    mouldShrinkage: string;
    processingTemp: string;
  };
}

interface TdsModalProps {
  product: TdsData | null;
  onClose: () => void;
}

const TdsModal: React.FC<TdsModalProps> = ({ product, onClose }) => {
  if (!product) return null;

  const handlePrint = () => {
    window.print();
  };

  const handleDownload = () => {
    // Generate text TDS file for immediate download
    const content = `========================================================================
HASHIM MOTIWALA PLASTIC & POLYMER ENGINEERING PVT. LTD.
TECHNICAL DATA SHEET (TDS) — CERTIFIED SPECIFICATION
========================================================================

PRODUCT IDENTIFICATION:
-----------------------
SKU: ${product.sku}
Product Name: ${product.title}
Polymer Grade: ${product.resinTag} (${product.resin})
Compliance / Certification: ${product.cert}
Facility Origin: TTC MIDC Industrial Zone, Navi Mumbai, India

PRIMARY PHYSICAL & DIMENSIONAL SPECIFICATIONS:
----------------------------------------------
${product.specs.map(([k, v]) => `${k.padEnd(28)}: ${v}`).join('\n')}

ASTM / ISO CALIBRATED MECHANICAL PROPERTIES:
--------------------------------------------
Density (ASTM D792)            : ${product.technicalDetails?.density || '0.952 g/cm³'}
Melt Flow Rate (ASTM D1238)    : ${product.technicalDetails?.meltFlowIndex || '7.0 g/10min (190°C/2.16kg)'}
Tensile Strength @ Yield       : ${product.technicalDetails?.tensileStrength || '28 - 32 MPa (ISO 527)'}
Flexural Modulus               : ${product.technicalDetails?.flexuralModulus || '1,250 MPa (ISO 178)'}
Heat Deflection Temp (0.45MPa) : ${product.technicalDetails?.heatDeflection || '78°C – 102°C'}
Mould Shrinkage (Linear)       : ${product.technicalDetails?.mouldShrinkage || '1.8 – 2.4%'}
Recommended Barrel Processing  : ${product.technicalDetails?.processingTemp || '190°C – 230°C'}

QUALITY & REGULATORY COMPLIANCE:
--------------------------------
- ISO 9001:2015 Quality Management System Certified
- REACH Regulation (EC) No 1907/2006 Compliant
- RoHS Directive 2011/65/EU Compliant
- Export Gateway: Direct Container Stuffing via JNPT (Nhava Sheva) Port

For tooling CAD validation or moldflow simulation reports, contact:
engineering@hashimmotiwala.com | +91 (022) 6842-8900
========================================================================
`;

    const blob = new Blob([content], { type: 'text/plain;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `TDS_${product.sku}.txt`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  };

  return (
    <div className="tds-modal-overlay" onClick={onClose}>
      <div className="tds-modal-dialog" onClick={(e) => e.stopPropagation()}>
        {/* Header */}
        <div className="tds-modal-header">
          <div className="tds-header-title-wrap">
            <span className="tds-cert-tag">
              <span className="material-symbols-outlined icon-xs">verified</span>
              {product.cert}
            </span>
            <h2 className="tds-modal-title">{product.title}</h2>
            <div className="tds-sku-row">
              <span className="tds-sku">SKU: {product.sku}</span>
              <span className="tds-resin">Resin: {product.resinTag}</span>
            </div>
          </div>
          <button className="tds-close-btn" onClick={onClose} aria-label="Close TDS view">
            <span className="material-symbols-outlined">close</span>
          </button>
        </div>

        {/* Body */}
        <div className="tds-modal-body">
          {/* Key Specs Grid */}
          <div className="tds-section">
            <h3 className="tds-section-title">Component Specifications</h3>
            <div className="tds-specs-grid">
              {product.specs.map(([k, v]) => (
                <div key={k} className="tds-spec-item">
                  <span className="tds-spec-key">{k}</span>
                  <span className="tds-spec-val">{v}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Mechanical Properties */}
          <div className="tds-section">
            <h3 className="tds-section-title">ASTM / ISO Mechanical & Thermal Properties</h3>
            <table className="tds-table">
              <thead>
                <tr>
                  <th>Property Parameter</th>
                  <th>Test Standard</th>
                  <th>Nominal Value</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>Polymer Density</td>
                  <td>ASTM D792</td>
                  <td>{product.technicalDetails?.density || '0.952 g/cm³'}</td>
                </tr>
                <tr>
                  <td>Melt Flow Index (MFI)</td>
                  <td>ASTM D1238</td>
                  <td>{product.technicalDetails?.meltFlowIndex || '7.0 g/10min'}</td>
                </tr>
                <tr>
                  <td>Tensile Strength @ Yield</td>
                  <td>ISO 527</td>
                  <td>{product.technicalDetails?.tensileStrength || '30.0 MPa'}</td>
                </tr>
                <tr>
                  <td>Flexural Modulus (Rigidity)</td>
                  <td>ISO 178</td>
                  <td>{product.technicalDetails?.flexuralModulus || '1,250 MPa'}</td>
                </tr>
                <tr>
                  <td>Heat Deflection Temperature</td>
                  <td>ASTM D648 (0.45 MPa)</td>
                  <td>{product.technicalDetails?.heatDeflection || '85°C'}</td>
                </tr>
                <tr>
                  <td>Mould Shrinkage Rate</td>
                  <td>Parallel / Cross flow</td>
                  <td>{product.technicalDetails?.mouldShrinkage || '1.8 – 2.2%'}</td>
                </tr>
              </tbody>
            </table>
          </div>

          {/* Quality Assurance Note */}
          <div className="tds-qa-box">
            <span className="material-symbols-outlined icon-md text-primary">verified_user</span>
            <div>
              <strong>Quality Assurance Verification</strong>
              <p>
                Each production lot is batch-tested for tensile elongation, Izod impact, and dimensional tolerance
                with optical CMM inspection before container stuffing at our Navi Mumbai works.
              </p>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="tds-modal-footer">
          <div className="tds-footer-left">
            <span>Hashim Motiwala Technical Documentation</span>
          </div>
          <div className="tds-footer-actions">
            <button className="btn btn-outline btn-md" onClick={handlePrint}>
              <span className="material-symbols-outlined icon-sm">print</span>
              Print Spec
            </button>
            <button className="btn btn-primary btn-md" onClick={handleDownload}>
              <span className="material-symbols-outlined icon-sm">download</span>
              Download TDS
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TdsModal;
