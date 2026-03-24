import { useState, useEffect } from 'react';

interface GalleryItem {
  id: string;
  category: string;
  type: 'image' | 'video';
  url: string;
  title: string;
  date: string;
}

const defaultGallery: GalleryItem[] = [
  { id: '1', category: 'engine', type: 'image', url: '', title: 'Капитальный ремонт ДВС BMW', date: '2024-03-15' },
  { id: '2', category: 'suspension', type: 'image', url: '', title: 'Замена амортизаторов Toyota', date: '2024-03-10' },
  { id: '3', category: 'tires', type: 'image', url: '', title: 'Шиномонтаж R20 Mercedes', date: '2024-02-28' },
  { id: '4', category: 'body', type: 'image', url: '', title: 'Покраска бампера Kia', date: '2024-02-20' },
  { id: '5', category: 'engine', type: 'image', url: '', title: 'Замена цепи ГРМ Audi', date: '2024-02-15' },
  { id: '6', category: 'electric', type: 'image', url: '', title: 'Установка сигнализации', date: '2024-01-25' },
];

const categories = [
  { id: 'all', label: 'Все' },
  { id: 'engine', label: '🔧 Двигатель' },
  { id: 'suspension', label: '⚙️ Ходовая' },
  { id: 'tires', label: '🛞 Шиномонтаж' },
  { id: 'body', label: '🚗 Кузов' },
  { id: 'electric', label: '⚡ Электрика' },
];

const placeholderColors: Record<string, string> = {
  engine: '#ff6b35',
  suspension: '#00d4ff',
  tires: '#ffd700',
  body: '#ff4081',
  electric: '#7c4dff',
};

export default function Gallery() {
  const [gallery, setGallery] = useState<GalleryItem[]>([]);
  const [filter, setFilter] = useState('all');
  const [lightbox, setLightbox] = useState<GalleryItem | null>(null);
  const [beforeAfter, setBeforeAfter] = useState(50);

  useEffect(() => {
    const stored = localStorage.getItem('gallery');
    if (stored) {
      setGallery([...defaultGallery, ...JSON.parse(stored)]);
    } else {
      setGallery(defaultGallery);
    }
  }, []);

  const filtered = filter === 'all' ? gallery : gallery.filter((g) => g.category === filter);

  return (
    <div className="py-16">
      <section className="py-12 bg-[var(--color-bg-primary)]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="text-center mb-12">
            <h1 className="text-3xl md:text-5xl font-bold text-white mb-4" style={{ fontFamily: 'var(--font-orbitron)' }}>
              <span className="text-[var(--color-accent-orange)]">ГАЛЕРЕЯ</span> РАБОТ
            </h1>
            <p className="text-[var(--color-text-secondary)] max-w-2xl mx-auto">
              Фото наших работ — лучшее подтверждение качества
            </p>
          </div>

          {/* Before/After Slider */}
          <div className="mb-16">
            <h2 className="text-xl font-bold text-white mb-6 text-center" style={{ fontFamily: 'var(--font-orbitron)' }}>
              ДО / ПОСЛЕ
            </h2>
            <div className="max-w-2xl mx-auto rounded-2xl overflow-hidden border border-[var(--color-border-card)] relative h-64 md:h-80">
              <div className="absolute inset-0 flex">
                <div className="flex-1 bg-gradient-to-br from-red-900/30 to-red-800/10 flex items-center justify-center"
                  style={{ clipPath: `inset(0 ${100 - beforeAfter}% 0 0)` }}>
                  <div className="text-center">
                    <div className="text-6xl mb-2">🚗</div>
                    <div className="text-red-400 font-bold text-lg px-3 py-1 rounded bg-red-400/10">ДО</div>
                    <p className="text-[var(--color-text-secondary)] text-sm mt-2">Повреждённый бампер</p>
                  </div>
                </div>
                <div className="flex-1 bg-gradient-to-br from-green-900/30 to-green-800/10 flex items-center justify-center absolute inset-0"
                  style={{ clipPath: `inset(0 0 0 ${beforeAfter}%)` }}>
                  <div className="text-center">
                    <div className="text-6xl mb-2">✨</div>
                    <div className="text-green-400 font-bold text-lg px-3 py-1 rounded bg-green-400/10">ПОСЛЕ</div>
                    <p className="text-[var(--color-text-secondary)] text-sm mt-2">Полностью восстановлен</p>
                  </div>
                </div>
              </div>
              <div className="absolute inset-0 flex items-end justify-center pb-4 z-10">
                <input
                  type="range"
                  min="0" max="100"
                  value={beforeAfter}
                  onChange={(e) => setBeforeAfter(Number(e.target.value))}
                  className="w-3/4 accent-[var(--color-accent-orange)]"
                />
              </div>
              <div className="absolute top-0 bottom-0 z-10" style={{ left: `${beforeAfter}%` }}>
                <div className="w-0.5 h-full bg-white/50" />
              </div>
            </div>
          </div>

          {/* Filter */}
          <div className="flex flex-wrap gap-2 justify-center mb-8">
            {categories.map((cat) => (
              <button
                key={cat.id}
                onClick={() => setFilter(cat.id)}
                className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${
                  filter === cat.id
                    ? 'gradient-orange text-white neon-orange'
                    : 'bg-[var(--color-bg-card)] text-[var(--color-text-secondary)] border border-[var(--color-border-card)] hover:text-white'
                }`}
              >
                {cat.label}
              </button>
            ))}
          </div>

          {/* Gallery Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {filtered.map((item) => (
              <div
                key={item.id}
                onClick={() => setLightbox(item)}
                className="group rounded-2xl overflow-hidden border border-[var(--color-border-card)] hover:border-[var(--color-accent-orange)]/30 transition-all cursor-pointer hover:-translate-y-1"
              >
                <div
                  className="h-48 flex items-center justify-center relative"
                  style={{
                    background: item.url
                      ? `url(${item.url}) center/cover`
                      : `linear-gradient(135deg, ${placeholderColors[item.category] || '#666'}20, ${placeholderColors[item.category] || '#666'}05)`
                  }}
                >
                  {!item.url && (
                    <div className="text-center">
                      <div className="text-5xl mb-2">
                        {item.category === 'engine' ? '🔧' : item.category === 'suspension' ? '⚙️' : item.category === 'tires' ? '🛞' : item.category === 'body' ? '🚗' : '⚡'}
                      </div>
                      <span className="text-xs text-[var(--color-text-secondary)]">Фото работы</span>
                    </div>
                  )}
                  <div className="absolute inset-0 bg-black/0 group-hover:bg-black/40 transition-all flex items-center justify-center">
                    <span className="text-white text-3xl opacity-0 group-hover:opacity-100 transition-opacity">🔍</span>
                  </div>
                </div>
                <div className="p-4 bg-[var(--color-bg-card)]">
                  <h3 className="text-sm font-semibold text-white">{item.title}</h3>
                  <p className="text-xs text-[var(--color-text-secondary)] mt-1">{new Date(item.date).toLocaleDateString('ru-RU')}</p>
                </div>
              </div>
            ))}
          </div>

          {filtered.length === 0 && (
            <div className="text-center py-12 text-[var(--color-text-secondary)]">
              В этой категории пока нет работ
            </div>
          )}

          {/* Video Section */}
          <div className="mt-16">
            <h2 className="text-xl font-bold text-white mb-6 text-center" style={{ fontFamily: 'var(--font-orbitron)' }}>
              ВИДЕО
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {[1, 2].map((i) => (
                <div key={i} className="rounded-2xl overflow-hidden border border-[var(--color-border-card)] bg-[var(--color-bg-card)]">
                  <div className="h-48 md:h-56 bg-gradient-to-br from-[var(--color-bg-card)] to-[var(--color-border-card)] flex items-center justify-center">
                    <div className="text-center">
                      <div className="w-16 h-16 rounded-full gradient-orange flex items-center justify-center mx-auto mb-3">
                        <span className="text-2xl ml-1">▶</span>
                      </div>
                      <p className="text-[var(--color-text-secondary)] text-sm">Видео процесса работы #{i}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Lightbox */}
      {lightbox && (
        <div className="fixed inset-0 z-50 bg-black/80 flex items-center justify-center p-4" onClick={() => setLightbox(null)}>
          <div className="max-w-2xl w-full rounded-2xl bg-[var(--color-bg-card)] border border-[var(--color-border-card)] overflow-hidden" onClick={(e) => e.stopPropagation()}>
            <div className="h-64 md:h-80 flex items-center justify-center" style={{
              background: lightbox.url
                ? `url(${lightbox.url}) center/cover`
                : `linear-gradient(135deg, ${placeholderColors[lightbox.category] || '#666'}30, ${placeholderColors[lightbox.category] || '#666'}10)`
            }}>
              {!lightbox.url && <div className="text-7xl">{lightbox.category === 'engine' ? '🔧' : lightbox.category === 'suspension' ? '⚙️' : lightbox.category === 'tires' ? '🛞' : lightbox.category === 'body' ? '🚗' : '⚡'}</div>}
            </div>
            <div className="p-6">
              <h3 className="text-lg font-bold text-white">{lightbox.title}</h3>
              <p className="text-sm text-[var(--color-text-secondary)] mt-1">{new Date(lightbox.date).toLocaleDateString('ru-RU')}</p>
              <button onClick={() => setLightbox(null)} className="mt-4 px-6 py-2 rounded-lg gradient-orange text-white text-sm font-semibold">
                Закрыть
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
