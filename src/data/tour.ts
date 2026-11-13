/**
 * Alvea Wellness — tour content.
 * Order here IS the tour order (Previous / Next follows this array).
 * Every card: real term first (rendered bold) → resort name → function.
 * Text supports **bold** and _italic_ via lib/rich.
 */

export type Zone = 'conducting' | 'transition' | 'respiratory' | 'ventilation' | 'bonus'

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

export type RideKey = 'asthma' | 'surfactant' | 'gas' | 'diaphragm' | 'chemo'

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
  /** 1–8 for numbered stops, null for bonus pages */
  number: number | null
  /** true for Stop 7b */
  sub?: boolean
  /** Short code for the eyebrow/progress: "3", "7b", "Bonus" */
  code: string
  term: string
  attraction: string
  pitch: string
  intro: string
  zone: Zone
  /** Index of the active pill in the 8-pill progress bar (0–7), 8 = all visited */
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
  conducting: 'Conducting zone',
  transition: 'Conducting zone → respiratory zone',
  respiratory: 'Respiratory zone',
  ventilation: 'Ventilation (the pump)',
  bonus: 'Bonus experience',
}

export const tourStops: Stop[] = [
  /* ---------------------------------------------------------------- 1 */
  {
    slug: 'nasal-cavity',
    number: 1,
    code: '1',
    term: 'Nasal cavity',
    attraction: 'The Nasal Welcome Lodge',
    pitch: 'Your check-in desk: every breath is filtered, warmed and humidified before it goes any further.',
    intro:
      'Air enters through the **nares** (nostrils) into the **nasal cavity**, which is divided into left and right halves by the **nasal septum**. Before guests travel deeper, the lodge cleans, warms and moistens every breath.',
    zone: 'conducting',
    progress: 0,
    cards: [
      {
        term: 'Nasal conchae (superior, middle, inferior)',
        resort: 'Heated Rainforest Corridors',
        body: 'Three curled shelves of bone on each side wall. They **increase surface area** and make the air swirl, so it touches the warm, moist lining and is **warmed, humidified and cleaned**. On the way out, they also trap water from exhaled air.',
      },
      {
        term: 'Mucus and cilia',
        resort: 'Complimentary Housekeeping',
        body: 'The cavity is lined with **pseudostratified ciliated columnar epithelium**. Sticky **mucus** traps dust and microbes, and the **cilia** sweep it back toward the throat, where it is swallowed.',
      },
      {
        term: 'Olfactory epithelium',
        resort: 'Aromatherapy Suite',
        body: 'A patch of tissue in the roof of the cavity that holds **odour receptors**. Chemicals dissolve in its mucus and trigger nerve signals to the brain, giving us our sense of smell.',
      },
      {
        term: 'Paranasal sinuses (frontal, maxillary, sphenoidal, ethmoidal)',
        resort: 'The Skylight Lofts',
        body: '**Air-filled spaces** in the bones around the nasal cavity that **lighten the skull**. They are lined with mucous membrane that drains into the nasal cavity.',
      },
    ],
    glance: [
      { value: '3', label: 'conchae on each side of the septum' },
      { value: '4', label: 'pairs of paranasal sinuses' },
    ],
    tip: 'Breathe through your nose. Nose breathing uses the lodge’s filtering, warming and humidifying; mouth breathing skips the whole welcome service.',
    quiz: {
      question: 'What do the nasal conchae do?',
      options: [
        {
          text: 'Increase surface area and swirl the air so it is warmed, humidified and cleaned',
          correct: true,
          why: 'Correct. The conchae make air tumble across a large, warm, mucus-covered surface, so it is conditioned and filtered before reaching the lungs.',
        },
        {
          text: 'Exchange oxygen and carbon dioxide with the blood',
          why: 'Not quite. The nasal cavity is part of the conducting zone: no gas exchange happens here. Exchange happens only in the respiratory zone (the alveoli).',
        },
        {
          text: 'Vibrate to produce the sound of your voice',
          why: 'Not quite. Sound is produced by the true vocal cords in the larynx (Stop 3).',
        },
        {
          text: 'Close off the airway when you swallow',
          why: 'Not quite. That is the job of the epiglottis in the larynx (Stop 3).',
        },
      ],
    },
    diagram: 'nasal',
    diagramCaption: 'Side (sagittal) view of the nasal cavity, plus a front view showing where the four pairs of paranasal sinuses sit.',
  },

  /* ---------------------------------------------------------------- 2 */
  {
    slug: 'pharynx',
    number: 2,
    code: '2',
    term: 'Pharynx',
    attraction: 'Crossroads Plaza',
    pitch: 'Three wings, one shared corridor: the place where the airway and the food route meet.',
    intro:
      'The **pharynx** (throat) is a muscular tube, about 13 cm long, lined with mucous membrane. It connects the nasal and oral cavities to the larynx and the esophagus, and it is divided into three regions.',
    zone: 'conducting',
    progress: 1,
    cards: [
      {
        term: 'Nasopharynx',
        resort: 'North Wing',
        body: 'The region **behind the nasal cavity**. It carries **air only**. When you swallow, the soft palate and uvula lift to close it off so food can’t enter the nasal cavity. Its back wall holds the **pharyngeal tonsil (adenoid)**.',
      },
      {
        term: 'Oropharynx',
        resort: 'Food Court Crossing',
        body: 'The region **behind the mouth**, shared by **both air and food**. The **palatine tonsils** (on the side walls) and **lingual tonsils** (at the base of the tongue) trap and fight pathogens entering through the mouth.',
      },
      {
        term: 'Laryngopharynx',
        resort: 'The Great Split',
        body: 'The lowest region, behind the larynx. Here the routes divide: **air continues forward into the larynx**, while **food continues back into the esophagus**.',
      },
    ],
    glance: [
      { value: '~13 cm', label: 'length of the pharynx' },
      { value: '3', label: 'regions: naso-, oro- and laryngopharynx' },
    ],
    tip: 'The Food Court Crossing is a shared space. The oropharynx and laryngopharynx carry both air and food, which is why the larynx below has a drawbridge.',
    quiz: {
      question: 'Which tonsils sit in the oropharynx?',
      options: [
        {
          text: 'The palatine and lingual tonsils',
          correct: true,
          why: 'Correct. The palatine tonsils sit on the side walls and the lingual tonsils sit at the base of the tongue, both in the oropharynx.',
        },
        {
          text: 'The pharyngeal tonsil (adenoid) only',
          why: 'Not quite. The pharyngeal tonsil sits in the nasopharynx, above the oropharynx.',
        },
        {
          text: 'The thyroid and cricoid tonsils',
          why: 'Not quite. The thyroid and cricoid are cartilages of the larynx, not tonsils.',
        },
        {
          text: 'There are no tonsils in the pharynx',
          why: 'Not quite. The pharynx contains three types of tonsils that help trap pathogens.',
        },
      ],
    },
    diagram: 'pharynx',
    diagramCaption: 'Side (sagittal) view of the head and neck, with the three regions of the pharynx colour-coded.',
  },

  /* ---------------------------------------------------------------- 3 */
  {
    slug: 'larynx',
    number: 3,
    code: '3',
    term: 'Larynx',
    attraction: 'The Voice Box Concert Hall',
    pitch: 'A cartilage concert hall with a drawbridge out front and the best acoustics in the body.',
    intro:
      'The **larynx** (voice box) connects the laryngopharynx to the trachea. Its framework is made of **nine cartilages**: three large ones (**thyroid**, **cricoid** and **epiglottis**) plus three smaller pairs (**arytenoid**, **corniculate** and **cuneiform**). This framework holds the airway open.',
    zone: 'conducting',
    progress: 2,
    cards: [
      {
        term: 'Epiglottis',
        resort: 'The Drawbridge',
        body: 'A flap of **elastic cartilage**. During **swallowing**, the larynx lifts and the epiglottis swings down over the opening, keeping **food and liquid out of the trachea**.',
      },
      {
        term: 'Thyroid cartilage',
        resort: 'The Front Façade',
        body: 'The largest cartilage, a shield shape that forms the **Adam’s apple**. With the **cricoid cartilage** below it, it forms a sturdy frame that keeps the airway open.',
      },
      {
        term: 'True vocal cords (vocal folds)',
        resort: 'The Main Stage',
        body: 'Folds of tissue that **vibrate as exhaled air passes** between them, producing sound. Pushing more air through makes the sound **louder**; muscles changing the tension of the folds change the **pitch**.',
      },
      {
        term: 'Glottis',
        resort: 'The Stage Door',
        body: 'The **vocal folds plus the opening between them**. It opens wide for breathing and narrows when you speak or sing.',
      },
    ],
    glance: [
      { value: '9', label: 'cartilages (3 large + 3 small pairs)' },
      { value: 'Exhale', label: 'is when speech happens' },
    ],
    tip: 'Please don’t talk with your mouth full. The Drawbridge can only close once you stop speaking and swallow.',
    quiz: {
      question: 'What stops food from entering the trachea?',
      options: [
        {
          text: 'The epiglottis',
          correct: true,
          why: 'Correct. The epiglottis, an elastic cartilage flap, swings down over the larynx during swallowing so food goes into the esophagus.',
        },
        {
          text: 'The thyroid cartilage',
          why: 'Not quite. The thyroid cartilage (Adam’s apple) protects and holds open the larynx, but it doesn’t cover the opening.',
        },
        {
          text: 'The nasal septum',
          why: 'Not quite. The nasal septum divides the nasal cavity into left and right halves.',
        },
        {
          text: 'The carina',
          why: 'Not quite. The carina is the ridge where the trachea splits into the bronchi, much lower down.',
        },
      ],
    },
    diagram: 'larynx',
    diagramCaption: 'Front view of the larynx’s cartilages, and a top-down view of the glottis. Use the toggle to open and close the vocal folds.',
  },

  /* ---------------------------------------------------------------- 4 */
  {
    slug: 'trachea',
    number: 4,
    code: '4',
    term: 'Trachea',
    attraction: 'The Trachea Express',
    pitch: 'A reinforced rail tunnel running from your neck into your chest, with a luggage return built in.',
    intro:
      'The **trachea** (windpipe) runs from the larynx down into the chest, about 10–12 cm long. Like everything before it, it is part of the **conducting zone**: it moves air but **no gas exchange happens here**.',
    zone: 'conducting',
    progress: 3,
    cards: [
      {
        term: '16–20 C-shaped rings of hyaline cartilage',
        resort: 'The Rail Tunnels',
        body: 'The rings **keep the trachea from collapsing**. The **open part of the “C” faces the esophagus** behind it, bridged by smooth muscle (the **trachealis**), so the esophagus can expand when you swallow food.',
      },
      {
        term: 'Mucociliary escalator',
        resort: 'The Luggage Return',
        body: 'The lining is **pseudostratified ciliated columnar epithelium**. **Goblet cells** make mucus that traps particles, and **ciliated cells** beat it upward toward the pharynx to be swallowed or coughed out.',
      },
      {
        term: 'Conducting zone',
        resort: 'Express Service, No Stops',
        body: 'The trachea only **conducts** air. Its walls are far too thick for gases to diffuse through. The exchange happens only once guests reach the alveoli.',
      },
    ],
    glance: [
      { value: '16–20', label: 'C-shaped cartilage rings' },
      { value: '0', label: 'gas exchange in the trachea' },
    ],
    tip: 'Smoke paralyzes the cilia of the Luggage Return. Without the escalator, mucus builds up and has to be coughed out instead.',
    quiz: {
      question: 'Why are the tracheal rings made of C-shaped cartilage?',
      options: [
        {
          text: 'The cartilage keeps the airway open, and the open side faces the esophagus so it can expand when you swallow',
          correct: true,
          why: 'Correct. Rigid hyaline cartilage stops the trachea from collapsing, while the gap at the back lets food pass down the esophagus easily.',
        },
        {
          text: 'The gaps in the rings are where gas exchange happens',
          why: 'Not quite. No gas exchange happens in the trachea; it is part of the conducting zone.',
        },
        {
          text: 'So the trachea can close completely between breaths',
          why: 'Not quite. The trachea needs to stay open all the time so air can flow in and out.',
        },
        {
          text: 'Because full rings of bone would be too heavy',
          why: 'Not quite. The rings are cartilage, not bone, and the C shape is about the esophagus, not weight.',
        },
      ],
    },
    diagram: 'trachea',
    diagramCaption: 'Front view of the trachea, a cross-section showing the C-shaped ring, and a close-up of the mucociliary escalator.',
  },

  /* ---------------------------------------------------------------- 5 */
  {
    slug: 'bronchi',
    number: 5,
    code: '5',
    term: 'Bronchi',
    attraction: 'The Grand Fork',
    pitch: 'One track becomes two. Choose your lung: three lobes on the right, two on the left.',
    intro:
      'At the bottom of the trachea, the airway splits into the **right and left primary bronchi**. They keep branching again and again, forming the **bronchial tree**.',
    zone: 'conducting',
    progress: 4,
    cards: [
      {
        term: 'Carina',
        resort: 'The Security Checkpoint',
        body: 'The ridge of cartilage where the trachea splits. Its lining is **very sensitive**: if a foreign object touches it, it triggers a **violent cough reflex** to throw it back out.',
      },
      {
        term: 'Right and left primary bronchi',
        resort: 'The Twin Platforms',
        body: 'Each enters a lung at the **hilum**. Like the trachea, they are **supported by cartilage** and **lined with ciliated epithelium**. The right bronchus is wider, shorter and more vertical than the left.',
      },
      {
        term: 'Lobes and secondary bronchi',
        resort: 'The Lung Wings',
        body: 'The **right lung has 3 lobes** and the **left lung has 2**, leaving room for the heart. Each lobe gets its own **secondary (lobar) bronchus**, which branches into smaller **tertiary bronchi**.',
      },
      {
        term: 'Bronchial tree',
        resort: 'The Branch Line Network',
        body: 'All the branching airways together. Each split makes the tubes **narrower and more numerous**, spreading air throughout the lungs.',
      },
    ],
    glance: [
      { value: '3 + 2', label: 'lobes: right lung + left lung' },
      { value: '2', label: 'primary bronchi, one per lung' },
    ],
    tip: 'Because the right primary bronchus is wider and more vertical, inhaled objects are more likely to end up in the right lung. Chew carefully.',
    quiz: {
      question: 'What triggers a cough at the carina?',
      options: [
        {
          text: 'Sensitive nerve tissue detects a foreign object and triggers a cough reflex',
          correct: true,
          why: 'Correct. The carina’s lining is one of the most sensitive areas of the airway, so touching it causes a strong, protective cough.',
        },
        {
          text: 'The carina contains smooth muscle that contracts on a timer',
          why: 'Not quite. The cough is a reflex triggered by irritation, not a timed muscle contraction.',
        },
        {
          text: 'Low oxygen levels in the bronchi',
          why: 'Not quite. Low oxygen is sensed by chemoreceptors and changes breathing rate; it doesn’t trigger a cough at the carina.',
        },
        {
          text: 'The diaphragm pushing up against it',
          why: 'Not quite. The diaphragm sits below the lungs and never touches the carina.',
        },
      ],
    },
    diagram: 'bronchi',
    diagramCaption: 'Front view of both lungs. On a front view, the patient’s right lung appears on your left.',
  },

  /* ---------------------------------------------------------------- 6 */
  {
    slug: 'bronchioles',
    number: 6,
    code: '6',
    term: 'Bronchioles',
    attraction: 'The Bronchiole Canopy Walk',
    pitch: 'Narrow, winding treetop trails, with muscles in the walls that can widen or tighten the path.',
    intro:
      'The bronchi branch into **bronchioles**, about **1 mm or less** in diameter. Unlike the bigger airways, they have **no cartilage**. Their walls are made of **smooth muscle**, so they can change size.',
    zone: 'transition',
    progress: 5,
    cards: [
      {
        term: 'Smooth muscle walls',
        resort: 'The Adjustable Trails',
        body: 'With **no cartilage** holding them open, bronchioles rely on rings of **smooth muscle**. Contracting or relaxing this muscle changes how much air can flow through.',
      },
      {
        term: 'Bronchoconstriction vs bronchodilation',
        resort: 'Trail Closures and Openings',
        body: '**Bronchoconstriction** is narrowing (muscle contracts, often from irritants or the parasympathetic nervous system). **Bronchodilation** is widening (muscle relaxes, for example during exercise with the sympathetic nervous system).',
      },
      {
        term: 'Terminal and respiratory bronchioles',
        resort: 'The Final Trailheads',
        body: 'Each lung has **more than 1,000 terminal bronchioles**, the last part of the conducting zone. They lead to **respiratory bronchioles → alveolar ducts → alveolar sacs**, where the respiratory zone begins.',
      },
    ],
    glance: [
      { value: '≤ 1 mm', label: 'bronchiole diameter' },
      { value: '~2,400 km', label: 'of airways in total' },
    ],
    tip: 'Try Asthma Mode above to see what happens when the trails tighten. Guests with asthma should always pack their reliever inhaler (a bronchodilator).',
    quiz: {
      question: 'Why can bronchioles change their diameter?',
      options: [
        {
          text: 'Their walls are smooth muscle with no cartilage, so the muscle can contract or relax',
          correct: true,
          why: 'Correct. Without rigid cartilage, the smooth muscle can narrow (bronchoconstriction) or widen (bronchodilation) the airway.',
        },
        {
          text: 'They have sliding rings of hyaline cartilage',
          why: 'Not quite. Bronchioles have no cartilage at all; that’s exactly why they can change size.',
        },
        {
          text: 'Type II alveolar cells inflate them',
          why: 'Not quite. Type II cells live in the alveoli and secrete surfactant.',
        },
        {
          text: 'They are made of skeletal muscle you control on purpose',
          why: 'Not quite. Bronchiole muscle is smooth (involuntary) muscle; you can’t widen them by choice.',
        },
      ],
    },
    diagram: 'bronchioles',
    diagramCaption: 'A bronchiole branching down to alveolar sacs, and a cross-section showing smooth muscle with no cartilage.',
    ride: 'asthma',
  },

  /* ---------------------------------------------------------------- 7 */
  {
    slug: 'alveoli',
    number: 7,
    code: '7',
    term: 'Alveoli',
    attraction: 'The Alveoli Hot Springs',
    pitch: 'Our headline attraction: 480 million private pools, each wrapped in warm capillaries.',
    intro:
      'The **alveoli** are tiny air sacs at the end of the bronchial tree, and they form the **respiratory zone**: the only place where gas exchange happens. There are about **480 million**, with a total surface area of roughly **half a tennis court**. Each one is wrapped in a net of **capillaries**.',
    zone: 'respiratory',
    progress: 6,
    cards: [
      {
        term: 'Type I alveolar cells',
        resort: 'The Thin Spa Walls',
        body: '**Flat, squamous cells** that make up about **95% of the alveolar surface**. They are so thin that **oxygen and carbon dioxide diffuse straight through** them.',
      },
      {
        term: 'Type II alveolar cells',
        resort: 'The Surfactant Bar',
        body: 'Cells that secrete **pulmonary surfactant**, a mix of lipids and proteins. Surfactant **lowers the surface tension** of the water lining each alveolus, so the alveoli **don’t collapse when you exhale**.',
      },
      {
        term: 'Alveolar macrophages (“dust cells”)',
        resort: 'Night Housekeeping',
        body: 'Immune cells that roam the alveoli and **phagocytose** (engulf) **debris and pathogens** that made it past the upper airways.',
      },
      {
        term: 'Alveolar pores and the respiratory membrane',
        resort: 'Connecting Suites',
        body: '**Alveolar pores** link neighbouring alveoli and **equalize pressure** between them. The **respiratory membrane** (alveolar wall + capillary wall) is only about **0.5 µm thick**, so diffusion is fast.',
      },
    ],
    glance: [
      { value: '~480 million', label: 'alveoli in both lungs' },
      { value: '~0.5 µm', label: 'thickness of the respiratory membrane' },
    ],
    tip: 'Flip the Surfactant Switch above to see why premature babies, who haven’t made enough surfactant yet, can struggle to breathe.',
    quiz: {
      question: 'What do type II alveolar cells secrete?',
      options: [
        {
          text: 'Pulmonary surfactant',
          correct: true,
          why: 'Correct. Surfactant lowers surface tension so the alveoli stay open instead of collapsing on exhale.',
        },
        {
          text: 'Mucus',
          why: 'Not quite. Mucus is made by goblet cells in the conducting airways, not in the alveoli.',
        },
        {
          text: 'Hemoglobin',
          why: 'Not quite. Hemoglobin is the oxygen-carrying protein inside red blood cells.',
        },
        {
          text: 'Carbon dioxide',
          why: 'Not quite. CO₂ is a waste product of cellular respiration that diffuses into the alveoli from the blood.',
        },
      ],
    },
    diagram: 'alveoli',
    diagramCaption: 'A cluster of alveoli wrapped in capillaries, and a close-up of one alveolus showing its cells.',
    ride: 'surfactant',
  },

  /* ---------------------------------------------------------------- 7b */
  {
    slug: 'gas-exchange',
    number: 7,
    sub: true,
    code: '7b',
    term: 'Gas exchange',
    attraction: 'The Great Exchange Market',
    pitch: 'Where every trade happens: oxygen in, carbon dioxide out, no haggling required.',
    intro:
      'Gas exchange happens by **simple diffusion**: each gas moves from where its **partial pressure** is higher to where it is lower. No energy (ATP) is needed.',
    zone: 'respiratory',
    progress: 6,
    cards: [
      {
        term: 'Diffusion down partial-pressure gradients',
        resort: 'The Trading Floor',
        body: '**O₂ moves from the alveolus into the blood** (partial pressure of O₂: about 104 mm Hg in the alveolus vs 40 mm Hg in arriving blood). **CO₂ moves from the blood into the alveolus** (about 45 mm Hg in arriving blood vs 40 mm Hg in the alveolus).',
      },
      {
        term: 'Oxygen transport',
        resort: 'Hemoglobin Shuttle',
        body: 'About **98.5% of O₂ is bound to hemoglobin** in red blood cells (up to **4 O₂ per hemoglobin**). Only about **1.5% is dissolved** in plasma.',
      },
      {
        term: 'Carbonic anhydrase and the chloride shift',
        resort: 'The Currency Exchange',
        body: 'In red blood cells, the enzyme **carbonic anhydrase** speeds up **CO₂ + H₂O → H₂CO₃ → H⁺ + HCO₃⁻**. As bicarbonate leaves the cell, chloride ions move in (the **chloride shift**) to keep the charge balanced. In the lungs, it all runs in reverse to release CO₂.',
      },
      {
        term: 'Bohr effect',
        resort: 'The Generous Discount',
        body: 'When **pH is lower** (more CO₂ and H⁺, like in hard-working muscles), **hemoglobin releases more O₂**. Busy tissues automatically get extra oxygen.',
      },
    ],
    glance: [
      { value: '98.5%', label: 'of O₂ rides on hemoglobin' },
      { value: '~70%', label: 'of CO₂ travels as bicarbonate' },
    ],
    tip: 'Diffusion is free: no ATP is spent. Every trade at the market happens because of a difference in partial pressure.',
    quiz: {
      question: 'How is most carbon dioxide carried in the blood?',
      options: [
        {
          text: 'As bicarbonate ions (HCO₃⁻), about 70%',
          correct: true,
          why: 'Correct. Carbonic anhydrase in red blood cells turns CO₂ and water into carbonic acid, which splits into H⁺ and HCO₃⁻.',
        },
        {
          text: 'Bound to hemoglobin as carbaminohemoglobin, about 70%',
          why: 'Not quite. Carbaminohemoglobin carries only about 20% of CO₂.',
        },
        {
          text: 'Dissolved directly in plasma, about 70%',
          why: 'Not quite. Only about 7–10% of CO₂ is dissolved in plasma.',
        },
        {
          text: 'Attached to the same site on hemoglobin as oxygen',
          why: 'Not quite. CO₂ binds to the protein part of hemoglobin (globin), not to the iron where oxygen binds.',
        },
      ],
    },
    diagram: 'rbc',
    diagramCaption: 'Inside a red blood cell in body tissues: carbonic anhydrase makes bicarbonate, and the chloride shift balances the charge.',
    ride: 'gas',
  },

  /* ---------------------------------------------------------------- 8 */
  {
    slug: 'diaphragm',
    number: 8,
    code: '8',
    term: 'Diaphragm',
    attraction: 'The Diaphragm Drop Tower',
    pitch: 'Our thrill ride, powered by physics: drop the floor, expand the chest, and the air rushes in.',
    intro:
      'The **diaphragm** is a dome-shaped sheet of **skeletal muscle** under the lungs. With the **intercostal muscles** between the ribs, it changes the volume of the chest, and **Boyle’s law** does the rest.',
    zone: 'ventilation',
    progress: 7,
    cards: [
      {
        term: 'Boyle’s law: P₁V₁ = P₂V₂',
        resort: 'The Ride’s Physics',
        body: 'At a constant temperature, the **pressure of a gas is inversely proportional to its volume**. Make the chest bigger and the pressure inside drops; make it smaller and the pressure rises.',
      },
      {
        term: 'Inhalation (active)',
        resort: 'The Drop',
        body: 'The **diaphragm contracts and flattens**, and the **external intercostals** lift the ribs **up and out**. Thoracic **volume increases**, so **intra-alveolar pressure falls below atmospheric pressure** and air flows in.',
      },
      {
        term: 'Exhalation (quiet = passive; forced = active)',
        resort: 'The Gentle Return',
        body: 'In quiet breathing, the muscles **relax** and the lungs **recoil elastically**, so volume falls, pressure rises and air flows out. In **forced exhalation**, the **internal intercostals** and **abdominal muscles** contract to push air out faster.',
      },
      {
        term: 'Pleura',
        resort: 'The Safety Harness',
        body: 'Each lung is wrapped in the **visceral pleura**, and the chest wall is lined by the **parietal pleura**, with **pleural fluid** between them. **Intrapleural pressure** stays about **4 mm Hg lower** (≈ −4 mm Hg), which keeps the lungs stuck to the chest wall.',
      },
    ],
    glance: [
      { value: '760 mm Hg', label: 'atmospheric pressure at sea level' },
      { value: '≈ −4 mm Hg', label: 'intrapleural pressure' },
    ],
    tip: 'The ride works because the lungs follow the chest wall. If air gets into the pleural space (a collapsed lung), the harness lets go.',
    quiz: {
      question: 'What happens to the pressure in the lungs when the diaphragm contracts?',
      options: [
        {
          text: 'Chest volume increases, so lung pressure decreases and air flows in (Boyle’s law)',
          correct: true,
          why: 'Correct. Pressure and volume are inversely related. Bigger volume means lower pressure, so air moves in from the higher-pressure atmosphere.',
        },
        {
          text: 'Chest volume increases, so lung pressure increases and air flows out',
          why: 'Not quite. Under Boyle’s law, a larger volume gives a lower pressure, not a higher one.',
        },
        {
          text: 'Chest volume decreases, so lung pressure decreases',
          why: 'Not quite. A contracting diaphragm flattens and moves down, which makes the chest bigger.',
        },
        {
          text: 'Nothing changes; the lungs inflate themselves with their own muscles',
          why: 'Not quite. The lungs have no muscles to inflate themselves; they follow the chest wall because of the pleura.',
        },
      ],
    },
    diagram: 'diaphragm',
    diagramCaption: 'The pleura: two layers with a thin film of fluid between them, holding each lung against the chest wall.',
    ride: 'diaphragm',
  },

  /* ---------------------------------------------------------------- Concierge */
  {
    slug: 'concierge',
    number: null,
    code: 'Bonus',
    term: 'Control of breathing',
    attraction: 'The Concierge Desk',
    pitch: 'Our concierge never sleeps. It sets your breathing rhythm, all day and all night, without being asked.',
    intro:
      'Breathing is **automatic**. The **brainstem** sets the rhythm without you thinking about it (involuntary, or autonomic, control), although the cerebral cortex can override it for a short time, like when you hold your breath.',
    zone: 'bonus',
    progress: 8,
    cards: [
      {
        term: 'Medulla oblongata',
        resort: 'The Head Concierge',
        body: 'The **ventral respiratory group (VRG)** sets the basic **rhythm**, sending signals to the **diaphragm and external intercostals**. The **dorsal respiratory group (DRG)** **integrates** input from **stretch receptors** and **chemoreceptors**.',
      },
      {
        term: 'Pons',
        resort: 'The Assistant Managers',
        body: 'The **apneustic centre** controls the **depth** of breathing. The **pneumotaxic centre** **limits inspiration** and helps set the **rate**.',
      },
      {
        term: 'Central chemoreceptors',
        resort: 'The In-House Sensors',
        body: 'Located in the **brainstem**. They detect **H⁺ produced from CO₂** in the fluid around the brain. Rising CO₂ is the strongest signal to breathe more.',
      },
      {
        term: 'Peripheral chemoreceptors',
        resort: 'The Field Scouts',
        body: 'Found in the **carotid arteries** and the **aortic arch**. They sense **H⁺** and **large drops in O₂**. Rising CO₂ or falling O₂ leads to **faster, deeper breathing**.',
      },
    ],
    glance: [
      { value: 'CO₂', label: 'is the main driver of breathing rate' },
      { value: '24/7', label: 'automatic rhythm from the medulla' },
    ],
    tip: 'You can only hold your breath for so long. As CO₂ builds up, the chemoreceptors make the urge to breathe impossible to ignore.',
    quiz: {
      question: 'Which part of the brain sets the basic rhythm of breathing?',
      options: [
        {
          text: 'The ventral respiratory group in the medulla oblongata',
          correct: true,
          why: 'Correct. The VRG in the medulla generates the rhythm and sends signals to the diaphragm and external intercostals.',
        },
        {
          text: 'The cerebral cortex',
          why: 'Not quite. The cortex allows voluntary control (like holding your breath), but the automatic rhythm comes from the brainstem.',
        },
        {
          text: 'The carotid arteries',
          why: 'Not quite. The carotid arteries hold peripheral chemoreceptors that sense the blood; they don’t set the rhythm.',
        },
        {
          text: 'The pneumotaxic centre alone',
          why: 'Not quite. The pneumotaxic centre in the pons fine-tunes the rate by limiting inspiration, but the medulla sets the rhythm.',
        },
      ],
    },
    diagram: 'brainstem',
    diagramCaption: 'The brainstem’s breathing centres and where the chemoreceptors are located.',
    ride: 'chemo',
  },

  /* ---------------------------------------------------------------- Check-out */
  {
    slug: 'check-out',
    number: null,
    code: 'Bonus',
    term: 'Exhalation route',
    attraction: 'Check-out',
    pitch: 'Thank you for staying with us. Here is your express route home.',
    intro:
      'On the way out, air retraces the route in reverse: **alveoli → bronchioles → bronchi → trachea → larynx → pharynx → nasal cavity → out**. In quiet breathing, the trip home is **passive**: the diaphragm relaxes and the lungs recoil.',
    zone: 'bonus',
    progress: 8,
    cards: [
      {
        term: 'Carbon dioxide',
        resort: 'Your Souvenir',
        body: '**CO₂**, the waste product of **cellular respiration**, picked up at the Great Exchange Market and carried out with every exhale.',
      },
      {
        term: 'Water vapour',
        resort: 'Some Moisture',
        body: 'Exhaled air carries **water vapour**. The **nasal conchae** recapture part of it on the way out, so the lodge doesn’t dry out.',
      },
      {
        term: 'Your voice',
        resort: 'A Parting Song',
        body: 'Speech happens on the way out: **exhaled air** vibrates the **true vocal cords** in the larynx.',
      },
    ],
    glance: [
      { value: '8', label: 'structures on the route home' },
      { value: 'Passive', label: 'quiet exhalation uses no muscle contraction' },
    ],
    tip: 'Late check-out is never available. You’ll be back with your next breath, about 3 to 5 seconds from now.',
    quiz: {
      question: 'Which list shows the correct exhalation route?',
      options: [
        {
          text: 'Alveoli → bronchioles → bronchi → trachea → larynx → pharynx → nasal cavity',
          correct: true,
          why: 'Correct. Exhaled air follows the inhalation route in exact reverse.',
        },
        {
          text: 'Alveoli → bronchi → bronchioles → larynx → trachea → pharynx → nasal cavity',
          why: 'Not quite. Bronchioles come before bronchi on the way out, and the trachea comes before the larynx.',
        },
        {
          text: 'Alveoli → trachea → bronchioles → bronchi → pharynx → larynx → nasal cavity',
          why: 'Not quite. Air passes through the bronchioles and bronchi before reaching the trachea.',
        },
        {
          text: 'Bronchi → alveoli → bronchioles → trachea → larynx → pharynx → nasal cavity',
          why: 'Not quite. The alveoli are the deepest point, so the route home starts there.',
        },
      ],
    },
    diagram: 'checkout',
    diagramCaption: 'The exhalation route, numbered in the order air leaves the body.',
  },

  /* ---------------------------------------------------------------- Advisories */
  {
    slug: 'advisories',
    number: null,
    code: 'Bonus',
    term: 'Health conditions',
    attraction: 'Travel Advisories',
    pitch: 'Please review before you travel. Some stops can be affected by the conditions below.',
    intro:
      'Most guests enjoy a smooth stay, but some conditions change how the resort works. Each advisory lists the stops it affects. **Alvea is a smoke- and vape-free resort.**',
    zone: 'bonus',
    progress: 8,
    cards: [
      {
        term: 'Asthma',
        resort: 'Advisory for Stops 5–6',
        body: 'Chronic **inflammation** of the airways plus **bronchoconstriction**: the smooth muscle of the bronchioles tightens and extra mucus is made, so airflow drops. **Bronchodilator** inhalers relax the muscle.',
      },
      {
        term: 'COPD / emphysema',
        resort: 'Advisory for Stop 7',
        body: 'The **alveolar walls break down**, merging small alveoli into larger, floppier sacs. **Surface area drops**, so less gas exchange happens. **Smoking is the most common cause.**',
      },
      {
        term: 'Neonatal respiratory distress syndrome',
        resort: 'Advisory for Stop 7',
        body: '**Premature babies** may not yet have enough **surfactant** from their type II cells. Without it, surface tension makes the alveoli **collapse** after each breath, so breathing takes huge effort.',
      },
    ],
    glance: [
      { value: '#1', label: 'cause of COPD: smoking' },
      { value: '0', label: 'smoking or vaping areas at Alvea' },
    ],
    tip: 'Smoking and vaping damage the cilia, inflame the airways and break down alveoli. Protect the resort; it’s the only one you get.',
    quiz: {
      question: 'Why does emphysema make breathing less effective?',
      options: [
        {
          text: 'Alveolar walls break down, so there is less surface area for gas exchange',
          correct: true,
          why: 'Correct. Fewer, larger air sacs have much less total surface area, so less O₂ and CO₂ can diffuse.',
        },
        {
          text: 'The tracheal rings soften and the trachea collapses',
          why: 'Not quite. Emphysema affects the alveoli (Stop 7), not the trachea.',
        },
        {
          text: 'The epiglottis stays shut',
          why: 'Not quite. Emphysema has nothing to do with the epiglottis.',
        },
        {
          text: 'Too much surfactant is produced',
          why: 'Not quite. A lack of surfactant is the problem in neonatal respiratory distress syndrome, not emphysema.',
        },
      ],
    },
    diagram: 'advisories',
    diagramCaption: 'Healthy vs affected structures for each advisory.',
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

/** The 8 numbered stops in anatomical order (for the map and the progress bar) */
export const numberedStops = tourStops.filter((s) => s.number !== null && !s.sub)
