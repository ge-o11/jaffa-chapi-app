import { useState, useRef, useEffect } from 'react'
import { useUser } from '../context/UserContext'

const COOLDOWN_MS = 60 * 60 * 1000

const PRIZES = [
  { label: '5 נקודות',  color: '#4A9DB8', pts: 5  },
  { label: '10 נקודות', color: '#1A6B8A', pts: 10 },
  { label: '3 נקודות',  color: '#7BB8D1', pts: 3  },
  { label: '15 נקודות', color: '#0D3A56', pts: 15 },
  { label: '25 נקודות', color: '#2D5F8B', pts: 25 },
  { label: '5 נקודות',  color: '#4A9DB8', pts: 5  },
  { label: '2 נקודות',  color: '#7BB8D1', pts: 2  },
  { label: '20 נקודות', color: '#1A6B8A', pts: 20 },
]

const N   = PRIZES.length
const SEG = 360 / N

function conicGradient() {
  return `conic-gradient(${PRIZES.map((p, i) => `${p.color} ${i * SEG}deg ${(i + 1) * SEG}deg`).join(', ')})`
}

export default function SpinWheel() {
  const [deg, setDeg]           = useState(0)
  const [spinning, setSpin]     = useState(false)
  const [result, setResult]     = useState(null)
  const [winner, setWinner]     = useState(false)
  const [size, setSize]         = useState(260)
  const [cooldownLeft, setCooldown] = useState(0)
  const baseRef                 = useRef(0)
  const wrapRef                 = useRef(null)
  const { user, addPoints }     = useUser()

  useEffect(() => {
    const last = parseInt(localStorage.getItem('lastSpinTime') || '0', 10)
    const remaining = last + COOLDOWN_MS - Date.now()
    if (remaining > 0) setCooldown(remaining)
  }, [])

  useEffect(() => {
    if (cooldownLeft <= 0) return
    const id = setInterval(() => {
      setCooldown(prev => {
        const next = prev - 1000
        return next <= 0 ? 0 : next
      })
    }, 1000)
    return () => clearInterval(id)
  }, [cooldownLeft > 0])

  // measure available width and size the wheel accordingly
  useEffect(() => {
    if (!wrapRef.current) return
    const obs = new ResizeObserver(([e]) => {
      setSize(Math.min(260, e.contentRect.width - 8))
    })
    obs.observe(wrapRef.current)
    return () => obs.disconnect()
  }, [])

  function spin() {
    if (spinning || cooldownLeft > 0) return
    setSpin(true)
    setResult(null)
    setWinner(false)
    const extra = 5 + Math.random() * 5
    const stop  = Math.random() * 360
    const total = baseRef.current + extra * 360 + stop
    baseRef.current = total
    setDeg(total)
    setTimeout(() => {
      setSpin(false)
      setWinner(true)
      const norm         = ((total % 360) + 360) % 360
      const originalAngle = (360 - norm) % 360
      const idx          = Math.floor(originalAngle / SEG) % N
      const prize        = PRIZES[idx]
      setResult(prize)
      if (user) addPoints(prize.pts)
      localStorage.setItem('lastSpinTime', Date.now().toString())
      setCooldown(COOLDOWN_MS)
    }, 4200)
  }

  const totalSecs = Math.ceil(cooldownLeft / 1000)
  const mm = String(Math.floor(totalSecs / 60)).padStart(2, '0')
  const ss = String(totalSecs % 60).padStart(2, '0')

  const center = size / 2
  const r      = size * 0.32   // label radius ratio (was 95/300)
  const fs     = Math.max(8, size * 0.036) // font-size ratio

  return (
    <div className="text-center" ref={wrapRef}>
      <h3 className="text-lg font-bold mb-1" style={{ color: '#0D3A56', fontFamily: 'Frank Ruhl Libre, serif' }}>
        🎡 גלגל המזל
      </h3>
      <p className="text-xs mb-3" style={{ color: '#1A6B8A', opacity: 0.9 }}>
        סובבו וצברו נקודות — הקרדיטים נצברים אוטומטית!
      </p>

      {/* Wheel */}
      <div style={{ position: 'relative', width: size, height: size, margin: '0 auto 12px' }}>
        {/* Arrow */}
        <div style={{
          position: 'absolute', top: -12, left: '50%', transform: 'translateX(-50%)', zIndex: 10,
          width: 0, height: 0,
          borderLeft: '10px solid transparent', borderRight: '10px solid transparent',
          borderTop: '22px solid #1A6B8A',
          filter: 'drop-shadow(0 2px 3px rgba(0,0,0,0.3))',
        }} />

        {/* Disk */}
        <div style={{
          width: size, height: size, borderRadius: '50%',
          border: '4px solid #1A6B8A',
          boxShadow: '0 0 24px rgba(26,107,138,0.3), inset 0 0 12px rgba(0,0,0,0.12)',
          position: 'relative',
          background: conicGradient(),
          transform: `rotate(${deg}deg)`,
          transition: spinning ? 'transform 4.2s cubic-bezier(0.17,0.67,0.12,0.99)' : 'none',
        }}>
          {/* Labels */}
          {PRIZES.map((p, i) => {
            const angle = i * SEG + SEG / 2
            const rad   = (angle - 90) * Math.PI / 180
            const x     = center + r * Math.cos(rad)
            const y     = center + r * Math.sin(rad)
            return (
              <div key={i} style={{
                position: 'absolute', left: x, top: y,
                transform: `translate(-50%,-50%) rotate(${angle}deg)`,
                fontSize: fs, fontWeight: 700,
                color: 'rgba(255,255,255,0.95)',
                textShadow: '0 1px 3px rgba(0,0,0,0.8)',
                whiteSpace: 'nowrap', textAlign: 'center',
                width: size * 0.22, pointerEvents: 'none',
                lineHeight: 1.2,
              }}>
                🏅<br />{p.label}
              </div>
            )
          })}
        </div>

        {/* Center button */}
        <div style={{
          position: 'absolute', top: '50%', left: '50%',
          transform: 'translate(-50%,-50%)',
          width: size * 0.16, height: size * 0.16,
          borderRadius: '50%', background: '#1A6B8A',
          border: `3px solid #fff`, zIndex: 5,
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          fontSize: size * 0.07, boxShadow: '0 0 16px rgba(26,107,138,0.4)',
        }}>✦</div>
      </div>

      {/* Spin button */}
      <button onClick={spin} disabled={spinning || cooldownLeft > 0}
        className="disabled:opacity-50 disabled:cursor-not-allowed"
        style={{
          background: cooldownLeft > 0 ? 'rgba(13,58,86,0.35)' : 'linear-gradient(135deg, #0D3A56, #4A9DB8)',
          color: '#fff', fontWeight: 900, fontSize: 15,
          padding: '12px 32px', borderRadius: 16, border: 'none',
          boxShadow: '0 4px 18px rgba(26,107,138,0.45)',
          cursor: cooldownLeft > 0 ? 'not-allowed' : 'pointer',
          marginBottom: 12, width: '100%', maxWidth: 260,
          minHeight: 48,
        }}>
        {spinning ? (
          <span style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8 }}>
            <svg style={{ animation: 'spin 1s linear infinite' }} width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <circle cx="12" cy="12" r="10" strokeOpacity=".25"/>
              <path d="M12 2a10 10 0 0 1 10 10"/>
            </svg>
            מסתובב...
          </span>
        ) : cooldownLeft > 0 ? `⏳ ניתן לסובב בעוד ${mm}:${ss}` : '🎯 סובבו את הגלגל!'}
      </button>

      {/* Result */}
      {winner && result && (
        <div className="fade-in rounded-2xl py-4 px-5 mx-auto"
          style={{ background: 'linear-gradient(135deg, rgba(225,240,245,0.95), rgba(176,212,227,0.95))', border: '2px solid #1A6B8A', maxWidth: 260 }}>
          <div style={{ fontSize: 36, marginBottom: 4 }}>🎉</div>
          <div style={{ fontSize: 20, fontWeight: 900, color: '#0D3A56', fontFamily: 'Frank Ruhl Libre, serif' }}>זכית!</div>
          <div style={{ fontSize: 22, fontWeight: 900, color: '#1A6B8A', margin: '4px 0 6px' }}>🏅 {result.label}</div>
          {!user && <p style={{ fontSize: 11, color: '#0D3A56', opacity: 0.7, marginBottom: 8 }}>הירשם כדי לשמור את הנקודות</p>}
          <button onClick={spin}
            style={{ border: '2px solid #1A6B8A', color: '#1A6B8A', background: 'transparent', borderRadius: 10, padding: '8px 20px', fontWeight: 700, cursor: 'pointer', fontSize: 13 }}>
            סובבו שוב
          </button>
        </div>
      )}

      {/* Prize legend */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4,1fr)', gap: 6, marginTop: 12 }}>
        {PRIZES.map((p, i) => (
          <div key={i} style={{ textAlign: 'center', borderRadius: 10, padding: '6px 4px', background: p.color + '22', border: `1px solid ${p.color}44` }}>
            <div style={{ fontSize: 14 }}>🏅</div>
            <div style={{ fontSize: 10, fontWeight: 600, color: p.color, marginTop: 2 }}>{p.label}</div>
          </div>
        ))}
      </div>

      <style>{`@keyframes spin{to{transform:rotate(360deg)}}`}</style>
    </div>
  )
}
