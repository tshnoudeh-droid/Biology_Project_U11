import { useCallback, useEffect, useMemo, useRef, useState } from 'react'
import { breathPath } from '../components/AirwayArt'
import { useReducedMotion } from './useReducedMotion'

/** Waypoint index on the breath path where each stop sits. */
const stationIdx: Record<number, number> = { 1: 2, 2: 4, 3: 6, 4: 8, 5: 9, 6: 12, 7: 13 }

const inhaleCaptions: Record<number, string> = {
  0: '**Nares** · Air enters through the nostrils.',
  1: 'Stop 1 · **Nasal cavity** · The conchae swirl the air so it is filtered, warmed and humidified.',
  2: 'Stop 2 · **Pharynx** · Air passes the nasopharynx, oropharynx and laryngopharynx.',
  3: 'Stop 3 · **Larynx** · The epiglottis stays open; air slips past the vocal cords.',
  4: 'Stop 4 · **Trachea** · C-shaped cartilage rings hold the tunnel open.',
  5: 'Stop 5 · **Bronchi** · The trachea splits at the carina into the primary bronchi.',
  6: 'Stop 6 · **Bronchioles** · Narrow smooth-muscle airways branch toward the alveoli.',
  7: 'Stop 7 · **Alveoli** · Arrival in the respiratory zone.',
}

const exhaleCaptions: Record<number, string> = {
  7: 'Stop 7 · **Alveoli** · CO₂ leaves with the exhale as the lungs recoil.',
  6: 'Stop 6 · **Bronchioles** · Heading back out along the narrow trails.',
  5: 'Stop 5 · **Bronchi** · The two branches merge at the carina.',
  4: 'Stop 4 · **Trachea** · Up the express tunnel.',
  3: 'Stop 3 · **Larynx** · Exhaled air can vibrate the vocal cords: this is when we speak.',
  2: 'Stop 2 · **Pharynx** · Back through Crossroads Plaza.',
  1: 'Stop 1 · **Nasal cavity** · The conchae recapture some moisture on the way out.',
  0: '**Out!** · CO₂ has checked out. See you next breath.',
}

const T = {
  prepIn: 2600,
  inhale: 13000,
  exchange: 3400,
  prepOut: 2400,
  exhale: 11000,
  done: 2600,
}
const TOTAL = T.prepIn + T.inhale + T.exchange + T.prepOut + T.exhale + T.done

export type BreathPhase = 'idle' | 'prepIn' | 'inhale' | 'exchange' | 'prepOut' | 'exhale' | 'done'

function useGeometry() {
  return useMemo(() => {
    const cum = [0]
    for (let i = 1; i < breathPath.length; i++) {
      const [x0, y0] = breathPath[i - 1]
      const [x1, y1] = breathPath[i]
      cum.push(cum[i - 1] + Math.hypot(x1 - x0, y1 - y0))
    }
    const total = cum[cum.length - 1]
    const pointAt = (d: number): [number, number] => {
      const dd = Math.max(0, Math.min(total, d))
      let i = 1
      while (i < cum.length - 1 && cum[i] < dd) i++
      const seg = cum[i] - cum[i - 1] || 1
      const t = (dd - cum[i - 1]) / seg
      const [x0, y0] = breathPath[i - 1]
      const [x1, y1] = breathPath[i]
      return [x0 + (x1 - x0) * t, y0 + (y1 - y0) * t]
    }
    const trailTo = (d: number, reverse: boolean) => {
      const pts: [number, number][] = []
      if (!reverse) {
        for (let i = 0; i < cum.length && cum[i] <= d; i++) pts.push(breathPath[i])
        pts.push(pointAt(d))
      } else {
        for (let i = cum.length - 1; i >= 0 && cum[i] >= d; i--) pts.push(breathPath[i])
        pts.push(pointAt(d))
      }
      return pts.map(([x, y], i) => `${i ? 'L' : 'M'}${x.toFixed(1)} ${y.toFixed(1)}`).join(' ')
    }
    const stationDist: Record<number, number> = {}
    for (const k of Object.keys(stationIdx)) stationDist[+k] = cum[stationIdx[+k]]
    return { cum, total, pointAt, trailTo, stationDist }
  }, [])
}

const ease = (t: number) => (t < 0.5 ? 2 * t * t : 1 - Math.pow(-2 * t + 2, 2) / 2)

export function useBreath() {
  const reduced = useReducedMotion()
  const geo = useGeometry()
  const [elapsed, setElapsed] = useState<number | null>(null)
  const raf = useRef(0)
  const startRef = useRef(0)

  const stop = useCallback(() => {
    cancelAnimationFrame(raf.current)
    setElapsed(null)
  }, [])

  const start = useCallback(() => {
    cancelAnimationFrame(raf.current)
    startRef.current = performance.now()
    const tick = (now: number) => {
      const e = now - startRef.current
      if (e >= TOTAL) {
        setElapsed(null)
        return
      }
      setElapsed(e)
      raf.current = requestAnimationFrame(tick)
    }
    raf.current = requestAnimationFrame(tick)
  }, [])

  useEffect(() => () => cancelAnimationFrame(raf.current), [])

  // ---- derive state from elapsed time ----
  let phase: BreathPhase = 'idle'
  let d = 0
  let local = 0
  if (elapsed !== null) {
    let e = elapsed
    if (e < T.prepIn) phase = 'prepIn'
    else if ((e -= T.prepIn) < T.inhale) ((phase = 'inhale'), (local = e / T.inhale))
    else if ((e -= T.inhale) < T.exchange) phase = 'exchange'
    else if ((e -= T.exchange) < T.prepOut) phase = 'prepOut'
    else if ((e -= T.prepOut) < T.exhale) ((phase = 'exhale'), (local = e / T.exhale))
    else phase = 'done'
  }

  const stations = [0, ...Object.values(geo.stationDist)]
  const snap = (dist: number, reverse: boolean) => {
    // reduced motion: jump from stop to stop instead of gliding
    if (!reduced) return dist
    if (!reverse) return [...stations].reverse().find((s) => s <= dist) ?? 0
    return stations.find((s) => s >= dist) ?? geo.total
  }

  if (phase === 'prepIn') d = 0
  else if (phase === 'inhale') d = snap(ease(local) * geo.total, false)
  else if (phase === 'exchange' || phase === 'prepOut') d = geo.total
  else if (phase === 'exhale') d = snap(geo.total * (1 - ease(local)), true)
  else if (phase === 'done') d = 0

  const exhaling = phase === 'exhale' || phase === 'prepOut' || phase === 'done'
  const pad = 22

  let current = 0
  if (!exhaling) {
    for (const k of [1, 2, 3, 4, 5, 6, 7]) if (geo.stationDist[k] - pad <= d) current = k
  } else {
    current = [1, 2, 3, 4, 5, 6, 7].find((k) => geo.stationDist[k] + pad >= d) ?? 0
    if (phase === 'done') current = 0
  }

  const lit = new Set<number>()
  if (phase === 'inhale' || phase === 'exchange') for (let k = 1; k <= current; k++) lit.add(k)
  if (phase === 'exhale') for (let k = current; k <= 7; k++) if (k > 0) lit.add(k)
  if (phase === 'prepIn' || phase === 'prepOut') lit.add(8)
  if (phase === 'exchange') lit.add(7)

  let caption = ''
  let captionTitle = ''
  if (phase === 'prepIn') {
    captionTitle = 'Inhale'
    caption = 'Stop 8 · **Diaphragm** contracts and flattens. Chest volume ↑, so pressure ↓ below atmospheric, and air rushes in.'
  } else if (phase === 'inhale') {
    captionTitle = 'Inhale · O₂ on board'
    caption = inhaleCaptions[current]
  } else if (phase === 'exchange') {
    captionTitle = 'Gas exchange'
    caption = 'Stop 7b · **Gas Exchange Market** · O₂ diffuses into the blood; CO₂ diffuses out into the alveolus.'
  } else if (phase === 'prepOut') {
    captionTitle = 'Exhale'
    caption = 'Stop 8 · **Diaphragm** relaxes and domes. Chest volume ↓, so pressure ↑ above atmospheric, and air flows out.'
  } else if (phase === 'exhale') {
    captionTitle = 'Exhale · CO₂ checking out'
    caption = exhaleCaptions[current]
  } else if (phase === 'done') {
    captionTitle = 'Complete'
    caption = exhaleCaptions[0]
  }

  const particle = phase === 'idle' || phase === 'done' ? null : geo.pointAt(d)
  const gas: 'O2' | 'CO2' = exhaling ? 'CO2' : phase === 'exchange' && elapsed !== null && elapsed - T.prepIn - T.inhale > T.exchange / 2 ? 'CO2' : 'O2'
  const trail = phase === 'inhale' || phase === 'exchange' ? geo.trailTo(d, false) : phase === 'exhale' || phase === 'prepOut' ? geo.trailTo(d, true) : undefined

  return {
    running: elapsed !== null,
    start,
    stop,
    phase,
    particle,
    gas,
    trail,
    lit,
    caption,
    captionTitle,
    diaphragmDown: phase === 'prepIn' || phase === 'inhale' || phase === 'exchange',
  }
}
