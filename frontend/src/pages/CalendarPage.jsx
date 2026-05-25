import { useState } from 'react'
import Calendar from 'react-calendar'
import 'react-calendar/dist/Calendar.css'
import { useEffect } from 'react'
import axios from 'axios'
import Button from '../components/ui/Button'

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

    <div>

      <h1>Calendario</h1>

      <Calendar // calendario modificado para mostrar las rutinas programadas
        onChange={setDate}

        value={date}

        tileContent={({ date }) => {

          const formattedDate =
            date.toISOString().split('T')[0]

          const routinesForDay =
            scheduledRoutines.filter(

              (routine) =>
                routine.scheduled_date === formattedDate

            )

          return (

            <div>

              {
                routinesForDay.map((routine) => (

                  <p
                    key={routine.id}
                    className="text-xs text-blue-500"
                  >

                    {routine.routine.name}

                  </p>

                ))
              }

            </div>

          )
        }}
      />

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

      <Button onClick={assignRoutine}>
        Añadir rutina
      </Button>

      <Button onClick={deleteRoutine}>
        Eliminar rutina
      </Button>
    </div>
  )
}

export default CalendarPage