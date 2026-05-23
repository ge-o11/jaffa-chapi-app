const steps = [
  { num: '01', title: 'סרוק QR / NFC', desc: 'בכל נקודת אטרקציה ביפו העתיקה יש מעמד QR/NFC. סרוק ותיכנס ישירות לקהילה.' },
  { num: '02', title: 'הצטרפות לקהילה', desc: 'הצטרף לקהילת הוואצ\'אפ השקטה של יפו העתיקה — מקבלים עדכונים בלבד.' },
  { num: '03', title: 'קבל 10 נקודות', desc: 'מיידית עם ההצטרפות מועברות 10 נקודות קרדיט לחשבונך יחד עם הסבר על המערכת.' },
  { num: '04', title: 'צבור כל יום', desc: 'כל יום שנשאר בקהילה צוברת נקודה נוספת. הנקודות מצטברות ללא הגבלה.' },
  { num: '05', title: 'מש הטבות', desc: 'הצג את מספר הנקודות שלך בכל נקודת אטרקציה ומש הנחות, מוצרים ושירותים.' },
]

export default function Community() {
  return (
    <section id="community" className="py-24" style={{ background: 'linear-gradient(180deg, rgba(245,237,214,0.58) 0%, rgba(237,224,196,0.55) 100%)' }}>
      <div className="max-w-6xl mx-auto px-4">
        <div className="text-center mb-16">
          <div className="inline-block mb-4 px-4 py-1 rounded-full text-xs border" style={{ color: 'var(--gold)', borderColor: 'rgba(74,157,184,0.3)', background: 'rgba(74,157,184,0.06)' }}>
            חינם לחלוטין
          </div>
          <h2 className="section-title">כניסה והצטרפות לקהילה</h2>
          <div className="gold-divider"></div>
          <p className="section-subtitle">מסע של חמישה צעדים פשוטים</p>
        </div>

        <div className="grid md:grid-cols-5 gap-4 mb-16">
          {steps.map((step, i) => (
            <div key={step.num} className="relative">
              <div className="card text-right h-full">
                <div className="text-3xl font-black mb-3 opacity-30" style={{ color: 'var(--gold)' }}>{step.num}</div>
                <div className="font-bold mb-2 text-base" style={{ color: 'var(--gold)' }}>{step.title}</div>
                <div className="text-sm leading-relaxed opacity-70" style={{ color: 'var(--parchment)' }}>{step.desc}</div>
              </div>
              {i < steps.length - 1 && (
                <div className="hidden md:block absolute top-1/2 -left-2 transform -translate-y-1/2 text-xl" style={{ color: 'var(--gold)', opacity: 0.4 }}>←</div>
              )}
            </div>
          ))}
        </div>

        {/* Important rules */}
        <div className="grid md:grid-cols-3 gap-6 mb-12">
          <div className="card text-right border-t-4" style={{ borderTopColor: 'var(--whatsapp)' }}>
            <div className="text-3xl mb-3">✅</div>
            <h3 className="font-bold text-lg mb-2" style={{ color: 'var(--gold)' }}>הצטרפות — 10 נקודות</h3>
            <p className="text-sm opacity-70" style={{ color: 'var(--parchment)' }}>מיידית עם ההצטרפות מקבלים 10 נקודות קרדיט + הודעת וואצ'אפ עם הסבר</p>
          </div>
          <div className="card text-right border-t-4" style={{ borderTopColor: 'var(--gold)' }}>
            <div className="text-3xl mb-3">📈</div>
            <h3 className="font-bold text-lg mb-2" style={{ color: 'var(--gold)' }}>צבירה יומית — +1 נקודה</h3>
            <p className="text-sm opacity-70" style={{ color: 'var(--parchment)' }}>כל יום שחולף מצטברת נקודה נוספת — התנאי היחיד הוא להישאר בקהילה</p>
          </div>
          <div className="card text-right border-t-4" style={{ borderTopColor: '#ef4444' }}>
            <div className="text-3xl mb-3">❄️</div>
            <h3 className="font-bold text-lg mb-2" style={{ color: 'var(--gold)' }}>עזיבה — הקפאת נקודות</h3>
            <p className="text-sm opacity-70" style={{ color: 'var(--parchment)' }}>עזיבת הקהילה מקפיאה את הנקודות. חזרה לקהילה — מחזירה את כל הנקודות</p>
          </div>
        </div>

        <div className="text-center">
          <a href="https://chat.whatsapp.com/BhnFkwONJd6DeA7KlwG1MC" target="_blank" rel="noreferrer" className="btn-whatsapp text-xl py-5 px-10 rounded-2xl pulse-ring">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/></svg>
            הצטרף עכשיו — קבל 10 נקודות מיידית
          </a>
        </div>
      </div>
    </section>
  )
}
