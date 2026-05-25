import { useEffect, useState } from 'react'
import axios from 'axios'

function Routines() {

  const [routines, setRoutines] = useState([])

  useEffect(() => {

    getRoutines()

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

  return (

    <div>

      <h1>Mis rutinas</h1>

      {
        routines.map((routine) => (

          <div key={routine.id}>

            <h2>{routine.name}</h2>

            <h3>Ejercicios:</h3>

            {
              routine.exercises.map((exercise) => (

                <p key={exercise.id}>

                  {exercise.name}

                </p>

              ))
            }

          </div>

        ))
      }

    </div>
  )
}

export default Routines