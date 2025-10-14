/**
 * Sistema de logging para desenvolvimento
 * @param message - Mensagem de debug a ser logada
 */
export function logDebug(message: string): void {
  if (import.meta.env.DEV) {
    console.log(`[DEBUG] ${message}`)
  }
}

/**
 * Sistema de logging para produção
 * @param message - Mensagem a ser logada
 * @param level - Nível do log (info, warn, error)
 */
export function log(message: string, level: 'info' | 'warn' | 'error' = 'info'): void {
  if (import.meta.env.DEV) {
    console[level](`[${level.toUpperCase()}] ${message}`)
  }
  // Em produção, você pode enviar para um serviço de logging
  // como Sentry, LogRocket, etc.
}
