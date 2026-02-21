export default function Button({ children, variant = 'primary', loading = false, fullWidth = false, ...props }) {
  const styles = {
    primary: {
      background: 'var(--accent)',
      color: 'white',
      border: 'none',
    },
    secondary: {
      background: 'var(--surface2)',
      color: 'var(--text)',
      border: '1px solid var(--border)',
    },
    danger: {
      background: 'rgba(239,68,68,0.1)',
      color: 'var(--delete)',
      border: '1px solid rgba(239,68,68,0.2)',
    },
    ghost: {
      background: 'transparent',
      color: 'var(--muted)',
      border: '1px solid var(--border)',
    },
  }

  return (
    <button
      {...props}
      disabled={loading || props.disabled}
      style={{
        display: 'inline-flex',
        alignItems: 'center',
        justifyContent: 'center',
        gap: 8,
        padding: '10px 20px',
        borderRadius: 8,
        fontSize: 14,
        fontWeight: 500,
        fontFamily: "'DM Sans', sans-serif",
        cursor: loading || props.disabled ? 'not-allowed' : 'pointer',
        opacity: loading || props.disabled ? 0.6 : 1,
        transition: 'all 0.15s',
        width: fullWidth ? '100%' : 'auto',
        ...styles[variant],
        ...props.style,
      }}
    >
      {loading ? <span style={{ width: 14, height: 14, border: '2px solid currentColor', borderTopColor: 'transparent', borderRadius: '50%', display: 'inline-block', animation: 'spin 0.7s linear infinite' }} /> : null}
      {children}
      <style>{`@keyframes spin { to { transform: rotate(360deg); } }`}</style>
    </button>
  )
}