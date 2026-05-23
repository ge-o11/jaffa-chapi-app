import { useState, useEffect } from 'react'
import { MapContainer, TileLayer, Marker, useMap } from 'react-leaflet'
import L from 'leaflet'
import 'leaflet/dist/leaflet.css'

const LOCATIONS = [
  {
    id: 'port', lat: 32.0512, lng: 34.7496, emoji: '⚓', label: 'נמל יפו', type: 'attraction', color: '#1E6B8A',
    desc: 'אחד הנמלים הפעילים הוותיקים בעולם — למעלה מ-4,000 שנות היסטוריה. הסמטאות נקראות על שם מזלות הגלגל. טיולי סירות, מסעדות ומוזיאון ימי.',
    hours: 'כל שעות היממה (מסעדות וחנויות: 09:00–22:00)', phone: '03-6037686', website: 'https://www.namalyafo.co.il', category: 'אטרקציה',
  },
  {
    id: 'clock', lat: 32.0536, lng: 34.7521, emoji: '🕐', label: 'מגדל השעון', type: 'landmark', color: '#1A6B8A',
    desc: 'נבנה בין 1900–1903 לציון יובל הכסף לשלטון הסולטן עבד אל-חמיד השני. יזמו אנשי העיר — יהודים, ערבים, ארמנים ומרוניטים יחד. ציון דרך מרכזי ביפו.',
    hours: 'מבנה חיצוני — פתוח תמיד', phone: '', website: '', category: 'ציון דרך',
  },
  {
    id: 'mosque', lat: 32.0542, lng: 34.7532, emoji: '🕌', label: 'מסגד מחמודיה', type: 'landmark', color: '#8B7355',
    desc: 'נבנה לראשונה ב-1730. הנוכחי נבנה ב-1812 ע"י מחמד אבו-נבוט, פחת עזה ויפו. עמודים מקיסריה ואשקלון. המסגד הגדול והחשוב ביותר ביפו.',
    hours: 'החצר נגישה. הכניסה לפנים — למוסלמים בלבד', phone: '', website: '', category: 'מורשת',
  },
  {
    id: 'kedumim', lat: 32.0522, lng: 34.7505, emoji: '🏛️', label: 'כיכר קדומים', type: 'attraction', color: '#C8A96E',
    desc: 'לב יפו העתיקה. מרכז ארכאולוגי עם שרידים מהתקופה ההלניסטית, הרומית והביזנטית. מרכז מבקרים תת-קרקעי "אגדות יפו". נוף עוצר נשימה לים.',
    hours: 'כיכר: כל שעות היממה | מרכז מבקרים — צור קשר', phone: '052-8680822', website: 'https://info.goisrael.com/en/kikar-kdumim', category: 'אטרקציה',
  },
  {
    id: 'androm', lat: 32.0503, lng: 34.7481, emoji: '🌊', label: 'סלע אנדרומדה', type: 'attraction', color: '#1E6B8A',
    desc: 'מסורת עתיקה בת 2,000 שנה מזהה את הסלע הזה עם אנדרומדה מהמיתולוגיה היוונית. יוסף בן מתתיהו ופליניוס הזקן כתבו על הקשר. נוף ים-תיכוני מדהים.',
    hours: 'כל שעות היממה', phone: '', website: '', category: 'אטרקציה',
  },
  {
    id: 'ilana', lat: 32.0518, lng: 34.7499, emoji: '🎨', label: 'מוזיאון אילנה גור', type: 'gallery', color: '#8B2500',
    desc: 'נוסד ב-1995 ע"י האמנית אילנה גור בבית קרוואנסראי מהמאה ה-18. יותר מ-400 יצירות אמנות מרחבי העולם, עתיקות וקולקציות עיצוב. גן פסלים מרהיב עם נוף לים.',
    hours: 'א-ה 10:00–16:00 | ו 10:00–14:00 | ש 10:00–16:00', phone: '03-6837676', website: 'https://www.ilanagoormuseum.org', category: 'מוזיאון',
  },
  {
    id: 'simon', lat: 32.0495, lng: 34.7513, emoji: '🏠', label: 'בית שמעון הבורסקי', type: 'landmark', color: '#8B7355',
    desc: 'לפי ספר מעשי השליחים (פרק י׳) כאן לן השליח פטרוס וראה את החזון שפתח את הנצרות לגויים — אחד הרגעים המשמעותיים בתולדות הנצרות.',
    hours: 'חיצוני — פתוח תמיד', phone: '', website: '', category: 'מורשת',
  },
  {
    id: 'zodiac', lat: 32.0511, lng: 34.7497, emoji: '⭐', label: 'סמטת המזלות', type: 'attraction', color: '#C8A96E',
    desc: '12 סמטאות בנמל יפו הנקראות על שם מזלות הגלגל — מזל דגים, מזל טלה, מזל שור ועוד. לפי האמונה הפופולרית — כל מפגש בסמטאות הוא גורל.',
    hours: 'כל שעות היממה', phone: '', website: '', category: 'אטרקציה',
  },
  {
    id: 'flea', lat: 32.0558, lng: 34.7524, emoji: '🛍️', label: 'שוק הפשפשים', type: 'market', color: '#1A6B8A',
    desc: 'שוק וינטאג׳ ועתיקות מפורסם בסמטאות יפו הדרומית. מאות דוכנים: ריהוט ישן, תקליטים, תכשיטים ויודאיקה. האזור הסובב מלא בגלריות, ברים וקפות.',
    hours: 'א-ה 09:00–17:00 | ו 09:00–14:00 | שבת — סגור', phone: '052-4734028', website: 'https://en.shuktlv.co.il', category: 'שוק',
  },
  {
    id: 'kalamata', lat: 32.0524, lng: 34.7508, emoji: '🍽️', label: 'מסעדת קלמאטה', type: 'restaurant', color: '#2E7D32',
    desc: 'מסעדה ים-תיכונית בבניין אבן עתיק בכיכר קדומים. מטבח יווני-קפריסאי-ים-תיכוני. דגים טריים, מזה ופירות ים. מרפסת עם נוף לים.',
    hours: 'א-ד 17:00 עד האורח האחרון | ה-ש 12:00 עד האורח האחרון', phone: '03-6819998', website: 'https://www.kalamata.co.il', category: 'מסעדה',
  },
  {
    id: 'shakshuka', lat: 32.0556, lng: 34.7523, emoji: '🍳', label: 'ד"ר שקשוקה', type: 'restaurant', color: '#E65100',
    desc: 'מוסד קולינרי יפואי מ-1991. המייסד זלאטקו ביטון הביא את השקשוקה כמאכל ראשי. ממוקם בשוק הפשפשים, ידוע ברחבי ישראל.',
    hours: 'א-ה 08:00–22:00 | ו 08:00–15:00 | ש 09:00–22:00', phone: '03-6822842', website: '', category: 'מסעדה',
  },
  {
    id: 'oldman', lat: 32.0508, lng: 34.7490, emoji: '🐟', label: 'הזקן והים', type: 'restaurant', color: '#1B5E20',
    desc: 'מסעדת דגים ומזה ערבית מ-1999. 20+ סלטים, דגים טריים. ללא הזמנות — מחכים בתור. ללא אלכוהול. פופולרית מאוד בסופי שבוע.',
    hours: 'יום-יום 11:00–22:00 (רחוב קדם 85 + נמל יפו)', phone: '03-6818699', website: 'https://hazakenvehayam.co.il', category: 'מסעדה',
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

function makeIcon(emoji, color, active) {
  const size = active ? 44 : 36
  return L.divIcon({
    html: `<div style="
      background:${color};
      border:${active ? '3px' : '2px'} solid ${active ? '#fff' : 'rgba(255,255,255,0.7)'};
      border-radius:50%;
      width:${size}px;height:${size}px;
      display:flex;align-items:center;justify-content:center;
      font-size:${active ? 22 : 18}px;
      box-shadow:${active ? '0 0 0 4px ' + color + '55, 0 4px 16px rgba(0,0,0,0.6)' : '0 2px 8px rgba(0,0,0,0.5)'};
      transition:all 0.2s;
      cursor:pointer;
    ">${emoji}</div>`,
    className: '',
    iconSize: [size, size],
    iconAnchor: [size / 2, size / 2],
  })
}

function FlyTo({ lat, lng }) {
  const map = useMap()
  useEffect(() => {
    map.flyTo([lat, lng], 18, { duration: 0.7 })
  }, [lat, lng, map])
  return null
}

export default function VenueMap() {
  const [active, setActive] = useState(null)
  const [filter, setFilter] = useState('all')

  const selected = active ? LOCATIONS.find(l => l.id === active) : null
  const visible = LOCATIONS.filter(l => filter === 'all' || l.type === filter)

  return (
    <section id="map" className="py-24" style={{ background: 'linear-gradient(180deg, rgba(245,237,214,0.92) 0%, rgba(237,224,196,0.92) 100%)' }}>
      <style>{`
        .leaflet-container { border-radius: 1.5rem; background: #f5edd6; }
        .leaflet-control-attribution { font-size: 9px !important; opacity: 0.55; background: rgba(255,250,235,0.85) !important; }
        .leaflet-control-zoom a { background: rgba(255,250,235,0.95) !important; color: #0D3A56 !important; border-color: rgba(74,157,184,0.4) !important; font-weight: bold; }
        .leaflet-control-zoom a:hover { background: var(--gold) !important; color: #fff !important; }
      `}</style>

      <div className="max-w-7xl mx-auto px-4">
        <div className="text-center mb-10">
          <div className="inline-block mb-4 px-4 py-1 rounded-full text-xs border"
            style={{ color: 'var(--gold)', borderColor: 'rgba(74,157,184,0.3)', background: 'rgba(74,157,184,0.06)' }}>
            🗺️ מפת המתחם האינטראקטיבית
          </div>
          <h2 className="section-title">יפו העתיקה — מפת הנקודות</h2>
          <div className="gold-divider" />
          <p className="section-subtitle">לחצו על כל נקודה לפרטים מלאים, שעות ומספר טלפון אמיתיים</p>
        </div>

        {/* Filters */}
        <div className="flex flex-wrap justify-center gap-2 mb-8">
          {FILTERS.map(f => (
            <button key={f.key} onClick={() => setFilter(f.key)}
              className="px-4 py-2 rounded-full text-sm font-medium transition-all"
              style={{
                background: filter === f.key ? 'var(--gold)' : 'rgba(74,157,184,0.1)',
                color: filter === f.key ? 'var(--navy)' : 'var(--gold-light)',
                border: '1px solid rgba(74,157,184,0.3)',
              }}>
              {f.emoji} {f.label}
            </button>
          ))}
        </div>

        <div className="flex flex-col xl:flex-row gap-6 items-start">
          {/* Real Leaflet Map */}
          <div className="relative flex-1 rounded-3xl overflow-hidden"
            style={{ border: '2px solid rgba(74,157,184,0.3)', minHeight: 480 }}>
            <MapContainer
              center={[32.0522, 34.7505]}
              zoom={16}
              style={{ height: 480, width: '100%' }}
              zoomControl={true}
              scrollWheelZoom={false}
            >
              <TileLayer
                url="https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png"
                attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> &copy; <a href="https://carto.com/attributions">CARTO</a>'
                maxZoom={19}
              />

              {visible.map(loc => (
                <Marker
                  key={loc.id}
                  position={[loc.lat, loc.lng]}
                  icon={makeIcon(loc.emoji, loc.color, active === loc.id)}
                  eventHandlers={{
                    click: () => setActive(active === loc.id ? null : loc.id),
                  }}
                />
              ))}

              {selected && (
                <FlyTo key={selected.id} lat={selected.lat} lng={selected.lng} />
              )}
            </MapContainer>
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
                    target="_blank" rel="noreferrer"
                    className="btn-outline py-2 px-3 text-xs flex-1 text-center">
                    📍 ניווט ב-Waze
                  </a>
                  <button onClick={() => setActive(null)} className="btn-gold py-2 px-4 text-xs">✕</button>
                </div>
              </div>
            ) : (
              <div className="card text-center py-10">
                <div className="text-5xl mb-4">👆</div>
                <p className="font-bold mb-2" style={{ color: 'var(--gold)' }}>לחצו על נקודה במפה</p>
                <p className="text-sm opacity-60 mb-6" style={{ color: 'var(--parchment)' }}>
                  פרטים אמיתיים, שעות פתיחה, טלפון וניווט
                </p>
                <div className="space-y-2 text-right">
                  {LOCATIONS.slice(0, 5).map(l => (
                    <button key={l.id} onClick={() => setActive(l.id)}
                      className="w-full flex items-center gap-3 px-3 py-2 rounded-xl text-sm transition-all hover:opacity-80"
                      style={{ background: 'rgba(74,157,184,0.06)', border: '1px solid rgba(74,157,184,0.12)' }}>
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
                  { c: '#1A6B8A', label: 'שווקים' },
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
