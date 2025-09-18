<template>
  <section class="py-20 px-4 bg-gradient-to-b from-white to-ios-light">
    <div class="max-w-6xl mx-auto">
      <div class="text-center mb-16">
        <h2 class="ios-heading text-4xl md:text-5xl mb-6">
          <span class="gradient-text">Dentro do PRO.IA</span>
          <br>
          <span class="text-gray-900">você aprende a:</span>
        </h2>
      </div>

      <div class="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
        <!-- Item 1 -->
        <div class="ios-card p-8 group hover:scale-105 transition-all duration-300">
          <div class="w-16 h-16 bg-gradient-to-br from-ios-blue to-blue-600 rounded-2xl flex items-center justify-center mb-6 group-hover:rotate-12 transition-transform duration-300">
            <span class="text-white text-2xl font-bold">1</span>
          </div>
          <h3 class="ios-heading text-xl mb-4">
            <span class="gradient-text">Surfando a onda certa:</span>
          </h3>
          <p class="ios-text">
            Quais ferramentas de IA estão explodindo agora e como aplicar sem conhecimento técnico.
          </p>
        </div>

        <!-- Item 2 -->
        <div class="ios-card p-8 group hover:scale-105 transition-all duration-300">
          <div class="w-16 h-16 bg-gradient-to-br from-green-500 to-green-600 rounded-2xl flex items-center justify-center mb-6 group-hover:rotate-12 transition-transform duration-300">
            <span class="text-white text-2xl font-bold">2</span>
          </div>
          <h3 class="ios-heading text-xl mb-4">
            <span class="gradient-text">Transformar IA em serviços pagos:</span>
          </h3>
          <p class="ios-text">
            Templates prontos de propostas e precificação.
          </p>
        </div>

        <!-- Item 3 -->
        <div class="ios-card p-8 group hover:scale-105 transition-all duration-300">
          <div class="w-16 h-16 bg-gradient-to-br from-purple-500 to-purple-600 rounded-2xl flex items-center justify-center mb-6 group-hover:rotate-12 transition-transform duration-300">
            <span class="text-white text-2xl font-bold">3</span>
          </div>
          <h3 class="ios-heading text-xl mb-4">
            <span class="gradient-text">Prospectar como um sniper:</span>
          </h3>
          <p class="ios-text">
            Estratégias validadas de onde e como achar clientes.
          </p>
        </div>

        <!-- Item 4 -->
        <div class="ios-card p-8 group hover:scale-105 transition-all duration-300">
          <div class="w-16 h-16 bg-gradient-to-br from-orange-500 to-orange-600 rounded-2xl flex items-center justify-center mb-6 group-hover:rotate-12 transition-transform duration-300">
            <span class="text-white text-2xl font-bold">4</span>
          </div>
          <h3 class="ios-heading text-xl mb-4">
            <span class="gradient-text">Monetizar em 72h:</span>
          </h3>
          <p class="ios-text">
            Roteiro com mensagens prontas para começar a faturar em 3 dias.
          </p>
        </div>

        <!-- Item 5 -->
        <div class="ios-card p-8 group hover:scale-105 transition-all duration-300">
          <div class="w-16 h-16 bg-gradient-to-br from-red-500 to-red-600 rounded-2xl flex items-center justify-center mb-6 group-hover:rotate-12 transition-transform duration-300">
            <span class="text-white text-2xl font-bold">5</span>
          </div>
          <h3 class="ios-heading text-xl mb-4">
            <span class="gradient-text">Repetir e escalar:</span>
          </h3>
          <p class="ios-text">
            Como automatizar para nunca mais depender só de indicação.
          </p>
        </div>

        <!-- CTA Card -->
        <div class="ios-card p-8 bg-gradient-to-br from-ios-blue to-blue-600 text-white group hover:scale-105 transition-all duration-300">
          <div class="text-center">
            <div class="w-16 h-16 bg-white/20 rounded-2xl flex items-center justify-center mb-6 mx-auto group-hover:rotate-12 transition-transform duration-300">
              <span class="text-white text-2xl font-bold">🚀</span>
            </div>
            <h3 class="ios-heading text-xl mb-4 text-white">
              Pronto para começar?
            </h3>
            <p class="text-white/90 mb-6">
              Baixe o guia agora e transforme IA em faturamento real.
            </p>
            <button 
              @click="scrollToVIP"
              class="ios-btn-secondary w-full"
            >
              LIBERAR MEU GUIA
            </button>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
const scrollToVIP = () => {
  const vipSection = document.querySelector('#vip-section')
  if (vipSection) {
    vipSection.scrollIntoView({ behavior: 'smooth' })
  }
}
</script>
