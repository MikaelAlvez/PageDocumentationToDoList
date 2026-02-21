export default function ToastContainer({ toasts }) {
  return (
    <div style={{
      position: 'fixed',
      bottom: 24,
      right: 24,
      display: 'flex',
      flexDirection: 'column',
      gap: 10,
      zIndex: 9999,
    }}>
      {toasts.map((t) => (
        <div key={t.id} style={{
          background: t.type === 'success'
            ? 'rgba(34,197,94,0.12)'
            : 'rgba(239,68,68,0.12)',
          border: `1px solid ${
            t.type === 'success'
              ? 'rgba(34,197,94,0.3)'
              : 'rgba(239,68,68,0.3)'
          }`,
          color: t.type === 'success'
            ? 'var(--get)'
            : 'var(--delete)',
          padding: '12px 18px',
          borderRadius: 10,
          fontSize: 13.5,
          fontFamily: "'DM Sans', sans-serif",
          backdropFilter: 'blur(8px)',
          animation: 'slideIn 0.2s ease',
          maxWidth: 320,
        }}>
          {t.message}
        </div>
      ))}

      <style>{`
        @keyframes slideIn {
          from { opacity: 0; transform: translateX(20px); }
          to { opacity: 1; transform: translateX(0); }
        }
      `}</style>
    </div>
  )
}