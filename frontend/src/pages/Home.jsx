import { Link } from 'react-router-dom'
import Button from '../components/ui/Button'

function Home() {

  return (

    <div>

      <h1>TigerGrit</h1>

      <Link to="/login">
        <Button>Iniciar sesión</Button>
      </Link>

      <Link to="/register">
        <Button>Crear cuenta</Button>
      </Link>

    </div>
  )
}

export default Home