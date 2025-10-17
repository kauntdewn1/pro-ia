import type { Metadata, Viewport } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'

const inter = Inter({ 
  subsets: ['latin'],
  variable: '--font-inter',
})

export const metadata: Metadata = {
  metadataBase: new URL('https://proia.netlify.app/'),
  title: {
    default: 'PRO.IA - Transforme IA em Faturamento Real',
    template: '%s · PRO.IA',
  },
  description: 'Sistema completo para usar Inteligência Artificial em vendas. Manual prático, templates testados, automação e missões gamificadas. Liberação baseada em XP.',
  generator: 'pro.ia.app',
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
    'PRO.IA',
    'NEØ-FLOWOFF'
  ],
  authors: [{ name: 'NEØ-FLOWOFF' }],
  creator: 'PRO.IA',
  publisher: 'NEØ-FLOWOFF',
  openGraph: {
    title: 'PRO.IA - Transforme IA em Faturamento Real',
    description: 'Sistema completo para usar Inteligência Artificial em vendas. Manual prático, templates testados e automação.',
    url: '/',
    siteName: 'PRO.IA',
    images: [
      {
        url: '/logo/proia-logo.png',
        width: 1200,
        height: 630,
        alt: 'PRO.IA — NEØ Protocol',
      },
    ],
    locale: 'pt_BR',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'PRO.IA — NEØ Protocol',
    description: 'Manual rápido para usar IA de forma prática, com ferramentas e links.',
    images: ['/logo/proia-logo.png'],
  },
  robots: {
    index: true,
    follow: true,
  },
  icons: {
    icon: '/favicon.ico',
    apple: '/apple-touch-icon.png',
  },
  alternates: {
    canonical: 'https://pro-ia.netlify.app/',
  },
}

export const viewport: Viewport = {
  themeColor: '#00FF00',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="pt-BR" className={inter.variable}>
      <head>
        <link rel="preconnect" href="https://hebbkx1anhila5yf.public.blob.vercel-storage.com" crossOrigin="anonymous" />
      </head>
      <body className="font-sans bg-black">
        {children}
      </body>
    </html>
  )
}
