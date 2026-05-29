import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import axios from 'axios'
import RoutineCard from '../components/ui/RoutineCard'
import RoutineModal from '../components/layout/RoutineModal'
import Button from '../components/ui/Button'
import ExerciseFilter from '../components/ui/Filter'

function Routines() {


  const [selectedRoutine, setSelectedRoutine] = useState(null) // Estado para almacenar la rutina seleccionada
  const [isModalOpen, setIsModalOpen] = useState(false) // Estado para controlar la visibilidad del modal
  const [routines, setRoutines] = useState([])

  useEffect(() => {

      getRoutines()

  }, [])

  // Busqueda 
  const [filteredRoutines, setFilteredRoutines] = useState([])

  useEffect(() => {
    setFilteredRoutines(routines)
  }, [routines])
    
  const getRoutines = async () => {

    const token = localStorage.getItem('token')

    try {

      const response = await axios.get(

        `${import.meta.env.VITE_API_URL}/routines`,

        {
          headers: {
            Authorization: `Bearer ${token}`
          }
        }

      )

      setRoutines(response.data)

    } catch (error) {

      console.error(error)

    }
  }

  return (

    <main className="min-h-screen flex flex-col px-4 py-8 font-sans items-center">
      <div className="bg-zinc-900 border border-zinc-800 rounded-2xl p-8 w-full max-w-[1500px] ">
      <h1>Mis rutinas</h1>
      <ExerciseFilter
            exercises={routines}
            onFilter={setFilteredRoutines}
            onlySearch
      />
      <Link to={"/routine-form"}>
        <Button
          variant='primary'
        >
          Crear rutina
        </Button>
      </Link>
      {
          filteredRoutines.map((routine) => ( // Mapea cada rutina a un bloque de información

          <RoutineCard
              key={routine.id}
              routine={routine} 
              onSelect={() => {
                  setSelectedRoutine(routine)
                  setIsModalOpen(true)
              }}
          />

          ))
      }

      <RoutineModal

          routine={selectedRoutine}

          isOpen={isModalOpen}

          onClose={() => // Cierra el modal y limpia la rutina seleccionada
              setIsModalOpen(false)
          }
          onDelete={() => { // Función que se ejecuta después de eliminar una rutina
              getRoutines()
              setIsModalOpen(false)
              setSelectedRoutine(null)
          }}
      />

      </div>
    </main>
  )
}

export default Routines