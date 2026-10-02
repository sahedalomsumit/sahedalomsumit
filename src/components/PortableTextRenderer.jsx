import { useState } from 'react'
import { PortableText } from '@portabletext/react'
import { Copy, Check, ExternalLink } from 'lucide-react'
import { urlFor } from '../lib/sanity'
import MarkdownRenderer from './MarkdownRenderer'

function CodeSnippet({ value }) {
  const [copied, setCopied] = useState(false)
  const code = value?.code || ''
  const language = value?.language || 'code'
  const filename = value?.filename

  const handleCopy = () => {
    navigator.clipboard.writeText(code)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  return (
    <div
      className="my-8 rounded-2xl overflow-hidden border shadow-xl"
      style={{
        borderColor: 'rgba(255, 255, 255, 0.08)',
        backgroundColor: '#0c0a14',
      }}
    >
      <div
        className="flex items-center justify-between px-4 py-2.5 border-b text-xs font-mono"
        style={{
          borderColor: 'rgba(255, 255, 255, 0.08)',
          backgroundColor: 'rgba(255, 255, 255, 0.03)',
        }}
      >
        <div className="flex items-center gap-2">
          <span className="w-2.5 h-2.5 rounded-full bg-red-500/80 inline-block" />
          <span className="w-2.5 h-2.5 rounded-full bg-yellow-500/80 inline-block" />
          <span className="w-2.5 h-2.5 rounded-full bg-green-500/80 inline-block" />
          {filename ? (
            <span className="ml-2 text-gray-300 font-medium">{filename}</span>
          ) : (
            <span className="ml-2 text-violet-400 font-semibold uppercase tracking-wider">
              {language}
            </span>
          )}
        </div>
        <button
          onClick={handleCopy}
          className="flex items-center gap-1.5 px-2.5 py-1 rounded-lg text-[11px] font-mono transition-all hover:bg-white/10 active:scale-95"
          style={{ color: copied ? '#10b981' : '#94a3b8' }}
          title="Copy code"
        >
          {copied ? <Check className="w-3.5 h-3.5" /> : <Copy className="w-3.5 h-3.5" />}
          <span>{copied ? 'Copied!' : 'Copy'}</span>
        </button>
      </div>
      <div className="p-4 sm:p-5 overflow-x-auto">
        <pre className="font-mono text-xs sm:text-sm leading-relaxed text-gray-200">
          <code>{code}</code>
        </pre>
      </div>
    </div>
  )
}

function PortableImage({ value }) {
  if (!value?.asset) return null
  const imageUrl = urlFor(value).width(1200).auto('format').fit('max').url()

  return (
    <figure className="my-8">
      <div className="rounded-2xl overflow-hidden border border-white/10 bg-white/[0.02]">
        <img
          src={imageUrl}
          alt={value.alt || 'Blog illustration'}
          className="w-full h-auto object-cover max-h-[500px]"
          loading="lazy"
        />
      </div>
      {value.caption && (
        <figcaption className="mt-2.5 text-center text-xs text-gray-400 italic">
          {value.caption}
        </figcaption>
      )}
    </figure>
  )
}

const portableTextComponents = {
  types: {
    image: PortableImage,
    codeBlock: CodeSnippet,
  },
  block: {
    h2: ({ children }) => {
      const text = Array.isArray(children) ? children.join('') : String(children || '')
      const id = text.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '')
      return (
        <h2 id={id} className="text-2xl sm:text-3xl font-bold tracking-tight text-white mt-12 mb-5 pt-4 border-t border-white/5 scroll-mt-28">
          {children}
        </h2>
      )
    },
    h3: ({ children }) => {
      const text = Array.isArray(children) ? children.join('') : String(children || '')
      const id = text.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '')
      return (
        <h3 id={id} className="text-xl sm:text-2xl font-semibold tracking-tight text-white mt-8 mb-4 scroll-mt-28">
          {children}
        </h3>
      )
    },
    h4: ({ children }) => {
      const text = Array.isArray(children) ? children.join('') : String(children || '')
      const id = text.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '')
      return (
        <h4 id={id} className="text-lg font-semibold text-gray-200 mt-6 mb-3 scroll-mt-28">
          {children}
        </h4>
      )
    },
    normal: ({ children }) => (
      <p className="text-base sm:text-lg leading-relaxed text-gray-300 my-4 font-normal">
        {children}
      </p>
    ),
    blockquote: ({ children }) => (
      <blockquote
        className="my-6 pl-5 py-3 border-l-4 rounded-r-xl italic text-gray-200 text-base sm:text-lg"
        style={{
          borderColor: 'var(--accent, #8b5cf6)',
          backgroundColor: 'rgba(139, 92, 246, 0.05)',
        }}
      >
        {children}
      </blockquote>
    ),
  },
  list: {
    bullet: ({ children }) => (
      <ul className="my-4 ml-6 space-y-2 list-disc marker:text-violet-400 text-gray-300">
        {children}
      </ul>
    ),
    number: ({ children }) => (
      <ol className="my-4 ml-6 space-y-2 list-decimal marker:text-violet-400 marker:font-mono text-gray-300">
        {children}
      </ol>
    ),
  },
  listItem: {
    bullet: ({ children }) => (
      <li className="text-base sm:text-lg leading-relaxed text-gray-300 pl-1">
        {children}
      </li>
    ),
    number: ({ children }) => (
      <li className="text-base sm:text-lg leading-relaxed text-gray-300 pl-1">
        {children}
      </li>
    ),
  },
  marks: {
    strong: ({ children }) => <strong className="font-semibold text-white">{children}</strong>,
    em: ({ children }) => <em className="italic text-gray-200">{children}</em>,
    code: ({ children }) => (
      <code
        className="px-1.5 py-0.5 rounded-md font-mono text-[0.88em] border"
        style={{
          backgroundColor: 'rgba(139, 92, 246, 0.1)',
          borderColor: 'rgba(139, 92, 246, 0.25)',
          color: 'var(--accent-light, #c4b5fd)',
        }}
      >
        {children}
      </code>
    ),
    link: ({ value, children }) => {
      const isBlank = value?.blank !== false
      return (
        <a
          href={value?.href}
          target={isBlank ? '_blank' : undefined}
          rel={isBlank ? 'noopener noreferrer' : undefined}
          className="inline-flex items-center gap-0.5 text-violet-400 hover:text-violet-300 underline underline-offset-4 font-medium transition-colors"
        >
          <span>{children}</span>
          {isBlank && <ExternalLink className="w-3.5 h-3.5 inline opacity-70" />}
        </a>
      )
    },
  },
}

/**
 * Universal Post Content Renderer:
 * If post has Sanity Portable Text body, renders with @portabletext/react.
 * If post only has markdown content string, renders via MarkdownRenderer.
 */
export default function PortableTextRenderer({ body, content }) {
  if (Array.isArray(body) && body.length > 0) {
    return (
      <div className="prose prose-invert max-w-none">
        <PortableText value={body} components={portableTextComponents} />
      </div>
    )
  }

  if (typeof content === 'string' && content.trim()) {
    return <MarkdownRenderer content={content} />
  }

  return (
    <p className="text-gray-400 italic py-8">
      No content available for this post yet.
    </p>
  )
}
