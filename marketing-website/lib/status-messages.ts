import type { ApplicationRow } from './supabase/types'

export type NotifiableStatus = Exclude<ApplicationRow['status'], 'pending'>

export const DEFAULT_STATUS_MESSAGES: Record<NotifiableStatus, (name: string, role: string | null) => string> = {
  reviewing: (name, role) =>
    `Hi ${name},\n\nThank you for applying${role ? ` for the ${role} position` : ''}. We've received your application and our team is currently reviewing it.\n\nWe'll be in touch shortly with an update.`,

  shortlisted: (name, role) =>
    `Hi ${name},\n\nGreat news! After reviewing your application${role ? ` for ${role}` : ''}, we're pleased to let you know that you've been shortlisted for the next stage of our selection process.\n\nWe'll be in contact soon with further details.`,

  interview: (name, role) =>
    `Hi ${name},\n\nCongratulations! We'd like to invite you to an interview${role ? ` for the ${role} position` : ''}.\n\nOur team will be in touch very soon to confirm the date, time, and location.`,

  placed: (name, role) =>
    `Hi ${name},\n\nWe're absolutely delighted to confirm that you've been successfully placed${role ? ` in the ${role} role` : ''}. Congratulations!\n\nA member of our team will be in contact shortly with the next steps and onboarding details.`,

  rejected: (name, role) =>
    `Hi ${name},\n\nThank you for your interest in${role ? ` the ${role} position at` : ''} Express Management Consultancy and for taking the time to apply.\n\nAfter careful consideration, we regret to inform you that we will not be moving forward with your application at this time. This was a difficult decision given the quality of applications we received.\n\nWe will keep your details on file and will be in touch should a suitable opportunity arise in the future.\n\nWe wish you the very best in your job search.`,
}
