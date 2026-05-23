import { useState, useEffect } from 'react'

const GAMES = [
  { href: '#game', icon: '🎯', title: 'מסע 10 התחנות', sub: 'ציד QR בסמטאות יפו', color: '#C4622D' },
  { href: '#lottery', icon: '🎡', title: 'גלגל המזל', sub: 'סובב וקבל פרס', color: '#B8951A' },
  { href: '#quiz', icon: '🧠', title: 'חידון יפו', sub: '10 שאלות + פרס', color: '#1A6B8A' },
  { href: '#selfie-hunt', icon: '📷', title: 'ציד הסלפי', sub: '10 צילומים שווי פרס', color: '#8B2500' },
]

function CardShell({ num, total, children, color = '#C8A96E', next }) {
  return (
    <section
      className="relative flex flex-col items-center justify-center px-4 py-12"
      style={{ minHeight: '100vh' }}
    >
      <div
        className="relative w-full max-w-4xl rounded-[36px] p-8 md:p-12 fade-in"
        style={{
          background: 'rgba(255,252,245,0.94)',
          backdropFilter: 'blur(14px)',
          border: '3px solid rgba(200,169,110,0.5)',
          boxShadow: '0 20px 60px rgba(44,26,14,0.18), 0 4px 16px rgba(44,26,14,0.1)',
        }}
      >
        {/* Card badge */}
        <div className="absolute -top-5 right-8 px-4 py-1.5 rounded-full text-sm font-black"
          style={{ background: `linear-gradient(135deg, ${color}, ${color}dd)`, color: '#FFFFFF', boxShadow: `0 4px 14px ${color}66`, border: '2px solid rgba(255,255,255,0.4)' }}>
          קלף {num} מתוך {total}
        </div>

        {children}

        {next && (
          <div className="text-center mt-8">
            <a
              href={next}
              className="inline-flex items-center gap-2 text-base font-bold opacity-70 hover:opacity-100 transition-opacity"
              style={{ color: '#6B4A00' }}
            >
              גלול לקלף הבא
              <span className="text-2xl animate-bounce inline-block">↓</span>
            </a>
          </div>
        )}
      </div>
    </section>
  )
}

function Card1Welcome() {
  return (
    <CardShell num={1} total={5} color="#C4622D" next="#card2">
      <div className="text-center">
        <div className="inline-block mb-5 px-5 py-2 rounded-full text-sm font-bold border-2 fade-in"
          style={{ color: '#8B5E00', borderColor: 'rgba(200,169,110,0.5)', background: 'rgba(255,255,255,0.7)' }}>
          🏛️ ברוכים הבאים לחפ"י
        </div>
        <h1 className="text-5xl md:text-7xl font-black mb-4 leading-tight"
          style={{ color: '#8B5E00', fontFamily: 'Frank Ruhl Libre, serif', textShadow: '0 2px 12px rgba(255,255,255,0.6)' }}>
          יפו העתיקה<br />
          <span style={{ color: '#C4622D' }}>כחוויה חיה</span>
        </h1>
        <p className="text-xl md:text-2xl mb-8 max-w-2xl mx-auto font-medium" style={{ color: '#2C1A0E' }}>
          משחקים · מפה · אוכל · קהילה — הכל במקום אחד 🎉
        </p>

        <div className="flex flex-wrap justify-center gap-3 mb-10">
          {[
            { num: '10', label: 'נקודות מתנה' },
            { num: '4', label: 'משחקים' },
            { num: '12', label: 'מקומות' },
          ].map(s => (
            <div key={s.label} className="px-5 py-3 rounded-2xl"
              style={{ background: 'rgba(200,169,110,0.18)', border: '2px solid rgba(200,169,110,0.4)' }}>
              <div className="text-3xl font-black" style={{ color: '#8B5E00', fontFamily: 'Frank Ruhl Libre, serif' }}>{s.num}</div>
              <div className="text-xs font-bold" style={{ color: '#6B4A00' }}>{s.label}</div>
            </div>
          ))}
        </div>

        <a href="#card2"
          className="inline-block py-5 px-12 rounded-2xl font-black text-xl transition-all hover:scale-105 active:scale-95"
          style={{
            background: 'linear-gradient(135deg, #C4622D, #E8841C)',
            color: '#FFFFFF',
            boxShadow: '0 12px 32px rgba(196,98,45,0.5), inset 0 1px 0 rgba(255,255,255,0.35)',
            border: '3px solid rgba(255,255,255,0.4)',
            textShadow: '0 1px 4px rgba(0,0,0,0.3)',
          }}>
          🚀 בוא נתחיל!
        </a>
      </div>
    </CardShell>
  )
}

function Card2Games() {
  return (
    <CardShell num={2} total={5} color="#C4622D" next="#card3">
      <div className="text-center mb-8">
        <div className="inline-block mb-3 text-5xl">🎮</div>
        <h2 className="text-4xl md:text-5xl font-black mb-3"
          style={{ color: '#8B5E00', fontFamily: 'Frank Ruhl Libre, serif' }}>
          בחר משחק
        </h2>
        <p className="text-lg" style={{ color: '#2C1A0E', opacity: 0.85 }}>
          4 משחקים כיפיים — תצברו נקודות תוך כדי כיף
        </p>
      </div>

      <div className="grid grid-cols-2 gap-4 md:gap-5">
        {GAMES.map(g => (
          <a key={g.href} href={g.href}
            className="group block rounded-3xl p-5 md:p-6 text-center transition-all hover:-translate-y-2 active:scale-95"
            style={{
              background: `linear-gradient(135deg, ${g.color}, ${g.color}cc)`,
              boxShadow: `0 10px 28px ${g.color}66, inset 0 1px 0 rgba(255,255,255,0.35)`,
              border: '3px solid rgba(255,255,255,0.45)',
              textDecoration: 'none',
            }}>
            <div className="text-5xl md:text-7xl mb-3 transition-transform group-hover:scale-110"
              style={{ filter: 'drop-shadow(0 3px 8px rgba(0,0,0,0.3))' }}>
              {g.icon}
            </div>
            <div className="font-black text-lg md:text-2xl mb-1"
              style={{ color: '#FFFFFF', textShadow: '0 2px 8px rgba(0,0,0,0.4)', fontFamily: 'Frank Ruhl Libre, serif' }}>
              {g.title}
            </div>
            <div className="text-xs md:text-sm font-medium"
              style={{ color: 'rgba(255,255,255,0.95)' }}>
              {g.sub}
            </div>
          </a>
        ))}
      </div>
    </CardShell>
  )
}

function Card3Map() {
  return (
    <CardShell num={3} total={5} color="#2E7D32" next="#card4">
      <div className="text-center">
        <div className="text-7xl mb-3">🗺️</div>
        <h2 className="text-4xl md:text-5xl font-black mb-3"
          style={{ color: '#1B5E20', fontFamily: 'Frank Ruhl Libre, serif' }}>
          גלה את יפו על המפה
        </h2>
        <p className="text-lg mb-8 max-w-2xl mx-auto" style={{ color: '#2C1A0E', opacity: 0.85 }}>
          12 מקומות אמיתיים עם שעות פתיחה, טלפונים וניווט.<br />
          מסעדות, גלריות, מסגדים, השוק והנמל.
        </p>

        <div className="grid grid-cols-3 gap-3 mb-8 max-w-md mx-auto">
          {[
            { icon: '🍽️', label: 'מסעדות' },
            { icon: '🎨', label: 'גלריות' },
            { icon: '🛍️', label: 'שווקים' },
            { icon: '🕌', label: 'מורשת' },
            { icon: '🏛️', label: 'אטרקציות' },
            { icon: '🌊', label: 'הים' },
          ].map(c => (
            <div key={c.label} className="p-3 rounded-2xl text-center"
              style={{ background: 'rgba(46,125,50,0.1)', border: '2px solid rgba(46,125,50,0.3)' }}>
              <div className="text-2xl mb-1">{c.icon}</div>
              <div className="text-xs font-bold" style={{ color: '#1B5E20' }}>{c.label}</div>
            </div>
          ))}
        </div>

        <a href="#map"
          className="inline-block py-5 px-12 rounded-2xl font-black text-xl transition-all hover:scale-105 active:scale-95"
          style={{
            background: 'linear-gradient(135deg, #2E7D32, #66BB6A)',
            color: '#FFFFFF',
            boxShadow: '0 12px 32px rgba(46,125,50,0.5), inset 0 1px 0 rgba(255,255,255,0.35)',
            border: '3px solid rgba(255,255,255,0.4)',
            textShadow: '0 1px 4px rgba(0,0,0,0.3)',
          }}>
          🗺️ פתח את המפה
        </a>
      </div>
    </CardShell>
  )
}

function Card4Community() {
  return (
    <CardShell num={4} total={5} color="#128C7E" next="#card5">
      <div className="text-center">
        <div className="text-7xl mb-3">💬</div>
        <h2 className="text-4xl md:text-5xl font-black mb-3"
          style={{ color: '#0D6356', fontFamily: 'Frank Ruhl Libre, serif' }}>
          הצטרף לקהילה החמה שלנו
        </h2>
        <p className="text-lg mb-6 max-w-2xl mx-auto" style={{ color: '#2C1A0E', opacity: 0.85 }}>
          קהילת וואצ'אפ של אוהבי יפו — חדשות, הטבות, ואירועים בלעדיים.
        </p>

        <div className="max-w-md mx-auto rounded-3xl p-6 mb-8"
          style={{ background: 'linear-gradient(135deg, rgba(37,211,102,0.15), rgba(37,211,102,0.05))', border: '3px solid rgba(37,211,102,0.5)' }}>
          <div className="grid grid-cols-2 gap-3 mb-4">
            {[
              { icon: '🏅', label: '10 נקודות מתנה' },
              { icon: '📈', label: '+1 נקודה כל יום' },
              { icon: '🎁', label: 'הטבות בלעדיות' },
              { icon: '⚡', label: 'התראות אירועים' },
            ].map(b => (
              <div key={b.label} className="p-3 rounded-xl text-center"
                style={{ background: 'rgba(255,252,245,0.85)', border: '1px solid rgba(37,211,102,0.3)' }}>
                <div className="text-2xl mb-1">{b.icon}</div>
                <div className="text-xs font-bold" style={{ color: '#0D6356' }}>{b.label}</div>
              </div>
            ))}
          </div>
        </div>

        <a href="https://chat.whatsapp.com/BhnFkwONJd6DeA7KlwG1MC" target="_blank" rel="noreferrer"
          className="inline-flex items-center gap-2 py-5 px-12 rounded-2xl font-black text-xl transition-all hover:scale-105 active:scale-95"
          style={{
            background: 'linear-gradient(135deg, #128C7E, #25D366)',
            color: '#FFFFFF',
            boxShadow: '0 12px 32px rgba(37,211,102,0.55), inset 0 1px 0 rgba(255,255,255,0.35)',
            border: '3px solid rgba(255,255,255,0.4)',
            textShadow: '0 1px 4px rgba(0,0,0,0.3)',
          }}>
          <svg width="22" height="22" viewBox="0 0 24 24" fill="currentColor"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/></svg>
          הצטרף עכשיו!
        </a>
      </div>
    </CardShell>
  )
}

function Card5Done() {
  return (
    <CardShell num={5} total={5} color="#B8951A">
      <div className="text-center">
        <div className="text-8xl mb-4">🎉</div>
        <h2 className="text-4xl md:text-5xl font-black mb-3"
          style={{ color: '#8B5E00', fontFamily: 'Frank Ruhl Libre, serif' }}>
          סיימת את הסיור!
        </h2>
        <p className="text-lg mb-8 max-w-2xl mx-auto" style={{ color: '#2C1A0E', opacity: 0.85 }}>
          עכשיו אתה יודע הכל. בא לך לחזור על משהו? קח קיצור דרך 👇
        </p>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-10 max-w-3xl mx-auto">
          {[
            { href: '#game', icon: '🎯', label: 'מסע QR' },
            { href: '#map', icon: '🗺️', label: 'מפה' },
            { href: '#lottery', icon: '🎡', label: 'גלגל' },
            { href: '#quiz', icon: '🧠', label: 'חידון' },
            { href: '#selfie-hunt', icon: '📷', label: 'סלפי' },
            { href: '#tours', icon: '🚶', label: 'סיורים' },
            { href: '#events', icon: '🎪', label: 'אירועים' },
            { href: '#contact', icon: '✉️', label: 'צור קשר' },
          ].map(s => (
            <a key={s.href} href={s.href}
              className="p-4 rounded-2xl text-center transition-all hover:-translate-y-1 active:scale-95"
              style={{
                background: 'rgba(255,252,245,0.95)',
                border: '2px solid rgba(200,169,110,0.45)',
                boxShadow: '0 4px 12px rgba(44,26,14,0.08)',
                textDecoration: 'none',
              }}>
              <div className="text-3xl mb-1">{s.icon}</div>
              <div className="text-xs font-bold" style={{ color: '#8B5E00' }}>{s.label}</div>
            </a>
          ))}
        </div>

        <div className="flex flex-wrap justify-center gap-3">
          <a href="#card1"
            className="py-3 px-8 rounded-2xl font-bold text-base"
            style={{ background: 'rgba(255,255,255,0.9)', color: '#8B5E00', border: '2px solid rgba(200,169,110,0.5)', textDecoration: 'none' }}>
            ↑ חזרה להתחלה
          </a>
          <a href="https://chat.whatsapp.com/BhnFkwONJd6DeA7KlwG1MC" target="_blank" rel="noreferrer"
            className="py-3 px-8 rounded-2xl font-bold text-base"
            style={{ background: 'linear-gradient(135deg, #128C7E, #25D366)', color: '#FFFFFF', border: '2px solid rgba(255,255,255,0.3)', textDecoration: 'none', boxShadow: '0 6px 16px rgba(37,211,102,0.4)' }}>
            💬 הצטרף לקהילה
          </a>
        </div>
      </div>
    </CardShell>
  )
}

export default function Journey() {
  return (
    <div>
      <div id="card1"><Card1Welcome /></div>
      <div id="card2"><Card2Games /></div>
      <div id="card3"><Card3Map /></div>
      <div id="card4"><Card4Community /></div>
      <div id="card5"><Card5Done /></div>
    </div>
  )
}
