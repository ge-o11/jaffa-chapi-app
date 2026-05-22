import { useState } from 'react'

export default function Contact() {
  const [form, setForm] = useState({ name: '', phone: '', type: 'מבקר', message: '' })
  const [sent, setSent] = useState(false)

  const handleSubmit = e => {
    e.preventDefault()
    const msg = `שלום חפ"י!%0Aשמי: ${form.name}%0Aטלפון: ${form.phone}%0Aסוג פנייה: ${form.type}%0Aהודעה: ${form.message}`
    window.open(`https://wa.me/972500000000?text=${msg}`, '_blank')
    setSent(true)
  }

  return (
    <section id="contact" className="py-24" style={{ background: 'var(--navy)' }}>
      <div className="max-w-4xl mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="section-title">צור קשר</h2>
          <div className="gold-divider"></div>
          <p className="section-subtitle">בעלי מתחמים, שאלות ושיתופי פעולה — נשמח לשמוע</p>
        </div>

        <div className="grid md:grid-cols-2 gap-10">
          {/* Contact options */}
          <div className="space-y-5">
            <h3 className="text-xl font-bold mb-6 text-right" style={{ color: 'var(--gold)', fontFamily: 'Frank Ruhl Libre, serif' }}>
              דרכי יצירת קשר
            </h3>
            {[
              { icon: '💬', label: 'וואצ\'אפ', value: 'הפנייה המהירה ביותר', href: 'https://wa.me/972500000000', cta: 'שלח הודעה' },
              { icon: '📧', label: 'אימייל', value: 'info@jaffachapi.co.il', href: 'mailto:info@jaffachapi.co.il', cta: 'שלח מייל' },
              { icon: '📸', label: 'אינסטגרם', value: '@jaffa_chapi', href: '#', cta: 'עקוב' },
            ].map(c => (
              <div key={c.label} className="card flex items-center justify-between gap-4">
                <div className="flex items-center gap-3">
                  <span className="text-3xl">{c.icon}</span>
                  <div className="text-right">
                    <div className="font-bold text-sm" style={{ color: 'var(--gold)' }}>{c.label}</div>
                    <div className="text-xs opacity-60" style={{ color: 'var(--parchment)' }}>{c.value}</div>
                  </div>
                </div>
                <a href={c.href} target="_blank" rel="noreferrer" className="btn-outline py-1.5 px-3 text-xs flex-shrink-0">
                  {c.cta}
                </a>
              </div>
            ))}

            <div className="card text-right" style={{ borderColor: 'rgba(200,169,110,0.4)' }}>
              <h4 className="font-bold mb-2" style={{ color: 'var(--gold)' }}>🏪 בעל מתחם ביפו?</h4>
              <p className="text-sm opacity-70 leading-relaxed mb-4" style={{ color: 'var(--parchment)' }}>
                תהליך ההרשמה מתבצע בליווי אנשי חפ"י. נפגש, נסביר את המערכת ונקים עבורך את המיני-סייט.
              </p>
              <a href="https://wa.me/972500000000?text=שלום, אני בעל מתחם ביפו ורוצה להצטרף למערכת חפ״י" target="_blank" rel="noreferrer" className="btn-whatsapp text-sm">
                התחל תהליך הצטרפות
              </a>
            </div>
          </div>

          {/* Quick contact form */}
          <div>
            <h3 className="text-xl font-bold mb-6 text-right" style={{ color: 'var(--gold)', fontFamily: 'Frank Ruhl Libre, serif' }}>
              שלח הודעה מהירה
            </h3>
            {sent ? (
              <div className="card text-center py-12">
                <div className="text-5xl mb-4">✅</div>
                <div className="font-bold text-xl mb-2" style={{ color: 'var(--gold)' }}>הודעה נשלחה!</div>
                <div className="opacity-60 text-sm" style={{ color: 'var(--parchment)' }}>נחזור אליך בהקדם</div>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4">
                {[
                  { name: 'name', label: 'שם מלא', type: 'text', placeholder: 'ישראל ישראלי' },
                  { name: 'phone', label: 'טלפון', type: 'tel', placeholder: '050-0000000' },
                ].map(f => (
                  <div key={f.name}>
                    <label className="block text-sm font-medium mb-1 text-right" style={{ color: 'var(--gold-light)' }}>{f.label}</label>
                    <input
                      type={f.type}
                      placeholder={f.placeholder}
                      value={form[f.name]}
                      onChange={e => setForm({ ...form, [f.name]: e.target.value })}
                      className="w-full rounded-xl px-4 py-3 text-right outline-none border transition-all"
                      style={{ background: 'var(--navy-light)', color: 'var(--parchment)', border: '1px solid rgba(200,169,110,0.3)', direction: 'rtl' }}
                    />
                  </div>
                ))}

                <div>
                  <label className="block text-sm font-medium mb-1 text-right" style={{ color: 'var(--gold-light)' }}>סוג פנייה</label>
                  <select
                    value={form.type}
                    onChange={e => setForm({ ...form, type: e.target.value })}
                    className="w-full rounded-xl px-4 py-3 text-right outline-none border"
                    style={{ background: 'var(--navy-light)', color: 'var(--parchment)', border: '1px solid rgba(200,169,110,0.3)', direction: 'rtl' }}>
                    <option>מבקר</option>
                    <option>בעל מתחם</option>
                    <option>שיתוף פעולה</option>
                    <option>שאלה כללית</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium mb-1 text-right" style={{ color: 'var(--gold-light)' }}>הודעה</label>
                  <textarea
                    rows={4}
                    placeholder="כתבו לנו..."
                    value={form.message}
                    onChange={e => setForm({ ...form, message: e.target.value })}
                    className="w-full rounded-xl px-4 py-3 text-right outline-none border resize-none"
                    style={{ background: 'var(--navy-light)', color: 'var(--parchment)', border: '1px solid rgba(200,169,110,0.3)', direction: 'rtl' }}
                  />
                </div>

                <button type="submit" className="btn-whatsapp w-full justify-center text-base py-4">
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/></svg>
                  שלח בוואצ'אפ
                </button>
              </form>
            )}
          </div>
        </div>
      </div>
    </section>
  )
}
