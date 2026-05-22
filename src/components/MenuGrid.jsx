const menuItems = [
  { icon: '👥', title: 'כניסה והצטרפות לקהילה', desc: 'הצטרף לקהילת יפו העתיקה בוואצ\'אפ וקבל 10 נקודות קרדיט מיידית', href: '#community', badge: '10 נקודות מתנה' },
  { icon: '🏅', title: 'קופונים וקרדיטים', desc: 'צבור נקודות יומיות ומש אותן בכל נקודות האטרקציה ביפו העתיקה', href: '#credits' },
  { icon: '⭐', title: 'הטבות לחברי הקהילה', desc: 'הנחות, קופונים ופינוקים בלעדיים לחברי קהילת יפו העתיקה', href: '#credits' },
  { icon: '📅', title: 'השבוע ביפו העתיקה', desc: 'אירועים, תערוכות ופעילויות לפי תאריך — עדכון שבועי', href: '#events' },
  { icon: '🛍️', title: 'חנות אונליין', desc: 'מוצרים ייחודיים מגלריות יפו — הרכישה נעשית ישירות במקום', href: '#store' },
  { icon: '🗺️', title: 'סיורים אינטראקטיביים', desc: 'שלושה מסלולים — משפחות, זוגות וסיור כללי. הזמנה אונליין', href: '#tours' },
  { icon: '🎲', title: 'הגרלת היום לילדים', desc: 'הגרלה פופ-אפ בסמטאות עם צלם לייב — פרסים, קופונים ובאזז', href: '#lottery' },
  { icon: '🏴‍☠️', title: 'מצאו את המטמון', desc: 'ציד מטמון אינטראקטיבי ביפו העתיקה — זכו בפרסים אמיתיים', href: '#lottery' },
  { icon: '📍', title: 'הגעה ליפו העתיקה', desc: 'ניווט, חניה, תחבורה ציבורית — כל מה שצריך להגיע', href: '#arrival' },
  { icon: '🎭', title: 'אירועים', desc: 'כנסים, תערוכות, הופעות ואירועים מיוחדים ביפו העתיקה', href: '#events' },
  { icon: '❓', title: 'שאלות נפוצות', desc: 'תשובות לשאלות הנפוצות ביותר על המערכת וקהילת חפ"י', href: '#faq' },
  { icon: '✉️', title: 'צור קשר', desc: 'בעלי מתחמים, שאלות ושיתופי פעולה — נשמח לשמוע', href: '#contact' },
]

export default function MenuGrid() {
  return (
    <section id="menu" className="py-20" style={{ background: 'var(--navy)' }}>
      <div className="max-w-7xl mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="section-title">מה תמצאו כאן</h2>
          <div className="gold-divider"></div>
          <p className="section-subtitle">כל מה שצריך לחוויה מושלמת ביפו העתיקה</p>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {menuItems.map((item) => (
            <a key={item.title} href={item.href} className="menu-card group no-underline">
              <div className="text-4xl mb-1">{item.icon}</div>
              <div className="font-bold text-sm md:text-base leading-tight" style={{ color: 'var(--gold)' }}>{item.title}</div>
              <div className="text-xs opacity-60 leading-relaxed hidden md:block" style={{ color: 'var(--parchment)' }}>{item.desc}</div>
              {item.badge && (
                <span className="credit-badge text-xs mt-1">{item.badge}</span>
              )}
            </a>
          ))}
        </div>
      </div>
    </section>
  )
}
