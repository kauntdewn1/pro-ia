<script setup lang="ts">
import { onMounted } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { usePWA } from './composables/usePWA.ts'
import { useGestures } from './composables/useGestures.ts'
import { useAppState } from './composables/useAppState.ts'
import BottomBar from './components/BottomBar.vue'

// PWA setup
const { registerSW } = usePWA()

// Gestos nativos
const { enableSwipeBack, enableSwipeForward } = useGestures()

// Estado da aplicação
const { 
  time, 
  batteryLevel, 
  updateClock, 
  simulateBattery,
  addToHistory,
  hasHistory 
} = useAppState()

const route = useRoute()
const router = useRouter()

onMounted(() => {
  registerSW()
  enableSwipeBack()
  enableSwipeForward()
  updateClock()
  simulateBattery()
  
  // Adicionar rota atual ao histórico
  if (route.name) {
    addToHistory(route.name as string)
  }
})

/**
 * Navega para a página anterior
 */
const goBack = () => {
  router.back()
}
</script>

<template>
  <div id="app" class="proia-bg">
    <!-- Status Bar Fake -->
    <div class="ios-statusbar ios-safe-area flex items-center justify-between px-4 py-1 text-xs text-white">
      <span>{{ time }}</span>
      <div class="flex items-center gap-1">
        <span>📶</span>
        <span>📡</span>
      </div>
      <div class="flex items-center gap-1">
        <span>{{ batteryLevel }}%</span>
        <div class="battery">
          <div class="battery-level" :style="{ width: batteryLevel + '%' }"></div>
        </div>
      </div>
    </div>

    <!-- Header iOS -->
    <nav class="ios-navbar-dark ios-safe-area">
      <div class="flex items-center gap-2">
        <button
          v-show="hasHistory"
          @click="goBack"
          class="ios-btn text-sm px-3 py-1"
        >
          ← Voltar
        </button>
        <span class="font-semibold text-ios-blue text-lg">PRO.IA</span>
      </div>
    </nav>

    <!-- Conteúdo principal com transições iOS -->
    <main class="ios-content">
      <router-view v-slot="{ Component }">
        <transition name="ios-slide" mode="out-in">
          <component :is="Component" />
        </transition>
      </router-view>
    </main>

    <!-- Bottom Bar Navigation -->
    <BottomBar />
  </div>
</template>

<style>
/* Global styles are in style.css */
</style>
