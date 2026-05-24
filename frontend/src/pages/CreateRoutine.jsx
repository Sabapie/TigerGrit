import { useEffect, useState } from 'react'
import axios from 'axios'

function CreateRoutine() {

  const [description, setDescription] = useState('')
  const [exercises, setExercises] = useState([])
  const [selectedExercises, setSelectedExercises] = useState([])
  const [name, setName] = useState('')

  useEffect(() => {

    getExercises()

  }, [])

  const getExercises = async () => {

    // Llama a la API para obtener los ejercicios

    try {

      const response = await axios.get(
        `${import.meta.env.VITE_API_URL}/exercises`
      )

      setExercises(response.data)

    } catch (error) {

      console.error(error)

    }
  }

  const createRoutine = async () => {

    const token = localStorage.getItem('token')

    try {

      // Crear rutina

      const routineResponse = await axios.post(

        `${import.meta.env.VITE_API_URL}/routines`,

        {
          name,
          description
        },

        {
          headers: {
            Authorization: `Bearer ${token}`
          }
        }

      )

      const routineId = routineResponse.data.id

      // Añadir ejercicios

      for (const exerciseId of selectedExercises) {

        await axios.post(

          `${import.meta.env.VITE_API_URL}/routines/${routineId}/exercises`,

          {
            exercise_id: exerciseId
          },

          {
            headers: {
              Authorization: `Bearer ${token}`
            }
          }

        )
      }

      alert('Rutina creada')

    } catch (error) {

      console.error(error)

    }
  }

  return (

    <div>

      <h1>Crear rutina</h1>

      <input
        placeholder="Nombre rutina"
        value={name}
        onChange={(e) =>
          setName(e.target.value)
        }
      />

      <textarea
        placeholder="Descripción"
        value={description}
        onChange={(e) =>
          setDescription(e.target.value)
        }
      />

      <h2>Ejercicios</h2>

      {
        exercises.map((exercise) => (

          <div key={exercise.id}>

            <input
              type="checkbox"
              value={exercise.id}

              onChange={(e) => {

                const id = Number(e.target.value)

                if (e.target.checked) {

                  setSelectedExercises([
                    ...selectedExercises,
                    id
                  ])

                } else {

                  setSelectedExercises(

                    selectedExercises.filter(
                      exerciseId =>
                        exerciseId !== id
                    )

                  )
                }
              }}
            />

            {exercise.name}

          </div>

        ))
      }

      <button onClick={createRoutine}>
        Crear
      </button>

    </div>
  )
}

export default CreateRoutine