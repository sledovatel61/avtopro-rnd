import { useState } from 'react';
import { services } from '../data/services';

interface SelectedItem {
  category: string;
  name: string;
  price: number;
}

export default function Calculator() {
  const [step, setStep] = useState(1);
  const [selectedCategory, setSelectedCategory] = useState('');
  const [selectedItems, setSelectedItems] = useState<SelectedItem[]>([]);
  const [tireSize, setTireSize] = useState('R13-15');
  const [formData, setFormData] = useState({ name: '', phone: '', car: '', comment: '' });
  const [submitted, setSubmitted] = useState(false);

  const category = services.find((s) => s.id === selectedCategory);
  const hasSizes = category?.priceTable.some((p) => p.sizes);

  const getPrice = (item: typeof services[0]['priceTable'][0]) => {
    if (item.sizes) return Number(item.sizes[tireSize] || 0);
    return Number(item.price || 0);
  };

  const toggleItem = (item: typeof services[0]['priceTable'][0]) => {
    const price = getPrice(item);
    const existing = selectedItems.findIndex(
      (si) => si.name === item.name && si.category === selectedCategory
    );
    if (existing >= 0) {
      setSelectedItems(selectedItems.filter((_, i) => i !== existing));
    } else {
      setSelectedItems([...selectedItems, { category: selectedCategory, name: item.name, price }]);
    }
  };

  const isSelected = (item: typeof services[0]['priceTable'][0]) =>
    selectedItems.some((si) => si.name === item.name && si.category === selectedCategory);

  const total = selectedItems.reduce((sum, item) => sum + item.price, 0);

  const formatPhone = (value: string) => {
    const digits = value.replace(/\D/g, '');
    if (digits.length <= 1) return '+7';
    if (digits.length <= 4) return `+7 (${digits.slice(1)}`;
    if (digits.length <= 7) return `+7 (${digits.slice(1, 4)}) ${digits.slice(4)}`;
    if (digits.length <= 9) return `+7 (${digits.slice(1, 4)}) ${digits.slice(4, 7)}-${digits.slice(7)}`;
    return `+7 (${digits.slice(1, 4)}) ${digits.slice(4, 7)}-${digits.slice(7, 9)}-${digits.slice(9, 11)}`;
  };

  const handleSubmit = () => {
    const order = {
      name: formData.name,
      phone: formData.phone,
      car: formData.car,
      services: selectedItems.map((i) => `${i.name} (${i.category})`),
      total,
      comment: formData.comment,
      date: new Date().toISOString(),
    };
    const orders = JSON.parse(localStorage.getItem('orders') || '[]');
    orders.push(order);
    localStorage.setItem('orders', JSON.stringify(orders));
    setSubmitted(true);
  };

  const canProceed = () => {
    if (step === 1) return !!selectedCategory;
    if (step === 2) return selectedItems.length > 0;
    if (step === 3) return true;
    if (step === 4) return formData.name && formData.phone.replace(/\D/g, '').length >= 11;
    return false;
  };

  if (submitted) {
    return (
      <div className="py-16 min-h-screen flex items-center justify-center">
        <div className="max-w-md mx-auto px-4 text-center">
          <div className="text-6xl mb-6">✅</div>
          <h2 className="text-2xl font-bold text-white mb-4" style={{ fontFamily: 'var(--font-orbitron)' }}>
            Заявка отправлена!
          </h2>
          <p className="text-[var(--color-text-secondary)] mb-6">
            Мы свяжемся с вами в ближайшее время для подтверждения записи.
          </p>
          <div className="p-4 rounded-xl bg-[var(--color-bg-card)] border border-[var(--color-border-card)] text-left mb-6">
            <p className="text-sm text-[var(--color-text-secondary)]">Итого:</p>
            <p className="text-2xl font-bold text-[var(--color-accent-orange)]" style={{ fontFamily: 'var(--font-orbitron)' }}>
              от {total.toLocaleString()}₽
            </p>
            <ul className="mt-3 space-y-1">
              {selectedItems.map((item, i) => (
                <li key={i} className="text-sm text-[var(--color-text-primary)] flex justify-between">
                  <span>{item.name}</span>
                  <span className="text-[var(--color-accent-orange)]">{item.price.toLocaleString()}₽</span>
                </li>
              ))}
            </ul>
          </div>
          <button
            onClick={() => { setSubmitted(false); setStep(1); setSelectedItems([]); setSelectedCategory(''); setFormData({ name: '', phone: '', car: '', comment: '' }); }}
            className="px-8 py-3 rounded-xl gradient-orange text-white font-semibold hover:opacity-90 transition-all"
          >
            Новый расчёт
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="py-16">
      <section className="py-12 bg-[var(--color-bg-primary)]">
        <div className="max-w-4xl mx-auto px-4 sm:px-6">
          <div className="text-center mb-12">
            <h1 className="text-3xl md:text-5xl font-bold text-white mb-4" style={{ fontFamily: 'var(--font-orbitron)' }}>
              КАЛЬКУЛЯТОР <span className="text-[var(--color-accent-orange)]">СТОИМОСТИ</span>
            </h1>
            <p className="text-[var(--color-text-secondary)]">
              Рассчитайте примерную стоимость ремонта онлайн
            </p>
          </div>

          {/* Progress Steps */}
          <div className="flex items-center justify-center gap-2 mb-10">
            {[1, 2, 3, 4].map((s) => (
              <div key={s} className="flex items-center gap-2">
                <div className={`w-10 h-10 rounded-full flex items-center justify-center text-sm font-bold transition-all ${
                  step >= s ? 'gradient-orange text-white neon-orange' : 'bg-[var(--color-bg-card)] text-[var(--color-text-secondary)] border border-[var(--color-border-card)]'
                }`}>
                  {s}
                </div>
                {s < 4 && <div className={`w-8 md:w-16 h-0.5 transition-all ${step > s ? 'bg-[var(--color-accent-orange)]' : 'bg-[var(--color-border-card)]'}`} />}
              </div>
            ))}
          </div>

          {/* Step Content */}
          <div className="rounded-2xl bg-[var(--color-bg-card)] border border-[var(--color-border-card)] p-6 md:p-8">
            {/* Step 1: Category */}
            {step === 1 && (
              <div>
                <h2 className="text-xl font-bold text-white mb-6" style={{ fontFamily: 'var(--font-orbitron)' }}>
                  Шаг 1: Выберите категорию
                </h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
                  {services.filter(s => s.priceTable.length > 0).map((s) => (
                    <button
                      key={s.id}
                      onClick={() => setSelectedCategory(s.id)}
                      className={`p-4 rounded-xl border transition-all text-left ${
                        selectedCategory === s.id
                          ? 'border-[var(--color-accent-orange)] bg-[var(--color-accent-orange)]/10 neon-orange'
                          : 'border-[var(--color-border-card)] hover:border-[var(--color-accent-orange)]/30 bg-white/5'
                      }`}
                    >
                      <div className="text-3xl mb-2">{s.icon}</div>
                      <div className="text-sm font-semibold text-white">{s.title}</div>
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Step 2: Select services */}
            {step === 2 && category && (
              <div>
                <h2 className="text-xl font-bold text-white mb-6" style={{ fontFamily: 'var(--font-orbitron)' }}>
                  Шаг 2: Выберите услуги ({category.title})
                </h2>

                {hasSizes && (
                  <div className="mb-6">
                    <label className="text-sm text-[var(--color-text-secondary)] mb-2 block">Размер колёс:</label>
                    <div className="flex gap-2">
                      {['R13-15', 'R16-17', 'R18-19', 'R20+'].map((size) => (
                        <button
                          key={size}
                          onClick={() => {
                            setTireSize(size);
                            setSelectedItems(selectedItems.map(si => {
                              if (si.category === selectedCategory) {
                                const pt = category.priceTable.find(p => p.name === si.name);
                                if (pt?.sizes) return { ...si, price: Number(pt.sizes[size] || 0) };
                              }
                              return si;
                            }));
                          }}
                          className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${
                            tireSize === size
                              ? 'gradient-cyan text-white'
                              : 'bg-white/5 text-[var(--color-text-secondary)] border border-[var(--color-border-card)]'
                          }`}
                        >
                          {size}
                        </button>
                      ))}
                    </div>
                  </div>
                )}

                <div className="space-y-3">
                  {category.priceTable.map((item, i) => {
                    const price = getPrice(item);
                    return (
                      <label
                        key={i}
                        className={`flex items-center justify-between p-4 rounded-xl border cursor-pointer transition-all ${
                          isSelected(item)
                            ? 'border-[var(--color-accent-orange)] bg-[var(--color-accent-orange)]/10'
                            : 'border-[var(--color-border-card)] hover:border-[var(--color-accent-orange)]/30 bg-white/5'
                        }`}
                      >
                        <div className="flex items-center gap-3">
                          <input
                            type="checkbox"
                            checked={isSelected(item)}
                            onChange={() => toggleItem(item)}
                            className="w-5 h-5 rounded accent-[var(--color-accent-orange)]"
                          />
                          <span className="text-sm text-[var(--color-text-primary)]">{item.name}</span>
                        </div>
                        <span className="text-[var(--color-accent-orange)] font-semibold text-sm">
                          от {price.toLocaleString()}₽
                        </span>
                      </label>
                    );
                  })}
                </div>

                {/* Can add from other categories */}
                <button
                  onClick={() => setStep(1)}
                  className="mt-4 text-sm text-[var(--color-accent-cyan)] hover:underline"
                >
                  + Добавить из другой категории
                </button>
              </div>
            )}

            {/* Step 3: Review */}
            {step === 3 && (
              <div>
                <h2 className="text-xl font-bold text-white mb-6" style={{ fontFamily: 'var(--font-orbitron)' }}>
                  Шаг 3: Итого
                </h2>
                <div className="space-y-2 mb-6">
                  {selectedItems.map((item, i) => (
                    <div key={i} className="flex justify-between items-center py-3 px-4 rounded-xl bg-white/5">
                      <div>
                        <span className="text-sm text-[var(--color-text-primary)]">{item.name}</span>
                        <span className="text-xs text-[var(--color-text-secondary)] ml-2">({services.find(s => s.id === item.category)?.title})</span>
                      </div>
                      <div className="flex items-center gap-3">
                        <span className="text-[var(--color-accent-orange)] font-semibold text-sm">{item.price.toLocaleString()}₽</span>
                        <button
                          onClick={() => setSelectedItems(selectedItems.filter((_, idx) => idx !== i))}
                          className="text-red-400 hover:text-red-300 text-lg"
                        >
                          ×
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
                <div className="p-4 rounded-xl bg-[var(--color-accent-orange)]/10 border border-[var(--color-accent-orange)]/30">
                  <div className="flex justify-between items-center">
                    <span className="text-white font-semibold">Итого:</span>
                    <span className="text-2xl font-bold text-[var(--color-accent-orange)]" style={{ fontFamily: 'var(--font-orbitron)' }}>
                      от {total.toLocaleString()}₽
                    </span>
                  </div>
                  <p className="text-xs text-[var(--color-text-secondary)] mt-2">
                    * Стоимость указана без учёта запчастей. Точная цена после диагностики.
                  </p>
                </div>
              </div>
            )}

            {/* Step 4: Form */}
            {step === 4 && (
              <div>
                <h2 className="text-xl font-bold text-white mb-6" style={{ fontFamily: 'var(--font-orbitron)' }}>
                  Шаг 4: Оставьте заявку
                </h2>
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm text-[var(--color-text-secondary)] mb-1">Ваше имя *</label>
                    <input
                      type="text"
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      placeholder="Иван Иванов"
                      className="w-full px-4 py-3 rounded-xl bg-white/5 border border-[var(--color-border-card)] text-[var(--color-text-primary)] focus:border-[var(--color-accent-orange)] focus:outline-none transition-colors"
                    />
                  </div>
                  <div>
                    <label className="block text-sm text-[var(--color-text-secondary)] mb-1">Телефон *</label>
                    <input
                      type="tel"
                      value={formData.phone}
                      onChange={(e) => setFormData({ ...formData, phone: formatPhone(e.target.value) })}
                      placeholder="+7 (___) ___-__-__"
                      className="w-full px-4 py-3 rounded-xl bg-white/5 border border-[var(--color-border-card)] text-[var(--color-text-primary)] focus:border-[var(--color-accent-orange)] focus:outline-none transition-colors"
                    />
                  </div>
                  <div>
                    <label className="block text-sm text-[var(--color-text-secondary)] mb-1">Автомобиль (марка, модель, год)</label>
                    <input
                      type="text"
                      value={formData.car}
                      onChange={(e) => setFormData({ ...formData, car: e.target.value })}
                      placeholder="Toyota Camry 2020"
                      className="w-full px-4 py-3 rounded-xl bg-white/5 border border-[var(--color-border-card)] text-[var(--color-text-primary)] focus:border-[var(--color-accent-orange)] focus:outline-none transition-colors"
                    />
                  </div>
                  <div>
                    <label className="block text-sm text-[var(--color-text-secondary)] mb-1">Комментарий</label>
                    <textarea
                      value={formData.comment}
                      onChange={(e) => setFormData({ ...formData, comment: e.target.value })}
                      placeholder="Дополнительные пожелания..."
                      rows={3}
                      className="w-full px-4 py-3 rounded-xl bg-white/5 border border-[var(--color-border-card)] text-[var(--color-text-primary)] focus:border-[var(--color-accent-orange)] focus:outline-none transition-colors resize-none"
                    />
                  </div>

                  <div className="p-4 rounded-xl bg-[var(--color-accent-orange)]/10 border border-[var(--color-accent-orange)]/30">
                    <div className="flex justify-between items-center">
                      <span className="text-white font-semibold">Итого:</span>
                      <span className="text-xl font-bold text-[var(--color-accent-orange)]" style={{ fontFamily: 'var(--font-orbitron)' }}>
                        от {total.toLocaleString()}₽
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* Navigation */}
            <div className="flex justify-between mt-8 pt-6 border-t border-[var(--color-border-card)]">
              <button
                onClick={() => setStep(Math.max(1, step - 1))}
                className={`px-6 py-3 rounded-xl border border-[var(--color-border-card)] text-[var(--color-text-secondary)] hover:text-white hover:border-white/30 transition-all ${step === 1 ? 'invisible' : ''}`}
              >
                ← Назад
              </button>
              {step < 4 ? (
                <button
                  onClick={() => setStep(step + 1)}
                  disabled={!canProceed()}
                  className="px-8 py-3 rounded-xl gradient-orange text-white font-semibold hover:opacity-90 transition-all disabled:opacity-40 disabled:cursor-not-allowed"
                >
                  Далее →
                </button>
              ) : (
                <button
                  onClick={handleSubmit}
                  disabled={!canProceed()}
                  className="px-8 py-3 rounded-xl gradient-orange text-white font-semibold hover:opacity-90 transition-all neon-orange disabled:opacity-40 disabled:cursor-not-allowed"
                >
                  ✓ Отправить заявку
                </button>
              )}
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
