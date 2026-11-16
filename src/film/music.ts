/**
 * Calm spa music for the tour film, generated live with Web Audio.
 * Soft pad chords + a sine bass + occasional bell notes, through a gentle reverb.
 * Nothing to download, no licensing.
 */

const mtof = (m: number) => 440 * 2 ** ((m - 69) / 12)

/** D major, slow: Dmaj9 · Bm9 · Gmaj9 · Asus2 (MIDI notes) */
const CHORDS = [
  [50, 54, 57, 61, 64],
  [47, 50, 54, 57, 61],
  [43, 47, 50, 54, 57],
  [45, 52, 57, 59, 64],
]
const CHORD_LEN = 8 // seconds per chord
/** D major pentatonic, high and soft */
const BELLS = [74, 76, 78, 81, 83, 86]
const VOLUME = 0.16

export class AmbientMusic {
  private ctx: AudioContext | null = null
  private master!: GainNode
  private bus!: GainNode
  private timer = 0
  private nextChord = 0
  private chordIdx = 0
  private nextBell = 0
  private wanted = false
  private onVis = () => this.sync()

  private init() {
    const Ctx = window.AudioContext ?? (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext
    const ctx = new Ctx()
    this.ctx = ctx

    this.master = ctx.createGain()
    this.master.gain.value = 0
    this.master.connect(ctx.destination)

    const tone = ctx.createBiquadFilter()
    tone.type = 'lowpass'
    tone.frequency.value = 1600
    tone.Q.value = 0.3
    tone.connect(this.master)

    // reverb: decaying noise impulse
    const len = ctx.sampleRate * 3.5
    const ir = ctx.createBuffer(2, len, ctx.sampleRate)
    for (let c = 0; c < 2; c++) {
      const d = ir.getChannelData(c)
      for (let i = 0; i < len; i++) d[i] = (Math.random() * 2 - 1) * (1 - i / len) ** 3
    }
    const verb = ctx.createConvolver()
    verb.buffer = ir
    const wet = ctx.createGain()
    wet.gain.value = 0.55
    verb.connect(wet).connect(tone)

    this.bus = ctx.createGain()
    this.bus.connect(tone)
    this.bus.connect(verb)

    this.nextChord = ctx.currentTime + 0.05
    this.nextBell = ctx.currentTime + 3
    document.addEventListener('visibilitychange', this.onVis)
  }

  private voice(freq: number, start: number, dur: number, peak: number, attack: number, release: number, type: OscillatorType, detune = 0) {
    const ctx = this.ctx!
    const osc = ctx.createOscillator()
    osc.type = type
    osc.frequency.value = freq
    osc.detune.value = detune
    const g = ctx.createGain()
    g.gain.setValueAtTime(0, start)
    g.gain.linearRampToValueAtTime(peak, start + attack)
    g.gain.setValueAtTime(peak, start + dur)
    g.gain.exponentialRampToValueAtTime(0.0001, start + dur + release)
    osc.connect(g).connect(this.bus)
    osc.start(start)
    osc.stop(start + dur + release + 0.1)
  }

  /** schedule notes up to 1.5 s ahead */
  private tick = () => {
    const ctx = this.ctx
    if (!ctx || ctx.state !== 'running') return
    const horizon = ctx.currentTime + 1.5
    while (this.nextChord < horizon) {
      const t = this.nextChord
      const chord = CHORDS[this.chordIdx % CHORDS.length]
      chord.forEach((m, i) => {
        const f = mtof(m)
        this.voice(f, t + i * 0.12, CHORD_LEN - 2, 0.05, 2.5, 3.5, 'triangle', -6)
        this.voice(f, t + i * 0.12, CHORD_LEN - 2, 0.04, 2.5, 3.5, 'sine', 7)
      })
      this.voice(mtof(chord[0] - 12), t, CHORD_LEN - 1.5, 0.11, 1.5, 2.5, 'sine')
      this.chordIdx++
      this.nextChord += CHORD_LEN
    }
    while (this.nextBell < horizon) {
      if (Math.random() < 0.7) {
        const m = BELLS[Math.floor(Math.random() * BELLS.length)]
        this.voice(mtof(m), this.nextBell, 0.05, 0.035, 0.01, 2.8, 'sine')
        this.voice(mtof(m) * 2, this.nextBell, 0.05, 0.008, 0.01, 1.4, 'sine')
      }
      this.nextBell += 1.6 + Math.random() * 2.4
    }
  }

  /** run only while wanted and the tab is visible; fade in/out */
  private sync() {
    const ctx = this.ctx
    if (!ctx) return
    const on = this.wanted && !document.hidden
    const now = ctx.currentTime
    this.master.gain.cancelScheduledValues(now)
    this.master.gain.setValueAtTime(this.master.gain.value, now)
    if (on) {
      ctx.resume().then(() => {
        this.master.gain.linearRampToValueAtTime(VOLUME, ctx.currentTime + 1.5)
        this.tick()
      })
      if (!this.timer) this.timer = window.setInterval(this.tick, 250)
    } else {
      this.master.gain.linearRampToValueAtTime(0, now + 0.6)
      window.clearInterval(this.timer)
      this.timer = 0
      window.setTimeout(() => {
        if (!(this.wanted && !document.hidden) && ctx.state === 'running') ctx.suspend()
      }, 700)
    }
  }

  play() {
    if (!this.ctx) this.init()
    this.wanted = true
    this.sync()
  }

  pause() {
    this.wanted = false
    this.sync()
  }

  dispose() {
    this.wanted = false
    window.clearInterval(this.timer)
    document.removeEventListener('visibilitychange', this.onVis)
    this.ctx?.close()
    this.ctx = null
  }
}
