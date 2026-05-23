const MANIFESTO_ROWS = [
  ['מכירות',                          'הנגשה'],
  ['תצוגה פסיבית',                     'חוויה אינטראקטיבית'],
  ['יצירה שתלויה על קיר',              'מסלול שחיים אותו בזמן אמת'],
  ['קהל שמסתכל',                       'קהל שמשתתף'],
  ['אתר מידע סטטי',                    'חוויה דיגיטלית ביום הביקור'],
  ['אמנות כפריט',                      'אמנות כמפגש בין אדם למקום'],
  ['אמנות כיצירת ומכירת אובייקטים',   'אמנות העתיד יוצרת מסעות חוויה ומסע קניות'],
]

const PRICING = [
  { icon: '1️⃣', title: 'דמי רישום חד-פעמיים',  desc: 'תשלום חד פעמי לכניסה למערכת. ללא עלויות חוזרות.' },
  { icon: '2️⃣', title: 'רישום + ריטיינר חודשי', desc: 'תשלום ראשוני + דמי תחזוקה חודשיים לשירות מלא.' },
  { icon: '3️⃣', title: 'עמלה על הטבות',         desc: 'חפ"י גובה עמלה על ההטבות שנמושו בכל תחילת חודש.' },
  { icon: '4️⃣', title: 'מתנה לקהילה',           desc: 'הענקת המערכת חינם — למטרת הגדלת תנועת המבקרים.' },
]

const WORLDS = [
  { icon: '📱', title: 'עולם המבקר',       desc: 'כניסה דרך QR/NFC, קהילת וואצ\'אפ, נקודות קרדיט, מפת ניווט, הטבות ושירותים.' },
  { icon: '🏪', title: 'עולם בעל המתחם',    desc: 'מיני-סייט אישי, ניהול הטבות, מדדי ביצוע, תמונות ומלל עצמאיים.' },
  { icon: '⚙️', title: 'עולם חפ"י',        desc: 'ניהול מרכזי, תחזוקה טכנית, הרחבת הקהילה, אחריות על איכות החוויה.' },
]

const ADVANTAGES = [
  { icon: '🎙️', text: 'חוויה קולית וחזותית — לא טקסט יבש' },
  { icon: '🎲', text: 'חידונים, הגרלות ומשחקים שמחברים את המבקר למקום' },
  { icon: '📲', text: 'שיתוף ברשתות החברתיות — המבקרים הופכים לשגרירים' },
  { icon: '💬', text: 'קהילת וואצ\'אפ פעילה שמחזירה את האנשים שוב ושוב' },
]

export default function About() {
  return (
    <section id="about" className="py-12 md:py-16">
      <div className="max-w-5xl mx-auto px-4 md:px-6">

        {/* Hero */}
        <div className="text-center mb-10">
          <div className="text-5xl mb-3">🏛️</div>
          <h2 className="text-3xl md:text-5xl font-black mb-1"
            style={{ color: '#0D3A56', fontFamily: 'Frank Ruhl Libre, serif' }}>
            על חפ"י
          </h2>
          <p className="text-sm md:text-base font-semibold tracking-widest mb-1 text-center" dir="ltr" style={{ color: '#4A9DB8', letterSpacing: '0.08em' }}>
            The new era of Old Jaffa
          </p>
          <p className="text-xs md:text-sm mb-3 text-center" dir="ltr" style={{ color: '#1A6B8A', opacity: 0.75 }}>
            Old Jaffa Development Company
          </p>
          <p className="text-base md:text-lg max-w-2xl mx-auto" style={{ color: '#0D3A56', opacity: 0.85 }}>
            להפוך את יפו העתיקה ממקום שמבקרים בו — לחוויה שמשתתפים בה ✨
          </p>
        </div>

        {/* Creator quote */}
        <div className="rounded-3xl p-6 md:p-10 mb-10 text-right"
          style={{ background: 'linear-gradient(135deg, rgba(225,240,245,0.85), rgba(176,212,227,0.55))', border: '2px solid rgba(74,157,184,0.4)' }}>
          <p className="text-base md:text-lg leading-relaxed mb-4" style={{ color: '#0D3A56' }}>
            האמנות שלי אינה ציור על בד. היא הפיכת מרחב קיים לחוויה אינטראקטיבית.
          </p>
          <p className="text-base md:text-lg leading-relaxed font-bold" style={{ color: '#1A6B8A' }}>
            אני לא מגיע כאמן פלסטי קלאסי, אלא כיוצר חוויות. המכחולים שלי הם שיווק, מכירות, דיגיטל, הנגשה ותנועה של קהל — מסע של חושים.
          </p>
        </div>

        {/* Advantages */}
        <h3 className="text-xl md:text-2xl font-black text-center mb-5"
          style={{ color: '#0D3A56', fontFamily: 'Frank Ruhl Libre, serif' }}>
          למה חפ"י שונה?
        </h3>
        <div className="grid md:grid-cols-2 gap-3 mb-12">
          {ADVANTAGES.map(a => (
            <div key={a.text} className="flex items-center gap-3 rounded-2xl p-4 text-right"
              style={{ background: 'rgba(225,240,245,0.75)', border: '2px solid rgba(74,157,184,0.3)' }}>
              <span className="text-2xl flex-shrink-0">{a.icon}</span>
              <p className="text-sm md:text-base" style={{ color: '#0D3A56' }}>{a.text}</p>
            </div>
          ))}
        </div>

        {/* Manifesto table */}
        <div className="text-center mb-4">
          <h3 className="text-2xl md:text-3xl font-black"
            style={{ color: '#0D3A56', fontFamily: 'Frank Ruhl Libre, serif' }}>
            אמנות העבר vs אמנות העתיד
          </h3>
        </div>
        <div className="overflow-hidden rounded-2xl mb-10"
          style={{ border: '2px solid rgba(74,157,184,0.4)' }}>
          <table className="w-full text-right border-collapse">
            <thead>
              <tr style={{ background: 'rgba(13,58,86,0.85)' }}>
                <th className="py-3 px-4 md:px-6 w-1/2" style={{ color: '#FFFFFF', borderLeft: '1px solid rgba(176,212,227,0.3)' }}>
                  <div className="flex items-center gap-2 justify-end text-sm md:text-base">
                    <span>אמנות העבר</span><span className="text-xl">⏳</span>
                  </div>
                </th>
                <th className="py-3 px-4 md:px-6 w-1/2" style={{ color: '#FFFFFF' }}>
                  <div className="flex items-center gap-2 justify-end text-sm md:text-base">
                    <span>אמנות העתיד</span><span className="text-xl">🚀</span>
                  </div>
                </th>
              </tr>
            </thead>
            <tbody>
              {MANIFESTO_ROWS.map(([past, future], i) => (
                <tr key={i}
                  style={{ background: i % 2 === 0 ? 'rgba(225,240,245,0.7)' : 'rgba(176,212,227,0.55)' }}>
                  <td className="py-2.5 px-4 md:px-6 text-sm md:text-base opacity-70" style={{ color: '#1A6B8A', borderLeft: '1px solid rgba(74,157,184,0.25)' }}>
                    {past}
                  </td>
                  <td className="py-2.5 px-4 md:px-6 text-sm md:text-base font-bold" style={{ color: '#0D3A56' }}>
                    {future}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Bottom slogan */}
        <div className="text-center mb-10 px-2">
          <p className="text-lg md:text-2xl font-black"
            style={{ color: '#0D3A56', fontFamily: 'Frank Ruhl Libre, serif' }}>
            אמנות העבר יצרה אובייקטים.<br />
            <span style={{ color: '#1A6B8A' }}>אמנות העתיד יוצרת מסעות.</span>
          </p>
        </div>

        {/* Re-consumption chain */}
        <div className="rounded-3xl p-6 md:p-8 mb-12 text-center"
          style={{ background: 'linear-gradient(135deg, rgba(13,58,86,0.08), rgba(74,157,184,0.15))', border: '2px solid rgba(74,157,184,0.35)' }}>
          <p className="text-base md:text-xl font-black tracking-wide"
            style={{ color: '#0D3A56', fontFamily: 'Frank Ruhl Libre, serif' }}>
            חוויה מייצרת שהות&nbsp;&nbsp;/&nbsp;&nbsp;שהות מייצרת רעב&nbsp;&nbsp;/&nbsp;&nbsp;רעב מייצר רכישה
          </p>
        </div>

        {/* WIN-WIN */}
        <div className="rounded-3xl p-6 md:p-8 mb-12 text-right"
          style={{ background: 'linear-gradient(135deg, rgba(225,240,245,0.85), rgba(176,212,227,0.55))', border: '2px solid rgba(74,157,184,0.4)' }}>
          <h3 className="text-xl font-black mb-3" style={{ color: '#0D3A56', fontFamily: 'Frank Ruhl Libre, serif' }}>
            🤝 מצב WIN WIN לכולם
          </h3>
          <ul className="space-y-2 text-sm md:text-base" style={{ color: '#1A6B8A' }}>
            <li>✅ <strong>למבקרים</strong> — חוויה אינטראקטיבית, נקודות, פרסים והטבות אמיתיות</li>
            <li>✅ <strong>לבעלי עסקים ואמנים ביפו העתיקה</strong> — חשיפה, תנועת לקוחות וכלים דיגיטליים</li>
            <li>✅ <strong>לחפ"י</strong> — קהילה צומחת, הכנסות ומיצוב כמנוע הצמיחה של יפו</li>
          </ul>
        </div>

        {/* Three worlds */}
        <h3 className="text-xl md:text-2xl font-black text-center mb-5"
          style={{ color: '#0D3A56', fontFamily: 'Frank Ruhl Libre, serif' }}>
          המערכת מתחלקת לשלושה עולמות
        </h3>
        <div className="grid md:grid-cols-3 gap-4 mb-12">
          {WORLDS.map(w => (
            <div key={w.title} className="rounded-2xl p-5 text-right"
              style={{ background: 'rgba(225,240,245,0.85)', border: '2px solid rgba(74,157,184,0.35)' }}>
              <div className="text-4xl mb-2">{w.icon}</div>
              <div className="font-black text-base mb-1" style={{ color: '#0D3A56' }}>{w.title}</div>
              <div className="text-sm leading-relaxed" style={{ color: '#1A6B8A' }}>{w.desc}</div>
            </div>
          ))}
        </div>

        {/* Pricing */}
        <h3 className="text-xl md:text-2xl font-black text-center mb-5"
          style={{ color: '#0D3A56', fontFamily: 'Frank Ruhl Libre, serif' }}>
          מודלי תמחור לבעלי מתחמים
        </h3>
        <div className="grid md:grid-cols-2 gap-3 mb-10">
          {PRICING.map(p => (
            <div key={p.title} className="flex gap-3 items-start rounded-2xl p-4 text-right"
              style={{ background: 'rgba(225,240,245,0.75)', border: '2px solid rgba(74,157,184,0.3)' }}>
              <span className="text-xl flex-shrink-0">{p.icon}</span>
              <div>
                <div className="font-bold text-sm mb-0.5" style={{ color: '#0D3A56' }}>{p.title}</div>
                <div className="text-xs leading-relaxed" style={{ color: '#1A6B8A' }}>{p.desc}</div>
              </div>
            </div>
          ))}
        </div>

        {/* Closing */}
        <div className="text-center rounded-3xl py-10 px-6"
          style={{ background: 'linear-gradient(135deg, #0D3A56, #1A6B8A)', border: '2px solid rgba(74,157,184,0.5)' }}>
          <p className="text-lg md:text-2xl font-black mb-4"
            style={{ color: '#FFFFFF', fontFamily: 'Frank Ruhl Libre, serif' }}>
            חפ"י לא רק מוכרת את יפו —<br />
            <span style={{ color: '#B0D4E3' }}>חפ"י מנגישה אותה כחוויה חיה.</span>
          </p>
          <p className="text-base md:text-xl font-bold" style={{ color: '#FFD700' }}>
            מצטרפים למסע...?!&nbsp;&nbsp;בואו נרים את המשא.....!!
          </p>
        </div>

      </div>
    </section>
  )
}
