import type { ComponentType } from 'react'
import { ArrivalArt, ElevatorArt, GateArt, HallwayArt, LobbyArt, WingsArt } from './scenesA'
import { CheckoutArt, ConciergeArt, CorridorsArt, ShuttleArt, SpaArt } from './scenesB'

export type Beat = { at: number; text: string }
export type Scene = {
  id: string
  chapter: string
  term: string
  resort: string
  duration: number
  beats: Beat[]
  Art: ComponentType<{ t: number }>
  /** stop page for "learn more" */
  more?: { slug: string; label: string }
}

export const scenes: Scene[] = [
  {
    id: 'arrival',
    chapter: 'Arrival',
    term: 'Diaphragm',
    resort: 'Arrival at the Air Pump',
    duration: 15,
    Art: ArrivalArt,
    more: { slug: 'diaphragm', label: 'Stop 8 · Diaphragm Drop Tower' },
    beats: [
      { at: 0, text: 'Welcome to **Alvea Wellness**, a resort built into the respiratory system. Our guests are **oxygen (O₂)** molecules checking in and **carbon dioxide (CO₂)** molecules checking out.' },
      { at: 6, text: 'Every arrival starts at the air pump: the **diaphragm**. It **contracts and flattens**, the chest volume increases, and by **Boyle’s law** the pressure inside drops below atmospheric. Air rushes in.' },
    ],
  },
  {
    id: 'lobby',
    chapter: 'Lobby',
    term: 'Nasal cavity',
    resort: 'The Lobby',
    duration: 22,
    Art: LobbyArt,
    more: { slug: 'nasal-cavity', label: 'Stop 1 · Nasal cavity' },
    beats: [
      { at: 0, text: 'Guests enter through the front doors, the **nares** (nostrils), into the lobby: the **nasal cavity**. The **nasal septum** splits it into left and right halls. The **mouth** is a side door that skips this welcome.' },
      { at: 5.5, text: 'Three curved, heated walls, the **nasal conchae**, increase the surface area and make guests swirl, so every one is **warmed, humidified and cleaned**.' },
      { at: 10.5, text: 'Housekeeping never stops: sticky **mucus** traps dust and microbes, and **cilia** on the **pseudostratified ciliated columnar epithelium** sweep it toward the throat to be swallowed.' },
      { at: 15.5, text: 'In the ceiling, the **olfactory epithelium** runs the Aromatherapy Suite with odour receptors. Above it, the **paranasal sinuses** are air-filled spaces that lighten the skull.' },
    ],
  },
  {
    id: 'elevator',
    chapter: 'Elevator',
    term: 'Pharynx',
    resort: 'The Elevator',
    duration: 21,
    Art: ElevatorArt,
    more: { slug: 'pharynx', label: 'Stop 2 · Pharynx' },
    beats: [
      { at: 0, text: 'Next, guests ride the elevator down the **pharynx** (throat), a muscular tube about 13 cm long with three floors.' },
      { at: 5, text: 'Top floor: the **nasopharynx**, for air only. It’s guarded by the **pharyngeal tonsil (adenoid)**.' },
      { at: 10, text: 'Middle floor: the **oropharynx**, shared with food coming from the mouth. The **palatine** and **lingual tonsils** guard against pathogens.' },
      { at: 15, text: 'Bottom floor: the **laryngopharynx**, the Great Split. Air continues forward into the **larynx**; food goes back into the **esophagus**.' },
    ],
  },
  {
    id: 'gate',
    chapter: 'Security',
    term: 'Larynx',
    resort: 'The Security Gate',
    duration: 19,
    Art: GateArt,
    more: { slug: 'larynx', label: 'Stop 3 · Larynx' },
    beats: [
      { at: 0, text: 'Security: the **larynx** (voice box), a frame of **nine cartilages** that holds the airway open. The big front shield is the **thyroid cartilage**, the Adam’s apple.' },
      { at: 6, text: 'Watch the drawbridge: the **epiglottis**. When you swallow, it swings down over the opening so food and drink can’t get into the trachea.' },
      { at: 12.5, text: 'Guests then pass the stage: the **true vocal cords** and the opening between them, the **glottis**. On the way out, exhaled air makes the cords vibrate. That’s your voice.' },
    ],
  },
  {
    id: 'hallway',
    chapter: 'Hallway',
    term: 'Trachea',
    resort: 'The Main Hallway',
    duration: 22,
    Art: HallwayArt,
    more: { slug: 'trachea', label: 'Stop 4 · Trachea' },
    beats: [
      { at: 0, text: 'Down the main hallway: the **trachea** (windpipe), about 10 to 12 cm long.' },
      { at: 4, text: 'The arches are **16–20 C-shaped rings of hyaline cartilage** that stop the hallway from collapsing. The open side faces the **esophagus** behind it, so food can pass when you swallow.' },
      { at: 11, text: 'The floor is a moving walkway going the other way: **goblet cells** make mucus and **ciliated cells** beat it up toward the pharynx. This is the **mucociliary escalator**.' },
      { at: 17, text: 'No check-in desk here. The trachea is part of the **conducting zone**: it moves air, but **no gas exchange** happens.' },
    ],
  },
  {
    id: 'wings',
    chapter: 'Wings',
    term: 'Bronchi',
    resort: 'The Guest Wings',
    duration: 20,
    Art: WingsArt,
    more: { slug: 'bronchi', label: 'Stop 5 · Bronchi' },
    beats: [
      { at: 0, text: 'At the **carina**, the hallway forks. This checkpoint is very sensitive: when a dust speck touches it, it sets off a violent **cough reflex**.' },
      { at: 6.5, text: 'Guests split into the **right and left primary bronchi**, entering each lung at the **hilum**. The right one is wider, shorter and more vertical.' },
      { at: 13, text: 'The right wing has **3 floors (lobes)**; the left has **2**, leaving room for the heart. Each lobe gets its own **secondary bronchus**, branching into the **bronchial tree**.' },
    ],
  },
  {
    id: 'corridors',
    chapter: 'Corridors',
    term: 'Bronchioles',
    resort: 'The Room Corridors',
    duration: 20,
    Art: CorridorsArt,
    more: { slug: 'bronchioles', label: 'Stop 6 · Bronchioles' },
    beats: [
      { at: 0, text: 'The corridors get narrower: the **bronchioles**, about **1 mm or less** across, with **no cartilage**.' },
      { at: 6, text: 'Their walls are **smooth muscle**, so the corridors can tighten (**bronchoconstriction**, as in an asthma attack) or widen again (**bronchodilation**).' },
      { at: 13, text: 'More than **1,000 terminal bronchioles** per lung lead to **respiratory bronchioles → alveolar ducts → alveolar sacs**: about **2,400 km** of corridors in total.' },
    ],
  },
  {
    id: 'spa',
    chapter: 'Spa',
    term: 'Alveoli',
    resort: 'The Spa Rooms',
    duration: 23,
    Art: SpaArt,
    more: { slug: 'alveoli', label: 'Stop 7 · Alveoli' },
    beats: [
      { at: 0, text: 'Welcome to the spa: the **alveoli**. There are about **480 million** rooms, with a surface area of roughly **half a tennis court**. This is the **respiratory zone**.' },
      { at: 7, text: 'The walls are **type I alveolar cells**: flat, thin squamous cells covering about 95% of the surface, so gases pass straight through.' },
      { at: 12, text: 'The masseuses are **type II alveolar cells**. They apply **surfactant**, which lowers surface tension so the rooms don’t collapse when you breathe out.' },
      { at: 17.5, text: '**Alveolar macrophages** handle night housekeeping, engulfing dust and pathogens. **Alveolar pores** connect neighbouring rooms and equalize pressure.' },
    ],
  },
  {
    id: 'shuttle',
    chapter: 'Exchange',
    term: 'Gas exchange',
    resort: 'The Shuttle Exchange',
    duration: 26,
    Art: ShuttleArt,
    more: { slug: 'gas-exchange', label: 'Stop 7b · Gas exchange' },
    beats: [
      { at: 0, text: 'Check-in time. Across the **respiratory membrane**, only about **0.5 µm** thick, guests move by **simple diffusion**, from high to low **partial pressure**.' },
      { at: 7, text: 'O₂ guests board the **red blood cell** shuttles. About **98.5%** of oxygen rides on **hemoglobin**, up to **4 O₂ per hemoglobin**; only 1.5% is dissolved.' },
      { at: 13, text: 'Meanwhile CO₂ guests step off and check out into the alveolus. In the blood they travelled as **bicarbonate (~70%)**, **carbaminohemoglobin (~20%)** or **dissolved (7–10%)**.' },
      { at: 20, text: 'Blood arrives **oxygen-poor (blue)** and leaves **oxygen-rich (red)**, heading to the heart and out to every cell in the body.' },
    ],
  },
  {
    id: 'checkout',
    chapter: 'Check-out',
    term: 'Exhalation',
    resort: 'Check-out',
    duration: 20,
    Art: CheckoutArt,
    more: { slug: 'check-out', label: 'Check-out · Exhalation route' },
    beats: [
      { at: 0, text: 'Check-out is quiet and **passive**: the **diaphragm relaxes**, the lungs **recoil**, the chest volume falls and the pressure rises above atmospheric. Air flows out.' },
      { at: 7, text: 'CO₂ guests retrace the route: **alveoli → bronchioles → bronchi → trachea → larynx → pharynx → nasal cavity → out**.' },
      { at: 14, text: 'On the way they pass the **vocal cords** (that’s when we speak), and the **conchae** recapture some moisture. Forced exhalation uses the **internal intercostals** and **abdominal muscles**.' },
    ],
  },
  {
    id: 'concierge',
    chapter: 'Concierge',
    term: 'Control of breathing',
    resort: 'The Concierge',
    duration: 26,
    Art: ConciergeArt,
    more: { slug: 'concierge', label: 'Concierge · Control of breathing' },
    beats: [
      { at: 0, text: 'Behind the scenes, the concierge runs every breath automatically: the **medulla oblongata**. Its **ventral respiratory group** sets the rhythm; the **dorsal respiratory group** reads the sensors.' },
      { at: 8, text: 'Upstairs in the **pons**, the **apneustic centre** controls depth and the **pneumotaxic centre** limits inspiration to help set the rate.' },
      { at: 14, text: '**Chemoreceptors** in the brainstem, the **carotid arteries** and the **aortic arch** sense H⁺ from CO₂. When CO₂ rises, the concierge orders **faster, deeper breaths**.' },
      { at: 21, text: 'Thank you for staying at **Alvea Wellness**. Every breath, a destination.' },
    ],
  },
]

export const starts = scenes.reduce<number[]>((acc, _s, i) => (acc.push(i ? acc[i - 1] + scenes[i - 1].duration : 0), acc), [])
export const TOTAL = scenes.reduce((a, s) => a + s.duration, 0)
