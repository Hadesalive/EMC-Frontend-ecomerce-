'use server'

import { revalidatePath } from 'next/cache'
import { upsertContent } from '@/lib/cms'
import type { ContactContent } from '@/lib/cms-types'

export async function saveContactInfo(content: ContactContent) {
  await upsertContent('contact', 'info', content)
  revalidatePath('/contact')
}
