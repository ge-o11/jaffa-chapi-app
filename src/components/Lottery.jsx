const prizes = [
  { icon: '🍦', title: 'גלידה ב-5 ₪', desc: 'כדור גלידה בקניית מנה — לכל ילד משתתף', type: 'פרס מובטח' },
  { icon: '🍕', title: 'ארוחה משפחתית', desc: 'ארוחה משפחתית חינם — לזוכה הגדול', type: 'פרס ראשי' },
  { icon: '📸', title: 'חוויית צילום', desc: 'צילום מקצועי בסמטאות יפו — פרס ייחודי', type: 'חוויית פרמיום' },
  { icon: '🛒', title: 'קופון קנייה', desc: 'קופון לחנויות ביפו — 15% הנחה', type: 'פרס נוסף' },
]

const timeline = [
  { season: 'חורף (נוב-מרץ)', meal: '12:00-13:30', attraction: '14:00', lottery: '15:30', hunger: '17:00-17:30', coupon: '17:00', retention: '5-6 שעות' },
  { season: 'אביב (מרץ-יוני)', meal: '12:30-14:00', attraction: '14:30', lottery: '16:00', hunger: '17:30-18:00', coupon: '17:30', retention: '5.5-6.5 שעות' },
  { season: 'קיץ (יוני-ספט)', meal: '13:00-14:30', attraction: '16:00', lottery: '17:30', hunger: '19:00-19:30', coupon: '19:00', retention: '6-7 שעות' },
  { season: 'סתיו (ספט-נוב)', meal: '12:00-13:30', attraction: '14:00', lottery: '15:30', hunger: '17:00-17:30', coupon: '17:00', retention: '5-6 שעות' },
]

export default function Lottery() {
  return (
    <section id="lottery" className="py-24" style={{ background: 'var(--navy)' }}>
      <div className="max-w-7xl mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="section-title">הגרלת היום לילדים ✦ מצאו את המטמון</h2>
          <div className="gold-divider"></div>
          <p className="section-subtitle">חוויה אינטראקטיבית שמייצרת תיאבון — ובאזז ברשתות החברתיות</p>
        </div>

        {/* How it works */}
        <div className="grid md:grid-cols-3 gap-6 mb-16">
          <div className="card text-right">
            <div className="text-4xl mb-3">📍</div>
            <h3 className="font-bold text-lg mb-2" style={{ color: 'var(--gold)' }}>שלב א' — כניסה לאטרקציה</h3>
            <p className="text-sm opacity-70 leading-relaxed" style={{ color: 'var(--parchment)' }}>
              המשפחה סורקת QR בנקודת האטרקציה. נאסף מספר טלפון ההורה + אישור לדיוור. הילד נרשם להגרלה.
            </p>
          </div>
          <div className="card text-right">
            <div className="text-4xl mb-3">🎉</div>
            <h3 className="font-bold text-lg mb-2" style={{ color: 'var(--gold)' }}>שלב ב' — הבאזז בלייב</h3>
            <p className="text-sm opacity-70 leading-relaxed" style={{ color: 'var(--parchment)' }}>
              בשעה הקבועה — הגרלה פופ-אפ בסמטאות עם צלם מקצועי, רינג-לייטס ותפאורה. שידור חי לרשתות.
            </p>
          </div>
          <div className="card text-right">
            <div className="text-4xl mb-3">🍽️</div>
            <h3 className="font-bold text-lg mb-2" style={{ color: 'var(--gold)' }}>שלב ג' — הקישור לאוכל</h3>
            <p className="text-sm opacity-70 leading-relaxed" style={{ color: 'var(--parchment)' }}>
              10 דקות אחרי ההגרלה — SMS אוטומטי להורה עם קופון למסעדות + ניווט לנקודה הקרובה.
            </p>
          </div>
        </div>

        {/* Prizes */}
        <h3 className="text-2xl font-bold text-center mb-8" style={{ color: 'var(--gold)', fontFamily: 'Frank Ruhl Libre, serif' }}>
          מבנה הפרסים — כולם מנצחים
        </h3>
        <div className="grid md:grid-cols-4 gap-4 mb-16">
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
        <div className="rounded-3xl p-8 mb-16" style={{ background: 'linear-gradient(135deg, rgba(200,169,110,0.1), rgba(200,169,110,0.03))', border: '1px solid rgba(200,169,110,0.3)' }}>
          <h3 className="text-2xl font-bold text-center mb-8" style={{ color: 'var(--gold)' }}>
            🏆 שלושת חוקי הזהב של ההגרלה
          </h3>
          <div className="grid md:grid-cols-3 gap-6">
            {[
              { num: '1', title: 'פרס מובטח לכל ילד', desc: 'Instant Win — גם "פרס ניחום" הוא תוספת חינם שמצריכה הגעה פיזית. אף ילד לא יוצא ריק.' },
              { num: '2', title: 'שעון עצר — 90 דקות', desc: 'על מסך הזכייה: Countdown Timer. ההטבה תקפה רק ל-90 דקות הקרובות ביפו. FOMO מיידי.' },
              { num: '3', title: 'ניווט פיזי למקום', desc: 'עם הודעת הזכייה — כפתור ניווט ל-Waze/Maps. הורים עייפים מגיעים בקלות לנקודת המכירה.' },
            ].map(rule => (
              <div key={rule.num} className="card text-right">
                <div className="text-4xl font-black mb-3" style={{ color: 'var(--gold)', opacity: 0.3 }}>{rule.num}</div>
                <div className="font-bold text-lg mb-2" style={{ color: 'var(--gold)' }}>{rule.title}</div>
                <div className="text-sm opacity-70 leading-relaxed" style={{ color: 'var(--parchment)' }}>{rule.desc}</div>
              </div>
            ))}
          </div>
        </div>

        {/* Timing table */}
        <h3 className="text-2xl font-bold text-center mb-6" style={{ color: 'var(--gold)', fontFamily: 'Frank Ruhl Libre, serif' }}>
          📊 לוח תזמון — לפי עונות השנה
        </h3>
        <div className="overflow-x-auto rounded-2xl border mb-8" style={{ borderColor: 'rgba(200,169,110,0.2)' }}>
          <table className="manifesto-table w-full text-right text-sm">
            <thead>
              <tr>
                <th>עונה</th>
                <th>ארוחה ראשונה</th>
                <th>כניסה לאטרקציה</th>
                <th>שעת הגרלה</th>
                <th>רעב שני</th>
                <th>שליחת קופון</th>
                <th>סה"כ עיכוב</th>
              </tr>
            </thead>
            <tbody>
              {timeline.map((row, i) => (
                <tr key={i} style={{ background: i % 2 === 0 ? 'rgba(13,27,42,0.8)' : 'rgba(26,42,58,0.8)' }}>
                  <td className="font-bold" style={{ color: 'var(--gold)' }}>{row.season}</td>
                  <td>{row.meal}</td>
                  <td>{row.attraction}</td>
                  <td style={{ color: 'var(--gold)' }}>{row.lottery}</td>
                  <td>{row.hunger}</td>
                  <td>{row.coupon}</td>
                  <td className="font-bold" style={{ color: 'var(--gold)' }}>{row.retention}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Revenue potential */}
        <div className="grid md:grid-cols-3 gap-6">
          {[
            { title: 'עיכוב ממוצע', value: '5.5-6.5 שעות', desc: 'לעומת 2-3 שעות ללא המערכת — כפול יותר זמן ביפו' },
            { title: 'פוטנציאל גידול פדיון', value: '+35-50%', desc: 'פדיון יומי למסעדה שמיישמת את האסטרטגיה — סבב אוכל שני' },
            { title: 'הכנסות גלריות', value: '+20-30%', desc: 'עלייה במכירות כשמשפחה מגיעה עם קופון ומצב רוח טוב' },
          ].map(s => (
            <div key={s.title} className="card text-center">
              <div className="text-3xl font-black gold-shimmer mb-2">{s.value}</div>
              <div className="font-bold mb-1" style={{ color: 'var(--gold)' }}>{s.title}</div>
              <div className="text-sm opacity-60" style={{ color: 'var(--parchment)' }}>{s.desc}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
