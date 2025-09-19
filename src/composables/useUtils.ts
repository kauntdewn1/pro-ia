import { ref } from 'vue'
import { logDebug } from '../utils/logger'

/**
 * Composable para utilitários gerais da aplicação
 * Inclui formatação, validação e helpers
 */
export function useUtils() {
  /**
   * Formata um número como moeda brasileira
   * @param value - Valor numérico
   * @returns String formatada como moeda
   */
  const formatCurrency = (value: number): string => {
    return new Intl.NumberFormat('pt-BR', {
      style: 'currency',
      currency: 'BRL'
    }).format(value)
  }

  /**
   * Formata um número com separadores de milhares
   * @param value - Valor numérico
   * @returns String formatada
   */
  const formatNumber = (value: number): string => {
    return new Intl.NumberFormat('pt-BR').format(value)
  }

  /**
   * Formata uma data para o padrão brasileiro
   * @param date - Data a ser formatada
   * @param options - Opções de formatação
   * @returns String formatada
   */
  const formatDate = (date: Date, options?: Intl.DateTimeFormatOptions): string => {
    const defaultOptions: Intl.DateTimeFormatOptions = {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric'
    }
    
    return new Intl.DateTimeFormat('pt-BR', { ...defaultOptions, ...options }).format(date)
  }

  /**
   * Valida se um email é válido
   * @param email - Email a ser validado
   * @returns Boolean indicando se é válido
   */
  const isValidEmail = (email: string): boolean => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    return emailRegex.test(email)
  }

  /**
   * Valida se um CPF é válido
   * @param cpf - CPF a ser validado
   * @returns Boolean indicando se é válido
   */
  const isValidCPF = (cpf: string): boolean => {
    const cleanCPF = cpf.replace(/\D/g, '')
    
    if (cleanCPF.length !== 11) return false
    if (/^(\d)\1{10}$/.test(cleanCPF)) return false
    
    let sum = 0
    for (let i = 0; i < 9; i++) {
      sum += parseInt(cleanCPF.charAt(i)) * (10 - i)
    }
    let remainder = (sum * 10) % 11
    if (remainder === 10 || remainder === 11) remainder = 0
    if (remainder !== parseInt(cleanCPF.charAt(9))) return false
    
    sum = 0
    for (let i = 0; i < 10; i++) {
      sum += parseInt(cleanCPF.charAt(i)) * (11 - i)
    }
    remainder = (sum * 10) % 11
    if (remainder === 10 || remainder === 11) remainder = 0
    if (remainder !== parseInt(cleanCPF.charAt(10))) return false
    
    return true
  }

  /**
   * Gera um ID único
   * @param prefix - Prefixo opcional para o ID
   * @returns String com ID único
   */
  const generateId = (prefix?: string): string => {
    const id = Math.random().toString(36).substr(2, 9)
    return prefix ? `${prefix}_${id}` : id
  }

  /**
   * Debounce para funções
   * @param func - Função a ser executada
   * @param delay - Delay em milissegundos
   * @returns Função com debounce
   */
  const debounce = <T extends (...args: any[]) => any>(
    func: T,
    delay: number
  ): ((...args: Parameters<T>) => void) => {
    let timeoutId: number
    
    return (...args: Parameters<T>) => {
      clearTimeout(timeoutId)
      timeoutId = setTimeout(() => func(...args), delay)
    }
  }

  /**
   * Throttle para funções
   * @param func - Função a ser executada
   * @param delay - Delay em milissegundos
   * @returns Função com throttle
   */
  const throttle = <T extends (...args: any[]) => any>(
    func: T,
    delay: number
  ): ((...args: Parameters<T>) => void) => {
    let lastCall = 0
    
    return (...args: Parameters<T>) => {
      const now = Date.now()
      if (now - lastCall >= delay) {
        lastCall = now
        func(...args)
      }
    }
  }

  /**
   * Copia texto para a área de transferência
   * @param text - Texto a ser copiado
   * @returns Promise<boolean> indicando sucesso
   */
  const copyToClipboard = async (text: string): Promise<boolean> => {
    try {
      await navigator.clipboard.writeText(text)
      logDebug(`Texto copiado: ${text}`)
      return true
    } catch (error) {
      logDebug(`Erro ao copiar texto: ${error}`)
      return false
    }
  }

  /**
   * Lê texto da área de transferência
   * @returns Promise<string> com o texto lido
   */
  const readFromClipboard = async (): Promise<string> => {
    try {
      const text = await navigator.clipboard.readText()
      logDebug(`Texto lido da área de transferência: ${text}`)
      return text
    } catch (error) {
      logDebug(`Erro ao ler da área de transferência: ${error}`)
      return ''
    }
  }

  /**
   * Estado para loading
   */
  const isLoading = ref(false)

  /**
   * Estado para erro
   */
  const error = ref<string | null>(null)

  /**
   * Executa uma função com loading e tratamento de erro
   * @param func - Função a ser executada
   * @returns Promise com o resultado
   */
  const executeWithLoading = async <T>(
    func: () => Promise<T>
  ): Promise<T | null> => {
    isLoading.value = true
    error.value = null
    
    try {
      const result = await func()
      logDebug('Operação executada com sucesso')
      return result
    } catch (err) {
      error.value = err instanceof Error ? err.message : 'Erro desconhecido'
      logDebug(`Erro na operação: ${error.value}`)
      return null
    } finally {
      isLoading.value = false
    }
  }

  return {
    // Formatação
    formatCurrency,
    formatNumber,
    formatDate,
    
    // Validação
    isValidEmail,
    isValidCPF,
    
    // Utilitários
    generateId,
    debounce,
    throttle,
    copyToClipboard,
    readFromClipboard,
    
    // Estado
    isLoading,
    error,
    executeWithLoading
  }
}
