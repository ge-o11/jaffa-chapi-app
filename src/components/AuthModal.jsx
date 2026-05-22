import { useState } from 'react'
import { useUser } from '../context/UserContext'

const PHONE_RE = /^0[2-9]\d{7,8}$/

export default function AuthModal({ onClose }) {
  const { login } = useUser()
  const [phase, setPhase] = useState('phone')   // phone | name | returning | welcome
  const [phone, setPhone]     = useState('')
  const [username, setUsername] = useState('')
  const [returnUser, setReturnUser] = useState(null)
  const [err, setErr] = useState('')

  function handlePhone(e) {
    e.preventDefault()
    const p = phone.replace(/[-\s]/g, '')
    if (!PHONE_RE.test(p)) { setErr('מספר טלפון לא תקין — הזן מספר ישראלי תקין'); return }
    setErr('')
    // peek at storage: returning user?
    try {
      const saved = JSON.parse(localStorage.getItem('jaffa_chapi_user'))
      if (saved?.phone === p) { setReturnUser(saved); setPhase('returning'); return }
    } catch {}
    setPhone(p)
    setPhase('name')
  }

  function handleRegister(e) {
    e.preventDefault()
    if (!username.trim()) { setErr('נא הזן שם משתמש'); return }
    setErr('')
    login({ phone, username: username.trim() })
    setPhase('welcome')
  }

  function handleReturn() {
    login({ phone: returnUser.phone, username: returnUser.username })
    onClose()
  }

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4"
      style={{ background: 'rgba(6,13,24,0.92)', backdropFilter: 'blur(8px)' }}
    >
      <div
        className="w-full max-w-sm rounded-3xl p-8 text-right relative"
        style={{ background: 'var(--navy)', border: '1px solid rgba(200,169,110,0.35)', boxShadow: '0 24px 80px rgba(0,0,0,0.7)' }}
      >
        {/* Close */}
        <button
          onClick={onClose}
          className="absolute top-4 left-4 w-8 h-8 rounded-full flex items-center justify-center text-sm opacity-50 hover:opacity-100 transition-opacity"
          style={{ background: 'rgba(200,169,110,0.1)', color: 'var(--gold)' }}
        >✕</button>

        {/* Logo */}
        <div className="text-center mb-6">
          <div className="w-16 h-16 rounded-full border-2 flex items-center justify-center text-lg font-black mx-auto mb-3"
            style={{ borderColor: 'var(--gold)', color: 'var(--gold)', background: 'rgba(200,169,110,0.1)', fontFamily: 'Frank Ruhl Libre, serif' }}>
            חפ"י
          </div>
          <div className="font-bold text-sm opacity-60" style={{ color: 'var(--gold-light)' }}>חוויות פעילות · יפו העתיקה</div>
        </div>

        {/* ── PHONE ── */}
        {phase === 'phone' && (
          <form onSubmit={handlePhone} className="fade-in">
            <h2 className="text-2xl font-black mb-1" style={{ color: 'var(--gold)', fontFamily: 'Frank Ruhl Libre, serif' }}>
              כניסה / הרשמה
            </h2>
            <p className="text-sm mb-6 opacity-60" style={{ color: 'var(--parchment)' }}>
              הזן מספר טלפון כדי להצטרף ולצבור נקודות
            </p>
            <label className="text-xs font-bold block mb-1" style={{ color: 'var(--gold)' }}>מספר טלפון</label>
            <input
              type="tel"
              dir="ltr"
              placeholder="050-0000000"
              value={phone}
              onChange={e => { setPhone(e.target.value); setErr('') }}
              className="w-full rounded-xl px-4 py-3 text-left text-base mb-1 outline-none"
              style={{ background: 'rgba(200,169,110,0.07)', border: '1px solid rgba(200,169,110,0.3)', color: 'var(--parchment)', fontFamily: 'monospace' }}
              autoFocus
            />
            {err && <p className="text-xs text-red-400 mb-3">{err}</p>}
            {!err && <div className="h-4 mb-3" />}
            <button type="submit" className="btn-gold w-full justify-center py-3 text-base">
              המשך ←
            </button>
            <p className="text-center text-xs mt-4 opacity-40" style={{ color: 'var(--parchment)' }}>
              הנתונים נשמרים בדפדפן שלך בלבד
            </p>
          </form>
        )}

        {/* ── USERNAME (new) ── */}
        {phase === 'name' && (
          <form onSubmit={handleRegister} className="fade-in">
            <div className="text-4xl mb-3 text-center">🎉</div>
            <h2 className="text-2xl font-black mb-1 text-center" style={{ color: 'var(--gold)', fontFamily: 'Frank Ruhl Libre, serif' }}>
              ברוך הבא לחפ"י!
            </h2>
            <p className="text-sm mb-6 opacity-60 text-center" style={{ color: 'var(--parchment)' }}>
              רק צריך לבחור שם — ותתחיל עם 10 נקודות!
            </p>
            <label className="text-xs font-bold block mb-1" style={{ color: 'var(--gold)' }}>שם משתמש / כינוי</label>
            <input
              type="text"
              placeholder="למשל: דני, אימא לשלושה, חוקר יפו..."
              value={username}
              onChange={e => { setUsername(e.target.value); setErr('') }}
              className="w-full rounded-xl px-4 py-3 text-base mb-1 outline-none"
              style={{ background: 'rgba(200,169,110,0.07)', border: '1px solid rgba(200,169,110,0.3)', color: 'var(--parchment)' }}
              autoFocus
              maxLength={24}
            />
            {err && <p className="text-xs text-red-400 mb-3">{err}</p>}
            {!err && <div className="h-4 mb-3" />}
            <div className="rounded-2xl px-4 py-3 mb-4 text-center text-sm"
              style={{ background: 'rgba(200,169,110,0.08)', border: '1px solid rgba(200,169,110,0.2)' }}>
              <span style={{ color: 'var(--gold)' }}>🏅 +10 נקודות</span>
              <span className="opacity-50 mr-1" style={{ color: 'var(--parchment)' }}>ייזכפו לחשבון שלך מיד</span>
            </div>
            <button type="submit" className="btn-gold w-full justify-center py-3 text-base">
              הצטרף! →
            </button>
            <button type="button" onClick={() => setPhase('phone')}
              className="w-full text-center text-xs mt-3 opacity-40 hover:opacity-70 transition-opacity"
              style={{ color: 'var(--gold)' }}>
              ← חזרה
            </button>
          </form>
        )}

        {/* ── RETURNING ── */}
        {phase === 'returning' && returnUser && (
          <div className="fade-in text-center">
            <div className="text-5xl mb-3">👋</div>
            <h2 className="text-2xl font-black mb-1" style={{ color: 'var(--gold)', fontFamily: 'Frank Ruhl Libre, serif' }}>
              ברוך השב, {returnUser.username}!
            </h2>
            <p className="text-sm mb-6 opacity-60" style={{ color: 'var(--parchment)' }}>
              המשך מאיפה שהפסקת
            </p>
            <div className="rounded-2xl px-6 py-5 mb-6"
              style={{ background: 'rgba(200,169,110,0.1)', border: '1px solid rgba(200,169,110,0.3)' }}>
              <div className="text-4xl font-black gold-shimmer">{returnUser.points}</div>
              <div className="text-sm opacity-70" style={{ color: 'var(--gold-light)' }}>נקודות צבורות</div>
            </div>
            <button onClick={handleReturn} className="btn-gold w-full justify-center py-3 text-base">
              כניסה ←
            </button>
            <button onClick={() => setPhase('phone')}
              className="w-full text-center text-xs mt-3 opacity-40 hover:opacity-70 transition-opacity"
              style={{ color: 'var(--gold)' }}>
              ← כניסה עם מספר אחר
            </button>
          </div>
        )}

        {/* ── WELCOME NEW ── */}
        {phase === 'welcome' && (
          <div className="fade-in text-center">
            <div className="text-6xl mb-4 animate-bounce">🎊</div>
            <h2 className="text-2xl font-black mb-2" style={{ color: 'var(--gold)', fontFamily: 'Frank Ruhl Libre, serif' }}>
              ברוך הבא לחפ"י!
            </h2>
            <div className="rounded-2xl px-6 py-5 mb-6"
              style={{ background: 'linear-gradient(135deg, rgba(200,169,110,0.2), rgba(200,169,110,0.05))', border: '2px solid var(--gold)' }}>
              <div className="text-5xl font-black gold-shimmer">+10</div>
              <div className="text-sm mt-1" style={{ color: 'var(--gold)' }}>נקודות הצטרפות זוכו לחשבונך</div>
            </div>
            <p className="text-sm mb-6 opacity-60" style={{ color: 'var(--parchment)' }}>
              שחק, גלה, צבור — והמר נקודות להטבות ביפו
            </p>
            <button onClick={onClose} className="btn-gold w-full justify-center py-3 text-base">
              בוא נתחיל! 🚀
            </button>
          </div>
        )}
      </div>
    </div>
  )
}
