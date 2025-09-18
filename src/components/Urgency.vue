<template>
  <section id="urgency-section" class="py-20 px-4 bg-gradient-to-br from-red-500/10 to-orange-500/10">
    <div class="max-w-4xl mx-auto text-center">
      <!-- Main CTA -->
      <div class="ios-card p-8 md:p-12 bg-gradient-to-br from-ios-blue to-blue-600 text-white mb-12">
        <h2 class="ios-heading text-4xl md:text-5xl mb-6">
          Baixe o guia agora e comece seu desafio de
          <span class="block gradient-text text-yellow-300">R$ 300/dia com IA</span>
        </h2>

        <!-- Timer -->
        <div class="bg-white/20 rounded-2xl p-6 mb-8 backdrop-blur-sm">
          <div class="text-sm text-white/90 mb-4">⏳ Oferta disponível por tempo limitado</div>
          <div class="flex justify-center gap-4 text-2xl md:text-3xl font-bold">
            <div class="bg-white/30 rounded-xl px-4 py-2 min-w-[80px]">
              {{ timeLeft.hours.toString().padStart(2, '0') }}
            </div>
            <div class="text-white/60">:</div>
            <div class="bg-white/30 rounded-xl px-4 py-2 min-w-[80px]">
              {{ timeLeft.minutes.toString().padStart(2, '0') }}
            </div>
            <div class="text-white/60">:</div>
            <div class="bg-white/30 rounded-xl px-4 py-2 min-w-[80px]">
              {{ timeLeft.seconds.toString().padStart(2, '0') }}
            </div>
          </div>
        </div>

        <!-- CTA Button -->
        <button 
          @click="handleCTAClick"
          class="ios-btn-primary text-2xl px-16 py-6 glow hover:glow-lg transition-all duration-300 mb-6"
        >
          BAIXAR O GUIA AGORA
        </button>

        <!-- Trust indicators -->
        <div class="flex flex-wrap justify-center items-center gap-6 text-white/90 text-sm">
          <div class="flex items-center gap-2">
            <span class="text-green-400">✓</span>
            <span>Acesso imediato</span>
          </div>
          <div class="flex items-center gap-2">
            <span class="text-green-400">✓</span>
            <span>PDF otimizado</span>
          </div>
          <div class="flex items-center gap-2">
            <span class="text-green-400">✓</span>
            <span>Comunidade no WhatsApp</span>
          </div>
        </div>
      </div>

      <!-- Social proof -->
      <div class="ios-card p-8">
        <h3 class="ios-heading text-2xl mb-6">O que nossos praticantes dizem:</h3>
        
        <div class="grid md:grid-cols-3 gap-6">
          <div class="text-center">
            <div class="w-16 h-16 bg-gradient-to-br from-ios-blue to-blue-600 rounded-full flex items-center justify-center mx-auto mb-4">
              <span class="text-white text-2xl">👨‍💼</span>
            </div>
            <p class="ios-text text-sm mb-4 italic">
              "Em 1 semana já tinha 3 clientes pagando R$ 200 cada. 
              O método é direto e funciona."
            </p>
            <div class="text-sm font-medium text-gray-700">Carlos M.</div>
          </div>

          <div class="text-center">
            <div class="w-16 h-16 bg-gradient-to-br from-green-500 to-green-600 rounded-full flex items-center justify-center mx-auto mb-4">
              <span class="text-white text-2xl">👩‍💻</span>
            </div>
            <p class="ios-text text-sm mb-4 italic">
              "Nunca imaginei que IA pudesse ser tão lucrativa. 
              Já faturo mais que no meu emprego."
            </p>
            <div class="text-sm font-medium text-gray-700">Ana L.</div>
          </div>

          <div class="text-center">
            <div class="w-16 h-16 bg-gradient-to-br from-purple-500 to-purple-600 rounded-full flex items-center justify-center mx-auto mb-4">
              <span class="text-white text-2xl">👨‍🎨</span>
            </div>
            <p class="ios-text text-sm mb-4 italic">
              "Os templates prontos me pouparam horas de trabalho. 
              ROI incrível em poucos dias."
            </p>
            <div class="text-sm font-medium text-gray-700">Roberto S.</div>
          </div>
        </div>
      </div>

      <!-- Final CTA -->
      <div class="mt-12">
        <button 
          @click="handleCTAClick"
          class="ios-btn-primary text-xl px-12 py-6 glow"
        >
          QUERO COMEÇAR AGORA
        </button>
        <p class="ios-text text-sm text-ios-gray mt-4">
          Garantia de 7 dias ou seu dinheiro de volta
        </p>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
import { ref, onMounted, onUnmounted } from 'vue'

const timeLeft = ref({
  hours: 23,
  minutes: 59,
  seconds: 59
})

let timer: number | null = null

const updateTimer = () => {
  if (timeLeft.value.seconds > 0) {
    timeLeft.value.seconds--
  } else if (timeLeft.value.minutes > 0) {
    timeLeft.value.minutes--
    timeLeft.value.seconds = 59
  } else if (timeLeft.value.hours > 0) {
    timeLeft.value.hours--
    timeLeft.value.minutes = 59
    timeLeft.value.seconds = 59
  } else {
    // Reset timer when it reaches 0
    timeLeft.value = { hours: 23, minutes: 59, seconds: 59 }
  }
}

const handleCTAClick = () => {
  // Here you would integrate with your payment/lead capture system
  alert('Redirecionando para o checkout...')
}

onMounted(() => {
  timer = setInterval(updateTimer, 1000)
})

onUnmounted(() => {
  if (timer) {
    clearInterval(timer)
  }
})
</script>
