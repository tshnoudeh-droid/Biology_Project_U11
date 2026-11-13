import { Arrowheads, C, Callout, Label, PanelTitle } from './parts'

export function BrainstemDiagram() {
  return (
    <svg viewBox="0 0 1000 560" role="img" aria-labelledby="bs-t bs-d" className="diagram-svg">
      <title id="bs-t">Labelled diagram of the breathing control centres</title>
      <desc id="bs-d">
        Side view of the head and neck. In the brainstem, the pons holds the apneustic and pneumotaxic centres, and the medulla
        oblongata holds the dorsal and ventral respiratory groups, with central chemoreceptors nearby. Peripheral chemoreceptors sit in
        the carotid bodies in the neck and the aortic bodies on the aortic arch, sending signals back to the medulla. Nerves carry the
        rhythm down the spinal cord to the diaphragm and external intercostals.
      </desc>
      <Arrowheads id="bs" />
      <PanelTitle x={20} y={26}>Side view</PanelTitle>

      {/* head silhouette */}
      <path d="M300 40 C420 30 520 80 540 190 C552 250 530 300 500 330 L500 420 L330 420 L320 360 C280 360 250 340 246 310 C220 300 226 280 236 266 C214 254 224 236 238 228 C212 210 200 160 220 120 C240 70 270 46 300 40 Z" fill={C.tissue} stroke={C.euc} strokeWidth="2" />
      {/* cerebrum */}
      <path d="M270 120 C290 70 380 50 450 80 C510 110 524 170 500 210 C470 236 420 230 380 226 C330 222 280 200 270 170 Z" fill={C.blush} fillOpacity="0.55" stroke={C.coralDeep} strokeWidth="1.5" />
      <Label x={380} y={150} anchor="middle" small>Cerebrum</Label>
      {/* cerebellum */}
      <path d="M440 236 C470 222 510 230 512 258 C512 282 480 292 452 282 C436 272 430 250 440 236 Z" fill={C.sage} fillOpacity="0.7" stroke={C.euc} strokeWidth="1.5" />
      <Label x={490} y={264} anchor="middle" small>Cerebellum</Label>
      {/* brainstem */}
      <path d="M392 224 C400 230 416 236 424 234 L430 268 C440 290 438 320 428 340 L420 420 L404 420 L400 340 C388 320 384 290 392 268 Z" fill={C.coral} fillOpacity="0.75" stroke={C.coralDeep} strokeWidth="1.5" />
      <path d="M388 262 C400 254 424 254 436 262" stroke={C.coralDeep} strokeWidth="1" fill="none" />
      <path d="M392 300 C402 296 422 296 432 300" stroke={C.coralDeep} strokeWidth="1" fill="none" />
      {/* spinal cord down */}
      <path d="M412 420 L412 540" stroke={C.coralDeep} strokeWidth="12" strokeLinecap="round" />
      {/* centres */}
      <circle cx="408" cy="276" r="6" fill={C.deep} />
      <circle cx="420" cy="286" r="6" fill={C.paper} stroke={C.deep} strokeWidth="2" />
      <circle cx="404" cy="318" r="6" fill={C.deep} />
      <circle cx="418" cy="326" r="6" fill={C.paper} stroke={C.deep} strokeWidth="2" />
      <circle cx="396" cy="336" r="5" fill={C.euc} />

      {/* carotid + aorta */}
      <path d="M352 540 C350 480 352 430 360 380 C362 360 352 344 344 330" stroke={C.coral} strokeWidth="10" fill="none" strokeLinecap="round" />
      <circle cx="358" cy="392" r="9" fill={C.euc} />
      <path d="M260 540 C270 500 320 490 352 520" stroke={C.coral} strokeWidth="16" fill="none" strokeLinecap="round" />
      <circle cx="300" cy="508" r="8" fill={C.euc} />
      <circle cx="326" cy="504" r="8" fill={C.euc} />
      {/* afferent signals */}
      <path d="M366 388 C380 370 390 356 396 342" stroke={C.euc} strokeWidth="2" strokeDasharray="5 4" fill="none" markerEnd="url(#bs-euc)" />
      <path d="M318 494 C334 450 370 400 392 346" stroke={C.euc} strokeWidth="2" strokeDasharray="5 4" fill="none" markerEnd="url(#bs-euc)" />
      {/* efferent */}
      <path d="M430 450 L540 500" stroke={C.coralDeep} strokeWidth="2.4" markerEnd="url(#bs-coral)" />
      <Label x={550} y={500} bold>To the diaphragm and</Label>
      <Label x={550} y={518} bold>external intercostals</Label>
      <Label x={550} y={536} small>(phrenic and intercostal nerves)</Label>

      {/* labels right */}
      <Label x={600} y={60} bold>Pons</Label>
      <Callout at={[408, 276]} to={[620, 100]} label="Pneumotaxic centre" sub="limits inspiration, sets rate" />
      <Callout at={[420, 286]} to={[620, 160]} label="Apneustic centre" sub="controls depth" />
      <Label x={600} y={226} bold>Medulla oblongata</Label>
      <Callout at={[404, 318]} to={[620, 266]} label="Ventral respiratory group" sub="sets the rhythm" />
      <Callout at={[418, 326]} to={[620, 326]} label="Dorsal respiratory group" sub="integrates sensor input" />
      <Callout at={[396, 336]} to={[620, 386]} label="Central chemoreceptors" sub="sense H⁺ made from CO₂" />

      {/* labels left */}
      <Callout at={[358, 392]} to={[200, 400]} label="Carotid body" sub="peripheral chemoreceptor" anchor="end" />
      <Callout at={[300, 508]} to={[200, 480]} label="Aortic bodies" sub="on the aortic arch" anchor="end" />
      <Label x={200} y={530} small anchor="end">Sense H⁺, CO₂ and big O₂ drops</Label>
    </svg>
  )
}
