import { FilmPlayer } from '../film/FilmPlayer'
import '../styles/film.css'

export function TourSection() {
  return (
    <section id="tour" className="home-section home-film on-dark" aria-labelledby="tour-title">
      <div className="container">
        <p className="eyebrow">Step 1</p>
        <h2 id="tour-title">Watch the tour</h2>
      </div>
      <div className="home-film__player">
        <FilmPlayer />
      </div>
    </section>
  )
}
