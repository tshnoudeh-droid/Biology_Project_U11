import { Arrowheads, C, Callout, CiliaInset, Label, PanelTitle } from './parts'

export function TracheaDiagram() {
  const rings = Array.from({ length: 12 }, (_, i) => 70 + i * 24)
  // C ring geometry (cross-section)
  const cx = 500
  const cy = 210
  const r = 84
  const a1 = (120 * Math.PI) / 180
  const a2 = (60 * Math.PI) / 180
  const p1 = [cx + r * Math.cos(a1), cy + r * Math.sin(a1)]
  const p2 = [cx + r * Math.cos(a2), cy + r * Math.sin(a2)]
  const arc = `M${p1[0]} ${p1[1]} A${r} ${r} 0 1 1 ${p2[0]} ${p2[1]}`
  return (
    <svg viewBox="0 0 1210 470" role="img" aria-labelledby="tr-t tr-d" className="diagram-svg">
      <title id="tr-t">Labelled diagram of the trachea</title>
      <desc id="tr-d">
        Front view of the trachea with C-shaped rings of hyaline cartilage, from the larynx down to the carina where it splits into
        the primary bronchi. A cross-section shows the C-shaped ring open at the back, bridged by the trachealis muscle, with the
        esophagus behind. A close-up shows ciliated cells and goblet cells moving mucus up toward the pharynx.
      </desc>
      <Arrowheads id="tr" />
      <PanelTitle x={20} y={26}>Front view</PanelTitle>
      {/* larynx stub */}
      <path d="M130 40 L250 40 L240 64 L140 64 Z" fill={C.cartilage} stroke={C.euc} strokeWidth="2" />
      {/* tube */}
      <path d="M150 64 L150 360 C150 384 130 396 100 420 L126 440 C160 410 180 400 190 392 C200 400 220 410 254 440 L280 420 C250 396 230 384 230 360 L230 64 Z" fill={C.paper} stroke={C.euc} strokeWidth="2" />
      {rings.map((y) => (
        <rect key={y} x="146" y={y} width="88" height="15" rx="7.5" fill={C.cartilage} stroke={C.euc} strokeWidth="1.5" />
      ))}
      {/* carina */}
      <path d="M176 384 L190 368 L204 384" stroke={C.coralDeep} strokeWidth="3" fill="none" strokeLinecap="round" />
      <path d="M190 120 L190 330" stroke={C.coralDeep} strokeWidth="2.4" markerStart="url(#tr-coral)" markerEnd="url(#tr-coral)" opacity="0" />
      <Callout at={[200, 52]} to={[270, 44]} label="Larynx" />
      <Callout at={[234, 150]} to={[270, 146]} label="C-shaped ring" sub="hyaline cartilage" />
      <Label x={270} y={202} small>16–20 rings</Label>
      <Label x={270} y={220} small>keep it open</Label>
      <Label x={270} y={250} small>About 10–12 cm</Label>
      <Callout at={[190, 372]} to={[270, 340]} label="Carina" />
      <Label x={24} y={458} small>Right primary bronchus</Label>
      <Label x={270} y={458} small anchor="start">Left primary bronchus</Label>

      <PanelTitle x={500} y={26} anchor="middle">Cross-section</PanelTitle>
      <Label x={500} y={60} small anchor="middle">Front (anterior)</Label>
      <path d={arc} fill="none" stroke={C.euc} strokeWidth="26" strokeLinecap="round" />
      <path d={arc} fill="none" stroke={C.cartilage} strokeWidth="21" strokeLinecap="round" />
      <circle cx={cx} cy={cy} r="64" fill={C.paper} stroke={C.blush} strokeWidth="10" />
      <path d={`M${p1[0] + 4} ${p1[1]} C${cx - 20} ${p1[1] + 14} ${cx + 20} ${p1[1] + 14} ${p2[0] - 4} ${p2[1]}`} stroke={C.coralDeep} strokeWidth="9" fill="none" strokeLinecap="round" strokeDasharray="3 3" />
      <ellipse cx={cx} cy={cy + 150} rx="64" ry="26" fill={C.blush} stroke={C.coralDeep} strokeWidth="1.5" />
      <path d={`M${cx - 30} ${cy + 150} L${cx + 30} ${cy + 150}`} stroke={C.coralDeep} strokeWidth="2" />
      <Label x={cx} y={cy + 5} anchor="middle" small>Lumen (air)</Label>
      <Callout at={[cx + 74, cy - 40]} to={[620, 110]} label="Hyaline cartilage" />
      <Callout at={[cx + 50, cy + 30]} to={[620, 170]} label="Mucosa" sub="ciliated lining" />
      <Callout at={[cx + 22, p1[1] + 11]} to={[620, 280]} label="Trachealis" sub="smooth muscle at the gap" />
      <Callout at={[cx + 50, cy + 154]} to={[620, 362]} label="Esophagus" sub="behind the open side" />
      <Label x={500} y={420} small anchor="middle">Back (posterior)</Label>

      <CiliaInset id="tr" x={820} y={110} w={210} title="Mucociliary escalator" arrowLabel="Mucus moves up toward the pharynx" />
    </svg>
  )
}
