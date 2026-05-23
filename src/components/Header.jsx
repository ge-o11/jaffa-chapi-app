import { useState } from 'react'
import { useUser } from '../context/UserContext'

export default function Header({ onLoginClick }) {
  const [showMenu, setShowMenu] = useState(false)
  const { user, logout } = useUser()

  function handleLogout() {
    logout()
    setShowMenu(false)
  }

  return (
    <header className="sticky-header">
      <div className="max-w-7xl mx-auto px-3 md:px-4 py-2 md:py-3 flex items-center justify-between">
        <a href="#hero" className="flex items-center gap-2 md:gap-3">
          <div className="w-9 h-9 md:w-10 md:h-10 rounded-full border-2 flex items-center justify-center text-xs font-bold"
            style={{ borderColor: '#1A6B8A', color: '#0D3A56', background: 'rgba(176,212,227,0.4)' }}>
            חפ"י
          </div>
          <div className="hidden sm:block">
            <div className="font-bold text-sm leading-tight" style={{ color: '#0D3A56', fontFamily: 'Frank Ruhl Libre, serif' }}>חוויות פעילות</div>
            <div className="text-xs opacity-75" style={{ color: '#1A6B8A' }}>יפו העתיקה</div>
          </div>
        </a>

        <div className="flex items-center gap-2">
          {user ? (
            <div className="relative">
              <button
                onClick={() => setShowMenu(v => !v)}
                className="flex items-center gap-1.5 rounded-full py-1.5 px-2.5 transition-all hover:scale-105"
                style={{
                  background: 'linear-gradient(135deg, rgba(74,157,184,0.18), rgba(176,212,227,0.25))',
                  border: '1.5px solid rgba(26,107,138,0.4)',
                  cursor: 'pointer',
                }}
              >
                <span className="text-xs font-black"
                  style={{ color: '#0D3A56', fontFamily: 'Frank Ruhl Libre, serif' }}>
                  ⭐ {user.points}
                </span>
              </button>

              {showMenu && (
                <div className="absolute left-0 top-full mt-2 w-56 rounded-2xl overflow-hidden shadow-2xl z-50 text-right"
                  style={{ background: 'rgba(225,240,245,0.98)', backdropFilter: 'blur(20px)', border: '1px solid rgba(74,157,184,0.4)', boxShadow: '0 16px 48px rgba(13,58,86,0.3)' }}>
                  <div className="px-4 py-3 border-b" style={{ borderColor: 'rgba(74,157,184,0.25)' }}>
                    <div className="font-bold text-sm" style={{ color: '#0D3A56' }}>{user.username}</div>
                    <div className="text-xs opacity-70" style={{ color: '#1A6B8A' }}>{user.phone}</div>
                  </div>
                  <div className="px-4 py-3 border-b text-center" style={{ borderColor: 'rgba(74,157,184,0.25)' }}>
                    <div className="text-xs opacity-70 mb-0.5" style={{ color: '#1A6B8A' }}>נקודות צבורות</div>
                    <div className="text-3xl font-black" style={{ color: '#0D3A56', fontFamily: 'Frank Ruhl Libre, serif' }}>
                      ⭐ {user.points}
                    </div>
                  </div>
                  <button onClick={handleLogout}
                    className="w-full text-right px-4 py-3 text-sm hover:bg-red-50 transition-colors font-bold"
                    style={{ color: '#9F1010' }}>
                    התנתק
                  </button>
                </div>
              )}

              {showMenu && (
                <div className="fixed inset-0 z-40" onClick={() => setShowMenu(false)} />
              )}
            </div>
          ) : (
            <button
              onClick={onLoginClick}
              className="text-xs md:text-sm font-bold py-2 px-3 md:px-4 rounded-full transition-all hover:scale-105 active:scale-95"
              style={{
                background: 'linear-gradient(135deg, #1A6B8A, #4A9DB8)',
                color: '#FFFFFF',
                border: '2px solid rgba(255,255,255,0.4)',
                boxShadow: '0 4px 12px rgba(26,107,138,0.4)',
                cursor: 'pointer',
              }}
            >
              כניסה
            </button>
          )}
        </div>
      </div>
    </header>
  )
}
