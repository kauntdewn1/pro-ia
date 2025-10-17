'use client'

import { useState } from 'react'

interface Question {
  title: string
  question: string
  options: string[]
}

interface FormsProps {
  onComplete?: (answers: string[], xp: number) => void
}

export default function Forms({ onComplete }: FormsProps) {
  const [currentStep, setCurrentStep] = useState(0)
  const [answers, setAnswers] = useState<string[]>([])
  const [xp, setXp] = useState(0)
  const [selectedAnswer, setSelectedAnswer] = useState<string | null>(null)

  // Perguntas do formulário
  const questions: Question[] = [
    {
      title: "INICIALIZAÇÃO DE PERFIL",
      question: "Você já tentou vender algo online?",
      options: [
        "Nunca tentei",
        "Fiz algumas vendas",
        "Vendo todo dia mas quero escalar",
        "Tentei de tudo e não consegui"
      ]
    },
    {
      title: "FOCO E DIREÇÃO",
      question: "Qual dessas situações descreve melhor seu momento agora?",
      options: [
        "Tenho ideias, mas não consigo começar",
        "Começo projetos e não mantenho consistência",
        "Tenho fluxo mas falta estratégia",
        "Estou escalando e quero automatizar com IA"
      ]
    },
    {
      title: "MENTE E PROCESSO",
      question: "Quando você pensa em IA, o que sente primeiro?",
      options: [
        "Curiosidade e vontade de aprender",
        "Medo de ficar pra trás",
        "Confusão — parece complexo demais",
        "Empolgação — quero usar pra faturar mais"
      ]
    },
    {
      title: "AUTONOMIA DIGITAL",
      question: "Quanto controle você sente que tem sobre suas vendas hoje?",
      options: [
        "Nenhum — dependo de terceiros",
        "Parcial — uso ferramentas básicas",
        "Bom — faço tudo, mas gasto muito tempo",
        "Total — quero agora otimizar com automação"
      ]
    },
    {
      title: "ESTILO DE APRENDIZADO",
      question: "Como você aprende mais rápido?",
      options: [
        "Assistindo exemplos reais",
        "Fazendo na prática",
        "Lendo e estudando o conceito",
        "Sendo desafiado e testado"
      ]
    },
    {
      title: "VISÃO DE FUTURO",
      question: "Se o PRO.IA te entregasse uma vantagem imediata, qual você escolheria?",
      options: [
        "Faturar com automações no WhatsApp",
        "Criar conteúdo com IA de forma profissional",
        "Vender produtos físicos/digitais com IA",
        "Montar um sistema de negócios descentralizado"
      ]
    },
    {
      title: "COMPROMETIMENTO",
      question: "O quanto você está disposto a aplicar o que aprender aqui?",
      options: [
        "Quero só conhecer o básico",
        "Quero testar algumas ideias",
        "Vou aplicar no meu negócio real",
        "Estou pronto pra dominar o protocolo"
      ]
    },
    {
      title: "IDENTIDADE",
      question: "Quando alguém fala de você, o que você gostaria que dissessem?",
      options: [
        "Tem visão e faz acontecer",
        "Sabe usar IA pra crescer",
        "É referência no que faz",
        "Transforma tudo em oportunidade"
      ]
    }
  ]

  const handleAnswer = (answer: string) => {
    setSelectedAnswer(answer)
    
    // Pequeno delay para mostrar a seleção antes de avançar
    setTimeout(() => {
      const newAnswers = [...answers, answer]
      setAnswers(newAnswers)
      
      // Sistema de XP baseado nas respostas corretas
      let xpGain = 0
      const currentQuestion = questions[currentStep]
      
      // XP baseado no índice da resposta (primeira opção = mais XP)
      const answerIndex = currentQuestion.options.indexOf(answer)
      if (answerIndex === 0) xpGain = 50
      else if (answerIndex === 1) xpGain = 40
      else if (answerIndex === 2) xpGain = 30
      else xpGain = 20
      
      setXp(prevXp => prevXp + xpGain)
      
      if (currentStep < questions.length - 1) {
        setCurrentStep(currentStep + 1)
        setSelectedAnswer(null) // Limpar seleção para próxima pergunta
      } else {
        // Formulário completo - usar o XP total atualizado
        if (onComplete) {
          onComplete(newAnswers, xp + xpGain)
        }
      }
    }, 300)
  }

  const handleBack = () => {
    if (currentStep > 0) {
      // Remover o XP da resposta anterior
      const previousAnswer = answers[answers.length - 1]
      const previousQuestion = questions[currentStep - 1]
      const answerIndex = previousQuestion.options.indexOf(previousAnswer)
      
      let xpToRemove = 0
      if (answerIndex === 0) xpToRemove = 50
      else if (answerIndex === 1) xpToRemove = 40
      else if (answerIndex === 2) xpToRemove = 30
      else xpToRemove = 20
      
      setXp(prevXp => prevXp - xpToRemove)
      setCurrentStep(currentStep - 1)
      setAnswers(answers.slice(0, -1))
      setSelectedAnswer(null) // Limpar seleção
    }
  }

  const handleRestart = () => {
    setCurrentStep(0)
    setAnswers([])
    setXp(0)
    setSelectedAnswer(null) // Limpar seleção
  }

  // Removido o return null para permitir que o formulário apareça

  if (currentStep > questions.length) {
    return null // Formulário completo
  }

  const currentQuestion = questions[currentStep]

  return (
    <div className="bg-black border border-green-400 p-4 sm:p-6 lg:p-8 rounded-lg space-y-3 text-left text-sm sm:text-base lg:text-lg max-w-4xl mx-auto">
      {/* Header do Formulário */}
      <div className="text-green-400 space-y-2">
        <div className="animate-pulse text-center text-lg sm:text-xl font-bold">
          {currentQuestion.title}
        </div>
        <div className="text-center text-sm text-white/80">
          Pergunta {currentStep + 1} de {questions.length}
        </div>
      </div>

      {/* Barra de Progresso */}
      <div className="w-full bg-green-400/20 rounded-full h-2 mb-6">
        <div 
          className="bg-green-400 h-2 rounded-full transition-all duration-500 animate-pulse"
          style={{ width: `${((currentStep + 1) / questions.length) * 100}%` }}
        ></div>
      </div>

      {/* Pergunta */}
      <div className="text-white space-y-4">
        <div className="text-center text-lg sm:text-xl font-bold mb-6">
          {currentQuestion.question}
        </div>

        {/* Opções */}
        <div className="space-y-3">
          {currentQuestion.options.map((option, index) => (
            <button
              key={index}
              onClick={() => handleAnswer(option)}
              className={`w-full border p-4 rounded-lg text-left transition-all duration-300 hover:scale-105 ${
                selectedAnswer === option
                  ? 'bg-green-400 text-black border-green-300'
                  : 'bg-black border-green-400 hover:bg-green-400 hover:text-black'
              }`}
            >
              <div className="flex items-center">
                <span className={`w-2 h-2 rounded-full mr-3 ${
                  selectedAnswer === option ? 'bg-black' : 'bg-green-400'
                }`}></span>
                {option}
              </div>
            </button>
          ))}
        </div>
      </div>

      {/* XP Display */}
      <div className="text-center mt-6">
        <div className="bg-black border border-green-400 rounded-lg p-4">
          <div className="text-green-400 font-bold mb-2">XP ATUAL</div>
          <div className="text-white text-2xl font-bold">{xp}</div>
          <div className="text-white/60 text-sm">Continue respondendo para ganhar mais XP!</div>
        </div>
      </div>

      {/* Navegação */}
      <div className="flex justify-between mt-6">
        <button
          onClick={handleBack}
          className="bg-green-400 text-black px-4 py-2 rounded-lg font-bold hover:scale-105 transition-all duration-300"
        >
          ← Voltar
        </button>
        <button
          onClick={handleRestart}
          className="bg-green-400 text-black px-4 py-2 rounded-lg font-bold hover:scale-105 transition-all duration-300"
        >
          Reiniciar
        </button>
      </div>
    </div>
  )
}
