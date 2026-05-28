import { useState } from 'react'
import { useEffect } from 'react'
import axios from 'axios'
import Button from '../components/ui/Button'
import CalendarView from '../components/ui/Calendar'

function CalendarPage() {

  const [routines, setRoutines] = useState([])
  const [selectedRoutine, setSelectedRoutine] = useState('')

  useEffect(() => {

    getRoutines() // Obtener rutinas para el select

  }, [])

  useEffect(() => {

    getScheduledRoutines() // Obtener rutinas programadas cada vez que se asigna una nueva rutina

  }, [])

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
          routine_id: selectedRoutine,

          scheduled_date:
            date.toISOString().split('T')[0]
        },

        {
          headers: {
            Authorization: `Bearer ${token}`
          }
        }

      )

      alert('Rutina programada')
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

    if (!scheduled) {
      alert('No hay rutina programada para esta fecha')
      return
    }

    try {
      await axios.delete(
        `${import.meta.env.VITE_API_URL}/calendar/${scheduled.id}`,
        {
          headers: { Authorization: `Bearer ${token}` }
        }
      )

      alert('Rutina eliminada')
      getScheduledRoutines()

    } catch (error) {
      console.error(error)
    }
  }

  return (

    <main className="flex flex-col items-center px-6 gap-6">
      <CalendarView
        date={date}
        setDate={setDate}
        scheduledRoutines={scheduledRoutines}
      />

      
      <div className='flex flex-row flex-wrap items-center gap-8'>
        <p>
          Fecha seleccionada:
          {date.toDateString()}
        </p>
        <select
          value={selectedRoutine}
          onChange={(e) =>
            setSelectedRoutine(e.target.value)
          }
        >

          <option value="">
            Selecciona rutina
          </option>

          {
            routines.map((routine) => (

              <option
                key={routine.id}
                value={routine.id}
              >

                {routine.name}

              </option>

            ))
          }

        </select>

        <Button onClick={assignRoutine} variant='primary'>
          Añadir rutina
        </Button>

        <Button onClick={deleteRoutine} variant='primary'>
          Eliminar rutina
        </Button>
      </div>
    </main>
  )
}

export default CalendarPage