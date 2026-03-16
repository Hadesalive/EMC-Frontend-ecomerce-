'use server'
import { createAdminClient } from '@/lib/supabase/server'

export async function submitPlacementRequest(data: {
  company_name: string
  sector: string
  contact_name: string
  contact_title: string
  email: string
  phone: string
  role_title: string
  num_positions: number
  employment_type: string
  start_date: string
  location: string
  salary_range: string
  description: string
}) {
  const supabase = createAdminClient()
  const { error } = await supabase.from('placement_requests').insert({
    company_name:    data.company_name.trim(),
    sector:          data.sector,
    contact_name:    data.contact_name.trim(),
    contact_title:   data.contact_title.trim() || null,
    email:           data.email.toLowerCase().trim(),
    phone:           data.phone.trim(),
    role_title:      data.role_title.trim(),
    num_positions:   data.num_positions,
    employment_type: data.employment_type,
    start_date:      data.start_date || null,
    location:        data.location.trim() || null,
    salary_range:    data.salary_range.trim() || null,
    description:     data.description.trim(),
    status:          'new',
  })
  if (error) throw new Error(error.message)
}
