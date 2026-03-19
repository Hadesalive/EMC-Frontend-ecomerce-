'use server'

import { revalidatePath } from 'next/cache'
import { upsertContent } from '@/lib/cms'
import type { SolutionsHeroContent, SolutionsListContent } from '@/lib/cms-types'

export async function saveSolutionsHero(content: SolutionsHeroContent) {
  await upsertContent('solutions', 'hero', content)
  revalidatePath('/solutions')
}

export async function saveSolutionsList(content: SolutionsListContent) {
  await upsertContent('solutions', 'list', content)
  revalidatePath('/solutions')
}
