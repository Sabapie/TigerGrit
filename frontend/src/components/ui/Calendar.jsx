import Calendar from 'react-calendar'
import '../styles/calendar.css'
import RoutineCard from './RoutineCard'

export default function CalendarView({date, setDate, scheduledRoutines}) {
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
          <div>
            {routinesForDay.map((routine) => (
              <p
                key={routine.id}
                className="text-xs text-zinc-500"
              >
                {routine.routine.name}
              </p>
            ))}
          </div>
        )
      }}
    />
  )
}