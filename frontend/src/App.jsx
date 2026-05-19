import './App.css'

// Dependencias Axios para hacer peticiones HTTP
import { useEffect, useState } from 'react'
import axios from 'axios'

// LLamada al backend para obtener un mensaje de prueba y mostrarlo en la interfaz
function App() {
  const [message, setMessage] = useState('cargando...')
  const [count, setCount] = useState(0)

  useEffect(() => {
    axios.get(`${import.meta.env.VITE_API_URL}/test`)
      .then(res => {
        setMessage(res.data.message)
      })
      .catch(error => {
        console.error(error)
        setMessage('error conectando con backend')
      })
  }, [])

  return (
    <div>
      <h1>React + Laravel</h1>

      <p>{message}</p>

      <button onClick={() => setCount(count + 1)}>
        Count: {count}
      </button>
    </div>
  )
}

export default App