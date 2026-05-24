import { Link, useNavigate } from 'react-router-dom'

function Navbar() {

  const navigate = useNavigate()

  const token = localStorage.getItem('token')

  const logout = () => {

    localStorage.removeItem('token')

    navigate('/login')
  }

  return (

    <nav className="bg-gray-800 p-4 text-white flex justify-between items-center">

      <Link to="/">
        Inicio
      </Link>

      {
        token && (
          <>

            <Link to="/dashboard">
              Dashboard
            </Link>

            <Link to="/exercises">
              Ejercicios
            </Link>

            <Link to="/routines">
              Rutinas
            </Link>

            <Link to="/create-exercise">
              Crear ejercicio
            </Link>

            <Link to="/create-routine">
              Crear rutina
            </Link>

            <button onClick={logout}>
              Logout
            </button>

          </>
        )
      }

      {
        !token && (
          <>

            <Link to="/login">
              Login
            </Link>

            <Link to="/register">
              Register
            </Link>

          </>
        )
      }

    </nav>
  )
}

export default Navbar