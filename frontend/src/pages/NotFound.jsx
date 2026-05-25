import { useNavigate } from 'react-router-dom'

function NotFound() {
  const navigate = useNavigate()

  return (
    <div>
      <h1>404</h1>
      <p>La página que buscas no existe</p>
      <Button onClick={() => navigate('/login')}>
        Volver al inicio
      </Button>
    </div>
  )
}

export default NotFound