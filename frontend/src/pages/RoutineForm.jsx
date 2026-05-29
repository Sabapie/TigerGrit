import { useEffect, useState } from 'react'
import { useParams, Link, useNavigate} from 'react-router-dom' // Hook para obtener parámetros de la URL
import axios from 'axios'
import Button from '../components/ui/Button'
import  Input from '../components/ui/Input'
import FormField from '../components/ui/FormField'
import ExerciseCard from '../components/ui/ExerciseCard'
import ExerciseFilter from '../components/ui/Filter'

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
  
  // Filtro 
  const [filteredExercises, setFilteredExercises] = useState([])
    
    useEffect(() => {
      setFilteredExercises(exercises)
    }, [exercises])


  return (
  <main className="min-h-screen flex flex-col px-4 py-8 font-sans items-center">
    <div className="bg-zinc-900 border border-zinc-800 rounded-2xl p-8 w-full max-w-[1500px] flex flex-col gap-5">

      <h1 className="text-white text-2xl font-semibold tracking-tight">
        {id ? 'Editar rutina' : 'Crear rutina'}
      </h1>

      <FormField
        label="Nombre rutina*"
        value={name}
        placeholder="Nombre de la rutina"
        onChange={(e) => setName(e.target.value)}
        error={submitted ? errors.name : ''}
      />
      <FormField
        label="Descripción"
        value={description}
        placeholder="Descripción"
        onChange={(e) => setDescription(e.target.value)}
        multiline
      />

      {/* EJERCICIOS */}
      <div className="flex flex-col gap-3">
        <div className="flex items-center justify-between">
          <h2 className="text-white font-semibold text-lg">Ejercicios</h2>
          <span className="text-zinc-500 text-sm">
            {selectedExercises.length} seleccionados
          </span>
        </div>
      <ExerciseFilter
          exercises={exercises}
          onFilter={setFilteredExercises}
        />
      </div>
        {/* Slider */}
        <div className="relative">
          <div className="flex gap-3 overflow-x-auto pb-3 scroll-smooth snap-x snap-mandatory"
            style={{ scrollbarWidth: 'thin', scrollbarColor: '#f46701 #27272a' }}
          >
            {filteredExercises.map((exercise) => {
              const isSelected = selectedExercises.includes(Number(exercise.id))
              return (
                <div
                  key={exercise.id}
                  className="relative shrink-0 w-48 snap-start cursor-pointer"
                  onClick={() => {
                    const exId = Number(exercise.id)
                    if (isSelected) {
                      setSelectedExercises(selectedExercises.filter(i => i !== exId))
                    } else {
                      setSelectedExercises([...new Set([...selectedExercises, exId])])
                    }
                  }}
                >
                  {/* Checkbox visual */}
                  <div className={`
                    absolute top-2 left-2 z-10 w-5 h-5 rounded-md border-2 flex items-center justify-center transition
                    ${isSelected
                      ? 'bg-tigergrit border-tigergrit'
                      : 'bg-zinc-900/70 border-zinc-600'
                    }
                  `}>
                    {isSelected && (
                      <svg className="w-3 h-3 text-zinc-900" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                      </svg>
                    )}
                  </div>

                  {/* Ring de selección */}
                  <div className={`rounded-2xl overflow-hidden border-2 transition ${isSelected ? 'border-tigergrit' : 'border-transparent'}`}>
                    <ExerciseCard
                      exercise={exercise}
                      onSelect={() => {}}
                    />
                  </div>
                </div>
              )
            })}
          </div>
        </div>

        {/* Seleccionados como lista compacta */}
        {selectedExercises.length > 0 && (
          <div className="flex flex-col gap-2 mt-2">
            <p className="text-zinc-500 text-xs uppercase tracking-widest">Seleccionados</p>
            {exercises
              .filter(ex => selectedExercises.includes(Number(ex.id)))
              .map(ex => (
                <ExerciseCard
                  key={ex.id}
                  exercise={ex}
                  compact
                  onSelect={() => {
                    setSelectedExercises(selectedExercises.filter(i => i !== Number(ex.id)))
                  }}
                />
              ))
            }
          </div>
        )}

      <Button onClick={saveRoutine}>
        {id ? 'Actualizar' : 'Crear'}
      </Button>
      </div>
    </main>
)
}

export default RoutineForm