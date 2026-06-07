import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'
import userIcon from '/user.svg'

function Profile() {

  const navigate = useNavigate()
  const [user, setUser] = useState(null)
  const [stats, setStats] = useState({
    exercises: 0,
    routines: 0,
    topRoutine: null,
    topRoutineCount: 0
  })
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    loadProfile()
  }, [])

  const loadProfile = async () => {
    const token = localStorage.getItem('token')
    if (!token) { navigate('/'); return }

    try {
      const [userRes, exercisesRes, routinesRes, calendarRes] = await Promise.all([
        axios.get(`${import.meta.env.VITE_API_URL}/user`, { headers: { Authorization: `Bearer ${token}` } }),
        axios.get(`${import.meta.env.VITE_API_URL}/exercises`, { headers: { Authorization: `Bearer ${token}` } }),
        axios.get(`${import.meta.env.VITE_API_URL}/routines`, { headers: { Authorization: `Bearer ${token}` } }),
        axios.get(`${import.meta.env.VITE_API_URL}/calendar`, { headers: { Authorization: `Bearer ${token}` } }),
      ])

      setUser(userRes.data)

      const userExercises = exercisesRes.data.filter(e => e.user_id !== null)
      const routines = routinesRes.data
      const calendar = calendarRes.data

      const routineCount = calendar.reduce((acc, entry) => {
        acc[entry.routine_id] = (acc[entry.routine_id] || 0) + 1
        return acc
      }, {})

      const topRoutineId = Object.entries(routineCount)
        .sort((a, b) => b[1] - a[1])[0]?.[0]

      const topRoutine = routines.find(r => String(r.id) === String(topRoutineId)) || null
      const topCount = routineCount[topRoutineId] || 0

      setStats({
        exercises: userExercises.length,
        routines: routines.length,
        topRoutine,
        topRoutineCount: topCount
      })

    } catch (error) {
      console.error(error)
    } finally {
      setLoading(false)
    }
  }

  const logout = () => {
    localStorage.removeItem('token')
    localStorage.removeItem('name')
    navigate('/')
  }

  if (loading) return (
    <main className="min-h-screen flex items-center justify-center">
      <p className="text-zinc-500 text-sm">Cargando perfil...</p>
    </main>
  )

  return (
    <main className="min-h-screen px-4 py-10 flex flex-col items-center gap-6">
      <div className="w-full max-w-2xl flex flex-col gap-4">

        {/* HEADER CARD */}
        <div className="bg-zinc-900 border border-zinc-800 rounded-2xl p-6 flex items-center gap-5 relative">

          <button
            disabled
            className="absolute top-4 right-4 text-zinc-600 cursor-not-allowed p-2 rounded-lg hover:bg-zinc-800 transition"
            title="Próximamente"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5}
                d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
            </svg>
          </button>

          <div className="w-16 h-16 rounded-2xl bg-tigergrit flex items-center justify-center text-zinc-900 font-black text-xl shrink-0">
            <img src={userIcon} alt="" />
          </div>

          <div className="flex flex-col gap-0.5">
            <h1 className="text-white text-xl font-bold tracking-tight">{user?.name}</h1>
            <p className="text-zinc-400 text-sm">{user?.email}</p>
            <p className="text-zinc-600 text-xs mt-1">
              Miembro desde {new Date(user?.created_at).toLocaleDateString('es-ES', { year: 'numeric', month: 'long' })}
            </p>
          </div>

        </div>

        {/* STATS */}
        <div className="grid grid-cols-2 gap-4">

          <div className="bg-zinc-900 border border-zinc-800 rounded-2xl p-5 flex flex-col gap-1">
            <p className="text-zinc-500 text-xs uppercase tracking-widest">Ejercicios creados</p>
            <p className="text-tigergrit text-4xl font-black">{stats.exercises}</p>
          </div>

          <div className="bg-zinc-900 border border-zinc-800 rounded-2xl p-5 flex flex-col gap-1">
            <p className="text-zinc-500 text-xs uppercase tracking-widest">Rutinas creadas</p>
            <p className="text-tigergrit text-4xl font-black">{stats.routines}</p>
          </div>

        </div>

        {/* RUTINA MÁS USADA */}
        {stats.topRoutine && (
          <div className="bg-zinc-900 border border-zinc-800 rounded-2xl p-5 flex flex-col gap-3">
            <p className="text-zinc-500 text-xs uppercase tracking-widest">Rutina más usada</p>
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-xl bg-tigergrit/10 border border-tigergrit/20 flex items-center justify-center text-2xl shrink-0">
                💪
              </div>
              <div className='flex flex-row w-full justify-between'>
                <div>
                    <h3 className="text-white font-bold">{stats.topRoutine.name}</h3>
                  <p className="text-zinc-500 text-xs">
                    {stats.topRoutine.exercises?.length || 0} ejercicios ·{' '}
                    {stats.topRoutine.exercises?.reduce((a, e) => a + (e.sets || 0), 0) || 0} series
                  </p>
                </div>
                <div className=''>
                  {stats.topRoutineCount} {stats.topRoutineCount === 1 ? 'vez' : 'veces'} asignada 🏆
                </div>
              </div>
            </div>
          </div>
        )}

        {/* LOGOUT */}
        <button
          onClick={logout}
          className="w-full bg-zinc-900 border border-zinc-800 hover:border-red-500/50 hover:bg-red-500/5 text-red-400 hover:text-red-300 rounded-2xl py-3 font-semibold transition text-sm"
        >
          Cerrar sesión
        </button>

      </div>
    </main>
  )
}

export default Profile