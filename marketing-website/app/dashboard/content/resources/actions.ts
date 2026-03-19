'use server'

import { revalidatePath } from 'next/cache'
import { upsertContent } from '@/lib/cms'
import type { ResourcesContent } from '@/lib/cms-types'

export async function saveResources(content: ResourcesContent) {
  await upsertContent('resources', 'main', content)
  revalidatePath('/resources')
}
