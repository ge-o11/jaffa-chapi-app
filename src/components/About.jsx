const pricing = [
  { icon: '1️⃣', title: 'דמי רישום חד-פעמיים', desc: 'תשלום חד פעמי לכניסה למערכת. ללא עלויות חוזרות.' },
  { icon: '2️⃣', title: 'רישום + ריטיינר חודשי', desc: 'תשלום ראשוני + דמי תחזוקה חודשיים לשירות מלא.' },
  { icon: '3️⃣', title: 'עמלה על הטבות', desc: 'חפ"י גובה עמלה בכל תחילת חודש על ההטבות שנמושו.' },
  { icon: '4️⃣', title: 'מתנה לקהילה', desc: 'הענקת המערכת חינם — למטרת הגדלת תנועת מבקרים.' },
]

export default function About() {
  return (
    <section id="about" className="py-24" style={{ background: 'linear-gradient(180deg, rgba(237,224,196,0.55) 0%, rgba(245,237,214,0.58) 100%)' }}>
      <div className="max-w-5xl mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="section-title">על חפ"י</h2>
          <div className="gold-divider"></div>
          <p className="section-subtitle">חוויות פעילות ביפו העתיקה</p>
        </div>

        {/* Mission */}
        <div className="rounded-3xl p-8 md:p-12 mb-16 text-right" style={{ background: 'linear-gradient(135deg, rgba(200,169,110,0.1), rgba(200,169,110,0.03))', border: '1px solid rgba(200,169,110,0.3)' }}>
          <div className="text-5xl mb-6 text-center">🌟</div>
          <h3 className="text-2xl font-bold mb-6 text-center" style={{ color: 'var(--gold)', fontFamily: 'Frank Ruhl Libre, serif' }}>
            המשימה שלנו
          </h3>
          <p className="text-lg leading-relaxed mb-6" style={{ color: 'var(--gold-light)' }}>
            חפ"י הוקמה מתוך אמונה עמוקה שיפו העתיקה — אחד מהמקומות היפים בישראל — לא מוצגת כראוי לקהל שמגיע אליה. הביקורים נשארים שטחיים, הסיפורים לא מסופרים, והחיבור בין המבקר לנשמת המקום לא קורה.
          </p>
          <p className="text-lg leading-relaxed mb-6" style={{ color: 'var(--gold-light)' }}>
            אנחנו לא מגיעים כאמנים פלסטיים קלאסיים. אנחנו יוצרי חוויות. המכחולים שלנו הם שיווק, מכירות, דיגיטל, הנגשה ותנועת קהל.
          </p>
          <p className="text-lg leading-relaxed font-bold" style={{ color: 'var(--gold)' }}>
            במקום ליצור אובייקט אמנותי מנותק — אנחנו יוצרים חיבור חי בין המבקר, המקום, העסקים והסיפור של יפו העתיקה.
          </p>
        </div>

        {/* Quote */}
        <div className="text-center mb-16">
          <div className="grid md:grid-cols-2 gap-4 text-lg max-w-3xl mx-auto">
            <div className="rounded-2xl p-6" style={{ background: 'rgba(200,169,110,0.06)', border: '1px solid rgba(200,169,110,0.2)' }}>
              <div className="opacity-50 mb-2 text-sm" style={{ color: 'var(--gold)' }}>אמנות העבר</div>
              <div style={{ color: 'var(--parchment)' }}>יצרה אובייקטים</div>
            </div>
            <div className="rounded-2xl p-6" style={{ background: 'rgba(200,169,110,0.12)', border: '1px solid rgba(200,169,110,0.4)' }}>
              <div className="font-bold text-sm mb-2" style={{ color: 'var(--gold)' }}>אמנות העתיד</div>
              <div className="font-bold" style={{ color: 'var(--gold)' }}>יוצרת מסעות</div>
            </div>
          </div>
        </div>

        {/* System parts */}
        <h3 className="text-2xl font-bold text-center mb-8" style={{ color: 'var(--gold)', fontFamily: 'Frank Ruhl Libre, serif' }}>
          המערכת מתחלקת לשלושה עולמות
        </h3>
        <div className="grid md:grid-cols-3 gap-6 mb-16">
          {[
            { icon: '📱', title: 'עולם המבקר', desc: 'כניסה דרך QR/NFC, קהילת וואצ\'אפ, נקודות קרדיט, מפת ניווט, הטבות ושירותים.' },
            { icon: '🏪', title: 'עולם בעל המתחם', desc: 'מיני-סייט אישי, ניהול הטבות, מדדי ביצוע, תמונות ומלל עצמאיים.' },
            { icon: '⚙️', title: 'עולם חפ"י', desc: 'ניהול מרכזי, תחזוקה טכנית, הרחבת הקהילה, אחריות על האיכות.' },
          ].map(w => (
            <div key={w.title} className="card text-right">
              <div className="text-4xl mb-3">{w.icon}</div>
              <div className="font-bold text-lg mb-2" style={{ color: 'var(--gold)' }}>{w.title}</div>
              <div className="text-sm opacity-70 leading-relaxed" style={{ color: 'var(--parchment)' }}>{w.desc}</div>
            </div>
          ))}
        </div>

        {/* Pricing models */}
        <h3 className="text-2xl font-bold text-center mb-8" style={{ color: 'var(--gold)', fontFamily: 'Frank Ruhl Libre, serif' }}>
          מודלי תמחור לבעלי מתחמים
        </h3>
        <div className="grid md:grid-cols-2 gap-5">
          {pricing.map(p => (
            <div key={p.title} className="card text-right flex gap-4 items-start">
              <span className="text-2xl flex-shrink-0">{p.icon}</span>
              <div>
                <div className="font-bold mb-1" style={{ color: 'var(--gold)' }}>{p.title}</div>
                <div className="text-sm opacity-70" style={{ color: 'var(--parchment)' }}>{p.desc}</div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
