import { useEffect, useState } from 'react'

const navGroups = [
  {
    label: 'Geral',
    items: [
      { id: 'overview', label: 'Visão Geral', color: 'var(--accent)' },
      { id: 'auth-section', label: 'Autenticação', color: 'var(--accent)' },
      { id: 'endpoints-overview', label: 'Todos os Endpoints', color: 'var(--accent)' },
    ],
  },
  {
    label: 'Auth',
    items: [
      { id: 'auth-register', label: 'Cadastrar usuário', color: 'var(--post)' },
      { id: 'auth-login', label: 'Login', color: 'var(--post)' },
    ],
  },
  {
    label: 'Users',
    items: [
      { id: 'users-profile', label: 'Ver perfil', color: 'var(--get)' },
      { id: 'users-update', label: 'Atualizar perfil', color: 'var(--put)' },
      { id: 'users-delete', label: 'Deletar conta', color: 'var(--delete)' },
    ],
  },
  {
    label: 'Tasks',
    items: [
      { id: 'tasks-list', label: 'Listar tarefas', color: 'var(--get)' },
      { id: 'tasks-create', label: 'Criar tarefa', color: 'var(--post)' },
      { id: 'tasks-get', label: 'Buscar tarefa', color: 'var(--get)' },
      { id: 'tasks-update', label: 'Atualizar tarefa', color: 'var(--put)' },
      { id: 'tasks-delete', label: 'Deletar tarefa', color: 'var(--delete)' },
    ],
  },
  {
    label: 'Referência',
    items: [{ id: 'errors', label: 'Erros', color: 'var(--delete)' }],
  },
]

export default function Sidebar() {
  const [active, setActive] = useState('overview')

  useEffect(() => {
    const handleScroll = () => {
      const sections = document.querySelectorAll('[id]')
      let current = ''
      sections.forEach((s) => {
        if (window.scrollY >= s.offsetTop - 120) current = s.id
      })
      if (current) setActive(current)
    }
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const scrollTo = (id) => {
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth', block: 'start' })
  }

  return (
    <aside style={{
      width: 260,
      position: 'fixed',
      top: 0,
      left: 0,
      height: '100vh',
      background: 'var(--surface)',
      borderRight: '1px solid var(--border)',
      padding: '32px 0',
      overflowY: 'auto',
      zIndex: 100,
      flexShrink: 0,
    }}>
      {/* Logo */}
      <div style={{ padding: '0 28px 32px', borderBottom: '1px solid var(--border)' }}>
        <div style={{
          display: 'inline-flex',
          alignItems: 'center',
          background: 'linear-gradient(135deg, var(--accent), var(--accent2))',
          borderRadius: 8,
          padding: '6px 12px',
          marginBottom: 12,
        }}>
          <span style={{
            fontFamily: "'DM Mono', monospace",
            fontSize: 11,
            fontWeight: 500,
            color: 'white',
            letterSpacing: '0.08em',
          }}>
            v2.1.0
          </span>
        </div>
        <h1 style={{
          fontFamily: "'Syne', sans-serif",
          fontSize: 17,
          fontWeight: 700,
          color: 'var(--text)',
          lineHeight: 1.3,
        }}>
          To-Do List API
        </h1>
        <p style={{ fontSize: 12, color: 'var(--muted)', marginTop: 4 }}>
          Documentação de Endpoints
        </p>
      </div>

      {/* Nav */}
      <nav style={{ padding: '24px 0' }}>
        {navGroups.map((group) => (
          <div key={group.label}>
            <div style={{
              fontFamily: "'DM Mono', monospace",
              fontSize: 10,
              fontWeight: 500,
              letterSpacing: '0.12em',
              textTransform: 'uppercase',
              color: 'var(--muted)',
              padding: '0 28px 8px',
              marginTop: 10,
            }}>
              {group.label}
            </div>
            {group.items.map((item) => {
              const isActive = active === item.id
              return (
                <button
                  key={item.id}
                  onClick={() => scrollTo(item.id)}
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: 10,
                    padding: '9px 28px',
                    color: isActive ? 'var(--accent)' : 'var(--muted)',
                    background: isActive ? 'rgba(124,106,255,0.06)' : 'transparent',
                    borderLeft: `2px solid ${isActive ? 'var(--accent)' : 'transparent'}`,
                    border: 'none',
                    borderLeftWidth: 2,
                    borderLeftStyle: 'solid',
                    borderLeftColor: isActive ? 'var(--accent)' : 'transparent',
                    width: '100%',
                    textAlign: 'left',
                    fontSize: 13.5,
                    cursor: 'pointer',
                    transition: 'all 0.15s',
                  }}
                >
                  <span style={{
                    width: 7,
                    height: 7,
                    borderRadius: '50%',
                    background: item.color,
                    flexShrink: 0,
                  }} />
                  {item.label}
                </button>
              )
            })}
          </div>
        ))}
      </nav>
    </aside>
  )
}