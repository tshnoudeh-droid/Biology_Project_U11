import { Route, Routes } from 'react-router-dom'
import { Layout } from './components/Layout'
import Home from './pages/Home'
import TourMap from './pages/TourMap'
import TourFilm from './pages/TourFilm'
import StopPage from './pages/StopPage'
import Book from './pages/Book'
import About from './pages/About'
import Sources from './pages/Sources'
import NotFound from './pages/NotFound'

export default function App() {
  return (
    <Routes>
      <Route element={<Layout />}>
        <Route index element={<Home />} />
        <Route path="tour" element={<TourFilm />} />
        <Route path="tour/map" element={<TourMap />} />
        <Route path="tour/:stop" element={<StopPage />} />
        <Route path="book" element={<Book />} />
        <Route path="about" element={<About />} />
        <Route path="sources" element={<Sources />} />
        <Route path="*" element={<NotFound />} />
      </Route>
    </Routes>
  )
}
