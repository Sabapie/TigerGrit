export default function NumberStepper({ label, value, onChange, min = 1, max = 999, step }) {
  return (
    <div className="flex flex-col gap-1 flex-1 min-w-[120px]">
      <label className="text-zinc-500 text-xs font-medium uppercase tracking-widest">{label}</label>
      <div className="flex items-center bg-zinc-800 border border-zinc-700 rounded-lg overflow-hidden">
        <button type="button" className="text-zinc-400 text-lg px-3 py-2 hover:text-white transition" onClick={() => onChange(Math.max(min, Number(value) - step))}>−</button>
        <span className="flex-1 text-center text-white font-medium tabular-nums">{value}</span>
        <button type="button" className="text-zinc-400 text-lg px-3 py-2 hover:text-white transition" onClick={() => onChange(Math.min(max, Number(value) + step))}>+</button>
      </div>
    </div>
  )
}