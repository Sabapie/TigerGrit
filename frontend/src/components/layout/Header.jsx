import { Link } from 'react-router-dom'

function Header() {

  return (

    <header className="h-16 border-b border-zinc-800 bg-zinc-900/80 backdrop-blur sticky top-0 z-50">

      <div className="max-w-[1800px] mx-auto h-full px-6 flex items-center justify-between">

        <Link
          to="/"
          className="text-white text-2xl font-black"
        >
          TigerGrit
        </Link>

        <nav className="flex items-center gap-6">

          <Link
            to="/dashboard"
            className="text-zinc-400 hover:text-white transition"
          >
            Dashboard
          </Link>

          <Link
            to="/routines"
            className="text-zinc-400 hover:text-white transition"
          >
            Rutinas
          </Link>

          <Link
            to="/exercises"
            className="text-zinc-400 hover:text-white transition"
          >
            Ejercicios
          </Link>

          <Link
            to="/calendar"
            className="text-zinc-400 hover:text-white transition"
          >
            Calendario
          </Link>

        </nav>

      </div>

    </header>
  )
}

export default Header