import { Link, useNavigate, useLocation } from 'react-router-dom'
import { useState } from 'react'

function Navbar() {

  // location.pathname es la ruta actual
  const location = useLocation()
  const isHome = location.pathname === '/'

  const navigate = useNavigate()
  const token = localStorage.getItem('token')
  const [isOpen, setIsOpen] = useState(false)

  const logout = () => {

    localStorage.removeItem('token')

    navigate('/login')
  }

  if (isHome) return(
    <></>
  )
  return (

    <>

      {/* BOTÓN MENU */}
      <button

        onClick={() => setIsOpen(!isOpen)}

        className="fixed top-4 left-4 z-50 bg-tigergrit text-black w-12 h-12 rounded-xl font-bold text-xl shadow-lg">

        ☰

      </button>

      {/* OVERLAY */}
      {
        isOpen && (

          <div

            onClick={() => setIsOpen(false)}

            className="fixed inset-0 bg-black/50 z-40"
          />

        )
      }

      {/* SIDEBAR */}
      <nav

        className={`fixed top-0 left-0 h-screen w-72 bg-zinc-900 border-l border-zinc-800 z-50 transition-transform duration-300 flex flex-col p-6 gap-4
          ${isOpen ? 'translate-x-0' : '-translate-x-full'}
        `}
      >

        {/* HEADER */}
        <div className="flex items-center justify-between mb-4">
          <Link
          to="/"
          onClick={() => setIsOpen(false)}
          className="text-zinc-300 hover:text-white transition"
        >
          <h2 className="text-white text-2xl font-black">
            TigerGrit
          </h2>
        </Link>


          <button

            onClick={() => setIsOpen(false)}

            className="text-zinc-400 hover:text-white text-xl"
          >

            ✕

          </button>

        </div>

        {/* LINKS */}
        {
          token && (
            <>

              <Link
                to="/exercises"
                onClick={() => setIsOpen(false)}
                className="text-zinc-300 hover:text-white transition"
              >
                Ejercicios
              </Link>

              <Link
                to="/routines"
                onClick={() => setIsOpen(false)}
                className="text-zinc-300 hover:text-white transition"
              >
                Rutinas
              </Link>

              <Link
                to="/calendar"
                onClick={() => setIsOpen(false)}
                className="text-zinc-300 hover:text-white transition"
              >
                Calendario
              </Link>

              <button

                onClick={logout}

                className="mt-auto bg-red-500 hover:bg-red-600 transition rounded-xl py-3 text-white font-bold">

                Logout

              </button>

            </>
          )
        }

        {
          !token && (
            <>
            </>
          )
        }

      </nav>

    </>

  )
}

export default Navbar