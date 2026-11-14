import { useState } from 'react'
import { C, Callout, Label } from './parts'
import { Figure, Toggle, along } from './Figure'
import { useFrame } from '../lib/useFrame'

const RIGHT_LUNG = 'M420 120 C340 130 252 230 232 360 C218 450 226 510 250 530 C330 520 400 525 458 512 C462 400 460 262 448 170 C444 140 434 122 420 120 Z'
const LEFT_LUNG = 'M580 120 C660 130 748 230 768 360 C782 450 774 510 750 530 C690 520 632 524 572 515 C586 480 608 456 600 426 C586 400 562 380 560 320 C560 252 566 170 580 120 Z'
const PEANUT: [number, number][] = [[500, -10], [500, 196], [446, 244], [404, 292]]

function Tube({ d, w }: { d: string; w: number }) {
  return (
    <g fill="none" strokeLinecap="round" strokeLinejoin="round">
      <path d={d} stroke={C.euc} strokeWidth={w} />
      <path d={d} stroke={C.cartilage} strokeWidth={w - 6} />
    </g>
  )
}

export function BronchiFigure() {
  const [view, setView] = useState<'airways' | 'lobes'>('airways')
  const [dropAt, setDropAt] = useState(0)
  const [f, setF] = useState(0)
  useFrame(() => setF(Math.min(1, (performance.now() - dropAt) / 1600)), dropAt > 0 && f < 1)
  const e = f < 0.5 ? 2 * f * f : 1 - Math.pow(-2 * f + 2, 2) / 2
  const [px, py] = along(PEANUT, e)
  const lobes = view === 'lobes'
  const landed = dropAt > 0 && f >= 1

  return (
    <Figure
      controls={
        <>
          <Toggle label="Show" value={view} onChange={setView} options={[{ value: 'airways', label: 'Airways' }, { value: 'lobes', label: 'Lobes' }]} />
          <button type="button" className="btn btn--ghost btn--sm" onClick={() => { setF(0); setDropAt(performance.now()) }}>
            Drop a peanut
          </button>
        </>
      }
      caption={
        landed
          ? 'The peanut went into the RIGHT bronchus: it is wider and more vertical, so inhaled objects usually end up there.'
          : lobes
            ? 'The right lung has 3 lobes. The left lung has 2, leaving room for the heart.'
            : 'The trachea splits into the right and left bronchi, which keep branching into smaller tubes: the bronchial tree.'
      }
    >
      <svg viewBox="0 0 1000 560" role="img" aria-labelledby="br-t" className="figure-svg">
        <title id="br-t">
          Front view of both lungs. The trachea splits into the right and left bronchi. The right lung has 3 lobes and the left lung has 2, with
          room for the heart.
        </title>
        <defs>
          <clipPath id="br-rl">
            <path d={RIGHT_LUNG} />
          </clipPath>
          <clipPath id="br-ll">
            <path d={LEFT_LUNG} />
          </clipPath>
        </defs>
        {/* heart behind */}
        <path d="M560 400 C520 380 494 420 512 456 C530 492 572 512 604 510 C618 470 604 420 560 400 Z" fill={C.coral} opacity={lobes ? 0.7 : 0.25} style={{ transition: 'opacity .5s' }} />
        {/* lungs */}
        <path d={RIGHT_LUNG} fill={C.blush} fillOpacity="0.55" />
        <path d={LEFT_LUNG} fill={C.blush} fillOpacity="0.55" />
        <g style={{ transition: 'opacity .5s' }} opacity={lobes ? 1 : 0}>
          <g clipPath="url(#br-rl)">
            <path d="M0 0 L600 0 L600 300 L455 300 L240 336 L0 336 Z" fill={C.coral} opacity="0.55" />
            <path d="M0 352 L238 352 L458 500 L600 510 L600 600 L0 600 Z" fill={C.sage} opacity="0.75" />
          </g>
          <g clipPath="url(#br-ll)">
            <path d="M400 0 L1000 0 L1000 300 L770 300 L575 505 L400 505 Z" fill={C.coral} opacity="0.55" />
            <path d="M770 312 L1000 312 L1000 600 L560 600 L560 512 Z" fill={C.sage} opacity="0.75" />
          </g>
        </g>
        <path d={RIGHT_LUNG} fill="none" stroke={C.euc} strokeWidth="2" />
        <path d={LEFT_LUNG} fill="none" stroke={C.euc} strokeWidth="2" />
        {/* trachea */}
        <rect x="478" y="10" width="44" height="190" fill={C.paper} stroke={C.euc} strokeWidth="2" />
        {[24, 50, 76, 102, 128, 154].map((y) => (
          <rect key={y} x="476" y={y} width="48" height="12" rx="6" fill={C.cartilage} stroke={C.euc} strokeWidth="1.2" />
        ))}
        {/* bronchi + tree */}
        <Tube d="M492 196 L404 292" w={30} />
        <Tube d="M508 196 L612 262" w={22} />
        <g opacity={lobes ? 0.35 : 1} style={{ transition: 'opacity .5s' }}>
          <Tube d="M404 292 L352 214" w={14} />
          <Tube d="M404 292 L418 380" w={13} />
          <Tube d="M404 292 L320 420" w={14} />
          <Tube d="M612 262 L668 196" w={13} />
          <Tube d="M612 262 L680 420" w={14} />
          <g stroke={C.euc} strokeWidth="3" strokeLinecap="round" fill="none">
            <path d="M352 214 L322 186 M352 214 L332 240 M418 380 L404 418 M418 380 L440 420 M320 420 L290 452 M320 420 L326 474 M668 196 L700 176 M668 196 L690 232 M680 420 L716 450 M680 420 L672 470" />
          </g>
        </g>
        {lobes && (
          <g>
            <text x="320" y="240" className="figure-num">1</text>
            <text x="402" y="440" className="figure-num">2</text>
            <text x="300" y="490" className="figure-num">3</text>
            <text x="660" y="300" className="figure-num">1</text>
            <text x="690" y="470" className="figure-num">2</text>
          </g>
        )}
        {dropAt > 0 && (
          <g transform={`translate(${px} ${py}) rotate(${e * 220})`}>
            <path d="M-9 -13 C-16 -5 -16 5 -9 13 C-4 16 4 16 9 13 C16 5 16 -5 9 -13 C4 -16 -4 -16 -9 -13 Z" fill="#D9B676" stroke={C.deep} strokeWidth="2" />
          </g>
        )}

        <Label x={210} y={150} anchor="end" bold>Right lung</Label>
        <Label x={210} y={170} anchor="end" small>3 lobes</Label>
        <Label x={790} y={150} bold>Left lung</Label>
        <Label x={790} y={170} small>2 lobes</Label>
        <Callout at={[522, 60]} to={[600, 50]} label="Trachea" />
        <Callout at={[440, 250]} to={[210, 250]} label="Right bronchus" sub="wider, more vertical" anchor="end" />
        <Callout at={[566, 232]} to={[790, 240]} label="Left bronchus" sub="narrower, angled" />
        <Callout at={[320, 420]} to={[210, 400]} label="Bronchial tree" sub="smaller and smaller branches" anchor="end" />
        <Callout at={[560, 470]} to={[790, 470]} label="Heart" sub="sits in a notch of the left lung" />
      </svg>
    </Figure>
  )
}
