import type { ReactNode } from 'react'
import { CO2, Flow, O2, Sign, Sparkles, Staff, Stream, along, mix, ramp, window4, type Pt } from './kit'
import {
  ArchDoor, Armchair, Chandelier, Frame, M, P, Pendant, Plant, Room, Rope, Sconce, SideTable, Stanchion, Steam,
  ceilPt, depthAtY, depthScale, floorPt, wallPt, type Box,
} from './interior'

const persp = (B: Box, base = 1) => (y: number) => base * depthScale(B, depthAtY(B, y))

/* ================= 1 · Arrival: the front entrance + air pump room ================= */
export function ArrivalArt({ t }: { t: number }) {
  const B: Box = { x0: 300, y0: 120, x1: 1300, y1: 560 }
  const pump = ramp(t, 5.5, 7.5)
  const pressure = t > 5.5 && t < 13 ? 759 : 760
  const needle = (pressure - 760) * 30
  return (
    <g>
      <rect width="1600" height="900" fill="url(#g-night)" />
      {Array.from({ length: 30 }).map((_, i) => (
        <circle key={i} cx={(i * 197) % 1600} cy={(i * 61) % 110 + 6} r={i % 3 ? 1.2 : 2} fill="#F3EDE4" opacity={0.3 + 0.4 * Math.abs(Math.sin(t + i))} />
      ))}
      <Room
        B={B}
        exterior
        floor="stone"
        backWall={
          <g>
            {/* facade */}
            <rect x="300" y="150" width="1000" height="410" fill="#24403A" />
            <rect x="290" y="142" width="1020" height="18" fill="url(#g-brass)" />
            <text x="800" y="214" textAnchor="middle" className="film-facade">ALVEA</text>
            {[0, 1].map((row) =>
              [340, 430, 520, 1000, 1090, 1180].map((x) => (
                <g key={`${row}-${x}`}>
                  <rect x={x} y={240 + row * 100} width="60" height="74" rx="30" fill={M.glow} opacity={0.75 - ((x + row) % 3) * 0.12} />
                  <rect x={x} y={240 + row * 100} width="60" height="74" rx="30" fill="none" stroke="url(#g-brass)" strokeWidth="3" />
                </g>
              )),
            )}
            {/* nose canopy */}
            <path d="M800 260 L930 430 L670 430 Z" fill="#2F5D50" stroke="url(#g-brass)" strokeWidth="5" />
            <ellipse cx="800" cy="440" rx="190" ry="40" fill="url(#g-glow)" />
            {/* nares: two arched doors with the septum pillar between them */}
            <ArchDoor x={690} y={440} w={92} h={120} />
            <ArchDoor x={818} y={440} w={92} h={120} />
            <rect x="784" y="440" width="32" height="120" fill="#2F5D50" stroke="url(#g-brass)" strokeWidth="3" />
            {/* lanterns */}
            {[640, 960].map((x) => (
              <g key={x}>
                <ellipse cx={x} cy="470" rx="40" ry="40" fill="url(#g-glow)" />
                <rect x={x - 9} y="456" width="18" height="28" rx="4" fill={M.glow} stroke="url(#g-brass)" strokeWidth="2" />
              </g>
            ))}
          </g>
        }
      />
      {/* red carpet */}
      <path d={P([[700, 560], [900, 560], [1060, 900], [540, 900]])} fill="url(#g-carpet)" />
      <path d={P([[700, 560], [900, 560], [1060, 900], [540, 900]])} fill="none" stroke={M.brass} strokeWidth="3" />
      <Plant x={600} y={600} s={0.9} />
      <Plant x={1000} y={600} s={0.9} />
      <Staff x={640} y={690} s={1.1} body="#2F5D50" accent={M.brass} />

      {/* queue of guests with luggage, enter after the pump starts */}
      <g opacity={pump}>
        <Flow pts={[[800, 900], [790, 700], [760, 580], [738, 500]]} t={t} speed={120} width={4} />
        <Flow pts={[[600, 900], [690, 660], [736, 520]]} t={t + 0.4} speed={120} width={3} />
        <Flow pts={[[1000, 900], [880, 660], [862, 520]]} t={t + 0.8} speed={120} width={3} />
      </g>
      <Stream pts={[[800, 960], [800, 700], [760, 600], [736, 540]]} t={t < 5.5 ? t * 0.35 : t - 3.6} start={0.2} travel={5.5} count={16} gap={0.55} s={1.4} bag hero scaleAt={(y) => mix(0.55, 1.2, (y - 540) / 360)} />

      {/* welcome easel */}
      <g>
        <line x1="120" y1="560" x2="90" y2="700" stroke={M.woodDark} strokeWidth="8" />
        <line x1="260" y1="560" x2="290" y2="700" stroke={M.woodDark} strokeWidth="8" />
        <rect x="30" y="300" width="340" height="270" rx="10" fill={M.cream} stroke="url(#g-brass)" strokeWidth="6" />
        <text x="195" y="338" textAnchor="middle" className="film-board__title">Tonight’s guests</text>
        <O2 x={98} y={392} s={1.4} />
        <text x="140" y="388" className="film-board__term">O₂</text>
        <text x="140" y="410" className="film-board__note">oxygen · checking in</text>
        <CO2 x={98} y={482} s={1.2} />
        <text x="140" y="478" className="film-board__term">CO₂</text>
        <text x="140" y="500" className="film-board__note">carbon dioxide · checking out</text>
        <text x="195" y="548" textAnchor="middle" className="film-board__note">Every breath, a destination.</text>
      </g>

      {/* air pump room (diaphragm) */}
      <g>
        <rect x="1330" y="280" width="250" height="340" rx="14" fill="#14221F" stroke="url(#g-brass)" strokeWidth="6" />
        <text x="1455" y="312" textAnchor="middle" className="film-plaque">AIR PUMP ROOM</text>
        {/* chest + lungs */}
        <path d="M1370 360 Q1455 330 1540 360 L1550 520 L1360 520 Z" fill="none" stroke={M.cream} strokeOpacity="0.4" strokeWidth="3" />
        <g transform={`translate(1455 360) scale(${1 + 0.06 * pump} ${1 + 0.1 * pump}) translate(-1455 -360)`}>
          <path d="M1448 370 C1420 372 1392 400 1388 450 C1386 480 1392 500 1400 506 C1420 502 1440 504 1448 500 Z" fill={M.blush} opacity="0.6" />
          <path d="M1462 370 C1490 372 1518 400 1522 450 C1524 480 1518 500 1510 506 C1490 502 1470 504 1462 500 Z" fill={M.blush} opacity="0.6" />
        </g>
        <path d={`M1360 540 C1400 ${mix(470, 528, pump)} 1510 ${mix(470, 528, pump)} 1550 540`} stroke={M.coral} strokeWidth="9" fill="none" strokeLinecap="round" />
        {/* gauge */}
        <g transform="translate(1400 588)">
          <circle r="24" fill={M.cream} stroke="url(#g-brass)" strokeWidth="4" />
          <line x1="0" y1="0" x2="0" y2="-18" stroke={M.velvet} strokeWidth="3" strokeLinecap="round" transform={`rotate(${needle})`} style={{ transition: 'transform .6s' }} />
          <text x="34" y="6" className="film-plaque" style={{ textAnchor: 'start' }}>{pressure} mm Hg</text>
        </g>
      </g>
      <Sign x={1040} y={640} term="Diaphragm" resort="The Air Pump" note={`contracts → volume ↑ → pressure ${pressure} mm Hg`} at={6} t={t} to={[1455, 520]} />
      <Sign x={980} y={20} term="Nostrils" resort="Twin front doors" note="the pillar between = the septum" at={2} t={t} to={[736, 470]} />
    </g>
  )
}

/* ================= 2 · The Lobby: nasal cavity ================= */
export function LobbyArt({ t }: { t: number }) {
  const B: Box = { x0: 470, y0: 190, x1: 1130, y1: 520 }
  const sc = persp(B, 1.5)
  const shelves = (side: -1 | 1) =>
    [0.26, 0.44, 0.62].map((v, i) => {
      const d0 = 0.04 + i * 0.05
      const d1 = 0.78 - i * 0.12
      const a = wallPt(B, side, v, d0)
      const b = wallPt(B, side, v, d1)
      const c = wallPt(B, side, v + 0.07, d1)
      const e = wallPt(B, side, v + 0.07, d0)
      const bulge = side * -26
      return (
        <g key={`${side}${i}`}>
          <path d={`M${a[0]} ${a[1]} L${b[0]} ${b[1]} Q${b[0] + bulge * 2} ${(b[1] + c[1]) / 2} ${c[0]} ${c[1]} L${e[0]} ${e[1]} Z`} fill={M.blush} />
          <path d={`M${e[0]} ${e[1] + 3} L${c[0]} ${c[1] + 3}`} stroke={M.coral} strokeWidth="5" opacity="0.8" />
          {[0.3, 0.6].map((f, k) => {
            const [sx, sy] = wallPt(B, side, v, mix(d0, d1, f))
            return <Steam key={k} x={sx + bulge} y={sy} t={t} i={i + k} s={1 + mix(d0, d1, f)} />
          })}
        </g>
      )
    })
  // skylights in the ceiling = sinuses
  const sky = (u0: number, u1: number) => {
    const q = [ceilPt(B, u0, 0.25), ceilPt(B, u1, 0.25), ceilPt(B, u1, 0.5), ceilPt(B, u0, 0.5)]
    return (
      <g>
        <path d={P(q)} fill="#9FC3D9" opacity="0.5" />
        <path d={P([q[0], q[1], [q[1][0] + 40, q[1][1] + 260], [q[0][0] - 40, q[0][1] + 260]])} fill="#CFE3EE" opacity="0.07" />
      </g>
    )
  }
  const runner = (u0: number, u1: number) => P([floorPt(B, u0, 0), floorPt(B, u1, 0), floorPt(B, u1, 1), floorPt(B, u0, 1)])
  const leftHall: Pt[] = [[260, 960], [300, 800], [470, 700], [400, 620], [560, 580], [700, 540], [770, 500]]
  const rightHall: Pt[] = [[1340, 960], [1300, 800], [1130, 700], [1200, 620], [1040, 580], [900, 540], [830, 500]]
  return (
    <g>
      <Room
        B={B}
        floor="wood"
        backWall={
          <g>
            <ArchDoor x={740} y={330} w={120} h={190} label="ELEVATORS" />
            <Frame x={520} y={250} w={130} h={170}>
              <path d="M65 160 L65 20" stroke={M.leafDark} strokeWidth="3" />
              {[0, 1, 2, 3, 4, 5].map((k) => (
                <ellipse key={k} cx={k % 2 ? 50 : 80} cy={40 + k * 20} rx="16" ry="10" fill={k % 2 ? M.leaf : M.leafDark} />
              ))}
            </Frame>
            <Frame x={950} y={250} w={130} h={170}>
              <circle cx="65" cy="85" r="40" fill={M.coral} opacity="0.7" />
              <circle cx="45" cy="60" r="22" fill={M.blush} />
              <circle cx="88" cy="58" r="20" fill={M.blush} />
            </Frame>
          </g>
        }
      />
      {sky(0.08, 0.32)}
      {sky(0.68, 0.92)}
      {shelves(-1)}
      {shelves(1)}
      {/* aromatherapy chandelier = olfactory epithelium */}
      <Chandelier x={800} y={110} s={1} color={M.coral} />
      {[0, 1, 2].map((i) => {
        const k = (t * 0.4 + i * 0.33) % 1
        return <path key={i} d={`M${760 + i * 40} ${160 + k * 80} q10 -14 0 -28`} stroke={M.coral} strokeWidth="2.5" fill="none" opacity={0.7 * (1 - k)} />
      })}
      {/* cilia carpet runners + mucus */}
      {[[0.18, 0.4], [0.6, 0.82]].map(([u0, u1], i) => (
        <g key={i}>
          <path d={runner(u0, u1)} fill={M.leafDark} />
          <path d={runner(u0 + 0.02, u1 - 0.02)} fill="#DCE6B8" opacity="0.35" />
          {Array.from({ length: 16 }).map((_, k) => {
            const d = Math.pow((k + 0.5) / 16, 1.3)
            return [u0, u1].map((u, j) => {
              const [x, y] = floorPt(B, u, d)
              const ln = 18 * depthScale(B, d)
              return <line key={`${k}${j}`} x1={x} y1={y} x2={x} y2={y - ln} stroke={M.leaf} strokeWidth={3 * depthScale(B, d)} strokeLinecap="round" transform={`rotate(${Math.sin(t * 6 + k) * 25} ${x} ${y})`} />
            })
          })}
          {[0, 1, 2].map((k) => {
            const d = 1 - ((t * 0.12 + k * 0.33) % 1)
            const [x, y] = floorPt(B, (u0 + u1) / 2, d)
            return <circle key={k} cx={x} cy={y} r={9 * depthScale(B, d)} fill="#5A6B65" />
          })}
        </g>
      ))}
      {/* septum: central planter wall dividing the two halls */}
      <path d={P([floorPt(B, 0.47, 0), floorPt(B, 0.53, 0), floorPt(B, 0.56, 0.42), floorPt(B, 0.44, 0.42)])} fill="#3E6359" />
      <path d={P([floorPt(B, 0.44, 0.42), floorPt(B, 0.56, 0.42), [floorPt(B, 0.56, 0.42)[0], floorPt(B, 0.56, 0.42)[1] + 40], [floorPt(B, 0.44, 0.42)[0], floorPt(B, 0.44, 0.42)[1] + 40]])} fill="#2F5D50" stroke="url(#g-brass)" strokeWidth="3" />
      <Plant x={800} y={floorPt(B, 0.5, 0.42)[1] - 6} s={0.75} />
      <Plant x={800} y={floorPt(B, 0.5, 0.15)[1] - 4} s={0.45} />
      {/* side door (mouth) on right wall */}
      {(() => {
        const q = [wallPt(B, 1, 0.68, 0.5), wallPt(B, 1, 0.68, 0.62), wallPt(B, 1, 1, 0.62), wallPt(B, 1, 1, 0.5)]
        return <path d={P(q)} fill="#0F1A17" stroke="url(#g-brass)" strokeWidth="3" />
      })()}
      {/* housekeeper */}
      <Staff x={360} y={680} s={1.15} body={M.cream} accent={M.leafDark}>
        <line x1="26" y1="30" x2="60" y2="80" stroke={M.brassDark} strokeWidth="4" />
        <rect x="50" y="76" width="34" height="12" rx="6" fill="#DCE6B8" />
      </Staff>
      {/* guests */}
      <Flow pts={leftHall} t={t} speed={90} />
      <Flow pts={rightHall} t={t + 0.5} speed={90} />
      {t > 5.5 && (
        <g>
          <Sparkles x={470} y={690} t={t} />
          <Sparkles x={1130} y={690} t={t + 0.3} />
          <Sparkles x={620} y={570} t={t + 0.6} n={4} spread={40} />
          <Sparkles x={980} y={570} t={t + 0.9} n={4} spread={40} />
        </g>
      )}
      <Stream pts={leftHall} t={t} start={0.2} travel={6.5} count={16} gap={0.9} s={1} scaleAt={sc} bag hero />
      <Stream pts={rightHall} t={t} start={0.6} travel={6.5} count={16} gap={0.9} s={1} scaleAt={sc} bag />

      <Sign x={30} y={580} term="Nostrils" resort="Front doors, behind you" at={0.3} t={t} />
      <Sign x={980} y={600} term="Septum" resort="Wall between the two halls" at={2} t={t} to={[820, 640]} />
      <Sign x={1220} y={420} term="Mouth" resort="Side door: skips the welcome" at={3} t={t} to={[1350, 640]} />
      <Sign x={1180} y={180} term="Nasal conchae" resort="Heated Rainforest Walls" note="swirl guests: warm, humidify, clean" at={5.5} t={t} to={[1300, 300]} />
      <Sign x={30} y={430} term="Mucus + cilia" resort="Housekeeping carpets" note="trap dust, sweep it to the throat" at={10.5} t={t} to={[400, 760]} />
      <Sign x={820} y={14} term="Smell receptors" resort="Aromatherapy chandelier" at={15.5} t={t} to={[800, 150]} />
      <Sign x={30} y={170} term="Sinuses" resort="Skylights: air pockets in the skull" at={17.5} t={t} to={[300, 120]} />
    </g>
  )
}

/* ================= 3 · The Elevator: pharynx ================= */
function Floorplate({ y, h, children }: { y: number; h: number; children?: ReactNode }) {
  return (
    <g>
      <rect x="260" y={y} width="960" height={h} fill="url(#g-wall)" />
      {Array.from({ length: 24 }).map((_, i) => (
        <rect key={i} x={262 + i * 40} y={y} width="16" height={h - 20} fill="#33554C" opacity="0.45" />
      ))}
      <rect x="260" y={y + h - 20} width="960" height="20" fill="url(#g-wood)" />
      <rect x="260" y={y} width="960" height="6" fill={M.brass} opacity="0.6" />
      {children}
    </g>
  )
}
export function ElevatorArt({ t }: { t: number }) {
  const carY = t < 13.5 ? mix(110, 312, ramp(t, 8.5, 10)) : mix(312, 560, ramp(t, 13.5, 15))
  const floors = [
    { y: 90, h: 190, name: 'Upper throat', resort: 'North Wing · air only', note: 'guard: the adenoid (a tonsil)', at: 5 },
    { y: 280, h: 200, name: 'Middle throat', resort: 'Food Court · air + food', note: 'guards: the tonsils', at: 10 },
    { y: 480, h: 200, name: 'Lower throat', resort: 'The Great Split', note: 'air → larynx · food → esophagus', at: 15 },
  ]
  const exitF = ramp(t, 15.5, 19)
  const boarding = ramp(t, 0.5, 3.2)
  const food = window4(t, 9.5, 10.5, 19.5, 20.5)
  const foodX = t < 13 ? mix(330, 740, ramp(t, 10, 13)) : mix(740, 1010, ramp(t, 15, 19))
  const foodY = t < 13 ? 448 : mix(448, 655, ramp(t, 13, 19))
  const floorNow = carY < 230 ? 0 : carY < 430 ? 1 : 2
  const guard = (x: number, y: number) => (
    <Staff x={x} y={y} s={0.85} body={M.velvet} accent={M.brass}>
      <rect x="-18" y="-34" width="36" height="10" rx="4" fill={M.ink} />
    </Staff>
  )
  return (
    <g>
      <Floorplate y={90} h={190}>
        <Pendant x={420} y={90} len={20} s={0.7} />
        <Armchair x={380} y={258} s={0.75} />
        <SideTable x={460} y={258} s={0.7} />
        <Armchair x={540} y={258} s={0.75} color={M.leaf} />
        <Frame x={980} y={150} w={80} h={60}>
          <path d="M0 50 L30 20 L50 40 L80 10 L80 60 L0 60 Z" fill={M.leaf} />
        </Frame>
        {guard(1140, 196)}
        <text x="860" y="128" className="film-plaque" style={{ textAnchor: 'start' }}>← FROM THE LOBBY (NASAL CAVITY)</text>
      </Floorplate>
      <Floorplate y={280} h={200}>
        <text x="300" y="318" className="film-plaque" style={{ textAnchor: 'start' }}>← FROM THE MOUTH</text>
        <rect x="300" y="334" width="150" height="60" rx="6" fill="#14221F" stroke="url(#g-brass)" strokeWidth="3" />
        <text x="375" y="370" textAnchor="middle" className="film-plaque">FOOD COURT</text>
        {[520, 610].map((x) => (
          <g key={x}>
            <ellipse cx={x} cy="420" rx="34" ry="8" fill={M.marble} />
            <line x1={x} y1="422" x2={x} y2="458" stroke="url(#g-brass)" strokeWidth="5" />
            <rect x={x - 46} y="418" width="12" height="40" rx="4" fill={M.blush} />
            <rect x={x + 34} y="418" width="12" height="40" rx="4" fill={M.blush} />
          </g>
        ))}
        {guard(960, 390)}
        {guard(1110, 390)}
      </Floorplate>
      <Floorplate y={480} h={200}>
        <rect x="380" y="540" width="110" height="120" rx="8" fill="#0F1A17" stroke={M.coral} strokeWidth="4" />
        <text x="435" y="530" textAnchor="middle" className="film-plaque">AIR · LARYNX</text>
        <rect x="970" y="540" width="110" height="120" rx="8" fill="#0F1A17" stroke={M.leaf} strokeWidth="4" />
        <text x="1025" y="530" textAnchor="middle" className="film-plaque">FOOD · ESOPHAGUS</text>
        <path d="M640 645 L520 645" stroke={M.coral} strokeWidth="6" strokeLinecap="round" />
        <path d="M520 645 l16 -10 M520 645 l16 10" stroke={M.coral} strokeWidth="6" strokeLinecap="round" />
        <path d="M840 645 L960 645" stroke={M.leaf} strokeWidth="6" strokeLinecap="round" />
        <path d="M960 645 l-16 -10 M960 645 l-16 10" stroke={M.leaf} strokeWidth="6" strokeLinecap="round" />
      </Floorplate>
      {/* glass elevator shaft */}
      <rect x="670" y="90" width="160" height="590" fill="url(#g-glass)" stroke="url(#g-brass)" strokeWidth="6" />
      <line x1="750" y1="90" x2="750" y2={carY} stroke={M.brassDark} strokeWidth="3" />
      <g transform={`translate(680 ${carY})`}>
        <rect width="140" height="110" rx="8" fill="rgba(217,182,118,0.18)" stroke="url(#g-brass)" strokeWidth="5" />
        <rect y="100" width="140" height="10" fill="url(#g-brass)" />
        {exitF < 0.05 && boarding >= 1 && [<O2 key="a" x={36} y={58} s={1.1} />, <O2 key="b" x={100} y={58} s={1.1} />, <O2 key="c" x={68} y={84} s={1.1} />]}
      </g>
      {/* floor indicator */}
      <g transform="translate(750 50)">
        <path d="M-60 20 A60 60 0 0 1 60 20" fill="#14221F" stroke="url(#g-brass)" strokeWidth="5" />
        {['N', 'O', 'L'].map((l, i) => (
          <text key={l} x={-40 + i * 40} y="10" textAnchor="middle" className="film-plaque" style={{ fill: i === floorNow ? M.coral : M.cream }}>
            {l}
          </text>
        ))}
      </g>
      {boarding < 1 && <Stream pts={[[240, 236], [500, 236], [716, 236]]} t={t} start={0.3} travel={2.6} count={3} gap={0.15} s={1.1} hero />}
      {exitF > 0 && <Stream pts={[[750, 640], [600, 640], [470, 640], [435, 620]]} t={t} start={15.5} travel={2.6} count={3} gap={0.35} s={1.1} hero />}
      <Flow pts={[[750, 120], [750, 660]]} t={t} speed={70} opacity={0.3} />
      {/* room-service tray */}
      <g opacity={food} transform={`translate(${foodX} ${foodY})`}>
        <ellipse cx="0" cy="12" rx="34" ry="8" fill={M.marble} />
        <path d="M-26 10 Q0 -26 26 10 Z" fill="url(#g-brass)" />
      </g>
      {floors.map((f) => (
        <Sign key={f.name} x={1250} y={f.y + 30} term={f.name} resort={f.resort} note={f.note} at={f.at} t={t} />
      ))}
    </g>
  )
}

/* ================= 4 · Security Gate: larynx as a concert hall ================= */
export function GateArt({ t }: { t: number }) {
  const B: Box = { x0: 380, y0: 140, x1: 1220, y1: 560 }
  const sc = persp(B, 1.3)
  const closed = window4(t, 6.5, 8, 10.5, 12)
  const angle = mix(-78, 0, closed)
  const trayK = ramp(t, 6, 11.5)
  const trayPts: Pt[] = [[260, 820], [560, 640], [700, 470], [900, 470], [1180, 600], [1400, 700]]
  const [tx, ty] = along(trayPts, trayK)
  const vib = t > 13 ? Math.sin(t * 30) * 3 : 0
  return (
    <g>
      <Room
        B={B}
        floor="marble"
        backWall={
          <g>
            {/* proscenium shaped like the thyroid cartilage shield */}
            <path d="M560 210 L760 210 L800 250 L840 210 L1040 210 L1010 400 C985 480 900 545 800 556 C700 545 615 480 590 400 Z" fill="#DCE8E2" />
            <path d="M560 210 L760 210 L800 250 L840 210 L1040 210 L1010 400 C985 480 900 545 800 556 C700 545 615 480 590 400 Z" fill="none" stroke="url(#g-brass)" strokeWidth="8" />
            {/* stage opening with curtains = vocal cords around the glottis */}
            <path d="M660 250 L940 250 L920 520 L680 520 Z" fill="#0F1A17" />
            <path d={`M660 250 L800 250 L${730 + vib} 520 L680 520 Z`} fill="url(#g-velvet)" />
            <path d={`M800 250 L940 250 L920 520 L${870 - vib} 520 Z`} fill="url(#g-velvet)" />
            <rect x="650" y="244" width="300" height="14" fill="url(#g-brass)" />
            {/* cricoid: stage steps */}
            <rect x="620" y="530" width="360" height="16" fill={M.marble} />
            <rect x="600" y="546" width="400" height="14" fill={M.marbleVein} />
          </g>
        }
      />
      <Chandelier x={560} y={40} s={0.8} />
      <Chandelier x={1040} y={40} s={0.8} />
      {/* drawbridge = epiglottis */}
      <g transform={`rotate(${angle} 650 250)`}>
        <path d="M650 250 C700 210 880 206 950 250 C880 290 700 290 650 250 Z" fill={M.blush} stroke={M.velvet} strokeWidth="4" />
        <path d="M680 250 L920 250" stroke={M.brass} strokeWidth="3" />
      </g>
      <circle cx="650" cy="250" r="10" fill="url(#g-brass)" />
      {/* aisle runner + stanchions */}
      <path d={P([floorPt(B, 0.44, 0), floorPt(B, 0.56, 0), floorPt(B, 0.66, 1), floorPt(B, 0.34, 1)])} fill="url(#g-carpet)" />
      {[0.35, 0.6, 0.85].map((d) => {
        const l = floorPt(B, 0.4, d)
        const r = floorPt(B, 0.6, d)
        const s = depthScale(B, d)
        return (
          <g key={d}>
            <Stanchion x={l[0]} y={l[1]} s={s} />
            <Stanchion x={r[0]} y={r[1]} s={s} />
          </g>
        )
      })}
      {(() => {
        const pts = [0.35, 0.6, 0.85].map((d) => [floorPt(B, 0.4, d), floorPt(B, 0.6, d), depthScale(B, d)] as const)
        return pts.slice(0, -1).map(([l, r, s], i) => {
          const [l2, r2, s2] = pts[i + 1]
          return (
            <g key={i}>
              <Rope a={[l[0], l[1] - 84 * s]} b={[l2[0], l2[1] - 84 * s2]} />
              <Rope a={[r[0], r[1] - 84 * s]} b={[r2[0], r2[1] - 84 * s2]} />
            </g>
          )
        })
      })()}
      {/* service door → esophagus */}
      <path d={P([wallPt(B, 1, 0.5, 0.15), wallPt(B, 1, 0.5, 0.3), wallPt(B, 1, 1, 0.3), wallPt(B, 1, 1, 0.15)])} fill="#0F1A17" stroke={M.leaf} strokeWidth="3" />
      {/* guests walk the aisle and through the stage door */}
      <Flow pts={[[800, 900], [800, 600], [800, 440]]} t={t} speed={100} opacity={0.45 * (1 - closed)} width={4} />
      <Stream pts={[[800, 960], [800, 640], [800, 520], [800, 430]]} t={t} start={0.2} travel={4.2} count={4} gap={0.7} s={1} scaleAt={sc} bag hero />
      {/* waiting in line while the epiglottis is closed */}
      {t < 12 &&
        [[740, 690], [800, 680], [860, 690]].map(([ex, ey], i) => (
          <Stream key={i} pts={[[ex, 960], [ex, ey]]} t={t} start={6.4 + i * 0.5} travel={1.8} count={1} gap={1} s={1} scaleAt={sc} bag hold spread={0} />
        ))}
      <Stream pts={[[800, 680], [800, 600], [800, 520], [800, 430]]} t={t} start={12} travel={3} count={3} gap={0.6} s={1} scaleAt={sc} bag />
      <Stream pts={[[800, 960], [800, 640], [800, 520], [800, 430]]} t={t} start={13} travel={4.2} count={6} gap={0.7} s={1} scaleAt={sc} bag />
      {/* room-service trolley (food) */}
      <g opacity={trayK > 0 && trayK < 1 ? 1 : 0} transform={`translate(${tx} ${ty}) scale(${mix(1.3, 0.7, ramp(ty, 820, 470))})`}>
        <rect x="-40" y="0" width="80" height="10" rx="4" fill="url(#g-brass)" />
        <ellipse cx="0" cy="-2" rx="38" ry="9" fill={M.marble} />
        <path d="M-28 -4 Q0 -40 28 -4 Z" fill="url(#g-brass)" />
        <line x1="-34" y1="10" x2="-34" y2="40" stroke={M.brassDark} strokeWidth="4" />
        <line x1="34" y1="10" x2="34" y2="40" stroke={M.brassDark} strokeWidth="4" />
      </g>
      {t > 14 &&
        [0, 1, 2].map((i) => (
          <path key={i} d={`M${960 + i * 28} 340 q16 34 0 68`} stroke={M.coral} strokeWidth="4" fill="none" opacity={0.4 + 0.6 * Math.abs(Math.sin(t * 4 + i))} />
        ))}

      <Sign x={1180} y={14} term="Larynx (voice box)" resort="The Security Gate" note="made of cartilage, stays open" at={0.3} t={t} />
      <Sign x={1180} y={150} term="Adam’s apple" resort="The stage frame (cartilage)" at={3} t={t} to={[1030, 260]} />
      <Sign x={60} y={200} term="Epiglottis" resort="The Drawbridge" note="closes when you swallow" at={6} t={t} to={[700, 250]} />
      <Sign x={1180} y={290} term="Swallowing" resort="Guests wait: breathing pauses" at={8} t={t} to={[800, 680]} />
      <Sign x={1180} y={420} term="Esophagus" resort="Service corridor for food" at={9} t={t} to={[1340, 560]} />
      <Sign x={60} y={420} term="Vocal cords" resort="The Stage Curtains" at={12.5} t={t} to={[720, 420]} />
      <Sign x={60} y={560} term="Air gap" resort="Between the vocal cords" at={13.5} t={t} to={[800, 470]} />
    </g>
  )
}

/* ================= 5 · Main Hallway: trachea ================= */
export function HallwayArt({ t }: { t: number }) {
  const B: Box = { x0: 660, y0: 250, x1: 940, y1: 470 }
  const sc = persp(B, 2.4)
  const ribs = Array.from({ length: 12 }, (_, k) => Math.pow((k + 0.6) / 12, 1.25))
  return (
    <g>
      <Room
        B={B}
        floor="wood"
        wainscot
        backWall={
          <g>
            <ArchDoor x={720} y={300} w={160} h={170} label="GUEST WINGS" />
          </g>
        }
      />
      {/* right wall: glass to the service corridor (esophagus) */}
      <path d={P([wallPt(B, 1, 0.12, 0), wallPt(B, 1, 0.12, 1), wallPt(B, 1, 0.9, 1), wallPt(B, 1, 0.9, 0)])} fill="url(#g-glass)" />
      {(() => {
        const k = (t * 0.08) % 1
        const [x, y] = wallPt(B, 1, 0.78, k)
        const s = depthScale(B, k)
        return (
          <g transform={`translate(${x} ${y}) scale(${s * 1.6})`} opacity="0.75">
            <rect x="-40" y="0" width="80" height="10" rx="4" fill="url(#g-brass)" />
            <path d="M-28 -2 Q0 -36 28 -2 Z" fill="url(#g-brass)" />
          </g>
        )
      })()}
      {/* runner: mucociliary escalator moving toward the viewer */}
      <path d={P([floorPt(B, 0.32, 0), floorPt(B, 0.68, 0), floorPt(B, 0.72, 1), floorPt(B, 0.28, 1)])} fill="url(#g-carpet)" />
      {Array.from({ length: 10 }).map((_, i) => {
        const d = (t * 0.09 + i * 0.1) % 1
        const [x, y] = floorPt(B, 0.4 + (i % 3) * 0.1, d)
        return <ellipse key={i} cx={x} cy={y} rx={22 * depthScale(B, d)} ry={8 * depthScale(B, d)} fill="#DCE6B8" opacity="0.85" />
      })}
      {/* C-shaped cartilage arches: up the left wall, over the ceiling, open on the right wall */}
      {ribs.map((d, i) => {
        const a = wallPt(B, -1, 1, d)
        const b = wallPt(B, -1, 0, d)
        const c = wallPt(B, 1, 0, d)
        const e = wallPt(B, 1, 0.12, d)
        const s = depthScale(B, d)
        return (
          <path
            key={i}
            d={`M${a[0]} ${a[1]} L${b[0]} ${b[1]} Q${(b[0] + c[0]) / 2} ${b[1] - 40 * s} ${c[0]} ${c[1]} L${e[0]} ${e[1]}`}
            stroke={M.cream}
            strokeOpacity={0.35 + 0.5 * s}
            strokeWidth={26 * s}
            fill="none"
            strokeLinejoin="round"
          />
        )
      })}
      {[0.3, 0.55, 0.8].map((d) => {
        const [x, y] = wallPt(B, -1, 0.42, d)
        return <Sconce key={d} x={x} y={y} s={depthScale(B, d) * 1.6} />
      })}
      {/* guests walking away down the hallway */}
      <Flow pts={[[700, 900], [790, 480]]} t={t} speed={110} opacity={0.35} />
      <Flow pts={[[900, 900], [810, 480]]} t={t + 0.3} speed={110} opacity={0.35} />
      <Stream pts={[[740, 960], [770, 700], [790, 520], [800, 470]]} t={t} start={0.2} travel={5.5} count={14} gap={0.8} s={1} scaleAt={sc} bag hero />
      <Stream pts={[[880, 960], [850, 700], [820, 520], [810, 470]]} t={t} start={0.6} travel={5.5} count={14} gap={0.8} s={1} scaleAt={sc} bag />

      <Sign x={40} y={180} term="C-shaped rings" resort="The Arches" note="cartilage keeps the hall open" at={4} t={t} to={[300, 120]} />
      <Sign x={1190} y={150} term="Open side" resort="Glass wall: esophagus behind" at={7} t={t} to={[1400, 380]} />
      <Sign x={40} y={520} term="Mucus escalator" resort="The moving carpet" note="goblet cells + cilia move mucus up" at={11} t={t} to={[620, 800]} />
      <Sign x={1190} y={520} term="Air only" resort="No check-in desk here" note="no gas exchange in the trachea" at={17} t={t} />
    </g>
  )
}

/* ================= 6 · Guest Wings: bronchi ================= */
export function WingsArt({ t }: { t: number }) {
  const B: Box = { x0: 400, y0: 160, x1: 1200, y1: 540 }
  const sc = persp(B, 1.3)
  const alarm = window4(t, 1.5, 2, 5, 5.6)
  const dustK = t < 3.5 ? ramp(t, 0.5, 2.2) : 1 - ramp(t, 3.5, 5)
  const [dx, dy] = along([[800, 960], [800, 520]], dustK)
  const rightPath = (end: Pt): Pt[] => [[760, 960], [780, 700], [700, 600], [620, 540], end]
  const leftPath = (end: Pt): Pt[] => [[840, 960], [820, 700], [900, 600], [980, 550], end]
  return (
    <g>
      <Room
        B={B}
        floor="marble"
        backWall={
          <g>
            {/* right wing arch (wider) and left wing arch (narrower) */}
            <ArchDoor x={440} y={230} w={300} h={310} label="RIGHT WING" />
            <ArchDoor x={890} y={280} w={240} h={260} label="LEFT WING" />
            {/* lobe directories */}
            {['Upper', 'Middle', 'Lower'].map((l, i) => (
              <g key={l}>
                <rect x={520} y={340 + i * 52} width="140" height="40" rx="6" fill="#14221F" stroke="url(#g-brass)" strokeWidth="2" />
                <text x={590} y={366 + i * 52} textAnchor="middle" className="film-plaque">{l} lobe</text>
              </g>
            ))}
            {['Upper', 'Lower'].map((l, i) => (
              <g key={l}>
                <rect x={940} y={380 + i * 56} width="140" height="40" rx="6" fill="#14221F" stroke="url(#g-brass)" strokeWidth="2" />
                <text x={1010} y={406 + i * 56} textAnchor="middle" className="film-plaque">{l} lobe</text>
              </g>
            ))}
          </g>
        }
      />
      {/* carina: security arch at the fork */}
      <g>
        <rect x="770" y="300" width="60" height="250" fill="none" stroke="url(#g-brass)" strokeWidth="12" />
        <rect x="770" y="290" width="60" height="20" rx="4" fill={alarm > 0.5 && Math.sin(t * 20) > 0 ? M.coral : M.brassDark} />
        <ellipse cx="800" cy="300" rx={30 + alarm * 60} ry={30 + alarm * 60} fill="url(#g-glow-coral)" opacity={alarm} />
      </g>
      <circle cx={dx} cy={dy} r={10 * mix(1, 0.5, dustK)} fill="#5A6B65" opacity={t < 5 ? 1 : 0} />
      <text x="860" y="260" className="film-cough" opacity={window4(t, 3.4, 3.6, 4.8, 5.4)}>
        COUGH!
      </text>
      {/* the heart next door */}
      <g transform="translate(1310 380)">
        <rect x="-90" y="-70" width="180" height="140" rx="16" fill="#14221F" stroke={M.coral} strokeWidth="3" />
        <path d="M0 -10 C-30 -50 -70 -20 -40 20 L0 54 L40 20 C70 -20 30 -50 0 -10 Z" fill={M.coral} opacity={0.6 + 0.4 * Math.abs(Math.sin(t * 3))} />
        <text y="92" textAnchor="middle" className="film-plaque">CARDIAC CLUB</text>
        <text y="112" textAnchor="middle" className="film-plaque" style={{ fontSize: 12 }}>(THE HEART) NEXT DOOR</text>
      </g>
      <Plant x={300} y={720} s={1.2} />
      {/* guests split into the two wings */}
      <g opacity={ramp(t, 5.5, 6.5)}>
        <Flow pts={rightPath([590, 470])} t={t} speed={110} />
        <Flow pts={leftPath([1010, 480])} t={t + 0.4} speed={110} />
      </g>
      <Stream pts={rightPath([590, 470])} t={t} start={6} travel={4} count={12} gap={0.6} s={1} scaleAt={sc} bag hero />
      <Stream pts={leftPath([1010, 480])} t={t} start={6.3} travel={4} count={10} gap={0.75} s={1} scaleAt={sc} bag />

      <Sign x={880} y={14} term="Split point" resort="Security Checkpoint" note="touch it → you cough" at={0.5} t={t} to={[830, 300]} />
      <Sign x={40} y={170} term="Right bronchus" resort="Right Wing · 3 floors (lobes)" note="wider and straighter" at={6.5} t={t} to={[480, 300]} />
      <Sign x={1220} y={170} term="Left bronchus" resort="Left Wing · 2 floors (lobes)" at={7} t={t} to={[1100, 330]} />
      <Sign x={40} y={560} term="Smaller branches" resort="One corridor per floor (lobe)" at={13} t={t} to={[520, 400]} />
    </g>
  )
}

