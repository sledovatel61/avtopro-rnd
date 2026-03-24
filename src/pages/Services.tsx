import { useState } from 'react';
import { Link } from 'react-router-dom';
import { services } from '../data/services';

export default function Services() {
  const [active, setActive] = useState<string | null>(null);

  return (
    <div className="py-16">
      <section className="py-12 bg-[var(--color-bg-primary)]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="text-center mb-12">
            <h1 className="text-3xl md:text-5xl font-bold text-white mb-4" style={{ fontFamily: 'var(--font-orbitron)' }}>
              ВСЕ <span className="text-[var(--color-accent-orange)]">УСЛУГИ</span>
            </h1>
            <p className="text-[var(--color-text-secondary)] max-w-2xl mx-auto">
              Детальное описание всех видов работ, которые мы выполняем
            </p>
          </div>

          {/* Filter Tabs */}
          <div className="flex flex-wrap gap-2 justify-center mb-10">
            <button
              onClick={() => setActive(null)}
              className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${
                active === null
                  ? 'gradient-orange text-white neon-orange'
                  : 'bg-[var(--color-bg-card)] text-[var(--color-text-secondary)] border border-[var(--color-border-card)] hover:text-white'
              }`}
            >
              Все услуги
            </button>
            {services.map((s) => (
              <button
                key={s.id}
                onClick={() => setActive(s.id)}
                className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${
                  active === s.id
                    ? 'gradient-orange text-white neon-orange'
                    : 'bg-[var(--color-bg-card)] text-[var(--color-text-secondary)] border border-[var(--color-border-card)] hover:text-white'
                }`}
              >
                {s.icon} {s.title}
              </button>
            ))}
          </div>

          {/* Services Grid */}
          <div className="space-y-8">
            {services
              .filter((s) => !active || s.id === active)
              .map((service) => (
                <div
                  key={service.id}
                  className="rounded-2xl bg-[var(--color-bg-card)] border border-[var(--color-border-card)] overflow-hidden hover:border-[var(--color-accent-orange)]/30 transition-all"
                >
                  <div className="p-6 md:p-8">
                    <div className="flex items-start gap-4 mb-6">
                      <div className="text-5xl">{service.icon}</div>
                      <div>
                        <h2 className="text-2xl md:text-3xl font-bold text-white mb-2" style={{ fontFamily: 'var(--font-orbitron)' }}>
                          {service.title}
                        </h2>
                        <p className="text-[var(--color-text-secondary)]">{service.shortDesc}</p>
                      </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      {/* Details */}
                      <div>
                        <h3 className="text-lg font-semibold text-white mb-4 flex items-center gap-2">
                          <span className="w-1 h-6 rounded bg-[var(--color-accent-orange)]" />
                          Что включено
                        </h3>
                        <ul className="space-y-3">
                          {service.details.map((detail, i) => (
                            <li key={i} className="flex items-start gap-3 text-[var(--color-text-primary)]">
                              <span className="text-[var(--color-accent-cyan)] mt-0.5">✓</span>
                              <span className="text-sm">{detail}</span>
                            </li>
                          ))}
                        </ul>
                      </div>

                      {/* Quick Price */}
                      {service.priceTable.length > 0 && (
                        <div>
                          <h3 className="text-lg font-semibold text-white mb-4 flex items-center gap-2">
                            <span className="w-1 h-6 rounded bg-[var(--color-accent-cyan)]" />
                            Цены от
                          </h3>
                          <div className="space-y-2">
                            {service.priceTable.slice(0, 4).map((item, i) => (
                              <div key={i} className="flex justify-between items-center py-2 px-3 rounded-lg bg-white/5">
                                <span className="text-sm text-[var(--color-text-primary)]">{item.name}</span>
                                <span className="text-[var(--color-accent-orange)] font-semibold text-sm">
                                  {item.price ? `от ${item.price}₽` : item.sizes ? `от ${Object.values(item.sizes)[0]}₽` : '—'}
                                </span>
                              </div>
                            ))}
                          </div>
                        </div>
                      )}
                    </div>

                    <div className="mt-6 flex flex-col sm:flex-row gap-3">
                      <Link to="/price" className="px-6 py-3 rounded-xl gradient-orange text-white font-semibold text-sm hover:opacity-90 transition-all text-center">
                        Полный прайс →
                      </Link>
                      <Link to="/calculator" className="px-6 py-3 rounded-xl border border-[var(--color-accent-cyan)] text-[var(--color-accent-cyan)] font-semibold text-sm hover:bg-[var(--color-accent-cyan)]/10 transition-all text-center">
                        Рассчитать стоимость
                      </Link>
                    </div>
                  </div>
                </div>
              ))}
          </div>
        </div>
      </section>
    </div>
  );
}
