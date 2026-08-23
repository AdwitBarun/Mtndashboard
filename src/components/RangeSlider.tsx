import { useRef, useCallback } from "react"

interface RangeSliderProps {
  min: number
  max: number
  value: [number, number]
  onChange: (value: [number, number]) => void
  label?: string
  unit?: string
  maxLabel?: string
}

export default function RangeSlider({
  min,
  max,
  value,
  onChange,
  label,
  unit = "",
  maxLabel,
}: RangeSliderProps) {
  const trackRef = useRef<HTMLDivElement>(null)

  const getPercent = (val: number) => ((val - min) / (max - min)) * 100

  const getValueFromEvent = useCallback(
    (clientX: number): number => {
      const track = trackRef.current
      if (!track) return min
      const rect = track.getBoundingClientRect()
      const pct = Math.max(0, Math.min(1, (clientX - rect.left) / rect.width))
      return Math.round(min + pct * (max - min))
    },
    [min, max],
  )

  function startDrag(thumb: "lo" | "hi") {
    const onMove = (e: MouseEvent | TouchEvent) => {
      const clientX = "touches" in e ? e.touches[0].clientX : e.clientX
      const v = getValueFromEvent(clientX)
      if (thumb === "lo") onChange([Math.min(v, value[1] - 1), value[1]])
      else onChange([value[0], Math.max(v, value[0] + 1)])
    }
    const onUp = () => {
      window.removeEventListener("mousemove", onMove)
      window.removeEventListener("touchmove", onMove)
      window.removeEventListener("mouseup", onUp)
      window.removeEventListener("touchend", onUp)
    }
    window.addEventListener("mousemove", onMove)
    window.addEventListener("touchmove", onMove)
    window.addEventListener("mouseup", onUp)
    window.addEventListener("touchend", onUp)
  }

  const loP = getPercent(value[0])
  const hiP = getPercent(value[1])

  return (
    <div className="flex flex-col gap-1.5">
      {label && (
        <div className="flex justify-between items-center">
          <span className="text-xs font-medium" style={{ color: "#6B7280" }}>
            {label}
          </span>
          <span className="text-xs font-semibold" style={{ color: "#1F2937" }}>
            {value[0]}
            {unit} –{" "}
            {value[1] === max
              ? (maxLabel ?? `${value[1]}${unit}`)
              : `${value[1]}${unit}`}
          </span>
        </div>
      )}
      <div className="relative h-5 flex items-center" ref={trackRef}>
        {/* Track background */}
        <div
          className="absolute inset-x-0 h-1.5 rounded-full"
          style={{ background: "#E2E2E6" }}
        />
        {/* Active range */}
        <div
          className="absolute h-1.5 rounded-full"
          style={{
            left: `${loP}%`,
            width: `${hiP - loP}%`,
            background: "#7C3AED",
          }}
        />
        {/* Lo thumb */}
        <div
          className="absolute w-4 h-4 rounded-full border-2 border-white cursor-grab active:cursor-grabbing shadow-sm"
          style={{
            left: `${loP}%`,
            transform: "translateX(-50%)",
            background: "#7C3AED",
            touchAction: "none",
          }}
          onMouseDown={() => startDrag("lo")}
          onTouchStart={() => startDrag("lo")}
        />
        {/* Hi thumb */}
        <div
          className="absolute w-4 h-4 rounded-full border-2 border-white cursor-grab active:cursor-grabbing shadow-sm"
          style={{
            left: `${hiP}%`,
            transform: "translateX(-50%)",
            background: "#7C3AED",
            touchAction: "none",
          }}
          onMouseDown={() => startDrag("hi")}
          onTouchStart={() => startDrag("hi")}
        />
      </div>
    </div>
  )
}
