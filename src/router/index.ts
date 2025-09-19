import { createRouter, createWebHistory } from 'vue-router'

const router = createRouter({
  history: createWebHistory(),
  routes: [
    { 
      path: '/', 
      name: 'Home', 
      component: () => import('../views/Home.vue'),
      meta: { title: 'Início' }
    },
    { 
      path: '/authority', 
      name: 'Authority', 
      component: () => import('../views/AuthorityPage.vue'),
      meta: { title: 'Autoridade' }
    },
    { 
      path: '/opportunity', 
      name: 'Opportunity', 
      component: () => import('../views/OpportunityPage.vue'),
      meta: { title: 'Oportunidade' }
    },
    { 
      path: '/learn', 
      name: 'Learn', 
      component: () => import('../views/LearnPage.vue'),
      meta: { title: 'Aprender' }
    },
    { 
      path: '/vip', 
      name: 'VIP', 
      component: () => import('../views/VIPPage.vue'),
      meta: { title: 'VIP' }
    },
    { 
      path: '/urgency', 
      name: 'Urgency', 
      component: () => import('../views/UrgencyPage.vue'),
      meta: { title: 'Urgência' }
    },
    { 
      path: '/about', 
      name: 'About', 
      component: () => import('../views/About.vue'),
      meta: { title: 'Sobre' }
    }
  ]
})

export default router
