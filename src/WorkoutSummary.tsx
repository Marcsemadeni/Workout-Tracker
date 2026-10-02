type WorkoutSummaryProps = {
  exercises: number
  minutes: number
  status: string
}

function WorkoutSummary({ exercises, minutes, status }: WorkoutSummaryProps) {
  return (
    <div className="summary">
      <p>Exercises Completed: {exercises}</p>
      <p>Total Minutes: {minutes}</p>
      <p>Status: {status}</p>
    </div>
  )
}

export default WorkoutSummary
