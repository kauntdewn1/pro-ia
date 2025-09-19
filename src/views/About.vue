<template>
  <div class="proia-bg min-h-screen">
    <!-- iOS Navbar -->
    <nav class="ios-navbar">
      <div class="ios-navbar-content">
        <h1 class="ios-navbar-title">Sobre</h1>
      </div>
    </nav>

    <!-- Conteúdo Principal -->
    <main class="ios-content">
      <div class="max-w-2xl mx-auto px-6 py-8 space-y-6">
        
        <!-- Card Sobre o PRO.IA -->
        <div class="ios-card">
          <div class="ios-card-header">
            <h2 class="ios-card-title">Sobre o PRO.IA</h2>
          </div>
          <div class="ios-card-content">
            <p class="ios-text leading-relaxed">
              O PRO.IA é o método validado para transformar Inteligência Artificial em faturamento real. 
              Desenvolvido para empreendedores que querem aproveitar a revolução da IA sem conhecimento técnico prévio.
            </p>
          </div>
        </div>

        <!-- Card Nossa Missão -->
        <div class="ios-card">
          <div class="ios-card-header">
            <h2 class="ios-card-title">Nossa Missão</h2>
          </div>
          <div class="ios-card-content">
            <p class="ios-text leading-relaxed">
              Democratizar o acesso à tecnologia de IA, permitindo que qualquer pessoa possa gerar renda 
              real utilizando ferramentas de inteligência artificial de forma prática e eficiente.
            </p>
          </div>
        </div>

        <!-- Card Contato -->
        <div class="ios-card">
          <div class="ios-card-header">
            <h2 class="ios-card-title">Contato</h2>
          </div>
          <div class="ios-card-content space-y-4">
            <a 
              href="mailto:contato@proia.com.br" 
              class="ios-contact-link"
            >
              <span class="text-2xl mr-3">📧</span>
              <span>contato@proia.com.br</span>
            </a>
            
            <a 
              href="https://wa.me/5511999999999" 
              class="ios-contact-link"
            >
              <span class="text-2xl mr-3">💬</span>
              <span>WhatsApp</span>
            </a>
            
            <a 
              href="https://instagram.com/proia" 
              class="ios-contact-link"
            >
              <span class="text-2xl mr-3">📱</span>
              <span>Instagram</span>
            </a>
          </div>
        </div>

        <!-- Card Informações Técnicas -->
        <div class="ios-card">
          <div class="ios-card-header">
            <h2 class="ios-card-title">Informações Técnicas</h2>
          </div>
          <div class="ios-card-content">
            <div class="grid grid-cols-2 gap-4 text-sm">
              <div>
                <span class="ios-text-secondary">Versão:</span>
                <span class="ios-text">1.0.0</span>
              </div>
              <div>
                <span class="ios-text-secondary">Plataforma:</span>
                <span class="ios-text">PWA</span>
              </div>
              <div>
                <span class="ios-text-secondary">Framework:</span>
                <span class="ios-text">Vue 3</span>
              </div>
              <div>
                <span class="ios-text-secondary">Estilo:</span>
                <span class="ios-text">iOS-like</span>
              </div>
            </div>
          </div>
        </div>

      </div>
    </main>
  </div>
</template>

<script setup lang="ts">
// About view com design iOS nativo
</script>
