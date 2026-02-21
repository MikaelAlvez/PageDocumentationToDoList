import { useState } from 'react'
import Button from '../ui/Button'
import Input from '../ui/Input'

export default function CreateTaskModal({ onClose, onCreate }) {
  const [form, setForm] = useState({ title: '', description: '' })
  const [loading, setLoading] = useState(false)

  const handleSubmit = async (e) => {
    e.preventDefault()
    if (!form.title.trim()) return
    setLoading(true)
    try {
      await onCreate(form)
      onClose()
    } finally {
      setLoading(false)
    }
  }

  return (
    <div
      style={{
        position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.7)',
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        zIndex: 1000, padding: 24,
      }}
      onClick={(e) => e.target === e.currentTarget && onClose()}
    >
      <div style={{
        background: 'var(--surface)',
        border: '1px solid var(--border)',
        borderRadius: 16,
        padding: 32,
        width: '100%',
        maxWidth: 440,
        animation: 'fadeUp 0.2s ease',
      }}>
        <h2 style={{
          fontFamily: "'Syne', sans-serif",
          fontSize: 20,
          fontWeight: 700,
          color: 'var(--text)',
          marginBottom: 24,
        }}>
          Nova Tarefa
        </h2>

        <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
          <Input
            label="Título *"
            placeholder="Ex: Estudar React"
            value={form.title}
            onChange={(e) => setForm({ ...form, title: e.target.value })}
            required
          />
          <Input
            label="Descrição"
            placeholder="Opcional"
            value={form.description}
            onChange={(e) => setForm({ ...form, description: e.target.value })}
          />
          <div style={{ display: 'flex', gap: 10, marginTop: 8 }}>
            <Button type="submit" loading={loading} style={{ flex: 1 }}>Criar</Button>
            <Button type="button" variant="ghost" onClick={onClose} style={{ flex: 1 }}>Cancelar</Button>
          </div>
        </form>
      </div>
      <style>{`@keyframes fadeUp { from { opacity: 0; transform: translateY(12px); } to { opacity: 1; transform: translateY(0); } }`}</style>
    </div>
  )
}