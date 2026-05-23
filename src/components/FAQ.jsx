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
    <div
      onClick={() => setOpen(!open)}
      className="mb-2 rounded-2xl cursor-pointer transition-all"
      style={{ background: 'rgba(225,240,245,0.75)', border: '1.5px solid rgba(74,157,184,0.3)', padding: '14px 16px' }}
    >
      <div className="flex items-center justify-between gap-3">
        <ChevronDown size={18} style={{ color: '#1A6B8A', transform: open ? 'rotate(180deg)' : 'none', transition: 'transform 0.3s', flexShrink: 0 }} />
        <span className="font-bold text-sm md:text-base text-right flex-1" style={{ color: '#0D3A56' }}>{q}</span>
      </div>
      {open && (
        <div className="mt-3 pt-3 border-t text-right text-sm leading-relaxed" style={{ borderColor: 'rgba(74,157,184,0.2)', color: '#1A6B8A' }}>
          {a}
        </div>
      )}
    </div>
  )
}

export default function FAQ() {
  return (
    <div id="faq" className="px-3 py-4">
      <div className="max-w-2xl mx-auto">
        {faqs.map((f, i) => <FAQItem key={i} q={f.q} a={f.a} />)}
        <div className="text-center mt-6">
          <p className="mb-3 text-sm opacity-70" style={{ color: '#1A6B8A' }}>לא מצאתם תשובה?</p>
          <a href="https://wa.me/972502009350" target="_blank" rel="noreferrer"
            className="btn-whatsapp text-sm py-3 px-6">
            שאלו אותנו בוואצ'אפ →
          </a>
        </div>
      </div>
    </div>
  )
}
