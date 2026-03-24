import { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import Header from './Header';
import Footer from './Footer';

function ScrollToTop() {
  const { pathname } = useLocation();
  useEffect(() => { window.scrollTo(0, 0); }, [pathname]);
  return null;
}

function BackToTop() {
  const [show, setShow] = useState(false);
  useEffect(() => {
    const onScroll = () => setShow(window.scrollY > 400);
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);
  return show ? (
    <button
      onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
      className="fixed bottom-6 right-6 z-40 w-12 h-12 rounded-full gradient-orange text-white flex items-center justify-center shadow-lg neon-orange hover:scale-110 transition-transform text-xl"
    >
      ↑
    </button>
  ) : null;
}

function CookieBanner() {
  const [show, setShow] = useState(false);
  useEffect(() => {
    if (!localStorage.getItem('cookies_accepted')) setShow(true);
  }, []);
  const accept = () => { localStorage.setItem('cookies_accepted', 'true'); setShow(false); };
  if (!show) return null;
  return (
    <div className="fixed bottom-0 left-0 right-0 z-50 glass border-t border-[var(--color-border-card)] p-4">
      <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-3">
        <p className="text-sm text-[var(--color-text-secondary)]">🍪 Мы используем cookies для улучшения работы сайта.</p>
        <button onClick={accept} className="px-6 py-2 rounded-lg gradient-orange text-white text-sm font-semibold hover:opacity-90 transition-opacity whitespace-nowrap">
          Принять
        </button>
      </div>
    </div>
  );
}

export default function Layout({ children }: { children: React.ReactNode }) {
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    const t = setTimeout(() => setLoading(false), 800);
    return () => clearTimeout(t);
  }, []);

  if (loading) {
    return (
      <div className="fixed inset-0 bg-[var(--color-bg-primary)] flex items-center justify-center z-[100]">
        <div className="text-center">
          <div className="w-16 h-16 rounded-xl gradient-orange flex items-center justify-center text-white text-2xl font-bold mb-4 mx-auto" style={{ fontFamily: 'var(--font-orbitron)', animation: 'spin-slow 2s linear infinite' }}>
            A
          </div>
          <p className="text-[var(--color-accent-orange)] text-sm font-semibold" style={{ fontFamily: 'var(--font-orbitron)' }}>АвтоПро</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col bg-[var(--color-bg-primary)]">
      <ScrollToTop />
      <Header />
      <main className="flex-1 pt-16 md:pt-20">{children}</main>
      <Footer />
      <BackToTop />
      <CookieBanner />
      {/* WhatsApp / Telegram widget */}
      <div className="fixed bottom-6 left-6 z-40 flex flex-col gap-2">
        <a href="https://wa.me/79518269839" target="_blank" rel="noopener" className="w-12 h-12 rounded-full bg-green-500 text-white flex items-center justify-center shadow-lg hover:scale-110 transition-transform text-xl" title="WhatsApp">💬</a>
        <a href="https://t.me/+79518269839" target="_blank" rel="noopener" className="w-12 h-12 rounded-full bg-blue-500 text-white flex items-center justify-center shadow-lg hover:scale-110 transition-transform text-xl" title="Telegram">✈️</a>
      </div>
    </div>
  );
}
