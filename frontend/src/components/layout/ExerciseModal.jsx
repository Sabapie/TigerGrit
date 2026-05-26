import Modal from './Modal'
import RutineCard from '../ui/ExerciseCard'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'

function ExerciseModal({exercise, isOpen, onClose, onDelete}) {
    const navigate = useNavigate()

    async function deleteExercise() {
        const token = localStorage.getItem('token')

        try {

            const response = await axios.delete(`${import.meta.env.VITE_API_URL}/exercises/${exercise.id}`,{
                headers: {
                    Authorization: `Bearer ${token}`
                }
            })

            alert('Ejercicio eliminado')
            onDelete() // Refresca la lista de ejercicios

        } catch (error) {
            
            console.error('Error deleting exercise:', error)
        }
    }

    if (!exercise) return null // Si no hay ejercicio seleccionado, no renderizamos nada

    return (

        <Modal
        isOpen={isOpen}
        onClose={onClose}
        >

        <h1 className="text-3xl text-white font-bold mb-4 z-10">

            {exercise.name}

        </h1>

            {
            exercise.user_id !== null && (// Solo muestra el botón de borrar si el ejercicio es del usuario
            <button
            onClick={(e) => {e.stopPropagation()  // evita que abra el modal al borrar
            deleteExercise(exercise.id)}}
            className=" absolute top-4 right-10 text-white"
            >
            🗑️
            </button>
            )}

            <button
            onClick={() => navigate(`/exercise-form/${exercise.id}`)}
            className=" absolute top-4 right-16 text-white"
            >
            ✏️
            </button>

        <div className="space-y-3">
            
            {/* Cabecera */}
            <div className="flex gap-4 mb-6">
                {exercise.image && (
                <img
                    src={exercise.image}
                    alt={exercise.name}
                    className="w-20 h-20 rounded-xl object-cover flex-shrink-0"
                />
                )}
                <div>
                <p className="text-xs text-zinc-500 uppercase tracking-widest mb-1">
                    {exercise.muscle_group} · {exercise.muscle_area}
                </p>
                <h1 className="text-2xl text-white font-bold leading-tight">
                    {exercise.name}
                </h1>
                {exercise.description && (
                    <p className="text-zinc-400 text-sm mt-1">{exercise.description}</p>
                )}
                </div>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-2 gap-3 mb-4">

                <div className="bg-zinc-800 rounded-xl p-3">
                <p className="text-zinc-500 text-xs uppercase tracking-wider mb-1">Series</p>
                <p className="text-white text-xl font-bold">{exercise.sets}</p>
                </div>

                <div className="bg-zinc-800 rounded-xl p-3">
                <p className="text-zinc-500 text-xs uppercase tracking-wider mb-1">Repeticiones</p>
                <p className="text-white text-xl font-bold">{exercise.repetitions}</p>
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
                    {exercise.rest ? `${exercise.rest}s` : '—'}
                </p>
                </div>

                {exercise.weight > 0 && (
                <div className="bg-zinc-800 rounded-xl p-3 col-span-2">
                    <p className="text-zinc-500 text-xs uppercase tracking-wider mb-1">Peso</p>
                    <p className="text-white text-xl font-bold">{exercise.weight} {exercise.weight_unit ?? 'kg'}</p>
                </div>
                )}

            </div>

            {/* Observaciones */}
            {exercise.observations && (
                <div className="bg-zinc-800 rounded-xl p-3">
                <p className="text-zinc-500 text-xs uppercase tracking-wider mb-1">Observaciones</p>
                <p className="text-zinc-300 text-sm">{exercise.observations}</p>
                </div>
            )}
        </div>

        </Modal>
    
)}

export default ExerciseModal