-- ─────────────────────────────────────────────────────────────────────────────
-- CMS Content Seed — full website
-- Covers: home, about, services, solutions, resources, global, contact
-- Run in Supabase SQL Editor
-- Safe to re-run: uses INSERT ... ON CONFLICT DO UPDATE
-- ─────────────────────────────────────────────────────────────────────────────

-- ─── HOME / HERO ─────────────────────────────────────────────────────────────
-- Fields rendered: subheadline, cta_primary(+href), cta_secondary(+href),
--                  image_url, image_alt
-- Hardcoded in Hero.tsx (not CMS): headline, "Looking for a job?" strip

INSERT INTO public.site_content (page, section, content, updated_at)
VALUES (
  'home', 'hero',
  '{
    "subheadline": "Sierra Leone''s specialist recruitment and HR practice. We help growing businesses hire the right people, build stronger teams, and put the HR structures in place to scale.",
    "cta_primary": "Get in Touch",
    "cta_primary_href": "/contact",
    "cta_secondary": "Our Services",
    "cta_secondary_href": "/services",
    "image_url": "https://images.unsplash.com/photo-1596005554384-d293674c91d7?w=1200&q=80",
    "image_alt": "African city skyline at night"
  }'::jsonb,
  NOW()
)
ON CONFLICT (page, section) DO UPDATE
  SET content = EXCLUDED.content, updated_at = EXCLUDED.updated_at;

-- ─── HOME / FEATURES ─────────────────────────────────────────────────────────
-- Hardcoded in Features.tsx (not CMS): stats row (100%, 48hr, Nationwide, End-to-end)

INSERT INTO public.site_content (page, section, content, updated_at)
VALUES (
  'home', 'features',
  '{
    "section_label": "Why EMC",
    "heading": "How we work, and why it matters.",
    "description": "We built EMC because Sierra Leone''s job market deserves a recruitment firm that actually knows it.",
    "link_text": "Learn more about us",
    "link_href": "/about",
    "advantages": [
      {
        "iconKey": "globe",
        "color": "brand-blue",
        "title": "Deep Local Network",
        "description": "Our consultants have worked directly inside the industries we recruit for — construction, mining, healthcare, hospitality, and more. We know what good looks like in each sector."
      },
      {
        "iconKey": "bolt",
        "color": "brand-orange",
        "title": "Fast Turnaround",
        "description": "We respond to every brief within 48 hours and deliver a qualified shortlist within 5–10 working days. You will never be left waiting without a clear update."
      },
      {
        "iconKey": "shield",
        "color": "brand-blue",
        "title": "Compliance First",
        "description": "Every engagement is conducted within Sierra Leone''s labour laws and professional recruitment ethics. We will not cut corners to make a placement faster."
      },
      {
        "iconKey": "sliders",
        "color": "brand-orange",
        "title": "No Generic Approaches",
        "description": "We don''t send bulk CVs and hope one fits. Every role gets a dedicated search — we take the brief seriously before we start sourcing."
      }
    ]
  }'::jsonb,
  NOW()
)
ON CONFLICT (page, section) DO UPDATE
  SET content = EXCLUDED.content, updated_at = EXCLUDED.updated_at;

-- ─── HOME / SERVICES SECTION ─────────────────────────────────────────────────
-- Hardcoded in ServicesSection.tsx (not CMS): icons, colours, "Learn more" links

INSERT INTO public.site_content (page, section, content, updated_at)
VALUES (
  'home', 'services',
  '{
    "section_label": "What We Do",
    "heading": "Core services",
    "services": [
      {
        "title": "Recruitment & Staffing",
        "description": "From permanent hires to contract placements, executive search to mass recruitment — we find the right people for every level and every role across Sierra Leone.",
        "features": ["Permanent recruitment", "Temporary & contract staffing", "Executive search & headhunting", "Mass recruitment"]
      },
      {
        "title": "HR & Management Consulting",
        "description": "Strategic guidance on HR policies, organisational structure, performance management, and change — tailored to your sector and scale of operation.",
        "features": ["HR policy development", "Organisational restructuring", "Performance management", "Leadership development"]
      },
      {
        "title": "Outsourcing Services",
        "description": "Hand over your HR operations entirely. We manage payroll, onboarding, compliance, and day-to-day HR administration professionally on your behalf.",
        "features": ["HR outsourcing", "Payroll management", "Employee onboarding", "Compliance management"]
      }
    ]
  }'::jsonb,
  NOW()
)
ON CONFLICT (page, section) DO UPDATE
  SET content = EXCLUDED.content, updated_at = EXCLUDED.updated_at;

-- ─── HOME / CTA BANNER ───────────────────────────────────────────────────────

INSERT INTO public.site_content (page, section, content, updated_at)
VALUES (
  'home', 'cta',
  '{
    "label": "Work With Us",
    "heading": "Ready to build your best team?",
    "description": "Get in touch with EMC today. Tell us what you need and we will handle the rest — from search to placement.",
    "cta_primary": "Contact Us Today",
    "cta_primary_href": "/contact",
    "cta_secondary": "View Solutions",
    "cta_secondary_href": "/solutions",
    "trust_points": ["Free initial consultation", "No placement, no fee", "Confidential search"]
  }'::jsonb,
  NOW()
)
ON CONFLICT (page, section) DO UPDATE
  SET content = EXCLUDED.content, updated_at = EXCLUDED.updated_at;

-- ─── ABOUT / WHO WE ARE ──────────────────────────────────────────────────────

INSERT INTO public.site_content (page, section, content, updated_at)
VALUES (
  'about', 'intro',
  '{
    "paragraph_1": "Express Management Consultancy (SL) Limited is a professional workforce solutions and HR consulting firm providing recruitment, staff outsourcing, payroll administration and HR advisory services to organisations across Sierra Leone.",
    "paragraph_2": "Our goal is to enable organisations to focus on their core business operations while we manage talent acquisition, workforce administration and HR support services. We bring structured recruitment processes and strong local talent networks to every brief — delivering qualified staffing solutions quickly and professionally.",
    "paragraph_3": "We provide reliable workforce solutions that reduce administrative burden, improve operational efficiency and ensure organisations have access to qualified talent. From a single specialist placement to a full outsourced HR function, we apply the same rigour and commitment to every client engagement.",
    "image_url": "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=1200&q=80",
    "image_alt": "Modern professional building"
  }'::jsonb,
  NOW()
)
ON CONFLICT (page, section) DO UPDATE
  SET content = EXCLUDED.content, updated_at = EXCLUDED.updated_at;

-- ─── ABOUT / PURPOSE · VISION · MISSION ─────────────────────────────────────

INSERT INTO public.site_content (page, section, content, updated_at)
VALUES (
  'about', 'purpose',
  '{
    "purpose_heading": "Enabling organisations to focus on what matters.",
    "purpose_body": "Our purpose is to enable organisations to concentrate on their core business operations while we manage the complexity of talent acquisition, workforce administration and HR support — reducing burden and improving efficiency across the board.",
    "vision_heading": "Sierra Leone''s most trusted workforce partner.",
    "vision_body": "To be the leading workforce solutions and HR consulting firm across Sierra Leone — known for the quality of our placements, the professionalism of our advisory, and the depth of our local talent networks across every major industry.",
    "mission_heading": "Deliver high quality staffing solutions quickly and professionally.",
    "mission_body": "To provide reliable workforce solutions through structured recruitment processes, strong local networks, and professional HR expertise — ensuring every client organisation has access to the right talent, at the right time, with the right support in place."
  }'::jsonb,
  NOW()
)
ON CONFLICT (page, section) DO UPDATE
  SET content = EXCLUDED.content, updated_at = EXCLUDED.updated_at;

-- ─── ABOUT / HERO STATS ──────────────────────────────────────────────────────
-- Hardcoded in about/page.tsx: "About EMC" label, main headline, stat box colours

INSERT INTO public.site_content (page, section, content, updated_at)
VALUES (
  'about', 'hero',
  '{
    "subtext": "A Freetown-based recruitment and HR consultancy. We help Sierra Leone''s organisations hire better, manage smarter, and build teams that last.",
    "stats": [
      { "label": "Sierra Leone-focused",  "sub": "Built for this market, not adapted to it" },
      { "label": "Transparent process",   "sub": "Clear updates from brief to placement" },
      { "label": "No placement, no fee",  "sub": "Our interests are only aligned when yours are" },
      { "label": "Confidential search",   "sub": "Every brief and candidate handled discreetly" }
    ]
  }'::jsonb,
  NOW()
)
ON CONFLICT (page, section) DO UPDATE
  SET content = EXCLUDED.content, updated_at = EXCLUDED.updated_at;

-- ─── ABOUT / VALUES ──────────────────────────────────────────────────────────

INSERT INTO public.site_content (page, section, content, updated_at)
VALUES (
  'about', 'values',
  '{
    "heading": "Our Values",
    "subtext": "The principles that guide every engagement we take on.",
    "values": [
      { "num": "01", "name": "Integrity",       "desc": "Upholding transparency and professional ethics in all engagements." },
      { "num": "02", "name": "Excellence",      "desc": "Delivering superior solutions with attention to quality and detail." },
      { "num": "03", "name": "Confidentiality", "desc": "Ensuring secure and discreet handling of all client and candidate information." },
      { "num": "04", "name": "Innovation",      "desc": "Leveraging technology and modern methods to continuously improve our results." },
      { "num": "05", "name": "Partnership",     "desc": "Building long-term, mutually beneficial relationships with every client and candidate." }
    ]
  }'::jsonb,
  NOW()
)
ON CONFLICT (page, section) DO UPDATE
  SET content = EXCLUDED.content, updated_at = EXCLUDED.updated_at;

-- ─── ABOUT / CSR ─────────────────────────────────────────────────────────────
-- Image is the Freetown street scene we set in the previous session

INSERT INTO public.site_content (page, section, content, updated_at)
VALUES (
  'about', 'csr',
  '{
    "label": "Community & CSR",
    "heading": "Giving back to our community",
    "paragraph_1": "Good recruitment has a real impact on people''s lives — not just on business outcomes. We take that responsibility seriously. Every candidate we work with is treated with honesty about the roles we''re briefed on and the realistic chances of success.",
    "paragraph_2": "We are committed to fair, transparent hiring practices across Sierra Leone — and to working with employers who share those standards. Through local partnerships and training initiatives, we aim to create real opportunities, not just fill vacancies.",
    "image_url": "https://images.unsplash.com/photo-1630509866851-b54881dcd92a?w=1200&q=80",
    "image_alt": "Street scene in Freetown, Sierra Leone"
  }'::jsonb,
  NOW()
)
ON CONFLICT (page, section) DO UPDATE
  SET content = EXCLUDED.content, updated_at = EXCLUDED.updated_at;

-- ─── SERVICES / HERO ─────────────────────────────────────────────────────────
-- Hardcoded in services/page.tsx: main headline, "What we cover" index list

INSERT INTO public.site_content (page, section, content, updated_at)
VALUES (
  'services', 'hero',
  '{
    "headline": "Services built around your needs.",
    "subtext": "Whether you need one specialist or want to rethink your entire HR function, we have the sector knowledge and the process to get it right."
  }'::jsonb,
  NOW()
)
ON CONFLICT (page, section) DO UPDATE
  SET content = EXCLUDED.content, updated_at = EXCLUDED.updated_at;

-- ─── SERVICES / RECRUITMENT ──────────────────────────────────────────────────
-- Hardcoded: section number "01", icons, "Enquire about this service" link

INSERT INTO public.site_content (page, section, content, updated_at)
VALUES (
  'services', 'recruitment',
  '{
    "featured_title": "Recruitment & Talent Acquisition",
    "featured_description": "Identification and placement of qualified professionals across Sierra Leone — from entry-level positions to senior leadership. We manage the full recruitment cycle so you can focus on your core business.",
    "featured_bullets": [
      "Job profiling & role scoping",
      "Multi-channel candidate sourcing",
      "Competency-based screening & evaluation",
      "Post-placement follow-up"
    ],
    "cards": [
      {
        "title": "Talent Pool Development",
        "description": "Development of skilled talent databases for rapid recruitment. We maintain pre-screened candidate rosters so we can respond to your workforce needs quickly."
      },
      {
        "title": "Executive Search",
        "description": "Discreet, targeted search for C-suite and specialist roles. Our local networks give you access to passive talent not found on open job boards."
      },
      {
        "title": "Mass & Contract Recruitment",
        "description": "Large-scale and short-term hiring coordinated efficiently — from assessment and screening through to deployment and compliance documentation."
      }
    ]
  }'::jsonb,
  NOW()
)
ON CONFLICT (page, section) DO UPDATE
  SET content = EXCLUDED.content, updated_at = EXCLUDED.updated_at;

-- ─── SERVICES / HR ADVISORY ──────────────────────────────────────────────────
-- Hardcoded: section number "02", icons, tag colours

INSERT INTO public.site_content (page, section, content, updated_at)
VALUES (
  'services', 'hr',
  '{
    "items": [
      {
        "title": "HR Advisory Services",
        "description": "Professional HR consulting and workforce advisory services. We provide expert guidance on HR policies, compliance, performance management, and building scalable HR functions.",
        "tags": ["Policy development", "Performance management", "Regulatory compliance"]
      },
      {
        "title": "Workforce Planning",
        "description": "Strategic workforce planning to support business growth. We help you forecast headcount needs, identify skills gaps, and build resilient teams aligned to your operational objectives.",
        "tags": ["Headcount planning", "Skills gap analysis", "Succession planning"]
      },
      {
        "title": "Organisational Development",
        "description": "Guiding organisations through restructuring, cultural transformation, and change management to improve operational efficiency and long-term performance.",
        "tags": ["Restructuring support", "Culture assessment", "Change management"]
      }
    ]
  }'::jsonb,
  NOW()
)
ON CONFLICT (page, section) DO UPDATE
  SET content = EXCLUDED.content, updated_at = EXCLUDED.updated_at;

-- ─── SERVICES / OUTSOURCING ──────────────────────────────────────────────────
-- Hardcoded: section number "03", icons, icon colours

INSERT INTO public.site_content (page, section, content, updated_at)
VALUES (
  'services', 'outsourcing',
  '{
    "items": [
      {
        "title": "Workforce Outsourcing",
        "description": "Provision and management of outsourced staff for client organisations. We supply, deploy and manage personnel on your behalf — allowing you to scale your workforce without the administrative overhead."
      },
      {
        "title": "Payroll Administration",
        "description": "Administration of employee payroll, statutory deductions and compliance. Accurate, on-time payroll processing with full compliance to Sierra Leone labour regulations."
      },
      {
        "title": "HR Operations Management",
        "description": "End-to-end management of day-to-day HR operations including onboarding, employee records, leave administration, and compliance reporting."
      },
      {
        "title": "Background & Reference Verification",
        "description": "Thorough background screening — employment history, qualifications, references, and criminal record checks — for every candidate before placement."
      }
    ]
  }'::jsonb,
  NOW()
)
ON CONFLICT (page, section) DO UPDATE
  SET content = EXCLUDED.content, updated_at = EXCLUDED.updated_at;

-- ─── SOLUTIONS / HERO ────────────────────────────────────────────────────────
-- Hardcoded: "Workforce & HR Solutions" label, main headline, CTA buttons

INSERT INTO public.site_content (page, section, content, updated_at)
VALUES (
  'solutions', 'hero',
  '{
    "subtext": "Purpose-built for Sierra Leone''s job market. Whether you need one specialist or a full workforce programme, we bring the same rigour to every brief."
  }'::jsonb,
  NOW()
)
ON CONFLICT (page, section) DO UPDATE
  SET content = EXCLUDED.content, updated_at = EXCLUDED.updated_at;

-- ─── SOLUTIONS / LIST ────────────────────────────────────────────────────────
-- Hardcoded: icons, icon colours (mapped by position)

INSERT INTO public.site_content (page, section, content, updated_at)
VALUES (
  'solutions', 'list',
  '{
    "solutions": [
      {
        "num": "01",
        "title": "Recruitment & Talent Acquisition",
        "description": "Identification and placement of qualified professionals across all levels — from entry positions to senior leadership. We manage the full recruitment cycle so you can focus on your core operations.",
        "features": ["Job profiling & role scoping", "Multi-channel candidate sourcing", "Competency-based screening", "Post-placement follow-up"]
      },
      {
        "num": "02",
        "title": "Workforce Outsourcing",
        "description": "Provision and management of outsourced staff for client organisations. We supply, deploy and manage personnel on your behalf — enabling you to scale without the administrative burden.",
        "features": ["Outsourced staff deployment", "Ongoing personnel management", "Contract & compliance handling", "Flexible workforce scaling"]
      },
      {
        "num": "03",
        "title": "Payroll Administration",
        "description": "Administration of employee payroll, statutory deductions and compliance. Accurate, on-time payroll processing fully aligned with Sierra Leone labour regulations.",
        "features": ["Payroll calculation & processing", "Statutory deduction management", "Labour law compliance", "Payroll reporting & records"]
      },
      {
        "num": "04",
        "title": "HR Advisory Services",
        "description": "Professional HR consulting and workforce advisory services. We provide expert guidance on HR policies, procedures, and best practices to build scalable HR functions.",
        "features": ["HR policy development", "Performance management", "Regulatory compliance advisory", "Compensation & benefits design"]
      },
      {
        "num": "05",
        "title": "Workforce Planning",
        "description": "Strategic workforce planning to support business growth. We help you forecast headcount requirements, identify skills gaps, and build resilient teams aligned to your strategic objectives.",
        "features": ["Headcount planning", "Skills gap analysis", "Succession planning", "Organisational design advisory"]
      },
      {
        "num": "06",
        "title": "Talent Pool Development",
        "description": "Development of skilled talent databases for rapid recruitment. We build and maintain pre-screened candidate rosters across industries so we can respond to your workforce requirements quickly.",
        "features": ["Pre-screened candidate databases", "Industry-specific talent rosters", "Rapid deployment capability", "Ongoing talent pipeline management"]
      }
    ]
  }'::jsonb,
  NOW()
)
ON CONFLICT (page, section) DO UPDATE
  SET content = EXCLUDED.content, updated_at = EXCLUDED.updated_at;

-- ─── RESOURCES ───────────────────────────────────────────────────────────────
-- Hardcoded: "Knowledge Hub" label, "Get in touch" / "Browse open roles" CTAs

INSERT INTO public.site_content (page, section, content, updated_at)
VALUES (
  'resources', 'main',
  '{
    "heading": "Coming soon.",
    "subtext": "We''re putting together guides, hiring insights, and HR resources tailored to the Sierra Leone market. Check back soon."
  }'::jsonb,
  NOW()
)
ON CONFLICT (page, section) DO UPDATE
  SET content = EXCLUDED.content, updated_at = EXCLUDED.updated_at;

-- ─── GLOBAL / FOOTER DESCRIPTION ─────────────────────────────────────────────

INSERT INTO public.site_content (page, section, content, updated_at)
VALUES (
  'global', 'main',
  '{
    "site_description": "Leading talent management and recruitment solutions. Empowering businesses with modern, efficient staffing platforms."
  }'::jsonb,
  NOW()
)
ON CONFLICT (page, section) DO UPDATE
  SET content = EXCLUDED.content, updated_at = EXCLUDED.updated_at;

-- ─── CONTACT ─────────────────────────────────────────────────────────────────

INSERT INTO public.site_content (page, section, content, updated_at)
VALUES (
  'contact', 'main',
  '{
    "address_line1": "10 Waterside Road",
    "address_line2": "Wilberforce, Freetown",
    "address_line3": "Sierra Leone",
    "email": "recruitment@expresssl.com",
    "phone": "+232 79 252182",
    "hours_weekday": "Mon – Fri: 8:30am – 5:00pm",
    "hours_weekend": "Saturday by appointment",
    "social_linkedin": "#",
    "social_facebook": "#",
    "social_instagram": "#"
  }'::jsonb,
  NOW()
)
ON CONFLICT (page, section) DO UPDATE
  SET content = EXCLUDED.content, updated_at = EXCLUDED.updated_at;

-- ─── Done ────────────────────────────────────────────────────────────────────
-- 16 rows seeded. Hardcoded (not CMS-driven) items noted per section above.
