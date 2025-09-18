<template>
  <section class="relative min-h-screen flex flex-col items-center justify-center px-6 py-20 ios-dynamic-bg text-center">
    <!-- Conteúdo -->
    <div class="relative z-10 max-w-3xl space-y-8">
      <h1 class="font-bold text-4xl md:text-6xl ios-text-primary leading-tight">
        O mercado <span class="ios-glitch gradient-text" data-text="mudou.">mudou.</span>
      </h1>

      <p class="text-lg md:text-xl ios-text-secondary leading-relaxed">
        Quem aprender a transformar <span class="text-ios-blue font-semibold">IA em faturamento</span> agora vai liderar a próxima década.  
        Não é promessa mágica. É método validado, rápido e direto para gerar seus primeiros resultados — mesmo que você nunca tenha vendido nada online.
      </p>

      <div>
        <button
          @click="scrollToNext"
          class="ios-btn ios-tap-feedback px-10 py-4 text-lg font-semibold"
        >
          Quero o Guia Agora
        </button>
      </div>

      <!-- Trust indicators -->
      <div class="flex flex-wrap justify-center gap-6 text-sm mt-10 ios-text-secondary">
        <div class="flex items-center gap-2">
          <span class="w-2 h-2 bg-green-500 rounded-full animate-pulse"></span>
          <span>Método validado</span>
        </div>
        <div class="flex items-center gap-2">
          <span class="w-2 h-2 bg-blue-500 rounded-full animate-pulse"></span>
          <span>Resultados em 72h</span>
        </div>
        <div class="flex items-center gap-2">
          <span class="w-2 h-2 bg-purple-500 rounded-full animate-pulse"></span>
          <span>Zero conhecimento técnico</span>
        </div>
        <div class="flex items-center gap-2">
          <span class="w-2 h-2 bg-orange-500 rounded-full animate-pulse"></span>
          <span>Auto-adapta ao tema do sistema</span>
        </div>
      </div>
    </div>

    <!-- Scroll indicator -->
    <div class="absolute bottom-6 left-1/2 transform -translate-x-1/2">
      <div class="w-6 h-10 border-2 rounded-full flex justify-center ios-scroll-indicator">
        <div class="w-1 h-3 rounded-full mt-2 animate-bounce ios-scroll-indicator"></div>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
const scrollToNext = () => {
  const nextSection = document.querySelector('#authority-section')
  if (nextSection) {
    nextSection.scrollIntoView({ behavior: 'smooth' })
  }
}
</script>
