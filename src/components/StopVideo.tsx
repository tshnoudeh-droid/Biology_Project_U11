import { useCallback, useEffect, useRef, useState } from 'react'
import { Link } from 'react-router-dom'
import type { GuideVideo } from '../data/videos'
import { IconArrowRight } from './Icons'
import { CLOSE_INTRO_EVENT } from './IntroVideo'
import '../styles/stopvideo.css'

/** Elements the player must never sit on top of (animated figures, the quiz). */
const AVOID = '.stop .figure, .stop .quiz'
const BUBBLE_MIN = 76
const BUBBLE_MAX = 140
const GAP = 16

type Props = {
  video: GuideVideo
  title: string
  label: string
  next?: { href: string; name: string }
}

const fmt = (s: number) => (Number.isFinite(s) ? `${Math.floor(s / 60)}:${String(Math.floor(s % 60)).padStart(2, '0')}` : '0:00')

/**
 * A docked guide video in the bottom-right corner of a stop page.
 * Card when the corner is free; shrinks to a round bubble (sized to the free margin) whenever the card would cover a figure.
 */
export function StopVideo({ video, title, label, next }: Props) {
  const videoRef = useRef<HTMLVideoElement>(null)
  const [closed, setClosed] = useState(false)
  const [overlap, setOverlap] = useState(false)
  const [bubbleSize, setBubbleSize] = useState(BUBBLE_MIN)
  /** user tapped the bubble to open it while it overlaps; reset when the overlap clears */
  const [forceCard, setForceCard] = useState(false)
  const [playing, setPlaying] = useState(false)
  const [muted, setMuted] = useState(false)
  const [needsSound, setNeedsSound] = useState(false)
  const [ended, setEnded] = useState(false)
  const [time, setTime] = useState(0)
  const [duration, setDuration] = useState(0)
  const pausedByTab = useRef(false)

  const bubble = overlap && !forceCard

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
      v.play().catch(() => {})
    }
  }, [])

  // Close the intro player (same corner), then start once the tab is visible.
  useEffect(() => {
    window.dispatchEvent(new Event(CLOSE_INTRO_EVENT))
    let id = 0
    const start = () => {
      if (document.visibilityState !== 'visible') return
      document.removeEventListener('visibilitychange', start)
      id = window.setTimeout(play, 700)
    }
    document.addEventListener('visibilitychange', start)
    start()
    return () => {
      document.removeEventListener('visibilitychange', start)
      window.clearTimeout(id)
    }
  }, [play])

  // Pause with the tab / minimised window, resume on return.
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

  // Would the full card cover a figure? Check on scroll / resize (one rAF per frame).
  useEffect(() => {
    let raf = 0
    const check = () => {
      raf = 0
      const vw = window.innerWidth
      const vh = window.innerHeight
      const w = vw <= 480 ? Math.min(vw * 0.62, 260) : Math.min(Math.max(240, vw * 0.22), 320)
      const h = w / 1.5 + 96
      const zone = { left: vw - GAP - w, top: vh - GAP - h, right: vw - GAP, bottom: vh - GAP }
      const rects = Array.from(document.querySelectorAll(AVOID)).map((el) => el.getBoundingClientRect())
      const hit = rects.some((r) => r.left < zone.right && r.right > zone.left && r.top < zone.bottom && r.bottom > zone.top)
      // free space between the right edge of anything in the bottom band and the screen edge
      const band = rects.filter((r) => r.top < vh - GAP && r.bottom > vh - GAP - BUBBLE_MAX)
      const edge = band.length ? Math.max(...band.map((r) => r.right)) : 0
      setBubbleSize(Math.round(Math.min(BUBBLE_MAX, Math.max(BUBBLE_MIN, vw - GAP - edge - 12))))
      setOverlap(hit)
      if (!hit) setForceCard(false)
    }
    const schedule = () => {
      if (!raf) raf = requestAnimationFrame(check)
    }
    check()
    window.addEventListener('scroll', schedule, { passive: true })
    window.addEventListener('resize', schedule)
    return () => {
      window.removeEventListener('scroll', schedule)
      window.removeEventListener('resize', schedule)
      cancelAnimationFrame(raf)
    }
  }, [])

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
    setClosed(true)
  }

  const reopen = () => {
    setClosed(false)
    setForceCard(true)
    play()
  }

  const seek = (value: number) => {
    const v = videoRef.current
    if (!v) return
    v.currentTime = value
    setTime(value)
    setEnded(false)
  }

  const progress = duration ? (time / duration) * 100 : 0

  return (
    <>
      {closed && (
        <button type="button" className="svid-pill" onClick={reopen}>
          <svg viewBox="0 0 24 24" aria-hidden="true">
            <path d="M8 5v14l11-7z" />
          </svg>
          Watch the guide
        </button>
      )}
      <div
        className={`svid ${bubble ? 'svid--bubble' : 'svid--card'}`}
        role="region"
        aria-label={`Guide video: ${title}`}
        hidden={closed}
        style={{ ['--p' as string]: `${progress}%`, ['--bsize' as string]: `${bubbleSize}px` }}
      >
        {bubble && (
          <button type="button" className="svid__bubble-close" onClick={close} aria-label="Close video">
            <svg viewBox="0 0 24 24" aria-hidden="true"><path d="M6 6l12 12M18 6L6 18" /></svg>
          </button>
        )}
        <div className="svid__frame">
          <header className="intro__bar svid__bar">
            <span className="svid__titles">
              <span className="intro__eyebrow">{label}</span>
              <span className="intro__title">{title}</span>
            </span>
            <span className="intro__winbtns">
              <button type="button" className="intro__icon" onClick={close} aria-label="Close video">
                <svg viewBox="0 0 24 24" aria-hidden="true"><path d="M6 6l12 12M18 6L6 18" /></svg>
              </button>
            </span>
          </header>

          <div className="svid__screen">
            <video
              ref={videoRef}
              src={video.src}
              poster={video.poster}
              playsInline
              preload="metadata"
              onClick={bubble ? () => setForceCard(true) : toggle}
              onPlay={() => setPlaying(true)}
              onPause={() => setPlaying(false)}
              onEnded={() => {
                setPlaying(false)
                setEnded(true)
              }}
              onTimeUpdate={(e) => setTime(e.currentTarget.currentTime)}
              onLoadedMetadata={(e) => setDuration(e.currentTarget.duration)}
            />

            {bubble ? (
              <button type="button" className="svid__bubble-btn" onClick={() => setForceCard(true)} aria-label="Open guide video">
                {!playing && (
                  <svg viewBox="0 0 24 24" aria-hidden="true"><path d="M8 5v14l11-7z" /></svg>
                )}
              </button>
            ) : (
              <>
                {!playing && !ended && (
                  <button type="button" className="intro__bigplay" onClick={toggle} aria-label="Play video">
                    <svg viewBox="0 0 24 24" aria-hidden="true"><path d="M8 5v14l11-7z" /></svg>
                  </button>
                )}
                {needsSound && playing && (
                  <button type="button" className="intro__sound" onClick={toggleMute}>
                    <svg viewBox="0 0 24 24" aria-hidden="true"><path d="M4 9h4l5-4v14l-5-4H4z" /><path d="M17 9l4 6M21 9l-4 6" /></svg>
                    Tap for sound
                  </button>
                )}
                {ended && (
                  <div className="intro__end svid__end">
                    {next && (
                      <Link to={next.href} className="btn btn--blush">
                        Next: {next.name} <IconArrowRight />
                      </Link>
                    )}
                    <button type="button" className="btn btn--ghost-dark" onClick={toggle}>
                      Watch again
                    </button>
                  </div>
                )}
              </>
            )}
          </div>

          <div className="intro__controls svid__controls">
            <button type="button" className="intro__icon intro__icon--play" onClick={toggle} aria-label={playing ? 'Pause' : 'Play'}>
              {playing ? (
                <svg viewBox="0 0 24 24" aria-hidden="true"><path d="M8 5v14M16 5v14" /></svg>
              ) : (
                <svg viewBox="0 0 24 24" aria-hidden="true"><path d="M8 5v14l11-7z" className="fill" /></svg>
              )}
            </button>
            <input
              type="range"
              className="intro__seek"
              min={0}
              max={duration || 0}
              step={0.1}
              value={time}
              onChange={(e) => seek(Number(e.target.value))}
              aria-label="Seek"
              aria-valuetext={`${fmt(time)} of ${fmt(duration)}`}
            />
            <span className="intro__time">{fmt(duration - time)}</span>
            <button type="button" className="intro__icon" onClick={toggleMute} aria-label={muted ? 'Unmute' : 'Mute'}>
              <svg viewBox="0 0 24 24" aria-hidden="true">
                <path d="M4 9h4l5-4v14l-5-4H4z" />
                {muted ? <path d="M17 9l4 6M21 9l-4 6" /> : <path d="M16.5 8.5a5 5 0 0 1 0 7M19 6a8.5 8.5 0 0 1 0 12" />}
              </svg>
            </button>
          </div>
        </div>
      </div>
    </>
  )
}
