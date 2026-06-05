import Calendar from 'react-calendar'
import '../styles/calendar.css'
import RoutineCard from './RoutineCard'

export default function CalendarView({
  date,
  setDate,
  scheduledRoutines,
  onOpenRoutine,
  selectedCard
}) {
  return (
    <Calendar
      onChange={setDate}
      value={date}

      tileContent={({ date }) => {
        const formattedDate = date.toISOString().split('T')[0]

        const routinesForDay = scheduledRoutines.filter(
          (r) => r.scheduled_date === formattedDate
        )

        return (
          <div
            className="mt-1 w-full cursor-pointer absolute h-full"
            onDoubleClick={() => {
              const routine = routinesForDay[0]?.routine
              if (routine) {
                onOpenRoutine(routine)
              }
            }}
          >
            {routinesForDay.map((routine) => (
              <div
                key={routine.id}
                onDoubleClick={() => onOpenRoutine?.(routine.routine)}
                className="
                  w-full
                  flex items-start justify-center
                  bg-tigergrit text-white rounded-md
                  ring-1 ring-tigergrit/50 cursor-pointer
                  truncate
                  absolute
                  z-10

                  px-2 py-1

                  text-[10px]
                  sm:text-xs
                  md:text-sm
                  lg:text-base
                  xl:text-lg

                  h-6
                  sm:h-7
                  md:h-7
                  lg:h-9
                  xl:h-12
                "
              >
                {routine.routine.name}
              </div>
            ))}
          </div>
        )
      }}
    />
  )
}