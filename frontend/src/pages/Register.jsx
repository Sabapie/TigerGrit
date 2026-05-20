import { useState } from 'react'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'

function Register() {

  const navigate = useNavigate()

  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  const register = async () => {

    try {

      const response = await axios.post(
        `${import.meta.env.VITE_API_URL}/register`,
        {
          name,
          email,
          password
        }
      )

      localStorage.setItem(
        'token',
        response.data.token
      )

      navigate('/dashboard')

    } catch (error) {

      console.error(error)

    }
  }

  return (

    <div>

      <h1>Crear cuenta</h1>

      <input
        type="text"
        placeholder="nombre"
        onChange={(e) => setName(e.target.value)}
      />

      <input
        type="email"
        placeholder="email"
        onChange={(e) => setEmail(e.target.value)}
      />

      <input
        type="password"
        placeholder="password"
        onChange={(e) => setPassword(e.target.value)}
      />

      <button onClick={register}>
        Crear cuenta
      </button>

    </div>
  )
}

export default Register