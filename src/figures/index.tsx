import type { ComponentType } from 'react'
import { NasalFigure } from './NasalFigure'
import { PharynxFigure } from './PharynxFigure'
import { LarynxFigure } from './LarynxFigure'
import { TracheaFigure } from './TracheaFigure'
import { BronchiFigure } from './BronchiFigure'
import { BronchiolesFigure } from './BronchiolesFigure'
import { AlveoliFigure } from './AlveoliFigure'
import { GasFigure } from './GasFigure'
import { DiaphragmFigure } from './DiaphragmFigure'
import { ControlFigure } from './ControlFigure'
import { ExhalationFigure } from './ExhalationFigure'
import { DisordersFigure } from './DisordersFigure'

/** One interactive, labelled figure per stop (keyed by stop slug). */
export const figures: Record<string, ComponentType> = {
  'nasal-cavity': NasalFigure,
  pharynx: PharynxFigure,
  larynx: LarynxFigure,
  trachea: TracheaFigure,
  bronchi: BronchiFigure,
  bronchioles: BronchiolesFigure,
  alveoli: AlveoliFigure,
  'gas-exchange': GasFigure,
  diaphragm: DiaphragmFigure,
  concierge: ControlFigure,
  'check-out': ExhalationFigure,
  advisories: DisordersFigure,
}
