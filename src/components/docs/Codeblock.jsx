import { useState } from 'react'

export default function CodeBlock({ label, children, copyText }) {
  const [copied, setCopied] = useState(false)

  const handleCopy = () => {
    if (!copyText) return
    navigator.clipboard.writeText(copyText)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  return (
    <div style={{
      background: '#0a0a0e',
      border: '1px solid var(--border)',
      borderRadius: 10,
      overflow: 'hidden',
    }}>
      {(label || copyText) && (
        <div style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          padding: '10px 16px',
          background: 'var(--surface)',
          borderBottom: '1px solid var(--border)',
        }}>
          {label && (
            <span style={{
              fontFamily: "'DM Mono', monospace",
              fontSize: 11,
              color: 'var(--muted)',
              letterSpacing: '0.05em',
            }}>
              {label}
            </span>
          )}
          {copyText && (
            <button
              onClick={handleCopy}
              style={{
                fontFamily: "'DM Mono', monospace",
                fontSize: 10,
                color: copied ? 'var(--accent3)' : 'var(--muted)',
                background: 'none',
                border: '1px solid var(--border)',
                borderRadius: 4,
                padding: '3px 8px',
                cursor: 'pointer',
                transition: 'all 0.15s',
                marginLeft: 'auto',
              }}
            >
              {copied ? 'copiado!' : 'copiar'}
            </button>
          )}
        </div>
      )}
      <pre style={{
        padding: '18px 20px',
        fontFamily: "'DM Mono', monospace",
        fontSize: 13,
        lineHeight: 1.8,
        color: 'var(--text)',
        overflowX: 'auto',
        margin: 0,
      }}>
        {children}
      </pre>
    </div>
  )
}