import { useMemo, useState } from 'react'

const ORDER = ['Alveoli', 'Bronchioles', 'Bronchi', 'Trachea', 'Larynx', 'Pharynx', 'Nasal cavity']

/** Puzzle: tap the structures in the order air leaves the body. */
export function RouteRide() {
  const [done, setDone] = useState(0)
  const [wrong, setWrong] = useState<string | null>(null)
  const [round, setRound] = useState(0)
  const shuffled = useMemo(() => {
    const a = [...ORDER]
    for (let i = a.length - 1; i > 0; i--) {
      const j = (i * 7 + round * 3 + 5) % (i + 1)
      ;[a[i], a[j]] = [a[j], a[i]]
    }
    return a
  }, [round])
  const finished = done === ORDER.length

  const pick = (name: string) => {
    if (finished) return
    if (name === ORDER[done]) {
      setDone(done + 1)
      setWrong(null)
    } else setWrong(name)
  }

  return (
    <div className="ride ride--stack">
      <div className="route-track" aria-hidden="true">
        {ORDER.map((n, i) => (
          <span key={n} className={`route-track__step${i < done ? ' is-done' : ''}`}>
            {i < done ? n : i + 1}
          </span>
        ))}
        <span className={`route-track__step route-track__out${finished ? ' is-done' : ''}`}>Out!</span>
      </div>
      <div className="route-pieces" role="group" aria-label="Tap the structures in exhale order">
        {shuffled.map((n) => {
          const used = ORDER.indexOf(n) < done
          return (
            <button key={n} type="button" className={`route-piece${used ? ' is-used' : ''}${wrong === n ? ' is-wrong' : ''}`} disabled={used} onClick={() => pick(n)}>
              {n}
            </button>
          )
        })}
      </div>
      <p className="ride__caption" aria-live="polite">
        {finished
          ? 'Checked out! Air leaves by the same route it came in, just backwards.'
          : wrong
            ? `Not yet: ${wrong} comes later. Where does the air go after ${done ? ORDER[done - 1].toLowerCase() : 'it starts in the alveoli'}?`
            : done === 0
              ? 'Breathing out starts deep in the lungs. Tap the first stop.'
              : `Nice. Next stop after ${ORDER[done - 1].toLowerCase()}?`}
      </p>
      {finished && (
        <button type="button" className="btn btn--ghost-dark btn--sm" onClick={() => { setDone(0); setWrong(null); setRound((r) => r + 1) }}>
          Play again
        </button>
      )}
    </div>
  )
}
