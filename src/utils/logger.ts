export function logDebug(message: string) {
  if (import.meta.env.DEV) {
    console.log(`[DEBUG] ${message}`)
  }
}
