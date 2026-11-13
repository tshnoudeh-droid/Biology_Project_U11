import { Arrowheads, C, Callout, Label, PanelTitle } from './parts'

export function PharynxDiagram() {
  const regions = [
    { y1: 70, y2: 212, fill: C.sage, name: 'Nasopharynx', resort: 'North Wing · air only' },
    { y1: 212, y2: 318, fill: C.coral, name: 'Oropharynx', resort: 'Food Court Crossing · air + food' },
    { y1: 318, y2: 420, fill: C.blush, name: 'Laryngopharynx', resort: 'The Great Split' },
  ]
  return (
    <svg viewBox="0 0 1000 540" role="img" aria-labelledby="ph-t ph-d" className="diagram-svg">
      <title id="ph-t">Labelled diagram of the pharynx</title>
      <desc id="ph-d">
        Side view of the head and neck. The pharynx runs behind the nasal and oral cavities and is divided into the nasopharynx,
        oropharynx and laryngopharynx. Air travels from the nasal cavity down into the larynx and trachea; food travels from the
        mouth down into the esophagus. The pharyngeal, palatine and lingual tonsils are marked.
      </desc>
      <Arrowheads id="ph" />
      <PanelTitle x={20} y={26}>Side view of the head and neck</PanelTitle>

      {/* head + neck tissue */}
      <path
        d="M200 40 C190 70 180 96 164 120 C146 148 120 170 100 196 C94 206 102 214 120 214 L132 216 C136 232 128 244 134 256 C140 266 132 276 138 290 C150 312 170 318 200 324 C214 360 226 420 226 530 L620 530 L620 40 Z"
        fill={C.tissue}
        stroke={C.euc}
        strokeWidth="2"
      />
      {/* nasal cavity */}
      <path d="M130 206 C150 180 190 140 240 120 C300 100 380 100 420 120 L432 196 L150 198 Z" fill={C.paper} stroke={C.euc} strokeWidth="1.6" />
      {/* hard palate + soft palate/uvula */}
      <path d="M150 202 L400 202" stroke={C.euc} strokeWidth="9" strokeLinecap="round" />
      <path d="M400 202 C424 208 438 222 440 246" stroke={C.coralDeep} strokeWidth="9" strokeLinecap="round" fill="none" />
      {/* oral cavity + tongue */}
      <path d="M142 214 L398 214 C420 230 420 250 410 260 L150 266 Z" fill={C.paper} />
      <path d="M156 262 C200 230 300 214 380 232 C420 244 430 290 420 330 L400 360 L180 300 Z" fill="#EFC2B5" stroke={C.coralDeep} strokeWidth="1.6" />

      {/* pharynx airway */}
      <path d="M432 70 C470 68 500 76 520 92 L524 420 L432 420 L440 246 L432 196 Z" fill={C.paper} stroke={C.euc} strokeWidth="2" />
      {/* region bands */}
      {regions.map((r) => (
        <rect key={r.name} x={436} y={r.y1} width={88} height={r.y2 - r.y1} fill={r.fill} opacity="0.45" />
      ))}
      {/* epiglottis */}
      <path d="M418 340 C420 318 432 300 448 292" stroke={C.euc} strokeWidth="7" strokeLinecap="round" fill="none" />
      {/* larynx + trachea (front) */}
      <path d="M400 360 L404 530 M462 360 L462 530" stroke={C.euc} strokeWidth="2" />
      <rect x="402" y="360" width="60" height="170" fill={C.paper} />
      <path d="M400 360 L404 530 M462 360 L462 530" stroke={C.euc} strokeWidth="2" />
      {[440, 466, 492, 518].map((y) => (
        <rect key={y} x="404" y={y} width="56" height="12" rx="6" fill={C.cartilage} stroke={C.euc} />
      ))}
      <path d="M406 392 L430 398 L456 392" stroke={C.coralDeep} strokeWidth="3" fill="none" />
      {/* esophagus (back) */}
      <rect x="476" y="420" width="48" height="110" fill={C.blush} opacity="0.9" stroke={C.coralDeep} />
      <path d="M500 424 L500 528" stroke={C.coralDeep} strokeWidth="1.4" />
      <path d="M432 420 L476 420" stroke={C.euc} strokeWidth="1.2" strokeDasharray="3 3" />

      {/* tonsils */}
      <ellipse cx="514" cy="106" rx="10" ry="22" fill={C.coralDeep} opacity="0.8" />
      <ellipse cx="458" cy="262" rx="12" ry="20" fill={C.coralDeep} opacity="0.8" />
      {[300, 314, 328].map((y, i) => (
        <circle key={y} cx={418 - i * 4} cy={y - 8} r="6" fill={C.coralDeep} opacity="0.8" />
      ))}

      {/* air + food routes */}
      <path d="M60 222 C100 214 150 170 260 160 C360 152 430 150 470 170 C496 190 492 260 470 300 C452 330 440 360 432 420 L432 520" fill="none" stroke={C.coralDeep} strokeWidth="2.8" markerEnd="url(#ph-coral)" />
      <path d="M90 238 C150 236 240 226 320 228 C390 232 446 250 480 290 C504 330 500 380 500 520" fill="none" stroke={C.euc} strokeWidth="2.8" strokeDasharray="8 6" markerEnd="url(#ph-euc)" />

      {/* region brackets + labels */}
      {regions.map((r) => (
        <g key={r.name}>
          <path d={`M560 ${r.y1 + 4} L572 ${r.y1 + 4} L572 ${r.y2 - 4} L560 ${r.y2 - 4}`} fill="none" stroke={C.deep} strokeWidth="1.5" />
          <rect x="584" y={(r.y1 + r.y2) / 2 - 14} width="16" height="16" rx="4" fill={r.fill} />
          <text x="610" y={(r.y1 + r.y2) / 2} className="svg-label svg-label--bold">{r.name}</text>
          <text x="610" y={(r.y1 + r.y2) / 2 + 20} className="svg-label svg-label--sm">{r.resort}</text>
        </g>
      ))}

      <Callout at={[514, 100]} to={[790, 112]} label="Pharyngeal tonsil (adenoid)" />
      <Callout at={[462, 262]} to={[860, 236]} label="Palatine tonsil" />
      <Callout at={[412, 300]} to={[860, 290]} label="Lingual tonsil" sub="base of the tongue" />
      <Callout at={[446, 294]} to={[860, 352]} label="Epiglottis" />
      <Callout at={[432, 470]} to={[300, 470]} label="Larynx → trachea" sub="air route" anchor="end" />
      <Callout at={[510, 490]} to={[640, 500]} label="Esophagus" sub="food route" />
      <Callout at={[436, 232]} to={[640, 46]} label="Soft palate + uvula" sub="lifts to seal the nasopharynx when you swallow" elbow />
      <Label x={220} y={186} small>Nasal cavity</Label>
      <Label x={190} y={244} small>Oral cavity</Label>
      <Label x={250} y={290} small>Tongue</Label>

      {/* key */}
      <g transform="translate(700 420)">
        <path d="M0 0 L36 0" stroke={C.coralDeep} strokeWidth="2.8" markerEnd="url(#ph-coral)" />
        <text x="48" y="5" className="svg-label svg-label--sm">Air route</text>
        <path d="M0 28 L36 28" stroke={C.euc} strokeWidth="2.8" strokeDasharray="8 6" markerEnd="url(#ph-euc)" />
        <text x="48" y="33" className="svg-label svg-label--sm">Food route</text>
      </g>
    </svg>
  )
}
