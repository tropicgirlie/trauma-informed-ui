import React, { createContext, useCallback, useContext, useEffect, useRef, useState } from 'react'
import { FEEDBACK_TOKENS } from '../../tokens'

export type ToastVariant = 'info' | 'success' | 'warning' | 'danger'

export interface ToastItem {
  id: string
  variant?: ToastVariant
  title?: string
  message: string
  duration?: number
}

interface ToastContextValue {
  toast: (item: Omit<ToastItem, 'id'>) => string
  dismiss: (id: string) => void
}

const ToastContext = createContext<ToastContextValue | null>(null)

// Shared with Alert — single source of truth in src/tokens.ts
const TOAST_COLORS = FEEDBACK_TOKENS

const TOAST_ICONS: Record<ToastVariant, React.ReactNode> = {
  info: (
    <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" aria-hidden="true">
      <circle cx="12" cy="12" r="10" /><line x1="12" y1="16" x2="12" y2="12" /><line x1="12" y1="8" x2="12.01" y2="8" />
    </svg>
  ),
  success: (
    <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" aria-hidden="true">
      <polyline points="20 6 9 17 4 12" />
    </svg>
  ),
  warning: (
    <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" aria-hidden="true">
      <path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z" />
      <line x1="12" y1="9" x2="12" y2="13" /><line x1="12" y1="17" x2="12.01" y2="17" />
    </svg>
  ),
  danger: (
    <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" aria-hidden="true">
      <circle cx="12" cy="12" r="10" /><line x1="12" y1="8" x2="12" y2="12" /><line x1="12" y1="16" x2="12.01" y2="16" />
    </svg>
  ),
}

// ─── Individual Toast ────────────────────────────────────────────────────────

/**
 * Carbon Design System-aligned notification anatomy:
 * - Slides UP from below (not from the right) for a calmer entry
 * - Coloured TOP border (3px) as the primary identity signal
 * - Full surrounding border (1px) for structure without harshness
 * - Dismiss button always fully visible — no opacity-hiding
 * - Positioned bottom-right so it never competes with primary content
 */
function ToastEntry({ item, onDismiss }: { item: ToastItem; onDismiss: (id: string) => void }) {
  const [visible, setVisible] = useState(false)
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null)
  const duration = item.duration ?? 5000
  const variant = item.variant ?? 'info'
  const { gradient, border, titleColor, bodyColor, iconColor } = TOAST_COLORS[variant]

  const handleDismiss = useCallback(() => {
    setVisible(false)
    setTimeout(() => onDismiss(item.id), 250)
  }, [onDismiss, item.id])

  useEffect(() => {
    requestAnimationFrame(() => setVisible(true))
    timerRef.current = setTimeout(() => handleDismiss(), duration)
    return () => { if (timerRef.current) clearTimeout(timerRef.current) }
  }, [handleDismiss, duration])

  return (
    <div
      role="status"
      aria-live="polite"
      aria-atomic="true"
      style={{
        display: 'flex',
        alignItems: 'flex-start',
        gap: '10px',
        padding: '14px 16px',
        background: gradient,
        /* Full border for structure, then override top with 3px accent */
        border: `1px solid ${border}`,
        borderTop: `3px solid ${border}`,
        borderRadius: '12px',
        boxShadow: '0 8px 24px rgba(47,49,52,0.15)',
        maxWidth: '400px',
        width: '100%',
        /* Slide UP animation — calmer than sliding from the right */
        transform: visible ? 'translateY(0)' : 'translateY(12px)',
        opacity: visible ? 1 : 0,
        transition: 'transform 250ms ease, opacity 250ms ease',
      }}
    >
      <span style={{ color: iconColor, flexShrink: 0, marginTop: '2px', display: 'flex' }}>
        {TOAST_ICONS[variant]}
      </span>

      <div style={{ flex: 1, minWidth: 0 }}>
        {item.title && (
          <p style={{ fontSize: '13px', fontWeight: 600, color: titleColor, margin: '0 0 2px', lineHeight: 1.4 }}>
            {item.title}
          </p>
        )}
        <p style={{ fontSize: '13px', color: bodyColor, margin: 0, lineHeight: 1.6 }}>{item.message}</p>
      </div>

      {/* Dismiss — always fully visible, hover shows background tint */}
      <button
        onClick={handleDismiss}
        aria-label="Dismiss notification"
        style={{
          flexShrink: 0,
          background: 'none',
          border: 'none',
          cursor: 'pointer',
          color: bodyColor,
          opacity: 1,
          padding: '4px',
          borderRadius: '4px',
          display: 'flex',
          transition: 'background 150ms ease',
        }}
        onMouseEnter={(e) => ((e.currentTarget as HTMLButtonElement).style.background = 'rgba(0,0,0,0.07)')}
        onMouseLeave={(e) => ((e.currentTarget as HTMLButtonElement).style.background = 'none')}
      >
        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" aria-hidden="true">
          <line x1="18" y1="6" x2="6" y2="18" /><line x1="6" y1="6" x2="18" y2="18" />
        </svg>
      </button>
    </div>
  )
}

// ─── ToastProvider ───────────────────────────────────────────────────────────

/**
 * ToastProvider
 *
 * Wrap your app (or the TraumaInformedProvider subtree) to enable toasts.
 *
 * Carbon Design-aligned positioning:
 * - Fixed portal at the BOTTOM-RIGHT corner (not top-right)
 * - column-reverse stacking: newest toast appears at the bottom, older ones stack up
 * - This follows the natural reading direction and does not obscure page headers
 *
 * @example
 * <ToastProvider>
 *   <App />
 * </ToastProvider>
 */
export function ToastProvider({ children }: { children: React.ReactNode }) {
  const [toasts, setToasts] = useState<ToastItem[]>([])

  const toast = useCallback((item: Omit<ToastItem, 'id'>): string => {
    const id = `toast-${Date.now()}-${Math.random().toString(36).slice(2)}`
    setToasts((prev) => [...prev, { ...item, id }])
    return id
  }, [])

  const dismiss = useCallback((id: string) => {
    setToasts((prev) => prev.filter((t) => t.id !== id))
  }, [])

  return (
    <ToastContext.Provider value={{ toast, dismiss }}>
      {children}

      {/* Toast region — bottom-right, newest at bottom, older stacked above */}
      <div
        aria-label="Notifications"
        style={{
          position: 'fixed',
          bottom: '24px',
          right: '24px',
          zIndex: 1100,
          display: 'flex',
          flexDirection: 'column-reverse',
          gap: '10px',
          alignItems: 'flex-end',
          pointerEvents: 'none',
        }}
      >
        {toasts.map((item) => (
          <div key={item.id} style={{ pointerEvents: 'auto' }}>
            <ToastEntry item={item} onDismiss={dismiss} />
          </div>
        ))}
      </div>
    </ToastContext.Provider>
  )
}

// ─── useToast ────────────────────────────────────────────────────────────────

/**
 * useToast
 *
 * Returns `{ toast, dismiss }` for triggering notifications programmatically.
 * Must be used inside a ToastProvider.
 *
 * @example
 * const { toast } = useToast()
 * toast({ variant: 'success', message: 'Your response has been saved.' })
 */
export function useToast(): ToastContextValue {
  const ctx = useContext(ToastContext)
  if (!ctx) throw new Error('useToast must be used inside ToastProvider')
  return ctx
}
