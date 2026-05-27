import { useState, useEffect } from 'react'
import { useParams, Link, useNavigate} from 'react-router-dom' // Hook para obtener parámetros de la URL
import axios from 'axios'
import Button from '../components/ui/Button'
import  Input from '../components/ui/Input'


const MUSCLE_GROUPS = { // Objeto para mapear grupos musculares a áreas musculares específicas
  'Pecho':    ['Pectoral superior', 'Pectoral medio', 'Pectoral inferior'],
  'Espalda':  ['Dorsal', 'Dorsal medio', 'Lumbar', 'Trapecio'],
  'Hombro':   ['Deltoides anterior', 'Deltoides lateral', 'Deltoides posterior'],
  'Bíceps':   ['Bíceps', 'Braquial'],
  'Tríceps':  ['Tríceps'],
  'Piernas':  ['Cuádriceps', 'Isquiotibiales', 'Gemelos', 'Aductores'],
  'Glúteo':   ['Glúteo mayor', 'Glúteo medio'],
  'Core':     ['Abdomen', 'Oblicuos', 'Transverso'],
  'General':  ['Cardio'],
}

function ExerciseForm() {

  // Estados para cada campo del formulario
  const [name, setName] = useState('')
  const [description, setDescription] = useState('')
  const [observations, setObservations] = useState('')
  const [image, setImage] = useState(null)
  const [imagePreview, setImagePreview] = useState(null)
  const [duration, setDuration] = useState(60)
  const [rest, setRest] = useState(60)
  const [repetitions, setRepetitions] = useState(10)
  const [sets, setSets] = useState(3)
  const [weight, setWeight] = useState(0)
  const [weightUnit, setWeightUnit] = useState('kg')
  const [muscleGroup, setMuscleGroup] = useState('')
  const [muscleArea, setMuscleArea] = useState('')

  const { id } = useParams() // Obtiene el ID de la rutina de los parámetros de la URL
  const navigate = useNavigate()

  useEffect(() => {

    if (id) {

      getExercise()

    }

  }, [])

  const getExercise = async () => { // Llama a la API para obtener los datos de la rutina seleccionada

    const token = localStorage.getItem('token')

    try {

      const response = await axios.get(

        `${import.meta.env.VITE_API_URL}/exercises/${id}`,

        {
          headers: {
            Authorization: `Bearer ${token}`
          }
        }

      )

      const exercise = response.data

      setName(exercise.name)
      setDescription(exercise.description || '')
      setObservations(exercise.observations || '')
      setImage(exercise.image || '')
      setDuration(exercise.duration)
      setRest(exercise.rest)
      setRepetitions(exercise.repetitions)
      setSets(exercise.sets)
      setWeight(exercise.weight)
      setImagePreview(  // carga la preview de la imagen
        exercise.image
          ? `http://localhost/GitHub/TigerGrit/backend/public/storage/${exercise.image}`
          : null
      ) 
      setWeightUnit(exercise.weight_unit)
      setMuscleGroup(exercise.muscle_group)
      setMuscleArea(exercise.muscle_area)

    } catch (error) {

      console.error(error)

    }
  }

  const saveExercise = async () => {

    const token = localStorage.getItem('token')

    const data = new FormData() // Usamos FormData para enviar archivos

    data.append('name', name)
    data.append('image', image || null)
    data.append('description', description || null)
    data.append('observations', observations || null)
    data.append('duration', duration)
    data.append('repetitions', repetitions)
    data.append('sets', sets)
    data.append('weight', weight || 0)
    data.append('weight_unit', weightUnit)
    data.append('rest', rest)
    data.append('muscle_group', muscleGroup)
    data.append('muscle_area', muscleArea)


    try {

      if (id) {

        // EDITAR

        await axios.put(

          `${import.meta.env.VITE_API_URL}/exercises/${id}`,

          data,

          {
            headers: {
              Authorization: `Bearer ${token}`,
              'Content-Type': 'multipart/form-data'
            }
          }

        )

        alert('Ejercicio actualizado')
        navigate('/exercises')

      } else {

        // CREAR

        await axios.post(

          `${import.meta.env.VITE_API_URL}/exercises`,

          data,

          {
            headers: {
              Authorization: `Bearer ${token}`,
              'Content-Type': 'multipart/form-data'
            }
          }

        )

        alert('Ejercicio creado')
        navigate('/exercises')
      }

    } catch (error) {

      console.error(error)

    }
  }

  return (

    <div>

      <h1>Crear ejercicio</h1>

      < Input
        placeholder="Nombre"
        onChange={(e) => setName(e.target.value)}
        value={name}
      />

      < Input
        placeholder="Descripción"
        onChange={(e) => setDescription(e.target.value)}
        value={description}
      />

      < Input
        placeholder="Observaciones"
        onChange={(e) => setObservations(e.target.value)}
        value={observations}
      />

      {
        imagePreview &&
        <img
          src={imagePreview}
          alt="Preview"
          style={{ width: '200px', height: '200px', objectFit: 'cover' }}
        />
      }

      <Input
        type="file"
        accept="image/*"
        onChange={(e) => {

          const file = e.target.files[0]

          setImage(file)

          if (file) {

            setImagePreview(
              URL.createObjectURL(file)
            )
          }
        }}
      />

      < Input
        type="number"
        min="0"
        value={duration}
        onChange={(e) =>
          setDuration(e.target.value)
        }
      />

      < Input
        type="number"
        min="1"
        value={repetitions}
        onChange={(e) =>
          setRepetitions(e.target.value)
        }
      />

      < Input
        type="number"
        min="1"
        value={sets}
        onChange={(e) =>
          setSets(e.target.value)
        }
      />

      < Input
        type="number"
        min="0"
        value={rest}
        onChange={(e) =>
          setRest(e.target.value)
        }
      />

      < Input
        type="number"
        min="0"
        step="0.5"
        value={weight}
        onChange={(e) =>
          setWeight(e.target.value)
        }
      />

      <select
        onChange={(e) =>
          setWeightUnit(e.target.value)
        }
        value={weightUnit}
      >

        <option value="kg">
          kg
        </option>

        <option value="lb">
          lb
        </option>

      </select>

      <select
        value={muscleGroup}
        onChange={(e) => {

          setMuscleGroup(e.target.value)

          setMuscleArea('')

        }}
      >

        <option value="">
          Selecciona grupo muscular
        </option>

        {
          Object.keys(MUSCLE_GROUPS).map(group => (

            <option
              key={group}
              value={group}
            >

              {group}

            </option>

          ))
        }

      </select>

      <select
        value={muscleArea}
        onChange={(e) =>
          setMuscleArea(e.target.value)
        }
      >

        <option value="">
          Selecciona el área muscular
        </option>

        {
          muscleGroup &&
          MUSCLE_GROUPS[muscleGroup].map(area => (

            <option
              key={area}
              value={area}
            >

              {area}

            </option>

          ))
        }

      </select>

      <Button onClick={saveExercise}>

        {
          id
            ? 'Actualizar'
            : 'Crear'
        }

      </Button>
    </div>
  )
}

export default ExerciseForm