import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import Analytics from "@/components/Analytics";


const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Lorem Ipsum Generator - Free Placeholder Text Generator',
  description: 'Need placeholder text NOW? Generate Lorem Ipsum in 1 click. Choose paragraphs, words, or sentences. Classic, hipster & bacon styles. 100% free →',
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