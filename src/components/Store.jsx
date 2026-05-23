const products = [
  { emoji: '🎨', name: 'ציור שמן — יפו בשקיעה', artist: 'גלריה אורנה לוי', price: '850 ₪', credits: 85, category: 'ציור' },
  { emoji: '🪬', name: 'חמסה קרמיקה בעבודת יד', artist: 'סטודיו מזרח', price: '280 ₪', credits: 28, category: 'קרמיקה' },
  { emoji: '💎', name: 'תכשיטי כסף — קולקציית יפו', artist: 'תכשיטי נאדיה', price: '450 ₪', credits: 45, category: 'תכשיטים' },
  { emoji: '📸', name: 'הדפס צילומי — סמטאות יפו', artist: 'עדי כהן צלם', price: '320 ₪', credits: 32, category: 'צילום' },
  { emoji: '🏺', name: 'כד חרס ציוד', artist: 'יוצר ביפו', price: '190 ₪', credits: 19, category: 'קרמיקה' },
  { emoji: '🖼️', name: 'אקוורל — נמל יפו', artist: 'גלריה המנורה', price: '680 ₪', credits: 68, category: 'ציור' },
]

export default function Store() {
  return (
    <section id="store" className="py-24" style={{ background: 'var(--navy)' }}>
      <div className="max-w-7xl mx-auto px-4">
        <div className="text-center mb-6">
          <h2 className="section-title">חנות יפו — מוצרי השבוע</h2>
          <div className="gold-divider"></div>
          <p className="section-subtitle">מוצרים ייחודיים מגלריות ואמנים מקומיים. הרכישה נעשית ישירות במקום.</p>
        </div>

        <div className="flex items-center justify-center gap-3 mb-12 p-4 rounded-2xl max-w-xl mx-auto" style={{ background: 'rgba(74,157,184,0.08)', border: '1px solid rgba(74,157,184,0.2)' }}>
          <span className="text-2xl">💡</span>
          <p className="text-sm text-right" style={{ color: 'var(--gold-light)' }}>
            רוצה לרכוש? בוא לגלריה, הצג את הקוד ורכוש ישירות מהאמן. הקניה נעשית <strong>במקום בלבד</strong>.
          </p>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
          {products.map(p => (
            <div key={p.name} className="card text-right hover:transform hover:-translate-y-2 transition-all duration-300 cursor-pointer">
              <div className="text-5xl mb-4 text-center">{p.emoji}</div>
              <div className="text-xs px-2 py-0.5 rounded-full inline-block mb-2" style={{ background: 'rgba(74,157,184,0.15)', color: 'var(--gold)' }}>
                {p.category}
              </div>
              <h3 className="font-bold text-base mb-1" style={{ color: 'var(--parchment)' }}>{p.name}</h3>
              <p className="text-sm opacity-60 mb-4" style={{ color: 'var(--gold-light)' }}>{p.artist}</p>
              <div className="flex items-center justify-between">
                <div className="font-black text-xl" style={{ color: 'var(--gold)' }}>{p.price}</div>
                <div className="credit-badge text-xs">{p.credits} נקודות</div>
              </div>
              <div className="mt-4 pt-4 border-t text-xs text-center opacity-50" style={{ borderColor: 'rgba(74,157,184,0.2)', color: 'var(--parchment)' }}>
                📍 רכישה ישירה במקום
              </div>
            </div>
          ))}
        </div>

        <div className="text-center">
          <p className="mb-2 opacity-60 text-sm" style={{ color: 'var(--gold-light)' }}>
            אתה אמן או גלריה ביפו? הצטרף לחנות
          </p>
          <a href="#contact" className="btn-outline">הצטרף לחנות →</a>
        </div>
      </div>
    </section>
  )
}
