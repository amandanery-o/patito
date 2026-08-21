import { useState } from 'react'

export default function ProblemReportModal({ onSubmit, onClose }) {
  const [description, setDescription] = useState('')
  const [status, setStatus] = useState('idle')

  async function handleSubmit(event) {
    event.preventDefault()
    setStatus('sending')
    try {
      await onSubmit({ kind: 'general', description })
      setStatus('sent')
    } catch {
      setStatus('error')
    }
  }

  return (
    <div className="fixed inset-0 z-50 bg-black/50 flex items-end sm:items-center justify-center p-4" onClick={onClose}>
      <div
        className="bg-white rounded-3xl w-full max-w-md p-5 space-y-4 shadow-2xl"
        onClick={(event) => event.stopPropagation()}
      >
        <div className="flex items-center justify-between">
          <h2 className="font-extrabold text-gray-800 text-lg">Reportar um problema</h2>
          <button onClick={onClose} className="text-gray-400 text-2xl" aria-label="Fechar">
            ✕
          </button>
        </div>
        {status === 'sent' ? (
          <div className="text-center py-6">
            <p className="text-4xl mb-2">✅</p>
            <p className="font-extrabold text-green-700">Recebemos seu relato. Obrigado!</p>
            <button onClick={onClose} className="btn-duo-green w-full mt-5">
              Fechar
            </button>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label htmlFor="problem-description" className="block text-sm font-bold text-gray-600 mb-1">
                O que aconteceu?
              </label>
              <textarea
                id="problem-description"
                required
                maxLength={1000}
                rows={5}
                value={description}
                onChange={(event) => setDescription(event.target.value)}
                placeholder="Conte o que não funcionou. Não escreva seu nome ou e-mail."
                className="w-full border border-gray-200 rounded-xl px-4 py-3 resize-none focus:outline-none focus:ring-2 focus:ring-orange-300"
              />
            </div>
            <p className="text-xs text-gray-500">O relato é anônimo e não envia seus dados ou respostas.</p>
            {status === 'error' && (
              <p role="alert" className="bg-red-50 text-red-700 rounded-xl p-3 text-sm font-bold">
                Não conseguimos enviar. Seu relato ficou guardado neste aparelho para tentar novamente.
              </p>
            )}
            <button disabled={status === 'sending'} className="btn-duo-blue w-full disabled:opacity-60">
              {status === 'sending' ? 'Enviando…' : 'Enviar relato'}
            </button>
          </form>
        )}
      </div>
    </div>
  )
}
