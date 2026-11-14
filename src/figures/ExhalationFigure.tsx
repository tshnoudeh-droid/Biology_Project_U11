import { useMemo, useState } from 'react'
import { Figure } from './Figure'

const ORDER = ['Alveoli', 'Bronchioles', 'Bronchi', 'Trachea', 'Larynx', 'Pharynx', 'Nasal cavity']

/** Puzzle: tap the structures in the order air leaves the body. */
export function ExhalationFigure() {
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
  const pick = (n: string) => {
    if (finished) return
    if (n === ORDER[done]) {
      setDone(done + 1)
      setWrong(null)
    } else setWrong(n)
  }
  return (
    <Figure
      controls={finished ? <button type="button" className="btn btn--ghost btn--sm" onClick={() => { setDone(0); setWrong(null); setRound((r) => r + 1) }}>Play again</button> : undefined}
      caption={
        finished
          ? 'Correct! Exhalation follows the inhalation route in reverse.'
          : wrong
            ? `Not yet: the ${wrong.toLowerCase()} comes later. ${done ? `Where does air go after the ${ORDER[done - 1].toLowerCase()}?` : 'Exhalation starts deep in the lungs.'}`
            : done
              ? `Good. Where does air go after the ${ORDER[done - 1].toLowerCase()}?`
              : 'Tap the structures in the order air leaves the body. Exhalation starts deep in the lungs.'
      }
    >
      <div className="route">
        <ol className="route__track" aria-label="Your route so far">
          {ORDER.map((n, i) => (
            <li key={n} className={i < done ? 'is-done' : ''}>
              {i < done ? n : i + 1}
            </li>
          ))}
          <li className={finished ? 'is-done is-out' : ''}>Out</li>
        </ol>
        <div className="route__pieces" role="group" aria-label="Structures">
          {shuffled.map((n) => {
            const used = ORDER.indexOf(n) < done
            return (
              <button key={n} type="button" className={`route__piece${wrong === n ? ' is-wrong' : ''}`} disabled={used} onClick={() => pick(n)}>
                {n}
              </button>
            )
          })}
        </div>
      </div>
    </Figure>
  )
}
