import type { Metadata } from 'next'
import { GeistSans } from 'geist/font/sans'
import { GeistMono } from 'geist/font/mono'
import './globals.css'
import { ThemeProvider } from '@/components/theme-provider'
import CursorSpotlight from '@/components/cursor-spotlight'

export const metadata: Metadata = {
  title: 'Zemenay Tech Solutions',
  description: 'Zemenay Tech Solutions',
  generator: 'Zemenay Tech Solutions',
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <style>{`
html {
  font-family: ${GeistSans.style.fontFamily};
  --font-sans: ${GeistSans.variable};
  --font-mono: ${GeistMono.variable};
}
        `}</style>
      </head>
      <body>
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
          {children}
          <CursorSpotlight />
        </ThemeProvider>
      </body>
    </html>
  )
}
