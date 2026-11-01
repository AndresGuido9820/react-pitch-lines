# react-pitch-lines

**A football pitch that draws itself, line by line. Zero-dependency React SVG component.**

[![Demo](https://github.com/AndresGuido9820/react-pitch-lines/actions/workflows/pages.yml/badge.svg)](https://github.com/AndresGuido9820/react-pitch-lines/actions/workflows/pages.yml)
[![License: MIT](https://img.shields.io/badge/License-MIT-green.svg)](LICENSE)

**[Live demo →](https://andresguido9820.github.io/react-pitch-lines/)**

![The pitch drawing itself](docs/media/pitch-draw.gif)

A top-down football pitch rendered as SVG, proportional to a real 105 × 68 m field, with a broadcast-style draw-in animation built on the Web Animations API. No animation library, no runtime dependencies, and it respects `prefers-reduced-motion`.

Extracted from [my portfolio](https://github.com/AndresGuido9820), where it draws the pitch behind the hero.

## Features

- **Self-drawing lines.** Each marking draws in sequence with configurable delay, duration and stagger.
- **Real proportions.** Penalty areas, goal areas, penalty spots, arcs and centre circle scaled to a 105 × 68 m pitch.
- **Themeable.** Line and accent colors accept any CSS color, including `var(--token)`.
- **Zero dependencies.** Only `getTotalLength()` and `Element.animate()`, both native. React is the only peer dependency.
- **SSR-safe.** Renders to a string on the server; the animation starts in the browser.
- **Accessible by default.** Skips the animation for reduced motion; the SVG has `role="img"` and a label.

## Install

The package is not published to the npm registry yet. Install it from GitHub; npm builds `dist/` during install through the `prepare` script:

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

| Prop        | Type            | Default                  | Description                                            |
| ----------- | --------------- | ------------------------ | ------------------------------------------------------ |
| `stroke`    | `string`        | `rgba(255,255,255,0.35)` | Line color. Any CSS color, including `var()`.          |
| `accent`    | `string`        | `rgba(16,185,129,0.8)`   | Penalty spots, centre spot and corner arcs.            |
| `animate`   | `boolean`       | `true`                   | Draw-in on mount. Always off for reduced motion.       |
| `delay`     | `number`        | `0.3`                    | Seconds before the first line starts drawing.          |
| `duration`  | `number`        | `1.1`                    | Seconds each line takes to draw.                       |
| `stagger`   | `number`        | `0.15`                   | Seconds between the start of one line and the next.    |
| `className` | `string`        | —                        | Passed to the `<svg>`.                                 |
| `style`     | `CSSProperties` | —                        | Passed to the `<svg>`. Set a width; height follows.    |

To replay the animation, change the component's `key`.

## How it works

The SVG has a fixed `viewBox` of 600 × 390. Each marking carries a `data-draw` attribute. On mount, a layout effect measures every path with `getTotalLength()`, hides it with `stroke-dasharray`/`stroke-dashoffset` before the first paint, and animates the offset to zero with `Element.animate()`, offset by `delay + index × stagger`. The animations are cancelled on unmount.

## Accessibility

- With `prefers-reduced-motion: reduce`, no animation is created and the full pitch renders immediately.
- The SVG ships with `role="img"` and `aria-label="Football pitch diagram"`.
- The component is decorative and does not take focus.

## Develop

```bash
git clone https://github.com/AndresGuido9820/react-pitch-lines.git
cd react-pitch-lines
npm install
npm run demo        # local demo page with presets and Replay
npm test            # unit tests (Vitest + jsdom)
npm run typecheck
npm run build:demo  # static demo build, deployed to GitHub Pages from main
```

## Contributing

Issues and pull requests are welcome. Please keep the component dependency-free, add a test for any behavior change and run `npm test` and `npm run typecheck` before opening a PR.

---

### Español

Componente de React sin dependencias que dibuja una cancha de fútbol vista desde arriba, proporcional a una real de 105 × 68 m, con animación de auto-dibujado usando la Web Animations API. Respeta `prefers-reduced-motion`. [Demo en vivo](https://andresguido9820.github.io/react-pitch-lines/).

## License

[MIT](LICENSE) © Andrés Felipe Guido Montoya
