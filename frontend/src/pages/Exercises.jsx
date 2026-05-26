import { useEffect, useState } from 'react'
import axios from 'axios'
import ExerciseCard from '../components/ui/ExerciseCard'
import ExerciseModal from '../components/layout/ExerciseModal'

function Exercises() {

  const [selectedExercise, setSelectedExercise] = useState(null) // Estado para almacenar el ejercicio seleccionado
  const [isModalOpen, setIsModalOpen] = useState(false) // Estado para controlar la visibilidad del modal
  const [exercises, setExercises] = useState([])

  useEffect(() => {

    getExercises()

  }, [])

  const getExercises = async () => {
    try {
      const token = localStorage.getItem('token')

      const response = await axios.get(
        `${import.meta.env.VITE_API_URL}/exercises`,
        {
          headers: {
            Authorization: `Bearer ${token}`
          }
        }
      )

      setExercises(response.data)

    } catch (error) {
      console.error(error)
    }
  }

  return (

    <div>

      <h1>Ejercicios</h1>

      {
        exercises.map((exercise) => ( // Mapea cada ejercicio a un bloque de información

        <ExerciseCard
          key={exercise.id}
          exercise={exercise}
          onSelect={() => {
            setSelectedExercise(exercise)
            setIsModalOpen(true)
          }}
        />

        ))
      }
      <ExerciseModal

        exercise={selectedExercise}

        isOpen={isModalOpen}

        onClose={() => // Cierra el modal y limpia la rutina seleccionada
          setIsModalOpen(false)
        }
        onDelete={() => { // Función que se ejecuta después de eliminar una rutina
          getExercises()
          setIsModalOpen(false)
          setSelectedExercise(null)
        }}
    />
    </div>
  )
}

export default Exercises