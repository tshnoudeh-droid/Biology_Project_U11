import type { ReactNode } from 'react'
import '../styles/figure.css'

/**
 * Every stop uses this one wrapper: controls on top, one labelled (often animated) SVG,
 * and a single caption line underneath that updates with the controls.
 */
export function Figure({ controls, caption, children }: { controls?: ReactNode; caption: ReactNode; children: ReactNode }) {
  return (
    <figure className="figure">
      {controls && <div className="figure__controls">{controls}</div>}
      <div className="figure__art">{children}</div>
      <figcaption className="figure__caption" aria-live="polite">
        {caption}
      </figcaption>
    </figure>
  )
}

type Opt<T extends string> = { value: T; label: string }

/** Segmented toggle used by every figure. */
export function Toggle<T extends string>({ label, options, value, onChange }: { label: string; options: Opt<T>[]; value: T; onChange: (v: T) => void }) {
  return (
    <div className="toggle" role="group" aria-label={label}>
      {options.map((o) => (
        <button key={o.value} type="button" aria-pressed={value === o.value} onClick={() => onChange(o.value)}>
          {o.label}
        </button>
      ))}
    </div>
  )
}

/** Point along a polyline, f in 0..1. */
export function along(pts: [number, number][], f: number): [number, number] {
  const lens = [0]
  for (let i = 1; i < pts.length; i++) lens.push(lens[i - 1] + Math.hypot(pts[i][0] - pts[i - 1][0], pts[i][1] - pts[i - 1][1]))
  const d = Math.max(0, Math.min(1, f)) * lens[lens.length - 1]
  let i = 1
  while (i < lens.length - 1 && lens[i] < d) i++
  const k = (d - lens[i - 1]) / (lens[i] - lens[i - 1] || 1)
  return [pts[i - 1][0] + (pts[i][0] - pts[i - 1][0]) * k, pts[i - 1][1] + (pts[i][1] - pts[i - 1][1]) * k]
}
