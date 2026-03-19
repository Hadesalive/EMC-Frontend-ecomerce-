'use server'

import { revalidatePath } from 'next/cache'
import { upsertContent } from '@/lib/cms'
import type { HeroContent, FeaturesContent, CTAContent, HomeServicesContent } from '@/lib/cms-types'

export async function saveHero(content: HeroContent) {
  await upsertContent('home', 'hero', content)
  revalidatePath('/')
}

export async function saveFeatures(content: FeaturesContent) {
  await upsertContent('home', 'features', content)
  revalidatePath('/')
}

export async function saveCTA(content: CTAContent) {
  await upsertContent('home', 'cta', content)
  revalidatePath('/')
}

export async function saveHomeServices(content: HomeServicesContent) {
  await upsertContent('home', 'services', content)
  revalidatePath('/')
}
