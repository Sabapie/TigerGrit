import { Link, useNavigate } from 'react-router-dom'
import { useState } from 'react'

function Navbar() {

  const navigate = useNavigate()

  const token = localStorage.getItem('token')

  const [isOpen, setIsOpen] = useState(false)

  const logout = () => {

    localStorage.removeItem('token')

    navigate('/login')
  }

  return (

    <>

      {/* BOTÓN MENU */}
      <button

        onClick={() => setIsOpen(!isOpen)}

        className="
          fixed
          top-4
          right-4
          z-50
          bg-tigergrit
          text-black
          w-12
          h-12
          rounded-xl
          font-bold
          text-xl
          shadow-lg
        "
      >

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

        className={`fixed top-0 right-0 h-screen w-72 bg-zinc-900 border-l border-zinc-800 z-50 transition-transform duration-300 flex flex-col p-6 gap-4
          ${isOpen ? 'translate-x-0' : 'translate-x-full'}
        `}
      >

        {/* HEADER */}
        <div className="flex items-center justify-between mb-4">

          <h2 className="text-white text-2xl font-black">
            TigerGrit
          </h2>

          <button

            onClick={() => setIsOpen(false)}

            className="text-zinc-400 hover:text-white text-xl"
          >

            ✕

          </button>

        </div>

        {/* LINKS */}
        <Link
          to="/"
          onClick={() => setIsOpen(false)}
          className="text-zinc-300 hover:text-white transition"
        >
          Inicio
        </Link>

        {
          token && (
            <>

              <Link
                to="/dashboard"
                onClick={() => setIsOpen(false)}
                className="text-zinc-300 hover:text-white transition"
              >
                Dashboard
              </Link>

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
                to="/exercise-form"
                onClick={() => setIsOpen(false)}
                className="text-zinc-300 hover:text-white transition"
              >
                Crear ejercicios
              </Link>

              <Link
                to="/routine-form"
                onClick={() => setIsOpen(false)}
                className="text-zinc-300 hover:text-white transition"
              >
                Crear rutinas
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

                className="
                  mt-auto
                  bg-red-500
                  hover:bg-red-600
                  transition
                  rounded-xl
                  py-3
                  text-white
                  font-bold
                "
              >

                Logout

              </button>

            </>
          )
        }

        {
          !token && (
            <>

              <Link
                to="/login"
                onClick={() => setIsOpen(false)}
                className="text-zinc-300 hover:text-white transition"
              >
                Login
              </Link>

              <Link
                to="/register"
                onClick={() => setIsOpen(false)}
                className="text-zinc-300 hover:text-white transition"
              >
                Register
              </Link>

            </>
          )
        }

      </nav>

    </>

  )
}

export default Navbar