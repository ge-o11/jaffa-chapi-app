export default function Hero() {
  return (
    <section id="hero" className="relative min-h-screen flex items-center overflow-hidden">
      {/* Real Jaffa background image */}
      <div className="absolute inset-0">
        <img
          src="https://images.pexels.com/photos/18809479/pexels-photo-18809479.jpeg?w=1400&q=80"
          alt="יפו העתיקה"
          className="w-full h-full object-cover object-center"
        />
        <div className="absolute inset-0" style={{ background: 'linear-gradient(135deg, rgba(44,26,14,0.72) 0%, rgba(139,94,0,0.45) 50%, rgba(44,26,14,0.7) 100%)' }} />
        {/* Warm vignette */}
        <div className="absolute inset-0" style={{ background: 'radial-gradient(ellipse at center, transparent 35%, rgba(44,26,14,0.55) 100%)' }} />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 py-20 w-full">
        <div className="flex flex-col-reverse lg:flex-row items-center justify-between gap-16">

          {/* Text */}
          <div className="flex-1 text-right max-w-2xl">
            <div className="inline-flex items-center gap-2 mb-6 px-4 py-2 rounded-full text-sm font-medium border backdrop-blur-sm"
              style={{ color: '#F5DDA0', borderColor: 'rgba(232,213,163,0.5)', background: 'rgba(232,213,163,0.15)' }}>
              <span>✦</span> חוויות פעילות ביפו העתיקה — חפ"י
            </div>

            <h1 className="text-5xl md:text-7xl font-black leading-tight mb-6"
              style={{ fontFamily: 'Frank Ruhl Libre, serif', textShadow: '0 2px 24px rgba(0,0,0,0.55)' }}>
              <span style={{ color: '#F5DDA0' }}>יפו</span>
              <span style={{ color: '#FFFFFF' }}> העתיקה</span>
              <br />
              <span className="text-4xl md:text-5xl" style={{ color: '#E8D5A3' }}>כחוויה חיה</span>
            </h1>

            <p className="text-xl md:text-2xl mb-3 font-medium" style={{ color: 'rgba(255,250,235,0.95)' }}>
              להפוך את יפו העתיקה ממקום שמבקרים בו —
            </p>
            <p className="text-2xl md:text-3xl mb-10 font-black" style={{ color: '#FFD480', textShadow: '0 0 30px rgba(255,212,128,0.5)' }}>
              לחוויה שמשתתפים בה. ✨
            </p>

            <div className="flex flex-wrap gap-4 justify-end mb-12">
              <a href="https://chat.whatsapp.com/BhnFkwONJd6DeA7KlwG1MC" target="_blank" rel="noreferrer"
                className="btn-whatsapp text-lg py-4 px-8 rounded-2xl pulse-ring shadow-2xl">
                <WaIcon /> הצטרפות לקהילה — חינם
              </a>
              <a href="#game" className="btn-gold text-lg py-4 px-8 rounded-2xl shadow-2xl">
                🎯 שחק את המסע
              </a>
            </div>

            <div className="flex flex-wrap gap-8 justify-end">
              {[
                { num: '10', label: 'נקודות בהצטרפות' },
                { num: '+1', label: 'נקודה ליום' },
                { num: '10', label: 'תחנות במסע' },
              ].map(s => (
                <div key={s.label} className="text-right">
                  <div className="text-4xl font-black" style={{ color: '#FFD480', textShadow: '0 2px 12px rgba(0,0,0,0.4)' }}>{s.num}</div>
                  <div className="text-sm" style={{ color: '#E8D5A3', opacity: 0.9 }}>{s.label}</div>
                </div>
              ))}
            </div>
          </div>

          {/* Phone mockup */}
          <div className="flex justify-center">
            <div className="phone-frame">
              <div className="w-full h-full flex flex-col items-center justify-center p-4 pt-10">
                <div className="w-20 h-20 rounded-full border-4 flex items-center justify-center mb-3 shadow-2xl overflow-hidden"
                  style={{ borderColor: 'var(--gold)' }}>
                  <img src="https://images.pexels.com/photos/18809933/pexels-photo-18809933.jpeg?w=200&q=80"
                    alt="יפו" className="w-full h-full object-cover" />
                </div>
                <div className="font-black text-base mb-0.5 text-center" style={{ color: '#FFD480', fontFamily: 'Frank Ruhl Libre, serif' }}>חפ"י — יפו העתיקה</div>
                <div className="text-xs opacity-60 mb-3" style={{ color: '#F0E6D3' }}>Old Jaffa Experience</div>
                <div className="w-full space-y-1.5 text-xs">
                  {['🗺️ סיורים אינטראקטיביים','🎯 מסע 10 התחנות','🎁 קופונים והטבות','🏆 הגרלות ופרסים','🛒 חנות מקומית'].map(item => (
                    <div key={item} className="flex items-center gap-2 rounded-lg px-3 py-1.5"
                      style={{ background: 'rgba(232,213,163,0.18)', color: '#F0E6D3' }}>{item}</div>
                  ))}
                </div>
                <div className="mt-3 w-full rounded-lg py-2 text-center text-xs font-bold" style={{ background: 'var(--whatsapp)', color: 'white' }}>
                  ✓ הצטרף לקהילה
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom fade to stone */}
      <div className="absolute bottom-0 left-0 right-0 h-32"
        style={{ background: 'linear-gradient(to bottom, transparent, rgba(245,237,214,0.9))' }} />

      {/* Scroll hint */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 flex flex-col items-center gap-2 opacity-60">
        <div className="text-xs" style={{ color: '#E8D5A3' }}>גלול למטה</div>
        <div className="w-px h-8 animate-bounce" style={{ background: '#FFD480' }} />
      </div>
    </section>
  )
}

function WaIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
    </svg>
  )
}
