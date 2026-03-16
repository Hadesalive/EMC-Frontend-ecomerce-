'use server'
import { sendContactEnquiry } from '@/lib/email'

export async function submitContactForm(data: {
  firstName: string
  lastName: string
  email: string
  company: string
  service: string
  message: string
}) {
  await sendContactEnquiry(data)
}
