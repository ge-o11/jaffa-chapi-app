export default function Footer() {
  return (
    <footer className="py-12 border-t" style={{ borderColor: 'rgba(200,169,110,0.2)', background: '#060f18' }}>
      <div className="max-w-5xl mx-auto px-4">
        <div className="grid md:grid-cols-3 gap-8 mb-10">
          <div className="text-right">
            <div className="flex items-center gap-3 justify-end mb-4">
              <div>
                <div className="font-black" style={{ color: 'var(--gold)', fontFamily: 'Frank Ruhl Libre, serif' }}>חוויות פעילות ביפו העתיקה</div>
                <div className="text-xs opacity-50" style={{ color: 'var(--gold-light)' }}>חפ"י</div>
              </div>
              <div className="w-10 h-10 rounded-full border-2 flex items-center justify-center text-xs font-bold flex-shrink-0" style={{ borderColor: 'var(--gold)', color: 'var(--gold)' }}>
                חפ"י
              </div>
            </div>
            <p className="text-sm opacity-60 leading-relaxed" style={{ color: 'var(--parchment)' }}>
              להפוך את יפו העתיקה ממקום שמבקרים בו — לחוויה שמשתתפים בה.
            </p>
          </div>

          <div className="text-right">
            <h4 className="font-bold mb-4" style={{ color: 'var(--gold)' }}>קישורים מהירים</h4>
            <ul className="space-y-2 text-sm opacity-70" style={{ color: 'var(--gold-light)' }}>
              {['#community', '#tours', '#credits', '#lottery', '#events', '#store', '#arrival', '#contact'].map((href, i) => (
                <li key={href}><a href={href} className="hover:opacity-100 transition-opacity">{['הצטרפות לקהילה', 'סיורים', 'קרדיטים', 'הגרלות', 'אירועים', 'חנות', 'הגעה', 'צור קשר'][i]}</a></li>
              ))}
            </ul>
          </div>

          <div className="text-right">
            <h4 className="font-bold mb-4" style={{ color: 'var(--gold)' }}>הצטרפו</h4>
            <a href="https://chat.whatsapp.com/JAFFA" target="_blank" rel="noreferrer" className="btn-whatsapp w-full justify-center mb-4">
              הצטרפות לקהילה
            </a>
            <div className="flex gap-3 justify-end mt-4">
              {['📸', '🎵', '💼'].map((icon, i) => (
                <a key={i} href="#" className="w-10 h-10 rounded-full flex items-center justify-center transition-all" style={{ background: 'rgba(200,169,110,0.1)', border: '1px solid rgba(200,169,110,0.2)' }}>
                  {icon}
                </a>
              ))}
            </div>
          </div>
        </div>

        <div className="border-t pt-6 flex flex-col md:flex-row items-center justify-between gap-4" style={{ borderColor: 'rgba(200,169,110,0.15)' }}>
          <div className="text-xs opacity-40 text-right" style={{ color: 'var(--parchment)' }}>
            © 2026 חפ"י — חוויות פעילות ביפו העתיקה. כל הזכויות שמורות.
          </div>
          <div className="text-xs opacity-40 flex gap-4" style={{ color: 'var(--gold-light)' }}>
            <a href="#" className="hover:opacity-70">מדיניות פרטיות</a>
            <a href="#" className="hover:opacity-70">תנאי שימוש</a>
          </div>
        </div>
      </div>
    </footer>
  )
}
