import React, { createContext, useContext, useEffect, useMemo } from 'react'

export interface TraumaInformedConfig {
  /** Respect prefers-reduced-motion and disable all animations. Default: true */
  motionSafe?: boolean
  /** Apply the trauma-informed teal/sage palette as CSS variable overrides. Default: true */
  calmPalette?: boolean
  /** Duration in ms for undo windows across RegretButton instances. Default: 7000 */
  regretWindowMs?: number
  /** Duration in ms of inactivity before PauseAware triggers. Default: 90000 */
  pauseThresholdMs?: number
  /** Safe redirect destination used by SafeExit when no redirectTo prop given. */
  defaultSafeRedirect?: string
  /** Whether to clear browser history entries on safe exit. Default: true */
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
const FONT_ID = 'ti-atkinson-font'
const FOCUS_ID = 'ti-focus-styles'

export function TraumaInformedProvider({
  children,
  motionSafe = true,
  calmPalette = true,
  regretWindowMs = 7000,
  pauseThresholdMs = 90000,
  defaultSafeRedirect = 'https://weather.com',
  clearHistoryOnExit = true,
}: TraumaInformedProviderProps) {
  useEffect(() => {
    if (!document.getElementById(FONT_ID)) {
      const link = document.createElement('link')
      link.id = FONT_ID
      link.rel = 'stylesheet'
      link.href =
        'https://fonts.googleapis.com/css2?family=Atkinson+Hyperlegible:ital,wght@0,400;0,700;1,400;1,700&display=swap'
      document.head.appendChild(link)
    }
    if (!document.getElementById(FOCUS_ID)) {
      const style = document.createElement('style')
      style.id = FOCUS_ID
      style.textContent = `
        [data-ti-provider] :focus-visible {
          outline: none;
          box-shadow: 0 0 0 3px rgba(60, 127, 140, 0.4);
          border-radius: 4px;
        }
      `
      document.head.appendChild(style)
    }
  }, [])
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

  const style: React.CSSProperties = calmPalette
    ? ({
        fontFamily: "'Atkinson Hyperlegible', 'Inter', -apple-system, BlinkMacSystemFont, sans-serif",
        '--ti-bg':             '#F6F4F0',
        '--ti-surface':        '#ECE7DF',
        '--ti-surface-alt':    '#E4DDD4',
        '--ti-primary':        '#3C7F8C',
        '--ti-primary-hover':  '#2D6473',
        '--ti-primary-soft':   '#D1E5E8',
        '--ti-primary-text':   '#FFFFFF',
        '--ti-secondary':      '#7C8F7A',
        '--ti-secondary-hover':'#667860',
        '--ti-secondary-soft': '#DCE8DA',
        '--ti-secondary-text': '#FFFFFF',
        '--ti-accent':         '#8C7BAF',
        '--ti-accent-soft':    '#E8E3F4',
        '--ti-success':        '#4E8563',
        '--ti-success-soft':   '#D6EAE0',
        '--ti-warning':        '#C39A4A',
        '--ti-warning-soft':   '#F4EDDB',
        '--ti-danger':         '#B06565',
        '--ti-danger-soft':    '#F2E4E4',
        '--ti-danger-hover':   '#8C4C4C',
        '--ti-text':           '#2F3134',
        '--ti-text-muted':     '#62666D',
        '--ti-text-faint':     '#8B8F96',
        '--ti-border':         '#D7D2C8',
        '--ti-border-strong':  '#BDB8AE',
        '--ti-motion-fast': motionSafe ? '0ms' : '150ms ease',
        '--ti-motion-med':  motionSafe ? '0ms' : '300ms ease',
        '--ti-motion-slow': motionSafe ? '0ms' : '500ms ease',
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
