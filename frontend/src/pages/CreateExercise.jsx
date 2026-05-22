import { useState } from 'react'
import axios from 'axios'

function CreateExercise() {

  const [name, setName] = useState('')
  const [duration, setDuration] = useState('')
  const [repetitions, setRepetitions] = useState('')
  const [sets, setSets] = useState('')
  const [muscleGroup, setMuscleGroup] = useState('')
  const [muscleArea, setMuscleArea] = useState('')

  const createExercise = async () => {

    const token = localStorage.getItem('token')

    try {

      await axios.post(

        `${import.meta.env.VITE_API_URL}/exercises`,

        {
        name,
        image: image || 'https://via.placeholder.com/150',
        description: description || null,
        observations: observations || null,
        duration,
        repetitions,
        sets,
        weight: weight || 0,
        rest: rest || 0,
        muscle_group: muscleGroup,
        muscle_area: muscleArea
        },

        {
          headers: {
            Authorization: `Bearer ${token}`
          }
        }

      )

      alert('Ejercicio creado')

    } catch (error) {

      console.error(error)

    }
  }

  return (

    <div>

      <h1>Crear ejercicio</h1>

      <input
        placeholder="Nombre"
        onChange={(e) => setName(e.target.value)}
      />

      <input
        placeholder="Duración"
        onChange={(e) => setDuration(e.target.value)}
      />

      <input
        placeholder="Repeticiones"
        onChange={(e) => setRepetitions(e.target.value)}
      />

      <input
        placeholder="Series"
        onChange={(e) => setSets(e.target.value)}
      />

      <input
        placeholder="Grupo muscular"
        onChange={(e) => setMuscleGroup(e.target.value)}
      />

      <input
        placeholder="Area muscular"
        onChange={(e) => setMuscleGroup(e.target.value)}
      />

      <button onClick={createExercise}>
        Crear
      </button>
    </div>
  )
}

export default CreateExercise