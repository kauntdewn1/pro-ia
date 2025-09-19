<template>
  <!-- Bottom Bar Navigation iOS-like -->
  <nav class="ios-bottom-bar">
    <div class="bottom-bar-content">
      <button
        v-for="tab in visibleTabs"
        :key="tab.name"
        @click="navigateTo(tab.route)"
        :class="[
          'ios-tab-button',
          { 'ios-tab-active': currentRoute === tab.route }
        ]"
      >
        <div class="ios-tab-icon">
          <span class="text-xl">{{ tab.icon }}</span>
        </div>
        <span class="ios-tab-label">{{ tab.label }}</span>
      </button>

      <!-- Aba "Mais" se houver tabs extras -->
      <button
        v-if="hasMoreTabs"
        @click="toggleMoreMenu"
        :class="[
          'ios-tab-button',
          { 'ios-tab-active': showMoreMenu }
        ]"
      >
        <div class="ios-tab-icon">
          <span class="text-xl">⋯</span>
        </div>
        <span class="ios-tab-label">Mais</span>
      </button>
    </div>

    <!-- Menu "Mais" Modal iOS-like -->
    <Transition name="ios-modal">
      <div
        v-if="showMoreMenu"
        class="ios-modal-overlay"
        @click="closeMoreMenu"
      >
        <div class="ios-modal" @click.stop>
          <div class="ios-modal-header">
            <h3 class="ios-modal-title">Mais Opções</h3>
            <button @click="closeMoreMenu" class="ios-modal-close">
              <span class="text-xl">×</span>
            </button>
          </div>
          <div class="ios-modal-content">
            <button
              v-for="tab in extraTabs"
              :key="tab.name"
              @click="navigateTo(tab.route)"
              class="ios-modal-item"
            >
              <span class="text-xl mr-3">{{ tab.icon }}</span>
              <span>{{ tab.label }}</span>
            </button>
          </div>
        </div>
      </div>
    </Transition>
  </nav>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue'
import { useRouter, useRoute } from 'vue-router'

interface Tab {
  name: string
  label: string
  icon: string
  route: string
}

const router = useRouter()
const route = useRoute()

// Configuração das tabs
const allTabs: Tab[] = [
  {
    name: 'home',
    label: 'Início',
    icon: '🏠',
    route: '/'
  },
  {
    name: 'authority',
    label: 'Autoridade',
    icon: '👨‍💼',
    route: '/authority'
  },
  {
    name: 'opportunity',
    label: 'Oportunidade',
    icon: '💰',
    route: '/opportunity'
  },
  {
    name: 'learn',
    label: 'Aprender',
    icon: '📚',
    route: '/learn'
  },
  {
    name: 'vip',
    label: 'VIP',
    icon: '⭐',
    route: '/vip'
  },
  {
    name: 'urgency',
    label: 'Urgência',
    icon: '⏰',
    route: '/urgency'
  },
  {
    name: 'about',
    label: 'Sobre',
    icon: 'ℹ️',
    route: '/about'
  }
]

const showMoreMenu = ref(false)

// Computed properties
const currentRoute = computed(() => route.path)

const visibleTabs = computed(() => allTabs.slice(0, 4))
const extraTabs = computed(() => allTabs.slice(4))
const hasMoreTabs = computed(() => allTabs.length > 4)

// Métodos
const navigateTo = (routePath: string) => {
  router.push(routePath)
  closeMoreMenu()
}

const toggleMoreMenu = () => {
  showMoreMenu.value = !showMoreMenu.value
}

const closeMoreMenu = () => {
  showMoreMenu.value = false
}
</script>

<style scoped>
/* =========================
   iOS Bottom Bar
   ========================= */
.ios-bottom-bar {
  @apply fixed bottom-0 left-0 right-0 z-50;
  background: linear-gradient(135deg, rgba(27, 19, 48, 0.95), rgba(56, 31, 87, 0.8), transparent);
  backdrop-filter: blur(20px) saturate(180%);
  -webkit-backdrop-filter: blur(20px) saturate(180%);
  border-top: 1px solid rgba(0, 122, 255, 0.2);
  padding-bottom: env(safe-area-inset-bottom);
  box-shadow: 0 -4px 20px rgba(0, 0, 0, 0.1);
}

.bottom-bar-content {
  @apply flex items-center justify-around px-2 py-3;
  max-width: 100%;
}

/* =========================
   iOS Tab Buttons
   ========================= */
.ios-tab-button {
  @apply flex flex-col items-center justify-center px-3 py-2 rounded-2xl transition-all duration-300;
  min-width: 60px;
  min-height: 60px;
  font-family: 'Avenir Next', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', sans-serif;
  color: rgba(255, 255, 255, 0.6);
}

.ios-tab-button:active {
  transform: scale(0.95);
}

.ios-tab-button:hover {
  background: rgba(255, 255, 255, 0.05);
  color: rgba(255, 255, 255, 0.8);
}

.ios-tab-active {
  background: linear-gradient(135deg, rgba(0, 122, 255, 0.2), rgba(0, 212, 255, 0.1));
  color: var(--proia-ios-blue);
  box-shadow: 0 0 20px rgba(0, 122, 255, 0.3);
}

.ios-tab-active .ios-tab-icon {
  transform: scale(1.1);
}

.ios-tab-icon {
  @apply flex items-center justify-center mb-1;
  transition: all 0.3s cubic-bezier(0.25, 0.8, 0.5, 1);
}

.ios-tab-label {
  @apply text-xs font-medium;
  font-family: 'Avenir Next', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', sans-serif;
}

/* =========================
   iOS Modal
   ========================= */
.ios-modal-overlay {
  @apply fixed inset-0 z-50 flex items-end justify-center;
  background: rgba(0, 0, 0, 0.4);
  backdrop-filter: blur(12px);
  -webkit-backdrop-filter: blur(12px);
}

.ios-modal {
  @apply w-full max-w-md mx-4 mb-20 rounded-3xl;
  background: linear-gradient(135deg, rgba(27, 19, 48, 0.95), rgba(56, 31, 87, 0.9));
  backdrop-filter: blur(20px) saturate(180%);
  -webkit-backdrop-filter: blur(20px) saturate(180%);
  border: 1px solid rgba(0, 122, 255, 0.2);
  box-shadow: 0 20px 40px rgba(0, 0, 0, 0.3);
}

.ios-modal-header {
  @apply flex items-center justify-between p-6 border-b border-gray-700/30;
}

.ios-modal-title {
  @apply text-lg font-semibold;
  color: var(--proia-ios-white);
  font-family: 'Avenir Next', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', sans-serif;
}

.ios-modal-close {
  @apply w-8 h-8 flex items-center justify-center rounded-full;
  background: rgba(255, 255, 255, 0.1);
  color: var(--proia-ios-white);
  transition: all 0.3s cubic-bezier(0.25, 0.8, 0.5, 1);
}

.ios-modal-close:active {
  transform: scale(0.9);
  background: rgba(255, 255, 255, 0.2);
}

.ios-modal-content {
  @apply p-4 space-y-1;
}

.ios-modal-item {
  @apply flex items-center w-full p-4 rounded-2xl transition-all duration-300;
  color: var(--proia-ios-white);
  font-family: 'Avenir Next', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', sans-serif;
}

.ios-modal-item:active {
  background: linear-gradient(135deg, rgba(0, 122, 255, 0.2), rgba(0, 212, 255, 0.1));
  transform: scale(0.98);
}

.ios-modal-item:hover {
  background: rgba(255, 255, 255, 0.05);
}

/* =========================
   iOS Modal Transitions
   ========================= */
.ios-modal-enter-active,
.ios-modal-leave-active {
  transition: all 0.4s cubic-bezier(0.25, 0.8, 0.5, 1);
}

.ios-modal-enter-from {
  opacity: 0;
  transform: translateY(100%);
}

.ios-modal-leave-to {
  opacity: 0;
  transform: translateY(100%);
}

/* =========================
   Responsividade Desktop
   ========================= */
@media (min-width: 1024px) {
  .ios-bottom-bar {
    @apply left-auto right-0 top-0 bottom-auto w-20 h-full;
    border-top: none;
    border-left: 1px solid rgba(0, 122, 255, 0.2);
    padding-bottom: 0;
    background: linear-gradient(180deg, rgba(27, 19, 48, 0.95), rgba(56, 31, 87, 0.8), transparent);
  }
  
  .bottom-bar-content {
    @apply flex-col space-y-4 p-4;
  }
  
  .ios-tab-button {
    @apply w-full;
    min-width: auto;
    min-height: 80px;
  }
  
  .ios-modal {
    @apply left-20 right-auto top-0 bottom-0 w-80;
    margin: 0;
    border-radius: 0;
    border-left: 1px solid rgba(0, 122, 255, 0.2);
  }
  
  .ios-modal-enter-from {
    transform: translateX(100%);
  }
  
  .ios-modal-leave-to {
    transform: translateX(100%);
  }
}
</style>
