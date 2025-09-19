<template>
  <div class="circuit-pattern" :class="patternClasses">
    <svg 
      :width="width" 
      :height="height" 
      viewBox="0 0 200 200" 
      class="absolute inset-0 w-full h-full"
    >
      <defs>
        <pattern id="circuit" x="0" y="0" width="40" height="40" patternUnits="userSpaceOnUse">
          <path
            d="M0,20 L10,20 L10,10 L30,10 L30,20 L40,20 M20,0 L20,10 M20,30 L20,40"
            :stroke="color"
            stroke-width="1"
            fill="none"
            opacity="0.3"
          />
          <circle cx="10" cy="20" r="1" :fill="color" opacity="0.5" />
          <circle cx="30" cy="20" r="1" :fill="color" opacity="0.5" />
          <circle cx="20" cy="10" r="1" :fill="color" opacity="0.5" />
          <circle cx="20" cy="30" r="1" :fill="color" opacity="0.5" />
        </pattern>
      </defs>
      <rect width="100%" height="100%" fill="url(#circuit)" />
    </svg>
    
    <!-- Partículas animadas -->
    <div 
      v-for="particle in particles" 
      :key="particle.id"
      class="particle absolute w-1 h-1 bg-ios-blue rounded-full animate-pulse"
      :style="{
        left: particle.x + '%',
        top: particle.y + '%',
        animationDelay: particle.delay + 's',
        animationDuration: particle.duration + 's'
      }"
    ></div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted } from 'vue'

interface Props {
  width?: number
  height?: number
  color?: string
  animated?: boolean
  opacity?: number
}

const props = withDefaults(defineProps<Props>(), {
  width: 200,
  height: 200,
  color: '#007AFF',
  animated: true,
  opacity: 0.1
})

interface Particle {
  id: number
  x: number
  y: number
  delay: number
  duration: number
}

const particles = ref<Particle[]>([])

const patternClasses = computed(() => {
  const base = 'relative overflow-hidden'
  const animated = props.animated ? 'animate-pulse' : ''
  return `${base} ${animated}`
})

const generateParticles = () => {
  const count = 20
  particles.value = []
  
  for (let i = 0; i < count; i++) {
    particles.value.push({
      id: i,
      x: Math.random() * 100,
      y: Math.random() * 100,
      delay: Math.random() * 3,
      duration: 2 + Math.random() * 3
    })
  }
}

onMounted(() => {
  if (props.animated) {
    generateParticles()
  }
})
</script>

<style scoped>
.circuit-pattern {
  background: linear-gradient(45deg, transparent 49%, v-bind(color) 50%, transparent 51%);
  background-size: 20px 20px;
}

.particle {
  animation: float linear infinite;
}

@keyframes float {
  0%, 100% {
    transform: translateY(0) scale(1);
    opacity: 0.3;
  }
  50% {
    transform: translateY(-20px) scale(1.2);
    opacity: 0.8;
  }
}
</style>
