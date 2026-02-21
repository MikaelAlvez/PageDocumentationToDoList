import { useState } from 'react'
import Button from '../ui/Button'
import Input from '../ui/Input'

const STATUS_LABELS = {
  pending:     { label: 'Pendente',     color: 'var(--muted)', bg: 'var(--surface2)', border: 'var(--border)'         },
  in_progress: { label: 'Em andamento', color: 'var(--put)',   bg: 'var(--put-bg)',   border: 'rgba(245,158,11,0.25)' },
  done:        { label: 'Concluída',    color: 'var(--get)',   bg: 'var(--get-bg)',   border: 'rgba(34,197,94,0.25)'  },
}

function IconEdit() {
  return (
    <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"/>
      <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"/>
    </svg>
  )
}

function IconTrash() {
  return (
    <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <polyline points="3 6 5 6 21 6"/>
      <path d="M19 6l-1 14a2 2 0 0 1-2 2H8a2 2 0 0 1-2-2L5 6"/>
      <path d="M10 11v6"/>
      <path d="M14 11v6"/>
      <path d="M9 6V4a1 1 0 0 1 1-1h4a1 1 0 0 1 1 1v2"/>
    </svg>
  )
}

export default function TaskCard({ task, onUpdate, onDelete }) {
  const [editing, setEditing] = useState(false)
  const [form, setForm] = useState({ title: task.title, description: task.description || '', status: task.status })
  const [loading, setLoading] = useState(false)

  const handleSave = async () => {
    setLoading(true)
    try {
      await onUpdate(task.id, form)
      setEditing(false)
    } finally {
      setLoading(false)
    }
  }

  const handleStatusChange = async (status) => {
    await onUpdate(task.id, { ...form, status })
    setForm((f) => ({ ...f, status }))
  }

  return (
    <div
      style={{
        background: 'var(--surface)',
        border: '1px solid var(--border)',
        borderRadius: 12,
        padding: 20,
        transition: 'border-color 0.15s',
      }}
      onMouseEnter={(e) => e.currentTarget.style.borderColor = 'rgba(124,106,255,0.3)'}
      onMouseLeave={(e) => e.currentTarget.style.borderColor = 'var(--border)'}
    >
      {editing ? (
        <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
          <Input value={form.title} onChange={(e) => setForm({ ...form, title: e.target.value })} placeholder="Título" />
          <Input value={form.description} onChange={(e) => setForm({ ...form, description: e.target.value })} placeholder="Descrição (opcional)" />
          <select
            value={form.status}
            onChange={(e) => setForm({ ...form, status: e.target.value })}
            style={{
              background: 'var(--surface2)', border: '1px solid var(--border)',
              borderRadius: 8, padding: '10px 14px', fontSize: 13,
              color: 'var(--text)', fontFamily: "'DM Sans', sans-serif", cursor: 'pointer',
            }}
          >
            <option value="pending">Pendente</option>
            <option value="in_progress">Em andamento</option>
            <option value="done">Concluída</option>
          </select>
          <div style={{ display: 'flex', gap: 8 }}>
            <Button onClick={handleSave} loading={loading} style={{ flex: 1 }}>Salvar</Button>
            <Button variant="ghost" onClick={() => setEditing(false)} style={{ flex: 1 }}>Cancelar</Button>
          </div>
        </div>
      ) : (
        <>
          <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', gap: 12, marginBottom: 10 }}>
            <div style={{ flex: 1 }}>
              <h3 style={{
                fontFamily: "'Syne', sans-serif",
                fontSize: 15,
                fontWeight: 600,
                color: task.status === 'done' ? 'var(--muted)' : 'var(--text)',
                textDecoration: task.status === 'done' ? 'line-through' : 'none',
                marginBottom: 4,
              }}>
                {task.title}
              </h3>
              {task.description && (
                <p style={{ fontSize: 13, color: 'var(--muted)', lineHeight: 1.5 }}>{task.description}</p>
              )}
            </div>

            <div style={{ display: 'flex', gap: 6, flexShrink: 0 }}>
              {/* Edit button — accent (roxo) */}
              <button
                onClick={() => setEditing(true)}
                title="Editar"
                style={{
                  background: 'none', border: 'none',
                  color: 'var(--accent)',
                  cursor: 'pointer', padding: 4,
                  display: 'flex', alignItems: 'center',
                  transition: 'opacity 0.15s',
                  opacity: 0.75,
                }}
                onMouseEnter={(e) => e.currentTarget.style.opacity = '1'}
                onMouseLeave={(e) => e.currentTarget.style.opacity = '0.75'}
              >
                <IconEdit />
              </button>

              {/* Delete button — vermelho */}
              <button
                onClick={() => onDelete(task.id)}
                title="Deletar"
                style={{
                  background: 'none', border: 'none',
                  color: 'var(--delete)',
                  cursor: 'pointer', padding: 4,
                  display: 'flex', alignItems: 'center',
                  transition: 'opacity 0.15s',
                  opacity: 0.75,
                }}
                onMouseEnter={(e) => e.currentTarget.style.opacity = '1'}
                onMouseLeave={(e) => e.currentTarget.style.opacity = '0.75'}
              >
                <IconTrash />
              </button>
            </div>
          </div>

          <div style={{ display: 'flex', gap: 6, flexWrap: 'wrap' }}>
            {Object.entries(STATUS_LABELS).map(([key, val]) => (
              <button
                key={key}
                onClick={() => handleStatusChange(key)}
                style={{
                  fontFamily: "'DM Mono', monospace",
                  fontSize: 11,
                  padding: '3px 10px',
                  borderRadius: 5,
                  border: `1px solid ${task.status === key ? val.border : 'var(--border)'}`,
                  color: task.status === key ? val.color : 'var(--muted)',
                  background: task.status === key ? val.bg : 'transparent',
                  cursor: 'pointer',
                  transition: 'all 0.15s',
                }}
              >
                {val.label}
              </button>
            ))}
          </div>
        </>
      )}
    </div>
  )
}