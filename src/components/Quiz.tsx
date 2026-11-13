import { useMemo, useState } from 'react'
import type { Quiz as QuizType } from '../data/tour'
import { IconCheck, IconX } from './Icons'

function seededShuffle<T>(arr: T[], seed: string): T[] {
  let h = 2166136261
  for (let i = 0; i < seed.length; i++) h = Math.imul(h ^ seed.charCodeAt(i), 16777619)
  const out = [...arr]
  for (let i = out.length - 1; i > 0; i--) {
    h = Math.imul(h ^ (h >>> 15), 2246822507)
    const j = Math.abs(h) % (i + 1)
    ;[out[i], out[j]] = [out[j], out[i]]
  }
  return out
}

export function Quiz({ quiz, id }: { quiz: QuizType; id: string }) {
  const options = useMemo(() => seededShuffle(quiz.options, id), [quiz, id])
  const [picked, setPicked] = useState<number | null>(null)
  const choice = picked !== null ? options[picked] : null

  return (
    <section className="quiz card" aria-labelledby={`${id}-quiz`}>
      <p className="eyebrow">Travel quiz</p>
      <h3 id={`${id}-quiz`} className="quiz__q">
        {quiz.question}
      </h3>
      <ul className="quiz__options">
        {options.map((o, i) => {
          const state =
            picked === null ? '' : o.correct ? ' is-correct' : i === picked ? ' is-wrong' : ' is-dim'
          return (
            <li key={o.text}>
              <button
                type="button"
                className={`quiz__option${state}`}
                onClick={() => setPicked(i)}
                disabled={picked !== null && choice?.correct}
                aria-pressed={picked === i}
              >
                <span className="quiz__letter" aria-hidden="true">
                  {String.fromCharCode(65 + i)}
                </span>
                <span>{o.text}</span>
                {picked !== null && o.correct && <IconCheck className="quiz__mark" />}
                {picked === i && !o.correct && <IconX className="quiz__mark" />}
              </button>
            </li>
          )
        })}
      </ul>
      <div className="quiz__feedback" aria-live="polite">
        {choice && (
          <div className={`quiz__result ${choice.correct ? 'is-correct' : 'is-wrong'}`}>
            <p>{choice.why}</p>
            {!choice.correct ? (
              <button type="button" className="btn btn--ghost btn--sm" onClick={() => setPicked(null)}>
                Try again
              </button>
            ) : (
              <button type="button" className="btn btn--ghost btn--sm" onClick={() => setPicked(null)}>
                Reset quiz
              </button>
            )}
          </div>
        )}
      </div>
    </section>
  )
}
