import React, { useState } from 'react';
import './WhatsAppButton.css';

interface WhatsAppButtonProps {
  phoneNumber?: string;
  defaultMessage?: string;
}

const WhatsAppButton: React.FC<WhatsAppButtonProps> = ({
  phoneNumber = '919820012345',
  defaultMessage = 'Hello Hashim Motiwala Plastics, I would like to inquire about mould tooling and precision injection moulding.'
}) => {
  const [isHovered, setIsHovered] = useState(false);

  const whatsappUrl = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(defaultMessage)}`;

  return (
    <div 
      className="whatsapp-float-container"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Tooltip / Expanded pill */}
      <a
        href={whatsappUrl}
        target="_blank"
        rel="noopener noreferrer"
        className="whatsapp-pill-badge"
        aria-label="Direct message to engineering desk on WhatsApp"
      >
        <span className="whatsapp-status-dot"></span>
        <span className="whatsapp-pill-text">
          <strong>Chat on WhatsApp</strong>
          <small>Tooling Desk • Instant Reply</small>
        </span>
      </a>

      {/* Floating Action Button */}
      <a
        href={whatsappUrl}
        target="_blank"
        rel="noopener noreferrer"
        className="whatsapp-float-btn"
        aria-label="Chat with Hashim Motiwala Plastics on WhatsApp"
        title="Chat on WhatsApp"
      >
        {/* Pulse ring animation */}
        <span className="whatsapp-pulse-ring"></span>
        <span className="whatsapp-pulse-ring delay"></span>

        {/* WhatsApp Icon */}
        <svg
          className="whatsapp-icon"
          viewBox="0 0 32 32"
          width="32"
          height="32"
          fill="currentColor"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path d="M16 2.5C8.544 2.5 2.5 8.544 2.5 16c0 2.658.766 5.143 2.088 7.243L3.1 29.5l6.452-1.455A13.435 13.435 0 0 0 16 29.5c7.456 0 13.5-6.044 13.5-13.5S23.456 2.5 16 2.5zm0 24.62c-2.235 0-4.33-.62-6.13-1.696l-.44-.26-4.524 1.02 1.205-4.398-.284-.452A11.12 11.12 0 0 1 4.88 16c0-6.142 4.978-11.12 11.12-11.12 6.142 0 11.12 4.978 11.12 11.12 0 6.142-4.978 11.12-11.12 11.12zm6.096-8.337c-.334-.167-1.977-.975-2.283-1.087-.306-.111-.528-.167-.751.167-.223.334-.863 1.087-1.058 1.31-.195.223-.39.25-.724.084a9.145 9.145 0 0 1-2.694-1.663 10.12 10.12 0 0 1-1.872-2.327c-.195-.334-.02-.515.147-.681.15-.15.334-.39.501-.585.167-.195.223-.334.334-.557.111-.223.056-.418-.028-.585-.084-.167-.751-1.81-1.03-2.478-.27-.653-.548-.564-.751-.574l-.642-.01c-.223 0-.584.084-.89.418-.306.334-1.17 1.142-1.17 2.784 0 1.643 1.197 3.23 1.364 3.453.167.223 2.355 3.596 5.706 5.042.797.344 1.419.55 1.904.704.8.254 1.528.218 2.103.133.642-.096 1.977-.808 2.255-1.587.279-.78.279-1.448.195-1.587-.083-.14-.306-.223-.64-.39z"/>
        </svg>
      </a>
    </div>
  );
};

export default WhatsAppButton;
