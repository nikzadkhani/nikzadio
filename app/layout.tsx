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
      <body className="antialiased max-w-xl mx-4 mt-8 lg:mx-auto text-stone-800 bg-stone-50 dark:text-stone-200 dark:bg-stone-900">
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
