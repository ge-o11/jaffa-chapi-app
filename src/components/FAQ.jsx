import { useState } from 'react'
import { ChevronDown } from 'lucide-react'

const faqs = [
  { q: 'איך מצטרפים לקהילת יפו העתיקה?', a: 'סורקים QR/NFC בכל נקודת אטרקציה ביפו העתיקה, או לוחצים על כפתור "הצטרפות לקהילה" באתר. ההצטרפות חינמית לחלוטין.' },
  { q: 'כמה נקודות קרדיט מקבלים?', a: '10 נקודות מיידית עם ההצטרפות, ועוד נקודה אחת כל יום שנשארים בקהילה. הצבירה אוטומטית ואין צורך לעשות דבר.' },
  { q: 'מה קורה אם עוזבים את הקהילה?', a: 'הנקודות מוקפאות ולא ניתן להשתמש בהן. חזרה לקהילה מחזירה את כל הנקודות שנצברו + הצבירה מתחדשת.' },
  { q: 'היכן ניתן לממש את הנקודות?', a: 'בכל נקודות האטרקציה ביפו העתיקה: מסעדות, גלריות, חנויות, סיורים ועוד. הצג את מספר הנקודות שלך לבעל המתחם.' },
  { q: 'האם הסיורים מתאימים לילדים קטנים?', a: 'הסיור המשפחתי מותאם לילדים מגיל 4. המסלול כולל פעילויות אינטראקטיביות, מידע בגובה עיניים ועצירות קצרות.' },
  { q: 'האם ניתן להזמין סיור לקבוצות גדולות?', a: 'כן! ניתן להזמין סיורים מותאמים אישית לקבוצות, אירועי חברה ובית ספר. צרו קשר לתיאום.' },
  { q: 'האם המערכת עובדת ללא אינטרנט?', a: 'ניתן לקרוא מידע שנשמר במטמון. לתכונות מלאות (הגרלות, ניווט, קופונים) נדרש חיבור לרשת.' },
  { q: 'אני בעל עסק ביפו. כיצד אוכל להצטרף?', a: 'יש לפנות לחפ"י ישירות. נציגינו יגיעו לפגישה, יסבירו את המערכת ויקימו עבורכם מיני-סייט ומנגנון הטבות.' },
]

function FAQItem({ q, a }) {
  const [open, setOpen] = useState(false)
  return (
    <div className="card mb-3 cursor-pointer" onClick={() => setOpen(!open)}>
      <div className="flex items-center justify-between gap-4">
        <ChevronDown size={20} style={{ color: 'var(--gold)', transform: open ? 'rotate(180deg)' : 'none', transition: 'transform 0.3s', flexShrink: 0 }} />
        <span className="font-bold text-base text-right flex-1" style={{ color: 'var(--parchment)' }}>{q}</span>
      </div>
      {open && (
        <div className="mt-4 pt-4 border-t text-right text-sm leading-relaxed" style={{ borderColor: 'rgba(200,169,110,0.15)', color: 'var(--gold-light)', opacity: 0.85 }}>
          {a}
        </div>
      )}
    </div>
  )
}

export default function FAQ() {
  return (
    <section id="faq" className="py-24" style={{ background: 'var(--navy)' }}>
      <div className="max-w-3xl mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="section-title">שאלות נפוצות</h2>
          <div className="gold-divider"></div>
          <p className="section-subtitle">מצאו תשובות לשאלות הנפוצות ביותר</p>
        </div>
        {faqs.map((f, i) => <FAQItem key={i} q={f.q} a={f.a} />)}
        <div className="text-center mt-10">
          <p className="mb-4 opacity-60 text-sm" style={{ color: 'var(--gold-light)' }}>לא מצאתם תשובה?</p>
          <a href="#contact" className="btn-gold">שאלו אותנו ישירות →</a>
        </div>
      </div>
    </section>
  )
}
