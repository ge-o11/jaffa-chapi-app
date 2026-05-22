const options = [
  {
    icon: '🚌',
    title: 'תחבורה ציבורית',
    lines: ['קו 10, 25, 41 — תחנת שוק הכרמל', 'קו 46 — ישיר מתל אביב', 'מונית שיתופית מהתחנה המרכזית'],
    cta: 'תכנן נסיעה',
    ctaHref: 'https://www.moovitapp.com',
  },
  {
    icon: '🚗',
    title: 'חניה',
    lines: ['חניון נמל יפו — שעה ראשונה חינם', 'חניון עזמות — זול ונגיש', 'חניה כחול-לבן ברחובות הסמוכים'],
    cta: 'פתח בניווט',
    ctaHref: 'https://waze.com',
  },
  {
    icon: '🚕',
    title: 'מונית / שירות',
    lines: ['גט, יאנגו — ישיר לשער יפו', 'כ-20-40 ₪ ממרכז תל אביב', 'זמן הגעה ממרכז העיר: 10-15 דק\''],
    cta: 'הזמן הסעה',
    ctaHref: 'https://gett.com',
  },
  {
    icon: '🚲',
    title: 'אופניים / קורקינט',
    lines: ['תחנות תל-אופן לאורך כל הדרך', 'מסלול אופניים מהתיילות', 'קורקינטים חשמליים — בירד ולייבר'],
    cta: 'מסלול אופניים',
    ctaHref: '#',
  },
]

export default function Arrival() {
  return (
    <section id="arrival" className="py-24" style={{ background: 'linear-gradient(180deg, rgba(237,224,196,0.92) 0%, rgba(245,237,214,0.94) 100%)' }}>
      <div className="max-w-5xl mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="section-title">הגעה ליפו העתיקה</h2>
          <div className="gold-divider"></div>
          <p className="section-subtitle">כל האפשרויות להגיע — בקלות ובנוחות</p>
        </div>

        <div className="grid md:grid-cols-2 gap-6 mb-12">
          {options.map(opt => (
            <div key={opt.title} className="card text-right">
              <div className="flex items-center gap-3 mb-4">
                <span className="text-4xl">{opt.icon}</span>
                <h3 className="font-bold text-xl" style={{ color: 'var(--gold)', fontFamily: 'Frank Ruhl Libre, serif' }}>{opt.title}</h3>
              </div>
              <ul className="space-y-2 mb-5">
                {opt.lines.map(line => (
                  <li key={line} className="flex items-start gap-2 text-sm" style={{ color: 'var(--parchment)' }}>
                    <span style={{ color: 'var(--gold)', marginTop: 2 }}>✦</span>
                    {line}
                  </li>
                ))}
              </ul>
              <a href={opt.ctaHref} target="_blank" rel="noreferrer" className="btn-outline py-2 px-4 text-sm">
                {opt.cta} →
              </a>
            </div>
          ))}
        </div>

        {/* Map embed placeholder */}
        <div className="rounded-2xl overflow-hidden border" style={{ borderColor: 'rgba(200,169,110,0.3)', height: 300, background: 'var(--navy-light)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          <div className="text-center">
            <div className="text-5xl mb-4">🗺️</div>
            <p className="mb-4" style={{ color: 'var(--gold)' }}>יפו העתיקה, תל אביב-יפו</p>
            <a href="https://maps.google.com/?q=Old+Jaffa+Tel+Aviv" target="_blank" rel="noreferrer" className="btn-gold">
              פתח במפות
            </a>
          </div>
        </div>
      </div>
    </section>
  )
}
