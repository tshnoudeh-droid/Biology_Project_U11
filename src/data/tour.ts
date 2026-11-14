/**
 * Alvea Wellness: tour content, written for a Grade 11 (SBI3U) audience.
 * Order here IS the tour order (Previous / Next follows this array).
 * Every fact card: real term first (bold) → resort name → one short plain-language line.
 * Text supports **bold** and _italic_ via lib/rich.
 */

export type Zone = 'conducting' | 'respiratory' | 'ventilation' | 'bonus'

export type DiagramKey =
  | 'nasal'
  | 'pharynx'
  | 'larynx'
  | 'trachea'
  | 'bronchi'
  | 'bronchioles'
  | 'alveoli'
  | 'rbc'
  | 'diaphragm'
  | 'brainstem'
  | 'checkout'
  | 'advisories'

export type RideKey =
  | 'nose'
  | 'swallow'
  | 'cilia'
  | 'peanut'
  | 'asthma'
  | 'surfactant'
  | 'gas'
  | 'diaphragm'
  | 'chemo'
  | 'route'
  | 'advisory'

export interface AttractionCard {
  term: string
  resort: string
  body: string
}

export interface QuizOption {
  text: string
  correct?: boolean
  why: string
}

export interface Quiz {
  question: string
  options: QuizOption[]
}

export interface Stop {
  slug: string
  /** 1–8 for numbered stops, null for extras */
  number: number | null
  sub?: boolean
  /** "3", "7b" or "Extra" */
  code: string
  /** plain everyday name for the stepper, e.g. "Throat" */
  short: string
  term: string
  attraction: string
  pitch: string
  intro: string
  zone: Zone
  /** index in the 8-step stepper (0–7), 8 = extras */
  progress: number
  cards: AttractionCard[]
  glance: { value: string; label: string }[]
  tip: string
  quiz: Quiz
  diagram: DiagramKey
  diagramCaption: string
  ride?: RideKey
}

export const zoneLabel: Record<Zone, string> = {
  conducting: 'Airway (moves air, no gas exchange)',
  respiratory: 'Gas exchange zone',
  ventilation: 'Breathing muscles',
  bonus: 'Extra',
}

export const tourStops: Stop[] = [
  /* 1 */ {
    slug: 'nasal-cavity',
    number: 1,
    code: '1',
    short: 'Nose',
    term: 'Nasal cavity',
    attraction: 'The Nasal Welcome Lodge',
    pitch: 'Every breath checks in here first.',
    intro: 'Air enters through the **nostrils** into the **nasal cavity**, where it gets cleaned, warmed and moistened.',
    zone: 'conducting',
    progress: 0,
    cards: [
      { term: 'Nasal conchae', resort: 'Heated Rainforest Walls', body: 'Curvy shelves that swirl the air so it warms up and gets moist.' },
      { term: 'Mucus and cilia', resort: 'Housekeeping', body: 'Sticky **mucus** traps dust and germs. Tiny hairs (**cilia**) sweep it to your throat.' },
      { term: 'Smell receptors', resort: 'Aromatherapy Suite', body: 'At the top of the nasal cavity. They detect odours.' },
    ],
    glance: [{ value: '3 jobs', label: 'clean, warm and moisten the air' }],
    tip: 'Breathe through your nose. Mouth breathing skips the cleaning, warming and moistening.',
    quiz: {
      question: 'What do the nasal conchae do?',
      options: [
        { text: 'Swirl the air so it gets warmed, moistened and cleaned', correct: true, why: 'Correct! The curvy shelves make air tumble over a warm, wet, sticky surface.' },
        { text: 'Move oxygen into the blood', why: 'Not quite. That happens much deeper, in the alveoli (Stop 7).' },
        { text: 'Make the sound of your voice', why: 'Not quite. Your voice comes from the vocal cords in the larynx (Stop 3).' },
        { text: 'Stop food from going into your lungs', why: 'Not quite. That’s the epiglottis’s job (Stop 3).' },
      ],
    },
    diagram: 'nasal',
    diagramCaption: 'Side view of the nose. Air swirls past the conchae on its way to the throat.',
    ride: 'nose',
  },
  /* 2 */ {
    slug: 'pharynx',
    number: 2,
    code: '2',
    short: 'Throat',
    term: 'Pharynx',
    attraction: 'Crossroads Plaza',
    pitch: 'Where the air route and the food route cross.',
    intro: 'The **pharynx** (throat) is a tube behind your nose and mouth. Both **air and food** pass through it.',
    zone: 'conducting',
    progress: 1,
    cards: [
      { term: 'Three sections', resort: 'Three floors', body: 'Upper (behind the nose), middle (behind the mouth) and lower (above the voice box).' },
      { term: 'Tonsils', resort: 'Security Guards', body: 'Lumps of tissue in the throat that trap germs coming in.' },
      { term: 'The split', resort: 'The Great Split', body: 'At the bottom, **air** goes to the larynx and **food** goes to the esophagus.' },
    ],
    glance: [{ value: '2 routes', label: 'air and food share the throat' }],
    tip: 'That’s why you can’t breathe and swallow at the same time.',
    quiz: {
      question: 'What passes through the pharynx?',
      options: [
        { text: 'Both air and food', correct: true, why: 'Correct! The throat is shared, then the two routes split at the bottom.' },
        { text: 'Only air', why: 'Not quite. Food passes through it too, on the way to the esophagus.' },
        { text: 'Only food', why: 'Not quite. Every breath passes through it too.' },
        { text: 'Blood and air', why: 'Not quite. Blood travels in blood vessels, not through your throat.' },
      ],
    },
    diagram: 'pharynx',
    diagramCaption: 'Side view of the head and neck. Follow the air route (red) and the food route (green).',
    ride: 'swallow',
  },
  /* 3 */ {
    slug: 'larynx',
    number: 3,
    code: '3',
    short: 'Voice box',
    term: 'Larynx',
    attraction: 'The Voice Box Concert Hall',
    pitch: 'A concert hall with a drawbridge out front.',
    intro: 'The **larynx** (voice box) sits on top of the windpipe. It’s made of **cartilage**, which keeps it open.',
    zone: 'conducting',
    progress: 2,
    cards: [
      { term: 'Epiglottis', resort: 'The Drawbridge', body: 'A flap that closes over the larynx when you swallow, so food doesn’t go down the wrong way.' },
      { term: 'Vocal cords', resort: 'The Main Stage', body: 'Two folds that **vibrate** when you breathe out. That makes your voice.' },
      { term: 'Adam’s apple', resort: 'The Front Wall', body: 'The bump of cartilage at the front of your neck.' },
    ],
    glance: [{ value: 'Exhale', label: 'is when you speak' }],
    tip: 'Food “going down the wrong pipe” happens when the epiglottis doesn’t close in time. Coughing pushes it back out.',
    quiz: {
      question: 'What stops food from going into the trachea?',
      options: [
        { text: 'The epiglottis', correct: true, why: 'Correct! It flips down over the larynx every time you swallow.' },
        { text: 'The vocal cords', why: 'Not quite. They make sound; the epiglottis is the flap that blocks food.' },
        { text: 'The Adam’s apple', why: 'Not quite. That’s cartilage that protects the larynx from the front.' },
        { text: 'The nostrils', why: 'Not quite. Food never goes near your nostrils (hopefully).' },
      ],
    },
    diagram: 'larynx',
    diagramCaption: 'Front view of the larynx, and the vocal cords from above. Switch between breathing and speaking.',
  },
  /* 4 */ {
    slug: 'trachea',
    number: 4,
    code: '4',
    short: 'Windpipe',
    term: 'Trachea',
    attraction: 'The Trachea Express',
    pitch: 'A tunnel straight down to the lungs.',
    intro: 'The **trachea** (windpipe) carries air from the larynx down into your chest. It’s about 10–12 cm long.',
    zone: 'conducting',
    progress: 3,
    cards: [
      { term: 'C-shaped rings', resort: 'The Rail Tunnels', body: 'Rings of **cartilage** hold it open. The open side lets the esophagus behind it stretch when you swallow.' },
      { term: 'Goblet cells and cilia', resort: 'Luggage Return', body: '**Goblet cells** make mucus; **cilia** sweep it up and out like an escalator.' },
      { term: 'No gas exchange', resort: 'Express Service', body: 'The trachea only moves air. Oxygen gets into the blood later, in the alveoli.' },
    ],
    glance: [{ value: '16–20', label: 'cartilage rings' }],
    tip: 'Smoking stops the cilia from sweeping, so mucus builds up. That’s “smoker’s cough”.',
    quiz: {
      question: 'Why are the rings in the trachea C-shaped?',
      options: [
        { text: 'They hold the airway open, and the gap lets the esophagus stretch when you swallow', correct: true, why: 'Correct! Cartilage stops the windpipe from collapsing, and the open side faces the esophagus.' },
        { text: 'Oxygen gets into the blood through the gaps', why: 'Not quite. No gas exchange happens in the trachea.' },
        { text: 'So the trachea can close between breaths', why: 'Not quite. The trachea needs to stay open all the time.' },
        { text: 'Because they’re made of bone', why: 'Not quite. They’re cartilage, which is bendy but strong.' },
      ],
    },
    diagram: 'trachea',
    diagramCaption: 'The trachea from the front, a slice through one ring, and a close-up of the lining.',
    ride: 'cilia',
  },
  /* 5 */ {
    slug: 'bronchi',
    number: 5,
    code: '5',
    short: 'Bronchi',
    term: 'Bronchi',
    attraction: 'The Grand Fork',
    pitch: 'One tunnel becomes two: one for each lung.',
    intro: 'At the bottom of the trachea, the airway splits into two **bronchi**, one into each lung. Then they keep branching like an upside-down tree.',
    zone: 'conducting',
    progress: 4,
    cards: [
      { term: 'Right and left bronchi', resort: 'The Twin Platforms', body: 'The right one is wider and straighter, so swallowed objects usually end up there.' },
      { term: 'Lobes', resort: 'The Lung Wings', body: 'The right lung has **3** sections (lobes). The left has **2**, to make room for your heart.' },
      { term: 'Bronchial tree', resort: 'Branch Line Network', body: 'Each tube splits into smaller ones to spread air through the whole lung.' },
    ],
    glance: [{ value: '3 + 2', label: 'lobes: right lung + left lung' }],
    tip: 'The spot where the trachea splits is extra sensitive. If something touches it, you cough hard.',
    quiz: {
      question: 'Why does the left lung have only 2 lobes?',
      options: [
        { text: 'To make room for the heart', correct: true, why: 'Correct! The heart sits slightly to the left, so the left lung is a bit smaller.' },
        { text: 'Because the left bronchus is blocked', why: 'Not quite. Both bronchi carry air normally.' },
        { text: 'The left lung isn’t used for breathing', why: 'Not quite. Both lungs do gas exchange.' },
        { text: 'It actually has 3, one is just hidden', why: 'Not quite. The left lung really has 2 lobes.' },
      ],
    },
    diagram: 'bronchi',
    diagramCaption: 'Both lungs from the front. Your right lung is on the left side of the picture.',
    ride: 'peanut',
  },
  /* 6 */ {
    slug: 'bronchioles',
    number: 6,
    code: '6',
    short: 'Bronchioles',
    term: 'Bronchioles',
    attraction: 'The Bronchiole Canopy Walk',
    pitch: 'Tiny trails with walls that can squeeze.',
    intro: '**Bronchioles** are the smallest airways, about 1 mm wide. They have no cartilage, only **smooth muscle**.',
    zone: 'conducting',
    progress: 5,
    cards: [
      { term: 'Smooth muscle', resort: 'Adjustable Trails', body: 'It can squeeze (narrow) or relax (widen) the airway.' },
      { term: 'Asthma', resort: 'Trail Closures', body: 'In an asthma attack the muscle squeezes and extra mucus forms, so less air gets through.' },
      { term: 'Lead to the alveoli', resort: 'Final Trailheads', body: 'Each bronchiole ends in clusters of tiny air sacs: the alveoli.' },
    ],
    glance: [{ value: '≤ 1 mm', label: 'wide' }],
    tip: 'Asthma inhalers relax the muscle so the airway opens back up.',
    quiz: {
      question: 'Why can bronchioles change size?',
      options: [
        { text: 'Their walls are smooth muscle, with no cartilage', correct: true, why: 'Correct! The muscle can squeeze or relax because nothing rigid holds it open.' },
        { text: 'They have sliding rings of cartilage', why: 'Not quite. Bronchioles have no cartilage at all.' },
        { text: 'The alveoli push them open', why: 'Not quite. The muscle in their walls does the work.' },
        { text: 'You control them on purpose', why: 'Not quite. It’s smooth muscle, so it works automatically.' },
      ],
    },
    diagram: 'bronchioles',
    diagramCaption: 'A bronchiole branching down to the air sacs, and a slice showing its muscle wall.',
    ride: 'asthma',
  },
  /* 7 */ {
    slug: 'alveoli',
    number: 7,
    code: '7',
    short: 'Alveoli',
    term: 'Alveoli',
    attraction: 'The Alveoli Hot Springs',
    pitch: 'Our headline attraction: millions of tiny air sacs.',
    intro: '**Alveoli** are tiny air sacs at the end of the bronchioles. This is where oxygen gets into your blood. You have about **480 million**.',
    zone: 'respiratory',
    progress: 6,
    cards: [
      { term: 'Thin walls', resort: 'Thin Spa Walls', body: 'Just one cell thick, so oxygen and CO₂ pass through easily.' },
      { term: 'Capillaries', resort: 'Hot Spring Pipes', body: 'A net of tiny blood vessels wraps around every alveolus.' },
      { term: 'Surfactant', resort: 'The Surfactant Bar', body: 'A slippery liquid that stops the alveoli from collapsing when you breathe out.' },
    ],
    glance: [{ value: '½ tennis court', label: 'total surface area of all your alveoli' }],
    tip: 'Huge surface area + very thin walls = fast gas exchange.',
    quiz: {
      question: 'What does surfactant do?',
      options: [
        { text: 'Stops the alveoli from collapsing', correct: true, why: 'Correct! It lowers the pull of the water inside each alveolus.' },
        { text: 'Carries oxygen in the blood', why: 'Not quite. That’s hemoglobin, in red blood cells.' },
        { text: 'Traps dust in the nose', why: 'Not quite. That’s mucus.' },
        { text: 'Makes your voice', why: 'Not quite. That’s the vocal cords.' },
      ],
    },
    diagram: 'alveoli',
    diagramCaption: 'A cluster of alveoli wrapped in capillaries, and a close-up of one alveolus.',
    ride: 'surfactant',
  },
  /* 7b */ {
    slug: 'gas-exchange',
    number: 7,
    sub: true,
    code: '7b',
    short: 'Gas exchange',
    term: 'Gas exchange',
    attraction: 'The Great Exchange Market',
    pitch: 'Oxygen checks in. Carbon dioxide checks out.',
    intro: 'Gases move by **diffusion**: from where there’s more of them to where there’s less. No energy needed.',
    zone: 'respiratory',
    progress: 6,
    cards: [
      { term: 'Oxygen in', resort: 'Check-in', body: 'There’s more O₂ in the alveoli than in the blood, so O₂ diffuses into the blood.' },
      { term: 'Hemoglobin', resort: 'Shuttle Seats', body: 'A protein in red blood cells that carries oxygen: up to 4 O₂ each.' },
      { term: 'CO₂ out', resort: 'Check-out', body: 'There’s more CO₂ in the blood, so it diffuses into the alveoli and gets breathed out.' },
    ],
    glance: [{ value: '98.5%', label: 'of oxygen rides on hemoglobin' }],
    tip: 'Blood arrives low in oxygen (shown blue) and leaves full of oxygen (shown red).',
    quiz: {
      question: 'Why does oxygen move from the alveoli into the blood?',
      options: [
        { text: 'There’s more oxygen in the alveoli than in the blood', correct: true, why: 'Correct! That’s diffusion: from high concentration to low.' },
        { text: 'The heart pumps it in', why: 'Not quite. The heart moves blood, but oxygen crosses by diffusion.' },
        { text: 'Cilia sweep it across', why: 'Not quite. Cilia are in the airways, not the alveoli.' },
        { text: 'The diaphragm pushes it in', why: 'Not quite. The diaphragm moves air into the lungs, not into the blood.' },
      ],
    },
    diagram: 'rbc',
    diagramCaption: 'How a red blood cell picks up oxygen in the lungs and drops it off in the body.',
    ride: 'gas',
  },
  /* 8 */ {
    slug: 'diaphragm',
    number: 8,
    code: '8',
    short: 'Diaphragm',
    term: 'Diaphragm',
    attraction: 'The Diaphragm Drop Tower',
    pitch: 'Our thrill ride: the muscle that powers every breath.',
    intro: 'The **diaphragm** is a dome-shaped muscle under your lungs. With your **rib muscles**, it changes the size of your chest.',
    zone: 'ventilation',
    progress: 7,
    cards: [
      { term: 'Breathing in', resort: 'The Drop', body: 'Diaphragm moves **down**, ribs move **up and out**. Chest gets bigger, so air rushes in.' },
      { term: 'Breathing out', resort: 'The Gentle Return', body: 'Muscles relax and the chest gets smaller, so air is pushed out.' },
      { term: 'Pressure rule', resort: 'The Ride’s Physics', body: 'Bigger space = lower pressure. Air always flows from high pressure to low (**Boyle’s law**).' },
    ],
    glance: [{ value: '12–18', label: 'breaths per minute at rest' }],
    tip: 'Hiccups are sudden little spasms of your diaphragm.',
    quiz: {
      question: 'What happens when the diaphragm contracts?',
      options: [
        { text: 'The chest gets bigger, pressure drops, and air rushes in', correct: true, why: 'Correct! Bigger space means lower pressure, so air flows in.' },
        { text: 'The chest gets smaller and air is pushed out', why: 'Not quite. That’s what happens when it relaxes.' },
        { text: 'Oxygen is pumped straight into the blood', why: 'Not quite. It moves air into the lungs; diffusion does the rest.' },
        { text: 'Nothing: the lungs inflate themselves', why: 'Not quite. Lungs have no muscle of their own; they follow the chest.' },
      ],
    },
    diagram: 'diaphragm',
    diagramCaption: 'Breathing in vs breathing out: what the diaphragm and ribs do.',
    ride: 'diaphragm',
  },
  /* Extra: control */ {
    slug: 'concierge',
    number: null,
    code: 'Extra',
    short: 'Breathing control',
    term: 'Control of breathing',
    attraction: 'The Concierge Desk',
    pitch: 'Your brain runs your breathing automatically.',
    intro: 'The **medulla oblongata**, in your brainstem, controls breathing without you having to think about it.',
    zone: 'bonus',
    progress: 8,
    cards: [
      { term: 'Medulla oblongata', resort: 'Head Concierge', body: 'Sends signals to the diaphragm and rib muscles to set your breathing rhythm.' },
      { term: 'Chemoreceptors', resort: 'The Sensors', body: 'Detect how much **CO₂** is in your blood.' },
      { term: 'More CO₂ = breathe faster', resort: 'Rush Hour', body: 'When CO₂ rises (like during exercise), you breathe faster and deeper.' },
    ],
    glance: [{ value: 'CO₂', label: 'is the main signal to breathe' }],
    tip: 'You can hold your breath, but CO₂ builds up until your brain makes you breathe again.',
    quiz: {
      question: 'Why do you breathe faster during exercise?',
      options: [
        { text: 'CO₂ builds up in your blood and the brain speeds up breathing', correct: true, why: 'Correct! Chemoreceptors sense the extra CO₂ and the medulla responds.' },
        { text: 'Your lungs get bigger', why: 'Not quite. Your lungs stay the same size; your breathing rate changes.' },
        { text: 'The epiglottis stays open longer', why: 'Not quite. The epiglottis is for swallowing.' },
        { text: 'You decide to on purpose', why: 'Not quite. It happens automatically, controlled by your brainstem.' },
      ],
    },
    diagram: 'brainstem',
    diagramCaption: 'Where the brain’s breathing centre and the CO₂ sensors are.',
    ride: 'chemo',
  },
  /* Extra: check-out */ {
    slug: 'check-out',
    number: null,
    code: 'Extra',
    short: 'Check-out',
    term: 'Breathing out',
    attraction: 'Check-out',
    pitch: 'Your route home, in reverse.',
    intro: 'Breathing out follows the same route **backwards**, carrying carbon dioxide out of your body.',
    zone: 'bonus',
    progress: 8,
    cards: [
      { term: 'Carbon dioxide', resort: 'Your Souvenir', body: 'The waste gas made by your cells, picked up in the alveoli.' },
      { term: 'Water vapour', resort: 'A Little Moisture', body: 'Why your breath fogs up a cold window.' },
      { term: 'Your voice', resort: 'A Parting Song', body: 'Air going out vibrates your vocal cords.' },
    ],
    glance: [{ value: '8', label: 'stops on the way out' }],
    tip: 'Normal breathing out is passive: your muscles just relax.',
    quiz: {
      question: 'Which is the correct route for breathing out?',
      options: [
        { text: 'Alveoli → bronchioles → bronchi → trachea → larynx → pharynx → nose', correct: true, why: 'Correct! It’s the breathing-in route, backwards.' },
        { text: 'Alveoli → bronchi → bronchioles → larynx → trachea → pharynx → nose', why: 'Not quite. Bronchioles come before bronchi, and the trachea before the larynx.' },
        { text: 'Bronchi → alveoli → trachea → nose', why: 'Not quite. The alveoli are the deepest point, so the trip starts there.' },
        { text: 'Nose → pharynx → larynx → trachea → alveoli', why: 'Not quite. That’s the breathing-in route.' },
      ],
    },
    diagram: 'checkout',
    diagramCaption: 'The route air takes out of your body.',
    ride: 'route',
  },
  /* Extra: advisories */ {
    slug: 'advisories',
    number: null,
    code: 'Extra',
    short: 'Health warnings',
    term: 'Lung conditions',
    attraction: 'Travel Advisories',
    pitch: 'Three conditions that can disrupt your stay.',
    intro: 'Some health conditions change how the resort works. **Alvea is a smoke- and vape-free resort.**',
    zone: 'bonus',
    progress: 8,
    cards: [
      { term: 'Asthma', resort: 'Affects Stops 5–6', body: 'Airways get inflamed and the bronchiole muscle squeezes, so less air gets through.' },
      { term: 'Emphysema (COPD)', resort: 'Affects Stop 7', body: 'Alveoli walls break down, so there’s less surface for gas exchange. Mostly caused by smoking.' },
      { term: 'Premature babies', resort: 'Affects Stop 7', body: 'They may not make enough surfactant yet, so their alveoli collapse.' },
    ],
    glance: [{ value: '#1', label: 'cause of emphysema: smoking' }],
    tip: 'Smoking and vaping damage cilia, inflame airways and break down alveoli.',
    quiz: {
      question: 'Why does emphysema make breathing harder?',
      options: [
        { text: 'The alveoli break down, so there’s less surface for gas exchange', correct: true, why: 'Correct! Fewer, bigger air sacs means much less surface area.' },
        { text: 'The trachea collapses', why: 'Not quite. Emphysema damages the alveoli.' },
        { text: 'The epiglottis stays shut', why: 'Not quite. Emphysema has nothing to do with the epiglottis.' },
        { text: 'There’s too much surfactant', why: 'Not quite. Too little surfactant is the problem for premature babies.' },
      ],
    },
    diagram: 'advisories',
    diagramCaption: 'Healthy (left of each pair) vs affected (right).',
    ride: 'advisory',
  },
]

export function getStop(slug: string | undefined) {
  const index = tourStops.findIndex((s) => s.slug === slug)
  return {
    stop: index >= 0 ? tourStops[index] : undefined,
    prev: index > 0 ? tourStops[index - 1] : undefined,
    next: index >= 0 && index < tourStops.length - 1 ? tourStops[index + 1] : undefined,
    index,
  }
}

/** The 8 numbered stops in anatomical order */
export const numberedStops = tourStops.filter((s) => s.number !== null && !s.sub)
/** Extras shown as cards under the map */
export const extraStops = tourStops.filter((s) => s.number === null || s.sub)
