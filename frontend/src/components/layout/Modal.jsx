function Modal({isOpen, onClose, children}) {

  if (!isOpen) return null

  return (

    <div
        onClick={onClose}
        className=" fixed inset-0 bg-black/70 flex items-center justify-center z-50"
    >

      <div
        onClick={(e) => e.stopPropagation()} // Evita que el clic en el contenido cierre el modal
        className=" bg-zinc-900 p-6 rounded-2xl w-[90%] max-w-2xl relative z-10"
      >

        <button
          onClick={onClose}
          className=" absolute top-4 right-4 text-white"
        >
          X
        </button>

        {children}

      </div>

    </div>
  )
}

export default Modal