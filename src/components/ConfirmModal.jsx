/**
 * Modal de confirmação simples.
 * Clique no backdrop ou em "Cancelar" para fechar sem ação.
 */
export default function ConfirmModal({ message, confirmLabel = 'Remover', onConfirm, onCancel }) {
  return (
    <div
      className="fixed inset-0 bg-black/50 z-50 flex items-end justify-center p-4"
      onClick={onCancel}
    >
      <div
        className="bg-white rounded-2xl p-5 w-full max-w-sm space-y-4 shadow-xl"
        onClick={e => e.stopPropagation()}
      >
        <p className="font-semibold text-gray-800 text-center text-base">{message}</p>
        <div className="flex gap-3">
          <button onClick={onCancel} className="flex-1 btn-duo-gray">
            Cancelar
          </button>
          <button onClick={onConfirm} className="flex-1 btn-duo-red">
            {confirmLabel}
          </button>
        </div>
      </div>
    </div>
  )
}
