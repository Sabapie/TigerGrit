import placeholderImg from '/TigerGrit.png' // imagen placeholder

function ExerciseCard({ exercise, onSelect, compact = false }) {

  const getImageUrl = (image) => {
    if (!image) return null
    if (image.startsWith('http')) return image  // ya es URL completa
    return `http://localhost/GitHub/TigerGrit/backend/public/storage/${image}`
  }

  if (compact) return (
    <div
      onClick={() => onSelect(exercise)}
      className="flex items-center gap-3 bg-zinc-800 hover:bg-zinc-700 border border-zinc-700 hover:border-tigergrit rounded-xl p-3 cursor-pointer transition group"
    >
      {/* Imagen */}
      <div className="w-10 h-10 rounded-lg overflow-hidden shrink-0 bg-zinc-700">
        {exercise.image
          ? <img src={getImageUrl(exercise.image)} alt={exercise.name} className="w-full h-full object-cover" />
          : <div className="w-full h-full flex items-center justify-center text-zinc-500 text-xs"><img src={placeholderImg} alt='Sin imagen' className="grayscale opacity-30" /></div>
        }
      </div>

      {/* Info */}
      <div className="flex-1 min-w-0">
        <h3 className="text-white text-sm font-semibold truncate">{exercise.name}</h3>
        <p className="text-zinc-500 text-xs truncate">{exercise.muscle_group} · {exercise.muscle_area}</p>
      </div>

      {/* Badge oficial */}
      {exercise.user_id === null && (
        <span className="text-xs bg-tigergrit/20 text-tigergrit px-2 py-0.5 rounded-full shrink-0">oficial</span>
      )}
    </div>
  )

  return (
    <div
      onClick={() => onSelect(exercise)}
      className="bg-zinc-800 hover:bg-zinc-700 border border-zinc-700 hover:border-tigergrit rounded-2xl overflow-hidden cursor-pointer transition group"
    >
      {/* Imagen */}
      <div className="w-full h-36 bg-zinc-700 overflow-hidden relative">
        {exercise.image
          ? <img src={getImageUrl(exercise.image)} alt={exercise.name} className="w-full h-full object-cover" />
          : <div className="w-full h-full flex items-center justify-center text-zinc-500 text-sm"><img src={placeholderImg} alt='Sin imagen' className="grayscale opacity-30" /></div>
        }
        {exercise.user_id === null && (
          <span className="absolute top-2 right-2 text-xs bg-tigergrit text-zinc-900 font-semibold px-2 py-0.5 rounded-full">oficial</span>
        )}
      </div>

      {/* Info */}
      <div className="p-4 flex flex-col gap-2">
        <div>
          <p className="text-zinc-500 text-xs uppercase tracking-widest">{exercise.muscle_group} · {exercise.muscle_area}</p>
          <h3 className="text-white font-bold text-base mt-0.5">{exercise.name}</h3>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-3 gap-2">
          <div className="bg-zinc-900 rounded-lg p-2 text-center">
            <p className="text-tigergrit font-bold text-sm">{exercise.sets}</p>
            <p className="text-zinc-500 text-xs">series</p>
          </div>
          <div className="bg-zinc-900 rounded-lg p-2 text-center">
            <p className="text-tigergrit font-bold text-sm">{exercise.repetitions}</p>
            <p className="text-zinc-500 text-xs">reps</p>
          </div>
          <div className="bg-zinc-900 rounded-lg p-2 text-center">
            <p className="text-tigergrit font-bold text-sm">{exercise.weight ?? 0}{exercise.weight_unit ?? 'kg'}</p>
            <p className="text-zinc-500 text-xs">peso</p>
          </div>
        </div>
      </div>
    </div>
  )
}

export default ExerciseCard