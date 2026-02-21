import { useState, useEffect } from 'react'
import { useAuth } from '../contexts/AuthContext'
import { api } from '../services/api'
import Button from '../components/ui/Button'
import Input from '../components/ui/Input'
import ToastContainer from '../components/ui/ToastContainer'
import { useToast } from '../components/ui/useToast'

const STATUS_LABELS = {
  pending:     { label: 'Pendente',      color: 'var(--muted)',   bg: 'var(--surface2)',  border: 'var(--border)'            },
  in_progress: { label: 'Em andamento',  color: 'var(--put)',     bg: 'var(--put-bg)',    border: 'rgba(245,158,11,0.25)'    },
  done:        { label: 'Concluída',     color: 'var(--get)',     bg: 'var(--get-bg)',    border: 'rgba(34,197,94,0.25)'     },
}

function TaskCard({ task, onUpdate, onDelete }) {
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
    <div style={{
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
              <button
                onClick={() => setEditing(true)}
                style={{ background: 'none', border: 'none', color: 'var(--muted)', cursor: 'pointer', padding: 4, fontSize: 15 }}
                title="Editar"
              >✏️</button>
              <button
                onClick={() => onDelete(task.id)}
                style={{ background: 'none', border: 'none', color: 'var(--muted)', cursor: 'pointer', padding: 4, fontSize: 15 }}
                title="Deletar"
              >🗑️</button>
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

function CreateTaskModal({ onClose, onCreate }) {
  const [form, setForm] = useState({ title: '', description: '' })
  const [loading, setLoading] = useState(false)

  const handleSubmit = async (e) => {
    e.preventDefault()
    if (!form.title.trim()) return
    setLoading(true)
    try {
      await onCreate(form)
      onClose()
    } finally {
      setLoading(false)
    }
  }

  return (
    <div style={{
      position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.7)',
      display: 'flex', alignItems: 'center', justifyContent: 'center',
      zIndex: 1000, padding: 24,
    }}
      onClick={(e) => e.target === e.currentTarget && onClose()}
    >
      <div style={{
        background: 'var(--surface)',
        border: '1px solid var(--border)',
        borderRadius: 16,
        padding: 32,
        width: '100%',
        maxWidth: 440,
        animation: 'fadeUp 0.2s ease',
      }}>
        <h2 style={{ fontFamily: "'Syne', sans-serif", fontSize: 20, fontWeight: 700, color: 'var(--text)', marginBottom: 24 }}>
          Nova Tarefa
        </h2>
        <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
          <Input label="Título *" placeholder="Ex: Estudar React" value={form.title} onChange={(e) => setForm({ ...form, title: e.target.value })} required />
          <Input label="Descrição" placeholder="Opcional" value={form.description} onChange={(e) => setForm({ ...form, description: e.target.value })} />
          <div style={{ display: 'flex', gap: 10, marginTop: 8 }}>
            <Button type="submit" loading={loading} style={{ flex: 1 }}>Criar</Button>
            <Button type="button" variant="ghost" onClick={onClose} style={{ flex: 1 }}>Cancelar</Button>
          </div>
        </form>
      </div>
      <style>{`@keyframes fadeUp { from { opacity: 0; transform: translateY(12px); } to { opacity: 1; transform: translateY(0); } }`}</style>
    </div>
  )
}

export default function Dashboard({ onNavigate }) {
  const { user, logout } = useAuth()
  const { toasts, success, error: toastError } = useToast()
  const [tasks, setTasks] = useState([])
  const [loading, setLoading] = useState(true)
  const [filter, setFilter] = useState('all')
  const [showModal, setShowModal] = useState(false)

  useEffect(() => {
    api.getTasks()
      .then(setTasks)
      .catch(() => toastError('Erro ao carregar tarefas'))
      .finally(() => setLoading(false))
  }, [toastError])

  const handleCreate = async (form) => {
    const task = await api.createTask(form)
    setTasks((prev) => [task, ...prev])
    success('Tarefa criada!')
  }

  const handleUpdate = async (id, data) => {
    const updated = await api.updateTask(id, data)
    setTasks((prev) => prev.map((t) => t.id === id ? updated : t))
    success('Tarefa atualizada!')
  }

  const handleDelete = async (id) => {
    await api.deleteTask(id)
    setTasks((prev) => prev.filter((t) => t.id !== id))
    success('Tarefa deletada!')
  }

  const handleLogout = () => {
    logout()
    onNavigate('login')
  }

  const filtered = filter === 'all' ? tasks : tasks.filter((t) => t.status === filter)

  const counts = {
    all: tasks.length,
    pending: tasks.filter((t) => t.status === 'pending').length,
    in_progress: tasks.filter((t) => t.status === 'in_progress').length,
    done: tasks.filter((t) => t.status === 'done').length,
  }

  return (
    <div style={{ minHeight: '100vh', position: 'relative', zIndex: 1 }}>

      {/* Navbar */}
      <nav style={{
        background: 'var(--surface)',
        borderBottom: '1px solid var(--border)',
        padding: '0 32px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        height: 60,
        position: 'sticky',
        top: 0,
        zIndex: 50,
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
          <span style={{ fontSize: 20 }}>✓</span>
          <span style={{ fontFamily: "'Syne', sans-serif", fontSize: 16, fontWeight: 700, color: 'var(--text)' }}>
            To-Do List Tarefy
          </span>
        </div>

        <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
          {/* User profile button */}
          <button
            onClick={() => onNavigate('profile')}
            style={{
              background: 'var(--surface2)', border: '1px solid var(--border)',
              borderRadius: 8, padding: '6px 14px', cursor: 'pointer',
              display: 'flex', alignItems: 'center', gap: 8,
              transition: 'border-color 0.15s',
            }}
            onMouseEnter={(e) => e.currentTarget.style.borderColor = 'var(--accent)'}
            onMouseLeave={(e) => e.currentTarget.style.borderColor = 'var(--border)'}
          >
            <div style={{
              width: 26, height: 26, borderRadius: '50%',
              background: 'linear-gradient(135deg, var(--accent), var(--accent2))',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              fontSize: 12, fontWeight: 700, color: 'white',
              overflow: 'hidden', flexShrink: 0,
            }}>
              {localStorage.getItem('avatar')
                ? <img src={localStorage.getItem('avatar')} alt="avatar" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                : user?.name?.[0]?.toUpperCase()
              }
            </div>
            <span style={{ fontSize: 13, color: 'var(--text)' }}>{user?.name}</span>
          </button>

          {/* Logout button */}
          <button
            onClick={handleLogout}
            title="Sair"
            style={{
              background: 'none',
              border: '1px solid rgba(239,68,68,0.2)',
              borderRadius: 8,
              padding: '10px 12px',
              cursor: 'pointer',
              color: 'var(--delete)',
              fontSize: 15,
              fontFamily: "'DM Sans', sans-serif",
              display: 'flex',
              alignItems: 'center',
              gap: 6,
              transition: 'all 0.15s',
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.background = 'rgba(239,68,68,0.08)'
              e.currentTarget.style.borderColor = 'rgba(239,68,68,0.4)'
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.background = 'none'
              e.currentTarget.style.borderColor = 'rgba(239,68,68,0.2)'
            }}
          >
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"/>
              <polyline points="16 17 21 12 16 7"/>
              <line x1="21" y1="12" x2="9" y2="12"/>
            </svg>
            Sair
          </button>
        </div>
      </nav>

      <div style={{ maxWidth: 760, margin: '0 auto', padding: '40px 24px' }}>

        {/* Header */}
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 32 }}>
          <div>
            <h1 style={{ fontFamily: "'Syne', sans-serif", fontSize: 28, fontWeight: 800, color: 'var(--text)', marginBottom: 4 }}>
              Minhas Tarefas
            </h1>
            <p style={{ fontSize: 14, color: 'var(--muted)' }}>
              {counts.all} {counts.all === 1 ? 'tarefa' : 'tarefas'} • {counts.done} concluídas
            </p>
          </div>
          <Button onClick={() => setShowModal(true)}>+ Nova tarefa</Button>
        </div>

        {/* Filters */}
        <div style={{ display: 'flex', gap: 8, marginBottom: 28, flexWrap: 'wrap' }}>
          {[
            { key: 'all', label: 'Todas' },
            { key: 'pending', label: 'Pendentes' },
            { key: 'in_progress', label: 'Em andamento' },
            { key: 'done', label: 'Concluídas' },
          ].map(({ key, label }) => (
            <button
              key={key}
              onClick={() => setFilter(key)}
              style={{
                background: filter === key ? 'var(--accent)' : 'var(--surface)',
                border: `1px solid ${filter === key ? 'var(--accent)' : 'var(--border)'}`,
                color: filter === key ? 'white' : 'var(--muted)',
                borderRadius: 8, padding: '7px 16px', fontSize: 13,
                cursor: 'pointer', transition: 'all 0.15s',
                fontFamily: "'DM Sans', sans-serif",
              }}
            >
              {label} <span style={{ opacity: 0.7, marginLeft: 4 }}>{counts[key]}</span>
            </button>
          ))}
        </div>

        {/* Tasks list */}
        {loading ? (
          <div style={{ textAlign: 'center', padding: 60, color: 'var(--muted)' }}>Carregando...</div>
        ) : filtered.length === 0 ? (
          <div style={{
            textAlign: 'center', padding: '60px 24px',
            background: 'var(--surface)', border: '1px solid var(--border)',
            borderRadius: 16,
          }}>
            <p style={{ fontSize: 32, marginBottom: 12 }}>📋</p>
            <p style={{ fontSize: 15, color: 'var(--muted)' }}>
              {filter === 'all' ? 'Nenhuma tarefa ainda. Crie sua primeira!' : 'Nenhuma tarefa nessa categoria.'}
            </p>
          </div>
        ) : (
          <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
            {filtered.map((task) => (
              <TaskCard key={task.id} task={task} onUpdate={handleUpdate} onDelete={handleDelete} />
            ))}
          </div>
        )}
      </div>

      {showModal && <CreateTaskModal onClose={() => setShowModal(false)} onCreate={handleCreate} />}
      <ToastContainer toasts={toasts} />
    </div>
  )
}