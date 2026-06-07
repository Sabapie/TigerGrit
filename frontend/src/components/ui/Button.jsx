export default function Button({ children, onClick, type = 'button', variant = 'primary', disabled = false, className = '' }) {

  const variants = {
    primary: 'bg-tigergrit/90 hover:bg-tigergrit text-zinc-50 hover:text-white font-semibold shadow-md',
    secondary: 'bg-zinc-800 hover:bg-zinc-700 text-zinc-500 hover:text-white border border-zinc-600 hover:border-zinc-500',
    danger: 'bg-red-600/90 hover:bg-red-600 text-white font-semibold shadow-md',
    custom: '',
  }

  const disabledStyles = 'opacity-40 cursor-not-allowed pointer-events-none'

  const appliedClasses = variant === 'custom'
    ? className
    : `py-2 px-4 rounded-lg transition duration-200 active:scale-95 ${variants[variant]} ${disabled ? disabledStyles : ''} ${className}`

  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled}
      className={appliedClasses}
    >
      {children}
    </button>
  )
}