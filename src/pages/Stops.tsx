import { useEffect } from 'react'
import { ResortMap } from '../components/ResortMap'
import { ExtrasGrid } from '../components/ExtrasGrid'

export default function Stops() {
  useEffect(() => {
    document.title = 'Resort Map · Alvea'
  }, [])
  return (
    <>
      <section className="map-page" aria-label="Resort map">
        <div className="container">
          <ResortMap headingLevel={1} />
        </div>
      </section>
      <section className="section section--tight" aria-labelledby="extras-title">
        <div className="container">
          <h2 id="extras-title">More to explore</h2>
          <ExtrasGrid />
        </div>
      </section>
    </>
  )
}
