/**
 * Guide videos for the stop pages (resort map), keyed by stop slug.
 * To add one: drop the file in public/videos and add a line here.
 */
export interface GuideVideo {
  src: string
  poster: string
  /** who is speaking, shown in the player bar */
  guide: string
  /** filmed upright on a phone: player uses a tall frame */
  portrait?: boolean
}

export const stopVideos: Record<string, GuideVideo> = {
  'nasal-cavity': { src: '/videos/stop-1.mp4', poster: '/videos/stop-1-poster.jpg', guide: 'Tawfic' },
  pharynx: { src: '/videos/stop-2.mp4', poster: '/videos/stop-2-poster.jpg', guide: 'Tawfic' },
  larynx: { src: '/videos/stop-3.mp4', poster: '/videos/stop-3-poster.jpg', guide: 'Max' },
  trachea: { src: '/videos/stop-4.mp4', poster: '/videos/stop-4-poster.jpg', guide: 'Max' },
  bronchi: { src: '/videos/stop-5.mp4', poster: '/videos/stop-5-poster.jpg', guide: 'Max' },
  bronchioles: { src: '/videos/stop-6.mp4', poster: '/videos/stop-6-poster.jpg', guide: 'Oliver', portrait: true },
  alveoli: { src: '/videos/stop-7.mp4', poster: '/videos/stop-7-poster.jpg', guide: 'Oliver', portrait: true },
  diaphragm: { src: '/videos/stop-8.mp4', poster: '/videos/stop-8-poster.jpg', guide: 'Oliver', portrait: true },
}
