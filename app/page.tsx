'use client'

import { useCallback, useEffect, useRef, useState } from 'react'
import Forms from './components/forms'

export default function HomePage() {
  const audioRef = useRef<HTMLAudioElement>(null)
  const professorAudioRef = useRef<HTMLAudioElement>(null)
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const [showForm, setShowForm] = useState(false)
  const [formCompleted, setFormCompleted] = useState(false)
  const [finalXp, setFinalXp] = useState(0)
  const [displayedText, setDisplayedText] = useState('')
  const [showCursor, setShowCursor] = useState(false)
  const [isPlayingSound, setIsPlayingSound] = useState(false)
  const [hasInteracted, setHasInteracted] = useState(false)

  // Callback para quando o formulário for completado
  const handleFormComplete = async (answers: string[], xp: number) => {
    setFinalXp(xp)
    setFormCompleted(true)
    setShowForm(false)
    
    try {
      // Chamar API de login para gerar token
      const response = await fetch('/api/auth/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email: `user_${Date.now()}@proia.local`, // Email temporário
          xp: xp,
          answers: answers
        })
      })

      const data = await response.json()
      
      if (data.success) {
        // Token criado com sucesso
        if (data.redirect) {
          // Liberação completa - redirecionar para portal
          setTimeout(() => {
            window.location.href = data.redirect
          }, 3000)
        } else if (data.whatsapp) {
          // Liberação parcial - mostrar WhatsApp
          setTimeout(() => {
            window.open(data.whatsapp.url, '_blank')
          }, 3000)
        }
      }
    } catch (error) {
      console.error('Erro ao processar liberação:', error)
      // Fallback para o comportamento anterior
      if (xp >= 200) {
        setTimeout(() => {
          window.location.href = '/portal'
        }, 3000)
      } else if (xp >= 100) {
        setTimeout(() => {
          const whatsappMessage = encodeURIComponent(
            `Quero liberação no Portal PRO.IA - XP: ${xp} pontos`
          )
          window.open(`https://wa.me/5562983231110?text=${whatsappMessage}`, '_blank')
        }, 3000)
      }
    }
  }

  // Função para iniciar o formulário
  const startForm = () => {
    setShowForm(true)
  }

  // Função para tocar áudio do professor
  const playProfessorAudio = useCallback(async () => {
    const audio = professorAudioRef.current
    if (!audio) return

    try {
      if (isPlayingSound) {
        audio.pause()
        audio.currentTime = 0
        setIsPlayingSound(false)
      } else {
        await audio.play()
        setIsPlayingSound(true)
        audio.onended = () => setIsPlayingSound(false)
      }
    } catch (error) {
      console.log('Erro ao reproduzir audio:', error)
    }
  }, [isPlayingSound])

  const handleProfessorAudioToggle = useCallback(() => {
    setHasInteracted(true)
    void playProfessorAudio()
  }, [playProfessorAudio])

  // Efeito Matrix Canvas
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

    const chars = "01アイウエオカキクケコサシスセソタチツテトナニヌネノハヒフヘホマミムメモヤユヨラリルレロワヲン".split("")
    const fontSize = window.innerWidth < 768 ? 10 : 14
    const columns = Math.floor(canvas.width / fontSize)
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

  // Carregar áudio
  useEffect(() => {
    const audio = audioRef.current
    if (!audio) return

    const prepareAudio = async () => {
      try {
        await audio.load()
        audio.volume = 0.15
      } catch (error) {
        console.log('Erro ao carregar audio:', error)
      }
    }

    void prepareAudio()

    const handleFirstInteraction = () => {
      setHasInteracted(true)
      audio.play().catch(() => {
        console.log('Audio nao pode ser reproduzido automaticamente')
      })
    }

    const interactionEvents: Array<keyof DocumentEventMap> = [
      'click',
      'keydown',
      'touchstart',
    ]

    interactionEvents.forEach((eventName) => {
      document.addEventListener(eventName, handleFirstInteraction, { once: true })
    })

    return () => {
      interactionEvents.forEach((eventName) => {
        document.removeEventListener(eventName, handleFirstInteraction)
      })
    }
  }, [])

  // Proteções de segurança
  useEffect(() => {
    const preventContextMenu = (e: MouseEvent) => e.preventDefault()
    const preventDevTools = (e: KeyboardEvent) => {
      if (e.key === 'F12' || (e.ctrlKey && e.shiftKey && e.key === 'I')) {
        e.preventDefault()
      }
    }

    document.addEventListener('contextmenu', preventContextMenu, { passive: false })
    document.addEventListener('keydown', preventDevTools, { passive: false })

    return () => {
      document.removeEventListener('contextmenu', preventContextMenu)
      document.removeEventListener('keydown', preventDevTools)
    }
  }, [])

  // Efeito de digitação
  useEffect(() => {
    const fullText = "Quem aprender a transformar IA em faturamento agora vai liderar a próxima década."
    let currentIndex = 0
    
    const typeText = () => {
      if (currentIndex < fullText.length) {
        setDisplayedText(fullText.substring(0, currentIndex + 1))
        currentIndex++
        setTimeout(typeText, 50) // Velocidade de digitação (50ms por letra)
      } else {
        // Após terminar de digitar, mostrar o cursor
        setTimeout(() => setShowCursor(true), 500)
      }
    }

    // Iniciar a digitação após 1 segundo
    const startTyping = setTimeout(typeText, 1000)

    return () => clearTimeout(startTyping)
  }, [])

  // Detectar quando o usuário rola até a seção do professor
  useEffect(() => {
    const handleScroll = () => {
      if (!hasInteracted) return

      const professorSection = document.getElementById('professor-section')
      if (!professorSection) return

      const rect = professorSection.getBoundingClientRect()
      const isVisible = rect.top < window.innerHeight && rect.bottom > 0
      
      if (isVisible && !isPlayingSound) {
        // Auto-play quando a seção fica visível
        void playProfessorAudio()
      }
    }

    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [hasInteracted, isPlayingSound, playProfessorAudio])

  return (
    <div className="bg-black text-green-400 font-mono relative">
      {/* Áudio de fundo */}
      <audio 
        ref={audioRef}
        preload="auto"
        loop
      >
        <source 
          src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/dark-audio-gAbZupZI3B1XdC3sZg6IJICRc43snr.mp3" 
          type="audio/mpeg" 
        />
      </audio>

      {/* Áudio do professor */}
      <audio 
        ref={professorAudioRef}
        preload="auto"
      >
        <source 
          src="/audio/professor.mp3" 
          type="audio/mpeg" 
        />
      </audio>

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
          
          {/* Hero Section */}
          <div className="bg-white/5 backdrop-blur-xl border border-white/20 rounded-2xl p-4 sm:p-6 lg:p-8 space-y-3 text-left text-sm sm:text-base lg:text-lg max-w-4xl mx-auto mb-8 shadow-[0_0_30px_rgba(0,255,0,0.1)] hover:shadow-[0_0_50px_rgba(0,255,0,0.2)] transition-all duration-300">
            <div className="text-green-400 space-y-2">
              {/* Logo */}
              <div className="text-center mb-6">
                <img 
                  src="/logo/proia-logo.png" 
                  alt="PRO.IA Logo" 
                  className="w-24 h-24 sm:w-32 sm:h-32 md:w-40 md:h-40 mx-auto mb-4"
                />
              </div>
              <div className="animate-pulse text-lg sm:text-xl md:text-2xl lg:text-3xl font-bold text-center mb-4">
                PRO.IA //    
              </div>
              <div className="animate-pulse text-center text-sm sm:text-base lg:text-lg">
                &gt; MANUAL RÁPIDO DE COMO USAR IA.
              </div>
              <div className="animate-pulse text-center text-sm sm:text-base lg:text-lg">
                &gt; DE UMA FORMA FÁCIL, COM FERRAMENTAS_ E LINKS.
              </div>
            </div>
          </div>

          {/* Título principal */}
          <div className="text-green-400 text-lg sm:text-xl md:text-3xl lg:text-4xl xl:text-5xl font-bold mb-6 tracking-wider break-words px-2">
            <span className="animate-pulse">O QUE É PRO.IA?</span>
          </div>

          {/* Primeira caixa */}
          <div className="bg-black border border-green-400 p-4 sm:p-6 lg:p-8 rounded-lg space-y-3 text-left text-sm sm:text-base lg:text-lg max-w-4xl mx-auto">
            <div className="text-green-400 space-y-2 font-mono">
              <div className="animate-pulse">&gt; SYSTEM: PRO.IA_INTRO.HTML</div>
              <div className="animate-pulse">&gt; STATUS: ACESSO ATIVADO</div>
              <div className="animate-pulse">&gt; NOTICE: O mercado mudou.</div>

              <div className="text-white/80 mt-2">
                {displayedText}
                {showCursor && (
                  <span 
                    className="text-green-400 font-bold animate-pulse"
                    style={{ animation: 'blink 1s infinite' }}
                  >
                    |
                  </span>
                )}
              </div>
            </div>
          </div>

          {/* Container das duas caixas lado a lado */}
          <div className="flex flex-col lg:flex-row gap-4 sm:gap-6 max-w-6xl mx-auto">
            
            {/* Caixa da imagem do professor */}
            <div id="professor-section" className="bg-black border border-green-400 p-4 sm:p-6 lg:p-8 rounded-lg flex-1">
            <div className="animate-pulse"> &gt;_ RENDERING... (0.05s) // STATUS: ONLINE ⚡</div>
              <div className="text-center">
                <img 
                  src="/images/neo.png" 
                  alt="Professor Neo" 
                  className="w-full h-auto max-w-sm mx-auto mb-4 rounded-lg"
                />
                <div className="text-green-400 font-mono text-sm sm:text-base">
                  <div className="animate-pulse">&gt; NAME: NEØ ◡̈ </div>
                </div>
                <div className="text-white/80 mt-3 text-sm sm:text-base flex items-center justify-center gap-2">
                  <span>::</span>
                  <button
                    onClick={handleProfessorAudioToggle}
                    className={`w-6 h-6 transition-all duration-300 hover:scale-110 cursor-pointer border border-green-400 rounded p-1 ${
                      isPlayingSound 
                        ? 'text-green-300 animate-pulse bg-green-400/20' 
                        : 'text-green-400 hover:text-green-300 hover:bg-green-400/10'
                    }`}
                    title={isPlayingSound ? 'Parar áudio' : 'Tocar áudio do professor'}
                  >
                    <svg 
                      fill="currentColor" 
                      viewBox="0 0 24 24"
                      className="w-full h-full"
                    >
                      <path d="M3 9v6h4l5 5V4L7 9H3zm13.5 3c0-1.77-1.02-3.29-2.5-4.03v8.05c1.48-.73 2.5-2.25 2.5-4.02zM14 3.23v2.06c2.89.86 5 3.54 5 6.71s-2.11 5.85-5 6.71v2.06c4.01-.91 7-4.49 7-8.77s-2.99-7.86-7-8.77z"/>
                    </svg>
                  </button>
                  <span>SOUND SYSTEM</span>
                  <span>::</span>
                  {isPlayingSound && (
                    <span className="text-green-300 animate-pulse text-xs">
                      🔊 PLAYING
                    </span>
                  )}
                </div>
              </div>
            </div>

            {/* Segunda caixa */}
            <div className="bg-black border border-green-400 p-4 sm:p-6 lg:p-8 rounded-lg space-y-3 text-left text-sm sm:text-base lg:text-lg flex-1">
              <div className="text-green-400 space-y-2 font-mono">
                <p className="text-green-400">
                  Eu não sou seu mentor, nem estou vendendo um curso milagroso, nem uma promessa de dinheiro rápido. Aqui eu compartilho conhecimento com experiência real. Porque eu sei fazer com que um sistema de IAs faça o que nenhum humano conseguiria fazer sozinho.
                  Sem teoria, sem rodeio. É sobre como fazer!
                </p>

                <div className="space-y-1 text-white/90">
                  <div>&gt; Aqui você entende como a IA pensa, antes de tentar usá-la;</div>
                  <div>&gt; Aprende a transformar prompts em produtos. Ideias em faturamento real.</div>
                  <div>&gt; Acessa as mesmas ferramentas que os grandes usam, mas com instruções claras, rápidas e práticas.</div>
                </div>

                <p className="text-white/70 mt-3">
                O PRO.IA não te ensina a usar IA. Ele te conecta à própria inteligência. 
                  Diferença prática? Resultado em dias, não em meses.
                </p>
              </div>
            </div>
          </div>




          {/* Botão principal - LIBERADO */}
          <button 
            onClick={startForm}
            className="gap-2 whitespace-nowrap bg-gradient-to-r from-green-400 via-green-500 to-green-400 text-black font-black px-6 sm:px-12 md:px-16 py-3 sm:py-6 md:py-8 text-sm sm:text-xl md:text-2xl w-full border-2 sm:border-4 border-green-300 relative overflow-hidden min-h-[60px] sm:min-h-[90px] md:min-h-[100px] inline-flex items-center justify-center rounded-xl hover:from-green-300 hover:via-green-400 hover:to-green-300 transition-all duration-300 hover:scale-105 shadow-lg hover:shadow-green-400/50"
          >
            🚀 SISTEMA LIBERADO
          </button>

        </div>
      </div>

      {/* Footer */}
      <footer className="bg-black border-t border-green-400 py-8 px-4 sm:px-6">
        <div className="max-w-4xl mx-auto text-center">
          <div className="text-green-400 font-mono text-sm sm:text-base mb-4">
            <div className="animate-pulse">&gt; SYSTEM: FOOTER.HTML</div>
            <div className="animate-pulse">&gt; STATUS: ONLINE</div>
          </div>
          
          <div className="text-white/80 text-sm sm:text-base lg:text-lg italic mb-6">
            A revolução não será transmitida, já está sendo automatizada.
          </div>
          
          <div className="text-green-400 text-xs sm:text-sm font-mono">
            <div>&gt; PRO.IA © 2025 - Todos os direitos reservados</div>
            <div>&gt; Powered by NEØ-FLOWOFF</div> flowoff.xyz 
            <div className="mt-2 text-blue-400">
              <a 
                href="https://pplx.ai/neo_protocol" 
                target="_blank" 
                rel="noopener noreferrer"
                className="hover:text-blue-300 transition-colors"
              >
                &gt; Browser recomendado: Comet Browser
              </a>
            </div>
          </div>
        </div>
      </footer>

      {/* Formulário Modal */}
      {showForm && (
        <div className="fixed inset-0 bg-black bg-opacity-95 z-50 flex items-center justify-center p-4">
          <div className="bg-black border border-green-400 rounded-lg max-w-4xl w-full max-h-[90vh] overflow-y-auto">
            <div className="p-6">
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-green-400 text-xl font-bold">
                  🚀 SISTEMA DE LIBERAÇÃO PRO.IA
                </h2>
                <button
                  onClick={() => setShowForm(false)}
                  className="text-red-400 hover:text-red-300 text-2xl font-bold"
                >
                  ✕
                </button>
              </div>
              <Forms onComplete={handleFormComplete} />
            </div>
          </div>
        </div>
      )}

      {/* Resultado do Formulário */}
      {formCompleted && (
        <div className="fixed inset-0 bg-black bg-opacity-95 z-50 flex items-center justify-center p-4">
          <div className="bg-black border border-green-400 p-8 rounded-lg max-w-4xl w-full text-center">
            <div className="text-green-400 text-2xl font-bold mb-6">
              🎯 SISTEMA DESBLOQUEADO!
            </div>
            <div className="text-white text-lg mb-6">
              XP Total: {finalXp} pontos
            </div>
            <div className="text-green-400 text-lg mb-8">
              {finalXp >= 200 ? 
                "🎉 Liberação completa! Redirecionando para o Portal..." :
                finalXp >= 100 ?
                "✅ Liberação parcial! Abrindo WhatsApp para finalizar..." :
                "📞 Entre em contato via WhatsApp para liberação manual"
              }
            </div>
            {finalXp < 200 && (
              <button
                onClick={() => {
                  const whatsappMessage = encodeURIComponent(
                    `Quero liberação no Portal PRO.IA - XP: ${finalXp} pontos`
                  )
                  window.open(`https://wa.me/5562983231110?text=${whatsappMessage}`, '_blank')
                }}
                className="bg-green-400 text-black px-8 py-3 rounded-lg font-bold hover:bg-green-500 transition-colors mr-4"
              >
                📱 WhatsApp
              </button>
            )}
            <button
              onClick={() => {
                setFormCompleted(false)
                setFinalXp(0)
              }}
              className="bg-green-400 text-black px-8 py-3 rounded-lg font-bold hover:bg-green-500 transition-colors"
            >
              🔄 Reiniciar Sistema
            </button>
          </div>
        </div>
      )}
    </div>
  )
}