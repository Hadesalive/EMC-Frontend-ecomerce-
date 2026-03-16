-- EMC Job Seeds
-- Run this in the Supabase SQL editor AFTER creating the schema (schema.sql)
-- These are the initial job listings to populate the database

INSERT INTO jobs (title, sector, type, location, description, requirements, salary_range, urgent, is_active)
VALUES

(
  'Site Engineer',
  'Construction',
  'Permanent',
  'Freetown',
  'Our client, a leading construction firm operating across Freetown and the Western Area, is seeking an experienced Site Engineer to take technical ownership of ongoing and upcoming infrastructure projects. You will work closely with the Project Manager, subcontractors, and the client team to ensure delivery to specification, on time and within budget.',
  ARRAY[
    'Bachelor''s degree in Civil or Structural Engineering (or equivalent qualification)',
    'Minimum 3 years of site-based construction experience in Sierra Leone or the region',
    'Proficiency in AutoCAD and Microsoft Project or similar planning tools',
    'Strong understanding of Sierra Leone building codes and construction standards',
    'Demonstrated ability to manage multiple contractors simultaneously'
  ],
  'SLL 12M – 18M / month',
  true,
  true
),

(
  'Registered Nurse',
  'Healthcare',
  'Permanent',
  'Freetown',
  'A well-regarded private healthcare provider in Freetown is expanding its clinical team and seeks a qualified Registered Nurse to deliver high-quality patient care across general wards. The successful candidate will be part of a motivated, professional team committed to improving healthcare outcomes for patients and their families.',
  ARRAY[
    'Diploma or Bachelor''s degree in Nursing from a recognised institution',
    'Current registration with the Nursing and Midwifery Board of Sierra Leone',
    'Minimum 2 years of clinical nursing experience post-qualification',
    'Proficiency in patient assessment, medication management, and wound care',
    'Strong interpersonal skills and ability to communicate clearly with patients and colleagues'
  ],
  'SLL 9M – 13M / month',
  true,
  true
),

(
  'Safety Officer',
  'Mining',
  'Contract',
  'Kono District',
  'A major mining operation in Kono District requires a Safety Officer to implement, monitor, and continuously improve HSE systems across an active mine site. This is a contract role based at the Kono District site with regular rotation. The successful candidate will champion a safety-first culture and ensure full compliance with national mining regulations and company standards.',
  ARRAY[
    'Diploma or degree in Occupational Health & Safety, Environmental Science, or a related field',
    'Minimum 3 years of HSE experience in a mining, quarrying, or heavy industrial environment',
    'Familiarity with Sierra Leone mining regulations and EPA requirements',
    'NEBOSH General Certificate or equivalent HSE qualification',
    'Ability to work in a rotational schedule (on-site/off-site)'
  ],
  'SLL 15M – 22M / month',
  false,
  true
),

(
  'Hotel Operations Manager',
  'Hospitality',
  'Permanent',
  'Freetown',
  'A leading hotel group in Freetown is looking for an experienced Hotel Operations Manager to oversee all aspects of daily hotel operations and deliver consistently exceptional guest experiences. You will manage department heads across front office, housekeeping, food & beverage, and maintenance, and be responsible for driving occupancy, revenue, and service quality targets.',
  ARRAY[
    'Degree or Higher Diploma in Hospitality Management or a related field',
    'Minimum 5 years of hotel management experience, with at least 2 years in an operations role',
    'Strong leadership and team management skills across multi-department environments',
    'Experience with Property Management Systems (PMS) such as Opera or similar',
    'Proven track record of improving guest satisfaction scores and operational efficiency'
  ],
  'SLL 18M – 28M / month',
  false,
  true
),

(
  'Logistics Coordinator',
  'Logistics',
  'Permanent',
  'Freetown',
  'Our client, a national port authority operating out of Freetown, is seeking a Logistics Coordinator to support supply chain operations, port-side coordination, and cargo documentation. You will work within a team responsible for ensuring the smooth movement of goods through the port, liaising with customs officials, shipping agents, and internal stakeholders.',
  ARRAY[
    'Degree or HND in Logistics, Supply Chain Management, or a related field',
    'Minimum 2 years of experience in a logistics, freight, or port operations role',
    'Strong understanding of import/export documentation and customs procedures',
    'Proficiency in Microsoft Excel and experience with logistics management systems',
    'High attention to detail and ability to work under pressure in a fast-paced environment'
  ],
  'SLL 8M – 12M / month',
  false,
  true
),

(
  'Field Supervisor',
  'Agriculture',
  'Contract',
  'Bo District',
  'An established agribusiness company operating in Bo District is looking for a Field Supervisor to oversee farming operations across multiple plots. Working closely with the Agricultural Manager, you will coordinate a team of field workers, monitor crop health and production cycles, and ensure operations run safely and on target.',
  ARRAY[
    'Certificate, Diploma, or Degree in Agriculture, Crop Science, or a related field',
    'Minimum 2 years of experience in an agricultural supervisory or field management role',
    'Practical knowledge of crop production — particularly rice, vegetables, or cassava',
    'Ability to work outdoors in rural conditions and manage a team in the field',
    'Good written and verbal communication skills in English and at least one local language'
  ],
  'SLL 7M – 10M / month',
  false,
  true
),

(
  'Network Engineer',
  'IT & Telecom',
  'Permanent',
  'Freetown',
  'A growing telecommunications company in Freetown is seeking a Network Engineer to join their infrastructure team. You will be responsible for the design, deployment, and ongoing maintenance of the company''s network infrastructure across Freetown and regional office locations, ensuring high availability and performance across all systems.',
  ARRAY[
    'Bachelor''s degree in Computer Science, IT, or Telecommunications Engineering',
    'Minimum 3 years of hands-on network engineering experience',
    'CCNA certification (minimum); CCNP is strongly preferred',
    'Strong working knowledge of TCP/IP, BGP, OSPF, VLAN, and VPN technologies',
    'Experience with network monitoring tools such as SolarWinds, PRTG, or equivalent'
  ],
  'SLL 14M – 20M / month',
  false,
  true
),

(
  'Finance Analyst',
  'Government',
  'Permanent',
  'Freetown',
  'A government ministry is seeking a Finance Analyst to support budget planning, financial reporting, and expenditure analysis functions. You will work within the Finance Directorate, producing accurate financial data and insights to inform policy and resource allocation decisions. This is a structured role within a professional public sector environment.',
  ARRAY[
    'Bachelor''s degree in Finance, Accounting, Economics, or a related field',
    'Minimum 3 years of experience in a finance or accounting role, preferably in the public sector',
    'Proficiency in Microsoft Excel including financial modelling and pivot tables',
    'Understanding of Sierra Leone government budgeting processes and IPSAS or IFRS standards',
    'Strong analytical skills with attention to detail and accuracy'
  ],
  'SLL 10M – 15M / month',
  false,
  true
);
