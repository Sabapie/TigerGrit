import Modal from './Modal'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'
import Button from '../ui/Button'

import placeholderImg from '../../assets/TigerGrit.png' // imagen placeholder

function ExerciseModal({ exercise, isOpen, onClose, onDelete }) {
    const getImageUrl = (image) => {
        if (!image) return null
        if (image.startsWith('http')) return image  // ya es URL completa
        return `http://localhost/GitHub/TigerGrit/backend/public/storage/${image}`
    }

    const navigate = useNavigate()

    async function deleteExercise() {
    const token = localStorage.getItem('token')
    try {
        await axios.delete(`${import.meta.env.VITE_API_URL}/exercises/${exercise.id}`, {
        headers: { Authorization: `Bearer ${token}` }
        })
        onDelete()
    } catch (error) {
        console.error('Error deleting exercise:', error)
    }
    }

    if (!exercise) return null

    return (
    <Modal isOpen={isOpen} onClose={onClose}>

        {/* Acciones */}
        <div className="absolute top-4 right-4 flex gap-2">
            <Button
            variant="secondary"
            onClick={() => { onClose(); navigate(`/exercise-form/${exercise.id}`) }}
            >
            ✏️ Editar
            </Button>
            {exercise.user_id !== null && (
            <Button
                variant="danger"
                onClick={(e) => { e.stopPropagation(); deleteExercise() }}
            >
                🗑️ Eliminar
            </Button>
            )}
        </div>

        {/* Cabecera */}
        <div className="flex gap-4 mb-6 pr-36">
            {exercise.image
            ? <img src={getImageUrl(exercise.image)} alt={exercise.name} className="w-full h-full object-cover" />
            : <div className="w-20 h-20 rounded-xl bg-zinc-800 shrink-0 flex items-center justify-center text-zinc-500 text-2xl"><img src={placeholderImg} alt='Sin imagen' className="grayscale opacity-30"/></div>
            }
            <div>
            <p className="text-xs text-zinc-500 uppercase tracking-widest mb-1">
                {exercise.muscle_group} · {exercise.muscle_area}
            </p>
            <h1 className="text-2xl text-white font-bold leading-tight">{exercise.name}</h1>
            {exercise.description && (
                <p className="text-zinc-400 text-sm mt-1">{exercise.description}</p>
            )}
            {exercise.user_id === null && (
                <span className="inline-block mt-2 text-xs bg-tigergrit/20 text-tigergrit px-2 py-0.5 rounded-full">oficial</span>
            )}
            </div>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-2 gap-3 mb-4">
            <div className="bg-zinc-800 rounded-xl p-3">
            <p className="text-zinc-500 text-xs uppercase tracking-wider mb-1">Series</p>
            <p className="text-tigergrit text-2xl font-bold">{exercise.sets}</p>
            </div>
            <div className="bg-zinc-800 rounded-xl p-3">
            <p className="text-zinc-500 text-xs uppercase tracking-wider mb-1">Repeticiones</p>
            <p className="text-tigergrit text-2xl font-bold">{exercise.repetitions}</p>
            </div>
            <div className="bg-zinc-800 rounded-xl p-3">
            <p className="text-zinc-500 text-xs uppercase tracking-wider mb-1">Duración</p>
            <p className="text-white text-xl font-bold">
                {Math.floor(exercise.duration / 60)}m {exercise.duration % 60}s
            </p>
            </div>
            <div className="bg-zinc-800 rounded-xl p-3">
            <p className="text-zinc-500 text-xs uppercase tracking-wider mb-1">Descanso</p>
            <p className="text-white text-xl font-bold">
                {exercise.rest
                ? `${Math.floor(exercise.rest / 60)}m ${exercise.rest % 60}s`
                : '—'
                }
            </p>
            </div>
            {exercise.weight > 0 && (
            <div className="bg-zinc-800 rounded-xl p-3 col-span-2">
                <p className="text-zinc-500 text-xs uppercase tracking-wider mb-1">Peso</p>
                <p className="text-white text-xl font-bold">
                {exercise.weight} {exercise.weight_unit ?? 'kg'}
                </p>
            </div>
            )}
        </div>

        {/* Observaciones */}
        {exercise.observations && (
            <div className="bg-zinc-800 rounded-xl p-3 border border-zinc-700">
            <p className="text-zinc-500 text-xs uppercase tracking-wider mb-2">Observaciones</p>
            <p className="text-zinc-300 text-sm leading-relaxed">{exercise.observations}</p>
            </div>
        )}

    </Modal>
)
}

export default ExerciseModal