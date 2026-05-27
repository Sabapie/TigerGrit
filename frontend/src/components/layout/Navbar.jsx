import { Link, useNavigate } from 'react-router-dom'

function Navbar() {

  const navigate = useNavigate()

  const token = localStorage.getItem('token')

  const logout = () => {

    localStorage.removeItem('token')

    navigate('/login')
  }

  return (

    <nav className="bg-gray-800 p-4 text-white flex justify-between items-center w-full">

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

            <Link to="/exercise-form">
              Crear ejercicios
            </Link>

            <Link to="/routine-form">
              Crear rutinas
            </Link>

            <Link to="/calendar">
            Calendario
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