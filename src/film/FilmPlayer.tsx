import { useCallback, useEffect, useRef, useState } from 'react'
import { Link } from 'react-router-dom'
import { scenes, starts, TOTAL } from './scenes'
import { rich } from '../lib/rich'
import { IconArrowLeft, IconArrowRight, IconPlay } from '../components/Icons'

const fmt = (s: number) => `${Math.floor(s / 60)}:${String(Math.floor(s % 60)).padStart(2, '0')}`

function IconPause(p: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true" {...p}>
      <rect x="6" y="5" width="4" height="14" rx="1" />
      <rect x="14" y="5" width="4" height="14" rx="1" />
    </svg>
  )
}

export function FilmPlayer() {
  const [time, setTime] = useState(0)
  const [playing, setPlaying] = useState(false)
  const [started, setStarted] = useState(false)
  const timeRef = useRef(0)
  const raf = useRef(0)

  const seek = useCallback((t: number) => {
    const v = Math.max(0, Math.min(TOTAL, t))
    timeRef.current = v
    setTime(v)
  }, [])

  useEffect(() => {
    if (!import.meta.env.DEV) return
    ;(window as unknown as { __filmSeek?: (t: number) => void }).__filmSeek = (t: number) => {
      setStarted(true)
      seek(t)
    }
  }, [seek])

  useEffect(() => {
    if (!playing) return
    let last = performance.now()
    const loop = (now: number) => {
      const dt = Math.min(0.1, (now - last) / 1000)
      last = now
      const next = timeRef.current + dt
      if (next >= TOTAL) {
        seek(TOTAL)
        setPlaying(false)
        return
      }
      seek(next)
      raf.current = requestAnimationFrame(loop)
    }
    raf.current = requestAnimationFrame(loop)
    return () => cancelAnimationFrame(raf.current)
  }, [playing, seek])

  const idx = Math.max(0, starts.findIndex((s, i) => time >= s && (i === scenes.length - 1 || time < starts[i + 1])))
  const scene = scenes[idx]
  const local = Math.min(scene.duration, time - starts[idx])
  const beatIdx = scene.beats.reduce((acc, b, i) => (local >= b.at ? i : acc), 0)
  const beat = scene.beats[beatIdx]
  const ended = time >= TOTAL

  const play = useCallback(() => {
    setStarted(true)
    if (timeRef.current >= TOTAL) seek(0)
    setPlaying(true)
  }, [seek])
  const toggle = useCallback(() => (playing ? setPlaying(false) : play()), [playing, play])
  const goScene = useCallback(
    (i: number) => {
      const j = Math.max(0, Math.min(scenes.length - 1, i))
      setStarted(true)
      seek(starts[j] + 0.001)
    },
    [seek],
  )

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      const el = e.target as HTMLElement
      if (el.closest('input, textarea, select')) return
      if (e.key === ' ' || e.key === 'k') {
        if (el.tagName === 'BUTTON' || el.tagName === 'A') return
        e.preventDefault()
        toggle()
      } else if (e.key === 'ArrowRight') goScene(idx + 1)
      else if (e.key === 'ArrowLeft') goScene(local > 2 ? idx : idx - 1)
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [toggle, goScene, idx, local])

  const Art = scene.Art

  return (
    <div className="film">
      <div className="film-stage" role="region" aria-roledescription="animated tour" aria-label={`Scene ${idx + 1} of ${scenes.length}: ${scene.resort}, ${scene.term}`}>
        <svg viewBox="0 0 1600 900" className="film-svg" aria-hidden="true">
          <rect width="1600" height="900" fill="#1B2A26" />
          <g key={scene.id} className="film-scene">
            <Art t={local} />
          </g>
        </svg>

        <div className="film-head" key={`h-${scene.id}`}>
          <span className="film-head__eyebrow">
            Scene {idx + 1} · {scene.term}
          </span>
          <span className="film-head__title">{scene.resort}</span>
        </div>

        <div className="film-caption" aria-live="polite">
          <p key={`${scene.id}-${beatIdx}`}>{rich(beat.text)}</p>
        </div>

        {!started && (
          <div className="film-cover">
            <p className="film-cover__eyebrow">The full tour · about {Math.round(TOTAL / 60)} minutes</p>
            <h1 className="film-cover__title">Step inside Alvea</h1>
            <p className="film-cover__lede">
              Follow our O₂ guests from the front doors to the spa rooms, and our CO₂ guests all the way to check-out.
            </p>
            <button type="button" className="btn btn--blush film-cover__btn" onClick={play}>
              <IconPlay /> Begin the tour
            </button>
            <p className="film-cover__hint">Space to pause · ← → to skip scenes</p>
          </div>
        )}

        {ended && (
          <div className="film-cover film-cover--end">
            <h2 className="film-cover__title">Thanks for visiting</h2>
            <div className="film-cover__row">
              <Link to="/book" className="btn btn--blush">
                Book your stay <IconArrowRight />
              </Link>
              <button type="button" className="btn btn--ghost-dark" onClick={play}>
                Watch again
              </button>
            </div>
          </div>
        )}
      </div>

      <div className="film-controls">
        <div className="film-controls__main">
          <button type="button" className="film-btn" onClick={() => goScene(local > 2 ? idx : idx - 1)} aria-label="Previous scene">
            <IconArrowLeft />
          </button>
          <button type="button" className="film-btn film-btn--play" onClick={toggle} aria-label={playing ? 'Pause' : 'Play'}>
            {playing ? <IconPause /> : <IconPlay />}
          </button>
          <button type="button" className="film-btn" onClick={() => goScene(idx + 1)} aria-label="Next scene">
            <IconArrowRight />
          </button>
          <span className="film-time">
            {fmt(time)} / {fmt(TOTAL)}
          </span>
          {scene.more && (
            <Link to={`/tour/${scene.more.slug}`} className="film-more" onClick={() => setPlaying(false)}>
              Learn more: {scene.more.label} <IconArrowRight />
            </Link>
          )}
        </div>
        <ol className="film-chapters" aria-label="Scenes">
          {scenes.map((s, i) => {
            const prog = i < idx ? 1 : i > idx ? 0 : local / s.duration
            return (
              <li key={s.id} style={{ flexGrow: s.duration }}>
                <button
                  type="button"
                  className={`film-chapter${i === idx ? ' is-current' : ''}`}
                  onClick={() => goScene(i)}
                  aria-current={i === idx ? 'step' : undefined}
                  aria-label={`Scene ${i + 1}: ${s.chapter}, ${s.term}`}
                >
                  <span className="film-chapter__bar">
                    <span style={{ width: `${prog * 100}%` }} />
                  </span>
                  <span className="film-chapter__name">{s.chapter}</span>
                </button>
              </li>
            )
          })}
        </ol>
      </div>
    </div>
  )
}
