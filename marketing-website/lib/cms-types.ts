// ─── Content types for the CMS ────────────────────────────────────────────────

export interface HeroContent {
  subheadline: string
  cta_primary: string
  cta_primary_href: string
  cta_secondary: string
  cta_secondary_href: string
  image_url: string
  image_alt: string
}

export interface Advantage {
  iconKey: 'globe' | 'bolt' | 'shield' | 'sliders'
  color: 'brand-blue' | 'brand-orange'
  title: string
  description: string
}

export interface FeaturesContent {
  section_label: string
  heading: string
  description: string
  link_text: string
  link_href: string
  advantages: Advantage[]
}

export interface CTAContent {
  label: string
  heading: string
  description: string
  cta_primary: string
  cta_primary_href: string
  cta_secondary: string
  cta_secondary_href: string
  trust_points: string[]
}

export interface ContactContent {
  address_line1: string
  address_line2: string
  address_line3: string
  email: string
  phone: string
  hours_weekday: string
  hours_weekend: string
  social_linkedin: string
  social_facebook: string
  social_instagram: string
}

export interface AboutIntroContent {
  paragraph_1: string
  paragraph_2: string
  paragraph_3: string
  image_url: string
  image_alt: string
}

export interface AboutPurposeContent {
  purpose_heading: string
  purpose_body: string
  vision_heading: string
  vision_body: string
  mission_heading: string
  mission_body: string
}

// ─── Global ───────────────────────────────────────────────────────────────────

export interface GlobalContent {
  site_description: string
}

// ─── Home — Services section ──────────────────────────────────────────────────

export interface HomeServiceItem {
  title: string
  description: string
  features: string[]
}

export interface HomeServicesContent {
  section_label: string
  heading: string
  services: HomeServiceItem[]
}

// ─── About — Hero ─────────────────────────────────────────────────────────────

export interface AboutHeroStat {
  label: string
  sub: string
}

export interface AboutHeroContent {
  subtext: string
  stats: AboutHeroStat[]
}

// ─── About — Values ───────────────────────────────────────────────────────────

export interface AboutValue {
  num: string
  name: string
  desc: string
}

export interface AboutValuesContent {
  heading: string
  subtext: string
  values: AboutValue[]
}

// ─── About — CSR ──────────────────────────────────────────────────────────────

export interface AboutCSRContent {
  label: string
  heading: string
  paragraph_1: string
  paragraph_2: string
  image_url: string
  image_alt: string
}

// ─── Services page ────────────────────────────────────────────────────────────

export interface ServicesHeroContent {
  headline: string
  subtext: string
}

export interface ServicesCardItem {
  title: string
  description: string
}

export interface ServicesRecruitmentContent {
  featured_title: string
  featured_description: string
  featured_bullets: string[]
  cards: ServicesCardItem[]
}

export interface ServicesHRItem {
  title: string
  description: string
  tags: string[]
}

export interface ServicesHRContent {
  items: ServicesHRItem[]
}

export interface ServicesOutsourcingContent {
  items: ServicesCardItem[]
}

// ─── Solutions page ───────────────────────────────────────────────────────────

export interface SolutionItem {
  num: string
  title: string
  description: string
  features: string[]
}

export interface SolutionsHeroContent {
  subtext: string
}

export interface SolutionsListContent {
  solutions: SolutionItem[]
}

// ─── Resources page ───────────────────────────────────────────────────────────

export interface ResourcesContent {
  heading: string
  subtext: string
}

// ─── Team member ──────────────────────────────────────────────────────────────

export interface BioSection {
  heading?: string
  paragraphs?: string[]
  bullets?: string[]
}

export interface TeamMember {
  id: string
  name: string
  title: string
  tagline?: string | null
  short_bio: string
  sections: BioSection[]
  credentials: string[]
  specialisms: string[]
  image_url?: string | null
  color: 'brand-blue' | 'brand-orange'
  display_order: number
  is_active: boolean
}

// ─── Default fallbacks (used when DB has no row yet) ─────────────────────────

export const DEFAULT_HERO: HeroContent = {
  subheadline:
    "Sierra Leone's specialist recruitment and HR practice. We help growing businesses hire the right people, build stronger teams, and put the HR structures in place to scale.",
  cta_primary: 'Get in Touch',
  cta_primary_href: '/contact',
  cta_secondary: 'Our Services',
  cta_secondary_href: '/services',
  image_url: 'https://images.unsplash.com/photo-1596005554384-d293674c91d7?w=1200&q=80',
  image_alt: 'African city skyline at night',
}

export const DEFAULT_FEATURES: FeaturesContent = {
  section_label: 'Why EMC',
  heading: 'How we work, and why it matters.',
  description: "We built EMC because Sierra Leone's job market deserves a recruitment firm that actually knows it.",
  link_text: 'Learn more about us',
  link_href: '/about',
  advantages: [
    { iconKey: 'globe', color: 'brand-blue', title: 'Deep Local Network', description: 'Our consultants have worked directly inside the industries we recruit for — construction, mining, healthcare, hospitality, and more. We know what good looks like in each sector.' },
    { iconKey: 'bolt', color: 'brand-orange', title: 'Fast Turnaround', description: 'We respond to every brief within 48 hours and deliver a qualified shortlist within 5–10 working days. You will never be left waiting without a clear update.' },
    { iconKey: 'shield', color: 'brand-blue', title: 'Compliance First', description: "Every engagement is conducted within Sierra Leone's labour laws and professional recruitment ethics. We will not cut corners to make a placement faster." },
    { iconKey: 'sliders', color: 'brand-orange', title: 'No Generic Approaches', description: "We don't send bulk CVs and hope one fits. Every role gets a dedicated search — we take the brief seriously before we start sourcing." },
  ],
}

export const DEFAULT_CTA: CTAContent = {
  label: 'Work With Us',
  heading: 'Ready to build your best team?',
  description: 'Get in touch with EMC today. Tell us what you need and we will handle the rest — from search to placement.',
  cta_primary: 'Contact Us Today',
  cta_primary_href: '/contact',
  cta_secondary: 'View Solutions',
  cta_secondary_href: '/solutions',
  trust_points: ['Free initial consultation', 'No placement, no fee', 'Confidential search'],
}

export const DEFAULT_CONTACT: ContactContent = {
  address_line1: '10 Waterside Road',
  address_line2: 'Wilberforce, Freetown',
  address_line3: 'Sierra Leone',
  email: 'recruitment@expresssl.com',
  phone: '+232 79 252182',
  hours_weekday: 'Mon – Fri: 8:30am – 5:00pm',
  hours_weekend: 'Saturday by appointment',
  social_linkedin: '#',
  social_facebook: '#',
  social_instagram: '#',
}

export const DEFAULT_ABOUT_INTRO: AboutIntroContent = {
  paragraph_1: 'Express Management Consultancy (SL) Limited is a professional workforce solutions and HR consulting firm providing recruitment, staff outsourcing, payroll administration and HR advisory services to organisations across Sierra Leone.',
  paragraph_2: 'Our goal is to enable organisations to focus on their core business operations while we manage talent acquisition, workforce administration and HR support services. We bring structured recruitment processes and strong local talent networks to every brief — delivering qualified staffing solutions quickly and professionally.',
  paragraph_3: 'We provide reliable workforce solutions that reduce administrative burden, improve operational efficiency and ensure organisations have access to qualified talent. From a single specialist placement to a full outsourced HR function, we apply the same rigour and commitment to every client engagement.',
  image_url: 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=1200&q=80',
  image_alt: 'Modern professional building',
}

export const DEFAULT_GLOBAL: GlobalContent = {
  site_description: 'Leading talent management and recruitment solutions. Empowering businesses with modern, efficient staffing platforms.',
}

export const DEFAULT_HOME_SERVICES: HomeServicesContent = {
  section_label: 'What We Do',
  heading: 'Core services',
  services: [
    {
      title: 'Recruitment & Staffing',
      description: 'From permanent hires to contract placements, executive search to mass recruitment — we find the right people for every level and every role across Sierra Leone.',
      features: ['Permanent recruitment', 'Temporary & contract staffing', 'Executive search & headhunting', 'Mass recruitment'],
    },
    {
      title: 'HR & Management Consulting',
      description: 'Strategic guidance on HR policies, organisational structure, performance management, and change — tailored to your sector and scale of operation.',
      features: ['HR policy development', 'Organisational restructuring', 'Performance management', 'Leadership development'],
    },
    {
      title: 'Outsourcing Services',
      description: 'Hand over your HR operations entirely. We manage payroll, onboarding, compliance, and day-to-day HR administration professionally on your behalf.',
      features: ['HR outsourcing', 'Payroll management', 'Employee onboarding', 'Compliance management'],
    },
  ],
}

export const DEFAULT_ABOUT_HERO: AboutHeroContent = {
  subtext: 'A Freetown-based recruitment and HR consultancy. We help Sierra Leone\'s organisations hire better, manage smarter, and build teams that last.',
  stats: [
    { label: 'Sierra Leone-focused',  sub: 'Built for this market, not adapted to it' },
    { label: 'Transparent process',   sub: 'Clear updates from brief to placement' },
    { label: 'No placement, no fee',  sub: 'Our interests are only aligned when yours are' },
    { label: 'Confidential search',   sub: 'Every brief and candidate handled discreetly' },
  ],
}

export const DEFAULT_ABOUT_VALUES: AboutValuesContent = {
  heading: 'Our Values',
  subtext: 'The principles that guide every engagement we take on.',
  values: [
    { num: '01', name: 'Integrity',       desc: 'Upholding transparency and professional ethics in all engagements.' },
    { num: '02', name: 'Excellence',      desc: 'Delivering superior solutions with attention to quality and detail.' },
    { num: '03', name: 'Confidentiality', desc: 'Ensuring secure and discreet handling of all client and candidate information.' },
    { num: '04', name: 'Innovation',      desc: 'Leveraging technology and modern methods to continuously improve our results.' },
    { num: '05', name: 'Partnership',     desc: 'Building long-term, mutually beneficial relationships with every client and candidate.' },
  ],
}

export const DEFAULT_ABOUT_CSR: AboutCSRContent = {
  label: 'Community & CSR',
  heading: 'Giving back to our community',
  paragraph_1: 'Good recruitment has a real impact on people\'s lives — not just on business outcomes. We take that responsibility seriously. Every candidate we work with is treated with honesty about the roles we\'re briefed on and the realistic chances of success.',
  paragraph_2: 'We are committed to fair, transparent hiring practices across Sierra Leone — and to working with employers who share those standards. Through local partnerships and training initiatives, we aim to create real opportunities, not just fill vacancies.',
  image_url: 'https://images.unsplash.com/photo-1630509866851-b54881dcd92a?w=1200&q=80',
  image_alt: 'Street scene in Freetown, Sierra Leone',
}

export const DEFAULT_SERVICES_HERO: ServicesHeroContent = {
  headline: 'Services built around your needs.',
  subtext: 'Whether you need one specialist or want to rethink your entire HR function, we have the sector knowledge and the process to get it right.',
}

export const DEFAULT_SERVICES_RECRUITMENT: ServicesRecruitmentContent = {
  featured_title: 'Recruitment & Talent Acquisition',
  featured_description: 'Identification and placement of qualified professionals across Sierra Leone — from entry-level positions to senior leadership. We manage the full recruitment cycle so you can focus on your core business.',
  featured_bullets: ['Job profiling & role scoping', 'Multi-channel candidate sourcing', 'Competency-based screening & evaluation', 'Post-placement follow-up'],
  cards: [
    { title: 'Talent Pool Development', description: 'Development of skilled talent databases for rapid recruitment. We maintain pre-screened candidate rosters so we can respond to your workforce needs quickly.' },
    { title: 'Executive Search', description: 'Discreet, targeted search for C-suite and specialist roles. Our local networks give you access to passive talent not found on open job boards.' },
    { title: 'Mass & Contract Recruitment', description: 'Large-scale and short-term hiring coordinated efficiently — from assessment and screening through to deployment and compliance documentation.' },
  ],
}

export const DEFAULT_SERVICES_HR: ServicesHRContent = {
  items: [
    { title: 'HR Advisory Services', description: 'Professional HR consulting and workforce advisory services. We provide expert guidance on HR policies, compliance, performance management, and building scalable HR functions.', tags: ['Policy development', 'Performance management', 'Regulatory compliance'] },
    { title: 'Workforce Planning', description: 'Strategic workforce planning to support business growth. We help you forecast headcount needs, identify skills gaps, and build resilient teams aligned to your operational objectives.', tags: ['Headcount planning', 'Skills gap analysis', 'Succession planning'] },
    { title: 'Organisational Development', description: 'Guiding organisations through restructuring, cultural transformation, and change management to improve operational efficiency and long-term performance.', tags: ['Restructuring support', 'Culture assessment', 'Change management'] },
  ],
}

export const DEFAULT_SERVICES_OUTSOURCING: ServicesOutsourcingContent = {
  items: [
    { title: 'Workforce Outsourcing', description: 'Provision and management of outsourced staff for client organisations. We supply, deploy and manage personnel on your behalf — allowing you to scale your workforce without the administrative overhead.' },
    { title: 'Payroll Administration', description: 'Administration of employee payroll, statutory deductions and compliance. Accurate, on-time payroll processing with full compliance to Sierra Leone labour regulations.' },
    { title: 'HR Operations Management', description: 'End-to-end management of day-to-day HR operations including onboarding, employee records, leave administration, and compliance reporting.' },
    { title: 'Background & Reference Verification', description: 'Thorough background screening — employment history, qualifications, references, and criminal record checks — for every candidate before placement.' },
  ],
}

export const DEFAULT_SOLUTIONS_HERO: SolutionsHeroContent = {
  subtext: 'Purpose-built for Sierra Leone\'s job market. Whether you need one specialist or a full workforce programme, we bring the same rigour to every brief.',
}

export const DEFAULT_SOLUTIONS_LIST: SolutionsListContent = {
  solutions: [
    { num: '01', title: 'Recruitment & Talent Acquisition', description: 'Identification and placement of qualified professionals across all levels — from entry positions to senior leadership. We manage the full recruitment cycle so you can focus on your core operations.', features: ['Job profiling & role scoping', 'Multi-channel candidate sourcing', 'Competency-based screening', 'Post-placement follow-up'] },
    { num: '02', title: 'Workforce Outsourcing', description: 'Provision and management of outsourced staff for client organisations. We supply, deploy and manage personnel on your behalf — enabling you to scale without the administrative burden.', features: ['Outsourced staff deployment', 'Ongoing personnel management', 'Contract & compliance handling', 'Flexible workforce scaling'] },
    { num: '03', title: 'Payroll Administration', description: 'Administration of employee payroll, statutory deductions and compliance. Accurate, on-time payroll processing fully aligned with Sierra Leone labour regulations.', features: ['Payroll calculation & processing', 'Statutory deduction management', 'Labour law compliance', 'Payroll reporting & records'] },
    { num: '04', title: 'HR Advisory Services', description: 'Professional HR consulting and workforce advisory services. We provide expert guidance on HR policies, procedures, and best practices to build scalable HR functions.', features: ['HR policy development', 'Performance management', 'Regulatory compliance advisory', 'Compensation & benefits design'] },
    { num: '05', title: 'Workforce Planning', description: 'Strategic workforce planning to support business growth. We help you forecast headcount requirements, identify skills gaps, and build resilient teams aligned to your strategic objectives.', features: ['Headcount planning', 'Skills gap analysis', 'Succession planning', 'Organisational design advisory'] },
    { num: '06', title: 'Talent Pool Development', description: 'Development of skilled talent databases for rapid recruitment. We build and maintain pre-screened candidate rosters across industries so we can respond to your workforce requirements quickly.', features: ['Pre-screened candidate databases', 'Industry-specific talent rosters', 'Rapid deployment capability', 'Ongoing talent pipeline management'] },
  ],
}

export const DEFAULT_RESOURCES: ResourcesContent = {
  heading: 'Coming soon.',
  subtext: 'We\'re putting together guides, hiring insights, and HR resources tailored to the Sierra Leone market. Check back soon.',
}

export const DEFAULT_ABOUT_PURPOSE: AboutPurposeContent = {
  purpose_heading: 'Enabling organisations to focus on what matters.',
  purpose_body: 'Our purpose is to enable organisations to concentrate on their core business operations while we manage the complexity of talent acquisition, workforce administration and HR support — reducing burden and improving efficiency across the board.',
  vision_heading: "Sierra Leone's most trusted workforce partner.",
  vision_body: 'To be the leading workforce solutions and HR consulting firm across Sierra Leone — known for the quality of our placements, the professionalism of our advisory, and the depth of our local talent networks across every major industry.',
  mission_heading: 'Deliver high quality staffing solutions quickly and professionally.',
  mission_body: 'To provide reliable workforce solutions through structured recruitment processes, strong local networks, and professional HR expertise — ensuring every client organisation has access to the right talent, at the right time, with the right support in place.',
}
