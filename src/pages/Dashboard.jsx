import { useState, useEffect } from 'react'
import { useAuth } from '../contexts/AuthContext'
import { api } from '../services/api'
import Button from '../components/ui/Button'
import ToastContainer from '../components/ui/ToastContainer'
import { useToast } from '../components/ui/useToast'
import TaskCard from '../components/tasks/TaskCard'
import CreateTaskModal from '../components/tasks/CreateTaskModal'

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
    all:         tasks.length,
    pending:     tasks.filter((t) => t.status === 'pending').length,
    in_progress: tasks.filter((t) => t.status === 'in_progress').length,
    done:        tasks.filter((t) => t.status === 'done').length,
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
            { key: 'all',         label: 'Todas'        },
            { key: 'pending',     label: 'Pendentes'    },
            { key: 'in_progress', label: 'Em andamento' },
            { key: 'done',        label: 'Concluídas'   },
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
          <div style={{ textAlign: 'center', padding: 60, color: 'var(--muted)' }}>
            Carregando...
          </div>
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
              <TaskCard
                key={task.id}
                task={task}
                onUpdate={handleUpdate}
                onDelete={handleDelete}
              />
            ))}
          </div>
        )}
      </div>

      {showModal && (
        <CreateTaskModal
          onClose={() => setShowModal(false)}
          onCreate={handleCreate}
        />
      )}

      <ToastContainer toasts={toasts} />
    </div>
  )
}