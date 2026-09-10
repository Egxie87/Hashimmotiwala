import React, { useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import Header from './components/Header';
import Footer from './components/Footer';
import WhatsAppButton from './components/WhatsAppButton';
import HomePage from './pages/HomePage';
import ProductsPage from './pages/ProductsPage';
import CustomMouldingPage from './pages/CustomMouldingPage';
import ContactPage from './pages/ContactPage';

// Scroll to top on route change
function ScrollToTop() {
  const { pathname } = useLocation();
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);
  return null;
}

// Scroll reveal observer for .reveal elements
function RevealObserver() {
  const { pathname } = useLocation();

  useEffect(() => {
    // Small timeout to allow DOM from new route to settle
    const timer = setTimeout(() => {
      const elements = document.querySelectorAll('.reveal');

      // Immediately reveal anything in or near current viewport
      elements.forEach((el) => {
        const rect = el.getBoundingClientRect();
        if (rect.top < window.innerHeight + 150) {
          el.classList.add('visible');
        }
      });

      const observer = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting) {
              entry.target.classList.add('visible');
              observer.unobserve(entry.target);
            }
          });
        },
        { threshold: 0.02, rootMargin: '80px 0px 80px 0px' }
      );

      elements.forEach((el) => {
        if (!el.classList.contains('visible')) {
          observer.observe(el);
        }
      });

      return () => observer.disconnect();
    }, 40);

    return () => clearTimeout(timer);
  }, [pathname]);

  return null;
}

const App: React.FC = () => {
  return (
    <Router>
      <ScrollToTop />
      <RevealObserver />
      <a href="#main-content" className="skip-to-content">Skip to main content</a>
      <Header />
      <div id="main-content" className="main-content-wrap">
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/products" element={<ProductsPage />} />
          <Route path="/custom-moulding" element={<CustomMouldingPage />} />
          <Route path="/contact" element={<ContactPage />} />
        </Routes>
      </div>
      <Footer />
      <WhatsAppButton />
    </Router>
  );
};

export default App;
