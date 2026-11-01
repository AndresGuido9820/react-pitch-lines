# react-pitch-lines

> A football pitch that draws itself, line by line — broadcast style.

Zero-dependency React component that renders a top-down football pitch as SVG, proportional to a real 105×68 m field, with a self-drawing animation powered by the Web Animations API. Respects `prefers-reduced-motion` out of the box.

Extracted from [my portfolio](https://github.com/AndresGuido9820), where it draws the pitch behind the hero.

## Install

The package is not on the npm registry yet. Install it straight from GitHub;
npm builds `dist/` during install through the `prepare` script:

```bash
npm install github:AndresGuido9820/react-pitch-lines
```

Requires React 18 or newer.

## Usage

```tsx
import { PitchLines } from 'react-pitch-lines'

export function Hero() {
  return (
    <PitchLines
      stroke="rgba(255,255,255,0.35)"
      accent="#10B981"
      delay={0.5}
      style={{ width: 480 }}
    />
  )
}
```

## Props

| Prop        | Type      | Default                   | Description                                        |
| ----------- | --------- | ------------------------- | -------------------------------------------------- |
| `stroke`    | `string`  | `rgba(255,255,255,0.35)`  | Line color. Accepts any CSS color, incl. `var()`.  |
| `accent`    | `string`  | `rgba(16,185,129,0.8)`    | Spots and corner arcs.                              |
| `animate`   | `boolean` | `true`                    | Draw-in on mount. Auto-off for reduced motion.      |
| `delay`     | `number`  | `0.3`                     | Seconds before the draw-in starts.                  |
| `duration`  | `number`  | `1.1`                     | Seconds each line takes to draw.                    |
| `stagger`   | `number`  | `0.15`                    | Seconds between one line and the next.              |
| `className` | `string`  | —                         | Passed to the `<svg>`.                              |
| `style`     | `object`  | —                         | Passed to the `<svg>`.                              |

## Try it locally

```bash
git clone https://github.com/AndresGuido9820/react-pitch-lines.git
cd react-pitch-lines
npm install
npm run demo   # opens a Vite page with the pitch and a Replay button
npm test       # unit tests (Vitest + jsdom)
```

## Why zero dependencies?

The draw-in effect only needs `getTotalLength()` + the Web Animations API, both native. No GSAP, no framer-motion — nothing to add to your bundle.

## Accessibility

- Skips the animation entirely when the user has `prefers-reduced-motion: reduce`.
- Lines are hidden before the first browser paint, so they do not flash fully drawn before the animation starts.
- The SVG ships with `role="img"` and an `aria-label`.

---

### Español

Componente React sin dependencias que dibuja una cancha de fútbol vista desde arriba (proporcional a una real de 105×68 m) con animación de auto-dibujado usando la Web Animations API. Respeta `prefers-reduced-motion`. Extraído del túnel de mi portafolio.

## License

[MIT](LICENSE) © Andrés Felipe Guido Montoya
