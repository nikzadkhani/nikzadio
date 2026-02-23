import "./global.css";
import { Metadata } from "next";
import { Analytics } from "@vercel/analytics/react";
import { SpeedInsights } from "@vercel/speed-insights/next";
import { Header, ThemeProvider } from "@/layout";

import { baseUrl } from "./sitemap";
import { JsonLd } from "@/components/seo/json-ld";

export const metadata: Metadata = {
  metadataBase: new URL(baseUrl),
  title: {
    default: "Nikzad Khani",
    template: "%s | Nikzad Khani",
  },
  description:
    "Software Engineer specializing in Go and Python. Building scalable AI-driven applications and robust data pipelines.",
  keywords: [
    "Software Engineer",
    "Full Stack Developer",
    "Go",
    "Golang",
    "Python",
    "React",
    "Next.js",
    "AI",
    "Machine Learning",
    "Data Pipelines",
    "Boston",
  ],
  authors: [{ name: "Nikzad Khani", url: baseUrl }],
  creator: "Nikzad Khani",
  openGraph: {
    title: "Nikzad Khani",
    description: "Software Engineer specializing in Go and Python.",
    url: baseUrl,
    siteName: "Nikzad Khani",
    locale: "en_US",
    type: "website",
    images: [
      {
        url: "/me.jpg",
        width: 1200,
        height: 630,
        alt: "Nikzad Khani - Software Engineer",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Nikzad Khani",
    description: "Software Engineer specializing in Go and Python.",
    images: ["/me.jpg"],
    // creator: '@nikzadkhani', // Add if known
  },
  alternates: {
    canonical: baseUrl,
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html suppressHydrationWarning lang="en">
      <body className="bg-white text-stone-900 antialiased transition-colors duration-300 dark:bg-black dark:text-stone-100">
        <JsonLd />
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <Header />
          <main className="relative z-10 mx-auto min-h-screen max-w-3xl px-6 py-32">
            {children}
            <Analytics />
            <SpeedInsights />
          </main>
        </ThemeProvider>
      </body>
    </html>
  );
}
