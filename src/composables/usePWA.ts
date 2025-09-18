import { ref, onMounted } from 'vue'
import { logDebug } from '../utils/logger'

export function usePWA() {
  const updateAvailable = ref(false)
  const registration = ref<ServiceWorkerRegistration | null>(null)

  const registerSW = async () => {
    if ('serviceWorker' in navigator) {
      try {
        const reg = await navigator.serviceWorker.register('/sw.js')
        registration.value = reg
        logDebug('Service Worker registrado')

        // Verificar atualizações
        reg.addEventListener('updatefound', () => {
          const newWorker = reg.installing
          if (newWorker) {
            newWorker.addEventListener('statechange', () => {
              if (newWorker.state === 'installed' && navigator.serviceWorker.controller) {
                updateAvailable.value = true
                logDebug('Nova versão disponível!')
              }
            })
          }
        })
      } catch (error) {
        logDebug('Erro ao registrar Service Worker')
      }
    }
  }

  const updateSW = async () => {
    if (registration.value && registration.value.waiting) {
      registration.value.waiting.postMessage({ type: 'SKIP_WAITING' })
      window.location.reload()
    }
  }

  const installPrompt = ref<BeforeInstallPromptEvent | null>(null)
  const canInstall = ref(false)

  onMounted(() => {
    // Detectar prompt de instalação
    window.addEventListener('beforeinstallprompt', (e) => {
      e.preventDefault()
      installPrompt.value = e as BeforeInstallPromptEvent
      canInstall.value = true
      logDebug('App pode ser instalado')
    })

    // Detectar se já foi instalado
    window.addEventListener('appinstalled', () => {
      canInstall.value = false
      installPrompt.value = null
      logDebug('App instalado com sucesso!')
    })
  })

  const installApp = async () => {
    if (installPrompt.value) {
      installPrompt.value.prompt()
      const { outcome } = await installPrompt.value.userChoice
      logDebug('Resultado da instalação')
      
      if (outcome === 'accepted') {
        canInstall.value = false
        installPrompt.value = null
      }
    }
  }

  return {
    updateAvailable,
    updateSW,
    canInstall,
    installApp,
    registerSW
  }
}

// Tipos para TypeScript
interface BeforeInstallPromptEvent extends Event {
  prompt(): Promise<void>
  userChoice: Promise<{ outcome: 'accepted' | 'dismissed' }>
}
