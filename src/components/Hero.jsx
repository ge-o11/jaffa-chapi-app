export default function Hero() {
  return (
    <section id="hero" className="relative min-h-screen flex items-center overflow-hidden" style={{ background: 'linear-gradient(180deg, #0D1B2A 0%, #0f2233 60%, #0D1B2A 100%)' }}>
      {/* Background stars */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {[...Array(40)].map((_, i) => (
          <div key={i} className="absolute rounded-full" style={{
            width: Math.random() * 2 + 1 + 'px',
            height: Math.random() * 2 + 1 + 'px',
            background: 'var(--gold)',
            top: Math.random() * 100 + '%',
            left: Math.random() * 100 + '%',
            opacity: Math.random() * 0.5 + 0.1,
          }} />
        ))}
      </div>

      <div className="max-w-7xl mx-auto px-4 py-20 w-full">
        <div className="flex flex-col-reverse lg:flex-row items-center justify-between gap-16">

          {/* Text content */}
          <div className="flex-1 text-right max-w-2xl">
            <div className="inline-block mb-6 px-4 py-2 rounded-full text-sm font-medium border" style={{ color: 'var(--gold)', borderColor: 'rgba(200,169,110,0.3)', background: 'rgba(200,169,110,0.08)' }}>
              ✦ חוויות פעילות ביפו העתיקה — חפ"י
            </div>

            <h1 className="text-4xl md:text-6xl font-black leading-tight mb-6" style={{ fontFamily: 'Frank Ruhl Libre, serif', color: 'var(--parchment)' }}>
              <span style={{ color: 'var(--gold)' }}>יפו העתיקה</span>
              <br />
              כחוויה שחיים אותה
              <br />
              <span className="text-3xl md:text-5xl">בזמן אמת</span>
            </h1>

            <p className="text-xl md:text-2xl mb-4 font-medium" style={{ color: 'var(--gold-light)' }}>
              להפוך את יפו העתיקה ממקום שמבקרים בו —
            </p>
            <p className="text-xl md:text-2xl mb-10 font-bold" style={{ color: 'var(--gold)' }}>
              לחוויה שמשתתפים בה.
            </p>

            <div className="flex flex-wrap gap-4 justify-end mb-12">
              <a href="https://chat.whatsapp.com/JAFFA" target="_blank" rel="noreferrer" className="btn-whatsapp text-lg py-4 px-8 pulse-ring rounded-2xl">
                <svg width="22" height="22" viewBox="0 0 24 24" fill="currentColor"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/></svg>
                הצטרפות לקהילה — חינם
              </a>
              <a href="#tours" className="btn-outline text-lg py-4 px-8 rounded-2xl">
                גלה את הסיורים
              </a>
            </div>

            {/* Stats */}
            <div className="flex flex-wrap gap-8 justify-end">
              {[
                { num: '10', label: 'נקודות קרדיט בהצטרפות' },
                { num: '+1', label: 'נקודה כל יום בקהילה' },
                { num: '∞', label: 'הטבות לחברי הקהילה' },
              ].map(s => (
                <div key={s.label} className="text-right">
                  <div className="text-3xl font-black gold-shimmer">{s.num}</div>
                  <div className="text-sm opacity-70" style={{ color: 'var(--gold-light)' }}>{s.label}</div>
                </div>
              ))}
            </div>
          </div>

          {/* Phone mockup */}
          <div className="flex justify-center lg:justify-end">
            <div className="phone-frame">
              <div className="w-full h-full flex flex-col items-center justify-center p-6 pt-10">
                {/* Logo area inside phone */}
                <div className="w-20 h-20 rounded-full border-4 flex items-center justify-center mb-4 shadow-2xl" style={{ borderColor: 'var(--gold)', background: 'linear-gradient(135deg, #1A2A3A, #0D1B2A)' }}>
                  <span className="text-lg font-black" style={{ color: 'var(--gold)', fontFamily: 'Frank Ruhl Libre, serif' }}>חפ"י</span>
                </div>

                <div className="text-center mb-4">
                  <div className="font-black text-base mb-1" style={{ color: 'var(--gold)', fontFamily: 'Frank Ruhl Libre, serif' }}>יפו העתיקה</div>
                  <div className="text-xs opacity-60" style={{ color: 'var(--parchment)' }}>Old Jaffa Experience</div>
                </div>

                <div className="w-full space-y-2 text-xs">
                  {['🗺️ סיורים אינטראקטיביים', '🎁 קופונים והטבות', '🏆 הגרלות ופרסים', '📍 מסלולי ניווט', '🛒 חנות מקומית'].map(item => (
                    <div key={item} className="flex items-center gap-2 rounded-lg px-3 py-2" style={{ background: 'rgba(200,169,110,0.1)', color: 'var(--parchment)' }}>
                      {item}
                    </div>
                  ))}
                </div>

                <div className="mt-4 w-full rounded-lg py-2 text-center text-xs font-bold" style={{ background: 'var(--whatsapp)', color: 'white' }}>
                  ✓ הצטרף לקהילה
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom wave */}
      <div className="absolute bottom-0 left-0 right-0">
        <svg viewBox="0 0 1440 60" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M0 60L1440 60L1440 30C1200 50 800 0 720 10C640 20 240 55 0 30L0 60Z" fill="#0D1B2A" opacity="0.5"/>
        </svg>
      </div>
    </section>
  )
}
