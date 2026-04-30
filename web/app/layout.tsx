import type { Metadata } from 'next'
import { Instrument_Serif, Inter, JetBrains_Mono, Crimson_Text } from 'next/font/google'
import ClientShell from '@/components/layout/ClientShell'
import '@/styles/globals.css'
import '@/styles/animations.css'
import '@/styles/components.css'

const instrumentSerif = Instrument_Serif({
  subsets: ['latin'],
  weight: ['400'],
  style: ['normal', 'italic'],
  variable: '--font-instrument',
})

const inter = Inter({
  subsets: ['latin'],
  weight: ['300', '400', '500', '600', '700'],
  variable: '--font-inter',
})

const jetbrainsMono = JetBrains_Mono({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700'],
  variable: '--font-jbmono',
})

const crimsonText = Crimson_Text({
  subsets: ['latin'],
  weight: ['400', '600', '700'],
  variable: '--font-crimson',
})

export const metadata: Metadata = {
  title: 'America Works - Technical Workforce Excellence',
  description: 'America Works - 40 years of proven workforce development',
  icons: { icon: '/images/aw-logo-simple.png' },
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${instrumentSerif.variable} ${inter.variable} ${jetbrainsMono.variable} ${crimsonText.variable}`}>
      <body>
        <ClientShell>{children}</ClientShell>
      </body>
    </html>
  )
}
