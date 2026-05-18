import { cn } from '@/lib/utils'

const sizeClass = {
  sm: 'w-[178px]',
  md: 'w-[210px]',
  lg: 'w-[236px]',
}

const segments = [
  { start: -180, end: -132, color: 'var(--risk-low)' },
  { start: -130, end: -92, color: 'var(--risk-medium)' },
  { start: -90, end: -52, color: 'var(--chart-3)' },
  { start: -50, end: 0, color: 'var(--risk-high)' },
]

function polarToCartesian(centerX, centerY, radius, angleInDegrees) {
  const angleInRadians = (angleInDegrees * Math.PI) / 180

  return {
    x: centerX + radius * Math.cos(angleInRadians),
    y: centerY + radius * Math.sin(angleInRadians),
  }
}

function describeArc(centerX, centerY, radius, startAngle, endAngle) {
  const start = polarToCartesian(centerX, centerY, radius, startAngle)
  const end = polarToCartesian(centerX, centerY, radius, endAngle)
  const largeArcFlag = endAngle - startAngle <= 180 ? '0' : '1'

  return [
    'M',
    start.x,
    start.y,
    'A',
    radius,
    radius,
    0,
    largeArcFlag,
    1,
    end.x,
    end.y,
  ].join(' ')
}

function GaugeNeedle({ angle, value }) {
  return (
    <g key={value} transform={`rotate(${angle} 120 108)`}>
      <animateTransform
        attributeName="transform"
        dur="900ms"
        fill="freeze"
        from="-90 120 108"
        to={`${angle} 120 108`}
        type="rotate"
      />
      <polygon fill="#333333" opacity="0.9" points="117.5,78 120,40 122.5,78" />
    </g>
  )
}

function getNeedleAngle(value, max) {
  const midpoint = max / 2

  if (value <= midpoint) {
    return -90 + ((value - 1) / (midpoint - 1)) * 90
  }

  return ((value - midpoint) / midpoint) * 90
}

export default function GaugeMeter({
  value,
  label = 'Score',
  max = 10,
  size = 'md',
  valueLabel,
  className,
}) {
  const clampedValue = Math.min(max, Math.max(0, value))
  const angle = getNeedleAngle(clampedValue, max)

  return (
    <div className={cn('flex flex-col items-center', className)}>
      <div className={cn('flex flex-col items-center', sizeClass[size])}>
        <svg
          className="h-[132px] w-full overflow-visible drop-shadow-[0_11px_18px_rgba(18,22,25,0.18)]"
          viewBox="0 0 240 142"
          role="img"
          aria-label={`${label}: ${valueLabel ?? `${clampedValue}%`}`}
        >
          {segments.map((segment) => (
            <path
              key={`${segment.start}-${segment.end}`}
              d={describeArc(120, 132, 106, segment.start, segment.end)}
              fill="none"
              stroke={segment.color}
              strokeLinecap="butt"
              strokeWidth="9"
            />
          ))}
          <text
            fill="#333333"
            fontFamily="Roboto, ui-sans-serif, system-ui, sans-serif"
            fontSize="50"
            fontWeight="700"
            textAnchor="middle"
            x="120"
            y="122"
          >
            {valueLabel ?? `${clampedValue}%`}
          </text>
          <GaugeNeedle angle={angle} value={clampedValue} />
        </svg>
      </div>
    </div>
  )
}
