<template>
  <div class="min-h-screen proia-bg">
    <!-- Header -->
    <div class="proia-glass-dark p-6 text-center">
      <h1 class="proia-title text-3xl mb-2">Oportunidade</h1>
      <p class="text-white/80">Os números não mentem. A oportunidade está aqui, agora.</p>
    </div>

    <!-- Conteúdo principal -->
    <div class="p-6 space-y-6">
      <!-- Estatísticas do mercado -->
      <div class="grid grid-cols-2 gap-4">
        <div class="proia-card-glow text-center">
          <div class="w-12 h-12 bg-gradient-to-br from-green-500 to-green-600 rounded-xl flex items-center justify-center mx-auto mb-3">
            <span class="text-white text-xl">💰</span>
          </div>
          <div class="text-2xl font-bold text-white mb-1">R$ 120–350</div>
          <div class="text-xs text-white/70">por serviço simples</div>
        </div>

        <div class="proia-card-glow text-center">
          <div class="w-12 h-12 bg-gradient-to-br from-blue-500 to-blue-600 rounded-xl flex items-center justify-center mx-auto mb-3">
            <span class="text-white text-xl">⚡</span>
          </div>
          <div class="text-2xl font-bold text-white mb-1">1–3 dias</div>
          <div class="text-xs text-white/70">entrega média</div>
        </div>

        <div class="proia-card-glow text-center">
          <div class="w-12 h-12 bg-gradient-to-br from-purple-500 to-purple-600 rounded-xl flex items-center justify-center mx-auto mb-3">
            <span class="text-white text-xl">📈</span>
          </div>
          <div class="text-2xl font-bold text-green-400 mb-1">+147%</div>
          <div class="text-xs text-white/70">em 6 meses</div>
        </div>

        <div class="proia-card-glow text-center">
          <div class="w-12 h-12 bg-gradient-to-br from-orange-500 to-orange-600 rounded-xl flex items-center justify-center mx-auto mb-3">
            <span class="text-white text-xl">🎯</span>
          </div>
          <div class="text-2xl font-bold text-white mb-1">baixa a média</div>
          <div class="text-xs text-white/70">concorrência</div>
        </div>
      </div>

      <!-- Insight do mercado -->
      <div class="proia-card-glow">
        <h3 class="proia-title text-xl mb-4">O jogo já começou.</h3>
        <p class="text-white/90 mb-4">
          Enquanto você lê isso, milhares de profissionais já estão faturando com IA. 
          A diferença? Eles começaram ontem.
        </p>
        
        <div class="space-y-3">
          <div class="flex items-center gap-3">
            <div class="w-2 h-2 bg-green-400 rounded-full"></div>
            <span class="text-white/80">Mercado em explosão</span>
          </div>
          <div class="flex items-center gap-3">
            <div class="w-2 h-2 bg-blue-400 rounded-full"></div>
            <span class="text-white/80">Barreira de entrada baixa</span>
          </div>
          <div class="flex items-center gap-3">
            <div class="w-2 h-2 bg-purple-400 rounded-full"></div>
            <span class="text-white/80">Demanda superando oferta</span>
          </div>
        </div>
      </div>

      <!-- Pergunta final -->
      <div class="proia-card-glow text-center">
        <div class="text-4xl mb-4">🤔</div>
        <h4 class="proia-title text-xl mb-4">A pergunta é:</h4>
        <p class="text-white/90 text-lg">
          Você vai assistir de fora ou entrar agora?
        </p>
      </div>

      <!-- CTA -->
      <button class="proia-btn-cta w-full">
        ENTRAR NO JOGO AGORA
      </button>
    </div>
  </div>
</template>

<script setup lang="ts">
// Lógica específica da view Opportunity
</script>
