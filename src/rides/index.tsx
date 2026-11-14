import type { ComponentType } from 'react'
import type { RideKey } from '../data/tour'
import { AsthmaRide } from './AsthmaRide'
import { SurfactantRide } from './SurfactantRide'
import { GasRide } from './GasRide'
import { DiaphragmRide } from './DiaphragmRide'
import { ChemoRide } from './ChemoRide'
import { NoseRide } from './NoseRide'
import { SwallowRide } from './SwallowRide'
import { CiliaRide } from './CiliaRide'
import { PeanutRide } from './PeanutRide'
import { RouteRide } from './RouteRide'
import { AdvisoryRide } from './AdvisoryRide'
import '../styles/rides.css'

export const rideMeta: Record<RideKey, { title: string; blurb: string }> = {
  nose: { title: 'Nose vs mouth', blurb: 'Switch routes and watch what happens to the dust and the cold air.' },
  swallow: { title: 'Breathe or swallow?', blurb: 'Watch the epiglottis flip down when you swallow.' },
  cilia: { title: 'The mucus escalator', blurb: 'Compare a healthy airway with a smoker’s.' },
  peanut: { title: 'Down the wrong pipe', blurb: 'Drop a peanut and see which lung it lands in.' },
  asthma: { title: 'Asthma mode', blurb: 'Switch on an asthma attack and watch the airway narrow.' },
  surfactant: { title: 'The surfactant switch', blurb: 'Turn surfactant off and watch the alveolus collapse.' },
  gas: { title: 'Live from the exchange', blurb: 'Watch oxygen and carbon dioxide trade places.' },
  diaphragm: { title: 'The drop tower', blurb: 'Press Inhale or Exhale and watch the pressure change.' },
  chemo: { title: 'The CO₂ dial', blurb: 'Raise blood CO₂ and see how your breathing responds.' },
  route: { title: 'Find your way out', blurb: 'Tap the stops in the order air leaves your body.' },
  advisory: { title: 'Healthy vs affected', blurb: 'Pick a condition and switch it on.' },
}

export const rides: Record<RideKey, ComponentType> = {
  asthma: AsthmaRide,
  surfactant: SurfactantRide,
  gas: GasRide,
  diaphragm: DiaphragmRide,
  chemo: ChemoRide,
  nose: NoseRide,
  swallow: SwallowRide,
  cilia: CiliaRide,
  peanut: PeanutRide,
  route: RouteRide,
  advisory: AdvisoryRide,
}
