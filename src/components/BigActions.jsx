const CATEGORIES = [
  {
    id: 'games',
    icon: '🎮',
    title: 'משחקים',
    desc: '4 משחקים כיפיים — תצברו נקודות תוך כדי',
    accent: '#C4622D',
    accentBg: 'linear-gradient(135deg, #C4622D, #E8841C)',
    items: [
      { href: '#game', icon: '🎯', title: 'מסע 10 התחנות', sub: 'ציד QR בסמטאות', bg: 'linear-gradient(135deg, #C4622D 0%, #E8841C 100%)', shadow: 'rgba(196,98,45,0.45)', label: 'התחל!' },
      { href: '#lottery', icon: '🎡', title: 'גלגל המזל', sub: 'סובב וקבל פרס', bg: 'linear-gradient(135deg, #B8951A 0%, #E8B838 100%)', shadow: 'rgba(200,169,110,0.45)', label: 'סובב!' },
      { href: '#selfie-hunt', icon: '📷', title: 'ציד הסלפי', sub: '10 צילומים לפרס', bg: 'linear-gradient(135deg, #8B2500 0%, #D44528 100%)', shadow: 'rgba(139,37,0,0.45)', label: 'צלם!' },
      { href: '#quiz', icon: '🧠', title: 'חידון יפו', sub: '10 שאלות + פרס', bg: 'linear-gradient(135deg, #1A6B8A 0%, #2E9CC8 100%)', shadow: 'rgba(26,107,138,0.45)', label: 'התחל!' },
    ],
  },
  {
    id: 'places',
    icon: '🗺️',
    title: 'מקומות וסיורים',
    desc: 'גלה את יפו העתיקה — מפה, סיורים, הגעה',
    accent: '#2E7D32',
    accentBg: 'linear-gradient(135deg, #2E7D32, #66BB6A)',
    items: [
      { href: '#map', icon: '🗺️', title: 'מפת המתחם', sub: '12 מקומות אמיתיים', bg: 'linear-gradient(135deg, #2E7D32 0%, #66BB6A 100%)', shadow: 'rgba(46,125,50,0.45)', label: 'פתח מפה' },
      { href: '#tours', icon: '🚶', title: 'סיורים מודרכים', sub: 'משפחות, זוגות, יחידים', bg: 'linear-gradient(135deg, #6B4A00 0%, #B8951A 100%)', shadow: 'rgba(184,149,26,0.45)', label: 'הצג' },
      { href: '#arrival', icon: '🚗', title: 'איך מגיעים', sub: 'הוראות הגעה ליפו', bg: 'linear-gradient(135deg, #455A64 0%, #78909C 100%)', shadow: 'rgba(69,90,100,0.45)', label: 'איך מגיעים' },
    ],
  },
  {
    id: 'shop',
    icon: '🛍️',
    title: 'אירועים וקניות',
    desc: 'מה קורה היום, איפה אוכלים, איפה קונים',
    accent: '#7B1FA2',
    accentBg: 'linear-gradient(135deg, #7B1FA2, #BA68C8)',
    items: [
      { href: '#events', icon: '🎪', title: 'אירועים', sub: 'מה קורה היום ביפו', bg: 'linear-gradient(135deg, #7B1FA2 0%, #BA68C8 100%)', shadow: 'rgba(123,31,162,0.45)', label: 'ראה אירועים' },
      { href: '#menu', icon: '🍽️', title: 'תפריט מסעדות', sub: 'אוכל אמיתי ביפו', bg: 'linear-gradient(135deg, #C62828 0%, #E53935 100%)', shadow: 'rgba(198,40,40,0.45)', label: 'פתח תפריט' },
      { href: '#store', icon: '🛒', title: 'חנות מקומית', sub: 'מוצרים מאומנים יפואים', bg: 'linear-gradient(135deg, #5D4037 0%, #8D6E63 100%)', shadow: 'rgba(93,64,55,0.45)', label: 'גלה' },
    ],
  },
  {
    id: 'community',
    icon: '💬',
    title: 'קהילה והטבות',
    desc: 'הצטרף, צבור נקודות וקבל פרסים שווים',
    accent: '#25D366',
    accentBg: 'linear-gradient(135deg, #128C7E, #25D366)',
    items: [
      { href: 'https://chat.whatsapp.com/BhnFkwONJd6DeA7KlwG1MC', external: true, icon: '💬', title: 'הצטרף לקהילה', sub: '10 נקודות במתנה', bg: 'linear-gradient(135deg, #128C7E 0%, #25D366 100%)', shadow: 'rgba(37,211,102,0.45)', label: 'הצטרף!' },
      { href: '#credits', icon: '🏅', title: 'הקרדיטים שלי', sub: 'איך צוברים והטבות', bg: 'linear-gradient(135deg, #C8A96E 0%, #E8D5A3 100%)', shadow: 'rgba(200,169,110,0.45)', label: 'גלה' },
      { href: '#community', icon: '👥', title: 'הקהילה שלנו', sub: 'מי אנחנו', bg: 'linear-gradient(135deg, #00838F 0%, #4DD0E1 100%)', shadow: 'rgba(0,131,143,0.45)', label: 'ראה' },
    ],
  },
  {
    id: 'info',
    icon: 'ℹ️',
    title: 'מידע ועזרה',
    desc: 'הכל מה שצריך לדעת על חפ"י',
    accent: '#1565C0',
    accentBg: 'linear-gradient(135deg, #1565C0, #42A5F5)',
    items: [
      { href: '#about', icon: '🏛️', title: 'על חפ"י', sub: 'מה זה ולמה', bg: 'linear-gradient(135deg, #1565C0 0%, #42A5F5 100%)', shadow: 'rgba(21,101,192,0.45)', label: 'גלה' },
      { href: '#faq', icon: '❓', title: 'שאלות נפוצות', sub: 'תשובות לכל שאלה', bg: 'linear-gradient(135deg, #6A1B9A 0%, #AB47BC 100%)', shadow: 'rgba(106,27,154,0.45)', label: 'פתח' },
      { href: '#contact', icon: '✉️', title: 'צור קשר', sub: 'שאל אותנו כל דבר', bg: 'linear-gradient(135deg, #00695C 0%, #26A69A 100%)', shadow: 'rgba(0,105,92,0.45)', label: 'צור קשר' },
    ],
  },
]

const STEPS = [
  { num: '1', icon: '👋', title: 'הירשם', desc: 'מספר טלפון + שם — וקבל 10 נקודות מתנה' },
  { num: '2', icon: '🎮', title: 'שחק', desc: 'בכל משחק שתרצה — צבור נקודות תוך כדי כיף' },
  { num: '3', icon: '🎁', title: 'הרוויח פרסים', desc: 'הצג נקודות לצוות חפ"י וקבל גלידה, פיצה ועוד!' },
]

function ActionTile({ a }) {
  return (
    <a
      href={a.href}
      target={a.external ? '_blank' : undefined}
      rel={a.external ? 'noreferrer' : undefined}
      className="group block rounded-3xl p-5 md:p-6 text-center transition-all duration-300 hover:-translate-y-2 active:scale-95"
      style={{
        background: a.bg,
        boxShadow: `0 10px 28px ${a.shadow}, 0 2px 8px rgba(44,26,14,0.15), inset 0 1px 0 rgba(255,255,255,0.35)`,
        border: '3px solid rgba(255,255,255,0.45)',
        textDecoration: 'none',
      }}
    >
      <div className="text-5xl md:text-6xl mb-2 transition-transform group-hover:scale-110"
        style={{ filter: 'drop-shadow(0 3px 8px rgba(0,0,0,0.3))' }}>
        {a.icon}
      </div>
      <div className="font-black text-lg md:text-xl mb-1"
        style={{ color: '#FFFFFF', textShadow: '0 2px 8px rgba(0,0,0,0.4)', fontFamily: 'Frank Ruhl Libre, serif' }}>
        {a.title}
      </div>
      <div className="text-xs md:text-sm mb-3 font-medium px-1"
        style={{ color: 'rgba(255,255,255,0.95)', textShadow: '0 1px 4px rgba(0,0,0,0.35)' }}>
        {a.sub}
      </div>
      <div className="inline-block py-2 px-5 rounded-full text-xs md:text-sm font-black"
        style={{ background: 'rgba(255,255,255,0.97)', color: '#2C1A0E', boxShadow: '0 2px 6px rgba(0,0,0,0.2)' }}>
        {a.label} ←
      </div>
    </a>
  )
}

function CategoryBlock({ cat }) {
  return (
    <div className="mb-12 last:mb-0">
      {/* Header */}
      <div className="flex items-center gap-4 mb-6">
        <div className="w-16 h-16 rounded-2xl flex items-center justify-center text-4xl flex-shrink-0"
          style={{ background: cat.accentBg, boxShadow: `0 8px 24px ${cat.accent}55, inset 0 1px 0 rgba(255,255,255,0.3)`, border: '2px solid rgba(255,255,255,0.4)' }}>
          {cat.icon}
        </div>
        <div className="text-right flex-1">
          <h3 className="text-2xl md:text-3xl font-black mb-0.5" style={{ color: cat.accent, fontFamily: 'Frank Ruhl Libre, serif' }}>
            {cat.title}
          </h3>
          <p className="text-sm md:text-base" style={{ color: '#6B4A00', opacity: 0.85 }}>{cat.desc}</p>
        </div>
        <div className="hidden md:block text-xs font-bold px-3 py-1 rounded-full flex-shrink-0"
          style={{ background: `${cat.accent}22`, color: cat.accent, border: `1px solid ${cat.accent}55` }}>
          {cat.items.length} פעולות
        </div>
      </div>

      {/* Divider */}
      <div className="h-1 rounded-full mb-6" style={{ background: `linear-gradient(90deg, transparent, ${cat.accent}88, transparent)` }} />

      {/* Tiles */}
      <div className={`grid gap-4 md:gap-5 ${cat.items.length === 4 ? 'grid-cols-2 md:grid-cols-4' : 'grid-cols-2 md:grid-cols-3'}`}>
        {cat.items.map(a => <ActionTile key={a.href + a.title} a={a} />)}
      </div>
    </div>
  )
}

export default function BigActions() {
  return (
    <section id="play" className="py-16 md:py-20"
      style={{ background: 'linear-gradient(180deg, rgba(255,250,235,0.95) 0%, rgba(245,237,214,0.95) 100%)' }}>
      <div className="max-w-6xl mx-auto px-4">

        {/* Page title */}
        <div className="text-center mb-12">
          <div className="inline-block mb-4 px-5 py-2 rounded-full text-sm font-bold border-2"
            style={{ color: '#8B5E00', borderColor: 'rgba(200,169,110,0.5)', background: 'rgba(255,255,255,0.7)' }}>
            👇 בחר במה תרצה להתחיל
          </div>
          <h2 className="text-4xl md:text-5xl font-black mb-3" style={{ color: '#8B5E00', fontFamily: 'Frank Ruhl Libre, serif' }}>
            מה בא לך לעשות היום? 🎉
          </h2>
          <p className="text-base md:text-lg" style={{ color: '#6B4A00' }}>
            {CATEGORIES.length} קטגוריות · {CATEGORIES.reduce((s, c) => s + c.items.length, 0)} פעולות — בחר ולך!
          </p>
        </div>

        {/* Quick-jump bar */}
        <div className="flex flex-wrap justify-center gap-2 mb-12 sticky top-[72px] z-30 py-3 rounded-2xl"
          style={{ background: 'rgba(255,250,235,0.92)', backdropFilter: 'blur(10px)', border: '1px solid rgba(200,169,110,0.25)' }}>
          {CATEGORIES.map(c => (
            <a key={c.id} href={`#cat-${c.id}`}
              className="px-4 py-2 rounded-full text-sm font-bold transition-all hover:scale-105 active:scale-95"
              style={{
                background: 'rgba(255,255,255,0.85)',
                color: c.accent,
                border: `2px solid ${c.accent}55`,
                textDecoration: 'none',
              }}>
              <span className="ml-1.5">{c.icon}</span>
              {c.title}
            </a>
          ))}
        </div>

        {/* All categories — stacked vertically */}
        {CATEGORIES.map(cat => (
          <div key={cat.id} id={`cat-${cat.id}`} style={{ scrollMarginTop: 140 }}>
            <CategoryBlock cat={cat} />
          </div>
        ))}

        {/* How it works — 3 simple steps */}
        <div className="text-center mb-8 mt-20">
          <div className="inline-block mb-3 px-4 py-1 rounded-full text-xs font-bold border-2"
            style={{ color: '#C4622D', borderColor: 'rgba(196,98,45,0.4)', background: 'rgba(255,255,255,0.7)' }}>
            ✨ כך זה עובד
          </div>
          <h3 className="text-2xl md:text-3xl font-black mb-2" style={{ color: '#8B5E00', fontFamily: 'Frank Ruhl Libre, serif' }}>
            3 צעדים פשוטים
          </h3>
        </div>

        <div className="grid md:grid-cols-3 gap-4">
          {STEPS.map((s, i) => (
            <div key={s.num}
              className="rounded-3xl p-6 text-center relative transition-all duration-300 hover:-translate-y-1"
              style={{
                background: 'rgba(255,252,245,0.95)',
                border: '3px solid rgba(200,169,110,0.5)',
                boxShadow: '0 6px 20px rgba(44,26,14,0.08)',
              }}>
              <div className="absolute -top-4 right-4 w-10 h-10 rounded-full flex items-center justify-center text-xl font-black"
                style={{ background: 'linear-gradient(135deg, #C4622D, #E8841C)', color: '#FFFFFF', boxShadow: '0 4px 12px rgba(196,98,45,0.4)' }}>
                {s.num}
              </div>
              <div className="text-5xl mb-3 mt-2">{s.icon}</div>
              <div className="font-black text-xl mb-2" style={{ color: '#8B5E00', fontFamily: 'Frank Ruhl Libre, serif' }}>
                {s.title}
              </div>
              <div className="text-sm leading-relaxed" style={{ color: '#2C1A0E' }}>
                {s.desc}
              </div>
              {i < STEPS.length - 1 && (
                <div className="hidden md:block absolute top-1/2 -left-3 text-3xl" style={{ color: '#C8A96E' }}>
                  ←
                </div>
              )}
            </div>
          ))}
        </div>

      </div>
    </section>
  )
}
