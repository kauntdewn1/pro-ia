import { ref, computed } from 'vue'
import { logDebug } from '../utils/logger'

/**
 * Composable para gerenciar o estado global da aplicação
 * Inclui clock, bateria, navegação e configurações
 */
export function useAppState() {
  // Estado do clock
  const time = ref(new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }))
  
  // Estado da bateria
  const batteryLevel = ref(76) // default fake %
  
  // Estado de navegação
  const isNavigating = ref(false)
  const navigationHistory = ref<string[]>([])
  
  // Configurações do app
  const settings = ref({
    darkMode: true,
    animations: true,
    hapticFeedback: true,
    soundEffects: false
  })

  /**
   * Atualiza o relógio a cada minuto
   */
  const updateClock = () => {
    const now = new Date()
    time.value = now.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    logDebug(`Clock atualizado: ${time.value}`)
  }

  /**
   * Simula variação da bateria
   */
  const simulateBattery = () => {
    setInterval(() => {
      batteryLevel.value = Math.max(10, Math.min(100, batteryLevel.value + (Math.random() * 4 - 2)))
      logDebug(`Bateria: ${batteryLevel.value}%`)
    }, 60000)
  }

  /**
   * Adiciona uma rota ao histórico de navegação
   * @param route - Nome da rota
   */
  const addToHistory = (route: string) => {
    navigationHistory.value.push(route)
    logDebug(`Rota adicionada ao histórico: ${route}`)
  }

  /**
   * Remove a última rota do histórico
   */
  const removeLastFromHistory = () => {
    if (navigationHistory.value.length > 0) {
      const removed = navigationHistory.value.pop()
      logDebug(`Rota removida do histórico: ${removed}`)
    }
  }

  /**
   * Limpa o histórico de navegação
   */
  const clearHistory = () => {
    navigationHistory.value = []
    logDebug('Histórico de navegação limpo')
  }

  /**
   * Atualiza uma configuração específica
   * @param key - Chave da configuração
   * @param value - Novo valor
   */
  const updateSetting = (key: keyof typeof settings.value, value: boolean) => {
    settings.value[key] = value
    logDebug(`Configuração atualizada: ${key} = ${value}`)
  }

  /**
   * Computed para verificar se há histórico de navegação
   */
  const hasHistory = computed(() => navigationHistory.value.length > 0)

  /**
   * Computed para obter a última rota visitada
   */
  const lastRoute = computed(() => 
    navigationHistory.value[navigationHistory.value.length - 1] || null
  )

  /**
   * Computed para verificar se a bateria está baixa
   */
  const isLowBattery = computed(() => batteryLevel.value < 20)

  /**
   * Computed para obter o status da bateria
   */
  const batteryStatus = computed(() => {
    if (batteryLevel.value > 50) return 'good'
    if (batteryLevel.value > 20) return 'warning'
    return 'critical'
  })

  return {
    // Estado reativo
    time,
    batteryLevel,
    isNavigating,
    navigationHistory,
    settings,
    
    // Computed
    hasHistory,
    lastRoute,
    isLowBattery,
    batteryStatus,
    
    // Métodos
    updateClock,
    simulateBattery,
    addToHistory,
    removeLastFromHistory,
    clearHistory,
    updateSetting
  }
}
