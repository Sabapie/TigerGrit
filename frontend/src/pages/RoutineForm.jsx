import { useEffect, useState } from 'react'
import { useParams, Link, useNavigate} from 'react-router-dom' // Hook para obtener parámetros de la URL
import axios from 'axios'
import Button from '../components/ui/Button'
import  Input from '../components/ui/Input'
import FormField from '../components/ui/FormField'

function RoutineForm() {

  const [description, setDescription] = useState('')
  const [exercises, setExercises] = useState([])
  const [selectedExercises, setSelectedExercises] = useState([])
  const [name, setName] = useState('')

  const { id } = useParams()
  const navigate = useNavigate()

  useEffect(() => {
    init()
  }, [])

  const init = async () => {
    await getExercises()  // Espera a que carguen los ejercicios
    if (id) {
      await getRoutine()  // Carga la rutina con los checks
    }
  }

  const getRoutine = async () => { // Llama a la API para obtener los datos de la rutina seleccionada

    const token = localStorage.getItem('token')

    try {

      const response = await axios.get(

        `${import.meta.env.VITE_API_URL}/routines/${id}`,

        {
          headers: {
            Authorization: `Bearer ${token}`
          }
        }

      )

      const routine = response.data

      setName(routine.name)

      setDescription(
        routine.description || ''
      )

      setSelectedExercises(

        routine.exercises.map(
          exercise => exercise.id
        )

      )

    } catch (error) {

      console.error(error)

    }
  }

  const getExercises = async () => {

    // Llama a la API para obtener los ejercicios

    try {

    const token = localStorage.getItem('token')

    const response = await axios.get(
        `${import.meta.env.VITE_API_URL}/exercises`,
            
        {
          headers: {
            Authorization: `Bearer ${token}`
          }
        }
        
    )

      setExercises(response.data)

    } catch (error) {

      console.error(error)

    }
  }

  const [errors, setErrors] = useState({})
  const [submitted, setSubmitted] = useState(false) // Control de errores

  const validate = () => {
    const newErrors = {}
    if (!name) newErrors.name = 'El nombre es obligatorio'
    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const saveRoutine = async () => {

    setSubmitted(true)

    if (!validate()) return

    const token = localStorage.getItem('token')

    try {

      let routineResponse

      const data = {

        name,
        description

      }

      if (id) {

        // EDITAR

        routineResponse = await axios.put(

          `${import.meta.env.VITE_API_URL}/routines/${id}`,

          data,

          {
            headers: {
              Authorization: `Bearer ${token}`
            }
          }

        )

      } else {

        // CREAR

        routineResponse = await axios.post(

          `${import.meta.env.VITE_API_URL}/routines`,

          data,

          {
            headers: {
              Authorization: `Bearer ${token}`
            }
          }

        )
      }

      const routineId =
        routineResponse.data.id

      // sincronizar ejercicios

      await axios.post(

        `${import.meta.env.VITE_API_URL}/routines/${routineId}/sync-exercises`,

        {
          exercises: selectedExercises
        },

        {
          headers: {
            Authorization: `Bearer ${token}`
          }
        }

      )

      alert(

        id
          ? 'Rutina actualizada'
          : 'Rutina creada'

      )

      navigate('/routines')

    } catch (error) {

      console.error(error)

    }
  }
  return (

    <main className="min-h-screen flex justify-center px-4 py-8 font-sans">
      <div className="bg-zinc-900 border border-zinc-800 rounded-2xl p-8 w-full max-w-2xl flex flex-col gap-5">

        <h1>Crear rutina</h1>

        <FormField label="Nombre rutina*" value={name} placeholder="Nombre de la rutina" onChange={(e) => setName(e.target.value)} error={submitted ? errors.name : ''}/>
        <FormField label="Descripción" value={description} placeholder="Descripción" onChange={(e) => setDescription(e.target.value)} />

        <h2>Ejercicios</h2>

        {
          exercises.map((exercise) => (

            <div key={exercise.id}>

              < Input
                type="checkbox"
                value={exercise.id}
                checked={selectedExercises.includes(Number(exercise.id))}

                onChange={(e) => {

                  const id = Number(e.target.value)

                  if (e.target.checked) {

                      setSelectedExercises([

                        ...new Set([

                          ...selectedExercises,
                          id

                        ])

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
      <Button onClick={saveRoutine}>

        {
          id
            ? 'Actualizar'
            : 'Crear'
        }

      </Button>
      </div>
    </main>
  )
}

export default RoutineForm