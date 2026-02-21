const errors = [
  { code: '400', status: 'Bad Request',   desc: 'Dados inválidos no body da requisição'             },
  { code: '401', status: 'Unauthorized',  desc: 'Token JWT ausente, inválido ou expirado'           },
  { code: '404', status: 'Not Found',     desc: 'Recurso não encontrado ou não pertence ao usuário' },
  { code: '409', status: 'Conflict',      desc: 'E-mail já cadastrado'                              },
]

export default function ErrorsSection() {
  return (
    <section id="errors" style={{ marginBottom: 64 }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: 14, marginBottom: 28 }}>
        <h2 style={{
          fontFamily: "'Syne', sans-serif",
          fontSize: 22,
          fontWeight: 700,
          color: 'var(--text)',
        }}>
          Erros Comuns
        </h2>
      </div>

      <div style={{
        borderRadius: 12,
        overflow: 'hidden',
        border: '1px solid var(--border)',
      }}>
        {/* Header */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'auto auto 1fr',
          background: 'var(--surface2)',
          borderBottom: '1px solid var(--border)',
        }}>
          {['Código', 'Status', 'Descrição'].map((h) => (
            <div key={h} style={{
              padding: '11px 18px',
              fontFamily: "'DM Mono', monospace",
              fontSize: 10,
              letterSpacing: '0.1em',
              textTransform: 'uppercase',
              color: 'var(--muted)',
            }}>
              {h}
            </div>
          ))}
        </div>

        {/* Rows */}
        {errors.map((e, i) => {
          const isLast = i === errors.length - 1
          return (
            <div
              key={e.code}
              style={{
                display: 'grid',
                gridTemplateColumns: 'auto auto 1fr',
                background: 'var(--surface)',
                borderBottom: isLast ? 'none' : '1px solid var(--border)',
                transition: 'background 0.15s',
              }}
              onMouseEnter={(ev) => ev.currentTarget.style.background = 'var(--surface2)'}
              onMouseLeave={(ev) => ev.currentTarget.style.background = 'var(--surface)'}
            >
              <div style={{
                padding: '12px 18px',
                fontFamily: "'DM Mono', monospace",
                fontSize: 13,
                color: 'var(--delete)',
              }}>
                {e.code}
              </div>
              <div style={{
                padding: '12px 18px',
                fontFamily: "'DM Mono', monospace",
                fontSize: 13,
                color: 'var(--text)',
              }}>
                {e.status}
              </div>
              <div style={{
                padding: '12px 18px',
                fontSize: 13,
                color: 'var(--muted)',
              }}>
                {e.desc}
              </div>
            </div>
          )
        })}
      </div>
    </section>
  )
}