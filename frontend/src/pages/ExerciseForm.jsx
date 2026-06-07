import { useState, useEffect, useRef } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import axios from 'axios'
import Button from '../components/ui/Button'
import FormField from '../components/ui/FormField'
import SelectField from '../components/ui/SelectField'
import DigitalClock from '../components/ui/DigitalClock'
import NumberStepper from '../components/ui/NumberStepper'
import ConfirmModal from '../components/layout/ConfirmationModal'
import Toast from '../components/ui/Toast'
import { useToast } from '../hooks/useToast'

import placeholderImg from '/TigerGrit.png'

const MUSCLE_GROUPS = {
  'Pecho': ['Pectoral superior', 'Pectoral medio', 'Pectoral inferior'],
  'Espalda': ['Dorsal', 'Dorsal medio', 'Lumbar', 'Trapecio'],
  'Hombro': ['Deltoides anterior', 'Deltoides lateral', 'Deltoides posterior'],
  'Bíceps': ['Bíceps', 'Braquial'],
  'Tríceps': ['Tríceps'],
  'Piernas': ['Cuádriceps', 'Isquiotibiales', 'Gemelos', 'Aductores'],
  'Glúteo': ['Glúteo mayor', 'Glúteo medio'],
  'Core': ['Abdomen', 'Oblicuos', 'Transverso'],
  'General': ['Cardio'],
}

function ExerciseForm() {

  const fileInputRef = useRef(null)

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
  const [oficial, setOficial] = useState(false)
  const { toast, showToast, hideToast } = useToast() // apertura del toast

  const [errors, setErrors] = useState({})
  const [serverErrors, setServerErrors] = useState({})
  const [submitted, setSubmitted] = useState(false)

  const { id } = useParams()
  const navigate = useNavigate()
  const [isConfirmOpen, setIsConfirmOpen] = useState(false)

  const handleImageFile = (e) => {
    const file = e.target.files[0]
    if (!file) return
    setImage(file)
    setImagePreview(URL.createObjectURL(file))
  }

  const KG_TO_LB = 2.20462
  const LB_TO_KG = 1 / KG_TO_LB

  const changeUnit = (newUnit) => {
    setWeight(prev => {
      if (newUnit === weightUnit) return prev
      return newUnit === 'lb' ? prev * KG_TO_LB : prev * LB_TO_KG
    })
    setWeightUnit(newUnit)
  }

  const step = weightUnit === 'kg' ? 2.5 : 2.5 * KG_TO_LB

  useEffect(() => {
    if (id) getExercise()
  }, [])

  const getExercise = async () => {
    const token = localStorage.getItem('token')
    try {
      const response = await axios.get(
        `${import.meta.env.VITE_API_URL}/exercises/${id}`,
        { headers: { Authorization: `Bearer ${token}` } }
      )
      const exercise = response.data

      setName(exercise.name || '')
      setDescription(exercise.description || '')
      setObservations(exercise.observations || '')
      setDuration(Number(exercise.duration) || 60)
      setRest(Number(exercise.rest) || 0)
      setRepetitions(Number(exercise.repetitions) || 10)
      setSets(Number(exercise.sets) || 3)
      setWeight(parseFloat(exercise.weight) || 0)
      setWeightUnit(exercise.weight_unit || 'kg')
      setMuscleGroup(exercise.muscle_group || '')
      setMuscleArea(exercise.muscle_area || '')
      setOficial(exercise.is_official || false)

      if (exercise.image) {
        setImage(exercise.image)
        setImagePreview(
          `${import.meta.env.VITE_API_URL.replace('/api', '')}/storage/${exercise.image}`
        )
      }
    } catch (error) {
      console.error(error)
    }
  }

  const validate = () => {
    const newErrors = {}
    if (!name) newErrors.name = 'El nombre es obligatorio'
    if (!muscleGroup) newErrors.muscleGroup = 'El grupo muscular es obligatorio'
    if (!muscleArea) newErrors.muscleArea = 'El area muscular es obligatoria'
    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  // Helper: combina errores locales y del servidor
  const fieldError = (field) =>
    serverErrors[field]?.[0] ?? (submitted ? errors[field] : '')

  const saveExercise = async () => {
    setSubmitted(true)
    setServerErrors({})
    if (!validate()) return

    const token = localStorage.getItem('token')
    const data = new FormData()

    if (id) data.append('_method', 'PUT')

    data.append('name', name)
    data.append('description', description || '')
    data.append('observations', observations || '')
    data.append('duration', Number(duration))
    data.append('repetitions', Number(repetitions))
    data.append('sets', Number(sets))
    data.append('weight', Number(weight) || 0)
    data.append('weight_unit', weightUnit)
    data.append('rest', Number(rest))
    data.append('muscle_group', muscleGroup)
    data.append('muscle_area', muscleArea)
    if (image instanceof File) data.append('image', image)

    try {
      await axios.post(
        id
          ? `${import.meta.env.VITE_API_URL}/exercises/${id}`
          : `${import.meta.env.VITE_API_URL}/exercises`,
        data,
        { headers: { Authorization: `Bearer ${token}`, 'Content-Type': 'multipart/form-data' } }
      )
      showToast(id ? 'Ejercicio editado correctamente' : 'Ejercicio creado correctamente', 'success')
      navigate('/exercises')
    } catch (error) {
      if (error.response?.status === 422) {
        setServerErrors(error.response.data.errors)
        showToast('Revisa los campos obligatorios', 'warning')
      } else {
        console.error('Error inesperado:', error.response?.data)
        showToast('Error inesperado al guardar el ejercicio', 'error')
      }
    }
  }

  const cancelForm = () => {
    navigate('/exercises')
  }

  return (
    <main className="flex flex-col items-center px-6 gap-6">
      <div className="bg-[#1A1A1A] border-x border-zinc-800 w-full max-w-[1500px] p-4 flex flex-col gap-5">

        <h1 className="text-white text-2xl font-semibold tracking-tight">
          {id ? 'Editar ejercicio' : 'Nuevo ejercicio'}
        </h1>

        {/* Aviso si es oficial */}
        {oficial && (
          <p className="text-xs text-tigergrit bg-tigergrit/10 px-3 py-1 rounded-full w-fit">
            Al editar un ejercicio oficial se creara un ejercicio nuevo con los cambios
          </p>
        )}

        {/* IMAGEN */}
        <div className="flex gap-4 items-start">
          <div className="w-24 h-24 rounded-xl bg-zinc-800 border border-zinc-700 flex items-center justify-center shrink-0 overflow-hidden">
            {imagePreview
              ? <img src={imagePreview} alt="preview" className="w-full h-full object-cover" />
              : <span className="text-zinc-500 text-xs text-center"><img src={placeholderImg} alt='Introduce imagen' className="grayscale opacity-30" /></span>
            }
          </div>
          <div className="flex-1 flex flex-col flex-wrap gap-1">
            <FormField
              ref={fileInputRef}
              className="hidden"
              label="Introduce una imagen para tu ejercicio"
              type="file"
              accept="image/*"
              onChange={handleImageFile}
            />
            {/* Error de imagen del servidor */}
            {serverErrors.image && (
              <p className="text-red-400 text-xs mt-1">{serverErrors.image[0]}</p>
            )}
            <div className='flex flex-row gap-5'>
              <Button type="button" onClick={() => fileInputRef.current.click()} variant='primary'>
                Subir imagen
              </Button>
              <Button type="button" onClick={() => { setImage(null); setImagePreview(null) }} variant='secondary'>
                Borrar imagen
              </Button>
            </div>
          </div>
        </div>

        {/* NOMBRE */}
        <div className="flex flex-col gap-1">
          <FormField
            label="Nombre*"
            value={name}
            placeholder="Nombre del ejercicio..."
            onChange={(e) => setName(e.target.value)}
            error={fieldError('name')}
          />
        </div>

        {/* DESCRIPCIÓN */}
        <div className="flex flex-col gap-1">
          <FormField
            label="Descripción"
            value={description}
            placeholder="Descripción del ejercicio..."
            onChange={(e) => setDescription(e.target.value)}
          />
        </div>

        {/* GRUPO Y ÁREA MUSCULAR */}
        <div className="flex gap-4 flex-wrap">
          <div className="flex-1 flex flex-col gap-1">
            <SelectField
              label="Grupo muscular*"
              value={muscleGroup}
              onChange={(e) => { setMuscleGroup(e.target.value); setMuscleArea('') }}
              options={Object.keys(MUSCLE_GROUPS)}
              placeholder="Seleccionar grupo..."
              error={fieldError('muscleGroup')}
            />
          </div>
          <div className="flex-1 flex flex-col gap-1">
            <SelectField
              label="Area muscular*"
              value={muscleArea}
              disabled={!muscleGroup}
              onChange={(e) => setMuscleArea(e.target.value)}
              options={muscleGroup ? MUSCLE_GROUPS[muscleGroup] : []}
              placeholder="Seleccionar grupo..."
              error={fieldError('muscleArea')}
            />
          </div>
        </div>

        {/* DURACIÓN Y DESCANSO */}
        <div className="flex gap-4 flex-wrap">
          <DigitalClock value={duration} onChange={setDuration} label="Duración" />
          <DigitalClock value={rest} onChange={setRest} label="Descanso" step={15} />
        </div>

        {/* SERIES, REPS, PESO */}
        <div className="flex gap-4 flex-wrap">
          <NumberStepper label="Series" value={sets} onChange={setSets} min={1} max={20} step={1} />
          <NumberStepper label="Repeticiones" value={repetitions} onChange={setRepetitions} min={1} max={100} step={1} />

          <div className="flex flex-col gap-1 flex-1 min-w-[120px]">
            <NumberStepper label="Peso" value={Number(weight).toFixed(2)} onChange={setWeight} min={0} max={995} step={step} />
            <div className="flex gap-1 mt-1">
              {['kg', 'lb'].map(u => (
                <button
                  key={u}
                  type="button"
                  onClick={() => changeUnit(u)}
                  className={`flex-1 py-1 rounded-md text-xs border transition font-medium
                    ${weightUnit === u
                      ? 'bg-tigergrit border-tigergrit text-white'
                      : 'bg-transparent border-zinc-700 text-zinc-500 hover:text-white'
                    }`}
                >{u}</button>
              ))}
            </div>
          </div>
        </div>

        {/* OBSERVACIONES */}
        <div className="flex flex-col gap-1">
          <label className="text-zinc-500 text-xs font-medium uppercase tracking-widest">Observaciones</label>
          <textarea
            value={observations}
            className="bg-zinc-800 border border-zinc-700 rounded-lg px-3 py-2 text-white text-sm outline-none focus:ring-2 focus:ring-tigergrit w-full resize-y min-h-[72px] font-sans"
            placeholder="Notas adicionales..."
            onChange={(e) => setObservations(e.target.value)}
          />
        </div>

        <Button onClick={saveExercise} variant='primary'>
          {id ? 'Confirmar edición' : 'Crear ejercicio'}
        </Button>
        <Button onClick={() => setIsConfirmOpen(true)} variant='secondary'>
          {id ? 'Cancelar edición' : 'Volver'}
        </Button>

      </div>

      <ConfirmModal
        isOpen={isConfirmOpen}
        onClose={() => setIsConfirmOpen(false)}
        onConfirm={() => { cancelForm() }}
        title="Salir del formulario"
        message="Si sales del formulario los datos introducidos desapareceran"
        confirmText="Salir"
        cancelText="Cancelar"
      />

    </main>
  )
}

export default ExerciseForm