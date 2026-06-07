export default function Avatar({ name = '?', size = 'md', className = '' }) {
  const s = { sm: 'w-8 h-8 text-xs', md: 'w-10 h-10 text-sm', lg: 'w-12 h-12 text-base' }
  return (
    <div className={`${s[size]} rounded-full bg-tigergrit flex items-center justify-center font-black text-zinc-900 shrink-0 ${className}`}>
      {name[0]?.toUpperCase()}
    </div>
  )
}
