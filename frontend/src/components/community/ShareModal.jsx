import { useEffect, useState } from 'react'
import axios from 'axios'
import Button from '../ui/Button'

const API = import.meta.env.VITE_API_URL
const token = () => localStorage.getItem('token')
const headers = () => ({ Authorization: `Bearer ${token()}` })

export default function ShareModal({ onClose, onSend }) {
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
          <Button variant="custom" onClick={onClose} className="text-zinc-500 hover:text-white transition">✕</Button>
        </div>

        <div className="flex gap-2 bg-zinc-800 rounded-lg p-1">
          {['exercise', 'routine'].map(t => (
            <Button key={t} variant="custom" onClick={() => { setTab(t); setSelected(null) }}
              className={`flex-1 py-1.5 rounded-md text-xs font-medium transition duration-200 active:scale-95
                ${tab === t ? 'bg-tigergrit text-zinc-900' : 'text-zinc-400 hover:text-white'}`}>
              {t === 'exercise' ? '💪 Ejercicio' : '📋 Rutina'}
            </Button>
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

        <Button
          onClick={() => selected && onSend(tab, selected)}
          disabled={!selected}
          variant="custom"
          className="bg-tigergrit hover:bg-tigergrit/90 text-zinc-900 font-bold py-2.5 rounded-xl transition disabled:opacity-40 duration-200 active:scale-95 w-full flex justify-center items-center">
          Enviar
        </Button>
      </div>
    </div>
  )
}
