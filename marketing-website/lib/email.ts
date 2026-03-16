import { Resend } from 'resend'
import type { NotifiableStatus } from './status-messages'

export { DEFAULT_STATUS_MESSAGES } from './status-messages'

const resend = new Resend(process.env.RESEND_API_KEY)

const FROM      = 'Express Management Consultancy <notifications@expresssl.com>'
const FROM_TEAM = 'Express Management Consultancy <recruitment@expresssl.com>'
const TO_TEAM   = process.env.NOTIFY_EMAIL ?? 'recruitment@expresssl.com'
const SITE      = process.env.NEXT_PUBLIC_SITE_URL ?? 'https://expresssl.com'

const LOGO_URL  = `${SITE}/images/Emc%20Logo%20header.png`

// ─── Shared layout helpers ────────────────────────────────────────────────────

function emailWrapper(content: string) {
  return `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width,initial-scale=1" />
</head>
<body style="margin:0;padding:0;background:#f0f0f0;font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,Helvetica,Arial,sans-serif">
<table width="100%" cellpadding="0" cellspacing="0" border="0" style="background:#f0f0f0;padding:32px 16px">
  <tr><td align="center">
  <table width="600" cellpadding="0" cellspacing="0" border="0" style="max-width:600px;width:100%;background:#ffffff">

    <!-- Logo header -->
    <tr>
      <td style="padding:32px 40px 24px;border-bottom:1px solid #e5e7eb">
        <img src="${LOGO_URL}" alt="Express Management Consultancy" height="40" style="height:40px;width:auto;display:block" />
      </td>
    </tr>

    ${content}

    <!-- Footer -->
    <tr>
      <td style="padding:24px 40px;border-top:1px solid #e5e7eb;background:#fafafa">
        <p style="margin:0;font-size:12px;color:#9ca3af;line-height:1.7">
          Express Management Consultancy<br>
          10 Waterside Road, Wilberforce, Freetown, Sierra Leone<br>
          <a href="mailto:recruitment@expresssl.com" style="color:#9ca3af;text-decoration:none">recruitment@expresssl.com</a>
          &nbsp;&middot;&nbsp;
          <a href="${SITE}" style="color:#9ca3af;text-decoration:none">expresssl.com</a>
        </p>
      </td>
    </tr>

  </table>
  </td></tr>
</table>
</body>
</html>`
}

function detailRow(label: string, value: string) {
  if (!value) return ''
  return `
    <tr>
      <td style="padding:10px 16px 10px 0;width:40%;vertical-align:top;font-size:13px;color:#6b7280">${label}</td>
      <td style="padding:10px 0;vertical-align:top;font-size:13px;color:#111827;font-weight:500">${value}</td>
    </tr>`
}

// ─── Contact form enquiry (to EMC team) ──────────────────────────────────────

export async function sendContactEnquiry(data: {
  firstName: string
  lastName: string
  email: string
  company: string
  service: string
  message: string
}) {
  const subject = `New enquiry — ${data.firstName} ${data.lastName}${data.company ? ` from ${data.company}` : ''}`

  const body = `
    <!-- Heading -->
    <tr>
      <td style="padding:32px 40px 0">
        <span style="display:inline-block;font-size:12px;font-weight:600;color:#f97316;text-transform:uppercase;letter-spacing:0.06em">Website Enquiry</span>
        <h1 style="margin:8px 0 0;font-size:22px;font-weight:700;color:#111827;line-height:1.3">${data.firstName} ${data.lastName}</h1>
        ${data.company ? `<p style="margin:4px 0 0;font-size:14px;color:#6b7280">${data.company}</p>` : ''}
      </td>
    </tr>

    <!-- Details -->
    <tr>
      <td style="padding:24px 40px">
        <table width="100%" cellpadding="0" cellspacing="0" border="0" style="border-top:1px solid #e5e7eb">
          <tr>
            <td style="padding:10px 16px 10px 0;width:40%;font-size:13px;color:#6b7280;vertical-align:top">Email</td>
            <td style="padding:10px 0;font-size:13px;color:#111827;font-weight:500;vertical-align:top">
              <a href="mailto:${data.email}" style="color:#2563eb;text-decoration:none">${data.email}</a>
            </td>
          </tr>
          ${data.service ? `
          <tr>
            <td style="padding:10px 16px 10px 0;width:40%;font-size:13px;color:#6b7280;vertical-align:top">Service</td>
            <td style="padding:10px 0;font-size:13px;color:#111827;font-weight:500;vertical-align:top">${data.service}</td>
          </tr>` : ''}
        </table>
      </td>
    </tr>

    <!-- Message -->
    <tr>
      <td style="padding:0 40px 40px">
        <p style="margin:0 0 8px;font-size:12px;font-weight:600;color:#6b7280;text-transform:uppercase;letter-spacing:0.06em">Message</p>
        <p style="margin:0;font-size:14px;color:#374151;line-height:1.7;padding:16px;background:#f9fafb;border-left:3px solid #2563eb;white-space:pre-line">${data.message}</p>
      </td>
    </tr>

    <!-- Reply CTA -->
    <tr>
      <td style="padding:0 40px 40px">
        <a href="mailto:${data.email}" style="display:inline-block;padding:12px 24px;background:#111827;color:#ffffff;text-decoration:none;font-size:14px;font-weight:600;border-radius:6px">
          Reply to ${data.firstName} &rarr;
        </a>
      </td>
    </tr>`

  await resend.emails.send({
    from:    FROM,
    to:      TO_TEAM,
    replyTo: data.email,
    subject,
    html:    emailWrapper(body),
  })
}

// ─── Application notification (to EMC team) ───────────────────────────────────

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
  const isGeneral = !data.jobTitle
  const subject   = isGeneral
    ? `New CV submission — ${data.applicantName}`
    : `New application — ${data.jobTitle}`

  const dashboardUrl = `${SITE}/dashboard/applications`
  const cvLink = data.cvUrl
    ? `<a href="https://docs.google.com/viewer?url=${encodeURIComponent(data.cvUrl)}" style="color:#2563eb">View CV</a>`
    : '—'

  const body = `
    <!-- Label -->
    <tr>
      <td style="padding:32px 40px 0">
        <span style="display:inline-block;font-size:12px;font-weight:600;color:#f97316;text-transform:uppercase;letter-spacing:0.06em">
          ${isGeneral ? 'General CV Submission' : 'Job Application'}
        </span>
      </td>
    </tr>

    <!-- Heading -->
    <tr>
      <td style="padding:8px 40px 0">
        <h1 style="margin:0;font-size:22px;font-weight:700;color:#111827;line-height:1.3">${data.applicantName}</h1>
        ${data.currentRole ? `<p style="margin:4px 0 0;font-size:14px;color:#6b7280">${data.currentRole}</p>` : ''}
        ${!isGeneral ? `<p style="margin:6px 0 0;font-size:14px;color:#374151">Applying for: <strong>${data.jobTitle}</strong></p>` : ''}
      </td>
    </tr>

    <!-- Details -->
    <tr>
      <td style="padding:24px 40px">
        <table width="100%" cellpadding="0" cellspacing="0" border="0" style="border-top:1px solid #e5e7eb">
          ${detailRow('Email', `<a href="mailto:${data.applicantEmail}" style="color:#2563eb;text-decoration:none">${data.applicantEmail}</a>`)}
          ${detailRow('Phone', data.applicantPhone)}
          ${detailRow('Sector', data.sector)}
          ${detailRow('Experience', data.yearsExperience)}
          ${detailRow('Qualification', data.qualification)}
          ${detailRow('CV', cvLink)}
        </table>
      </td>
    </tr>

    ${data.summary ? `
    <!-- Summary -->
    <tr>
      <td style="padding:0 40px 24px">
        <p style="margin:0 0 8px;font-size:12px;font-weight:600;color:#6b7280;text-transform:uppercase;letter-spacing:0.06em">Summary</p>
        <p style="margin:0;font-size:14px;color:#374151;line-height:1.7;padding:16px;background:#f9fafb;border-left:3px solid #2563eb">${data.summary}</p>
      </td>
    </tr>` : ''}

    <!-- CTA -->
    <tr>
      <td style="padding:0 40px 40px">
        <a href="${dashboardUrl}" style="display:inline-block;padding:12px 24px;background:#111827;color:#ffffff;text-decoration:none;font-size:14px;font-weight:600;border-radius:6px">
          Open Dashboard &rarr;
        </a>
      </td>
    </tr>`

  await resend.emails.send({
    from:    FROM,
    to:      TO_TEAM,
    replyTo: data.applicantEmail,
    subject,
    html:    emailWrapper(body),
  })
}

// ─── Status notification (to candidate) ──────────────────────────────────────

const STATUS_META: Record<NotifiableStatus, { subject: string; heading: string }> = {
  reviewing:   { subject: "We've received your application",       heading: 'Application received'        },
  shortlisted: { subject: "You've been shortlisted",              heading: "You've been shortlisted"     },
  interview:   { subject: 'Interview invitation from EMC',        heading: 'Interview invitation'        },
  placed:      { subject: 'Congratulations — placement confirmed', heading: 'Placement confirmed'         },
  rejected:    { subject: 'Update on your application',           heading: 'Application update'          },
}

export async function sendStatusNotification(data: {
  candidateName: string
  candidateEmail: string
  jobTitle: string | null
  status: NotifiableStatus
  message: string
}) {
  const meta       = STATUS_META[data.status]
  const paragraphs = data.message.split('\n\n').filter(Boolean)

  const body = `
    <!-- Heading -->
    <tr>
      <td style="padding:32px 40px 0">
        <h1 style="margin:0;font-size:22px;font-weight:700;color:#111827;line-height:1.3">${meta.heading}</h1>
        ${data.jobTitle ? `<p style="margin:6px 0 0;font-size:14px;color:#6b7280">${data.jobTitle}</p>` : ''}
      </td>
    </tr>

    <!-- Body -->
    <tr>
      <td style="padding:24px 40px 32px">
        ${paragraphs.map(p =>
          `<p style="margin:0 0 16px;font-size:15px;color:#374151;line-height:1.7">${p.replace(/\n/g, '<br>')}</p>`
        ).join('')}
      </td>
    </tr>

    <!-- CTAs -->
    <tr>
      <td style="padding:0 40px 40px;border-top:1px solid #e5e7eb">
        <p style="margin:0 0 16px;font-size:13px;color:#6b7280;padding-top:24px">Questions? Reply to this email or contact us directly.</p>
        <table cellpadding="0" cellspacing="0" border="0">
          <tr>
            <td style="padding-right:12px">
              <a href="mailto:${TO_TEAM}" style="display:inline-block;padding:11px 22px;background:#111827;color:#ffffff;text-decoration:none;font-size:14px;font-weight:600;border-radius:6px">
                Contact Us
              </a>
            </td>
            <td>
              <a href="${SITE}/jobs" style="display:inline-block;padding:11px 22px;background:#ffffff;color:#111827;text-decoration:none;font-size:14px;font-weight:600;border-radius:6px;border:1px solid #d1d5db">
                Browse Jobs
              </a>
            </td>
          </tr>
        </table>
      </td>
    </tr>`

  await resend.emails.send({
    from:    FROM_TEAM,
    to:      data.candidateEmail,
    subject: data.jobTitle ? `${meta.subject} — ${data.jobTitle}` : meta.subject,
    html:    emailWrapper(body),
  })
}
