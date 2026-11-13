import { AirwayArt, breathPath } from '../components/AirwayArt'
import { CO2, O2, Sign, Staff, Stream, along, mix, ramp, window4, type Pt } from './kit'

const W = 1600

/* ================= 1 · Arrival: the air pump (diaphragm) ================= */
export function ArrivalArt({ t }: { t: number }) {
  const pump = t > 5.5
  // airway art is 800×1100, drawn at scale 0.7 → 560×770 starting x=860
  const pts = breathPath as Pt[]
  const pressure = pump ? (t < 12 ? 759 : 760) : 760
  return (
    <g>
      <AirwayArt className="film-airway" x={860} y={-10} width={560} height={770} diaphragmDown={pump}>
        {/* queue outside the front doors, then in through the nose */}
        <Stream pts={[[-260, 262], ...pts.slice(0, 1)]} t={t} travel={5} count={6} gap={0.5} s={1.25} hold />
        <Stream pts={pts} t={t} start={6} travel={7} count={6} gap={0.55} s={1.25} />
      </AirwayArt>

      {/* guest introductions */}
      <g transform="translate(120 250)">
        <O2 x={40} y={20} s={2.2} />
        <text x="110" y="14" className="film-text film-text--big">O₂ guests</text>
        <text x="110" y="44" className="film-text">oxygen, checking in</text>
        <CO2 x={40} y={140} s={2} />
        <text x="110" y="134" className="film-text film-text--big">CO₂ guests</text>
        <text x="110" y="164" className="film-text">carbon dioxide, checking out</text>
      </g>

      <Sign x={120} y={470} term="Diaphragm" resort="The Air Pump" note="contracts → chest volume ↑ → pressure ↓" show={t > 5.5} to={[1154, 700]} />
      <g className="film-sign" style={{ opacity: t > 7 ? 1 : 0 }}>
        <rect x="120" y="600" width="420" height="92" rx="16" fill="rgba(251,252,251,0.08)" stroke="rgba(244,213,204,0.4)" />
        <text x="146" y="638" className="film-text">Pressure in the lungs</text>
        <text x="146" y="676" className="film-text film-text--big">{pressure} mm Hg {pressure < 760 ? '↓ air rushes in' : ''}</text>
      </g>
    </g>
  )
}

/* ================= 2 · The Lobby: nasal cavity ================= */
export function LobbyArt({ t }: { t: number }) {
  const swirl: Pt[] = [
    [-40, 560], [170, 560], [330, 520], [520, 470], [720, 450], [920, 462], [1080, 440], [1240, 456], [1380, 500], [1470, 620], [1500, 760],
  ]
  const swirl2: Pt[] = [
    [-40, 580], [170, 575], [360, 560], [560, 560], [800, 555], [1040, 560], [1260, 560], [1420, 600], [1500, 760],
  ]
  const steam = (x: number, y: number, i: number) => {
    const k = (t * 0.6 + i * 0.33) % 1
    return <path key={`${x}${i}`} d={`M${x} ${y} q8 -12 0 -24 q-8 -12 0 -24`} stroke="#F4D5CC" strokeWidth="2" fill="none" opacity={0.6 * (1 - k)} transform={`translate(0 ${-k * 30})`} />
  }
  return (
    <g>
      {/* sinuses = skylight lofts */}
      <ellipse cx="700" cy="120" rx="80" ry="40" fill="none" stroke="#C9D6CF" strokeDasharray="6 6" opacity="0.7" />
      <ellipse cx="1260" cy="130" rx="90" ry="44" fill="none" stroke="#C9D6CF" strokeDasharray="6 6" opacity="0.7" />
      {/* lobby shell shaped like the nasal cavity */}
      <path d="M150 640 C190 430 380 250 700 222 C1000 196 1260 212 1440 262 L1470 640 Z" fill="#24403A" stroke="#F4D5CC" strokeWidth="3" />
      {/* aromatherapy ceiling (olfactory epithelium) */}
      <path d="M760 218 C860 210 960 208 1080 212" stroke="#E3735E" strokeWidth="8" strokeDasharray="3 10" strokeLinecap="round" fill="none" />
      {[800, 900, 1000].map((x, i) => (
        <circle key={x} cx={x} cy={236 + ((t * 20 + i * 15) % 40)} r="4" fill="#E3735E" opacity={0.7 - ((t * 20 + i * 15) % 40) / 60} />
      ))}
      {/* conchae: heated rainforest walls */}
      <path d="M1420 300 C1250 290 1060 300 960 330 C990 350 1200 352 1426 344 Z" fill="#F4D5CC" opacity="0.9" />
      <path d="M1430 390 C1200 376 900 386 760 420 C790 444 1150 446 1436 436 Z" fill="#F4D5CC" opacity="0.9" />
      <path d="M1440 500 C1150 480 760 490 560 530 C590 556 1100 556 1446 546 Z" fill="#F4D5CC" opacity="0.9" />
      {[1100, 1250].map((x, i) => steam(x, 336, i))}
      {[900, 1100, 1300].map((x, i) => steam(x, 424, i + 1))}
      {[750, 1000, 1250].map((x, i) => steam(x, 534, i + 2))}
      {/* front doors (nares) */}
      <path d="M150 640 L150 520 Q190 470 230 520 L230 640 Z" fill="#1B2A26" stroke="#F4D5CC" strokeWidth="3" />
      {/* floor: mucus + cilia carpet */}
      <rect x="230" y="616" width="1240" height="24" fill="#DCE6B8" opacity="0.55" />
      {Array.from({ length: 40 }).map((_, i) => {
        const x = 250 + i * 30
        const a = Math.sin(t * 6 + i * 0.6) * 18
        return <path key={i} d={`M${x} 640 l0 -14`} stroke="#8FB3A6" strokeWidth="3" strokeLinecap="round" transform={`rotate(${a} ${x} 640)`} />
      })}
      {/* dust caught in mucus, swept toward the throat (right) */}
      {[0, 1, 2, 3].map((i) => {
        const x = 260 + ((t * 70 + i * 300) % 1200)
        return <circle key={i} cx={x} cy={626} r="6" fill="#5A6B65" />
      })}
      {/* mouth: side door */}
      <path d="M260 690 L1400 690" stroke="#36574F" strokeWidth="30" strokeLinecap="round" />
      {/* guests */}
      <Stream pts={swirl} t={t} start={0.5} travel={9} count={12} gap={1.1} s={1.2} />
      <Stream pts={swirl2} t={t} start={1.2} travel={9} count={8} gap={1.6} s={1.2} />

      <Sign x={20} y={300} term="Nares (nostrils)" resort="The Front Doors" to={[190, 520]} />
      <Sign x={260} y={140} term="Nasal septum" resort="Glass wall: left and right halls" show={t > 2} />
      <Sign x={1020} y={620} anchor="start" term="Mouth" resort="Side door: skips the welcome" show={t > 2.5} to={[1000, 690]} />
      <Sign x={1180} y={330} term="Nasal conchae" resort="Heated Rainforest Walls" show={t > 5} to={[1150, 430]} />
      <Sign x={240} y={420} term="Mucus + cilia" resort="Housekeeping" show={t > 10} to={[480, 628]} />
      <Sign x={820} y={40} term="Olfactory epithelium" resort="Aromatherapy Suite" show={t > 15} to={[900, 214]} />
      <Sign x={1220} y={40} term="Paranasal sinuses" resort="Skylight Lofts" show={t > 17} />
    </g>
  )
}

/* ================= 3 · The Elevator: pharynx ================= */
export function ElevatorArt({ t }: { t: number }) {
  const carY = mix(110, 560, ramp(t, 2, 16))
  const floors = [
    { y: 90, h: 190, name: 'Nasopharynx', resort: 'North Wing · air only', note: 'guard: pharyngeal tonsil (adenoid)', at: 5 },
    { y: 280, h: 200, name: 'Oropharynx', resort: 'Food Court · air + food', note: 'guards: palatine + lingual tonsils', at: 10 },
    { y: 480, h: 200, name: 'Laryngopharynx', resort: 'The Great Split', note: 'air → larynx · food → esophagus', at: 15 },
  ]
  const exitF = ramp(t, 16.5, 20.5)
  const food = window4(t, 9.5, 10.5, 19.5, 20.5)
  const foodX = t < 13 ? mix(300, 760, ramp(t, 10, 13)) : mix(760, 990, ramp(t, 15, 19))
  const foodY = t < 13 ? 400 : mix(400, 660, ramp(t, 13, 19))
  return (
    <g>
      {floors.map((f, i) => (
        <g key={f.name}>
          <rect x="300" y={f.y} width="900" height={f.h} fill={i === 1 ? '#2B4A42' : '#24403A'} stroke="#36574F" strokeWidth="2" />
          <Sign x={1230} y={f.y + 30} term={f.name} resort={f.resort} note={f.note} show={t > f.at} />
        </g>
      ))}
      {/* shaft */}
      <rect x="690" y="90" width="160" height="590" fill="#1B2A26" stroke="#F4D5CC" strokeWidth="3" />
      {[0, 1, 2, 3, 4, 5].map((i) => (
        <line key={i} x1="700" x2="840" y1={100 + i * 100} y2={100 + i * 100} stroke="#36574F" />
      ))}
      {/* car */}
      <g transform={`translate(700 ${carY})`}>
        <rect width="140" height="110" rx="10" fill="#36574F" stroke="#F4D5CC" strokeWidth="3" />
        {exitF < 0.05 && [
          <O2 key="a" x={36} y={60} s={1.1} />,
          <O2 key="b" x={100} y={60} s={1.1} />,
          <O2 key="c" x={68} y={88} s={1.1} />,
        ]}
      </g>
      {exitF > 0 && <Stream pts={[[770, 640], [600, 640], [480, 700], [470, 780]]} t={t} start={16.5} travel={3} count={3} gap={0.4} s={1.1} />}
      {/* entrances */}
      <path d="M300 190 L690 190" stroke="#F4D5CC" strokeWidth="2" strokeDasharray="8 8" />
      <text x="320" y="176" className="film-text">from the lobby (nasal cavity)</text>
      <text x="320" y="376" className="film-text">from the mouth</text>
      {/* the great split doors */}
      <rect x="440" y="600" width="90" height="80" rx="8" fill="#1B2A26" stroke="#E3735E" strokeWidth="3" />
      <text x="485" y="720" textAnchor="middle" className="film-text">larynx · air</text>
      <rect x="950" y="600" width="90" height="80" rx="8" fill="#1B2A26" stroke="#8FB3A6" strokeWidth="3" />
      <text x="995" y="720" textAnchor="middle" className="film-text">esophagus · food</text>
      {/* food tray */}
      <g opacity={food} transform={`translate(${foodX} ${foodY})`}>
        <ellipse cx="0" cy="12" rx="34" ry="8" fill="#C9D6CF" />
        <path d="M-26 10 Q0 -26 26 10 Z" fill="#E9C46A" />
      </g>
      {/* tonsil guards */}
      <Staff x={1010} y={150} s={0.9} body="#E3735E" accent="#B84A35" />
      <Staff x={1010} y={350} s={0.9} body="#E3735E" accent="#B84A35" />
      <Staff x={600} y={390} s={0.8} body="#E3735E" accent="#B84A35" />
    </g>
  )
}

/* ================= 4 · Security Gate: larynx ================= */
export function GateArt({ t }: { t: number }) {
  const closed = window4(t, 6.5, 8, 10.5, 12)
  const angle = mix(-78, 0, closed)
  const trayK = ramp(t, 6, 11.5)
  const trayPts: Pt[] = [[420, 120], [700, 250], [780, 262], [930, 300], [1080, 760]]
  const [tx, ty] = along(trayPts, trayK)
  return (
    <g>
      {/* thyroid façade */}
      <path d="M560 300 L740 300 L800 340 L860 300 L1040 300 L1010 470 C980 560 900 620 800 640 C700 620 620 560 590 470 Z" fill="#DCE8E2" stroke="#2F5D50" strokeWidth="4" />
      {/* door opening: glottis with vocal cords */}
      <path d="M730 330 L870 330 L860 600 L740 600 Z" fill="#1B2A26" />
      <path d="M800 340 L752 590 M800 340 L848 590" stroke="#FBFCFB" strokeWidth="9" strokeLinecap="round" />
      {/* cricoid + trachea rings */}
      <rect x="650" y="660" width="300" height="40" rx="12" fill="#DCE8E2" stroke="#2F5D50" strokeWidth="3" />
      <rect x="670" y="716" width="260" height="22" rx="11" fill="#DCE8E2" opacity="0.7" />
      {/* drawbridge (epiglottis) */}
      <g transform={`rotate(${angle} 720 300)`}>
        <path d="M720 300 C760 270 860 266 900 300 C860 330 760 330 720 300 Z" fill="#F4D5CC" stroke="#B84A35" strokeWidth="3" />
      </g>
      <circle cx="720" cy="300" r="8" fill="#B84A35" />
      {/* guests pass through when open */}
      <Stream pts={[[800, -40], [800, 320], [800, 620], [800, 800]]} t={t} start={0.5} travel={5} count={4} gap={0.9} s={1.15} />
      <Stream pts={[[800, -40], [800, 320], [800, 620], [800, 800]]} t={t} start={12.2} travel={5} count={5} gap={0.9} s={1.15} />
      {/* room-service tray (food) */}
      <g opacity={trayK > 0 && trayK < 1 ? 1 : 0} transform={`translate(${tx} ${ty})`}>
        <ellipse cx="0" cy="12" rx="38" ry="9" fill="#C9D6CF" />
        <path d="M-28 10 Q0 -30 28 10 Z" fill="#E9C46A" />
      </g>
      <text x="1100" y="720" className="film-text" opacity={t > 9 ? 1 : 0}>
        food → esophagus
      </text>
      {/* sound waves on exhale (teaser) */}
      {t > 14 &&
        [0, 1, 2].map((i) => (
          <path key={i} d={`M${880 + i * 26} 430 q14 30 0 60`} stroke="#E3735E" strokeWidth="3" fill="none" opacity={0.4 + 0.6 * Math.abs(Math.sin(t * 4 + i))} />
        ))}

      <Sign x={1080} y={180} term="Larynx" resort="Security Gate" note="9 cartilages hold the airway open" />
      <Sign x={1080} y={330} term="Thyroid cartilage" resort="The Façade (Adam’s apple)" show={t > 3} to={[1000, 400]} />
      <Sign x={220} y={260} term="Epiglottis" resort="The Drawbridge" note="closes when you swallow" show={t > 6} to={[760, 292]} />
      <Sign x={220} y={480} term="True vocal cords" resort="The Main Stage" show={t > 12} to={[760, 520]} />
      <Sign x={1080} y={500} term="Glottis" resort="The Stage Door" show={t > 13} to={[820, 470]} />
    </g>
  )
}

/* ================= 5 · Main Hallway: trachea ================= */
export function HallwayArt({ t }: { t: number }) {
  const cx = 800
  const cy = 360
  const rings = Array.from({ length: 11 }, (_, k) => k)
  const proj = (d: number) => 1 / (1 + d * 0.55)
  return (
    <g>
      {/* rings receding (C-shaped: gap on the right = back wall facing the esophagus) */}
      {rings.reverse().map((k) => {
        const s = proj(k)
        const r = 470 * s
        const a1 = (35 * Math.PI) / 180
        const p1 = [cx + r * Math.cos(a1), cy - r * Math.sin(a1)]
        const p2 = [cx + r * Math.cos(-a1), cy - r * Math.sin(-a1)]
        return (
          <path
            key={k}
            d={`M${p1[0]} ${p1[1]} A${r} ${r} 0 1 0 ${p2[0]} ${p2[1]}`}
            stroke="#DCE8E2"
            strokeOpacity={0.25 + 0.6 * s}
            strokeWidth={34 * s}
            fill="none"
            strokeLinecap="round"
          />
        )
      })}
      {/* back wall (trachealis) on the right */}
      <path d="M1185 85 Q1230 360 1185 635" stroke="#B84A35" strokeWidth="10" strokeDasharray="4 8" fill="none" />
      {/* escalator floor: mucus moving toward us (up toward the pharynx) */}
      {Array.from({ length: 14 }).map((_, i) => {
        const d = 10 - ((t * 1.2 + i * 0.75) % 10.5)
        const s = proj(d)
        return <circle key={i} cx={cx + ((i % 3) - 1) * 220 * s} cy={cy + 440 * s} r={14 * s} fill="#DCE6B8" opacity={0.85} />
      })}
      {/* guests walking away down the hallway */}
      {Array.from({ length: 7 }).map((_, i) => {
        const d = ((t - i * 1.3) * 0.75)
        if (d < 0 || d > 9) return null
        const s = proj(d)
        return <O2 key={i} x={cx + ((i % 3) - 1) * 160 * s} y={cy + 300 * s + Math.sin(t * 9 + i) * 3 * s} s={2.2 * s} />
      })}
      <Sign x={60} y={170} term="16–20 C-shaped rings" resort="The Arches" note="hyaline cartilage keeps the hall open" show={t > 4} to={[350, 330]} />
      <Sign x={1250} y={250} term="Open side → esophagus" resort="Back wall (trachealis)" show={t > 7} to={[1200, 360]} />
      <Sign x={60} y={500} term="Mucociliary escalator" resort="The Luggage Return" note="goblet cells + cilia move mucus up" show={t > 11} to={[620, 720]} />
      <Sign x={1250} y={520} term="Conducting zone" resort="No check-in desk here" note="no gas exchange in the trachea" show={t > 17} />
    </g>
  )
}

/* ================= 6 · Guest Wings: bronchi ================= */
export function WingsArt({ t }: { t: number }) {
  const alarm = window4(t, 1.5, 2, 5, 5.6)
  const left: Pt[] = [[800, -40], [800, 200], [700, 270], [540, 360], [420, 330], [360, 330]]
  const left2: Pt[] = [[800, -40], [800, 200], [700, 270], [540, 360], [420, 480], [360, 480]]
  const left3: Pt[] = [[800, -40], [800, 200], [700, 270], [540, 380], [440, 620], [360, 620]]
  const right: Pt[] = [[800, -40], [800, 200], [920, 250], [1080, 300], [1200, 360], [1260, 360]]
  const right2: Pt[] = [[800, -40], [800, 200], [920, 250], [1080, 300], [1200, 560], [1260, 560]]
  const dustY = t < 3.5 ? mix(-20, 196, ramp(t, 0.5, 2)) : mix(196, -60, ramp(t, 3.5, 5))
  return (
    <g>
      {/* buildings = lungs */}
      <rect x="160" y="250" width="380" height="450" rx="30" fill="#24403A" stroke="#F4D5CC" strokeWidth="3" />
      {[400, 550].map((y) => (
        <line key={y} x1="160" x2="540" y1={y} y2={y} stroke="#F4D5CC" strokeWidth="2" strokeDasharray="8 6" />
      ))}
      <path d="M1060 250 L1440 250 L1440 700 L1150 700 L1150 520 C1120 520 1060 500 1060 470 Z" fill="#24403A" stroke="#F4D5CC" strokeWidth="3" />
      <line x1="1060" x2="1440" y1="460" y2="460" stroke="#F4D5CC" strokeWidth="2" strokeDasharray="8 6" />
      {/* the heart next door */}
      <path d="M1080 600 C1040 560 1000 600 1030 640 L1080 690 L1130 640 C1160 600 1120 560 1080 600 Z" fill="#E3735E" opacity="0.6" />
      <text x="1000" y="730" className="film-text">the heart, next door</text>
      {/* corridors */}
      <g fill="none" strokeLinecap="round" strokeLinejoin="round">
        <path d="M800 -20 L800 200" stroke="#F4D5CC" strokeWidth="70" opacity="0.25" />
        <path d="M800 200 L700 270 L540 360" stroke="#F4D5CC" strokeWidth="62" opacity="0.25" />
        <path d="M800 200 L920 250 L1080 300" stroke="#F4D5CC" strokeWidth="48" opacity="0.25" />
      </g>
      {/* carina checkpoint */}
      <path d="M770 220 L800 192 L830 220" stroke={alarm > 0.5 && Math.sin(t * 20) > 0 ? '#E3735E' : '#F4D5CC'} strokeWidth="8" fill="none" strokeLinecap="round" />
      <circle cx="800" cy="170" r={10 + alarm * 30} fill="#E3735E" opacity={alarm * 0.35} />
      <circle cx="800" cy={dustY} r="10" fill="#5A6B65" opacity={t < 5 ? 1 : 0} />
      <text x="850" y="150" className="film-text film-text--big" opacity={window4(t, 3.4, 3.6, 4.8, 5.4)}>
        COUGH!
      </text>
      {/* floor labels */}
      <text x="350" y="300" textAnchor="middle" className="film-text">Superior lobe</text>
      <text x="350" y="450" textAnchor="middle" className="film-text">Middle lobe</text>
      <text x="350" y="600" textAnchor="middle" className="film-text">Inferior lobe</text>
      <text x="1300" y="300" textAnchor="middle" className="film-text">Superior lobe</text>
      <text x="1300" y="590" textAnchor="middle" className="film-text">Inferior lobe</text>
      {/* guests split */}
      <Stream pts={left} t={t} start={6} travel={5} count={2} gap={1.4} s={1.1} hold />
      <Stream pts={left2} t={t} start={6.6} travel={5} count={2} gap={1.4} s={1.1} hold />
      <Stream pts={left3} t={t} start={7.2} travel={5.5} count={2} gap={1.4} s={1.1} hold />
      <Stream pts={right} t={t} start={6.3} travel={5} count={2} gap={1.4} s={1.1} hold />
      <Stream pts={right2} t={t} start={6.9} travel={5.5} count={2} gap={1.4} s={1.1} hold />

      <Sign x={880} y={14} term="Carina" resort="Security Checkpoint" note="touch it → cough reflex" show={t > 0.5} to={[806, 196]} />
      <Sign x={170} y={150} term="Right primary bronchus" resort="Right Wing · 3 floors (lobes)" show={t > 7} />
      <Sign x={1060} y={150} term="Left primary bronchus" resort="Left Wing · 2 floors (lobes)" show={t > 7.5} />
      <Sign x={590} y={600} term="Hilum" resort="Wing entrance" show={t > 9} to={[545, 370]} />
      <Sign x={590} y={460} term="Secondary bronchi" resort="One corridor per floor" show={t > 13} to={[450, 470]} />
    </g>
  )
}

export const SCENE_W = W
