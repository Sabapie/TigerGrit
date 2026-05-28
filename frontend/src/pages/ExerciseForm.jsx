import { useState, useEffect } from 'react'
import { useParams, Link, useNavigate} from 'react-router-dom' // Hook para obtener parámetros de la URL
import axios from 'axios'
import Button from '../components/ui/Button'
import FormField from '../components/ui/FormField'
import SelectField from '../components/ui/SelectField'
import DigitalClock from '../components/ui/DigitalClock'
import NumberStepper from '../components/ui/NumberStepper'

import placeholderImg from '../assets/TigerGrit.png' // imagen placeholder
import { useRef } from 'react' // Importa el boton para subir imagen

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

  const fileInputRef = useRef(null)  // Sustitulle el boton con uno nuestro
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

  const handleImageFile = (e) => {
    const file = e.target.files[0]
    if (!file) return
    const reader = new FileReader()
    reader.onload = (ev) => {
      setImagePreview(ev.target.result)
      setImage(ev.target.result)
    }
    reader.readAsDataURL(file)
  }

  // Conversión de kg a lb y viceversa
  const KG_TO_LB = 2.20462;
  const LB_TO_KG = 1 / KG_TO_LB;

  const changeUnit = (newUnit) => { //Función que gestiona el cambio de unidad
    setWeight(prev => {
      if (newUnit === weightUnit) return prev;

      const converted =
        newUnit === "lb"
          ? prev * KG_TO_LB
          : prev * LB_TO_KG;

      return converted;
    });

    setWeightUnit(newUnit);
  };

  const step = //Step dinamico para alterar como se suma segun peso
    weightUnit === "kg"
      ? 2.5
      : 2.5 * KG_TO_LB; // ≈ 5.5


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

  const [errors, setErrors] = useState({})
  const [submitted, setSubmitted] = useState(false) // Control de errores

  const validate = () => {
    const newErrors = {}
    if (!name) newErrors.name = 'El nombre es obligatorio'
    if (!muscleGroup) newErrors.muscleGroup = 'El grupo muscular es obligatorio'
    if (!muscleArea) newErrors.muscleArea = 'El area muscular es obligatoria'
    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const saveExercise = async () => {

    setSubmitted(true)

    if (!validate()) return

    const token = localStorage.getItem('token')

    const data = new FormData() // Usamos FormData para enviar archivos

    data.append('name', name)
    data.append('image', image || null)
    data.append('description', description || null)
    data.append('observations', observations || null)
    data.append('duration', duration || 60)
    data.append('repetitions', repetitions || 1)
    data.append('sets', sets || 0)
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
  <main className="min-h-screen flex justify-center px-4 py-8 font-sans">
    <div className="bg-zinc-900 border border-zinc-800 rounded-2xl p-8 w-full max-w-2xl flex flex-col gap-5">

      <h1 className="text-white text-2xl font-semibold tracking-tight">Nuevo ejercicio</h1>

      {/* IMAGEN */}
      <div className="flex gap-4 items-start">
        <div className="w-24 h-24 rounded-xl bg-zinc-800 border border-zinc-700 flex items-center justify-center shrink-0 overflow-hidden">
          {imagePreview
            ? <img src={imagePreview} alt="preview" className="w-full h-full object-cover" />
            : <span className="text-zinc-500 text-xs text-center"><img src={placeholderImg} alt='Introduce imagen' className="grayscale opacity-30"></img></span>
          }
        </div>
        <div className="flex-1 flex flex-col flex-wrap gap-1">
          <FormField 
          ref={fileInputRef}
          className="hidden"
          label="Introduce una imagen para tu ejercicio"
          type="file" accept="image/*"  onChange={handleImageFile} />

          <div className='flex flex-row gap-5'>
            <Button
              type="button"
              onClick={() => fileInputRef.current.click()}
              variant='primary'
              >
                Subir imagen
            </Button>
            <Button
              type="button"
              onClick={() => { setImage(null); setImagePreview(null) }}
              variant='secondary'
              >
                Borrar imagen
            </Button>
          </div>

        </div>
      </div>

      {/* NOMBRE */}
      <div className="flex flex-col gap-1">
        <FormField
          label="Nombre*"
          placeholder="Nombre del ejercicio..."
          onChange={(e) => setName(e.target.value)}
          error={submitted ? errors.name : ''}
        />
      </div>

      {/* DESCRIPCIÓN */}
      <div className="flex flex-col gap-1">
        <FormField
          label="Descripción"
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
            error={submitted ? errors.muscleGroup : ''}
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
            error={submitted ? errors.muscleArea : ''}
            />
        </div>
      </div>

      {/* DURACIÓN Y DESCANSO */}
      <div className="flex gap-4 flex-wrap">
        <DigitalClock value={duration} onChange={setDuration} label="Duración"/>
        <DigitalClock value={rest} onChange={setRest} label="Descanso" step={15} />
      </div>

      {/* SERIES, REPS, PESO */}
      <div className="flex gap-4 flex-wrap">
        <NumberStepper label="Series" value={sets} onChange={setSets} min={1} max={20} step={1}/>
        <NumberStepper label="Repeticiones" value={repetitions} onChange={setRepetitions} min={1} max={100} step={1}/>
        
        <div className="flex flex-col gap-1 flex-1 min-w-[120px]">
          <NumberStepper label="Peso" value={weight.toFixed(2)} onChange={setWeight} min={0} max={995} step={step}/>
          <div className="flex gap-1 mt-1">
            {['kg', 'lb'].map(u => (
              <button
                key={u}
                type="button"
                onClick={() => changeUnit(u)}
                className={`flex-1 py-1 rounded-md text-xs border transition font-medium
                  ${weightUnit === u
                    ? 'bg-tigergrit border-tigergrit text-zinc-900'
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
          className="bg-zinc-800 border border-zinc-700 rounded-lg px-3 py-2 text-white text-sm outline-none focus:ring-2 focus:ring-tigergrit w-full resize-y min-h-[72px] font-sans"
          placeholder="Notas adicionales..."
          onChange={(e) => setObservations(e.target.value)}
        />
      </div>

      <Button
        onClick={saveExercise}
        variant='primary'    
      >
        Crear ejercicio
      </Button>

    </div>
  </main>
)
}

export default ExerciseForm