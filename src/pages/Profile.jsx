import { useState, useRef } from 'react'
import { useAuth } from '../contexts/AuthContext'
import { api } from '../services/api'
import { uploadAvatar } from '../services/cloudinary'
import Button from '../components/ui/Button'
import Input from '../components/ui/Input'
import ToastContainer from '../components/ui/ToastContainer'
import { useToast } from '../components/ui/useToast'

export default function Profile({ onNavigate }) {
  const { user, logout, refreshUser } = useAuth()
  const { toasts, success, error: toastError } = useToast()
  const [form, setForm] = useState({ name: user?.name || '', email: user?.email || '', password: '' })
  const [loading, setLoading] = useState(false)
  const [avatarLoading, setAvatarLoading] = useState(false)
  const [deleteLoading, setDeleteLoading] = useState(false)
  const [confirmDelete, setConfirmDelete] = useState(false)
  const [avatarHover, setAvatarHover] = useState(false)
  const fileInputRef = useRef(null)

  const avatarUrl = user?.avatarUrl || null

  const handleAvatarChange = async (e) => {
    const file = e.target.files?.[0]
    if (!file) return
    setAvatarLoading(true)
    try {
      const url = await uploadAvatar(file)
      await api.updateProfile({ avatarUrl: url })
      await refreshUser()
      success('Foto atualizada!')
    } catch (err) {
      toastError(err.message)
    } finally {
      setAvatarLoading(false)
      // reset input so same file can be selected again
      e.target.value = ''
    }
  }

  const handleRemoveAvatar = async () => {
    setAvatarLoading(true)
    try {
      await api.updateProfile({ avatarUrl: null })
      await refreshUser()
      success('Foto removida!')
    } catch (err) {
      toastError(err.message)
    } finally {
      setAvatarLoading(false)
    }
  }

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
          <div style={{ position: 'relative', display: 'inline-block', marginBottom: 16 }}>

            <div
              onClick={() => !avatarLoading && fileInputRef.current?.click()}
              onMouseEnter={() => setAvatarHover(true)}
              onMouseLeave={() => setAvatarHover(false)}
              style={{
                width: 88, height: 88,
                borderRadius: '50%',
                cursor: avatarLoading ? 'default' : 'pointer',
                position: 'relative',
                overflow: 'hidden',
                boxShadow: avatarHover && !avatarLoading
                  ? '0 0 0 3px var(--surface), 0 0 0 5px var(--accent)'
                  : '0 0 0 3px var(--surface), 0 0 0 5px var(--border)',
                transition: 'box-shadow 0.2s',
              }}
            >
              {avatarUrl ? (
                <img src={avatarUrl} alt="Avatar" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
              ) : (
                <div style={{
                  width: '100%', height: '100%',
                  background: 'linear-gradient(135deg, var(--accent), var(--accent2))',
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  fontSize: 32, fontWeight: 700, color: 'white',
                }}>
                  {user?.name?.[0]?.toUpperCase()}
                </div>
              )}

              {/* Loading overlay */}
              {avatarLoading && (
                <div style={{
                  position: 'absolute', inset: 0,
                  background: 'rgba(0,0,0,0.6)',
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                }}>
                  <div style={{
                    width: 24, height: 24,
                    border: '2px solid rgba(255,255,255,0.3)',
                    borderTopColor: 'white',
                    borderRadius: '50%',
                    animation: 'spin 0.7s linear infinite',
                  }} />
                </div>
              )}

              {/* Hover overlay */}
              {avatarHover && !avatarLoading && (
                <div style={{
                  position: 'absolute', inset: 0,
                  background: 'rgba(0,0,0,0.55)',
                  display: 'flex', flexDirection: 'column',
                  alignItems: 'center', justifyContent: 'center', gap: 4,
                }}>
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M23 19a2 2 0 0 1-2 2H3a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h4l2-3h6l2 3h4a2 2 0 0 1 2 2z"/>
                    <circle cx="12" cy="13" r="4"/>
                  </svg>
                  <span style={{ fontSize: 10, color: 'white', fontFamily: "'DM Sans', sans-serif" }}>
                    Alterar
                  </span>
                </div>
              )}
            </div>

            {/* Remove button */}
            {avatarUrl && !avatarLoading && (
              <button
                onClick={(e) => { e.stopPropagation(); handleRemoveAvatar() }}
                title="Remover foto"
                style={{
                  position: 'absolute', top: 0, right: -4,
                  width: 22, height: 22, borderRadius: '50%',
                  background: 'var(--delete)', border: '2px solid var(--bg)',
                  color: 'white', fontSize: 14, cursor: 'pointer',
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  lineHeight: 1,
                }}
              >
                ×
              </button>
            )}
          </div>

          <input
            ref={fileInputRef}
            type="file"
            accept="image/*"
            onChange={handleAvatarChange}
            style={{ display: 'none' }}
          />

          <h1 style={{ fontFamily: "'Syne', sans-serif", fontSize: 22, fontWeight: 700, color: 'var(--text)', marginBottom: 4 }}>
            {user?.name}
          </h1>
          <p style={{ fontSize: 13, color: 'var(--muted)', marginBottom: 8 }}>{user?.email}</p>

          <button
            onClick={() => fileInputRef.current?.click()}
            disabled={avatarLoading}
            style={{
              background: 'none', border: '1px solid var(--border)',
              borderRadius: 6, color: 'var(--muted)', cursor: 'pointer',
              fontSize: 12, fontFamily: "'DM Mono', monospace", padding: '4px 12px',
              transition: 'all 0.15s', opacity: avatarLoading ? 0.5 : 1,
            }}
            onMouseEnter={(e) => { e.target.style.borderColor = 'var(--accent)'; e.target.style.color = 'var(--accent)' }}
            onMouseLeave={(e) => { e.target.style.borderColor = 'var(--border)'; e.target.style.color = 'var(--muted)' }}
          >
            {avatarLoading ? '⏳ Enviando...' : avatarUrl ? '🖼️ Alterar foto' : '📷 Adicionar foto'}
          </button>
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
            <Input label="Nome" value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} required />
            <Input label="E-mail" type="email" value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} required />
            <Input
              label="Nova senha (deixe em branco para manter)"
              type="password"
              placeholder="••••••••"
              value={form.password}
              onChange={(e) => setForm({ ...form, password: e.target.value })}
            />
            <Button type="submit" loading={loading} fullWidth>Salvar alterações</Button>
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
            <Button variant="danger" onClick={() => setConfirmDelete(true)} fullWidth>Deletar conta</Button>
          ) : (
            <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
              <p style={{ fontSize: 13, color: 'var(--delete)', textAlign: 'center', fontWeight: 500 }}>
                Tem certeza? Essa ação não pode ser desfeita.
              </p>
              <div style={{ display: 'flex', gap: 10 }}>
                <Button variant="danger" loading={deleteLoading} onClick={handleDelete} style={{ flex: 1 }}>Sim, deletar</Button>
                <Button variant="ghost" onClick={() => setConfirmDelete(false)} style={{ flex: 1 }}>Cancelar</Button>
              </div>
            </div>
          )}
        </div>
      </div>

      <ToastContainer toasts={toasts} />
      <style>{`@keyframes spin { to { transform: rotate(360deg); } }`}</style>
    </div>
  )
}