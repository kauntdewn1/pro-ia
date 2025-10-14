<template>
  <section class="py-20 px-4 bg-gray-800">
    <div class="max-w-6xl mx-auto">
      <div class="text-center mb-16">
        <h2 class="ios-heading text-4xl md:text-5xl mb-6">
          <span class="text-white">Análise de mercado atual:</span>
        </h2>
        <p class="ios-text text-xl text-ios-gray max-w-3xl mx-auto">
          Os números não mentem. A oportunidade está aqui, agora.
        </p>
      </div>

      <div class="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
        <!-- Ticket médio -->
        <div class="ios-card p-6 text-center group hover:scale-105 transition-all duration-300">
          <div class="w-16 h-16 bg-gradient-to-br from-green-500 to-green-600 rounded-2xl flex items-center justify-center mx-auto mb-4 group-hover:rotate-12 transition-transform duration-300">
            <span class="text-white text-2xl">💰</span>
          </div>
          <div class="text-3xl font-bold text-white mb-2">R$ 120–350</div>
          <div class="text-sm text-ios-gray">por serviço simples</div>
        </div>

        <!-- Entrega média -->
        <div class="ios-card p-6 text-center group hover:scale-105 transition-all duration-300">
          <div class="w-16 h-16 bg-gradient-to-br from-ios-blue to-blue-600 rounded-2xl flex items-center justify-center mx-auto mb-4 group-hover:rotate-12 transition-transform duration-300">
            <span class="text-white text-2xl">⚡</span>
          </div>
          <div class="text-3xl font-bold text-white mb-2">1–3 dias</div>
          <div class="text-sm text-ios-gray">entrega média</div>
        </div>

        <!-- Demanda -->
        <div class="ios-card p-6 text-center group hover:scale-105 transition-all duration-300">
          <div class="w-16 h-16 bg-gradient-to-br from-purple-500 to-purple-600 rounded-2xl flex items-center justify-center mx-auto mb-4 group-hover:rotate-12 transition-transform duration-300">
            <span class="text-white text-2xl">📈</span>
          </div>
          <div class="text-3xl font-bold text-green-600 mb-2">+147%</div>
          <div class="text-sm text-ios-gray">em 6 meses</div>
        </div>

        <!-- Concorrência -->
        <div class="ios-card p-6 text-center group hover:scale-105 transition-all duration-300">
          <div class="w-16 h-16 bg-gradient-to-br from-orange-500 to-orange-600 rounded-2xl flex items-center justify-center mx-auto mb-4 group-hover:rotate-12 transition-transform duration-300">
            <span class="text-white text-2xl">🎯</span>
          </div>
          <div class="text-3xl font-bold text-white mb-2">baixa a média</div>
          <div class="text-sm text-ios-gray">concorrência</div>
        </div>
      </div>

      <!-- Market insight -->
      <div class="ios-card p-8 md:p-12 bg-gradient-to-br from-gray-900 to-gray-800 text-white">
        <div class="grid md:grid-cols-2 gap-8 items-center">
          <div>
            <h3 class="ios-heading text-3xl mb-6">
              <span class="gradient-text">O jogo já começou.</span>
            </h3>
            <p class="ios-text text-lg mb-6 text-gray-300">
              Enquanto você lê isso, milhares de profissionais já estão faturando com IA. 
              A diferença? Eles começaram ontem.
            </p>
            <div class="space-y-4">
              <div class="flex items-center gap-3">
                <div class="w-2 h-2 bg-green-400 rounded-full"></div>
                <span class="text-gray-300">Mercado em explosão</span>
              </div>
              <div class="flex items-center gap-3">
                <div class="w-2 h-2 bg-ios-blue rounded-full"></div>
                <span class="text-gray-300">Barreira de entrada baixa</span>
              </div>
              <div class="flex items-center gap-3">
                <div class="w-2 h-2 bg-purple-400 rounded-full"></div>
                <span class="text-gray-300">Demanda superando oferta</span>
              </div>
            </div>
          </div>

          <div class="text-center">
            <div class="bg-white/10 rounded-3xl p-8 backdrop-blur-sm">
              <div class="text-6xl mb-4">🤔</div>
              <h4 class="ios-heading text-2xl mb-4">A pergunta é:</h4>
              <p class="ios-text text-lg text-gray-300">
                Você vai assistir de fora ou entrar agora?
              </p>
            </div>
          </div>
        </div>
      </div>

      <!-- CTA -->
      <div class="text-center mt-12">
        <button 
          @click="scrollToUrgency"
          class="ios-btn-primary text-xl px-12 py-6"
        >
          ENTRAR NO JOGO AGORA
        </button>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
const scrollToUrgency = () => {
  const urgencySection = document.querySelector('#urgency-section')
  if (urgencySection) {
    urgencySection.scrollIntoView({ behavior: 'smooth' })
  }
}
</script>
