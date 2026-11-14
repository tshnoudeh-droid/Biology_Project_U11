import { HeroSection } from '../sections/HeroSection'
import { TourSection } from '../sections/TourSection'
import { MapSection } from '../sections/MapSection'
import { BookSection } from '../sections/BookSection'
import { SourcesSection } from '../sections/SourcesSection'
import '../styles/home.css'

/** The whole main site is one scrolling page; the nav jumps between sections. */
export default function Home() {
  return (
    <>
      <HeroSection />
      <TourSection />
      <MapSection />
      <BookSection />
      <SourcesSection />
    </>
  )
}
