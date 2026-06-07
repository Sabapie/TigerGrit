export default function FormField({ label, type = 'text', placeholder, value, onChange, error, className, ...props }) {
  return (
    <div className="flex flex-col gap-1">
      {label && (
        <label className="text-sm uppercase text-gray-400 font-medium">{label}</label>
      )}
      <input
        type={type}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        className={`bg-zinc-800 border border-zinc-700 rounded-lg px-3 py-2 text-white text-sm outline-none focus:ring-2 focus:ring-tigergrit w-full ${className}
          ${error
            ? 'border-red-500 focus:ring-red-500'
            : 'border-zinc-600 focus:ring-tigergrit focus:border-tigergrit'
          }
        `}
        {...props}
      />
      {error && (
        <p className="text-red-500 text-xs mt-1">{error}</p>
      )}
    </div>
  )
}