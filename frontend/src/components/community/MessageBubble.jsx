import Button from '../ui/Button'

const fmt = (iso) => iso ? new Date(iso).toLocaleTimeString('es-ES', { hour: '2-digit', minute: '2-digit' }) : ''

export default function MessageBubble({ msg, isOwn, onCopy }) {
  const isSpecial = msg.type === 'exercise' || msg.type === 'routine'

  if (isSpecial) return (
    <div className={`flex ${isOwn ? 'justify-end' : 'justify-start'} mb-3`}>
      <div className={`max-w-xs rounded-2xl border p-3 flex flex-col gap-1
        ${isOwn ? 'bg-tigergrit/10 border-tigergrit/30' : 'bg-zinc-800 border-zinc-700'}`}>
        <p className="text-xs text-zinc-400 font-medium uppercase tracking-wider">
          {msg.type === 'exercise' ? '💪 Ejercicio compartido' : '📋 Rutina compartida'}
        </p>
        <p className="text-white font-semibold text-sm">
          {msg.exercise?.name || msg.routine?.name || 'Sin nombre'}
        </p>
        {!isOwn && (
          <Button
            variant="custom"
            onClick={() => onCopy(msg.type, msg.exercise || msg.routine)}
            className="mt-1 text-xs bg-tigergrit/20 hover:bg-tigergrit text-tigergrit hover:text-zinc-900 px-2 py-1 rounded-lg transition font-medium self-start duration-200 active:scale-95"
          >
            + Guardar copia
          </Button>
        )}
        <p className="text-xs text-zinc-500 self-end mt-1">{fmt(msg.created_at)}</p>
      </div>
    </div>
  )

  return (
    <div className={`flex flex-col ${isOwn ? 'items-end' : 'items-start'} mb-3`}>
      {!isOwn && (
        <p className="text-xs text-zinc-500 mb-1 ml-1">{msg.user?.name}</p>
      )}
      <div className={`max-w-sm px-4 py-2.5 rounded-2xl text-sm leading-relaxed
        ${isOwn
          ? 'bg-tigergrit text-zinc-900 rounded-br-sm'
          : 'bg-zinc-800 text-white rounded-bl-sm'
        }`}>
        {msg.content}
      </div>
      <p className="text-xs text-zinc-600 mt-1 mx-1">{fmt(msg.created_at)}</p>
    </div>
  )
}
