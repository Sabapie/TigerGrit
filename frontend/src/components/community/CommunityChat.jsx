import Button from '../ui/Button'
import Input from '../ui/Input'
import Avatar from '../ui/Avatar'
import MessageBubble from './MessageBubble'

export default function CommunityChat({
  activeConv,
  setActiveConv,
  messages,
  loading,
  text,
  setText,
  sendMessage,
  setShowShare,
  myUserId,
  copyItem,
  bottomRef
}) {
  const convName = activeConv
    ? activeConv.type === 'private'
      ? activeConv.users?.find(u => u.id !== myUserId)?.name
      : activeConv.name
    : null

  return (
    <main className={`flex-1 flex flex-col min-w-0 transition-all duration-300
      ${activeConv ? 'flex w-full' : 'hidden md:flex'}`}>
      {activeConv ? (
        <>
          <div className="h-16 border-b border-zinc-800 bg-zinc-900/80 backdrop-blur flex items-center px-6 gap-4 shrink-0">
            <Button
              variant="custom"
              onClick={() => setActiveConv(null)}
              className="md:hidden mr-2 text-zinc-400 hover:text-white transition duration-200 active:scale-95 text-lg p-1"
            >
              ←
            </Button>
            {activeConv.type === 'private' ? (
              <Avatar name={convName || '?'} size="md" />
            ) : (
              <div className="w-10 h-10 rounded-full bg-zinc-700 flex items-center justify-center text-lg shrink-0">
                {activeConv.type === 'group' ? '👥' : '🌐'}
              </div>
            )}
            <div>
              <p className="text-white font-bold">{convName}</p>
              <p className="text-zinc-500 text-xs">
                {activeConv.type === 'private'
                  ? 'Chat privado'
                  : activeConv.type === 'group'
                  ? 'Grupo'
                  : 'Comunidad'}
              </p>
            </div>
          </div>

          <div className="flex-1 overflow-y-auto px-6 py-4">
            {loading ? (
              <p className="text-zinc-500 text-sm text-center mt-8">Cargando mensajes...</p>
            ) : messages.length === 0 ? (
              <p className="text-zinc-600 text-sm text-center mt-8">No hay mensajes aún. ¡Di algo!</p>
            ) : (
              messages.map(msg => (
                <MessageBubble
                  key={msg.id}
                  msg={msg}
                  isOwn={msg.user_id === myUserId}
                  onCopy={copyItem}
                />
              ))
            )}
            <div ref={bottomRef} />
          </div>

          <div className="border-t border-zinc-800 bg-zinc-900/80 px-4 py-3 flex items-center gap-3 shrink-0">
            <Button
              variant="custom"
              onClick={() => setShowShare(true)}
              className="w-10 h-10 rounded-xl bg-zinc-800 hover:bg-zinc-700 border border-zinc-700 hover:border-tigergrit flex items-center justify-center transition text-zinc-400 hover:text-tigergrit shrink-0 duration-200 active:scale-95"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
              </svg>
            </Button>

            <Input
              variant="custom"
              value={text}
              onChange={e => setText(e.target.value)}
              onKeyDown={e => e.key === 'Enter' && sendMessage()}
              placeholder="Escribe un mensaje..."
              className="flex-1 bg-zinc-800 border border-zinc-700 rounded-xl px-4 py-2.5 text-white text-sm outline-none focus:ring-2 focus:ring-tigergrit focus:border-tigergrit transition placeholder:text-zinc-500"
            />

            <Button
              variant="custom"
              onClick={sendMessage}
              className="w-10 h-10 rounded-xl bg-tigergrit hover:bg-tigergrit/90 flex items-center justify-center transition active:scale-95 shrink-0 duration-200"
            >
              <svg className="w-5 h-5 text-zinc-900" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
              </svg>
            </Button>
          </div>
        </>
      ) : (
        <div className="flex-1 flex flex-col items-center justify-center gap-4 text-center px-6">
          <div className="w-20 h-20 rounded-2xl bg-zinc-800 flex items-center justify-center text-4xl">💬</div>
          <div>
            <h2 className="text-white font-bold text-xl mb-1">Selecciona un chat</h2>
            <p className="text-zinc-500 text-sm">Elige una conversación del panel izquierdo o empieza una nueva</p>
          </div>
        </div>
      )}
    </main>
  )
}
