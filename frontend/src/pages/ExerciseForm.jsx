import { useState } from 'react'
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

function CreateExercise() {

  // Estados para cada campo del formulario
  const [name, setName] = useState('')
  const [description, setDescription] = useState('')
  const [observations, setObservations] = useState('')
  const [image, setImage] = useState('')
  const [imagePreview, setImagePreview] = useState(null)
  const [duration, setDuration] = useState(60)
  const [rest, setRest] = useState(60)
  const [repetitions, setRepetitions] = useState(10)
  const [sets, setSets] = useState(3)
  const [weight, setWeight] = useState(0)
  const [weightUnit, setWeightUnit] = useState('kg')
  const [muscleGroup, setMuscleGroup] = useState('')
  const [muscleArea, setMuscleArea] = useState('')

  const createExercise = async () => {
    const token = localStorage.getItem('token')
    try {
      await axios.post(
        `${import.meta.env.VITE_API_URL}/exercises`,
        {
          name,
          image: image || null,
          description: description || null,
          observations: observations || null,
          duration,
          repetitions,
          sets,
          weight: weight || 0,
          weight_unit: weightUnit,
          rest,
          muscle_group: muscleGroup,
          muscle_area: muscleArea,
        },
        { headers: { Authorization: `Bearer ${token}` } }
      )
      alert('Ejercicio creado correctamente')
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
      />

      < Input
        placeholder="Descripción"
        onChange={(e) => setDescription(e.target.value)}
      />

      < Input
        placeholder="Observaciones"
        onChange={(e) => setObservations(e.target.value)}
      />

      {
        imagePreview &&

        <img
          src={imagePreview}
          alt="preview"
          width="200"
        />
      }

      < Input
        type="text"
        placeholder="URL imagen"
        value={image}
        onChange={(e) => {

          setImage(e.target.value)

          setImagePreview(e.target.value)

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
        value={weightUnit}
        onChange={(e) =>
          setWeightUnit(e.target.value)
        }
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

      <Button onClick={createExercise}>
        Crear
      </Button>
    </div>
  )
}

export default CreateExercise