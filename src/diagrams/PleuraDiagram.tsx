import { Arrowheads, C, Label, PanelTitle } from './parts'

function Chest({ x, inhale }: { x: number; inhale: boolean }) {
  const domeY = inhale ? 300 : 250
  const spread = inhale ? 1.08 : 1
  return (
    <g transform={`translate(${x} 0)`}>
      <g transform={`translate(200 200) scale(${spread} 1) translate(-200 -200)`}>
        {[110, 150, 190, 230].map((y, i) => (
          <g key={y} stroke={C.muted} strokeWidth="6" fill="none" strokeLinecap="round" opacity="0.6">
            <path d={`M190 ${y - (inhale ? 12 : 0)} C140 ${y - 20 - (inhale ? 12 : 0)} 70 ${y - 4} 60 ${y + 30 + i * 2}`} />
            <path d={`M210 ${y - (inhale ? 12 : 0)} C260 ${y - 20 - (inhale ? 12 : 0)} 330 ${y - 4} 340 ${y + 30 + i * 2}`} />
          </g>
        ))}
      </g>
      <path d={`M190 90 C150 92 ${inhale ? 85 : 100} 150 ${inhale ? 80 : 95} 220 C${inhale ? 76 : 92} 260 ${inhale ? 90 : 100} ${domeY - 6} 110 ${domeY}`} fill={C.blush} opacity="0.8" />
      <path d={`M190 90 L190 ${domeY} L110 ${domeY}`} fill={C.blush} opacity="0.8" />
      <path d={`M210 90 C250 92 ${inhale ? 315 : 300} 150 ${inhale ? 320 : 305} 220 C${inhale ? 324 : 308} 260 ${inhale ? 310 : 300} ${domeY - 6} 290 ${domeY}`} fill={C.blush} opacity="0.8" />
      <path d={`M210 90 L210 ${domeY} L290 ${domeY}`} fill={C.blush} opacity="0.8" />
      <rect x="190" y="30" width="20" height="70" fill={C.cartilage} stroke={C.euc} />
      <path d={inhale ? 'M50 312 C150 296 250 296 350 312' : 'M50 320 C120 220 280 220 350 320'} stroke={C.coral} strokeWidth="10" fill="none" strokeLinecap="round" />
      {inhale ? (
        <path d="M200 -10 L200 26" stroke={C.coralDeep} strokeWidth="4" markerEnd="url(#pl-coral)" />
      ) : (
        <path d="M200 26 L200 -10" stroke={C.euc} strokeWidth="4" markerEnd="url(#pl-euc)" />
      )}
      {inhale ? (
        <path d="M200 260 L200 300" stroke={C.coralDeep} strokeWidth="3" markerEnd="url(#pl-coral)" opacity="0.8" />
      ) : (
        <path d="M200 270 L200 236" stroke={C.euc} strokeWidth="3" markerEnd="url(#pl-euc)" opacity="0.8" />
      )}
    </g>
  )
}

/** Breathing in vs breathing out, side by side. */
export function PleuraDiagram() {
  return (
    <svg viewBox="0 0 1000 440" role="img" aria-labelledby="br-in-t br-in-d" className="diagram-svg">
      <title id="br-in-t">Breathing in vs breathing out</title>
      <desc id="br-in-d">
        Breathing in: the diaphragm contracts and moves down, the ribs move up and out, the chest gets bigger, pressure drops and air flows in.
        Breathing out: the diaphragm relaxes back into a dome, the ribs move down, the chest gets smaller, pressure rises and air flows out.
      </desc>
      <Arrowheads id="pl" />
      <PanelTitle x={40} y={24}>Breathing in</PanelTitle>
      <PanelTitle x={540} y={24}>Breathing out</PanelTitle>
      <g transform="translate(0 40)">
        <Chest x={0} inhale />
        <Chest x={500} inhale={false} />
      </g>
      <Label x={420} y={120} bold>Air rushes in</Label>
      <Label x={420} y={150} small>ribs move up + out</Label>
      <Label x={420} y={176} small>diaphragm moves down</Label>
      <Label x={420} y={202} small>chest gets bigger</Label>
      <Label x={420} y={228} small>pressure drops</Label>
      <Label x={920} y={120} anchor="end" bold>Air flows out</Label>
      <Label x={920} y={150} anchor="end" small>muscles relax</Label>
      <Label x={920} y={176} anchor="end" small>diaphragm domes up</Label>
      <Label x={920} y={202} anchor="end" small>chest gets smaller</Label>
      <Label x={920} y={228} anchor="end" small>pressure rises</Label>
      <Label x={200} y={420} anchor="middle" bold>Diaphragm: flat (contracted)</Label>
      <Label x={700} y={420} anchor="middle" bold>Diaphragm: dome (relaxed)</Label>
    </svg>
  )
}
