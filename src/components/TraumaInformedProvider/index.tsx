import React, { createContext, useContext, useMemo } from 'react'
import { useReducedMotion } from '../../hooks/useReducedMotion'

export interface TraumaInformedConfig {
  /** Disable component motion across the subtree. Default: true */
  motionSafe?: boolean
  /** Use the system palette as CSS variable overrides. Default: true */
  calmPalette?: boolean
  /** Duration in ms for undo windows across RegretButton instances. Default: 7000 */
  regretWindowMs?: number
  /** Duration in ms of inactivity before PauseAware triggers. Default: 90000 */
  pauseThresholdMs?: number
  /** Safe redirect destination used by SafeExit when no redirectTo prop given. */
  defaultSafeRedirect?: string
  /** Whether SafeExit should replace the current history entry. Earlier history may remain. Default: true. */
  clearHistoryOnExit?: boolean
}

const defaults: Required<TraumaInformedConfig> = {
  motionSafe: true,
  calmPalette: true,
  regretWindowMs: 7000,
  pauseThresholdMs: 90000,
  defaultSafeRedirect: 'https://weather.com',
  clearHistoryOnExit: true,
}

const TraumaInformedContext = createContext<Required<TraumaInformedConfig>>(defaults)

export function useTraumaInformed() {
  return useContext(TraumaInformedContext)
}

interface TraumaInformedProviderProps extends TraumaInformedConfig {
  children: React.ReactNode
}

/**
 * TraumaInformedProvider
 *
 * Wrap your application (or a subtree) with this provider to set global
 * defaults for all Trauma-Informed UI components.
 *
 * SAMHSA principles: All six — this is the structural layer.
 *
 * @example
 * <TraumaInformedProvider calmPalette motionSafe regretWindowMs={10000}>
 *   <App />
 * </TraumaInformedProvider>
 */
export function TraumaInformedProvider({
  children,
  motionSafe = true,
  calmPalette = true,
  regretWindowMs = 7000,
  pauseThresholdMs = 90000,
  defaultSafeRedirect = 'https://weather.com',
  clearHistoryOnExit = true,
}: TraumaInformedProviderProps) {
  const prefersReducedMotion = useReducedMotion()
  const disableMotion = motionSafe || prefersReducedMotion
  const value = useMemo(
    () => ({
      motionSafe,
      calmPalette,
      regretWindowMs,
      pauseThresholdMs,
      defaultSafeRedirect,
      clearHistoryOnExit,
    }),
    [motionSafe, calmPalette, regretWindowMs, pauseThresholdMs, defaultSafeRedirect, clearHistoryOnExit]
  )

  // Apply calm palette as CSS custom property overrides if requested
  const style: React.CSSProperties = calmPalette
    ? ({
        '--ti-color-sage': '#1868db',
        '--ti-color-sage-light': '#e9f2ff',
        '--ti-color-sage-dark': '#0c66e4',
        '--ti-color-dust': '#9e4c00',
        '--ti-color-dust-light': '#fff4e5',
        '--ti-color-dust-dark': '#693200',
        '--ti-color-plum': '#803fa5',
        '--ti-color-plum-light': '#f3f0ff',
        '--ti-color-plum-dark': '#48245d',
        '--ti-color-blush': '#ae2e24',
        '--ti-color-blush-light': '#ffedeb',
        '--ti-color-blush-dark': '#5d1f1a',
        '--ti-color-cream': '#ffffff',
        '--ti-motion-fast': disableMotion ? '0ms' : '150ms ease',
        '--ti-motion-med': disableMotion ? '0ms' : '300ms ease',
        '--ti-motion-slow': disableMotion ? '0ms' : '500ms ease',
      } as React.CSSProperties)
    : {}

  return (
    <TraumaInformedContext.Provider value={value}>
      <div style={style} data-ti-provider>
        {children}
      </div>
    </TraumaInformedContext.Provider>
  )
}
