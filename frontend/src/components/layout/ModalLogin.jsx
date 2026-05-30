import { useState, useEffect } from 'react'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'
import { createPortal } from 'react-dom' // Para poder mostrarlo desde el header
import IsologotipoTigerGrit from '../../assets/Isologotipo-TigerGrit_White.png'

function AuthModal({ isOpen, onClose }) {

  const navigate = useNavigate()
  const [tab, setTab] = useState('login')

  const [loginEmail, setLoginEmail] = useState('')
  const [loginPassword, setLoginPassword] = useState('')

  const [registerName, setRegisterName] = useState('')
  const [registerEmail, setRegisterEmail] = useState('')
  const [registerPassword, setRegisterPassword] = useState('')

  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)

  // useEffect(() => { // Controla que no se pueda iniciar sesion con un token activo
  //   if (isOpen && token) {
  //     navigate('/calendar')
  //     onClose()
  //   }
  // }, [isOpen])

  const login = async () => {
    setError('')
    setLoading(true)
    try {
      const response = await axios.post(
        `${import.meta.env.VITE_API_URL}/login`,
        { email: loginEmail, password: loginPassword }
      )
      localStorage.setItem('token', response.data.token) // Guarda el token de sesion en el storage local
      localStorage.setItem('user', JSON.stringify(response.data.user)) // Guarda el usuario para poder usarlo en el apartado comunidad
      localStorage.setItem('name', response.data.user?.name) // Guarda el nombre de usuaio en el storage local

      onClose()
      navigate('/calendar')
    } catch {
      setError('Email o contraseña incorrectos')
    } finally {
      setLoading(false)
    }
  }

  const register = async () => {
    setError('')
    setLoading(true)
    try {
      const response = await axios.post(
        `${import.meta.env.VITE_API_URL}/register`,
        { name: registerName, email: registerEmail, password: registerPassword }
      )
      localStorage.setItem('token', response.data.token) // Guarda el token de sesion en el storage local
      localStorage.setItem('user', JSON.stringify(response.data.user)) // Guarda el usuario para poder usarlo en el apartado comunidad
      localStorage.setItem('name', response.data.user?.name || registerName) // Guarda el nombre de usuaio en el storage local
      onClose()
      navigate('/calendar')
    } catch {
      setError('Error al crear la cuenta')
    } finally {
      setLoading(false)
    }
  }

  if (!isOpen) return null

   return createPortal(
      <div
      className="fixed inset-0 bg-black/70 backdrop-blur-sm flex items-center justify-center z-[100]"
      onClick={onClose}
    >
      <div
        className="bg-zinc-900 border border-zinc-800 rounded-2xl w-full max-w-sm mx-4 p-8 flex flex-col gap-6"
        onClick={(e) => e.stopPropagation()}
      >

        {/* Header */}
        <div className="flex items-start justify-between">
          <img src={IsologotipoTigerGrit} className="max-w-40 " alt="" />
        </div>

        {/* Título dinámico */}
        <div>
          <h1 className="text-white text-2xl font-bold tracking-tight">
            {tab === 'login' ? 'Bienvenido de nuevo' : 'Crea tu cuenta'}
          </h1>
          <p className="text-zinc-500 text-sm mt-1">
            {tab === 'login' ? 'Inicia sesión para continuar' : 'Empieza tu entrenamiento hoy'}
          </p>
        </div>

        {/* Formulario Login */}
        {tab === 'login' && (
          <div className="flex flex-col gap-4">
            <div className="flex flex-col gap-1">
              <label className="text-zinc-500 text-xs uppercase tracking-widest font-medium">Email</label>
              <input
                type="email"
                placeholder="tu@email.com"
                onChange={(e) => setLoginEmail(e.target.value)}
                className="bg-zinc-800 border border-zinc-700 rounded-lg px-4 py-2.5 text-white text-sm outline-none focus:ring-2 focus:ring-tigergrit focus:border-tigergrit transition placeholder:text-zinc-600"
              />
            </div>
            <div className="flex flex-col gap-1">
              <label className="text-zinc-500 text-xs uppercase tracking-widest font-medium">Contraseña</label>
              <input
                type="password"
                placeholder="••••••••"
                onChange={(e) => setLoginPassword(e.target.value)}
                className="bg-zinc-800 border border-zinc-700 rounded-lg px-4 py-2.5 text-white text-sm outline-none focus:ring-2 focus:ring-tigergrit focus:border-tigergrit transition placeholder:text-zinc-600"
              />
            </div>

            {error && <p className="text-red-400 text-xs">{error}</p>}

            <button
              onClick={login}
              disabled={loading}
              className="bg-tigergrit hover:bg-tigergrit/90 text-zinc-900 font-bold py-2.5 rounded-lg transition active:scale-95 disabled:opacity-50"
            >
              {loading ? 'Entrando...' : 'Iniciar sesión'}
            </button>

            <p className="text-zinc-500 text-sm text-center">
              ¿No tienes cuenta?{' '}
              <span
                onClick={() => { setTab('register'); setError('') }}
                className="text-tigergrit hover:underline cursor-pointer font-medium"
              >
                Regístrate gratis
              </span>
            </p>
          </div>
        )}

        {/* Formulario Register */}
        {tab === 'register' && (
          <div className="flex flex-col gap-4">
            <div className="flex flex-col gap-1">
              <label className="text-zinc-500 text-xs uppercase tracking-widest font-medium">Nombre</label>
              <input
                type="text"
                placeholder="Tu nombre"
                onChange={(e) => setRegisterName(e.target.value)}
                className="bg-zinc-800 border border-zinc-700 rounded-lg px-4 py-2.5 text-white text-sm outline-none focus:ring-2 focus:ring-tigergrit focus:border-tigergrit transition placeholder:text-zinc-600"
              />
            </div>
            <div className="flex flex-col gap-1">
              <label className="text-zinc-500 text-xs uppercase tracking-widest font-medium">Email</label>
              <input
                type="email"
                placeholder="tu@email.com"
                onChange={(e) => setRegisterEmail(e.target.value)}
                className="bg-zinc-800 border border-zinc-700 rounded-lg px-4 py-2.5 text-white text-sm outline-none focus:ring-2 focus:ring-tigergrit focus:border-tigergrit transition placeholder:text-zinc-600"
              />
            </div>
            <div className="flex flex-col gap-1">
              <label className="text-zinc-500 text-xs uppercase tracking-widest font-medium">Contraseña</label>
              <input
                type="password"
                placeholder="••••••••"
                onChange={(e) => setRegisterPassword(e.target.value)}
                className="bg-zinc-800 border border-zinc-700 rounded-lg px-4 py-2.5 text-white text-sm outline-none focus:ring-2 focus:ring-tigergrit focus:border-tigergrit transition placeholder:text-zinc-600"
              />
            </div>

            {error && <p className="text-red-400 text-xs">{error}</p>}

            <button
              onClick={register}
              disabled={loading}
              className="bg-tigergrit hover:bg-tigergrit/90 text-zinc-900 font-bold py-2.5 rounded-lg transition active:scale-95 disabled:opacity-50"
            >
              {loading ? 'Creando cuenta...' : 'Crear cuenta'}
            </button>

            <p className="text-zinc-500 text-sm text-center">
              ¿Ya tienes cuenta?{' '}
              <span
                onClick={() => { setTab('login'); setError('') }}
                className="text-tigergrit hover:underline cursor-pointer font-medium"
              >
                Inicia sesión
              </span>
            </p>
          </div>
        )}

      </div>
    </div>,
    document.body  // se renderiza directamente en el body
  )
    
}

export default AuthModal