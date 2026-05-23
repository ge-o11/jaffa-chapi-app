import SpinWheel from './SpinWheel'

const prizes = [
  { icon: '🍦', title: 'גלידה ב-5 ₪', desc: 'כדור גלידה בקניית מנה — לכל ילד משתתף', type: 'פרס מובטח' },
  { icon: '🍕', title: 'ארוחה משפחתית', desc: 'ארוחה משפחתית חינם — לזוכה הגדול', type: 'פרס ראשי' },
  { icon: '📸', title: 'חוויית צילום', desc: 'צילום מקצועי בסמטאות יפו — פרס ייחודי', type: 'חוויית פרמיום' },
  { icon: '🛒', title: 'קופון קנייה', desc: 'קופון לחנויות ביפו — 15% הנחה', type: 'פרס נוסף' },
]

export default function Lottery() {
  return (
    <section id="lottery" className="py-24" style={{ background: 'var(--navy)' }}>
      <div className="max-w-7xl mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="section-title">הגרלת היום לילדים</h2>
          <div className="gold-divider"></div>
          <p className="section-subtitle">חוויה אינטראקטיבית שמייצרת באזז ברשתות החברתיות</p>
        </div>

        <div className="max-w-2xl mx-auto mb-16">
          {/* Spin Wheel game — centered, no 4-step explainer */}
          <div className="card py-8">
            <SpinWheel />
          </div>
        </div>

        {/* Prizes grid */}
        <h3 className="text-2xl font-bold text-center mb-8" style={{ color: 'var(--gold)', fontFamily: 'Frank Ruhl Libre, serif' }}>
          מבנה הפרסים — כולם מנצחים
        </h3>
        <div className="grid md:grid-cols-4 gap-4 mb-12">
          {prizes.map(p => (
            <div key={p.title} className="card text-right hover:transform hover:-translate-y-1 transition-all">
              <div className="text-3xl mb-2">{p.icon}</div>
              <div className="text-xs font-bold mb-1 px-2 py-0.5 rounded-full inline-block credit-badge">{p.type}</div>
              <div className="font-bold mt-2 mb-1" style={{ color: 'var(--gold)' }}>{p.title}</div>
              <div className="text-sm opacity-70" style={{ color: 'var(--parchment)' }}>{p.desc}</div>
            </div>
          ))}
        </div>

        {/* Golden rules */}
        <div className="rounded-3xl p-8" style={{ background: 'linear-gradient(135deg, rgba(200,169,110,0.1), rgba(200,169,110,0.03))', border: '1px solid rgba(200,169,110,0.3)' }}>
          <h3 className="text-2xl font-bold text-center mb-8" style={{ color: 'var(--gold)' }}>🏆 שלושת חוקי הזהב</h3>
          <div className="grid md:grid-cols-3 gap-6">
            {[
              { num: '1', title: 'פרס מובטח לכל ילד', desc: 'Instant Win — אף ילד לא יוצא ריק. "פרס ניחום" מצריך הגעה פיזית למסעדה.' },
              { num: '2', title: 'שעון עצר 90 דקות', desc: 'Countdown Timer על מסך הזכייה. FOMO מיידי — הילדים ידחפו את ההורים!' },
              { num: '3', title: 'ניווט פיזי למקום', desc: 'כפתור Waze/Maps בהודעה. הורים עייפים מגיעים ישר לנקודת המכירה.' },
            ].map(rule => (
              <div key={rule.num} className="card text-right">
                <div className="text-4xl font-black mb-3 opacity-20" style={{ color: 'var(--gold)' }}>{rule.num}</div>
                <div className="font-bold text-lg mb-2" style={{ color: 'var(--gold)' }}>{rule.title}</div>
                <div className="text-sm opacity-70 leading-relaxed" style={{ color: 'var(--parchment)' }}>{rule.desc}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
