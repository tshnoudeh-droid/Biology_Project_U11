import { useCallback, useEffect, useRef, useState } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import { LogoMark } from './Logo'
import { IconArrowRight } from './Icons'
import '../styles/intro.css'

/** Fire this to open the intro from anywhere (e.g. a "Watch the intro" button). */
export const OPEN_INTRO_EVENT = 'alvea:open-intro'
export const openIntro = () => window.dispatchEvent(new Event(OPEN_INTRO_EVENT))
/** Fired by other players (e.g. a stop's guide video) that need the corner. */
export const CLOSE_INTRO_EVENT = 'alvea:close-intro'

const SRC = '/videos/intro.mp4'
const POSTER = '/videos/intro-poster.jpg'
/** ms of *visible* time on the home page before the intro opens */
const OPEN_DELAY = 2000

type Mode = 'hidden' | 'expanded' | 'mini'

const fmt = (s: number) => {
  if (!Number.isFinite(s)) return '0:00'
  const m = Math.floor(s / 60)
  const sec = Math.floor(s % 60)
  return `${m}:${sec.toString().padStart(2, '0')}`
}

export function IntroVideo() {
  const { pathname } = useLocation()
  const navigate = useNavigate()
  const videoRef = useRef<HTMLVideoElement>(null)
  const dialogRef = useRef<HTMLDivElement>(null)
  const [mode, setMode] = useState<Mode>('hidden')
  const [playing, setPlaying] = useState(false)
  const [muted, setMuted] = useState(false)
  const [needsSound, setNeedsSound] = useState(false)
  const [ended, setEnded] = useState(false)
  const [time, setTime] = useState(0)
  const [duration, setDuration] = useState(0)
  /** true while the tab is hidden and we paused it ourselves */
  const pausedByTab = useRef(false)
  const autoOpened = useRef(false)

  /** Try to play with sound; if the browser blocks it, play muted and offer a sound button. */
  const play = useCallback(async () => {
    const v = videoRef.current
    if (!v) return
    setEnded(false)
    try {
      await v.play()
    } catch {
      v.muted = true
      setMuted(true)
      setNeedsSound(true)
      try {
        await v.play()
      } catch {
        /* still blocked: the big play button stays visible */
      }
    }
  }, [])

  const open = useCallback(() => {
    setMode('expanded')
    // wait a frame so the element is visible before calling play()
    requestAnimationFrame(() => play())
  }, [play])

  // Auto-open: 2 s of visible time on the home page, once per page load.
  useEffect(() => {
    if (autoOpened.current || pathname !== '/') return
    let elapsed = 0
    let last = performance.now()
    let id = 0
    const tick = () => {
      const now = performance.now()
      if (document.visibilityState === 'visible') elapsed += Math.min(now - last, 250)
      last = now
      if (elapsed >= OPEN_DELAY) {
        autoOpened.current = true
        open()
        return
      }
      id = window.setTimeout(tick, 100)
    }
    id = window.setTimeout(tick, 100)
    return () => window.clearTimeout(id)
  }, [pathname, open])

  // Manual open from elsewhere on the site.
  useEffect(() => {
    const onOpen = () => {
      autoOpened.current = true
      const v = videoRef.current
      if (v && v.ended) v.currentTime = 0
      open()
    }
    window.addEventListener(OPEN_INTRO_EVENT, onOpen)
    return () => window.removeEventListener(OPEN_INTRO_EVENT, onOpen)
  }, [open])

  // Another player is starting: step aside.
  useEffect(() => {
    const onClose = () => {
      autoOpened.current = true
      videoRef.current?.pause()
      pausedByTab.current = false
      setMode('hidden')
    }
    window.addEventListener(CLOSE_INTRO_EVENT, onClose)
    return () => window.removeEventListener(CLOSE_INTRO_EVENT, onClose)
  }, [])

  // Pause when the tab is hidden / window minimised; resume when it comes back.
  useEffect(() => {
    const onVis = () => {
      const v = videoRef.current
      if (!v) return
      if (document.hidden) {
        if (!v.paused) {
          pausedByTab.current = true
          v.pause()
        }
      } else if (pausedByTab.current) {
        pausedByTab.current = false
        v.play().catch(() => {})
      }
    }
    document.addEventListener('visibilitychange', onVis)
    return () => document.removeEventListener('visibilitychange', onVis)
  }, [])

  // Expanded = modal: lock page scroll, focus the dialog, Esc docks it.
  useEffect(() => {
    if (mode !== 'expanded') return
    const root = document.documentElement
    const prevOverflow = root.style.overflow
    root.style.overflow = 'hidden'
    dialogRef.current?.focus({ preventScroll: true })
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setMode('mini')
    }
    window.addEventListener('keydown', onKey)
    return () => {
      root.style.overflow = prevOverflow
      window.removeEventListener('keydown', onKey)
    }
  }, [mode])

  const toggle = () => {
    const v = videoRef.current
    if (!v) return
    if (v.paused) {
      if (v.ended) v.currentTime = 0
      play()
    } else v.pause()
  }

  const toggleMute = () => {
    const v = videoRef.current
    if (!v) return
    v.muted = !v.muted
    setMuted(v.muted)
    setNeedsSound(false)
  }

  const close = () => {
    videoRef.current?.pause()
    pausedByTab.current = false
    setMode('hidden')
  }

  const startTour = () => {
    close()
    if (pathname === '/') {
      // wait for the scroll lock to lift, then glide to the tour
      window.setTimeout(() => document.getElementById('tour')?.scrollIntoView({ behavior: 'smooth', block: 'start' }), 50)
    } else navigate('/#tour')
  }

  const seek = (value: number) => {
    const v = videoRef.current
    if (!v || !duration) return
    v.currentTime = value
    setTime(value)
    setEnded(false)
  }

  const progress = duration ? (time / duration) * 100 : 0

  return (
    <>
      {mode === 'expanded' && <div className="intro-backdrop" onClick={() => setMode('mini')} aria-hidden="true" />}
      <div
        ref={dialogRef}
        className={`intro intro--${mode}`}
        role={mode === 'expanded' ? 'dialog' : 'region'}
        aria-modal={mode === 'expanded' ? true : undefined}
        aria-label="Welcome to Alvea: intro video"
        aria-hidden={mode === 'hidden'}
        tabIndex={-1}
        hidden={mode === 'hidden'}
      >
        <div className="intro__frame">
          <header className="intro__bar">
            <span className="intro__brand">
              <LogoMark tone="dark" className="intro__logo" />
              <span>
                <span className="intro__eyebrow">Welcome to Alvea</span>
                <span className="intro__title">A message from the owners</span>
              </span>
            </span>
            <span className="intro__winbtns">
              {mode === 'expanded' ? (
                <button type="button" className="intro__icon" onClick={() => setMode('mini')} aria-label="Minimise video">
                  <svg viewBox="0 0 24 24" aria-hidden="true"><path d="M6 18h12" /></svg>
                </button>
              ) : (
                <button type="button" className="intro__icon" onClick={() => setMode('expanded')} aria-label="Expand video">
                  <svg viewBox="0 0 24 24" aria-hidden="true"><path d="M4 9V4h5M20 9V4h-5M4 15v5h5M20 15v5h-5" /></svg>
                </button>
              )}
              <button type="button" className="intro__icon" onClick={close} aria-label="Close video">
                <svg viewBox="0 0 24 24" aria-hidden="true"><path d="M6 6l12 12M18 6L6 18" /></svg>
              </button>
            </span>
          </header>

          <div className="intro__screen">
            <video
              ref={videoRef}
              src={SRC}
              poster={POSTER}
              playsInline
              preload="metadata"
              onClick={toggle}
              onPlay={() => setPlaying(true)}
              onPause={() => setPlaying(false)}
              onEnded={() => {
                setPlaying(false)
                setEnded(true)
              }}
              onTimeUpdate={(e) => setTime(e.currentTarget.currentTime)}
              onLoadedMetadata={(e) => setDuration(e.currentTarget.duration)}
            />

            {!playing && !ended && (
              <button type="button" className="intro__bigplay" onClick={toggle} aria-label="Play video">
                <svg viewBox="0 0 24 24" aria-hidden="true"><path d="M8 5v14l11-7z" /></svg>
              </button>
            )}

            {needsSound && playing && (
              <button type="button" className="intro__sound" onClick={toggleMute}>
                <SoundIcon muted /> Tap for sound
              </button>
            )}

            {ended && (
              <div className="intro__end">
                <p className="intro__end-title">Ready to look around?</p>
                <div className="intro__end-ctas">
                  <button type="button" className="btn btn--blush" onClick={startTour}>
                    Start the tour <IconArrowRight />
                  </button>
                  <button type="button" className="btn btn--ghost-dark" onClick={toggle}>
                    Watch again
                  </button>
                </div>
              </div>
            )}
          </div>

          <div className="intro__controls">
            <button type="button" className="intro__icon intro__icon--play" onClick={toggle} aria-label={playing ? 'Pause' : 'Play'}>
              {playing ? (
                <svg viewBox="0 0 24 24" aria-hidden="true"><path d="M8 5v14M16 5v14" /></svg>
              ) : (
                <svg viewBox="0 0 24 24" aria-hidden="true"><path d="M8 5v14l11-7z" className="fill" /></svg>
              )}
            </button>
            <span className="intro__time">{fmt(time)}</span>
            <input
              type="range"
              className="intro__seek"
              min={0}
              max={duration || 0}
              step={0.1}
              value={time}
              onChange={(e) => seek(Number(e.target.value))}
              style={{ ['--p' as string]: `${progress}%` }}
              aria-label="Seek"
              aria-valuetext={`${fmt(time)} of ${fmt(duration)}`}
            />
            <span className="intro__time">{fmt(duration)}</span>
            <button type="button" className="intro__icon" onClick={toggleMute} aria-label={muted ? 'Unmute' : 'Mute'}>
              <SoundIcon muted={muted} />
            </button>
          </div>
        </div>
      </div>
    </>
  )
}

function SoundIcon({ muted }: { muted?: boolean }) {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true">
      <path d="M4 9h4l5-4v14l-5-4H4z" />
      {muted ? <path d="M17 9l4 6M21 9l-4 6" /> : <path d="M16.5 8.5a5 5 0 0 1 0 7M19 6a8.5 8.5 0 0 1 0 12" />}
    </svg>
  )
}
