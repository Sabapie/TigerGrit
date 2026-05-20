import './App.css'

// Dependencias Axios para hacer peticiones HTTP
import { useEffect, useState } from 'react'
import axios from 'axios'

function App() {

  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  const login = async () => {
      
    try {

      const response = await axios.post( // Se hace la petición POST al endpoint de login de tu backend
        `${import.meta.env.VITE_API_URL}/login`,
        {
          email,
          password
        }
      )

      localStorage.setItem( // Se guarda el token en el localStorage del navegador
        'token',
        response.data.token
      )

      console.log(response.data)

    } catch (error) {

      console.error(error)

    }
  }

  const getUser = async () => {

  const token = localStorage.getItem('token')

    try {
      const response = await axios.get(
        `${import.meta.env.VITE_API_URL}/user`,
          {
            headers: {
              Authorization: `Bearer ${token}`
            }
          }
        )
      
        console.log(response.data)

        } catch (error) {

          console.error(error)

        }
    }

  return (

    <div>

      <h1>Login</h1>

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

      <button onClick={login}>
        Login
      </button>


      <button onClick={getUser}>
        Obtener usuario
      </button>

    </div>
  )

  
}

export default App