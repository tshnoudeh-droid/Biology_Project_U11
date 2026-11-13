import type { ComponentType } from 'react'
import type { RideKey } from '../data/tour'

export const rideMeta: Record<RideKey, { eyebrow: string; title: string; blurb: string }> = {
  asthma: {
    eyebrow: 'Thrill ride · Stop 6',
    title: 'Asthma Mode',
    blurb: 'Toggle bronchoconstriction and watch the smooth muscle tighten. The narrower the trail, the slower the airflow.',
  },
  surfactant: {
    eyebrow: 'Thrill ride · Stop 7',
    title: 'The Surfactant Switch',
    blurb: 'Turn surfactant off and watch surface tension pull the alveolus closed.',
  },
  gas: {
    eyebrow: 'Thrill ride · Stop 7b',
    title: 'Live from the Exchange Market',
    blurb: 'Watch O₂ and CO₂ diffuse across the respiratory membrane, each moving down its own partial-pressure gradient.',
  },
  diaphragm: {
    eyebrow: 'Thrill ride · Stop 8',
    title: 'The Diaphragm Drop Tower',
    blurb: 'Press Inhale or Exhale. Watch the diaphragm, ribs and lungs move, and follow Boyle’s law on the gauges.',
  },
  chemo: {
    eyebrow: 'Interactive · Concierge',
    title: 'The CO₂ Dial',
    blurb: 'Raise or lower blood CO₂ and see how the chemoreceptors tell the medulla to change your breathing.',
  },
}

export const rides: Partial<Record<RideKey, ComponentType>> = {}
