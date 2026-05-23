import { useState, useRef } from 'react'
import { useUser } from '../context/UserContext'

const QUESTIONS = [
  {
    q: 'מתי בדיוק נבנה מגדל השעון של יפו?',
    options: ['1850–1860', '1900–1903', '1906–1910', '1920–1925'],
    correct: 1,
    explanation: 'מגדל השעון נבנה בין 1900 ל-1903 לציון יובל הכסף לשלטון הסולטן עבד אל-חמיד השני.',
    image: 'https://images.pexels.com/photos/18809479/pexels-photo-18809479.jpeg?w=400&q=70',
  },
  {
    q: 'מי בנה את המסגד מחמודיה בצורתו הנוכחית ב-1812?',
    options: ['הסולטן עבד אל-חמיד', 'מחמד אבו-נבוט', 'שייח\' מחמד אל-ח\'לילי', 'נפוליאון בונפרטה'],
    correct: 1,
    explanation: 'מחמד אבו-נבוט, פחת עזה ויפו, בנה מחדש את המסגד ב-1812 על יסודות מסגד ישן מ-1730.',
    image: 'https://images.pexels.com/photos/17814820/pexels-photo-17814820.jpeg?w=400&q=70',
  },
  {
    q: 'כמה שנות היסטוריה לנמל יפו?',
    options: ['כ-1,000 שנה', 'כ-2,000 שנה', 'כ-3,000 שנה', 'למעלה מ-4,000 שנה'],
    correct: 3,
    explanation: 'נמל יפו הוא אחד הנמלים הפעילים הוותיקים בעולם — למעלה מ-4,000 שנה של שיט מסחרי.',
    image: 'https://images.unsplash.com/photo-1518728242875-50600dfbe31a?w=400&q=70',
  },
  {
    q: 'לפי ספר מעשי השליחים, מה קרה בביתו של שמעון הבורסקי?',
    options: ['ישוע ריפא חולים', 'השליח פטרוס ראה חזון שפתח הנצרות לגויים', 'נכתבה אחת מאיגרות פאולוס', 'נוסדה הכנסייה הראשונה'],
    correct: 1,
    explanation: 'לפי מעשי השליחים, השליח פטרוס לן בביתו של שמעון הבורסקי ביפו וראה חזון מכונן.',
    image: 'https://images.pexels.com/photos/31900164/pexels-photo-31900164.jpeg?w=400&q=70',
  },
  {
    q: 'איזו קהילה לא השתתפה במימון בניית מגדל השעון?',
    options: ['יהודים', 'ערבים', 'ארמנים', 'כולן השתתפו'],
    correct: 3,
    explanation: 'מגדל השעון נבנה בתרומות של כל קהילות יפו יחד — יהודים, ערבים, ארמנים ומרוניטים.',
    image: 'https://images.pexels.com/photos/18809479/pexels-photo-18809479.jpeg?w=400&q=70',
  },
  {
    q: 'מה הקשר האמיתי בין סלע אנדרומדה לאגדה היוונית?',
    options: ['אין שום קשר — אגדה מודרנית', 'מסורת עתיקה בת 2,000+ שנה המוזכרת אצל סופרים רומיים', 'נמצאה כתובת יוונית מהמאה ה-3', 'קשר שנוצר בתקופת מנדט בריטי'],
    correct: 1,
    explanation: 'הקשר בין יפו ואנדרומדה תועד ע"י כותבים רומיים עתיקים: יוסף בן מתתיהו, פליניוס הזקן ועוד.',
    image: 'https://images.pexels.com/photos/5259593/pexels-photo-5259593.jpeg?w=400&q=70',
  },
  {
    q: 'מתי נוסד מוזיאון אילנה גור?',
    options: ['1985', '1990', '1995', '2000'],
    correct: 2,
    explanation: 'מוזיאון אילנה גור נוסד ב-1995 ע"י הפסלת אילנה גור בבניין קרוואנסראי מהמאה ה-18.',
    image: 'https://images.pexels.com/photos/30341997/pexels-photo-30341997.jpeg?w=400&q=70',
  },
  {
    q: 'כמה מגדלי שעון עות\'מאניים נבנו בארץ ישראל?',
    options: ['3', '5', '7', '12'],
    correct: 2,
    explanation: 'שבעה מגדלי שעון עות\'מאניים נבנו בארץ ישראל: יפו, ירושלים, עכו, חיפה, נבלוס, ג\'נין וצפת.',
    image: 'https://images.pexels.com/photos/18809479/pexels-photo-18809479.jpeg?w=400&q=70',
  },
  {
    q: 'מה שעות הפתיחה של שוק הפשפשים?',
    options: ['כל ימות השבוע 08:00–20:00', 'א-ה 09:00–17:00, ו עד 14:00, שבת סגור', 'ימי שישי ושבת בלבד', 'כל יום פרט לשישי'],
    correct: 1,
    explanation: 'שוק הפשפשים פתוח א-ה 09:00–17:00, ביום שישי עד 14:00, ובשבת — סגור לחלוטין.',
    image: 'https://images.pexels.com/photos/31900164/pexels-photo-31900164.jpeg?w=400&q=70',
  },
  {
    q: 'מי יזם את בניית מגדל השעון ביפו?',
    options: ['הסולטן העות\'מאני ישירות', 'ממשלת עות\'מאנית מקומית', 'יוסף ביי מויאל, אזרח יהודי יפואי', 'הכנסייה הקתולית'],
    correct: 2,
    explanation: 'יוסף ביי מויאל — איש עסקים יהודי יפואי — יזם את בניית המגדל וגייס תרומות מכל קהילות יפו.',
    image: 'https://images.pexels.com/photos/18809933/pexels-photo-18809933.jpeg?w=400&q=70',
  },
]

const SCORE_MSGS = [
  { min: 9,  msg: '🏆 מומחה יפו! ידע היסטורי מרשים!', color: '#FFD700' },
  { min: 7,  msg: '🥇 מצוין! יודע את יפו לעומק', color: '#1A6B8A' },
  { min: 5,  msg: '🥈 טוב! כדאי לבקר ולגלות עוד', color: '#1A6B8A' },
  { min: 3,  msg: '🥉 לא רע! יפו מחכה שתגיע', color: '#4A9DB8' },
  { min: 0,  msg: '📚 בואו תבקרו ביפו — זה הלימוד הכי טוב!', color: '#1A6B8A' },
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
    <div id="quiz" className="px-3 py-3">
      <div className="max-w-2xl mx-auto">

        {/* INTRO */}
        {phase === 'intro' && (
          <div className="rounded-3xl p-5 text-center fade-in"
            style={{ background: 'rgba(225,240,245,0.75)', border: '1.5px solid rgba(74,157,184,0.3)' }}>
            <div className="text-5xl mb-3">🏛️</div>
            <h3 className="text-xl font-black mb-2" style={{ color: '#0D3A56', fontFamily: 'Frank Ruhl Libre, serif' }}>
              כמה אתם מכירים את יפו העתיקה?!
            </h3>
            <p className="text-sm mb-1" style={{ color: '#1A6B8A' }}>10 שאלות אמיתיות על ההיסטוריה, הארכיטקטורה והמסורות.</p>
            <p className="text-xs mb-5 opacity-70" style={{ color: '#0D3A56' }}>כל תשובה מגיעה עם הסבר מבוסס מקורות אמיתיים.</p>
            <div className="flex justify-center gap-3 mb-5">
              {[{ n: '10', l: 'שאלות' }, { n: '4', l: 'אפשרויות' }, { n: '🏅', l: 'נקודות' }].map(s => (
                <div key={s.l} className="rounded-2xl px-4 py-3 text-center"
                  style={{ background: 'rgba(74,157,184,0.15)', border: '1px solid rgba(74,157,184,0.3)' }}>
                  <div className="text-xl font-black" style={{ color: '#0D3A56' }}>{s.n}</div>
                  <div className="text-xs mt-0.5" style={{ color: '#1A6B8A' }}>{s.l}</div>
                </div>
              ))}
            </div>
            <button onClick={() => setPhase('quiz')}
              className="py-4 px-10 rounded-2xl font-black text-base w-full"
              style={{ background: 'linear-gradient(135deg, #0D3A56, #4A9DB8)', color: '#fff', boxShadow: '0 6px 20px rgba(26,107,138,0.4)' }}>
              🚀 התחילו את החידון!
            </button>
          </div>
        )}

        {/* QUIZ */}
        {phase === 'quiz' && (
          <div className="rounded-3xl overflow-hidden fade-in"
            style={{ background: 'rgba(225,240,245,0.75)', border: '1.5px solid rgba(74,157,184,0.3)' }}>
            {/* Progress bar */}
            <div className="h-2" style={{ background: 'rgba(74,157,184,0.15)' }}>
              <div className="h-full transition-all duration-500"
                style={{ width: `${(idx / QUESTIONS.length) * 100}%`, background: 'linear-gradient(90deg, #0D3A56, #4A9DB8)' }} />
            </div>

            {/* Image */}
            <div className="h-36 overflow-hidden relative">
              <img src={q.image} alt="" className="w-full h-full object-cover" />
              <div className="absolute inset-0" style={{ background: 'linear-gradient(to bottom, rgba(13,58,86,0.15), rgba(13,58,86,0.75))' }} />
              <div className="absolute bottom-3 right-4 flex items-center gap-2">
                <div className="w-10 h-10 rounded-full flex items-center justify-center font-black text-base"
                  style={{ background: 'rgba(225,240,245,0.9)', color: '#0D3A56', border: '2px solid rgba(74,157,184,0.6)' }}>
                  {idx + 1}
                </div>
                <div className="text-xs font-bold" style={{ color: '#B0D4E3', textShadow: '0 1px 4px rgba(0,0,0,0.5)' }}>
                  שאלה {idx + 1} מתוך {QUESTIONS.length}
                </div>
              </div>
              <div className="absolute bottom-3 left-4 flex gap-1">
                {QUESTIONS.map((_, i) => (
                  <div key={i} className="h-1 w-4 rounded-full transition-all"
                    style={{ background: i < idx ? '#4A9DB8' : i === idx ? '#1A6B8A' : 'rgba(74,157,184,0.2)' }} />
                ))}
              </div>
            </div>

            <div className="p-4 text-right">
              <h3 className="text-base font-bold mb-4 leading-snug" style={{ color: '#0D3A56', fontFamily: 'Frank Ruhl Libre, serif' }}>
                {q.q}
              </h3>

              {/* Options */}
              <div className="space-y-2 mb-4">
                {q.options.map((opt, i) => {
                  let bg = 'rgba(74,157,184,0.08)'
                  let border = 'rgba(74,157,184,0.35)'
                  let color = '#0D3A56'
                  if (selected !== null) {
                    if (i === q.correct) { bg = 'rgba(46,125,50,0.12)'; border = 'rgba(46,125,50,0.6)'; color = '#1B5E20' }
                    else if (i === selected && selected !== q.correct) { bg = 'rgba(198,40,40,0.1)'; border = 'rgba(198,40,40,0.5)'; color = '#9F1010' }
                  }
                  return (
                    <button key={i} onClick={() => choose(i)} disabled={selected !== null}
                      className="w-full text-right px-4 py-3 rounded-xl transition-all duration-300 text-sm font-medium"
                      style={{ background: bg, border: `1.5px solid ${border}`, color, cursor: selected !== null ? 'default' : 'pointer', minHeight: 44 }}>
                      <span className="ml-2 opacity-50 text-xs font-mono">{['א', 'ב', 'ג', 'ד'][i]}.</span>
                      {opt}
                      {selected !== null && i === q.correct && <span className="float-left">✅</span>}
                      {selected !== null && i === selected && selected !== q.correct && <span className="float-left">❌</span>}
                    </button>
                  )
                })}
              </div>

              {/* Explanation */}
              {showExp && (
                <div className="fade-in mb-4 p-3 rounded-2xl text-right text-xs leading-relaxed"
                  style={{ background: selected === q.correct ? 'rgba(46,125,50,0.08)' : 'rgba(198,40,40,0.08)', border: `1px solid ${selected === q.correct ? 'rgba(46,125,50,0.4)' : 'rgba(198,40,40,0.4)'}` }}>
                  <div className="font-bold mb-1 text-sm" style={{ color: selected === q.correct ? '#1B5E20' : '#9F1010' }}>
                    {selected === q.correct ? '✅ נכון!' : '❌ לא נכון'}
                  </div>
                  <p style={{ color: '#0D3A56', opacity: 0.85 }}>{q.explanation}</p>
                </div>
              )}

              {selected !== null && (
                <button onClick={next}
                  className="w-full py-3 rounded-2xl font-black text-sm fade-in"
                  style={{ background: 'linear-gradient(135deg, #0D3A56, #4A9DB8)', color: '#fff', boxShadow: '0 4px 16px rgba(26,107,138,0.35)' }}>
                  {idx + 1 < QUESTIONS.length ? `שאלה הבאה (${idx + 2}/${QUESTIONS.length}) →` : '🏁 ראה תוצאות'}
                </button>
              )}
            </div>
          </div>
        )}

        {/* RESULT */}
        {phase === 'result' && (
          <div className="rounded-3xl p-5 text-center fade-in"
            style={{ background: 'rgba(225,240,245,0.75)', border: '1.5px solid rgba(74,157,184,0.3)' }}>
            <div className="text-5xl mb-3">{score >= 8 ? '🏆' : score >= 5 ? '🥇' : '📚'}</div>
            <div className="text-4xl font-black mb-1" style={{ color: '#0D3A56' }}>{score}/{QUESTIONS.length}</div>
            <div className="text-base font-bold mb-3" style={{ color: scoreMsg.color }}>{scoreMsg.msg}</div>
            <p className="mb-5 text-xs opacity-70" style={{ color: '#1A6B8A' }}>
              {score >= 7 ? 'ידע מרשים! שתף חברים ואתגר אותם.' : 'בואו לבקר ביפו — הלמידה הכי טובה היא בשטח!'}
            </p>

            <div className="flex justify-center gap-1.5 mb-5 flex-wrap">
              {answers.map((correct, i) => (
                <div key={i} className="w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold"
                  style={{ background: correct ? 'rgba(46,125,50,0.15)' : 'rgba(198,40,40,0.15)', border: `2px solid ${correct ? 'rgba(46,125,50,0.6)' : 'rgba(198,40,40,0.5)'}`, color: correct ? '#1B5E20' : '#9F1010' }}>
                  {correct ? '✓' : '✗'}
                </div>
              ))}
            </div>

            {score >= 7 && (
              <div className="rounded-2xl p-3 text-center mb-4"
                style={{ background: 'rgba(74,157,184,0.12)', border: '1.5px solid rgba(74,157,184,0.4)' }}>
                <p className="font-bold text-sm" style={{ color: '#0D3A56' }}>🎁 מומחה יפו!</p>
                {user
                  ? <p className="text-xs opacity-70 mt-0.5" style={{ color: '#1A6B8A' }}>+5 נקודות בונוס זוכו ⭐</p>
                  : <p className="text-xs opacity-70 mt-0.5" style={{ color: '#1A6B8A' }}>הצג מסך זה לצוות חפ"י לקבל 5 נקודות</p>
                }
              </div>
            )}

            <div className="flex flex-wrap justify-center gap-2">
              <button onClick={restart}
                className="py-3 px-6 rounded-xl font-bold text-sm"
                style={{ border: '2px solid #1A6B8A', color: '#1A6B8A', background: 'transparent' }}>
                שחק שוב 🔄
              </button>
              <a href="https://chat.whatsapp.com/BhnFkwONJd6DeA7KlwG1MC" target="_blank" rel="noreferrer"
                className="btn-whatsapp py-3 px-6 text-sm">
                שתף! 📤
              </a>
            </div>
          </div>
        )}

      </div>
    </div>
  )
}
