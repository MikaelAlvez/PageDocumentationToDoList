import CodeBlock from './Codeblock'

const PROD_URL = 'https://to-do-list-r0zh.onrender.com'

export default function AuthSection() {
  return (
    <section id="auth-section" style={{ marginBottom: 64 }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: 14, marginBottom: 28 }}>
        <h2 style={{
          fontFamily: "'Syne', sans-serif",
          fontSize: 22,
          fontWeight: 700,
          color: 'var(--text)',
        }}>
          Autenticação
        </h2>
        <span style={{
          fontFamily: "'DM Mono', monospace",
          fontSize: 10,
          letterSpacing: '0.1em',
          textTransform: 'uppercase',
          color: 'var(--accent)',
          background: 'rgba(124,106,255,0.1)',
          border: '1px solid rgba(124,106,255,0.2)',
          borderRadius: 4,
          padding: '3px 8px',
        }}>
          JWT Bearer
        </span>
      </div>

      {/* Base URL */}
      <div style={{
        background: 'var(--surface2)',
        border: '1px solid var(--border)',
        borderRadius: 12,
        padding: '20px 24px',
        marginBottom: 16,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
      }}>
        <span style={{
          fontFamily: "'DM Mono', monospace",
          fontSize: 11,
          color: 'var(--muted)',
          letterSpacing: '0.06em',
          textTransform: 'uppercase',
        }}>
          Base URL — Produção
        </span>
        <span style={{
          fontFamily: "'DM Mono', monospace",
          fontSize: 14,
          color: 'var(--accent3)',
        }}>
          {PROD_URL}
        </span>
      </div>

      {/* Auth header */}
      <div style={{
        background: 'var(--surface2)',
        border: '1px solid var(--border)',
        borderRadius: 12,
        padding: '24px 28px',
        marginBottom: 20,
      }}>
        <p style={{ color: 'var(--muted)', marginBottom: 16, fontSize: 14 }}>
          As rotas de <strong style={{ color: 'var(--text)' }}>tasks</strong> e{' '}
          <strong style={{ color: 'var(--text)' }}>users</strong> exigem autenticação. Inclua o
          token JWT retornado no login no header de cada requisição:
        </p>
        <CodeBlock label="HTTP Header" copyText="Authorization: Bearer <seu_token>">
          <span style={{ color: '#82aaff' }}>Authorization</span>
          <span style={{ color: 'var(--muted)' }}>: </span>
          Bearer <span style={{ color: 'var(--accent3)' }}>&lt;seu_token_jwt&gt;</span>
        </CodeBlock>
      </div>
    </section>
  )
}