import { useState } from 'react'
import { useAuth } from '../contexts/AuthContext'
import Button from '../components/ui/Button'
import Input from '../components/ui/Input'
import { FiArrowLeft } from 'react-icons/fi'

export default function Register({ onNavigate }) {
  const { register } = useAuth()
  const [form, setForm] = useState({ name: '', email: '', password: '' })
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)

  const handleSubmit = async (e) => {
    e.preventDefault()
    setError('')
    if (form.password.length < 6) {
      setError('A senha deve ter pelo menos 6 caracteres')
      return
    }
    setLoading(true)
    try {
      await register(form.name, form.email, form.password)
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
              fontSize: 25,
              fontWeight: 800,
              color: 'white',
            }}>
              To-Do List Tarefy
            </span>
          </div>
          <h1 style={{
            fontFamily: "'Syne', sans-serif",
            fontSize: 28,
            fontWeight: 800,
            color: 'var(--text)',
            marginBottom: 8,
          }}>
            Criar conta
          </h1>
        </div>

        {/* Card */}
        <div style={{
          background: 'var(--surface)',
          border: '1px solid var(--border)',
          borderRadius: 16,
          padding: 32,
          marginBottom: 16,
        }}>
          <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>
            <Input
              label="Nome"
              type="text"
              placeholder="João Silva"
              value={form.name}
              onChange={(e) => setForm({ ...form, name: e.target.value })}
              required
            />
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
              placeholder="Mínimo 6 caracteres"
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
              Criar conta
            </Button>
          </form>
        </div>

        {/* Links */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: 10, alignItems: 'center' }}>
        <p style={{ fontSize: 13, color: 'var(--muted)' }}>
            Já tem conta?{' '}
            <button
            onClick={() => onNavigate('login')}
            style={{
                background: 'none',
                border: 'none',
                color: 'var(--accent)',
                cursor: 'pointer',
                fontSize: 13,
                fontFamily: "'DM Sans', sans-serif",
            }}
            >
            Entrar
            </button>
        </p>
        <button
            onClick={() => onNavigate('home')}
            style={{
                background: 'none',
                border: 'none',
                color: 'var(--muted)',
                cursor: 'pointer',
                fontSize: 12,
                fontFamily: "'DM Sans', sans-serif",
                display: 'flex',
                alignItems: 'center',
                gap: 6,
            }}
        >
            <FiArrowLeft size={20} />
            Voltar para Home
        </button>
        </div>
      </div>
    </div>
  )
}