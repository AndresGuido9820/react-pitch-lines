// @vitest-environment jsdom
import { act } from 'react'
import { createRoot, type Root } from 'react-dom/client'
import { renderToString } from 'react-dom/server'
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest'
import { PitchLines } from '../src/index'

;(globalThis as { IS_REACT_ACT_ENVIRONMENT?: boolean }).IS_REACT_ACT_ENVIRONMENT = true

const DRAWABLE_COUNT = 16

let container: HTMLDivElement
let root: Root
let animate: ReturnType<typeof vi.fn>
let cancel: ReturnType<typeof vi.fn>

function setReducedMotion(reduce: boolean) {
  window.matchMedia = vi.fn().mockReturnValue({ matches: reduce }) as never
}

beforeEach(() => {
  cancel = vi.fn()
  animate = vi.fn().mockReturnValue({ cancel })
  Object.assign(Element.prototype, {
    animate,
    getTotalLength: () => 120,
  })
  setReducedMotion(false)
  container = document.createElement('div')
  document.body.appendChild(container)
  root = createRoot(container)
})

afterEach(() => {
  act(() => root.unmount())
  container.remove()
})

describe('PitchLines', () => {
  it('renders an accessible SVG with every pitch marking', () => {
    act(() => root.render(<PitchLines animate={false} />))
    const svg = container.querySelector('svg')
    expect(svg?.getAttribute('role')).toBe('img')
    expect(svg?.getAttribute('aria-label')).toBe('Football pitch diagram')
    expect(container.querySelectorAll('[data-draw]')).toHaveLength(DRAWABLE_COUNT)
    expect(animate).not.toHaveBeenCalled()
  })

  it('draws each line in order using delay and stagger', () => {
    act(() => root.render(<PitchLines delay={0.5} duration={1} stagger={0.2} />))
    expect(animate).toHaveBeenCalledTimes(DRAWABLE_COUNT)
    const delays = animate.mock.calls.map(([, options]) => options.delay)
    expect(delays[0]).toBe(500)
    expect(delays[1]).toBe(700)
    expect(animate.mock.calls[0][1].duration).toBe(1000)
    const first = container.querySelector<SVGElement>('[data-draw]')
    expect(first?.style.strokeDasharray).toBe('120')
    expect(first?.style.strokeDashoffset).toBe('120')
  })

  it('skips the animation when the user prefers reduced motion', () => {
    setReducedMotion(true)
    act(() => root.render(<PitchLines />))
    expect(animate).not.toHaveBeenCalled()
    const first = container.querySelector<SVGElement>('[data-draw]')
    expect(first?.style.strokeDashoffset).toBe('')
  })

  it('cancels running animations on unmount', () => {
    act(() => root.render(<PitchLines />))
    act(() => root.unmount())
    expect(cancel).toHaveBeenCalledTimes(DRAWABLE_COUNT)
    root = createRoot(container)
  })

  it('applies custom colors', () => {
    act(() => root.render(<PitchLines animate={false} stroke="#fff" accent="#f00" />))
    const strokes = [...container.querySelectorAll('[data-draw]')].map((el) =>
      el.getAttribute('stroke'),
    )
    expect(strokes).toContain('#fff')
    expect(strokes).toContain('#f00')
  })
})

describe('PitchLines on the server', () => {
  it('renders to a string without touching browser APIs', () => {
    const html = renderToString(<PitchLines />)
    expect(html).toContain('<svg')
    expect(html).toContain('aria-label="Football pitch diagram"')
  })
})
