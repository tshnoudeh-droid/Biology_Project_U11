import { useEffect, useRef, useState } from 'react'
import { useReducedMotion } from './useReducedMotion'

/** Smoothly animates a number toward `target` (ease-in-out). Instant with reduced motion. */
export function useTween(target: number, duration = 900): number {
  const reduced = useReducedMotion()
  const [value, setValue] = useState(target)
  const fromRef = useRef(target)
  const valueRef = useRef(target)

  useEffect(() => {
    if (reduced || duration <= 0) {
      valueRef.current = target
      setValue(target)
      return
    }
    fromRef.current = valueRef.current
    const start = performance.now()
    let raf = 0
    const tick = (now: number) => {
      const t = Math.min(1, (now - start) / duration)
      const e = t < 0.5 ? 2 * t * t : 1 - Math.pow(-2 * t + 2, 2) / 2
      const v = fromRef.current + (target - fromRef.current) * e
      valueRef.current = v
      setValue(v)
      if (t < 1) raf = requestAnimationFrame(tick)
    }
    raf = requestAnimationFrame(tick)
    return () => cancelAnimationFrame(raf)
  }, [target, duration, reduced])

  return value
}

export const lerp = (a: number, b: number, t: number) => a + (b - a) * t
