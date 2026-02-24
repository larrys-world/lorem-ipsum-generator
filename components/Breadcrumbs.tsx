import Link from 'next/link'

export default function Breadcrumbs() {
  return (
    <nav aria-label="Breadcrumb" className="bg-gray-50 py-3">
      <div className="container mx-auto px-4">
        <ol className="flex items-center space-x-2 text-sm">
          <li>
            <Link href="/" className="text-gray-600 hover:text-gray-800">
              Home
            </Link>
          </li>
          <li>
            <span className="mx-2 text-gray-400">/</span>
          </li>
          <li>
            <Link href="/tools" className="text-gray-600 hover:text-gray-800">
              Tools
            </Link>
          </li>
          <li>
            <span className="mx-2 text-gray-400">/</span>
          </li>
          <li>
            <span className="text-gray-800 font-medium">Lorem Ipsum Generator</span>
          </li>
        </ol>
      </div>
    </nav>
  )
}