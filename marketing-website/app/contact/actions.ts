'use server'
import { sendContactEnquiry, sendContactConfirmation } from '@/lib/email'

export async function submitContactForm(data: {
  firstName: string
  lastName: string
  email: string
  company: string
  service: string
  message: string
}) {
  await Promise.all([
    sendContactEnquiry(data),
    sendContactConfirmation({ firstName: data.firstName, lastName: data.lastName, email: data.email, service: data.service }),
  ])
}
