import { C, Callout, Label, PanelTitle } from './parts'

function Tube({ d, w }: { d: string; w: number }) {
  return (
    <g fill="none" strokeLinecap="round" strokeLinejoin="round">
      <path d={d} stroke={C.euc} strokeWidth={w} />
      <path d={d} stroke={C.cartilage} strokeWidth={w - 5} />
    </g>
  )
}

export function BronchiDiagram() {
  return (
    <svg viewBox="0 0 1000 580" role="img" aria-labelledby="br-t br-d" className="diagram-svg">
      <title id="br-t">Labelled diagram of the bronchi and lungs</title>
      <desc id="br-d">
        Front view of both lungs. The trachea splits at the carina into the right and left primary bronchi, which enter each lung
        at the hilum. The right lung has three lobes (superior, middle and inferior) and three secondary bronchi; the left lung has
        two lobes (superior and inferior), two secondary bronchi and a cardiac notch for the heart.
      </desc>
      <PanelTitle x={500} y={24} anchor="middle">Front view (your right lung is on the left of the picture)</PanelTitle>

      {/* lungs */}
      <path d="M380 110 C330 120 250 220 225 330 C210 420 215 500 240 525 C320 510 410 515 470 500 C465 420 455 300 440 200 C430 150 410 110 380 110 Z" fill={C.blush} fillOpacity="0.6" stroke={C.euc} strokeWidth="2" />
      <path d="M620 110 C670 120 750 220 775 330 C790 420 785 500 760 525 C700 512 630 515 560 505 C580 470 604 440 594 410 C578 384 556 360 556 300 C558 230 570 170 620 110 Z" fill={C.blush} fillOpacity="0.6" stroke={C.euc} strokeWidth="2" />
      {/* fissures */}
      <g stroke={C.coralDeep} strokeWidth="1.6" fill="none" strokeDasharray="6 4">
        <path d="M228 330 C300 380 390 450 445 503" />
        <path d="M452 304 C390 304 320 312 256 344" />
        <path d="M772 300 C700 352 630 420 572 502" />
      </g>

      {/* trachea */}
      <path d="M480 40 L480 172 L520 172 L520 40" fill={C.paper} stroke={C.euc} strokeWidth="2" />
      {[50, 72, 94, 116, 138].map((y) => (
        <rect key={y} x="478" y={y} width="44" height="12" rx="6" fill={C.cartilage} stroke={C.euc} strokeWidth="1.2" />
      ))}
      {/* primary bronchi */}
      <Tube d="M494 170 L470 196 L400 252" w={26} />
      <Tube d="M506 170 L540 196 L626 230" w={20} />
      {/* secondary (lobar) bronchi */}
      <Tube d="M404 248 L350 196" w={13} />
      <Tube d="M404 252 L420 340" w={12} />
      <Tube d="M402 254 L330 400" w={13} />
      <Tube d="M622 230 L676 178" w={12} />
      <Tube d="M622 232 L676 396" w={13} />
      {/* tertiary */}
      <g stroke={C.euc} strokeWidth="3.5" strokeLinecap="round" fill="none">
        <path d="M350 196 L320 168 M350 196 L330 216 M352 198 L372 160" />
        <path d="M420 340 L404 380 M420 340 L440 384" />
        <path d="M330 400 L292 430 M330 400 L320 456 M330 400 L366 446" />
        <path d="M676 178 L712 160 M676 178 L700 216 M676 178 L660 146" />
        <path d="M676 396 L718 430 M676 396 L676 456 M676 396 L640 450" />
      </g>
      {/* carina mark */}
      <path d="M490 186 L500 174 L510 186" stroke={C.coralDeep} strokeWidth="3" fill="none" strokeLinecap="round" />
      {/* heart hint in the cardiac notch */}
      <path d="M560 420 C520 400 500 440 520 470 C540 500 580 506 600 500 C610 470 600 430 560 420 Z" fill={C.coral} opacity="0.25" />

      {/* labels — left (patient's right) */}
      <Label x={200} y={70} bold anchor="end">Right lung</Label>
      <Label x={200} y={90} small anchor="end">3 lobes</Label>
      <Callout at={[320, 220]} to={[215, 180]} label="Upper lobe" anchor="end" />
      <Callout at={[392, 392]} to={[200, 300]} label="Middle lobe" anchor="end" />
      <Callout at={[260, 470]} to={[200, 470]} label="Lower lobe" anchor="end" />
      <Callout at={[440, 222]} to={[215, 236]} label="Right bronchus" sub="wider and straighter" anchor="end" />
      

      {/* labels — right (patient's left) */}
      <Label x={820} y={70} bold>Left lung</Label>
      <Label x={820} y={90} small>2 lobes</Label>
      <Callout at={[520, 60]} to={[620, 56]} label="Trachea" />
      <Callout at={[500, 178]} to={[820, 132]} label="Split point" sub="triggers coughing" />
      <Callout at={[590, 216]} to={[820, 190]} label="Left bronchus" />
      
      <Callout at={[690, 260]} to={[820, 300]} label="Smaller branches" sub="one per lobe" />
      
      <Callout at={[730, 300]} to={[820, 420]} label="Upper lobe" />
      <Callout at={[740, 470]} to={[820, 480]} label="Lower lobe" />
      <Callout at={[580, 450]} to={[620, 560]} label="Space for the heart" />
    </svg>
  )
}
