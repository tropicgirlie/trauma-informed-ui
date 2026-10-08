import { describe, expect, it } from 'vitest'
import { getLegalChecks } from './DecisionGuide'

const context = {
  personalData: false,
  sharedDevice: false,
  hardToReverse: false,
  aiInfluence: false,
  healthData: true,
}

describe('Decision Guide legal prompts', () => {
  it('shows HIPAA only for a US health-data scenario', () => {
    expect(getLegalChecks('eu', context).map(({ label }) => label)).not.toContain('HIPAA')
    expect(getLegalChecks('us', context).map(({ label }) => label)).toContain('HIPAA')
  })

  it('shows the EU AI Act only when AI influences an EU decision', () => {
    expect(getLegalChecks('eu', context).map(({ label }) => label)).not.toContain('EU AI Act')
    expect(getLegalChecks('eu', { ...context, aiInfluence: true }).map(({ label }) => label)).toContain('EU AI Act')
    expect(getLegalChecks('us', { ...context, aiInfluence: true }).map(({ label }) => label)).not.toContain('EU AI Act')
  })
})
