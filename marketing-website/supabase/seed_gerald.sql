-- ─────────────────────────────────────────────────────────────────────────────
-- Seed: Gerald Emmanuel Thomas – Chief Technology Officer
-- Run in Supabase SQL Editor
-- ─────────────────────────────────────────────────────────────────────────────

-- Remove old record (Fatmata or any previous Gerald entry)
DELETE FROM public.team_members WHERE name IN ('Fatmata Conteh', 'Gerald Emmanuel Thomas');

-- Insert Gerald's profile
INSERT INTO public.team_members (
  name,
  title,
  tagline,
  short_bio,
  sections,
  credentials,
  specialisms,
  color,
  display_order,
  is_active
)
VALUES (
  'Gerald Emmanuel Thomas',
  'Chief Technology Officer',
  'Building the digital future of Sierra Leone, one innovation at a time.',
  'I believe that the true value of technology is measured by its ability to empower people. Whether through a more efficient health system or a secure national network, my goal is to build the digital future of Sierra Leone, one innovation at a time.',
  $$[{"paragraphs":["Accomplished IT Engineer and Chief Technology Officer with over 15 years of experience driving digital transformation across telecommunications and government sectors. Gerald specialises in the design, implementation, and management of complex IT infrastructures, with niche expertise in Health Informatics (DHIS2) and Open Source solutions.","His career is defined by a commitment to using data and technology to drive positive social change, having successfully led national-scale projects in healthcare, public assets, and disaster preparedness. He combines high-level strategic leadership with deep technical proficiency in cybersecurity, cloud architecture, and network engineering."]}]$$::jsonb,
  ARRAY[
    'B.Eng in Electrical and Electronics – Fourah Bay College (FBC)',
    'Certificate in DHIS2 Server Administration – University of Oslo',
    'Microsoft Certified: Azure Data & Fundamentals'
  ],
  ARRAY[
    'Digital Transformation',
    'Health Informatics (DHIS2)',
    'Cybersecurity (CEH)',
    'Cloud Architecture (Azure/AWS)',
    'LAN/WAN/VPN Design',
    'IT Infrastructure Management'
  ],
  'brand-orange',
  4,
  true
);
