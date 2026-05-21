import './App.css'
import {BrowserRouter, Routes, Route} from 'react-router-dom'
import Home from './pages/Home'
import Login from './pages/Login'
import Register from './pages/Register'
import Dashboard from './pages/Dashboard'
import NotFound from './pages/NotFound'
import ProtectedRoute from './components/ProtectedRoute'


function App() {

  return (

    <BrowserRouter>

      <Routes>

        {/* Ruta para páginas no encontradas */}
        <Route
          path="*" element={<NotFound />}
        />

        <Route
          path="/" element={<Home />}
        />

        <Route
          path="/login" element={<Login />}
        />

        <Route
          path="/register" element={<Register />}
        />

        {/* Ruta protegida para el dashboard */}
        <Route
          path="/dashboard" element={
          <ProtectedRoute>
            <Dashboard />
          </ProtectedRoute>
        } />
      </Routes>

    </BrowserRouter>
  )
}

export default App