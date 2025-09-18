import { ref, onMounted, onUnmounted } from 'vue'
import { logDebug } from './src/utils/logger'

/**
 * Hook para gerenciar funcionalidades PWA (Progressive Web App)
 * @returns Objeto com estado e funções para instalação e atualização
 */
export function usePWA() {
  const updateAvailable = ref(false)
  const showInstallPrompt = ref(false)
  const deferredPrompt = ref<any>(null)

  // Check for PWA install prompt
  onMounted(() => {
    // Listen for beforeinstallprompt event
    window.addEventListener('beforeinstallprompt', handleBeforeInstallPrompt)
    
    // Check if already installed
    if (window.matchMedia('(display-mode: standalone)').matches) {
      showInstallPrompt.value = false
    }

    // Listen for app installed
    window.addEventListener('appinstalled', handleAppInstalled)
  })

  onUnmounted(() => {
    window.removeEventListener('beforeinstallprompt', handleBeforeInstallPrompt)
    window.removeEventListener('appinstalled', handleAppInstalled)
  })

  function handleBeforeInstallPrompt(e: Event) {
    e.preventDefault()
    deferredPrompt.value = e
    showInstallPrompt.value = true
  }

  function handleAppInstalled() {
    showInstallPrompt.value = false
    deferredPrompt.value = null
    logDebug('PWA installed successfully')
  }

  async function installPWA() {
    if (!deferredPrompt.value) return

    deferredPrompt.value.prompt()
    const { outcome } = await deferredPrompt.value.userChoice
    
    if (outcome === 'accepted') {
      logDebug('PWA install accepted')
    } else {
      logDebug('PWA install dismissed')
    }
    
    deferredPrompt.value = null
    showInstallPrompt.value = false
  }

  function updateApp() {
    if ('serviceWorker' in navigator) {
      navigator.serviceWorker.getRegistration().then((registration) => {
        if (registration && registration.waiting) {
          registration.waiting.postMessage({ type: 'SKIP_WAITING' })
        }
      })
    }
    updateAvailable.value = false
  }

  return {
    updateAvailable,
    showInstallPrompt,
    installPWA,
    updateApp
  }
}
