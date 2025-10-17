import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'PRO.IA - Transforme IA em Faturamento Real',
  description: 'Sistema completo para usar Inteligência Artificial em vendas. Manual prático, templates testados, automação e missões gamificadas. Liberação baseada em XP.',
  keywords: [
    'IA',
    'Inteligência Artificial',
    'Vendas',
    'Automação',
    'ChatGPT',
    'Prompts',
    'Marketing Digital',
    'Lead Generation',
    'Conversão',
    'PRO.IA'
  ],
  authors: [{ name: 'NEØ-FLOWOFF' }],
  creator: 'PRO.IA',
  publisher: 'NEØ-FLOWOFF',
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  metadataBase: new URL('https://proia.netlify.app'),
  alternates: {
    canonical: '/',
  },
  openGraph: {
    title: 'PRO.IA - Transforme IA em Faturamento Real',
    description: 'Sistema completo para usar Inteligência Artificial em vendas. Manual prático, templates testados e automação.',
    url: 'https://proia.netlify.app',
    siteName: 'PRO.IA',
    images: [
      {
        url: '/og-image.png',
        width: 1200,
        height: 630,
        alt: 'PRO.IA - Sistema de IA para Vendas',
      },
    ],
    locale: 'pt_BR',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'PRO.IA - Transforme IA em Faturamento Real',
    description: 'Sistema completo para usar Inteligência Artificial em vendas.',
    images: ['/og-image.png'],
    creator: '@proia_app',
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  verification: {
    google: 'your-google-verification-code',
    yandex: 'your-yandex-verification-code',
    yahoo: 'your-yahoo-verification-code',
  },
}
