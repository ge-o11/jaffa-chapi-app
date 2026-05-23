import { useEffect, useRef } from 'react'

export default function GameDrawer({ open, onClose, title, children }) {
  const panelRef = useRef(null)

  // Lock body scroll while drawer is open
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
  }, [open])

  return (
    <>
      {/* Backdrop — covers the visible Journey strip on the right and dims it */}
      <div
        onClick={onClose}
        aria-hidden
        style={{
          position: 'fixed',
          inset: 0,
          zIndex: 1000,
          background: 'rgba(44,26,14,0.55)',
          backdropFilter: 'blur(6px)',
          opacity: open ? 1 : 0,
          pointerEvents: open ? 'auto' : 'none',
          transition: 'opacity 0.4s',
        }}
      />

      {/* Drawer panel — slides in from left */}
      <aside
        ref={panelRef}
        role="dialog"
        aria-modal="true"
        aria-label={title}
        style={{
          position: 'fixed',
          top: 0,
          bottom: 0,
          left: 0,
          width: '100vw',
          maxWidth: 'min(92vw, 1000px)',
          zIndex: 1001,
          background: 'rgba(255,252,245,0.98)',
          boxShadow: '12px 0 50px rgba(44,26,14,0.35)',
          transform: open ? 'translateX(0)' : 'translateX(-105%)',
          transition: 'transform 0.55s cubic-bezier(0.22, 1, 0.36, 1)',
          overflowY: 'auto',
          WebkitOverflowScrolling: 'touch',
          borderTopRightRadius: 28,
          borderBottomRightRadius: 28,
        }}
      >
        {/* Sticky header with title + close */}
        <div
          className="sticky top-0 z-10 flex items-center justify-between px-4 md:px-6 py-3 md:py-4"
          style={{
            background: 'linear-gradient(180deg, rgba(255,252,245,0.99) 0%, rgba(255,252,245,0.94) 100%)',
            backdropFilter: 'blur(10px)',
            borderBottom: '1px solid rgba(200,169,110,0.3)',
          }}
        >
          <button
            onClick={onClose}
            aria-label="סגור"
            className="flex items-center gap-2 py-2 px-4 rounded-2xl font-bold text-sm transition-all hover:scale-105 active:scale-95"
            style={{
              background: 'linear-gradient(135deg, #C4622D, #E8841C)',
              color: '#FFFFFF',
              border: '2px solid rgba(255,255,255,0.3)',
              boxShadow: '0 4px 12px rgba(196,98,45,0.4)',
              textShadow: '0 1px 3px rgba(0,0,0,0.25)',
              cursor: 'pointer',
            }}
          >
            <span className="text-base">→</span>
            <span>חזרה</span>
          </button>

          <div className="font-black text-base md:text-lg text-center flex-1 px-3"
            style={{ color: '#8B5E00', fontFamily: 'Frank Ruhl Libre, serif' }}>
            {title}
          </div>

          <button
            onClick={onClose}
            aria-label="סגור"
            className="w-9 h-9 md:w-10 md:h-10 rounded-full flex items-center justify-center text-lg font-bold transition-all hover:scale-110 active:scale-95"
            style={{
              background: 'rgba(200,169,110,0.18)',
              color: '#8B5E00',
              border: '2px solid rgba(200,169,110,0.4)',
              cursor: 'pointer',
            }}
          >
            ✕
          </button>
        </div>

        {/* Content */}
        <div style={{ minHeight: 'calc(100vh - 70px)' }}>
          {open && children}
        </div>
      </aside>

      {/* Side hint on backdrop — visible part where journey peeks */}
      {open && (
        <button
          onClick={onClose}
          aria-label="סגור"
          className="hidden md:flex"
          style={{
            position: 'fixed',
            top: '50%',
            left: 'min(92vw, 1000px)',
            transform: 'translateX(8px) translateY(-50%)',
            zIndex: 1002,
            width: 44,
            height: 100,
            borderRadius: '0 22px 22px 0',
            background: 'rgba(255,252,245,0.96)',
            border: '2px solid rgba(200,169,110,0.4)',
            borderLeft: 'none',
            color: '#8B5E00',
            fontSize: 22,
            fontWeight: 900,
            alignItems: 'center',
            justifyContent: 'center',
            cursor: 'pointer',
            boxShadow: '4px 0 12px rgba(44,26,14,0.15)',
          }}
        >
          ←
        </button>
      )}
    </>
  )
}
