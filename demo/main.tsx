import { StrictMode, useState } from 'react'
import { createRoot } from 'react-dom/client'
import { PitchLines, type PitchLinesProps } from '../src/index'
import './demo.css'

const PRESETS: { name: string; bg: string; props: PitchLinesProps }[] = [
  { name: 'Default', bg: '#0b1410', props: {} },
  { name: 'Floodlights', bg: '#0b1410', props: { stroke: 'rgba(255,255,255,0.92)', accent: '#10B981' } },
  { name: 'Gold', bg: '#15120a', props: { stroke: 'rgba(255,236,179,0.95)', accent: '#F5B700', duration: 0.6, stagger: 0.06 } },
  { name: 'Ice', bg: '#0a1224', props: { stroke: '#bae6fd', accent: '#38bdf8', duration: 0.5, stagger: 0.05 } },
  { name: 'Grass', bg: '#166534', props: { stroke: 'rgba(255,255,255,0.95)', accent: '#fde047', duration: 0.7, stagger: 0.07 } },
]

function formatProps(props: PitchLinesProps): string {
  const entries = Object.entries(props)
  if (entries.length === 0) return '<PitchLines />'
  const lines = entries.map(([k, v]) => (typeof v === 'string' ? `  ${k}="${v}"` : `  ${k}={${v}}`))
  return `<PitchLines\n${lines.join('\n')}\n/>`
}

function Demo() {
  const [preset, setPreset] = useState(1)
  const [run, setRun] = useState(0)
  const current = PRESETS[preset]
  return (
    <main className="demo" style={{ background: current.bg }}>
      <header>
        <h1>react-pitch-lines</h1>
        <p>A football pitch that draws itself, line by line. Zero-dependency React SVG component.</p>
      </header>
      <PitchLines key={`${preset}-${run}`} className="pitch" {...current.props} />
      <div className="controls" role="group" aria-label="Presets">
        {PRESETS.map((p, i) => (
          <button
            key={p.name}
            type="button"
            aria-pressed={i === preset}
            onClick={() => {
              setPreset(i)
              setRun((n) => n + 1)
            }}
          >
            {p.name}
          </button>
        ))}
        <button type="button" className="replay" onClick={() => setRun((n) => n + 1)}>
          Replay
        </button>
      </div>
      <pre aria-label="Props for this preset">
        <code>{formatProps(current.props)}</code>
      </pre>
      <footer>
        <a href="https://github.com/AndresGuido9820/react-pitch-lines">Source on GitHub</a>
        <span aria-hidden="true"> · </span>
        <span>With prefers-reduced-motion the pitch appears without animation.</span>
      </footer>
    </main>
  )
}

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <Demo />
  </StrictMode>,
)
