'use client'

import { useState } from 'react'
import { LoremIpsum } from 'lorem-ipsum'

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
      words
    })

    let result = ''
    
    switch (generationType) {
      case 'paragraphs':
        const paragraphs = lorem.generateParagraphs(count).split('\n')
        if (startWithLorem && style === 'classic') {
          paragraphs[0] = 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, ' + 
            paragraphs[0].substring(paragraphs[0].indexOf(' ') + 1)
        }
        result = format === 'html' 
          ? paragraphs.map(p => `<p>${p}</p>`).join('\n\n')
          : paragraphs.join('\n\n')
        break
      case 'words':
        result = lorem.generateWords(count)
        if (startWithLorem && style === 'classic') {
          const words = result.split(' ')
          if (words.length >= 2) {
            words[0] = 'Lorem'
            words[1] = 'ipsum'
          }
          result = words.join(' ')
        }
        break
      case 'sentences':
        result = lorem.generateSentences(count)
        if (startWithLorem && style === 'classic') {
          result = 'Lorem ipsum dolor sit amet. ' + result
        }
        break
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
      console.error('Failed to copy:', err)
    }
  }

  const getMaxCount = () => {
    switch (generationType) {
      case 'paragraphs': return 20
      case 'words': return 1000
      case 'sentences': return 100
    }
  }

  return (
    <main className="min-h-screen bg-gray-50">
      <div className="container mx-auto px-4 py-8 max-w-4xl">
        <h1 className="text-4xl font-bold text-center mb-2">Lorem Ipsum Generator</h1>
        <p className="text-gray-600 text-center mb-8">
          Generate placeholder text for your designs and mockups
        </p>

        <div className="bg-white rounded-lg shadow-lg p-6 mb-8">
          <div className="grid md:grid-cols-2 gap-6">
            {/* Generation Type */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Generate by
              </label>
              <select
                value={generationType}
                onChange={(e) => {
                  setGenerationType(e.target.value as GenerationType)
                  setCount(3)
                }}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="paragraphs">Paragraphs</option>
                <option value="words">Words</option>
                <option value="sentences">Sentences</option>
              </select>
            </div>

            {/* Count */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Count: {count}
              </label>
              <input
                type="range"
                min="1"
                max={getMaxCount()}
                value={count}
                onChange={(e) => setCount(Number(e.target.value))}
                className="w-full"
              />
            </div>

            {/* Style */}
            <div>
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

            {/* Format */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Format
              </label>
              <select
                value={format}
                onChange={(e) => setFormat(e.target.value as 'plain' | 'html')}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="plain">Plain Text</option>
                <option value="html">HTML</option>
              </select>
            </div>
          </div>

          {/* Start with Lorem checkbox */}
          {style === 'classic' && (
            <div className="mt-4">
              <label className="flex items-center">
                <input
                  type="checkbox"
                  checked={startWithLorem}
                  onChange={(e) => setStartWithLorem(e.target.checked)}
                  className="mr-2"
                />
                <span className="text-sm text-gray-700">Start with "Lorem ipsum..."</span>
              </label>
            </div>
          )}

          {/* Generate Button */}
          <button
            onClick={generateText}
            className="w-full mt-6 px-6 py-3 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors font-medium"
          >
            Generate Text
          </button>
        </div>

        {/* Output */}
        {output && (
          <div className="bg-white rounded-lg shadow-lg p-6">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-lg font-semibold">Generated Text</h2>
              <button
                onClick={copyToClipboard}
                className={`px-4 py-2 rounded-md transition-colors ${
                  copied
                    ? 'bg-green-600 text-white'
                    : 'bg-gray-200 hover:bg-gray-300 text-gray-700'
                }`}
              >
                {copied ? 'Copied!' : 'Copy to Clipboard'}
              </button>
            </div>
            <div className="bg-gray-50 p-4 rounded-md">
              <pre className="whitespace-pre-wrap font-mono text-sm text-gray-800">
                {output}
              </pre>
            </div>
          </div>
        )}

        {/* SEO Content */}
        <div className="mt-12 prose max-w-none">
          <h2 className="text-2xl font-semibold mb-4">About Lorem Ipsum</h2>
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
        </div>
      </div>
    </main>
  )
}