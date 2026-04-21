export interface GuideSection {
  heading: string
  paragraphs: string[]
  tips?: string[]
}

export interface Guide {
  slug: string
  category: 'Employer Guide' | 'Career Guide'
  isBlue: boolean
  iconKey: 'FileText' | 'Scales' | 'CurrencyDollar' | 'ClipboardText' | 'UserCircle' | 'ChartBar'
  title: string
  excerpt: string
  intro: string
  readTime: string
  sections: GuideSection[]
}

export const GUIDES: Guide[] = [
  {
    slug: 'how-to-write-a-job-description',
    category: 'Employer Guide',
    isBlue: true,
    iconKey: 'FileText',
    title: 'How to Write a Job Description That Attracts Top Candidates',
    excerpt: 'A step-by-step framework for crafting clear, compelling job descriptions that bring in the right applicants.',
    intro: 'A well-crafted job description is the foundation of every successful hire. It sets expectations, attracts the right candidates, and protects your organisation legally. Yet most job descriptions are vague, outdated, or copied from a template without thought. Here is how to write one that actually works.',
    readTime: '6 min read',
    sections: [
      {
        heading: 'Start with the job title',
        paragraphs: [
          'The job title is often the first thing a candidate sees — and it determines whether they apply at all. Use a clear, standard title that candidates will search for. Avoid internal jargon or invented titles. Instead, use widely recognised titles: "Human Resources Officer", "Site Supervisor", "Accounts Assistant". If the role has seniority levels, specify them: "Senior Project Manager" vs "Project Manager".',
        ],
        tips: [
          'Match the title to industry standards in Sierra Leone',
          'Avoid overly creative or vague titles',
          'Include the seniority level (Junior, Senior, Lead) where relevant',
        ],
      },
      {
        heading: 'Write a clear role summary',
        paragraphs: [
          'The role summary (2–3 sentences) explains what the position does, why it exists, and how it fits into the organisation. Think of it as the elevator pitch for the role.',
          'Example: "We are looking for an experienced Logistics Coordinator to manage inbound and outbound shipments across our Sierra Leone operations. Reporting to the Operations Manager, you will coordinate with clearing agents, track deliveries, and ensure timely distribution to field sites."',
          'Keep it factual. Avoid superlatives like "exciting" or "dynamic" — candidates see through them.',
        ],
      },
      {
        heading: 'List responsibilities clearly',
        paragraphs: [
          'List 6–10 specific responsibilities using action verbs: "Coordinate", "Manage", "Prepare", "Oversee", "Ensure". Prioritise the most important duties first.',
          'Avoid vague phrases like "other duties as assigned" as the bulk of the description. If a task takes up 20% or more of the role, it deserves its own bullet point.',
          'Example responsibilities for an HR Officer role: manage end-to-end recruitment for non-management positions; maintain accurate employee records in the HR system; coordinate monthly payroll processing in liaison with Finance; support line managers with performance review processes; handle employee grievances in line with company policy.',
        ],
      },
      {
        heading: 'Define requirements honestly',
        paragraphs: [
          'Separate must-have requirements from nice-to-have qualities. Overloading a description with requirements discourages strong candidates from applying.',
          'Must-haves: qualifications, licences, specific technical skills, years of directly relevant experience. Nice-to-haves: additional languages, familiarity with specific software, experience in a particular sub-sector.',
          'In Sierra Leone\'s job market, be realistic about educational requirements. A degree may not always be the right filter — vocational training, apprenticeships, and on-the-job experience are equally valid for many technical roles.',
        ],
        tips: [
          'Do not require a degree if the role does not genuinely need one',
          'Specify the minimum years of relevant experience',
          'Include any physical requirements (e.g. ability to work on site, travel to remote locations)',
        ],
      },
      {
        heading: 'Include compensation and benefits',
        paragraphs: [
          'Candidates often decide whether to apply based on salary. Listing a range — even a broad one — increases application quality and saves everyone\'s time.',
          'Where you can, include: base salary or rate, location of work, contract type (permanent, fixed-term, contract), and key benefits such as medical cover, accommodation allowance, transport allowance, and leave entitlement.',
        ],
      },
      {
        heading: 'Common mistakes to avoid',
        paragraphs: [
          'Even experienced hiring managers fall into predictable traps when writing job descriptions. Being aware of them puts you ahead.',
        ],
        tips: [
          'Writing the description for an ideal candidate rather than the actual role',
          'Using internal acronyms or department-specific language',
          'Forgetting to include the reporting line and work location',
          'Listing so many requirements that no realistic candidate qualifies',
          'Neglecting to update the description when the role evolves',
        ],
      },
    ],
  },

  {
    slug: 'employment-law-sierra-leone',
    category: 'Employer Guide',
    isBlue: true,
    iconKey: 'Scales',
    title: 'Employment Law Basics for Sierra Leone Employers',
    excerpt: 'Key legal requirements for hiring, contracts, leave entitlements, and fair termination procedures.',
    intro: 'Understanding your legal obligations as an employer in Sierra Leone is not optional — it protects your staff, your business, and your reputation. This guide covers the key provisions of Sierra Leone\'s labour framework that every employer should know.',
    readTime: '7 min read',
    sections: [
      {
        heading: 'The legislative framework',
        paragraphs: [
          'Employment in Sierra Leone is primarily governed by the Regulation of Wages and Industrial Relations Act and the Employees\' Social Security Scheme Act, alongside various sector-specific regulations. Employers in the formal sector are required to register employees with the National Social Security and Insurance Trust (NASSIT) and comply with minimum wage orders issued periodically by the Ministry of Labour.',
          'Foreign investors and multinational organisations operating in Sierra Leone must ensure their employment practices align with local law, even when internal group policies differ. Non-compliance can result in fines, reputational damage, and operational disruption.',
        ],
      },
      {
        heading: 'Employment contracts',
        paragraphs: [
          'Every employee should have a written employment contract. A legally sound contract should include: full names and contact details of both parties; job title, duties, and place of work; start date and, for fixed-term contracts, end date; remuneration including salary, allowances, and payment schedule; working hours and days; leave entitlements; termination provisions and notice period; and grievance and disciplinary procedures.',
          'Oral agreements are recognised under Sierra Leone law but are difficult to enforce. Always put contracts in writing — for the protection of both parties.',
        ],
        tips: [
          'Use a standard contract template and have it reviewed by a local labour law specialist',
          'Issue contracts before the employee\'s first day, not after',
          'Ensure contracts are signed and copies held by both parties',
        ],
      },
      {
        heading: 'Working hours and leave entitlements',
        paragraphs: [
          'The standard working week in Sierra Leone is 40 hours for most sectors, though this varies by industry. Key leave entitlements that employers must provide include the following.',
          'Annual Leave: Employees are generally entitled to a minimum of 21 working days of paid annual leave per year after completing one year of continuous service.',
          'Sick Leave: Employees are entitled to paid sick leave, typically up to 12 days per year, subject to medical certification from a registered practitioner.',
          'Maternity Leave: Female employees are entitled to 12 weeks of maternity leave, with at least 6 weeks to be taken after childbirth. Dismissal on grounds of pregnancy is unlawful.',
          'Public Holidays: Sierra Leone observes approximately 13 public holidays per year. Employees required to work on public holidays are typically entitled to additional compensation or a compensatory day off.',
        ],
      },
      {
        heading: 'Termination and redundancy',
        paragraphs: [
          'Terminating an employment contract in Sierra Leone requires adherence to proper process. Summary dismissal without due cause or process exposes employers to legal liability.',
          'Notice Periods: The required notice period depends on the length of service and the terms of the contract. Typical notice periods range from one week for short-service employees to one month or more for senior or long-service staff.',
          'Grounds for Dismissal: Dismissal must be for a legitimate reason — misconduct, poor performance, or genuine redundancy. The employer should be able to demonstrate that a fair process was followed, including warnings and an opportunity for the employee to respond.',
          'Redundancy: Where roles are eliminated due to organisational changes, employers must follow a fair selection process, consult affected employees, and pay any legally required redundancy payments. Selecting employees for redundancy on discriminatory grounds is unlawful.',
          'NASSIT: Ensure all NASSIT contributions are up to date before termination, as outstanding contributions are a liability on the employer and can delay clearance.',
        ],
        tips: [
          'Document all disciplinary processes carefully — records are essential if a dispute arises',
          'Issue formal written warnings before proceeding to dismissal for performance issues',
          'Seek legal advice before terminating a long-service or senior employee',
          'Ensure all final payments (salary, accrued leave, gratuity) are settled promptly on the last day',
        ],
      },
      {
        heading: 'NASSIT and social security obligations',
        paragraphs: [
          'All employers in Sierra Leone are legally required to register with NASSIT and contribute to the scheme on behalf of their employees. Employer contributions are currently set at a percentage of gross salary, matched by an employee contribution.',
          'Failure to register or make timely contributions results in penalties and interest charges. NASSIT contributions form part of the employee\'s retirement benefits, so non-compliance also harms your staff directly.',
        ],
        tips: [
          'Register new employees with NASSIT within 30 days of commencement',
          'Keep NASSIT contribution records up to date and file returns on time',
          'Provide employees with their NASSIT registration number and contribution history on request',
        ],
      },
    ],
  },

  {
    slug: 'competitive-pay-sierra-leone',
    category: 'Employer Guide',
    isBlue: true,
    iconKey: 'CurrencyDollar',
    title: 'Competitive Pay in Sierra Leone: Benchmarks by Industry',
    excerpt: 'Salary ranges and benefits trends across construction, mining, hospitality, healthcare, and more.',
    intro: 'Setting the right salary is one of the most impactful decisions you will make as an employer. Pay too low and you will struggle to attract and retain quality staff. Pay without a framework and you risk internal inequity. This guide provides practical guidance and indicative benchmarks for setting competitive compensation in Sierra Leone.',
    readTime: '8 min read',
    sections: [
      {
        heading: 'Why compensation strategy matters',
        paragraphs: [
          'In Sierra Leone\'s growing private sector, competition for skilled professionals — particularly in mining, construction, healthcare, and logistics — is real and intensifying. Organisations that offer transparent, competitive packages attract better candidates and retain them longer.',
          'Beyond base salary, candidates increasingly weigh up: stability of employment, medical benefits, transport and housing allowances, opportunities for career development, and the quality of management and working environment.',
        ],
      },
      {
        heading: 'Salary benchmarks by sector',
        paragraphs: [
          'The following ranges are indicative for mid-level professionals in Freetown and major project sites. Actual salaries vary by employer size, international versus local company, and specific role requirements. These figures are provided as a guide only — verify current benchmarks with an HR specialist, as rates shift with inflation and market demand.',
          'Mining & Extractive Industry: Site Supervisors SLL 8M–15M/month; HSE Officers SLL 10M–18M/month; Community Relations Officers SLL 7M–12M/month. Senior engineers and specialist expatriate roles are typically structured with separate benefits packages.',
          'Construction & Infrastructure: Foremen and Site Supervisors SLL 6M–10M/month; Civil Engineers (degree-level, 3+ years) SLL 10M–18M/month; Project Managers SLL 15M–30M/month.',
          'Hospitality & Tourism: Front Office Managers SLL 5M–9M/month; Executive Chefs SLL 8M–14M/month; Food & Beverage Supervisors SLL 4M–7M/month.',
          'Healthcare: Registered Nurses SLL 5M–8M/month; Clinical Officers SLL 7M–12M/month; Hospital Administrators SLL 9M–16M/month.',
          'Logistics & Supply Chain: Logistics Coordinators SLL 5M–9M/month; Warehouse Supervisors SLL 4M–7M/month; Fleet Managers SLL 8M–13M/month.',
        ],
        tips: [
          'These are indicative ranges only — market rates change and vary by employer type',
          'International organisations typically pay 20–40% above local market rates',
          'Remote or site-based roles often carry location allowances on top of base salary',
        ],
      },
      {
        heading: 'Benefits that make a difference',
        paragraphs: [
          'In Sierra Leone, where access to quality healthcare and reliable transport can be challenging, non-salary benefits often carry significant weight in a candidate\'s decision. The most valued benefits include the following.',
          'Medical Insurance: Private health cover for the employee — and where possible, their family — is highly valued and a strong differentiator, particularly for international NGOs and larger corporate employers.',
          'Transport Allowance: Essential for employees in Freetown, where public transport coverage varies across the city. A fixed monthly allowance or employer-provided transport significantly improves quality of life.',
          'Housing Allowance: Common for project-site roles and senior positions, particularly in mining and construction where employees work away from Freetown.',
          'NASSIT Contributions: Employer contributions to NASSIT (National Social Security) are mandatory and form a visible part of the total compensation package.',
          'Annual Bonus or 13th Month: Common in international organisations and expected in some sectors. Even a modest performance-linked bonus has a significant impact on retention.',
        ],
      },
      {
        heading: 'Structuring a competitive offer',
        paragraphs: [
          'When making an offer, present total compensation rather than just base salary. Candidates who understand the full value of their package — including allowances, insurance, and NASSIT — are more likely to accept.',
          'Be transparent about what is and is not included. Ambiguity around allowances or benefits is a common source of early turnover and employee dissatisfaction.',
        ],
        tips: [
          'Lead with total compensation, not just base salary',
          'Benchmark annually — Sierra Leone\'s economy is dynamic and rates shift',
          'Ensure salary bands are internally equitable before hiring externally',
          'For contract or project roles, consider daily or weekly rates rather than monthly salaries',
          'Document all compensation components clearly in the employment contract',
        ],
      },
    ],
  },

  {
    slug: 'cv-writing-guide',
    category: 'Career Guide',
    isBlue: false,
    iconKey: 'ClipboardText',
    title: 'CV Writing Guide for Sierra Leone Job Seekers',
    excerpt: 'How to write a CV that stands out to local and international employers operating in Sierra Leone.',
    intro: 'Your CV is your first introduction to a potential employer. In Sierra Leone\'s competitive job market — where a single vacancy can attract hundreds of applications — a well-structured, clear CV can be the difference between getting an interview and being overlooked. This guide walks you through exactly what to include and how to present it.',
    readTime: '7 min read',
    sections: [
      {
        heading: 'Keep it focused and concise',
        paragraphs: [
          'Unless you have more than ten years of highly relevant experience, aim for one to two pages. Hiring managers and recruiters review CVs quickly — often in under 30 seconds on the first pass. Make every word count.',
          'Use a clean, simple layout. Avoid tables, heavy graphics, or unusual fonts that can confuse applicant tracking systems or simply look cluttered. Black text on white background, standard fonts such as Calibri, Arial, or Times New Roman, and consistent formatting go a long way.',
        ],
        tips: [
          'One page is ideal for candidates with fewer than five years of experience',
          'Do not reduce font size below 10pt to fit everything on one page — edit instead',
          'Save as PDF to preserve your formatting across different devices',
        ],
      },
      {
        heading: 'CV structure that works',
        paragraphs: [
          'A strong CV follows a clear structure. Follow this order for best results.',
          '1. Contact Information: Full name, phone number, email address, and location (town or city is sufficient — your full address is not required). If you have a LinkedIn profile, include the URL.',
          '2. Professional Summary: Two to three sentences describing who you are professionally, your years of experience, and what you bring to a role. Tailor this section for every application you send.',
          '3. Work Experience: Listed in reverse chronological order, with your most recent role first. For each role, include your job title, the employer\'s name, the dates you worked there (month and year), and three to five bullet points describing what you did and what you achieved.',
          '4. Education: Degree, institution, and year of graduation. Include professional certifications here too — CIPD, PMP, HSE qualifications, and similar credentials carry significant weight.',
          '5. Skills: A concise list of relevant technical and professional skills. Only list skills you can genuinely demonstrate in an interview.',
          '6. References: "References available upon request" is sufficient. You do not need to list referees on your CV.',
        ],
      },
      {
        heading: 'Writing strong experience bullets',
        paragraphs: [
          'The best experience bullets follow this structure: Action Verb + What You Did + The Result. This approach immediately demonstrates impact, not just activity.',
          'Weak: "Responsible for recruitment." Strong: "Managed end-to-end recruitment for 25 positions across three project sites, reducing average time-to-hire from six weeks to three and a half."',
          'Use numbers wherever you can — headcount managed, budgets handled, percentage improvements, team sizes. Quantified achievements stand out in a stack of CVs.',
          'Write in past tense for previous roles and present tense for your current role. Be consistent throughout.',
        ],
      },
      {
        heading: 'Tailoring your CV for each application',
        paragraphs: [
          'Never send the same CV to every employer. Read the job description carefully and mirror the language used. If the employer mentions "stakeholder management", use those exact words in your CV where relevant — many larger organisations and international employers use keyword-matching tools.',
          'Remove or condense experience that is not relevant to the role. A job from ten years ago that has nothing to do with your current career path is better left off or summarised in a single line.',
          'Write a tailored professional summary for each application. This takes five minutes and significantly increases your chances of getting through to interview.',
        ],
        tips: [
          'Proofread twice — spelling and grammar mistakes signal a lack of care',
          'Avoid photos unless specifically requested by the employer',
          'Name your file clearly: FirstName_LastName_CV.pdf',
          'Do not include your date of birth, marital status, or religion unless specifically asked',
          'Have someone you trust read it before you send — a fresh pair of eyes catches things you miss',
        ],
      },
    ],
  },

  {
    slug: 'interview-preparation',
    category: 'Career Guide',
    isBlue: false,
    iconKey: 'UserCircle',
    title: 'Interview Preparation: How to Make a Strong Impression',
    excerpt: 'From researching the company to answering tough questions — a full prep guide for job interviews.',
    intro: 'An interview is not just about answering questions — it is your opportunity to demonstrate who you are as a professional. Preparation is what separates candidates who perform well under pressure from those who do not. Follow this guide to walk into your next interview confident and ready.',
    readTime: '8 min read',
    sections: [
      {
        heading: 'Research before you go',
        paragraphs: [
          'Spend at least 30–60 minutes researching the organisation before your interview. Know what they do, the industries or clients they serve, any recent news or projects, and how the role you are applying for fits into the wider team.',
          'Check their website, LinkedIn page, and any press coverage. If it is a mining company, understand their current projects and operating sites. If it is an NGO, understand their programmes, funders, and reach. If it is a hotel or hospitality business, look at their services and reputation.',
          'Showing you have done your homework is a strong signal of genuine interest and professionalism. Interviewers notice — and remember — when a candidate clearly knows nothing about the company.',
        ],
        tips: [
          'Write down two or three things you found interesting about the company — be ready to mention them',
          'Know the name of the interviewer(s) if possible, and check their LinkedIn profile',
          'Understand the role you applied for — re-read the job description the night before',
        ],
      },
      {
        heading: 'Understanding common question types',
        paragraphs: [
          'Most professional interviews include three types of questions, and knowing the difference helps you prepare appropriately.',
          'Competency and Behavioural Questions ask about past experiences. Example: "Tell me about a time you resolved a conflict in the workplace." These questions look for evidence of skills and character from real situations.',
          'Technical Questions test role-specific knowledge. These vary by profession — an accountant might be asked about reconciliation processes, a logistics coordinator about incoterms, an engineer about load calculations. Prepare by reviewing the job description and thinking through examples from your experience.',
          'Situational Questions ask how you would handle a hypothetical scenario. Example: "What would you do if a member of your team was consistently missing deadlines?" Answer by explaining your reasoning and approach — interviewers are assessing your judgement, not looking for a single right answer.',
        ],
      },
      {
        heading: 'The STAR method for behavioural questions',
        paragraphs: [
          'STAR stands for Situation, Task, Action, Result. It is the most effective structure for answering behavioural interview questions, and it consistently produces clear, compelling answers.',
          'Situation: Briefly describe the context. Where were you working? What was the challenge or problem?',
          'Task: What was your specific responsibility in that situation? What were you expected to do?',
          'Action: What did you personally do? Focus on your own actions, not what the team did collectively.',
          'Result: What was the outcome? Use numbers or concrete details where possible — "we delivered on time", "the client renewed the contract", "the team met the target for the first time in six months".',
          'Example: "At my previous company, our team was struggling to meet a project deadline due to a supplier delay (Situation). As logistics coordinator, it was my responsibility to find an alternative supplier and manage the revised timeline (Task). I contacted three alternative suppliers within 24 hours, secured a delivery commitment, and briefed the project manager daily on progress (Action). We delivered on time, and the client extended their contract for a second year (Result)."',
        ],
      },
      {
        heading: 'Questions to ask the interviewer',
        paragraphs: [
          'Always prepare two or three questions to ask at the end of the interview. Asking nothing suggests a lack of curiosity. Asking good questions leaves a lasting impression.',
        ],
        tips: [
          '"What does success look like in this role in the first 90 days?"',
          '"How would you describe the team culture and working environment?"',
          '"What are the biggest challenges the team is currently facing?"',
          '"What are the opportunities for growth or professional development in this role?"',
          'Avoid asking about salary or benefits in the first interview unless the interviewer raises it first',
        ],
      },
      {
        heading: 'Practical preparation on the day',
        paragraphs: [
          'The logistics of an interview matter as much as the content. Arriving late, dressed inappropriately, or visibly unprepared undermines the impression you make regardless of what you say.',
        ],
        tips: [
          'Confirm the interview time, location, and format (in-person, video, or panel) the day before',
          'Plan to arrive 10–15 minutes early — account for traffic in Freetown',
          'Dress professionally: when in doubt, dress up rather than down',
          'Bring printed copies of your CV and any relevant certificates or documents',
          'After the interview, send a brief thank-you email within 24 hours — few candidates do this and it stands out',
        ],
      },
    ],
  },

  {
    slug: 'career-paths-sierra-leone',
    category: 'Career Guide',
    isBlue: false,
    iconKey: 'ChartBar',
    title: 'Building a Career in Construction, Mining & Hospitality',
    excerpt: 'Explore growth paths and opportunities in Sierra Leone\'s fastest-growing and most active industries.',
    intro: 'Sierra Leone\'s economy is evolving. With continued investment in mining, infrastructure, hospitality, and healthcare, the job market offers real opportunities for professionals who understand where growth is happening and what skills are in demand. This guide outlines career paths and practical advice across the country\'s most active sectors.',
    readTime: '9 min read',
    sections: [
      {
        heading: 'Mining & extractive industries',
        paragraphs: [
          'Mining remains one of Sierra Leone\'s most active employment sectors, driven by ongoing iron ore, rutile, diamond, and bauxite operations. Career paths range from site-level technical roles to corporate, environmental, and community functions.',
          'Entry-level roles include site assistant, field data collector, community liaison assistant, and laboratory technician (with relevant vocational training). These positions offer exposure to site operations and are stepping stones to more specialist roles.',
          'At mid-level, professionals work as HSE Officers, Community Relations Officers, Logistics Coordinators, Mining Technicians, or Environmental Officers. These roles require relevant technical qualifications and typically two to five years of sector experience.',
          'Senior professionals work as HSE Managers, Operations Superintendents, Metallurgists, Exploration Geologists, and Project Directors. These roles often require international certifications and significant sector experience.',
        ],
        tips: [
          'Obtain HSE certifications — they are a requirement for most site-based roles and career progression',
          'Learn to document accurately — safety records, incident reports, and community engagement logs all matter',
          'Experience in remote or camp-based environments is valued and opens doors to international mining employers',
        ],
      },
      {
        heading: 'Construction & infrastructure',
        paragraphs: [
          'Sierra Leone\'s infrastructure gap — roads, bridges, energy, and buildings — continues to drive significant construction activity, with both government-funded and private sector projects creating sustained demand for skilled professionals.',
          'Entry-level opportunities include site labourer, stores assistant, accounts clerk (contractor administration), and CAD draftsperson for those with technical drawing skills.',
          'Mid-level professionals typically work as Site Supervisors, Quantity Surveyors, Procurement Officers, Civil Technicians, or Safety Officers. A HND or BSc in a relevant discipline, combined with two to four years of site experience, positions candidates well for these roles.',
          'At senior level, roles include Project Manager, Contract Manager, Site Engineer, Structural Engineer, and Construction Director. International project management certifications (PMP, PRINCE2) are increasingly valued by contractors working on major infrastructure programmes.',
        ],
        tips: [
          'Proficiency in AutoCAD is a strong differentiator for technical and engineering roles',
          'Practical site experience is often valued more than academic qualifications alone',
          'Build skills in procurement and contract management — these translate across sectors',
        ],
      },
      {
        heading: 'Hospitality & tourism',
        paragraphs: [
          'The hospitality sector in Sierra Leone — hotels, restaurants, resorts, and beach properties — is growing steadily, particularly in Freetown and the Western Area. International chains and boutique operators are raising service standards and creating demand for trained staff at all levels.',
          'Entry-level roles are available for those with basic hospitality training or a willingness to learn on the job: waiter, front desk agent, kitchen helper, and housekeeping attendant. These positions provide foundational exposure to how hospitality businesses operate.',
          'At mid-level, professionals work as Guest Relations Officers, Sous Chefs, Front Office Supervisors, and Restaurant Supervisors. Formal hospitality training — certificates or diplomas from recognised schools — is a genuine advantage here.',
          'Senior roles include Executive Chef, Hotel Manager, Food & Beverage Manager, and Sales & Marketing Manager. These positions require a combination of technical expertise, operational leadership, and often a second language — French is increasingly valued given regional tourism flows.',
        ],
        tips: [
          'Formal hospitality training from a recognised school significantly speeds up career progression',
          'Customer service and communication skills are evaluated as closely as technical skills at every level',
          'Experience with property management software (Opera, Amadeus) opens doors with international hotel groups',
        ],
      },
      {
        heading: 'Healthcare',
        paragraphs: [
          'Sierra Leone\'s healthcare sector, while still developing, is actively hiring qualified professionals across government facilities, NGO programmes, and a growing private clinic sector.',
          'Entry-level positions include Community Health Worker, Ward Assistant, Pharmacy Dispenser, and Laboratory Technician Assistant. These roles typically require secondary education and vocational or on-the-job training.',
          'Mid-level professionals work as Registered Nurses, Clinical Officers, Pharmacy Technicians, Radiographers, and Medical Laboratory Scientists. Registration with the relevant professional board — the Sierra Leone Nursing and Midwifery Board or Medical and Dental Council — is mandatory for clinical roles.',
          'Senior positions include Medical Officer, Specialist Physician, Hospital Administrator, and Health Programme Manager. International health organisations (WHO, MSF, IMC) frequently recruit locally and offer structured career development.',
        ],
        tips: [
          'Ensure your professional registration is current — it is a non-negotiable requirement for clinical roles',
          'Continuing professional development (CPD) is increasingly expected and tracked by professional boards',
          'Experience with digital health tools and electronic medical records is becoming a differentiator',
        ],
      },
      {
        heading: 'Skills that set you apart across all sectors',
        paragraphs: [
          'Regardless of which sector you work in, certain competencies consistently differentiate candidates who progress quickly from those who plateau.',
          'Professional certifications relevant to your sector — HSE, CIPS, CIPD, PMP, or hospitality diplomas — signal commitment and competence. Employers know certified professionals have been trained to a standard, not just experienced at one company.',
          'English communication skills — both written and spoken — are evaluated closely by most professional employers in Sierra Leone, particularly international organisations and larger local firms. Investing in your written communication pays dividends throughout your career.',
          'Building relationships with recruiters and sector specialists is equally important. Many roles are filled before they are ever advertised publicly. Being known to the right people in your industry means you hear about opportunities first.',
        ],
        tips: [
          'Consider working for an international organisation early in your career — the exposure and standards set you apart later',
          'Learn to use the technology in your field, from ERP systems to project management software',
          'Take on stretch assignments and cross-functional projects — breadth of experience accelerates progression',
          'Find a mentor in your sector who can provide guidance and open doors',
        ],
      },
    ],
  },
]

export function getGuideBySlug(slug: string): Guide | undefined {
  return GUIDES.find(g => g.slug === slug)
}
