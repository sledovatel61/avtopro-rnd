import { useState } from 'react';

export default function Contacts() {
  const [formData, setFormData] = useState({ name: '', phone: '', email: '', message: '' });
  const [submitted, setSubmitted] = useState(false);

  const formatPhone = (value: string) => {
    const digits = value.replace(/\D/g, '');
    if (digits.length <= 1) return '+7';
    if (digits.length <= 4) return `+7 (${digits.slice(1)}`;
    if (digits.length <= 7) return `+7 (${digits.slice(1, 4)}) ${digits.slice(4)}`;
    if (digits.length <= 9) return `+7 (${digits.slice(1, 4)}) ${digits.slice(4, 7)}-${digits.slice(7)}`;
    return `+7 (${digits.slice(1, 4)}) ${digits.slice(4, 7)}-${digits.slice(7, 9)}-${digits.slice(9, 11)}`;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const msgs = JSON.parse(localStorage.getItem('contact_messages') || '[]');
    msgs.push({ ...formData, date: new Date().toISOString() });
    localStorage.setItem('contact_messages', JSON.stringify(msgs));
    setSubmitted(true);
    setFormData({ name: '', phone: '', email: '', message: '' });
    setTimeout(() => setSubmitted(false), 5000);
  };

  return (
    <div className="py-16">
      <section className="py-12 bg-[var(--color-bg-primary)]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="text-center mb-12">
            <h1 className="text-3xl md:text-5xl font-bold text-white mb-4" style={{ fontFamily: 'var(--font-orbitron)' }}>
              <span className="text-[var(--color-accent-orange)]">КОНТАКТЫ</span>
            </h1>
            <p className="text-[var(--color-text-secondary)]">Свяжитесь с нами удобным для вас способом</p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-12">
            {/* Contact Info */}
            <div className="space-y-6">
              {/* Info Cards */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="p-5 rounded-2xl bg-[var(--color-bg-card)] border border-[var(--color-border-card)] hover:border-[var(--color-accent-orange)]/30 transition-all">
                  <div className="text-2xl mb-3">📍</div>
                  <h3 className="text-sm font-semibold text-white mb-1">Адрес</h3>
                  <p className="text-sm text-[var(--color-text-secondary)]">г. Ростов-на-Дону,<br />ул. Портовая, 437</p>
                </div>
                <div className="p-5 rounded-2xl bg-[var(--color-bg-card)] border border-[var(--color-border-card)] hover:border-[var(--color-accent-orange)]/30 transition-all">
                  <div className="text-2xl mb-3">📞</div>
                  <h3 className="text-sm font-semibold text-white mb-1">Телефон</h3>
                  <a href="tel:+79518269839" className="text-sm text-[var(--color-accent-orange)] hover:underline">+7 951 826-98-39</a>
                  <p className="text-xs text-[var(--color-text-secondary)] mt-1">Павел</p>
                </div>
                <div className="p-5 rounded-2xl bg-[var(--color-bg-card)] border border-[var(--color-border-card)] hover:border-[var(--color-accent-orange)]/30 transition-all">
                  <div className="text-2xl mb-3">🕐</div>
                  <h3 className="text-sm font-semibold text-white mb-1">Режим работы</h3>
                  <p className="text-sm text-[var(--color-text-secondary)]">
                    Пн-Пт: 9:00-20:00<br />
                    Сб: 10:00-18:00<br />
                    <span className="text-red-400">Вс: выходной</span>
                  </p>
                </div>
                <div className="p-5 rounded-2xl bg-[var(--color-bg-card)] border border-[var(--color-border-card)] hover:border-[var(--color-accent-orange)]/30 transition-all">
                  <div className="text-2xl mb-3">✉️</div>
                  <h3 className="text-sm font-semibold text-white mb-1">Email</h3>
                  <a href="mailto:info@autoservice-rnd.ru" className="text-sm text-[var(--color-accent-cyan)] hover:underline">info@autoservice-rnd.ru</a>
                </div>
              </div>

              {/* Quick Contact Buttons */}
              <div className="space-y-3">
                <h3 className="text-lg font-bold text-white" style={{ fontFamily: 'var(--font-orbitron)' }}>Быстрая связь</h3>
                <div className="flex flex-wrap gap-3">
                  <a href="https://wa.me/79518269839" target="_blank" rel="noopener" className="flex items-center gap-2 px-5 py-3 rounded-xl bg-green-600 hover:bg-green-500 text-white font-semibold text-sm transition-colors">
                    💬 WhatsApp
                  </a>
                  <a href="https://t.me/+79518269839" target="_blank" rel="noopener" className="flex items-center gap-2 px-5 py-3 rounded-xl bg-blue-600 hover:bg-blue-500 text-white font-semibold text-sm transition-colors">
                    ✈️ Telegram
                  </a>
                  <a href="tel:+79518269839" className="flex items-center gap-2 px-5 py-3 rounded-xl gradient-orange text-white font-semibold text-sm hover:opacity-90 transition-opacity">
                    📞 Позвонить
                  </a>
                </div>
              </div>

              {/* Social */}
              <div className="space-y-3">
                <h3 className="text-lg font-bold text-white" style={{ fontFamily: 'var(--font-orbitron)' }}>Мы в соцсетях</h3>
                <div className="flex gap-3">
                  <a href="#" className="flex items-center gap-2 px-5 py-3 rounded-xl bg-blue-700 hover:bg-blue-600 text-white font-semibold text-sm transition-colors">
                    VK
                  </a>
                  <a href="#" className="flex items-center gap-2 px-5 py-3 rounded-xl bg-gradient-to-r from-purple-600 to-pink-500 hover:opacity-90 text-white font-semibold text-sm transition-opacity">
                    Instagram
                  </a>
                </div>
              </div>
            </div>

            {/* Contact Form */}
            <div className="p-6 md:p-8 rounded-2xl bg-[var(--color-bg-card)] border border-[var(--color-border-card)]">
              <h3 className="text-xl font-bold text-white mb-6" style={{ fontFamily: 'var(--font-orbitron)' }}>
                Обратная связь
              </h3>
              {submitted && (
                <div className="mb-4 p-4 rounded-xl bg-green-500/10 border border-green-500/30 text-green-400 text-sm">
                  ✅ Сообщение отправлено! Мы свяжемся с вами в ближайшее время.
                </div>
              )}
              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <label className="block text-sm text-[var(--color-text-secondary)] mb-1">Ваше имя *</label>
                  <input
                    type="text"
                    required
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    className="w-full px-4 py-3 rounded-xl bg-white/5 border border-[var(--color-border-card)] text-[var(--color-text-primary)] focus:border-[var(--color-accent-orange)] focus:outline-none transition-colors"
                    placeholder="Ваше имя"
                  />
                </div>
                <div>
                  <label className="block text-sm text-[var(--color-text-secondary)] mb-1">Телефон *</label>
                  <input
                    type="tel"
                    required
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: formatPhone(e.target.value) })}
                    className="w-full px-4 py-3 rounded-xl bg-white/5 border border-[var(--color-border-card)] text-[var(--color-text-primary)] focus:border-[var(--color-accent-orange)] focus:outline-none transition-colors"
                    placeholder="+7 (___) ___-__-__"
                  />
                </div>
                <div>
                  <label className="block text-sm text-[var(--color-text-secondary)] mb-1">Email</label>
                  <input
                    type="email"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    className="w-full px-4 py-3 rounded-xl bg-white/5 border border-[var(--color-border-card)] text-[var(--color-text-primary)] focus:border-[var(--color-accent-orange)] focus:outline-none transition-colors"
                    placeholder="your@email.com"
                  />
                </div>
                <div>
                  <label className="block text-sm text-[var(--color-text-secondary)] mb-1">Сообщение *</label>
                  <textarea
                    required
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    rows={4}
                    className="w-full px-4 py-3 rounded-xl bg-white/5 border border-[var(--color-border-card)] text-[var(--color-text-primary)] focus:border-[var(--color-accent-orange)] focus:outline-none transition-colors resize-none"
                    placeholder="Опишите вашу проблему или вопрос..."
                  />
                </div>
                <button
                  type="submit"
                  className="w-full px-8 py-4 rounded-xl gradient-orange text-white font-semibold text-lg hover:opacity-90 transition-all neon-orange"
                >
                  Отправить сообщение
                </button>
              </form>
            </div>
          </div>

          {/* Map */}
          <div className="rounded-2xl overflow-hidden border border-[var(--color-border-card)]">
            <div className="p-4 bg-[var(--color-bg-card)] border-b border-[var(--color-border-card)]">
              <h3 className="text-lg font-bold text-white" style={{ fontFamily: 'var(--font-orbitron)' }}>
                📍 Как нас найти
              </h3>
            </div>
            <div className="h-80 md:h-96 bg-[var(--color-bg-card)]">
              <iframe
                src="https://yandex.ru/map-widget/v1/?um=constructor%3A0&source=constructor&ll=39.728530%2C47.222078&z=15&pt=39.728530%2C47.222078%2Cpm2rdm"
                width="100%"
                height="100%"
                frameBorder="0"
                style={{ border: 0, filter: 'invert(0.9) hue-rotate(180deg) brightness(0.8) contrast(1.2)' }}
                title="Карта"
                loading="lazy"
              />
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
