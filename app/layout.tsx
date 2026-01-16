import './global.css'
import type { Metadata } from 'next'
import { Inter, Newsreader, JetBrains_Mono } from 'next/font/google'
import { Navbar } from '@/components/layout/nav'
import { Analytics } from '@vercel/analytics/react'
import { SpeedInsights } from '@vercel/speed-insights/next'
import Footer from '@/components/layout/footer'
import { baseUrl } from './sitemap'
import { ThemeProvider } from '@/components/layout/theme-provider'

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-sans',
  display: 'swap',
})

const newsreader = Newsreader({
  subsets: ['latin'],
  variable: '--font-serif',
  display: 'swap',
  style: 'normal',
})

const mono = JetBrains_Mono({
  subsets: ['latin'],
  variable: '--font-mono',
  display: 'swap',
})

export const metadata: Metadata = {
  metadataBase: new URL(baseUrl),
  title: {
    default: 'Nikzad Khani',
    template: '%s | Nikzad Khani',
  },
  description: 'Senior Full Stack Engineer specializing in scalable distributed systems.',
  openGraph: {
    title: 'Nikzad Khani',
    description: 'Senior Full Stack Engineer specializing in scalable distributed systems.',
    url: baseUrl,
    siteName: 'Nikzad Khani',
    locale: 'en_US',
    type: 'website',
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
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html
      suppressHydrationWarning
      lang="en"
      className={`${inter.variable} ${newsreader.variable} ${mono.variable}`}
    >
      <body className="antialiased max-w-5xl mx-4 mt-8 lg:mx-auto text-neutral-900 bg-white dark:text-neutral-100 dark:bg-black selection:bg-blue-100 selection:text-blue-900">
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem disableTransitionOnChange>
          <main className="flex-auto min-w-0 mt-6 flex flex-col px-2 md:px-0">
            <Navbar />
            {children}
            <Footer />
            <Analytics />
            <SpeedInsights />
          </main>
        </ThemeProvider>
      </body>
    </html>
  )
}
