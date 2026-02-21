import EndpointCard, { StatusChip, BodyLabel } from './EndpointCard'
import CodeBlock from './Codeblock'

const tokenExample = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...'

function SectionHeader({ title, tag }) {
  return (
    <div style={{ display: 'flex', alignItems: 'center', gap: 14, marginBottom: 28 }}>
      <h2 style={{
        fontFamily: "'Syne', sans-serif",
        fontSize: 22,
        fontWeight: 700,
        color: 'var(--text)',
      }}>
        {title}
      </h2>
      {tag && (
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
          {tag}
        </span>
      )}
    </div>
  )
}

export default function TasksSection() {
  return (
    <>
      {/* AUTH */}
      <section id="auth-register" style={{ marginBottom: 64 }}>
        <SectionHeader title="Auth" tag="Público" />

        <EndpointCard method="POST" route="/api/auth/register" description="Cadastrar usuário" defaultOpen>
          <div>
            <BodyLabel>Request Body</BodyLabel>
            <CodeBlock label="JSON">
              <span style={{ color: 'var(--muted)' }}>{'{'}</span>{'\n'}
              {'  '}<span style={{ color: '#82aaff' }}>"name"</span><span style={{ color: 'var(--muted)' }}>:     </span><span style={{ color: 'var(--accent3)' }}>"João Silva"</span><span style={{ color: 'var(--muted)' }}>,</span>{'\n'}
              {'  '}<span style={{ color: '#82aaff' }}>"email"</span><span style={{ color: 'var(--muted)' }}>:    </span><span style={{ color: 'var(--accent3)' }}>"joao@email.com"</span><span style={{ color: 'var(--muted)' }}>,</span>{'\n'}
              {'  '}<span style={{ color: '#82aaff' }}>"password"</span><span style={{ color: 'var(--muted)' }}>: </span><span style={{ color: 'var(--accent3)' }}>"senha123"</span>{'  '}<span style={{ color: 'var(--muted)', fontStyle: 'italic' }}>// mínimo 6 caracteres</span>{'\n'}
              <span style={{ color: 'var(--muted)' }}>{'}'}</span>
            </CodeBlock>
          </div>
          <div>
            <BodyLabel>Response</BodyLabel>
            <div style={{ display: 'flex', gap: 8, marginBottom: 12 }}>
              <StatusChip code="201 Created" type="2xx" />
              <StatusChip code="409 Conflict" type="4xx" />
            </div>
            <CodeBlock label="JSON">
              <span style={{ color: 'var(--muted)' }}>{'{'}</span>{'\n'}
              {'  '}<span style={{ color: '#82aaff' }}>"access_token"</span><span style={{ color: 'var(--muted)' }}>: </span><span style={{ color: 'var(--accent3)' }}>"{tokenExample}"</span>{'\n'}
              <span style={{ color: 'var(--muted)' }}>{'}'}</span>
            </CodeBlock>
          </div>
        </EndpointCard>

        <EndpointCard id="auth-login" method="POST" route="/api/auth/login" description="Login">
          <div>
            <BodyLabel>Request Body</BodyLabel>
            <CodeBlock label="JSON">
              <span style={{ color: 'var(--muted)' }}>{'{'}</span>{'\n'}
              {'  '}<span style={{ color: '#82aaff' }}>"email"</span><span style={{ color: 'var(--muted)' }}>:    </span><span style={{ color: 'var(--accent3)' }}>"joao@email.com"</span><span style={{ color: 'var(--muted)' }}>,</span>{'\n'}
              {'  '}<span style={{ color: '#82aaff' }}>"password"</span><span style={{ color: 'var(--muted)' }}>: </span><span style={{ color: 'var(--accent3)' }}>"senha123"</span>{'\n'}
              <span style={{ color: 'var(--muted)' }}>{'}'}</span>
            </CodeBlock>
          </div>
          <div>
            <BodyLabel>Response</BodyLabel>
            <div style={{ display: 'flex', gap: 8, marginBottom: 12 }}>
              <StatusChip code="200 OK" type="2xx" />
              <StatusChip code="401 Unauthorized" type="4xx" />
            </div>
            <CodeBlock label="JSON">
              <span style={{ color: 'var(--muted)' }}>{'{'}</span>{'\n'}
              {'  '}<span style={{ color: '#82aaff' }}>"access_token"</span><span style={{ color: 'var(--muted)' }}>: </span><span style={{ color: 'var(--accent3)' }}>"{tokenExample}"</span>{'\n'}
              <span style={{ color: 'var(--muted)' }}>{'}'}</span>
            </CodeBlock>
          </div>
        </EndpointCard>
      </section>

      {/* USERS */}
      <section id="users-profile" style={{ marginBottom: 64 }}>
        <SectionHeader title="Users" tag="JWT Required" />

        <EndpointCard method="GET" route="/api/users/profile" description="Ver perfil">
          <div>
            <BodyLabel>Response</BodyLabel>
            <div style={{ display: 'flex', gap: 8, marginBottom: 12 }}>
              <StatusChip code="200 OK" type="2xx" />
            </div>
            <CodeBlock label="JSON">
              <span style={{ color: 'var(--muted)' }}>{'{'}</span>{'\n'}
              {'  '}<span style={{ color: '#82aaff' }}>"id"</span><span style={{ color: 'var(--muted)' }}>:        </span><span style={{ color: 'var(--accent3)' }}>"550e8400-e29b-41d4-a716-446655440000"</span><span style={{ color: 'var(--muted)' }}>,</span>{'\n'}
              {'  '}<span style={{ color: '#82aaff' }}>"name"</span><span style={{ color: 'var(--muted)' }}>:      </span><span style={{ color: 'var(--accent3)' }}>"João Silva"</span><span style={{ color: 'var(--muted)' }}>,</span>{'\n'}
              {'  '}<span style={{ color: '#82aaff' }}>"email"</span><span style={{ color: 'var(--muted)' }}>:     </span><span style={{ color: 'var(--accent3)' }}>"joao@email.com"</span><span style={{ color: 'var(--muted)' }}>,</span>{'\n'}
              {'  '}<span style={{ color: '#82aaff' }}>"createdAt"</span><span style={{ color: 'var(--muted)' }}>: </span><span style={{ color: 'var(--accent3)' }}>"2026-02-19T22:00:00.000Z"</span>{'\n'}
              <span style={{ color: 'var(--muted)' }}>{'}'}</span>
            </CodeBlock>
          </div>
        </EndpointCard>

        <EndpointCard id="users-update" method="PATCH" route="/api/users/profile" description="Atualizar perfil">
          <div>
            <BodyLabel>Request Body — todos os campos são opcionais</BodyLabel>
            <CodeBlock label="JSON">
              <span style={{ color: 'var(--muted)' }}>{'{'}</span>{'\n'}
              {'  '}<span style={{ color: '#82aaff' }}>"name"</span><span style={{ color: 'var(--muted)' }}>:     </span><span style={{ color: 'var(--accent3)' }}>"Novo Nome"</span><span style={{ color: 'var(--muted)' }}>,</span>{'\n'}
              {'  '}<span style={{ color: '#82aaff' }}>"email"</span><span style={{ color: 'var(--muted)' }}>:    </span><span style={{ color: 'var(--accent3)' }}>"novo@email.com"</span><span style={{ color: 'var(--muted)' }}>,</span>{'\n'}
              {'  '}<span style={{ color: '#82aaff' }}>"password"</span><span style={{ color: 'var(--muted)' }}>: </span><span style={{ color: 'var(--accent3)' }}>"novasenha123"</span>{'\n'}
              <span style={{ color: 'var(--muted)' }}>{'}'}</span>
            </CodeBlock>
          </div>
          <div>
            <BodyLabel>Response</BodyLabel>
            <div style={{ display: 'flex', gap: 8 }}>
              <StatusChip code="200 OK" type="2xx" />
              <StatusChip code="404 Not Found" type="4xx" />
            </div>
          </div>
        </EndpointCard>

        <EndpointCard id="users-delete" method="DELETE" route="/api/users/profile" description="Deletar conta">
          <div>
            <BodyLabel>Response</BodyLabel>
            <div style={{ display: 'flex', gap: 8, marginBottom: 12 }}>
              <StatusChip code="200 OK" type="2xx" />
              <StatusChip code="404 Not Found" type="4xx" />
            </div>
            <CodeBlock label="JSON">
              <span style={{ color: 'var(--muted)' }}>{'{'}</span>{'\n'}
              {'  '}<span style={{ color: '#82aaff' }}>"message"</span><span style={{ color: 'var(--muted)' }}>: </span><span style={{ color: 'var(--accent3)' }}>"Conta deletada com sucesso"</span>{'\n'}
              <span style={{ color: 'var(--muted)' }}>{'}'}</span>
            </CodeBlock>
          </div>
        </EndpointCard>
      </section>

      {/* TASKS */}
      <section id="tasks-list" style={{ marginBottom: 64 }}>
        <SectionHeader title="Tasks" tag="JWT Required" />

        <EndpointCard method="GET" route="/api/tasks" description="Listar tarefas">
          <div>
            <BodyLabel>Response</BodyLabel>
            <div style={{ display: 'flex', gap: 8, marginBottom: 12 }}>
              <StatusChip code="200 OK" type="2xx" />
            </div>
            <CodeBlock label="JSON — Array">
              <span style={{ color: 'var(--muted)' }}>{'['}</span>{'\n'}
              {'  '}<span style={{ color: 'var(--muted)' }}>{'{'}</span>{'\n'}
              {'    '}<span style={{ color: '#82aaff' }}>"id"</span><span style={{ color: 'var(--muted)' }}>:          </span><span style={{ color: 'var(--accent3)' }}>"550e8400-e29b-41d4-a716-446655440000"</span><span style={{ color: 'var(--muted)' }}>,</span>{'\n'}
              {'    '}<span style={{ color: '#82aaff' }}>"title"</span><span style={{ color: 'var(--muted)' }}>:       </span><span style={{ color: 'var(--accent3)' }}>"Estudar NestJS"</span><span style={{ color: 'var(--muted)' }}>,</span>{'\n'}
              {'    '}<span style={{ color: '#82aaff' }}>"description"</span><span style={{ color: 'var(--muted)' }}>: </span><span style={{ color: 'var(--accent3)' }}>"Ver documentação oficial"</span><span style={{ color: 'var(--muted)' }}>,</span>{'\n'}
              {'    '}<span style={{ color: '#82aaff' }}>"status"</span><span style={{ color: 'var(--muted)' }}>:      </span><span style={{ color: 'var(--accent3)' }}>"pending"</span><span style={{ color: 'var(--muted)' }}>,</span>{'\n'}
              {'    '}<span style={{ color: '#82aaff' }}>"createdAt"</span><span style={{ color: 'var(--muted)' }}>:   </span><span style={{ color: 'var(--accent3)' }}>"2026-02-19T22:00:00.000Z"</span><span style={{ color: 'var(--muted)' }}>,</span>{'\n'}
              {'    '}<span style={{ color: '#82aaff' }}>"updatedAt"</span><span style={{ color: 'var(--muted)' }}>:   </span><span style={{ color: 'var(--accent3)' }}>"2026-02-19T22:00:00.000Z"</span>{'\n'}
              {'  '}<span style={{ color: 'var(--muted)' }}>{'}'}</span>{'\n'}
              <span style={{ color: 'var(--muted)' }}>]</span>
            </CodeBlock>
          </div>
        </EndpointCard>

        <EndpointCard id="tasks-create" method="POST" route="/api/tasks" description="Criar tarefa">
          <div>
            <BodyLabel>Request Body</BodyLabel>
            <CodeBlock label="JSON">
              <span style={{ color: 'var(--muted)' }}>{'{'}</span>{'\n'}
              {'  '}<span style={{ color: '#82aaff' }}>"title"</span><span style={{ color: 'var(--muted)' }}>:       </span><span style={{ color: 'var(--accent3)' }}>"Estudar NestJS"</span><span style={{ color: 'var(--muted)' }}>,</span>{'\n'}
              {'  '}<span style={{ color: '#82aaff' }}>"description"</span><span style={{ color: 'var(--muted)' }}>: </span><span style={{ color: 'var(--accent3)' }}>"Ver documentação oficial"</span>{'  '}<span style={{ color: 'var(--muted)', fontStyle: 'italic' }}>// opcional</span>{'\n'}
              <span style={{ color: 'var(--muted)' }}>{'}'}</span>
            </CodeBlock>
          </div>
          <div>
            <BodyLabel>Response</BodyLabel>
            <div style={{ display: 'flex', gap: 8 }}>
              <StatusChip code="201 Created" type="2xx" />
              <StatusChip code="400 Bad Request" type="4xx" />
            </div>
          </div>
        </EndpointCard>

        <EndpointCard
          id="tasks-get"
          method="GET"
          route={<>/api/tasks/<span style={{ color: 'var(--put)' }}>:id</span></>}
          description="Buscar por ID"
        >
          <div>
            <BodyLabel>Path Param</BodyLabel>
            <CodeBlock label="URL">
              GET /api/tasks/<span style={{ color: 'var(--put)' }}>550e8400-e29b-41d4-a716-446655440000</span>
            </CodeBlock>
          </div>
          <div>
            <BodyLabel>Response</BodyLabel>
            <div style={{ display: 'flex', gap: 8 }}>
              <StatusChip code="200 OK" type="2xx" />
              <StatusChip code="404 Not Found" type="4xx" />
            </div>
          </div>
        </EndpointCard>

        <EndpointCard
          id="tasks-update"
          method="PUT"
          route={<>/api/tasks/<span style={{ color: 'var(--put)' }}>:id</span></>}
          description="Atualizar tarefa"
        >
          <div>
            <BodyLabel>Request Body — todos os campos são opcionais</BodyLabel>
            <CodeBlock label="JSON">
              <span style={{ color: 'var(--muted)' }}>{'{'}</span>{'\n'}
              {'  '}<span style={{ color: '#82aaff' }}>"title"</span><span style={{ color: 'var(--muted)' }}>:       </span><span style={{ color: 'var(--accent3)' }}>"Novo título"</span><span style={{ color: 'var(--muted)' }}>,</span>{'\n'}
              {'  '}<span style={{ color: '#82aaff' }}>"description"</span><span style={{ color: 'var(--muted)' }}>: </span><span style={{ color: 'var(--accent3)' }}>"Nova descrição"</span><span style={{ color: 'var(--muted)' }}>,</span>{'\n'}
              {'  '}<span style={{ color: '#82aaff' }}>"status"</span><span style={{ color: 'var(--muted)' }}>:      </span><span style={{ color: 'var(--accent3)' }}>"in_progress"</span>{'  '}<span style={{ color: 'var(--muted)', fontStyle: 'italic' }}>// pending | in_progress | done</span>{'\n'}
              <span style={{ color: 'var(--muted)' }}>{'}'}</span>
            </CodeBlock>
          </div>
          <div>
            <BodyLabel>Status disponíveis</BodyLabel>
            <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>
              {[
                { label: 'pending',     color: 'var(--muted)', border: 'var(--border)',             bg: 'var(--surface2)' },
                { label: 'in_progress', color: 'var(--put)',   border: 'rgba(245,158,11,0.25)',     bg: 'var(--put-bg)'   },
                { label: 'done',        color: 'var(--get)',   border: 'rgba(34,197,94,0.25)',      bg: 'var(--get-bg)'   },
              ].map((s) => (
                <span key={s.label} style={{
                  fontFamily: "'DM Mono', monospace",
                  fontSize: 12,
                  padding: '4px 10px',
                  borderRadius: 6,
                  border: `1px solid ${s.border}`,
                  color: s.color,
                  background: s.bg,
                }}>
                  {s.label}
                </span>
              ))}
            </div>
          </div>
          <div style={{ display: 'flex', gap: 8 }}>
            <StatusChip code="200 OK" type="2xx" />
            <StatusChip code="404 Not Found" type="4xx" />
          </div>
        </EndpointCard>

        <EndpointCard
          id="tasks-delete"
          method="DELETE"
          route={<>/api/tasks/<span style={{ color: 'var(--put)' }}>:id</span></>}
          description="Deletar tarefa"
        >
          <div>
            <BodyLabel>Response</BodyLabel>
            <div style={{ display: 'flex', gap: 8, marginBottom: 12 }}>
              <StatusChip code="200 OK" type="2xx" />
              <StatusChip code="404 Not Found" type="4xx" />
            </div>
            <p style={{ color: 'var(--muted)', fontSize: 13 }}>
              Retorna status 200 sem corpo de resposta.
            </p>
          </div>
        </EndpointCard>
      </section>
    </>
  )
}