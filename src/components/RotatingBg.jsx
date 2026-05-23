import { useState, useEffect } from 'react'

const PHOTOS = [
  'https://images.pexels.com/photos/18809479/pexels-photo-18809479.jpeg?w=1920&q=72',
  'https://images.pexels.com/photos/18809933/pexels-photo-18809933.jpeg?w=1920&q=72',
  'https://images.pexels.com/photos/30341997/pexels-photo-30341997.jpeg?w=1920&q=72',
  'https://images.pexels.com/photos/31900164/pexels-photo-31900164.jpeg?w=1920&q=72',
  'https://images.pexels.com/photos/17814820/pexels-photo-17814820.jpeg?w=1920&q=72',
  'https://images.pexels.com/photos/5259593/pexels-photo-5259593.jpeg?w=1920&q=72',
  'https://images.pexels.com/photos/531880/pexels-photo-531880.jpeg?w=1920&q=72',
  'https://images.unsplash.com/photo-1518728242875-50600dfbe31a?w=1920&q=72',
]

export default function RotatingBg() {
  const [idx, setIdx] = useState(0)

  useEffect(() => {
    // Preload all photos
    PHOTOS.forEach(p => { const img = new Image(); img.src = p })
    const t = setInterval(() => setIdx(i => (i + 1) % PHOTOS.length), 7000)
    return () => clearInterval(t)
  }, [])

  return (
    <div style={{ position: 'fixed', inset: 0, zIndex: -1, overflow: 'hidden', pointerEvents: 'none' }}>
      {PHOTOS.map((p, i) => (
        <div
          key={i}
          style={{
            position: 'absolute',
            inset: 0,
            backgroundImage: `url(${p})`,
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            opacity: i === idx ? 1 : 0,
            transition: 'opacity 2.5s ease-in-out',
            transform: i === idx ? 'scale(1.04)' : 'scale(1)',
            transitionProperty: 'opacity, transform',
            transitionDuration: '2.5s, 8s',
          }}
        />
      ))}
      {/* Sea-blue overlay for readability — photos still shine through */}
      <div style={{
        position: 'absolute',
        inset: 0,
        background: 'linear-gradient(180deg, rgba(176,212,227,0.42) 0%, rgba(122,184,209,0.48) 50%, rgba(74,157,184,0.52) 100%)',
      }} />
      {/* Photo indicator dots */}
      <div style={{
        position: 'fixed',
        bottom: 14,
        right: 14,
        display: 'flex',
        gap: 6,
        pointerEvents: 'auto',
        zIndex: 5,
      }}>
        {PHOTOS.map((_, i) => (
          <div key={i} style={{
            width: i === idx ? 18 : 6,
            height: 6,
            borderRadius: 6,
            background: i === idx ? '#0D3A56' : 'rgba(13,58,86,0.35)',
            transition: 'all 0.3s',
          }} />
        ))}
      </div>
    </div>
  )
}
