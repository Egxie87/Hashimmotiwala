import React from 'react';
import { useRfq } from '../hooks/useRfq';
import '../styles/components/ToastContainer.css';

const ToastContainer: React.FC = () => {
  const { toasts, removeToast } = useRfq();

  if (toasts.length === 0) return null;

  return (
    <div className="toast-container" aria-live="polite">
      {toasts.map((toast) => (
        <div key={toast.id} className={`toast-card toast-${toast.type || 'success'}`}>
          <span className="material-symbols-outlined icon-sm">
            {toast.type === 'info' ? 'info' : 'check_circle'}
          </span>
          <span className="toast-text">{toast.text}</span>
          <button
            className="toast-close"
            onClick={() => removeToast(toast.id)}
            aria-label="Dismiss notification"
          >
            <span className="material-symbols-outlined icon-xs">close</span>
          </button>
        </div>
      ))}
    </div>
  );
};

export default ToastContainer;
