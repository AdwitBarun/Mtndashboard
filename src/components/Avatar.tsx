interface AvatarProps {
  initials: string
  color?: string
  size?: "xs" | "sm" | "md" | "lg" | "xl"
  className?: string
}

const SIZES = {
  xs: { wh: 24, font: 9 },
  sm: { wh: 32, font: 12 },
  md: { wh: 40, font: 14 },
  lg: { wh: 48, font: 17 },
  xl: { wh: 64, font: 22 },
}

export default function Avatar({
  initials,
  color = "#7C3AED",
  size = "md",
  className = "",
}: AvatarProps) {
  const s = SIZES[size]
  return (
    <div
      className={`rounded-full flex items-center justify-center shrink-0 font-bold text-white select-none leading-none ${className}`}
      style={{
        width: s.wh,
        height: s.wh,
        backgroundColor: color,
        fontSize: s.font,
      }}
    >
      {initials.slice(0, 2).toUpperCase()}
    </div>
  )
}
