import { useEffect } from 'react'
import { Link } from 'react-router-dom'
import { FilmPlayer } from '../film/FilmPlayer'
import { IconMap } from '../components/Icons'
import '../styles/film.css'

export default function TourFilm() {
  useEffect(() => {
    document.title = 'The Tour · Alvea'
  }, [])
  return (
    <section className="film-page on-dark" aria-label="The Alvea tour">
      <div className="film-page__inner">
        <FilmPlayer />
        <p className="film-page__alt">
          Want to explore each stop yourself?{' '}
          <Link to="/stops">
            <IconMap /> Open the resort map
          </Link>
        </p>
      </div>
    </section>
  )
}
