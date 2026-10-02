# Workout Tracker Implementation Plan

**Goal:** A single-page React app that tracks exercises completed and total minutes, meeting the 7 assignment requirements.

**Architecture:** All state lives in `App.tsx` (two `useState`s). The workout status is a plain calculated value. A `WorkoutSummary` child gets data via props. No test framework is set up and the app is tiny, so verification is `npm run build`, `npm run lint`, and a manual browser check.

**Tech Stack:** Vite + React 19 + TypeScript (already scaffolded).

## Decisions
- **Started?** `exercises > 0 || minutes > 0`, computed (no extra state).
- **Buttons:** Complete Exercise (+1), Add 10 Minutes (+10), Reset Workout (both to 0).
- **Status:** 0 → Not Started, 1–2 → Getting Started, 3–4 → Good Workout, 5+ → Great Workout.
- **Child:** `WorkoutSummary` shows exercises, minutes, and status.

## Files
- Create: `src/WorkoutSummary.tsx` (display-only child)
- Rewrite: `src/App.tsx` (state, buttons, effects, calculated values)
- Replace: `src/App.css` (minimal styling; the Vite template CSS is no longer needed)

---

### Task 1: Child component

**Files:** Create `src/WorkoutSummary.tsx`

- [ ] **Step 1: Write the component**

```tsx
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
```

### Task 2: App with state, events, effects

**Files:** Rewrite `src/App.tsx`

- [ ] **Step 1: Replace the contents of `src/App.tsx`**

```tsx
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

  // Calculated values (no extra useState)
  const status = getStatus(exercises)
  const hasStarted = exercises > 0 || minutes > 0

  // Effect 1: tab title follows exercises only
  useEffect(() => {
    document.title = `Exercises Completed: ${exercises}`
  }, [exercises])

  // Effect 2: log minutes only when minutes change
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
```

### Task 3: Minimal styling

**Files:** Replace `src/App.css`

- [ ] **Step 1: Overwrite `src/App.css`**

```css
main {
  max-width: 400px;
  margin: 2rem auto;
  text-align: center;
}

.buttons {
  display: flex;
  gap: 0.5rem;
  justify-content: center;
  flex-wrap: wrap;
}
```

### Task 4: Verify

- [ ] **Step 1:** `npm run build` and `npm run lint` — both pass with no errors.
- [ ] **Step 2:** `npm run dev`, open the page and check:
  - Initially: "Ready to start your workout!", 0 / 0, "Not Started", tab title "Exercises Completed: 0".
  - Click Complete Exercise: message becomes "Workout in progress!", count and tab title update; status moves through 1–2 / 3–4 / 5+.
  - Click Add 10 Minutes: console logs "Workout time: 10 minutes"; the tab title does not change.
  - Click Reset Workout: everything returns to the initial state.
  - Note: in dev, StrictMode logs the console message twice on first mount. That is expected.
