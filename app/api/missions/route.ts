import { NextRequest, NextResponse } from 'next/server'
import { Mission, Event } from '../../../types'

// Mock data - em produção viria do banco
const missions: Mission[] = [
  {
    id: 'm1_pdf_001',
    title: 'Primeiro PDF - Manual PRO.IA',
    type: 'M1_PDF',
    level: 'Basico',
    xp: 50,
    status: 'Disponivel',
    requirements: [
      'Baixar o PDF do Manual PRO.IA',
      'Ler o conteúdo completo',
      'Responder o quiz de validação'
    ],
    validation: {
      evidence: ['download_confirmed'],
      rubric: 'Usuário deve confirmar download e responder quiz',
      quiz: {
        questions: [
          {
            question: 'Qual é o principal objetivo do PRO.IA?',
            options: ['Vender cursos', 'Ensinar IA teórica', 'Transformar IA em faturamento', 'Criar chatbots'],
            correct: 2
          },
          {
            question: 'Quantos níveis de acesso existem no sistema?',
            options: ['2', '3', '4', '5'],
            correct: 1
          },
          {
            question: 'O que é necessário para liberação completa?',
            options: ['100 XP', '150 XP', '200 XP', '250 XP'],
            correct: 2
          }
        ],
        min_score: 70
      }
    },
    unlocked_resources: ['res_004'],
    created_at: '2025-01-15T12:00:00Z'
  },
  {
    id: 'm2_chat_001',
    title: 'Primeiro Prompt Executável',
    type: 'M2_CHAT',
    level: 'Basico',
    xp: 30,
    status: 'Disponivel',
    requirements: [
      'Acessar GPT PRO.IA com link indicado',
      'Executar um prompt de vendas',
      'Enviar screenshot do resultado'
    ],
    validation: {
      evidence: ['screenshot_url'],
      rubric: 'Screenshot deve mostrar prompt e resposta do GPT'
    },
    created_at: '2025-01-15T12:00:00Z'
  },
  {
    id: 'm3_post_001',
    title: 'Compartilhar Resultado',
    type: 'M3_POST',
    level: 'Basico',
    xp: 20,
    status: 'Disponivel',
    requirements: [
      'Postar resultado nas redes sociais',
      'Incluir hashtag #PROIA',
      'Enviar link do post'
    ],
    validation: {
      evidence: ['post_url'],
      rubric: 'Post deve ser público e conter hashtag #PROIA'
    },
    created_at: '2025-01-15T12:00:00Z'
  },
  {
    id: 'm4_video_001',
    title: 'Timeline 2024 Completa',
    type: 'M4_VIDEO',
    level: 'Avancado',
    xp: 40,
    status: 'Bloqueada',
    requirements: [
      'Assistir vídeo completo (≥90%)',
      'Responder pergunta de validação'
    ],
    validation: {
      evidence: ['video_watched'],
      rubric: 'Vídeo deve ser assistido por pelo menos 90% do tempo',
      quiz: {
        questions: [
          {
            question: 'Qual foi o marco mais importante da IA em 2024?',
            options: ['GPT-4', 'Claude 3', 'Gemini Ultra', 'ChatGPT-5'],
            correct: 2
          }
        ],
        min_score: 70
      }
    },
    created_at: '2025-01-15T12:00:00Z'
  },
  {
    id: 'm5_quiz_001',
    title: 'Quiz de Conhecimento',
    type: 'M5_QUIZ',
    level: 'Avancado',
    xp: 35,
    status: 'Disponivel',
    requirements: [
      'Responder quiz de 10 perguntas',
      'Atingir nota mínima de 70%'
    ],
    validation: {
      quiz: {
        questions: [
          {
            question: 'Qual é a melhor estratégia para prompts de vendas?',
            options: ['Ser genérico', 'Ser específico', 'Usar jargões', 'Copiar outros'],
            correct: 1
          },
          {
            question: 'O que é mais importante em automação?',
            options: ['Velocidade', 'Precisão', 'Custo', 'Simplicidade'],
            correct: 1
          }
        ],
        min_score: 70
      }
    },
    created_at: '2025-01-15T12:00:00Z'
  },
  {
    id: 'm6_task_001',
    title: 'Primeira Automação',
    type: 'M6_TASK',
    level: 'Expert',
    xp: 100,
    status: 'Bloqueada',
    requirements: [
      'Criar uma automação de vendas',
      'Documentar o processo',
      'Enviar arquivo de evidência'
    ],
    validation: {
      evidence: ['task_file'],
      rubric: 'Arquivo deve conter documentação completa da automação'
    },
    created_at: '2025-01-15T12:00:00Z'
  }
]

// Mock de eventos para tracking
const events: Event[] = []

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const level = searchParams.get('level')
    const status = searchParams.get('status')
    const user_id = searchParams.get('user_id')

    let filteredMissions = missions

    // Filtros
    if (level) {
      filteredMissions = filteredMissions.filter(m => m.level === level)
    }
    if (status) {
      filteredMissions = filteredMissions.filter(m => m.status === status)
    }

    // Tracking de visualização da página
    if (user_id) {
      events.push({
        event: 'mission_start',
        user_id,
        ts: new Date().toISOString(),
        metadata: { page: 'missions_list' }
      })
    }

    return NextResponse.json({
      missions: filteredMissions,
      total: filteredMissions.length,
      filters: { level, status }
    })

  } catch (error) {
    console.error('Missions API error:', error)
    return NextResponse.json(
      { error: 'Erro interno do servidor' },
      { status: 500 }
    )
  }
}

export async function POST(request: NextRequest) {
  try {
    const { action, mission_id, user_id, data } = await request.json()

    if (action === 'start') {
      events.push({
        event: 'mission_start',
        user_id,
        mission_id,
        ts: new Date().toISOString()
      })

      return NextResponse.json({
        success: true,
        message: 'Missão iniciada',
        mission_id
      })
    }

    if (action === 'complete') {
      events.push({
        event: 'mission_complete',
        user_id,
        mission_id,
        ts: new Date().toISOString(),
        metadata: data
      })

      return NextResponse.json({
        success: true,
        message: 'Missão concluída',
        mission_id,
        xp_earned: missions.find(m => m.id === mission_id)?.xp || 0
      })
    }

    return NextResponse.json(
      { error: 'Ação inválida' },
      { status: 400 }
    )

  } catch (error) {
    console.error('Missions API error:', error)
    return NextResponse.json(
      { error: 'Erro interno do servidor' },
      { status: 500 }
    )
  }
}