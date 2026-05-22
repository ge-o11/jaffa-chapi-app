import { useState } from 'react'
import { useUser } from '../context/UserContext'

const TARGETS = [
  {
    id: 1,
    icon: '🚪',
    title: 'דלת עץ כחולה',
    desc: 'צלם דלת עץ ישנה צבועה כחול — יש עשרות ברחובות הצרים של יפו',
    location: 'סמטת יונה / רחוב אמנים',
    pts: 2,
    hint: 'חפש בצד הדרומי של שוק הפשפשים',
  },
  {
    id: 2,
    icon: '🐈',
    title: 'חתול על חומה',
    desc: 'צלם חתול יושב על חומת אבן — יפו ידועה באלפי חתוליה הרחוב',
    location: 'כל רחוב ביפו העתיקה',
    pts: 1,
    hint: 'הכי קל למצוא ליד שוק הפשפשים בבוקר',
  },
  {
    id: 3,
    icon: '🔤',
    title: 'שלט בערבית',
    desc: 'צלם כיתוב בערבית מעל חנות או בית',
    location: 'רחוב ירושלים / שוק הפשפשים',
    pts: 2,
    hint: 'חפש בחנויות הוותיקות של השוק',
  },
  {
    id: 4,
    icon: '🌊',
    title: 'נוף לים',
    desc: 'צלם את הים התיכון — מהנמל, הטיילת או מרפסת גבוהה',
    location: 'נמל יפו / טיילת צ׳ארלס קלור',
    pts: 2,
    hint: 'השעה הכי יפה — שעה לפני השקיעה',
  },
  {
    id: 5,
    icon: '🏛️',
    title: 'עמוד אבן עתיק',
    desc: 'צלם שריד אדריכלי עתיק — קשת, עמוד או אבן מגולפת',
    location: 'כיכר קדומים / סמטת המזלות',
    pts: 3,
    hint: 'כיכר קדומים — ממש בכניסה יש עמוד רומי',
  },
  {
    id: 6,
    icon: '🕌',
    title: 'כיפה של מסגד',
    desc: 'צלם את הכיפה הירוקה של מסגד מחמודיה בשמיים',
    location: 'מסגד מחמודיה, רחוב ירושלים',
    pts: 2,
    hint: 'הכי יפה מזווית מדרום-מזרח',
  },
  {
    id: 7,
    icon: '🕰️',
    title: 'סלפי עם מגדל השעון',
    desc: 'צלם סלפי עם מגדל השעון העות׳מאני ברקע — הסמל של יפו',
    location: 'כיכר קדומים, כניסת יפו',
    pts: 3,
    hint: 'עמוד בצד המזרחי של הכיכר לרקע הכי נקי',
  },
  {
    id: 8,
    icon: '🪴',
    title: 'פרח בין אבנים',
    desc: 'צלם צמח או פרח שצמח בין אבני החומה — חיים מתוך היסטוריה',
    location: 'כל חומה עתיקה ביפו',
    pts: 2,
    hint: 'חפש ליד החומות ישמאל לכניסה לנמל',
  },
  {
    id: 9,
    icon: '⚓',
    title: 'עוגן ישן',
    desc: 'צלם עוגן ישן — יש כמה מוצבים לאורך הטיילת ובנמל',
    location: 'נמל יפו / טיילת הנמל',
    pts: 2,
    hint: 'ממש בכניסה לנמל יש עוגן ענק על הרצפה',
  },
  {
    id: 10,
    icon: '🌅',
    title: 'שקיעה על הנמל',
    desc: 'צלם שקיעה מעל ים יפו — אחת הנופים המרהיבים בישראל',
    location: 'נמל יפו / גשר הרצון',
    pts: 4,
    hint: 'שקיעה בכל עונה — כ-19:30 בקיץ, 16:30 בחורף',
  },
]

const TOTAL_PTS = TARGETS.reduce((s, t) => s + t.pts, 0)

function FlashOverlay({ visible }) {
  return (
    <div
      style={{
        position: 'fixed', inset: 0, background: 'white', zIndex: 9999,
        opacity: visible ? 0.85 : 0,
        pointerEvents: 'none',
        transition: 'opacity 0.08s ease',
      }}
    />
  )
}

export default function SelfieHunt() {
  const [done, setDone] = useState(new Set())
  const [flash, setFlash] = useState(false)
  const [lastCaptured, setLastCaptured] = useState(null)
  const [showCelebration, setShowCelebration] = useState(null)
  const [filter, setFilter] = useState('all')
  const { user, addPoints } = useUser()

  const totalEarned = [...done].reduce((s, id) => {
    const t = TARGETS.find(t => t.id === id)
    return s + (t ? t.pts : 0)
  }, 0)

  function capture(target) {
    if (done.has(target.id)) return
    setFlash(true)
    setTimeout(() => setFlash(false), 180)
    setLastCaptured(target)
    if (user) addPoints(target.pts)
    const next = new Set(done)
    next.add(target.id)
    setDone(next)
    if (next.size === 5 && !showCelebration) setShowCelebration('half')
    if (next.size === 10) setShowCelebration('full')
  }

  const visible = TARGETS.filter(t => {
    if (filter === 'open') return !done.has(t.id)
    if (filter === 'done') return done.has(t.id)
    return true
  })

  return (
    <section id="selfie-hunt" className="py-24" style={{ background: 'linear-gradient(180deg, rgba(245,237,214,0.95) 0%, rgba(237,224,196,0.92) 100%)' }}>
      <FlashOverlay visible={flash} />

      {showCelebration && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center"
          style={{ background: 'rgba(44,26,14,0.7)', backdropFilter: 'blur(8px)' }}
          onClick={() => setShowCelebration(null)}
        >
          <div className="card text-center p-10 max-w-sm mx-4" style={{ border: '2px solid var(--gold)' }}>
            <div className="text-6xl mb-4">{showCelebration === 'full' ? '🏆' : '🌟'}</div>
            <h3 className="text-2xl font-black mb-3" style={{ color: 'var(--gold)', fontFamily: 'Frank Ruhl Libre, serif' }}>
              {showCelebration === 'full' ? 'השלמת את הציד!' : 'חצי הדרך!'}
            </h3>
            <p className="mb-4" style={{ color: 'var(--parchment)' }}>
              {showCelebration === 'full'
                ? `צילמת את כל 10 היעדים ✅ הרווחת ${TOTAL_PTS} נקודות! הראה לצוות חפ״י לקבלת הפרס.`
                : 'צילמת 5 יעדים — המשך לשאר וקבל את הפרס הגדול!'}
            </p>
            <button
              className="btn-primary px-8 py-3"
              onClick={() => setShowCelebration(null)}
            >
              {showCelebration === 'full' ? 'סגור' : 'המשך לצוד!'}
            </button>
          </div>
        </div>
      )}

      <div className="max-w-7xl mx-auto px-4">
        {/* Header */}
        <div className="text-center mb-12">
          <h2 className="section-title">ציד הסלפי</h2>
          <div className="gold-divider"></div>
          <p className="section-subtitle">10 יעדים לצלם ביפו העתיקה — אסוף נקודות וקבל פרס</p>
        </div>

        {/* Progress bar */}
        <div className="max-w-2xl mx-auto mb-10">
          <div className="flex justify-between text-sm mb-2" style={{ color: 'var(--parchment)' }}>
            <span>{done.size} / {TARGETS.length} יעדים</span>
            <span className="font-bold" style={{ color: 'var(--gold)' }}>{totalEarned} / {TOTAL_PTS} נקודות</span>
          </div>
          <div className="rounded-full h-4 overflow-hidden" style={{ background: 'rgba(200,169,110,0.15)', border: '1px solid rgba(200,169,110,0.3)' }}>
            <div
              className="h-full rounded-full transition-all duration-500"
              style={{
                width: `${(done.size / TARGETS.length) * 100}%`,
                background: 'linear-gradient(90deg, var(--gold), var(--terracotta))',
              }}
            />
          </div>
          {done.size > 0 && done.size < 10 && (
            <p className="text-xs text-center mt-2 opacity-60" style={{ color: 'var(--parchment)' }}>
              עוד {TARGETS.length - done.size} יעדים לפרס הגדול
            </p>
          )}
        </div>

        {/* Last captured toast */}
        {lastCaptured && (
          <div
            className="max-w-sm mx-auto mb-8 rounded-2xl px-5 py-3 text-center text-sm font-bold"
            style={{ background: 'rgba(200,169,110,0.15)', border: '1px solid var(--gold)', color: 'var(--gold)' }}
          >
            📸 {lastCaptured.title} — +{lastCaptured.pts} נקודות!
          </div>
        )}

        {/* Filter tabs */}
        <div className="flex justify-center gap-3 mb-8">
          {[
            { key: 'all', label: 'הכל' },
            { key: 'open', label: `נותר (${TARGETS.length - done.size})` },
            { key: 'done', label: `צולם (${done.size})` },
          ].map(f => (
            <button
              key={f.key}
              onClick={() => setFilter(f.key)}
              className="px-5 py-2 rounded-full text-sm font-bold transition-all"
              style={{
                background: filter === f.key ? 'var(--gold)' : 'rgba(200,169,110,0.1)',
                color: filter === f.key ? 'var(--navy)' : 'var(--gold)',
                border: '1px solid rgba(200,169,110,0.4)',
              }}
            >
              {f.label}
            </button>
          ))}
        </div>

        {/* Target grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5 mb-14">
          {visible.map(target => {
            const captured = done.has(target.id)
            return (
              <div
                key={target.id}
                className="card text-right transition-all duration-300"
                style={{
                  opacity: captured ? 0.65 : 1,
                  border: captured ? '1px solid rgba(200,169,110,0.6)' : undefined,
                  position: 'relative',
                  overflow: 'hidden',
                }}
              >
                {captured && (
                  <div
                    className="absolute top-3 left-3 w-8 h-8 rounded-full flex items-center justify-center text-sm font-black"
                    style={{ background: 'var(--gold)', color: 'var(--navy)' }}
                  >
                    ✓
                  </div>
                )}

                <div className="flex items-start gap-3 mb-3">
                  <div className="text-4xl flex-shrink-0">{target.icon}</div>
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-1">
                      <span
                        className="text-xs px-2 py-0.5 rounded-full font-bold"
                        style={{ background: 'rgba(200,169,110,0.15)', color: 'var(--gold)', border: '1px solid rgba(200,169,110,0.3)' }}
                      >
                        +{target.pts} נק׳
                      </span>
                    </div>
                    <div className="font-bold text-base" style={{ color: 'var(--gold)', fontFamily: 'Frank Ruhl Libre, serif' }}>
                      {target.title}
                    </div>
                  </div>
                </div>

                <p className="text-sm leading-relaxed mb-2" style={{ color: 'var(--parchment)', opacity: 0.8 }}>
                  {target.desc}
                </p>

                <div className="flex items-center gap-1 text-xs mb-1" style={{ color: 'var(--sea)' }}>
                  <span>📍</span>
                  <span>{target.location}</span>
                </div>

                <details className="text-xs mb-4" style={{ color: 'var(--parchment)', opacity: 0.6 }}>
                  <summary className="cursor-pointer select-none" style={{ color: 'var(--gold)', opacity: 0.7 }}>
                    רמז 💡
                  </summary>
                  <p className="mt-1 pr-1">{target.hint}</p>
                </details>

                <button
                  onClick={() => capture(target)}
                  disabled={captured}
                  className="w-full py-2.5 rounded-xl font-bold text-sm transition-all"
                  style={{
                    background: captured
                      ? 'rgba(200,169,110,0.15)'
                      : 'linear-gradient(135deg, var(--gold), var(--terracotta))',
                    color: captured ? 'var(--gold)' : 'var(--navy)',
                    cursor: captured ? 'default' : 'pointer',
                    border: captured ? '1px solid rgba(200,169,110,0.3)' : 'none',
                  }}
                >
                  {captured ? '✅ צולם!' : '📸 צילמתי!'}
                </button>
              </div>
            )
          })}
        </div>

        {/* Reward tiers */}
        <div
          className="rounded-3xl p-8"
          style={{ background: 'linear-gradient(135deg, rgba(200,169,110,0.08), rgba(200,169,110,0.02))', border: '1px solid rgba(200,169,110,0.25)' }}
        >
          <h3 className="text-xl font-bold text-center mb-6" style={{ color: 'var(--gold)', fontFamily: 'Frank Ruhl Libre, serif' }}>
            🎁 מדרגות הפרסים
          </h3>
          <div className="grid md:grid-cols-3 gap-4">
            {[
              { needed: 3, icon: '🥉', title: '3 יעדים', reward: 'כוס קפה על הבית', pts: 6 },
              { needed: 5, icon: '🥈', title: '5 יעדים', reward: 'הנחה 15% בכל מסעדות חפ״י', pts: 11 },
              { needed: 10, icon: '🏆', title: 'כל 10 היעדים', reward: 'ארוחת שף זוגית + 22 נקודות', pts: TOTAL_PTS },
            ].map(tier => {
              const reached = done.size >= tier.needed
              return (
                <div
                  key={tier.needed}
                  className="card text-center"
                  style={{
                    border: reached ? '1px solid var(--gold)' : undefined,
                    opacity: reached ? 1 : 0.7,
                  }}
                >
                  <div className="text-4xl mb-2">{tier.icon}</div>
                  <div className="font-bold mb-1" style={{ color: 'var(--gold)' }}>{tier.title}</div>
                  <div className="text-sm mb-2" style={{ color: 'var(--parchment)', opacity: 0.8 }}>{tier.reward}</div>
                  {reached && (
                    <span className="text-xs px-3 py-1 rounded-full font-bold" style={{ background: 'var(--gold)', color: 'var(--navy)' }}>
                      הושג! ✓
                    </span>
                  )}
                </div>
              )
            })}
          </div>
          <p className="text-center text-xs mt-5 opacity-50" style={{ color: 'var(--parchment)' }}>
            * יש להציג את המסך לצוות חפ״י לאימות וקבלת הפרס
          </p>
        </div>
      </div>
    </section>
  )
}
