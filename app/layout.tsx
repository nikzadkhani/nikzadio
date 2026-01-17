import './global.css'
import type { Metadata } from 'next'
import { GeistSans } from 'geist/font/sans'
import { GeistMono } from 'geist/font/mono'
import { Playfair_Display } from 'next/font/google'
import { Navbar } from '@/components/layout/nav'
import { Analytics } from '@vercel/analytics/react'
import { SpeedInsights } from '@vercel/speed-insights/next'
import Footer from '@/components/layout/footer'
import { baseUrl } from './sitemap'
import { ThemeProvider } from '@/components/layout/theme-provider'

const playfair = Playfair_Display({
  subsets: ['latin'],
  variable: '--font-serif',
  display: 'swap',
})

// ... (imports remain)

export const metadata: Metadata = {
  metadataBase: new URL(baseUrl),
  title: {
    default: 'Nikzad Khani',
    template: '%s | Nikzad Khani',
  },
  description: 'Software Engineer specializing in Go and Python.',
  openGraph: {
    title: 'Nikzad Khani',
    description: 'Software Engineer specializing in Go and Python.',
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

const cx = (...classes) => classes.filter(Boolean).join(' ')

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html
      suppressHydrationWarning
      lang="en"
    // className={cx(
    //   GeistSans.variable,
    //   GeistMono.variable,
    //   playfair.variable
    // )}
    >
      <body className="antialiased text-stone-800 dark:text-stone-200 bg-stone-50 dark:bg-stone-900 transition-colors duration-300">
        <div className="fixed inset-0 z-0 pointer-events-none">
          <div className="bg-noise" />
          {/* Primary Orb - Top Left */}
          <div className="absolute top-[-10%] left-[-10%] w-[600px] h-[600px] bg-purple-400/20 rounded-full blur-[120px] animate-liquid mix-blend-multiply dark:mix-blend-screen" />
          {/* Secondary Orb - Bottom Right */}
          <div className="absolute bottom-[0%] right-[-5%] w-[500px] h-[500px] bg-blue-400/20 rounded-full blur-[100px] animate-liquid [animation-delay:5s] mix-blend-multiply dark:mix-blend-screen" />
          {/* Tertiary Orb - Middle/Top Right */}
          <div className="absolute top-[20%] right-[10%] w-[400px] h-[400px] bg-teal-400/20 rounded-full blur-[90px] animate-liquid [animation-delay:10s] mix-blend-multiply dark:mix-blend-screen" />
        </div>
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem disableTransitionOnChange>
          <main className="flex-auto min-w-0 flex flex-col px-2 md:px-0 max-w-xl mx-4 mt-8 lg:mx-auto relative z-10">
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
