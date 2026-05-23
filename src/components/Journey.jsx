import { useState, useEffect, useRef, useCallback } from 'react'

const TOTAL = 5

const GAMES = [
  { key: 'qr',     icon: '🎯', title: 'מסע 10 התחנות', sub: 'ציד QR בסמטאות', color: '#C4622D' },
  { key: 'spin',   icon: '🎡', title: 'גלגל המזל',     sub: 'סובב וקבל פרס',  color: '#B8951A' },
  { key: 'quiz',   icon: '🧠', title: 'חידון יפו',      sub: '10 שאלות + פרס', color: '#1A6B8A' },
  { key: 'selfie', icon: '📷', title: 'ציד הסלפי',     sub: '10 צילומים',     color: '#8B2500' },
]

const PLACES = [
  { key: 'map',     icon: '🗺️', title: 'מפת המתחם',     sub: '12 מקומות אמיתיים', color: '#2E7D32' },
  { key: 'tours',   icon: '🚶', title: 'סיורים מודרכים', sub: 'משפחות, זוגות',     color: '#6B4A00' },
  { key: 'arrival', icon: '🚗', title: 'איך מגיעים',     sub: 'הוראות הגעה ליפו',  color: '#455A64' },
]

const COMMUNITY = [
  { key: 'community', icon: '👥', title: 'הקהילה שלנו',    sub: 'מי אנחנו ולמה',     color: '#0D6356' },
  { key: 'credits',   icon: '🏅', title: 'הקרדיטים שלי',   sub: 'איך צוברים והטבות', color: '#C8951A' },
  { key: 'events',    icon: '🎪', title: 'אירועים',         sub: 'מה קורה ביפו',      color: '#7B1FA2' },
  { key: 'store',     icon: '🛒', title: 'חנות מקומית',     sub: 'מוצרים יפואים',      color: '#5D4037' },
]

const INFO = [
  { key: 'about',   icon: '🏛️', title: 'על חפ"י',       sub: 'מה זה ולמה',       color: '#1565C0' },
  { key: 'faq',     icon: '❓', title: 'שאלות נפוצות',   sub: 'תשובות לכל שאלה',   color: '#6A1B9A' },
  { key: 'contact', icon: '✉️', title: 'צור קשר',        sub: 'שאל אותנו',         color: '#00695C' },
]

function CardFrame({ active, children }) {
  return (
    <div className="h-full w-full flex items-center justify-center p-4 md:p-8">
      <div
        className="w-full max-w-4xl rounded-[36px] p-5 md:p-10 transition-all duration-500"
        style={{
          background: 'rgba(255,252,245,0.82)',
          backdropFilter: 'blur(18px) saturate(1.1)',
          border: '3px solid rgba(200,169,110,0.5)',
          boxShadow: '0 24px 70px rgba(44,26,14,0.22), 0 4px 16px rgba(44,26,14,0.1)',
          opacity: active ? 1 : 0.82,
          transform: active ? 'scale(1)' : 'scale(0.96)',
          maxHeight: 'calc(100vh - 160px)',
          overflow: 'auto',
        }}
      >
        {children}
      </div>
    </div>
  )
}

function CategoryGrid({ items, onOpen, cols }) {
  const gridCls = cols === 2 ? 'grid-cols-2'
    : cols === 3 ? 'grid-cols-2 md:grid-cols-3'
    : 'grid-cols-2 md:grid-cols-4'
  return (
    <div className={`grid gap-3 md:gap-4 ${gridCls}`}>
      {items.map(it => (
        <button
          key={it.key}
          onClick={() => onOpen(it.key)}
          className="group block rounded-3xl p-4 md:p-5 text-center transition-all hover:-translate-y-2 active:scale-95 w-full"
          style={{
            background: `linear-gradient(135deg, ${it.color}, ${it.color}cc)`,
            boxShadow: `0 10px 24px ${it.color}66, inset 0 1px 0 rgba(255,255,255,0.35)`,
            border: '3px solid rgba(255,255,255,0.45)',
            cursor: 'pointer',
          }}
        >
          <div className="text-4xl md:text-5xl mb-2 transition-transform group-hover:scale-110"
            style={{ filter: 'drop-shadow(0 3px 8px rgba(0,0,0,0.3))' }}>
            {it.icon}
          </div>
          <div className="font-black text-base md:text-xl mb-1"
            style={{ color: '#FFFFFF', textShadow: '0 2px 8px rgba(0,0,0,0.4)', fontFamily: 'Frank Ruhl Libre, serif' }}>
            {it.title}
          </div>
          <div className="text-xs md:text-sm font-medium"
            style={{ color: 'rgba(255,255,255,0.95)' }}>
            {it.sub}
          </div>
        </button>
      ))}
    </div>
  )
}

function CardWelcome({ active, onNext }) {
  return (
    <CardFrame active={active}>
      <div className="text-center">
        <div className="inline-block mb-5 px-5 py-2 rounded-full text-sm font-bold border-2"
          style={{ color: '#8B5E00', borderColor: 'rgba(200,169,110,0.5)', background: 'rgba(255,255,255,0.7)' }}>
          🏛️ ברוכים הבאים לחפ"י
        </div>
        <h1 className="text-4xl md:text-7xl font-black mb-4 leading-tight"
          style={{ color: '#8B5E00', fontFamily: 'Frank Ruhl Libre, serif' }}>
          יפו העתיקה<br />
          <span style={{ color: '#C4622D' }}>כחוויה חיה</span>
        </h1>
        <p className="text-base md:text-2xl mb-6 max-w-2xl mx-auto font-medium" style={{ color: '#2C1A0E' }}>
          משחקים · מפה · קהילה — הכל במקום אחד 🎉
        </p>
        <div className="flex flex-wrap justify-center gap-3 mb-6">
          {[
            { num: '10', label: 'נקודות מתנה' },
            { num: '4',  label: 'משחקים' },
            { num: '12', label: 'מקומות' },
          ].map(s => (
            <div key={s.label} className="px-4 py-2 md:px-5 md:py-3 rounded-2xl"
              style={{ background: 'rgba(200,169,110,0.18)', border: '2px solid rgba(200,169,110,0.4)' }}>
              <div className="text-2xl md:text-3xl font-black" style={{ color: '#8B5E00', fontFamily: 'Frank Ruhl Libre, serif' }}>{s.num}</div>
              <div className="text-xs font-bold" style={{ color: '#6B4A00' }}>{s.label}</div>
            </div>
          ))}
        </div>
        <button onClick={onNext}
          className="py-4 md:py-5 px-10 md:px-12 rounded-2xl font-black text-lg md:text-xl transition-all hover:scale-105 active:scale-95"
          style={{
            background: 'linear-gradient(135deg, #C4622D, #E8841C)',
            color: '#FFFFFF',
            boxShadow: '0 12px 32px rgba(196,98,45,0.5), inset 0 1px 0 rgba(255,255,255,0.35)',
            border: '3px solid rgba(255,255,255,0.4)',
            textShadow: '0 1px 4px rgba(0,0,0,0.3)',
          }}>
          🚀 בוא נתחיל!
        </button>
      </div>
    </CardFrame>
  )
}

function CardCategory({ active, icon, title, desc, items, cols, onOpen }) {
  return (
    <CardFrame active={active}>
      <div className="text-center mb-5">
        <div className="text-4xl md:text-5xl mb-2">{icon}</div>
        <h2 className="text-2xl md:text-4xl font-black mb-1" style={{ color: '#8B5E00', fontFamily: 'Frank Ruhl Libre, serif' }}>
          {title}
        </h2>
        <p className="text-sm md:text-base" style={{ color: '#2C1A0E', opacity: 0.85 }}>
          {desc}
        </p>
      </div>
      <CategoryGrid items={items} onOpen={onOpen} cols={cols} />
    </CardFrame>
  )
}

function CardGames(p) {
  return <CardCategory {...p} icon="🎮" title="משחקים" desc="4 משחקים אמיתיים — לחץ ושחק!" items={GAMES} cols={2} />
}
function CardPlaces(p) {
  return <CardCategory {...p} icon="🗺️" title="מקומות וסיורים" desc="גלה את יפו — מפה, סיורים, איך מגיעים" items={PLACES} cols={3} />
}
function CardCommunity(p) {
  return (
    <CardFrame active={p.active}>
      <div className="text-center mb-5">
        <div className="text-4xl md:text-5xl mb-2">💬</div>
        <h2 className="text-2xl md:text-4xl font-black mb-1" style={{ color: '#8B5E00', fontFamily: 'Frank Ruhl Libre, serif' }}>
          קהילה ופעילות
        </h2>
        <p className="text-sm md:text-base" style={{ color: '#2C1A0E', opacity: 0.85 }}>
          הצטרף, צבור נקודות, קבל הטבות
        </p>
      </div>

      {/* Big WhatsApp CTA on top */}
      <a href="https://chat.whatsapp.com/BhnFkwONJd6DeA7KlwG1MC" target="_blank" rel="noreferrer"
        className="block rounded-3xl p-4 md:p-5 text-center transition-all hover:-translate-y-2 active:scale-95 mb-4"
        style={{
          background: 'linear-gradient(135deg, #128C7E, #25D366)',
          boxShadow: '0 12px 32px rgba(37,211,102,0.5), inset 0 1px 0 rgba(255,255,255,0.35)',
          border: '3px solid rgba(255,255,255,0.45)',
          textDecoration: 'none',
        }}>
        <div className="flex items-center justify-center gap-3">
          <svg width="32" height="32" viewBox="0 0 24 24" fill="#FFFFFF" style={{ filter: 'drop-shadow(0 2px 6px rgba(0,0,0,0.3))' }}>
            <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
          </svg>
          <div>
            <div className="font-black text-lg md:text-2xl" style={{ color: '#FFFFFF', textShadow: '0 2px 8px rgba(0,0,0,0.4)', fontFamily: 'Frank Ruhl Libre, serif' }}>
              הצטרף לקהילת וואצ'אפ
            </div>
            <div className="text-xs md:text-sm font-medium" style={{ color: 'rgba(255,255,255,0.95)' }}>
              10 נקודות מתנה + הטבות ואירועים
            </div>
          </div>
        </div>
      </a>

      <CategoryGrid items={COMMUNITY} onOpen={p.onOpen} cols={4} />
    </CardFrame>
  )
}
function CardInfo(p) {
  return <CardCategory {...p} icon="ℹ️" title="מידע ועזרה" desc='כל מה שצריך לדעת על חפ"י' items={INFO} cols={3} />
}

const CARDS = [CardWelcome, CardGames, CardPlaces, CardCommunity, CardInfo]
const DOT_LABELS = ['ברוכים הבאים', 'משחקים', 'מקומות', 'קהילה', 'מידע']

export default function Journey({ onOpenDrawer }) {
  const [active, setActive] = useState(0)
  const touchStartRef = useRef(null)
  const containerRef = useRef(null)

  const go = useCallback((i) => {
    if (i < 0 || i >= TOTAL) return
    setActive(i)
  }, [])

  const next = useCallback(() => go(active + 1), [active, go])
  const prev = useCallback(() => go(active - 1), [active, go])

  useEffect(() => {
    function onKey(e) {
      if (!containerRef.current) return
      const rect = containerRef.current.getBoundingClientRect()
      const visible = rect.bottom > 100 && rect.top < window.innerHeight - 100
      if (!visible) return
      if (e.key === 'ArrowLeft' || e.key === 'ArrowDown') { e.preventDefault(); next() }
      if (e.key === 'ArrowRight' || e.key === 'ArrowUp')  { e.preventDefault(); prev() }
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [next, prev])

  function onTouchStart(e) { touchStartRef.current = e.touches[0].clientX }
  function onTouchEnd(e) {
    if (touchStartRef.current === null) return
    const dx = e.changedTouches[0].clientX - touchStartRef.current
    if (dx < -60) next()
    if (dx > 60) prev()
    touchStartRef.current = null
  }

  return (
    <section
      ref={containerRef}
      className="relative w-full overflow-hidden"
      style={{ height: 'calc(100vh - 72px)', minHeight: 580 }}
      onTouchStart={onTouchStart}
      onTouchEnd={onTouchEnd}
    >
      {/* Progress pill at top */}
      <div className="absolute top-4 md:top-5 left-1/2 -translate-x-1/2 z-30 flex items-center gap-2 px-4 py-2 rounded-full"
        style={{ background: 'rgba(255,252,245,0.85)', backdropFilter: 'blur(10px)', border: '1px solid rgba(200,169,110,0.4)', boxShadow: '0 4px 14px rgba(44,26,14,0.1)' }}>
        {DOT_LABELS.map((label, i) => (
          <button key={i} onClick={() => go(i)}
            className="transition-all rounded-full"
            aria-label={`קלף ${i + 1}: ${label}`}
            style={{
              width: i === active ? 44 : 12,
              height: 12,
              background: i === active ? 'linear-gradient(90deg, #C4622D, #E8841C)' : i < active ? '#C8A96E' : 'rgba(139,94,0,0.25)',
              border: 'none',
              cursor: 'pointer',
            }}
          />
        ))}
        <span className="mr-3 text-xs font-bold tabular-nums" style={{ color: '#8B5E00' }}>
          {active + 1} / {TOTAL}
        </span>
      </div>

      {/* Card stack */}
      <div className="relative w-full h-full">
        {CARDS.map((Card, i) => {
          const offset = i - active
          return (
            <div
              key={i}
              className="absolute inset-0"
              style={{
                transform: `translateX(${offset * -100}%)`,
                transition: 'transform 0.55s cubic-bezier(0.22, 1, 0.36, 1), opacity 0.4s ease',
                opacity: offset === 0 ? 1 : 0.4,
                pointerEvents: offset === 0 ? 'auto' : 'none',
              }}
            >
              <Card active={offset === 0} onNext={next} onPrev={prev} onOpen={onOpenDrawer} />
            </div>
          )
        })}
      </div>

      {/* Side arrows (desktop) */}
      <button
        onClick={prev}
        disabled={active === 0}
        aria-label="הקודם"
        className="hidden md:flex absolute top-1/2 -translate-y-1/2 right-4 z-20 w-14 h-14 rounded-full items-center justify-center text-2xl font-black transition-all hover:scale-110 active:scale-95 disabled:opacity-30 disabled:cursor-not-allowed disabled:hover:scale-100"
        style={{
          background: 'rgba(255,252,245,0.95)',
          color: '#8B5E00',
          border: '2px solid rgba(200,169,110,0.5)',
          boxShadow: '0 8px 24px rgba(44,26,14,0.15)',
          cursor: 'pointer',
        }}>
        →
      </button>
      <button
        onClick={next}
        disabled={active === TOTAL - 1}
        aria-label="הבא"
        className="hidden md:flex absolute top-1/2 -translate-y-1/2 left-4 z-20 w-14 h-14 rounded-full items-center justify-center text-2xl font-black transition-all hover:scale-110 active:scale-95 disabled:opacity-30 disabled:cursor-not-allowed disabled:hover:scale-100"
        style={{
          background: 'linear-gradient(135deg, #C4622D, #E8841C)',
          color: '#FFFFFF',
          border: '2px solid rgba(255,255,255,0.4)',
          boxShadow: '0 8px 24px rgba(196,98,45,0.5)',
          cursor: 'pointer',
        }}>
        ←
      </button>

      {/* Bottom navigation (mobile) */}
      <div className="absolute bottom-3 md:bottom-5 left-0 right-0 z-20 flex justify-center gap-3 px-4">
        <button
          onClick={prev}
          disabled={active === 0}
          className="md:hidden py-3 px-5 rounded-2xl font-bold text-sm transition-all hover:scale-105 active:scale-95 disabled:opacity-30 disabled:cursor-not-allowed"
          style={{ background: 'rgba(255,252,245,0.95)', color: '#8B5E00', border: '2px solid rgba(200,169,110,0.5)', boxShadow: '0 4px 12px rgba(44,26,14,0.1)' }}>
          → הקודם
        </button>
        {active < TOTAL - 1 && (
          <button
            onClick={next}
            className="md:hidden py-3 px-7 rounded-2xl font-black text-base transition-all hover:scale-105 active:scale-95"
            style={{
              background: 'linear-gradient(135deg, #C4622D, #E8841C)',
              color: '#FFFFFF',
              boxShadow: '0 8px 24px rgba(196,98,45,0.5), inset 0 1px 0 rgba(255,255,255,0.35)',
              border: '2px solid rgba(255,255,255,0.4)',
              textShadow: '0 1px 3px rgba(0,0,0,0.3)',
            }}>
            המשך ←
          </button>
        )}
      </div>

      {/* Swipe hint - first card mobile only */}
      {active === 0 && (
        <div className="md:hidden absolute bottom-16 left-1/2 -translate-x-1/2 text-xs font-bold flex items-center gap-2"
          style={{ color: '#8B5E00', opacity: 0.6 }}>
          <span className="animate-pulse">👈 החלק שמאלה</span>
        </div>
      )}
    </section>
  )
}
