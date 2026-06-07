export default function Input({ type = "text", placeholder, value, onChange, className = '', variant = 'primary', ...props }) {
  const baseStyle = 'transition duration-200 focus:outline-none'
  const variants = {
    primary: 'w-full px-4 py-2 bg-zinc-800 border border-zinc-700 text-white rounded-lg focus:ring-2 focus:ring-tigergrit focus:border-tigergrit',
    plain: 'bg-transparent text-white text-sm outline-none flex-1 placeholder:text-zinc-500 w-full',
  }

  const appliedClasses = variant === 'custom' ? className : `${baseStyle} ${variants[variant]} ${className}`

  return (
    <input
      type={type}
      placeholder={placeholder}
      value={value}
      onChange={onChange}
      className={appliedClasses}
      {...props}
    />
  )
}