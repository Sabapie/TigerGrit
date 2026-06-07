import { Navigate } from 'react-router-dom'

function ProtectedRoute({ children }) {
  const token = localStorage.getItem('token') // ¿Hay sesión?

  if (!token) {
    return <Navigate to="/" /> // Si no hay token, redirige a home
  }

  return children // Si hay token, muestra la página
}

export default ProtectedRoute