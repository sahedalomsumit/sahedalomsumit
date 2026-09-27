import { useState } from 'react'
import { Copy, Check } from 'lucide-react'

function CodeBlock({ code, language }) {
  const [copied, setCopied] = useState(false)

  const handleCopy = () => {
    navigator.clipboard.writeText(code)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  return (
    <div className="my-6 rounded-2xl overflow-hidden border"
         style={{ borderColor: 'var(--border)', backgroundColor: 'var(--bg-secondary)' }}>
      <div className="flex items-center justify-between px-4 py-2.5 border-b text-xs font-mono"
           style={{ borderColor: 'var(--border)', backgroundColor: 'rgba(255, 255, 255, 0.02)' }}>
        <span className="text-violet-400 font-semibold uppercase tracking-wider">
          {language || 'code'}
        </span>
        <button
          onClick={handleCopy}
          className="flex items-center gap-1.5 px-2.5 py-1 rounded-lg text-[11px] font-mono transition-all hover:bg-white/10"
          style={{ color: copied ? '#10b981' : 'var(--text-muted)' }}
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

function parseInlineFormatting(text) {
  if (!text) return ''

  // Split into tokens for bold, italics, code, links
  const elements = []
  let remaining = text
  let key = 0

  while (remaining.length > 0) {
    // Inline code `code`
    const codeMatch = remaining.match(/^`([^`]+)`/)
    if (codeMatch) {
      elements.push(
        <code
          key={key++}
          className="px-1.5 py-0.5 rounded-md font-mono text-[0.85em] border"
          style={{
            backgroundColor: 'rgba(139, 92, 246, 0.08)',
            borderColor: 'rgba(139, 92, 246, 0.2)',
            color: 'var(--accent-light, #a78bfa)'
          }}
        >
          {codeMatch[1]}
        </code>
      )
      remaining = remaining.slice(codeMatch[0].length)
      continue
    }

    // Bold **text**
    const boldMatch = remaining.match(/^\*\*([^*]+)\*\*/)
    if (boldMatch) {
      elements.push(
        <strong key={key++} className="font-bold" style={{ color: 'var(--text-main)' }}>
          {boldMatch[1]}
        </strong>
      )
      remaining = remaining.slice(boldMatch[0].length)
      continue
    }

    // Italic *text*
    const italicMatch = remaining.match(/^\*([^*]+)\*/)
    if (italicMatch) {
      elements.push(
        <em key={key++} className="italic text-gray-300">
          {italicMatch[1]}
        </em>
      )
      remaining = remaining.slice(italicMatch[0].length)
      continue
    }

    // Links [text](url)
    const linkMatch = remaining.match(/^\[([^\]]+)\]\(([^)]+)\)/)
    if (linkMatch) {
      elements.push(
        <a
          key={key++}
          href={linkMatch[2]}
          target={linkMatch[2].startsWith('http') ? '_blank' : undefined}
          rel={linkMatch[2].startsWith('http') ? 'noopener noreferrer' : undefined}
          className="text-violet-400 hover:text-violet-300 underline underline-offset-4 decoration-violet-500/40 hover:decoration-violet-400 transition-colors"
        >
          {linkMatch[1]}
        </a>
      )
      remaining = remaining.slice(linkMatch[0].length)
      continue
    }

    // Normal text chunk up to next special character
    const nextSpecial = remaining.search(/[`*[]/)
    if (nextSpecial === -1) {
      elements.push(remaining)
      break
    } else if (nextSpecial === 0) {
      // Single delimiter that didn't match pattern
      elements.push(remaining[0])
      remaining = remaining.slice(1)
    } else {
      elements.push(remaining.slice(0, nextSpecial))
      remaining = remaining.slice(nextSpecial)
    }
  }

  return elements
}

export default function MarkdownRenderer({ content }) {
  if (!content) return null

  const lines = content.split('\n')
  const blocks = []
  let inCodeBlock = false
  let codeBuffer = []
  let codeLang = ''

  for (let i = 0; i < lines.length; i++) {
    const line = lines[i]

    // Code block open/close
    if (line.startsWith('```')) {
      if (inCodeBlock) {
        blocks.push({
          type: 'code',
          code: codeBuffer.join('\n'),
          language: codeLang,
        })
        inCodeBlock = false
        codeBuffer = []
        codeLang = ''
      } else {
        inCodeBlock = true
        codeLang = line.replace('```', '').trim()
        codeBuffer = []
      }
      continue
    }

    if (inCodeBlock) {
      codeBuffer.push(line)
      continue
    }

    // Horizontal Rule
    if (line.trim() === '---' || line.trim() === '***') {
      blocks.push({ type: 'hr' })
      continue
    }

    // Headings
    if (line.startsWith('### ')) {
      const headingText = line.replace('### ', '').trim()
      const id = headingText.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '')
      blocks.push({ type: 'h3', text: headingText, id })
      continue
    }

    if (line.startsWith('## ')) {
      const headingText = line.replace('## ', '').trim()
      const id = headingText.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '')
      blocks.push({ type: 'h2', text: headingText, id })
      continue
    }

    if (line.startsWith('# ')) {
      const headingText = line.replace('# ', '').trim()
      const id = headingText.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '')
      blocks.push({ type: 'h1', text: headingText, id })
      continue
    }

    // Blockquote
    if (line.startsWith('> ')) {
      blocks.push({ type: 'quote', text: line.replace('> ', '').trim() })
      continue
    }

    // Checklist item
    if (line.startsWith('- [x] ') || line.startsWith('- [ ] ')) {
      const isChecked = line.startsWith('- [x] ')
      const text = line.slice(6).trim()
      blocks.push({ type: 'checklist', isChecked, text })
      continue
    }

    // Unordered List
    if (line.startsWith('* ') || line.startsWith('- ')) {
      blocks.push({ type: 'li', text: line.slice(2).trim() })
      continue
    }

    // Ordered List
    const numMatch = line.match(/^(\d+)\.\s+(.*)/)
    if (numMatch) {
      blocks.push({ type: 'ol-li', num: numMatch[1], text: numMatch[2].trim() })
      continue
    }

    // Paragraph (skip empty lines)
    if (line.trim().length > 0) {
      blocks.push({ type: 'p', text: line.trim() })
    }
  }

  // Render collected blocks
  return (
    <div className="article-body space-y-5 text-base sm:text-lg leading-relaxed font-light"
         style={{ color: 'var(--text-muted)' }}>
      {blocks.map((block, idx) => {
        switch (block.type) {
          case 'h1':
            return (
              <h1
                key={idx}
                id={block.id}
                className="text-3xl sm:text-4xl md:text-5xl font-heading font-extrabold tracking-tight mt-10 mb-4 scroll-mt-32"
                style={{ color: 'var(--text-main)' }}
              >
                {parseInlineFormatting(block.text)}
              </h1>
            )
          case 'h2':
            return (
              <h2
                key={idx}
                id={block.id}
                className="text-2xl sm:text-3xl font-heading font-bold tracking-tight mt-12 mb-4 pt-4 border-t scroll-mt-32 flex items-center gap-3"
                style={{ color: 'var(--text-main)', borderColor: 'var(--border)' }}
              >
                <span className="w-2 h-2 rounded-full bg-violet-400" />
                <span>{parseInlineFormatting(block.text)}</span>
              </h2>
            )
          case 'h3':
            return (
              <h3
                key={idx}
                id={block.id}
                className="text-xl sm:text-2xl font-heading font-semibold tracking-tight mt-8 mb-3 scroll-mt-32"
                style={{ color: 'var(--text-main)' }}
              >
                {parseInlineFormatting(block.text)}
              </h3>
            )
          case 'p':
            return (
              <p key={idx} className="leading-relaxed">
                {parseInlineFormatting(block.text)}
              </p>
            )
          case 'quote':
            return (
              <blockquote
                key={idx}
                className="p-5 sm:p-6 my-6 rounded-2xl border-l-4 border-violet-500 bg-violet-500/[0.04] backdrop-blur-sm italic text-base sm:text-lg"
                style={{ color: 'var(--text-main)', borderColor: 'var(--accent)' }}
              >
                {parseInlineFormatting(block.text)}
              </blockquote>
            )
          case 'code':
            return (
              <CodeBlock
                key={idx}
                code={block.code}
                language={block.language}
              />
            )
          case 'li':
            return (
              <div key={idx} className="flex items-start gap-3 pl-2 sm:pl-4">
                <span className="w-1.5 h-1.5 rounded-full bg-violet-400 mt-2.5 shrink-0" />
                <span className="flex-1">{parseInlineFormatting(block.text)}</span>
              </div>
            )
          case 'ol-li':
            return (
              <div key={idx} className="flex items-start gap-3 pl-2 sm:pl-4">
                <span className="font-mono text-xs font-bold text-violet-400 px-2 py-0.5 rounded bg-violet-500/10 shrink-0 mt-0.5">
                  {block.num}
                </span>
                <span className="flex-1">{parseInlineFormatting(block.text)}</span>
              </div>
            )
          case 'checklist':
            return (
              <div key={idx} className="flex items-center gap-3 pl-2 sm:pl-4 py-1">
                <div className={`w-5 h-5 rounded-md flex items-center justify-center border text-xs ${
                  block.isChecked ? 'bg-emerald-500/20 border-emerald-500 text-emerald-400' : 'border-gray-600'
                }`}>
                  {block.isChecked ? '✓' : ''}
                </div>
                <span className={block.isChecked ? 'text-gray-200 font-medium' : ''}>
                  {parseInlineFormatting(block.text)}
                </span>
              </div>
            )
          case 'hr':
            return (
              <hr
                key={idx}
                className="my-10 border-t"
                style={{ borderColor: 'var(--border)' }}
              />
            )
          default:
            return null
        }
      })}
    </div>
  )
}
