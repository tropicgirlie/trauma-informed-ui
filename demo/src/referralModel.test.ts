import { describe, expect, it } from 'vitest'
import {
  applyDisclosure,
  careChoicesFromResults,
  createDraft,
  interruptionResult,
  nextCaseAfterSend,
  partnerPreview,
  usesAutomaticPrompt,
} from './referralModel'

describe('Harbor referral comparison', () => {
  it('blocks a conventional send until the bundled share is accepted', () => {
    const preview = partnerPreview('conventional', createDraft('Please advise on rent.'))
    expect(preview.state).toBe('blocked')
  })

  it('sends the phone number inside the conventional clinical paragraph', () => {
    const draft = { ...createDraft('Please advise on rent.'), bundledShare: true }
    const preview = partnerPreview('conventional', draft)
    expect(preview.state).toBe('ready')
    if (preview.state !== 'ready') return
    expect(preview.contents.phoneTravelsInsideClinicalParagraph).toBe(true)
    expect(preview.summary).toContain('including the phone number')
    expect(preview.warnings[0]).toContain('bundled share sends both')
  })

  it('lets a care-conscious worker send without sharing the record', () => {
    const draft = createDraft('Please advise on rent.')
    draft.care = { shareClinical: 'no', sharePhone: 'no', allowFollowUp: 'no' }
    const preview = partnerPreview('care-conscious', draft)
    expect(preview.state).toBe('ready')
    if (preview.state !== 'ready') return
    expect(preview.contents.clinicalParagraph).toBe(false)
    expect(preview.contents.phoneNumber).toBe(false)
    expect(preview.contents.partnerMayContact).toBe(false)
    expect(preview.contents.workerNote).toBe(true)
  })

  it('keeps a refused phone number out of the shared clinical paragraph', () => {
    const draft = createDraft('')
    draft.disclosure = 'opened'
    draft.care = { shareClinical: 'yes', sharePhone: 'no', allowFollowUp: 'no' }
    const preview = partnerPreview('care-conscious', draft)
    expect(preview.state).toBe('ready')
    if (preview.state !== 'ready') return
    expect(preview.summary).toContain('without the phone number')
    expect(preview.contents.phoneNumber).toBe(false)
    expect(preview.warnings.some((warning) => warning.includes('leaves the phone number out'))).toBe(true)
  })

  it('describes a shared phone number as its own field beside the redacted paragraph', () => {
    const draft = createDraft('Please advise on rent.')
    draft.disclosure = 'opened'
    draft.care = { shareClinical: 'yes', sharePhone: 'yes', allowFollowUp: 'no' }
    const preview = partnerPreview('care-conscious', draft)
    expect(preview.state).toBe('ready')
    if (preview.state !== 'ready') return
    expect(preview.summary).toContain('removed from it')
    expect(preview.summary).toContain('as its own field')
    expect(preview.summary).not.toContain('without the phone number')
  })

  it('warns when the clinical paragraph would be shared without being opened', () => {
    const draft = createDraft('Note')
    draft.disclosure = 'skipped'
    draft.care = { shareClinical: 'yes', sharePhone: 'no', allowFollowUp: 'yes' }
    const preview = partnerPreview('care-conscious-prompt', draft)
    expect(preview.state).toBe('ready')
    if (preview.state !== 'ready') return
    expect(preview.warnings.some((warning) => warning.includes('not opened'))).toBe(true)
  })

  it('requires an answer to each care-conscious sharing question', () => {
    const draft = createDraft('Note')
    draft.care = { shareClinical: 'yes', sharePhone: null, allowFollowUp: 'no' }
    expect(partnerPreview('care-conscious', draft).state).toBe('blocked')
  })

  it('discards a conventional draft after interruption and keeps a care-conscious draft', () => {
    const draft = createDraft('Half written')
    draft.disclosure = 'opened'
    draft.care = { shareClinical: 'no', sharePhone: 'yes', allowFollowUp: 'no' }

    const conventional = interruptionResult('conventional', { ...draft, bundledShare: true })
    expect(conventional.preserved).toBe(false)
    expect(conventional.draft.note).toBe('')

    const careful = interruptionResult('care-conscious', draft)
    expect(careful.preserved).toBe(true)
    expect(careful.draft.note).toBe('Half written')
    expect(careful.draft.care.sharePhone).toBe('yes')
  })

  it('opens the next case immediately only on the conventional screen', () => {
    expect(nextCaseAfterSend('conventional')).toBe('immediate')
    expect(nextCaseAfterSend('care-conscious')).toBe('when-ready')
    expect(nextCaseAfterSend('care-conscious-prompt')).toBe('when-ready')
  })

  it('limits the automatic prompt to the third version', () => {
    expect(usesAutomaticPrompt('conventional')).toBe(false)
    expect(usesAutomaticPrompt('care-conscious')).toBe(false)
    expect(usesAutomaticPrompt('care-conscious-prompt')).toBe(true)
  })

  it('keeps an opened paragraph opened if the worker later chooses skip', () => {
    expect(applyDisclosure('closed', 'skip')).toBe('skipped')
    expect(applyDisclosure('opened', 'skip')).toBe('opened')
    expect(applyDisclosure('skipped', 'open')).toBe('opened')
  })

  it('reads consent results by step index', () => {
    expect(careChoicesFromResults([
      { stepIndex: 0, selectedValue: 'no' },
      { stepIndex: 1, selectedValue: 'yes' },
      { stepIndex: 2, selectedValue: 'no' },
    ])).toEqual({ shareClinical: 'no', sharePhone: 'yes', allowFollowUp: 'no' })
  })
})
