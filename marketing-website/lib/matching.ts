import type { TalentProfile, JobRow } from './supabase/types'

export type MatchResult = {
  score: number        // 0–100
  band: 'strong' | 'good' | 'fair' | 'low'
  reasons: string[]
}

const SECTORS = [
  'Construction', 'Healthcare', 'Mining & Natural Resources', 'Hospitality',
  'Logistics & Transport', 'Agriculture & Fisheries', 'IT & Telecommunications',
  'Government & Public Sector', 'Retail & FMCG', 'Manufacturing', 'Security',
]

/** Normalise a job type string for comparison */
function normType(t: string | null) {
  if (!t) return ''
  const s = t.toLowerCase()
  if (s.includes('permanent')) return 'Permanent'
  if (s.includes('contract'))  return 'Contract'
  if (s.includes('temporary')) return 'Temporary'
  return t
}

export function calculateMatchScore(
  profile: Pick<TalentProfile,
    'preferred_sectors' | 'preferred_location' | 'employment_type' |
    'years_experience' | 'skills' | 'preferred_sector'>,
  job: Pick<JobRow, 'sector' | 'location' | 'type' | 'requirements' | 'urgent'>
): MatchResult {
  let score = 0
  const reasons: string[] = []

  // ── Sector match (30 pts) ─────────────────────────────────
  const sectors = profile.preferred_sectors?.length
    ? profile.preferred_sectors
    : profile.preferred_sector ? [profile.preferred_sector] : []

  if (sectors.some(s => s === job.sector || s === 'Open to any sector')) {
    score += 30
    reasons.push(`Sector match: ${job.sector}`)
  }

  // ── Location match (20 pts) ───────────────────────────────
  const prefLoc = profile.preferred_location?.toLowerCase() ?? ''
  const jobLoc  = job.location.toLowerCase()
  if (
    prefLoc === jobLoc ||
    prefLoc.includes('anywhere') ||
    prefLoc.includes('any') ||
    jobLoc === 'nationwide' ||
    jobLoc === 'tba'
  ) {
    score += 20
    reasons.push('Location compatible')
  }

  // ── Employment type (20 pts) ──────────────────────────────
  const prefType = normType(profile.employment_type)
  if (!prefType || prefType.toLowerCase().includes('any') || prefType === normType(job.type)) {
    score += 20
    reasons.push(`Type: ${job.type}`)
  }

  // ── Experience level (15 pts) ─────────────────────────────
  const exp = profile.years_experience ?? ''
  const hasExp = exp && exp !== 'Less than 1 year'
  if (hasExp) {
    score += 15
    reasons.push('Relevant experience')
  } else if (exp) {
    score += 7
  }

  // ── Skills keyword overlap (15 pts) ───────────────────────
  const profileSkills = (profile.skills ?? []).map(s => s.toLowerCase())
  const jobReqs = (job.requirements ?? []).map(r => r.toLowerCase())
  const matchedSkills = profileSkills.filter(sk =>
    jobReqs.some(req => req.includes(sk) || sk.includes(req.split(' ')[0]))
  )
  if (matchedSkills.length >= 3) {
    score += 15
    reasons.push(`${matchedSkills.length} skill matches`)
  } else if (matchedSkills.length >= 1) {
    score += 7
    reasons.push(`${matchedSkills.length} skill match`)
  }

  const final = Math.min(100, score)
  return {
    score: final,
    band: final >= 80 ? 'strong' : final >= 60 ? 'good' : final >= 40 ? 'fair' : 'low',
    reasons,
  }
}

export function bandLabel(band: MatchResult['band']) {
  return { strong: 'Strong match', good: 'Good match', fair: 'Fair match', low: 'Low match' }[band]
}

export function bandColor(band: MatchResult['band']) {
  return {
    strong: 'text-green-700 bg-green-50 border-green-200',
    good:   'text-brand-blue bg-brand-blue/8 border-brand-blue/15',
    fair:   'text-brand-orange bg-brand-orange/8 border-brand-orange/15',
    low:    'text-black/40 bg-black/5 border-black/10',
  }[band]
}

export { SECTORS }
