import { MetadataRoute } from 'next'

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = 'https://proia.netlify.app'
  const currentDate = new Date().toISOString()

  return [
    // Página Principal
    {
      url: baseUrl,
      lastModified: currentDate,
      changeFrequency: 'weekly',
      priority: 1.0,
    },
    
    // Portal Principal
    {
      url: `${baseUrl}/portal`,
      lastModified: currentDate,
      changeFrequency: 'weekly',
      priority: 0.9,
    },
    
    // Recursos
    {
      url: `${baseUrl}/resources`,
      lastModified: currentDate,
      changeFrequency: 'weekly',
      priority: 0.8,
    },
    
    // Missões
    {
      url: `${baseUrl}/missions`,
      lastModified: currentDate,
      changeFrequency: 'weekly',
      priority: 0.8,
    },
    
    // Página Protegida (Legacy)
    {
      url: `${baseUrl}/protected`,
      lastModified: currentDate,
      changeFrequency: 'monthly',
      priority: 0.5,
    },
    
    // Recursos PDFs
    {
      url: `${baseUrl}/docs/manual-proia-v1-2.pdf`,
      lastModified: currentDate,
      changeFrequency: 'monthly',
      priority: 0.7,
    },
    
    {
      url: `${baseUrl}/docs/templates-prompts-v2-1.pdf`,
      lastModified: currentDate,
      changeFrequency: 'monthly',
      priority: 0.6,
    },
    
    {
      url: `${baseUrl}/docs/checklist-automacao.pdf`,
      lastModified: currentDate,
      changeFrequency: 'monthly',
      priority: 0.6,
    },
  ]
}
