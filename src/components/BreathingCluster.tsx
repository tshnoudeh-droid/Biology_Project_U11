/**
 * Hero art: a bronchiole that branches into grape-like clusters of alveoli.
 * The whole cluster "breathes" (scale 1 → 1.06 → 1 on a 5 s loop).
 */
export function BreathingCluster() {
  // alveolus circles: [cx, cy, r, fill]
  const sacs: [number, number, number, string][] = [
    // left cluster
    [118, 168, 30, '#E3735E'], [86, 132, 24, '#F4D5CC'], [146, 120, 22, '#F4D5CC'], [104, 88, 18, '#E3735E'],
    [70, 182, 18, '#F4D5CC'], [150, 196, 16, '#F4D5CC'], [60, 100, 13, '#E3735E'], [138, 76, 12, '#F4D5CC'],
    // right cluster
    [302, 150, 32, '#E3735E'], [338, 112, 22, '#F4D5CC'], [270, 106, 24, '#F4D5CC'], [306, 70, 18, '#E3735E'],
    [346, 180, 18, '#F4D5CC'], [262, 186, 15, '#F4D5CC'], [356, 72, 12, '#E3735E'], [272, 60, 11, '#F4D5CC'],
    // top cluster
    [210, 92, 30, '#F4D5CC'], [184, 54, 20, '#E3735E'], [238, 50, 22, '#E3735E'], [210, 18, 14, '#F4D5CC'],
    [176, 112, 13, '#E3735E'], [246, 116, 14, '#E3735E'],
  ]
  return (
    <svg
      className="breathing-cluster"
      viewBox="0 0 420 420"
      role="img"
      aria-label="Illustration of a bronchiole branching into clusters of alveoli that gently expand and relax, like breathing"
    >
      <defs>
        <radialGradient id="bc-glow" cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor="#E3735E" stopOpacity="0.22" />
          <stop offset="100%" stopColor="#E3735E" stopOpacity="0" />
        </radialGradient>
      </defs>
      <circle cx="210" cy="170" r="200" fill="url(#bc-glow)" className="breathing-cluster__glow" />
      <g className="breathing-cluster__body">
        {/* branches */}
        <g fill="none" stroke="#F4D5CC" strokeLinecap="round">
          <path d="M210 410 C210 350 204 300 210 250" strokeWidth="9" />
          <path d="M210 290 C170 270 136 236 120 196" strokeWidth="6" />
          <path d="M210 290 C252 270 288 230 300 184" strokeWidth="6" />
          <path d="M208 252 C208 200 210 160 210 122" strokeWidth="5" />
          <path d="M150 232 C120 226 96 210 78 190" strokeWidth="3.5" />
          <path d="M272 226 C300 222 328 206 344 186" strokeWidth="3.5" />
        </g>
        {sacs.map(([cx, cy, r, fill], i) => (
          <circle key={i} cx={cx} cy={cy} r={r} fill={fill} />
        ))}
        {/* capillary hint */}
        <g fill="none" stroke="#7FA7D9" strokeWidth="1.6" opacity="0.55" strokeLinecap="round">
          <path d="M40 230 C90 250 140 240 170 252" />
          <path d="M380 220 C330 244 290 238 252 250" />
        </g>
      </g>
      {/* drifting O2 */}
      <g className="breathing-cluster__o2" fill="#FBFCFB">
        <circle cx="120" cy="250" r="3" />
        <circle cx="300" cy="240" r="2.5" />
        <circle cx="210" cy="200" r="2" />
        <circle cx="160" cy="300" r="2" />
        <circle cx="262" cy="310" r="3" />
      </g>
    </svg>
  )
}
