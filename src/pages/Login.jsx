import { useState } from 'react'
import { useAuth } from '../contexts/AuthContext'
import Button from '../components/ui/Button'
import Input from '../components/ui/Input'

export default function Login({ onNavigate }) {
  const { login } = useAuth()
  const [form, setForm] = useState({ email: '', password: '' })
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)

  const handleSubmit = async (e) => {
    e.preventDefault()
    setError('')
    setLoading(true)
    try {
      await login(form.email, form.password)
      onNavigate('dashboard')
    } catch (err) {
      setError(err.message)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div style={{
      minHeight: '100vh',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      position: 'relative',
      zIndex: 1,
      padding: 24,
    }}>
      <div style={{ width: '100%', maxWidth: 420 }}>

        {/* Logo */}
        <div style={{ textAlign: 'center', marginBottom: 40 }}>
          <div style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: 8,
            background: 'linear-gradient(135deg, var(--accent), var(--accent2))',
            borderRadius: 12,
            padding: '10px 18px',
            marginBottom: 20,
          }}>
            <span style={{ fontSize: 38 }}>✓</span>
            <span style={{
              fontFamily: "'Syne', sans-serif",
              fontSize: 40,
              fontWeight: 800,
              color: 'white',
            }}>
              To-Do List
            </span>
          </div>
        </div>

        {/* Card */}
        <div style={{
          background: 'var(--surface)',
          border: '1px solid var(--border)',
          borderRadius: 16,
          padding: 32,
          marginBottom: 26,
        }}>
          <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: 40 }}>
            <Input
              label="E-mail"
              type="email"
              placeholder="joao@email.com"
              value={form.email}
              onChange={(e) => setForm({ ...form, email: e.target.value })}
              required
            />
            <Input
              label="Senha"
              type="password"
              placeholder="••••••••"
              value={form.password}
              onChange={(e) => setForm({ ...form, password: e.target.value })}
              required
            />

            {error && (
              <div style={{
                background: 'rgba(239,68,68,0.08)',
                border: '1px solid rgba(239,68,68,0.2)',
                borderRadius: 8,
                padding: '10px 14px',
                fontSize: 13,
                color: 'var(--delete)',
              }}>
                {error}
              </div>
            )}

            <Button type="submit" loading={loading} fullWidth>
              Entrar
            </Button>
          </form>
        </div>

        {/* Links */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: 10, alignItems: 'center' }}>
          <p style={{ fontSize: 13, color: 'var(--muted)' }}>
            Não tem conta?{' '}
            <button
              onClick={() => onNavigate('register')}
              style={{
                background: 'none', border: 'none', color: 'var(--accent)',
                cursor: 'pointer', fontSize: 13, fontFamily: "'DM Sans', sans-serif",
              }}
            >
              Cadastre-se
            </button>
          </p>
          <button
            onClick={() => onNavigate('docs')}
            style={{
              background: 'none', border: '1px solid var(--border)',
              color: 'var(--muted)', cursor: 'pointer', fontSize: 15,
              fontFamily: "'DM Mono', monospace", padding: '16px 14px',
              borderRadius: 6, transition: 'all 0.15s',
            }}
            onMouseEnter={(e) => { e.target.style.borderColor = 'var(--accent)'; e.target.style.color = 'var(--accent)' }}
            onMouseLeave={(e) => { e.target.style.borderColor = 'var(--border)'; e.target.style.color = 'var(--muted)' }}
          >
            📄 Ver Documentação da API
          </button>
        </div>
      </div>
    </div>
  )
}