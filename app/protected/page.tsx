'use client'

import { useEffect, useState, useRef } from 'react'
import { useRouter } from 'next/navigation'

export default function ProtectedPage() {
  const [isAuthorized, setIsAuthorized] = useState(false)
  const [isLoading, setIsLoading] = useState(true)
  const [completedMissions, setCompletedMissions] = useState<string[]>([])
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const router = useRouter()

  // Canvas Matrix Effect
  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext('2d')
    if (!ctx) return

    const resizeCanvas = () => {
      canvas.width = window.innerWidth
      canvas.height = window.innerHeight
    }

    resizeCanvas()
    window.addEventListener('resize', resizeCanvas)

    const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789@#$%^&*()_+-=[]{}|;:,.<>?'
    const fontSize = 14
    const columns = canvas.width / fontSize
    const drops: number[] = []

    for (let i = 0; i < columns; i++) {
      drops[i] = 1
    }

    const draw = () => {
      ctx.fillStyle = 'rgba(0, 0, 0, 0.05)'
      ctx.fillRect(0, 0, canvas.width, canvas.height)
      
      ctx.fillStyle = '#00ff00'
      ctx.font = `${fontSize}px monospace`

      for (let i = 0; i < drops.length; i++) {
        const text = chars[Math.floor(Math.random() * chars.length)]
        ctx.fillText(text, i * fontSize, drops[i] * fontSize)

        if (drops[i] * fontSize > canvas.height && Math.random() > 0.975) {
          drops[i] = 0
        }
        drops[i]++
      }
    }

    const interval = setInterval(draw, 35)

    return () => {
      clearInterval(interval)
      window.removeEventListener('resize', resizeCanvas)
    }
  }, [])

  useEffect(() => {
    // Verificar se o usuário tem acesso autorizado
    const checkAccess = async () => {
      try {
        // Aqui você vai implementar a verificação de acesso
        // Verificar token, sessão, banco de dados, etc.
        
        const token = localStorage.getItem('access_token')
        const paymentStatus = localStorage.getItem('payment_status')
        
        if (token && paymentStatus === 'approved') {
          setIsAuthorized(true)
        } else {
          // Redirecionar para página principal se não tiver acesso
          router.push('/')
        }
      } catch (error) {
        console.error('Erro ao verificar acesso:', error)
        router.push('/')
      } finally {
        setIsLoading(false)
      }
    }

    checkAccess()
  }, [router])

  const handleWhatsAppClick = () => {
    const message = encodeURIComponent("Quero liberar meu acesso ao Portal PRO.IA – Outubro/25")
    window.open(`https://wa.me/5511999999999?text=${message}`, '_blank')
  }

  const handleMissionComplete = (missionId: string) => {
    if (!completedMissions.includes(missionId)) {
      setCompletedMissions([...completedMissions, missionId])
    }
  }

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-purple-900 via-pink-600 to-cyan-500 flex items-center justify-center">
        <div className="text-center text-white">
          <div className="animate-pulse text-4xl mb-4">🧠</div>
          <div className="animate-pulse text-xl">Verificando acesso...</div>
        </div>
      </div>
    )
  }

  if (!isAuthorized) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-purple-900 via-pink-600 to-cyan-500 flex items-center justify-center">
        <div className="text-center text-white">
          <div className="text-4xl mb-4">🚫</div>
          <div className="text-xl">Acesso negado</div>
        </div>
      </div>
    )
  }

  return (
    <div className="bg-black text-green-400 font-mono relative">
      {/* Canvas Matrix */}
      <canvas 
        ref={canvasRef}
        id="matrix-canvas"
        className="fixed inset-0 z-0 opacity-20"
        style={{ pointerEvents: 'none' }}
      />

      {/* Conteúdo principal */}
      <div className="min-h-screen text-green-400 font-mono flex flex-col justify-center items-center p-4 sm:p-6 relative overflow-hidden">
        <div className="z-10 max-w-6xl text-center space-y-4 sm:space-y-6 w-full">
          
          {/* Título principal */}
          <div className="text-green-400 text-lg sm:text-xl md:text-3xl lg:text-4xl xl:text-5xl font-bold mb-6 tracking-wider break-words px-2">
            {/* Logo */}
            <div className="text-center mb-6">
              <img 
                src="/logo/proia-logo.png" 
                alt="PRO.IA Logo" 
                className="w-24 h-24 sm:w-32 sm:h-32 md:w-40 md:h-40 mx-auto mb-4"
              />
            </div>
            <span className="animate-pulse">🧠 PRO.IA SYSTEM</span>
          </div>

          {/* Hero Section */}
          <div className="bg-black border border-green-400 p-4 sm:p-6 lg:p-8 rounded-lg space-y-3 text-left text-sm sm:text-base lg:text-lg max-w-4xl mx-auto">
            <div className="text-green-400 space-y-2">
              <div className="animate-pulse">SISTEMA: PRO.IA_PROTOCOL.EXE</div>
              <div className="animate-pulse">Acesso restrito à inteligência.</div>
              <div className="animate-pulse">Peça liberação pelo WhatsApp.</div>
            </div>
            <div className="text-center mt-6">
              <button
                onClick={handleWhatsAppClick}
                className="bg-green-400 text-black px-6 sm:px-12 md:px-16 py-3 sm:py-6 md:py-8 text-sm sm:text-xl md:text-2xl w-full transform hover:scale-105 transition-all duration-300 shadow-2xl shadow-green-500/70 border-2 sm:border-4 border-green-300 relative overflow-hidden min-h-[60px] sm:min-h-[90px] md:min-h-[100px] inline-flex items-center justify-center rounded-xl font-bold"
                style={{
                  animation: 'pulse 1s infinite, glow 1s ease-in-out infinite alternate',
                  textShadow: '0 2px 4px rgba(0,0,0,0.3)'
                }}
              >
                📱 LIBERAR ACESSO
              </button>
              <p className="text-white/70 mt-4 text-sm italic">
                "O conhecimento aqui não é distribuído, é concedido."
              </p>
            </div>
          </div>

          {/* Dossiê PRO.IA Section */}
          <div className="bg-black border border-green-400 p-4 sm:p-6 lg:p-8 rounded-lg space-y-3 text-left text-sm sm:text-base lg:text-lg max-w-4xl mx-auto">
            <div className="text-green-400 space-y-2">
              <div className="animate-pulse">📘 DOSSIÊ PRO.IA</div>
              <div className="animate-pulse">Introdução à IA – Outubro/25</div>
            </div>
            <div className="text-white space-y-2">
              <div className="flex items-center">
                <span className="w-2 h-2 bg-green-400 rounded-full mr-3"></span>
                A história recente da IA (ChatGPT, Gemini, Claude, etc.)
              </div>
              <div className="flex items-center">
                <span className="w-2 h-2 bg-green-400 rounded-full mr-3"></span>
                A fusão entre automação e marketing real
              </div>
              <div className="flex items-center">
                <span className="w-2 h-2 bg-green-400 rounded-full mr-3"></span>
                Os 3 pilares do método PRO.IA: <strong>Autonomia · Faturamento · Escala</strong>
              </div>
            </div>
            <div className="text-center mt-6">
              <button className="bg-green-400 text-black px-6 sm:px-12 py-3 sm:py-4 text-sm sm:text-lg w-full transform hover:scale-105 transition-all duration-300 shadow-lg shadow-green-500/50 border border-green-300 rounded-lg font-bold">
                📄 BAIXAR DOSSIÊ COMPLETO (PDF)
              </button>
            </div>
          </div>

          {/* Timeline IA & Mercado */}
          <div className="bg-black border border-green-400 p-4 sm:p-6 lg:p-8 rounded-lg space-y-3 text-left text-sm sm:text-base lg:text-lg max-w-4xl mx-auto">
            <div className="text-green-400 space-y-2">
              <div className="animate-pulse">🎥 TIMELINE: IA & MERCADO</div>
            </div>
            <div className="text-white space-y-4">
              <div className="flex items-start">
                <span className="w-2 h-2 bg-green-400 rounded-full mr-3 mt-2"></span>
                <div>
                  <div className="text-green-400 font-bold">2022 - Início da revolução conversacional</div>
                  <div className="text-white/80">"O dia em que o ChatGPT virou público"</div>
                  <button className="bg-green-400 text-black px-4 py-2 text-xs rounded mt-2 hover:scale-105 transition-all duration-300">
                    ▶️ ASSISTIR
                  </button>
                </div>
              </div>
              <div className="flex items-start">
                <span className="w-2 h-2 bg-green-400 rounded-full mr-3 mt-2"></span>
                <div>
                  <div className="text-green-400 font-bold">2023 - Nascimento dos Prompt Engineers</div>
                  <div className="text-white/80">"O boom dos criadores de prompt"</div>
                  <button className="bg-green-400 text-black px-4 py-2 text-xs rounded mt-2 hover:scale-105 transition-all duration-300">
                    ▶️ ASSISTIR
                  </button>
                </div>
              </div>
              <div className="flex items-start">
                <span className="w-2 h-2 bg-green-400 rounded-full mr-3 mt-2"></span>
                <div>
                  <div className="text-green-400 font-bold">2024 - O caos da monetização com IA</div>
                  <div className="text-white/80">"Primeira automação no Brasil com IA"</div>
                  <button className="bg-green-400 text-black px-4 py-2 text-xs rounded mt-2 hover:scale-105 transition-all duration-300">
                    ▶️ ASSISTIR
                  </button>
                </div>
              </div>
            </div>
            <div className="text-center mt-6">
              <button className="bg-green-400 text-black px-6 sm:px-12 py-3 sm:py-4 text-sm sm:text-lg w-full transform hover:scale-105 transition-all duration-300 shadow-lg shadow-green-500/50 border border-green-300 rounded-lg font-bold">
                🎬 ASSISTA E ENTENDA O QUE ESTÁ ACONTECENDO
              </button>
            </div>
          </div>

          {/* Links Rápidos - IAs Gratuitas */}
          <div className="bg-black border border-green-400 p-4 sm:p-6 lg:p-8 rounded-lg space-y-3 text-left text-sm sm:text-base lg:text-lg max-w-4xl mx-auto">
            <div className="text-green-400 space-y-2">
              <div className="animate-pulse">🧩 LINKS RÁPIDOS – IAs GRATUITAS</div>
            </div>
            <div className="text-white space-y-3">
              <div className="flex items-center justify-between">
                <div className="flex items-center">
                  <span className="w-2 h-2 bg-green-400 rounded-full mr-3"></span>
                  <span>🤖 Gemini Advanced - Free Oct/25</span>
                </div>
                <button className="bg-green-400 text-black px-3 py-1 text-xs rounded hover:scale-105 transition-all duration-300">
                  ACESSAR
                </button>
              </div>
              <div className="flex items-center justify-between">
                <div className="flex items-center">
                  <span className="w-2 h-2 bg-green-400 rounded-full mr-3"></span>
                  <span>🧠 Claude 3.5 - Free Trial</span>
                </div>
                <button className="bg-green-400 text-black px-3 py-1 text-xs rounded hover:scale-105 transition-all duration-300">
                  ACESSAR
                </button>
              </div>
              <div className="flex items-center justify-between">
                <div className="flex items-center">
                  <span className="w-2 h-2 bg-green-400 rounded-full mr-3"></span>
                  <span>🎬 Runway ML - 125 credits</span>
                </div>
                <button className="bg-green-400 text-black px-3 py-1 text-xs rounded hover:scale-105 transition-all duration-300">
                  ACESSAR
                </button>
              </div>
              <div className="flex items-center justify-between">
                <div className="flex items-center">
                  <span className="w-2 h-2 bg-green-400 rounded-full mr-3"></span>
                  <span>📊 Gamma App - Auto presentations</span>
                </div>
                <button className="bg-green-400 text-black px-3 py-1 text-xs rounded hover:scale-105 transition-all duration-300">
                  ACESSAR
                </button>
              </div>
            </div>
            <div className="text-center mt-6">
              <button className="bg-green-400 text-black px-6 sm:px-12 py-3 sm:py-4 text-sm sm:text-lg w-full transform hover:scale-105 transition-all duration-300 shadow-lg shadow-green-500/50 border border-green-300 rounded-lg font-bold">
                ⚡ USE ANTES QUE FECHEM O ACESSO
              </button>
            </div>
          </div>

          {/* Acesso ao GPT + GEMS */}
          <div className="bg-black border border-green-400 p-4 sm:p-6 lg:p-8 rounded-lg space-y-3 text-left text-sm sm:text-base lg:text-lg max-w-4xl mx-auto">
            <div className="text-green-400 space-y-2">
              <div className="animate-pulse">🤖 ACESSO AO GPT + GEMS</div>
              <div className="animate-pulse">"Fale diretamente com o cérebro do PRO.IA"</div>
            </div>
            <div className="text-white space-y-2">
              <div className="flex items-center">
                <span className="w-2 h-2 bg-green-400 rounded-full mr-3"></span>
                Essas instâncias conhecem o protocolo. Treinadas em código e valores do projeto.
              </div>
            </div>
            <div className="grid grid-cols-2 gap-4 mt-6">
              <button className="bg-green-400 text-black px-4 py-3 text-sm rounded-lg font-bold hover:scale-105 transition-all duration-300">
                🧠 ABRIR GPT PRO.IA
              </button>
              <button className="bg-green-400 text-black px-4 py-3 text-sm rounded-lg font-bold hover:scale-105 transition-all duration-300">
                💎 ATIVAR GEMS
              </button>
            </div>
          </div>

          {/* Web3 e IA Virtuais */}
          <div className="bg-black border border-green-400 p-4 sm:p-6 lg:p-8 rounded-lg space-y-3 text-left text-sm sm:text-base lg:text-lg max-w-4xl mx-auto">
            <div className="text-green-400 space-y-2">
              <div className="animate-pulse">🌐 INTRODUÇÃO AO WEB3 & IAs VIRTUAIS</div>
            </div>
            <div className="text-white space-y-2">
              <div className="flex items-center">
                <span className="w-2 h-2 bg-green-400 rounded-full mr-3"></span>
                Breve explicação da intersecção entre Web3, IAs autônomas e tokens.
              </div>
              <div className="text-green-400 font-bold mt-4">🆔 O que é identidade virtual (NeoID)</div>
              <div className="text-white/80 ml-4">Sistema de identidade descentralizada para IAs autônomas</div>
              <div className="text-green-400 font-bold">🪙 Como tokens estão mudando o conceito de currículo</div>
              <div className="text-white/80 ml-4">Reputação baseada em blockchain para IAs</div>
              <div className="text-green-400 font-bold">🤖 IAs que trabalham para você</div>
              <div className="text-white/80 ml-4">Automação completa com inteligência artificial</div>
            </div>
            <div className="text-center mt-6">
              <button className="bg-green-400 text-black px-6 sm:px-12 py-3 sm:py-4 text-sm sm:text-lg w-full transform hover:scale-105 transition-all duration-300 shadow-lg shadow-green-500/50 border border-green-300 rounded-lg font-bold">
                🚀 ATIVAR MODO CRIADOR
              </button>
            </div>
          </div>

          {/* Missões e Liberações */}
          <div className="bg-black border border-green-400 p-4 sm:p-6 lg:p-8 rounded-lg space-y-3 text-left text-sm sm:text-base lg:text-lg max-w-4xl mx-auto">
            <div className="text-green-400 space-y-2">
              <div className="animate-pulse">⚡ MISSÕES E LIBERAÇÕES</div>
            </div>
            <div className="text-white space-y-4">
              <div className="flex items-start">
                <span className="w-2 h-2 bg-green-400 rounded-full mr-3 mt-2"></span>
                <div className="flex-1">
                  <div className="text-green-400 font-bold">Missão 1 - Baixar o PDF</div>
                  <button 
                    onClick={() => handleMissionComplete('mission1')}
                    className={`mt-2 px-4 py-2 text-xs rounded font-bold transition-all duration-300 ${
                      completedMissions.includes('mission1') 
                        ? 'bg-green-400 text-black' 
                        : 'bg-green-400 text-black hover:scale-105'
                    }`}
                  >
                    {completedMissions.includes('mission1') ? '✓ CONCLUÍDA' : '>_ INICIAR'}
                  </button>
                </div>
              </div>
              <div className="flex items-start">
                <span className="w-2 h-2 bg-green-400 rounded-full mr-3 mt-2"></span>
                <div className="flex-1">
                  <div className="text-green-400 font-bold">Missão 2 - Conversar com GPT</div>
                  <button 
                    onClick={() => handleMissionComplete('mission2')}
                    className={`mt-2 px-4 py-2 text-xs rounded font-bold transition-all duration-300 ${
                      completedMissions.includes('mission2') 
                        ? 'bg-green-400 text-black' 
                        : 'bg-green-400 text-black hover:scale-105'
                    }`}
                  >
                    {completedMissions.includes('mission2') ? '✓ CONCLUÍDA' : '⚡ INICIAR'}
                  </button>
                </div>
              </div>
              <div className="flex items-start">
                <span className="w-2 h-2 bg-green-400 rounded-full mr-3 mt-2"></span>
                <div className="flex-1">
                  <div className="text-green-400 font-bold">Missão 3 - Postar screenshot e marcar @pro.ia</div>
                  <button 
                    onClick={() => handleMissionComplete('mission3')}
                    className={`mt-2 px-4 py-2 text-xs rounded font-bold transition-all duration-300 ${
                      completedMissions.includes('mission3') 
                        ? 'bg-green-400 text-black' 
                        : 'bg-green-400 text-black hover:scale-105'
                    }`}
                  >
                    {completedMissions.includes('mission3') ? '✓ CONCLUÍDA' : '! INICIAR'}
                  </button>
                </div>
              </div>
            </div>
            <div className="text-center mt-6">
              <div className="bg-black border border-green-400 rounded-lg p-4">
                <div className="text-green-400 font-bold mb-2">Progresso das Missões</div>
                <div className="text-white/80 text-sm mb-2">
                  {completedMissions.length} de 3 missões concluídas
                </div>
                <div className="w-full bg-green-400/20 rounded-full h-2">
                  <div 
                    className="bg-green-400 h-2 rounded-full transition-all duration-500 animate-pulse"
                    style={{ width: `${(completedMissions.length / 3) * 100}%` }}
                  ></div>
                </div>
              </div>
            </div>
          </div>

          {/* Comunidade PRO.IA */}
          <div className="bg-black border border-green-400 p-4 sm:p-6 lg:p-8 rounded-lg space-y-3 text-left text-sm sm:text-base lg:text-lg max-w-4xl mx-auto">
            <div className="text-green-400 space-y-2">
              <div className="animate-pulse">🔮 FUTURO IMEDIATO / COMUNIDADE PRO.IA</div>
            </div>
            <div className="text-white space-y-2">
              <div className="flex items-center">
                <span className="w-2 h-2 bg-green-400 rounded-full mr-3"></span>
                Preview da comunidade Telegram/Discord
              </div>
              <div className="text-green-400 font-bold mt-4">"Se você entende o agora, você está atrasado."</div>
              <div className="text-white/80 ml-4">PRO.IA fala com quem programa o amanhã.</div>
            </div>
            <div className="text-center mt-6">
              <button className="bg-green-400 text-black px-6 sm:px-12 py-3 sm:py-4 text-sm sm:text-lg w-full transform hover:scale-105 transition-all duration-300 shadow-lg shadow-green-500/50 border border-green-300 rounded-lg font-bold">
                🚀 ENTRAR NA COMUNIDADE PRO.IA
              </button>
            </div>
          </div>

          {/* Footer */}
          <div className="text-center mt-8">
            <div className="text-white/60 text-xs">
              PRO.IA Portal - Acesso Autorizado | Última atualização: {new Date().toLocaleDateString('pt-BR')}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
