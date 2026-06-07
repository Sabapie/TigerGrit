import Modal from './Modal'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'
import Button from '../ui/Button'
import ExerciseCard from '../ui/ExerciseCard'
import ExerciseModal from './ExerciseModal'
import { useState } from 'react'
import ConfirmModal from './ConfirmationModal'

function RoutineModal({ routine, isOpen, onClose, onDelete }) {

    const navigate = useNavigate()
    const [selectedExercise, setSelectedExercise] = useState(null)
    const [isExerciseModalOpen, setIsExerciseModalOpen] = useState(false)
    const [isConfirmOpen, setIsConfirmOpen] = useState(false) //Modal para confirmar acción

    async function deleteRoutine() {

        const token = localStorage.getItem('token')

        try {

            await axios.delete(

                `${import.meta.env.VITE_API_URL}/routines/${routine.id}`,

                {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                }

            )

            onDelete()

        } catch (error) {

            console.error(
                'Error deleting routine:',
                error
            )
        }
    }

    if (!routine) return null

    // stats
    const totalExercises =
        routine.exercises?.length || 0

    const totalSets =
        routine.exercises?.reduce(
            (acc, exercise) =>
                acc + (exercise.sets || 0),
            0
        ) || 0

    const totalDuration =
        routine.exercises?.reduce(
            (acc, exercise) =>
                acc + (exercise.duration || 0),
            0
        ) || 0

    return (
        <>
            <Modal
                isOpen={isOpen}
                onClose={onClose}
            >

                {/* ACCIONES */}
                <div className="absolute top-4 right-4 flex gap-2">

                    <Button
                        variant="secondary"
                        onClick={() => {

                            onClose()

                            navigate(
                                `/routine-form/${routine.id}`
                            )
                        }}
                    >

                        ✏️ Editar

                    </Button>

                    <Button
                        variant="danger"
                        onClick={(e) => { setIsConfirmOpen(true) }
                        }>

                        🗑️ Eliminar

                    </Button>

                </div>

                {/* HEADER */}
                <div className="mb-6 pr-36">

                    <p
                        className="text-xs text-zinc-500 uppercase tracking-widest mb-1">

                        rutina

                    </p>

                    <h1
                        className="text-3xl text-white font-bold leading-tight">

                        {routine.name}

                    </h1>

                    {
                        routine.description && (

                            <p
                                className="
                    text-zinc-400
                    text-sm
                    mt-2
                "
                            >

                                {routine.description}

                            </p>

                        )
                    }

                </div>

                {/* STATS */}
                <div className="grid grid-cols-3 gap-3 mb-6">

                    <div className="bg-zinc-800 rounded-xl p-3">

                        <p className="text-zinc-500 text-xs uppercase tracking-wider mb-1">

                            ejercicios

                        </p>

                        <p className="text-tigergrit text-2xl font-bold">

                            {totalExercises}

                        </p>

                    </div>

                    <div className="bg-zinc-800 rounded-xl p-3">

                        <p className=" text-zinc-500 text-xs uppercase tracking-wider mb-1">

                            series

                        </p>

                        <p className="text-tigergrit text-2xl font-bold">

                            {totalSets}

                        </p>

                    </div>

                    <div className="bg-zinc-800 rounded-xl p-3">

                        <p className="text-zinc-500 text-xs uppercase tracking-wider mb-1">

                            duración

                        </p>

                        <p className="text-white text-xl font-bold ">

                            {Math.floor(totalDuration / 60)}m

                        </p>

                    </div>

                </div>

                {/* EJERCICIOS */}
                <div className="space-y-2">
                    {routine.exercises?.map((exercise) => (
                        <ExerciseCard
                            key={exercise.id}
                            exercise={exercise}
                            compact
                            onSelect={(ex) => {
                                setSelectedExercise(ex)
                                setIsExerciseModalOpen(true)
                            }}
                        />
                    ))}
                </div>

            </Modal>

            <ConfirmModal

                isOpen={isConfirmOpen}
                onClose={() => setIsConfirmOpen(false)}
                onConfirm={() => deleteRoutine()}
                title="Eliminar rutina"
                message="¿Estas seguro de que quieres borrar permanentemente la rutina?"
                confirmText="Eliminar"
                cancelText="Cancelar"
                danger
            />

            {/* Modal de ejercicio dentro del modal de rutina */}
            <ExerciseModal
                exercise={selectedExercise}
                isOpen={isExerciseModalOpen}
                onClose={() => {
                    setIsExerciseModalOpen(false)
                    setSelectedExercise(null)
                }}
                onDelete={() => {
                    setIsExerciseModalOpen(false)
                    setSelectedExercise(null)
                }}
            />
        </>
    )
}

export default RoutineModal