import { useState, useRef } from 'react'
import { useUser } from '../context/UserContext'

// Real prize wheel — credits only, in sea-blue palette
const PRIZES = [
  { label: '5 נקודות',  color: '#4A9DB8', emoji: '🏅', pts: 5  },
  { label: '10 נקודות', color: '#1A6B8A', emoji: '🏅', pts: 10 },
  { label: '3 נקודות',  color: '#7BB8D1', emoji: '🏅', pts: 3  },
  { label: '15 נקודות', color: '#0D3A56', emoji: '🏅', pts: 15 },
  { label: '25 נקודות', color: '#2D5F8B', emoji: '🏅', pts: 25 },
  { label: '5 נקודות',  color: '#4A9DB8', emoji: '🏅', pts: 5  },
  { label: '2 נקודות',  color: '#7BB8D1', emoji: '🏅', pts: 2  },
  { label: '20 נקודות', color: '#1A6B8A', emoji: '🏅', pts: 20 },
]

const N = PRIZES.length
const SEG = 360 / N

function conicGradient() {
  const parts = PRIZES.map((p, i) => `${p.color} ${i * SEG}deg ${(i + 1) * SEG}deg`)
  return `conic-gradient(${parts.join(', ')})`
}

export default function SpinWheel() {
  const [deg, setDeg]       = useState(0)
  const [spinning, setSpin] = useState(false)
  const [result, setResult] = useState(null)
  const [winner, setWinner] = useState(false)
  const baseRef             = useRef(0)
  const { user, addPoints } = useUser()

  function spin() {
    if (spinning) return
    setSpin(true)
    setResult(null)
    setWinner(false)

    const extra    = 5 + Math.random() * 5
    const stop     = Math.random() * 360
    const total    = baseRef.current + extra * 360 + stop
    baseRef.current = total
    setDeg(total)

    setTimeout(() => {
      setSpin(false)
      setWinner(true)
      const norm = ((total % 360) + 360) % 360
      const adjusted = (270 - norm + 360) % 360
      const idx = Math.floor(adjusted / SEG) % N
      const prize = PRIZES[idx]
      setResult(prize)
      if (user) addPoints(prize.pts)
    }, 4200)
  }

  return (
    <div className="text-center">
      <h3 className="text-2xl font-bold mb-2" style={{ color: '#0D3A56', fontFamily: 'Frank Ruhl Libre, serif' }}>
        🎡 גלגל המזל
      </h3>
      <p className="text-sm mb-8" style={{ color: '#1A6B8A', opacity: 0.9 }}>סובבו וצברו נקודות לחשבון שלכם — הקרדיטים שלכם נצברים אוטומטית!</p>

      {/* Wheel */}
      <div className="wheel-container mb-8">
        <div className="wheel-arrow" />

        <div
          className="wheel-disk"
          style={{
            background: conicGradient(),
            transform: `rotate(${deg}deg)`,
            transition: spinning ? 'transform 4.2s cubic-bezier(0.17,0.67,0.12,0.99)' : 'none',
          }}
        >
          {/* Segment labels */}
          {PRIZES.map((p, i) => {
            const angle = i * SEG + SEG / 2
            const rad   = (angle - 90) * Math.PI / 180
            const r     = 95
            const x     = 150 + r * Math.cos(rad)
            const y     = 150 + r * Math.sin(rad)
            return (
              <div key={i} style={{
                position: 'absolute',
                left: x, top: y,
                transform: `translate(-50%,-50%) rotate(${angle}deg)`,
                fontSize: '10px',
                fontWeight: '700',
                color: 'rgba(255,255,255,0.95)',
                textShadow: '0 1px 3px rgba(0,0,0,0.8)',
                whiteSpace: 'nowrap',
                width: 60,
                textAlign: 'center',
                pointerEvents: 'none',
              }}>
                <div>{p.emoji}</div>
                <div style={{ fontSize: 9 }}>{p.label}</div>
              </div>
            )
          })}
        </div>

        {/* Center */}
        <div className="wheel-center">✦</div>
      </div>

      {/* Spin button */}
      <button onClick={spin} disabled={spinning}
        className="btn-terra text-xl py-4 px-12 rounded-2xl mb-6 disabled:opacity-50 disabled:cursor-not-allowed"
        style={{ boxShadow: '0 4px 24px rgba(26,107,138,0.4)' }}>
        {spinning ? (
          <span className="flex items-center gap-2">
            <svg className="animate-spin" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="12" cy="12" r="10" strokeOpacity=".25"/><path d="M12 2a10 10 0 0 1 10 10"/></svg>
            מסתובב...
          </span>
        ) : '🎯 סובבו את הגלגל!'}
      </button>

      {/* Result */}
      {winner && result && (
        <div className="fade-in rounded-2xl py-6 px-8 mx-auto max-w-xs"
          style={{ background: 'linear-gradient(135deg, rgba(225,240,245,0.95), rgba(176,212,227,0.95))', border: '2px solid #1A6B8A', boxShadow: '0 0 40px rgba(74,157,184,0.4), 0 8px 32px rgba(13,58,86,0.2)' }}>
          <div className="text-5xl mb-2">🎉</div>
          <div className="text-2xl font-black mb-1" style={{ color: '#0D3A56', fontFamily: 'Frank Ruhl Libre, serif' }}>
            זכית!
          </div>
          <div className="text-3xl font-black mb-2" style={{ color: '#1A6B8A' }}>
            {result.emoji} {result.label}
          </div>
          {!user && (
            <p className="text-xs opacity-70 mt-2" style={{ color: '#0D3A56' }}>
              הירשם כדי לשמור את הנקודות לחשבונך
            </p>
          )}
          <button onClick={spin} className="btn-outline mt-4 py-2 px-5 text-sm">
            סובבו שוב
          </button>
        </div>
      )}

      {/* Prizes legend */}
      <div className="grid grid-cols-4 gap-2 mt-8 max-w-sm mx-auto">
        {PRIZES.map(p => (
          <div key={p.label} className="text-center rounded-xl p-2"
            style={{ background: p.color + '22', border: `1px solid ${p.color}44` }}>
            <div className="text-lg">{p.emoji}</div>
            <div className="text-xs font-medium mt-0.5" style={{ color: p.color }}>{p.label}</div>
          </div>
        ))}
      </div>
    </div>
  )
}
