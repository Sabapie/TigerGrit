import { useNavigate } from 'react-router-dom'
import { useState } from 'react'
import AuthModal from '../layout/ModalLogin'
import userIcon from '../../assets/user.svg' 

function UserButton() {

const navigate = useNavigate()
const token = localStorage.getItem('token')
const name = localStorage.getItem('name')
const [authOpen, setAuthOpen] = useState(false)

// Si hay sesion perfil si no login
const handleClick = () => {
    if (token) {
        navigate('/profile')
    } else {
        setAuthOpen(true)
    }
}

return (
    <>
      <button
        onClick={handleClick}
        className="flex items-center gap-3 px-3 py-2 group transition hover:scale-105"
      >
        {/* Avatar */}
        <div className="w-10 h-10 rounded-full bg-tigergrit flex items-center justify-center shrink-0 text-zinc-900 font-bold text-sm overflow-hidden">
          <img src={userIcon} alt="usuario" className="w-6 h-6" />
        </div>

        {/* Texto — solo en pantallas md+ */}
        <div className="hidden md:flex flex-col items-start">
          {token && name ? (
            <>
              <span className="text-white text-sm font-semibold leading-tight">{name}</span>
              <span className="text-zinc-500 text-xs leading-tight">Ver perfil</span>
            </>
          ) : (
            <>
              <span className="text-white text-sm font-semibold leading-tight">Iniciar sesión</span>
              <span className="text-zinc-500 text-xs leading-tight">o crear cuenta</span>
            </>
          )}
        </div>
      </button>


      <AuthModal isOpen={authOpen} onClose={() => setAuthOpen(false)} />
    </>
  )
}

export default UserButton