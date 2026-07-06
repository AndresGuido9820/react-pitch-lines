import { useEffect, useRef } from 'react'
import * as React from 'react'

export interface PitchLinesProps {
  /** Primary line color (chalk). Any CSS color, including var(--token). */
  stroke?: string
  /** Accent color for spots and corner arcs. */
  accent?: string
  /** Draw-in animation on mount. Disabled automatically for prefers-reduced-motion. */
  animate?: boolean
  /** Seconds before the draw-in starts. */
  delay?: number
  /** Seconds each element takes to draw. */
  duration?: number
  /** Seconds between one element and the next. */
  stagger?: number
  className?: string
  style?: React.CSSProperties
}

/**
 * A top-down football pitch, drawn line by line — broadcast style.
 *
 * Proportional to a real 105×68 m pitch. Zero dependencies: the draw-in
 * uses the Web Animations API and is skipped for users who prefer
 * reduced motion.
 */
export function PitchLines({
  stroke = 'rgba(255,255,255,0.35)',
  accent = 'rgba(16,185,129,0.8)',
  animate = true,
  delay = 0.3,
  duration = 1.1,
  stagger = 0.15,
  className,
  style,
}: PitchLinesProps) {
  const svgRef = useRef<SVGSVGElement>(null)

  useEffect(() => {
    const svg = svgRef.current
    if (!svg || !animate) return
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return

    const elements = Array.from(svg.querySelectorAll<SVGGeometryElement>('[data-draw]'))
    const animations = elements.map((el, i) => {
      const len = el.getTotalLength?.() ?? 500
      el.style.strokeDasharray = `${len}`
      el.style.strokeDashoffset = `${len}`
      return el.animate(
        [{ strokeDashoffset: len }, { strokeDashoffset: 0 }],
        {
          duration: duration * 1000,
          delay: (delay + i * stagger) * 1000,
          easing: 'cubic-bezier(0.45, 0, 0.25, 1)',
          fill: 'forwards',
        }
      )
    })
    return () => animations.forEach((a) => a.cancel())
  }, [animate, delay, duration, stagger])

  const S = stroke
  const SA = accent

  return (
    <svg
      ref={svgRef}
      viewBox="0 0 600 390"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      style={style}
      role="img"
      aria-label="Football pitch diagram"
    >
      {/* Border */}
      <path data-draw d="M 2 2 H 598 V 388 H 2 Z" stroke={S} strokeWidth="1.8" />
      {/* Midfield */}
      <path data-draw d="M 300 2 V 388" stroke={S} strokeWidth="1.5" />
      {/* Centre circle + spot */}
      <circle data-draw cx="300" cy="195" r="52" stroke={S} strokeWidth="1.5" />
      <circle data-draw cx="300" cy="195" r="3" stroke={SA} strokeWidth="2" />
      {/* Left penalty area */}
      <path data-draw d="M 2 80 H 96 V 310 H 2" stroke={S} strokeWidth="1.5" />
      <path data-draw d="M 2 143 H 33 V 247 H 2" stroke={S} strokeWidth="1.5" />
      <circle data-draw cx="63" cy="195" r="3" stroke={SA} strokeWidth="2" />
      <path data-draw d="M 96 155 A 52 52 0 0 1 96 235" stroke={S} strokeWidth="1.5" />
      {/* Right penalty area */}
      <path data-draw d="M 598 80 H 504 V 310 H 598" stroke={S} strokeWidth="1.5" />
      <path data-draw d="M 598 143 H 567 V 247 H 598" stroke={S} strokeWidth="1.5" />
      <circle data-draw cx="537" cy="195" r="3" stroke={SA} strokeWidth="2" />
      <path data-draw d="M 504 155 A 52 52 0 0 0 504 235" stroke={S} strokeWidth="1.5" />
      {/* Corner arcs */}
      <path data-draw d="M 12 2 A 10 10 0 0 0 2 12" stroke={SA} strokeWidth="1.5" />
      <path data-draw d="M 588 2 A 10 10 0 0 1 598 12" stroke={SA} strokeWidth="1.5" />
      <path data-draw d="M 598 378 A 10 10 0 0 1 588 388" stroke={SA} strokeWidth="1.5" />
      <path data-draw d="M 12 388 A 10 10 0 0 1 2 378" stroke={SA} strokeWidth="1.5" />
    </svg>
  )
}

export default PitchLines
