import { useState } from 'react'

const LOCATIONS = [
  {
    id: 'port', x: 145, y: 110, emoji: '⚓', label: 'נמל יפו', type: 'attraction', color: '#1E6B8A',
    desc: 'אחד הנמלים הפעילים הוותיקים בעולם — למעלה מ-4,000 שנות היסטוריה. הסמטאות נקראות על שם מזלות הגלגל. טיולי סירות, מסעדות ומוזיאון ימי.',
    hours: 'כל שעות היממה (מסעדות וחנויות: 09:00–22:00)', phone: '03-6037686', website: 'https://www.namalyafo.co.il', category: 'אטרקציה',
  },
  {
    id: 'clock', x: 420, y: 65, emoji: '🕐', label: 'מגדל השעון', type: 'landmark', color: '#C4622D',
    desc: 'נבנה בין 1900–1903 לציון יובל הכסף לשלטון הסולטן עבד אל-חמיד השני. יזמו אנשי העיר — יהודים, ערבים, ארמנים ומרוניטים יחד. ציון דרך מרכזי ביפו.',
    hours: 'מבנה חיצוני — פתוח תמיד', phone: '', website: '', category: 'ציון דרך',
  },
  {
    id: 'mosque', x: 505, y: 140, emoji: '🕌', label: 'מסגד מחמודיה', type: 'landmark', color: '#8B7355',
    desc: 'נבנה לראשונה ב-1730. הנוכחי נבנה ב-1812 ע"י מחמד אבו-נבוט, פחת עזה ויפו. עמודים מקיסריה ואשקלון. המסגד הגדול והחשוב ביותר ביפו.',
    hours: 'החצר נגישה. הכניסה לפנים — למוסלמים בלבד', phone: '', website: '', category: 'מורשת',
  },
  {
    id: 'kedumim', x: 295, y: 195, emoji: '🏛️', label: 'כיכר קדומים', type: 'attraction', color: '#C8A96E',
    desc: 'לב יפו העתיקה. מרכז ארכאולוגי עם שרידים מהתקופה ההלניסטית, הרומית והביזנטית. מרכז מבקרים תת-קרקעי "אגדות יפו". נוף עוצר נשימה לים.',
    hours: 'כיכר: כל שעות היממה | מרכז מבקרים — צור קשר', phone: '052-8680822', website: 'https://info.goisrael.com/en/kikar-kdumim', category: 'אטרקציה',
  },
  {
    id: 'androm', x: 110, y: 275, emoji: '🌊', label: 'סלע אנדרומדה', type: 'attraction', color: '#1E6B8A',
    desc: 'מסורת עתיקה בת 2,000 שנה מזהה את הסלע הזה עם אנדרומדה מהמיתולוגיה היוונית. יוסף בן מתתיהו (המאה ה-1) ופליניוס הזקן כתבו על הקשר. נוף ים-תיכוני מדהים.',
    hours: 'כל שעות היממה', phone: '', website: '', category: 'אטרקציה',
  },
  {
    id: 'ilana', x: 340, y: 275, emoji: '🎨', label: 'מוזיאון אילנה גור', type: 'gallery', color: '#8B2500',
    desc: 'נוסד ב-1995 ע"י האמנית אילנה גור בבית קרוואנסראי מהמאה ה-18. יותר מ-400 יצירות אמנות מרחבי העולם, עתיקות וקולקציות עיצוב. גן פסלים מרהיב עם נוף לים.',
    hours: 'א-ה 10:00–16:00 | ו 10:00–14:00 | ש 10:00–16:00', phone: '03-6837676', website: 'https://www.ilanagoormuseum.org', category: 'מוזיאון',
  },
  {
    id: 'simon', x: 200, y: 350, emoji: '🏠', label: 'בית שמעון הבורסקי', type: 'landmark', color: '#8B7355',
    desc: 'לפי ספר מעשי השליחים (פרק י\') כאן לן השליח פטרוס וראה את החזון שפתח את הנצרות לגויים — אחד הרגעים המשמעותיים בתולדות הנצרות. כבר בתחילת המאה ה-1.',
    hours: 'חיצוני — פתוח תמיד', phone: '', website: '', category: 'מורשת',
  },
  {
    id: 'zodiac', x: 390, y: 360, emoji: '⭐', label: 'סמטת המזלות', type: 'attraction', color: '#C8A96E',
    desc: '12 סמטאות בנמל יפו הנקראות על שם מזלות הגלגל — מזל דגים, מזל טלה, מזל שור ועוד. לפי האמונה הפופולרית — כל מפגש בסמטאות הוא גורל. נקודה צילומית מושלמת.',
    hours: 'כל שעות היממה', phone: '', website: '', category: 'אטרקציה',
  },
  {
    id: 'flea', x: 585, y: 310, emoji: '🛍️', label: 'שוק הפשפשים', type: 'market', color: '#C4622D',
    desc: 'שוק וינטאג\' ועתיקות מפורסם בסמטאות יפו הדרומית. מאות דוכנים: ריהוט ישן, תקליטים, תכשיטים ויודאיקה. האזור הסובב מלא בגלריות, ברים וקפות.',
    hours: 'א-ה 09:00–17:00 | ו 09:00–14:00 | שבת — סגור', phone: '052-4734028', website: 'https://en.shuktlv.co.il', category: 'שוק',
  },
  {
    id: 'kalamata', x: 310, y: 170, emoji: '🍽️', label: 'מסעדת קלמאטה', type: 'restaurant', color: '#2E7D32',
    desc: 'מסעדה ים-תיכונית בבניין אבן עתיק בכיכר קדומים. מטבח יווני-קפריסאי-ים-תיכוני. דגים טריים, מזה ופירות ים. מרפסת עם נוף לים. שף רועי גנחולה.',
    hours: 'א-ד 17:00 עד האורח האחרון | ה-ש 12:00 עד האורח האחרון', phone: '03-6819998', website: 'https://www.kalamata.co.il', category: 'מסעדה',
  },
  {
    id: 'shakshuka', x: 540, y: 380, emoji: '🍳', label: 'ד"ר שקשוקה', type: 'restaurant', color: '#E65100',
    desc: 'מוסד קולינרי יפואי מ-1991. המייסד זלאטקו ביטון הביא את השקשוקה כמאכל ראשי. ממוקם בשוק הפשפשים, ידוע ברחבי ישראל. אוזי הביטון מנהל היום.',
    hours: 'א-ה 08:00–22:00 | ו 08:00–15:00 | ש 09:00–22:00', phone: '03-6822842', website: '', category: 'מסעדה',
  },
  {
    id: 'oldman', x: 140, y: 410, emoji: '🐟', label: 'הזקן והים', type: 'restaurant', color: '#1B5E20',
    desc: 'מסעדת דגים ומזה ערבית מ-1999, ייסד יונס עלי. 20+ סלטים, דגים טריים. ללא הזמנות — מחכים בתור. ללא אלכוהול. פופולרית מאוד בסופי שבוע. שני סניפים.',
    hours: 'יום-יום 11:00–22:00 (שני סניפים: רחוב קדם 85 + נמל יפו)', phone: '03-6818699', website: 'https://hazakenvehayam.co.il', category: 'מסעדה',
  },
]

const FILTERS = [
  { key: 'all', label: 'הכל', emoji: '🗺️' },
  { key: 'restaurant', label: 'אוכל', emoji: '🍽️' },
  { key: 'gallery', label: 'גלריות', emoji: '🎨' },
  { key: 'attraction', label: 'אטרקציות', emoji: '🏛️' },
  { key: 'market', label: 'שוק', emoji: '🛍️' },
  { key: 'landmark', label: 'מורשת', emoji: '🕌' },
]

export default function VenueMap() {
  const [active, setActive] = useState(null)
  const [filter, setFilter] = useState('all')

  const selected = active ? LOCATIONS.find(l => l.id === active) : null

  return (
    <section id="map" className="py-24" style={{ background: 'linear-gradient(180deg, #060d18 0%, #0D1B2A 100%)' }}>
      <div className="max-w-7xl mx-auto px-4">
        <div className="text-center mb-10">
          <div className="inline-block mb-4 px-4 py-1 rounded-full text-xs border"
            style={{ color: 'var(--gold)', borderColor: 'rgba(200,169,110,0.3)', background: 'rgba(200,169,110,0.06)' }}>
            🗺️ מפת המתחם האינטראקטיבית
          </div>
          <h2 className="section-title">יפו העתיקה — מפת הנקודות</h2>
          <div className="gold-divider" />
          <p className="section-subtitle">לחץ על כל נקודה לפרטים מלאים, שעות ומספר טלפון אמיתיים</p>
        </div>

        {/* Filters */}
        <div className="flex flex-wrap justify-center gap-2 mb-8">
          {FILTERS.map(f => (
            <button key={f.key} onClick={() => setFilter(f.key)}
              className="px-4 py-2 rounded-full text-sm font-medium transition-all"
              style={{
                background: filter === f.key ? 'var(--gold)' : 'rgba(200,169,110,0.1)',
                color: filter === f.key ? 'var(--navy)' : 'var(--gold-light)',
                border: '1px solid rgba(200,169,110,0.3)',
              }}>
              {f.emoji} {f.label}
            </button>
          ))}
        </div>

        <div className="flex flex-col xl:flex-row gap-6 items-start">
          {/* SVG Map */}
          <div className="relative flex-1 rounded-3xl overflow-hidden"
            style={{ border: '2px solid rgba(200,169,110,0.3)', background: '#0a1520', minHeight: 480 }}>
            <img
              src="https://images.pexels.com/photos/5259593/pexels-photo-5259593.jpeg?w=800&q=60"
              alt="יפו" className="absolute inset-0 w-full h-full object-cover opacity-15" />

            <svg viewBox="0 0 720 500" className="w-full relative z-10"
              style={{ fontFamily: 'Rubik, sans-serif', direction: 'rtl', minHeight: 320 }}>
              <defs>
                <pattern id="seaWave" x="0" y="0" width="40" height="20" patternUnits="userSpaceOnUse">
                  <path d="M0 10 Q10 0 20 10 Q30 20 40 10" fill="none" stroke="rgba(30,107,138,0.3)" strokeWidth="1.5" />
                </pattern>
              </defs>

              {/* Sea */}
              <rect x="0" y="0" width="105" height="500" fill="rgba(30,107,138,0.12)" />
              <rect x="0" y="0" width="105" height="500" fill="url(#seaWave)" />
              <text x="52" y="250" textAnchor="middle" fill="rgba(30,107,138,0.55)" fontSize="11" transform="rotate(-90,52,250)">ים תיכון</text>

              {/* Streets */}
              <g stroke="rgba(200,169,110,0.25)" strokeWidth="2" fill="none">
                <line x1="390" y1="30" x2="390" y2="470" />        {/* רחוב יפת */}
                <line x1="105" y1="180" x2="650" y2="180" />       {/* רחוב העלייה */}
                <line x1="390" y1="280" x2="600" y2="370" />       {/* לשוק */}
                <line x1="105" y1="130" x2="250" y2="130" />       {/* לנמל */}
                <line x1="480" y1="280" x2="650" y2="280" />       {/* שוק */}
                <line x1="650" y1="180" x2="650" y2="420" />
              </g>
              <text x="392" y="488" fill="rgba(200,169,110,0.35)" fontSize="9.5">רחוב יפת</text>
              <text x="200" y="173" fill="rgba(200,169,110,0.35)" fontSize="9.5">רחוב העלייה השנייה</text>

              {/* Coastline */}
              <path d="M105 30 Q95 150 90 280 Q93 380 105 470" fill="none" stroke="rgba(30,107,138,0.45)" strokeWidth="2" />

              {/* Pins */}
              {LOCATIONS.map(loc => {
                const vis = filter === 'all' || loc.type === filter
                const isAct = active === loc.id
                return (
                  <g key={loc.id} className="map-pin" onClick={() => setActive(isAct ? null : loc.id)}
                    style={{ opacity: vis ? 1 : 0.15, cursor: 'pointer' }}>
                    {isAct && (
                      <circle cx={loc.x} cy={loc.y} r="26" fill="none" stroke={loc.color}
                        strokeWidth="2" opacity="0.4" style={{ animation: 'pulse-ring 2s infinite' }} />
                    )}
                    <circle cx={loc.x} cy={loc.y} r={isAct ? 20 : 16}
                      fill={isAct ? loc.color : 'rgba(10,21,32,0.92)'}
                      stroke={loc.color} strokeWidth={isAct ? 3 : 2} />
                    <text x={loc.x} y={loc.y + 5} textAnchor="middle" fontSize={isAct ? 14 : 12}>{loc.emoji}</text>
                    <text x={loc.x} y={loc.y + 32} textAnchor="middle"
                      fill={isAct ? loc.color : 'rgba(240,230,211,0.75)'}
                      fontSize="9" fontWeight={isAct ? '700' : '400'}>
                      {loc.label}
                    </text>
                  </g>
                )
              })}

              {/* Compass */}
              <g transform="translate(685,28)">
                <circle cx="0" cy="0" r="18" fill="rgba(10,21,32,0.85)" stroke="rgba(200,169,110,0.4)" strokeWidth="1.5" />
                <text x="0" y="-5" textAnchor="middle" fill="var(--gold)" fontSize="9" fontWeight="700">צ</text>
                <line x1="0" y1="-3" x2="0" y2="-13" stroke="var(--gold)" strokeWidth="2" />
                <text x="0" y="14" textAnchor="middle" fill="rgba(200,169,110,0.4)" fontSize="8">ד</text>
              </g>
            </svg>
          </div>

          {/* Info panel */}
          <div className="xl:w-80 flex-shrink-0">
            {selected ? (
              <div key={selected.id} className="card fade-in text-right" style={{ borderColor: selected.color + '55' }}>
                <div className="flex items-start gap-3 mb-4">
                  <span className="text-4xl flex-shrink-0">{selected.emoji}</span>
                  <div>
                    <div className="font-black text-xl leading-tight"
                      style={{ color: selected.color, fontFamily: 'Frank Ruhl Libre, serif' }}>
                      {selected.label}
                    </div>
                    <span className="text-xs px-2 py-0.5 rounded-full inline-block mt-1"
                      style={{ background: selected.color + '22', color: selected.color }}>
                      {selected.category}
                    </span>
                  </div>
                </div>

                <p className="text-sm leading-relaxed mb-5 opacity-85" style={{ color: 'var(--parchment)' }}>
                  {selected.desc}
                </p>

                <div className="space-y-2 text-sm mb-5">
                  <div className="flex items-start gap-2" style={{ color: 'var(--gold-light)' }}>
                    <span className="flex-shrink-0">🕐</span>
                    <span className="opacity-75 text-xs leading-relaxed">{selected.hours}</span>
                  </div>
                  {selected.phone && (
                    <div className="flex items-center gap-2" style={{ color: 'var(--gold-light)' }}>
                      <span>📞</span>
                      <a href={`tel:${selected.phone}`} style={{ color: 'var(--gold)' }} className="font-medium">
                        {selected.phone}
                      </a>
                    </div>
                  )}
                  {selected.website && (
                    <div className="flex items-center gap-2" style={{ color: 'var(--gold-light)' }}>
                      <span>🌐</span>
                      <a href={selected.website} target="_blank" rel="noreferrer"
                        style={{ color: 'var(--gold)' }} className="text-xs underline">
                        לאתר הרשמי
                      </a>
                    </div>
                  )}
                </div>

                <div className="flex gap-2">
                  <a href={`https://waze.com/ul?q=${encodeURIComponent(selected.label + ' יפו')}`}
                    target="_blank" rel="noreferrer" className="btn-outline py-2 px-3 text-xs flex-1 justify-center">
                    📍 ניווט
                  </a>
                  <button onClick={() => setActive(null)} className="btn-gold py-2 px-4 text-xs">✕</button>
                </div>
              </div>
            ) : (
              <div className="card text-center py-10">
                <div className="text-5xl mb-4">👆</div>
                <p className="font-bold mb-2" style={{ color: 'var(--gold)' }}>לחץ על נקודה במפה</p>
                <p className="text-sm opacity-60 mb-6" style={{ color: 'var(--parchment)' }}>
                  פרטים אמיתיים, שעות פתיחה, טלפון וניווט
                </p>
                <div className="space-y-2 text-right">
                  {LOCATIONS.slice(0, 5).map(l => (
                    <button key={l.id} onClick={() => setActive(l.id)}
                      className="w-full flex items-center gap-3 px-3 py-2 rounded-xl text-sm transition-all hover:opacity-80"
                      style={{ background: 'rgba(200,169,110,0.06)', border: '1px solid rgba(200,169,110,0.12)' }}>
                      <span>{l.emoji}</span>
                      <span style={{ color: 'var(--gold-light)' }}>{l.label}</span>
                      <span className="mr-auto text-xs opacity-50" style={{ color: 'var(--gold)' }}>{l.category}</span>
                    </button>
                  ))}
                  <p className="text-xs opacity-35 text-center pt-1" style={{ color: 'var(--gold-light)' }}>
                    ועוד {LOCATIONS.length - 5} מקומות...
                  </p>
                </div>
              </div>
            )}

            {/* Legend */}
            <div className="card mt-4 text-right">
              <h4 className="font-bold mb-3 text-sm" style={{ color: 'var(--gold)' }}>מקרא</h4>
              <div className="space-y-1.5">
                {[
                  { c: '#1B5E20', label: 'מסעדות' },
                  { c: '#E65100', label: 'קפה ואוכל רחוב' },
                  { c: '#8B2500', label: 'גלריות ומוזיאונים' },
                  { c: '#C8A96E', label: 'אטרקציות תיירותיות' },
                  { c: '#C4622D', label: 'שווקים' },
                  { c: '#8B7355', label: 'אתרי מורשת' },
                  { c: '#1E6B8A', label: 'ים ונמל' },
                ].map(i => (
                  <div key={i.label} className="flex items-center gap-2 text-xs" style={{ color: 'var(--gold-light)' }}>
                    <div className="w-3 h-3 rounded-full flex-shrink-0" style={{ background: i.c }} />
                    {i.label}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
