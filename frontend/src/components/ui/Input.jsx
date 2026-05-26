export default function Input({type = "text", placeholder, value, onChange, ...props
}) {
  return (
    <input
      type={type}
      placeholder={placeholder}
      value={value}
      onChange={onChange}
      className="w-full px-4 py-2 border border-gray-300 focus:ring-blue-500 rounded-lg focus:outline-none focus:ring-2 focus:border-blue-500 transition"
      {...props}
    />
  )
}