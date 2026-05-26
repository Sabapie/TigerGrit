import { useEffect, useState } from 'react'
import axios from 'axios'
import RoutineCard from '../components/ui/RoutineCard'
import RoutineModal from '../components/layout/RoutineModal'

function Routines() {


    const [selectedRoutine, setSelectedRoutine] = useState(null) // Estado para almacenar la rutina seleccionada
    const [isModalOpen, setIsModalOpen] = useState(false) // Estado para controlar la visibilidad del modal
    const [routines, setRoutines] = useState([])

    useEffect(() => {

        getRoutines()

    }, [])
    
  const getRoutines = async () => {

    const token = localStorage.getItem('token')

    try {

      const response = await axios.get(

        `${import.meta.env.VITE_API_URL}/routines`,

        {
          headers: {
            Authorization: `Bearer ${token}`
          }
        }

      )

      setRoutines(response.data)

    } catch (error) {

      console.error(error)

    }
  }

  return (

    <div>

    <h1>Mis rutinas</h1>

    {
        routines.map((routine) => ( // Mapea cada rutina a un bloque de información

        <RoutineCard
            key={routine.id}
            routine={routine} 
            onSelect={() => {
                setSelectedRoutine(routine)
                setIsModalOpen(true)
            }}
        />

        ))
    }

    <RoutineModal

        routine={selectedRoutine}

        isOpen={isModalOpen}

        onClose={() => // Cierra el modal y limpia la rutina seleccionada
            setIsModalOpen(false)
        }
        onDelete={() => { // Función que se ejecuta después de eliminar una rutina
            getRoutines()
            setIsModalOpen(false)
            setSelectedRoutine(null)
        }}
    />

    </div>
  )
}

export default Routines