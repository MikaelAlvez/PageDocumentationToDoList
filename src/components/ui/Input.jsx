export default function Input({ label, error, ...props }) {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
      {label && (
        <label style={{
          fontSize: 13,
          fontWeight: 500,
          color: 'var(--muted)',
          fontFamily: "'DM Sans', sans-serif",
        }}>
          {label}
        </label>
      )}
      <input
        {...props}
        style={{
          background: 'var(--surface2)',
          border: `1px solid ${error ? 'var(--delete)' : 'var(--border)'}`,
          borderRadius: 8,
          padding: '10px 14px',
          fontSize: 14,
          color: 'var(--text)',
          fontFamily: "'DM Sans', sans-serif",
          outline: 'none',
          transition: 'border-color 0.15s',
          width: '100%',
          ...props.style,
        }}
        onFocus={(e) => {
          e.target.style.borderColor = 'var(--accent)'
          props.onFocus?.(e)
        }}
        onBlur={(e) => {
          e.target.style.borderColor = error ? 'var(--delete)' : 'var(--border)'
          props.onBlur?.(e)
        }}
      />
      {error && (
        <span style={{ fontSize: 12, color: 'var(--delete)' }}>{error}</span>
      )}
    </div>
  )
}