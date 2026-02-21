import { useState } from 'react'

const methodStyles = {
  GET:    { color: 'var(--get)',    bg: 'var(--get-bg)',    border: 'rgba(34,197,94,0.2)'  },
  POST:   { color: 'var(--post)',   bg: 'var(--post-bg)',   border: 'rgba(59,130,246,0.2)' },
  PUT:    { color: 'var(--put)',    bg: 'var(--put-bg)',    border: 'rgba(245,158,11,0.2)' },
  PATCH:  { color: 'var(--put)',    bg: 'var(--put-bg)',    border: 'rgba(245,158,11,0.2)' },
  DELETE: { color: 'var(--delete)', bg: 'var(--delete-bg)', border: 'rgba(239,68,68,0.2)'  },
}

export function StatusChip({ code, type }) {
  return (
    <span style={{
      fontFamily: "'DM Mono', monospace",
      fontSize: 12,
      padding: '4px 10px',
      borderRadius: 6,
      border: '1px solid',
      color: type === '2xx' ? 'var(--get)' : 'var(--delete)',
      borderColor: type === '2xx' ? 'rgba(34,197,94,0.25)' : 'rgba(239,68,68,0.25)',
      background: type === '2xx' ? 'rgba(34,197,94,0.06)' : 'rgba(239,68,68,0.06)',
    }}>
      {code}
    </span>
  )
}

export function BodyLabel({ children }) {
  return (
    <div style={{
      fontFamily: "'DM Mono', monospace",
      fontSize: 11,
      letterSpacing: '0.08em',
      textTransform: 'uppercase',
      color: 'var(--muted)',
      marginBottom: 10,
    }}>
      {children}
    </div>
  )
}

export default function EndpointCard({ id, method, route, description, defaultOpen = false, children }) {
  const [open, setOpen] = useState(defaultOpen)
  const ms = methodStyles[method]

  return (
    <div
      id={id}
      style={{
        background: 'var(--surface)',
        border: `1px solid ${open ? 'rgba(124,106,255,0.3)' : 'var(--border)'}`,
        borderRadius: 14,
        overflow: 'hidden',
        marginBottom: 20,
        transition: 'border-color 0.2s',
      }}
    >
      <div
        onClick={() => setOpen(!open)}
        style={{
          display: 'flex',
          alignItems: 'center',
          gap: 14,
          padding: '20px 24px',
          cursor: 'pointer',
          userSelect: 'none',
        }}
      >
        <span style={{
          display: 'inline-block',
          fontFamily: "'DM Mono', monospace",
          fontSize: 11,
          fontWeight: 500,
          padding: '3px 9px',
          borderRadius: 5,
          letterSpacing: '0.05em',
          color: ms.color,
          background: ms.bg,
          border: `1px solid ${ms.border}`,
          flexShrink: 0,
        }}>
          {method}
        </span>
        <span style={{
          fontFamily: "'DM Mono', monospace",
          fontSize: 14,
          fontWeight: 500,
          color: 'var(--text)',
          flex: 1,
        }}>
          {route}
        </span>
        <span style={{ fontSize: 13, color: 'var(--muted)', marginRight: 12 }}>{description}</span>
        <span style={{
          color: 'var(--muted)',
          fontSize: 20,
          lineHeight: 1,
          transform: open ? 'rotate(45deg)' : 'rotate(0)',
          transition: 'transform 0.2s',
        }}>
          +
        </span>
      </div>

      {open && (
        <div style={{
          borderTop: '1px solid var(--border)',
          padding: 24,
          display: 'flex',
          flexDirection: 'column',
          gap: 20,
        }}>
          {children}
        </div>
      )}
    </div>
  )
}