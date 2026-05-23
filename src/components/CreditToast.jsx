import { useUser } from '../context/UserContext'

export default function CreditToast() {
  const { pointsToast, dismissToast } = useUser()

  if (!pointsToast) return null

  return (
    <div
      onClick={dismissToast}
      role="status"
      aria-live="polite"
      className="fixed left-1/2 z-[2000] cursor-pointer"
      style={{
        top: 80,
        transform: 'translateX(-50%)',
        animation: 'creditToastIn 0.5s cubic-bezier(0.22, 1, 0.36, 1) both',
      }}
    >
      <style>{`
        @keyframes creditToastIn {
          0% { opacity: 0; transform: translate(-50%, -30px) scale(0.85); }
          60% { transform: translate(-50%, 6px) scale(1.04); }
          100% { opacity: 1; transform: translate(-50%, 0) scale(1); }
        }
        @keyframes creditSparkle {
          0%, 100% { transform: scale(1) rotate(0deg); }
          50% { transform: scale(1.15) rotate(8deg); }
        }
      `}</style>

      <div
        className="flex items-center gap-4 px-6 py-4 rounded-3xl"
        style={{
          background: 'linear-gradient(135deg, rgba(13,58,86,0.92), rgba(26,107,138,0.92))',
          backdropFilter: 'blur(20px) saturate(1.3)',
          WebkitBackdropFilter: 'blur(20px) saturate(1.3)',
          border: '2px solid rgba(176,212,227,0.6)',
          boxShadow: '0 16px 48px rgba(13,58,86,0.55), 0 4px 16px rgba(13,58,86,0.3), inset 0 1px 0 rgba(255,255,255,0.35)',
          minWidth: 280,
          maxWidth: '92vw',
        }}
      >
        <div
          className="text-5xl flex-shrink-0"
          style={{
            filter: 'drop-shadow(0 2px 6px rgba(0,0,0,0.35))',
            animation: 'creditSparkle 1.5s ease-in-out infinite',
          }}
        >
          🏅
        </div>
        <div className="flex-1 text-right">
          <div
            className="font-black text-xl md:text-2xl"
            style={{
              color: '#FFFFFF',
              fontFamily: 'Frank Ruhl Libre, serif',
              textShadow: '0 2px 8px rgba(0,0,0,0.4)',
            }}
          >
            צברת +{pointsToast.amount} נקודות!
          </div>
          <div
            className="text-xs md:text-sm font-bold mt-1"
            style={{ color: 'rgba(225,240,245,0.95)' }}
          >
            יש לך עכשיו <span style={{ color: '#FFD700', fontWeight: 900 }}>{pointsToast.total}</span> נקודות ⭐
          </div>
        </div>
        <button
          aria-label="סגור"
          onClick={(e) => { e.stopPropagation(); dismissToast() }}
          className="w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold transition-all hover:scale-110"
          style={{
            background: 'rgba(255,255,255,0.18)',
            color: '#FFFFFF',
            border: '1px solid rgba(255,255,255,0.3)',
            cursor: 'pointer',
          }}
        >
          ✕
        </button>
      </div>
    </div>
  )
}
