'use server'

import { revalidatePath } from 'next/cache'
import { upsertContent } from '@/lib/cms'
import type { ServicesHeroContent, ServicesRecruitmentContent, ServicesHRContent, ServicesOutsourcingContent } from '@/lib/cms-types'

export async function saveServicesHero(content: ServicesHeroContent) {
  await upsertContent('services', 'hero', content)
  revalidatePath('/services')
}

export async function saveServicesRecruitment(content: ServicesRecruitmentContent) {
  await upsertContent('services', 'recruitment', content)
  revalidatePath('/services')
}

export async function saveServicesHR(content: ServicesHRContent) {
  await upsertContent('services', 'hr', content)
  revalidatePath('/services')
}

export async function saveServicesOutsourcing(content: ServicesOutsourcingContent) {
  await upsertContent('services', 'outsourcing', content)
  revalidatePath('/services')
}
