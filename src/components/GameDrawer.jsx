import { useEffect, useRef } from 'react'

export default function CenterModal({ open, onClose, title, children }) {
  const panelRef = useRef(null)

  // Lock body scroll while modal is open
  useEffect(() => {
    if (!open) return
    const prev = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    return () => { document.body.style.overflow = prev }
  }, [open])

  // Close on Escape
  useEffect(() => {
    if (!open) return
    function h(e) { if (e.key === 'Escape') onClose() }
    window.addEventListener('keydown', h)
    return () => window.removeEventListener('keydown', h)
  }, [open, onClose])

  // Scroll panel to top when opened
  useEffect(() => {
    if (open && panelRef.current) panelRef.current.scrollTop = 0
  }, [open, title])

  return (
    <>
      {/* Backdrop — softly dimmed, photo still visible */}
      <div
        onClick={onClose}
        aria-hidden
        style={{
          position: 'fixed',
          inset: 0,
          zIndex: 1000,
          background: 'rgba(44,26,14,0.32)',
          backdropFilter: 'blur(4px)',
          WebkitBackdropFilter: 'blur(4px)',
          opacity: open ? 1 : 0,
          pointerEvents: open ? 'auto' : 'none',
          transition: 'opacity 0.35s',
        }}
      />

      {/* Centered modal panel */}
      <div
        style={{
          position: 'fixed',
          inset: 0,
          zIndex: 1001,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          padding: '24px',
          opacity: open ? 1 : 0,
          pointerEvents: open ? 'auto' : 'none',
          transition: 'opacity 0.35s',
        }}
      >
        <div
          ref={panelRef}
          role="dialog"
          aria-modal="true"
          aria-label={title}
          onClick={e => e.stopPropagation()}
          style={{
            width: '100%',
            maxWidth: 1000,
            maxHeight: '92vh',
            background: 'rgba(255,252,245,0.38)',
            backdropFilter: 'blur(36px) saturate(1.4)',
            WebkitBackdropFilter: 'blur(36px) saturate(1.4)',
            border: '2px solid rgba(255,255,255,0.45)',
            borderRadius: 28,
            boxShadow: '0 32px 80px rgba(44,26,14,0.45), 0 8px 24px rgba(44,26,14,0.15), inset 0 1px 0 rgba(255,255,255,0.4)',
            transform: open ? 'scale(1) translateY(0)' : 'scale(0.92) translateY(20px)',
            transition: 'transform 0.45s cubic-bezier(0.22, 1, 0.36, 1)',
            display: 'flex',
            flexDirection: 'column',
            position: 'relative',
            overflow: 'hidden',
          }}
        >
          {/* Floating X button - top right (RTL start side) */}
          <button
            onClick={onClose}
            aria-label="סגור"
            style={{
              position: 'absolute',
              top: 16,
              right: 16,
              zIndex: 10,
              width: 44,
              height: 44,
              borderRadius: '50%',
              background: 'linear-gradient(135deg, #C4622D, #E8841C)',
              color: '#FFFFFF',
              border: '3px solid rgba(255,255,255,0.5)',
              boxShadow: '0 6px 18px rgba(196,98,45,0.5)',
              cursor: 'pointer',
              fontSize: 20,
              fontWeight: 900,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              transition: 'transform 0.2s',
              textShadow: '0 1px 3px rgba(0,0,0,0.3)',
            }}
            onMouseEnter={e => e.currentTarget.style.transform = 'scale(1.1) rotate(90deg)'}
            onMouseLeave={e => e.currentTarget.style.transform = 'scale(1) rotate(0deg)'}
          >
            ✕
          </button>

          {/* Title bar */}
          <div
            style={{
              padding: '20px 70px 16px 24px',
              borderBottom: '1px solid rgba(200,169,110,0.3)',
              background: 'linear-gradient(180deg, rgba(255,252,245,0.95), rgba(255,252,245,0.85))',
              flexShrink: 0,
            }}
          >
            <h2
              style={{
                margin: 0,
                fontSize: 22,
                fontWeight: 900,
                color: '#8B5E00',
                fontFamily: 'Frank Ruhl Libre, serif',
                textAlign: 'right',
              }}
            >
              {title}
            </h2>
          </div>

          {/* Scrollable content */}
          <div
            style={{
              flex: 1,
              overflowY: 'auto',
              WebkitOverflowScrolling: 'touch',
              direction: 'rtl',
            }}
          >
            {open && children}
          </div>
        </div>
      </div>
    </>
  )
}
