import './App.css'
import {BrowserRouter, Routes, Route} from 'react-router-dom'
import Home from './pages/Home'
import Login from './pages/Login'
import Register from './pages/Register'
import Dashboard from './pages/Dashboard'
import NotFound from './pages/NotFound'
import ProtectedRoute from './components/ProtectedRoute'
import Exercises from './pages/Exercises'
import CreateExercise from './pages/CreateExercise'
import CreateRoutine from './pages/CreateRoutine'
import Routines from './pages/Routines'

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

        {/* Ruta protegida para ejercicios */}
        <Route
          path="/exercises" element={
          <ProtectedRoute>
            <Exercises />
          </ProtectedRoute>
        } />

        <Route
          path="/create-exercise" element={
          <ProtectedRoute>
            <CreateExercise />
          </ProtectedRoute>
        } />

        <Route
          path="/create-routine" element={
          <ProtectedRoute>
            <CreateRoutine />
          </ProtectedRoute>
        } />          

        <Route
          path="/routines" element={
          <ProtectedRoute>
            <Routines />
          </ProtectedRoute>
        } />          
      </Routes>

    </BrowserRouter>
  )
}

export default App