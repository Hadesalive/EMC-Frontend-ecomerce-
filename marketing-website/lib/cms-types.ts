// ─── Content types for the CMS ────────────────────────────────────────────────

export interface HeroContent {
  subheadline: string
  cta_primary: string
  cta_primary_href: string
  cta_secondary: string
  cta_secondary_href: string
  trust_1: string
  trust_2: string
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
  trust_1: 'Free initial consultation',
  trust_2: 'No placement, no fee',
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

export const DEFAULT_ABOUT_PURPOSE: AboutPurposeContent = {
  purpose_heading: 'Enabling organisations to focus on what matters.',
  purpose_body: 'Our purpose is to enable organisations to concentrate on their core business operations while we manage the complexity of talent acquisition, workforce administration and HR support — reducing burden and improving efficiency across the board.',
  vision_heading: "Sierra Leone's most trusted workforce partner.",
  vision_body: 'To be the leading workforce solutions and HR consulting firm across Sierra Leone — known for the quality of our placements, the professionalism of our advisory, and the depth of our local talent networks across every major industry.',
  mission_heading: 'Deliver high quality staffing solutions quickly and professionally.',
  mission_body: 'To provide reliable workforce solutions through structured recruitment processes, strong local networks, and professional HR expertise — ensuring every client organisation has access to the right talent, at the right time, with the right support in place.',
}
