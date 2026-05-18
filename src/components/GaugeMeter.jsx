import { useId } from 'react'

import { cn } from '@/lib/utils'

const sizeClass = {
  sm: 'w-[178px]',
  md: 'w-[210px]',
  lg: 'w-[236px]',
}

const segments = [
  { start: -180, end: -138.5, color: 'var(--risk-low)' },
  { start: -135, end: -93.5, color: 'var(--risk-medium)' },
  { start: -90, end: -48.5, color: 'var(--risk-warning)' },
  { start: -45, end: 0, color: 'var(--risk-high)' },
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

function describeInterior(centerX, centerY, radius) {
  const start = polarToCartesian(centerX, centerY, radius, -180)
  const end = polarToCartesian(centerX, centerY, radius, 0)

  return [
    'M',
    start.x,
    start.y,
    'A',
    radius,
    radius,
    0,
    0,
    1,
    end.x,
    end.y,
    'L',
    start.x,
    start.y,
    'Z',
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
  const interiorGradientId = useId().replace(/:/g, '')

  return (
    <div className={cn('flex flex-col items-center', className)}>
      <div className={cn('flex flex-col items-center', sizeClass[size])}>
        <svg
          className="h-[132px] w-full overflow-visible"
          viewBox="0 0 240 142"
          role="img"
          aria-label={`${label}: ${valueLabel ?? `${clampedValue}%`}`}
        >
          <defs>
            <linearGradient
              id={interiorGradientId}
              gradientUnits="userSpaceOnUse"
              x1="120"
              x2="120"
              y1="31"
              y2="132"
            >
              <stop offset="0%" stopColor="hsl(var(--gauge-bg-top))" />
              <stop offset="100%" stopColor="hsl(var(--gauge-bg-bottom))" />
            </linearGradient>
          </defs>
          <path d={describeInterior(120, 132, 101)} fill={`url(#${interiorGradientId})`} />
          <g>
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
          </g>
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
