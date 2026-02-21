const PROD_URL = 'https://to-do-list-r0zh.onrender.com'

export default function Hero() {
  return (
    <section id="overview" style={{
      paddingBottom: 56,
      borderBottom: '1px solid var(--border)',
      marginBottom: 56,
      animation: 'fadeUp 0.6s ease both',
    }}>
      <style>{`
        @keyframes fadeUp {
          from { opacity: 0; transform: translateY(16px); }
          to   { opacity: 1; transform: translateY(0); }
        }
      `}</style>

      <div style={{
        display: 'inline-flex',
        alignItems: 'center',
        gap: 10,
        fontFamily: "'DM Mono', monospace",
        fontSize: 11,
        letterSpacing: '0.1em',
        textTransform: 'uppercase',
        color: 'var(--accent)',
        marginBottom: 20,
      }}>
        <span style={{ display: 'block', width: 100, height: 1, background: 'var(--accent)' }} />
            Documentação de API
        <span style={{ display: 'block', width: 100, height: 1, background: 'var(--accent)' }} />
      </div>

      <h1 style={{
        fontFamily: "'Syne', sans-serif",
        fontSize: 52,
        fontWeight: 800,
        lineHeight: 1.1,
        letterSpacing: '-0.03em',
        background: 'linear-gradient(135deg, var(--text) 40%, var(--muted))',
        WebkitBackgroundClip: 'text',
        WebkitTextFillColor: 'transparent',
        backgroundClip: 'text',
        marginBottom: 20,
      }}>
        To-Do List Tarefy<br />API
      </h1>

      <p style={{
        fontSize: 16,
        color: 'var(--muted)',
        maxWidth: 520,
        lineHeight: 1.8,
        marginBottom: 32,
      }}>
        API RESTful para gerenciamento de tarefas com autenticação JWT.
        Cada usuário possui seu próprio espaço isolado de tarefas.
      </p>

      <div style={{ display: 'flex', gap: 12, flexWrap: 'wrap', marginBottom: 28 }}>
        {['NestJS', 'SQLite', 'TypeORM', 'JWT'].map((tag) => (
          <span key={tag} style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: 7,
            background: 'var(--surface2)',
            border: '1px solid var(--border)',
            borderRadius: 6,
            padding: '7px 14px',
            fontFamily: "'DM Mono', monospace",
            fontSize: 12,
            color: 'var(--text)',
          }}>
            <span style={{ width: 6, height: 6, borderRadius: '50%', background: 'var(--accent3)' }} />
            {tag}
          </span>
        ))}
      </div>

      <div style={{
        background: 'var(--surface2)',
        border: '1px solid var(--border)',
        borderRadius: 10,
        padding: '16px 20px',
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
    </section>
  )
}