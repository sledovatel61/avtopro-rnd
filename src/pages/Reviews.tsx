import { useState, useEffect } from 'react';

interface Review {
  id: string;
  name: string;
  car: string;
  rating: number;
  text: string;
  date: string;
}

const defaultReviews: Review[] = [
  { id: '1', name: 'Алексей К.', car: 'Toyota Camry 2019', rating: 5, text: 'Отличный сервис! Заменили ГРМ за один день, всё работает как часы. Цены честные, мастера профессионалы. Рекомендую!', date: '2024-03-20' },
  { id: '2', name: 'Мария С.', car: 'Kia Rio 2021', rating: 5, text: 'Делала шиномонтаж перед зимой. Быстро, качественно, адекватная цена. Буду обращаться ещё!', date: '2024-03-15' },
  { id: '3', name: 'Дмитрий В.', car: 'BMW X5 2018', rating: 4, text: 'Хорошая диагностика подвески, нашли проблему которую другие пропускали. Починили быстро. Единственное — немного ждал запчасти.', date: '2024-03-05' },
  { id: '4', name: 'Елена П.', car: 'Hyundai Solaris 2020', rating: 5, text: 'Обратилась с проблемой кондиционера. Заправили, проверили на утечки — всё ок! Сервис супер!', date: '2024-02-28' },
  { id: '5', name: 'Павел Н.', car: 'Volkswagen Polo 2017', rating: 4, text: 'Менял тормозные колодки и диски. Работа выполнена качественно. Приятные цены. Вернусь снова.', date: '2024-02-20' },
  { id: '6', name: 'Ирина Г.', car: 'Mercedes C200 2020', rating: 5, text: 'Лучший автосервис в Ростове! Уже 3 год обслуживаю здесь машину. Всегда всё на высшем уровне.', date: '2024-02-10' },
];

export default function Reviews() {
  const [reviews, setReviews] = useState<Review[]>([]);
  const [ratingFilter, setRatingFilter] = useState(0);
  const [showForm, setShowForm] = useState(false);
  const [formData, setFormData] = useState({ name: '', car: '', rating: 5, text: '' });
  const [captcha, setCaptcha] = useState({ a: 0, b: 0, answer: '' });
  const [formError, setFormError] = useState('');
  const [formSuccess, setFormSuccess] = useState(false);

  useEffect(() => {
    const stored = localStorage.getItem('reviews');
    if (stored) {
      setReviews([...defaultReviews, ...JSON.parse(stored)]);
    } else {
      setReviews(defaultReviews);
    }
    generateCaptcha();
  }, []);

  const generateCaptcha = () => {
    const a = Math.floor(Math.random() * 10) + 1;
    const b = Math.floor(Math.random() * 10) + 1;
    setCaptcha({ a, b, answer: '' });
  };

  const filtered = ratingFilter === 0 ? reviews : reviews.filter((r) => r.rating === ratingFilter);
  const avgRating = reviews.length > 0 ? (reviews.reduce((s, r) => s + r.rating, 0) / reviews.length).toFixed(1) : '0';

  const handleSubmit = () => {
    setFormError('');
    if (!formData.name.trim()) { setFormError('Введите имя'); return; }
    if (!formData.text.trim()) { setFormError('Введите текст отзыва'); return; }
    if (formData.text.trim().length < 10) { setFormError('Отзыв должен содержать минимум 10 символов'); return; }
    if (Number(captcha.answer) !== captcha.a + captcha.b) { setFormError('Неверный ответ на проверку'); generateCaptcha(); return; }

    const newReview: Review = {
      id: Date.now().toString(),
      name: formData.name,
      car: formData.car,
      rating: formData.rating,
      text: formData.text,
      date: new Date().toISOString().split('T')[0],
    };

    const stored = JSON.parse(localStorage.getItem('reviews') || '[]');
    stored.push(newReview);
    localStorage.setItem('reviews', JSON.stringify(stored));
    setReviews([...reviews, newReview]);
    setFormData({ name: '', car: '', rating: 5, text: '' });
    setFormSuccess(true);
    setShowForm(false);
    generateCaptcha();
    setTimeout(() => setFormSuccess(false), 3000);
  };

  return (
    <div className="py-16">
      <section className="py-12 bg-[var(--color-bg-primary)]">
        <div className="max-w-5xl mx-auto px-4 sm:px-6">
          <div className="text-center mb-12">
            <h1 className="text-3xl md:text-5xl font-bold text-white mb-4" style={{ fontFamily: 'var(--font-orbitron)' }}>
              <span className="text-[var(--color-accent-orange)]">ОТЗЫВЫ</span> КЛИЕНТОВ
            </h1>
            <p className="text-[var(--color-text-secondary)] mb-6">Что говорят о нас наши клиенты</p>

            {/* Stats */}
            <div className="flex flex-wrap items-center justify-center gap-6 mb-8">
              <div className="text-center">
                <div className="text-3xl font-bold text-[var(--color-accent-orange)]" style={{ fontFamily: 'var(--font-orbitron)' }}>{avgRating}</div>
                <div className="flex gap-0.5 justify-center mt-1">
                  {[1, 2, 3, 4, 5].map((s) => (
                    <span key={s} className={`text-lg ${s <= Math.round(Number(avgRating)) ? 'text-yellow-400' : 'text-gray-600'}`}>★</span>
                  ))}
                </div>
                <p className="text-xs text-[var(--color-text-secondary)] mt-1">Средняя оценка</p>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-[var(--color-accent-cyan)]" style={{ fontFamily: 'var(--font-orbitron)' }}>{reviews.length}</div>
                <p className="text-xs text-[var(--color-text-secondary)] mt-1">Всего отзывов</p>
              </div>
            </div>
          </div>

          {/* Actions */}
          <div className="flex flex-wrap items-center justify-between gap-4 mb-8">
            <div className="flex flex-wrap gap-2">
              <button
                onClick={() => setRatingFilter(0)}
                className={`px-3 py-1.5 rounded-lg text-sm transition-all ${ratingFilter === 0 ? 'gradient-orange text-white' : 'bg-[var(--color-bg-card)] text-[var(--color-text-secondary)] border border-[var(--color-border-card)]'}`}
              >
                Все
              </button>
              {[5, 4, 3, 2, 1].map((r) => (
                <button
                  key={r}
                  onClick={() => setRatingFilter(r)}
                  className={`px-3 py-1.5 rounded-lg text-sm transition-all ${ratingFilter === r ? 'gradient-orange text-white' : 'bg-[var(--color-bg-card)] text-[var(--color-text-secondary)] border border-[var(--color-border-card)]'}`}
                >
                  {'★'.repeat(r)} {r}
                </button>
              ))}
            </div>
            <button
              onClick={() => setShowForm(!showForm)}
              className="px-6 py-2.5 rounded-xl gradient-orange text-white font-semibold text-sm hover:opacity-90 transition-all neon-orange"
            >
              ✍ Оставить отзыв
            </button>
          </div>

          {formSuccess && (
            <div className="mb-6 p-4 rounded-xl bg-green-500/10 border border-green-500/30 text-green-400 text-center text-sm">
              ✅ Спасибо за ваш отзыв! Он опубликован.
            </div>
          )}

          {/* Form */}
          {showForm && (
            <div className="mb-8 p-6 rounded-2xl bg-[var(--color-bg-card)] border border-[var(--color-border-card)]">
              <h3 className="text-lg font-bold text-white mb-4" style={{ fontFamily: 'var(--font-orbitron)' }}>Новый отзыв</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm text-[var(--color-text-secondary)] mb-1">Ваше имя *</label>
                  <input
                    type="text"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    className="w-full px-4 py-3 rounded-xl bg-white/5 border border-[var(--color-border-card)] text-[var(--color-text-primary)] focus:border-[var(--color-accent-orange)] focus:outline-none"
                    placeholder="Ваше имя"
                  />
                </div>
                <div>
                  <label className="block text-sm text-[var(--color-text-secondary)] mb-1">Автомобиль</label>
                  <input
                    type="text"
                    value={formData.car}
                    onChange={(e) => setFormData({ ...formData, car: e.target.value })}
                    className="w-full px-4 py-3 rounded-xl bg-white/5 border border-[var(--color-border-card)] text-[var(--color-text-primary)] focus:border-[var(--color-accent-orange)] focus:outline-none"
                    placeholder="Марка и модель"
                  />
                </div>
              </div>
              <div className="mt-4">
                <label className="block text-sm text-[var(--color-text-secondary)] mb-2">Оценка *</label>
                <div className="flex gap-2">
                  {[1, 2, 3, 4, 5].map((s) => (
                    <button
                      key={s}
                      onClick={() => setFormData({ ...formData, rating: s })}
                      className={`text-3xl transition-transform hover:scale-110 ${s <= formData.rating ? 'text-yellow-400' : 'text-gray-600'}`}
                    >
                      ★
                    </button>
                  ))}
                </div>
              </div>
              <div className="mt-4">
                <label className="block text-sm text-[var(--color-text-secondary)] mb-1">Отзыв *</label>
                <textarea
                  value={formData.text}
                  onChange={(e) => setFormData({ ...formData, text: e.target.value })}
                  rows={4}
                  className="w-full px-4 py-3 rounded-xl bg-white/5 border border-[var(--color-border-card)] text-[var(--color-text-primary)] focus:border-[var(--color-accent-orange)] focus:outline-none resize-none"
                  placeholder="Расскажите о вашем опыте..."
                />
              </div>
              <div className="mt-4">
                <label className="block text-sm text-[var(--color-text-secondary)] mb-1">
                  Проверка: {captcha.a} + {captcha.b} = ?
                </label>
                <input
                  type="number"
                  value={captcha.answer}
                  onChange={(e) => setCaptcha({ ...captcha, answer: e.target.value })}
                  className="w-32 px-4 py-3 rounded-xl bg-white/5 border border-[var(--color-border-card)] text-[var(--color-text-primary)] focus:border-[var(--color-accent-orange)] focus:outline-none"
                  placeholder="?"
                />
              </div>
              {formError && (
                <p className="mt-3 text-sm text-red-400">{formError}</p>
              )}
              <button
                onClick={handleSubmit}
                className="mt-4 px-8 py-3 rounded-xl gradient-orange text-white font-semibold hover:opacity-90 transition-all"
              >
                Отправить отзыв
              </button>
            </div>
          )}

          {/* Reviews List */}
          <div className="space-y-4">
            {filtered.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()).map((review) => (
              <div
                key={review.id}
                className="p-6 rounded-2xl bg-[var(--color-bg-card)] border border-[var(--color-border-card)] hover:border-[var(--color-accent-orange)]/20 transition-all"
              >
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 rounded-full gradient-orange flex items-center justify-center text-white font-bold text-lg shrink-0">
                    {review.name.charAt(0)}
                  </div>
                  <div className="flex-1">
                    <div className="flex flex-wrap items-center gap-2 mb-1">
                      <span className="font-semibold text-white">{review.name}</span>
                      {review.car && (
                        <span className="text-xs text-[var(--color-text-secondary)] bg-white/5 px-2 py-0.5 rounded">🚗 {review.car}</span>
                      )}
                    </div>
                    <div className="flex items-center gap-2 mb-3">
                      <div className="flex gap-0.5">
                        {[1, 2, 3, 4, 5].map((s) => (
                          <span key={s} className={`text-sm ${s <= review.rating ? 'text-yellow-400' : 'text-gray-600'}`}>★</span>
                        ))}
                      </div>
                      <span className="text-xs text-[var(--color-text-secondary)]">
                        {new Date(review.date).toLocaleDateString('ru-RU', { year: 'numeric', month: 'long', day: 'numeric' })}
                      </span>
                    </div>
                    <p className="text-sm text-[var(--color-text-primary)] leading-relaxed">{review.text}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {filtered.length === 0 && (
            <div className="text-center py-12 text-[var(--color-text-secondary)]">
              Нет отзывов с такой оценкой
            </div>
          )}
        </div>
      </section>
    </div>
  );
}
