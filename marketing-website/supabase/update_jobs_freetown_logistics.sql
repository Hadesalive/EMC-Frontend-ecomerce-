-- Update all current dry-port jobs:
--   location: TBA  →  Freetown
--   sector:  Mining →  Logistics
-- Run in the Supabase SQL editor.

UPDATE public.jobs
SET
  location = 'Freetown',
  sector   = 'Logistics',
  deadline = '2026-04-03'
WHERE title IN (
  'Main Driver (Container Truck)',
  'Relief Driver (Container Truck)',
  'Driver Welfare Officer',
  'Trip Planner / Controller',
  'Yard Supervisor',
  'Yard Assistant',
  'Gate Control Officer',
  'Security Guard',
  'Service Advisor',
  'Electrician',
  'Junior Mechanic',
  'Tyre Technician',
  'Spares Clerk',
  'Office Assistant'
);

-- Verify the update
SELECT id, title, sector, location
FROM public.jobs
ORDER BY created_at;
