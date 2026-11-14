import type { ComponentType } from 'react'
import { ArrivalArt, ElevatorArt, GateArt, HallwayArt, LobbyArt, WingsArt } from './scenesA'
import { CheckoutArt, ConciergeArt, CorridorsArt, ShuttleArt, SpaArt } from './scenesB'

/** focus: [x, y, zoom] the camera eases to when this beat starts */
export type Beat = { at: number; text: string; focus?: [number, number, number] }
export type Scene = {
  id: string
  chapter: string
  term: string
  resort: string
  duration: number
  beats: Beat[]
  Art: ComponentType<{ t: number }>
  /** where the guest is on the journey strip: index into JOURNEY, or a special stage */
  journey: number | 'outside' | 'exhale' | 'brain'
  /** stop page for "learn more" */
  more?: { slug: string; label: string }
}

export const JOURNEY = ['Nose', 'Pharynx', 'Larynx', 'Trachea', 'Bronchi', 'Bronchioles', 'Alveoli', 'Blood']

export const scenes: Scene[] = [
  {
    id: 'arrival',
    journey: 'outside',
    chapter: 'Arrival',
    term: 'Diaphragm',
    resort: 'Arrival at the Air Pump',
    duration: 15,
    Art: ArrivalArt,
    more: { slug: 'diaphragm', label: 'Stop 8 · Diaphragm Drop Tower' },
    beats: [
      { at: 0, focus: [620, 460, 1.08], text: 'Welcome to **Alvea Wellness**, a resort built inside your lungs and airways. Our guests are **oxygen (O₂)** checking in and **carbon dioxide (CO₂)** checking out.' },
      { at: 6, focus: [900, 450, 1.04], text: 'Every trip starts with the air pump: the **diaphragm**. It moves **down**, the chest gets bigger, the pressure inside drops, and air rushes in.' },
    ],
  },
  {
    id: 'lobby',
    journey: 0,
    chapter: 'Nose',
    term: 'Nasal cavity',
    resort: 'The Lobby',
    duration: 22,
    Art: LobbyArt,
    more: { slug: 'nasal-cavity', label: 'Stop 1 · Nasal cavity' },
    beats: [
      { at: 0, focus: [800, 600, 1.12], text: 'Guests enter through the **nostrils** into the lobby: the **nasal cavity**. A wall called the **septum** splits it into left and right halls.' },
      { at: 5.5, focus: [1000, 360, 1.15], text: 'Curvy shelves called **nasal conchae** make the air swirl, so it gets **warmed, moistened and cleaned**.' },
      { at: 10.5, focus: [640, 660, 1.18], text: 'Housekeeping never stops: sticky **mucus** traps dust and germs, and tiny hairs called **cilia** sweep it to the throat.' },
      { at: 15.5, focus: [800, 230, 1.15], text: 'Up in the ceiling are the **smell receptors**. Above them, the **sinuses** are air pockets that make your skull lighter.' },
    ],
  },
  {
    id: 'elevator',
    journey: 1,
    chapter: 'Throat',
    term: 'Pharynx',
    resort: 'The Elevator',
    duration: 21,
    Art: ElevatorArt,
    more: { slug: 'pharynx', label: 'Stop 2 · Pharynx' },
    beats: [
      { at: 0, focus: [750, 390, 1.02], text: 'Next, guests ride the elevator down the **pharynx** (throat). It has three sections.' },
      { at: 5, focus: [750, 200, 1.18], text: 'Top floor: the **upper throat**, behind the nose. Only air comes through here.' },
      { at: 10, focus: [750, 390, 1.18], text: 'Middle floor: the **middle throat**, behind the mouth. **Food** passes through here too. **Tonsils** guard against germs.' },
      { at: 15, focus: [750, 580, 1.18], text: 'Bottom floor: the routes split. **Air** goes forward into the **larynx**; **food** goes back into the **esophagus**.' },
    ],
  },
  {
    id: 'gate',
    journey: 2,
    chapter: 'Voice box',
    term: 'Larynx',
    resort: 'The Security Gate',
    duration: 19,
    Art: GateArt,
    more: { slug: 'larynx', label: 'Stop 3 · Larynx' },
    beats: [
      { at: 0, focus: [800, 400, 1.05], text: 'Security: the **larynx** (voice box). It’s made of **cartilage**, which keeps it open. The bump at the front is your **Adam’s apple**.' },
      { at: 6, focus: [800, 430, 1.1], text: 'Watch the drawbridge: the **epiglottis**. When you swallow, it flips down so food can’t go into your windpipe. Breathing pauses for a moment.' },
      { at: 12.5, focus: [800, 420, 1.22], text: 'Guests then pass the stage: the **vocal cords**. When air flows out, they **vibrate**. That’s your voice.' },
    ],
  },
  {
    id: 'hallway',
    journey: 3,
    chapter: 'Windpipe',
    term: 'Trachea',
    resort: 'The Main Hallway',
    duration: 22,
    Art: HallwayArt,
    more: { slug: 'trachea', label: 'Stop 4 · Trachea' },
    beats: [
      { at: 0, focus: [800, 460, 1.0], text: 'Down the main hallway: the **trachea** (windpipe), about 10 to 12 cm long.' },
      { at: 4, focus: [800, 330, 1.12], text: 'The arches are **C-shaped rings of cartilage** that keep the hallway from collapsing. The open side faces the **esophagus**, so it can stretch when you swallow.' },
      { at: 11, focus: [800, 640, 1.18], text: 'The carpet moves the other way: **goblet cells** make mucus and **cilia** sweep it up and out, like an escalator.' },
      { at: 17, focus: [800, 450, 1.05], text: 'No check-in desk here. The trachea only **moves air**. Oxygen doesn’t get into the blood until the alveoli.' },
    ],
  },
  {
    id: 'wings',
    journey: 4,
    chapter: 'Bronchi',
    term: 'Bronchi',
    resort: 'The Guest Wings',
    duration: 20,
    Art: WingsArt,
    more: { slug: 'bronchi', label: 'Stop 5 · Bronchi' },
    beats: [
      { at: 0, focus: [800, 400, 1.12], text: 'At the end of the hallway, the airway splits in two. This spot is very sensitive: if dust touches it, you **cough**.' },
      { at: 6.5, focus: [800, 420, 1.05], text: 'Guests split into the **right and left bronchi**, one for each lung. The right one is wider and straighter.' },
      { at: 13, focus: [700, 430, 1.08], text: 'The right lung has **3 lobes**; the left has **2**, to leave room for the **heart**. Each lobe gets its own smaller branch.' },
    ],
  },
  {
    id: 'corridors',
    journey: 5,
    chapter: 'Bronchioles',
    term: 'Bronchioles',
    resort: 'The Room Corridors',
    duration: 20,
    Art: CorridorsArt,
    more: { slug: 'bronchioles', label: 'Stop 6 · Bronchioles' },
    beats: [
      { at: 0, focus: [800, 470, 1.02], text: 'The hallways get narrower: the **bronchioles**, about **1 mm** wide, with **no cartilage**.' },
      { at: 6, focus: [800, 420, 1.15], text: 'Their walls are **smooth muscle**, so they can squeeze. In an **asthma** attack they tighten and less air gets through.' },
      { at: 13, focus: [800, 380, 1.22], text: 'Thousands of tiny bronchioles lead to the **alveoli**. That’s about **2,400 km** of airways in total!' },
    ],
  },
  {
    id: 'spa',
    journey: 6,
    chapter: 'Alveoli',
    term: 'Alveoli',
    resort: 'The Spa Rooms',
    duration: 23,
    Art: SpaArt,
    more: { slug: 'alveoli', label: 'Stop 7 · Alveoli' },
    beats: [
      { at: 0, focus: [800, 470, 1.0], text: 'Welcome to the spa: the **alveoli**. You have about **480 million** of these tiny air sacs, with a surface area of about **half a tennis court**.' },
      { at: 7, focus: [800, 380, 1.18], text: 'The walls are super **thin**, just one cell thick, so gases pass straight through.' },
      { at: 12, focus: [700, 580, 1.2], text: 'Some cells make **surfactant**, a slippery liquid that stops the alveoli from collapsing when you breathe out.' },
      { at: 17.5, focus: [860, 520, 1.1], text: '**Cleaner cells** roam the alveoli, eating any dust and germs that made it this far.' },
    ],
  },
  {
    id: 'shuttle',
    journey: 7,
    chapter: 'Into the blood',
    term: 'Gas exchange',
    resort: 'The Shuttle Exchange',
    duration: 26,
    Art: ShuttleArt,
    more: { slug: 'gas-exchange', label: 'Stop 7b · Gas exchange' },
    beats: [
      { at: 0, focus: [800, 470, 1.0], text: 'Check-in time! Gases move by **diffusion**: from where there’s **more** of them to where there’s **less**.' },
      { at: 7, focus: [880, 560, 1.07], text: 'Oxygen guests board the **red blood cell** shuttles. Each **hemoglobin** has seats for **4 oxygen**. About **98.5%** of oxygen travels this way.' },
      { at: 13, focus: [560, 380, 1.1], text: 'Meanwhile, **CO₂** guests get off and check out into the alveolus. In the blood, most CO₂ travelled as **bicarbonate**.' },
      { at: 20, focus: [800, 560, 1.05], text: 'Blood arrives **low in oxygen (blue)** and leaves **full of oxygen (red)**, heading to the heart and the rest of the body.' },
    ],
  },
  {
    id: 'checkout',
    journey: 'exhale',
    chapter: 'Breathe out',
    term: 'Breathing out',
    resort: 'Check-out',
    duration: 20,
    Art: CheckoutArt,
    more: { slug: 'check-out', label: 'Check-out · Exhalation route' },
    beats: [
      { at: 0, focus: [800, 440, 1.05], text: 'Check-out is easy: the **diaphragm relaxes**, the chest gets smaller, the pressure rises, and air flows out.' },
      { at: 7, focus: [960, 420, 1.07], text: 'CO₂ guests take the same route home, backwards: **alveoli → bronchioles → bronchi → trachea → larynx → pharynx → nose**.' },
      { at: 14, focus: [800, 380, 1.15], text: 'On the way out they pass the **vocal cords** (that’s when you speak). Blowing out hard uses your **stomach and rib muscles**.' },
    ],
  },
  {
    id: 'concierge',
    journey: 'brain',
    chapter: 'Brain control',
    term: 'Control of breathing',
    resort: 'The Concierge',
    duration: 26,
    Art: ConciergeArt,
    more: { slug: 'concierge', label: 'Concierge · Control of breathing' },
    beats: [
      { at: 0, focus: [700, 540, 1.12], text: 'Behind the scenes, the concierge runs every breath automatically: the **medulla oblongata** in your brainstem.' },
      { at: 8, focus: [800, 300, 1.08], text: 'It sends signals down **nerves** to the diaphragm and rib muscles to set your breathing rhythm.' },
      { at: 14, focus: [800, 420, 1.02], text: '**Chemoreceptors** sense CO₂ in your blood. When CO₂ rises, like during exercise, you breathe **faster and deeper**.' },
      { at: 21, focus: [800, 450, 1.0], text: 'Thank you for staying at **Alvea Wellness**. Every breath, a destination.' },
    ],
  },
]

export const starts = scenes.reduce<number[]>((acc, _s, i) => (acc.push(i ? acc[i - 1] + scenes[i - 1].duration : 0), acc), [])
export const TOTAL = scenes.reduce((a, s) => a + s.duration, 0)
