import { useState } from 'react'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'
import Button from '../components/ui/Button'
import  Input from '../components/ui/Input'

function Login() {

  const navigate = useNavigate()

  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  const login = async () => {

    try {

      const response = await axios.post(
        `${import.meta.env.VITE_API_URL}/login`,
        {
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

      <h1>Login</h1>

      < Input
        type="email"
        placeholder="email"
        onChange={(e) => setEmail(e.target.value)}
      />

      < Input
        type="password"
        placeholder="password"
        onChange={(e) => setPassword(e.target.value)}
      />

      <Button onClick={login}>
        Entrar
      </Button>

    </div>
  )
}

export default Login