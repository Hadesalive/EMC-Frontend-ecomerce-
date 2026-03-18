-- ─────────────────────────────────────────────────────────────────────────────
-- Seed: Alpha Amadu Bah – Software Engineer
-- Run in Supabase SQL Editor
-- ─────────────────────────────────────────────────────────────────────────────

DELETE FROM public.team_members WHERE name = 'Alpha Amadu Bah';

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
  'Alpha Amadu Bah',
  'Software Engineer',
  'Digitalising Sierra Leone, one system at a time.',
  'Full-stack engineer with 5+ years building scalable, production-grade systems across the entire technology stack — from pixel-precise frontends to distributed microservice backends.',
  $$[
    {
      "paragraphs": [
        "Alpha Amadu Bah is a full-stack software engineer and systems architect based in Freetown, Sierra Leone. With over five years of hands-on experience across modern technology stacks, he designs and ships production-grade platforms that are architecturally sound, visually refined, and built to scale under real-world demand.",
        "He operates across the full breadth of the stack — crafting performant, accessible frontends with React, Next.js, and TypeScript; engineering distributed microservice backends and event-driven architectures; designing and managing relational and NoSQL databases; and deploying to cloud-native infrastructure. He builds cross-platform systems that stay consistent and synchronised across web, mobile, and internal tooling — with real-time data sync, role-based access control, CI/CD pipelines, and edge deployments handled end to end."
      ]
    },
    {
      "heading": "What He Builds",
      "paragraphs": [
        "His portfolio spans multi-tenant SaaS platforms, candidate and employer portals, recruiter dashboards, automated application pipelines, content management systems, analytics engines, and end-to-end digital infrastructure built from zero. He doesn't hand off layers or work within a slice of the stack — he architects the system, writes the code, ships the product, and keeps it running.",
        "What sets his work apart is the intersection of deep technical rigour and a genuine obsession with design. He builds backends that are fault-tolerant and horizontally scalable, and frontends that are fast, responsive, and built to look like someone actually cared — because in his view, both matter equally."
      ]
    },
    {
      "heading": "Mission",
      "paragraphs": [
        "Underlying everything is a mission bigger than the code: to use software as a force for systemic modernisation — digitising organisations, dismantling manual processes, and delivering enterprise-grade infrastructure to businesses in markets that have historically been priced out of it. He is building that future from Sierra Leone, one system at a time."
      ]
    }
  ]$$::jsonb,
  ARRAY[
    '5+ Years Professional Software Engineering Experience',
    'Full-Stack & Systems Architecture',
    'Cross-Platform & Distributed Systems Development'
  ],
  ARRAY[
    'React & Next.js',
    'TypeScript',
    'Microservice Architecture',
    'Distributed Systems',
    'REST & GraphQL APIs',
    'Real-time Sync',
    'Cloud Infrastructure',
    'CI/CD & DevOps',
    'Database Design',
    'Cross-Platform Development'
  ],
  'brand-blue',
  5,
  true
);
