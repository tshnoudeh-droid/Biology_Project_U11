import { C, Label, PanelTitle } from './parts'

export function PleuraDiagram() {
  const layers = [
    { y: 60, h: 70, fill: C.cartilage, name: 'Ribs and intercostal muscles', note: 'the chest wall', ly: 70 },
    { y: 130, h: 10, fill: C.euc, name: 'Parietal pleura', note: 'lines the chest wall', ly: 120 },
    { y: 140, h: 26, fill: '#D6E7F2', name: 'Pleural cavity with pleural fluid', note: 'intrapleural pressure ≈ −4 mm Hg', ly: 170 },
    { y: 166, h: 10, fill: C.coralDeep, name: 'Visceral pleura', note: 'covers the lung', ly: 220 },
    { y: 176, h: 110, fill: C.blush, name: 'Lung tissue (alveoli)', note: 'follows the chest wall', ly: 270 },
  ]
  return (
    <svg viewBox="0 0 1000 340" role="img" aria-labelledby="pl-t pl-d" className="diagram-svg">
      <title id="pl-t">Labelled diagram of the pleura</title>
      <desc id="pl-d">
        Layers from the outside in: ribs and intercostal muscles, parietal pleura, the pleural cavity with pleural fluid at about
        minus 4 millimetres of mercury, visceral pleura and the lung tissue. The thin fluid film holds the lung against the chest wall.
      </desc>
      <PanelTitle x={20} y={30}>Layers of the chest wall and lung</PanelTitle>
      {layers.map((l) => (
        <rect key={l.name} x="20" y={l.y} width="540" height={l.h} fill={l.fill} />
      ))}
      {/* ribs */}
      {[60, 200, 340, 480].map((x) => (
        <ellipse key={x} cx={x + 30} cy="95" rx="50" ry="22" fill={C.paper} stroke={C.euc} strokeWidth="1.5" />
      ))}
      {/* alveoli texture */}
      {Array.from({ length: 22 }).map((_, i) => (
        <circle key={i} cx={40 + (i % 11) * 48 + (i > 10 ? 24 : 0)} cy={i > 10 ? 254 : 210} r="18" fill="none" stroke={C.coralDeep} strokeWidth="1.2" />
      ))}
      {layers.map((l) => {
        const cy = l.y + l.h / 2
        return (
          <g key={l.name}>
            <path d={`M520 ${cy} L572 ${cy} L600 ${l.ly - 5}`} className="svg-leader" />
            <circle cx="520" cy={cy} r="3.2" fill={C.deep} />
            <text x="610" y={l.ly} className="svg-label svg-label--bold">{l.name}</text>
            <text x="610" y={l.ly + 18} className="svg-label svg-label--sm">{l.note}</text>
          </g>
        )
      })}
      <Label x={20} y={322} small>The fluid film makes the two pleural layers stick together, like two wet panes of glass, so the lungs expand when the chest does.</Label>
    </svg>
  )
}
