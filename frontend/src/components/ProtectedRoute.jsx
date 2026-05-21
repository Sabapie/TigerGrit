import { Navigate } from 'react-router-dom'

function ProtectedRoute({ children }) {
  const token = localStorage.getItem('token') // ¿Hay sesión?

  if (!token) {
    return <Navigate to="/login" /> // Si no hay token, redirige al login
  }

  return children // Si hay token, muestra la página
}

export default ProtectedRoute