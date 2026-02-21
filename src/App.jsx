import './index.css'
import { AuthProvider, useAuth } from './contexts/AuthContext'
import Login from './pages/Login'
import Register from './pages/Register'
import Dashboard from './pages/Dashboard'
import Profile from './pages/Profile'

import Sidebar from './components/docs/Sidebar'
import Hero from './components/docs/Hero'
import AuthSection from './components/docs/Authsection'
import EndpointsTable from './components/docs/Endpointstable'
import TasksSection from './components/docs/Taskssection'
import ErrorsSection from './components/docs/Errorssection'

import { useState } from 'react'

function DocsPage({ onNavigate }) {
  return (
    <div style={{ display: 'flex', minHeight: '100vh', position: 'relative', zIndex: 1 }}>
      <Sidebar />
      <main style={{ marginLeft: 260, flex: 1, maxWidth: 900, padding: '64px 56px' }}>
        {/* Back button */}
        <button
          onClick={() => onNavigate('login')}
          style={{
            background: 'none', border: '1px solid var(--border)',
            borderRadius: 6, color: 'var(--muted)', cursor: 'pointer',
            fontSize: 12, fontFamily: "'DM Mono', monospace",
            padding: '5px 12px', marginBottom: 32, transition: 'all 0.15s',
          }}
          onMouseEnter={(e) => { e.target.style.borderColor = 'var(--accent)'; e.target.style.color = 'var(--accent)' }}
          onMouseLeave={(e) => { e.target.style.borderColor = 'var(--border)'; e.target.style.color = 'var(--muted)' }}
        >
          ← Voltar para o App
        </button>
        <Hero />
        <AuthSection />
        <EndpointsTable />
        <TasksSection />
        <ErrorsSection />
      </main>
    </div>
  )
}

function AppRoutes() {
  const { user, loading } = useAuth()
  const [page, setPage] = useState('login')

  if (loading) {
    return (
      <div style={{
        minHeight: '100vh', display: 'flex', alignItems: 'center',
        justifyContent: 'center', color: 'var(--muted)', zIndex: 1, position: 'relative',
      }}>
        <div style={{
          width: 32, height: 32, border: '2px solid var(--border)',
          borderTopColor: 'var(--accent)', borderRadius: '50%',
          animation: 'spin 0.7s linear infinite',
        }} />
        <style>{`@keyframes spin { to { transform: rotate(360deg); } }`}</style>
      </div>
    )
  }

  const navigate = (p) => setPage(p)
  const currentPage = user && (page === 'login' || page === 'register') ? 'dashboard' : page

  if (currentPage === 'docs')      return <DocsPage onNavigate={navigate} />
  if (currentPage === 'register')  return <Register onNavigate={navigate} />
  if (currentPage === 'dashboard') return <Dashboard onNavigate={navigate} />
  if (currentPage === 'profile')   return <Profile onNavigate={navigate} />
  return <Login onNavigate={navigate} />
}

export default function App() {
  return (
    <AuthProvider>
      <AppRoutes />
    </AuthProvider>
  )
}