import Avatar from '../ui/Avatar'

export default function ConvItem({ conv, active, onClick, myUserId }) {
  const lastMsg = conv.messages?.[0]
  const otherUser = conv.type === 'private' ? conv.users?.find(u => u.id !== myUserId) : null
  const displayName = conv.type === 'private' ? otherUser?.name : conv.name
  const icon = conv.type === 'group' ? '👥' : conv.type === 'community' ? '🌐' : null

  return (
    <div
      onClick={onClick}
      className={`flex items-center gap-3 px-4 py-3 rounded-xl cursor-pointer transition-all
        ${active ? 'bg-tigergrit text-zinc-900' : 'hover:bg-zinc-800 text-white'}`}
    >
      {conv.type === 'private'
        ? <Avatar name={displayName || '?'} size="md" />
        : (
          <div className={`w-10 h-10 rounded-full flex items-center justify-center text-lg shrink-0
            ${active ? 'bg-zinc-900/20' : 'bg-zinc-700'}`}>
            {icon}
          </div>
        )
      }
      <div className="flex-1 min-w-0">
        <p className={`font-semibold text-sm truncate ${active ? 'text-zinc-900' : 'text-white'}`}>
          {displayName || 'Sin nombre'}
        </p>
        {lastMsg && (
          <p className={`text-xs truncate ${active ? 'text-zinc-900/70' : 'text-zinc-500'}`}>
            {lastMsg.content || (lastMsg.type === 'exercise' ? '💪 Ejercicio' : '📋 Rutina')}
          </p>
        )}
      </div>
    </div>
  )
}
