import React, { createContext, useContext, useId, useState } from 'react'

// ─── Context ─────────────────────────────────────────────────────────────────

interface TabsCtx {
  activeTab: string
  setActiveTab: (id: string) => void
  listId: string
}

const TabsContext = createContext<TabsCtx | null>(null)

// ─── Tabs (root) ─────────────────────────────────────────────────────────────

export interface TabsProps {
  /** Default active tab id (uncontrolled) */
  defaultTab?: string
  /** Controlled active tab */
  activeTab?: string
  /** Called when tab changes */
  onChange?: (id: string) => void
  children: React.ReactNode
  /** Custom className on root */
  className?: string
}

/**
 * Tabs
 *
 * ARIA tab pattern with keyboard navigation (arrow keys, Home, End).
 * Trauma-informed: never loses context — the tab label is always visible,
 * giving users orientation within the page.
 *
 * @example
 * <Tabs defaultTab="info">
 *   <TabList>
 *     <Tab id="info">Information</Tab>
 *     <Tab id="support">Support options</Tab>
 *   </TabList>
 *   <TabPanel id="info">…</TabPanel>
 *   <TabPanel id="support">…</TabPanel>
 * </Tabs>
 */
export function Tabs({ defaultTab = '', activeTab, onChange, children, className }: TabsProps) {
  const id = useId()
  const [localTab, setLocalTab] = useState(defaultTab)
  const isControlled = activeTab !== undefined
  const current = isControlled ? activeTab : localTab

  const setActiveTab = (tab: string) => {
    if (!isControlled) setLocalTab(tab)
    onChange?.(tab)
  }

  return (
    <TabsContext.Provider value={{ activeTab: current, setActiveTab, listId: id }}>
      <div className={className}>{children}</div>
    </TabsContext.Provider>
  )
}

// ─── TabList ─────────────────────────────────────────────────────────────────

export interface TabListProps {
  children: React.ReactNode
  /** Custom className */
  className?: string
}

export function TabList({ children, className }: TabListProps) {
  const ctx = useContext(TabsContext)
  if (!ctx) throw new Error('TabList must be inside Tabs')

  const handleKeyDown = (e: React.KeyboardEvent<HTMLDivElement>) => {
    const tabs = Array.from(
      e.currentTarget.querySelectorAll<HTMLButtonElement>('[role="tab"]:not([disabled])')
    )
    const idx = tabs.findIndex((t) => t.getAttribute('aria-selected') === 'true')
    let next = idx

    if (e.key === 'ArrowRight') next = (idx + 1) % tabs.length
    else if (e.key === 'ArrowLeft') next = (idx - 1 + tabs.length) % tabs.length
    else if (e.key === 'Home') next = 0
    else if (e.key === 'End') next = tabs.length - 1
    else return

    e.preventDefault()
    tabs[next]?.click()
    tabs[next]?.focus()
  }

  return (
    <div
      role="tablist"
      id={ctx.listId}
      className={className}
      onKeyDown={handleKeyDown}
      style={{
        display: 'flex',
        gap: '2px',
        borderBottom: '2px solid #D7D2C8',
        overflowX: 'auto',
      }}
    >
      {children}
    </div>
  )
}

// ─── Tab ─────────────────────────────────────────────────────────────────────

export interface TabProps {
  /** Must match the corresponding TabPanel id */
  id: string
  children: React.ReactNode
  /** Disabled */
  disabled?: boolean
  /** Icon before label */
  icon?: React.ReactNode
}

export function Tab({ id, children, disabled = false, icon }: TabProps) {
  const ctx = useContext(TabsContext)
  if (!ctx) throw new Error('Tab must be inside Tabs > TabList')
  const isActive = ctx.activeTab === id

  return (
    <button
      role="tab"
      id={`tab-${ctx.listId}-${id}`}
      aria-selected={isActive}
      aria-controls={`panel-${ctx.listId}-${id}`}
      tabIndex={isActive ? 0 : -1}
      disabled={disabled}
      onClick={() => !disabled && ctx.setActiveTab(id)}
      style={{
        display: 'flex',
        alignItems: 'center',
        gap: '6px',
        padding: '10px 16px',
        background: 'none',
        border: 'none',
        borderBottom: `2px solid ${isActive ? '#3C7F8C' : 'transparent'}`,
        marginBottom: '-2px',
        color: isActive ? '#3C7F8C' : '#62666D',
        fontWeight: isActive ? 600 : 400,
        fontSize: '14px',
        fontFamily: 'inherit',
        cursor: disabled ? 'not-allowed' : 'pointer',
        opacity: disabled ? 0.4 : 1,
        whiteSpace: 'nowrap',
        transition: 'color 150ms ease, border-color 150ms ease',
        minHeight: '44px',
      }}
    >
      {icon && <span aria-hidden="true" style={{ display: 'flex', alignItems: 'center' }}>{icon}</span>}
      {children}
    </button>
  )
}

// ─── TabPanel ────────────────────────────────────────────────────────────────

export interface TabPanelProps {
  /** Must match the Tab id */
  id: string
  children: React.ReactNode
  /** Custom className */
  className?: string
}

export function TabPanel({ id, children, className }: TabPanelProps) {
  const ctx = useContext(TabsContext)
  if (!ctx) throw new Error('TabPanel must be inside Tabs')
  if (ctx.activeTab !== id) return null

  return (
    <div
      role="tabpanel"
      id={`panel-${ctx.listId}-${id}`}
      aria-labelledby={`tab-${ctx.listId}-${id}`}
      tabIndex={0}
      className={className}
      style={{ paddingTop: '20px' }}
    >
      {children}
    </div>
  )
}
