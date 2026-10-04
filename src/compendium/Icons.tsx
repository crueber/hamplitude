import type { IconName } from './taxonomy'

const P: Record<IconName, string> = {
  hobby: 'M12 21s-7-4.4-7-10a4 4 0 0 1 7-2.6A4 4 0 0 1 19 11c0 5.6-7 10-7 10z',
  radio: 'M2 12c2.5 0 2.5-7 5-7s2.5 14 5 14 2.5-14 5-14 2.5 7 5 7',
  electronics: 'M7 7h10v10H7zM10 3v4M14 3v4M10 17v4M14 17v4M3 10h4M3 14h4M17 10h4M17 14h4',
  antennas: 'M12 21V8M7 3l5 5 5-5M8 21h8M5 7a8 8 0 0 0 0 7M19 7a8 8 0 0 1 0 7',
  stations: 'M3 8h18v11H3zM7 8V5M10 14h.01M14 14h4M6 12h4',
  modes: 'M12 3a3 3 0 0 0-3 3v6a3 3 0 0 0 6 0V6a3 3 0 0 0-3-3zM5 11a7 7 0 0 0 14 0M12 18v3',
  activities: 'M5 21V4M5 4h11l-2 4 2 4H5',
  emergency: 'M12 3l8 3v6c0 5-3.5 8-8 9-4.5-1-8-4-8-9V6zM12 8v6M9 11h6',
  safety: 'M12 3l10 18H2zM12 10v5M12 18h.01',
  reference: 'M5 4h11a3 3 0 0 1 3 3v13H8a3 3 0 0 1-3-3zM5 17a3 3 0 0 1 3-3h11',
}

export function SectionIcon({ name, size = 20 }: { name: IconName; size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.9} strokeLinecap="round" strokeLinejoin="round" aria-hidden>
      <path d={P[name]} />
    </svg>
  )
}
