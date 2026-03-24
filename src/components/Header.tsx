import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';

const navItems = [
  { path: '/', label: 'Главная' },
  { path: '/services', label: 'Услуги' },
  { path: '/price', label: 'Прайс' },
  { path: '/calculator', label: 'Калькулятор' },
  { path: '/gallery', label: 'Галерея' },
  { path: '/reviews', label: 'Отзывы' },
  { path: '/contacts', label: 'Контакты' },
];

export default function Header() {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => { setIsOpen(false); }, [location]);

  const toggleTheme = () => {
    document.body.classList.toggle('light-theme');
    localStorage.setItem('theme', document.body.classList.contains('light-theme') ? 'light' : 'dark');
  };

  useEffect(() => {
    if (localStorage.getItem('theme') === 'light') document.body.classList.add('light-theme');
  }, []);

  return (
    <header className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${scrolled ? 'glass shadow-lg shadow-black/30' : 'bg-transparent'}`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="flex items-center justify-between h-16 md:h-20">
          <Link to="/" className="flex items-center gap-2 group">
            <div className="w-10 h-10 rounded-lg gradient-orange flex items-center justify-center text-white font-bold text-lg" style={{ fontFamily: 'var(--font-orbitron)' }}>
              A
            </div>
            <span className="text-xl font-bold text-white group-hover:text-[var(--color-accent-orange)] transition-colors" style={{ fontFamily: 'var(--font-orbitron)' }}>
              АвтоПро
            </span>
          </Link>

          <nav className="hidden lg:flex items-center gap-1">
            {navItems.map((item) => (
              <Link
                key={item.path}
                to={item.path}
                className={`px-3 py-2 rounded-lg text-sm font-medium transition-all duration-200 ${
                  location.pathname === item.path
                    ? 'text-[var(--color-accent-orange)] bg-[var(--color-accent-orange)]/10'
                    : 'text-[var(--color-text-primary)] hover:text-[var(--color-accent-orange)] hover:bg-white/5'
                }`}
              >
                {item.label}
              </Link>
            ))}
          </nav>

          <div className="flex items-center gap-3">
            <button onClick={toggleTheme} className="w-9 h-9 rounded-lg bg-white/5 hover:bg-white/10 flex items-center justify-center transition-all text-lg" title="Переключить тему">
              🌙
            </button>
            <a href="tel:+79518269839" className="hidden md:flex items-center gap-2 px-4 py-2 rounded-lg gradient-orange text-white text-sm font-semibold hover:opacity-90 transition-opacity neon-orange">
              📞 +7 951 826-98-39
            </a>
            <button onClick={() => setIsOpen(!isOpen)} className="lg:hidden w-9 h-9 rounded-lg bg-white/5 hover:bg-white/10 flex flex-col items-center justify-center gap-1.5 transition-all">
              <span className={`w-5 h-0.5 bg-white transition-all ${isOpen ? 'rotate-45 translate-y-1' : ''}`} />
              <span className={`w-5 h-0.5 bg-white transition-all ${isOpen ? 'opacity-0' : ''}`} />
              <span className={`w-5 h-0.5 bg-white transition-all ${isOpen ? '-rotate-45 -translate-y-1' : ''}`} />
            </button>
          </div>
        </div>
      </div>

      {isOpen && (
        <div className="lg:hidden glass border-t border-[var(--color-border-card)]">
          <div className="px-4 py-3 space-y-1">
            {navItems.map((item) => (
              <Link
                key={item.path}
                to={item.path}
                className={`block px-4 py-3 rounded-lg text-sm font-medium transition-all ${
                  location.pathname === item.path
                    ? 'text-[var(--color-accent-orange)] bg-[var(--color-accent-orange)]/10'
                    : 'text-[var(--color-text-primary)] hover:text-[var(--color-accent-orange)] hover:bg-white/5'
                }`}
              >
                {item.label}
              </Link>
            ))}
            <a href="tel:+79518269839" className="block text-center mt-3 px-4 py-3 rounded-lg gradient-orange text-white text-sm font-semibold">
              📞 +7 951 826-98-39
            </a>
          </div>
        </div>
      )}
    </header>
  );
}
