import { Link, useNavigate, useLocation } from 'react-router-dom'
import { useState } from 'react'

function Navbar() {

  const location = useLocation()
  const isHome = location.pathname === '/'

  const navigate = useNavigate()
  const token = localStorage.getItem('token')
  const [isOpen, setIsOpen] = useState(false)

  const logout = () => {
    localStorage.removeItem('token')
    navigate('/login')
  }

  if (isHome) return <></>

  return (
    <>
      {/* BOTÓN MENU */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className={`
          fixed top-1/2 -translate-y-1/2
          ${isOpen ? 'left-0' : 'left-0 max-[1639px]:-left-6 max-[1639px]:hover:left-2'}
          z-50
          w-14 h-24 md:w-16 md:h-28 lg:w-20 lg:h-32 xl:w-24 xl:h-40
          hover:w-16 hover:h-28 md:hover:w-18 md:hover:h-32 lg:hover:w-24 lg:hover:h-36 xl:hover:w-28 xl:hover:h-44
          rounded-r-2xl bg-tigergrit text-black
          text-2xl md:text-3xl lg:text-4xl
          font-bold shadow-lg transition-all duration-300
          flex items-center justify-center
        `}
      >
        ☰
      </button>

      {/* OVERLAY */}
      {isOpen && (
        <div onClick={() => setIsOpen(false)} className="fixed inset-0 bg-black/50 z-40" />
      )}

      {/* SIDEBAR */}
      <nav className={`
        fixed top-0 left-0 h-[80%] w-72 bg-zinc-900/90 backdrop-blur-sm
        border-r border-zinc-800 z-50 transition-transform duration-300
        flex flex-col py-6 pr-6 gap-24
        rounded-br-xl        
        ${isOpen ? 'translate-x-0' : '-translate-x-full'}
      `}>

        {/* HEADER */}
        <div className="flex items-center justify-between mb-6 ml-6">
          <Link to="/" onClick={() => setIsOpen(false)} className="text-zinc-300 hover:text-white transition">
            <h2 className="text-white text-2xl font-black">TigerGrit</h2>
          </Link>
          <button onClick={() => setIsOpen(false)} className="text-zinc-400 hover:text-white text-xl">
            ✕
          </button>
        </div>

        {/* LINKS */}
        {token && (
          <div className='flex flex-col justify-center gap-[15%] flex-1'>
            <Link
              to="/calendar"
              onClick={() => setIsOpen(false)}
              className={`flex items-center gap-4 px-4 py-3 rounded-r-2xl transition-all duration-300 group -translate-x-2
                ${location.pathname === '/calendar'
                  ? 'bg-tigergrit text-white shadow-lg font-semibold translate-x-0'
                  : 'text-zinc-400 hover:bg-zinc-800 hover:text-white hover:scale-105 hover:translate-x-2 hover:shadow-xl hover:shadow-black/50'
                }`}
            >
              <span className={`text-2xl sm:text-3xl lg:text-4xl transition-transform duration-300 group-hover:scale-125
                ${location.pathname === '/calendar' ? 'text-white' : ''}`}>
                📅
              </span>
              <span className="text-base sm:text-lg lg:text-xl">Calendario</span>
            </Link>

            <Link
              to="/exercises"
              onClick={() => setIsOpen(false)}
              className={`flex items-center gap-4 px-4 py-3 rounded-r-2xl transition-all duration-300 group -translate-x-2
                ${location.pathname === '/exercises'
                  ? 'bg-tigergrit text-white shadow-lg font-semibold translate-x-0'
                  : 'text-zinc-400 hover:bg-zinc-800 hover:text-white hover:scale-105 hover:translate-x-2 hover:shadow-xl hover:shadow-black/50'
                }`}
            >
              <span className={`text-2xl sm:text-3xl lg:text-4xl transition-transform duration-300 group-hover:scale-125
                ${location.pathname === '/exercises' ? 'text-white' : ''}`}>
                🏋️
              </span>
              <span className="text-base sm:text-lg lg:text-xl">Ejercicios</span>
            </Link>

            <Link
              to="/routines"
              onClick={() => setIsOpen(false)}
              className={`flex items-center gap-4 px-4 py-3 rounded-r-2xl transition-all duration-300 group -translate-x-2
                ${location.pathname === '/routines'
                  ? 'bg-tigergrit text-white shadow-lg font-semibold translate-x-0'
                  : 'text-zinc-400 hover:bg-zinc-800 hover:text-white hover:scale-105 hover:translate-x-2 hover:shadow-xl hover:shadow-black/50'
                }`}
            >
              <span className={`text-2xl sm:text-3xl lg:text-4xl transition-transform duration-300 group-hover:scale-125
                ${location.pathname === '/routines' ? 'text-white' : ''}`}>
                🔗
              </span>
              <span className="text-base sm:text-lg lg:text-xl">Rutinas</span>
            </Link>

            <Link
              to="/community"
              onClick={() => setIsOpen(false)}
              className={`flex items-center gap-4 px-4 py-3 rounded-r-2xl transition-all duration-300 group -translate-x-2
                ${location.pathname === '/community'
                  ? 'bg-tigergrit text-white shadow-lg font-semibold translate-x-0'
                  : 'text-zinc-400 hover:bg-zinc-800 hover:text-white hover:scale-105 hover:translate-x-2 hover:shadow-xl hover:shadow-black/50'
                }`}
            >
              <span className={`text-2xl sm:text-3xl lg:text-4xl transition-transform duration-300 group-hover:scale-125
                ${location.pathname === '/community' ? 'text-white' : ''}`}>
                💬
              </span>
              <span className="text-base sm:text-lg lg:text-xl">Comunidad</span>
            </Link>
          </div>
        )}

      </nav>
    </>
  )
}

export default Navbar