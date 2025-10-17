import { NextRequest, NextResponse } from 'next/server'
import { Resource, Event } from '../../../types'

// Mock data - em produção viria do banco
const resources: Resource[] = [
  {
    id: 'res_001',
    title: 'Manual PRO.IA v1.2',
    level: 'Basico',
    type: 'PDF',
    url: '/docs/manual-proia-v1-2.pdf',
    thumbnail: '/thumbs/manual.png',
    locked: false,
    updated_at: '2025-01-15T12:00:00Z',
    description: 'Manual completo para usar IA de forma prática',
    tags: ['manual', 'basico', 'pdf']
  },
  {
    id: 'res_002',
    title: 'GPT PRO.IA - Link Direto',
    level: 'Basico',
    type: 'Link',
    url: 'https://chat.openai.com/g/g-proia-custom',
    locked: false,
    updated_at: '2025-01-15T12:00:00Z',
    description: 'Acesse nosso GPT customizado para vendas',
    tags: ['gpt', 'chat', 'basico']
  },
  {
    id: 'res_003',
    title: 'Timeline 2024 - Revolução IA',
    level: 'Avancado',
    type: 'Video',
    url: 'https://www.youtube.com/watch?v=timeline2024',
    thumbnail: '/thumbs/timeline2024.png',
    locked: false,
    updated_at: '2025-01-15T12:00:00Z',
    description: 'Análise completa da evolução da IA em 2024',
    tags: ['video', 'timeline', 'avancado']
  },
  {
    id: 'res_004',
    title: 'Template de Prompts v2.1',
    level: 'Expert',
    type: 'Template',
    url: '/docs/templates-prompts-v2-1.pdf',
    thumbnail: '/thumbs/template-prompts.png',
    locked: true,
    updated_at: '2025-01-15T12:00:00Z',
    description: 'Coleção de 10 prompts testados para vendas, marketing e automação. Inclui templates para geração de leads, conversão, conteúdo e análise.',
    tags: ['template', 'prompts', 'expert']
  },
  {
    id: 'res_005',
    title: 'Checklist de Automação',
    level: 'Avancado',
    type: 'Checklist',
    url: '/docs/checklist-automacao.pdf',
    thumbnail: '/thumbs/checklist-automacao.png',
    locked: false,
    updated_at: '2025-01-15T12:00:00Z',
    description: 'Guia completo em 5 fases para automatizar processos de vendas. Inclui mapeamento, seleção de ferramentas, implementação e monitoramento.',
    tags: ['checklist', 'automacao', 'avancado']
  }
]

// Mock de eventos para tracking
const events: Event[] = []

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const level = searchParams.get('level')
    const type = searchParams.get('type')
    const search = searchParams.get('search')
    const user_id = searchParams.get('user_id')

    let filteredResources = resources

    // Filtros
    if (level) {
      filteredResources = filteredResources.filter(r => r.level === level)
    }
    if (type) {
      filteredResources = filteredResources.filter(r => r.type === type)
    }
    if (search) {
      filteredResources = filteredResources.filter(r => 
        r.title.toLowerCase().includes(search.toLowerCase()) ||
        r.description?.toLowerCase().includes(search.toLowerCase()) ||
        r.tags?.some(tag => tag.toLowerCase().includes(search.toLowerCase()))
      )
    }

    // Tracking de visualização da página
    if (user_id) {
      events.push({
        event: 'resource_view',
        user_id,
        ts: new Date().toISOString(),
        metadata: { page: 'resources_list' }
      })
    }

    return NextResponse.json({
      resources: filteredResources,
      total: filteredResources.length,
      filters: { level, type, search }
    })

  } catch (error) {
    console.error('Resources API error:', error)
    return NextResponse.json(
      { error: 'Erro interno do servidor' },
      { status: 500 }
    )
  }
}

export async function POST(request: NextRequest) {
  try {
    const { action, resource_id, user_id } = await request.json()

    if (action === 'track_download') {
      events.push({
        event: 'download_click',
        user_id,
        resource_id,
        ts: new Date().toISOString()
      })

      return NextResponse.json({
        success: true,
        message: 'Download tracked'
      })
    }

    if (action === 'track_video_play') {
      events.push({
        event: 'video_play',
        user_id,
        resource_id,
        ts: new Date().toISOString()
      })

      return NextResponse.json({
        success: true,
        message: 'Video play tracked'
      })
    }

    return NextResponse.json(
      { error: 'Ação inválida' },
      { status: 400 }
    )

  } catch (error) {
    console.error('Resources tracking error:', error)
    return NextResponse.json(
      { error: 'Erro interno do servidor' },
      { status: 500 }
    )
  }
}
