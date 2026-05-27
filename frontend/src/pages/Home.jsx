import { Link } from 'react-router-dom'
import Button from '../components/ui/Button'
import Modal from '../components/layout/ModalLogin'
import { useState } from 'react'

function Home() {

  const [modalOpen, setModalOpen] = useState(false) // Estado para controlar la visibilidad del modal

  return (

    <div>

      <h1>TigerGrit</h1>


      <Button onClick={() => setModalOpen(true)}>Iniciar sesión</Button>

      <Modal
        isOpen={modalOpen} // Pasamos el estado para controlar la visibilidad del modal
        onClose={() => setModalOpen(false)}
      />

    </div>
  )
}

export default Home