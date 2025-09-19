<template>
  <div class="glitch-container">
    <h1 
      :class="textClasses"
      :data-text="text"
      @mouseenter="startGlitch"
      @mouseleave="stopGlitch"
    >
      {{ text }}
    </h1>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted, onUnmounted } from 'vue'

interface Props {
  text: string
  size?: 'sm' | 'md' | 'lg' | 'xl'
  color?: 'primary' | 'secondary' | 'accent'
}

const props = withDefaults(defineProps<Props>(), {
  size: 'lg',
  color: 'primary'
})

const isGlitching = ref(false)
let glitchInterval: number | null = null

const textClasses = computed(() => {
  const base = 'glitch-text font-bold'
  
  const sizes = {
    sm: 'text-2xl',
    md: 'text-4xl',
    lg: 'text-6xl',
    xl: 'text-8xl'
  }
  
  const colors = {
    primary: 'text-ios-blue',
    secondary: 'text-ios-text-primary',
    accent: 'text-ios-accent'
  }
  
  return `${base} ${sizes[props.size]} ${colors[props.color]}`
})

const startGlitch = () => {
  if (glitchInterval) return
  
  isGlitching.value = true
  glitchInterval = setInterval(() => {
    // Glitch effect será aplicado via CSS
  }, 100)
}

const stopGlitch = () => {
  if (glitchInterval) {
    clearInterval(glitchInterval)
    glitchInterval = null
  }
  isGlitching.value = false
}

onMounted(() => {
  // Auto-glitch ocasional
  const autoGlitch = () => {
    if (Math.random() < 0.1) {
      startGlitch()
      setTimeout(stopGlitch, 500)
    }
    setTimeout(autoGlitch, 3000)
  }
  autoGlitch()
})

onUnmounted(() => {
  stopGlitch()
})
</script>

<style scoped>
.glitch-text {
  position: relative;
  display: inline-block;
}

.glitch-text::before,
.glitch-text::after {
  content: attr(data-text);
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: transparent;
}

.glitch-text::before {
  animation: glitch-1 0.3s infinite;
  color: #ff0000;
  z-index: -1;
}

.glitch-text::after {
  animation: glitch-2 0.3s infinite;
  color: #00ff00;
  z-index: -2;
}

@keyframes glitch-1 {
  0%, 100% { transform: translate(0); }
  20% { transform: translate(-2px, 2px); }
  40% { transform: translate(-2px, -2px); }
  60% { transform: translate(2px, 2px); }
  80% { transform: translate(2px, -2px); }
}

@keyframes glitch-2 {
  0%, 100% { transform: translate(0); }
  20% { transform: translate(2px, -2px); }
  40% { transform: translate(2px, 2px); }
  60% { transform: translate(-2px, -2px); }
  80% { transform: translate(-2px, 2px); }
}
</style>
