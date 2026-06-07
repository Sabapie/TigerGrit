import Modal from './Modal'
import Button from '../ui/Button'

function ConfirmModal({ isOpen, onClose, onConfirm, title = 'Confirmar acción', message = '¿Seguro que quieres continuar?', confirmText = 'Confirmar', cancelText = 'Cancelar', danger = false }) {
  return (

    <Modal
      isOpen={isOpen}
      onClose={onClose}
    >

      <div className="flex flex-col gap-6">

        {/* Header */}
        <div>

          <h2 className="text-2xl font-bold text-white mb-2">

            {title}

          </h2>

          <p className="text-zinc-400 leading-relaxed">

            {message}

          </p>

        </div>

        {/* Actions */}
        <div className="flex justify-end gap-3">

          <Button
            variant="secondary"
            onClick={onClose}
          >

            {cancelText}

          </Button>

          <Button
            variant={danger ? 'danger' : 'primary'}
            onClick={() => {

              onConfirm()
              onClose()

            }}
          >

            {confirmText}

          </Button>

        </div>

      </div>

    </Modal>
  )
}

export default ConfirmModal