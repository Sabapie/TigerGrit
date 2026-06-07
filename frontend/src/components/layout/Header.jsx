import { Link, useLocation } from 'react-router-dom'
import { useState, useEffect } from 'react'
import IsologotipoTigerGrit from '/Isologotipo-TigerGrit_White.png'
import UserButton from '../ui/ProfileButton'

function Header() {

  // location.pathname es la ruta actual
  const location = useLocation()
  const isHome = location.pathname === '/'
  const token = localStorage.getItem('token')

  // Para saber la ruta actual
  const routeNames = {
    '/calendar': 'Calendario',
    '/exercises': 'Ejercicios',
    '/routines': 'Rutinas',
    '/community': 'Comunidad',
  }

  const [scrolled, setScrolled] = useState(false) // Controla cuando bajas en la pagina

  useEffect(() => { // Funcion que controla la cantidad escroleada en la pagina
    const handleScroll = () => {
      setScrolled(window.scrollY > 50)
    }
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])


  if (isHome) return (
    <header className={`fixed top-0 left-0 w-full z-50 transition-all duration-300
      ${scrolled
        ? 'bg-zinc-900/95 backdrop-blur border-b border-zinc-800 p-5'
        : 'bg-transparent p-5 border-b border-zinc-800/0'
      }
    `}>
      <div className="mx-auto 2xl:mx-40 h-full px-4 flex items-center justify-between">

        {/* Logo — solo visible al hacer scroll */}
        <div className={`transition-all duration-300 ${scrolled ? 'opacity-100' : 'opacity-0 pointer-events-none'}`}>

          <Link to={token ? '/calendar' : '/'}>
            <img src={IsologotipoTigerGrit} alt="" className="w-56" />
          </Link>

        </div>

        <div className="ml-auto">
          <UserButton />
        </div>

      </div>
    </header>
  )

  return (
    <header className="h-auto p-5 border-b border-zinc-800 bg-zinc-900/80 backdrop-blur top-0 left-0 w-full z-50">
      <div className="mx-auto 2xl:mx-40 h-full px-4 flex items-center justify-between">
        <div className="flex items-center gap-4">
          <Link to={token ? '/calendar' : '/'}>
            <img src={IsologotipoTigerGrit} alt="" className="w-56" />
          </Link>
          {routeNames[location.pathname] && (
            <span className="text-zinc-400 text-sm sm:text-base lg:text-xl pt-5 font-bold">
              /{routeNames[location.pathname]}
            </span>
          )}
        </div>
        <UserButton />
      </div>
    </header>
  )
}

export default Header