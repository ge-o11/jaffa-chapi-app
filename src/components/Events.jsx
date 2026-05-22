const events = [
  { day: 'שישי', date: '23.05', title: 'שוק הצלמים של יפו', time: '16:00-22:00', location: 'כיכר השעון', category: 'שוק' },
  { day: 'שבת', date: '24.05', title: 'סיור לילי בסמטאות', time: '20:00-22:30', location: 'שער יפו', category: 'סיור' },
  { day: 'ראשון', date: '25.05', title: 'תערוכת גלריה חדשה', time: '10:00-20:00', location: 'גלריה שם', category: 'תערוכה' },
  { day: 'שלישי', date: '27.05', title: 'ערב מוזיקה ים-תיכוני', time: '19:00-23:00', location: 'כיכר הפישקה', category: 'מוזיקה' },
  { day: 'חמישי', date: '29.05', title: 'סדנת בישול יפואי', time: '17:00-20:00', location: 'מטבח משותף', category: 'סדנה' },
  { day: 'שישי', date: '30.05', title: 'הגרלת ילדים שבועית', time: '16:30', location: 'סמטת הגלריות', category: 'הגרלה' },
]

const categoryColors = {
  'שוק': '#F59E0B',
  'סיור': '#3B82F6',
  'תערוכה': '#8B5CF6',
  'מוזיקה': '#EC4899',
  'סדנה': '#10B981',
  'הגרלה': '#C8A96E',
}

export default function Events() {
  return (
    <section id="events" className="py-24" style={{ background: 'linear-gradient(180deg, rgba(245,237,214,0.94) 0%, rgba(237,224,196,0.92) 100%)' }}>
      <div className="max-w-5xl mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="section-title">השבוע ביפו העתיקה</h2>
          <div className="gold-divider"></div>
          <p className="section-subtitle">אירועים, תערוכות ופעילויות — מתעדכן מדי שבוע</p>
        </div>

        <div className="space-y-4 mb-12">
          {events.map((event, i) => (
            <div key={i} className="card flex flex-col sm:flex-row items-start sm:items-center gap-4 text-right hover:transform hover:translateX-1 transition-all">
              {/* Date */}
              <div className="flex-shrink-0 text-center w-16">
                <div className="text-sm opacity-60" style={{ color: 'var(--gold-light)' }}>{event.day}</div>
                <div className="text-2xl font-black" style={{ color: 'var(--gold)' }}>{event.date.split('.')[0]}</div>
                <div className="text-xs opacity-50" style={{ color: 'var(--gold-light)' }}>{event.date.split('.').slice(1).join('.')}</div>
              </div>

              {/* Divider */}
              <div className="hidden sm:block w-px h-12 opacity-30" style={{ background: 'var(--gold)' }}></div>

              {/* Content */}
              <div className="flex-1">
                <div className="flex flex-wrap items-center gap-2 mb-1">
                  <span className="text-base font-bold" style={{ color: 'var(--parchment)' }}>{event.title}</span>
                  <span className="text-xs px-2 py-0.5 rounded-full font-medium" style={{ background: categoryColors[event.category] + '22', color: categoryColors[event.category] }}>
                    {event.category}
                  </span>
                </div>
                <div className="flex items-center gap-4 text-sm opacity-60" style={{ color: 'var(--gold-light)' }}>
                  <span>⏰ {event.time}</span>
                  <span>📍 {event.location}</span>
                </div>
              </div>

              <a href="#contact" className="btn-outline py-2 px-4 text-sm flex-shrink-0">
                פרטים
              </a>
            </div>
          ))}
        </div>

        <div className="text-center">
          <p className="mb-4 opacity-60" style={{ color: 'var(--gold-light)' }}>
            רוצה לקבל עדכון שבועי ישירות לוואצ'אפ?
          </p>
          <a href="https://chat.whatsapp.com/BhnFkwONJd6DeA7KlwG1MC" target="_blank" rel="noreferrer" className="btn-whatsapp">
            קבל עדכון שבועי
          </a>
        </div>
      </div>
    </section>
  )
}
