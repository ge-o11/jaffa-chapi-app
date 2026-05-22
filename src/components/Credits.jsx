const categories = [
  { icon: '🍽️', name: 'לטעום', desc: 'מסעדות, קפה, אוכל רחוב', examples: ['מסעדות דגים', 'קפה בוקר', 'מיצים טריים'] },
  { icon: '🎨', name: 'גלריות', desc: 'אמנות, יצירה ורכישה', examples: ['גלריות מקומיות', 'יצירות ידניות', 'עיצוב יודאיקה'] },
  { icon: '🚶', name: 'לסייר', desc: 'סיורים מודרכים ועצמאיים', examples: ['סיורים אינטראקטיביים', 'ציד מטמון', 'מסלולים עם ילדים'] },
  { icon: '🌿', name: 'לחוות', desc: 'פעילויות וחוויות ייחודיות', examples: ['חוויות קולינריות', 'סדנאות', 'אטרקציות'] },
]

export default function Credits() {
  return (
    <section id="credits" className="py-24 section-bg" style={{ background: 'var(--navy)' }}>
      <div className="max-w-6xl mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="section-title">קופונים, קרדיטים והטבות</h2>
          <div className="gold-divider"></div>
          <p className="section-subtitle">מערכת נקודות בלעדית לחברי קהילת יפו העתיקה</p>
        </div>

        {/* Credit calculator */}
        <div className="rounded-3xl p-8 md:p-12 mb-16 text-center" style={{ background: 'linear-gradient(135deg, rgba(200,169,110,0.12) 0%, rgba(200,169,110,0.04) 100%)', border: '1px solid rgba(200,169,110,0.3)' }}>
          <div className="text-5xl mb-4">🏅</div>
          <h3 className="text-3xl font-black mb-6" style={{ color: 'var(--gold)', fontFamily: 'Frank Ruhl Libre, serif' }}>
            כמה נקודות תצברו?
          </h3>
          <div className="grid grid-cols-3 gap-6 max-w-2xl mx-auto mb-8">
            <div className="card text-center">
              <div className="text-4xl font-black gold-shimmer">10</div>
              <div className="text-sm mt-1" style={{ color: 'var(--gold-light)' }}>בהצטרפות</div>
            </div>
            <div className="card text-center">
              <div className="text-4xl font-black gold-shimmer">+1</div>
              <div className="text-sm mt-1" style={{ color: 'var(--gold-light)' }}>כל יום</div>
            </div>
            <div className="card text-center">
              <div className="text-4xl font-black gold-shimmer">40</div>
              <div className="text-sm mt-1" style={{ color: 'var(--gold-light)' }}>אחרי חודש</div>
            </div>
          </div>
          <p className="text-lg opacity-80" style={{ color: 'var(--gold-light)' }}>
            התנאי היחיד — להישאר חבר פעיל בקהילת יפו העתיקה
          </p>
        </div>

        {/* Categories */}
        <h3 className="text-2xl font-bold text-center mb-8" style={{ color: 'var(--gold)', fontFamily: 'Frank Ruhl Libre, serif' }}>
          היכן ניתן לממש?
        </h3>
        <div className="grid md:grid-cols-4 gap-5 mb-12">
          {categories.map(cat => (
            <div key={cat.name} className="card text-right">
              <div className="text-4xl mb-3">{cat.icon}</div>
              <div className="font-bold text-lg mb-1" style={{ color: 'var(--gold)' }}>{cat.name}</div>
              <div className="text-sm mb-3 opacity-70" style={{ color: 'var(--parchment)' }}>{cat.desc}</div>
              <ul className="space-y-1">
                {cat.examples.map(e => (
                  <li key={e} className="text-xs flex items-center gap-1" style={{ color: 'var(--gold-light)' }}>
                    <span style={{ color: 'var(--gold)' }}>✦</span> {e}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Business owners */}
        <div className="card p-8 text-right" style={{ borderColor: 'rgba(200,169,110,0.4)' }}>
          <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
            <div>
              <h3 className="text-2xl font-bold mb-2" style={{ color: 'var(--gold)' }}>🏪 לבעלי מתחמים</h3>
              <p className="opacity-70 max-w-lg" style={{ color: 'var(--parchment)' }}>
                קבלו מערכת ניהול פשוטה — הזינו הטבות, קבעו ערך בנקודות קרדיט,
                ונהלו מיני-סייט בלעדי לאטרקציה שלכם. הגדילו את מספר המבקרים עם קהל חם ומוכן.
              </p>
            </div>
            <a href="#contact" className="btn-gold flex-shrink-0">
              צור קשר עם חפ"י →
            </a>
          </div>
        </div>
      </div>
    </section>
  )
}
