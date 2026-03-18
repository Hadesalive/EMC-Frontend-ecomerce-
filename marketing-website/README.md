# Express Management Consultancy — Marketing Website

Full-stack marketing and operations platform for EMC, a recruitment & management consultancy based in Freetown, Sierra Leone. Built with Next.js App Router, Supabase, Tailwind CSS, and TypeScript.

---

## Progress Report (as of March 2026)

### Public-Facing Site

| Area | Status | Notes |
|---|---|---|
| Home page | Done | Hero, Services, Features (dark), Jobs preview, CTA |
| About page | Done | Company story, team members, values |
| Services page | Done | Full service catalogue |
| Solutions page | Done | Industry-focused solutions |
| Contact page | Done | Form with email notification |
| Jobs listing `/jobs` | Done | Live DB feed, search/filter, background image |
| Job detail `/jobs/[id]` | Done | Full JD, apply CTA, related roles, background image, SEO structured data, OG image |
| Apply form `/apply` | Done | Email-first flow, CV upload to Supabase Storage, email notifications |
| Placement request form | Done | Employer-side hiring request form |

### Admin Dashboard (`/dashboard`)

| Area | Status | Notes |
|---|---|---|
| Overview / stats | Done | Key metrics cards |
| Applications table | Done | View, filter, status update, CV viewer |
| Application detail | Done | Full profile, CV viewer modal, status history |
| Pipeline board | Done | Kanban drag-to-move, horizontal scroll fixed |
| Jobs management | Done | Create, edit, toggle active/urgent, set deadline |
| Talent pool | Done | Candidate search and browse |
| Requests | Done | Employer placement requests |
| Analytics | Done | Charts and summary stats |
| Users | Done | Admin user management |
| Content CMS | Done | Edit Home, About, Contact, Team content from dashboard |

### Candidate Portal (`/candidate`)

| Area | Status | Notes |
|---|---|---|
| Dashboard | Done | Overview of applications and saved jobs |
| Applications | Done | Track application status |
| Saved jobs | Done | Bookmark and revisit listings |
| Job browse | Done | Filter and apply from portal |
| Profile editor | Done | Edit personal info, skills, experience |
| Profile setup | Done | Onboarding flow for new candidates |
| Notifications | Done | In-app notification list |

### Infrastructure & Integrations

| Area | Status | Notes |
|---|---|---|
| Auth (Supabase) | Done | Login, register, role-based routing (admin / candidate) |
| Database (Supabase) | Done | Jobs, applications, users, content, team, notifications tables |
| CV Storage | Done | Migrated from Cloudinary → Supabase Storage (`cvs` bucket, public) |
| CV Viewer | Done | PDF inline via `/api/cv-proxy`, Word via Google Docs viewer |
| Email (Resend) | Done | Application confirmation + admin notification |
| Image uploads | Done | Cloudinary for general images (logos, team photos) |
| SEO | Done | Metadata API, structured data (JSON-LD), canonical URLs, OG images |
| CMS | Done | Content stored in Supabase, editable from dashboard |
| Accessibility | Done | ARIA labels, skip link, semantic HTML |
| Mobile | Done | Responsive, iOS zoom fix on form inputs |

---

## Pending / To Do

- [ ] **Create `cvs` Supabase Storage bucket** — Storage → New bucket → name: `cvs` → Public: ON
- [ ] **Run DB migrations** — `supabase/add_job_deadline.sql` then `supabase/update_jobs_freetown_logistics.sql`
- [ ] **Set Vercel env var** — `NEXT_PUBLIC_SITE_URL=https://www.expresssl.com`
- [ ] Dark mode polish — candidate portal dark mode consistency
- [ ] Resources page — currently placeholder

---

## Tech Stack

| Layer | Technology |
|---|---|
| Framework | Next.js 14+ (App Router) |
| Language | TypeScript |
| Styling | Tailwind CSS v4 |
| Database & Auth | Supabase (Postgres + Auth + Storage) |
| Email | Resend |
| Images | Cloudinary (general), Supabase Storage (CVs) |
| Icons | Phosphor Icons |
| Fonts | Inter + display font |
| Deployment | Vercel |

---

## Getting Started

### Prerequisites

- Node.js 18+
- A Supabase project
- A Resend account (for email)

### Installation

```bash
npm install
```

### Environment Variables

Create a `.env.local` file:

```env
NEXT_PUBLIC_SUPABASE_URL=your_supabase_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_anon_key
SUPABASE_SERVICE_ROLE_KEY=your_service_role_key
RESEND_API_KEY=your_resend_key
NEXT_PUBLIC_SITE_URL=https://www.expresssl.com
NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME=your_cloud_name
```

### Development

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

### Production Build

```bash
npm run build
npm start
```

---

## Project Structure

```
marketing-website/
├── app/
│   ├── page.tsx                    # Home
│   ├── about/                      # About page
│   ├── services/                   # Services page
│   ├── solutions/                  # Solutions page
│   ├── contact/                    # Contact page + form
│   ├── jobs/                       # Job listings + [id] detail
│   ├── apply/                      # Candidate application form
│   ├── request-placement/          # Employer request form
│   ├── resources/                  # Resources (placeholder)
│   ├── auth/                       # Login & register
│   ├── dashboard/                  # Admin dashboard
│   │   ├── applications/           # Applications table + detail
│   │   ├── pipeline/               # Kanban pipeline board
│   │   ├── jobs/                   # Job management
│   │   ├── talent/                 # Talent pool
│   │   ├── requests/               # Employer requests
│   │   ├── analytics/              # Stats & charts
│   │   ├── users/                  # User management
│   │   └── content/                # CMS editors
│   ├── candidate/                  # Candidate portal
│   │   ├── dashboard/
│   │   ├── applications/
│   │   ├── jobs/
│   │   ├── saved/
│   │   ├── profile/
│   │   └── notifications/
│   └── api/
│       └── cv-proxy/               # Server-side PDF proxy
├── components/
│   ├── Layout/                     # Header, Footer, SiteShell
│   ├── Home/                       # Hero, Features, ServicesSection, JobsPreview, CTA
│   ├── Contact/                    # ContactForm
│   └── dashboard/                  # CvViewer, ImageUpload
├── lib/
│   ├── supabase/                   # Client, server, middleware, types
│   ├── cms.ts                      # CMS data fetching
│   ├── cms-types.ts                # CMS content type definitions + defaults
│   ├── email.ts                    # Resend email helpers
│   ├── cloudinary.ts               # Cloudinary helpers + CV URL routing
│   └── matching.ts                 # Candidate-job matching logic
├── public/images/                  # Static assets
└── supabase/                       # SQL migrations
```

---

## Key Architectural Notes

- **CV Storage**: CVs are uploaded to Supabase Storage (`cvs` bucket, public). The `/api/cv-proxy` route serves PDFs inline with correct Content-Type headers. Word docs use Google Docs viewer.
- **CMS**: Page content (hero copy, features, CTA text, team members) is stored in a `site_content` Supabase table and editable from `/dashboard/content`. Components fall back to hardcoded defaults if no DB content exists.
- **Role-based routing**: On login, admins are routed to `/dashboard`, candidates to `/candidate/dashboard`.
- **SEO**: Every public page has full metadata (title, description, canonical, OG, Twitter). Job detail pages have JSON-LD `JobPosting` structured data and dynamic OG images.

---

Copyright © Express Management Consultancy
