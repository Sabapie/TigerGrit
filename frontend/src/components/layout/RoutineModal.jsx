import Modal from './Modal'
import RutineCard from '../ui/RoutineCard'
import axios from 'axios'

function RoutineModal({routine, isOpen, onClose, onDelete}) {

    async function deleteRoutine() {
        const token = localStorage.getItem('token')

        try {

            const response = await axios.delete(`${import.meta.env.VITE_API_URL}/routines/${routine.id}`,{
                headers: {
                    Authorization: `Bearer ${token}`
                }
            })

            alert('Rutina eliminada')
            onDelete() // Refresca la lista de rutinas

        } catch (error) {
            
            console.error('Error deleting routine:', error)
        }
    }

    if (!routine) return null // Si no hay rutina seleccionada, no renderizamos nada

    return (

        <Modal
        isOpen={isOpen}
        onClose={onClose}
        >

        <h1 className="text-3xl text-white font-bold mb-4 z-10">

            {routine.name}

        </h1>
            <button
            onClick={(e) => {e.stopPropagation()  // evita que abra el modal al borrar
            deleteRoutine(routine.id)}}
            className=" absolute top-4 right-10 text-white"
            >
            🗑️
            </button>
            <button
            // onClick={() => handleDelete(routine.id)}
            className=" absolute top-4 right-16 text-white"
            >
            ✏️
            </button>

        <div className="space-y-3">

            {
            routine.exercises?.map((exercise) => (

                <div
                key={exercise.id}
                className="
                    bg-zinc-800
                    p-4
                    rounded-xl
                "
                >

                <h2 className="text-white font-bold">

                    {exercise.name}

                </h2>

                <p className="text-zinc-400">

                    {exercise.sets} series

                </p>

                </div>

            ))
            }

        </div>

        </Modal>
    )
}

export default RoutineModal