import { useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import { services, advantages, stats } from '../data/services';

function Counter({ target, suffix }: { target: number; suffix: string }) {
  const [count, setCount] = useState(0);
  const ref = useRef<HTMLDivElement>(null);
  const started = useRef(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !started.current) {
          started.current = true;
          const duration = 2000;
          const step = target / (duration / 16);
          let current = 0;
          const timer = setInterval(() => {
            current += step;
            if (current >= target) { setCount(target); clearInterval(timer); }
            else setCount(Math.floor(current));
          }, 16);
        }
      },
      { threshold: 0.5 }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, [target]);

  return (
    <div ref={ref} className="text-center">
      <div className="text-4xl md:text-5xl font-bold text-white mb-2" style={{ fontFamily: 'var(--font-orbitron)' }}>
        <span className="neon-text-orange">{count.toLocaleString()}{suffix}</span>
      </div>
    </div>
  );
}

export default function Home() {
  return (
    <div>
      {/* Hero Section */}
      <section className="min-h-screen flex items-center relative overflow-hidden">
        <div className="absolute inset-0">
          <img src="./images/hero-bg.jpg" alt="" className="w-full h-full object-cover" />
          <div className="absolute inset-0 bg-gradient-to-r from-[#0a0a0f]/95 via-[#0a0a0f]/80 to-[#0a0a0f]/60" />
          <div className="absolute top-20 left-10 w-72 h-72 bg-[var(--color-accent-orange)]/5 rounded-full blur-[100px]" />
          <div className="absolute bottom-20 right-10 w-96 h-96 bg-[var(--color-accent-cyan)]/5 rounded-full blur-[100px]" />
          {/* Animated grid */}
          <div className="absolute inset-0 opacity-[0.03]" style={{
            backgroundImage: 'linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px)',
            backgroundSize: '50px 50px'
          }} />
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-20 relative z-10">
          <div className="max-w-3xl">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[var(--color-accent-orange)]/10 border border-[var(--color-accent-orange)]/20 mb-6 animate-fade-in-up">
              <span className="w-2 h-2 rounded-full bg-[var(--color-accent-orange)] animate-pulse" />
              <span className="text-[var(--color-accent-orange)] text-sm font-medium">Работаем ежедневно с 9:00</span>
            </div>

            <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold text-white leading-tight mb-6" style={{ fontFamily: 'var(--font-orbitron)' }}>
              ПРОФЕССИОНАЛЬНЫЙ{' '}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-[var(--color-accent-orange)] to-[var(--color-accent-cyan)]">
                АВТОСЕРВИС
              </span>{' '}
              В РОСТОВЕ-НА-ДОНУ
            </h1>

            <p className="text-lg md:text-xl text-[var(--color-text-secondary)] mb-8 leading-relaxed max-w-2xl">
              Ремонт любой сложности. Гарантия качества. Честные цены. 
              Более 15 лет на рынке автомобильных услуг.
            </p>

            <div className="flex flex-col sm:flex-row gap-4">
              <Link to="/calculator" className="px-8 py-4 rounded-xl gradient-orange text-white font-semibold text-lg hover:opacity-90 transition-all neon-orange text-center">
                🧮 Рассчитать стоимость
              </Link>
              <Link to="/contacts" className="px-8 py-4 rounded-xl border-2 border-[var(--color-accent-cyan)] text-[var(--color-accent-cyan)] font-semibold text-lg hover:bg-[var(--color-accent-cyan)]/10 transition-all text-center">
                📞 Записаться
              </Link>
            </div>
          </div>
        </div>

        {/* Decorative car silhouette */}
        <div className="absolute right-0 bottom-0 w-1/2 h-full hidden lg:flex items-end justify-end opacity-10">
          <svg viewBox="0 0 800 400" className="w-full max-w-2xl" fill="none">
            <path d="M100 300 L150 300 L200 250 L350 220 L400 200 L550 200 L600 220 L650 250 L700 300 L750 300" stroke="var(--color-accent-orange)" strokeWidth="3" />
            <ellipse cx="230" cy="310" rx="40" ry="40" stroke="var(--color-accent-cyan)" strokeWidth="3" />
            <ellipse cx="620" cy="310" rx="40" ry="40" stroke="var(--color-accent-cyan)" strokeWidth="3" />
          </svg>
        </div>
      </section>

      {/* Services Section */}
      <section className="py-20 bg-[var(--color-bg-primary)]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-4" style={{ fontFamily: 'var(--font-orbitron)' }}>
              НАШИ <span className="text-[var(--color-accent-orange)]">УСЛУГИ</span>
            </h2>
            <p className="text-[var(--color-text-secondary)] max-w-2xl mx-auto">
              Полный спектр услуг по ремонту и обслуживанию автомобилей любых марок
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {services.map((service, i) => (
              <Link
                key={service.id}
                to="/services"
                className="group p-6 rounded-2xl bg-[var(--color-bg-card)] border border-[var(--color-border-card)] hover:border-[var(--color-accent-orange)]/50 transition-all duration-300 hover:-translate-y-1 hover:shadow-lg hover:shadow-[var(--color-accent-orange)]/10"
                style={{ animationDelay: `${i * 100}ms` }}
              >
                <div className="text-4xl mb-4">{service.icon}</div>
                <h3 className="text-xl font-bold text-white mb-2 group-hover:text-[var(--color-accent-orange)] transition-colors" style={{ fontFamily: 'var(--font-orbitron)' }}>
                  {service.title}
                </h3>
                <p className="text-[var(--color-text-secondary)] text-sm leading-relaxed">
                  {service.shortDesc}
                </p>
                <div className="mt-4 flex items-center gap-2 text-[var(--color-accent-orange)] text-sm font-medium opacity-0 group-hover:opacity-100 transition-opacity">
                  Подробнее →
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Why Us Section */}
      <section className="py-20 bg-[#0c0c14]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-4" style={{ fontFamily: 'var(--font-orbitron)' }}>
              ПОЧЕМУ <span className="text-[var(--color-accent-cyan)]">МЫ</span>
            </h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {advantages.map((adv, i) => (
              <div key={i} className="text-center p-6 rounded-2xl glass hover:border-[var(--color-accent-cyan)]/30 transition-all duration-300 group">
                <div className="text-5xl mb-4 group-hover:scale-110 transition-transform">{adv.icon}</div>
                <h3 className="text-lg font-bold text-white mb-2" style={{ fontFamily: 'var(--font-orbitron)' }}>
                  {adv.title}
                </h3>
                <p className="text-[var(--color-text-secondary)] text-sm">{adv.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-20 bg-[var(--color-bg-primary)] relative overflow-hidden">
        <div className="absolute inset-0">
          <div className="absolute top-0 left-1/4 w-64 h-64 bg-[var(--color-accent-orange)]/5 rounded-full blur-[80px]" />
          <div className="absolute bottom-0 right-1/4 w-64 h-64 bg-[var(--color-accent-cyan)]/5 rounded-full blur-[80px]" />
        </div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 relative z-10">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
            {stats.map((stat, i) => (
              <div key={i} className="text-center">
                <Counter target={stat.value} suffix={stat.suffix} />
                <p className="text-[var(--color-text-secondary)] text-sm mt-2">{stat.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-[#0c0c14]">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4" style={{ fontFamily: 'var(--font-orbitron)' }}>
            ГОТОВЫ <span className="text-[var(--color-accent-orange)]">ЗАПИСАТЬСЯ</span>?
          </h2>
          <p className="text-[var(--color-text-secondary)] mb-8 text-lg">
            Рассчитайте стоимость ремонта онлайн или свяжитесь с нами для консультации
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link to="/calculator" className="px-8 py-4 rounded-xl gradient-orange text-white font-semibold text-lg hover:opacity-90 transition-all neon-orange">
              Калькулятор стоимости
            </Link>
            <a href="tel:+79518269839" className="px-8 py-4 rounded-xl border-2 border-[var(--color-accent-cyan)] text-[var(--color-accent-cyan)] font-semibold text-lg hover:bg-[var(--color-accent-cyan)]/10 transition-all">
              📞 Позвонить
            </a>
          </div>
        </div>
      </section>
    </div>
  );
}
