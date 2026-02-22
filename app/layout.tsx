import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Lorem Ipsum Generator - Free Placeholder Text Generator',
  description: 'Generate Lorem Ipsum placeholder text instantly. Create paragraphs, words, or sentences. Multiple styles including classic, hipster, and bacon ipsum. Free online tool.',
  keywords: 'lorem ipsum, placeholder text, dummy text, lorem generator, ipsum generator, text generator',
  openGraph: {
    title: 'Lorem Ipsum Generator - Free Placeholder Text Generator',
    description: 'Generate Lorem Ipsum placeholder text instantly. Multiple styles available.',
    type: 'website',
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={inter.className}>{children}</body>
    </html>
  )
}