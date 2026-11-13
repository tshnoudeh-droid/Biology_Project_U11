import { LogoMark } from '../components/Logo'
import { CO2, Flow, O2, Sign, Staff, Stream, mix, ramp, window4 } from './kit'
import {
  Armchair, Chandelier, Desk, M, P, Pendant, Plant, Room, Rug, Sconce, SideTable, Sofa,
  depthAtY, depthScale, floorPt, wallPt, type Box,
} from './interior'

const persp = (B: Box, base = 1) => (y: number) => base * depthScale(B, depthAtY(B, y))

/* ================= 7 · Room Corridors: bronchioles ================= */
export function CorridorsArt({ t }: { t: number }) {
  const squeeze = window4(t, 6.5, 8, 10.5, 12)
  const B: Box = { x0: mix(600, 690, squeeze), y0: mix(230, 270, squeeze), x1: mix(1000, 910, squeeze), y1: mix(500, 480, squeeze) }
  const sc = persp(B, 2)
  const ribs = Array.from({ length: 9 }, (_, k) => Math.pow((k + 0.5) / 9, 1.3))
  const slow = 1 - 0.4 * squeeze
  return (
    <g>
      <Room
        B={B}
        floor="wood"
        wainscot={false}
        backWall={
          <g>
            <rect x={mix(B.x0, B.x1, 0.12)} y={mix(B.y0, B.y1, 0.35)} width={(B.x1 - B.x0) * 0.3} height={(B.y1 - B.y0) * 0.65} fill="#0F1A17" stroke="url(#g-brass)" strokeWidth="4" />
            <rect x={mix(B.x0, B.x1, 0.58)} y={mix(B.y0, B.y1, 0.35)} width={(B.x1 - B.x0) * 0.3} height={(B.y1 - B.y0) * 0.65} fill="#0F1A17" stroke="url(#g-brass)" strokeWidth="4" />
            <ellipse cx={mix(B.x0, B.x1, 0.27)} cy={B.y1 - 40} rx="50" ry="40" fill="url(#g-glow)" />
            <ellipse cx={mix(B.x0, B.x1, 0.73)} cy={B.y1 - 40} rx="50" ry="40" fill="url(#g-glow)" />
            <text x={(B.x0 + B.x1) / 2} y={mix(B.y0, B.y1, 0.22)} textAnchor="middle" className="film-plaque">
              TO THE SPA SUITES
            </text>
          </g>
        }
      />
      {/* padded smooth-muscle wall panels: tighten during bronchoconstriction */}
      {([-1, 1] as const).map((side) =>
        ribs.map((d, i) => {
          const d2 = Math.min(1, d + 0.05)
          const q = [wallPt(B, side, 0.08, d), wallPt(B, side, 0.08, d2), wallPt(B, side, 0.95, d2), wallPt(B, side, 0.95, d)]
          return <path key={`${side}${i}`} d={P(q)} fill={M.coral} opacity={0.35 + 0.5 * squeeze} />
        }),
      )}
      {[0.3, 0.6, 0.9].map((d) => {
        const [x, y] = wallPt(B, -1, 0.35, d)
        return <Sconce key={d} x={x} y={y} s={depthScale(B, d) * 1.4} />
      })}
      <path d={P([floorPt(B, 0.36, 0), floorPt(B, 0.64, 0), floorPt(B, 0.7, 1), floorPt(B, 0.3, 1)])} fill="url(#g-carpet)" />
      <Flow pts={[[760, 900], [770, 600], [mix(B.x0, B.x1, 0.27), B.y1 - 20]]} t={t * slow} speed={100} opacity={0.4 * slow} />
      <Flow pts={[[840, 900], [830, 600], [mix(B.x0, B.x1, 0.73), B.y1 - 20]]} t={t * slow + 0.4} speed={100} opacity={0.4 * slow} />
      <Stream pts={[[760, 960], [780, 700], [770, 560], [mix(B.x0, B.x1, 0.27), B.y1 - 20]]} t={t * slow} start={0.2} travel={6} count={12} gap={1} s={1} scaleAt={sc} bag hero />
      <Stream pts={[[840, 960], [820, 700], [830, 560], [mix(B.x0, B.x1, 0.73), B.y1 - 20]]} t={t * slow} start={0.7} travel={6} count={12} gap={1} s={1} scaleAt={sc} bag />

      <Sign x={40} y={170} term="Bronchioles" resort="The Room Corridors" note="≤ 1 mm wide · no cartilage" at={0.3} t={t} to={[300, 300]} />
      <Sign
        x={1170}
        y={170}
        term={squeeze > 0.3 ? 'Bronchoconstriction' : 'Smooth muscle walls'}
        resort={squeeze > 0.3 ? 'Corridors tighten (asthma)' : 'Padded walls that tighten or relax'}
        at={6} t={t}
        to={[1350, 420]}
      />
      <Sign x={40} y={500} term="Terminal bronchioles" resort="1,000+ per lung" note="last corridor of the conducting zone" at={13} t={t} to={[700, 430]} />
      <Sign x={1170} y={500} term="Respiratory bronchioles" resort="→ alveolar ducts → alveolar sacs" note="~2,400 km of corridors in total" at={14.5} t={t} to={[900, 430]} />
    </g>
  )
}

/* ================= 8 · Spa Rooms: alveoli ================= */
function MassageTable({ x, y, s = 1 }: { x: number; y: number; s?: number }) {
  return (
    <g transform={`translate(${x} ${y}) scale(${s})`}>
      <rect x="-90" y="-20" width="180" height="22" rx="10" fill={M.cream} />
      <rect x="-90" y="-26" width="70" height="10" rx="5" fill={M.leaf} />
      <line x1="-70" y1="2" x2="-70" y2="40" stroke={M.woodDark} strokeWidth="6" />
      <line x1="70" y1="2" x2="70" y2="40" stroke={M.woodDark} strokeWidth="6" />
    </g>
  )
}
function Candle({ x, y, t }: { x: number; y: number; t: number }) {
  return (
    <g>
      <ellipse cx={x} cy={y - 26} rx="22" ry="22" fill="url(#g-glow)" />
      <rect x={x - 6} y={y - 18} width="12" height="18" rx="2" fill={M.cream} />
      <path d={`M${x} ${y - 30 + Math.sin(t * 9) * 1.5} q4 6 0 10 q-4 -4 0 -10`} fill={M.glow} />
    </g>
  )
}
export function SpaArt({ t }: { t: number }) {
  const B: Box = { x0: 380, y0: 170, x1: 1220, y1: 540 }
  const breathe = 1 + 0.02 * Math.sin(t * 1.2)
  const mx = 900 + Math.sin(t * 0.45) * 160
  return (
    <g>
      <Room
        B={B}
        floor="wood"
        backWall={
          <g transform={`translate(800 540) scale(${breathe}) translate(-800 -540)`}>
            <path d="M400 540 L400 330 Q800 40 1200 330 L1200 540 Z" fill="#33554C" />
            {[0.2, 0.4, 0.6, 0.8].map((f) => (
              <path key={f} d={`M${mix(400, 1200, f)} 540 L${mix(400, 1200, f)} ${330 - Math.sin(f * Math.PI) * 170}`} stroke={M.brass} strokeOpacity="0.35" strokeWidth="3" />
            ))}
            {/* thin glass walls (type I cells) with capillaries just outside */}
            {[0.3, 0.5, 0.7].map((f) => {
              const x = mix(400, 1200, f)
              return (
                <g key={f}>
                  <rect x={x - 60} y="300" width="120" height="150" rx="60" fill="#14221F" />
                  <path d={`M${x - 60} 370 Q${x} ${340 + Math.sin(t + f * 6) * 10} ${x + 60} 380`} stroke={f < 0.5 ? M.coral : '#7FA7D9'} strokeWidth="10" fill="none" opacity="0.8" />
                  <path d={`M${x - 60} 410 Q${x} 390 ${x + 60} 420`} stroke={f < 0.5 ? '#7FA7D9' : M.coral} strokeWidth="7" fill="none" opacity="0.6" />
                  <rect x={x - 60} y="300" width="120" height="150" rx="60" fill="url(#g-glass)" stroke="url(#g-brass)" strokeWidth="4" />
                </g>
              )
            })}
            {/* surfactant shimmer along the dome */}
            <path d="M420 520 L420 336 Q800 64 1180 336 L1180 520" fill="none" stroke="#E9C46A" strokeWidth="5" strokeDasharray="2 14" strokeLinecap="round" strokeDashoffset={-t * 30} />
          </g>
        }
      />
      <Chandelier x={800} y={60} s={0.75} />
      {/* alveolar pore: porthole on the left wall to the next suite */}
      {(() => {
        const [x, y] = wallPt(B, -1, 0.45, 0.4)
        return (
          <g>
            <circle cx={x} cy={y} r="56" fill="#33554C" stroke="url(#g-brass)" strokeWidth="8" />
            <circle cx={x} cy={y} r="44" fill="#0F1A17" />
            <circle cx={x + 10} cy={y + 14} r="16" fill={M.blush} opacity="0.5" />
          </g>
        )
      })()}
      <Rug cx={800} cy={680} rx={430} ry={110} color="#B84A35" />
      <MassageTable x={600} y={640} s={1.05} />
      <MassageTable x={1000} y={640} s={1.05} />
      <MassageTable x={800} y={760} s={1.25} />
      <Plant x={470} y={580} s={0.9} />
      <Plant x={1140} y={580} s={0.9} />
      <Candle x={440} y={720} t={t} />
      <Candle x={1170} y={720} t={t} />
      {/* guests relaxing */}
      <Stream pts={[[300, 960], [420, 760], [600, 600]]} t={t} start={0.2} travel={2.6} count={1} gap={1} s={1.4} hold hero />
      <Stream pts={[[1300, 960], [1180, 760], [1000, 600]]} t={t} start={0.7} travel={2.6} count={1} gap={1} s={1.4} hold />
      <Stream pts={[[800, 980], [800, 860], [800, 715]]} t={t} start={1.2} travel={2.2} count={1} gap={1} s={1.6} hold />
      {t > 7 && (
        <g>
          <Stream pts={[[620, 580], [640, 470], [640, 400]]} t={t} start={7.2} travel={2.4} count={8} gap={1.6} s={0.7} />
          <Stream pts={[[980, 580], [960, 470], [960, 400]]} t={t} start={8} travel={2.4} count={8} gap={1.6} s={0.7} />
        </g>
      )}
      {/* type II masseuse */}
      <Staff x={700} y={560} s={1.2} body={M.cream} accent={M.coral}>
        <rect x="24" y="16" width="16" height="30" rx="5" fill="#E9C46A" stroke={M.ink} strokeWidth="2" />
        {[0, 1, 2].map((i) => (
          <circle key={i} cx={52 + i * 12} cy={10 - i * 8 + Math.sin(t * 5 + i) * 3} r="4" fill="#E9C46A" opacity={0.5 + 0.5 * Math.sin(t * 5 + i)} />
        ))}
      </Staff>
      {/* macrophage housekeeper with cart */}
      <g transform={`translate(${mx} 560)`}>
        <rect x="40" y="-10" width="70" height="50" rx="6" fill="url(#g-brass)" opacity="0.8" />
        <circle cx="52" cy="44" r="6" fill={M.ink} />
        <circle cx="98" cy="44" r="6" fill={M.ink} />
        <path d="M-40 0 C-40 -36 -6 -50 18 -34 C46 -30 52 0 38 18 C40 44 0 54 -18 40 C-44 40 -52 18 -40 0 Z" fill={M.leaf} stroke={M.ink} strokeWidth="2" />
        <circle cx="-8" cy="-8" r="3" fill={M.ink} />
        <circle cx="8" cy="-8" r="3" fill={M.ink} />
        <path d="M-6 6 Q0 10 6 6" stroke={M.ink} strokeWidth="2" fill="none" />
      </g>
      {t > 16 && t < 20 && <circle cx={mix(1150, mx + 70, ramp(t, 17, 19.5))} cy={540} r="9" fill="#5A6B65" />}

      <Sign x={820} y={14} term="Alveoli" resort="The Spa Suites" note="~480 million · the respiratory zone" at={0.3} t={t} />
      <Sign x={1170} y={150} term="Type I alveolar cells" resort="Thin glass walls" note="gases pass straight through" at={7} t={t} to={[1060, 360]} />
      <Sign x={30} y={560} term="Type II alveolar cells" resort="The Masseuses" note="apply surfactant → suites don’t collapse" at={12} t={t} to={[700, 560]} />
      <Sign x={1170} y={430} term="Alveolar macrophage" resort="Night Housekeeping" at={17.5} t={t} to={[mx, 520]} />
      <Sign x={30} y={170} term="Alveolar pore" resort="Porthole to the next suite" at={20} t={t} to={[200, 380]} />
    </g>
  )
}

/* ================= 9 · Shuttle Exchange: gas exchange ================= */
export function ShuttleArt({ t }: { t: number }) {
  const ROAD = 600
  const busX = (i: number) => ((t * 85 + i * 420) % 1900) - 220
  return (
    <g>
      <rect width="1600" height="470" fill="url(#g-wall)" />
      {Array.from({ length: 20 }).map((_, i) => (
        <rect key={i} x={i * 80 + 20} y="140" width="30" height="300" fill="#33554C" opacity="0.4" />
      ))}
      <rect x="0" y="140" width="1600" height="6" fill={M.brass} opacity="0.6" />
      {[300, 800, 1300].map((x) => (
        <Pendant key={x} x={x} y={0} len={60} s={1} />
      ))}
      <g transform="translate(1110 170)">
        <rect width="440" height="150" rx="10" fill="#0F1A17" stroke="url(#g-brass)" strokeWidth="5" />
        <text x="20" y="34" className="film-board-led">DEPARTURES · RBC SHUTTLE</text>
        <text x="20" y="72" className="film-board-led film-board-led--sm">TO  HEART → BODY        ON TIME</text>
        <text x="20" y="102" className="film-board-led film-board-led--sm">SEATS  4 O₂ PER HEMOGLOBIN</text>
        <text x="20" y="132" className="film-board-led film-board-led--sm">LOUNGE  O₂ 104 · CO₂ 40 mm Hg</text>
      </g>
      <Sofa x={260} y={430} s={0.9} />
      <SideTable x={450} y={430} s={0.8} />
      <Armchair x={560} y={430} s={0.8} color={M.leaf} />
      {/* glass floor = respiratory membrane */}
      <rect x="0" y="470" width="1600" height="36" fill="url(#g-glass)" />
      <rect x="0" y="466" width="1600" height="6" fill="url(#g-brass)" />
      <rect x="0" y="504" width="1600" height="6" fill="url(#g-brass)" />
      <text x="1570" y="495" textAnchor="end" className="film-plaque">GLASS FLOOR · RESPIRATORY MEMBRANE ≈ 0.5 µm</text>
      {/* tram tunnel (capillary) */}
      <rect x="0" y="510" width="1600" height="200" fill="#14221F" />
      <rect x="0" y="540" width="1600" height="130" fill="url(#g-blood)" opacity="0.4" />
      <rect x="0" y="680" width="1600" height="8" fill="url(#g-brass)" />
      <text x="30" y="708" className="film-plaque" style={{ textAnchor: 'start' }}>← BLOOD IN: OXYGEN-POOR (BLUE) · O₂ 40 · CO₂ 45 mm Hg</text>
      <text x="1570" y="708" className="film-plaque" style={{ textAnchor: 'end' }}>BLOOD OUT: OXYGEN-RICH (RED) →</text>
      {Array.from({ length: 9 }).map((_, i) => {
        const cyc = (t * 0.42 + i * 0.11) % 1
        return (
          <g key={i}>
            {i === 4 && <circle cx={420 + i * 85} cy={mix(300, 560, cyc)} r="32" fill="none" stroke="#E3735E" strokeWidth="3" strokeDasharray="5 6" />}
            <O2 x={420 + i * 85} y={mix(300, 560, cyc)} s={1} />
          </g>
        )
      })}
      {Array.from({ length: 5 }).map((_, i) => {
        const cyc = (t * 0.36 + i * 0.2) % 1
        return <CO2 key={i} x={120 + i * 64 + cyc * 30} y={mix(600, 200, cyc)} s={0.95} />
      })}
      {[0, 1, 2, 3, 4].map((i) => {
        const x = busX(i)
        const filled = Math.max(0, Math.min(4, Math.floor(((x - 380) / 720) * 5)))
        return (
          <g key={i} transform={`translate(${x} ${ROAD})`}>
            <ellipse cx="0" cy="0" rx="100" ry="48" fill={M.coral} stroke={M.velvet} strokeWidth="5" />
            <ellipse cx="0" cy="0" rx="70" ry="24" fill={M.velvet} opacity="0.5" />
            <rect x="-70" y="-8" width="140" height="4" fill="url(#g-brass)" />
            {[-48, -16, 16, 48].map((sx, si) => (
              <g key={si}>
                <rect x={sx - 13} y="-20" width="26" height="28" rx="6" fill={M.ink} opacity="0.4" />
                {si < filled && <O2 x={sx} y={-6} s={0.55} />}
              </g>
            ))}
          </g>
        )
      })}
      <Sign x={780} y={14} term="Simple diffusion" resort="High → low partial pressure" note="no energy needed" at={0.5} t={t} />
      <Sign x={1110} y={340} term="Hemoglobin" resort="Tram seats: up to 4 O₂ each" note="~98.5% of O₂ rides here" at={7} t={t} to={[1100, 580]} />
      {t > 13 && (
        <g className="film-sign is-on">
          <rect x="560" y="170" width="460" height="150" rx="16" fill={M.cream} />
          <text x="584" y="204" className="film-sign__term">How CO₂ guests travelled</text>
          <rect x="584" y="222" width="290" height="26" rx="6" fill={M.coral} />
          <rect x="878" y="222" width="84" height="26" rx="6" fill={M.blush} stroke={M.velvet} />
          <rect x="966" y="222" width="36" height="26" rx="6" fill={M.leaf} />
          <text x="584" y="274" className="film-sign__note">~70% bicarbonate (HCO₃⁻) · ~20% carbaminohemoglobin</text>
          <text x="584" y="298" className="film-sign__note">7–10% dissolved in plasma</text>
        </g>
      )}
    </g>
  )
}

/* ================= 10 · Check-out: exhalation ================= */
const ROUTE = ['Alveoli', 'Bronchioles', 'Bronchi', 'Trachea', 'Larynx', 'Pharynx', 'Nasal cavity', 'Out']
export function CheckoutArt({ t }: { t: number }) {
  const B: Box = { x0: 420, y0: 170, x1: 1180, y1: 520 }
  const sc = persp(B, 1.4)
  const pressure = t > 1 && t < 13 ? 761 : 760
  const step = Math.floor(ramp(t, 7, 15) * ROUTE.length)
  return (
    <g>
      <Room
        B={B}
        floor="marble"
        ceilingLights={2}
        backWall={
          <g>
            <text x="800" y="250" textAnchor="middle" className="film-plaque">
              EXIT · THANK YOU FOR STAYING
            </text>
            <rect x="620" y="280" width="360" height="240" fill="url(#g-night)" />
            {[0, 1, 2, 3, 4].map((i) => (
              <circle key={i} cx={650 + i * 70} cy={300 + (i % 2) * 20} r="2" fill={M.cream} />
            ))}
            <path d="M620 520 L620 340 A80 60 0 0 1 790 340 L790 520" fill="none" stroke="url(#g-brass)" strokeWidth="8" />
            <path d="M810 520 L810 340 A80 60 0 0 1 980 340 L980 520" fill="none" stroke="url(#g-brass)" strokeWidth="8" />
            <rect x="788" y="290" width="24" height="230" fill="#2F5D50" stroke="url(#g-brass)" strokeWidth="3" />
          </g>
        }
      />
      <Desk x={110} y={600} w={340} h={130} />
      <Staff x={280} y={520} s={1.1} body={M.blush} accent={M.coral} />
      <g transform="translate(1240 230)">
        <rect width="320" height="330" rx="12" fill="#0F1A17" stroke="url(#g-brass)" strokeWidth="5" />
        <text x="20" y="38" className="film-board-led">YOUR ROUTE HOME</text>
        {ROUTE.map((r, i) => (
          <text key={r} x="28" y={78 + i * 32} className="film-board-led film-board-led--sm" style={{ fill: i < step ? '#E3735E' : '#C9D6CF' }}>
            {i + 1}. {r.toUpperCase()} {i < step ? '✓' : ''}
          </text>
        ))}
      </g>
      <g transform="translate(110 250)">
        <rect width="330" height="110" rx="12" fill="#14221F" stroke="url(#g-brass)" strokeWidth="4" />
        <text x="20" y="36" className="film-plaque" style={{ textAnchor: 'start' }}>AIR PUMP (DIAPHRAGM): RELAXING</text>
        <text x="20" y="84" className="film-board-led">
          {pressure} mm Hg {pressure > 760 ? '↑ AIR OUT' : ''}
        </text>
      </g>
      <Plant x={540} y={640} s={1} />
      <Plant x={1080} y={640} s={1} />
      <Flow pts={[[1500, 900], [1200, 760], [900, 590], [880, 500]]} t={t} speed={110} color="#8FB3A6" opacity={0.5} />
      <Flow pts={[[200, 900], [500, 760], [720, 590], [720, 500]]} t={t + 0.4} speed={110} color="#8FB3A6" opacity={0.5} />
      <Stream pts={[[1500, 960], [1200, 780], [900, 600], [880, 520]]} t={t} start={0.4} travel={5.5} count={16} gap={0.9} kind="CO2" s={1} scaleAt={sc} bag hero />
      <Stream pts={[[200, 960], [500, 780], [720, 600], [720, 520]]} t={t} start={0.9} travel={5.5} count={16} gap={0.9} kind="CO2" s={1} scaleAt={sc} bag />

      <Sign x={800} y={14} term="Exhalation (quiet = passive)" resort="Check-out" note="diaphragm relaxes · lungs recoil · air flows out" at={0.3} t={t} />
      <Sign x={30} y={420} term="Vocal cords + conchae" resort="Voice made · moisture recaptured" at={14} t={t} />
    </g>
  )
}

/* ================= 11 · Concierge: control of breathing ================= */
export function ConciergeArt({ t }: { t: number }) {
  const B: Box = { x0: 360, y0: 150, x1: 1240, y1: 540 }
  const ring = window4(t, 14, 14.5, 19, 19.5)
  const rate = t < 15 ? 0.9 : mix(0.9, 1.8, ramp(t, 15, 19))
  const swing = Math.sin(t * Math.PI * rate) * 28
  const co2Level = t < 14 ? 0.35 : t < 20 ? mix(0.35, 0.8, ramp(t, 14, 17)) : mix(0.8, 0.4, ramp(t, 20, 23))
  const end = ramp(t, 21, 22.5)
  const phone = (side: -1 | 1) => {
    const [x, y] = wallPt(B, side, 0.4, 0.45)
    return (
      <g transform={`translate(${x} ${y}) rotate(${ring * Math.sin(t * 40) * 8})`}>
        <rect x="-36" y="-56" width="72" height="112" rx="12" fill="#3A2E28" stroke="url(#g-brass)" strokeWidth="4" />
        <rect x="-26" y="-46" width="52" height="20" rx="8" fill="url(#g-brass)" />
        <circle cx="0" cy="10" r="18" fill={M.coral} opacity={0.35 + ring * 0.65} />
      </g>
    )
  }
  return (
    <g>
      <g opacity={1 - end}>
        <Room
          B={B}
          floor="wood"
          backWall={
            <g>
              {Array.from({ length: 11 }).map((_, i) => (
                <rect key={i} x={370 + i * 80} y="300" width="66" height="230" rx="4" fill="#4A3B33" />
              ))}
              <rect x="640" y="320" width="320" height="130" rx="8" fill="#3A2E28" stroke="url(#g-brass)" strokeWidth="4" />
              {Array.from({ length: 24 }).map((_, i) => (
                <circle key={i} cx={666 + (i % 8) * 38} cy={346 + Math.floor(i / 8) * 38} r="6" fill="url(#g-brass)" />
              ))}
              <rect x="360" y="250" width="880" height="16" fill="url(#g-brass)" />
              {Array.from({ length: 22 }).map((_, i) => (
                <rect key={i} x={372 + i * 40} y="266" width="6" height="34" fill="url(#g-brass)" />
              ))}
              <rect x="360" y="298" width="880" height="8" fill="url(#g-brass)" />
            </g>
          }
        />
        <Staff x={560} y={200} s={0.8} body={M.leaf} accent="#2F5D50" />
        <Staff x={1040} y={200} s={0.8} body={M.leaf} accent="#2F5D50" />
        <Chandelier x={800} y={40} s={0.7} />
        {phone(-1)}
        {phone(1)}
        <Staff x={800} y={520} s={1.35} body={M.blush} accent={M.coral} />
        <Desk x={460} y={600} w={680} h={150} />
        <g transform="translate(560 586)">
          <path d="M-30 0 L30 0 L14 -110 L-14 -110 Z" fill={M.velvet} />
          <line x1="0" y1="-6" x2="0" y2="-100" stroke={M.cream} strokeWidth="5" strokeLinecap="round" transform={`rotate(${swing} 0 -6)`} />
        </g>
        <path d="M1010 586 C1010 548 1066 548 1066 586 Z" fill="url(#g-brass)" />
        {/* sensor calls: phones → desk */}
        <g opacity={ring}>
          <Flow pts={[wallPt(B, -1, 0.4, 0.45), [600, 560]]} t={t} speed={160} color={M.coral} width={5} opacity={0.9} />
          <Flow pts={[wallPt(B, 1, 0.4, 0.45), [1000, 560]]} t={t} speed={160} color={M.coral} width={5} opacity={0.9} />
        </g>
        {/* rhythm signals: desk → air pump (phrenic + intercostal nerves) */}
        <path d="M800 750 L800 900" stroke={M.brass} strokeWidth="6" />
        {Array.from({ length: 3 }).map((_, i) => {
          const k = (t * rate * 0.5 + i / 3) % 1
          return <circle key={i} cx={800} cy={mix(752, 900, k)} r="9" fill={M.coral} opacity={1 - k * 0.6} />
        })}
        <g transform="translate(1270 600)">
          <rect x="-10" y="-40" width="290" height="140" rx="14" fill="#14221F" stroke="url(#g-brass)" strokeWidth="4" />
          <text x="10" y="-8" className="film-plaque" style={{ textAnchor: 'start' }}>BLOOD CO₂</text>
          <rect x="10" y="8" width="250" height="20" rx="10" fill="rgba(255,255,255,0.12)" />
          <rect x="10" y="8" width={250 * co2Level} height="20" rx="10" fill={co2Level > 0.6 ? M.coral : M.leaf} />
          <text x="10" y="68" className="film-plaque" style={{ textAnchor: 'start' }}>
            BREATHING: {rate > 1.3 ? 'FASTER + DEEPER' : 'STEADY'}
          </text>
        </g>
        <Sign x={30} y={600} term="Medulla oblongata" resort="Head Concierge" note="VRG sets rhythm · DRG reads sensors" at={0.3} t={t} to={[560, 520]} />
        <Sign x={1170} y={20} term="Pons" resort="Mezzanine managers" note="apneustic = depth · pneumotaxic = limits inhale" at={8} t={t} to={[1040, 220]} />
        <Sign x={1150} y={440} term="Signals to the air pump" resort="Phrenic + intercostal nerves" note="faster rhythm = faster breathing" at={3} t={t} to={[800, 860]} />
        <Sign x={30} y={170} term="Chemoreceptors" resort="Front-desk phones" note="carotid + aortic bodies, brainstem: sense H⁺" at={14} t={t} to={[210, 400]} />
      </g>
      {end > 0 && (
        <g opacity={end}>
          <svg x="740" y="190" width="120" height="140" viewBox="0 0 120 140">
            <LogoMark tone="dark" />
          </svg>
          <text x="800" y="400" textAnchor="middle" className="film-end__title">
            Alvea
          </text>
          <text x="800" y="460" textAnchor="middle" className="film-end__tag">
            Every breath, a destination.
          </text>
        </g>
      )}
    </g>
  )
}
