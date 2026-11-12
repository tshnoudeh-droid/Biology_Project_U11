import type { SVGProps } from 'react'

/** Simple stroke icons, 24×24, currentColor. Decorative by default. */
function Icon(props: SVGProps<SVGSVGElement>) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.7"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      focusable="false"
      {...props}
    />
  )
}

export const IconArrowRight = (p: SVGProps<SVGSVGElement>) => (
  <Icon {...p}><path d="M5 12h14M13 6l6 6-6 6" /></Icon>
)
export const IconArrowLeft = (p: SVGProps<SVGSVGElement>) => (
  <Icon {...p}><path d="M19 12H5M11 6l-6 6 6 6" /></Icon>
)
export const IconPlay = (p: SVGProps<SVGSVGElement>) => (
  <Icon {...p}><path d="M7 5v14l12-7z" /></Icon>
)
export const IconStop = (p: SVGProps<SVGSVGElement>) => (
  <Icon {...p}><rect x="6" y="6" width="12" height="12" rx="2" /></Icon>
)
export const IconPhone = (p: SVGProps<SVGSVGElement>) => (
  <Icon {...p}><path d="M5 4h4l2 5-2.5 1.5a11 11 0 0 0 5 5L15 13l5 2v4a2 2 0 0 1-2 2A16 16 0 0 1 3 6a2 2 0 0 1 2-2z" /></Icon>
)
export const IconMail = (p: SVGProps<SVGSVGElement>) => (
  <Icon {...p}><rect x="3" y="5" width="18" height="14" rx="2" /><path d="M3 7l9 6 9-6" /></Icon>
)
export const IconGlobe = (p: SVGProps<SVGSVGElement>) => (
  <Icon {...p}><circle cx="12" cy="12" r="9" /><path d="M3 12h18M12 3a14 14 0 0 1 0 18M12 3a14 14 0 0 0 0 18" /></Icon>
)
export const IconPin = (p: SVGProps<SVGSVGElement>) => (
  <Icon {...p}><path d="M12 21s-7-6.2-7-12a7 7 0 0 1 14 0c0 5.8-7 12-7 12z" /><circle cx="12" cy="9" r="2.5" /></Icon>
)
export const IconAt = (p: SVGProps<SVGSVGElement>) => (
  <Icon {...p}><circle cx="12" cy="12" r="4" /><path d="M16 12v1.5a2.5 2.5 0 0 0 5 0V12a9 9 0 1 0-3.5 7.1" /></Icon>
)
export const IconLeaf = (p: SVGProps<SVGSVGElement>) => (
  <Icon {...p}><path d="M5 19c0-8 6-14 15-14 0 9-6 15-14 15" /><path d="M5 19l8-8" /></Icon>
)
export const IconO2 = (p: SVGProps<SVGSVGElement>) => (
  <Icon {...p}><circle cx="9" cy="12" r="5" /><circle cx="17.5" cy="15.5" r="3" /><path d="M9 9.5v5" opacity="0" /></Icon>
)
export const IconExit = (p: SVGProps<SVGSVGElement>) => (
  <Icon {...p}><path d="M14 4h5v16h-5" /><path d="M10 8l-4 4 4 4M6 12h10" /></Icon>
)
export const IconBalance = (p: SVGProps<SVGSVGElement>) => (
  <Icon {...p}><path d="M12 4v16M7 20h10M4 8h16" /><path d="M6 8l-3 6a3 3 0 0 0 6 0zM18 8l-3 6a3 3 0 0 0 6 0z" /></Icon>
)
export const IconNose = (p: SVGProps<SVGSVGElement>) => (
  <Icon {...p}><path d="M12 3c0 6-4 9-4 12a3 3 0 0 0 3 3h2a3 3 0 0 0 3-3c0-3-4-6-4-12z" /><path d="M10 17h.01M14 17h.01" /></Icon>
)
export const IconWave = (p: SVGProps<SVGSVGElement>) => (
  <Icon {...p}><path d="M3 12h2M7 8v8M11 5v14M15 8v8M19 10v4M21 12h0" /></Icon>
)
export const IconCheck = (p: SVGProps<SVGSVGElement>) => (
  <Icon {...p}><path d="M5 12.5l4.5 4.5L19 7" /></Icon>
)
export const IconX = (p: SVGProps<SVGSVGElement>) => (
  <Icon {...p}><path d="M6 6l12 12M18 6L6 18" /></Icon>
)
export const IconAlert = (p: SVGProps<SVGSVGElement>) => (
  <Icon {...p}><path d="M12 3l9.5 17h-19z" /><path d="M12 10v4M12 17h.01" /></Icon>
)
export const IconSpark = (p: SVGProps<SVGSVGElement>) => (
  <Icon {...p}><path d="M12 3v4M12 17v4M3 12h4M17 12h4M6 6l2.5 2.5M15.5 15.5L18 18M6 18l2.5-2.5M15.5 8.5L18 6" /></Icon>
)
export const IconMap = (p: SVGProps<SVGSVGElement>) => (
  <Icon {...p}><path d="M9 4L3 6v14l6-2 6 2 6-2V4l-6 2z" /><path d="M9 4v14M15 6v14" /></Icon>
)
export const IconMenu = (p: SVGProps<SVGSVGElement>) => (
  <Icon {...p}><path d="M4 7h16M4 12h16M4 17h16" /></Icon>
)
export const IconBan = (p: SVGProps<SVGSVGElement>) => (
  <Icon {...p}><circle cx="12" cy="12" r="9" /><path d="M5.6 5.6l12.8 12.8" /></Icon>
)
