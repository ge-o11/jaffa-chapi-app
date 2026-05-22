const tours = [
  {
    icon: '👨‍👩‍👧‍👦',
    title: 'סיור אינטראקטיבי — משפחות וילדים',
    subtitle: 'הרפתקה לכל המשפחה',
    color: '#4CAF50',
    duration: '2-3 שעות',
    audience: 'משפחות עם ילדים 4-12',
    highlights: [
      'ניווט NFC/QR בנקודות אטרקציה',
      'מידע קולי ובתמונות לכל נקודה',
      'פעילויות אינטראקטיביות לילדים',
      'קופונים למסעדות ואטרקציות',
      'ציד מטמון לאורך המסלול',
    ],
    cta: 'הזמן סיור משפחתי',
  },
  {
    icon: '💑',
    title: 'סיור אינטראקטיבי — רומנטי לזוגות',
    subtitle: 'ערב מושלם ביפו',
    color: '#E91E63',
    duration: '2-4 שעות',
    audience: 'זוגות',
    highlights: [
      'מסלול נסתר ורומנטי בסמטאות',
      'נקודות תצפית מיוחדות',
      'הפתעות לאורך הדרך',
      'הטבות למסעדות ובתי קפה',
      'צילום זוגי מקצועי אופציונלי',
    ],
    cta: 'הזמן סיור זוגי',
  },
  {
    icon: '🌍',
    title: 'סיור אינטראקטיבי — כללי',
    subtitle: 'להכיר את יפו לעומק',
    color: '#2196F3',
    duration: '1.5-2.5 שעות',
    audience: 'כולם',
    highlights: [
      'היסטוריה וסיפורים של יפו',
      'כל נקודות המפתח במרחק הליכה',
      'מידע בעברית, ערבית ואנגלית',
      'מפה דיגיטלית אינטראקטיבית',
      'טיפים מקומיים לאוכל וקנייה',
    ],
    cta: 'התחל סיור עצמאי',
  },
]

export default function Tours() {
  return (
    <section id="tours" className="py-24" style={{ background: 'linear-gradient(180deg, rgba(237,224,196,0.92) 0%, rgba(245,237,214,0.94) 100%)' }}>
      <div className="max-w-7xl mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="section-title">סיורים אינטראקטיביים</h2>
          <div className="gold-divider"></div>
          <p className="section-subtitle">חווית ביקור אחרת — חיה, דינמית ובזמן אמת</p>
        </div>

        <div className="grid md:grid-cols-3 gap-8 mb-16">
          {tours.map(tour => (
            <div key={tour.title} className="card flex flex-col text-right hover:transform hover:-translate-y-2 transition-all duration-300">
              <div className="text-5xl mb-4">{tour.icon}</div>
              <div className="font-bold text-xl mb-1" style={{ color: tour.color, fontFamily: 'Frank Ruhl Libre, serif' }}>{tour.title}</div>
              <div className="text-sm mb-4 opacity-60" style={{ color: 'var(--parchment)' }}>{tour.subtitle}</div>

              <div className="flex gap-4 mb-5">
                <div className="flex items-center gap-1 text-xs px-3 py-1 rounded-full" style={{ background: 'rgba(200,169,110,0.1)', color: 'var(--gold-light)' }}>
                  ⏱ {tour.duration}
                </div>
                <div className="flex items-center gap-1 text-xs px-3 py-1 rounded-full" style={{ background: 'rgba(200,169,110,0.1)', color: 'var(--gold-light)' }}>
                  👤 {tour.audience}
                </div>
              </div>

              <ul className="space-y-2 mb-6 flex-1">
                {tour.highlights.map(h => (
                  <li key={h} className="text-sm flex items-start gap-2" style={{ color: 'var(--parchment)' }}>
                    <span className="mt-0.5 flex-shrink-0" style={{ color: 'var(--gold)' }}>✦</span>
                    {h}
                  </li>
                ))}
              </ul>

              <a href="#contact" className="btn-outline w-full justify-center mt-auto" style={{ borderColor: tour.color, color: tour.color }}>
                {tour.cta}
              </a>
            </div>
          ))}
        </div>

        {/* Booking section */}
        <div className="rounded-3xl p-8 text-center" style={{ background: 'linear-gradient(135deg, rgba(200,169,110,0.1) 0%, rgba(200,169,110,0.03) 100%)', border: '1px solid rgba(200,169,110,0.3)' }}>
          <h3 className="text-2xl font-bold mb-4" style={{ color: 'var(--gold)' }}>הזמנת סיורים</h3>
          <p className="mb-6 opacity-70 max-w-xl mx-auto" style={{ color: 'var(--parchment)' }}>
            מידע נוסף, תמחור וזמינות — צרו קשר ישירות. נשמח לבנות עבורכם חוויה מותאמת אישית.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <a href="https://www.tel-aviv.gov.il/Visitors/Jaffa/Pages/oldjaffatour.aspx" target="_blank" rel="noreferrer" className="btn-outline">
              🗺️ מסלולי טיול רשמיים
            </a>
            <a href="#contact" className="btn-gold">
              📞 הזמן סיור
            </a>
          </div>
        </div>
      </div>
    </section>
  )
}
