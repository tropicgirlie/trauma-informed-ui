import React, { useCallback, useEffect, useRef, useState } from 'react'
import { Button } from '../Button'

export type BreathingPattern = '4-7-8' | 'box' | 'custom'

export interface BreathingGuideProps {
  /** Breathing pattern preset */
  pattern?: BreathingPattern
  /** Custom phase durations in seconds: [inhale, hold-in, exhale, hold-out] */
  customDurations?: [number, number, number, number]
  /** Number of cycles to complete (0 = infinite) */
  cycles?: number
  /** Called when a full set of cycles is completed */
  onComplete?: () => void
  /** Custom className */
  className?: string
}

const PATTERNS: Record<BreathingPattern, [number, number, number, number]> = {
  '4-7-8': [4, 7, 8, 0],
  'box': [4, 4, 4, 4],
  'custom': [4, 4, 4, 0],
}

const PHASE_LABELS = ['Breathe in', 'Hold', 'Breathe out', 'Hold']
const PHASE_COLORS = ['#D1E5E8', '#E8E3F4', '#DCE8DA', '#E8E3F4']
const PHASE_TEXT_COLORS = ['#2D6473', '#5B4D8A', '#4a6349', '#5B4D8A']

/**
 * BreathingGuide
 *
 * An animated, paced breathing exercise. Reduces acute stress and
 * supports nervous system regulation during or between difficult content.
 *
 * SAMHSA principle: Safety; Peer Support
 * Neurobiological rationale: Slow, paced breathing activates the
 * parasympathetic nervous system via vagal tone. The 4-7-8 pattern
 * (Weil, 2015) and box breathing (used in clinical PTSD treatment) are
 * both evidence-based for reducing sympathetic activation within minutes.
 *
 * @example
 * <BreathingGuide pattern="box" cycles={3} onComplete={() => continueForm()} />
 */
export function BreathingGuide({
  pattern = 'box',
  customDurations,
  cycles = 0,
  onComplete,
  className,
}: BreathingGuideProps) {
  const durations = customDurations ?? PATTERNS[pattern]
  const phases = durations.map((d, i) => ({ duration: d, label: PHASE_LABELS[i] })).filter((p) => p.duration > 0)

  const [running, setRunning] = useState(false)
  const [phaseIndex, setPhaseIndex] = useState(0)
  const [timeLeft, setTimeLeft] = useState(phases[0]?.duration ?? 4)
  const [cycleCount, setCycleCount] = useState(0)
  const [done, setDone] = useState(false)

  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null)
  const phaseRef = useRef(0)
  const timeRef = useRef(phases[0]?.duration ?? 4)
  const cycleRef = useRef(0)

  const stopTimer = useCallback(() => {
    if (intervalRef.current) {
      clearInterval(intervalRef.current)
      intervalRef.current = null
    }
  }, [])

  const startTimer = useCallback(() => {
    phaseRef.current = 0
    timeRef.current = phases[0]?.duration ?? 4
    cycleRef.current = 0
    setPhaseIndex(0)
    setTimeLeft(phases[0]?.duration ?? 4)
    setCycleCount(0)
    setDone(false)

    intervalRef.current = setInterval(() => {
      timeRef.current -= 1

      if (timeRef.current <= 0) {
        const nextPhase = (phaseRef.current + 1) % phases.length
        const isNewCycle = nextPhase === 0

        if (isNewCycle) {
          cycleRef.current += 1
          if (cycles > 0 && cycleRef.current >= cycles) {
            stopTimer()
            setRunning(false)
            setDone(true)
            onComplete?.()
            return
          }
          setCycleCount(cycleRef.current)
        }

        phaseRef.current = nextPhase
        timeRef.current = phases[nextPhase].duration
        setPhaseIndex(nextPhase)
        setTimeLeft(phases[nextPhase].duration)
      } else {
        setTimeLeft(timeRef.current)
      }
    }, 1000)
  }, [phases, cycles, stopTimer, onComplete])

  useEffect(() => () => stopTimer(), [stopTimer])

  const handleToggle = () => {
    if (running) {
      stopTimer()
      setRunning(false)
    } else {
      setRunning(true)
      startTimer()
    }
  }

  const phase = phases[phaseIndex]
  const phaseDuration = phase?.duration ?? 4
  const progress = running ? (phaseDuration - timeLeft) / phaseDuration : 0

  const bgColor = PHASE_COLORS[phaseIndex] ?? '#D1E5E8'
  const textColor = PHASE_TEXT_COLORS[phaseIndex] ?? '#2D6473'

  const circleSize = 120
  const radius = 48
  const circumference = 2 * Math.PI * radius
  const dashOffset = circumference * (1 - progress)

  if (done) {
    return (
      <div
        data-ti-breathing-guide
        className={className}
        style={{
          background: '#D1E5E8',
          borderRadius: '20px',
          padding: '32px 24px',
          maxWidth: '300px',
          textAlign: 'center',
        }}
      >
        <div style={{ fontSize: '32px', marginBottom: '10px' }}>🌿</div>
        <p style={{ fontSize: '14px', fontWeight: 500, color: '#2D6473', margin: '0 0 6px' }}>
          Well done
        </p>
        <p style={{ fontSize: '13px', color: '#2D6473', opacity: 0.8, margin: '0 0 18px', lineHeight: 1.6 }}>
          {cycleCount} {cycleCount === 1 ? 'cycle' : 'cycles'} completed. Take a moment to notice how you feel.
        </p>
        <Button
          variant="primary"
          size="sm"
          onClick={() => { setDone(false); setRunning(false); setPhaseIndex(0); setTimeLeft(phases[0]?.duration ?? 4) }}
        >
          Go again
        </Button>
      </div>
    )
  }

  return (
    <div
      data-ti-breathing-guide
      className={className}
      style={{
        background: running ? bgColor : '#ECE7DF',
        border: running ? 'none' : `1px solid #D7D2C8`,
        borderRadius: '20px',
        padding: '28px 24px',
        maxWidth: '300px',
        textAlign: 'center',
        transition: 'background 600ms ease',
      }}
    >
      {/* Pattern label */}
      <p
        style={{
          fontSize: '11px',
          textTransform: 'uppercase',
          letterSpacing: '0.08em',
          color: running ? textColor : '#8B8F96',
          marginBottom: '20px',
          opacity: 0.7,
        }}
      >
        {pattern === 'custom' ? 'Custom' : pattern} breathing
        {cycles > 0 && ` · ${cycleCount}/${cycles} cycles`}
      </p>

      {/* Circle */}
      <div style={{ display: 'flex', justifyContent: 'center', marginBottom: '20px' }}>
        <svg width={circleSize} height={circleSize} viewBox={`0 0 ${circleSize} ${circleSize}`} aria-hidden="true">
          <circle
            cx={circleSize / 2}
            cy={circleSize / 2}
            r={radius}
            fill="none"
            stroke={running ? `${textColor}22` : 'rgba(0,0,0,0.06)'}
            strokeWidth="4"
          />
          <circle
            cx={circleSize / 2}
            cy={circleSize / 2}
            r={radius}
            fill="none"
            stroke={running ? textColor : 'rgba(0,0,0,0.15)'}
            strokeWidth="4"
            strokeLinecap="round"
            strokeDasharray={circumference}
            strokeDashoffset={dashOffset}
            transform={`rotate(-90 ${circleSize / 2} ${circleSize / 2})`}
            style={{ transition: 'stroke-dashoffset 1s linear, stroke 600ms ease' }}
          />
          <text
            x="50%"
            y="50%"
            dominantBaseline="middle"
            textAnchor="middle"
            fill={running ? textColor : '#BDB8AE'}
            fontSize="22"
            fontFamily="inherit"
            fontWeight="500"
          >
            {running ? timeLeft : '·'}
          </text>
        </svg>
      </div>

      {/* Phase label */}
      <p
        style={{
          fontSize: '16px',
          fontWeight: 500,
          color: running ? textColor : '#8B8F96',
          margin: '0 0 24px',
          minHeight: '24px',
          transition: 'color 400ms ease',
        }}
        aria-live="polite"
        aria-atomic="true"
      >
        {running ? phase?.label : 'Ready when you are'}
      </p>

      {/* Control */}
      <Button
        variant={running ? 'secondary' : 'primary'}
        size="md"
        onClick={handleToggle}
        style={running ? { color: textColor, borderColor: textColor } : {}}
      >
        {running ? 'Pause' : 'Begin'}
      </Button>
    </div>
  )
}
