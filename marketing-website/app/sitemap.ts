import { MetadataRoute } from 'next'
import { createAdminClient } from '@/lib/supabase/server'
import type { JobRow } from '@/lib/supabase/types'

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const base = process.env.NEXT_PUBLIC_SITE_URL || 'https://expresssl.com'

  const supabase = createAdminClient()
  const { data: raw } = await supabase
    .from('jobs')
    .select('id, updated_at')
    .eq('is_active', true)

  const jobs = (raw ?? []) as unknown as Pick<JobRow, 'id' | 'updated_at'>[]

  const staticPages: MetadataRoute.Sitemap = [
    { url: base,                       lastModified: new Date(), changeFrequency: 'weekly',  priority: 1.0 },
    { url: `${base}/about`,            lastModified: new Date(), changeFrequency: 'monthly', priority: 0.8 },
    { url: `${base}/services`,         lastModified: new Date(), changeFrequency: 'monthly', priority: 0.8 },
    { url: `${base}/solutions`,        lastModified: new Date(), changeFrequency: 'monthly', priority: 0.8 },
    { url: `${base}/jobs`,             lastModified: new Date(), changeFrequency: 'daily',   priority: 0.9 },
    { url: `${base}/resources`,        lastModified: new Date(), changeFrequency: 'weekly',  priority: 0.6 },
    { url: `${base}/contact`,          lastModified: new Date(), changeFrequency: 'yearly',  priority: 0.7 },
    { url: `${base}/apply`,            lastModified: new Date(), changeFrequency: 'monthly', priority: 0.7 },
    { url: `${base}/request-placement`,lastModified: new Date(), changeFrequency: 'monthly', priority: 0.6 },
  ]

  const jobPages: MetadataRoute.Sitemap = jobs.map(job => ({
    url: `${base}/jobs/${job.id}`,
    lastModified: new Date(job.updated_at),
    changeFrequency: 'weekly' as const,
    priority: 0.7,
  }))

  return [...staticPages, ...jobPages]
}
