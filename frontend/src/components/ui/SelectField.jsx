export default function SelectField({ label, value, onChange, options = [], placeholder, error, className, disabled = false }) {

    
  const disabledStyles = 'opacity-40 cursor-not-allowed pointer-events-none'

  return (
    <div className="flex flex-col gap-1">
      {label && (
        <label className="text-sm uppercase text-gray-400 font-medium">{label}</label>
      )}
      <div className="relative">
        <select
          value={value}
          onChange={onChange}
          disabled={disabled}
          className={`appearance-none bg-zinc-800 border border-zinc-700 rounded-lg px-3 py-2 text-white text-sm outline-none focus:ring-2 focus:ring-tigergrit w-full cursor-pointer
            ${error
              ? 'border-red-500 focus:ring-red-500'
              : 'border-zinc-600 focus:ring-tigergrit focus:border-tigergrit'
            }
            ${disabled ? disabledStyles : ''}
          `}
        >
          {placeholder && (
            <option value="" disabled className="text-gray-400">
              {placeholder}
            </option>
          )}
          {options.map(opt => (
            <option
              key={opt.value ?? opt}
              value={opt.value ?? opt}
              className="bg-zinc-800 text-white hover:bg-tigergrit"
              
            >
              {opt.label ?? opt}
            </option>
          ))}
        </select>

        {/* Flecha personalizada */}
        <div className="pointer-events-none absolute inset-y-0 right-3 flex items-center">
          <svg className="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
          </svg>
        </div>
      </div>

      {error && (
        <p className="text-red-500 text-xs mt-1">{error}</p>
      )}
    </div>
  )
}