import { BloodKey, C, Callout, Label, PanelTitle } from './parts'

export function AlveoliDiagram() {
  const cluster: [number, number, number][] = [
    [250, 200, 46], [196, 160, 38], [300, 150, 40], [246, 116, 34], [186, 228, 32], [312, 226, 34], [356, 190, 30], [150, 190, 28], [292, 92, 26], [206, 98, 26],
  ]
  const zc = { x: 760, y: 250, r: 170 }
  return (
    <svg viewBox="0 0 1200 520" role="img" aria-labelledby="al-t al-d" className="diagram-svg">
      <title id="al-t">Labelled diagram of the alveoli</title>
      <desc id="al-d">
        Left: a respiratory bronchiole ends in a cluster of alveoli covered by a capillary network. Oxygen-poor blood (blue) arrives
        from a pulmonary arteriole and oxygen-rich blood (red) leaves in a pulmonary venule. Right: a close-up of one alveolus showing
        thin type I alveolar cells, a type II alveolar cell releasing surfactant, an alveolar macrophage, an alveolar pore to the next
        alveolus, and a capillary separated from the air by the 0.5 micrometre respiratory membrane.
      </desc>
      <PanelTitle x={20} y={26}>Alveolar sac and capillaries</PanelTitle>
      {/* bronchiole */}
      <path d="M240 470 C240 400 246 330 250 250" stroke={C.coralDeep} strokeWidth="22" strokeLinecap="round" fill="none" />
      <path d="M240 470 C240 400 246 330 250 250" stroke={C.blush} strokeWidth="16" strokeLinecap="round" fill="none" />
      {cluster.map(([x, y, r], i) => (
        <circle key={i} cx={x} cy={y} r={r} fill={C.blush} stroke={C.coralDeep} strokeWidth="1.4" />
      ))}
      {/* capillary net */}
      <g fill="none" strokeWidth="3.2" strokeLinecap="round">
        <path d="M110 330 C150 300 150 250 170 220 C190 180 160 140 200 120" stroke={C.blue} />
        <path d="M120 300 C180 290 220 260 236 200 C250 150 220 110 260 88" stroke={C.blue} />
        <path d="M200 120 C240 140 280 130 300 110 C320 160 340 170 380 180" stroke="#B48BA8" />
        <path d="M260 88 C290 120 300 170 330 200 C350 230 380 250 410 300" stroke={C.coral} />
        <path d="M170 220 C210 250 260 240 300 240 C340 240 370 240 400 290" stroke={C.coral} />
      </g>
      <path d="M60 350 C80 340 100 336 120 330" stroke={C.blue} strokeWidth="9" strokeLinecap="round" fill="none" />
      <path d="M400 290 C420 320 440 340 470 350" stroke={C.coral} strokeWidth="9" strokeLinecap="round" fill="none" />

      <Callout at={[64, 350]} to={[40, 400]} label="Blood in" sub="low in oxygen" anchor="start" />
      <Callout at={[466, 352]} to={[480, 456]} label="Blood out" sub="full of oxygen" />
      <Callout at={[242, 440]} to={[270, 500]} label="Bronchiole" />
      <Callout at={[356, 160]} to={[420, 36]} label="Alveolus" sub="one of ~480 million" />
      <Callout at={[160, 180]} to={[60, 70]} label="Capillary network" anchor="start" />
      <BloodKey x={40} y={470} />

      <g transform="translate(60 0)">
      {/* zoom lines */}
      <path d={`M296 190 L${zc.x - 150} ${zc.y - 80}`} stroke={C.muted} strokeDasharray="4 4" />
      <path d={`M296 190 L${zc.x - 150} ${zc.y + 80}`} stroke={C.muted} strokeDasharray="4 4" />

      <PanelTitle x={zc.x} y={26} anchor="middle">Close-up: one alveolus</PanelTitle>
      {/* neighbour alveolus with pore */}
      <circle cx={zc.x + 130} cy={zc.y - 150} r="55" fill={C.paper} stroke={C.coralDeep} strokeWidth="5" />
      {/* main alveolus wall (type I) */}
      <circle cx={zc.x} cy={zc.y} r={zc.r} fill={C.paper} stroke={C.coralDeep} strokeWidth="5" />
      {/* pore: break in wall between the two */}
      <path d={`M${zc.x + 101} ${zc.y - 137} L${zc.x + 121} ${zc.y - 120}`} stroke={C.paper} strokeWidth="12" />
      {/* flattened type I nuclei */}
      {[200, 240, 330].map((a) => {
        const rad = (a * Math.PI) / 180
        return <ellipse key={a} cx={zc.x + Math.cos(rad) * zc.r} cy={zc.y + Math.sin(rad) * zc.r} rx="16" ry="5" fill={C.coralDeep} transform={`rotate(${a + 90} ${zc.x + Math.cos(rad) * zc.r} ${zc.y + Math.sin(rad) * zc.r})`} />
      })}
      {/* type II cell */}
      <g transform={`translate(${zc.x - 150} ${zc.y + 70})`}>
        <path d="M-10 -26 C14 -34 36 -10 34 16 C30 36 4 40 -12 26 Z" fill="#F0B9A8" stroke={C.coralDeep} strokeWidth="1.5" />
        <circle cx="12" cy="2" r="8" fill={C.coralDeep} />
        {[[22, -14], [26, 20], [2, -18]].map(([x, y], i) => (
          <circle key={i} cx={x} cy={y} r="3.2" fill={C.paper} stroke={C.coralDeep} />
        ))}
      </g>
      {/* surfactant film */}
      <circle cx={zc.x} cy={zc.y} r={zc.r - 9} fill="none" stroke="#E9C46A" strokeWidth="3" strokeDasharray="2 5" opacity="0.9" />
      {/* macrophage */}
      <path d={`M${zc.x + 10} ${zc.y + 20} c20 -24 50 -10 50 10 c14 8 8 32 -12 34 c-10 20 -40 18 -46 -2 c-18 -6 -14 -34 8 -42 z`} fill={C.sage} stroke={C.euc} strokeWidth="1.5" />
      <circle cx={zc.x + 36} cy={zc.y + 40} r="9" fill={C.euc} />
      {/* capillary under the wall */}
      <path d={`M${zc.x - 190} ${zc.y + 200} C${zc.x - 60} ${zc.y + 196} ${zc.x + 60} ${zc.y + 196} ${zc.x + 210} ${zc.y + 170}`} stroke={C.coral} strokeWidth="34" fill="none" strokeLinecap="round" opacity="0.45" />
      <ellipse cx={zc.x - 20} cy={zc.y + 196} rx="22" ry="10" fill={C.coral} />
      <ellipse cx={zc.x + 70} cy={zc.y + 190} rx="22" ry="10" fill={C.coral} />
      {/* respiratory membrane bracket */}
      <path d={`M${zc.x + 4} ${zc.y + 160} L${zc.x + 4} ${zc.y + 180}`} stroke={C.deep} strokeWidth="1.6" />

      <Label x={zc.x - 40} y={zc.y - 40} small anchor="middle">Air space</Label>
      <Callout at={[zc.x - 120, zc.y - 120]} to={[560, 76]} label="Thin wall" sub="just one cell thick" anchor="end" />
      <Callout at={[zc.x - 130, zc.y + 70]} to={[560, 330]} label="Surfactant-making cell" sub="(type II cell)" anchor="end" />
      <Callout at={[zc.x - 100, zc.y + 110]} to={[560, 400]} label="Surfactant" sub="stops the sac collapsing" anchor="end" />
      <Callout at={[zc.x + 50, zc.y + 10]} to={[935, 270]} label="Cleaner cell" sub="eats dust and germs" />
      
      <Callout at={[zc.x + 4, zc.y + 170]} to={[935, 380]} label="Gases cross here" sub="super-thin wall" />
      <Callout at={[zc.x + 150, zc.y + 180]} to={[935, 460]} label="Capillary" sub="red blood cells pick up O₂" />
      </g>
    </svg>
  )
}
