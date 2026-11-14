import { useEffect, useRef, useState, type FormEvent } from 'react'
import { IconCheck, IconPhone, IconX } from '../components/Icons'
import { LogoMark } from '../components/Logo'
import '../styles/book.css'

const packages = [
  {
    id: 'day',
    name: 'The Day Breather',
    route: 'Upper Airway Tour · Stops 1–3',
    includes: ['Nasal Welcome Lodge', 'Crossroads Plaza', 'Voice Box Concert Hall'],
    note: 'Perfect for first-time guests. Filtered, warmed and humidified on arrival.',
  },
  {
    id: 'deep',
    name: 'The Deep Dive',
    route: 'Full journey to the alveoli and back · all stops',
    includes: ['All 8 stops in anatomical order', 'Gas Exchange Market', 'Concierge Desk', 'Express check-out by exhalation'],
    note: 'Our signature experience. The complete respiratory system, start to finish.',
    featured: true,
  },
  {
    id: 'spa',
    name: 'Alveoli Spa Weekend',
    route: 'Stop 7 · Gas Exchange Market · Drop Tower',
    includes: ['Alveoli Hot Springs', 'Great Exchange Market', 'Diaphragm Drop Tower'],
    note: 'Pure relaxation in the respiratory zone, with one thrill ride.',
  },
]

const addOns = [
  { id: 'surfactant', name: 'Surfactant Massage', note: 'Keeps your alveoli open and relaxed' },
  { id: 'cilia', name: 'Cilia Sweep Facial', note: 'A gentle mucociliary cleanse' },
  { id: 'yoga', name: 'Diaphragm Yoga', note: 'Deep belly breathing with our instructors' },
]

type Booking = {
  name: string
  date: string
  guests: string
  pkg: string
  entry: string
  addons: string[]
  code: string
}

function makeCode() {
  return `ALV-O2-${Math.floor(1000 + Math.random() * 9000)}`
}

/** Booking section on the home page. Nothing is stored or sent anywhere. */
export function BookSection() {
  const [pkg, setPkg] = useState('deep')
  const [booking, setBooking] = useState<Booking | null>(null)
  const dialogRef = useRef<HTMLDialogElement>(null)
  const today = new Date().toISOString().slice(0, 10)

  useEffect(() => {
    const d = dialogRef.current
    if (!d) return
    if (booking && !d.open) d.showModal()
    if (!booking && d.open) d.close()
  }, [booking])

  const onSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    const fd = new FormData(e.currentTarget)
    // Nothing is stored or sent anywhere: the data lives only in this component's state.
    setBooking({
      name: String(fd.get('name') || '').trim(),
      date: String(fd.get('date') || ''),
      guests: String(fd.get('guests') || '1'),
      pkg: String(fd.get('package') || pkg),
      entry: String(fd.get('entry') || 'nasal'),
      addons: fd.getAll('addons').map(String),
      code: makeCode(),
    })
  }

  const chosen = packages.find((p) => p.id === booking?.pkg)
  const prettyDate = booking?.date
    ? new Date(booking.date + 'T12:00:00').toLocaleDateString('en-CA', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })
    : ''

  return (
    <section id="book" className="home-section book" aria-labelledby="book-title">
      <div className="book-hero on-dark">
        <div className="container book-hero__inner">
          <div>
            <p className="eyebrow">Step 3 · Reservations</p>
            <h2 id="book-title">Book your stay</h2>
            <p className="tagline">Every breath, a destination. Choose yours.</p>
          </div>
          <div className="book-phone">
            <IconPhone />
            <span>
              <span className="book-phone__label">Call the front desk</span>
              <span className="book-phone__number">1-800-ALVEOLI</span>
            </span>
          </div>
        </div>
      </div>

      <div className="section section--tight">
        <div className="container">
          <form className="book-form" onSubmit={onSubmit} noValidate={false}>
            <fieldset className="book-fieldset">
              <legend id="menu-title" className="book-legend">
                <span className="eyebrow">Package</span>
                <span className="book-legend__title">Choose a package</span>
              </legend>
              <div className="packages">
                {packages.map((p) => (
                  <label key={p.id} className={`package${pkg === p.id ? ' is-selected' : ''}${p.featured ? ' package--featured' : ''}`}>
                    <input
                      type="radio"
                      name="package"
                      value={p.id}
                      checked={pkg === p.id}
                      onChange={() => setPkg(p.id)}
                      className="visually-hidden"
                    />
                    {p.featured && <span className="package__badge">Most popular</span>}
                    <span className="package__name">{p.name}</span>
                    <span className="package__route">{p.route}</span>
                    <span className="package__rule" aria-hidden="true" />
                    <ul className="package__list">
                      {p.includes.map((i) => (
                        <li key={i}>
                          <IconCheck /> {i}
                        </li>
                      ))}
                    </ul>
                    <span className="package__note">{p.note}</span>
                    <span className="package__price">Complimentary with every breath</span>
                    <span className="package__select" aria-hidden="true">
                      {pkg === p.id ? 'Selected' : 'Select'}
                    </span>
                  </label>
                ))}
              </div>
            </fieldset>

            <div className="book-grid">
              <fieldset className="book-fieldset card">
                <legend className="book-legend">
                  <span className="eyebrow">Your details</span>
                  <span className="book-legend__title">Guest details</span>
                </legend>
                <div className="field">
                  <label htmlFor="name">Full name</label>
                  <input id="name" name="name" type="text" required autoComplete="off" placeholder="e.g. Ava Breathwell" />
                </div>
                <div className="field-row">
                  <div className="field">
                    <label htmlFor="date">Arrival date</label>
                    <input id="date" name="date" type="date" required min={today} />
                  </div>
                  <div className="field">
                    <label htmlFor="guests">Number of guests</label>
                    <select id="guests" name="guests" defaultValue="2">
                      {[1, 2, 3, 4, 5, 6, 7, 8].map((n) => (
                        <option key={n} value={n}>
                          {n} {n === 1 ? 'guest' : 'guests'}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>
                <fieldset className="field">
                  <legend>Preferred entry</legend>
                  <div className="choice-row">
                    <label className="choice">
                      <input type="radio" name="entry" value="nasal" defaultChecked />
                      <span>
                        <strong>Nasal</strong> (recommended)
                        <small>Filtered, warmed and humidified on arrival</small>
                      </span>
                    </label>
                    <label className="choice">
                      <input type="radio" name="entry" value="oral" />
                      <span>
                        <strong>Oral</strong>
                        <small>Faster, but skips the welcome lodge</small>
                      </span>
                    </label>
                  </div>
                </fieldset>
              </fieldset>

              <fieldset className="book-fieldset card">
                <legend className="book-legend">
                  <span className="eyebrow">Add-ons</span>
                  <span className="book-legend__title">Spa add-ons</span>
                </legend>
                <div className="addons">
                  {addOns.map((a) => (
                    <label key={a.id} className="choice choice--box">
                      <input type="checkbox" name="addons" value={a.id} />
                      <span>
                        <strong>{a.name}</strong>
                        <small>{a.note}</small>
                      </span>
                    </label>
                  ))}
                </div>
                <p className="caption book-privacy">
                  This is a pretend booking for a school project. Nothing you type is saved or sent anywhere.
                </p>
                <button type="submit" className="btn btn--euc book-submit">
                  Confirm reservation
                </button>
              </fieldset>
            </div>
          </form>
        </div>
      </div>

      <dialog
        ref={dialogRef}
        className="confirm"
        aria-labelledby="confirm-title"
        onClose={() => setBooking(null)}
        onClick={(e) => {
          if (e.target === dialogRef.current) setBooking(null)
        }}
      >
        {booking && (
          <div className="confirm__inner">
            <button type="button" className="confirm__close" onClick={() => setBooking(null)}>
              <IconX />
              <span className="visually-hidden">Close confirmation</span>
            </button>
            <LogoMark tone="light" className="confirm__mark" />
            <p className="eyebrow">Reservation confirmed</p>
            <h2 id="confirm-title">See you soon{booking.name ? `, ${booking.name.split(' ')[0]}` : ''}.</h2>
            <p className="confirm__code">
              Booking code <strong>{booking.code}</strong>
            </p>
            <dl className="confirm__summary">
              <div>
                <dt>Package</dt>
                <dd>{chosen?.name}</dd>
              </div>
              <div>
                <dt>Arrival</dt>
                <dd>{prettyDate || 'Your next breath'}</dd>
              </div>
              <div>
                <dt>Guests</dt>
                <dd>{booking.guests}</dd>
              </div>
              <div>
                <dt>Entry</dt>
                <dd>{booking.entry === 'nasal' ? 'Nasal (recommended)' : 'Oral'}</dd>
              </div>
              <div className="confirm__wide">
                <dt>Add-ons</dt>
                <dd>{booking.addons.length ? booking.addons.map((id) => addOns.find((a) => a.id === id)?.name).join(', ') : 'None'}</dd>
              </div>
            </dl>
            <p className="tagline confirm__tagline">Your journey begins with your next breath.</p>
            <div className="confirm__actions">
              <a href="#map" className="btn btn--euc" onClick={() => setBooking(null)}>
                Explore the resort map
              </a>
              <button type="button" className="btn btn--ghost" onClick={() => setBooking(null)}>
                Done
              </button>
            </div>
            <p className="caption">Questions? Call 1-800-ALVEOLI · breathe@alveawellness.com</p>
          </div>
        )}
      </dialog>
    </section>
  )
}
