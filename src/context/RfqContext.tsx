import React, { createContext, useState, useEffect } from 'react';

export interface RfqProduct {
  sku: string;
  title: string;
  resinTag: string;
  priceUsd: number;
  priceInr: number;
  unit: string;
  moq: string;
  img: string;
  quantity?: number;
}

interface ToastMessage {
  id: string;
  text: string;
  type?: 'success' | 'info';
}

interface RfqContextType {
  currency: 'USD' | 'INR';
  setCurrency: (c: 'USD' | 'INR') => void;
  formatPrice: (priceUsd: number, priceInr: number) => string;
  items: RfqProduct[];
  addItem: (product: RfqProduct) => void;
  removeItem: (sku: string) => void;
  updateQuantity: (sku: string, qty: number) => void;
  clearItems: () => void;
  isDrawerOpen: boolean;
  setIsDrawerOpen: (open: boolean) => void;
  toasts: ToastMessage[];
  showToast: (text: string, type?: 'success' | 'info') => void;
  removeToast: (id: string) => void;
}

const RfqContext = createContext<RfqContextType | undefined>(undefined);

const STORAGE_KEY = 'hm_rfq_items';
const CURRENCY_KEY = 'hm_currency';

let toastCounter = 0;

export const RfqProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [currency, setCurrencyState] = useState<'USD' | 'INR'>(() => {
    const saved = localStorage.getItem(CURRENCY_KEY);
    return saved === 'INR' ? 'INR' : 'USD';
  });

  const [items, setItems] = useState<RfqProduct[]>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [toasts, setToasts] = useState<ToastMessage[]>([]);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(items));
  }, [items]);

  const setCurrency = (c: 'USD' | 'INR') => {
    setCurrencyState(c);
    localStorage.setItem(CURRENCY_KEY, c);
    showToast(`Currency changed to ${c}`, 'info');
  };

  const formatPrice = (priceUsd: number, priceInr: number) => {
    if (currency === 'INR') {
      return `₹${priceInr.toLocaleString('en-IN')}`;
    }
    return `$${priceUsd.toFixed(2)}`;
  };

  const showToast = (text: string, type: 'success' | 'info' = 'success') => {
    const id = (++toastCounter).toString();
    setToasts((prev) => [...prev, { id, text, type }]);
    setTimeout(() => {
      removeToast(id);
    }, 3500);
  };

  const removeToast = (id: string) => {
    setToasts((prev) => prev.filter((t) => t.id !== id));
  };

  const addItem = (product: RfqProduct) => {
    setItems((prev) => {
      const existing = prev.find((p) => p.sku === product.sku);
      if (existing) {
        showToast(`${product.sku} quantity updated in RFQ manifest`);
        return prev.map((p) =>
          p.sku === product.sku ? { ...p, quantity: (p.quantity || 1) + 1 } : p
        );
      }
      showToast(`Added ${product.sku} to RFQ Manifest`, 'success');
      return [...prev, { ...product, quantity: 1 }];
    });
  };

  const removeItem = (sku: string) => {
    setItems((prev) => prev.filter((p) => p.sku !== sku));
    showToast(`Removed from RFQ Manifest`, 'info');
  };

  const updateQuantity = (sku: string, qty: number) => {
    if (qty <= 0) {
      removeItem(sku);
      return;
    }
    setItems((prev) =>
      prev.map((p) => (p.sku === sku ? { ...p, quantity: qty } : p))
    );
  };

  const clearItems = () => {
    setItems([]);
  };

  return (
    <RfqContext.Provider
      value={{
        currency,
        setCurrency,
        formatPrice,
        items,
        addItem,
        removeItem,
        updateQuantity,
        clearItems,
        isDrawerOpen,
        setIsDrawerOpen,
        toasts,
        showToast,
        removeToast,
      }}
    >
      {children}
    </RfqContext.Provider>
  );
};

export { RfqContext };
