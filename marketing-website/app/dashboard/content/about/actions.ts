'use server'

import { revalidatePath } from 'next/cache'
import { upsertContent } from '@/lib/cms'
import type { AboutIntroContent, AboutPurposeContent, AboutHeroContent, AboutValuesContent, AboutCSRContent } from '@/lib/cms-types'

export async function saveAboutIntro(content: AboutIntroContent) {
  await upsertContent('about', 'intro', content)
  revalidatePath('/about')
}

export async function saveAboutPurpose(content: AboutPurposeContent) {
  await upsertContent('about', 'purpose', content)
  revalidatePath('/about')
}

export async function saveAboutHero(content: AboutHeroContent) {
  await upsertContent('about', 'hero', content)
  revalidatePath('/about')
}

export async function saveAboutValues(content: AboutValuesContent) {
  await upsertContent('about', 'values', content)
  revalidatePath('/about')
}

export async function saveAboutCSR(content: AboutCSRContent) {
  await upsertContent('about', 'csr', content)
  revalidatePath('/about')
}
