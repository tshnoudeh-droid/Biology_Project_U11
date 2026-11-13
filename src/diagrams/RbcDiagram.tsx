import { Arrowheads, C, Label, PanelTitle } from './parts'

export function RbcDiagram() {
  return (
    <svg viewBox="0 0 1060 420" role="img" aria-labelledby="rbc-t rbc-d" className="diagram-svg">
      <title id="rbc-t">Labelled diagram of carbon dioxide transport in a red blood cell</title>
      <desc id="rbc-d">
        In body tissues, carbon dioxide from respiring cells enters the plasma and a red blood cell. About 7 to 10 percent stays
        dissolved in plasma. About 20 percent binds to hemoglobin as carbaminohemoglobin. About 70 percent reacts with water, sped up
        by carbonic anhydrase, to form carbonic acid, which splits into a hydrogen ion and a bicarbonate ion. The hydrogen ion binds
        to hemoglobin, which releases oxygen (the Bohr effect). Bicarbonate leaves the cell in exchange for a chloride ion (the
        chloride shift). In the lungs every step runs in reverse.
      </desc>
      <Arrowheads id="rbc" />
      <PanelTitle x={20} y={26}>In the body’s tissues (reverses in the lungs)</PanelTitle>

      {/* tissue cell */}
      <rect x="20" y="70" width="170" height="300" rx="26" fill={C.tissue} stroke={C.euc} strokeWidth="2" />
      <Label x={105} y={106} anchor="middle" bold>Body cell</Label>
      <Label x={105} y={126} anchor="middle" small>cellular respiration</Label>
      <Label x={105} y={146} anchor="middle" small>makes CO₂</Label>
      <text x="105" y="230" textAnchor="middle" className="svg-chem">CO₂</text>

      {/* plasma */}
      <rect x="210" y="50" width="830" height="340" rx="30" fill={C.blush} fillOpacity="0.35" stroke={C.coralDeep} strokeDasharray="6 5" />
      <Label x={230} y={78} bold>Plasma (capillary)</Label>
      <path d="M175 226 L250 226" stroke={C.coralDeep} strokeWidth="2.4" markerEnd="url(#rbc-coral)" />
      <text x="290" y="232" textAnchor="middle" className="svg-chem">CO₂</text>
      <Label x={290} y={274} anchor="middle" small>7–10% stays</Label>
      <Label x={290} y={292} anchor="middle" small>dissolved</Label>

      {/* RBC */}
      <ellipse cx="660" cy="222" rx="320" ry="140" fill="#F2B5A6" stroke={C.coralDeep} strokeWidth="2.5" />
      <ellipse cx="660" cy="222" rx="290" ry="112" fill="#F6C9BD" />
      <Label x={660} y={106} anchor="middle" bold>Red blood cell</Label>
      <path d="M318 226 L392 226" stroke={C.coralDeep} strokeWidth="2.4" markerEnd="url(#rbc-coral)" />

      {/* main reaction row */}
      <text x="430" y="232" className="svg-chem">CO₂ + H₂O</text>
      <path d="M560 226 L620 226" stroke={C.deep} strokeWidth="2.2" markerEnd="url(#rbc-euc)" />
      <Label x={590} y={254} anchor="middle" small>carbonic anhydrase</Label>
      <text x="632" y="232" className="svg-chem">H₂CO₃</text>
      <path d="M716 226 L760 226" stroke={C.deep} strokeWidth="2.2" markerEnd="url(#rbc-euc)" />
      <text x="770" y="232" className="svg-chem">H⁺ + HCO₃⁻</text>
      <Label x={680} y={196} anchor="middle" small>~70% of CO₂ travels as bicarbonate</Label>

      {/* carbamino */}
      <path d="M470 200 C470 150 500 136 520 136" stroke={C.deep} strokeWidth="1.8" fill="none" markerEnd="url(#rbc-euc)" />
      <text x="528" y="142" className="svg-chem svg-chem--sm">CO₂ + Hb → HbCO₂</text>
      <Label x={528} y={162} small>carbaminohemoglobin, ~20%</Label>

      {/* H+ + Hb, Bohr */}
      <path d="M800 244 L800 288" stroke={C.deep} strokeWidth="1.8" fill="none" markerEnd="url(#rbc-euc)" />
      <text x="600" y="316" className="svg-chem svg-chem--sm">H⁺ + HbO₂ → HHb + O₂</text>
      <Label x={600} y={336} small>Bohr effect: lower pH, more O₂ released</Label>

      {/* chloride shift */}
      <path d="M900 226 L1000 200" stroke={C.coralDeep} strokeWidth="2.4" markerEnd="url(#rbc-coral)" />
      <text x="1002" y="196" className="svg-chem svg-chem--sm">HCO₃⁻</text>
      <path d="M1010 268 L920 250" stroke={C.euc} strokeWidth="2.4" markerEnd="url(#rbc-euc)" />
      <text x="1014" y="280" className="svg-chem svg-chem--sm">Cl⁻</text>
      <Label x={960} y={340} anchor="middle" bold>Chloride shift</Label>
      <Label x={960} y={358} anchor="middle" small>keeps the charge balanced</Label>
    </svg>
  )
}
