import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { Link } from 'react-router-dom'
import axios from 'axios'
import Button from '../components/ui/Button'


function Dashboard() {

  const navigate = useNavigate()
  const [user, setUser] = useState(null)

  useEffect(() => {getUser()}, [])

  const getUser = async () => {

    const token = localStorage.getItem('token')

    if (!token) { // Si no hay token, redirige al login

      navigate('/login')
      return
    }

    try {

      const response = await axios.get(
        `${import.meta.env.VITE_API_URL}/user`,
        {
          headers: {
            Authorization: `Bearer ${token}`
          }
        }
      )

      setUser(response.data)

    } catch (error) {

      console.error(error)

      navigate('/login')
    }
  }

  const logout = async () => {

    const token = localStorage.getItem('token')

    try {

      await axios.post(
        `${import.meta.env.VITE_API_URL}/logout`,
        {},
        {
          headers: {
            Authorization: `Bearer ${token}`
          }
        }
      )

    } catch (error) {

      console.error(error)

    }

    localStorage.removeItem('token')

    navigate('/')
  }

  return (

    <div>

      <h1>Dashboard</h1>

      {
        user &&
        <h2>Bienvenido {user.name}</h2>
      }

      <Button onClick={logout}>
        Cerrar sesión
      </Button>

      <Link to="/exercises">

        <Button>
          Ver ejercicios
        </Button>

      </Link>

      <Link to="/create-exercise">

        <Button>
            Crear ejercicio
        </Button>

      <Link to="/create-routine">

      <Button>
        Crear rutina
      </Button>

    </Link>

    <Link to="/routines">

      <Button>
        Ver rutinas
      </Button>

    </Link>
    </Link>

    </div>
  )
}

export default Dashboard