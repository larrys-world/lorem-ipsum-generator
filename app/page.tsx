'use client'

import { useState, useEffect } from 'react'
import { LoremIpsum } from 'lorem-ipsum'
import RelatedTools from '@/components/RelatedTools'
import Breadcrumbs from '@/components/Breadcrumbs'
import FAQ from '@/components/FAQ'
import { HeaderAd, FooterAd, InContentAd } from '@/components/monetization/AdSense'

// AdSense configuration - replace with actual values when available
const ADSENSE_CLIENT = 'ca-pub-XXXXXXXXXXXXXXXX'
const ADSENSE_SLOTS = {
  header: 'XXXXXXXXXX',
  footer: 'XXXXXXXXXX',
  content: 'XXXXXXXXXX'
}

type GenerationType = 'paragraphs' | 'words' | 'sentences'
type LoremStyle = 'classic' | 'hipster' | 'bacon'

const hipsterWords = [
  'artisan', 'authentic', 'beard', 'bicycle', 'brooklyn', 'brunch', 'coffee',
  'craft', 'ethical', 'fixie', 'flannel', 'gastropub', 'gluten-free', 'helvetica',
  'kale', 'kombucha', 'latte', 'local', 'meditation', 'organic', 'portland',
  'quinoa', 'sustainable', 'tattoo', 'typewriter', 'vegan', 'vinyl', 'yoga'
]

const baconWords = [
  'bacon', 'beef', 'brisket', 'chicken', 'chuck', 'drumstick', 'fatback',
  'filet', 'flank', 'ham', 'hamburger', 'jerky', 'kielbasa', 'meatball',
  'meatloaf', 'pancetta', 'pastrami', 'pork', 'porchetta', 'prosciutto',
  'ribs', 'salami', 'sausage', 'shank', 'sirloin', 'steak', 'tenderloin',
  'turkey', 'venison'
]

export default function Home() {
  const [generationType, setGenerationType] = useState<GenerationType>('paragraphs')
  const [count, setCount] = useState(3)
  const [style, setStyle] = useState<LoremStyle>('classic')
  const [startWithLorem, setStartWithLorem] = useState(true)
  const [format, setFormat] = useState<'plain' | 'html'>('plain')
  const [output, setOutput] = useState('')
  const [copied, setCopied] = useState(false)

  // Add AdSense script
  useEffect(() => {
    const script = document.createElement('script')
    script.src = 'https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=' + ADSENSE_CLIENT
    script.async = true
    script.crossOrigin = 'anonymous'
    document.head.appendChild(script)

    return () => {
      document.head.removeChild(script)
    }
  }, [])

  const generateText = () => {
    let words: string[] | undefined
    
    switch (style) {
      case 'hipster':
        words = hipsterWords
        break
      case 'bacon':
        words = baconWords
        break
      default:
        words = undefined
    }

    const lorem = new LoremIpsum({
      sentencesPerParagraph: {
        max: 8,
        min: 4
      },
      wordsPerSentence: {
        max: 16,
        min: 4
      },
      words: words
    })

    let result = ''
    
    switch (generationType) {
      case 'paragraphs':
        result = lorem.generateParagraphs(count)
        if (format === 'html') {
          result = result.split('\n').map(p => `<p>${p}</p>`).join('\n')
        }
        break
      case 'sentences':
        result = lorem.generateSentences(count)
        break
      case 'words':
        result = lorem.generateWords(count)
        break
    }

    // Handle "Lorem ipsum..." start
    if (startWithLorem && style === 'classic') {
      const loremStart = 'Lorem ipsum dolor sit amet, consectetur adipiscing elit'
      if (!result.startsWith('Lorem ipsum')) {
        if (generationType === 'words' && count < 8) {
          result = loremStart.split(' ').slice(0, count).join(' ')
        } else {
          result = result.replace(/^[^.]+/, loremStart)
        }
      }
    }

    setOutput(result)
    setCopied(false)
  }

  const copyToClipboard = async () => {
    try {
      await navigator.clipboard.writeText(output)
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    } catch (err) {
      console.error('Failed to copy text: ', err)
    }
  }

  const downloadText = () => {
    const blob = new Blob([output], { type: 'text/plain' })
    const url = URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = `lorem-ipsum-${style}-${new Date().getTime()}.txt`
    document.body.appendChild(a)
    a.click()
    document.body.removeChild(a)
    URL.revokeObjectURL(url)
  }

  return (
    <main className="min-h-screen bg-gradient-to-b from-gray-50 to-gray-100">
      <Breadcrumbs />
      {/* Structured Data */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "WebApplication",
            "name": "Lorem Ipsum Generator",
            "description": "Generate placeholder text for your designs, mockups, and prototypes. Choose from classic Lorem Ipsum, Hipster Ipsum, or Bacon Ipsum.",
            "url": "https://larrys-world.github.io/lorem-ipsum-generator/",
            "applicationCategory": "UtilityApplication",
            "operatingSystem": "Any",
            "offers": {
              "@type": "Offer",
              "price": "0",
              "priceCurrency": "USD"
            },
            "featureList": [
              "Generate Lorem Ipsum text",
              "Choose paragraphs, words, or sentences",
              "Multiple styles: Classic, Hipster, Bacon",
              "Copy to clipboard",
              "Download as text file",
              "HTML formatting option"
            ],
            "screenshot": "https://larrys-world.github.io/lorem-ipsum-generator/og-image.png"
          })
        }}
      />      
      {/* Header Ad */}
      <HeaderAd client={ADSENSE_CLIENT} slot={ADSENSE_SLOTS.header} />
      
      <div className="container mx-auto px-4 py-8 max-w-6xl">
        <header className="text-center mb-8">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            Lorem Ipsum Generator
          </h1>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Generate placeholder text for your designs, mockups, and prototypes. 
            Choose from classic Lorem Ipsum, Hipster Ipsum, or Bacon Ipsum.
          </p>
        </header>

        <div className="grid md:grid-cols-3 gap-6 mb-8">
          {/* Controls */}
          <div className="md:col-span-1 space-y-6">
            <div className="bg-white rounded-lg shadow-md p-6">
              <h2 className="text-xl font-semibold mb-4">Options</h2>
              
              {/* Style Selection */}
              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Style
                </label>
                <select
                  value={style}
                  onChange={(e) => setStyle(e.target.value as LoremStyle)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  <option value="classic">Classic Lorem Ipsum</option>
                  <option value="hipster">Hipster Ipsum</option>
                  <option value="bacon">Bacon Ipsum</option>
                </select>
              </div>

              {/* Generation Type */}
              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Generate
                </label>
                <select
                  value={generationType}
                  onChange={(e) => setGenerationType(e.target.value as GenerationType)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  <option value="paragraphs">Paragraphs</option>
                  <option value="sentences">Sentences</option>
                  <option value="words">Words</option>
                </select>
              </div>

              {/* Count */}
              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Count: {count}
                </label>
                <input
                  type="range"
                  min="1"
                  max={generationType === 'words' ? 500 : 10}
                  value={count}
                  onChange={(e) => setCount(Number(e.target.value))}
                  className="w-full"
                />
              </div>

              {/* Format */}
              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Format
                </label>
                <div className="space-y-2">
                  <label className="flex items-center">
                    <input
                      type="radio"
                      value="plain"
                      checked={format === 'plain'}
                      onChange={(e) => setFormat(e.target.value as 'plain' | 'html')}
                      className="mr-2"
                    />
                    Plain Text
                  </label>
                  <label className="flex items-center">
                    <input
                      type="radio"
                      value="html"
                      checked={format === 'html'}
                      onChange={(e) => setFormat(e.target.value as 'plain' | 'html')}
                      className="mr-2"
                    />
                    HTML
                  </label>
                </div>
              </div>

              {/* Start with Lorem */}
              {style === 'classic' && (
                <div className="mb-4">
                  <label className="flex items-center">
                    <input
                      type="checkbox"
                      checked={startWithLorem}
                      onChange={(e) => setStartWithLorem(e.target.checked)}
                      className="mr-2"
                    />
                    Start with "Lorem ipsum..."
                  </label>
                </div>
              )}

              <button
                onClick={generateText}
                className="w-full bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 transition duration-200"
              >
                Generate Text
              </button>
            </div>
          </div>

          {/* Output */}
          <div className="md:col-span-2">
            <div className="bg-white rounded-lg shadow-md p-6 h-full">
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-xl font-semibold">Generated Text</h2>
                {output && (
                  <div className="space-x-2">
                    <button
                      onClick={copyToClipboard}
                      className={`px-4 py-2 rounded-md transition duration-200 ${
                        copied 
                          ? 'bg-green-600 text-white' 
                          : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                      }`}
                    >
                      {copied ? 'Copied!' : 'Copy'}
                    </button>
                    <button
                      onClick={downloadText}
                      className="px-4 py-2 bg-gray-200 text-gray-700 rounded-md hover:bg-gray-300 transition duration-200"
                    >
                      Download
                    </button>
                  </div>
                )}
              </div>
              
              <div className="bg-gray-50 rounded-md p-4 min-h-[400px] max-h-[600px] overflow-y-auto">
                {output ? (
                  <pre className="whitespace-pre-wrap font-sans text-gray-700">{output}</pre>
                ) : (
                  <p className="text-gray-400 italic">
                    Click "Generate Text" to create Lorem Ipsum placeholder text
                  </p>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* In-Content Ad */}
        <InContentAd client={ADSENSE_CLIENT} slot={ADSENSE_SLOTS.content} />

        {/* Related Tools Section */}
        <RelatedTools />

        {/* Info Section */}
        <div className="mt-12 bg-white rounded-lg shadow-md p-8">
          <h2 className="text-2xl font-bold mb-4">About Lorem Ipsum</h2>
          <p className="text-gray-600 mb-4">
            Lorem Ipsum is placeholder text commonly used in the printing and typesetting industry. 
            It has been the industry's standard dummy text since the 1500s, when an unknown printer 
            scrambled a galley of type to make a type specimen book.
          </p>
          
          <h3 className="text-xl font-semibold mb-3">Features</h3>
          <ul className="list-disc pl-6 text-gray-600 space-y-2">
            <li>Generate text by paragraphs, words, or sentences</li>
            <li>Classic Lorem Ipsum with proper Latin text</li>
            <li>Hipster Ipsum for modern, trendy placeholder text</li>
            <li>Bacon Ipsum for meat-lovers and food-related projects</li>
            <li>HTML or plain text output formats</li>
            <li>Optional "Lorem ipsum..." start for authenticity</li>
            <li>One-click copy to clipboard</li>
            <li>Responsive design works on all devices</li>
          </ul>

          <h3 className="text-xl font-semibold mb-3 mt-6">Why Use Lorem Ipsum?</h3>
          <p className="text-gray-600 mb-4">
            Lorem Ipsum helps designers and developers focus on visual design without being 
            distracted by readable content. It provides a realistic distribution of letters 
            and words that resembles actual text, making it perfect for mockups and prototypes.
          </p>

        <FAQ />
        </div>
      </div>
      
      {/* Footer Ad */}
      <FooterAd client={ADSENSE_CLIENT} slot={ADSENSE_SLOTS.footer} />
    </main>
  )
}