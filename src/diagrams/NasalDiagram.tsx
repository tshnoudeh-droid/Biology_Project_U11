import { Arrowheads, C, Callout, Label, PanelTitle } from './parts'

export function NasalDiagram() {
  return (
    <svg viewBox="0 0 1240 450" role="img" aria-labelledby="nasal-t nasal-d" className="diagram-svg">
      <title id="nasal-t">Labelled diagram of the nasal cavity</title>
      <desc id="nasal-d">
        Side view of the nasal cavity showing the naris, three nasal conchae, olfactory epithelium, frontal and sphenoidal sinuses
        and the hard and soft palate, with air swirling past the conchae toward the pharynx. A front view shows the nasal septum and
        the four pairs of paranasal sinuses.
      </desc>
      <Arrowheads id="nas" />

      <PanelTitle x={20} y={26}>Side view</PanelTitle>

      {/* head tissue + profile */}
      <path
        d="M175 40 C168 70 165 92 152 118 C134 156 108 184 86 214 C80 224 88 234 106 234 L120 236 C124 250 118 262 122 276 C128 300 136 330 134 420 L560 420 L560 40 Z"
        fill={C.tissue}
        stroke={C.euc}
        strokeWidth="2"
      />
      {/* nasal cavity air space */}
      <path
        d="M114 226 C126 210 146 186 176 160 C212 128 252 112 320 110 C380 108 420 116 450 136 L470 246 L148 248 C132 246 120 238 114 226 Z"
        fill={C.paper}
        stroke={C.euc}
        strokeWidth="2"
      />
      {/* pharynx opening behind */}
      <path d="M450 136 C480 150 500 170 506 200 L512 420" fill="none" stroke={C.euc} strokeWidth="2" />
      <path d="M470 246 C480 270 488 290 470 330 L470 420" fill="none" stroke={C.euc} strokeWidth="2" />
      <rect x="471" y="250" width="40" height="170" fill={C.paper} />
      {/* hard palate + soft palate */}
      <path d="M148 250 L420 250" stroke={C.euc} strokeWidth="9" strokeLinecap="round" />
      <path d="M420 250 C440 256 456 270 462 292" stroke={C.coralDeep} strokeWidth="9" strokeLinecap="round" fill="none" />

      {/* olfactory epithelium */}
      <path d="M262 116 C300 110 340 109 380 112" stroke={C.coral} strokeWidth="6" strokeLinecap="round" strokeDasharray="2 7" fill="none" />

      {/* conchae */}
      <path d="M392 124 C350 120 320 126 312 138 C330 146 364 144 398 142 Z" fill={C.blush} stroke={C.coralDeep} strokeWidth="1.5" />
      <path d="M424 156 C360 148 280 154 248 174 C254 188 320 186 428 182 Z" fill={C.blush} stroke={C.coralDeep} strokeWidth="1.5" />
      <path d="M450 200 C360 190 250 198 200 220 C208 236 300 236 456 228 Z" fill={C.blush} stroke={C.coralDeep} strokeWidth="1.5" />

      {/* sinuses */}
      <ellipse cx="214" cy="80" rx="30" ry="20" fill={C.paper} stroke={C.euc} strokeWidth="1.5" strokeDasharray="4 3" />
      <ellipse cx="448" cy="86" rx="34" ry="24" fill={C.paper} stroke={C.euc} strokeWidth="1.5" strokeDasharray="4 3" />

      {/* airflow */}
      <path d="M40 252 C70 246 92 236 118 226 C160 208 200 192 240 192 C300 192 360 192 420 192 C470 194 488 220 492 270 L492 360" fill="none" stroke={C.coralDeep} strokeWidth="2.6" markerEnd="url(#nas-coral)" />
      <path d="M128 232 C190 240 300 242 440 240" fill="none" stroke={C.coralDeep} strokeWidth="1.8" strokeDasharray="6 5" />
      <path d="M200 160 C260 146 320 146 400 150" fill="none" stroke={C.coralDeep} strokeWidth="1.8" strokeDasharray="6 5" />

      {/* labels — left column */}
      <Callout at={[214, 80]} to={[150, 30]} label="Sinus" anchor="end" />
      <Callout at={[110, 228]} to={[24, 300]} label="Nostril" sub="air enters here" />
      <Label x={24} y={238} small>Air in</Label>

      {/* labels — bottom */}
      <Callout at={[300, 252]} to={[230, 330]} label="Roof of the mouth" sub="(hard palate)" />
      <Callout at={[446, 274]} to={[330, 380]} label="Soft palate" />
      <Callout at={[240, 246]} to={[150, 400]} label="Lining with mucus + cilia" sub="traps dust, warms and moistens air" />

      {/* labels — right column */}
      <Callout at={[340, 111]} to={[580, 112]} label="Smell receptors" sub="detect odours" />
      <Callout at={[460, 74]} to={[580, 62]} label="Sinus" />
      <Callout at={[392, 134]} to={[580, 160]} label="Nasal conchae" sub="3 curvy shelves: swirl + warm air" />
      <Callout at={[492, 330]} to={[580, 330]} label="To the pharynx" sub="(Stop 2)" />

      <g transform="translate(150 0)">
      {/* ---- front view ---- */}
      <PanelTitle x={790} y={26} anchor="middle">Front view</PanelTitle>
      <path d="M790 50 C870 50 920 110 918 200 C916 300 870 410 790 418 C710 410 664 300 662 200 C660 110 710 50 790 50 Z" fill={C.tissue} stroke={C.euc} strokeWidth="2" />
      {/* eyes */}
      <ellipse cx="736" cy="170" rx="30" ry="18" fill={C.paper} stroke={C.euc} strokeWidth="1.5" />
      <ellipse cx="844" cy="170" rx="30" ry="18" fill={C.paper} stroke={C.euc} strokeWidth="1.5" />
      {/* nasal cavity with septum */}
      <path d="M790 176 C770 200 756 260 752 316 L828 316 C824 260 810 200 790 176 Z" fill={C.paper} stroke={C.euc} strokeWidth="1.5" />
      <path d="M790 182 L790 316" stroke={C.euc} strokeWidth="4" />
      {/* conchae curls on side walls */}
      {[226, 256, 288].map((cy, i) => (
        <g key={cy}>
          <path d={`M${760 - i * 2} ${cy} q14 4 18 14`} stroke={C.coralDeep} strokeWidth="3" fill="none" strokeLinecap="round" />
          <path d={`M${820 + i * 2} ${cy} q-14 4 -18 14`} stroke={C.coralDeep} strokeWidth="3" fill="none" strokeLinecap="round" />
        </g>
      ))}
      {/* sinuses */}
      <path d="M740 118 C760 96 820 96 840 118 C826 132 754 132 740 118 Z" fill={C.coral} opacity="0.55" />
      <rect x="777" y="150" width="26" height="40" rx="8" fill={C.sage} />
      <ellipse cx="790" cy="160" rx="10" ry="8" fill="none" stroke={C.deep} strokeWidth="1.5" strokeDasharray="3 3" />
      <path d="M708 214 C722 200 748 206 750 232 C748 264 730 290 712 280 C700 268 700 232 708 214 Z" fill={C.blush} stroke={C.coralDeep} strokeWidth="1.2" />
      <path d="M872 214 C858 200 832 206 830 232 C832 264 850 290 868 280 C880 268 880 232 872 214 Z" fill={C.blush} stroke={C.coralDeep} strokeWidth="1.2" />

      
      
      
      <Callout at={[870, 240]} to={[940, 200]} label="Sinuses" sub="air spaces that" />
      <Callout at={[790, 300]} to={[700, 410]} label="Septum" sub="wall between nostrils" anchor="end" />
      <Label x={940} y={236} small>make the skull lighter</Label>
      </g>
    </svg>
  )
}
