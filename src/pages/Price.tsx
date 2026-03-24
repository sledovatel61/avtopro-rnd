import { useState } from 'react';
import { Link } from 'react-router-dom';
import { services } from '../data/services';

export default function Price() {
  const [activeTab, setActiveTab] = useState(services[0].id);
  const [search, setSearch] = useState('');

  const activeService = services.find((s) => s.id === activeTab)!;
  const hasSizes = activeService.priceTable.some((p) => p.sizes);

  const filteredItems = activeService.priceTable.filter((item) =>
    item.name.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="py-16">
      <section className="py-12 bg-[var(--color-bg-primary)]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="text-center mb-12">
            <h1 className="text-3xl md:text-5xl font-bold text-white mb-4" style={{ fontFamily: 'var(--font-orbitron)' }}>
              ПРАЙС-<span className="text-[var(--color-accent-orange)]">ЛИСТ</span>
            </h1>
            <p className="text-[var(--color-text-secondary)] max-w-2xl mx-auto">
              Актуальные цены на все виды работ. Стоимость запчастей не включена.
            </p>
          </div>

          {/* Category Tabs */}
          <div className="flex flex-wrap gap-2 justify-center mb-8">
            {services.filter(s => s.priceTable.length > 0).map((s) => (
              <button
                key={s.id}
                onClick={() => { setActiveTab(s.id); setSearch(''); }}
                className={`px-5 py-3 rounded-xl text-sm font-medium transition-all ${
                  activeTab === s.id
                    ? 'gradient-orange text-white neon-orange'
                    : 'bg-[var(--color-bg-card)] text-[var(--color-text-secondary)] border border-[var(--color-border-card)] hover:text-white hover:border-[var(--color-accent-orange)]/30'
                }`}
              >
                {s.icon} {s.title}
              </button>
            ))}
          </div>

          {/* Search */}
          <div className="max-w-md mx-auto mb-8">
            <div className="relative">
              <input
                type="text"
                placeholder="🔍 Поиск услуги..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="w-full px-4 py-3 pl-10 rounded-xl bg-[var(--color-bg-card)] border border-[var(--color-border-card)] text-[var(--color-text-primary)] placeholder-[var(--color-text-secondary)] focus:border-[var(--color-accent-orange)] focus:outline-none transition-colors"
              />
            </div>
          </div>

          {/* Price Table */}
          <div className="rounded-2xl bg-[var(--color-bg-card)] border border-[var(--color-border-card)] overflow-hidden">
            <div className="p-4 md:p-6 border-b border-[var(--color-border-card)]">
              <h2 className="text-xl font-bold text-white flex items-center gap-3" style={{ fontFamily: 'var(--font-orbitron)' }}>
                <span className="text-2xl">{activeService.icon}</span>
                {activeService.title}
              </h2>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="bg-white/5">
                    <th className="text-left px-4 md:px-6 py-4 text-sm font-semibold text-[var(--color-text-secondary)]">Услуга</th>
                    {hasSizes ? (
                      <>
                        <th className="text-center px-3 py-4 text-sm font-semibold text-[var(--color-text-secondary)]">R13-15</th>
                        <th className="text-center px-3 py-4 text-sm font-semibold text-[var(--color-text-secondary)]">R16-17</th>
                        <th className="text-center px-3 py-4 text-sm font-semibold text-[var(--color-text-secondary)]">R18-19</th>
                        <th className="text-center px-3 py-4 text-sm font-semibold text-[var(--color-text-secondary)]">R20+</th>
                      </>
                    ) : (
                      <th className="text-right px-4 md:px-6 py-4 text-sm font-semibold text-[var(--color-text-secondary)]">Цена от</th>
                    )}
                    <th className="text-center px-3 py-4 text-sm font-semibold text-[var(--color-text-secondary)]">Действие</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredItems.map((item, i) => (
                    <tr key={i} className="border-t border-[var(--color-border-card)] hover:bg-white/5 transition-colors">
                      <td className="px-4 md:px-6 py-4 text-sm text-[var(--color-text-primary)]">{item.name}</td>
                      {hasSizes && item.sizes ? (
                        <>
                          <td className="text-center px-3 py-4 text-sm text-[var(--color-accent-orange)] font-semibold">{item.sizes['R13-15']}₽</td>
                          <td className="text-center px-3 py-4 text-sm text-[var(--color-accent-orange)] font-semibold">{item.sizes['R16-17']}₽</td>
                          <td className="text-center px-3 py-4 text-sm text-[var(--color-accent-orange)] font-semibold">{item.sizes['R18-19']}₽</td>
                          <td className="text-center px-3 py-4 text-sm text-[var(--color-accent-orange)] font-semibold">{item.sizes['R20+']}₽</td>
                        </>
                      ) : (
                        <td className="text-right px-4 md:px-6 py-4 text-sm text-[var(--color-accent-orange)] font-semibold">
                          {item.price ? `от ${Number(item.price).toLocaleString()}₽` : '—'}
                        </td>
                      )}
                      <td className="text-center px-3 py-4">
                        <Link
                          to="/calculator"
                          className="inline-block px-3 py-1.5 rounded-lg bg-[var(--color-accent-orange)]/10 text-[var(--color-accent-orange)] text-xs font-medium hover:bg-[var(--color-accent-orange)]/20 transition-colors"
                        >
                          + В калькулятор
                        </Link>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {filteredItems.length === 0 && (
              <div className="p-8 text-center text-[var(--color-text-secondary)]">
                Ничего не найдено по запросу «{search}»
              </div>
            )}
          </div>

          <div className="mt-6 p-4 rounded-xl bg-[var(--color-accent-cyan)]/5 border border-[var(--color-accent-cyan)]/20 text-center">
            <p className="text-sm text-[var(--color-text-secondary)]">
              ⚠️ Цены указаны без учёта стоимости запчастей. Итоговая стоимость определяется после диагностики.
            </p>
          </div>
        </div>
      </section>
    </div>
  );
}
