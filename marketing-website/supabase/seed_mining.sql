-- EMC Mining (Dry Port Operations) Job Seeds
-- Client Industry: Mining | Job Type: Contract | Location: TBA
-- Run this in the Supabase SQL editor after schema.sql has been applied

INSERT INTO jobs (title, sector, type, location, description, responsibilities, requirements, nice_to_have, salary_range, urgent, is_active)
VALUES

-- 1. Main Driver (Container Truck)
(
  'Main Driver (Container Truck)',
  'Mining',
  'Contract',
  'TBA',
  'Operate heavy-duty trucks to transport shipping containers between the seaport, dry port, warehouses, and customer delivery points in support of dry port operations.',
  ARRAY[
    'Safely transport containers between seaport terminal, dry port, and delivery locations',
    'Follow dispatch instructions and transport schedules',
    'Operate trucks in accordance with road safety regulations and company policies',
    'Conduct pre-trip and post-trip vehicle inspections (tyres, brakes, lights, fuel, trailer locks, container securing systems)',
    'Ensure containers are properly secured and seals are intact',
    'Maintain communication with dispatchers on trip progress',
    'Report accidents, breakdowns, or incidents immediately',
    'Maintain trip records and transport documentation'
  ],
  ARRAY[
    'Secondary School Certificate',
    'Valid Heavy-Duty Commercial Driving License',
    'Certification for operating heavy trucks or container trailers',
    '3–5 years driving heavy-duty trucks',
    'Container or freight transport experience required'
  ],
  ARRAY[
    'Port or logistics environment experience preferred',
    'Technical knowledge in heavy truck operation and road transport regulations'
  ],
  NULL,
  false,
  true
),

-- 2. Relief Driver (Container Truck)
(
  'Relief Driver (Container Truck)',
  'Mining',
  'Contract',
  'TBA',
  'Operate trucks to transport containers when assigned, replacing Main Drivers during leave, rest periods, illness, or peak demand periods across dry port operations.',
  ARRAY[
    'Transport containers between seaport, dry port, and delivery locations as assigned',
    'Replace Main Drivers when unavailable',
    'Conduct pre-trip and post-trip inspections (brakes, tires, lights, fuel, trailer connections, container locking)',
    'Ensure containers are properly secured and verify container numbers and seals',
    'Carry required documentation (license, registration, delivery docs, port and customs docs)',
    'Maintain communication with dispatchers',
    'Operate different trucks within the fleet as assigned',
    'Adapt to changing schedules and operational requirements'
  ],
  ARRAY[
    'Secondary School Certificate',
    'Valid Heavy-Duty Commercial Driving License',
    'Certification for operating heavy trucks or container trailers',
    '2–4 years operating heavy-duty trucks'
  ],
  ARRAY[
    'Container transport experience preferred',
    'Flexibility to work varying shifts and schedules'
  ],
  NULL,
  false,
  true
),

-- 3. Driver Welfare Officer
(
  'Driver Welfare Officer',
  'Mining',
  'Contract',
  'TBA',
  'Manage driver welfare, compliance, and support programs to ensure drivers operate safely, efficiently, and in line with company standards across fleet operations.',
  ARRAY[
    'Monitor and support overall welfare of drivers in fleet operations',
    'Address driver concerns related to working conditions, schedules, and operational challenges',
    'Ensure adequate rest periods and appropriate working conditions for all drivers',
    'Act as primary contact between drivers and management on welfare issues',
    'Ensure driver compliance with company procedures and transport regulations',
    'Monitor driver licenses, certifications, and documentation currency',
    'Track driver performance and identify training needs',
    'Coordinate driver training programs (safety, defensive driving, operational procedures)',
    'Support investigations related to incidents, accidents, or safety violations',
    'Monitor driver attendance and coordinate coverage with dispatchers',
    'Mediate driver grievances and escalate serious issues to HR',
    'Coordinate driver welfare initiatives including health checks and support programs'
  ],
  ARRAY[
    'Diploma or Bachelor''s Degree in HR Management, Transport Management, Logistics, or Social Sciences',
    '3–5 years in driver management, transport operations, or workforce supervision',
    'Knowledge of transport regulations and occupational health and safety practices'
  ],
  ARRAY[
    'Experience with truck fleets or logistics companies preferred',
    'Strong interpersonal and conflict resolution skills'
  ],
  NULL,
  false,
  true
),

-- 4. Trip Planner / Controller
(
  'Trip Planner / Controller',
  'Mining',
  'Contract',
  'TBA',
  'Plan, coordinate, and control truck trips for container transportation between the seaport, dry port, and customer locations, optimising routes and ensuring on-time delivery.',
  ARRAY[
    'Plan daily transport schedules for container pickup and delivery',
    'Allocate trucks to routes based on priorities and container movement needs',
    'Analyse and select the most efficient routes considering traffic, road conditions, distance, and timelines',
    'Monitor ongoing trips for schedule adherence',
    'Coordinate with Dispatchers and Fleet Supervisors for trip planning',
    'Plan container movements between seaport and dry port yard',
    'Maintain detailed trip records (container numbers, truck numbers, driver assignments, timelines)',
    'Monitor transport performance indicators such as delivery times and trip completion rates',
    'Respond to breakdowns, traffic congestion, or road closures in real time',
    'Ensure compliance with transport regulations and weight limits',
    'Prepare daily transport planning reports and trip summaries'
  ],
  ARRAY[
    'Diploma or Bachelor''s Degree in Logistics, Transport Management, Supply Chain, or Operations Management',
    'Technical knowledge in route planning and fleet management',
    'Strong organisational and analytical skills'
  ],
  ARRAY[
    'Experience with GPS tracking and fleet management systems',
    'Certifications in Transport Planning or Logistics/Supply Chain Management'
  ],
  NULL,
  false,
  true
),

-- 5. Yard Supervisor
(
  'Yard Supervisor',
  'Mining',
  'Contract',
  'TBA',
  'Oversee daily container yard operations, ensuring the safe, efficient handling, stacking, and movement of containers within the dry port facility.',
  ARRAY[
    'Supervise daily container stacking, storage, and movement operations',
    'Ensure smooth flow of trucks entering and exiting the yard',
    'Coordinate yard operations to prevent congestion and delays',
    'Supervise loading and unloading of containers',
    'Verify container numbers and confirm storage locations',
    'Coordinate with reach stacker, forklift, and yard tractor operators',
    'Direct truck drivers to correct loading and unloading zones',
    'Enforce safety regulations and PPE requirements across the yard',
    'Organise container stacking areas by type, destination, or special requirements',
    'Maintain accurate container position records',
    'Supervise yard assistants and equipment operators',
    'Assign daily tasks to yard personnel'
  ],
  ARRAY[
    'Diploma or Bachelor''s Degree in Logistics, Port Management, Supply Chain, or Operations Management',
    '4–6 years in logistics, container yard, or port operations',
    'Experience supervising container handling and heavy equipment'
  ],
  ARRAY[
    'Port Operations Training or Container Terminal Operations certification',
    'Occupational Health and Safety (OHS) Training'
  ],
  NULL,
  false,
  true
),

-- 6. Yard Assistant
(
  'Yard Assistant',
  'Mining',
  'Contract',
  'TBA',
  'Support daily container yard operations including organising storage areas, guiding trucks, and assisting with loading and unloading activities.',
  ARRAY[
    'Assist in container movement, stacking, and positioning',
    'Support Yard Supervisor in organising containers within the yard',
    'Guide trucks entering and exiting the yard safely',
    'Assist drivers in positioning trucks correctly for container handling',
    'Assist equipment operators during loading and unloading',
    'Verify container numbers and report any discrepancies',
    'Maintain cleanliness and order throughout the yard',
    'Follow all safety procedures and wear required PPE at all times',
    'Report accidents, near misses, or safety hazards to the Yard Supervisor'
  ],
  ARRAY[
    'Secondary School Certificate',
    'Basic understanding of container yard operations and industrial safety'
  ],
  ARRAY[
    '1–2 years in logistics, warehouse, or yard operations preferred',
    'Basic Safety Training or Equipment Spotter Training'
  ],
  NULL,
  false,
  true
),

-- 7. Gate Control Officer
(
  'Gate Control Officer',
  'Mining',
  'Contract',
  'TBA',
  'Control and monitor all entry and exit activities at the dry port gate, ensuring proper authorisation, documentation verification, and access security at all times.',
  ARRAY[
    'Manage trucks entering and exiting the facility',
    'Verify truck authorisation and documentation before granting access',
    'Verify container numbers against transport documentation',
    'Maintain accurate records of all trucks, containers, drivers, and visitors',
    'Manage gate logbooks or digital gate management systems',
    'Manage truck queues to avoid congestion at the gate',
    'Verify identification of drivers and visitors',
    'Prevent unauthorised access to restricted areas',
    'Coordinate with Security Guards and Yard Supervisors',
    'Report irregularities such as missing documents or incorrect container numbers',
    'Report security incidents or suspicious activities immediately'
  ],
  ARRAY[
    'Diploma or Certificate in Logistics, Transport Management, Business Administration, or Security Management',
    '2–4 years in logistics operations, gate control, or transport administration',
    'Good attention to detail and record-keeping skills'
  ],
  ARRAY[
    'Port Operations or Logistics Training',
    'Security or Access Control Training'
  ],
  NULL,
  false,
  true
),

-- 8. Security Guard
(
  'Security Guard',
  'Mining',
  'Contract',
  'TBA',
  'Maintain the safety and security of the dry port facility, protecting containers, vehicles, equipment, infrastructure, and all personnel on site.',
  ARRAY[
    'Ensure security equipment (cameras, alarms) remains functional and report faults',
    'Identify and respond to security incidents including theft, unauthorised entry, and disturbances',
    'Report all incidents to the Compliance and Safety Officer',
    'Prepare accurate incident reports for all security events',
    'Respond to emergencies including fires, accidents, and security threats',
    'Assist in evacuation procedures when required',
    'Monitor parking areas and operational zones',
    'Coordinate with Gate Control Officers and Yard Supervisors',
    'Communicate security updates to management as required'
  ],
  ARRAY[
    'Secondary School Certificate',
    '1–3 years in security services',
    'Knowledge of security and surveillance procedures and access control'
  ],
  ARRAY[
    'Basic Security Guard Training Certification preferred',
    'Industrial, logistics, or port security experience preferred',
    'Knowledge of emergency response procedures'
  ],
  NULL,
  false,
  true
),

-- 9. Service Advisor
(
  'Service Advisor',
  'Mining',
  'Contract',
  'TBA',
  'Coordinate maintenance and repair activities between drivers, fleet operations, and the workshop team, ensuring vehicles are serviced efficiently and returned to operation safely.',
  ARRAY[
    'Receive vehicle maintenance and repair requests from drivers, dispatchers, and fleet supervisors',
    'Inspect reported issues and record service requirements accurately',
    'Coordinate with Workshop Manager and mechanics for scheduling',
    'Plan and schedule preventive maintenance for trucks, trailers, and equipment',
    'Serve as primary contact between drivers and workshop team',
    'Prepare and issue maintenance work orders',
    'Maintain complete vehicle maintenance history records',
    'Work with Spares Clerk on parts availability before scheduling maintenance',
    'Conduct basic inspections before and after maintenance',
    'Track vehicle service intervals and identify recurring problems',
    'Prepare maintenance reports covering repair activities, downtime, and costs',
    'Ensure vehicles meet safety standards before returning to service'
  ],
  ARRAY[
    'Diploma or Bachelor''s Degree in Automotive Engineering, Mechanical Engineering, Transport, or Logistics',
    '3–5 years in vehicle maintenance coordination or workshop operations',
    'Knowledge of vehicle maintenance processes and spare parts management'
  ],
  ARRAY[
    'Automotive Service Advisor Certification',
    'Fleet Maintenance Management Training'
  ],
  NULL,
  false,
  true
),

-- 10. Electrician
(
  'Electrician',
  'Mining',
  'Contract',
  'TBA',
  'Install, maintain, troubleshoot, and repair electrical systems across heavy trucks, yard equipment, generators, lighting, and facility infrastructure at the dry port.',
  ARRAY[
    'Inspect, diagnose, and repair electrical faults in heavy-duty trucks',
    'Maintain vehicle electrical systems including battery, alternators, starters, wiring, lighting, and dashboard electronics',
    'Maintain electrical systems for reach stackers, forklifts, yard tractors, and generators',
    'Maintain facility electrical systems including offices, workshops, yard lighting, and security lighting',
    'Repair faulty wiring, switches, outlets, and electrical panels',
    'Install new electrical equipment and wiring as required',
    'Conduct routine inspections and preventive maintenance on all electrical systems',
    'Maintain and inspect backup generators to ensure operational readiness',
    'Ensure compliance with safety standards and electrical regulations',
    'Identify electrical faults using testing equipment and diagnostic tools',
    'Coordinate with Spares Clerk and Workshop Manager for electrical components',
    'Maintain records of all electrical maintenance and repairs'
  ],
  ARRAY[
    'Technical Diploma or Certificate in Electrical Engineering, Industrial Electrical Systems, or Automotive Electrical Systems',
    '3–5 years in electrical maintenance',
    'Proficiency in automotive and industrial electrical diagnostics'
  ],
  ARRAY[
    'Electrical Technician Certification',
    'Industrial Electrical Safety Training',
    'Heavy trucks or industrial equipment experience preferred'
  ],
  NULL,
  false,
  true
),

-- 11. Junior Mechanic
(
  'Junior Mechanic',
  'Mining',
  'Contract',
  'TBA',
  'Assist in the maintenance, repair, and servicing of heavy-duty trucks, trailers, and mechanical equipment under the guidance of Senior Mechanics in the workshop.',
  ARRAY[
    'Assist Senior Mechanics in diagnosing mechanical faults',
    'Support repair activities on engines, braking, suspension, and steering systems',
    'Assist in scheduled preventive maintenance including oil and filter changes, lubrication, and component replacement',
    'Conduct inspections of trucks and trailers before and after maintenance',
    'Assist in maintenance of reach stackers, forklifts, yard tractors, and generators',
    'Maintain workshop tools and equipment in good working order',
    'Assist Spares Clerk in identifying required parts for jobs',
    'Assist in responding to vehicle breakdowns in a timely manner',
    'Follow workshop safety procedures and use protective equipment at all times',
    'Assist in recording maintenance work and completing documentation',
    'Learn from Senior Mechanics and participate in training programs'
  ],
  ARRAY[
    'Technical Certificate or Diploma in Automotive Mechanics, Diesel Mechanics, or Vehicle Maintenance',
    '1–3 years in mechanical workshop operations',
    'Basic knowledge of vehicle mechanical systems and diesel engine maintenance'
  ],
  ARRAY[
    'Heavy trucks, construction equipment, or logistics fleet experience preferred',
    'Willingness to learn and develop technical skills'
  ],
  NULL,
  false,
  true
),

-- 12. Tyre Technician
(
  'Tyre Technician',
  'Mining',
  'Contract',
  'TBA',
  'Inspect, install, repair, and maintain tyres for heavy-duty trucks, trailers, and yard equipment to ensure the fleet is safe and operational at all times.',
  ARRAY[
    'Conduct regular tyre inspections including pressure, tread depth, and overall condition',
    'Identify wear, damage, punctures, or alignment issues across the fleet',
    'Remove damaged tyres and install replacements per manufacturer specifications',
    'Repair punctured tyres using approved methods and materials',
    'Maintain correct tyre pressure for all fleet vehicles',
    'Perform preventive maintenance including tyre rotation and alignment checks',
    'Respond to tyre failures and provide roadside assistance as required',
    'Maintain accurate records of tyre usage, replacements, and repairs',
    'Track tyre inventory and coordinate replenishment with Spares Clerk',
    'Support workshop operations and assist mechanics with wheel repairs'
  ],
  ARRAY[
    'Technical Certificate in Automotive Maintenance, Tyre Servicing, or Mechanical Maintenance',
    '2–4 years in tyre servicing or automotive maintenance',
    'Technical knowledge in heavy truck tyre installation, repair, and pressure management'
  ],
  ARRAY[
    'Tyre Service Technician Certification',
    'Heavy trucks or trailers experience preferred'
  ],
  NULL,
  false,
  true
),

-- 13. Spares Clerk
(
  'Spares Clerk',
  'Mining',
  'Contract',
  'TBA',
  'Manage the inventory, storage, and issuance of spare parts required for truck, trailer, and equipment maintenance across the dry port workshop.',
  ARRAY[
    'Maintain accurate inventory records of all spare parts in the stores',
    'Monitor stock levels for essential parts and initiate replenishment requests',
    'Conduct regular stock checks and inventory counts',
    'Issue parts to mechanics based on authorised maintenance requests and work orders',
    'Verify repair or work orders before releasing any parts',
    'Prepare purchase requisitions for procurement of required items',
    'Ensure proper storage, labelling, and categorisation of all parts',
    'Monitor usage patterns to prevent misuse or loss of inventory',
    'Investigate discrepancies between recorded and physical stock',
    'Support workshop documentation with accurate parts information',
    'Prepare regular inventory reports covering stock levels and usage patterns',
    'Receive and inspect parts from suppliers against purchase orders'
  ],
  ARRAY[
    'Diploma or Certificate in Supply Chain Management, Logistics, Inventory Management, or Business Administration',
    'Technical knowledge of spare parts inventory management and stock control procedures',
    'Good numeracy and record-keeping skills'
  ],
  ARRAY[
    'Inventory Management Certification',
    'Supply Chain or Storekeeping Training',
    'Experience in an automotive or logistics spare parts environment'
  ],
  NULL,
  false,
  true
),

-- 14. Office Assistant
(
  'Office Assistant',
  'Mining',
  'Contract',
  'TBA',
  'Provide administrative and clerical support to ensure efficient daily office operations at the dry port facility.',
  ARRAY[
    'Provide general administrative support to management and departmental staff',
    'Prepare, format, and distribute documents, reports, and correspondence',
    'Maintain organised filing systems both physical and electronic',
    'Maintain records of delivery notes, purchase orders, invoices, and internal memos',
    'Support daily office operations including scheduling and meeting coordination',
    'Manage incoming and outgoing correspondence (emails, letters, courier packages)',
    'Perform data entry and keep databases up to date',
    'Answer phone calls and direct inquiries to the appropriate persons',
    'Monitor office supplies and coordinate procurement as needed',
    'Assist HR with employee documentation and personnel record keeping',
    'Support the finance department with filing and basic accounting documentation',
    'Welcome visitors and maintain accurate visitor logs',
    'Report maintenance issues for office equipment and facilities'
  ],
  ARRAY[
    'Diploma or Certificate in Business Administration, Office Management, Secretarial Studies, or Administrative Management',
    '1–3 years in office administration or clerical support',
    'Proficiency in Microsoft Office (Word, Excel, Outlook)'
  ],
  ARRAY[
    'Experience in a logistics, transport, or business environment preferred',
    'Good communication and interpersonal skills'
  ],
  NULL,
  false,
  true
);
