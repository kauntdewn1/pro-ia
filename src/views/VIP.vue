<template>
  <div class="proia-bg min-h-screen">
    <!-- iOS Navbar -->
    <nav class="ios-navbar">
      <div class="ios-navbar-content">
        <h1 class="ios-navbar-title">VIP</h1>
      </div>
    </nav>

    <!-- Conteúdo Principal -->
    <main class="ios-content">
      <div class="max-w-2xl mx-auto px-6 py-8 space-y-6">
        
        <!-- Hero VIP Card -->
        <div class="ios-card-vip">
          <div class="ios-card-vip-header">
            <div class="ios-vip-badge">VIP EXCLUSIVO</div>
            <h2 class="ios-card-vip-title">Acesso Premium</h2>
            <p class="ios-card-vip-subtitle">Quer mais do que o básico?</p>
          </div>
        </div>

        <!-- Benefícios VIP -->
        <div class="ios-card">
          <div class="ios-card-header">
            <h3 class="ios-card-title">Benefícios VIP</h3>
          </div>
          <div class="ios-card-content space-y-4">
            
            <div class="ios-benefit-item">
              <div class="ios-benefit-icon bg-blue-500">
                <span class="text-white text-sm font-bold">✓</span>
              </div>
              <div>
                <h4 class="ios-benefit-title">Material avançado com técnicas exclusivas</h4>
                <p class="ios-benefit-description">Estratégias que só funcionam quando você sabe exatamente onde aplicar</p>
              </div>
            </div>

            <div class="ios-benefit-item">
              <div class="ios-benefit-icon bg-green-500">
                <span class="text-white text-sm font-bold">✓</span>
              </div>
              <div>
                <h4 class="ios-benefit-title">Acesso ao grupo silencioso de praticantes</h4>
                <p class="ios-benefit-description">Comunidade fechada onde só entra quem está implementando</p>
              </div>
            </div>

            <div class="ios-benefit-item">
              <div class="ios-benefit-icon bg-purple-500">
                <span class="text-white text-sm font-bold">✓</span>
              </div>
              <div>
                <h4 class="ios-benefit-title">Vídeo passo a passo de implementação</h4>
                <p class="ios-benefit-description">Tutorial completo mostrando exatamente como fazer</p>
              </div>
            </div>

            <div class="ios-benefit-item">
              <div class="ios-benefit-icon bg-orange-500">
                <span class="text-white text-sm font-bold">✓</span>
              </div>
              <div>
                <h4 class="ios-benefit-title">Modelos de respostas automáticas validados</h4>
                <p class="ios-benefit-description">Scripts prontos que convertem prospect em cliente</p>
              </div>
            </div>

          </div>
        </div>

        <!-- Pricing Card -->
        <div class="ios-card-pricing">
          <div class="ios-pricing-header">
            <div class="ios-pricing-amount">R$ 47</div>
            <div class="ios-pricing-label">Investimento simbólico</div>
          </div>
          
          <div class="ios-pricing-roi">
            <div class="ios-pricing-roi-label">ROI estimado:</div>
            <div class="ios-pricing-roi-value">6,4x em 30 dias</div>
          </div>

          <button class="ios-btn-vip">
            QUERO O VIP
          </button>

          <div class="ios-pricing-note">
            Acesso imediato após confirmação
          </div>
        </div>

        <!-- Social Proof -->
        <div class="ios-card">
          <div class="ios-card-content text-center">
            <p class="ios-testimonial">
              "O VIP me deu acesso a estratégias que ninguém mais tem. 
              Em 2 semanas já recuperei o investimento 3x."
            </p>
            <div class="ios-testimonial-author">
              <div class="ios-avatar"></div>
              <span class="ios-author-name">Maria S., Designer</span>
            </div>
          </div>
        </div>

      </div>
    </main>
  </div>
</template>

<script setup lang="ts">
// VIP view com design iOS nativo
</script>
