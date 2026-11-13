import { C, Callout, Label, PanelTitle } from './parts'

function Sacs({ cx, cy, s = 1 }: { cx: number; cy: number; s?: number }) {
  const pts: [number, number, number][] = [
    [0, 0, 20], [24, -22, 16], [28, 18, 17], [-6, -32, 14], [-4, 30, 14], [46, -2, 14], [16, 40, 11], [14, -46, 11],
  ]
  return (
    <g>
      {pts.map(([x, y, r], i) => (
        <circle key={i} cx={cx + x * s} cy={cy + y * s} r={r * s} fill={i % 3 === 0 ? C.coral : C.blush} stroke={C.coralDeep} strokeWidth="1" />
      ))}
    </g>
  )
}

export function BronchiolesDiagram() {
  return (
    <svg viewBox="0 0 1060 480" role="img" aria-labelledby="bl-t bl-d" className="diagram-svg">
      <title id="bl-t">Labelled diagram of the bronchioles</title>
      <desc id="bl-d">
        A tertiary bronchus with cartilage plates branches into bronchioles, then terminal bronchioles (the end of the conducting
        zone), then respiratory bronchioles with a few alveoli, alveolar ducts and alveolar sacs (the respiratory zone).
        Cross-sections compare a bronchus, which has cartilage, with a bronchiole, which has smooth muscle and no cartilage.
      </desc>
      <PanelTitle x={20} y={26}>From bronchus to alveolar sac</PanelTitle>

      {/* tertiary bronchus */}
      <path d="M30 230 L170 230" stroke={C.euc} strokeWidth="34" strokeLinecap="round" />
      <path d="M30 230 L170 230" stroke={C.paper} strokeWidth="28" strokeLinecap="round" />
      {[50, 82, 114, 146].map((x) => (
        <rect key={x} x={x} y="212" width="16" height="36" rx="4" fill={C.cartilage} stroke={C.euc} />
      ))}
      {/* bronchioles */}
      <g fill="none" strokeLinecap="round">
        <path d="M170 230 C210 220 240 170 290 150" stroke={C.coralDeep} strokeWidth="18" />
        <path d="M170 230 C210 220 240 170 290 150" stroke={C.blush} strokeWidth="13" />
        <path d="M170 232 C210 246 240 290 290 312" stroke={C.coralDeep} strokeWidth="18" opacity="0.5" />
        <path d="M170 232 C210 246 240 290 290 312" stroke={C.blush} strokeWidth="13" opacity="0.5" />
        {/* terminal bronchiole */}
        <path d="M290 150 L400 130" stroke={C.coralDeep} strokeWidth="12" />
        <path d="M290 150 L400 130" stroke={C.blush} strokeWidth="8" />
        {/* respiratory bronchiole */}
        <path d="M400 130 L520 120" stroke={C.coralDeep} strokeWidth="10" />
        <path d="M400 130 L520 120" stroke={C.blush} strokeWidth="6" />
        {/* alveolar duct */}
        <path d="M520 120 L620 120" stroke={C.coralDeep} strokeWidth="10" />
        <path d="M520 120 L620 120" stroke={C.blush} strokeWidth="6" />
        {/* lower faded branch */}
        <path d="M290 312 L390 330 L480 340" stroke={C.coralDeep} strokeWidth="9" opacity="0.4" />
      </g>
      {/* buds on respiratory bronchiole */}
      {[440, 490].map((x) => (
        <circle key={x} cx={x} cy={112} r="9" fill={C.coral} stroke={C.coralDeep} />
      ))}
      {[540, 566, 592].map((x, i) => (
        <g key={x}>
          <circle cx={x} cy={104} r="10" fill={i % 2 ? C.blush : C.coral} stroke={C.coralDeep} />
          <circle cx={x + 8} cy={137} r="10" fill={i % 2 ? C.coral : C.blush} stroke={C.coralDeep} />
        </g>
      ))}
      <Sacs cx={660} cy={120} s={1.3} />
      <Sacs cx={510} cy={340} s={0.8} />

      <Label x={100} y={190} anchor="middle" bold>Tertiary bronchus</Label>
      <Label x={100} y={282} anchor="middle" small>cartilage plates</Label>
      <Callout at={[240, 182]} to={[200, 90]} label="Bronchiole" sub="≤ 1 mm, smooth muscle" anchor="middle" />
      <Callout at={[350, 140]} to={[350, 60]} label="Terminal bronchiole" anchor="middle" />
      <Callout at={[460, 124]} to={[490, 210]} label="Respiratory bronchiole" sub="first alveoli appear" anchor="middle" />
      <Callout at={[580, 120]} to={[620, 262]} label="Alveolar duct" anchor="middle" />
      <Callout at={[690, 90]} to={[690, 40]} label="Alveolar sac" anchor="middle" />

      {/* zone brackets */}
      <g stroke={C.deep} strokeWidth="1.6" fill="none">
        <path d="M30 400 L30 412 L398 412 L398 400" />
        <path d="M410 400 L410 412 L730 412 L730 400" />
      </g>
      <Label x={214} y={440} anchor="middle" bold>Conducting zone</Label>
      <Label x={214} y={460} anchor="middle" small>moves air, no gas exchange</Label>
      <Label x={570} y={440} anchor="middle" bold fill={C.coralDeep}>Respiratory zone</Label>
      <Label x={570} y={460} anchor="middle" small>gas exchange happens here</Label>

      {/* cross sections */}
      <PanelTitle x={900} y={26} anchor="middle">Cross-sections</PanelTitle>
      {/* bronchus */}
      <circle cx="900" cy="120" r="62" fill={C.tissue} stroke={C.euc} strokeWidth="1.5" />
      {[0, 70, 140, 210, 280].map((a) => {
        const rad = (a * Math.PI) / 180
        return <rect key={a} x={900 + Math.cos(rad) * 50 - 9} y={120 + Math.sin(rad) * 50 - 6} width="18" height="12" rx="4" fill={C.cartilage} stroke={C.euc} transform={`rotate(${a + 90} ${900 + Math.cos(rad) * 50} ${120 + Math.sin(rad) * 50})`} />
      })}
      <circle cx="900" cy="120" r="34" fill={C.paper} stroke={C.blush} strokeWidth="6" />
      <Label x={900} y={206} anchor="middle" bold>Bronchus</Label>
      <Label x={900} y={224} anchor="middle" small>cartilage plates</Label>
      {/* bronchiole */}
      <circle cx="900" cy="320" r="52" fill={C.tissue} stroke={C.euc} strokeWidth="1.5" />
      <circle cx="900" cy="320" r="38" fill="none" stroke={C.coralDeep} strokeWidth="9" strokeDasharray="10 4" />
      <circle cx="900" cy="320" r="28" fill={C.paper} stroke={C.blush} strokeWidth="5" />
      <Label x={900} y={396} anchor="middle" bold>Bronchiole</Label>
      <Label x={900} y={414} anchor="middle" small>smooth muscle ring,</Label>
      <Label x={900} y={432} anchor="middle" small>no cartilage</Label>
    </svg>
  )
}
