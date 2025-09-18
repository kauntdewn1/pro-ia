<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { usePWA } from './composables/usePWA.ts'
import { useGestures } from './composables/useGestures.ts'

// PWA setup
const { registerSW } = usePWA()

// Gestos nativos
const { enableSwipeBack, enableSwipeForward } = useGestures()

const route = useRoute()
const router = useRouter()

onMounted(() => {
  registerSW()
  enableSwipeBack()
  enableSwipeForward()
  updateClock()
  simulateBattery()
})

// Fake clock
const time = ref(new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }))
function updateClock() {
  const now = new Date()
  time.value = now.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
  setTimeout(updateClock, 60000)
}

// Inicializar clock imediatamente
updateClock()

// Fake battery
const batteryLevel = ref(76) // default fake %
function simulateBattery() {
  setInterval(() => {
    batteryLevel.value = Math.max(10, Math.min(100, batteryLevel.value + (Math.random() * 4 - 2)))
  }, 60000)
}

const goBack = () => {
  router.back()
}
</script>

<template>
  <div id="app" class="ios-dynamic-bg">
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
          v-if="route.name !== 'Home'"
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
  </div>
</template>

<style>
/* Global styles are in style.css */
</style>
