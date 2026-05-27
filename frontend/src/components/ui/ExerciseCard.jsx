function ExerciseCard({ exercise, onSelect }) {

  return (

    <div

      className="bg-zinc-800 rounded-xl p-3 mt-1 hover:bg-zinc-700 transition cursor-pointer"

      onClick={() => onSelect(exercise)}

    >

      <h3 className="font-bold text-sm text-white">

        {exercise.name}

      </h3>

      <p className="text-xs text-zinc-400">

        Click para abrir

      </p>

    </div>
  )
}

export default ExerciseCard