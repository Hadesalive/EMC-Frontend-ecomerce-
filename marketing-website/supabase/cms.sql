-- ─────────────────────────────────────────────────────────────────────────────
-- CMS: site_content + team_members
-- Run once in Supabase SQL Editor
-- ─────────────────────────────────────────────────────────────────────────────

-- ── 1. site_content ──────────────────────────────────────────────────────────
CREATE TABLE IF NOT EXISTS public.site_content (
  id         uuid        DEFAULT gen_random_uuid() PRIMARY KEY,
  page       text        NOT NULL,
  section    text        NOT NULL,
  content    jsonb       NOT NULL DEFAULT '{}',
  updated_at timestamptz DEFAULT now(),
  UNIQUE(page, section)
);

ALTER TABLE public.site_content ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "Public read site_content"        ON public.site_content;
DROP POLICY IF EXISTS "Service role manage site_content" ON public.site_content;

CREATE POLICY "Public read site_content"
  ON public.site_content FOR SELECT USING (true);

-- Write access via service-role client (admin server actions)
CREATE POLICY "Service role manage site_content"
  ON public.site_content FOR ALL USING (auth.role() = 'service_role');

-- ── 2. team_members ──────────────────────────────────────────────────────────
CREATE TABLE IF NOT EXISTS public.team_members (
  id            uuid    DEFAULT gen_random_uuid() PRIMARY KEY,
  name          text    NOT NULL,
  title         text    NOT NULL,
  tagline       text,
  short_bio     text    NOT NULL DEFAULT '',
  sections      jsonb   NOT NULL DEFAULT '[]',
  credentials   text[]  DEFAULT '{}',
  specialisms   text[]  DEFAULT '{}',
  image_url     text,
  color         text    NOT NULL DEFAULT 'brand-blue'
                        CHECK (color IN ('brand-blue', 'brand-orange')),
  display_order integer NOT NULL DEFAULT 0,
  is_active     boolean NOT NULL DEFAULT true,
  created_at    timestamptz DEFAULT now(),
  updated_at    timestamptz DEFAULT now()
);

ALTER TABLE public.team_members ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "Public read team_members"        ON public.team_members;
DROP POLICY IF EXISTS "Service role manage team_members" ON public.team_members;

CREATE POLICY "Public read team_members"
  ON public.team_members FOR SELECT USING (is_active = true);

CREATE POLICY "Service role manage team_members"
  ON public.team_members FOR ALL USING (auth.role() = 'service_role');

-- ── 3. Seed: home / hero ──────────────────────────────────────────────────────
INSERT INTO public.site_content (page, section, content) VALUES (
  'home', 'hero',
  '{
    "subheadline": "Sierra Leone''s specialist recruitment and HR practice. We help growing businesses hire the right people, build stronger teams, and put the HR structures in place to scale.",
    "cta_primary": "Get in Touch",
    "cta_primary_href": "/contact",
    "cta_secondary": "Our Services",
    "cta_secondary_href": "/services",
    "trust_1": "Free initial consultation",
    "trust_2": "No placement, no fee",
    "image_url": "https://images.unsplash.com/photo-1521737604893-d14cc237f11d?w=1200&q=80",
    "image_alt": "EMC team"
  }'
) ON CONFLICT (page, section) DO NOTHING;

-- ── 4. Seed: home / features ──────────────────────────────────────────────────
INSERT INTO public.site_content (page, section, content) VALUES (
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
  }'
) ON CONFLICT (page, section) DO NOTHING;

-- ── 5. Seed: home / cta ───────────────────────────────────────────────────────
INSERT INTO public.site_content (page, section, content) VALUES (
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
  }'
) ON CONFLICT (page, section) DO NOTHING;

-- ── 6. Seed: contact / info ───────────────────────────────────────────────────
INSERT INTO public.site_content (page, section, content) VALUES (
  'contact', 'info',
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
  }'
) ON CONFLICT (page, section) DO NOTHING;

-- ── 7. Seed: about / intro ────────────────────────────────────────────────────
INSERT INTO public.site_content (page, section, content) VALUES (
  'about', 'intro',
  '{
    "paragraph_1": "Express Management Consultancy (SL) Limited is a professional workforce solutions and HR consulting firm providing recruitment, staff outsourcing, payroll administration and HR advisory services to organisations across Sierra Leone.",
    "paragraph_2": "Our goal is to enable organisations to focus on their core business operations while we manage talent acquisition, workforce administration and HR support services. We bring structured recruitment processes and strong local talent networks to every brief — delivering qualified staffing solutions quickly and professionally.",
    "paragraph_3": "We provide reliable workforce solutions that reduce administrative burden, improve operational efficiency and ensure organisations have access to qualified talent. From a single specialist placement to a full outsourced HR function, we apply the same rigour and commitment to every client engagement.",
    "image_url": "https://images.unsplash.com/photo-1556761175-4b46a572b786?w=1200&q=80",
    "image_alt": "EMC team at work"
  }'
) ON CONFLICT (page, section) DO NOTHING;

-- ── 8. Seed: about / purpose ──────────────────────────────────────────────────
INSERT INTO public.site_content (page, section, content) VALUES (
  'about', 'purpose',
  '{
    "purpose_heading": "Enabling organisations to focus on what matters.",
    "purpose_body": "Our purpose is to enable organisations to concentrate on their core business operations while we manage the complexity of talent acquisition, workforce administration and HR support — reducing burden and improving efficiency across the board.",
    "vision_heading": "Sierra Leone''s most trusted workforce partner.",
    "vision_body": "To be the leading workforce solutions and HR consulting firm across Sierra Leone — known for the quality of our placements, the professionalism of our advisory, and the depth of our local talent networks across every major industry.",
    "mission_heading": "Deliver high quality staffing solutions quickly and professionally.",
    "mission_body": "To provide reliable workforce solutions through structured recruitment processes, strong local networks, and professional HR expertise — ensuring every client organisation has access to the right talent, at the right time, with the right support in place."
  }'
) ON CONFLICT (page, section) DO NOTHING;

-- ── 9. Seed: team_members ────────────────────────────────────────────────────
INSERT INTO public.team_members (name, title, tagline, short_bio, sections, credentials, specialisms, image_url, color, display_order)
VALUES (
  'Abu Bakarr Turay',
  'Founder & CEO',
  NULL,
  'Founder with 15+ years in executive contracts and project management, delivering end-to-end solutions for clients across Sierra Leone and beyond.',
  '[{"paragraphs":["Abu Bakarr has a vision to create a business that could offer an end-to-end service to clients, delivered by local experts on a global scale. Through this vision, Express Management aims to deliver a unique single-source solution to asset managers, allocators, family offices, mining companies and financial institutions that support the entire value chain across the financial services ecosystem.","As a project manager and Supply Chain Management professional with a combined experience of over 15 years in executive Contracts and project management, Abu Bakarr has an outstanding ability to manage and provide solutions to complex, technical, financial and quality control issues within the private and public sectors, combined with a highly developed communication and negotiation skills to delegate tasks and lead employees effectively.","Abu Bakarr''s desire to drive positive change extends beyond asset servicing. His intention is to harness leading innovative and transformative technology that would benefit from cross-jurisdictional expertise delivered by a highly integrated team across the country."]}]',
  ARRAY['Master of Laws (LLM) — International Trade and Commercial Law, University of Essex, United Kingdom','Master of Science in Economics — University of Sierra Leone','Bachelor of Science in Economics — University of Sierra Leone'],
  ARRAY['Executive Search','Supply Chain Recruitment','Organisational Strategy','Project Management'],
  '/images/team/abu-bakarr-turay.jpg',
  'brand-blue',
  1
);

INSERT INTO public.team_members (name, title, tagline, short_bio, sections, credentials, specialisms, color, display_order)
VALUES (
  'Dauda A. Kawa',
  'Co-Founder & Managing Director',
  'Mining Operations Support & Human Capital Advisory Specialist',
  'Co-Founder with over a decade of experience in large-scale mining operations, workforce management, and human capital advisory across Sierra Leone.',
  '[{"heading":"Professional Overview","paragraphs":["Dauda is an accomplished operations and human resources professional with extensive experience in facilities administration, workforce management, and operational support systems within the mining industry.","Throughout his career, Dauda has played a pivotal role in supporting large-scale mining operations by ensuring that the essential infrastructure, workforce systems, and administrative frameworks required to sustain productivity operate efficiently and reliably."],"bullets":["Facilities and infrastructure management","Camp and workforce accommodation administration","Workforce logistics and travel coordination","Fleet and transport management","Administrative systems and employee support services"]},{"heading":"Human Capital & Organisational Expertise","paragraphs":["In addition to his operational leadership experience, Dauda brings a strong background in Human Resource Management, enabling him to bridge the critical link between workforce management and operational efficiency.","Working in a remote and logistically challenging mining environment has required Dauda to lead multidisciplinary teams while managing complex operational systems that underpin day-to-day mine productivity."],"bullets":["Workforce planning and deployment","Recruitment and talent acquisition","Employee administration and HR advisory","Workforce outsourcing models","Organisational support systems"]},{"heading":"Entrepreneurial Leadership","paragraphs":["Recognising the growing demand for professional workforce solutions in Sierra Leone''s evolving business environment, Dauda co-founded Express Management Consultancy (SL) Limited.","The firm provides organisations with reliable workforce services that allow them to focus on their core operations while outsourcing recruitment, payroll administration, and HR management."],"bullets":["Recruitment and staffing solutions","Workforce outsourcing and talent pooling","Payroll administration services","HR advisory and organisational development support"]},{"heading":"Leadership Philosophy","paragraphs":["Dauda believes that sustainable business success depends on the effective alignment of people, systems, and operational infrastructure. His approach emphasises practical solutions, operational discipline, and service excellence to ensure that organisations can operate efficiently even in challenging environments."]}]',
  ARRAY['MA Managing Human Resources (CIPD) — University of West London','Graduate Certificate in Management — Birkbeck College, University of London','BA (Hons) Business Information Management — University of Westminster'],
  ARRAY['Mining Operations','Facilities Management','Workforce Logistics','HR Advisory','Workforce Outsourcing'],
  'brand-orange',
  2
);

INSERT INTO public.team_members (name, title, short_bio, sections, credentials, specialisms, color, display_order)
VALUES (
  'Alpha Amadu Bah',
  'HR Consulting Manager',
  'Certified HR practitioner specialising in policy design, organisational development, and performance management.',
  '[{"paragraphs":["Alpha leads EMC''s HR consulting practice, working directly with clients to design people strategies that are practical, compliant, and built for growth. His background spans both large enterprise and SME environments, giving him a versatile perspective on what works at different organisational scales.","He specialises in helping organisations professionalise their HR functions — from building compliant employment frameworks to embedding performance cultures that retain top talent. He has led policy overhauls, compensation reviews, and HR transformation projects across multiple sectors.","Alpha also advises on employment law compliance, particularly for international organisations entering the Sierra Leone market who need to establish locally aligned HR structures quickly."]}]',
  ARRAY['Certified HR Professional (CIPD-aligned)'],
  ARRAY['HR Policy Design','Performance Management','Organisational Development','Employment Compliance','HR Transformation'],
  'brand-blue',
  3
);

INSERT INTO public.team_members (name, title, short_bio, sections, specialisms, color, display_order)
VALUES (
  'Fatmata Conteh',
  'Client Relations Manager',
  'Dedicated to building long-term client partnerships and ensuring every engagement delivers measurable results.',
  '[{"paragraphs":["Fatmata is the bridge between EMC''s clients and its delivery teams. She manages onboarding, ongoing relationships, and client satisfaction — ensuring that every engagement stays aligned with what clients actually need, not just what was originally scoped.","Her calm, structured approach to communication means clients always know where they stand. She conducts regular check-ins, manages expectations proactively, and acts as the first point of escalation when any issues arise — resolving them quickly and professionally.","She is the reason many of EMC''s clients return for successive hires. Her focus on long-term partnership over transactional delivery is central to how EMC retains and grows its client base."]}]',
  ARRAY['Client Success','Account Management','Stakeholder Communication','Recruitment Coordination'],
  'brand-orange',
  4
);
