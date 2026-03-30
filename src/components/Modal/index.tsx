import React, { useCallback, useEffect, useRef } from 'react'
import { Button } from '../Button'

export type ModalSize = 'sm' | 'md' | 'lg' | 'full'

export interface ModalProps {
  /** Whether the modal is open */
  open: boolean
  /** Called when the modal should close (Escape, backdrop, X button) */
  onClose: () => void
  /** Modal title — required for accessibility */
  title: string
  /** Optional subtitle below the title */
  subtitle?: string
  /** Whether to show the X close button. Default: true */
  showClose?: boolean
  /** Whether clicking the backdrop dismisses the modal. Default: true */
  closeOnBackdrop?: boolean
  /** Modal width preset */
  size?: ModalSize
  /** Footer slot — typically action buttons */
  footer?: React.ReactNode
  /** Custom className on the dialog panel */
  className?: string
  children: React.ReactNode
}

const SIZE_WIDTHS: Record<ModalSize, string> = {
  sm:   '400px',
  md:   '560px',
  lg:   '720px',
  full: '100%',
}

/**
 * Modal
 *
 * A focus-trapped dialog. Always escapable — Escape key and backdrop click
 * both close it. Trauma-informed: the user is never trapped, never surprised
 * by a modal they cannot dismiss.
 *
 * SAMHSA principle: Safety; Empowerment
 *
 * @example
 * <Modal
 *   open={open}
 *   onClose={() => setOpen(false)}
 *   title="Before you continue"
 *   subtitle="This section discusses sensitive topics."
 *   footer={<><Button variant="secondary" onClick={() => setOpen(false)}>Not now</Button><Button variant="primary">Continue</Button></>}
 * >
 *   <p>Take a moment if you need one.</p>
 * </Modal>
 */
export function Modal({
  open,
  onClose,
  title,
  subtitle,
  showClose = true,
  closeOnBackdrop = true,
  size = 'md',
  footer,
  className,
  children,
}: ModalProps) {
  const panelRef = useRef<HTMLDivElement>(null)
  const firstFocusRef = useRef<HTMLElement | null>(null)
  const previousFocusRef = useRef<HTMLElement | null>(null)

  // Focus trap + return focus on close
  useEffect(() => {
    if (!open) return

    previousFocusRef.current = document.activeElement as HTMLElement

    const focusables = panelRef.current?.querySelectorAll<HTMLElement>(
      'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
    )
    if (focusables?.length) {
      firstFocusRef.current = focusables[0]
      focusables[0].focus()
    }

    return () => {
      previousFocusRef.current?.focus()
    }
  }, [open])

  const handleKeyDown = useCallback(
    (e: React.KeyboardEvent) => {
      if (e.key === 'Escape') { onClose(); return }
      if (e.key !== 'Tab') return

      const focusables = Array.from(
        panelRef.current?.querySelectorAll<HTMLElement>(
          'button:not([disabled]), [href], input:not([disabled]), select:not([disabled]), textarea:not([disabled]), [tabindex]:not([tabindex="-1"])'
        ) ?? []
      )
      if (!focusables.length) return

      const first = focusables[0]
      const last = focusables[focusables.length - 1]

      if (e.shiftKey) {
        if (document.activeElement === first) { e.preventDefault(); last.focus() }
      } else {
        if (document.activeElement === last) { e.preventDefault(); first.focus() }
      }
    },
    [onClose]
  )

  if (!open) return null

  const width = size === 'full' ? 'calc(100vw - 48px)' : SIZE_WIDTHS[size]

  return (
    <div
      role="presentation"
      style={{
        position: 'fixed',
        inset: 0,
        zIndex: 1000,
        display: 'flex',
        alignItems: size === 'full' ? 'stretch' : 'center',
        justifyContent: 'center',
        padding: size === 'full' ? '24px' : '24px',
      }}
      aria-modal="true"
    >
      {/* Backdrop */}
      <div
        aria-hidden="true"
        onClick={closeOnBackdrop ? onClose : undefined}
        style={{
          position: 'absolute',
          inset: 0,
          background: 'rgba(47, 49, 52, 0.45)',
          backdropFilter: 'blur(2px)',
        }}
      />

      {/* Panel */}
      <div
        ref={panelRef}
        role="dialog"
        aria-modal="true"
        aria-labelledby="ti-modal-title"
        aria-describedby={subtitle ? 'ti-modal-subtitle' : undefined}
        className={className}
        onKeyDown={handleKeyDown}
        style={{
          position: 'relative',
          width,
          maxWidth: '100%',
          maxHeight: size === 'full' ? '100%' : 'calc(100vh - 80px)',
          display: 'flex',
          flexDirection: 'column',
          background: '#ECE7DF',
          borderRadius: size === 'full' ? '20px' : '20px',
          border: '1px solid #D7D2C8',
          boxShadow: '0 8px 40px rgba(47,49,52,0.18)',
          overflow: 'hidden',
        }}
      >
        {/* Header */}
        <div
          style={{
            display: 'flex',
            alignItems: 'flex-start',
            justifyContent: 'space-between',
            gap: '16px',
            padding: '24px 24px 20px',
            borderBottom: subtitle || children ? '1px solid #D7D2C8' : 'none',
            flexShrink: 0,
          }}
        >
          <div>
            <h2
              id="ti-modal-title"
              style={{ fontSize: '17px', fontWeight: 600, color: '#2F3134', margin: 0, lineHeight: 1.4 }}
            >
              {title}
            </h2>
            {subtitle && (
              <p id="ti-modal-subtitle" style={{ fontSize: '14px', color: '#62666D', margin: '4px 0 0', lineHeight: 1.6 }}>
                {subtitle}
              </p>
            )}
          </div>
          {showClose && (
            <button
              onClick={onClose}
              aria-label="Close dialog"
              style={{
                flexShrink: 0,
                background: 'none',
                border: 'none',
                cursor: 'pointer',
                color: '#62666D',
                padding: '4px',
                borderRadius: '8px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                transition: 'background 150ms ease',
                minWidth: '32px',
                minHeight: '32px',
              }}
              onMouseEnter={(e) => ((e.currentTarget as HTMLButtonElement).style.background = 'rgba(0,0,0,0.06)')}
              onMouseLeave={(e) => ((e.currentTarget as HTMLButtonElement).style.background = 'none')}
            >
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" aria-hidden="true">
                <line x1="18" y1="6" x2="6" y2="18" /><line x1="6" y1="6" x2="18" y2="18" />
              </svg>
            </button>
          )}
        </div>

        {/* Body */}
        <div
          style={{
            flex: 1,
            overflowY: 'auto',
            padding: '20px 24px',
            fontSize: '15px',
            color: '#2F3134',
            lineHeight: 1.7,
          }}
        >
          {children}
        </div>

        {/* Footer */}
        {footer && (
          <div
            style={{
              display: 'flex',
              justifyContent: 'flex-end',
              gap: '10px',
              padding: '16px 24px',
              borderTop: '1px solid #D7D2C8',
              flexShrink: 0,
              background: '#E4DDD4',
            }}
          >
            {footer}
          </div>
        )}
      </div>
    </div>
  )
}
