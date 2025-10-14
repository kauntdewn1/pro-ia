<template>
  <section id="vip-section" class="py-20 px-4 bg-gradient-to-br from-ios-blue/5 to-purple-500/5">
    <div class="max-w-4xl mx-auto">
      <div class="text-center mb-12">
        <h2 class="ios-heading text-4xl md:text-5xl mb-6">
          <span class="text-white">Quer mais do que o básico?</span>
        </h2>
        <p class="ios-text text-xl text-ios-gray">
          Desbloqueie o <span class="gradient-text font-bold">VIP</span> e leve:
        </p>
      </div>

      <div class="ios-card p-8 md:p-12 relative overflow-hidden">
        <!-- VIP Badge -->
        <div class="absolute -top-4 -right-4 bg-gradient-to-br from-yellow-400 to-orange-500 text-white px-6 py-2 rounded-full text-sm font-bold transform rotate-12">
          VIP EXCLUSIVO
        </div>

        <div class="grid md:grid-cols-2 gap-8 items-center">
          <!-- Benefits -->
          <div class="space-y-6">
            <div class="flex items-start gap-4">
              <div class="w-8 h-8 bg-gradient-to-br from-ios-blue to-blue-600 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                <span class="text-white text-sm font-bold">✓</span>
              </div>
              <div>
                <h3 class="ios-heading text-lg mb-1">Material avançado com técnicas exclusivas</h3>
                <p class="ios-text text-sm text-ios-gray">Estratégias que só funcionam quando você sabe exatamente onde aplicar</p>
              </div>
            </div>

            <div class="flex items-start gap-4">
              <div class="w-8 h-8 bg-gradient-to-br from-green-500 to-green-600 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                <span class="text-white text-sm font-bold">✓</span>
              </div>
              <div>
                <h3 class="ios-heading text-lg mb-1">Acesso ao grupo silencioso de praticantes</h3>
                <p class="ios-text text-sm text-ios-gray">Comunidade fechada onde só entra quem está implementando</p>
              </div>
            </div>

            <div class="flex items-start gap-4">
              <div class="w-8 h-8 bg-gradient-to-br from-purple-500 to-purple-600 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                <span class="text-white text-sm font-bold">✓</span>
              </div>
              <div>
                <h3 class="ios-heading text-lg mb-1">Vídeo passo a passo de implementação</h3>
                <p class="ios-text text-sm text-ios-gray">Tutorial completo mostrando exatamente como fazer</p>
              </div>
            </div>

            <div class="flex items-start gap-4">
              <div class="w-8 h-8 bg-gradient-to-br from-orange-500 to-orange-600 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                <span class="text-white text-sm font-bold">✓</span>
              </div>
              <div>
                <h3 class="ios-heading text-lg mb-1">Modelos de respostas automáticas validados</h3>
                <p class="ios-text text-sm text-ios-gray">Scripts prontos que convertem prospect em cliente</p>
              </div>
            </div>
          </div>

          <!-- Pricing -->
          <div class="text-center">
            <div class="ios-card bg-gradient-to-br from-ios-blue to-blue-600 text-white p-8">
              <div class="mb-6">
                <div class="text-4xl font-bold mb-2">R$ 47</div>
                <div class="text-ios-blue-200 text-sm">Investimento simbólico</div>
              </div>

              <div class="bg-white/20 rounded-2xl p-4 mb-6">
                <div class="text-sm text-white/90 mb-1">ROI estimado:</div>
                <div class="text-2xl font-bold">6,4x em 30 dias</div>
              </div>

              <button 
                @click="scrollToUrgency"
                class="ios-btn-primary w-full text-lg py-4"
              >
                QUERO O VIP
              </button>

              <div class="mt-4 text-xs text-white/80">
                Acesso imediato após confirmação
              </div>
            </div>
          </div>
        </div>

        <!-- Social Proof -->
        <div class="mt-12 pt-8 border-t border-gray-200">
          <div class="text-center">
            <p class="ios-text text-sm text-ios-gray mb-4">
              "O VIP me deu acesso a estratégias que ninguém mais tem. 
              Em 2 semanas já recuperei o investimento 3x."
            </p>
            <div class="flex items-center justify-center gap-2">
              <div class="w-8 h-8 bg-gray-300 rounded-full"></div>
              <span class="text-sm font-medium text-gray-300">Maria S., Designer</span>
            </div>
          </div>
        </div>
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
