'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link'

interface Mission {
  code: string
  title: string
  description: string
  status: 'locked' | 'available' | 'completed'
  reward: string
}

export default function PortalPage() {
  const [missions, setMissions] = useState<Mission[]>([])
  const [user, setUser] = useState<any>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    // Simular carregamento das missões
    setMissions([
      {
        code: 'M1_PDF',
        title: '📄 Baixar PDF PRO.IA',
        description: 'Acesse o manual completo de IA para faturamento',
        status: 'available',
        reward: 'Manual PDF + 50 XP'
      },
      {
        code: 'M2_CHAT',
        title: '🤖 Abrir GPT PRO.IA',
        description: 'Teste nosso GPT customizado para vendas',
        status: 'locked',
        reward: 'Acesso GPT + 30 XP'
      },
      {
        code: 'M3_POST',
        title: '📱 Compartilhar Resultado',
        description: 'Poste seu resultado nas redes sociais',
        status: 'locked',
        reward: 'Badge Social + 20 XP'
      }
    ])

    // Simular usuário logado
    setUser({
      email: 'user@proia.local',
      xp: 250,
      level: 'expert'
    })
    setLoading(false)
  }, [])

  if (loading) {
    return (
      <div className="min-h-screen bg-black text-green-400 font-mono flex items-center justify-center">
        <div className="text-center">
          <div className="animate-pulse text-xl mb-4">Carregando Portal...</div>
          <div className="animate-pulse">Verificando autenticação...</div>
        </div>
      </div>
    )
  }

  const startMission = (code: string) => {
    console.log(`Iniciando missão: ${code}`)
    // Aqui seria a chamada para a API
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'completed': return 'bg-green-400 text-black'
      case 'available': return 'bg-green-400 text-black hover:bg-green-300'
      case 'locked': return 'bg-gray-400 text-gray-600 cursor-not-allowed'
      default: return 'bg-gray-400 text-gray-600'
    }
  }

  return (
    <div className="min-h-screen bg-black text-green-400 font-mono">
      {/* Header */}
      <div className="bg-black border-b border-green-400 p-4">
        <div className="max-w-6xl mx-auto flex justify-between items-center">
          <div className="flex items-center space-x-4">
            <img 
              src="/logo/proia-logo.png" 
              alt="PRO.IA Logo" 
              className="w-12 h-12"
            />
            <div>
              <h1 className="text-xl font-bold">PRO.IA PORTAL</h1>
              <p className="text-sm text-white/80">Sistema Desbloqueado</p>
            </div>
          </div>
          <div className="text-right">
            <div className="text-lg font-bold">{user.xp} XP</div>
            <div className="text-sm text-white/80">Nível: {user.level.toUpperCase()}</div>
          </div>
        </div>
      </div>

      {/* Conteúdo Principal */}
      <div className="max-w-6xl mx-auto p-6">
        
        {/* Status de Liberação */}
        <div className="bg-black border border-green-400 p-6 rounded-lg mb-8">
          <div className="text-center">
            <div className="text-2xl font-bold text-green-400 mb-2">
              🎯 SISTEMA DESBLOQUEADO!
            </div>
            <div className="text-white/80 mb-4">
              Bem-vindo ao Portal PRO.IA. Você tem acesso completo às ferramentas e missões.
            </div>
            <div className="flex justify-center space-x-4">
              <Link 
                href="/resources"
                className="bg-green-400 text-black px-6 py-2 rounded-lg font-bold hover:bg-green-300 transition-colors"
              >
                📚 Recursos
              </Link>
              <Link 
                href="/missions"
                className="bg-green-400 text-black px-6 py-2 rounded-lg font-bold hover:bg-green-300 transition-colors"
              >
                🎮 Missões
              </Link>
            </div>
          </div>
        </div>

        {/* Comet Browser - Parceiro Recomendado */}
        <div className="bg-gradient-to-r from-blue-900/20 to-purple-900/20 border border-blue-400/30 rounded-2xl p-6 mb-8 backdrop-blur-xl">
          <div className="text-center space-y-4">
            <div className="text-blue-400 font-mono text-lg animate-pulse">
              &gt; BROWSER RECOMENDADO: COMET
            </div>
            <div className="text-white/90 text-sm">
              O navegador dos sonhos para desenvolvedores e criadores de IA
            </div>
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              <a 
                href="https://pplx.ai/neo_protocol" 
                target="_blank" 
                rel="noopener noreferrer"
                className="bg-gradient-to-r from-blue-500 to-purple-600 text-white font-bold px-8 py-4 rounded-xl hover:from-blue-400 hover:to-purple-500 transition-all duration-300 hover:scale-105 shadow-lg hover:shadow-blue-400/50 inline-flex items-center gap-2"
              >
                🌟 BAIXAR COMET BROWSER
              </a>
              <div className="text-blue-300 text-xs font-mono">
                &gt; Powered by NEØ Protocol
              </div>
            </div>
          </div>
        </div>

        {/* Missões */}
        <div className="mb-8">
          <h2 className="text-xl font-bold mb-4">🎮 MISSÕES DISPONÍVEIS</h2>
          <div className="grid gap-4 md:grid-cols-3">
            {missions.map((mission) => (
              <div 
                key={mission.code}
                className="bg-black border border-green-400 p-4 rounded-lg"
              >
                <h3 className="font-bold text-lg mb-2">{mission.title}</h3>
                <p className="text-white/80 text-sm mb-3">{mission.description}</p>
                <div className="text-green-400 text-xs mb-3">Recompensa: {mission.reward}</div>
                <button
                  onClick={() => startMission(mission.code)}
                  disabled={mission.status === 'locked'}
                  className={`w-full px-3 py-2 rounded-lg font-bold transition-all duration-300 ${getStatusColor(mission.status)}`}
                >
                  {mission.status === 'completed' ? '✅ Concluída' : 
                   mission.status === 'available' ? '🚀 Iniciar' : 
                   '🔒 Bloqueada'}
                </button>
              </div>
            ))}
          </div>
        </div>

        {/* Recursos Rápidos */}
        <div className="mb-8">
          <h2 className="text-xl font-bold mb-4">⚡ RECURSOS RÁPIDOS</h2>
          <div className="grid gap-4 md:grid-cols-2">
            <div className="bg-black border border-green-400 p-4 rounded-lg">
              <h3 className="font-bold mb-2">📄 PDF Manual PRO.IA</h3>
              <p className="text-white/80 text-sm mb-3">Manual completo para usar IA de forma prática</p>
              <button className="bg-green-400 text-black px-4 py-2 rounded-lg font-bold hover:bg-green-300 transition-colors">
                📥 Baixar PDF
              </button>
            </div>
            <div className="bg-black border border-green-400 p-4 rounded-lg">
              <h3 className="font-bold mb-2">🤖 GPT PRO.IA</h3>
              <p className="text-white/80 text-sm mb-3">Assistente de IA especializado em vendas</p>
              <button className="bg-green-400 text-black px-4 py-2 rounded-lg font-bold hover:bg-green-300 transition-colors">
                🚀 Abrir GPT
              </button>
            </div>
          </div>
        </div>

        {/* WhatsApp de Suporte */}
        <div className="bg-black border border-green-400 p-6 rounded-lg text-center">
          <h3 className="text-lg font-bold mb-2">💬 Suporte PRO.IA</h3>
          <p className="text-white/80 mb-4">Precisa de ajuda? Fale conosco no WhatsApp</p>
          <button 
            onClick={() => {
              const message = encodeURIComponent('Olá! Preciso de ajuda no Portal PRO.IA')
              window.open(`https://wa.me/5511999999999?text=${message}`, '_blank')
            }}
            className="bg-green-400 text-black px-6 py-3 rounded-lg font-bold hover:bg-green-300 transition-colors"
          >
            📱 Abrir WhatsApp
          </button>
        </div>

      </div>
    </div>
  )
}
