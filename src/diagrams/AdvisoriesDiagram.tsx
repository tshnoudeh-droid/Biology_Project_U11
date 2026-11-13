import { C, Label, PanelTitle } from './parts'

function Cluster({ cx, cy, broken = false }: { cx: number; cy: number; broken?: boolean }) {
  const sacs: [number, number, number][] = broken
    ? [[0, 0, 44], [-34, 40, 26], [40, 36, 22]]
    : [[0, 0, 20], [-30, -14, 17], [30, -14, 17], [-18, 24, 16], [20, 26, 16], [0, -34, 15], [-40, 16, 13], [42, 14, 13], [-6, 46, 12]]
  return (
    <g>
      {sacs.map(([x, y, r], i) => (
        <circle key={i} cx={cx + x} cy={cy + y} r={r} fill={C.blush} stroke={C.coralDeep} strokeWidth="1.4" />
      ))}
    </g>
  )
}

export function AdvisoriesDiagram() {
  return (
    <svg viewBox="0 0 1000 330" role="img" aria-labelledby="ad-t ad-d" className="diagram-svg">
      <title id="ad-t">Comparison diagrams for each travel advisory</title>
      <desc id="ad-d">
        Asthma: a normal bronchiole with a wide opening next to an asthmatic bronchiole with thick, tightened smooth muscle, extra mucus
        and a narrow opening. Emphysema: many small healthy alveoli next to a few large, broken-down air sacs with less surface area.
        Neonatal respiratory distress syndrome: a round alveolus with surfactant next to a collapsed alveolus without enough surfactant.
      </desc>
      {/* Asthma */}
      <PanelTitle x={166} y={30} anchor="middle">Asthma</PanelTitle>
      <circle cx="96" cy="140" r="58" fill={C.tissue} stroke={C.euc} />
      <circle cx="96" cy="140" r="44" fill="none" stroke={C.coralDeep} strokeWidth="6" strokeDasharray="8 4" />
      <circle cx="96" cy="140" r="36" fill={C.paper} />
      <circle cx="236" cy="140" r="58" fill={C.tissue} stroke={C.euc} />
      <circle cx="236" cy="140" r="34" fill="none" stroke={C.coralDeep} strokeWidth="20" strokeDasharray="10 3" />
      <circle cx="236" cy="140" r="22" fill="#EAF0D8" stroke="#B5C48F" />
      <circle cx="236" cy="140" r="9" fill={C.paper} />
      <Label x={96} y={226} anchor="middle" bold>Normal</Label>
      <Label x={96} y={244} anchor="middle" small>wide airway</Label>
      <Label x={236} y={226} anchor="middle" bold>Asthma attack</Label>
      <Label x={236} y={244} anchor="middle" small>muscle tightens,</Label>
      <Label x={236} y={262} anchor="middle" small>extra mucus</Label>

      {/* Emphysema */}
      <PanelTitle x={500} y={30} anchor="middle">COPD / emphysema</PanelTitle>
      <Cluster cx={430} cy={140} />
      <Cluster cx={570} cy={140} broken />
      <Label x={430} y={226} anchor="middle" bold>Healthy</Label>
      <Label x={430} y={244} anchor="middle" small>many small alveoli</Label>
      <Label x={570} y={226} anchor="middle" bold>Emphysema</Label>
      <Label x={570} y={244} anchor="middle" small>walls broken down,</Label>
      <Label x={570} y={262} anchor="middle" small>less surface area</Label>

      {/* NRDS */}
      <PanelTitle x={834} y={30} anchor="middle">Neonatal RDS</PanelTitle>
      <circle cx="764" cy="140" r="52" fill={C.paper} stroke={C.coralDeep} strokeWidth="4" />
      <circle cx="764" cy="140" r="45" fill="none" stroke="#E9C46A" strokeWidth="3" strokeDasharray="2 5" />
      <path d="M874 112 C890 100 916 104 930 118 C918 132 922 150 932 166 C910 178 886 176 870 164 C880 148 882 128 874 112 Z" fill={C.paper} stroke={C.coralDeep} strokeWidth="4" />
      <Label x={764} y={226} anchor="middle" bold>With surfactant</Label>
      <Label x={764} y={244} anchor="middle" small>stays open</Label>
      <Label x={902} y={226} anchor="middle" bold>Not enough</Label>
      <Label x={902} y={244} anchor="middle" small>alveolus collapses</Label>
      <Label x={500} y={310} anchor="middle" small>Healthy (left of each pair) vs affected (right of each pair)</Label>
    </svg>
  )
}
