<template>
  <div class="ios-card p-4 font-mono text-sm">
    <div class="flex items-center gap-2 mb-3">
      <div class="flex gap-1">
        <div class="w-3 h-3 rounded-full bg-red-500"></div>
        <div class="w-3 h-3 rounded-full bg-yellow-500"></div>
        <div class="w-3 h-3 rounded-full bg-green-500"></div>
      </div>
      <span class="text-ios-text-secondary text-xs">Terminal</span>
    </div>
    <div class="space-y-1">
      <div v-for="(line, index) in lines" :key="index" class="flex items-start gap-2">
        <span class="text-ios-blue">$</span>
        <span :class="line.type === 'error' ? 'text-red-400' : 'text-ios-text-primary'">
          {{ line.text }}
        </span>
      </div>
      <div v-if="isTyping" class="flex items-start gap-2">
        <span class="text-ios-blue">$</span>
        <span class="text-ios-text-primary">{{ currentLine }}<span class="animate-pulse">_</span></span>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'

interface TerminalLine {
  text: string
  type?: 'error' | 'success' | 'info'
}

const lines = ref<TerminalLine[]>([])
const isTyping = ref(false)
const currentLine = ref('')

const addLine = (text: string, type?: 'error' | 'success' | 'info') => {
  lines.value.push({ text, type })
}

const typeLine = (text: string, delay = 50) => {
  isTyping.value = true
  currentLine.value = ''
  
  let index = 0
  const interval = setInterval(() => {
    if (index < text.length) {
      currentLine.value += text[index]
      index++
    } else {
      clearInterval(interval)
      isTyping.value = false
      addLine(text)
    }
  }, delay)
}

onMounted(() => {
  // Simular comandos do terminal
  setTimeout(() => typeLine('npm run dev'), 500)
  setTimeout(() => {
    addLine('✓ Server running on http://localhost:5173', 'success')
  }, 2000)
  setTimeout(() => {
    addLine('✓ PWA ready for installation', 'success')
  }, 3000)
})
</script>
