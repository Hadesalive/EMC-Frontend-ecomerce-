# EMC Feature Backlog

Features to build — roughly in priority order.

---

## 1. Job Alerts Subscription

Candidates enter their email + preferred sector and get an email when a matching job is posted.

**What it needs:**
- `job_alerts` table in Supabase: `email`, `sector`, `created_at`, `confirmed`
- Subscribe form on the /jobs page (inline, below the filters)
- Unsubscribe link in every alert email
- Trigger: when a new job is inserted, query matching subscribers and send email via Resend
- Can use a Supabase database webhook or a server action called after job creation in the dashboard

**Impact:** Brings candidates back passively without relying on them checking the site.

---

## 2. Saved / Favourite Jobs

Let candidates save jobs they are interested in without needing to apply yet.

**What it needs:**
- Store saved job IDs in `localStorage` (no login required, simple)
- Heart/bookmark icon on each job card on /jobs and the job detail page
- A `/saved-jobs` page that loads the full job data for the saved IDs
- Show a count badge in the header if any jobs are saved

**Impact:** Makes the site feel like a proper job board, increases return visits.

---

## 3. Application Status Self-Check

Candidates enter their email on a page and see the status of all their applications without needing a full account login.

**What it needs:**
- Page at `/my-applications`
- Input: email address → look up talent_profiles by email → show linked applications with status and job title
- No auth required — email is the identifier
- Status badges matching the existing pipeline stages (pending, reviewing, shortlisted, etc.)

**Impact:** Reduces "what happened to my application?" enquiries to the team.

---

## 4. Client Shortlist Portal

When EMC has shortlisted candidates for a client role, generate a private shareable link the client can open to review candidates and leave feedback.

**What it needs:**
- `shortlists` table: `id`, `job_id`, `token` (random UUID), `client_name`, `expires_at`
- `shortlist_candidates` table: `shortlist_id`, `profile_id`, `notes`
- Dashboard action: "Create shortlist" on a job → select candidates → generates a link
- Public page at `/shortlist/[token]` — shows candidate summaries (name, role, experience, CV link) with a thumbs up/down or notes field for client feedback
- Feedback stored back in Supabase

**Impact:** Removes the back-and-forth of emailing CVs. Impresses clients. Differentiates EMC from competitors.

---

## 5. SMS Notifications via Twilio

Send an SMS to candidates when their application status changes, in addition to the email.

**What it needs:**
- Twilio account + `TWILIO_ACCOUNT_SID`, `TWILIO_AUTH_TOKEN`, `TWILIO_FROM_NUMBER` env vars
- `sendStatusSms(phone, message)` utility in `lib/sms.ts`
- Call alongside `sendStatusNotification` in the dashboard notify action
- Sierra Leone country code: +232

**Impact:** Reaches candidates who don't reliably check email. SMS open rate is ~98%.

---

## 6. Pipeline Auto-Reminders

If an application sits in a stage for too long, automatically remind the EMC team.

**What it needs:**
- A cron job (Vercel Cron or Supabase scheduled function) that runs daily
- Query applications where `updated_at` is older than X days and status is not terminal (placed/rejected)
- Send a digest email to the team listing stale applications
- Configurable thresholds per stage (e.g. "reviewing" for 5+ days, "interview" for 7+ days)

**Impact:** Nothing falls through the cracks. Better candidate experience.

---

## 7. Employer / Client Portal

Employers can log in, post job briefs directly, and see their active shortlists and placement history.

**What it needs:**
- New user role: `employer` (extends existing auth setup)
- Employer dashboard at `/employer/dashboard`
- Job brief submission form (simpler than the full admin job creation)
- View of their active roles and linked applications/shortlists
- Ability to download CVs and leave notes

**Impact:** Scales the business without scaling the team. Clients self-serve instead of emailing.

---

## 8. CV / Job Match Score

When a candidate applies, automatically score their profile against the job requirements and surface the score in the dashboard.

**What it needs:**
- Simple keyword/criteria matching logic (or Claude API for smarter matching)
- Score stored on the application record
- Shown as a badge in the Applications dashboard table
- Could also be used to auto-suggest relevant jobs to returning candidates

**Impact:** Saves recruiter time filtering applications. Surfaces the best candidates faster.

---

## Notes

- Features 1–3 are frontend/candidate-facing and can be shipped independently
- Features 4–6 are team/operations improvements
- Features 7–8 are larger platform plays
- WhatsApp share button — ✅ Done
- Returning applicant pre-fill — ✅ Done
- Duplicate application guard — ✅ Done
