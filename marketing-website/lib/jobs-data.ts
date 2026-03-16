export type Job = {
  id: string
  title: string
  sector: string
  type: 'Permanent' | 'Contract' | 'Temporary'
  location: string
  salary_range: string
  posted: string
  urgent: boolean
  description: string
  responsibilities: string[]
  requirements: string[]
  nice_to_have: string[]
}

export const jobs: Job[] = [
  {
    id: '001',
    title: 'Site Engineer',
    sector: 'Construction',
    type: 'Permanent',
    location: 'Freetown',
    salary_range: 'SLL 12M – 18M / month',
    posted: '2d ago',
    urgent: true,
    description:
      'Our client, a leading construction firm operating across Freetown and the Western Area, is seeking an experienced Site Engineer to take technical ownership of ongoing and upcoming infrastructure projects. You will work closely with the Project Manager, subcontractors, and the client team to ensure delivery to specification, on time and within budget.',
    responsibilities: [
      'Oversee day-to-day site operations and ensure work is executed to design specifications',
      'Coordinate with contractors, subcontractors, and suppliers to maintain project schedules',
      'Conduct regular site inspections and quality assurance checks',
      'Maintain accurate site records, daily logs, and progress reports',
      'Identify and resolve technical issues as they arise on site',
      'Ensure compliance with health, safety, and environmental regulations',
      'Liaise with the client representative and attend progress meetings',
    ],
    requirements: [
      'Bachelor\'s degree in Civil or Structural Engineering (or equivalent qualification)',
      'Minimum 3 years of site-based construction experience in Sierra Leone or the region',
      'Proficiency in AutoCAD and Microsoft Project or similar planning tools',
      'Strong understanding of Sierra Leone building codes and construction standards',
      'Demonstrated ability to manage multiple contractors simultaneously',
    ],
    nice_to_have: [
      'Experience with road or drainage infrastructure projects',
      'Membership of a professional engineering body (e.g. ASSL)',
      'Experience working with international development clients or NGOs',
    ],
  },
  {
    id: '002',
    title: 'Registered Nurse',
    sector: 'Healthcare',
    type: 'Permanent',
    location: 'Freetown',
    salary_range: 'SLL 9M – 13M / month',
    posted: '3d ago',
    urgent: true,
    description:
      'A well-regarded private healthcare provider in Freetown is expanding its clinical team and seeks a qualified Registered Nurse to deliver high-quality patient care across general wards. The successful candidate will be part of a motivated, professional team committed to improving healthcare outcomes for patients and their families.',
    responsibilities: [
      'Provide direct nursing care to patients across medical and surgical wards',
      'Administer medications and treatments in line with physician orders and protocols',
      'Monitor and record patient vital signs, symptoms, and responses to treatment',
      'Liaise with doctors, specialists, and allied health staff to coordinate care plans',
      'Educate patients and families on health conditions, medications, and discharge procedures',
      'Maintain accurate and up-to-date patient records in compliance with facility standards',
      'Respond to emergency situations calmly and in accordance with clinical guidelines',
    ],
    requirements: [
      'Diploma or Bachelor\'s degree in Nursing from a recognised institution',
      'Current registration with the Nursing and Midwifery Board of Sierra Leone',
      'Minimum 2 years of clinical nursing experience post-qualification',
      'Proficiency in patient assessment, medication management, and wound care',
      'Strong interpersonal skills and ability to communicate clearly with patients and colleagues',
    ],
    nice_to_have: [
      'Experience in a private hospital or clinic setting',
      'Post-registration qualification in a specialist area (e.g. ICU, paediatrics)',
      'Basic Life Support (BLS) or Advanced Cardiac Life Support (ACLS) certification',
    ],
  },
  {
    id: '003',
    title: 'Safety Officer',
    sector: 'Mining',
    type: 'Contract',
    location: 'Kono District',
    salary_range: 'SLL 15M – 22M / month',
    posted: '4d ago',
    urgent: false,
    description:
      'A major mining operation in Kono District requires a Safety Officer to implement, monitor, and continuously improve HSE (Health, Safety and Environment) systems across an active mine site. This is a contract role based at the Kono District site with regular rotation. The successful candidate will champion a safety-first culture and ensure full compliance with national mining regulations and company standards.',
    responsibilities: [
      'Develop, implement, and maintain site-level HSE policies and procedures',
      'Conduct daily safety inspections and hazard identification audits across all operational areas',
      'Investigate incidents, near-misses, and non-conformances and prepare detailed reports',
      'Deliver regular safety inductions, toolbox talks, and training sessions for site personnel',
      'Monitor compliance with Sierra Leone Environmental Protection Agency requirements',
      'Maintain HSE documentation, records, and regulatory submissions',
      'Coordinate emergency response drills and ensure first aid resources are available and maintained',
    ],
    requirements: [
      'Diploma or degree in Occupational Health & Safety, Environmental Science, or a related field',
      'Minimum 3 years of HSE experience in a mining, quarrying, or heavy industrial environment',
      'Familiarity with Sierra Leone mining regulations and EPA requirements',
      'NEBOSH General Certificate or equivalent HSE qualification',
      'Ability to work in a rotational schedule (on-site/off-site)',
    ],
    nice_to_have: [
      'Experience with international mining companies or contractors',
      'Knowledge of ISO 45001 or OHSAS 18001 management systems',
      'Proficiency in incident reporting software',
    ],
  },
  {
    id: '004',
    title: 'Hotel Operations Manager',
    sector: 'Hospitality',
    type: 'Permanent',
    location: 'Freetown',
    salary_range: 'SLL 18M – 28M / month',
    posted: '5d ago',
    urgent: false,
    description:
      'A leading hotel group in Freetown is looking for an experienced Hotel Operations Manager to oversee all aspects of daily hotel operations and deliver consistently exceptional guest experiences. You will manage department heads across front office, housekeeping, food & beverage, and maintenance, and be responsible for driving occupancy, revenue, and service quality targets.',
    responsibilities: [
      'Oversee daily operations across all hotel departments to ensure seamless guest experiences',
      'Lead, coach, and develop department heads and front-line staff',
      'Monitor KPIs including occupancy rates, RevPAR, guest satisfaction scores, and operational costs',
      'Handle escalated guest complaints and resolve issues promptly and professionally',
      'Collaborate with the General Manager on strategic planning, budget setting, and revenue management',
      'Ensure compliance with health & safety, food hygiene, and fire regulations',
      'Manage vendor and supplier relationships and procurement in line with budget',
    ],
    requirements: [
      'Degree or Higher Diploma in Hospitality Management or a related field',
      'Minimum 5 years of hotel management experience, with at least 2 years in an operations role',
      'Strong leadership and team management skills across multi-department environments',
      'Experience with Property Management Systems (PMS) such as Opera or similar',
      'Proven track record of improving guest satisfaction scores and operational efficiency',
    ],
    nice_to_have: [
      'International hotel brand experience',
      'Experience in revenue management or yield optimisation',
      'French or other language proficiency is an advantage',
    ],
  },
  {
    id: '005',
    title: 'Logistics Coordinator',
    sector: 'Logistics',
    type: 'Permanent',
    location: 'Freetown',
    salary_range: 'SLL 8M – 12M / month',
    posted: '6d ago',
    urgent: false,
    description:
      'Our client, a national port authority operating out of Freetown, is seeking a Logistics Coordinator to support supply chain operations, port-side coordination, and cargo documentation. You will work within a team responsible for ensuring the smooth movement of goods through the port, liaising with customs officials, shipping agents, and internal stakeholders to maintain accurate records and meet turnaround targets.',
    responsibilities: [
      'Coordinate the daily movement of cargo through the port in line with operational schedules',
      'Prepare, verify, and process import/export documentation including bills of lading and customs declarations',
      'Liaise with shipping agents, freight forwarders, and customs authorities',
      'Track and report on cargo status, delays, and exceptions in real time',
      'Maintain accurate data entry and records in the port logistics management system',
      'Communicate proactively with clients and internal teams on cargo status and estimated delivery',
      'Support compliance with Sierra Leone Revenue Authority regulations and procedures',
    ],
    requirements: [
      'Degree or HND in Logistics, Supply Chain Management, or a related field',
      'Minimum 2 years of experience in a logistics, freight, or port operations role',
      'Strong understanding of import/export documentation and customs procedures',
      'Proficiency in Microsoft Excel and experience with logistics management systems',
      'High attention to detail and ability to work under pressure in a fast-paced environment',
    ],
    nice_to_have: [
      'Experience working at a seaport or within a freight forwarding company',
      'Knowledge of SLRA or NRA customs and port regulations',
      'Certification in supply chain management (e.g. CIPS or CILT)',
    ],
  },
  {
    id: '006',
    title: 'Field Supervisor',
    sector: 'Agriculture',
    type: 'Contract',
    location: 'Bo District',
    salary_range: 'SLL 7M – 10M / month',
    posted: '1w ago',
    urgent: false,
    description:
      'An established agribusiness company operating in Bo District is looking for a Field Supervisor to oversee farming operations across multiple plots. Working closely with the Agricultural Manager, you will coordinate a team of field workers, monitor crop health and production cycles, and ensure operations run safely and on target.',
    responsibilities: [
      'Supervise day-to-day field operations across multiple farm plots in Bo District',
      'Manage, direct, and motivate a team of seasonal and permanent field workers',
      'Monitor crop growth cycles, soil conditions, and irrigation systems',
      'Record field data including yields, inputs used, and worker attendance accurately',
      'Coordinate with input suppliers and ensure correct application of fertilisers and pesticides',
      'Report operational updates and field challenges to the Agricultural Manager regularly',
      'Ensure all field activities comply with safety guidelines and environmental practices',
    ],
    requirements: [
      'Certificate, Diploma, or Degree in Agriculture, Crop Science, or a related field',
      'Minimum 2 years of experience in an agricultural supervisory or field management role',
      'Practical knowledge of crop production — particularly rice, vegetables, or cassava',
      'Ability to work outdoors in rural conditions and manage a team in the field',
      'Good written and verbal communication skills in English and at least one local language',
    ],
    nice_to_have: [
      'Experience with commercial or outgrower farming schemes',
      'Familiarity with GPS field mapping or basic agricultural data tools',
      'Driving licence (manual vehicle)',
    ],
  },
  {
    id: '007',
    title: 'Network Engineer',
    sector: 'IT & Telecom',
    type: 'Permanent',
    location: 'Freetown',
    salary_range: 'SLL 14M – 20M / month',
    posted: '1w ago',
    urgent: false,
    description:
      'A growing telecommunications company in Freetown is seeking a Network Engineer to join their infrastructure team. You will be responsible for the design, deployment, and ongoing maintenance of the company\'s network infrastructure across Freetown and regional office locations, ensuring high availability and performance across all systems.',
    responsibilities: [
      'Design, configure, and maintain LAN, WAN, and wireless network infrastructure',
      'Monitor network performance, identify bottlenecks, and resolve connectivity issues promptly',
      'Manage and configure routers, switches, firewalls, and VPN systems (Cisco/Juniper)',
      'Conduct network capacity planning and recommend upgrades as the business scales',
      'Respond to and resolve network incidents, escalating to senior engineers when required',
      'Document network topology, configurations, and change management records',
      'Support rollout of new network infrastructure to remote and regional locations',
    ],
    requirements: [
      'Bachelor\'s degree in Computer Science, IT, or Telecommunications Engineering',
      'Minimum 3 years of hands-on network engineering experience',
      'CCNA certification (minimum); CCNP is strongly preferred',
      'Strong working knowledge of TCP/IP, BGP, OSPF, VLAN, and VPN technologies',
      'Experience with network monitoring tools such as SolarWinds, PRTG, or equivalent',
    ],
    nice_to_have: [
      'Experience working within an ISP or telecoms environment',
      'Familiarity with microwave and fibre backhaul infrastructure',
      'Knowledge of network security best practices and firewall management',
    ],
  },
  {
    id: '008',
    title: 'Finance Analyst',
    sector: 'Government',
    type: 'Permanent',
    location: 'Freetown',
    salary_range: 'SLL 10M – 15M / month',
    posted: '2w ago',
    urgent: false,
    description:
      'A government ministry is seeking a Finance Analyst to support budget planning, financial reporting, and expenditure analysis functions. You will work within the Finance Directorate, producing accurate financial data and insights to inform policy and resource allocation decisions. This is a structured role within a professional public sector environment.',
    responsibilities: [
      'Prepare monthly, quarterly, and annual financial reports for senior management and oversight bodies',
      'Analyse budget performance against allocations and highlight variances with explanations',
      'Support annual budget preparation, including cost projections and resource planning models',
      'Maintain accurate records of revenue, expenditure, and commitments in the financial system',
      'Assist with internal and external audit processes by preparing supporting documentation',
      'Conduct financial modelling and scenario analysis to support strategic planning',
      'Prepare presentations and briefing notes summarising financial performance for Directors',
    ],
    requirements: [
      'Bachelor\'s degree in Finance, Accounting, Economics, or a related field',
      'Minimum 3 years of experience in a finance or accounting role, preferably in the public sector',
      'Proficiency in Microsoft Excel including financial modelling and pivot tables',
      'Understanding of Sierra Leone government budgeting processes and IPSAS or IFRS standards',
      'Strong analytical skills with attention to detail and accuracy',
    ],
    nice_to_have: [
      'Part or full qualification with ACCA, CIMA, or ICASL',
      'Experience with government IFMIS or FMIS systems',
      'Previous experience working with development partners or donor-funded programmes',
    ],
  },
]

export function getJob(id: string): Job | undefined {
  return jobs.find(j => j.id === id)
}
