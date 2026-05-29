import {BrowserRouter, Routes, Route} from 'react-router-dom'
import Home from './pages/Home'
import Login from './pages/Login'
import Register from './pages/Register'
import Dashboard from './pages/Dashboard'
import NotFound from './pages/NotFound'
import ProtectedRoute from './components/ProtectedRoute'
import Exercises from './pages/Exercises'
import ExerciseForm from './pages/ExerciseForm'
import RoutineForm from './pages/RoutineForm'
import Routines from './pages/Routines'
import Navbar from './components/layout/NavBar'
import CalendarPage from './pages/CalendarPage'
import Header from './components/layout/Header'
import Footer from './components/layout/Footer'

function App() {

  return (

    <BrowserRouter>

      <Header />

      <Navbar />

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
          path="/exercise-form" element={
          <ProtectedRoute>
            <ExerciseForm />
          </ProtectedRoute>
        } />

        <Route
          path="/routine-form" element={
          <ProtectedRoute>
            <RoutineForm />
          </ProtectedRoute>
        } /> 

        <Route
          path="/exercise-form/:id" element={
          <ProtectedRoute>
            <ExerciseForm />
          </ProtectedRoute>
        } />

        <Route
          path="/routine-form/:id" element={
          <ProtectedRoute>
            <RoutineForm />
          </ProtectedRoute>
        } />            

        <Route
          path="/routines" element={
          <ProtectedRoute>
            <Routines />
          </ProtectedRoute>
        } />       

        <Route
          path="/calendar" element={
          <ProtectedRoute>
            <CalendarPage />
          </ProtectedRoute>
         } />    
      </Routes>

      <Footer />

    </BrowserRouter>
  )
}

export default App