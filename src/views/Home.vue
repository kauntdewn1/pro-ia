<template>
  <div class="proia-bg">
    <Hero />
    
    <!-- CTA Principal -->
    <section class="relative py-20 px-6 text-center">
      <div class="max-w-2xl mx-auto space-y-8">
        <h2 class="proia-title text-3xl md:text-4xl">
          Pronto para começar?
        </h2>
        <p class="text-lg ios-text-secondary">
          Explore cada seção para entender como transformar IA em faturamento real.
        </p>
        <div class="flex flex-col sm:flex-row gap-4 justify-center">
          <button
            @click="scrollToSection('authority')"
            class="proia-btn-cta"
          >
            Ver Autoridade
          </button>
          <button
            @click="scrollToSection('learn')"
            class="proia-btn-secondary"
          >
            O que Aprender
          </button>
        </div>
      </div>
    </section>
  </div>
</template>

<script setup lang="ts">
import Hero from '../components/Hero.vue'

const scrollToSection = (sectionId: string) => {
  // Navegar para a seção específica
  const router = useRouter()
  router.push(`/${sectionId}`)
}

// Import do router
import { useRouter } from 'vue-router'
</script>
