const endpoints = [
  { method: 'POST',   route: '/api/auth/register',  params: null,  auth: false, desc: 'Cadastrar novo usuário',    anchor: 'auth-register'  },
  { method: 'POST',   route: '/api/auth/login',      params: null,  auth: false, desc: 'Login e obter token JWT',   anchor: 'auth-login'     },
  { method: 'GET',    route: '/api/users/profile',   params: null,  auth: true,  desc: 'Ver perfil do usuário',     anchor: 'users-profile'  },
  { method: 'PATCH',  route: '/api/users/profile',   params: null,  auth: true,  desc: 'Atualizar perfil',          anchor: 'users-update'   },
  { method: 'DELETE', route: '/api/users/profile',   params: null,  auth: true,  desc: 'Deletar conta',             anchor: 'users-delete'   },
  { method: 'GET',    route: '/api/tasks',            params: null,  auth: true,  desc: 'Listar tarefas do usuário', anchor: 'tasks-list'     },
  { method: 'POST',   route: '/api/tasks',            params: null,  auth: true,  desc: 'Criar nova tarefa',         anchor: 'tasks-create'   },
  { method: 'GET',    route: '/api/tasks/',           params: ':id', auth: true,  desc: 'Buscar tarefa por ID',      anchor: 'tasks-get'      },
  { method: 'PUT',    route: '/api/tasks/',           params: ':id', auth: true,  desc: 'Atualizar tarefa',          anchor: 'tasks-update'   },
  { method: 'DELETE', route: '/api/tasks/',           params: ':id', auth: true,  desc: 'Deletar tarefa',            anchor: 'tasks-delete'   },
]

const methodStyles = {
  GET:    { color: 'var(--get)',    bg: 'var(--get-bg)',    border: 'rgba(34,197,94,0.2)'  },
  POST:   { color: 'var(--post)',   bg: 'var(--post-bg)',   border: 'rgba(59,130,246,0.2)' },
  PUT:    { color: 'var(--put)',    bg: 'var(--put-bg)',    border: 'rgba(245,158,11,0.2)' },
  PATCH:  { color: 'var(--put)',    bg: 'var(--put-bg)',    border: 'rgba(245,158,11,0.2)' },
  DELETE: { color: 'var(--delete)', bg: 'var(--delete-bg)', border: 'rgba(239,68,68,0.2)'  },
}

export default function EndpointsTable() {
  const scrollTo = (id) => {
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth', block: 'start' })
  }

  return (
    <section id="endpoints-overview" style={{ marginBottom: 64 }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: 14, marginBottom: 28 }}>
        <h2 style={{
          fontFamily: "'Syne', sans-serif",
          fontSize: 22,
          fontWeight: 700,
          color: 'var(--text)',
        }}>
          Todos os Endpoints
        </h2>
      </div>

      <table style={{
        width: '100%',
        borderCollapse: 'collapse',
        borderRadius: 12,
        overflow: 'hidden',
      }}>
        <thead>
          <tr style={{ background: 'var(--surface2)' }}>
            {['Método', 'Rota', 'Auth', 'Descrição'].map((h) => (
              <th key={h} style={{
                fontFamily: "'DM Mono', monospace",
                fontSize: 10,
                fontWeight: 500,
                letterSpacing: '0.1em',
                textTransform: 'uppercase',
                color: 'var(--muted)',
                padding: '14px 18px',
                textAlign: 'left',
                borderBottom: '1px solid var(--border)',
              }}>
                {h}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {endpoints.map((ep, i) => {
            const ms = methodStyles[ep.method]
            return (
                <tr
                    key={i}
                    onClick={() => scrollTo(ep.anchor)}
                    style={{
                        className: "endpoint-row",
                        background: 'var(--surface2)',
                        borderBottom: i < endpoints.length - 1 ? '1px solid var(--border)' : 'none',
                        cursor: 'pointer',
                        transition: 'background 0.2s ease',
                    }}
                    onMouseEnter={(e) => e.currentTarget.style.background = 'transparent'}
                    onMouseLeave={(e) => e.currentTarget.style.background = 'var(--surface2)'}
                >
                <td style={{ padding: '13px 18px' }}>
                  <span style={{
                    display: 'inline-block',
                    fontFamily: "'DM Mono', monospace",
                    fontSize: 11,
                    fontWeight: 500,
                    padding: '3px 9px',
                    borderRadius: 5,
                    letterSpacing: '0.05em',
                    color: ms.color,
                    background: ms.bg,
                    border: `1px solid ${ms.border}`,
                  }}>
                    {ep.method}
                  </span>
                </td>
                <td style={{ padding: '13px 18px' }}>
                  <span style={{ fontFamily: "'DM Mono', monospace", fontSize: 13, color: 'var(--text)' }}>
                    {ep.route}
                    {ep.params && <span style={{ color: 'var(--put)' }}>{ep.params}</span>}
                  </span>
                </td>
                <td style={{ padding: '13px 18px' }}>
                  <span style={{
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: 5,
                    fontSize: 12,
                    color: ep.auth ? 'var(--accent3)' : 'var(--muted)',
                  }}>
                    <span style={{ width: 5, height: 5, borderRadius: '50%', background: 'currentColor' }} />
                    {ep.auth ? 'Sim' : 'Não'}
                  </span>
                </td>
                <td style={{ padding: '13px 18px', color: 'var(--muted)', fontSize: 13 }}>
                  {ep.desc}
                </td>
              </tr>
            )
          })}
        </tbody>
      </table>
    </section>
  )
}