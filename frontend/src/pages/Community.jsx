import { useEffect, useState, useRef } from 'react'
import axios from 'axios'

const API = import.meta.env.VITE_API_URL
const token = () => localStorage.getItem('token')
const headers = () => ({ Authorization: `Bearer ${token()}` })
const myId = () => {
  try { return JSON.parse(localStorage.getItem('user'))?.id } catch { return null }
}

const fmt = (iso) => iso ? new Date(iso).toLocaleTimeString('es-ES', { hour: '2-digit', minute: '2-digit' }) : ''

function Avatar({ name = '?', size = 'md' }) {
  const s = { sm: 'w-8 h-8 text-xs', md: 'w-10 h-10 text-sm', lg: 'w-12 h-12 text-base' }
  return (
    <div className={`${s[size]} rounded-full bg-tigergrit flex items-center justify-center font-black text-zinc-900 shrink-0`}>
      {name[0]?.toUpperCase()}
    </div>
  )
}

function ConvItem({ conv, active, onClick, myUserId }) {
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

function MessageBubble({ msg, isOwn, onCopy }) {
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
          <button
            onClick={() => onCopy(msg.type, msg.exercise || msg.routine)}
            className="mt-1 text-xs bg-tigergrit/20 hover:bg-tigergrit text-tigergrit hover:text-zinc-900 px-2 py-1 rounded-lg transition font-medium self-start"
          >
            + Guardar copia
          </button>
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

function ShareModal({ onClose, onSend }) {
  const [tab, setTab] = useState('exercise')
  const [exercises, setExercises] = useState([])
  const [routines, setRoutines] = useState([])
  const [selected, setSelected] = useState(null)

  useEffect(() => {
    axios.get(`${API}/exercises`, { headers: headers() }).then(r => setExercises(r.data))
    axios.get(`${API}/routines`, { headers: headers() }).then(r => setRoutines(r.data))
  }, [])

  const items = tab === 'exercise' ? exercises : routines

  return (
    <div className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-center justify-center" onClick={onClose}>
      <div className="bg-zinc-900 border border-zinc-700 rounded-2xl w-full max-w-sm mx-4 p-6 flex flex-col gap-4" onClick={e => e.stopPropagation()}>
        <div className="flex items-center justify-between">
          <h3 className="text-white font-bold">Compartir</h3>
          <button onClick={onClose} className="text-zinc-500 hover:text-white transition">✕</button>
        </div>

        <div className="flex gap-2 bg-zinc-800 rounded-lg p-1">
          {['exercise', 'routine'].map(t => (
            <button key={t} onClick={() => { setTab(t); setSelected(null) }}
              className={`flex-1 py-1.5 rounded-md text-xs font-medium transition
                ${tab === t ? 'bg-tigergrit text-zinc-900' : 'text-zinc-400 hover:text-white'}`}>
              {t === 'exercise' ? '💪 Ejercicio' : '📋 Rutina'}
            </button>
          ))}
        </div>

        <div className="flex flex-col gap-1 max-h-60 overflow-y-auto">
          {items.map(item => (
            <div key={item.id} onClick={() => setSelected(item)}
              className={`px-3 py-2 rounded-lg cursor-pointer transition text-sm
                ${selected?.id === item.id ? 'bg-tigergrit text-zinc-900 font-semibold' : 'hover:bg-zinc-800 text-zinc-300'}`}>
              {item.name}
            </div>
          ))}
        </div>

        <button
          onClick={() => selected && onSend(tab, selected)}
          disabled={!selected}
          className="bg-tigergrit hover:bg-tigergrit/90 text-zinc-900 font-bold py-2.5 rounded-xl transition disabled:opacity-40">
          Enviar
        </button>
      </div>
    </div>
  )
}

export default function Community() {
  const myUserId = myId()

  const [tab, setTab] = useState('users')
  const [conversations, setConversations] = useState([])
  const [users, setUsers] = useState([])
  const [activeConv, setActiveConv] = useState(null)
  const [messages, setMessages] = useState([])
  const [text, setText] = useState('')
  const [search, setSearch] = useState('')
  const [showShare, setShowShare] = useState(false)
  const [loading, setLoading] = useState(false)
  const bottomRef = useRef(null)

  useEffect(() => {
    axios.get(`${API}/conversations`, { headers: headers() }).then(r => setConversations(r.data))
    axios.get(`${API}/users`, { headers: headers() }).then(r => setUsers(r.data))
  }, [])

  useEffect(() => {
    if (!activeConv) return
    setLoading(true)
    axios.get(`${API}/messages/${activeConv.id}`, { headers: headers() })
      .then(r => { setMessages(r.data); setLoading(false) })
  }, [activeConv])

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [messages])

  const openPrivateChat = async (userId) => {
    const res = await axios.post(`${API}/conversations/private`, { user_id: userId }, { headers: headers() })
    const conv = res.data
    setConversations(prev => prev.find(c => c.id === conv.id) ? prev : [conv, ...prev])
    const full = await axios.get(`${API}/conversations/${conv.id}`, { headers: headers() })
    setActiveConv(full.data)
    setTab('users')
  }

  const sendMessage = async () => {
    if (!text.trim() || !activeConv) return
    const res = await axios.post(`${API}/messages`, {
      conversation_id: activeConv.id,
      content: text,
      type: 'text'
    }, { headers: headers() })
    setMessages(prev => [...prev, res.data])
    setText('')
  }

  const sendShared = async (type, item) => {
    if (!activeConv) return
    const payload = {
      conversation_id: activeConv.id,
      type,
      content: null,
      [`${type}_id`]: item.id
    }
    const res = await axios.post(`${API}/messages`, payload, { headers: headers() })
    setMessages(prev => [...prev, { ...res.data, [type]: item }])
    setShowShare(false)
  }

  const copyItem = async (type, item) => {
    try {
      const copyExercise = (exercise, parentId) => axios.post(`${API}/exercises`, {
        name: exercise.name,
        description: exercise.description || null,
        observations: exercise.observations || null,
        image: exercise.image || null,
        duration: exercise.duration || 60,
        rest: exercise.rest || 0,
        repetitions: exercise.repetitions || 1,
        sets: exercise.sets || 1,
        weight: exercise.weight || 0,
        weight_unit: exercise.weight_unit || 'kg',
        muscle_group: exercise.muscle_group || '',
        muscle_area: exercise.muscle_area || '',
        parent_exercise_id: parentId || null,
      }, { headers: headers() })

      if (type === 'exercise') {
        await copyExercise(item, item.id)
        alert('Ejercicio guardado en tu biblioteca')

      } else {
        // Cargar la rutina completa con sus ejercicios
        const fullRoutine = await axios.get(
          `${API}/routines/${item.id}`,
          { headers: headers() }
        )
        const routineWithExercises = fullRoutine.data

        const newExerciseIds = await Promise.all(
          (routineWithExercises.exercises || []).map(async (exercise) => {
            const res = await copyExercise(exercise, exercise.id)
            return res.data.id
          })
        )

        const routineRes = await axios.post(`${API}/routines`, {
          name: item.name,
          description: item.description || null,
        }, { headers: headers() })

        if (newExerciseIds.length > 0) {
          await axios.post(
            `${API}/routines/${routineRes.data.id}/sync-exercises`,
            { exercises: newExerciseIds },
            { headers: headers() }
          )
        }

        alert('Rutina guardada con todos sus ejercicios')
      }

    } catch (error) {
      console.error('Error:', error.response?.data)
      alert('Error al guardar')
    }
  }

  const filteredUsers = users.filter(u => u.name.toLowerCase().includes(search.toLowerCase()))
  const filteredConvs = (type) => conversations
    .filter(c => c.type === type)
    .filter(c => {
      const other = c.users?.find(u => u.id !== myUserId)
      const name = c.type === 'private' ? other?.name : c.name
      return name?.toLowerCase().includes(search.toLowerCase())
    })

  const tabItems = {
    users: filteredUsers,
    groups: filteredConvs('group'),
    communities: filteredConvs('community'),
  }

  const convName = activeConv
    ? activeConv.type === 'private'
      ? activeConv.users?.find(u => u.id !== myUserId)?.name
      : activeConv.name
    : null

  return (
    <div className="flex h-[calc(100vh-5rem)] bg-zinc-950 text-white overflow-hidden">

      <aside className="w-72 shrink-0 bg-zinc-900 border-r border-zinc-800 flex flex-col">

        <div className="flex border-b border-zinc-800">
          {[
            { key: 'users', label: 'Usuarios', icon: '👤' },
            { key: 'groups', label: 'Grupos', icon: '👥' },
            { key: 'communities', label: 'Comunidades', icon: '🌐' },
          ].map(t => (
            <button key={t.key} onClick={() => setTab(t.key)}
              className={`flex-1 py-3 text-xs font-semibold transition flex flex-col items-center gap-0.5
                ${tab === t.key ? 'text-tigergrit border-b-2 border-tigergrit' : 'text-zinc-500 hover:text-zinc-300'}`}>
              <span>{t.icon}</span>
              <span className="hidden sm:block">{t.label}</span>
            </button>
          ))}
        </div>

        <div className="px-3 py-3 border-b border-zinc-800">
          <div className="flex items-center gap-2 bg-zinc-800 rounded-lg px-3 py-2">
            <svg className="w-4 h-4 text-zinc-500 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
            <input
              value={search}
              onChange={e => setSearch(e.target.value)}
              placeholder="Buscar..."
              className="bg-transparent text-white text-sm outline-none flex-1 placeholder:text-zinc-500"
            />
          </div>
        </div>

        <div className="flex-1 overflow-y-auto px-2 py-2 flex flex-col gap-1">

          {tab === 'users' && (
            <>
              {filteredConvs('private').length > 0 && (
                <>
                  <p className="text-zinc-600 text-xs uppercase tracking-widest px-2 py-1">Chats</p>
                  {filteredConvs('private').map(conv => (
                    <ConvItem key={conv.id} conv={conv} active={activeConv?.id === conv.id}
                      onClick={() => setActiveConv(conv)} myUserId={myUserId} />
                  ))}
                  <p className="text-zinc-600 text-xs uppercase tracking-widest px-2 py-1 mt-2">Usuarios</p>
                </>
              )}
              {filteredUsers.map(user => (
                <div key={user.id} onClick={() => openPrivateChat(user.id)}
                  className="flex items-center gap-3 px-4 py-3 rounded-xl cursor-pointer hover:bg-zinc-800 transition">
                  <Avatar name={user.name} size="md" />
                  <div>
                    <p className="text-white text-sm font-semibold">{user.name}</p>
                    <p className="text-zinc-500 text-xs">{user.email}</p>
                  </div>
                </div>
              ))}
            </>
          )}

          {tab === 'groups' && (
            tabItems.groups.length > 0
              ? tabItems.groups.map(conv => (
                <ConvItem key={conv.id} conv={conv} active={activeConv?.id === conv.id}
                  onClick={() => setActiveConv(conv)} myUserId={myUserId} />
              ))
              : <p className="text-zinc-600 text-xs text-center mt-8">Sin grupos</p>
          )}

          {tab === 'communities' && (
            tabItems.communities.length > 0
              ? tabItems.communities.map(conv => (
                <ConvItem key={conv.id} conv={conv} active={activeConv?.id === conv.id}
                  onClick={() => setActiveConv(conv)} myUserId={myUserId} />
              ))
              : <p className="text-zinc-600 text-xs text-center mt-8">Sin comunidades</p>
          )}
        </div>
      </aside>

      <main className="flex-1 flex flex-col min-w-0">

        {activeConv ? (
          <>
            <div className="h-16 border-b border-zinc-800 bg-zinc-900/80 backdrop-blur flex items-center px-6 gap-4 shrink-0">
              {activeConv.type === 'private'
                ? <Avatar name={convName || '?'} size="md" />
                : <div className="w-10 h-10 rounded-full bg-zinc-700 flex items-center justify-center text-lg">
                  {activeConv.type === 'group' ? '👥' : '🌐'}
                </div>
              }
              <div>
                <p className="text-white font-bold">{convName}</p>
                <p className="text-zinc-500 text-xs">
                  {activeConv.type === 'private' ? 'Chat privado' :
                    activeConv.type === 'group' ? 'Grupo' : 'Comunidad'}
                </p>
              </div>
            </div>

            <div className="flex-1 overflow-y-auto px-6 py-4">
              {loading
                ? <p className="text-zinc-500 text-sm text-center mt-8">Cargando mensajes...</p>
                : messages.length === 0
                  ? <p className="text-zinc-600 text-sm text-center mt-8">No hay mensajes aún. ¡Di algo!</p>
                  : messages.map(msg => (
                    <MessageBubble
                      key={msg.id}
                      msg={msg}
                      isOwn={msg.user_id === myUserId}
                      onCopy={copyItem}
                    />
                  ))
              }
              <div ref={bottomRef} />
            </div>

            <div className="border-t border-zinc-800 bg-zinc-900/80 px-4 py-3 flex items-center gap-3 shrink-0">
              <button onClick={() => setShowShare(true)}
                className="w-10 h-10 rounded-xl bg-zinc-800 hover:bg-zinc-700 border border-zinc-700 hover:border-tigergrit flex items-center justify-center transition text-zinc-400 hover:text-tigergrit shrink-0">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                </svg>
              </button>

              <input
                value={text}
                onChange={e => setText(e.target.value)}
                onKeyDown={e => e.key === 'Enter' && sendMessage()}
                placeholder="Escribe un mensaje..."
                className="flex-1 bg-zinc-800 border border-zinc-700 rounded-xl px-4 py-2.5 text-white text-sm outline-none focus:ring-2 focus:ring-tigergrit focus:border-tigergrit transition placeholder:text-zinc-500"
              />

              <button onClick={sendMessage}
                className="w-10 h-10 rounded-xl bg-tigergrit hover:bg-tigergrit/90 flex items-center justify-center transition active:scale-95 shrink-0">
                <svg className="w-5 h-5 text-zinc-900" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
                </svg>
              </button>
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

      {showShare && (
        <ShareModal onClose={() => setShowShare(false)} onSend={sendShared} />
      )}
    </div>
  )
}
