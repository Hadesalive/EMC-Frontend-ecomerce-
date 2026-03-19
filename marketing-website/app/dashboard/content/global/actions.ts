'use server'

import { revalidatePath } from 'next/cache'
import { upsertContent } from '@/lib/cms'
import type { GlobalContent } from '@/lib/cms-types'

export async function saveGlobal(content: GlobalContent) {
  await upsertContent('global', 'main', content)
  revalidatePath('/', 'layout')
}
