import { useEffect, useRef } from 'react';

export function useScrollReveal<T extends HTMLElement>() {
  const ref = useRef<T>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    // Check if element is already in or near viewport
    const markVisible = () => {
      el.classList.add('visible');
      el.querySelectorAll('.reveal').forEach((c) => c.classList.add('visible'));
    };

    const rect = el.getBoundingClientRect();
    if (rect.top < window.innerHeight + 120) {
      markVisible();
    }

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            markVisible();
            observer.unobserve(el);
          }
        });
      },
      { threshold: 0.02, rootMargin: '60px 0px 60px 0px' }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return ref;
}
