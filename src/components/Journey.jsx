import { useState, useEffect, useRef, useCallback } from 'react'

const TOTAL = 5

// Sea-blue palette tiles
const GAMES = [
  { key: 'qr',     icon: '🎯', title: 'מצאו את המטמון', sub: 'ציד QR בסמטאות',  color: '#0D3A56' },
  { key: 'spin',   icon: '🎡', title: 'הגרלת היום',     sub: 'גלגל מזל לילדים', color: '#1A6B8A' },
  { key: 'quiz',   icon: '🧠', title: 'חידון יפו',       sub: '10 שאלות + פרס',  color: '#2D5F8B' },
  { key: 'selfie', icon: '📷', title: 'ציד הסלפי',      sub: '10 צילומים שווים', color: '#4A9DB8' },
]

const PLACES = [
  { key: 'map',     icon: '🗺️', title: 'מפת המתחם',          sub: '12 מקומות אמיתיים', color: '#0D3A56' },
  { key: 'tours',   icon: '🚶', title: 'סיורים אינטראקטיביים', sub: 'משפחות · זוגות · יחידים', color: '#1A6B8A' },
  { key: 'arrival', icon: '🚗', title: 'הגעה ליפו העתיקה',     sub: 'איך להגיע בקלות',   color: '#4A9DB8' },
]

const COMMUNITY = [
  { key: 'community', icon: '👥', title: 'הקהילה שלנו',     sub: 'הצטרפות ושיתוף',    color: '#0D3A56' },
  { key: 'credits',   icon: '🏅', title: 'קופונים וקרדיטים', sub: 'איך צוברים והטבות', color: '#1A6B8A' },
  { key: 'events',    icon: '🎪', title: 'השבוע ביפו',       sub: 'מה קורה היום ביפו', color: '#2D5F8B' },
  { key: 'store',     icon: '🛒', title: 'חנות מוצרי השבוע',  sub: 'מוצרי גלריות יפואיות', color: '#4A9DB8' },
]

const INFO = [
  { key: 'about',   icon: '🏛️', title: 'על חפ"י',       sub: 'אמנות העתיד · חוויה חיה', color: '#0D3A56' },
  { key: 'faq',     icon: '❓', title: 'שאלות נפוצות',   sub: 'תשובות לכל שאלה',         color: '#2D5F8B' },
  { key: 'contact', icon: '✉️', title: 'צור קשר',        sub: 'שלחו לנו הודעה',          color: '#4A9DB8' },
  { key: 'contact', icon: '💌', title: 'תנו לנו משוב',   sub: 'נשמח לשמוע מכם',          color: '#1A6B8A' },
]

function CardFrame({ active, children }) {
  return (
    <div className="h-full w-full flex items-center justify-center px-3 py-3 md:p-8">
      <div
        className="w-full max-w-3xl rounded-3xl md:rounded-[36px] p-4 md:p-10 transition-all duration-500"
        style={{
          background: 'rgba(176,212,227,0.48)',
          backdropFilter: 'blur(28px) saturate(1.3)',
          WebkitBackdropFilter: 'blur(28px) saturate(1.3)',
          border: '2px solid rgba(225,240,245,0.55)',
          boxShadow: '0 16px 50px rgba(13,58,86,0.3), 0 4px 16px rgba(13,58,86,0.15), inset 0 1px 0 rgba(255,255,255,0.4)',
          opacity: active ? 1 : 0.82,
          transform: active ? 'scale(1)' : 'scale(0.96)',
          maxHeight: 'calc(100vh - 140px)',
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
    <div className={`grid gap-2 md:gap-4 ${gridCls}`}>
      {items.map(it => (
        <button
          key={it.key}
          onClick={() => onOpen(it.key)}
          className="group block rounded-2xl md:rounded-3xl p-3 md:p-5 text-center transition-all hover:-translate-y-2 active:scale-95 w-full"
          style={{
            background: `linear-gradient(135deg, ${it.color}, ${it.color}cc)`,
            boxShadow: `0 6px 18px ${it.color}55, inset 0 1px 0 rgba(255,255,255,0.35)`,
            border: '2px solid rgba(255,255,255,0.45)',
            cursor: 'pointer',
          }}
        >
          <div className="text-3xl md:text-5xl mb-1 md:mb-2 transition-transform group-hover:scale-110"
            style={{ filter: 'drop-shadow(0 3px 8px rgba(0,0,0,0.3))' }}>
            {it.icon}
          </div>
          <div className="font-black text-sm md:text-xl leading-tight"
            style={{ color: '#FFFFFF', textShadow: '0 2px 8px rgba(0,0,0,0.4)', fontFamily: 'Frank Ruhl Libre, serif' }}>
            {it.title}
          </div>
          <div className="text-[11px] md:text-sm font-medium leading-tight mt-0.5"
            style={{ color: 'rgba(255,255,255,0.95)' }}>
            {it.sub}
          </div>
        </button>
      ))}
    </div>
  )
}

function PhoneLogo() {
  // Phone-mockup style frame containing the Old Jaffa CHAPI logo
  return (
    <div className="flex justify-center mb-3 md:mb-5">
      <div
        style={{
          position: 'relative',
          width: 120,
          height: 180,
          borderRadius: 22,
          background: 'linear-gradient(145deg, #0D3A56, #1A6B8A)',
          border: '3px solid #4A9DB8',
          boxShadow:
            '0 0 0 4px rgba(225,240,245,0.5), 0 0 0 6px #4A9DB8, 0 16px 40px rgba(13,58,86,0.45), inset 0 1px 0 rgba(255,255,255,0.2)',
          overflow: 'hidden',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          padding: 12,
        }}
      >
        {/* Speaker bar */}
        <div style={{
          position: 'absolute', top: 8, left: '50%', transform: 'translateX(-50%)',
          width: 36, height: 4, background: '#4A9DB8', borderRadius: 2, opacity: 0.6,
        }} />
        {/* Logo circle */}
        <div
          style={{
            width: 56,
            height: 56,
            borderRadius: '50%',
            background: 'linear-gradient(135deg, #B0D4E3, #4A9DB8)',
            border: '3px solid rgba(225,240,245,0.7)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            marginBottom: 8,
            boxShadow: '0 4px 16px rgba(13,58,86,0.4), inset 0 1px 0 rgba(255,255,255,0.5)',
          }}
        >
          <span style={{
            fontFamily: 'Frank Ruhl Libre, serif',
            fontSize: 18,
            fontWeight: 900,
            color: '#0D3A56',
            textShadow: '0 1px 2px rgba(255,255,255,0.4)',
          }}>
            חפ"י
          </span>
        </div>
        <div style={{
          fontSize: 10, fontWeight: 900, color: '#FFFFFF',
          fontFamily: 'Frank Ruhl Libre, serif', textAlign: 'center',
          textShadow: '0 1px 4px rgba(0,0,0,0.4)',
        }}>
          יפו העתיקה
        </div>
        <div style={{
          fontSize: 8, color: '#B0D4E3', marginTop: 2, opacity: 0.85,
        }}>
          Old Jaffa Experience
        </div>
        {/* Home bar */}
        <div style={{
          position: 'absolute', bottom: 8, left: '50%', transform: 'translateX(-50%)',
          width: 30, height: 3, background: '#4A9DB8', borderRadius: 2, opacity: 0.55,
        }} />
      </div>
    </div>
  )
}

function CardWelcome({ active, onNext }) {
  return (
    <CardFrame active={active}>
      <div className="text-center">
        <PhoneLogo />
        <div className="inline-block mb-2 md:mb-4 px-3 md:px-5 py-1 md:py-2 rounded-full text-[11px] md:text-sm font-bold border-2"
          style={{ color: '#0D3A56', borderColor: 'rgba(74,157,184,0.55)', background: 'rgba(225,240,245,0.75)' }}>
          🏛️ ברוכים הבאים לחפ"י
        </div>
        <h1 className="text-2xl md:text-6xl font-black mb-1 md:mb-3 leading-tight"
          style={{ color: '#0D3A56', fontFamily: 'Frank Ruhl Libre, serif', textShadow: '0 2px 8px rgba(255,255,255,0.5)' }}>
          יפו העתיקה <span style={{ color: '#1A6B8A' }}>כחוויה חיה</span>
        </h1>
        <p className="text-xs md:text-base mb-3 md:mb-5 max-w-2xl mx-auto" style={{ color: '#1A6B8A' }}>
          להפוך את יפו ממקום שמבקרים בו — לחוויה שמשתתפים בה ✨
        </p>
        <div className="flex flex-wrap justify-center gap-2 md:gap-3 mb-3 md:mb-5">
          {[
            { num: '10', label: 'נק׳ מתנה' },
            { num: '4',  label: 'משחקים' },
            { num: '12', label: 'מקומות' },
          ].map(s => (
            <div key={s.label} className="px-3 py-1.5 md:px-5 md:py-2.5 rounded-xl md:rounded-2xl"
              style={{ background: 'rgba(74,157,184,0.22)', border: '2px solid rgba(26,107,138,0.45)' }}>
              <div className="text-lg md:text-3xl font-black leading-none" style={{ color: '#0D3A56', fontFamily: 'Frank Ruhl Libre, serif' }}>{s.num}</div>
              <div className="text-[10px] md:text-xs font-bold mt-0.5" style={{ color: '#1A6B8A' }}>{s.label}</div>
            </div>
          ))}
        </div>
        <button onClick={onNext}
          className="py-3 md:py-4 px-8 md:px-12 rounded-2xl font-black text-base md:text-xl transition-all hover:scale-105 active:scale-95"
          style={{
            background: 'linear-gradient(135deg, #0D3A56, #4A9DB8)',
            color: '#FFFFFF',
            boxShadow: '0 8px 24px rgba(26,107,138,0.55), inset 0 1px 0 rgba(255,255,255,0.35)',
            border: '2px solid rgba(255,255,255,0.4)',
            textShadow: '0 1px 4px rgba(0,0,0,0.3)',
          }}>
          🚀 בואו נתחיל!
        </button>
      </div>
    </CardFrame>
  )
}

function CardCategory({ active, icon, title, desc, items, cols, onOpen }) {
  return (
    <CardFrame active={active}>
      <div className="text-center mb-3 md:mb-5">
        <div className="text-3xl md:text-5xl mb-1 md:mb-2">{icon}</div>
        <h2 className="text-xl md:text-4xl font-black mb-0.5 md:mb-1" style={{ color: '#0D3A56', fontFamily: 'Frank Ruhl Libre, serif', textShadow: '0 1px 4px rgba(255,255,255,0.3)' }}>
          {title}
        </h2>
        <p className="text-xs md:text-base font-medium" style={{ color: '#1A6B8A' }}>
          {desc}
        </p>
      </div>
      <CategoryGrid items={items} onOpen={onOpen} cols={cols} />
    </CardFrame>
  )
}

function CardGames(p) {
  return <CardCategory {...p} icon="🎮" title="משחקים" desc="שחקו עכשיו וקבלו קרדיטים והפתעות" items={GAMES} cols={2} />
}
function CardPlaces(p) {
  return <CardCategory {...p} icon="🗺️" title="מקומות וסיורים" desc="גלו את יפו — מפה, סיורים, איך מגיעים" items={PLACES} cols={3} />
}
function CardCommunity(p) {
  return (
    <CardFrame active={p.active}>
      <div className="text-center mb-3 md:mb-5">
        <div className="text-3xl md:text-5xl mb-1 md:mb-2">💬</div>
        <h2 className="text-xl md:text-4xl font-black mb-0.5 md:mb-1" style={{ color: '#0D3A56', fontFamily: 'Frank Ruhl Libre, serif', textShadow: '0 1px 4px rgba(255,255,255,0.3)' }}>
          קהילה ופעילות
        </h2>
        <p className="text-xs md:text-base font-medium" style={{ color: '#1A6B8A' }}>
          הצטרפו, צברו נקודות, קבלו הטבות
        </p>
      </div>

      {/* Big WhatsApp CTA on top */}
      <a href="https://chat.whatsapp.com/BhnFkwONJd6DeA7KlwG1MC" target="_blank" rel="noreferrer"
        className="block rounded-2xl md:rounded-3xl p-3 md:p-5 text-center transition-all hover:-translate-y-2 active:scale-95 mb-2 md:mb-4"
        style={{
          background: 'linear-gradient(135deg, #128C7E, #25D366)',
          boxShadow: '0 8px 24px rgba(37,211,102,0.5), inset 0 1px 0 rgba(255,255,255,0.35)',
          border: '2px solid rgba(255,255,255,0.45)',
          textDecoration: 'none',
        }}>
        <div className="flex items-center justify-center gap-2 md:gap-3">
          <svg className="w-6 h-6 md:w-8 md:h-8 flex-shrink-0" viewBox="0 0 24 24" fill="#FFFFFF" style={{ filter: 'drop-shadow(0 2px 6px rgba(0,0,0,0.3))' }}>
            <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
          </svg>
          <div className="text-right">
            <div className="font-black text-sm md:text-2xl leading-tight" style={{ color: '#FFFFFF', textShadow: '0 2px 8px rgba(0,0,0,0.4)', fontFamily: 'Frank Ruhl Libre, serif' }}>
              הצטרפו לקהילת וואצ'אפ
            </div>
            <div className="text-[11px] md:text-sm font-medium leading-tight mt-0.5" style={{ color: 'rgba(255,255,255,0.95)' }}>
              10 נקודות מתנה + הטבות
            </div>
          </div>
        </div>
      </a>

      <CategoryGrid items={COMMUNITY} onOpen={p.onOpen} cols={4} />
    </CardFrame>
  )
}
function CardInfo(p) {
  return <CardCategory {...p} icon="ℹ️" title="מידע ועזרה" desc='כל מה שצריך לדעת על חפ"י' items={INFO} cols={2} />
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
    // RTL-natural: swipe right (positive dx) → next, swipe left → previous
    if (dx > 60) next()
    if (dx < -60) prev()
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
      {/* Progress pill at top — compact on mobile */}
      <div className="absolute top-2 md:top-5 left-1/2 -translate-x-1/2 z-30 flex items-center gap-1.5 md:gap-2 px-2.5 md:px-4 py-1.5 md:py-2 rounded-full"
        style={{ background: 'rgba(225,240,245,0.85)', backdropFilter: 'blur(10px)', border: '1px solid rgba(74,157,184,0.45)', boxShadow: '0 4px 14px rgba(13,58,86,0.12)' }}>
        {DOT_LABELS.map((label, i) => (
          <button key={i} onClick={() => go(i)}
            className="transition-all rounded-full"
            aria-label={`קלף ${i + 1}: ${label}`}
            style={{
              width: i === active ? 32 : 8,
              height: 8,
              background: i === active ? 'linear-gradient(90deg, #0D3A56, #4A9DB8)' : i < active ? '#4A9DB8' : 'rgba(13,58,86,0.25)',
              border: 'none',
              cursor: 'pointer',
            }}
          />
        ))}
        <span className="mr-2 text-[10px] md:text-xs font-bold tabular-nums" style={{ color: '#0D3A56' }}>
          {active + 1}/{TOTAL}
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
          background: 'rgba(225,240,245,0.95)',
          color: '#0D3A56',
          border: '2px solid rgba(74,157,184,0.5)',
          boxShadow: '0 8px 24px rgba(13,58,86,0.15)',
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
          background: 'linear-gradient(135deg, #0D3A56, #4A9DB8)',
          color: '#FFFFFF',
          border: '2px solid rgba(255,255,255,0.4)',
          boxShadow: '0 8px 24px rgba(26,107,138,0.55)',
          cursor: 'pointer',
        }}>
        ←
      </button>

      {/* Bottom navigation (mobile) — compact */}
      <div className="absolute bottom-2 md:bottom-5 left-0 right-0 z-20 flex justify-center gap-2 px-3">
        <button
          onClick={prev}
          disabled={active === 0}
          className="md:hidden py-2 px-4 rounded-xl font-bold text-xs transition-all hover:scale-105 active:scale-95 disabled:opacity-30 disabled:cursor-not-allowed"
          style={{ background: 'rgba(225,240,245,0.95)', color: '#0D3A56', border: '2px solid rgba(74,157,184,0.5)', boxShadow: '0 2px 8px rgba(13,58,86,0.12)' }}>
          → הקודם
        </button>
        {active < TOTAL - 1 && (
          <button
            onClick={next}
            className="md:hidden py-2 px-5 rounded-xl font-black text-sm transition-all hover:scale-105 active:scale-95"
            style={{
              background: 'linear-gradient(135deg, #0D3A56, #4A9DB8)',
              color: '#FFFFFF',
              boxShadow: '0 6px 16px rgba(26,107,138,0.55), inset 0 1px 0 rgba(255,255,255,0.35)',
              border: '2px solid rgba(255,255,255,0.4)',
              textShadow: '0 1px 3px rgba(0,0,0,0.3)',
            }}>
            המשך ←
          </button>
        )}
      </div>

      {/* Swipe hint - first card mobile only */}
      {active === 0 && (
        <div className="md:hidden absolute bottom-12 left-1/2 -translate-x-1/2 text-[10px] font-bold flex items-center gap-2"
          style={{ color: '#0D3A56', opacity: 0.7 }}>
          <span className="animate-pulse">👉 החלק ימינה</span>
        </div>
      )}
    </section>
  )
}
