import { useEffect, useState, useRef } from 'react'
import axios from 'axios'
import CommunitySidebar from '../components/community/CommunitySidebar'
import CommunityChat from '../components/community/CommunityChat'
import ShareModal from '../components/community/ShareModal'

const API = import.meta.env.VITE_API_URL
const token = () => localStorage.getItem('token')
const headers = () => ({ Authorization: `Bearer ${token()}` })
const myId = () => {
  try { return JSON.parse(localStorage.getItem('user'))?.id } catch { return null }
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

  return (
    <main className="flex flex-col items-center px-6 gap-6">
      <div className="bg-[#1A1A1A] border-x border-zinc-800 w-full max-w-[1500px] flex flex-col gap-5">
        <div className="flex h-[calc(100dvh-5rem)] bg-zinc-950 text-white overflow-hidden">
          <CommunitySidebar
            tab={tab}
            setTab={setTab}
            search={search}
            setSearch={setSearch}
            filteredPrivateConvs={filteredConvs('private')}
            filteredGroups={filteredConvs('group')}
            filteredCommunities={filteredConvs('community')}
            filteredUsers={filteredUsers}
            activeConv={activeConv}
            setActiveConv={setActiveConv}
            myUserId={myUserId}
            openPrivateChat={openPrivateChat}
          />

          <CommunityChat
            activeConv={activeConv}
            setActiveConv={setActiveConv}
            messages={messages}
            loading={loading}
            text={text}
            setText={setText}
            sendMessage={sendMessage}
            setShowShare={setShowShare}
            myUserId={myUserId}
            copyItem={copyItem}
            bottomRef={bottomRef}
          />

          {showShare && (
            <ShareModal onClose={() => setShowShare(false)} onSend={sendShared} />
          )}
        </div>
    </div> 
   </main>
  )
}
