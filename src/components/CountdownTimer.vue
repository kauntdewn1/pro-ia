<template>
  <div class="ios-card p-6 text-center">
    <h3 class="text-2xl font-bold text-ios-text-primary mb-4">
      {{ title }}
    </h3>
    
    <div class="flex justify-center gap-4 mb-6">
      <div class="text-center">
        <div class="text-4xl font-bold text-ios-blue">{{ days }}</div>
        <div class="text-sm text-ios-text-secondary">Dias</div>
      </div>
      <div class="text-center">
        <div class="text-4xl font-bold text-ios-blue">{{ hours }}</div>
        <div class="text-sm text-ios-text-secondary">Horas</div>
      </div>
      <div class="text-center">
        <div class="text-4xl font-bold text-ios-blue">{{ minutes }}</div>
        <div class="text-sm text-ios-text-secondary">Min</div>
      </div>
      <div class="text-center">
        <div class="text-4xl font-bold text-ios-blue">{{ seconds }}</div>
        <div class="text-sm text-ios-text-secondary">Seg</div>
      </div>
    </div>
    
    <div v-if="isExpired" class="text-red-500 font-semibold">
      ⏰ Oferta Expirada!
    </div>
    
    <div v-else class="text-ios-text-secondary text-sm">
      Restam apenas {{ totalTime }} para aproveitar esta oportunidade
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted, onUnmounted } from 'vue'

interface Props {
  targetDate: string | Date
  title?: string
}

const props = withDefaults(defineProps<Props>(), {
  title: 'Oferta por Tempo Limitado'
})

const now = ref(new Date())
const target = ref(new Date(props.targetDate))
const isExpired = ref(false)

let interval: number | null = null

const timeLeft = computed(() => {
  const diff = target.value.getTime() - now.value.getTime()
  return Math.max(0, diff)
})

const days = computed(() => Math.floor(timeLeft.value / (1000 * 60 * 60 * 24)))
const hours = computed(() => Math.floor((timeLeft.value % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)))
const minutes = computed(() => Math.floor((timeLeft.value % (1000 * 60 * 60)) / (1000 * 60)))
const seconds = computed(() => Math.floor((timeLeft.value % (1000 * 60)) / 1000))

const totalTime = computed(() => {
  if (days.value > 0) return `${days.value} dias`
  if (hours.value > 0) return `${hours.value} horas`
  if (minutes.value > 0) return `${minutes.value} minutos`
  return `${seconds.value} segundos`
})

const updateTimer = () => {
  now.value = new Date()
  if (timeLeft.value <= 0) {
    isExpired.value = true
    if (interval) {
      clearInterval(interval)
      interval = null
    }
  }
}

onMounted(() => {
  updateTimer()
  interval = setInterval(updateTimer, 1000)
})

onUnmounted(() => {
  if (interval) {
    clearInterval(interval)
  }
})
</script>
