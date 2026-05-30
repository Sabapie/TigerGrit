import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import axios from 'axios'
import ExerciseCard from '../components/ui/ExerciseCard'
import ExerciseModal from '../components/layout/ExerciseModal'
import ExerciseFilter from '../components/ui/Filter'
import Button from '../components/ui/Button'

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

  // Filtro 
  const [filteredExercises, setFilteredExercises] = useState([])

    useEffect(() => {
      setFilteredExercises(exercises)
    }, [exercises])


  return (

  <main className="flex flex-col items-center px-6 gap-6">
    <div className="bg-zinc-900 border-x border-zinc-800 p-8 w-full max-w-[1500px] flex flex-col gap-5">

        <ExerciseFilter
          exercises={exercises}
          onFilter={setFilteredExercises}
        />
      <Link to={"/exercise-form"}>
        <Button
          variant='primary'
        >
          Crear ejercicio
        </Button>
      </Link>
        
      </div>

      <div className="bg-zinc-900 border border-zinc-800 rounded-2xl p-8 w-full max-w-[1500px] grid grid-cols-3 gap-5">
        {
          filteredExercises.map(exercise => (
            <ExerciseCard
              key={exercise.id}
              exercise={exercise}
              onSelect={(exercise) => {

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
    </main>
  )
}

export default Exercises