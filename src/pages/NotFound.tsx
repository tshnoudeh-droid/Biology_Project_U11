import { Link } from 'react-router-dom'

export default function NotFound() {
  return (
    <section className="section center">
      <div className="container">
        <p className="eyebrow">Wrong turn</p>
        <h1>This wing doesn't exist</h1>
        <p className="lede">Even the bronchial tree has its limits. Let's get you back on the route.</p>
        <p>
          <Link to="/tour" className="btn btn--euc">
            Back to the resort map
          </Link>
        </p>
      </div>
    </section>
  )
}
