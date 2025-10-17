'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link'
import { useRequireAuth } from '../../hooks/useAuth'
import { Mission } from '../../types'

export default function MissionsPage() {
  const { user, loading } = useRequireAuth('/')
  const [missions, setMissions] = useState<Mission[]>([])
  const [filteredMissions, setFilteredMissions] = useState<Mission[]>([])
  const [filters, setFilters] = useState({
    level: '',
    status: ''
  })
  const [selectedMission, setSelectedMission] = useState<Mission | null>(null)
  const [showModal, setShowModal] = useState(false)

  useEffect(() => {
    if (user) {
      loadMissions()
    }
  }, [user])

  const loadMissions = async () => {
    try {
      const response = await fetch(`/api/missions?user_id=${user?.email}`)
      const data = await response.json()
      setMissions(data.missions)
      setFilteredMissions(data.missions)
    } catch (error) {
      console.error('Erro ao carregar missões:', error)
    }
  }

  const handleFilter = () => {
    let filtered = missions

    if (filters.level) {
      filtered = filtered.filter(m => m.level === filters.level)
    }
    if (filters.status) {
      filtered = filtered.filter(m => m.status === filters.status)
    }

    setFilteredMissions(filtered)
  }

  useEffect(() => {
    handleFilter()
  }, [filters, missions])

  const startMission = async (missionId: string) => {
    try {
      await fetch('/api/missions', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          action: 'start',
          mission_id: missionId,
          user_id: user?.email
        })
      })
      
      // Atualizar status local
      setMissions(prev => prev.map(m => 
        m.id === missionId ? { ...m, status: 'Em progresso' } : m
      ))
    } catch (error) {
      console.error('Erro ao iniciar missão:', error)
    }
  }

  const completeMission = async (missionId: string, data: any) => {
    try {
      const response = await fetch('/api/missions', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          action: 'complete',
          mission_id: missionId,
          user_id: user?.email,
          data
        })
      })
      
      const result = await response.json()
      
      if (result.success) {
        // Atualizar status local
        setMissions(prev => prev.map(m => 
          m.id === missionId ? { ...m, status: 'Concluida' } : m
        ))
        setShowModal(false)
        alert(`Missão concluída! +${result.xp_earned} XP`)
      }
    } catch (error) {
      console.error('Erro ao completar missão:', error)
    }
  }

  const getMissionIcon = (type: string) => {
    switch (type) {
      case 'M1_PDF': return '📄'
      case 'M2_CHAT': return '🤖'
      case 'M3_POST': return '📱'
      case 'M4_VIDEO': return '🎥'
      case 'M5_QUIZ': return '🧠'
      case 'M6_TASK': return '⚡'
      default: return '🎯'
    }
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Disponivel': return 'text-green-400'
      case 'Em progresso': return 'text-yellow-400'
      case 'Concluida': return 'text-blue-400'
      case 'Bloqueada': return 'text-gray-400'
      default: return 'text-white'
    }
  }

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'Disponivel': return '🟢 Disponível'
      case 'Em progresso': return '🟡 Em progresso'
      case 'Concluida': return '🔵 Concluída'
      case 'Bloqueada': return '⚫ Bloqueada'
      default: return status
    }
  }

  const getLevelColor = (level: string) => {
    switch (level) {
      case 'Basico': return 'text-green-400'
      case 'Avancado': return 'text-yellow-400'
      case 'Expert': return 'text-red-400'
      default: return 'text-white'
    }
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-black text-green-400 font-mono flex items-center justify-center">
        <div className="text-center">
          <div className="animate-pulse text-xl mb-4">Carregando Missões...</div>
          <div className="animate-pulse">Verificando autenticação...</div>
        </div>
      </div>
    )
  }

  if (!user) {
    return null
  }

  return (
    <div className="min-h-screen bg-black text-green-400 font-mono">
      {/* Header */}
      <div className="bg-black border-b border-green-400 p-4">
        <div className="max-w-6xl mx-auto flex justify-between items-center">
          <div className="flex items-center space-x-4">
            <Link href="/portal" className="text-green-400 hover:text-green-300">
              ← Voltar ao Portal
            </Link>
            <div>
              <h1 className="text-xl font-bold">🎮 MISSÕES PRO.IA</h1>
              <p className="text-sm text-white/80">Complete missões e ganhe XP</p>
            </div>
          </div>
          <div className="text-right">
            <div className="text-lg font-bold">{user.xp} XP</div>
            <div className="text-sm text-white/80">Nível: {user.level.toUpperCase()}</div>
          </div>
        </div>
      </div>

      {/* Filtros */}
      <div className="bg-black border-b border-green-400 p-4">
        <div className="max-w-6xl mx-auto">
          <div className="flex flex-wrap gap-4 items-center">
            <div className="flex items-center space-x-2">
              <label className="text-sm">Nível:</label>
              <select
                value={filters.level}
                onChange={(e) => setFilters(prev => ({ ...prev, level: e.target.value }))}
                className="bg-black border border-green-400 text-green-400 px-3 py-1 rounded"
              >
                <option value="">Todos</option>
                <option value="Basico">Básico</option>
                <option value="Avancado">Avançado</option>
                <option value="Expert">Expert</option>
              </select>
            </div>

            <div className="flex items-center space-x-2">
              <label className="text-sm">Status:</label>
              <select
                value={filters.status}
                onChange={(e) => setFilters(prev => ({ ...prev, status: e.target.value }))}
                className="bg-black border border-green-400 text-green-400 px-3 py-1 rounded"
              >
                <option value="">Todos</option>
                <option value="Disponivel">Disponível</option>
                <option value="Em progresso">Em progresso</option>
                <option value="Concluida">Concluída</option>
                <option value="Bloqueada">Bloqueada</option>
              </select>
            </div>
          </div>
        </div>
      </div>

      {/* Conteúdo Principal */}
      <div className="max-w-6xl mx-auto p-6">
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {filteredMissions.map((mission) => (
            <div 
              key={mission.id}
              className={`bg-black border rounded-lg p-6 ${
                mission.status === 'Bloqueada' ? 'border-gray-500 opacity-60' : 'border-green-400'
              }`}
            >
              <div className="flex items-start justify-between mb-4">
                <div className="flex items-center space-x-2">
                  <span className="text-2xl">{getMissionIcon(mission.type)}</span>
                  <div>
                    <h3 className="font-bold text-lg">{mission.title}</h3>
                    <div className={`text-sm ${getLevelColor(mission.level)}`}>
                      {mission.level} • {mission.xp} XP
                    </div>
                  </div>
                </div>
                <div className={`text-xs ${getStatusColor(mission.status)}`}>
                  {getStatusBadge(mission.status)}
                </div>
              </div>

              <div className="text-white/80 text-sm mb-4">
                <div className="font-semibold mb-2">Requisitos:</div>
                <ul className="list-disc list-inside space-y-1">
                  {mission.requirements.map((req, index) => (
                    <li key={index}>{req}</li>
                  ))}
                </ul>
              </div>

              <div className="space-y-2">
                {mission.status === 'Disponivel' && (
                  <div className="flex space-x-2">
                    <button 
                      onClick={() => {
                        setSelectedMission(mission)
                        setShowModal(true)
                      }}
                      className="bg-green-400 text-black px-4 py-2 rounded-lg font-bold hover:bg-green-300 transition-colors flex-1"
                    >
                      Ver instruções
                    </button>
                    <button 
                      onClick={() => startMission(mission.id)}
                      className="bg-green-400 text-black px-4 py-2 rounded-lg font-bold hover:bg-green-300 transition-colors"
                    >
                      Iniciar missão
                    </button>
                  </div>
                )}

                {mission.status === 'Em progresso' && (
                  <button 
                    onClick={() => {
                      setSelectedMission(mission)
                      setShowModal(true)
                    }}
                    className="w-full bg-yellow-400 text-black px-4 py-2 rounded-lg font-bold hover:bg-yellow-300 transition-colors"
                  >
                    Enviar evidências
                  </button>
                )}

                {mission.status === 'Concluida' && (
                  <div className="text-center">
                    <div className="text-blue-400 mb-2">✅ Concluída</div>
                    <button 
                      onClick={() => {
                        setSelectedMission(mission)
                        setShowModal(true)
                      }}
                      className="bg-blue-400 text-black px-4 py-2 rounded-lg font-bold hover:bg-blue-300 transition-colors"
                    >
                      Ver detalhes
                    </button>
                  </div>
                )}

                {mission.status === 'Bloqueada' && (
                  <div className="text-center">
                    <div className="text-gray-400 mb-2">🔒 Missão bloqueada</div>
                    <button className="bg-gray-400 text-gray-600 px-4 py-2 rounded-lg font-bold cursor-not-allowed">
                      Desbloquear
                    </button>
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>

        {filteredMissions.length === 0 && (
          <div className="text-center py-12">
            <div className="text-xl mb-4">Nenhuma missão encontrada</div>
            <div className="text-white/80">Tente ajustar os filtros de busca</div>
          </div>
        )}
      </div>

      {/* Modal de Instruções */}
      {showModal && selectedMission && (
        <div className="fixed inset-0 bg-black bg-opacity-95 z-50 flex items-center justify-center p-4">
          <div className="bg-black border border-green-400 p-8 rounded-lg max-w-4xl w-full max-h-[90vh] overflow-y-auto">
            <div className="flex justify-between items-start mb-6">
              <div>
                <h2 className="text-2xl font-bold text-green-400 mb-2">
                  {getMissionIcon(selectedMission.type)} {selectedMission.title}
                </h2>
                <div className="text-white/80">
                  {selectedMission.level} • {selectedMission.xp} XP
                </div>
              </div>
              <button
                onClick={() => setShowModal(false)}
                className="text-white/60 hover:text-white text-2xl"
              >
                ×
              </button>
            </div>

            <div className="space-y-6">
              <div>
                <h3 className="text-lg font-bold mb-3">📋 Requisitos:</h3>
                <ul className="list-disc list-inside space-y-2 text-white/80">
                  {selectedMission.requirements.map((req, index) => (
                    <li key={index}>{req}</li>
                  ))}
                </ul>
              </div>

              {selectedMission.validation.rubric && (
                <div>
                  <h3 className="text-lg font-bold mb-3">✅ Critérios de Aprovação:</h3>
                  <p className="text-white/80">{selectedMission.validation.rubric}</p>
                </div>
              )}

              {selectedMission.validation.quiz && (
                <div>
                  <h3 className="text-lg font-bold mb-3">🧠 Quiz de Validação:</h3>
                  <div className="text-white/80">
                    <p>• {selectedMission.validation.quiz.questions.length} perguntas</p>
                    <p>• Nota mínima: {selectedMission.validation.quiz.min_score}%</p>
                  </div>
                </div>
              )}

              <div className="flex space-x-4">
                {selectedMission.status === 'Disponivel' && (
                  <button
                    onClick={() => {
                      startMission(selectedMission.id)
                      setShowModal(false)
                    }}
                    className="bg-green-400 text-black px-6 py-3 rounded-lg font-bold hover:bg-green-300 transition-colors"
                  >
                    🚀 Iniciar Missão
                  </button>
                )}

                {selectedMission.status === 'Em progresso' && (
                  <button
                    onClick={() => {
                      // Aqui seria o formulário de evidências
                      completeMission(selectedMission.id, { evidence: 'submitted' })
                    }}
                    className="bg-yellow-400 text-black px-6 py-3 rounded-lg font-bold hover:bg-yellow-300 transition-colors"
                  >
                    📤 Enviar Evidências
                  </button>
                )}

                <button
                  onClick={() => setShowModal(false)}
                  className="bg-gray-400 text-black px-6 py-3 rounded-lg font-bold hover:bg-gray-300 transition-colors"
                >
                  Fechar
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Bottom Bar */}
      <div className="fixed bottom-0 left-0 right-0 bg-black border-t border-green-400 p-4">
        <div className="max-w-6xl mx-auto flex justify-between items-center">
          <Link 
            href="/portal"
            className="bg-green-400 text-black px-6 py-2 rounded-lg font-bold hover:bg-green-300 transition-colors"
          >
            🏠 Portal
          </Link>
          <Link 
            href="/resources"
            className="bg-green-400 text-black px-6 py-2 rounded-lg font-bold hover:bg-green-300 transition-colors"
          >
            📚 Recursos
          </Link>
        </div>
      </div>
    </div>
  )
}
