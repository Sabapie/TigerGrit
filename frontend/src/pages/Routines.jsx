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
    <main className="flex flex-col items-center px-6 gap-6">
      <div className="bg-[#1A1A1A] border-x p-4 border-zinc-800 w-full max-w-[1500px] flex flex-col gap-5">
      
        <div className='flex sm:flex-row flex-col items-center justify-between bg-zinc-900'>
            
          <div className='border-b md:border-b-0 md:border-r border-zinc-800 w-full p-4'>
            <ExerciseFilter
              exercises={routines}
              onFilter={setFilteredRoutines}
              onlySearch
              placeholder='Buscar Rutina...'
            />
          </div>
          
          <div className='p-4 self-stretch'>
            <Link to={"/routine-form"}>
                <Button
                  variant='primary'
                  className='w-full'
                >
                  Crear rutina
                </Button>

            </Link>
          </div>

        </div>

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