import { Resend } from 'resend'
import type { ApplicationRow } from './supabase/types'

const resend = new Resend(process.env.RESEND_API_KEY)

const FROM      = 'EMC Notifications <notifications@expresssl.com>'
const FROM_TEAM = 'Express Management Consultancy <recruitment@expresssl.com>'
const TO_TEAM   = process.env.NOTIFY_EMAIL ?? 'recruitment@expresssl.com'
const SITE      = process.env.NEXT_PUBLIC_SITE_URL ?? 'https://emcsl.com'

// ─── Shared helpers ──────────────────────────────────────────────────────────

function initials(name: string) {
  return name.split(' ').map(w => w[0]).join('').slice(0, 2).toUpperCase()
}

function row(label: string, value: string) {
  if (!value || value === '—') return ''
  return `
    <tr>
      <td style="padding:10px 16px 10px 0;width:36%;vertical-align:top">
        <span style="font-size:11px;font-weight:700;color:#9ca3af;text-transform:uppercase;letter-spacing:.06em">${label}</span>
      </td>
      <td style="padding:10px 0;vertical-align:top;border-bottom:1px solid #f3f4f6">
        <span style="font-size:14px;color:#111827;font-weight:500">${value}</span>
      </td>
    </tr>`
}

// ─── Application notification ────────────────────────────────────────────────

export async function sendApplicationNotification(data: {
  applicantName: string
  applicantEmail: string
  applicantPhone: string
  jobTitle: string | null
  sector: string
  cvUrl: string | null
  yearsExperience: string
  qualification: string
  currentRole: string
  summary: string
}) {
  const isGeneral  = !data.jobTitle
  const tagLine    = isGeneral ? 'General CV Submission' : `Applied for: ${data.jobTitle}`
  const subject    = isGeneral
    ? `New General CV — ${data.applicantName}`
    : `New Application — ${data.jobTitle}`

  const dashboardUrl = `${SITE}/dashboard/applications`
  const cvViewerUrl  = data.cvUrl
    ? `https://docs.google.com/viewer?url=${encodeURIComponent(data.cvUrl)}`
    : null

  const html = `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width,initial-scale=1" />
  <title>${subject}</title>
</head>
<body style="margin:0;padding:0;background:#f3f4f6;font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,sans-serif">
<table width="100%" cellpadding="0" cellspacing="0" border="0" style="background:#f3f4f6;padding:40px 16px">
  <tr><td align="center">
  <table width="600" cellpadding="0" cellspacing="0" border="0" style="max-width:600px;width:100%">

    <!--  Orange accent bar  -->
    <tr>
      <td style="height:4px;background:#f97316;border-radius:4px 4px 0 0"></td>
    </tr>

    <!--  Header  -->
    <tr>
      <td style="background:#0a0a0a;padding:28px 36px 24px">
        <table width="100%" cellpadding="0" cellspacing="0" border="0">
          <tr>
            <td>
              <p style="margin:0 0 2px;font-size:11px;font-weight:700;letter-spacing:.12em;text-transform:uppercase;color:#f97316">
                Express Management Consultancy
              </p>
              <p style="margin:0;font-size:11px;color:#6b7280;letter-spacing:.04em">
                Recruitment &amp; HR Consultancy · Sierra Leone
              </p>
            </td>
            <td align="right" style="vertical-align:middle">
              <span style="display:inline-block;padding:4px 10px;background:#f97316;color:#fff;font-size:10px;font-weight:700;letter-spacing:.08em;text-transform:uppercase;border-radius:4px">
                ${isGeneral ? 'General CV' : 'New Application'}
              </span>
            </td>
          </tr>
        </table>

        <div style="margin-top:20px;padding-top:20px;border-top:1px solid #1f2937">
          <p style="margin:0 0 6px;font-size:13px;color:#9ca3af">
            ${isGeneral ? 'Talent roster submission' : `Position applied for`}
          </p>
          <h1 style="margin:0;font-size:24px;font-weight:700;color:#ffffff;line-height:1.2">
            ${isGeneral ? data.applicantName : data.jobTitle}
          </h1>
          ${!isGeneral ? `<p style="margin:6px 0 0;font-size:14px;color:#6b7280">by ${data.applicantName}</p>` : ''}
        </div>
      </td>
    </tr>

    <!--  Candidate card  -->
    <tr>
      <td style="background:#ffffff;padding:28px 36px 0">
        <table width="100%" cellpadding="0" cellspacing="0" border="0">
          <tr>
            <td style="vertical-align:middle">
              <!--  Avatar  -->
              <table cellpadding="0" cellspacing="0" border="0">
                <tr>
                  <td style="width:52px;height:52px;background:#eff6ff;border-radius:50%;text-align:center;vertical-align:middle;font-size:18px;font-weight:700;color:#1d4ed8">
                    ${initials(data.applicantName)}
                  </td>
                  <td style="padding-left:16px">
                    <p style="margin:0;font-size:18px;font-weight:700;color:#111827">${data.applicantName}</p>
                    ${data.currentRole ? `<p style="margin:3px 0 0;font-size:13px;color:#6b7280">${data.currentRole}</p>` : ''}
                    <table cellpadding="0" cellspacing="0" border="0" style="margin-top:8px">
                      <tr>
                        <td style="padding-right:12px">
                          <a href="mailto:${data.applicantEmail}"
                            style="font-size:13px;color:#1d4ed8;text-decoration:none">${data.applicantEmail}</a>
                        </td>
                        ${data.applicantPhone ? `
                        <td>
                          <span style="font-size:13px;color:#6b7280">${data.applicantPhone}</span>
                        </td>` : ''}
                      </tr>
                    </table>
                  </td>
                </tr>
              </table>
            </td>
            <td align="right" style="vertical-align:top">
              <span style="display:inline-block;padding:5px 12px;background:#f0fdf4;color:#16a34a;font-size:12px;font-weight:600;border-radius:20px;border:1px solid #bbf7d0">
                ${data.sector || 'Open'}
              </span>
            </td>
          </tr>
        </table>
      </td>
    </tr>

    <!--  Details table  -->
    <tr>
      <td style="background:#ffffff;padding:20px 36px 0">
        <p style="margin:0 0 12px;font-size:11px;font-weight:700;color:#9ca3af;text-transform:uppercase;letter-spacing:.08em">
          Candidate Details
        </p>
        <table width="100%" cellpadding="0" cellspacing="0" border="0" style="border-top:1px solid #f3f4f6">
          ${row('Experience',   data.yearsExperience)}
          ${row('Qualification', data.qualification)}
          ${row('Sector',       data.sector)}
          ${row('Email',        `<a href="mailto:${data.applicantEmail}" style="color:#1d4ed8;text-decoration:none">${data.applicantEmail}</a>`)}
          ${row('Phone',        data.applicantPhone)}
        </table>
      </td>
    </tr>

    <!--  Summary  -->
    ${data.summary ? `
    <tr>
      <td style="background:#ffffff;padding:20px 36px 0">
        <p style="margin:0 0 10px;font-size:11px;font-weight:700;color:#9ca3af;text-transform:uppercase;letter-spacing:.08em">
          Professional Summary
        </p>
        <div style="padding:16px;background:#f9fafb;border-left:3px solid #f97316;border-radius:0 8px 8px 0">
          <p style="margin:0;font-size:14px;color:#374151;line-height:1.7">${data.summary}</p>
        </div>
      </td>
    </tr>` : ''}

    <!--  CTA buttons  -->
    <tr>
      <td style="background:#ffffff;padding:28px 36px 32px">
        <table cellpadding="0" cellspacing="0" border="0">
          <tr>
            ${cvViewerUrl ? `
            <td style="padding-right:12px">
              <a href="${cvViewerUrl}" target="_blank"
                style="display:inline-block;padding:13px 24px;background:#0a0a0a;color:#ffffff;text-decoration:none;font-size:14px;font-weight:600;border-radius:8px;letter-spacing:.01em">
                View CV &rarr;
              </a>
            </td>` : ''}
            <td>
              <a href="${dashboardUrl}"
                style="display:inline-block;padding:13px 24px;background:#ffffff;color:#111827;text-decoration:none;font-size:14px;font-weight:600;border-radius:8px;border:1.5px solid #e5e7eb;letter-spacing:.01em">
                Open Dashboard
              </a>
            </td>
          </tr>
        </table>
      </td>
    </tr>

    <!--  Divider  -->
    <tr>
      <td style="background:#ffffff;padding:0 36px">
        <div style="height:1px;background:#f3f4f6"></div>
      </td>
    </tr>

    <!--  Footer  -->
    <tr>
      <td style="background:#ffffff;padding:20px 36px 24px;border-radius:0 0 4px 4px">
        <table width="100%" cellpadding="0" cellspacing="0" border="0">
          <tr>
            <td>
              <p style="margin:0;font-size:12px;color:#9ca3af;line-height:1.6">
                <strong style="color:#6b7280">Express Management Consultancy</strong><br>
                10 Waterside Road, Wilberforce, Freetown, Sierra Leone<br>
                <a href="mailto:recruitment@expresssl.com" style="color:#9ca3af">recruitment@expresssl.com</a>
              </p>
            </td>
            <td align="right" style="vertical-align:top">
              <p style="margin:0;font-size:11px;color:#d1d5db">
                Sent via EMC Dashboard
              </p>
            </td>
          </tr>
        </table>
      </td>
    </tr>

    <!--  Bottom accent  -->
    <tr>
      <td style="height:4px;background:#0a0a0a;border-radius:0 0 4px 4px"></td>
    </tr>

  </table>
  </td></tr>
</table>
</body>
</html>`

  await resend.emails.send({
    from:    FROM,
    to:      TO_TEAM,
    replyTo: data.applicantEmail,
    subject,
    html,
  })
}

// ─── Status notification to candidate ───────────────────────────────────────

type NotifiableStatus = Exclude<ApplicationRow['status'], 'pending'>

const STATUS_META: Record<NotifiableStatus, { subject: string; headline: string; color: string; label: string }> = {
  reviewing:   { subject: 'We\'ve received your application',        headline: 'Application Under Review',    color: '#1d4ed8', label: 'Reviewing'   },
  shortlisted: { subject: 'Great news — you\'ve been shortlisted!',  headline: 'You\'ve Been Shortlisted',     color: '#d97706', label: 'Shortlisted' },
  interview:   { subject: 'Interview invitation from EMC',           headline: 'You\'re Invited to Interview', color: '#7c3aed', label: 'Interview'   },
  placed:      { subject: 'Congratulations — you\'ve been placed!',  headline: 'Placement Confirmed',          color: '#16a34a', label: 'Placed'      },
  rejected:    { subject: 'Update on your application with EMC',     headline: 'Application Update',           color: '#6b7280', label: 'Update'      },
}

export const DEFAULT_STATUS_MESSAGES: Record<NotifiableStatus, (name: string, role: string | null) => string> = {
  reviewing:   (name, role) =>
    `Hi ${name},\n\nThank you for applying${role ? ` for the ${role} position` : ''}. We've received your application and our team is currently reviewing it.\n\nWe'll be in touch shortly with an update.`,

  shortlisted: (name, role) =>
    `Hi ${name},\n\nGreat news! After reviewing your application${role ? ` for ${role}` : ''}, we're pleased to let you know that you've been shortlisted for the next stage of our selection process.\n\nWe'll be in contact soon with further details.`,

  interview:   (name, role) =>
    `Hi ${name},\n\nCongratulations! We'd like to invite you to an interview${role ? ` for the ${role} position` : ''}.\n\nOur team will be in touch very soon to confirm the date, time, and location.`,

  placed:      (name, role) =>
    `Hi ${name},\n\nWe're absolutely delighted to confirm that you've been successfully placed${role ? ` in the ${role} role` : ''}. Congratulations!\n\nA member of our team will be in contact shortly with the next steps and onboarding details.`,

  rejected:    (name, role) =>
    `Hi ${name},\n\nThank you for your interest in${role ? ` the ${role} position at` : ''} Express Management Consultancy and for taking the time to apply.\n\nAfter careful consideration, we regret to inform you that we will not be moving forward with your application at this time. This was a difficult decision given the quality of applications we received.\n\nWe will keep your details on file and will be in touch should a suitable opportunity arise in the future.\n\nWe wish you the very best in your job search.`,
}

export async function sendStatusNotification(data: {
  candidateName: string
  candidateEmail: string
  jobTitle: string | null
  status: NotifiableStatus
  message: string        // editable by admin before sending
}) {
  const meta = STATUS_META[data.status]
  const paragraphs = data.message.split('\n\n').filter(Boolean)

  const html = `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width,initial-scale=1" />
  <title>${meta.subject}</title>
</head>
<body style="margin:0;padding:0;background:#f3f4f6;font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,sans-serif">
<table width="100%" cellpadding="0" cellspacing="0" border="0" style="background:#f3f4f6;padding:40px 16px">
  <tr><td align="center">
  <table width="600" cellpadding="0" cellspacing="0" border="0" style="max-width:600px;width:100%">

    <!--  Top accent  -->
    <tr>
      <td style="height:4px;background:${meta.color};border-radius:4px 4px 0 0"></td>
    </tr>

    <!--  Header  -->
    <tr>
      <td style="background:#0a0a0a;padding:28px 36px 24px">
        <table width="100%" cellpadding="0" cellspacing="0" border="0">
          <tr>
            <td>
              <p style="margin:0 0 2px;font-size:11px;font-weight:700;letter-spacing:.12em;text-transform:uppercase;color:#f97316">
                Express Management Consultancy
              </p>
              <p style="margin:0;font-size:11px;color:#6b7280;letter-spacing:.04em">
                Recruitment &amp; HR Consultancy · Sierra Leone
              </p>
            </td>
            <td align="right" style="vertical-align:middle">
              <span style="display:inline-block;padding:4px 12px;background:${meta.color};color:#fff;font-size:10px;font-weight:700;letter-spacing:.08em;text-transform:uppercase;border-radius:4px">
                ${meta.label}
              </span>
            </td>
          </tr>
        </table>

        <div style="margin-top:20px;padding-top:20px;border-top:1px solid #1f2937">
          <h1 style="margin:0;font-size:22px;font-weight:700;color:#ffffff;line-height:1.2">
            ${meta.headline}
          </h1>
          ${data.jobTitle ? `<p style="margin:6px 0 0;font-size:14px;color:#6b7280">${data.jobTitle}</p>` : ''}
        </div>
      </td>
    </tr>

    <!--  Body  -->
    <tr>
      <td style="background:#ffffff;padding:32px 36px">
        ${paragraphs.map(p =>
          `<p style="margin:0 0 16px;font-size:15px;color:#374151;line-height:1.7">${p.replace(/\n/g, '<br>')}</p>`
        ).join('')}
      </td>
    </tr>

    <!--  CTA  -->
    <tr>
      <td style="background:#ffffff;padding:0 36px 32px">
        <div style="height:1px;background:#f3f4f6;margin-bottom:24px"></div>
        <p style="margin:0 0 16px;font-size:13px;color:#9ca3af">
          Questions about your application? Reply to this email or contact us directly.
        </p>
        <table cellpadding="0" cellspacing="0" border="0">
          <tr>
            <td style="padding-right:12px">
              <a href="mailto:${TO_TEAM}"
                style="display:inline-block;padding:12px 22px;background:#0a0a0a;color:#fff;text-decoration:none;font-size:14px;font-weight:600;border-radius:8px">
                Contact EMC
              </a>
            </td>
            <td>
              <a href="${SITE}/jobs"
                style="display:inline-block;padding:12px 22px;background:#fff;color:#111827;text-decoration:none;font-size:14px;font-weight:600;border-radius:8px;border:1.5px solid #e5e7eb">
                Browse Jobs
              </a>
            </td>
          </tr>
        </table>
      </td>
    </tr>

    <!--  Footer  -->
    <tr>
      <td style="background:#f9fafb;padding:20px 36px;border-top:1px solid #f3f4f6;border-radius:0 0 4px 4px">
        <p style="margin:0;font-size:12px;color:#9ca3af;line-height:1.6">
          <strong style="color:#6b7280">Express Management Consultancy</strong><br>
          10 Waterside Road, Wilberforce, Freetown, Sierra Leone<br>
          <a href="mailto:recruitment@expresssl.com" style="color:#9ca3af;text-decoration:none">recruitment@expresssl.com</a>
          &nbsp;·&nbsp;
          <a href="${SITE}" style="color:#9ca3af;text-decoration:none">emcsl.com</a>
        </p>
      </td>
    </tr>

    <!--  Bottom accent  -->
    <tr>
      <td style="height:4px;background:#0a0a0a;border-radius:0 0 4px 4px"></td>
    </tr>

  </table>
  </td></tr>
</table>
</body>
</html>`

  await resend.emails.send({
    from:    FROM_TEAM,
    to:      data.candidateEmail,
    subject: meta.subject + (data.jobTitle ? ` — ${data.jobTitle}` : ''),
    html,
  })
}
