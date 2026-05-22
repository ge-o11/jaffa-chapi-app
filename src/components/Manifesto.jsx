const rows = [
  ['מכירות', 'הנגשה'],
  ['תצוגה פסיבית', 'חוויה אינטראקטיבית'],
  ['יצירה שתלויה על קיר', 'מסלול שחיים אותו בזמן אמת'],
  ['קהל שמסתכל', 'קהל שמשתתף'],
  ['אתר מידע סטטי', 'חוויה דיגיטלית ביום הביקור'],
  ['אמנות כפריט', 'אמנות כמפגש בין אדם למקום'],
]

export default function Manifesto() {
  return (
    <section className="py-24 section-bg" style={{ background: 'linear-gradient(180deg, #0D1B2A 0%, #0f2233 50%, #0D1B2A 100%)' }}>
      <div className="max-w-5xl mx-auto px-4">
        <div className="text-center mb-16">
          <div className="inline-block mb-4 px-4 py-1 rounded-full text-xs font-medium border" style={{ color: 'var(--gold)', borderColor: 'rgba(200,169,110,0.3)', background: 'rgba(200,169,110,0.06)' }}>
            המניפסט שלנו
          </div>
          <h2 className="section-title text-4xl md:text-5xl">
            אמנות העבר מכרה יצירות.
            <br />
            <span style={{ color: 'var(--parchment)' }}>אמנות העתיד</span> יוצרת מסעות.
          </h2>
          <div className="gold-divider"></div>
        </div>

        {/* Comparison table */}
        <div className="overflow-hidden rounded-2xl border mb-16" style={{ borderColor: 'rgba(200,169,110,0.25)' }}>
          <table className="manifesto-table w-full text-right border-collapse">
            <thead>
              <tr>
                <th className="text-right py-4 px-6 w-1/2" style={{ borderLeft: '1px solid rgba(200,169,110,0.15)' }}>
                  <div className="flex items-center gap-2 justify-end">
                    <span>אמנות העבר</span>
                    <span className="text-2xl">⏳</span>
                  </div>
                </th>
                <th className="text-right py-4 px-6 w-1/2">
                  <div className="flex items-center gap-2 justify-end">
                    <span>אמנות העתיד</span>
                    <span className="text-2xl">🚀</span>
                  </div>
                </th>
              </tr>
            </thead>
            <tbody>
              {rows.map(([past, future], i) => (
                <tr key={i} style={{ background: i % 2 === 0 ? 'rgba(13,27,42,0.8)' : 'rgba(26,42,58,0.8)' }}>
                  <td className="py-3 px-6 opacity-60" style={{ borderLeft: '1px solid rgba(200,169,110,0.1)' }}>{past}</td>
                  <td className="py-3 px-6 font-medium" style={{ color: 'var(--gold)' }}>{future}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Quote blocks */}
        <div className="grid md:grid-cols-2 gap-6 mb-12">
          <div className="card border-r-4 text-right" style={{ borderRightColor: 'var(--gold)' }}>
            <p className="text-lg italic leading-relaxed" style={{ color: 'var(--gold-light)' }}>
              "אמנות העבר היא מכירה. אמנות העתיד היא הנגשה."
            </p>
          </div>
          <div className="card border-r-4 text-right" style={{ borderRightColor: 'var(--gold)' }}>
            <p className="text-lg italic leading-relaxed" style={{ color: 'var(--gold-light)' }}>
              "אם האמנות אינה שימושית — היא הופכת את האליטיזם לחומה יפה אך סגורה. השיווק הוא הדלת שמכניסה את הקהל פנימה."
            </p>
          </div>
        </div>

        {/* Central statement */}
        <div className="text-center rounded-3xl py-12 px-8" style={{ background: 'linear-gradient(135deg, rgba(200,169,110,0.1) 0%, rgba(200,169,110,0.05) 100%)', border: '1px solid rgba(200,169,110,0.3)' }}>
          <p className="text-2xl md:text-3xl font-black mb-4" style={{ color: 'var(--gold)', fontFamily: 'Frank Ruhl Libre, serif' }}>
            חפ"י לא רק מוכרת את יפו —
          </p>
          <p className="text-2xl md:text-3xl font-black mb-8" style={{ color: 'var(--parchment)', fontFamily: 'Frank Ruhl Libre, serif' }}>
            חפ"י מנגישה אותה כחוויה חיה.
          </p>
          <p className="text-xl" style={{ color: 'var(--gold-light)' }}>
            יפו העתיקה אינה רק מקום לצפות בו — היא מרחב שאפשר להפעיל, להנגיש ולחוות מחדש.
          </p>
          <div className="mt-8">
            <span className="text-3xl">באים איתי למסע...?!</span>
          </div>
        </div>
      </div>
    </section>
  )
}
