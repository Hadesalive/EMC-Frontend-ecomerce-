'use server'

import { revalidatePath } from 'next/cache'
import { upsertContent } from '@/lib/cms'
import type { AboutIntroContent, AboutPurposeContent } from '@/lib/cms-types'

export async function saveAboutIntro(content: AboutIntroContent) {
  await upsertContent('about', 'intro', content)
  revalidatePath('/about')
}

export async function saveAboutPurpose(content: AboutPurposeContent) {
  await upsertContent('about', 'purpose', content)
  revalidatePath('/about')
}
