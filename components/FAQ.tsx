'use client'

import { useState } from 'react'
import { ChevronDownIcon, ChevronUpIcon } from '@heroicons/react/24/outline'

interface FAQItem {
  question: string
  answer: string
}

const faqs: FAQItem[] = [
  {
    question: "What is Lorem Ipsum and why do designers use it?",
    answer: "Lorem Ipsum is placeholder text used in the printing and typesetting industry since the 1500s. Designers use it because it has a normal distribution of letters, making it look like readable English without distracting from the design layout."
  },
  {
    question: "Is Lorem Ipsum just random Latin text?",
    answer: "No! Lorem Ipsum comes from sections 1.10.32 and 1.10.33 of 'de Finibus Bonorum et Malorum' (The Extremes of Good and Evil) by Cicero, written in 45 BC. The standard passage has been used since the 1500s."
  },
  {
    question: "How much Lorem Ipsum text should I generate?",
    answer: "It depends on your design needs. For headlines, 1-2 words work well. For body text mockups, 3-5 paragraphs are typical. For full page layouts, you might need 10-20 paragraphs. Our generator lets you customize the exact amount."
  },
  {
    question: "Can I use Lorem Ipsum in commercial projects?",
    answer: "Yes! Lorem Ipsum text is in the public domain and free to use in any project, commercial or personal. Just remember to replace it with real content before launching your final product."
  },
  {
    question: "Why does Lorem Ipsum start with 'Lorem ipsum dolor sit amet'?",
    answer: "This is the traditional beginning of the Lorem Ipsum passage, derived from Cicero's original Latin text. It's become the standard opening that designers recognize instantly, making it clear that the text is placeholder content."
  },
  {
    question: "Are there alternatives to Lorem Ipsum?",
    answer: "Yes! There are fun alternatives like Bacon Ipsum (meat-themed), Hipster Ipsum (trendy words), and Cupcake Ipsum (dessert-themed). However, traditional Lorem Ipsum remains the professional standard because it doesn't distract from the design."
  }
]

export default function FAQ() {
  const [openIndex, setOpenIndex] = useState<number | null>(null)

  const toggleFAQ = (index: number) => {
    setOpenIndex(openIndex === index ? null : index)
  }

  return (
    <section className="mt-16 mb-8">
      <h2 className="text-2xl font-bold mb-6">Frequently Asked Questions</h2>
      <div className="space-y-4">
        {faqs.map((faq, index) => (
          <div key={index} className="border border-gray-200 rounded-lg">
            <button
              onClick={() => toggleFAQ(index)}
              className="w-full px-6 py-4 text-left flex justify-between items-center hover:bg-gray-50 transition-colors"
            >
              <span className="font-medium">{faq.question}</span>
              {openIndex === index ? (
                <ChevronUpIcon className="h-5 w-5 text-gray-500 flex-shrink-0" />
              ) : (
                <ChevronDownIcon className="h-5 w-5 text-gray-500 flex-shrink-0" />
              )}
            </button>
            {openIndex === index && (
              <div className="px-6 py-4 border-t border-gray-200">
                <p className="text-gray-700">{faq.answer}</p>
              </div>
            )}
          </div>
        ))}
      </div>
    </section>
  )
}