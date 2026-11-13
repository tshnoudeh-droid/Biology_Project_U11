import { AirwayArt, breathPath } from '../components/AirwayArt'
import { LogoMark } from '../components/Logo'
import { CO2, O2, Sign, Staff, Stream, mix, ramp, window4, type Pt } from './kit'

/* ================= 7 · Room Corridors: bronchioles ================= */
type Seg = { a: Pt; b: Pt; w: number }
const segs: Seg[] = [
  { a: [60, 400], b: [380, 400], w: 74 },
  { a: [380, 400], b: [640, 250], w: 52 },
  { a: [380, 400], b: [640, 560], w: 52 },
  { a: [640, 250], b: [900, 190], w: 38 },
  { a: [640, 250], b: [900, 320], w: 38 },
  { a: [640, 560], b: [900, 500], w: 38 },
  { a: [640, 560], b: [900, 630], w: 38 },
  { a: [900, 190], b: [1150, 190], w: 30 },
  { a: [900, 320], b: [1150, 330], w: 30 },
  { a: [900, 500], b: [1150, 500], w: 30 },
  { a: [900, 630], b: [1150, 640], w: 30 },
]

function Sac({ x, y, s = 1 }: { x: number; y: number; s?: number }) {
  const c: [number, number, number][] = [[0, 0, 30], [34, -26, 24], [38, 26, 24], [6, -44, 20], [6, 46, 20], [64, 0, 22]]
  return (
    <g>
      {c.map(([dx, dy, r], i) => (
        <circle key={i} cx={x + dx * s} cy={y + dy * s} r={r * s} fill={i % 2 ? '#F4D5CC' : '#E3735E'} stroke="#B84A35" strokeWidth="2" />
      ))}
    </g>
  )
}

export function CorridorsArt({ t }: { t: number }) {
  const squeeze = window4(t, 6.5, 8, 10.5, 12)
  const k = 1 - 0.55 * squeeze
  return (
    <g>
      {segs.map((s, i) => {
        const w = s.w * (i < 7 ? k : 1)
        const dx = s.b[0] - s.a[0]
        const dy = s.b[1] - s.a[1]
        const len = Math.hypot(dx, dy)
        const nx = -dy / len
        const ny = dx / len
        const bands = Math.floor(len / 46)
        return (
          <g key={i}>
            <line x1={s.a[0]} y1={s.a[1]} x2={s.b[0]} y2={s.b[1]} stroke="#B84A35" strokeWidth={w + 14} strokeLinecap="round" />
            <line x1={s.a[0]} y1={s.a[1]} x2={s.b[0]} y2={s.b[1]} stroke="#2B4A42" strokeWidth={w} strokeLinecap="round" />
            {i < 7 &&
              Array.from({ length: bands }).map((_, j) => {
                const f = (j + 0.5) / bands
                const px = s.a[0] + dx * f
                const py = s.a[1] + dy * f
                return (
                  <line
                    key={j}
                    x1={px + nx * (w / 2 + 7)}
                    y1={py + ny * (w / 2 + 7)}
                    x2={px - nx * (w / 2 + 7)}
                    y2={py - ny * (w / 2 + 7)}
                    stroke="#E3735E"
                    strokeWidth={4 + 6 * squeeze}
                    opacity="0.85"
                  />
                )
              })}
          </g>
        )
      })}
      {/* buds on respiratory bronchioles + alveolar ducts lined with rooms */}
      {[[780, 205], [800, 305], [790, 520], [800, 610]].map(([x, y], i) => (
        <circle key={i} cx={x} cy={y - 26} r="12" fill="#E3735E" stroke="#B84A35" strokeWidth="2" />
      ))}
      {[190, 330, 500, 640].map((y, i) =>
        [960, 1020, 1080].map((x, j) => <circle key={`${i}${j}`} cx={x} cy={y + (j % 2 ? 26 : -26)} r="13" fill="#F4D5CC" stroke="#B84A35" strokeWidth="1.5" />),
      )}
      <Sac x={1190} y={190} />
      <Sac x={1190} y={330} />
      <Sac x={1190} y={500} />
      <Sac x={1190} y={640} />
      {/* guests: slow down while squeezed */}
      <Stream pts={[[0, 400], [380, 400], [640, 250], [900, 190], [1150, 190], [1200, 190]]} t={t * (1 - 0.35 * squeeze)} start={0.5} travel={9} count={4} gap={1.7} s={1} hold />
      <Stream pts={[[0, 400], [380, 400], [640, 560], [900, 630], [1150, 640], [1200, 640]]} t={t * (1 - 0.35 * squeeze)} start={1.2} travel={9} count={3} gap={1.9} s={1} hold />

      <Sign x={60} y={170} term="Bronchioles" resort="The Room Corridors" note="≤ 1 mm wide · no cartilage" show={t > 0.5} to={[240, 380]} />
      <Sign x={60} y={520} term={squeeze > 0.3 ? 'Bronchoconstriction' : 'Smooth muscle walls'} resort={squeeze > 0.3 ? 'Corridors tighten (asthma)' : 'Corridors can tighten or widen'} show={t > 6} to={[300, 432]} />
      <Sign x={460} y={30} term="Terminal bronchiole" resort="Last conducting corridor" show={t > 13} to={[560, 300]} />
      <Sign x={880} y={30} term="Respiratory bronchiole → alveolar duct" resort="Respiratory zone begins" show={t > 14.5} to={[1000, 165]} />
      <Sign x={1300} y={390} term="Alveolar sacs" resort="The spa rooms" show={t > 16} anchor="start" />
    </g>
  )
}

/* ================= 8 · Spa Rooms: alveoli ================= */
export function SpaArt({ t }: { t: number }) {
  const breathe = 1 + 0.025 * Math.sin(t * 1.2)
  const rooms: [number, number, number][] = [[400, 250, 120], [330, 520, 110], [1240, 260, 115], [1290, 520, 105]]
  const mx = 800 + Math.sin(t * 0.5) * 120
  return (
    <g>
      {/* capillaries wrapping the rooms */}
      <g fill="none" strokeWidth="9" strokeLinecap="round" opacity="0.7">
        <path d="M60 700 C300 640 420 690 560 650 C700 610 760 700 880 680" stroke="#7FA7D9" />
        <path d="M880 680 C1000 660 1100 700 1240 660 C1380 620 1460 680 1560 640" stroke="#E3735E" />
        <path d="M230 380 C330 330 500 420 560 360" stroke="#7FA7D9" />
        <path d="M1080 380 C1180 330 1300 420 1420 360" stroke="#E3735E" />
      </g>
      {/* neighbouring rooms */}
      {rooms.map(([x, y, r], i) => (
        <circle key={i} cx={x} cy={y} r={r * breathe} fill="#24403A" stroke="#E3735E" strokeWidth="5" />
      ))}
      {/* main room: cutaway */}
      <g transform={`translate(800 390) scale(${breathe}) translate(-800 -390)`}>
        <circle cx="800" cy="390" r="270" fill="#2B4A42" stroke="#E3735E" strokeWidth="7" />
        {/* surfactant shimmer along the wall */}
        <circle cx="800" cy="390" r="258" fill="none" stroke="#E9C46A" strokeWidth="4" strokeDasharray="2 12" strokeLinecap="round" transform={`rotate(${t * 8} 800 390)`} />
        {/* alveolar pore door to neighbour */}
        <rect x="1052" y="300" width="22" height="60" rx="10" fill="#1B2A26" stroke="#F4D5CC" strokeWidth="2" />
        {/* loungers */}
        {[[690, 520], [820, 545], [940, 515]].map(([x, y], i) => (
          <g key={i}>
            <rect x={x - 50} y={y} width="100" height="16" rx="8" fill="#F4D5CC" opacity="0.8" />
          </g>
        ))}
      </g>
      {/* guests relaxing */}
      <Stream pts={[[800, -60], [800, 140], [700, 300], [690, 500]]} t={t} start={0.3} travel={4} count={1} gap={1} s={1.3} hold />
      <Stream pts={[[800, -60], [800, 140], [820, 300], [820, 525]]} t={t} start={1.1} travel={4} count={1} gap={1} s={1.3} hold />
      <Stream pts={[[800, -60], [800, 140], [930, 300], [940, 495]]} t={t} start={1.9} travel={4} count={1} gap={1} s={1.3} hold />
      {/* type II masseuse with surfactant bottle */}
      <Staff x={640} y={340} s={1.15}>
        <rect x="24" y="16" width="16" height="30" rx="5" fill="#E9C46A" stroke="#1B2A26" strokeWidth="2" />
        {[0, 1, 2].map((i) => (
          <circle key={i} cx={52 + i * 12} cy={10 - i * 8 + Math.sin(t * 5 + i) * 3} r="4" fill="#E9C46A" opacity={0.5 + 0.5 * Math.sin(t * 5 + i)} />
        ))}
      </Staff>
      {/* macrophage housekeeper */}
      <g transform={`translate(${mx} 300)`}>
        <path d="M-40 0 C-40 -36 -6 -50 18 -34 C46 -30 52 0 38 18 C40 44 0 54 -18 40 C-44 40 -52 18 -40 0 Z" fill="#8FB3A6" stroke="#1B2A26" strokeWidth="2" />
        <circle cx="-8" cy="-8" r="3" fill="#1B2A26" />
        <circle cx="8" cy="-8" r="3" fill="#1B2A26" />
        <path d="M30 20 L70 60" stroke="#C9D6CF" strokeWidth="5" strokeLinecap="round" />
        <path d="M60 52 L84 76 L70 82 Z" fill="#C9D6CF" />
      </g>
      {/* dust being cleaned */}
      {t < 19 && <circle cx={mix(1000, mx + 60, ramp(t, 17, 19))} cy={360} r="8" fill="#5A6B65" />}

      <Sign x={600} y={14} term="Alveoli" resort="The Spa Rooms" note="~480 million · respiratory zone" show={t > 0.5} />
      <Sign x={1110} y={30} term="Type I alveolar cells" resort="Thin spa walls" note="gases pass straight through" show={t > 7} to={[1050, 250]} />
      <Sign x={20} y={600} term="Type II alveolar cells" resort="The Masseuses" note="apply surfactant → rooms don’t collapse" show={t > 12} to={[640, 380]} />
      <Sign x={1110} y={600} term="Alveolar macrophage" resort="Night Housekeeping" show={t > 17.5} to={[mx, 330]} />
      <Sign x={1120} y={440} term="Alveolar pore" resort="Connecting door" show={t > 20} to={[1062, 360]} />
    </g>
  )
}

/* ================= 9 · Shuttle Exchange: gas exchange ================= */
export function ShuttleArt({ t }: { t: number }) {
  const ROAD = 560
  const busX = (i: number) => ((t * 85 + i * 420) % 1900) - 220
  const buses = [0, 1, 2, 3, 4]
  const showBreak = t > 13
  return (
    <g>
      <defs>
        <linearGradient id="road" x1="0" x2="1">
          <stop offset="0" stopColor="#7FA7D9" />
          <stop offset="0.45" stopColor="#A98CB0" />
          <stop offset="0.75" stopColor="#E3735E" />
          <stop offset="1" stopColor="#E3735E" />
        </linearGradient>
      </defs>
      {/* spa floor (alveolus) */}
      <rect x="0" y="150" width="1600" height="300" fill="#2B4A42" />
      <text x="40" y="200" className="film-text film-text--big">Alveolus (spa room)</text>
      <text x="40" y="232" className="film-text">O₂ high (104 mm Hg) · CO₂ low (40 mm Hg)</text>
      {/* membrane */}
      <rect x="0" y="450" width="1600" height="34" fill="#E3735E" opacity="0.6" />
      <text x="1560" y="474" textAnchor="end" className="film-text">respiratory membrane ≈ 0.5 µm</text>
      {/* capillary road */}
      <rect x="0" y="484" width="1600" height="160" fill="url(#road)" opacity="0.45" />
      <text x="40" y="676" className="film-text film-text--big">Capillary: blood in, oxygen-poor (blue)</text>
      <text x="1560" y="676" textAnchor="end" className="film-text film-text--big">blood out, oxygen-rich (red) →</text>
      <text x="40" y="706" className="film-text">arriving blood: O₂ 40 mm Hg · CO₂ 45 mm Hg</text>
      {/* O₂ guests stepping down through the membrane */}
      {Array.from({ length: 10 }).map((_, i) => {
        const cyc = (t * 0.32 + i * 0.1) % 1
        const x = 380 + i * 80
        const y = mix(260, 520, cyc)
        return <O2 key={i} x={x} y={y} s={1} />
      })}
      {/* CO₂ guests leaving the blood into the spa */}
      {Array.from({ length: 6 }).map((_, i) => {
        const cyc = (t * 0.28 + i * 0.17) % 1
        return <CO2 key={i} x={140 + i * 70 + cyc * 40} y={mix(560, 170, cyc)} s={0.95} />
      })}
      {/* red blood cell shuttles with 4 hemoglobin seats */}
      {buses.map((i) => {
        const x = busX(i)
        const filled = Math.max(0, Math.min(4, Math.floor(((x - 340) / 720) * 5)))
        return (
          <g key={i} transform={`translate(${x} ${ROAD})`}>
            <ellipse cx="0" cy="0" rx="92" ry="44" fill="#E3735E" stroke="#B84A35" strokeWidth="4" />
            <ellipse cx="0" cy="0" rx="62" ry="22" fill="#B84A35" opacity="0.5" />
            {[-48, -16, 16, 48].map((sx, si) => (
              <g key={si}>
                <circle cx={sx} cy="-4" r="13" fill="#1B2A26" opacity="0.35" />
                {si < filled && <O2 x={sx} y={-6} s={0.55} />}
              </g>
            ))}
          </g>
        )
      })}
      <Sign x={620} y={20} term="Simple diffusion" resort="High → low partial pressure" show={t > 1} />
      <Sign x={1080} y={250} term="Hemoglobin" resort="Shuttle seats: up to 4 O₂ each" note="~98.5% of O₂ rides here" show={t > 7} to={[1100, 540]} />
      {showBreak && (
        <g className="film-sign">
          <rect x="560" y="170" width="460" height="150" rx="16" fill="#FBFCFB" />
          <text x="584" y="204" className="film-sign__term">How CO₂ guests travelled</text>
          <rect x="584" y="222" width="290" height="26" rx="6" fill="#E3735E" />
          <rect x="878" y="222" width="84" height="26" rx="6" fill="#F4D5CC" stroke="#B84A35" />
          <rect x="966" y="222" width="36" height="26" rx="6" fill="#8FB3A6" />
          <text x="584" y="274" className="film-sign__note">~70% bicarbonate (HCO₃⁻) · ~20% carbaminohemoglobin</text>
          <text x="584" y="298" className="film-sign__note">7–10% dissolved in plasma</text>
        </g>
      )}
    </g>
  )
}

/* ================= 10 · Check-out: exhalation ================= */
export function CheckoutArt({ t }: { t: number }) {
  const pts = [...(breathPath as Pt[])].reverse()
  const pressure = t > 1 && t < 12 ? 761 : 760
  return (
    <g>
      <AirwayArt className="film-airway" x={860} y={-10} width={560} height={770} diaphragmDown={t < 1}>
        <Stream pts={[...pts, [-300, 262]]} t={t} start={2} travel={11} count={7} gap={0.9} kind="CO2" s={1.25} />
      </AirwayArt>
      <Sign x={120} y={170} term="Exhalation (quiet = passive)" resort="Check-out" note="diaphragm relaxes · lungs recoil" />
      <g className="film-sign" style={{ opacity: t > 1 ? 1 : 0 }}>
        <rect x="120" y="330" width="440" height="92" rx="16" fill="rgba(251,252,251,0.08)" stroke="rgba(244,213,204,0.4)" />
        <text x="146" y="368" className="film-text">Pressure in the lungs</text>
        <text x="146" y="406" className="film-text film-text--big">{pressure} mm Hg {pressure > 760 ? '↑ air flows out' : ''}</text>
      </g>
      <g opacity={t > 7 ? 1 : 0} style={{ transition: 'opacity .6s' }}>
        <text x="120" y="490" className="film-text">Route home:</text>
        <text x="120" y="526" className="film-text film-text--big">alveoli → bronchioles → bronchi →</text>
        <text x="120" y="562" className="film-text film-text--big">trachea → larynx → pharynx →</text>
        <text x="120" y="598" className="film-text film-text--big">nasal cavity → out</text>
      </g>
      <Sign x={120} y={630} term="Vocal cords + conchae" resort="Voice made · moisture recaptured" show={t > 14} />
    </g>
  )
}

/* ================= 11 · Concierge: control of breathing ================= */
export function ConciergeArt({ t }: { t: number }) {
  const ring = window4(t, 14, 14.5, 19, 19.5)
  const rate = t < 15 ? 0.9 : mix(0.9, 1.8, ramp(t, 15, 19))
  const swing = Math.sin(t * Math.PI * rate) * 28
  const co2Level = t < 14 ? 0.35 : t < 20 ? mix(0.35, 0.8, ramp(t, 14, 17)) : mix(0.8, 0.4, ramp(t, 20, 23))
  const end = ramp(t, 21, 22.5)
  return (
    <g>
      <g opacity={1 - end}>
        {/* mezzanine: pons */}
        <rect x="380" y="150" width="840" height="20" rx="6" fill="#36574F" />
        <Staff x={600} y={70} s={0.9} body="#8FB3A6" accent="#2F5D50" />
        <Staff x={1000} y={70} s={0.9} body="#8FB3A6" accent="#2F5D50" />
        {/* desk: medulla */}
        <rect x="430" y="470" width="740" height="150" rx="20" fill="#DCE8E2" stroke="#2F5D50" strokeWidth="4" />
        <rect x="430" y="470" width="740" height="26" rx="12" fill="#2F5D50" />
        <Staff x={800} y={380} s={1.3} body="#F4D5CC" accent="#E3735E" />
        {/* metronome = rhythm */}
        <g transform="translate(560 470)">
          <path d="M-30 0 L30 0 L14 -110 L-14 -110 Z" fill="#B84A35" />
          <line x1="0" y1="-6" x2="0" y2="-100" stroke="#FBFCFB" strokeWidth="5" strokeLinecap="round" transform={`rotate(${swing} 0 -6)`} />
        </g>
        {/* bell */}
        <path d="M1040 470 C1040 430 1100 430 1100 470 Z" fill="#E9C46A" />
        {/* phones from chemoreceptors */}
        {[
          [140, 330, 'Carotid body'],
          [1460, 330, 'Aortic body'],
        ].map(([x, y, n], i) => (
          <g key={i} transform={`translate(${x as number} ${y as number}) rotate(${ring * Math.sin(t * 40) * 8})`}>
            <rect x="-40" y="-60" width="80" height="120" rx="14" fill="#36574F" stroke="#F4D5CC" strokeWidth="3" />
            <circle cx="0" cy="-20" r="18" fill="#E3735E" opacity={0.4 + ring * 0.6} />
            <text y="90" textAnchor="middle" className="film-text">{n as string}</text>
          </g>
        ))}
        <path d="M180 330 C300 330 400 420 470 470" stroke="#F4D5CC" strokeWidth="2" strokeDasharray="6 6" fill="none" />
        <path d="M1420 330 C1300 330 1200 420 1130 470" stroke="#F4D5CC" strokeWidth="2" strokeDasharray="6 6" fill="none" />
        {/* CO₂ meter */}
        <g transform="translate(1280 520)">
          <text className="film-text">Blood CO₂</text>
          <rect y="14" width="220" height="22" rx="11" fill="rgba(255,255,255,0.12)" />
          <rect y="14" width={220 * co2Level} height="22" rx="11" fill={co2Level > 0.6 ? '#E3735E' : '#8FB3A6'} />
          <text y="70" className="film-text">Breathing: {rate > 1.3 ? 'faster + deeper' : 'steady'}</text>
        </g>
        <Sign x={20} y={520} term="Medulla oblongata" resort="Head Concierge" note="VRG sets rhythm · DRG reads sensors" show={t > 0.5} to={[560, 420]} />
        <Sign x={1150} y={14} term="Pons" resort="Assistant Managers" note="apneustic = depth · pneumotaxic = limits inhale" show={t > 8} />
        <Sign x={1150} y={150} term="Chemoreceptors" resort="Front-desk phones" note="sense H⁺ from CO₂ (and big O₂ drops)" show={t > 14} />
      </g>
      {end > 0 && (
        <g opacity={end}>
          <svg x="740" y="190" width="120" height="140" viewBox="0 0 120 140">
            <LogoMark tone="dark" />
          </svg>
          <text x="800" y="400" textAnchor="middle" className="film-end__title">Alvea</text>
          <text x="800" y="460" textAnchor="middle" className="film-end__tag">Every breath, a destination.</text>
        </g>
      )}
    </g>
  )
}
