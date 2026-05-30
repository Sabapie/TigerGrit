import { useState } from 'react'
import { useEffect } from 'react'
import axios from 'axios'
import Button from '../components/ui/Button'
import CalendarView from '../components/ui/Calendar'
import RoutineCard from '../components/ui/RoutineCard'
import RoutineModal from '../components/layout/RoutineModal'
import ExerciseModal from '../components/layout/ExerciseModal'
import ExerciseFilter from '../components/ui/Filter'

function CalendarPage() {

  const [routines, setRoutines] = useState([])
  const [selectedRoutineId, setSelectedRoutineId] = useState(null)
  const [modalRoutine, setModalRoutine] = useState(null) // Estado para almacenar la rutina seleccionada
  const [isModalOpen, setIsModalOpen] = useState(false) // Estado para controlar la visibilidad del modal

  useEffect(() => {

    getRoutines() // Obtener rutinas para el select

  }, [])

  useEffect(() => {

    getScheduledRoutines() // Obtener rutinas programadas cada vez que se asigna una nueva rutina

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

  const [date, setDate] = useState(new Date())
  const assignRoutine = async () => {

  const token = localStorage.getItem('token')

    try {

      await axios.post(

        `${import.meta.env.VITE_API_URL}/calendar`,

        {
          routine_id: selectedRoutineId,

          scheduled_date:
            date.toISOString().split('T')[0]
        },

        {
          headers: {
            Authorization: `Bearer ${token}`
          }
        }

      )

      getScheduledRoutines()

    } catch (error) {

      console.error(error)

    }
  }

  const [scheduledRoutines, setScheduledRoutines] = useState([])

  const getScheduledRoutines = async () => {

    const token = localStorage.getItem('token')

    try {

      const response = await axios.get(

        `${import.meta.env.VITE_API_URL}/calendar`,

        {
          headers: {
            Authorization: `Bearer ${token}`
          }
        }

      )

      setScheduledRoutines(response.data)

    } catch (error) {

      console.error(error)

    }
  }

  const deleteRoutine = async () => {
    const token = localStorage.getItem('token')

    const formattedDate = date.toISOString().split('T')[0]

    // Busca la rutina programada para la fecha seleccionada
    const scheduled = scheduledRoutines.find(
      (r) => r.scheduled_date === formattedDate
    )

    if (!scheduled) { // Si no hay rutina
      return
    }

    try {
      await axios.delete(
        `${import.meta.env.VITE_API_URL}/calendar/${scheduled.id}`,
        {
          headers: { Authorization: `Bearer ${token}` }
        }
      )

      getScheduledRoutines()

    } catch (error) {
      console.error(error)
    }
  }

  return (

    <main className="flex flex-col items-center px-6 gap-6">
      <div className="bg-zinc-900 border-x border-zinc-800 p-8 w-full max-w-[1500px] flex flex-col gap-5">



      
      <div className='flex flex-row flex-wrap items-center gap-8'>
        {/* Informacion de la fecha seleccionada */}
        {/* <p>
          Fecha seleccionada:
          {date.toDateString()}
        </p> */}
        <div className="flex flex-col gap-3 w-full">
          <p className="text-zinc-500 text-xs uppercase tracking-widest">
            Selecciona rutina
          </p>
          <ExerciseFilter
            exercises={routines}
            onFilter={setFilteredRoutines}
            onlySearch
          />
          {/*Estilo del slider*/}
          <div className="flex gap-3 overflow-x-auto pb-3 scroll-smooth snap-x snap-mandatory"
            style={{ scrollbarWidth: 'thin', scrollbarColor: '#f46701 #27272a' }}
          >
            {filteredRoutines.map((routine) => {
              const isSelected =
                Number(selectedRoutineId) === Number(routine.id)

                    return (
                      <div
                        key={routine.id}
                        onClick={() => setSelectedRoutineId(routine.id)}
                        onDoubleClick={() => {
                          setModalRoutine(routine)
                          setIsModalOpen(true)
                        }}
                        className={`
                          relative shrink-0 w-48 cursor-pointer rounded-2xl border-2 transition
                          ${isSelected
                            ? 'border-tigergrit bg-zinc-800'
                            : 'border-zinc-700 bg-zinc-900 hover:border-zinc-500'
                          }
                        `}
                      >
                        <RoutineCard
                          routine={routine}
                          compact
                        />
                      </div>
                    )
                  })}
          </div>
        </div>

        <Button onClick={assignRoutine} variant='primary'>
          Añadir rutina
        </Button>

        <Button onClick={deleteRoutine} variant='primary'>
          Eliminar rutina
        </Button>

        <CalendarView
          date={date}
          setDate={setDate}
          scheduledRoutines={scheduledRoutines}
        />
      </div>
        <RoutineModal
          routine={modalRoutine}
          isOpen={isModalOpen}
          onClose={() => {
            setIsModalOpen(false)
            setModalRoutine(null)
          }}
          onDelete={() => {
            getRoutines()
            setIsModalOpen(false)
            setModalRoutine(null)
          }}
        />
      </div>
    </main>
  )
}

export default CalendarPage