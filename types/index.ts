// Tipos para Resources
export interface Resource {
  id: string
  title: string
  level: 'Basico' | 'Avancado' | 'Expert'
  type: 'PDF' | 'Video' | 'Link' | 'Template' | 'Prompt' | 'Checklist'
  url: string
  thumbnail?: string
  locked: boolean
  updated_at: string
  description?: string
  tags?: string[]
}

// Tipos para Missions
export interface Mission {
  id: string
  title: string
  type: 'M1_PDF' | 'M2_CHAT' | 'M3_POST' | 'M4_VIDEO' | 'M5_QUIZ' | 'M6_TASK'
  level: 'Basico' | 'Avancado' | 'Expert'
  xp: number
  status: 'Disponivel' | 'Em progresso' | 'Concluida' | 'Bloqueada'
  requirements: string[]
  validation: {
    evidence?: string[]
    rubric?: string
    quiz?: {
      questions: Array<{
        question: string
        options: string[]
        correct: number
      }>
      min_score: number
    }
  }
  unlocked_resources?: string[]
  created_at: string
}

// Tipos para Events/Tracking
export interface Event {
  event: 'resource_view' | 'download_click' | 'video_play' | 'mission_start' | 'mission_complete'
  user_id: string
  resource_id?: string
  mission_id?: string
  type?: string
  level?: string
  ts: string
  metadata?: Record<string, any>
}

// Tipos para User Progress
export interface UserProgress {
  user_id: string
  completed_missions: string[]
  favorite_resources: string[]
  current_streak: number
  total_xp: number
  achievements: string[]
  last_activity: string
}

// Tipos para Achievements
export interface Achievement {
  id: string
  title: string
  description: string
  icon: string
  requirement: {
    type: 'missions_completed' | 'streak_days' | 'xp_threshold' | 'resource_views'
    value: number
  }
  reward_xp: number
  unlocked_at?: string
}
