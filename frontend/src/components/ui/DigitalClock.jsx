export default function DigitalClock({ label, value, onChange, step = 5 }) {
  const mins = String(Math.floor(value / 60)).padStart(2, '0')
  const secs = String(value % 60).padStart(2, '0')

  return (
    <div className="flex flex-col gap-1 flex-1">
      <label className="text-zinc-500 text-xs font-medium uppercase tracking-widest">{label}</label>
      <div className="flex items-center gap-1 bg-zinc-800 border border-zinc-700 rounded-lg px-3 py-2">
        <div className="flex flex-col items-center flex-1">
          <button type="button" className="text-zinc-500 text-xs cursor-pointer hover:text-white px-2 py-1" onClick={() => onChange(value + 60)}>▲</button>
          <span className="text-tigergrit text-2xl font-bold tabular-nums leading-tight">{mins}</span>
          <button type="button" className="text-zinc-500 text-xs cursor-pointer hover:text-white px-2 py-1" onClick={() => onChange(Math.max(0, value - 60))}>▼</button>
          <span className="text-zinc-500 text-xs uppercase">min</span>
        </div>
        <span className="text-zinc-500 text-2xl font-light mb-3">:</span>
        <div className="flex flex-col items-center flex-1">
          <button type="button" className="text-zinc-500 text-xs cursor-pointer hover:text-white px-2 py-1" onClick={() => onChange(value + step)}>▲</button>
          <span className="text-tigergrit text-2xl font-bold tabular-nums leading-tight">{secs}</span>
          <button type="button" className="text-zinc-500 text-xs cursor-pointer hover:text-white px-2 py-1" onClick={() => onChange(Math.max(0, value - step))}>▼</button>
          <span className="text-zinc-500 text-xs uppercase">seg</span>
        </div>
      </div>
    </div>
  )
}