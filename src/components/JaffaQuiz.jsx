import { useState, useRef } from 'react'
import { useUser } from '../context/UserContext'

const QUESTIONS = [
  {
    q: 'מתי בדיוק נבנה מגדל השעון של יפו?',
    options: ['1850–1860', '1900–1903', '1906–1910', '1920–1925'],
    correct: 1,
    explanation: 'מגדל השעון נבנה בין 1900 ל-1903 לציון יובל הכסף לשלטון הסולטן עבד אל-חמיד השני. יזם: יוסף ביי מויאל. שעות הציוד הותקנו ב-1903.',
    image: 'https://images.pexels.com/photos/18809479/pexels-photo-18809479.jpeg?w=400&q=70',
  },
  {
    q: 'מי בנה את המסגד מחמודיה בצורתו הנוכחית ב-1812?',
    options: ['הסולטן עבד אל-חמיד', 'מחמד אבו-נבוט', 'שייח\' מחמד אל-ח\'לילי', 'נפוליאון בונפרטה'],
    correct: 1,
    explanation: 'מחמד אבו-נבוט, פחת עזה ויפו, בנה מחדש את המסגד ב-1812 על יסודות מסגד ישן מ-1730. חלק מעמודי המסגד הובאו מחורבות קיסריה ואשקלון.',
    image: 'https://images.pexels.com/photos/17814820/pexels-photo-17814820.jpeg?w=400&q=70',
  },
  {
    q: 'כמה שנות היסטוריה לנמל יפו?',
    options: ['כ-1,000 שנה', 'כ-2,000 שנה', 'כ-3,000 שנה', 'למעלה מ-4,000 שנה'],
    correct: 3,
    explanation: 'נמל יפו הוא אחד הנמלים הפעילים הוותיקים בעולם — למעלה מ-4,000 שנה של שיט מסחרי. עצי הארזים לבניין מקדש שלמה עברו כאן מלבנון.',
    image: 'https://images.unsplash.com/photo-1518728242875-50600dfbe31a?w=400&q=70',
  },
  {
    q: 'לפי ספר מעשי השליחים, מה קרה בביתו של שמעון הבורסקי?',
    options: ['ישוע ריפא חולים', 'השליח פטרוס ראה חזון שפתח הנצרות לגויים', 'נכתבה אחת מאיגרות פאולוס', 'נוסדה הכנסייה הראשונה'],
    correct: 1,
    explanation: 'לפי מעשי השליחים (י\':ו), השליח פטרוס לן בביתו של שמעון הבורסקי בעיר יפו. כאן ראה חזון שגרם לו לפתוח את הנצרות לעמים לא-יהודים — אחד הרגעים המכוננים של הנצרות.',
    image: 'https://images.pexels.com/photos/31900164/pexels-photo-31900164.jpeg?w=400&q=70',
  },
  {
    q: 'איזו קהילה לא השתתפה במימון בניית מגדל השעון?',
    options: ['יהודים', 'ערבים', 'ארמנים', 'כולן השתתפו'],
    correct: 3,
    explanation: 'מגדל השעון ביפו מיוחד בכך שנבנה בתרומות של כל קהילות יפו יחד — יהודים, ערבים מוסלמים, ערבים נוצרים, ארמנים ומרוניטים. הייתה זו אחדות קהילתית נדירה.',
    image: 'https://images.pexels.com/photos/18809479/pexels-photo-18809479.jpeg?w=400&q=70',
  },
  {
    q: 'מה הקשר האמיתי בין סלע אנדרומדה לאגדה היוונית?',
    options: ['אין שום קשר — אגדה מודרנית', 'מסורת עתיקה בת 2,000+ שנה המוזכרת אצל סופרים רומיים', 'נמצאה כתובת יוונית מהמאה ה-3', 'קשר שנוצר בתקופת מנדט בריטי'],
    correct: 1,
    explanation: 'הקשר בין יפו ואנדרומדה תועד ע"י כותבים רומיים עתיקים: יוסף בן מתתיהו (המאה ה-1 לספירה), פליניוס הזקן, פומפוניוס מלה ופאוסניאס — כולם הזכירו את "סלע אנדרומדה" ביפו.',
    image: 'https://images.pexels.com/photos/5259593/pexels-photo-5259593.jpeg?w=400&q=70',
  },
  {
    q: 'מתי נוסד מוזיאון אילנה גור?',
    options: ['1985', '1990', '1995', '2000'],
    correct: 2,
    explanation: 'מוזיאון אילנה גור נוסד ב-1995 ע"י הפסלת אילנה גור בבניין קרוואנסראי (פונדק שיירות) מהמאה ה-18. הכתובת: 4 מזל דגים, יפו. טל: 03-6837676.',
    image: 'https://images.pexels.com/photos/30341997/pexels-photo-30341997.jpeg?w=400&q=70',
  },
  {
    q: 'כמה מגדלי שעון עות\'מאניים נבנו בארץ ישראל בסוף המאה ה-19/תחילת המאה ה-20?',
    options: ['3', '5', '7', '12'],
    correct: 2,
    explanation: 'שבעה מגדלי שעון עות\'מאניים נבנו בארץ ישראל לציון יובל הכסף של הסולטן: יפו, ירושלים, עכו, חיפה, נבלוס, ג\'נין וצפת. מגדל יפו הוא מהמפורסמים שבהם.',
    image: 'https://images.pexels.com/photos/18809479/pexels-photo-18809479.jpeg?w=400&q=70',
  },
  {
    q: 'מה שעות הפתיחה של שוק הפשפשים בתל אביב-יפו?',
    options: ['כל ימות השבוע 08:00–20:00', 'א-ה 09:00–17:00, ו עד 14:00, שבת סגור', 'ימי שישי ושבת בלבד', 'כל יום פרט לשישי'],
    correct: 1,
    explanation: 'שוק הפשפשים פתוח א-ה 09:00–17:00, ביום שישי עד 14:00, ובשבת — סגור לחלוטין. האזור מלא גלריות וברים הפועלים גם בשעות הערב.',
    image: 'https://images.pexels.com/photos/31900164/pexels-photo-31900164.jpeg?w=400&q=70',
  },
  {
    q: 'מי יזם את בניית מגדל השעון ביפו?',
    options: ['הסולטן העות\'מאני ישירות', 'ממשלת עות\'מאנית מקומית', 'יוסף ביי מויאל, אזרח יהודי יפואי', 'הכנסייה הקתולית'],
    correct: 2,
    explanation: 'יוסף ביי מויאל — איש עסקים יהודי יפואי בעל השפעה — יזם את בניית המגדל וגייס תרומות מכל קהילות יפו. הוא קיבל על עצמו את הפרויקט ותיאם עם השלטונות העות\'מאניים.',
    image: 'https://images.pexels.com/photos/18809933/pexels-photo-18809933.jpeg?w=400&q=70',
  },
]

const SCORE_MSGS = [
  { min: 9,  msg: '🏆 מומחה יפו! ידע היסטורי מרשים ביותר!', color: '#FFD700' },
  { min: 7,  msg: '🥇 מצוין! יודע את יפו לעומק', color: '#C8A96E' },
  { min: 5,  msg: '🥈 טוב! כדאי לבקר ולגלות עוד', color: '#C8A96E' },
  { min: 3,  msg: '🥉 לא רע! יפו מחכה שתגיע ותלמד', color: '#8B7355' },
  { min: 0,  msg: '📚 בוא תבקר ביפו — זה הלימוד הכי טוב!', color: '#C4622D' },
]

export default function JaffaQuiz() {
  const [phase, setPhase]   = useState('intro')
  const [idx, setIdx]       = useState(0)
  const [selected, setSel]  = useState(null)
  const [answers, setAns]   = useState([])
  const [showExp, setShowExp] = useState(false)
  const { user, addPoints } = useUser()
  const bonusGiven = useRef(false)

  const q = QUESTIONS[idx]
  const score = answers.filter(Boolean).length
  const scoreMsg = SCORE_MSGS.find(s => score >= s.min)

  function choose(i) {
    if (selected !== null) return
    setSel(i)
    setShowExp(true)
  }

  function next() {
    const updated = [...answers, selected === q.correct]
    setAns(updated)
    setSel(null)
    setShowExp(false)
    if (idx + 1 >= QUESTIONS.length) {
      setPhase('result')
      const finalScore = updated.filter(Boolean).length
      if (finalScore >= 7 && user && !bonusGiven.current) {
        addPoints(5)
        bonusGiven.current = true
      }
    } else {
      setIdx(i => i + 1)
    }
  }

  function restart() {
    setPhase('intro')
    setIdx(0)
    setSel(null)
    setAns([])
    setShowExp(false)
    bonusGiven.current = false
  }

  return (
    <section id="quiz" className="py-24" style={{ background: 'linear-gradient(180deg, rgba(237,224,196,0.85) 0%, rgba(245,237,214,0.92) 100%)' }}>
      <div className="max-w-3xl mx-auto px-4">
        <div className="text-center mb-12">
          <div className="inline-block mb-4 px-4 py-1 rounded-full text-xs border"
            style={{ color: 'var(--terra)', borderColor: 'rgba(196,98,45,0.4)', background: 'rgba(196,98,45,0.08)' }}>
            🧠 חידון אמיתי
          </div>
          <h2 className="section-title">חידון יפו העתיקה</h2>
          <div className="gold-divider" />
          <p className="section-subtitle">10 שאלות על ההיסטוריה, הארכיטקטורה והתרבות של יפו העתיקה — כולן מבוססות עובדות אמיתיות</p>
        </div>

        {/* ── INTRO ── */}
        {phase === 'intro' && (
          <div className="game-container p-10 text-center fade-in">
            <div className="text-6xl mb-6">🏛️</div>
            <h3 className="text-3xl font-black mb-4" style={{ color: 'var(--gold)', fontFamily: 'Frank Ruhl Libre, serif' }}>
              כמה אתה מכיר את יפו?
            </h3>
            <p className="mb-3" style={{ color: 'var(--gold-light)' }}>10 שאלות אמיתיות על ההיסטוריה, הארכיטקטורה והמסורות.</p>
            <p className="text-sm mb-10 opacity-60" style={{ color: 'var(--parchment)' }}>כל תשובה מגיעה עם הסבר מבוסס מקורות אמיתיים.</p>
            <div className="grid grid-cols-3 gap-4 max-w-xs mx-auto mb-10">
              {[{ n: '10', l: 'שאלות' }, { n: '4', l: 'אפשרויות' }, { n: '🏅', l: 'נקודות' }].map(s => (
                <div key={s.l} className="card text-center py-4">
                  <div className="text-2xl font-black gold-shimmer">{s.n}</div>
                  <div className="text-xs mt-1 opacity-60" style={{ color: 'var(--gold-light)' }}>{s.l}</div>
                </div>
              ))}
            </div>
            <button onClick={() => setPhase('quiz')} className="btn-gold text-xl py-5 px-12 rounded-2xl">
              🚀 התחל את החידון!
            </button>
          </div>
        )}

        {/* ── QUIZ ── */}
        {phase === 'quiz' && (
          <div className="game-container overflow-hidden fade-in">
            {/* Progress */}
            <div className="h-2" style={{ background: 'rgba(200,169,110,0.15)' }}>
              <div className="h-full transition-all duration-500"
                style={{ width: `${(idx / QUESTIONS.length) * 100}%`, background: 'linear-gradient(90deg, var(--gold), var(--terra))' }} />
            </div>

            {/* Image */}
            <div className="h-40 overflow-hidden relative">
              <img src={q.image} alt="" className="w-full h-full object-cover" />
              <div className="absolute inset-0" style={{ background: 'linear-gradient(to bottom, rgba(44,26,14,0.15), rgba(44,26,14,0.75))' }} />
              <div className="absolute bottom-3 right-4 flex items-center gap-3">
                <div className="station-number" style={{ width: 44, height: 44, fontSize: '1.1rem', background: 'rgba(255,252,245,0.9)' }}>{idx + 1}</div>
                <div className="text-sm font-bold" style={{ color: '#FFD480', textShadow: '0 1px 4px rgba(0,0,0,0.5)' }}>שאלה {idx + 1} מתוך {QUESTIONS.length}</div>
              </div>
              <div className="absolute bottom-3 left-4 flex gap-1">
                {QUESTIONS.map((_, i) => (
                  <div key={i} className="h-1.5 w-5 rounded-full transition-all"
                    style={{ background: i < idx ? 'var(--gold)' : i === idx ? 'var(--terra)' : 'rgba(200,169,110,0.2)' }} />
                ))}
              </div>
            </div>

            <div className="p-6 text-right">
              <h3 className="text-xl font-bold mb-6 leading-relaxed" style={{ color: 'var(--parchment)', fontFamily: 'Frank Ruhl Libre, serif' }}>
                {q.q}
              </h3>

              {/* Options */}
              <div className="space-y-3 mb-6">
                {q.options.map((opt, i) => {
                  let bg = 'rgba(200,169,110,0.1)'
                  let border = 'rgba(200,169,110,0.4)'
                  let color = '#2C1A0E'
                  if (selected !== null) {
                    if (i === q.correct) { bg = 'rgba(46,125,50,0.15)'; border = 'rgba(46,125,50,0.7)'; color = '#1B5E20' }
                    else if (i === selected && selected !== q.correct) { bg = 'rgba(198,40,40,0.12)'; border = 'rgba(198,40,40,0.6)'; color = '#9F1010' }
                  } else if (selected === null) {
                    bg = 'rgba(200,169,110,0.1)'
                  }
                  return (
                    <button key={i} onClick={() => choose(i)} disabled={selected !== null}
                      className="w-full text-right px-5 py-4 rounded-xl transition-all duration-300 font-medium"
                      style={{ background: bg, border: `1px solid ${border}`, color, cursor: selected !== null ? 'default' : 'pointer' }}>
                      <span className="ml-3 opacity-50 text-sm font-mono">
                        {['א', 'ב', 'ג', 'ד'][i]}.
                      </span>
                      {opt}
                      {selected !== null && i === q.correct && <span className="float-left">✅</span>}
                      {selected !== null && i === selected && selected !== q.correct && <span className="float-left">❌</span>}
                    </button>
                  )
                })}
              </div>

              {/* Explanation */}
              {showExp && (
                <div className="fade-in mb-5 p-4 rounded-2xl text-right text-sm leading-relaxed"
                  style={{ background: selected === q.correct ? 'rgba(46,125,50,0.1)' : 'rgba(198,40,40,0.1)', border: `1px solid ${selected === q.correct ? 'rgba(46,125,50,0.4)' : 'rgba(198,40,40,0.4)'}` }}>
                  <div className="font-bold mb-1" style={{ color: selected === q.correct ? '#1B5E20' : '#9F1010' }}>
                    {selected === q.correct ? '✅ נכון!' : '❌ לא נכון'}
                  </div>
                  <p style={{ color: '#2C1A0E', opacity: 0.85 }}>{q.explanation}</p>
                </div>
              )}

              {selected !== null && (
                <button onClick={next} className="btn-gold w-full justify-center py-4 text-lg fade-in">
                  {idx + 1 < QUESTIONS.length ? `שאלה הבאה (${idx + 2}/${QUESTIONS.length}) →` : '🏁 ראה תוצאות'}
                </button>
              )}
            </div>
          </div>
        )}

        {/* ── RESULT ── */}
        {phase === 'result' && (
          <div className="game-container p-10 text-center fade-in">
            <div className="text-6xl mb-4">{score >= 8 ? '🏆' : score >= 5 ? '🥇' : '📚'}</div>
            <div className="text-5xl font-black mb-2 gold-shimmer">{score}/{QUESTIONS.length}</div>
            <div className="text-xl font-bold mb-2" style={{ color: scoreMsg.color }}>
              {scoreMsg.msg}
            </div>
            <p className="mb-8 opacity-60 text-sm" style={{ color: 'var(--parchment)' }}>
              {score >= 7 ? 'ידע מרשים על יפו העתיקה! שתף חברים ואתגר אותם.' : 'בוא לבקר ביפו — הלמידה הכי טובה היא בשטח!'}
            </p>

            {/* Score breakdown */}
            <div className="flex justify-center gap-1.5 mb-8 flex-wrap">
              {answers.map((correct, i) => (
                <div key={i} className="w-10 h-10 rounded-full flex items-center justify-center text-sm font-bold"
                  style={{ background: correct ? 'rgba(46,125,50,0.15)' : 'rgba(198,40,40,0.15)', border: `2px solid ${correct ? 'rgba(46,125,50,0.6)' : 'rgba(198,40,40,0.5)'}`, color: correct ? '#1B5E20' : '#9F1010' }}>
                  {correct ? '✓' : '✗'}
                </div>
              ))}
            </div>

            {score >= 7 && (
              <div className="card text-center mb-6" style={{ borderColor: 'rgba(200,169,110,0.4)' }}>
                <p className="font-bold" style={{ color: 'var(--gold)' }}>🎁 מומחה יפו!</p>
                {user
                  ? <p className="text-sm opacity-70 mt-1" style={{ color: 'var(--parchment)' }}>+5 נקודות בונוס זוכו לחשבון שלך ⭐</p>
                  : <p className="text-sm opacity-70 mt-1" style={{ color: 'var(--parchment)' }}>הצג מסך זה לצוות חפ"י לקבל 5 נקודות בונוס</p>
                }
              </div>
            )}

            <div className="flex flex-wrap justify-center gap-4">
              <button onClick={restart} className="btn-outline py-3 px-8">שחק שוב 🔄</button>
              <a href="#game" className="btn-terra py-3 px-8">🎯 נסה את מסע 10 התחנות</a>
              <a href="https://chat.whatsapp.com/JAFFA" target="_blank" rel="noreferrer" className="btn-whatsapp py-3 px-8">שתף! 📤</a>
            </div>
          </div>
        )}
      </div>
    </section>
  )
}
