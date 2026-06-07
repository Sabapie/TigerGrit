import { useState } from 'react'
import { useEffect } from 'react'
import axios from 'axios'
import Button from '../components/ui/Button'
import CalendarView from '../components/ui/Calendar'
import RoutineCard from '../components/ui/RoutineCard'
import RoutineModal from '../components/layout/RoutineModal'
import ExerciseModal from '../components/layout/ExerciseModal'
import ExerciseFilter from '../components/ui/Filter'
import Toast from '../components/ui/Toast'
import { useToast } from '../hooks/useToast'

function CalendarPage() {

  const [routines, setRoutines] = useState([])
  const [selectedRoutineId, setSelectedRoutineId] = useState(null)
  const [modalRoutine, setModalRoutine] = useState(null) // Estado para almacenar la rutina seleccionada
  const [isModalOpen, setIsModalOpen] = useState(false) // Estado para controlar la visibilidad del modal
  const { toast, showToast, hideToast } = useToast() // apertura del toast

  const openRoutineModal = async (routineFromCalendar) => {
    const token = localStorage.getItem('token')

    try {
      const res = await axios.get(
        `${import.meta.env.VITE_API_URL}/routines/${routineFromCalendar.id}`,
        {
          headers: {
            Authorization: `Bearer ${token}`
          }
        }
      )

      setModalRoutine(res.data)
      setIsModalOpen(true)

    } catch (error) {
      console.error(error)
      showToast('Error al abrir la rutina', 'error')
    }
  }

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

    if (!selectedRoutineId) {
      showToast('Selecciona una rutina primero', 'warning')
      return
    }

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
      showToast('Rutina asignada correctamente', 'success')

    } catch (error) {

      console.error(error)
      showToast('Error al asignar la rutina', 'error')

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
      showToast('No hay rutina asignada en esta fecha', 'warning')
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
      showToast('Rutina eliminada del calendario', 'success')

    } catch (error) {
      console.error(error)
      showToast('Error al eliminar la rutina', 'error')
    }
  }

  return (
    <main className="flex flex-col items-center px-6 gap-6">
      <div className="bg-[#1A1A1A] border-x border-zinc-800 p-4 w-full max-w-[1500px] flex flex-col gap-5">

        {/* Fila superior: buscador + slider + botones */}
        <div className="flex flex-col sm:flex-row items-start gap-4 w-full h-fit">

          {/* Buscador + Slider */}
          <div className="flex flex-col gap-3 min-w-0 flex-1 sm:w-auto w-[100%]">
            <p className="text-zinc-500 text-xs uppercase tracking-widest">
              Buscar rutina
            </p>
            <ExerciseFilter
              exercises={routines}
              onFilter={setFilteredRoutines}
              onlySearch
            />
            <p className="text-zinc-500 text-xs uppercase tracking-widest">
              Selecciona rutina
            </p>
            <div
              className="flex flex-row gap-3 overflow-x-auto pb-2 snap-x snap-mandatory"
              style={{ scrollbarWidth: 'thin', scrollbarColor: '#f46701 #27272a' }}
            >
              {filteredRoutines.map((routine) => {
                const isSelected = Number(selectedRoutineId) === Number(routine.id)
                return (
                  <div
                    key={routine.id}
                    onClick={() => setSelectedRoutineId(routine.id)}
                    onDoubleClick={() => openRoutineModal(routine)}
                    className={`
                    relative shrink-0 w-48 cursor-pointer rounded-2xl border-2 transition snap-start
                    ${isSelected
                        ? 'border-tigergrit bg-zinc-800'
                        : 'border-zinc-700 bg-zinc-900 hover:border-zinc-500'
                      }
                  `}
                  >
                    <RoutineCard routine={routine} compact />
                  </div>
                )
              })}
            </div>
          </div>

          {/* Botones + - */}
          <div className="flex flex-row gap-2 shrink-0 sm:w-auto sm:flex-col sm:pt-8 w-[100%]">
            <Button onClick={deleteRoutine} variant='primary' className='w-full sm:w-12 sm:h-12 py-2 text-xl sm:text-2xl lg:text-3xl'>
              -
            </Button>
            <Button onClick={assignRoutine} variant='primary' className='w-full sm:w-12 sm:h-12 py-2 text-xl sm:text-2xl lg:text-3xl'>
              +
            </Button>
          </div>

        </div>

        {/* Calendario siempre debajo */}
        <div className="w-full overflow-x-auto">
          <CalendarView
            date={date}
            setDate={setDate}
            scheduledRoutines={scheduledRoutines}
            onOpenRoutine={openRoutineModal}
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

      {/* Toast */}
      {toast && <Toast message={toast.message} type={toast.type} onClose={hideToast} />}

    </main>
  )
}

export default CalendarPage