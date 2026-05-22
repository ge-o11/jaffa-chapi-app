import { useState } from 'react'
import { Menu, X } from 'lucide-react'
import { useUser } from '../context/UserContext'

const navItems = [
  { label: 'ראשי', href: '#hero' },
  { label: 'הצטרפות לקהילה', href: '#community' },
  { label: 'סיורים', href: '#tours' },
  { label: 'קרדיטים', href: '#credits' },
  { label: 'הגרלות', href: '#lottery' },
  { label: 'אירועים', href: '#events' },
  { label: 'חנות', href: '#store' },
  { label: 'הגעה', href: '#arrival' },
  { label: 'על חפ"י', href: '#about' },
  { label: 'צור קשר', href: '#contact' },
]

export default function Header({ onLoginClick }) {
  const [open, setOpen] = useState(false)
  const [showMenu, setShowMenu] = useState(false)
  const { user, logout } = useUser()

  function handleLogout() {
    logout()
    setShowMenu(false)
  }

  return (
    <header className="sticky-header">
      <div className="max-w-7xl mx-auto px-4 py-3 flex items-center justify-between">
        <a href="#hero" className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-full border-2 flex items-center justify-center text-xs font-bold"
            style={{ borderColor: 'var(--gold)', color: 'var(--gold)', background: 'rgba(200,169,110,0.1)' }}>
            חפ"י
          </div>
          <div className="hidden sm:block">
            <div className="font-bold text-sm leading-tight" style={{ color: 'var(--gold)', fontFamily: 'Frank Ruhl Libre, serif' }}>חוויות פעילות</div>
            <div className="text-xs opacity-70" style={{ color: 'var(--gold-light)' }}>יפו העתיקה</div>
          </div>
        </a>

        <nav className="hidden lg:flex items-center gap-6">
          {navItems.map(item => (
            <a key={item.href} href={item.href} className="text-sm transition-colors duration-200" style={{ color: 'var(--gold-light)' }}
              onMouseEnter={e => e.target.style.color = 'var(--gold)'}
              onMouseLeave={e => e.target.style.color = 'var(--gold-light)'}>
              {item.label}
            </a>
          ))}
        </nav>

        <div className="flex items-center gap-3">
          {user ? (
            <div className="relative">
              <button
                onClick={() => setShowMenu(v => !v)}
                className="flex items-center gap-2 rounded-full py-2 px-3 transition-all"
                style={{ background: 'rgba(200,169,110,0.1)', border: '1px solid rgba(200,169,110,0.3)' }}
              >
                <div className="w-7 h-7 rounded-full flex items-center justify-center text-xs font-black"
                  style={{ background: 'var(--gold)', color: 'var(--navy)' }}>
                  {user.username.charAt(0).toUpperCase()}
                </div>
                <span className="hidden sm:block text-sm font-bold" style={{ color: 'var(--gold)' }}>
                  {user.username}
                </span>
                <span className="text-xs font-bold px-2 py-0.5 rounded-full"
                  style={{ background: 'rgba(200,169,110,0.2)', color: 'var(--gold)' }}>
                  ⭐ {user.points}
                </span>
              </button>

              {showMenu && (
                <div className="absolute left-0 top-full mt-2 w-52 rounded-2xl overflow-hidden shadow-2xl z-50 text-right"
                  style={{ background: 'rgba(255,252,245,0.98)', border: '1px solid rgba(200,169,110,0.4)', boxShadow: '0 16px 48px rgba(44,26,14,0.25)' }}>
                  <div className="px-4 py-3 border-b" style={{ borderColor: 'rgba(200,169,110,0.2)' }}>
                    <div className="font-bold text-sm" style={{ color: '#8B5E00' }}>{user.username}</div>
                    <div className="text-xs opacity-70" style={{ color: '#6B4A00' }}>{user.phone}</div>
                  </div>
                  <div className="px-4 py-3 border-b" style={{ borderColor: 'rgba(200,169,110,0.2)' }}>
                    <div className="text-xs opacity-60 mb-0.5" style={{ color: '#6B4A00' }}>נקודות צבורות</div>
                    <div className="text-2xl font-black gold-shimmer">{user.points} ⭐</div>
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
              className="btn-gold text-sm py-2 px-4"
            >
              כניסה / הרשמה
            </button>
          )}

          <a href="https://chat.whatsapp.com/BhnFkwONJd6DeA7KlwG1MC" target="_blank" rel="noreferrer"
            className="btn-whatsapp text-sm py-2 px-4 hidden sm:inline-flex">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/></svg>
            הצטרפות לקהילה
          </a>
          <button onClick={() => setOpen(!open)} className="lg:hidden p-2 rounded-lg" style={{ color: 'var(--gold)' }}>
            {open ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      {open && (
        <div className="lg:hidden border-t px-4 pb-4 pt-2" style={{ borderColor: 'rgba(200,169,110,0.3)', background: 'rgba(248,240,220,0.98)', backdropFilter: 'blur(12px)' }}>
          {user && (
            <div className="flex items-center gap-3 py-3 mb-2 border-b" style={{ borderColor: 'rgba(200,169,110,0.15)' }}>
              <div className="w-9 h-9 rounded-full flex items-center justify-center text-sm font-black"
                style={{ background: 'var(--gold)', color: 'var(--navy)' }}>
                {user.username.charAt(0).toUpperCase()}
              </div>
              <div>
                <div className="font-bold text-sm" style={{ color: 'var(--gold)' }}>{user.username}</div>
                <div className="text-xs" style={{ color: 'var(--gold-light)', opacity: 0.7 }}>⭐ {user.points} נקודות</div>
              </div>
            </div>
          )}
          {navItems.map(item => (
            <a key={item.href} href={item.href} onClick={() => setOpen(false)}
              className="block py-3 text-base border-b" style={{ color: 'var(--gold-light)', borderColor: 'rgba(200,169,110,0.1)' }}>
              {item.label}
            </a>
          ))}
          {user ? (
            <button onClick={() => { logout(); setOpen(false) }}
              className="block w-full text-right py-3 text-sm mt-2" style={{ color: '#FCA5A5' }}>
              התנתק
            </button>
          ) : (
            <button onClick={() => { onLoginClick(); setOpen(false) }}
              className="btn-gold w-full justify-center mt-4">
              כניסה / הרשמה
            </button>
          )}
          <a href="https://chat.whatsapp.com/BhnFkwONJd6DeA7KlwG1MC" target="_blank" rel="noreferrer" className="btn-whatsapp w-full justify-center mt-3">
            הצטרפות לקהילה בוואצ'אפ
          </a>
        </div>
      )}
    </header>
  )
}
