import { Navigate, Route, Routes } from 'react-router-dom'
import { Layout } from './components/Layout'
import Home from './pages/Home'
import StopPage from './pages/StopPage'
import NotFound from './pages/NotFound'

export default function App() {
  return (
    <Routes>
      <Route element={<Layout />}>
        <Route index element={<Home />} />
        <Route path="tour/:stop" element={<StopPage />} />
        {/* old addresses jump to the matching home-page section */}
        <Route path="tour" element={<Navigate to="/#tour" replace />} />
        <Route path="stops" element={<Navigate to="/#map" replace />} />
        <Route path="tour/map" element={<Navigate to="/#map" replace />} />
        <Route path="book" element={<Navigate to="/#book" replace />} />
        <Route path="sources" element={<Navigate to="/#sources" replace />} />
        <Route path="about" element={<Navigate to="/#sources" replace />} />
        <Route path="*" element={<NotFound />} />
      </Route>
    </Routes>
  )
}
