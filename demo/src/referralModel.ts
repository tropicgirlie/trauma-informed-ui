export type VariantId = 'conventional' | 'care-conscious' | 'care-conscious-prompt'

export interface VariantDefinition {
  id: VariantId
  label: string
  summary: string
}

export const variants: VariantDefinition[] = [
  {
    id: 'conventional',
    label: 'Conventional',
    summary: 'The clinical paragraph is visible immediately. One checkbox bundles the paragraph, the phone number, and permission to contact Alex. Send happens at once. A timeout discards the draft. The next case opens on its own.',
  },
  {
    id: 'care-conscious',
    label: 'Care-conscious',
    summary: 'The worker chooses whether to open the clinical paragraph. Sharing decisions are separate, and “No” still sends the referral. The paragraph sent onward leaves the phone number out. Send can be cancelled for 7 seconds. An interruption keeps the draft. The next case waits.',
  },
  {
    id: 'care-conscious-prompt',
    label: 'Care-conscious, with prompt',
    summary: 'The same referral as the care-conscious version, plus an automatic prompt after 8 seconds without input. This is the condition the study is most prepared to retire.',
  },
]

export const CLINICAL_PARAGRAPH =
  'Alex started a new medication two weeks ago and has had nausea since then. Alex also missed last month\'s rent. Phone number on file: 555-0148.'

export const REDACTED_CLINICAL_PARAGRAPH =
  'Alex started a new medication two weeks ago and has had nausea since then. Alex also missed last month\'s rent.'

export type DisclosureState = 'closed' | 'opened' | 'skipped'
export type YesNo = 'yes' | 'no'

export interface CareChoices {
  shareClinical: YesNo | null
  sharePhone: YesNo | null
  allowFollowUp: YesNo | null
}

export interface ReferralDraft {
  note: string
  disclosure: DisclosureState
  bundledShare: boolean
  care: CareChoices
}

export interface ShareContents {
  clinicalParagraph: boolean
  phoneNumber: boolean
  partnerMayContact: boolean
  workerNote: boolean
  phoneTravelsInsideClinicalParagraph: boolean
}

export type PartnerPreview =
  | { state: 'blocked'; reason: string }
  | { state: 'ready'; summary: string; warnings: string[]; contents: ShareContents }

export function createDraft(note = ''): ReferralDraft {
  return {
    note,
    disclosure: 'closed',
    bundledShare: false,
    care: { shareClinical: null, sharePhone: null, allowFollowUp: null },
  }
}

export function applyDisclosure(disclosure: DisclosureState, action: 'open' | 'skip'): DisclosureState {
  if (disclosure === 'opened' || action === 'open') return 'opened'
  return 'skipped'
}

export function careChoicesFromResults(results: Array<{ stepIndex: number; selectedValue: string }>): CareChoices {
  const choice = (index: number): YesNo | null => {
    const value = results.find((result) => result.stepIndex === index)?.selectedValue
    return value === 'yes' || value === 'no' ? value : null
  }
  return {
    shareClinical: choice(0),
    sharePhone: choice(1),
    allowFollowUp: choice(2),
  }
}

function shareContents(variant: VariantId, draft: ReferralDraft): ShareContents {
  if (variant === 'conventional') {
    return {
      clinicalParagraph: true,
      phoneNumber: true,
      partnerMayContact: true,
      workerNote: draft.note.trim().length > 0,
      phoneTravelsInsideClinicalParagraph: true,
    }
  }
  return {
    clinicalParagraph: draft.care.shareClinical === 'yes',
    phoneNumber: draft.care.sharePhone === 'yes',
    partnerMayContact: draft.care.allowFollowUp === 'yes',
    workerNote: draft.note.trim().length > 0,
    phoneTravelsInsideClinicalParagraph: false,
  }
}

function joinList(items: string[]): string {
  if (items.length <= 1) return items[0] ?? ''
  return `${items.slice(0, -1).join(', ')} and ${items[items.length - 1]}`
}

export function summariseDelivery(contents: ShareContents): string {
  const received: string[] = []
  if (contents.clinicalParagraph) {
    received.push(contents.phoneTravelsInsideClinicalParagraph
      ? 'the clinical paragraph, including the phone number'
      : 'the clinical paragraph, without the phone number')
  }
  if (contents.phoneNumber && !contents.phoneTravelsInsideClinicalParagraph) {
    received.push('the phone number 555-0148')
  }
  if (contents.partnerMayContact) received.push('permission for Northside to contact Alex')
  if (contents.workerNote) received.push('the worker\'s note')
  if (received.length === 0) {
    return 'Northside would receive the referral request with no clinical paragraph, no phone number, no permission to contact Alex, and no note.'
  }
  return `Northside would receive ${joinList(received)}.`
}

export function partnerPreview(variant: VariantId, draft: ReferralDraft): PartnerPreview {
  if (variant === 'conventional') {
    if (!draft.bundledShare) {
      return {
        state: 'blocked',
        reason: 'The conventional screen will not send this referral unless the bundled share box is checked. Refusing the share and finishing the task are the same action.',
      }
    }
    const contents = shareContents(variant, draft)
    return {
      state: 'ready',
      contents,
      summary: summariseDelivery(contents),
      warnings: ['The phone number sits inside the clinical paragraph, so the bundled share sends both.'],
    }
  }

  const { shareClinical, sharePhone, allowFollowUp } = draft.care
  if (!shareClinical || !sharePhone || !allowFollowUp) {
    return {
      state: 'blocked',
      reason: 'Each sharing question needs an answer. Choosing “No” still lets the worker send the referral.',
    }
  }

  const contents = shareContents(variant, draft)
  const warnings: string[] = []
  if (contents.clinicalParagraph && draft.disclosure !== 'opened') {
    warnings.push('The clinical paragraph would be shared even though it was not opened.')
  }
  if (contents.clinicalParagraph && !contents.phoneNumber) {
    warnings.push('The copy sent to Northside leaves the phone number out of the clinical paragraph.')
  }
  return { state: 'ready', contents, summary: summariseDelivery(contents), warnings }
}

export function interruptionResult(variant: VariantId, draft: ReferralDraft): {
  draft: ReferralDraft
  preserved: boolean
  message: string
} {
  if (variant === 'conventional') {
    return {
      draft: createDraft(),
      preserved: false,
      message: 'The session timed out. The note and the share checkbox were discarded.',
    }
  }
  return {
    draft,
    preserved: true,
    message: 'The call ended. The note, the disclosure choice, and the sharing answers are where you left them. Nothing was sent.',
  }
}

export function nextCaseAfterSend(variant: VariantId): 'immediate' | 'when-ready' {
  return variant === 'conventional' ? 'immediate' : 'when-ready'
}

export function usesAutomaticPrompt(variant: VariantId): boolean {
  return variant === 'care-conscious-prompt'
}

export const consentSteps = [
  {
    question: 'Share the clinical paragraph with Northside Housing Advice?',
    hint: 'The copy they receive leaves the phone number out. You can send the referral without the paragraph.',
    options: [
      { label: 'Yes, share the paragraph', value: 'yes' },
      { label: 'No, leave the paragraph out', value: 'no' },
    ],
  },
  {
    question: 'Share Alex\'s phone number with Northside?',
    hint: 'The number is 555-0148. It is held separately from the clinical paragraph.',
    options: [
      { label: 'Yes, share the phone number', value: 'yes' },
      { label: 'No, leave the phone number out', value: 'no' },
    ],
  },
  {
    question: 'May Northside contact Alex directly?',
    hint: 'You can still send the referral if the answer is no. You would follow up yourself.',
    options: [
      { label: 'Yes, Northside may contact Alex', value: 'yes' },
      { label: 'No, I will follow up', value: 'no' },
    ],
  },
]
