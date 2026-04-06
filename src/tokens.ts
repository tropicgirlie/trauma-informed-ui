/**
 * Trauma-Informed UI — Design Tokens
 *
 * Single source of truth for all colour values used across the library.
 * Components (Alert, Toast, etc.) import from here; consumers can also
 * import these for custom theming or documentation.
 *
 * Palette philosophy:
 * - All colours are desaturated relative to their hue-pure equivalents
 * - "Danger" is rose, not alarm-red — critical without triggering threat response
 * - "Warning" is warm amber, not harsh yellow
 * - No flashing, no pure black, no pure white
 */

// ─── Raw palette ──────────────────────────────────────────────────────────────

export const PALETTE = {
  // Teal (primary / info)
  teal900: '#1D4E58',
  teal700: '#2D6473',
  teal600: '#3C7F8C',
  teal400: '#6ABFCC',
  teal200: '#C4DDE2',
  teal100: '#D1E5E8',

  // Sage green (success)
  green900: '#1A4A2E',
  green700: '#2E6647',
  green600: '#4E8563',
  green200: '#C9E3D8',
  green100: '#D6EAE0',

  // Warm amber (warning)
  amber900: '#6B4E1A',
  amber700: '#8B6830',
  amber600: '#C39A4A',
  amber200: '#EDE4CE',
  amber100: '#F4EDDB',

  // Desaturated rose (danger — calm, not alarming)
  rose900: '#5C2A2A',
  rose700: '#8C4C4C',
  rose600: '#B06565',
  rose200: '#EAD8D8',
  rose100: '#F2E4E4',

  // Neutral
  neutral900: '#2F3134',
  neutral700: '#62666D',
  neutral500: '#8B8F96',
  neutral200: '#D7D2C8',
  neutral100: '#ECE7DF',
  neutral50:  '#F6F4F0',
  white:      '#FDFCFA',
} as const

// ─── Semantic feedback tokens ─────────────────────────────────────────────────
// Used by Alert and Toast — always in sync.

export type FeedbackVariant = 'info' | 'success' | 'warning' | 'danger'

export const FEEDBACK_TOKENS: Record<FeedbackVariant, {
  /** Flat background colour (gradient start) */
  bg: string
  /** Gradient for richer depth without harshness */
  gradient: string
  /** Accent border colour */
  border: string
  /** Title text — darker for emphasis */
  titleColor: string
  /** Body / message text — slightly lighter */
  bodyColor: string
  /** Icon colour */
  iconColor: string
}> = {
  info: {
    bg:         PALETTE.teal100,
    gradient:   `linear-gradient(135deg, ${PALETTE.teal100} 0%, ${PALETTE.teal200} 100%)`,
    border:     PALETTE.teal600,
    titleColor: PALETTE.teal900,
    bodyColor:  PALETTE.teal700,
    iconColor:  PALETTE.teal600,
  },
  success: {
    bg:         PALETTE.green100,
    gradient:   `linear-gradient(135deg, ${PALETTE.green100} 0%, ${PALETTE.green200} 100%)`,
    border:     PALETTE.green600,
    titleColor: PALETTE.green900,
    bodyColor:  PALETTE.green700,
    iconColor:  PALETTE.green600,
  },
  warning: {
    bg:         PALETTE.amber100,
    gradient:   `linear-gradient(135deg, ${PALETTE.amber100} 0%, ${PALETTE.amber200} 100%)`,
    border:     PALETTE.amber600,
    titleColor: PALETTE.amber900,
    bodyColor:  PALETTE.amber700,
    iconColor:  PALETTE.amber600,
  },
  danger: {
    bg:         PALETTE.rose100,
    gradient:   `linear-gradient(135deg, ${PALETTE.rose100} 0%, ${PALETTE.rose200} 100%)`,
    border:     PALETTE.rose600,
    titleColor: PALETTE.rose900,
    bodyColor:  PALETTE.rose700,
    iconColor:  PALETTE.rose600,
  },
}

// ─── Surface tokens (light mode) ─────────────────────────────────────────────

export const SURFACE_TOKENS = {
  bg:          PALETTE.neutral50,   // '#F6F4F0' — page background
  surface:     PALETTE.neutral100,  // '#ECE7DF' — cards, panels
  surfaceDeep: '#DDD6CC',           // deeper surface, sidebar
  white:       PALETTE.white,       // '#FDFCFA' — high-contrast content areas
  border:      PALETTE.neutral200,  // '#D7D2C8'
  text:        PALETTE.neutral900,  // '#2F3134'
  textMuted:   PALETTE.neutral700,  // '#62666D'
  primary:     PALETTE.teal600,     // '#3C7F8C'
  primarySoft: PALETTE.teal100,     // '#D1E5E8'
} as const
