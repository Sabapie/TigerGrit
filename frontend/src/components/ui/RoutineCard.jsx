import placeholderImg from '/TigerGrit.png'

function RoutineCard({ routine, onSelect, compact = false, onDoubleClick }) {

  const totalExercises = routine.exercises?.length || 0
  const totalSets = routine.exercises?.reduce((acc, ex) => acc + (ex.sets || 0), 0) || 0
  const totalDuration = routine.exercises?.reduce((acc, ex) => acc + (ex.duration || 0), 0) || 0

  if (compact) {
    return (
      <div
        onClick={() => onSelect?.(routine)}
        className="flex items-center gap-3 bg-zinc-800 hover:bg-zinc-700 border border-zinc-700 hover:border-tigergrit rounded-xl p-3 cursor-pointer transition group"
        onDoubleClick={onDoubleClick}
      >

        {/* Info */}
        <div className="flex-1 min-w-0">
          <h3 className="text-white text-sm font-semibold truncate">{routine.name}</h3>
          <p className="text-zinc-500 text-xs truncate">{totalExercises} ejercicios · {totalSets} series</p>
        </div>

        {/* Duración */}
        <span className="text-xs text-zinc-400 shrink-0">{Math.floor(totalDuration / 60)}m</span>
      </div>
    )
  }

  return (
    <div
      onClick={() => onSelect(routine)}
      className="bg-zinc-800 hover:bg-zinc-700 border border-zinc-700 hover:border-tigergrit rounded-2xl overflow-hidden cursor-pointer transition group"
      onDoubleClick={onDoubleClick}
    >

      {/* Info */}
      <div className="p-4 flex flex-col gap-2">
        <div>
          <p className="text-zinc-500 text-xs uppercase tracking-widest">{totalExercises} ejercicios</p>
          <h3 className="text-white font-bold text-base mt-0.5">{routine.name}</h3>
          {routine.description && (
            <p className="text-zinc-400 text-sm mt-1 line-clamp-2">{routine.description}</p>
          )}
        </div>

        {/* Stats */}
        <div className="grid grid-cols-3 gap-2">
          <div className="bg-zinc-900 rounded-lg p-2 text-center">
            <p className="text-tigergrit font-bold text-sm">{totalExercises}</p>
            <p className="text-zinc-500 text-xs">ejercicios</p>
          </div>
          <div className="bg-zinc-900 rounded-lg p-2 text-center">
            <p className="text-tigergrit font-bold text-sm">{totalSets}</p>
            <p className="text-zinc-500 text-xs">series</p>
          </div>
          <div className="bg-zinc-900 rounded-lg p-2 text-center">
            <p className="text-tigergrit font-bold text-sm">{Math.floor(totalDuration / 60)}m</p>
            <p className="text-zinc-500 text-xs">duración</p>
          </div>
        </div>
      </div>
    </div>
  )
}

export default RoutineCard