import {BrowserRouter, Routes, Route} from 'react-router-dom'
import Home from './pages/Home'
import NotFound from './pages/NotFound'
import ProtectedRoute from './components/layout/ProtectedRoute'
import Exercises from './pages/Exercises'
import ExerciseForm from './pages/ExerciseForm'
import RoutineForm from './pages/RoutineForm'
import Routines from './pages/Routines'
import Navbar from './components/layout/Navbar'
import CalendarPage from './pages/CalendarPage'
import Header from './components/layout/Header'
import Profile from './pages/Profile'
import Footer from './components/layout/Footer'
import Community from './pages/Community'


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

        <Route
          path="/profile" element={
          <ProtectedRoute>
            <Profile />
          </ProtectedRoute>
        } />  

        <Route path="/community" element={
            <ProtectedRoute>
              <Community />
            </ProtectedRoute>
          } />
          
      </Routes>

      <Footer />

    </BrowserRouter>
  )
}

export default App