import type { ComponentType } from 'react'
import type { DiagramKey } from '../data/tour'
import { NasalDiagram } from './NasalDiagram'
import { PharynxDiagram } from './PharynxDiagram'
import { LarynxDiagram } from './LarynxDiagram'
import { TracheaDiagram } from './TracheaDiagram'
import { BronchiDiagram } from './BronchiDiagram'
import { BronchiolesDiagram } from './BronchiolesDiagram'
import { AlveoliDiagram } from './AlveoliDiagram'
import { RbcDiagram } from './RbcDiagram'
import { PleuraDiagram } from './PleuraDiagram'
import { BrainstemDiagram } from './BrainstemDiagram'
import { CheckoutDiagram } from './CheckoutDiagram'
import { AdvisoriesDiagram } from './AdvisoriesDiagram'

export const diagrams: Record<DiagramKey, ComponentType> = {
  nasal: NasalDiagram,
  pharynx: PharynxDiagram,
  larynx: LarynxDiagram,
  trachea: TracheaDiagram,
  bronchi: BronchiDiagram,
  bronchioles: BronchiolesDiagram,
  alveoli: AlveoliDiagram,
  rbc: RbcDiagram,
  diaphragm: PleuraDiagram,
  brainstem: BrainstemDiagram,
  checkout: CheckoutDiagram,
  advisories: AdvisoriesDiagram,
}
