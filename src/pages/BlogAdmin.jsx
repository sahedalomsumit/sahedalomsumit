import { useState, useEffect, useMemo, useRef } from 'react'
import { Link, useNavigate, useSearchParams } from 'react-router-dom'
import { 
  Sparkles, Plus, Trash2, Edit3, Check, CheckSquare, Square, 
  ArrowLeft, Send, Eye, BookOpen, Image, Tag, User, Clock, 
  Globe, RefreshCw, ExternalLink, Lock, Unlock, AlertCircle, CheckCircle2,
  LogOut, ArrowRight, Link2, RotateCcw
} from 'lucide-react'
import RevealOnScroll from '../components/RevealOnScroll'
import AdminAuthGate, { useAdminAuth } from '../components/AdminAuthGate'
import { supabase, createBlogPost, updateBlogPost, fetchBlogPostBySlug, fetchBlogMetadata, isSupabaseConfigured } from '../lib/supabase'
import { useSEO } from '../hooks/useSEO'
import { 
  formatBlogDescriptionWithAI, 
  smartOfflineFormat, 
  generateBlogTitleFromDescription, 
  generateBlogExcerptFromDescription 
} from '../lib/aiFormatter'

function BlogAdminContent() {
  const navigate = useNavigate()
  const [searchParams] = useSearchParams()
  const editSlug = searchParams.get('edit')
  const isEditing = Boolean(editSlug)
  const { logout, userEmail } = useAdminAuth()
  const [loadingEdit, setLoadingEdit] = useState(false)

  useSEO({
    title: isEditing ? `Edit Blog: ${editSlug}` : 'Create Blog Post',
    description: 'Admin portal to draft, format, and publish blogs directly to the Supabase blog_posts table.',
    canonical: '/blog/new',
    noindex: true,
  })

  // ── Form States ────────────────────────────────────────────────────────────
  const [title, setTitle] = useState('')
  const [slug, setSlug] = useState('')
  const [slugLocked, setSlugLocked] = useState(true)

  const [coverImage, setCoverImage] = useState('/img/portfolio/thumbnail-temp.webp')
  const [category, setCategory] = useState('App Development')
  const [newCategoryInput, setNewCategoryInput] = useState('')
  const [showAddCategory, setShowAddCategory] = useState(false)

  // Default checked tags: "#SahedAlomSumit", "#ProductDesign", "#ProductDevelopment"
  const [selectedTags, setSelectedTags] = useState([
    '#SahedAlomSumit',
    '#ProductDesign',
    '#ProductDevelopment',
  ])
  const [newTagInput, setNewTagInput] = useState('')
  const [showAddTag, setShowAddTag] = useState(false)

  const [authorName, setAuthorName] = useState('Sahed Alom Sumit')
  const [newAuthorInput, setNewAuthorInput] = useState('')
  const [showAddAuthor, setShowAddAuthor] = useState(false)

  const [authorRole, setAuthorRole] = useState('Product Designer & AI-Enhanced Web Developer')
  const [newRoleInput, setNewRoleInput] = useState('')
  const [showAddRole, setShowAddRole] = useState(false)
  const [editingRole, setEditingRole] = useState(false)
  const [editRoleInput, setEditRoleInput] = useState('')

  const [readingTime, setReadingTime] = useState('2 mins read')
  const [newReadingTimeInput, setNewReadingTimeInput] = useState('')
  const [showAddReadingTime, setShowAddReadingTime] = useState(false)

  const [excerpt, setExcerpt] = useState('')
  const [content, setContent] = useState('')
  const contentTextareaRef = useRef(null)

  const handleInsertHyperlink = () => {
    const textarea = contentTextareaRef.current
    try {
      if (!textarea) {
        setContent((c) => c + '[link text](https://example.com) ')
        return
      }

      const start = textarea.selectionStart
      const end = textarea.selectionEnd
      const selected = content.substring(start, end)

      let url = ''
      let text = ''

      if (selected && selected.trim()) {
        url = window.prompt(`Enter hyperlink URL for "${selected}":`, 'https://')
        if (url === null) return // User cancelled
        text = selected
      } else {
        url = window.prompt('Enter hyperlink URL (e.g. https://example.com):', 'https://')
        if (url === null) return // User cancelled
        text = window.prompt('Enter link display text:', 'link text') || 'link text'
      }

      const targetUrl = url.trim() || 'https://example.com'
      const targetText = text.trim() || 'link text'
      const markdownLink = `[${targetText}](${targetUrl})`

      const newContent = content.substring(0, start) + markdownLink + content.substring(end)
      setContent(newContent)

      setTimeout(() => {
        textarea.focus()
        const newPos = start + markdownLink.length
        textarea.setSelectionRange(newPos, newPos)
      }, 0)
    } catch {
      setContent((c) => c + '[link text](https://example.com) ')
    }
  }

  const applyMarkdownFormat = (prefix, suffix = '', defaultText = '') => {
    const textarea = contentTextareaRef.current
    if (!textarea) {
      setContent((c) => c + prefix + defaultText + suffix)
      return
    }

    const start = textarea.selectionStart
    const end = textarea.selectionEnd
    const selected = content.substring(start, end)
    const textToWrap = selected || defaultText

    // Check if it's a line-level prefix like '## ', '### ', '#### ', '##### ', '###### ', '- ', '> '
    const isLinePrefix = prefix.startsWith('#') || prefix.startsWith('- ') || prefix.startsWith('> ')

    if (isLinePrefix) {
      const before = content.substring(0, start)
      const after = content.substring(end)
      const lastNewline = before.lastIndexOf('\n')
      const lineStart = lastNewline === -1 ? 0 : lastNewline + 1
      const lineContent = content.substring(lineStart, end)

      // Toggle off if already starting with prefix
      if (lineContent.startsWith(prefix)) {
        const replacement = lineContent.substring(prefix.length)
        const newContent = content.substring(0, lineStart) + replacement + after
        setContent(newContent)
        setTimeout(() => {
          textarea.focus()
          textarea.setSelectionRange(lineStart, lineStart + replacement.length)
        }, 0)
        return
      }

      // If line starts with any other heading (# to ######), strip it first
      const strippedLine = lineContent.replace(/^#{1,6}\s*/, '')
      const replacement = prefix + (strippedLine || defaultText) + (suffix || '')
      const newContent = content.substring(0, lineStart) + replacement + after
      setContent(newContent)
      setTimeout(() => {
        textarea.focus()
        textarea.setSelectionRange(lineStart, lineStart + replacement.length)
      }, 0)
    } else {
      // Inline formatting like **bold**, *italic*, `code`
      const replacement = prefix + textToWrap + suffix
      const newContent = content.substring(0, start) + replacement + content.substring(end)
      setContent(newContent)
      setTimeout(() => {
        textarea.focus()
        if (selected) {
          textarea.setSelectionRange(start, start + replacement.length)
        } else {
          const innerPos = start + prefix.length
          textarea.setSelectionRange(innerPos, innerPos + defaultText.length)
        }
      }, 0)
    }
  }

  // ── AI Description Formatter States & Handlers ─────────────────────────────
  const [isFormattingAI, setIsFormattingAI] = useState(false)
  const [aiStatusText, setAiStatusText] = useState('')
  const [previousContent, setPreviousContent] = useState(null)
  const [aiSuccessBanner, setAiSuccessBanner] = useState(false)

  const handleAIFormatDescription = async () => {
    let textToFormat = content.trim()

    // If main content editor is empty, check if excerpt was entered
    if (!textToFormat) {
      if (excerpt.trim()) {
        textToFormat = excerpt.trim()
      } else {
        setStatusMessage({
          type: 'error',
          text: 'Please paste or write your plain text into the description editor first.',
        })
        if (contentTextareaRef.current) contentTextareaRef.current.focus()
        return
      }
    }

    try {
      setIsFormattingAI(true)
      setStatusMessage(null)
      setAiSuccessBanner(false)
      setAiStatusText('Analyzing text structure...')

      // Save previous content state for 1-click Undo
      setPreviousContent(content)

      const formatted = await formatBlogDescriptionWithAI(textToFormat, (status) => {
        setAiStatusText(status)
      })

      if (formatted && formatted.trim()) {
        setContent(formatted.trim())
        setAiSuccessBanner(true)
        setStatusMessage({
          type: 'success',
          text: '✨ Description successfully structured for SEO! (Headings, paragraphs, bold highlights, lists & links applied with zero content changes)',
        })
      }
    } catch (err) {
      console.error('AI formatting error:', err)
      try {
        const offlineFormatted = smartOfflineFormat(textToFormat)
        setContent(offlineFormatted)
        setAiSuccessBanner(true)
        setStatusMessage({
          type: 'success',
          text: '✨ Formatted with smart SEO structure (headings, paragraphs, lists & links applied).',
        })
      } catch (fallbackErr) {
        setStatusMessage({
          type: 'error',
          text: `Formatting failed: ${err.message || 'Unknown error'}.`,
        })
      }
    } finally {
      setIsFormattingAI(false)
      setAiStatusText('')
    }
  }

  const handleUndoAIFormat = () => {
    if (previousContent !== null) {
      setContent(previousContent)
      setPreviousContent(null)
      setAiSuccessBanner(false)
      setStatusMessage({
        type: 'info',
        text: 'Reverted back to previous text.',
      })
    }
  }

  // ── AI Title & Excerpt Generation States & Handlers ────────────────────────
  const [isGeneratingTitle, setIsGeneratingTitle] = useState(false)
  const [isGeneratingExcerpt, setIsGeneratingExcerpt] = useState(false)

  const handleAIGenerateTitle = async () => {
    const textSource = content.trim() || excerpt.trim()
    if (!textSource) {
      setStatusMessage({
        type: 'error',
        text: 'Please write or paste your blog description first so AI can generate a title from it.',
      })
      if (contentTextareaRef.current) contentTextareaRef.current.focus()
      return
    }

    try {
      setIsGeneratingTitle(true)
      setStatusMessage(null)
      const generated = await generateBlogTitleFromDescription(textSource)
      if (generated && generated.trim()) {
        handleTitleChange(generated.trim())
        setStatusMessage({
          type: 'success',
          text: `✨ Blog title generated from description: "${generated.trim()}"`,
        })
      }
    } catch (err) {
      console.error('Error generating title:', err)
      setStatusMessage({
        type: 'error',
        text: `Failed to generate title: ${err.message || 'Unknown error'}.`,
      })
    } finally {
      setIsGeneratingTitle(false)
    }
  }

  const handleAIGenerateExcerpt = async () => {
    const textSource = content.trim()
    if (!textSource) {
      setStatusMessage({
        type: 'error',
        text: 'Please write or paste your blog description first so AI can generate an excerpt from it.',
      })
      if (contentTextareaRef.current) contentTextareaRef.current.focus()
      return
    }

    try {
      setIsGeneratingExcerpt(true)
      setStatusMessage(null)
      const generated = await generateBlogExcerptFromDescription(textSource)
      if (generated && generated.trim()) {
        handleExcerptChange(generated.trim())
        setStatusMessage({
          type: 'success',
          text: '✨ Short description/excerpt generated from blog description!',
        })
      }
    } catch (err) {
      console.error('Error generating excerpt:', err)
      setStatusMessage({
        type: 'error',
        text: `Failed to generate excerpt: ${err.message || 'Unknown error'}.`,
      })
    } finally {
      setIsGeneratingExcerpt(false)
    }
  }

  // SEO Fields (auto-synced by default)
  const [seoTitle, setSeoTitle] = useState('')
  const [seoTitleCustom, setSeoTitleCustom] = useState(false)

  const [seoDescription, setSeoDescription] = useState('')
  const [seoDescriptionCustom, setSeoDescriptionCustom] = useState(false)

  const [isFeatured, setIsFeatured] = useState(false)
  const [isPublished, setIsPublished] = useState(true)

  // ── Metadata options (fetched from existing database posts) ────────────────
  const [categoriesList, setCategoriesList] = useState([
    'App Development',
  ])

  const [tagsList, setTagsList] = useState([
    '#SahedAlomSumit',
    '#ProductDesign',
    '#ProductDevelopment',
    '#AIAgents',
    '#FullStack',
    '#Vite',
    '#BentoGrid',
    '#Supabase',
    '#React',
  ])

  const [authorsList, setAuthorsList] = useState(['Sahed Alom Sumit'])
  const [rolesList, setRolesList] = useState([
    'Product Designer & AI-Enhanced Web Developer',
    'Lead Design Engineer',
    'Full-Stack Specialist',
    'UI/UX Architect',
  ])

  const [readingTimesList, setReadingTimesList] = useState([
    '2 mins read',
  ])

  // UI state
  const [activeTab, setActiveTab] = useState('editor') // 'editor' | 'preview'
  const [submitting, setSubmitting] = useState(false)
  const [submissionResult, setSubmissionResult] = useState(null)
  const [statusMessage, setStatusMessage] = useState(null)

  // ── Load Existing Metadata from Supabase ──────────────────────────────────
  useEffect(() => {
    async function loadMeta() {
      const meta = await fetchBlogMetadata()
      if (meta) {
        if (meta.categories?.length) setCategoriesList(meta.categories)
        if (meta.tags?.length) setTagsList(meta.tags)
        if (meta.authors?.length) setAuthorsList(meta.authors)
        if (meta.roles?.length) setRolesList(meta.roles)
        if (meta.readingTimes?.length) setReadingTimesList(meta.readingTimes)
      }
    }
    loadMeta()
  }, [])

  // ── Load Existing Post for Editing ────────────────────────────────────────
  useEffect(() => {
    if (!editSlug) return
    async function loadPostForEditing() {
      setLoadingEdit(true)
      const post = await fetchBlogPostBySlug(editSlug)
      if (post) {
        setTitle(post.title || '')
        setSlug(post.slug || '')
        setSlugLocked(false)
        setCoverImage(post.coverImage || '/img/portfolio/thumbnail-temp.webp')
        setCategory(post.category || 'AI & Automation')
        if (post.tags?.length) setSelectedTags(post.tags)
        if (post.authorName) setAuthorName(post.authorName)
        if (post.authorRole) setAuthorRole(post.authorRole)
        if (post.readingTime) setReadingTime(post.readingTime)
        setExcerpt(post.excerpt || '')
        setContent(post.content || '')
        setSeoTitle(post.seoTitle || post.title || '')
        setSeoTitleCustom(Boolean(post.seoTitle && post.seoTitle !== post.title))
        setSeoDescription(post.seoDescription || post.excerpt || '')
        setSeoDescriptionCustom(Boolean(post.seoDescription && post.seoDescription !== post.excerpt))
        setIsFeatured(Boolean(post.isFeatured))
        setIsPublished(post.isPublished !== undefined ? post.isPublished : true)
      } else {
        setStatusMessage({ type: 'error', text: `Could not load blog "${editSlug}" to edit.` })
      }
      setLoadingEdit(false)
    }
    loadPostForEditing()
  }, [editSlug])

  // ── Auto-slugify generator ────────────────────────────────────────────────
  const generateSlug = (text) => {
    return text
      .toLowerCase()
      .trim()
      .replace(/[^a-z0-9\s-]/g, '')
      .replace(/\s+/g, '-')
      .replace(/-+/g, '-')
      .replace(/^-+|-+$/g, '')
  }

  // Sync slug with title when locked
  const handleTitleChange = (val) => {
    setTitle(val)
    if (slugLocked) {
      setSlug(generateSlug(val))
    }
    if (!seoTitleCustom) {
      setSeoTitle(val)
    }
  }

  // Sync SEO description with excerpt when not customized
  const handleExcerptChange = (val) => {
    setExcerpt(val)
    if (!seoDescriptionCustom) {
      setSeoDescription(val)
    }
  }

  // ── Category Handlers ─────────────────────────────────────────────────────
  const handleAddNewCategory = () => {
    const trimmed = newCategoryInput.trim()
    if (!trimmed) return
    if (!categoriesList.includes(trimmed)) {
      setCategoriesList([...categoriesList, trimmed])
    }
    setCategory(trimmed)
    setNewCategoryInput('')
    setShowAddCategory(false)
  }

  // ── Tag Handlers ──────────────────────────────────────────────────────────
  const toggleTag = (tag) => {
    if (selectedTags.includes(tag)) {
      setSelectedTags(selectedTags.filter((t) => t !== tag))
    } else {
      setSelectedTags([...selectedTags, tag])
    }
  }

  const handleAddNewTag = () => {
    const raw = newTagInput.trim()
    if (!raw) return
    const formattedTag = raw.startsWith('#') ? raw : `#${raw}`
    if (!tagsList.includes(formattedTag)) {
      setTagsList([...tagsList, formattedTag])
    }
    if (!selectedTags.includes(formattedTag)) {
      setSelectedTags([...selectedTags, formattedTag])
    }
    setNewTagInput('')
    setShowAddTag(false)
  }

  // ── Author Handlers ───────────────────────────────────────────────────────
  const handleAddNewAuthor = () => {
    const trimmed = newAuthorInput.trim()
    if (!trimmed) return
    if (!authorsList.includes(trimmed)) {
      setAuthorsList([...authorsList, trimmed])
    }
    setAuthorName(trimmed)
    setNewAuthorInput('')
    setShowAddAuthor(false)
  }

  // ── Role Handlers ─────────────────────────────────────────────────────────
  const handleAddNewRole = () => {
    const trimmed = newRoleInput.trim()
    if (!trimmed) return
    if (!rolesList.includes(trimmed)) {
      setRolesList([...rolesList, trimmed])
    }
    setAuthorRole(trimmed)
    setNewRoleInput('')
    setShowAddRole(false)
  }

  const startEditRole = () => {
    setEditRoleInput(authorRole)
    setEditingRole(true)
  }

  const saveEditRole = () => {
    const trimmed = editRoleInput.trim()
    if (!trimmed) return
    setRolesList(rolesList.map((r) => (r === authorRole ? trimmed : r)))
    setAuthorRole(trimmed)
    setEditingRole(false)
  }

  // ── Reading Time Handlers ─────────────────────────────────────────────────
  const handleAddNewReadingTime = () => {
    const trimmed = newReadingTimeInput.trim()
    if (!trimmed) return
    if (!readingTimesList.includes(trimmed)) {
      setReadingTimesList([...readingTimesList, trimmed])
    }
    setReadingTime(trimmed)
    setNewReadingTimeInput('')
    setShowAddReadingTime(false)
  }

  // ── Form Submission to Supabase ───────────────────────────────────────────
  const handleSubmit = async (e) => {
    e.preventDefault()
    setSubmitting(true)
    setStatusMessage(null)

    if (!title.trim()) {
      setStatusMessage({ type: 'error', text: 'Please enter a blog title.' })
      setSubmitting(false)
      return
    }

    if (!excerpt.trim()) {
      setStatusMessage({ type: 'error', text: 'Please enter a short description/excerpt.' })
      setSubmitting(false)
      return
    }

    if (!content.trim()) {
      setStatusMessage({ type: 'error', text: 'Please write blog content.' })
      setSubmitting(false)
      return
    }

    const finalSlug = slug.trim() ? generateSlug(slug) : generateSlug(title)

    const postPayload = {
      title: title.trim(),
      slug: finalSlug,
      coverImage: coverImage.trim() || '/img/portfolio/thumbnail-temp.webp',
      category: category,
      tags: selectedTags,
      authorName: authorName,
      authorRole: authorRole,
      authorAvatar: '/img/sahedalomsumit-profile-purple.png',
      readingTime: readingTime,
      excerpt: excerpt.trim(),
      content: content.trim(),
      seoTitle: seoTitle.trim() || title.trim(),
      seoDescription: seoDescription.trim() || excerpt.trim(),
      isFeatured: isFeatured,
      isPublished: isPublished,
      publishedAt: new Date().toISOString(),
    }

    let result
    if (isEditing) {
      result = await updateBlogPost(editSlug, postPayload)
    } else {
      result = await createBlogPost(postPayload)
    }

    const { data, error } = result

    if (error) {
      console.error('Error saving blog post:', error)
      setStatusMessage({
        type: 'error',
        text: `Supabase Error: ${error.message || 'Operation failed.'}. Make sure the RLS migration was run in Supabase.`,
      })
      setSubmitting(false)
      return
    }

    setStatusMessage({
      type: 'success',
      text: isEditing
        ? `Post "${title}" updated successfully in Supabase!`
        : `Post "${title}" was published to Supabase successfully!`,
    })
    setSubmissionResult({
      slug: finalSlug,
      title: title,
      isEditing: isEditing,
    })
    setSubmitting(false)
  }

  // Reset form to draft another post
  const handleReset = () => {
    setTitle('')
    setSlug('')
    setSlugLocked(true)
    setCoverImage('/img/portfolio/thumbnail-temp.webp')
    setCategory(categoriesList[0] || 'AI & Automation')
    setSelectedTags(['#SahedAlomSumit', '#ProductDesign', '#ProductDevelopment'])
    setAuthorName('Sahed Alom Sumit')
    setAuthorRole('Product Designer & AI-Enhanced Web Developer')
    setReadingTime('3 mins read')
    setExcerpt('')
    setContent('')
    setPreviousContent(null)
    setAiSuccessBanner(false)
    setSeoTitle('')
    setSeoTitleCustom(false)
    setSeoDescription('')
    setSeoDescriptionCustom(false)
    setIsFeatured(false)
    setIsPublished(true)
    setSubmissionResult(null)
    setStatusMessage(null)
  }

  return (
    <div className="min-h-screen py-10 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
      {/* Top Header */}
      <RevealOnScroll>
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8 pb-6 border-b"
             style={{ borderColor: 'var(--border)' }}>
          <div>
            <div className="flex items-center gap-3 mb-3">
              <Link
                to="/blog/admin"
                className="inline-flex items-center gap-1.5 text-xs font-mono text-emerald-400 hover:text-emerald-300 transition-colors"
              >
                <ArrowLeft className="w-3.5 h-3.5" />
                <span>Back to Blog Management (/blog/admin)</span>
              </Link>
            </div>
            <div className="flex items-center gap-3">
              <h1 className="text-2xl sm:text-3xl font-heading font-black tracking-tight"
                  style={{ color: 'var(--text-main)' }}>
                {isEditing ? 'Update Blog Post' : 'Create Blog Post'}
              </h1>
              <span className="pill-badge text-emerald-400 border-emerald-500/20 bg-emerald-500/10 text-[11px]">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                {isEditing ? `Editing: ${editSlug}` : 'Studio: /blog/new'}
              </span>
            </div>
            <p className="text-xs sm:text-sm mt-1 font-light" style={{ color: 'var(--text-muted)' }}>
              {isEditing
                ? 'Update copy, replace cover images, change tags, author roles, or toggle published status directly in Supabase.'
                : 'Configure defaults, categories, tags, authors, roles, and publish directly to PostgreSQL.'}
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-2">
            <button
              type="button"
              onClick={() => setActiveTab(activeTab === 'editor' ? 'preview' : 'editor')}
              className="px-4 py-2 rounded-xl text-xs font-mono font-medium border flex items-center gap-2 transition-all hover:bg-white/[0.04]"
              style={{ borderColor: 'var(--border)', color: 'var(--text-main)' }}
            >
              <Eye className="w-3.5 h-3.5 text-violet-400" />
              {activeTab === 'editor' ? 'Live Card Preview' : 'Back to Editor'}
            </button>
            <button
              type="button"
              onClick={handleReset}
              className="px-4 py-2 rounded-xl text-xs font-mono border flex items-center gap-1.5 text-gray-400 hover:text-white hover:bg-white/[0.04] transition-all"
              style={{ borderColor: 'var(--border)' }}
            >
              <RefreshCw className="w-3.5 h-3.5" />
              Reset Form
            </button>
            <button
              type="button"
              onClick={logout}
              className="px-3.5 py-2 rounded-xl text-xs font-mono border border-rose-500/20 bg-rose-500/10 text-rose-400 hover:bg-rose-500 hover:text-white transition flex items-center gap-1.5"
            >
              <LogOut className="w-3.5 h-3.5" />
              <span>Lock Studio</span>
            </button>
          </div>
        </div>
      </RevealOnScroll>

      {/* Success Modal / Banner */}
      {submissionResult && (
        <div className="bento-card p-6 mb-8 border border-emerald-500/40 bg-emerald-500/10 text-emerald-300 rounded-2xl flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <CheckCircle2 className="w-6 h-6 text-emerald-400 flex-shrink-0" />
            <div>
              <p className="font-semibold text-sm text-emerald-300">
                {submissionResult.isEditing ? 'Blog updated successfully in Supabase!' : 'Blog published successfully to Supabase!'}
              </p>
              <p className="text-xs text-emerald-400/80">Slug: /blog/{submissionResult.slug}</p>
            </div>
          </div>
          <div className="flex flex-wrap items-center gap-3">
            <Link
              to={`/blog/${submissionResult.slug}`}
              className="px-4 py-2 bg-emerald-500 hover:bg-emerald-400 text-black font-bold text-xs rounded-xl flex items-center gap-1.5 transition-all shadow-lg shadow-emerald-500/20"
            >
              <span>View Blog</span>
              <ExternalLink className="w-3.5 h-3.5" />
            </Link>
            <Link
              to="/blog/admin"
              className="px-4 py-2 bg-white/10 hover:bg-white/20 text-white font-bold text-xs rounded-xl flex items-center gap-1.5 transition-all"
            >
              <span>Manage Blogs</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
            <button
              type="button"
              onClick={handleReset}
              className="px-4 py-2 rounded-xl text-xs font-mono border border-emerald-500/30 text-emerald-200 hover:bg-emerald-500/20 transition-all"
            >
              Write Another
            </button>
          </div>
        </div>
      )}

      {/* Status Alerts */}
      {statusMessage && statusMessage.type === 'error' && (
        <div className="bento-card p-4 mb-6 border border-rose-500/40 bg-rose-500/10 text-rose-300 rounded-2xl flex items-center justify-between gap-3">
          <div className="flex items-center gap-3">
            <AlertCircle className="w-5 h-5 text-rose-400 flex-shrink-0" />
            <p className="text-xs">{statusMessage.text}</p>
          </div>
          <button onClick={() => setStatusMessage(null)} className="text-xs text-rose-400 hover:text-white px-2">✕</button>
        </div>
      )}
      {statusMessage && statusMessage.type === 'info' && (
        <div className="bento-card p-4 mb-6 border border-blue-500/40 bg-blue-500/10 text-blue-300 rounded-2xl flex items-center justify-between gap-3">
          <div className="flex items-center gap-3">
            <Check className="w-5 h-5 text-blue-400 flex-shrink-0" />
            <p className="text-xs">{statusMessage.text}</p>
          </div>
          <button onClick={() => setStatusMessage(null)} className="text-xs text-blue-400 hover:text-white px-2">✕</button>
        </div>
      )}
      {statusMessage && statusMessage.type === 'success' && !submissionResult && (
        <div className="bento-card p-4 mb-6 border border-emerald-500/40 bg-emerald-500/10 text-emerald-300 rounded-2xl flex items-center justify-between gap-3">
          <div className="flex items-center gap-3">
            <CheckCircle2 className="w-5 h-5 text-emerald-400 flex-shrink-0" />
            <p className="text-xs">{statusMessage.text}</p>
          </div>
          <button onClick={() => setStatusMessage(null)} className="text-xs text-emerald-400 hover:text-white px-2">✕</button>
        </div>
      )}

      {activeTab === 'preview' ? (
        /* ── Live Card Preview Tab ── */
        <div className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* 1. Website Feed Card Preview */}
            <div className="bento-card p-6 sm:p-8 rounded-2xl">
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-xs font-mono uppercase tracking-wider text-violet-400">
                  Website Card Preview (/blog)
                </h2>
                <span className="text-[10px] font-mono px-2 py-0.5 rounded-full border border-violet-500/20 bg-violet-500/10 text-violet-300">
                  Grid Tile
                </span>
              </div>
              <div className="bento-card p-5 rounded-2xl border" style={{ borderColor: 'var(--border)' }}>
                <div className="aspect-[16/9] rounded-xl overflow-hidden mb-4 border relative" style={{ borderColor: 'var(--border)' }}>
                  <img
                    src={coverImage}
                    alt={title || 'Cover thumbnail'}
                    className="w-full h-full object-cover"
                    onError={(e) => {
                      e.currentTarget.src = '/img/portfolio/thumbnail-temp.webp'
                    }}
                  />
                  <div className="absolute top-3 left-3">
                    <span className="pill-badge bg-black/70 backdrop-blur text-violet-400 border-violet-500/30 text-[10px]">
                      {category}
                    </span>
                  </div>
                </div>
                <div className="flex items-center gap-3 text-xs font-mono mb-2" style={{ color: 'var(--text-dim)' }}>
                  <span>{readingTime}</span>
                  <span>•</span>
                  <span>Just Now</span>
                </div>
                <h3 className="text-lg font-heading font-bold mb-2 line-clamp-2" style={{ color: 'var(--text-main)' }}>
                  {title || 'Blog Title Preview'}
                </h3>
                <p className="text-xs line-clamp-3 mb-4 font-light" style={{ color: 'var(--text-muted)' }}>
                  {excerpt || 'Short description will appear here as the blog summary teaser.'}
                </p>
                <div className="flex flex-wrap gap-1.5 mb-4">
                  {selectedTags.map((t, idx) => (
                    <span key={idx} className="text-[10px] font-mono px-2 py-0.5 rounded-full border bg-white/[0.02]"
                          style={{ borderColor: 'var(--border)', color: 'var(--text-muted)' }}>
                      {t.startsWith('#') ? t : `#${t}`}
                    </span>
                  ))}
                </div>
                <div className="pt-3 border-t flex items-center justify-between text-xs" style={{ borderColor: 'var(--border)' }}>
                  <div className="flex items-center gap-2">
                    <div className="w-6 h-6 rounded-full bg-violet-600 flex items-center justify-center font-bold text-[10px] text-white">
                      {authorName.charAt(0)}
                    </div>
                    <div>
                      <span className="block font-medium text-[11px]" style={{ color: 'var(--text-main)' }}>{authorName}</span>
                      <span className="block text-[9px]" style={{ color: 'var(--text-dim)' }}>{authorRole}</span>
                    </div>
                  </div>
                  <span className="text-violet-400 font-mono text-xs">Read Blog →</span>
                </div>
              </div>
            </div>

            {/* 2. Social Share Link Card Preview (Twitter/X, LinkedIn, Facebook, Slack) */}
            <div className="bento-card p-6 sm:p-8 rounded-2xl">
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-xs font-mono uppercase tracking-wider text-emerald-400">
                  Social Share Preview Card
                </h2>
                <span className="text-[10px] font-mono px-2 py-0.5 rounded-full border border-emerald-500/30 bg-emerald-500/10 text-emerald-300">
                  Twitter / X • LinkedIn • FB
                </span>
              </div>
              <div className="rounded-2xl overflow-hidden border shadow-xl bg-black/60" style={{ borderColor: 'var(--border)' }}>
                {/* 16:9 Image Preview using same blog cover image */}
                <div className="aspect-[16/9] w-full overflow-hidden bg-black/40 relative">
                  <img
                    src={coverImage}
                    alt={title || 'Social card cover image'}
                    className="w-full h-full object-cover"
                    onError={(e) => {
                      e.currentTarget.src = '/img/portfolio/thumbnail-temp.webp'
                    }}
                  />
                  <div className="absolute top-2.5 right-2.5">
                    <span className="text-[9px] font-mono px-2 py-0.5 rounded bg-black/80 backdrop-blur text-emerald-400 border border-emerald-500/30">
                      og:image
                    </span>
                  </div>
                </div>

                {/* Social Card Metadata Box */}
                <div className="p-4 space-y-1.5 border-t" style={{ borderColor: 'var(--border)' }}>
                  <div className="text-[10px] font-mono uppercase tracking-wider text-violet-400 flex items-center gap-1.5">
                    <span>sahedalomsumit.com</span>
                    <span>•</span>
                    <span>Article</span>
                  </div>
                  <h3 className="text-base font-heading font-bold line-clamp-2 leading-snug" style={{ color: 'var(--text-main)' }}>
                    {title || 'Blog Title Preview'}
                  </h3>
                  <p className="text-xs font-light line-clamp-2 leading-relaxed" style={{ color: 'var(--text-muted)' }}>
                    {excerpt || 'The excerpt or description that will appear on social media platforms when shared.'}
                  </p>
                </div>
              </div>
              <p className="text-[11px] font-mono text-center mt-3" style={{ color: 'var(--text-dim)' }}>
                ✓ Uses same blog image and title for Twitter summary_large_image & OpenGraph
              </p>
            </div>
          </div>
        </div>
      ) : (
        /* ── Main Form Editor ── */
        <form onSubmit={handleSubmit} className="space-y-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
            {/* Left 8 Cols: Core Blog Fields */}
            <div className="lg:col-span-8 space-y-6">
              {/* Title & Slug */}
              <div className="bento-card p-6 sm:p-8 rounded-2xl space-y-5">
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <label className="text-xs font-mono uppercase tracking-wider font-semibold"
                           style={{ color: 'var(--text-main)' }}>
                      Blog Title <span className="text-rose-400">*</span>
                    </label>
                    <button
                      type="button"
                      onClick={handleAIGenerateTitle}
                      disabled={isGeneratingTitle}
                      className="px-2.5 py-1 text-[11px] font-mono font-medium rounded-lg bg-gradient-to-r from-violet-600 to-indigo-600 hover:from-violet-500 hover:to-indigo-500 text-white flex items-center gap-1.5 transition-all shadow-sm shadow-violet-500/20 disabled:opacity-50 disabled:cursor-wait hover:scale-[1.02] active:scale-[0.98]"
                      title="AI Assistant: Generate high-converting SEO title automatically from your blog description"
                    >
                      <Sparkles className={`w-3 h-3 text-amber-300 ${isGeneratingTitle ? 'animate-spin' : ''}`} />
                      <span>{isGeneratingTitle ? 'Generating...' : 'AI Generate Title'}</span>
                    </button>
                  </div>
                  <input
                    type="text"
                    required
                    value={title}
                    onChange={(e) => handleTitleChange(e.target.value)}
                    placeholder="My First Android App, Salah Tracker App, Is Now Live on Google Play Store"
                    className="w-full px-4 py-3.5 rounded-xl border text-base sm:text-lg font-heading font-bold outline-none focus:border-violet-500 transition-colors"
                    style={{
                      background: 'var(--card-bg)',
                      borderColor: 'var(--border)',
                      color: 'var(--text-main)',
                    }}
                  />
                </div>

                {/* Slug with Hyphens by Default */}
                <div>
                  <div className="flex items-center justify-between mb-1.5">
                    <label className="text-xs font-mono uppercase tracking-wider" style={{ color: 'var(--text-dim)' }}>
                      URL Slug (Hyphenated by Default)
                    </label>
                    <button
                      type="button"
                      onClick={() => setSlugLocked(!slugLocked)}
                      className="text-[11px] font-mono flex items-center gap-1 text-violet-400 hover:text-violet-300"
                    >
                      {slugLocked ? (
                        <>
                          <Lock className="w-3 h-3" /> Auto-sync with Title
                        </>
                      ) : (
                        <>
                          <Unlock className="w-3 h-3" /> Editing Custom Slug
                        </>
                      )}
                    </button>
                  </div>
                  <div className="flex items-center rounded-xl border overflow-hidden"
                       style={{ background: 'var(--card-bg)', borderColor: 'var(--border)' }}>
                    <span className="px-3.5 text-xs font-mono text-gray-500 border-r"
                          style={{ borderColor: 'var(--border)' }}>
                      /blog/
                    </span>
                    <input
                      type="text"
                      value={slug}
                      readOnly={slugLocked}
                      onChange={(e) => setSlug(generateSlug(e.target.value))}
                      placeholder="auto-generated-title-with-hyphens"
                      className="w-full px-3 py-2.5 text-xs font-mono outline-none"
                      style={{
                        background: 'transparent',
                        color: slugLocked ? 'var(--text-muted)' : 'var(--text-main)',
                      }}
                    />
                  </div>
                </div>

                {/* Excerpt / Short Description */}
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <label className="text-xs font-mono uppercase tracking-wider font-semibold"
                           style={{ color: 'var(--text-main)' }}>
                      Excerpt <span className="text-rose-400">*</span>
                    </label>
                    <button
                      type="button"
                      onClick={handleAIGenerateExcerpt}
                      disabled={isGeneratingExcerpt}
                      className="px-2.5 py-1 text-[11px] font-mono font-medium rounded-lg bg-gradient-to-r from-indigo-600 to-emerald-600 hover:from-indigo-500 hover:to-emerald-500 text-white flex items-center gap-1.5 transition-all shadow-sm shadow-indigo-500/20 disabled:opacity-50 disabled:cursor-wait hover:scale-[1.02] active:scale-[0.98]"
                      title="AI Assistant: Generate concise 1-2 sentence SEO excerpt hook automatically from your blog description"
                    >
                      <Sparkles className={`w-3 h-3 text-amber-300 ${isGeneratingExcerpt ? 'animate-spin' : ''}`} />
                      <span>{isGeneratingExcerpt ? 'Generating...' : 'AI Generate Excerpt'}</span>
                    </button>
                  </div>
                  <textarea
                    rows={3}
                    required
                    value={excerpt}
                    onChange={(e) => handleExcerptChange(e.target.value)}
                    placeholder="Brief 1-2 sentence hook explaining what readers will discover..."
                    className="w-full px-4 py-3 rounded-xl border text-sm font-light leading-relaxed outline-none focus:border-violet-500 transition-colors"
                    style={{
                      background: 'var(--card-bg)',
                      borderColor: 'var(--border)',
                      color: 'var(--text-main)',
                    }}
                  />
                  <div className="flex items-center justify-between text-[11px] mt-1 font-mono text-gray-500">
                    <span>By default, this will automatically sync to your SEO meta description.</span>
                    {excerpt.length > 0 && <span>{excerpt.length} chars</span>}
                  </div>
                </div>
              </div>

              {/* Markdown Content Editor */}
              <div className="bento-card p-6 sm:p-8 rounded-2xl space-y-4">
                <div className="flex flex-wrap items-center justify-between gap-2">
                  <div>
                    <label className="text-xs font-mono uppercase tracking-wider font-semibold flex items-center gap-2"
                           style={{ color: 'var(--text-main)' }}>
                      <span>Blog Description / Body (Markdown Supported)</span>
                      <span className="text-rose-400">*</span>
                    </label>
                    <p className="text-[11px] text-gray-500 font-mono mt-0.5">
                      Paste or write plain text — use the AI Assistant to structure for best SEO without changing your words.
                    </p>
                  </div>
                  <div className="flex items-center gap-3">
                    {previousContent !== null && (
                      <button
                        type="button"
                        onClick={handleUndoAIFormat}
                        className="px-2.5 py-1 text-[11px] font-mono rounded-lg border border-amber-500/30 bg-amber-500/10 text-amber-300 hover:bg-amber-500/20 transition-all flex items-center gap-1.5"
                        title="Revert back to plain text before AI formatting"
                      >
                        <RotateCcw className="w-3 h-3" />
                        <span>Undo AI</span>
                      </button>
                    )}
                    <span className="text-[11px] font-mono" style={{ color: 'var(--text-dim)' }}>
                      {content.split(/\s+/).filter(Boolean).length} words
                    </span>
                  </div>
                </div>

                {/* AI Formatting Progress Indicator */}
                {isFormattingAI && (
                  <div className="p-3 rounded-xl border border-violet-500/30 bg-violet-500/10 text-violet-300 text-xs font-mono flex flex-wrap items-center justify-between gap-2 animate-pulse">
                    <div className="flex items-center gap-2">
                      <Sparkles className="w-4 h-4 text-amber-300 animate-spin flex-shrink-0" />
                      <span>{aiStatusText || 'Structuring description with headings, paragraphs, lists & bold highlights...'}</span>
                    </div>
                    <span className="text-[10px] text-violet-400/80 font-mono">100% content preservation</span>
                  </div>
                )}

                {/* AI Success Feedback Banner */}
                {aiSuccessBanner && !isFormattingAI && (
                  <div className="p-3 rounded-xl border border-emerald-500/30 bg-emerald-500/10 text-emerald-300 text-xs font-mono flex flex-wrap items-center justify-between gap-2 transition-all">
                    <div className="flex items-center gap-2">
                      <CheckCircle2 className="w-4 h-4 text-emerald-400 flex-shrink-0" />
                      <span>SEO structure applied: H2/H3 headings, paragraphs, bold highlights, lists & links. No text changed.</span>
                    </div>
                    <div className="flex items-center gap-2">
                      {previousContent !== null && (
                        <button
                          type="button"
                          onClick={handleUndoAIFormat}
                          className="text-[11px] text-amber-300 hover:underline flex items-center gap-1"
                        >
                          <RotateCcw className="w-3 h-3" />
                          <span>Undo</span>
                        </button>
                      )}
                      <button
                        type="button"
                        onClick={() => setAiSuccessBanner(false)}
                        className="text-emerald-400 hover:text-white text-xs px-1"
                        title="Dismiss"
                      >
                        ✕
                      </button>
                    </div>
                  </div>
                )}

                {/* Quick Markdown Formatting Helper Buttons */}
                <div className="flex flex-wrap items-center gap-1.5 p-2 rounded-xl border"
                     style={{ background: 'rgba(255,255,255,0.02)', borderColor: 'var(--border)' }}>
                  
                  {/* The Single AI Assistant Button for Description */}
                  <button
                    type="button"
                    onClick={handleAIFormatDescription}
                    disabled={isFormattingAI}
                    className="px-3 py-1.5 text-xs font-mono font-semibold rounded-lg bg-gradient-to-r from-violet-600 via-indigo-600 to-emerald-500 hover:from-violet-500 hover:via-indigo-500 hover:to-emerald-400 text-white shadow-md shadow-violet-500/20 flex items-center gap-1.5 transition-all hover:scale-[1.02] active:scale-[0.98] disabled:opacity-60 disabled:cursor-wait mr-1 group"
                    title="AI Assistant: Format plain text description into best SEO structure (Headings, paragraphs, bold, lists, links) without altering content"
                  >
                    <Sparkles className={`w-3.5 h-3.5 text-amber-300 ${isFormattingAI ? 'animate-spin' : 'group-hover:rotate-12 transition-transform'}`} />
                    <span>{isFormattingAI ? 'Formatting...' : 'AI Formatter'}</span>
                  </button>

                  <div className="h-5 w-px bg-white/10 mx-1 hidden sm:block" />

                  <button
                    type="button"
                    onClick={() => applyMarkdownFormat('## ', '', 'Section Heading')}
                    className="px-2 py-1 text-[11px] font-mono rounded border hover:bg-white/[0.06] transition-colors"
                    style={{ borderColor: 'var(--border)', color: 'var(--text-muted)' }}
                    title="Level 2 Heading (Applies to cursor line or selected text)"
                  >
                    H2
                  </button>
                  <button
                    type="button"
                    onClick={() => applyMarkdownFormat('### ', '', 'Sub-heading')}
                    className="px-2 py-1 text-[11px] font-mono rounded border hover:bg-white/[0.06] transition-colors"
                    style={{ borderColor: 'var(--border)', color: 'var(--text-muted)' }}
                    title="Level 3 Heading"
                  >
                    H3
                  </button>
                  <button
                    type="button"
                    onClick={() => applyMarkdownFormat('#### ', '', 'Heading 4')}
                    className="px-2 py-1 text-[11px] font-mono rounded border hover:bg-white/[0.06] transition-colors"
                    style={{ borderColor: 'var(--border)', color: 'var(--text-muted)' }}
                    title="Level 4 Heading"
                  >
                    H4
                  </button>
                  <button
                    type="button"
                    onClick={() => applyMarkdownFormat('##### ', '', 'Heading 5')}
                    className="px-2 py-1 text-[11px] font-mono rounded border hover:bg-white/[0.06] transition-colors"
                    style={{ borderColor: 'var(--border)', color: 'var(--text-muted)' }}
                    title="Level 5 Heading"
                  >
                    H5
                  </button>
                  <button
                    type="button"
                    onClick={() => applyMarkdownFormat('###### ', '', 'Heading 6')}
                    className="px-2 py-1 text-[11px] font-mono rounded border hover:bg-white/[0.06] transition-colors"
                    style={{ borderColor: 'var(--border)', color: 'var(--text-muted)' }}
                    title="Level 6 Heading"
                  >
                    H6
                  </button>
                  <button
                    type="button"
                    onClick={() => applyMarkdownFormat('**', '**', 'Bold Text')}
                    className="px-2 py-1 text-[11px] font-mono font-bold rounded border hover:bg-white/[0.06] transition-colors"
                    style={{ borderColor: 'var(--border)', color: 'var(--text-muted)' }}
                    title="Bold (**text**)"
                  >
                    Bold
                  </button>
                  <button
                    type="button"
                    onClick={() => applyMarkdownFormat('*', '*', 'Italic Text')}
                    className="px-2 py-1 text-[11px] font-mono italic rounded border hover:bg-white/[0.06] transition-colors"
                    style={{ borderColor: 'var(--border)', color: 'var(--text-muted)' }}
                    title="Italic (*text*)"
                  >
                    Italic
                  </button>
                  <button
                    type="button"
                    onClick={handleInsertHyperlink}
                    className="px-2 py-1 text-[11px] font-mono rounded border hover:bg-white/[0.06] transition-colors flex items-center gap-1 text-violet-300"
                    style={{ borderColor: 'var(--border)' }}
                    title="Insert Hyperlink [text](url)"
                  >
                    <Link2 className="w-3 h-3 text-violet-400" />
                    <span>Link</span>
                  </button>
                  <button
                    type="button"
                    onClick={() => applyMarkdownFormat('> ', '', 'Quote text goes here')}
                    className="px-2 py-1 text-[11px] font-mono rounded border hover:bg-white/[0.06] transition-colors"
                    style={{ borderColor: 'var(--border)', color: 'var(--text-muted)' }}
                    title="Blockquote (> quote)"
                  >
                    Quote
                  </button>
                  <button
                    type="button"
                    onClick={() => applyMarkdownFormat('```javascript\n', '\n```', '// code snippet')}
                    className="px-2 py-1 text-[11px] font-mono rounded border hover:bg-white/[0.06] transition-colors"
                    style={{ borderColor: 'var(--border)', color: 'var(--text-muted)' }}
                    title="Code Block"
                  >
                    Code Block
                  </button>
                  <button
                    type="button"
                    onClick={() => applyMarkdownFormat('- ', '', 'List item')}
                    className="px-2 py-1 text-[11px] font-mono rounded border hover:bg-white/[0.06] transition-colors"
                    style={{ borderColor: 'var(--border)', color: 'var(--text-muted)' }}
                    title="Bullet List (- item)"
                  >
                    Bullet List
                  </button>
                </div>

                <textarea
                  ref={contentTextareaRef}
                  rows={14}
                  required
                  value={content}
                  onChange={(e) => setContent(e.target.value)}
                  placeholder="Write or paste your blog description in plain text or Markdown... (Use 'AI Format Description' above to structure automatically for SEO)"
                  className="w-full px-4 py-3.5 rounded-xl border text-sm font-mono leading-relaxed outline-none focus:border-violet-500 transition-colors"
                  style={{
                    background: 'var(--card-bg)',
                    borderColor: 'var(--border)',
                    color: 'var(--text-main)',
                  }}
                />
              </div>

              {/* SEO Overrides */}
              <div className="bento-card p-6 sm:p-8 rounded-2xl space-y-5">
                <div className="flex items-center gap-2">
                  <Globe className="w-4 h-4 text-violet-400" />
                  <h3 className="text-xs font-mono uppercase tracking-wider font-bold" style={{ color: 'var(--text-main)' }}>
                    Search Engine Optimization (SEO Defaults)
                  </h3>
                </div>

                <div className="space-y-4">
                  <div>
                    <div className="flex items-center justify-between mb-1.5">
                      <label className="text-xs font-mono" style={{ color: 'var(--text-dim)' }}>
                        SEO Title (Defaults to Blog Title)
                      </label>
                      <button
                        type="button"
                        onClick={() => {
                          setSeoTitleCustom(!seoTitleCustom)
                          if (seoTitleCustom) setSeoTitle(title)
                        }}
                        className="text-[11px] font-mono text-violet-400 hover:text-violet-300"
                      >
                        {seoTitleCustom ? 'Reset to Default (Title)' : 'Customize'}
                      </button>
                    </div>
                    <input
                      type="text"
                      value={seoTitle}
                      readOnly={!seoTitleCustom}
                      onChange={(e) => setSeoTitle(e.target.value)}
                      placeholder={title || "Blog's title will be used"}
                      className="w-full px-3.5 py-2.5 rounded-xl border text-xs outline-none"
                      style={{
                        background: 'var(--card-bg)',
                        borderColor: 'var(--border)',
                        color: seoTitleCustom ? 'var(--text-main)' : 'var(--text-muted)',
                      }}
                    />
                  </div>

                  <div>
                    <div className="flex items-center justify-between mb-1.5">
                      <label className="text-xs font-mono" style={{ color: 'var(--text-dim)' }}>
                        SEO Description (Defaults to Short Description)
                      </label>
                      <button
                        type="button"
                        onClick={() => {
                          setSeoDescriptionCustom(!seoDescriptionCustom)
                          if (seoDescriptionCustom) setSeoDescription(excerpt)
                        }}
                        className="text-[11px] font-mono text-violet-400 hover:text-violet-300"
                      >
                        {seoDescriptionCustom ? 'Reset to Default (Excerpt)' : 'Customize'}
                      </button>
                    </div>
                    <textarea
                      rows={2}
                      value={seoDescription}
                      readOnly={!seoDescriptionCustom}
                      onChange={(e) => setSeoDescription(e.target.value)}
                      placeholder={excerpt || "Blog's short description will be used"}
                      className="w-full px-3.5 py-2.5 rounded-xl border text-xs outline-none"
                      style={{
                        background: 'var(--card-bg)',
                        borderColor: 'var(--border)',
                        color: seoDescriptionCustom ? 'var(--text-main)' : 'var(--text-muted)',
                      }}
                    />
                  </div>
                </div>
              </div>
            </div>

            {/* Right 4 Cols: Categorization, Author, Tags, Options */}
            <div className="lg:col-span-4 space-y-6">
              {/* Category (Selectable + Add New) */}
              <div className="bento-card p-6 rounded-2xl space-y-4">
                <div className="flex items-center justify-between">
                  <label className="text-xs font-mono uppercase tracking-wider font-semibold" style={{ color: 'var(--text-main)' }}>
                    Category (1 Only) <span className="text-rose-400">*</span>
                  </label>
                  <button
                    type="button"
                    onClick={() => setShowAddCategory(!showAddCategory)}
                    className="text-[11px] font-mono flex items-center gap-1 text-violet-400 hover:text-violet-300"
                  >
                    <Plus className="w-3 h-3" />
                    New
                  </button>
                </div>

                <select
                  value={category}
                  onChange={(e) => setCategory(e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-xl border text-xs font-mono outline-none cursor-pointer"
                  style={{
                    background: 'var(--card-bg)',
                    borderColor: 'var(--border)',
                    color: 'var(--text-main)',
                  }}
                >
                  {categoriesList.map((cat, i) => (
                    <option key={i} value={cat} className="bg-neutral-900 text-white">
                      {cat}
                    </option>
                  ))}
                </select>

                {showAddCategory && (
                  <div className="pt-2 flex items-center gap-2">
                    <input
                      type="text"
                      value={newCategoryInput}
                      onChange={(e) => setNewCategoryInput(e.target.value)}
                      placeholder="e.g. Next.js 15"
                      className="w-full px-3 py-1.5 text-xs rounded-lg border outline-none font-mono"
                      style={{ background: 'var(--card-bg)', borderColor: 'var(--border)', color: 'var(--text-main)' }}
                    />
                    <button
                      type="button"
                      onClick={handleAddNewCategory}
                      className="px-3 py-1.5 bg-violet-600 hover:bg-violet-500 text-white rounded-lg text-xs font-mono"
                    >
                      Add
                    </button>
                  </div>
                )}
              </div>

              {/* Tags (Checkboxes with automatic '#' prefix, multi-select, add new) */}
              <div className="bento-card p-6 rounded-2xl space-y-4">
                <div className="flex items-center justify-between">
                  <div>
                    <label className="text-xs font-mono uppercase tracking-wider font-semibold block" style={{ color: 'var(--text-main)' }}>
                      Tags (Auto # Prefix)
                    </label>
                    <span className="text-[10px] text-gray-500 font-mono">
                      {selectedTags.length} selected
                    </span>
                  </div>
                  <button
                    type="button"
                    onClick={() => setShowAddTag(!showAddTag)}
                    className="text-[11px] font-mono flex items-center gap-1 text-violet-400 hover:text-violet-300"
                  >
                    <Plus className="w-3 h-3" />
                    New Tag
                  </button>
                </div>

                {showAddTag && (
                  <div className="flex items-center gap-2 pb-2 border-b" style={{ borderColor: 'var(--border)' }}>
                    <div className="flex items-center rounded-lg border w-full overflow-hidden"
                         style={{ background: 'var(--card-bg)', borderColor: 'var(--border)' }}>
                      <span className="px-2 text-xs font-mono text-violet-400">#</span>
                      <input
                        type="text"
                        value={newTagInput}
                        onChange={(e) => setNewTagInput(e.target.value)}
                        placeholder="TagWithoutHash"
                        className="w-full py-1.5 text-xs outline-none font-mono"
                        style={{ background: 'transparent', color: 'var(--text-main)' }}
                      />
                    </div>
                    <button
                      type="button"
                      onClick={handleAddNewTag}
                      className="px-3 py-1.5 bg-violet-600 hover:bg-violet-500 text-white rounded-lg text-xs font-mono"
                    >
                      Add
                    </button>
                  </div>
                )}

                {/* Checkbox list */}
                <div className="space-y-2 max-h-56 overflow-y-auto pr-1">
                  {tagsList.map((tagItem, idx) => {
                    const formattedTag = tagItem.startsWith('#') ? tagItem : `#${tagItem}`
                    const isChecked = selectedTags.includes(formattedTag)
                    return (
                      <label
                        key={idx}
                        onClick={() => toggleTag(formattedTag)}
                        className={`flex items-center justify-between p-2 rounded-xl border text-xs font-mono cursor-pointer transition-all ${
                          isChecked
                            ? 'border-violet-500/50 bg-violet-500/10 text-violet-300'
                            : 'border-transparent hover:bg-white/[0.03] text-gray-400'
                        }`}
                      >
                        <div className="flex items-center gap-2.5">
                          {isChecked ? (
                            <CheckSquare className="w-4 h-4 text-violet-400" />
                          ) : (
                            <Square className="w-4 h-4 text-gray-600" />
                          )}
                          <span>{formattedTag}</span>
                        </div>
                        {['#SahedAlomSumit', '#ProductDesign', '#ProductDevelopment'].includes(formattedTag) && (
                          <span className="text-[9px] px-1.5 py-0.5 rounded bg-white/[0.06] text-gray-400">
                            Default
                          </span>
                        )}
                      </label>
                    )
                  })}
                </div>
              </div>

              {/* Author & Role (Selectable + Add New + Edit Role Name) */}
              <div className="bento-card p-6 rounded-2xl space-y-4">
                {/* Author Name */}
                <div>
                  <div className="flex items-center justify-between mb-1.5">
                    <label className="text-xs font-mono uppercase tracking-wider font-semibold" style={{ color: 'var(--text-main)' }}>
                      Author Name
                    </label>
                    <button
                      type="button"
                      onClick={() => setShowAddAuthor(!showAddAuthor)}
                      className="text-[11px] font-mono text-violet-400 hover:text-violet-300 flex items-center gap-1"
                    >
                      <Plus className="w-3 h-3" /> New
                    </button>
                  </div>
                  <select
                    value={authorName}
                    onChange={(e) => setAuthorName(e.target.value)}
                    className="w-full px-3.5 py-2.5 rounded-xl border text-xs font-mono outline-none cursor-pointer"
                    style={{
                      background: 'var(--card-bg)',
                      borderColor: 'var(--border)',
                      color: 'var(--text-main)',
                    }}
                  >
                    {authorsList.map((a, i) => (
                      <option key={i} value={a} className="bg-neutral-900 text-white">
                        {a}
                      </option>
                    ))}
                  </select>

                  {showAddAuthor && (
                    <div className="pt-2 flex items-center gap-2">
                      <input
                        type="text"
                        value={newAuthorInput}
                        onChange={(e) => setNewAuthorInput(e.target.value)}
                        placeholder="Author Full Name"
                        className="w-full px-3 py-1.5 text-xs rounded-lg border outline-none font-mono"
                        style={{ background: 'var(--card-bg)', borderColor: 'var(--border)', color: 'var(--text-main)' }}
                      />
                      <button
                        type="button"
                        onClick={handleAddNewAuthor}
                        className="px-3 py-1.5 bg-violet-600 hover:bg-violet-500 text-white rounded-lg text-xs font-mono"
                      >
                        Add
                      </button>
                    </div>
                  )}
                </div>

                {/* Author Role */}
                <div>
                  <div className="flex items-center justify-between mb-1.5">
                    <label className="text-xs font-mono uppercase tracking-wider font-semibold" style={{ color: 'var(--text-main)' }}>
                      Author Role
                    </label>
                    <div className="flex items-center gap-2">
                      <button
                        type="button"
                        onClick={startEditRole}
                        className="text-[11px] font-mono text-emerald-400 hover:text-emerald-300 flex items-center gap-1"
                        title="Edit selected role name"
                      >
                        <Edit3 className="w-3 h-3" /> Edit
                      </button>
                      <button
                        type="button"
                        onClick={() => setShowAddRole(!showAddRole)}
                        className="text-[11px] font-mono text-violet-400 hover:text-violet-300 flex items-center gap-1"
                      >
                        <Plus className="w-3 h-3" /> New
                      </button>
                    </div>
                  </div>

                  {editingRole ? (
                    <div className="flex items-center gap-2">
                      <input
                        type="text"
                        value={editRoleInput}
                        onChange={(e) => setEditRoleInput(e.target.value)}
                        className="w-full px-3 py-2 text-xs rounded-xl border outline-none font-mono"
                        style={{ background: 'var(--card-bg)', borderColor: 'var(--border)', color: 'var(--text-main)' }}
                      />
                      <button
                        type="button"
                        onClick={saveEditRole}
                        className="px-3 py-2 bg-emerald-600 hover:bg-emerald-500 text-white rounded-xl text-xs font-mono"
                      >
                        Save
                      </button>
                      <button
                        type="button"
                        onClick={() => setEditingRole(false)}
                        className="px-2 py-2 text-xs text-gray-400 hover:text-white"
                      >
                        Cancel
                      </button>
                    </div>
                  ) : (
                    <select
                      value={authorRole}
                      onChange={(e) => setAuthorRole(e.target.value)}
                      className="w-full px-3.5 py-2.5 rounded-xl border text-xs font-mono outline-none cursor-pointer"
                      style={{
                        background: 'var(--card-bg)',
                        borderColor: 'var(--border)',
                        color: 'var(--text-main)',
                      }}
                    >
                      {rolesList.map((r, i) => (
                        <option key={i} value={r} className="bg-neutral-900 text-white">
                          {r}
                        </option>
                      ))}
                    </select>
                  )}

                  {showAddRole && (
                    <div className="pt-2 flex items-center gap-2">
                      <input
                        type="text"
                        value={newRoleInput}
                        onChange={(e) => setNewRoleInput(e.target.value)}
                        placeholder="e.g. Creative Technologist"
                        className="w-full px-3 py-1.5 text-xs rounded-lg border outline-none font-mono"
                        style={{ background: 'var(--card-bg)', borderColor: 'var(--border)', color: 'var(--text-main)' }}
                      />
                      <button
                        type="button"
                        onClick={handleAddNewRole}
                        className="px-3 py-1.5 bg-violet-600 hover:bg-violet-500 text-white rounded-lg text-xs font-mono"
                      >
                        Add
                      </button>
                    </div>
                  )}
                </div>
              </div>

              {/* Reading Time (Selectable, default '3 mins read' + Add New) */}
              <div className="bento-card p-6 rounded-2xl space-y-4">
                <div className="flex items-center justify-between">
                  <label className="text-xs font-mono uppercase tracking-wider font-semibold" style={{ color: 'var(--text-main)' }}>
                    Reading Time
                  </label>
                  <button
                    type="button"
                    onClick={() => setShowAddReadingTime(!showAddReadingTime)}
                    className="text-[11px] font-mono text-violet-400 hover:text-violet-300 flex items-center gap-1"
                  >
                    <Plus className="w-3 h-3" /> New
                  </button>
                </div>

                <select
                  value={readingTime}
                  onChange={(e) => setReadingTime(e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-xl border text-xs font-mono outline-none cursor-pointer"
                  style={{
                    background: 'var(--card-bg)',
                    borderColor: 'var(--border)',
                    color: 'var(--text-main)',
                  }}
                >
                  {readingTimesList.map((rt, i) => (
                    <option key={i} value={rt} className="bg-neutral-900 text-white">
                      {rt} {rt === '2 mins read' ? '(Default)' : ''}
                    </option>
                  ))}
                </select>

                {showAddReadingTime && (
                  <div className="pt-2 flex items-center gap-2">
                    <input
                      type="text"
                      value={newReadingTimeInput}
                      onChange={(e) => setNewReadingTimeInput(e.target.value)}
                      placeholder="e.g. 4 mins read"
                      className="w-full px-3 py-1.5 text-xs rounded-lg border outline-none font-mono"
                      style={{ background: 'var(--card-bg)', borderColor: 'var(--border)', color: 'var(--text-main)' }}
                    />
                    <button
                      type="button"
                      onClick={handleAddNewReadingTime}
                      className="px-3 py-1.5 bg-violet-600 hover:bg-violet-500 text-white rounded-lg text-xs font-mono"
                    >
                      Add
                    </button>
                  </div>
                )}
              </div>

              {/* Cover Image (Default: /img/portfolio/thumbnail-temp.webp) */}
              <div className="bento-card p-6 rounded-2xl space-y-4">
                <label className="block text-xs font-mono uppercase tracking-wider font-semibold" style={{ color: 'var(--text-main)' }}>
                  Cover Image URL
                </label>
                <input
                  type="text"
                  value={coverImage}
                  onChange={(e) => setCoverImage(e.target.value)}
                  placeholder="/img/portfolio/thumbnail-temp.webp"
                  className="w-full px-3.5 py-2.5 rounded-xl border text-xs font-mono outline-none"
                  style={{
                    background: 'var(--card-bg)',
                    borderColor: 'var(--border)',
                    color: 'var(--text-main)',
                  }}
                />
                <div className="rounded-xl overflow-hidden border aspect-[16/9] relative" style={{ borderColor: 'var(--border)' }}>
                  <img
                    src={coverImage}
                    alt="Preview"
                    className="w-full h-full object-cover"
                    onError={(e) => {
                      e.currentTarget.src = '/img/portfolio/thumbnail-temp.webp'
                    }}
                  />
                  <span className="absolute bottom-2 right-2 text-[10px] font-mono px-2 py-0.5 rounded bg-black/70 backdrop-blur text-white/80">
                    Default: thumbnail-temp.webp
                  </span>
                </div>
              </div>

              {/* Publication Settings & Submit */}
              <div className="bento-card p-6 rounded-2xl space-y-4">
                <div className="space-y-3">
                  <label className="flex items-center gap-3 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={isFeatured}
                      onChange={(e) => setIsFeatured(e.target.checked)}
                      className="w-4 h-4 rounded text-violet-600 accent-violet-600"
                    />
                    <span className="text-xs font-mono" style={{ color: 'var(--text-main)' }}>
                      Mark as Featured Blog
                    </span>
                  </label>
                  <label className="flex items-center gap-3 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={isPublished}
                      onChange={(e) => setIsPublished(e.target.checked)}
                      className="w-4 h-4 rounded text-emerald-500 accent-emerald-500"
                    />
                    <span className="text-xs font-mono" style={{ color: 'var(--text-main)' }}>
                      Published Immediately
                    </span>
                  </label>
                </div>

                <div className="pt-4 border-t" style={{ borderColor: 'var(--border)' }}>
                  <button
                    type="submit"
                    disabled={submitting}
                    className="w-full py-4 px-6 bg-gradient-to-r from-violet-600 to-indigo-600 hover:from-violet-500 hover:to-indigo-500 disabled:opacity-50 text-white font-bold text-sm rounded-xl shadow-xl shadow-violet-600/25 flex items-center justify-center gap-2 transition-all transform hover:-translate-y-0.5 cursor-pointer uppercase tracking-wider font-mono"
                  >
                    {submitting ? (
                      <>
                        <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                        Saving to Supabase...
                      </>
                    ) : (
                      <>
                        <Send className="w-4 h-4" />
                        {isEditing ? 'Update Blog in Supabase' : 'Publish Blog to Supabase'}
                      </>
                    )}
                  </button>
                </div>
              </div>
            </div>
          </div>
        </form>
      )}

    </div>
  )
}

export default function BlogAdmin() {
  return (
    <AdminAuthGate>
      <BlogAdminContent />
    </AdminAuthGate>
  )
}

