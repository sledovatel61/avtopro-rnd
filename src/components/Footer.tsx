import { Link } from 'react-router-dom';

export default function Footer() {
  return (
    <footer className="bg-[#08080d] border-t border-[var(--color-border-card)]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          <div>
            <div className="flex items-center gap-2 mb-4">
              <div className="w-10 h-10 rounded-lg gradient-orange flex items-center justify-center text-white font-bold text-lg" style={{ fontFamily: 'var(--font-orbitron)' }}>A</div>
              <span className="text-xl font-bold text-white" style={{ fontFamily: 'var(--font-orbitron)' }}>АвтоПро</span>
            </div>
            <p className="text-[var(--color-text-secondary)] text-sm leading-relaxed">
              Профессиональный автосервис в Ростове-на-Дону. Качественный ремонт и обслуживание автомобилей любых марок.
            </p>
            <div className="flex gap-3 mt-4">
              {['VK', 'TG', 'WA'].map((s) => (
                <a key={s} href="#" className="w-10 h-10 rounded-lg bg-[var(--color-bg-card)] border border-[var(--color-border-card)] flex items-center justify-center text-[var(--color-text-secondary)] hover:text-[var(--color-accent-orange)] hover:border-[var(--color-accent-orange)] transition-all text-xs font-bold">
                  {s}
                </a>
              ))}
            </div>
          </div>

          <div>
            <h4 className="text-white font-semibold mb-4" style={{ fontFamily: 'var(--font-orbitron)' }}>Навигация</h4>
            <ul className="space-y-2">
              {[
                { to: '/', label: 'Главная' },
                { to: '/services', label: 'Услуги' },
                { to: '/price', label: 'Прайс-лист' },
                { to: '/calculator', label: 'Калькулятор' },
                { to: '/gallery', label: 'Галерея' },
                { to: '/reviews', label: 'Отзывы' },
                { to: '/contacts', label: 'Контакты' },
              ].map((l) => (
                <li key={l.to}>
                  <Link to={l.to} className="text-[var(--color-text-secondary)] hover:text-[var(--color-accent-orange)] transition-colors text-sm">{l.label}</Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="text-white font-semibold mb-4" style={{ fontFamily: 'var(--font-orbitron)' }}>Услуги</h4>
            <ul className="space-y-2 text-sm text-[var(--color-text-secondary)]">
              <li>Шиномонтаж</li>
              <li>Ходовая часть</li>
              <li>Ремонт двигателя</li>
              <li>Автоэлектрика</li>
              <li>Кондиционеры</li>
              <li>Запчасти</li>
            </ul>
          </div>

          <div>
            <h4 className="text-white font-semibold mb-4" style={{ fontFamily: 'var(--font-orbitron)' }}>Контакты</h4>
            <ul className="space-y-3 text-sm text-[var(--color-text-secondary)]">
              <li className="flex items-start gap-2">📍 г. Ростов-на-Дону, ул. Портовая, 437</li>
              <li className="flex items-start gap-2">📞 <a href="tel:+79518269839" className="hover:text-[var(--color-accent-orange)] transition-colors">+7 951 826-98-39</a></li>
              <li className="flex items-start gap-2">✉️ info@autoservice-rnd.ru</li>
              <li className="flex items-start gap-2">🕐 Пн-Пт: 9:00-20:00</li>
              <li className="flex items-start gap-2">🕐 Сб: 10:00-18:00</li>
              <li className="flex items-start gap-2">🚫 Вс: выходной</li>
            </ul>
          </div>
        </div>

        <div className="mt-10 pt-6 border-t border-[var(--color-border-card)] flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-[var(--color-text-secondary)] text-sm">© 2024 АвтоПро. Все права защищены.</p>
          <p className="text-[var(--color-text-secondary)] text-xs">Павел — +7 951 826-98-39</p>
        </div>
      </div>
    </footer>
  );
}
