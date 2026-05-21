import { Link } from 'react-router-dom'

function Home() {

  return (

    <div>

      <h1>TigerGrit</h1>

      <Link to="/login">
        <button>Iniciar sesión</button>
      </Link>

      <Link to="/register">
        <button>Crear cuenta</button>
      </Link>

    </div>
  )
}

export default Home