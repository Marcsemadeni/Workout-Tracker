import { useEffect, useState } from 'react'
import WorkoutSummary from './WorkoutSummary'
import './App.css'

function getStatus(exercises: number): string {
  if (exercises === 0) return 'Not Started'
  if (exercises <= 2) return 'Getting Started'
  if (exercises <= 4) return 'Good Workout'
  return 'Great Workout'
}

function App() {
  const [exercises, setExercises] = useState(0)
  const [minutes, setMinutes] = useState(0)

  const status = getStatus(exercises)
  const hasStarted = exercises > 0 || minutes > 0

  useEffect(() => {
    document.title = `Exercises Completed: ${exercises}`
  }, [exercises])

  useEffect(() => {
    console.log(`Workout time: ${minutes} minutes`)
  }, [minutes])

  return (
    <main>
      <h1>Workout Tracker</h1>
      <p>{hasStarted ? 'Workout in progress!' : 'Ready to start your workout!'}</p>

      <WorkoutSummary exercises={exercises} minutes={minutes} status={status} />

      <div className="buttons">
        <button onClick={() => setExercises(exercises + 1)}>Complete Exercise</button>
        <button onClick={() => setMinutes(minutes + 10)}>Add 10 Minutes</button>
        <button
          onClick={() => {
            setExercises(0)
            setMinutes(0)
          }}
        >
          Reset Workout
        </button>
      </div>
    </main>
  )
}

export default App
