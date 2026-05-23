import { useState, useEffect } from 'react'

const STATIONS = [
  {
    id: 1,
    location: 'שער יפו',
    emoji: '🏛️',
    image: 'https://images.pexels.com/photos/27358616/pexels-photo-27358616.jpeg?w=600&q=80',
    riddle: 'כאן מתחיל המסע. שלוש שפות על קיר האבן — עברית, ערבית ואנגלית — מקבלות כל אורח. עצים ותיקים מסביב. סרוק את ה-QR שבשלט ותתחיל!',
    clue: '🕐 הצעד הבא: חפש מגדל שנבנה בין 1900–1903 לכבוד הסולטן העות\'מאני. שבעה כאלה נבנו בכל ארץ ישראל — ביפו הנמצא בלב הכיכר. כולם מתחנכים שם.',
    nextLocation: 'מגדל השעון',
    prize: '5 נקודות קרדיט',
    prizeEmoji: '🏅',
    points: 5,
    isCheckpoint: false,
  },
  {
    id: 2,
    location: 'מגדל השעון',
    emoji: '🕐',
    image: 'https://images.pexels.com/photos/18809479/pexels-photo-18809479.jpeg?w=600&q=80',
    riddle: 'נבנה בין 1900–1903 לציון יובל הכסף של הסולטן עבד אל-חמיד השני. מי שיזם את הבנייה: יוסף ביי מויאל — יהודי יפואי. מי ששילם: כל קהילות יפו יחד — יהודים, ערבים, ארמנים ומרוניטים.',
    clue: '🕌 הצעד הבא: מסגד גדול שנבנה ב-1812 על ידי הפחה מחמד אבו-נבוט. חלק מעמודיו הובאו מקיסריה ואשקלון העתיקות. מינרט גבוה נשקף מרחוק.',
    nextLocation: 'מסגד מחמודיה',
    prize: '10 נקודות קרדיט',
    prizeEmoji: '🏅',
    points: 10,
    isCheckpoint: false,
  },
  {
    id: 3,
    location: 'מסגד מחמודיה',
    emoji: '🕌',
    image: 'https://images.pexels.com/photos/17814820/pexels-photo-17814820.jpeg?w=600&q=80',
    riddle: 'המסגד הגדול והחשוב ביותר ביפו. נבנה לראשונה ב-1730, ואז נבנה מחדש ב-1812 ע"י מחמד אבו-נבוט פחת עזה ויפו. חלק מעמודיו הם עמודי שיש שנלקחו מחורבות קיסריה.',
    clue: '🏛️ הצעד הבא: עלה למקום הגבוה ביותר ביפו. כיכר עם שרידים ארכאולוגיים מהתקופה ההלניסטית, הרומית והביזנטית. תת-קרקעי מרתיח עם \'אגדות יפו\'.',
    nextLocation: 'כיכר קדומים',
    prize: '15 נקודות + משקה קר',
    prizeEmoji: '🥤',
    points: 15,
    isCheckpoint: false,
  },
  {
    id: 4,
    location: 'כיכר קדומים',
    emoji: '🏔️',
    image: 'https://images.pexels.com/photos/18809933/pexels-photo-18809933.jpeg?w=600&q=80',
    riddle: 'לב יפו העתיקה — כיכר קדומים. מתחתיה: שרידים מהתקופה ההלניסטית, הרומית והביזנטית. מרכז מבקרים תת-קרקעי "אגדות יפו" מספר את סיפור העיר. מכאן: נוף לים ולתל אביב.',
    clue: '⛪ הצעד הבא: כנסייה פרנציסקנית שנבנתה ב-1654, על שפת הגבעה. עולי רגל מרחבי העולם מגיעים אליה. מבנה בצבע אוקר עם מגדל פעמונים.',
    nextLocation: 'כנסיית סנט פיטר',
    prize: '20 נקודות קרדיט',
    prizeEmoji: '🏅',
    points: 20,
    isCheckpoint: false,
  },
  {
    id: 5,
    location: 'כנסיית סנט פיטר',
    emoji: '⛪',
    image: 'https://images.pexels.com/photos/13476812/pexels-photo-13476812.jpeg?w=600&q=80',
    riddle: 'כנסייה פרנציסקנית שנבנתה ב-1654 על שפת הגבעה הגבוהה של יפו. מצד אחד — גינה שקטה עם פסל. מצד שני — הים התיכון כולו. עולי רגל נוצרים מכל העולם מגיעים לכאן.',
    clue: '🤿 עצור! הגעת לנקודת ביקורת. ✅ הישג בטוח! ☕ קפה ועוגה חינמיים מחכים לך במסעדה הקרובה — הצג את המסך!',
    nextLocation: 'בית שמעון הבורסקי',
    prize: '☕ קפה + עוגה חינם!',
    prizeEmoji: '☕',
    points: 0,
    isCheckpoint: true,
    checkpointMsg: 'נקודת ביקורת! הגעת לתחנה 5 — הפרס שצברת עד כאן בטוח גם אם תפסיק.',
  },
  {
    id: 6,
    location: 'בית שמעון הבורסקי',
    emoji: '🏠',
    image: 'https://images.pexels.com/photos/5259593/pexels-photo-5259593.jpeg?w=600&q=80',
    riddle: 'בורסק = עיבוד עורות בערבית. לפי ספר מעשי השליחים (י\':ו) — השליח פטרוס לן כאן ימים רבים. כאן ראה את החזון שפתח את הנצרות לעמים לא-יהודים. אחד הרגעים המשמעותיים ביותר בתולדות הנצרות.',
    clue: '⚓ הצעד הבא: אחד הנמלים הפעילים הוותיקים בעולם — למעלה מ-4,000 שנה. לפי הכתובים — יונה ירד ממנו לים. עצי הארזים לבניין המקדש של שלמה עברו כאן. הסמטאות שם נקראות על שם מזלות.',
    nextLocation: 'נמל יפו',
    prize: '30 נקודות קרדיט',
    prizeEmoji: '🏅',
    points: 30,
    isCheckpoint: false,
  },
  {
    id: 7,
    location: 'נמל יפו',
    emoji: '⚓',
    image: 'https://images.unsplash.com/photo-1518728242875-50600dfbe31a?w=600&q=80',
    riddle: 'נמל יפו — אחד הנמלים הוותיקים ביותר בעולם (4,000+ שנה). לפי ספר יונה — מכאן ירד יונה לים. עצי ארזים ללבנון ממנו בנו את מקדש שלמה. נפוליאון כבש את יפו ב-1799. היום: מסעדות, גלריות ורינג הדייג.',
    clue: '🎨 הצעד הבא: 300 שנה ישן, 400 פסלים בפנים. מוזיאון שאוצרת בעצמה עד יומה האחרון. גלריה פרטית שהפכה לסמל יפו.',
    nextLocation: 'מוזיאון אילנה גור',
    prize: '40 נקודות קרדיט',
    prizeEmoji: '🏅',
    points: 40,
    isCheckpoint: false,
  },
  {
    id: 8,
    location: 'מוזיאון אילנה גור',
    emoji: '🎨',
    image: 'https://images.pexels.com/photos/30341997/pexels-photo-30341997.jpeg?w=600&q=80',
    riddle: 'נוסד ב-1995 ע"י אילנה גור — אחת מפסלות ישראל הגדולות. הבניין: קרוואנסראי (פונדק שיירות) מהמאה ה-18 עם נוף ישיר לים. למעלה מ-400 יצירות אמנות, עתיקות ועיצוב. כתובת: 4 מזל דגים, יפו. טל: 03-6837676.',
    clue: '🛍️ הצעד הבא: כל שישי אלפי אנשים — ישן הפך לחדש, עתיק הפך לאוצר. שוק כאוטי, ריחני ומרתק. תדע שהגעת כשתשמע את ההמולה.',
    nextLocation: 'שוק הפשפשים',
    prize: '50 נקודות קרדיט',
    prizeEmoji: '🏅',
    points: 50,
    isCheckpoint: false,
  },
  {
    id: 9,
    location: 'שוק הפשפשים',
    emoji: '🛍️',
    image: 'https://images.pexels.com/photos/31900164/pexels-photo-31900164.jpeg?w=600&q=80',
    riddle: 'שוק הפשפשים של יפו — פרח משנות ה-50. פתוח א-ה 09:00–17:00, ו עד 14:00. מאות דוכנים: עתיקות, וינטאג\', תכשיטים, יודאיקה. האזור הסובב מלא בגלריות עיצוב, ברים וקפות. אחד השווקים המעניינים בישראל.',
    clue: '⭐ הצעד הבא: 12 מזלות בסמטה אחת. כל מי שנפגש שם — זה גורל ולא מקרה. הסמטה הכי מצולמת ביפו. כולם מחפשים את המזל שלהם שם.',
    nextLocation: 'סמטת המזלות',
    prize: '🍽️ ארוחה זוגית בהנחה',
    prizeEmoji: '🍽️',
    points: 0,
    isCheckpoint: true,
    checkpointMsg: 'נקודת ביקורת 2! פרס ארוחה זוגית בהנחה בטוח — גם אם לא ממשיכים לתחנה האחרונה.',
  },
  {
    id: 10,
    location: 'סמטת המזלות',
    emoji: '⭐',
    image: 'https://images.pexels.com/photos/16276959/pexels-photo-16276959.jpeg?w=600&q=80',
    riddle: '12 סמטאות בנמל יפו, כל אחת נקראת על שם מזל: מזל דגים, מזל טלה, מזל שור, מזל תאומים... לפי האמונה העממית — כל מפגש בסמטאות אלה הוא גורל ולא מקרה. הנקודה הצילומית הכי מפורסמת ביפו — ידעת שהגעת.',
    clue: '🏆 הגעת! כל 10 תחנות הושלמו! סמטת המזלות היא הסוף המושלם למסע ביפו. הגש את המסך לצוות חפ"י וקבל את הפרס הגדול!',
    nextLocation: null,
    prize: '🏆 100 נקודות + ארוחה משפחתית חינם!',
    prizeEmoji: '🏆',
    points: 100,
    isCheckpoint: false,
  },
]

const PRIZE_LADDER = [
  { station: 10, label: '100 נק\' + ארוחה חינם!', emoji: '🏆', isCheckpoint: false, color: '#FFD700' },
  { station: 9,  label: 'ארוחה זוגית בהנחה',       emoji: '🍽️', isCheckpoint: true,  color: '#1A6B8A' },
  { station: 8,  label: '50 נקודות קרדיט',          emoji: '🏅', isCheckpoint: false, color: '#4A9DB8' },
  { station: 7,  label: '40 נקודות קרדיט',          emoji: '🏅', isCheckpoint: false, color: '#4A9DB8' },
  { station: 6,  label: '30 נקודות קרדיט',          emoji: '🏅', isCheckpoint: false, color: '#4A9DB8' },
  { station: 5,  label: '☕ קפה + עוגה חינם',       emoji: '☕', isCheckpoint: true,  color: '#1A6B8A' },
  { station: 4,  label: '20 נקודות קרדיט',          emoji: '🏅', isCheckpoint: false, color: '#4A9DB8' },
  { station: 3,  label: '15 נק\' + משקה קר',        emoji: '🥤', isCheckpoint: false, color: '#4A9DB8' },
  { station: 2,  label: '10 נקודות קרדיט',          emoji: '🏅', isCheckpoint: false, color: '#4A9DB8' },
  { station: 1,  label: '5 נקודות קרדיט',           emoji: '🏅', isCheckpoint: false, color: '#4A9DB8' },
]

export default function QRHuntGame() {
  const [phase, setPhase]           = useState('intro')   // intro | station | scanning | won | complete
  const [current, setCurrent]       = useState(0)         // station index 0-9
  const [scanProgress, setScanProg] = useState(0)
  const [lifelines, setLifelines]   = useState({ hint: 2, help: 1 })
  const [showClue, setShowClue]     = useState(false)
  const [showCheckpoint, setShowCP] = useState(false)
  const [confetti, setConfetti]     = useState([])

  const station = STATIONS[current]

  function startGame() {
    setCurrent(0)
    setPhase('station')
    setShowClue(false)
  }

  function startScan() {
    setPhase('scanning')
    setScanProg(0)
    const interval = setInterval(() => {
      setScanProg(p => {
        if (p >= 100) {
          clearInterval(interval)
          setTimeout(() => {
            setPhase('won')
            spawnConfetti()
            if (station.isCheckpoint) setShowCP(true)
          }, 300)
          return 100
        }
        return p + 3
      })
    }, 60)
  }

  function nextStation() {
    if (current >= STATIONS.length - 1) {
      setPhase('complete')
      spawnConfetti()
      return
    }
    setCurrent(c => c + 1)
    setPhase('station')
    setShowClue(false)
    setShowCP(false)
  }

  function spawnConfetti() {
    const items = Array.from({ length: 30 }, (_, i) => ({
      id: i,
      left: Math.random() * 100,
      color: ['#C8A96E','#E8D5A3','#1A6B8A','#25D366','#1E6B8A'][Math.floor(Math.random()*5)],
      delay: Math.random() * 1,
      size: 6 + Math.random() * 8,
    }))
    setConfetti(items)
    setTimeout(() => setConfetti([]), 3500)
  }

  function useHint() {
    if (lifelines.hint <= 0) return
    setLifelines(l => ({ ...l, hint: l.hint - 1 }))
    setShowClue(true)
  }

  const completedCount = phase === 'complete' ? 10 : (phase === 'won' ? current + 1 : current)

  return (
    <section id="game" className="py-24" style={{ background: 'linear-gradient(180deg, rgba(237,224,196,0.93) 0%, rgba(245,237,214,0.95) 60%, rgba(237,224,196,0.93) 100%)' }}>
      {/* Confetti */}
      {confetti.map(c => (
        <div key={c.id} style={{
          position: 'fixed', top: '-20px', left: c.left + '%',
          width: c.size, height: c.size,
          background: c.color, borderRadius: 2,
          animation: `confetti-fall ${1.5 + c.delay}s ease-in ${c.delay}s forwards`,
          zIndex: 9999, pointerEvents: 'none',
        }}/>
      ))}

      <div className="max-w-5xl mx-auto px-4">
        <div className="text-center mb-12">
          <div className="inline-block mb-4 px-4 py-1 rounded-full text-xs border"
            style={{ color:'var(--terra)', borderColor:'rgba(26,107,138,0.4)', background:'rgba(26,107,138,0.08)' }}>
            🎯 משחק אינטראקטיבי
          </div>
          <h2 className="section-title">מסע 10 התחנות ביפו</h2>
          <div className="gold-divider"></div>
          <p className="section-subtitle">סרוק QR בכל תחנה, פענח את הרמז, הגע לבאה — וזכה בפרסים אמיתיים!</p>
        </div>

        {/* ── INTRO ── */}
        {phase === 'intro' && (
          <div className="game-container p-6 md:p-12 text-center fade-in">
            <div className="text-7xl mb-6">🏴‍☠️</div>
            <h3 className="text-4xl font-black mb-4" style={{ color:'var(--gold)', fontFamily:'Frank Ruhl Libre, serif' }}>
              מסע האלפים ביפו
            </h3>
            <p className="text-xl mb-3" style={{ color:'var(--gold-light)' }}>10 תחנות. 10 רמזים. פרסים אמיתיים בסוף.</p>
            <p className="mb-10 opacity-60 max-w-xl mx-auto" style={{ color:'var(--parchment)' }}>
              בכל תחנה ביפו העתיקה תמצא מעמד QR. סרוק אותו, פענח את הרמז, הגע לתחנה הבאה.
              <br/>2 נקודות ביקורת — הפרס שצברת בטוח גם אם תפסיק!
            </p>

            {/* Preview ladder */}
            <div className="max-w-xs mx-auto mb-10 space-y-1.5">
              {PRIZE_LADDER.slice(0,5).map((p,i) => (
                <div key={i} className="flex items-center justify-between px-4 py-2 rounded-xl text-sm"
                  style={{ background: p.isCheckpoint ? 'rgba(26,107,138,0.15)':'rgba(74,157,184,0.07)', border:`1px solid ${p.isCheckpoint ? 'rgba(26,107,138,0.4)':'rgba(74,157,184,0.15)'}` }}>
                  <span style={{ color: p.isCheckpoint ? 'var(--terra)':'var(--gold-light)' }}>{p.emoji} {p.label}</span>
                  <span className="font-bold text-xs" style={{ color: p.isCheckpoint ? 'var(--terra)':'var(--gold)' }}>תחנה {p.station}</span>
                </div>
              ))}
              <div className="text-center text-xs opacity-40 pt-1" style={{ color:'var(--gold-light)' }}>+ 5 תחנות נוספות...</div>
            </div>

            <button onClick={startGame} className="btn-terra text-xl py-5 px-12 rounded-2xl"
              style={{ boxShadow:'0 4px 40px rgba(26,107,138,0.4)' }}>
              🚀 התחל את המסע!
            </button>
            <p className="mt-4 text-xs opacity-40" style={{ color:'var(--gold-light)' }}>
              * ניתן לשחק בדמו גם מהבית. בשטח — QR אמיתיים בכל נקודה.
            </p>
          </div>
        )}

        {/* ── STATION ── */}
        {phase === 'station' && (
          <div className="grid md:grid-cols-3 gap-6 fade-in">
            {/* Prize ladder */}
            <div className="hidden md:block space-y-1.5">
              <h4 className="text-sm font-bold mb-3 text-right" style={{ color:'var(--gold)' }}>🏆 סולם הפרסים</h4>
              {PRIZE_LADDER.map((p) => (
                <div key={p.station}
                  className={`prize-ladder-item text-sm ${p.station === station.id ? 'active' : ''} ${p.isCheckpoint ? 'checkpoint' : ''} ${p.station < station.id ? 'won' : ''}`}>
                  <span style={{ color: p.station === station.id ? 'var(--gold)' : p.isCheckpoint ? 'var(--terra)' : p.station < station.id ? 'var(--whatsapp)' : 'rgba(240,230,211,0.4)', fontSize:12 }}>
                    {p.station < station.id ? '✅' : p.emoji} {p.label}
                  </span>
                  <span className="font-bold text-xs" style={{ color:'var(--gold)', opacity: p.station <= station.id ? 1 : 0.3 }}>{p.station}</span>
                </div>
              ))}
            </div>

            {/* Main station card */}
            <div className="md:col-span-2">
              <div className="game-container overflow-hidden">
                {/* Station header */}
                <div className="relative h-48 overflow-hidden">
                  <img src={station.image} alt={station.location} className="w-full h-full object-cover" />
                  <div className="absolute inset-0" style={{ background:'linear-gradient(to bottom, rgba(44,26,14,0.25), rgba(44,26,14,0.8))' }}/>
                  <div className="absolute bottom-4 right-4">
                    <div className="station-number">{station.id}</div>
                  </div>
                  <div className="absolute bottom-4 left-4 text-right">
                    <div className="text-2xl font-black" style={{ color:'var(--gold)', fontFamily:'Frank Ruhl Libre, serif' }}>
                      {station.emoji} {station.location}
                    </div>
                    <div className="text-sm" style={{ color:'var(--gold-light)', opacity:0.7 }}>תחנה {station.id} מתוך 10</div>
                  </div>
                </div>

                {/* Progress bar */}
                <div className="h-2 w-full" style={{ background:'rgba(74,157,184,0.1)' }}>
                  <div className="h-full transition-all duration-500" style={{ width:`${(station.id/10)*100}%`, background:'linear-gradient(90deg, var(--gold), var(--terra))' }}/>
                </div>

                <div className="p-6 text-right">
                  {/* Riddle */}
                  <div className="mb-6 p-4 rounded-2xl" style={{ background:'rgba(74,157,184,0.06)', border:'1px solid rgba(74,157,184,0.2)' }}>
                    <div className="text-xs font-bold mb-2 opacity-60" style={{ color:'var(--gold)' }}>📍 אתה נמצא כאן:</div>
                    <p className="leading-relaxed" style={{ color:'var(--parchment)' }}>{station.riddle}</p>
                  </div>

                  {/* Clue (hint) */}
                  {showClue && (
                    <div className="mb-6 p-4 rounded-2xl fade-in" style={{ background:'rgba(26,107,138,0.1)', border:'1px solid rgba(26,107,138,0.4)' }}>
                      <div className="text-xs font-bold mb-2" style={{ color:'var(--terra)' }}>💡 רמז לתחנה הבאה:</div>
                      <p className="leading-relaxed text-sm" style={{ color:'var(--parchment)' }}>{station.clue}</p>
                    </div>
                  )}

                  {/* Prize preview */}
                  <div className="flex items-center justify-between mb-6 p-3 rounded-xl" style={{ background:'rgba(74,157,184,0.08)', border:'1px solid rgba(74,157,184,0.15)' }}>
                    <span className="text-sm font-bold" style={{ color:'var(--gold)' }}>
                      {station.prizeEmoji} פרס תחנה זו: {station.prize}
                    </span>
                    {station.isCheckpoint && (
                      <span className="text-xs px-2 py-1 rounded-full font-bold" style={{ background:'rgba(26,107,138,0.2)', color:'var(--terra)' }}>✅ מחסום בטוח</span>
                    )}
                  </div>

                  {/* Lifelines */}
                  <div className="flex gap-3 mb-5 justify-end flex-wrap">
                    <button onClick={useHint} disabled={lifelines.hint === 0 || showClue}
                      className="flex items-center gap-2 px-3 py-1.5 rounded-xl text-sm transition-all disabled:opacity-30"
                      style={{ background:'rgba(30,107,138,0.15)', border:'1px solid rgba(30,107,138,0.4)', color:'#7EC8E3' }}>
                      💡 רמז ({lifelines.hint})
                    </button>
                    <button onClick={() => alert('צלצל לחפ"י: 050-0000000')}
                      disabled={lifelines.help === 0}
                      className="flex items-center gap-2 px-3 py-1.5 rounded-xl text-sm transition-all disabled:opacity-30"
                      style={{ background:'rgba(37,211,102,0.1)', border:'1px solid rgba(37,211,102,0.3)', color:'var(--whatsapp)' }}>
                      📞 עזרת חפ"י ({lifelines.help})
                    </button>
                  </div>

                  {/* Scan button */}
                  <button onClick={startScan} className="btn-terra w-full py-5 text-lg rounded-2xl justify-center"
                    style={{ boxShadow:'0 4px 30px rgba(26,107,138,0.35)' }}>
                    <QrIcon /> סרקתי את ה-QR! ✓
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* ── SCANNING ── */}
        {phase === 'scanning' && (
          <div className="game-container p-12 text-center fade-in">
            <div className="qr-scan-box mx-auto mb-8">
              <div className="qr-scan-line" />
              <div className="qr-corner tl"/><div className="qr-corner tr"/>
              <div className="qr-corner bl"/><div className="qr-corner br"/>
              <div className="flex items-center justify-center h-full">
                <div className="text-5xl animate-pulse">📱</div>
              </div>
            </div>
            <h3 className="text-2xl font-bold mb-4" style={{ color:'var(--gold)' }}>סורק QR...</h3>
            <div className="w-64 mx-auto h-3 rounded-full overflow-hidden mb-4" style={{ background:'rgba(74,157,184,0.15)' }}>
              <div className="h-full rounded-full transition-all duration-100" style={{ width:`${scanProgress}%`, background:'linear-gradient(90deg, var(--gold), var(--terra))' }}/>
            </div>
            <p className="opacity-50 text-sm" style={{ color:'var(--gold-light)' }}>{scanProgress}%</p>
          </div>
        )}

        {/* ── WON ── */}
        {phase === 'won' && (
          <div className="game-container p-8 md:p-12 text-center fade-in">
            {station.isCheckpoint && (
              <div className="mb-6 p-4 rounded-2xl" style={{ background:'rgba(26,107,138,0.15)', border:'2px solid var(--terra)' }}>
                <div className="font-bold text-lg" style={{ color:'var(--terra)' }}>✅ נקודת ביקורת!</div>
                <p className="text-sm mt-1 opacity-80" style={{ color:'var(--parchment)' }}>{station.checkpointMsg}</p>
              </div>
            )}
            <div className="text-6xl mb-4">{station.prizeEmoji}</div>
            <h3 className="text-3xl font-black mb-2" style={{ color:'var(--gold)', fontFamily:'Frank Ruhl Libre, serif' }}>
              {station.id === 10 ? '🏆 השלמת את כל 10 התחנות!' : `תחנה ${station.id} — הושלמה!`}
            </h3>
            <div className="text-xl mb-2 font-bold" style={{ color:'var(--parchment)' }}>{station.prize}</div>
            <div className="mb-8 p-4 rounded-2xl" style={{ background:'rgba(74,157,184,0.06)', border:'1px solid rgba(74,157,184,0.2)' }}>
              <div className="text-xs font-bold mb-2 opacity-60" style={{ color:'var(--gold)' }}>🗺️ הרמז לתחנה הבאה:</div>
              <p className="text-sm leading-relaxed" style={{ color:'var(--parchment)' }}>{station.clue}</p>
            </div>

            {/* Progress */}
            <div className="flex justify-center gap-1.5 mb-8 flex-wrap">
              {STATIONS.map((s,i) => (
                <div key={s.id} className="w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold border-2"
                  style={{ background: i < current+1 ? 'var(--gold)' : 'transparent', borderColor: i < current+1 ? 'var(--gold)' : 'rgba(74,157,184,0.3)', color: i < current+1 ? 'var(--navy)' : 'rgba(74,157,184,0.4)' }}>
                  {i < current+1 ? '✓' : s.id}
                </div>
              ))}
            </div>

            {station.id < 10 ? (
              <button onClick={nextStation} className="btn-gold text-xl py-5 px-12 rounded-2xl"
                style={{ boxShadow:'0 4px 30px rgba(74,157,184,0.4)' }}>
                המשך לתחנה {station.id + 1}: {STATIONS[current + 1]?.location} →
              </button>
            ) : (
              <button onClick={() => setPhase('complete')} className="btn-gold text-xl py-5 px-12 rounded-2xl"
                style={{ boxShadow:'0 4px 30px rgba(74,157,184,0.4)' }}>
                🏆 קבל את הפרס הגדול!
              </button>
            )}
          </div>
        )}

        {/* ── COMPLETE ── */}
        {phase === 'complete' && (
          <div className="game-container p-8 md:p-16 text-center fade-in">
            <div className="text-7xl mb-6">🏆</div>
            <h3 className="text-4xl font-black mb-4" style={{ color:'#FFD700', fontFamily:'Frank Ruhl Libre, serif', textShadow:'0 0 40px rgba(255,215,0,0.5)' }}>
              כל הכבוד! השלמת את המסע!
            </h3>
            <p className="text-2xl mb-2 font-bold" style={{ color:'var(--parchment)' }}>
              10/10 תחנות ✅
            </p>
            <p className="text-xl mb-8" style={{ color:'var(--gold)' }}>
              100 נקודות קרדיט + ארוחה משפחתית חינם!
            </p>
            <div className="flex justify-center gap-1.5 mb-10 flex-wrap">
              {STATIONS.map(s => (
                <div key={s.id} className="w-10 h-10 rounded-full flex items-center justify-center text-sm font-bold"
                  style={{ background:'var(--gold)', color:'var(--navy)' }}>✓</div>
              ))}
            </div>
            <p className="mb-8 opacity-70" style={{ color:'var(--parchment)' }}>
              הצג מסך זה לצוות חפ"י במוצב הקרוב לקבל את הפרס. בתוקף עד תום יום הביקור.
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <button onClick={startGame} className="btn-outline py-3 px-8">
                שחק שוב 🔄
              </button>
              <a href="https://chat.whatsapp.com/BhnFkwONJd6DeA7KlwG1MC" target="_blank" rel="noreferrer" className="btn-whatsapp py-3 px-8">
                שתף בוואצ'אפ!
              </a>
            </div>
          </div>
        )}
      </div>
    </section>
  )
}

function QrIcon() {
  return (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <rect x="3" y="3" width="7" height="7"/><rect x="14" y="3" width="7" height="7"/>
      <rect x="3" y="14" width="7" height="7"/><rect x="14" y="14" width="3" height="3"/>
      <line x1="19" y1="14" x2="19" y2="17"/><line x1="19" y1="19" x2="19" y2="21"/>
      <line x1="14" y1="19" x2="17" y2="19"/>
    </svg>
  )
}
