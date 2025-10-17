import type { Metadata, Viewport } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'

const inter = Inter({ 
  subsets: ['latin'],
  variable: '--font-inter',
})

export const metadata: Metadata = {
  metadataBase: new URL('https://pro-ia.netlify.app/'),
  title: {
    default: 'PRO.IA — NEØ Protocol',
    template: '%s · PRO.IA',
  },
  description: 'Manual rápido para usar IA de forma prática, com ferramentas e links.',
  generator: 'pro.ia.app',
  keywords: ['pro.ia', 'como usar ia', 'ferramentas ia', 'links ia', 'inteligência artificial', 'neø protocol'],
  authors: [{ name: 'NEØ PROTOCOL', url: 'https://neprotocol.com' }],
  creator: 'NEØ PROTOCOL',
  publisher: 'NEØ PROTOCOL',
  openGraph: {
    title: 'PRO.IA — NEØ Protocol',
    description: 'Manual rápido para usar IA de forma prática, com ferramentas e links.',
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
        <meta httpEquiv="X-Frame-Options" content="DENY" />
        <meta httpEquiv="Content-Security-Policy" content="frame-ancestors 'none'" />
        <meta name="referrer" content="no-referrer" />
        <link rel="preconnect" href="https://connect.facebook.net" crossOrigin="anonymous" />
        <link rel="preconnect" href="https://cdn.utmify.com.br" crossOrigin="anonymous" />
        <link rel="preconnect" href="https://www.clarity.ms" crossOrigin="anonymous" />
        <link rel="preconnect" href="https://hebbkx1anhila5yf.public.blob.vercel-storage.com" crossOrigin="anonymous" />
      </head>
      <body className="font-sans bg-black">
        {children}
      </body>
    </html>
  )
}
