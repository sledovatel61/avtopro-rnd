import { useState, useEffect, useCallback } from 'react';

interface GalleryItem {
  id: string;
  category: string;
  type: 'image' | 'video';
  url: string;
  title: string;
  date: string;
}

const ADMIN_PASSWORD = 'autopro2024';

export default function Admin() {
  const [authenticated, setAuthenticated] = useState(false);
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [gallery, setGallery] = useState<GalleryItem[]>([]);
  const [title, setTitle] = useState('');
  const [category, setCategory] = useState('engine');
  const [preview, setPreview] = useState('');
  const [dragActive, setDragActive] = useState(false);
  const [orders, setOrders] = useState<any[]>([]);
  const [tab, setTab] = useState<'gallery' | 'orders' | 'reviews'>('gallery');

  useEffect(() => {
    if (localStorage.getItem('admin_auth') === 'true') setAuthenticated(true);
    loadGallery();
    setOrders(JSON.parse(localStorage.getItem('orders') || '[]'));
  }, []);

  const loadGallery = () => {
    setGallery(JSON.parse(localStorage.getItem('gallery') || '[]'));
  };

  const login = () => {
    if (password === ADMIN_PASSWORD) {
      setAuthenticated(true);
      localStorage.setItem('admin_auth', 'true');
      setError('');
    } else {
      setError('Неверный пароль');
    }
  };

  const logout = () => {
    setAuthenticated(false);
    localStorage.removeItem('admin_auth');
  };

  const handleDrag = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === 'dragenter' || e.type === 'dragover') setDragActive(true);
    else if (e.type === 'dragleave') setDragActive(false);
  }, []);

  const handleFile = (file: File) => {
    const reader = new FileReader();
    reader.onload = (e) => {
      setPreview(e.target?.result as string);
    };
    reader.readAsDataURL(file);
  };

  const handleDrop = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
    if (e.dataTransfer.files?.[0]) handleFile(e.dataTransfer.files[0]);
  }, []);

  const handleFileInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files?.[0]) handleFile(e.target.files[0]);
  };

  const addToGallery = () => {
    if (!title.trim()) return;
    const newItem: GalleryItem = {
      id: Date.now().toString(),
      category,
      type: 'image',
      url: preview,
      title: title.trim(),
      date: new Date().toISOString().split('T')[0],
    };
    const updated = [...gallery, newItem];
    setGallery(updated);
    localStorage.setItem('gallery', JSON.stringify(updated));
    setTitle('');
    setPreview('');
  };

  const deleteItem = (id: string) => {
    const updated = gallery.filter((g) => g.id !== id);
    setGallery(updated);
    localStorage.setItem('gallery', JSON.stringify(updated));
  };

  const deleteOrder = (index: number) => {
    const updated = orders.filter((_, i) => i !== index);
    setOrders(updated);
    localStorage.setItem('orders', JSON.stringify(updated));
  };

  if (!authenticated) {
    return (
      <div className="py-16 min-h-screen flex items-center justify-center">
        <div className="max-w-sm w-full px-4">
          <div className="p-8 rounded-2xl bg-[var(--color-bg-card)] border border-[var(--color-border-card)]">
            <div className="text-center mb-6">
              <div className="text-4xl mb-3">🔒</div>
              <h1 className="text-xl font-bold text-white" style={{ fontFamily: 'var(--font-orbitron)' }}>
                Админ-панель
              </h1>
              <p className="text-sm text-[var(--color-text-secondary)] mt-2">Введите пароль для входа</p>
            </div>
            <div className="space-y-4">
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && login()}
                className="w-full px-4 py-3 rounded-xl bg-white/5 border border-[var(--color-border-card)] text-[var(--color-text-primary)] focus:border-[var(--color-accent-orange)] focus:outline-none"
                placeholder="Пароль"
              />
              {error && <p className="text-sm text-red-400">{error}</p>}
              <button onClick={login} className="w-full px-8 py-3 rounded-xl gradient-orange text-white font-semibold hover:opacity-90 transition-all">
                Войти
              </button>
              <p className="text-xs text-[var(--color-text-secondary)] text-center">Пароль: autopro2024</p>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="py-16">
      <section className="py-12 bg-[var(--color-bg-primary)]">
        <div className="max-w-6xl mx-auto px-4 sm:px-6">
          <div className="flex items-center justify-between mb-8">
            <h1 className="text-2xl md:text-4xl font-bold text-white" style={{ fontFamily: 'var(--font-orbitron)' }}>
              🔧 АДМИН-<span className="text-[var(--color-accent-orange)]">ПАНЕЛЬ</span>
            </h1>
            <button onClick={logout} className="px-4 py-2 rounded-lg border border-red-400/30 text-red-400 text-sm hover:bg-red-400/10 transition-all">
              Выйти
            </button>
          </div>

          {/* Tabs */}
          <div className="flex gap-2 mb-8">
            {[
              { id: 'gallery' as const, label: '📸 Галерея' },
              { id: 'orders' as const, label: '📋 Заявки' },
              { id: 'reviews' as const, label: '⭐ Отзывы' },
            ].map((t) => (
              <button
                key={t.id}
                onClick={() => setTab(t.id)}
                className={`px-5 py-2.5 rounded-xl text-sm font-medium transition-all ${
                  tab === t.id ? 'gradient-orange text-white neon-orange' : 'bg-[var(--color-bg-card)] text-[var(--color-text-secondary)] border border-[var(--color-border-card)]'
                }`}
              >
                {t.label}
              </button>
            ))}
          </div>

          {/* Gallery Tab */}
          {tab === 'gallery' && (
            <div className="space-y-8">
              {/* Upload Form */}
              <div className="p-6 rounded-2xl bg-[var(--color-bg-card)] border border-[var(--color-border-card)]">
                <h2 className="text-lg font-bold text-white mb-4">Добавить фото</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <div
                      onDragEnter={handleDrag}
                      onDragLeave={handleDrag}
                      onDragOver={handleDrag}
                      onDrop={handleDrop}
                      className={`h-48 rounded-xl border-2 border-dashed flex items-center justify-center cursor-pointer transition-all ${
                        dragActive ? 'border-[var(--color-accent-orange)] bg-[var(--color-accent-orange)]/5' : 'border-[var(--color-border-card)] hover:border-[var(--color-accent-orange)]/30'
                      }`}
                      onClick={() => document.getElementById('file-input')?.click()}
                    >
                      {preview ? (
                        <img src={preview} alt="Preview" className="h-full w-full object-cover rounded-xl" />
                      ) : (
                        <div className="text-center">
                          <div className="text-3xl mb-2">📁</div>
                          <p className="text-sm text-[var(--color-text-secondary)]">Перетащите фото сюда<br />или нажмите для выбора</p>
                        </div>
                      )}
                    </div>
                    <input id="file-input" type="file" accept="image/*" onChange={handleFileInput} className="hidden" />
                  </div>
                  <div className="space-y-4">
                    <div>
                      <label className="block text-sm text-[var(--color-text-secondary)] mb-1">Название</label>
                      <input
                        type="text"
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                        className="w-full px-4 py-3 rounded-xl bg-white/5 border border-[var(--color-border-card)] text-[var(--color-text-primary)] focus:border-[var(--color-accent-orange)] focus:outline-none"
                        placeholder="Описание работы..."
                      />
                    </div>
                    <div>
                      <label className="block text-sm text-[var(--color-text-secondary)] mb-1">Категория</label>
                      <select
                        value={category}
                        onChange={(e) => setCategory(e.target.value)}
                        className="w-full px-4 py-3 rounded-xl bg-white/5 border border-[var(--color-border-card)] text-[var(--color-text-primary)] focus:border-[var(--color-accent-orange)] focus:outline-none"
                      >
                        <option value="engine">🔧 Двигатель</option>
                        <option value="suspension">⚙️ Ходовая</option>
                        <option value="tires">🛞 Шиномонтаж</option>
                        <option value="body">🚗 Кузов</option>
                        <option value="electric">⚡ Электрика</option>
                      </select>
                    </div>
                    <button
                      onClick={addToGallery}
                      disabled={!title.trim()}
                      className="w-full px-6 py-3 rounded-xl gradient-orange text-white font-semibold hover:opacity-90 transition-all disabled:opacity-40 disabled:cursor-not-allowed"
                    >
                      Добавить в галерею
                    </button>
                  </div>
                </div>
              </div>

              {/* Gallery Items */}
              <div>
                <h2 className="text-lg font-bold text-white mb-4">Загруженные фото ({gallery.length})</h2>
                {gallery.length === 0 ? (
                  <div className="text-center py-8 text-[var(--color-text-secondary)]">Нет загруженных фото</div>
                ) : (
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                    {gallery.map((item) => (
                      <div key={item.id} className="rounded-xl bg-white/5 border border-[var(--color-border-card)] overflow-hidden">
                        <div className="h-32 bg-[var(--color-bg-card)] flex items-center justify-center">
                          {item.url ? (
                            <img src={item.url} alt={item.title} className="h-full w-full object-cover" />
                          ) : (
                            <span className="text-3xl">{item.category === 'engine' ? '🔧' : item.category === 'suspension' ? '⚙️' : item.category === 'tires' ? '🛞' : item.category === 'body' ? '🚗' : '⚡'}</span>
                          )}
                        </div>
                        <div className="p-3 flex items-center justify-between">
                          <div>
                            <p className="text-sm text-white truncate">{item.title}</p>
                            <p className="text-xs text-[var(--color-text-secondary)]">{item.date}</p>
                          </div>
                          <button onClick={() => deleteItem(item.id)} className="text-red-400 hover:text-red-300 text-lg">🗑</button>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>
          )}

          {/* Orders Tab */}
          {tab === 'orders' && (
            <div>
              <h2 className="text-lg font-bold text-white mb-4">Заявки ({orders.length})</h2>
              {orders.length === 0 ? (
                <div className="text-center py-8 text-[var(--color-text-secondary)]">Нет заявок</div>
              ) : (
                <div className="space-y-4">
                  {orders.map((order, i) => (
                    <div key={i} className="p-5 rounded-2xl bg-[var(--color-bg-card)] border border-[var(--color-border-card)]">
                      <div className="flex items-start justify-between gap-4">
                        <div className="flex-1">
                          <div className="flex flex-wrap items-center gap-3 mb-2">
                            <span className="font-semibold text-white">{order.name}</span>
                            <a href={`tel:${order.phone}`} className="text-sm text-[var(--color-accent-orange)]">{order.phone}</a>
                            {order.car && <span className="text-xs bg-white/5 px-2 py-0.5 rounded text-[var(--color-text-secondary)]">🚗 {order.car}</span>}
                          </div>
                          <ul className="space-y-1 mb-2">
                            {(order.services || []).map((s: string, j: number) => (
                              <li key={j} className="text-sm text-[var(--color-text-primary)]">• {s}</li>
                            ))}
                          </ul>
                          <div className="flex items-center gap-4">
                            <span className="text-[var(--color-accent-orange)] font-bold">от {(order.total || 0).toLocaleString()}₽</span>
                            <span className="text-xs text-[var(--color-text-secondary)]">{order.date ? new Date(order.date).toLocaleString('ru-RU') : ''}</span>
                          </div>
                          {order.comment && <p className="text-xs text-[var(--color-text-secondary)] mt-2 italic">«{order.comment}»</p>}
                        </div>
                        <button onClick={() => deleteOrder(i)} className="text-red-400 hover:text-red-300">🗑</button>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}

          {/* Reviews Tab */}
          {tab === 'reviews' && (
            <div>
              <h2 className="text-lg font-bold text-white mb-4">Пользовательские отзывы</h2>
              {(() => {
                const userReviews = JSON.parse(localStorage.getItem('reviews') || '[]');
                if (userReviews.length === 0) return <div className="text-center py-8 text-[var(--color-text-secondary)]">Нет пользовательских отзывов</div>;
                return (
                  <div className="space-y-4">
                    {userReviews.map((r: any, i: number) => (
                      <div key={i} className="p-5 rounded-2xl bg-[var(--color-bg-card)] border border-[var(--color-border-card)]">
                        <div className="flex items-start justify-between">
                          <div>
                            <div className="flex items-center gap-2 mb-1">
                              <span className="font-semibold text-white">{r.name}</span>
                              <span className="text-yellow-400 text-sm">{'★'.repeat(r.rating)}</span>
                            </div>
                            {r.car && <p className="text-xs text-[var(--color-text-secondary)]">🚗 {r.car}</p>}
                            <p className="text-sm text-[var(--color-text-primary)] mt-2">{r.text}</p>
                            <p className="text-xs text-[var(--color-text-secondary)] mt-2">{r.date}</p>
                          </div>
                          <button
                            onClick={() => {
                              const updated = userReviews.filter((_: any, idx: number) => idx !== i);
                              localStorage.setItem('reviews', JSON.stringify(updated));
                              window.location.reload();
                            }}
                            className="text-red-400 hover:text-red-300"
                          >
                            🗑
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                );
              })()}
            </div>
          )}
        </div>
      </section>
    </div>
  );
}
