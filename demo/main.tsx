import { StrictMode, useState } from 'react'
import { createRoot } from 'react-dom/client'
import { PitchLines } from '../src/index'

function Demo() {
  const [run, setRun] = useState(0)
  return (
    <main style={{ display: 'grid', gap: 24, justifyItems: 'center', padding: 24 }}>
      <PitchLines key={run} style={{ width: 'min(90vw, 720px)' }} />
      <button type="button" onClick={() => setRun((n) => n + 1)}>
        Replay
      </button>
    </main>
  )
}

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <Demo />
  </StrictMode>,
)
