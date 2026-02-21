import { useState } from 'react'
import { useAuth } from '../contexts/AuthContext'
import { api } from '../services/api'
import Button from '../components/ui/Button'
import Input from '../components/ui/Input'
import ToastContainer from '../components/ui/ToastContainer'
import { useToast } from '../components/ui/useToast'

export default function Profile({ onNavigate }) {
  const { user, logout, refreshUser } = useAuth()
  const { toasts, success, error: toastError } = useToast()
  const [form, setForm] = useState({ name: user?.name || '', email: user?.email || '', password: '' })
  const [loading, setLoading] = useState(false)
  const [deleteLoading, setDeleteLoading] = useState(false)
  const [confirmDelete, setConfirmDelete] = useState(false)

  const handleUpdate = async (e) => {
    e.preventDefault()
    setLoading(true)
    try {
      const payload = { name: form.name, email: form.email }
      if (form.password) payload.password = form.password
      await api.updateProfile(payload)
      await refreshUser()
      setForm((f) => ({ ...f, password: '' }))
      success('Perfil atualizado!')
    } catch (err) {
      toastError(err.message)
    } finally {
      setLoading(false)
    }
  }

  const handleDelete = async () => {
    setDeleteLoading(true)
    try {
      await api.deleteProfile()
      logout()
      onNavigate('login')
    } catch (err) {
      toastError(err.message)
    } finally {
      setDeleteLoading(false)
    }
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
        <button
          onClick={() => onNavigate('dashboard')}
          style={{
            background: 'none', border: 'none', color: 'var(--muted)',
            cursor: 'pointer', fontSize: 13, display: 'flex', alignItems: 'center', gap: 6,
            fontFamily: "'DM Sans', sans-serif",
          }}
        >
          ← Voltar
        </button>
        <span style={{ fontFamily: "'Syne', sans-serif", fontSize: 15, fontWeight: 700, color: 'var(--text)' }}>
          Perfil
        </span>
        <button
          onClick={() => { logout(); onNavigate('login') }}
          style={{
            background: 'none', border: '1px solid rgba(239,68,68,0.2)',
            borderRadius: 6, color: 'var(--delete)', cursor: 'pointer',
            fontSize: 12, fontFamily: "'DM Mono', monospace", padding: '5px 12px',
          }}
        >
          Sair
        </button>
      </nav>

      <div style={{ maxWidth: 480, margin: '0 auto', padding: '48px 24px' }}>

        {/* Avatar */}
        <div style={{ textAlign: 'center', marginBottom: 40 }}>
          <div style={{
            width: 80, height: 80, borderRadius: '50%',
            background: 'linear-gradient(135deg, var(--accent), var(--accent2))',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            fontSize: 32, fontWeight: 700, color: 'white',
            margin: '0 auto 16px',
            boxShadow: '0 0 0 4px var(--surface), 0 0 0 6px var(--border)',
          }}>
            {user?.name?.[0]?.toUpperCase()}
          </div>
          <h1 style={{ fontFamily: "'Syne', sans-serif", fontSize: 22, fontWeight: 700, color: 'var(--text)', marginBottom: 4 }}>
            {user?.name}
          </h1>
          <p style={{ fontSize: 13, color: 'var(--muted)' }}>{user?.email}</p>
        </div>

        {/* Edit form */}
        <div style={{
          background: 'var(--surface)',
          border: '1px solid var(--border)',
          borderRadius: 16,
          padding: 28,
          marginBottom: 20,
        }}>
          <h2 style={{ fontFamily: "'Syne', sans-serif", fontSize: 16, fontWeight: 700, color: 'var(--text)', marginBottom: 20 }}>
            Editar informações
          </h2>
          <form onSubmit={handleUpdate} style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
            <Input
              label="Nome"
              value={form.name}
              onChange={(e) => setForm({ ...form, name: e.target.value })}
              required
            />
            <Input
              label="E-mail"
              type="email"
              value={form.email}
              onChange={(e) => setForm({ ...form, email: e.target.value })}
              required
            />
            <Input
              label="Nova senha (deixe em branco para manter)"
              type="password"
              placeholder="••••••••"
              value={form.password}
              onChange={(e) => setForm({ ...form, password: e.target.value })}
            />
            <Button type="submit" loading={loading} fullWidth>
              Salvar alterações
            </Button>
          </form>
        </div>

        {/* Danger zone */}
        <div style={{
          background: 'rgba(239,68,68,0.04)',
          border: '1px solid rgba(239,68,68,0.15)',
          borderRadius: 16,
          padding: 24,
        }}>
          <p style={{ fontSize: 13, color: 'var(--muted)', marginBottom: 16 }}>
            Ao deletar sua conta, todos os seus dados e tarefas serão removidos permanentemente.
          </p>
          {!confirmDelete ? (
            <Button variant="danger" onClick={() => setConfirmDelete(true)} fullWidth>
              Deletar conta
            </Button>
          ) : (
            <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
              <p style={{ fontSize: 13, color: 'var(--delete)', textAlign: 'center', fontWeight: 500 }}>
                Tem certeza? Essa ação não pode ser desfeita.
              </p>
              <div style={{ display: 'flex', gap: 10 }}>
                <Button variant="danger" loading={deleteLoading} onClick={handleDelete} style={{ flex: 1 }}>
                  Sim, deletar
                </Button>
                <Button variant="ghost" onClick={() => setConfirmDelete(false)} style={{ flex: 1 }}>
                  Cancelar
                </Button>
              </div>
            </div>
          )}
        </div>
      </div>

      <ToastContainer toasts={toasts} />
    </div>
  )
}