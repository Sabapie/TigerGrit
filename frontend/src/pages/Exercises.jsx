import { useEffect, useState } from 'react'
import axios from 'axios'

function Exercises() {

  const [exercises, setExercises] = useState([])

  useEffect(() => {

    getExercises()

  }, [])

  const getExercises = async () => {

    try {

      const response = await axios.get(
        `${import.meta.env.VITE_API_URL}/exercises` // Llama a la API para obtener los ejercicios
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

          <div key={exercise.id}>

            <h2>{exercise.name}</h2>

            <p>{exercise.description}</p>

            <p>
              Grupo muscular:
              {exercise.muscle_group}
            </p>

            <p>
              Series:
              {exercise.sets}
            </p>

            <p>
              Repeticiones:
              {exercise.repetitions}
            </p>

          </div>

        ))
      }

    </div>
  )
}

export default Exercises