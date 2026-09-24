import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useRfq } from '../hooks/useRfq';
import '../styles/components/RfqDrawer.css';

const RfqDrawer: React.FC = () => {
  const { items, removeItem, updateQuantity, clearItems, isDrawerOpen, setIsDrawerOpen, formatPrice } = useRfq();
  const navigate = useNavigate();

  if (!isDrawerOpen) return null;

  const handleProceedToInquiry = () => {
    setIsDrawerOpen(false);
    navigate('/contact');
  };

  return (
    <div className="rfq-drawer-overlay" onClick={() => setIsDrawerOpen(false)}>
      <aside className="rfq-drawer-panel" onClick={(e) => e.stopPropagation()} aria-label="RFQ Manifest Drawer">
        {/* Header */}
        <div className="rfq-drawer-header">
          <div className="rfq-drawer-title-group">
            <div className="rfq-drawer-icon-wrap">
              <span className="material-symbols-outlined">inventory_2</span>
            </div>
            <div>
              <h2 className="rfq-drawer-title">RFQ Batch Manifest</h2>
              <span className="rfq-drawer-subtitle">
                {items.length} {items.length === 1 ? 'component' : 'components'} selected for quotation
              </span>
            </div>
          </div>
          <button
            className="rfq-drawer-close-btn"
            onClick={() => setIsDrawerOpen(false)}
            aria-label="Close RFQ Manifest"
          >
            <span className="material-symbols-outlined">close</span>
          </button>
        </div>

        {/* Content */}
        <div className="rfq-drawer-body">
          {items.length === 0 ? (
            <div className="rfq-empty-state">
              <span className="material-symbols-outlined rfq-empty-icon">shopping_cart_checkout</span>
              <h3>Your RFQ Manifest is Empty</h3>
              <p>Browse our injection moulding catalog and add components to request customized volume pricing and tool availability.</p>
              <button
                className="btn btn-outline btn-md"
                onClick={() => {
                  setIsDrawerOpen(false);
                  navigate('/products');
                }}
              >
                Explore Product Catalog
              </button>
            </div>
          ) : (
            <div className="rfq-items-list">
              {items.map((item) => (
                <div key={item.sku} className="rfq-item-card">
                  <img src={item.img} alt={item.title} className="rfq-item-img" />
                  <div className="rfq-item-details">
                    <div className="rfq-item-top">
                      <span className="rfq-item-sku">{item.sku}</span>
                      <span className="rfq-item-tag">{item.resinTag}</span>
                    </div>
                    <h4 className="rfq-item-title">{item.title}</h4>
                    <div className="rfq-item-pricing">
                      <span className="rfq-item-price">{formatPrice(item.priceUsd, item.priceInr)}</span>
                      <span className="rfq-item-unit">{item.unit}</span>
                      <span className="rfq-item-moq">({item.moq})</span>
                    </div>

                    <div className="rfq-item-controls">
                      <div className="rfq-qty-control">
                        <button
                          className="rfq-qty-btn"
                          onClick={() => updateQuantity(item.sku, (item.quantity || 1) - 1)}
                          aria-label="Decrease quantity"
                        >
                          <span className="material-symbols-outlined icon-xs">remove</span>
                        </button>
                        <span className="rfq-qty-value">{item.quantity || 1}</span>
                        <button
                          className="rfq-qty-btn"
                          onClick={() => updateQuantity(item.sku, (item.quantity || 1) + 1)}
                          aria-label="Increase quantity"
                        >
                          <span className="material-symbols-outlined icon-xs">add</span>
                        </button>
                      </div>

                      <button
                        className="rfq-item-remove-btn"
                        onClick={() => removeItem(item.sku)}
                        title="Remove from manifest"
                      >
                        <span className="material-symbols-outlined icon-xs">delete</span>
                        Remove
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Footer */}
        {items.length > 0 && (
          <div className="rfq-drawer-footer">
            <div className="rfq-manifest-meta">
              <span>Verified Port FOB: JNPT (Nhava Sheva)</span>
              <button className="rfq-clear-btn" onClick={clearItems}>
                Clear All
              </button>
            </div>
            <button className="btn btn-primary btn-lg w-full" onClick={handleProceedToInquiry}>
              <span className="material-symbols-outlined icon-sm">send</span>
              Proceed to RFQ Inquiry ({items.length} Items)
            </button>
            <p className="rfq-footer-note">
              Selected items and batch volumes will be attached to your engineering inquiry automatically.
            </p>
          </div>
        )}
      </aside>
    </div>
  );
};

export default RfqDrawer;
