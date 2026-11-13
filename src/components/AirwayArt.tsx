import type React from 'react'
/**
 * Stylized head, neck and chest showing the full airway, drawn for dark backgrounds.
 * viewBox 0 0 800 1100. Coordinates are shared with the resort map hotspots and the breath path.
 */

export const MAP_W = 800
export const MAP_H = 1100

/** Inhale route, in anatomical order (outside the nose → alveoli). */
export const breathPath: [number, number][] = [
  [130, 262], // 0 outside the nose
  [204, 256], // 1 naris
  [300, 236], // 2 nasal cavity
  [420, 226], // 3 back of nasal cavity
  [442, 300], // 4 nasopharynx / oropharynx
  [440, 400], // 5 laryngopharynx
  [420, 452], // 6 larynx
  [420, 530], // 7
  [420, 610], // 8 trachea
  [420, 700], // 9 carina
  [344, 764], // 10 right primary bronchus
  [302, 818], // 11
  [274, 862], // 12 bronchiole
  [246, 908], // 13 alveoli
]

/** Hotspot positions for stops 1–8 (same coordinate space). */
export const hotspots: Record<number, [number, number]> = {
  1: [300, 236],
  2: [442, 320],
  3: [420, 452],
  4: [420, 590],
  5: [420, 700],
  6: [274, 862],
  7: [236, 922],
  8: [420, 1004],
}

type Props = {
  className?: string
  x?: number
  y?: number
  width?: number
  height?: number
  children?: React.ReactNode
  zone?: 'conducting' | 'respiratory' | 'ventilation' | null
  diaphragmDown?: boolean
  trail?: string
  trailColor?: string
}

export function AirwayArt({ className = 'airway-art', x, y, width, height, children, zone = null, diaphragmDown = false, trail, trailColor = '#E3735E' }: Props) {
  const pathD = breathPath.map(([x, y], i) => `${i ? 'L' : 'M'}${x} ${y}`).join(' ')
  const conductingD = breathPath.slice(1, 13).map(([x, y], i) => `${i ? 'L' : 'M'}${x} ${y}`).join(' ')
  return (
    <svg viewBox={`0 0 ${MAP_W} ${MAP_H}`} className={className} x={x} y={y} width={width} height={height} aria-hidden="true" focusable="false">
      <defs>
        <radialGradient id="aw-glow" cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor="#E3735E" stopOpacity="0.55" />
          <stop offset="100%" stopColor="#E3735E" stopOpacity="0" />
        </radialGradient>
        <filter id="aw-soft" x="-50%" y="-50%" width="200%" height="200%">
          <feGaussianBlur stdDeviation="6" />
        </filter>
      </defs>

      {/* body silhouette */}
      <path
        d="M360 30 C440 20 540 60 570 150 C600 250 560 380 500 430 L494 520 C560 540 650 560 690 610 L704 1090 L96 1090 L110 610 C150 560 240 540 336 520 L334 420 C300 396 262 380 242 352 C232 336 228 324 226 318 C218 312 220 306 224 300 C220 294 222 288 226 284 C222 276 214 270 196 262 C186 256 190 246 200 236 C220 210 236 180 240 140 C250 90 290 40 360 30 Z"
        fill="#24403A"
        stroke="#36574F"
        strokeWidth="2"
      />

      {/* esophagus (behind trachea, muted) */}
      <path d="M458 410 L458 620" stroke="#36574F" strokeWidth="14" strokeLinecap="round" />

      {/* lungs */}
      <g className={`aw-lungs${diaphragmDown ? ' is-expanded' : ''}`}>
        <path
          d="M330 600 C270 610 200 700 185 820 C175 900 180 980 200 1010 C260 1000 340 1005 395 990 C392 900 388 800 380 720 C374 660 360 610 330 600 Z"
          fill="rgba(244,213,204,0.13)"
          stroke="#F4D5CC"
          strokeOpacity="0.55"
          strokeWidth="2"
        />
        <path
          d="M510 600 C570 610 640 700 655 820 C665 900 660 980 640 1010 C590 1000 520 1004 470 995 C480 960 500 930 490 900 C478 880 462 850 462 800 C464 720 476 640 510 600 Z"
          fill="rgba(244,213,204,0.13)"
          stroke="#F4D5CC"
          strokeOpacity="0.55"
          strokeWidth="2"
        />
      </g>
      {/* heart hint */}
      <path d="M440 900 C420 880 470 860 500 890 C520 920 510 970 480 990 C450 990 430 950 440 900 Z" fill="#E3735E" opacity="0.18" />

      {/* nasal cavity */}
      <path d="M206 254 C236 226 282 210 340 206 C384 204 412 208 428 222 L432 262 L232 268 Z" fill="rgba(244,213,204,0.16)" stroke="#F4D5CC" strokeWidth="2" />
      <g stroke="#E3735E" strokeWidth="3" fill="none" strokeLinecap="round">
        <path d="M330 222 C360 218 390 220 410 226" />
        <path d="M300 240 C340 236 380 238 414 242" />
        <path d="M270 256 C320 254 370 254 420 256" />
      </g>
      {/* oral cavity + tongue */}
      <path d="M236 280 L420 276 C430 300 426 330 410 340 L250 316 Z" fill="#1B2A26" opacity="0.45" />
      <path d="M248 312 C300 290 380 286 414 300 C428 320 420 350 404 372 L300 340 Z" fill="#E3735E" opacity="0.35" />

      {/* pharynx */}
      <path d="M428 222 C452 216 468 226 470 250 L468 420 L414 420 L426 330 L432 262 Z" fill="rgba(244,213,204,0.16)" stroke="#F4D5CC" strokeWidth="2" />
      {/* larynx */}
      <path d="M396 420 L446 420 L442 486 L398 486 Z" fill="rgba(244,213,204,0.22)" stroke="#F4D5CC" strokeWidth="2" />
      <path d="M404 412 C410 396 420 388 434 386" stroke="#F4D5CC" strokeWidth="5" strokeLinecap="round" fill="none" />
      <path d="M402 452 L420 458 L438 452" stroke="#E3735E" strokeWidth="3" fill="none" />

      {/* trachea */}
      <rect x="402" y="486" width="36" height="206" fill="rgba(244,213,204,0.12)" stroke="#F4D5CC" strokeWidth="2" />
      {Array.from({ length: 11 }).map((_, i) => (
        <rect key={i} x="400" y={494 + i * 18} width="40" height="9" rx="4.5" fill="#F4D5CC" opacity="0.55" />
      ))}

      {/* bronchial tree */}
      <g fill="none" stroke="#F4D5CC" strokeLinecap="round" strokeLinejoin="round">
        <path d="M414 692 L344 764 L302 818 L274 862" strokeWidth="12" strokeOpacity="0.8" />
        <path d="M426 692 L500 744 L560 800" strokeWidth="10" strokeOpacity="0.8" />
        <path d="M344 764 L300 720 M302 818 L250 800 M302 818 L320 900 M344 764 L360 840" strokeWidth="6" strokeOpacity="0.6" />
        <path d="M500 744 L556 700 M560 800 L600 860 M560 800 L530 880 M500 744 L520 820" strokeWidth="6" strokeOpacity="0.6" />
        <path d="M300 720 L270 700 M300 720 L300 680 M250 800 L220 790 M250 800 L232 830 M320 900 L312 940 M320 900 L346 930 M360 840 L380 880" strokeWidth="3" strokeOpacity="0.45" />
        <path d="M556 700 L590 690 M556 700 L560 660 M600 860 L630 880 M600 860 L620 830 M530 880 L520 930 M530 880 L556 920 M520 820 L500 860" strokeWidth="3" strokeOpacity="0.45" />
        <path d="M274 862 L256 890" strokeWidth="4" strokeOpacity="0.8" />
      </g>
      {/* carina */}
      <path d="M412 704 L420 694 L428 704" stroke="#E3735E" strokeWidth="3" fill="none" />

      {/* alveoli cluster (headline attraction) */}
      <g className="aw-alveoli">
        {[
          [246, 908, 12, '#E3735E'], [228, 896, 9, '#F4D5CC'], [262, 896, 8, '#F4D5CC'], [232, 920, 9, '#F4D5CC'],
          [256, 924, 9, '#E3735E'], [244, 934, 7, '#F4D5CC'], [218, 912, 7, '#E3735E'], [270, 912, 7, '#E3735E'],
        ].map(([x, y, r, f], i) => (
          <circle key={i} cx={x as number} cy={y as number} r={r as number} fill={f as string} />
        ))}
      </g>

      {/* diaphragm */}
      <path
        className={`aw-diaphragm${diaphragmDown ? ' is-down' : ''}`}
        d="M170 1034 C250 960 380 986 420 996 C460 986 590 960 670 1034"
        fill="none"
        stroke="#E3735E"
        strokeWidth="9"
        strokeLinecap="round"
      />

      {/* zone highlights */}
      {zone === 'conducting' && (
        <path d={conductingD} fill="none" stroke="#F4D5CC" strokeWidth="26" strokeOpacity="0.28" strokeLinecap="round" strokeLinejoin="round" />
      )}
      {zone === 'respiratory' && <circle cx="244" cy="912" r="58" fill="url(#aw-glow)" />}
      {zone === 'ventilation' && (
        <path d="M170 1034 C250 960 380 986 420 996 C460 986 590 960 670 1034" fill="none" stroke="#F4D5CC" strokeWidth="26" strokeOpacity="0.3" strokeLinecap="round" />
      )}

      {/* faint route guide */}
      <path d={pathD} fill="none" stroke="#C9D6CF" strokeOpacity="0.25" strokeWidth="2" strokeDasharray="3 8" />
      {trail && <path d={trail} fill="none" stroke={trailColor} strokeWidth="4" strokeLinecap="round" strokeLinejoin="round" opacity="0.8" />}
      {children}
    </svg>
  )
}
