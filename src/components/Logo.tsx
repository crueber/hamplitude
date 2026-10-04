export function LogoMark({ size = 34 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 64 64" aria-hidden>
      <rect width="64" height="64" rx="15" fill="#0b1218" />
      <path d="M6 34 C14 34 14 14 22 14 S30 50 38 50 S46 20 52 20 58 34 60 34" fill="none" stroke="#2dd4bf" strokeWidth="5" strokeLinecap="round" />
      <circle cx="22" cy="14" r="4" fill="#fbbf24" />
    </svg>
  )
}
