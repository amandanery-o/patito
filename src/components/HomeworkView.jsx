import { useState } from 'react'
import ConfirmModal from './ConfirmModal'
import { formatDate } from '../utils/dates'

const EMPTY_FORM = { description: '', pages: '', dueDate: '' }

export default function HomeworkView({ items, loading, saving, error, onCreate, onUpdate, onRemove, onBack }) {
  const [form, setForm] = useState(EMPTY_FORM)
  const [editingId, setEditingId] = useState(null)
  const [showForm, setShowForm] = useState(false)
  const [confirmId, setConfirmId] = useState(null)

  function openCreate() {
    setEditingId(null)
    setForm(EMPTY_FORM)
    setShowForm(true)
  }

  function openEdit(item) {
    setEditingId(item.id)
    setForm({ description: item.description, pages: item.pages || '', dueDate: item.due_date })
    setShowForm(true)
  }

  async function handleSubmit(event) {
    event.preventDefault()
    try {
      if (editingId) await onUpdate(editingId, form)
      else await onCreate(form)
      setShowForm(false)
      setForm(EMPTY_FORM)
      setEditingId(null)
    } catch { /* a mensagem é exibida pelo hook */ }
  }

  return (
    <div className="min-h-screen bg-gray-50 pb-24">
      <header className="bg-white shadow-sm px-4 py-3 flex items-center gap-3 sticky top-0 z-10">
        <button onClick={onBack} className="text-2xl" aria-label="Voltar">‹</button>
        <h1 className="font-bold text-gray-800 text-lg flex-1">Deveres de casa</h1>
        <button onClick={openCreate} className="bg-blue-500 text-white font-extrabold rounded-xl px-4 py-2 active:scale-95">+ Novo</button>
      </header>

      <main className="max-w-lg sm:max-w-xl mx-auto px-4 py-5 space-y-4">
        {error && <p role="alert" className="bg-red-50 border border-red-200 text-red-700 rounded-2xl p-3 text-sm font-bold">{error}</p>}

        {showForm && (
          <form onSubmit={handleSubmit} className="bg-white border border-blue-100 shadow-sm rounded-3xl p-5 space-y-4">
            <h2 className="font-extrabold text-gray-800">{editingId ? 'Editar dever' : 'Novo dever'}</h2>
            <div>
              <label htmlFor="homework-description" className="block text-sm font-bold text-gray-600 mb-1">O que precisa fazer?</label>
              <textarea id="homework-description" required maxLength={500} rows={3} value={form.description}
                onChange={event => setForm(current => ({ ...current, description: event.target.value }))}
                placeholder="Ex.: Exercícios de Matemática"
                className="w-full border border-gray-200 rounded-xl px-4 py-3 resize-none focus:outline-none focus:ring-2 focus:ring-blue-300" />
            </div>
            <div className="grid grid-cols-2 gap-3">
              <div>
                <label htmlFor="homework-pages" className="block text-sm font-bold text-gray-600 mb-1">Páginas</label>
                <input id="homework-pages" maxLength={100} value={form.pages}
                  onChange={event => setForm(current => ({ ...current, pages: event.target.value }))}
                  placeholder="20 a 24" className="w-full border border-gray-200 rounded-xl px-3 py-3" />
              </div>
              <div>
                <label htmlFor="homework-due-date" className="block text-sm font-bold text-gray-600 mb-1">Entregar em</label>
                <input id="homework-due-date" required type="date" value={form.dueDate}
                  onChange={event => setForm(current => ({ ...current, dueDate: event.target.value }))}
                  className="w-full border border-gray-200 rounded-xl px-3 py-3" />
              </div>
            </div>
            <div className="flex gap-3">
              <button type="button" onClick={() => setShowForm(false)} className="flex-1 btn-duo-gray">Cancelar</button>
              <button disabled={saving} className="flex-1 btn-duo-green disabled:opacity-60">{saving ? 'Salvando…' : 'Salvar'}</button>
            </div>
          </form>
        )}

        {loading ? (
          <p className="text-center text-gray-400 font-semibold py-16">Carregando deveres…</p>
        ) : items.length === 0 ? (
          <div className="text-center bg-yellow-50 border border-yellow-100 rounded-3xl py-12 px-6">
            <p className="text-5xl mb-3">📚</p>
            <p className="font-extrabold text-gray-700">Nenhum dever pendente</p>
            <p className="text-sm text-gray-500 mt-1">Quando receber uma tarefa, cadastre aqui.</p>
          </div>
        ) : (
          <div className="space-y-3">
            {items.map(item => (
              <article key={item.id} className={`bg-white border rounded-2xl p-4 flex gap-3 ${item.completed ? 'opacity-60 border-gray-100' : 'border-blue-100 shadow-sm'}`}>
                <button onClick={() => onUpdate(item.id, { completed: !item.completed }).catch(() => {})}
                  className={`w-8 h-8 shrink-0 rounded-full border-2 font-bold ${item.completed ? 'bg-green-500 border-green-500 text-white' : 'border-gray-300 text-transparent'}`}
                  aria-label={item.completed ? 'Marcar como pendente' : 'Marcar como concluído'}>✓</button>
                <div className="flex-1 min-w-0">
                  <p className={`font-bold text-gray-800 ${item.completed ? 'line-through' : ''}`}>{item.description}</p>
                  <p className="text-sm text-gray-500 mt-1">{item.pages && `Páginas ${item.pages} · `}Entrega: {formatDate(item.due_date)}</p>
                </div>
                <div className="flex gap-2">
                  <button onClick={() => openEdit(item)} aria-label="Editar dever">✏️</button>
                  <button onClick={() => setConfirmId(item.id)} aria-label="Excluir dever">🗑️</button>
                </div>
              </article>
            ))}
          </div>
        )}
      </main>

      {confirmId && <ConfirmModal message="Excluir este dever?" onConfirm={async () => {
        try { await onRemove(confirmId); setConfirmId(null) } catch { /* mensagem no hook */ }
      }} onCancel={() => setConfirmId(null)} />}
    </div>
  )
}
