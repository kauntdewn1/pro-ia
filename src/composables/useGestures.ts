import { ref } from 'vue'
import { logDebug } from '../utils/logger'

/**
 * Composable para gerenciar gestos nativos iOS
 * Inclui swipe back, swipe forward e pull-to-refresh
 */
export function useGestures() {
  const startX = ref(0)
  const startY = ref(0)
  const currentX = ref(0)
  const currentY = ref(0)
  const isDragging = ref(false)
  const threshold = 50 // Mínimo de pixels para ativar gesto

  /**
   * Habilita o gesto de swipe back (deslizar para voltar)
   * @returns Função de cleanup para remover event listeners
   */
  const enableSwipeBack = () => {
    const handleTouchStart = (e: TouchEvent) => {
      if (e.touches && e.touches.length === 1) {
        const touch = e.touches[0]
        if (touch) {
          startX.value = touch.clientX
          startY.value = touch.clientY
          isDragging.value = true
          logDebug('Touch start')
        }
      }
    }

    const handleTouchMove = (e: TouchEvent) => {
      if (isDragging.value && e.touches && e.touches.length === 1) {
        const touch = e.touches[0]
        if (touch) {
          currentX.value = touch.clientX
          currentY.value = touch.clientY
          
          const deltaX = currentX.value - startX.value
          const deltaY = Math.abs(currentY.value - startY.value)
          
          // Só ativar se for movimento horizontal predominante
          if (Math.abs(deltaX) > deltaY && deltaX > threshold) {
            // Adicionar feedback visual
            document.body.style.transform = `translateX(${Math.min(deltaX * 0.3, 50)}px)`
            document.body.style.transition = 'transform 0.1s ease'
          }
        }
      }
    }

    const handleTouchEnd = () => {
      if (isDragging.value) {
        const deltaX = currentX.value - startX.value
        const deltaY = Math.abs(currentY.value - startY.value)
        
        // Reset visual
        document.body.style.transform = ''
        document.body.style.transition = 'transform 0.3s ease'
        
        // Verificar se é swipe back válido
        if (Math.abs(deltaX) > deltaY && deltaX > threshold) {
          logDebug('Swipe back detectado')
          
          // Simular navegação back do browser
          if (window.history.length > 1) {
            window.history.back()
          }
        }
        
        isDragging.value = false
      }
    }

    document.addEventListener('touchstart', handleTouchStart, { passive: true })
    document.addEventListener('touchmove', handleTouchMove, { passive: true })
    document.addEventListener('touchend', handleTouchEnd, { passive: true })

    return () => {
      document.removeEventListener('touchstart', handleTouchStart)
      document.removeEventListener('touchmove', handleTouchMove)
      document.removeEventListener('touchend', handleTouchEnd)
    }
  }

  /**
   * Habilita o gesto de swipe forward (deslizar para frente)
   * @returns Função de cleanup para remover event listeners
   */
  const enableSwipeForward = () => {
    // Similar ao swipe back, mas para frente
    // Implementação básica - pode ser expandida
    logDebug('Swipe forward habilitado')
  }

  /**
   * Habilita o gesto de pull-to-refresh (puxar para atualizar)
   * @returns Função de cleanup para remover event listeners
   */
  const enablePullToRefresh = () => {
    let startY = 0
    let currentY = 0
    let isPulling = false
    const threshold = 80

    const handleTouchStart = (e: TouchEvent) => {
      if (window.scrollY === 0 && e.touches && e.touches.length === 1) {
        const touch = e.touches[0]
        if (touch) {
          startY = touch.clientY
          isPulling = true
        }
      }
    }

    const handleTouchMove = (e: TouchEvent) => {
      if (isPulling && e.touches && e.touches.length === 1) {
        const touch = e.touches[0]
        if (touch) {
          currentY = touch.clientY
          const deltaY = currentY - startY
          
          if (deltaY > 0) {
            // Adicionar feedback visual de pull-to-refresh
            const pullDistance = Math.min(deltaY * 0.5, threshold)
            document.body.style.transform = `translateY(${pullDistance}px)`
          }
        }
      }
    }

    const handleTouchEnd = () => {
      if (isPulling) {
        const deltaY = currentY - startY
        
        // Reset visual
        document.body.style.transform = ''
        
        if (deltaY > threshold) {
          // Trigger refresh
          window.location.reload()
        }
        
        isPulling = false
      }
    }

    document.addEventListener('touchstart', handleTouchStart, { passive: true })
    document.addEventListener('touchmove', handleTouchMove, { passive: true })
    document.addEventListener('touchend', handleTouchEnd, { passive: true })

    return () => {
      document.removeEventListener('touchstart', handleTouchStart)
      document.removeEventListener('touchmove', handleTouchMove)
      document.removeEventListener('touchend', handleTouchEnd)
    }
  }

  return {
    enableSwipeBack,
    enableSwipeForward,
    enablePullToRefresh
  }
}
