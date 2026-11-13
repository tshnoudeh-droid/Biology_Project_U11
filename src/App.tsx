import { Route, Routes } from 'react-router-dom'
import { Layout } from './components/Layout'
import Home from './pages/Home'
import TourMap from './pages/TourMap'
import StopPage from './pages/StopPage'
import NotFound from './pages/NotFound'

export default function App() {
  return (
    <Routes>
      <Route element={<Layout />}>
        <Route index element={<Home />} />
        <Route path="tour" element={<TourMap />} />
        <Route path="tour/:stop" element={<StopPage />} />
        <Route path="*" element={<NotFound />} />
      </Route>
    </Routes>
  )
}
