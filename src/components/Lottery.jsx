import SpinWheel from './SpinWheel'

const prizes = [
  { icon: '🍦', title: 'גלידה ב-5 ₪', desc: 'כדור גלידה בקניית מנה', type: 'פרס מובטח' },
  { icon: '🍕', title: 'ארוחה משפחתית', desc: 'לזוכה הגדול — חינם', type: 'פרס ראשי' },
  { icon: '📸', title: 'חוויית צילום', desc: 'צילום מקצועי בסמטאות יפו', type: 'פרמיום' },
  { icon: '🛒', title: 'קופון קנייה', desc: '15% הנחה בחנויות יפו', type: 'פרס נוסף' },
]

export default function Lottery() {
  return (
    <div id="lottery" className="px-3 py-4">
      <div className="max-w-xl mx-auto">

        {/* Spin Wheel */}
        <div className="rounded-3xl p-4 mb-5"
          style={{ background: 'rgba(225,240,245,0.7)', border: '1.5px solid rgba(74,157,184,0.3)' }}>
          <SpinWheel />
        </div>

        {/* Prizes grid */}
        <h3 className="text-base font-bold text-center mb-3" style={{ color: '#0D3A56', fontFamily: 'Frank Ruhl Libre, serif' }}>
          מבנה הפרסים — כולם מנצחים 🎁
        </h3>
        <div className="grid grid-cols-2 gap-2">
          {prizes.map(p => (
            <div key={p.title} className="rounded-2xl p-3 text-right"
              style={{ background: 'rgba(225,240,245,0.75)', border: '1.5px solid rgba(74,157,184,0.3)' }}>
              <div className="text-2xl mb-1">{p.icon}</div>
              <span className="text-xs font-bold px-2 py-0.5 rounded-full inline-block mb-1 credit-badge">{p.type}</span>
              <div className="font-bold text-sm mb-0.5" style={{ color: '#0D3A56' }}>{p.title}</div>
              <div className="text-xs leading-snug" style={{ color: '#1A6B8A', opacity: 0.8 }}>{p.desc}</div>
            </div>
          ))}
        </div>

      </div>
    </div>
  )
}
