import React from 'react'

export interface SkeletonProps {
  /** Width — any CSS value. Default: '100%' */
  width?: string | number
  /** Height — any CSS value. Default: '16px' */
  height?: string | number
  /** Render as a circle (for avatars) */
  circle?: boolean
  /** Border radius override */
  borderRadius?: string | number
  /** Custom className */
  className?: string
  /** Accessible label for screen readers */
  label?: string
}

/**
 * Skeleton
 *
 * Content placeholder that communicates loading without spinning indicators,
 * which can be activating. Gentle shimmer instead of aggressive pulsing.
 *
 * @example
 * <Skeleton height="18px" width="60%" />
 * <Skeleton circle width="40px" height="40px" />
 */
export function Skeleton({
  width = '100%',
  height = '16px',
  circle = false,
  borderRadius,
  className,
  label = 'Loading…',
}: SkeletonProps) {
  const resolvedRadius = circle
    ? '50%'
    : borderRadius !== undefined
    ? borderRadius
    : '8px'

  return (
    <span
      role="status"
      aria-label={label}
      className={className}
      style={{
        display: 'block',
        width,
        height,
        borderRadius: resolvedRadius,
        background: 'linear-gradient(90deg, #E4DDD4 25%, #ECE7DF 50%, #E4DDD4 75%)',
        backgroundSize: '200% 100%',
        animation: 'ti-skeleton-shimmer 1.6s ease-in-out infinite',
      }}
    >
      <style>{`
        @keyframes ti-skeleton-shimmer {
          0%   { background-position: 200% 0; }
          100% { background-position: -200% 0; }
        }
        @media (prefers-reduced-motion: reduce) {
          .ti-skeleton-shimmer { animation: none; background-position: 0 0; }
        }
      `}</style>
    </span>
  )
}

// ─── SkeletonText ─────────────────────────────────────────────────────────────

export interface SkeletonTextProps {
  /** Number of lines */
  lines?: number
  /** Width of the last line (shorter = more natural). Default: '65%' */
  lastLineWidth?: string
  /** className */
  className?: string
}

/**
 * SkeletonText
 *
 * Multi-line text skeleton with a shorter last line for a natural look.
 *
 * @example
 * <SkeletonText lines={3} />
 */
export function SkeletonText({ lines = 3, lastLineWidth = '65%', className }: SkeletonTextProps) {
  return (
    <div
      className={className}
      role="status"
      aria-label="Loading text…"
      style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}
    >
      {Array.from({ length: lines }).map((_, i) => (
        <Skeleton
          key={i}
          height="14px"
          width={i === lines - 1 ? lastLineWidth : '100%'}
          label={undefined}
        />
      ))}
    </div>
  )
}
