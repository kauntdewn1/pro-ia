<template>
  <section 
    class="relative min-h-screen flex flex-col items-center justify-center px-6 py-20 bg-black text-center" 
    style="padding-top: max(5rem, env(safe-area-inset-top) + 2rem);"
  >
    <!-- Background Glow Overlay (sutil, sem grid) -->
    <div class="absolute inset-0 bg-gradient-to-br from-purple-900/20 via-fuchsia-800/10 to-cyan-900/20"></div>
    
    <!-- Conteúdo -->
    <div class="relative z-10 max-w-2xl space-y-8">
      <!-- Logo PRO.IA com Halo Neon -->
      <div class="flex justify-center mb-12">
        <div class="relative proia-logo-hero">
          <div class="absolute inset-0 rounded-full bg-gradient-to-br from-purple-500/30 via-pink-500/20 to-cyan-500/30 blur-3xl animate-pulse"></div>
          <img 
            src="/logo/LOGO.png"
            alt="PRO.IA — Transforme IA em Faturamento"
            class="relative w-48 h-48 md:w-64 md:h-64 lg:w-80 lg:h-80 drop-shadow-2xl"
          />
        </div>
      </div>

      <!-- Headline -->
      <h1 class="font-extrabold text-4xl md:text-6xl leading-tight">
        <span class="bg-gradient-to-r from-purple-600 via-blue-500 to-cyan-400 bg-clip-text text-transparent">
          O mercado
        </span>
        <span class="ios-glitch-premium" data-text="mudou.">mudou.</span>
      </h1>

      <!-- Subheadline -->
      <p class="text-lg md:text-xl ios-text-secondary leading-relaxed max-w-2xl mx-auto">
        Quem aprender a transformar <span class="text-ios-blue font-semibold">IA em faturamento</span> agora vai liderar a próxima década.  
        Não é promessa mágica. É método validado, rápido e direto para gerar seus primeiros resultados — mesmo que você nunca tenha vendido nada online.
      </p>

      <!-- CTA -->
      <div class="pt-4">
        <button @click="scrollToNext" class="ios-cta-button">
          Quero o Guia Agora
        </button>
      </div>

      <!-- Trust Indicators -->
      <div class="ios-card mt-12 p-6">
        <div class="grid grid-cols-2 gap-4 md:flex md:justify-center md:gap-8 text-sm ios-text-secondary">
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
    </div>

    <!-- Scroll indicator -->
    <div class="absolute bottom-8 left-1/2 transform -translate-x-1/2">
      <div class="flex flex-col items-center space-y-2 text-ios-blue/60">
        <span class="text-xs font-medium">Deslize para explorar</span>
        <div class="w-6 h-8 border border-ios-blue/30 rounded-full flex justify-center">
          <div class="w-1 h-2 bg-ios-blue/60 rounded-full mt-1.5 animate-bounce"></div>
        </div>
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
