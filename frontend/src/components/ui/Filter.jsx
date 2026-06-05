import { useState, useEffect } from 'react'
import SelectField from './SelectField'
import Button from './Button'
import FormField from './FormField'

const MUSCLE_GROUP_OPTIONS = [

  { value: '', label: 'Todos' },

  { value: 'Pecho', label: 'Pecho' },
  { value: 'Espalda', label: 'Espalda' },
  { value: 'Hombro', label: 'Hombro' },
  { value: 'Bíceps', label: 'Bíceps' },
  { value: 'Tríceps', label: 'Tríceps' },
  { value: 'Piernas', label: 'Piernas' },
  { value: 'Glúteo', label: 'Glúteo' },
  { value: 'Core', label: 'Core' },
  { value: 'General', label: 'General' },

]

const MUSCLE_AREA_OPTIONS = [

  { value: '', label: 'Todas' },

  { value: 'Pectoral superior', label: 'Pectoral superior' },
  { value: 'Pectoral medio', label: 'Pectoral medio' },
  { value: 'Pectoral inferior', label: 'Pectoral inferior' },

  { value: 'Dorsal', label: 'Dorsal' },
  { value: 'Trapecio', label: 'Trapecio' },
  { value: 'Lumbar', label: 'Lumbar' },

  { value: 'Deltoides anterior', label: 'Deltoides anterior' },
  { value: 'Deltoides lateral', label: 'Deltoides lateral' },
  { value: 'Deltoides posterior', label: 'Deltoides posterior' },

  { value: 'Bíceps', label: 'Bíceps' },
  { value: 'Braquial', label: 'Braquial' },

  { value: 'Tríceps', label: 'Tríceps' },

  { value: 'Cuádriceps', label: 'Cuádriceps' },
  { value: 'Isquiotibiales', label: 'Isquiotibiales' },
  { value: 'Gemelos', label: 'Gemelos' },

  { value: 'Abdomen', label: 'Abdomen' },
  { value: 'Oblicuos', label: 'Oblicuos' },

]

const EXERCISE_TYPE_OPTIONS = [

  { value: '', label: 'Todos' },

  { value: 'official', label: 'Oficiales' },

  { value: 'user', label: 'Usuario' },

]

function ExerciseFilter({ exercises, onFilter, onlySearch = false }) {

  const [search, setSearch] = useState('')
  const [muscleGroup, setMuscleGroup] = useState('')
  const [muscleArea, setMuscleArea] = useState('')
  const [exerciseType, setExerciseType] = useState('')
  const [createdDate, setCreatedDate] = useState('')

  useEffect(() => {
    filterExercises()
  }, [search, muscleGroup, muscleArea, exerciseType])

  const filterExercises = () => {

    let filtered = [...exercises]

    // Buscar por nombre
    if (search) {

      filtered = filtered.filter(exercise =>

        exercise.name
          .toLowerCase()
          .includes(search.toLowerCase())

      )
    }

    // Grupo muscular
    if (muscleGroup) {

      filtered = filtered.filter(exercise =>

        exercise.muscle_group === muscleGroup

      )
    }

    // Área muscular
    if (muscleArea) {

      filtered = filtered.filter(exercise =>

        exercise.muscle_area === muscleArea

      )
    }

    // Tipo ejercicio
    if (exerciseType === 'official') {

      filtered = filtered.filter(exercise =>

        exercise.is_official

      )
    }

    if (exerciseType === 'user') {

      filtered = filtered.filter(exercise =>

        !exercise.is_official

      )
    }

    onFilter(filtered)
  }

  const clearFilters = () => {

    setSearch('')
    setMuscleGroup('')
    setMuscleArea('')
    setExerciseType('')
    setCreatedDate('')

  }

  if (onlySearch) return (
    <FormField
      placeholder="Buscar ejercicio..."
      value={search}
      className="h-full"
      onChange={(e) =>
        setSearch(e.target.value)
      }
    />
  )

  return (

    <div className="bg-zinc-900 rounded-2xl p-4 flex flex-col gap-4">
      <div className=' flex flex-row gap-5 justify-start items-center'>
        <FormField
          placeholder="Buscar ejercicio..."
          value={search}
          className="h-full"
          onChange={(e) =>
            setSearch(e.target.value)
          }
        />

        <SelectField
          label="Grupo muscular"
          value={muscleGroup}
          onChange={(e) =>
            setMuscleGroup(e.target.value)
          }
          options={MUSCLE_GROUP_OPTIONS}
        />

        <SelectField
          label="Área muscular"
          value={muscleArea}
          onChange={(e) =>
            setMuscleArea(e.target.value)
          }
          options={MUSCLE_AREA_OPTIONS}
        />

        <SelectField
          label="Tipo ejercicio"
          value={exerciseType}
          onChange={(e) =>
            setExerciseType(e.target.value)
          }
          options={EXERCISE_TYPE_OPTIONS}
        />

      </div>


      <Button
        variant="primary"
        onClick={clearFilters}
      >

        Limpiar filtros

      </Button>

    </div>
  )
}

export default ExerciseFilter