import { ref, onMounted, onUnmounted } from 'vue'
import { useRouter } from 'vue-router'
import { logDebug } from './src/utils/logger'

/**
 * Hook para capturar e lidar com gestos de swipe no mobile
 * @returns Objeto com estado de drag e coordenadas
 */
export function useSwipeGestures() {
  const router = useRouter()
  const startX = ref(0)
  const startY = ref(0)
  const currentX = ref(0)
  const currentY = ref(0)
  const isDragging = ref(false)

  const handleTouchStart = (e: TouchEvent) => {
    const touch = e.touches[0]
    startX.value = touch.clientX
    startY.value = touch.clientY
    isDragging.value = true
  }

  const handleTouchMove = (e: TouchEvent) => {
    if (!isDragging.value) return
    
    const touch = e.touches[0]
    currentX.value = touch.clientX
    currentY.value = touch.clientY
  }

  const handleTouchEnd = () => {
    if (!isDragging.value) return

    const deltaX = currentX.value - startX.value
    const deltaY = currentY.value - startY.value
    const minSwipeDistance = 50

    // Horizontal swipe (left/right)
    if (Math.abs(deltaX) > Math.abs(deltaY) && Math.abs(deltaX) > minSwipeDistance) {
      if (deltaX > 0) {
        // Swipe right - go back
        router.back()
      } else {
        // Swipe left - could implement forward navigation
        logDebug('Swipe left detected')
      }
    }

    // Vertical swipe (up/down)
    if (Math.abs(deltaY) > Math.abs(deltaX) && Math.abs(deltaY) > minSwipeDistance) {
      if (deltaY > 0) {
        // Swipe down - could implement pull to refresh
        logDebug('Swipe down detected')
      } else {
        // Swipe up - could implement scroll to top
        logDebug('Swipe up detected')
      }
    }

    isDragging.value = false
  }

  onMounted(() => {
    document.addEventListener('touchstart', handleTouchStart, { passive: true })
    document.addEventListener('touchmove', handleTouchMove, { passive: true })
    document.addEventListener('touchend', handleTouchEnd, { passive: true })
  })

  onUnmounted(() => {
    document.removeEventListener('touchstart', handleTouchStart)
    document.removeEventListener('touchmove', handleTouchMove)
    document.removeEventListener('touchend', handleTouchEnd)
  })

  return {
    isDragging,
    startX,
    startY,
    currentX,
    currentY
  }
}

/**
 * Hook para implementar funcionalidade de pull-to-refresh
 * @returns Objeto com estado de refresh e distância do pull
 */
export function usePullToRefresh() {
  const isRefreshing = ref(false)
  const pullDistance = ref(0)
  const startY = ref(0)
  const isPulling = ref(false)

  const handleTouchStart = (e: TouchEvent) => {
    if (window.scrollY === 0) {
      startY.value = e.touches[0].clientY
      isPulling.value = true
    }
  }

  const handleTouchMove = (e: TouchEvent) => {
    if (!isPulling.value) return

    const currentY = e.touches[0].clientY
    const deltaY = currentY - startY.value

    if (deltaY > 0) {
      pullDistance.value = Math.min(deltaY * 0.5, 100)
    }
  }

  const handleTouchEnd = () => {
    if (isPulling.value && pullDistance.value > 50) {
      isRefreshing.value = true
      // Simulate refresh
      setTimeout(() => {
        isRefreshing.value = false
        pullDistance.value = 0
        window.location.reload()
      }, 1000)
    }
    
    isPulling.value = false
    pullDistance.value = 0
  }

  onMounted(() => {
    document.addEventListener('touchstart', handleTouchStart, { passive: true })
    document.addEventListener('touchmove', handleTouchMove, { passive: true })
    document.addEventListener('touchend', handleTouchEnd, { passive: true })
  })

  onUnmounted(() => {
    document.removeEventListener('touchstart', handleTouchStart)
    document.removeEventListener('touchmove', handleTouchMove)
    document.removeEventListener('touchend', handleTouchEnd)
  })

  return {
    isRefreshing,
    pullDistance,
    isPulling
  }
}
