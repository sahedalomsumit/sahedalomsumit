// ════════════════════════════════════════════════════════════════════════════
//  🤖 AI ASSISTANT: SEO MARKDOWN FORMATTER & GENERATOR FOR BLOG STUDIO
//  - Formats raw description plain text into best SEO-friendly structure
//  - Generates high-converting SEO Title automatically from description
//  - Generates concise SEO Excerpt hook automatically from description
//  - Strictly 100% content preservation (zero words changed/removed/added)
// ════════════════════════════════════════════════════════════════════════════

export const SEO_FORMATTING_SYSTEM_PROMPT = `You are an expert Markdown formatting assistant.
Your sole job is to FORMAT the user's blog description into clean, beautifully structured Markdown WITHOUT changing, rewriting, rephrasing, or adding any content words.

STRICT ZERO-CONTENT-CHANGE RULES (MANDATORY & HIGHEST PRIORITY):
1. PRESERVE 100% OF THE AUTHOR'S WORDS VERBATIM:
   - You MUST NOT rewrite, paraphrase, summarize, delete, or replace ANY sentences or words.
   - Keep the author's exact sentences, vocabulary, grammar, phrasing, personal story, and tone 100% verbatim.
   - Do NOT add new explanatory sentences, commentary, marketing copy, or invented descriptions.
   - Every single original word must remain exactly as written.

2. WHAT FORMATTING TO APPLY:
   - HEADINGS: Insert clean, concise H2 section headers (## Heading) to divide the narrative into clear thematic sections (e.g. ## Why I Built This, ## Key Features, ## The Experience, ## Download & Feedback). Do NOT edit or alter the user's text underneath the headings.
   - LISTS: Convert bullet/emoji markers (such as 👉, •, *, -) into proper Markdown list items (- Item) keeping the exact original text of each item.
   - BOLDING: Add **bold** around important existing keywords and phrases (e.g., **Salah Tracker App**, **Flutter**, **100% ad-free**, **Google Play Store**). Do NOT change the words inside the bolding.
   - LINKS: Convert raw URLs into clean Markdown links [link text](url) without deleting or altering the surrounding sentence.
   - PARAGRAPHS: Keep clean double newlines between paragraphs for scannability.

3. OUTPUT FORMAT:
   - Return ONLY the formatted Markdown.
   - Do NOT wrap in \`\`\`markdown code blocks.
   - Do NOT include any conversational text.`;

export const TITLE_GENERATION_SYSTEM_PROMPT = `You are an expert SEO copywriter and blog editor.
Your task is to read the provided blog description/content and generate ONE high-converting, punchy, and SEO-friendly blog title.

STRICT RULES:
1. Provide exactly ONE title that captures the main topic and core value proposition.
2. Keep it between 40 and 70 characters.
3. Do NOT wrap the title in quotation marks.
4. Do NOT use markdown formatting (no bold, no asterisks, no hashes).
5. Output ONLY the raw title text. Do NOT include any conversational text.`;

export const EXCERPT_GENERATION_SYSTEM_PROMPT = `You are an expert SEO copywriter and editor.
Your task is to read the provided blog description/content and generate ONE compelling, concise 1-2 sentence hook / summary excerpt.

STRICT RULES:
1. Summarize what the reader will discover in 1-2 clear, punchy sentences.
2. Keep the length strictly between 120 and 160 characters.
3. Do NOT wrap the excerpt in quotation marks.
4. Do NOT use markdown formatting.
5. Output ONLY the raw excerpt text.`;

/**
 * Clean any accidental markdown code fences or quotes if model wrapped output
 */
export function cleanMarkdownFences(text) {
  if (!text) return '';
  let cleaned = text.trim();
  cleaned = cleaned.replace(/^```(?:markdown|md)?\s*\r?\n?/i, '').replace(/\r?\n?```\s*$/i, '');
  return cleaned.trim();
}

export function cleanPlainOutput(text) {
  if (!text) return '';
  let cleaned = cleanMarkdownFences(text);
  cleaned = cleaned.replace(/^["'«»“”]+|["'«»“”]+$/g, '').trim();
  return cleaned;
}

/**
 * Domain to friendly link label mapping
 */
function getDomainLabel(rawUrl) {
  try {
    const urlObj = new URL(rawUrl);
    const host = urlObj.hostname.toLowerCase().replace(/^www\./, '');
    if (host.includes('play.google.com')) return 'Google Play Store';
    if (host.includes('github.com')) return 'GitHub';
    if (host.includes('linkedin.com')) return 'LinkedIn';
    if (host.includes('twitter.com') || host.includes('x.com')) return 'Twitter / X';
    if (host.includes('youtube.com') || host.includes('youtu.be')) return 'YouTube';
    if (host.includes('facebook.com')) return 'Facebook';
    if (host.includes('instagram.com')) return 'Instagram';
    return host;
  } catch {
    return 'Link';
  }
}

/**
 * Format raw URLs in a text segment to Markdown links without double-linking
 */
function autoLinkUrls(text) {
  if (!text) return text;
  // Match URLs not already preceded by ]( or href=" or inside markdown links
  return text.replace(/(?<!\]\(|<a[^>]*href=")(https?:\/\/[^\s<)]+[^<.,:;"')\]\s])/g, (match) => {
    const label = getDomainLabel(match);
    return `[${label}](${match})`;
  });
}

/**
 * Apply selective bolding to key terms if they are not already bolded or in links
 */
function highlightKeyTerms(text) {
  if (!text) return text;

  const keyTerms = [
    'Salah Tracker App',
    'Salah Tracker',
    'Google Play Store',
    'Play Store',
    'Clean Architecture',
    '100% ad-free',
    '100% free',
    'ad-free',
    'Open Source',
    'open source',
    'Vibe Coding',
    'vibe coding',
    'Flutter',
    'Android',
    'iOS',
    'Supabase',
    'React',
    'TypeScript',
    'Tailwind CSS',
  ];

  let formatted = text;
  for (const term of keyTerms) {
    const escaped = term.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
    // Match only if not already surrounded by ** or inside a Markdown link bracket/url
    const regex = new RegExp(`(?<!\\*\\*|\\[[^\\]]*)\\b(${escaped})\\b(?!\\*\\*|\\]|\\))`, 'g');
    formatted = formatted.replace(regex, '**$1**');
  }
  return formatted;
}

/**
 * Detect if a standalone line is already an explicit section heading
 */
function isExplicitHeadingLine(line) {
  const clean = line.trim();
  if (!clean || clean.length > 80) return false;

  // Already markdown heading
  if (/^#{1,6}\s+/.test(clean)) return true;

  // Short label ending with colon (e.g., "Why I built this:", "Key Features:", "Tech Stack:")
  if (/^[A-Z0-9][\w\s\-_/&?,.'"]{2,40}:$/.test(clean)) {
    // Exclude full sentences
    if (!clean.includes(',') && !clean.includes(' and ') && clean.split(/\s+/).length <= 6) {
      return true;
    }
  }

  // Numbered section heading (e.g. "1. Introduction", "Step 2: Setup")
  if (/^(\d+[\.\)]|Step\s+\d+:?|Section\s+\d+:?)\s+[A-Z]/i.test(clean) && clean.length < 60) {
    return true;
  }

  // Common section title keywords (case-insensitive)
  const headingKeywords = [
    'about', 'background', 'the story', 'why i built this', 'why this app', 'how it works',
    'overview', 'introduction', 'features', 'key features', 'benefits', 'key highlights',
    'highlights', 'tech stack', 'technology stack', 'built with', 'architecture',
    'challenges', 'challenges faced', 'the problem', 'the solution', 'development',
    'results', 'launch', 'download', 'how to get it', 'try it out', 'get started',
    'installation', 'roadmap', 'what\'s next', 'future plans', 'conclusion',
    'summary', 'feedback', 'final thoughts', 'key takeaways', 'deliverables'
  ];

  const normalized = clean.toLowerCase().replace(/[:\-#*]/g, '').trim();
  if (headingKeywords.includes(normalized)) {
    return true;
  }

  return false;
}

/**
 * Smart offline heuristic formatter: zero-network fallback
 * Pure formatting: preserves 100% of user content verbatim, applying markdown lists, links, bold, and headers.
 */
export function smartOfflineFormat(rawText) {
  if (!rawText || !rawText.trim()) return rawText;

  // 1. Split into paragraph blocks separated by blank lines
  const rawParagraphs = rawText
    .replace(/\r\n/g, '\n')
    .split(/\n\s*\n/)
    .map((p) => p.trim())
    .filter(Boolean);

  const formattedBlocks = [];
  const assignedHeadings = new Set();

  for (let pIdx = 0; pIdx < rawParagraphs.length; pIdx++) {
    const paragraph = rawParagraphs[pIdx];
    const lines = paragraph.split('\n').map((l) => l.trim()).filter(Boolean);

    // Check if the entire block is a list (all lines start with bullet/emoji/number markers)
    const isAllListItems = lines.every((l) =>
      /^([•\*\-\+]|👉|✦|✔|✅|🔹|🔸|⭐|→|\d+[\.\)])\s*/.test(l)
    );

    // Check if the block is a greeting line (e.g. "Assalamu Alaikum,", "Hello everyone,")
    const isGreeting =
      pIdx === 0 &&
      lines.length === 1 &&
      /^(assalamu\s+alaikum|hello\s+everyone|hey\s+everyone|dear\s+readers|hi\s+all|welcome)[,!\.]?$/i.test(
        lines[0].trim()
      );

    if (isGreeting) {
      formattedBlocks.push(lines[0]);
      continue;
    }

    // Check if block starts with an explicit heading or is an explicit heading
    if (lines.length === 1 && isExplicitHeadingLine(lines[0])) {
      const cleanHeading = lines[0].replace(/^#{1,6}\s+/, '').replace(/[:]+$/, '').trim();
      formattedBlocks.push(`## ${cleanHeading}`);
      assignedHeadings.add(cleanHeading.toLowerCase());
      continue;
    }

    // If document doesn't already have extensive headings, detect narrative sections
    let detectedHeading = null;
    const lowerPara = paragraph.toLowerCase();
    const lowerNextPara = (rawParagraphs[pIdx + 1] || '').toLowerCase();
    const combinedContext = `${lowerPara} ${lowerNextPara}`;

    // Section 1: Problem / Motivation
    if (
      !assignedHeadings.has('the problem') &&
      !assignedHeadings.has('background') &&
      !assignedHeadings.has('why i built this') &&
      (lowerPara.includes('ran into a small problem') ||
        lowerPara.includes('ran into a problem') ||
        lowerPara.includes('the problem') ||
        lowerPara.includes('why i built this') ||
        (lowerPara.includes('annoying') && lowerPara.includes('ads')))
    ) {
      detectedHeading = '## The Problem';
      assignedHeadings.add('the problem');
    }
    // Section 2: Building / Tech Stack / Development
    else if (
      !assignedHeadings.has('building with flutter') &&
      !assignedHeadings.has('building the app') &&
      !assignedHeadings.has('development') &&
      !assignedHeadings.has('how it works') &&
      (lowerPara.includes('why not just build one myself') ||
        lowerPara.includes('vibe coding') ||
        lowerPara.includes('built the app with') ||
        lowerPara.includes('built with flutter') ||
        lowerPara.includes('zero experience in android') ||
        (lowerPara.includes('development') && lowerPara.length < 80))
    ) {
      if (combinedContext.includes('flutter')) {
        detectedHeading = '## Building with Flutter';
        assignedHeadings.add('building with flutter');
      } else {
        detectedHeading = '## Building the App';
        assignedHeadings.add('building the app');
      }
    }
    // Section 3: Testing & Launch / Approval
    else if (
      !assignedHeadings.has('testing & launch') &&
      !assignedHeadings.has('launch & approval') &&
      (lowerPara.includes('testing period') ||
        lowerPara.includes('testers and released') ||
        lowerPara.includes('approved and live') ||
        lowerPara.includes('finally approved'))
    ) {
      detectedHeading = '## Testing & Launch';
      assignedHeadings.add('testing & launch');
    }
    // Section 4: Key Features
    else if (
      !assignedHeadings.has('key features') &&
      !assignedHeadings.has('features') &&
      (isAllListItems ||
        lowerPara.includes('and it includes:') ||
        lowerPara.includes('key features') ||
        lowerPara.includes('what it offers:'))
    ) {
      detectedHeading = '## Key Features';
      assignedHeadings.add('key features');
    }
    // Section 5: Download & Feedback / Call to Action
    else if (
      !assignedHeadings.has('try the app & feedback') &&
      !assignedHeadings.has('download & feedback') &&
      (lowerPara.includes('give the app a try') ||
        lowerPara.includes('leaving an honest review') ||
        lowerPara.includes('google play store') ||
        lowerPara.includes('direct link') ||
        lowerPara.includes('check the direct link') ||
        lowerPara.includes('download link'))
    ) {
      detectedHeading = '## Try the App & Feedback';
      assignedHeadings.add('try the app & feedback');
    }

    if (detectedHeading) {
      formattedBlocks.push(detectedHeading);
    }

    // Now format the lines within this paragraph
    const formattedLines = [];
    for (let lIdx = 0; lIdx < lines.length; lIdx++) {
      let line = lines[lIdx];

      // List item detection (bullet, emoji, or number marker)
      const listMatch = line.match(/^([•\*\-\+]|👉|✦|✔|✅|🔹|🔸|⭐|→|\d+[\.\)])\s*(.*)/);
      if (listMatch) {
        let itemContent = listMatch[2].trim();

        // Auto-link URLs
        itemContent = autoLinkUrls(itemContent);

        // Bold term before colon if feature label
        const colonMatch = itemContent.match(/^([a-zA-Z0-9\s\-_/&]+):\s*(.*)/);
        if (
          colonMatch &&
          colonMatch[1].length < 40 &&
          !colonMatch[1].toLowerCase().includes('http') &&
          !colonMatch[1].startsWith('**')
        ) {
          itemContent = `**${colonMatch[1].trim()}:** ${colonMatch[2].trim()}`;
        } else {
          itemContent = highlightKeyTerms(itemContent);
        }

        formattedLines.push(`- ${itemContent}`);
        continue;
      }

      // Check for standalone links or normal prose lines
      line = autoLinkUrls(line);
      line = highlightKeyTerms(line);

      // Label bolding if line starts with short label before colon
      const labelMatch = line.match(/^([A-Z][a-zA-Z0-9\s\-_]{2,30}):\s+([A-Z0-9].*)/);
      if (
        labelMatch &&
        !labelMatch[1].toLowerCase().includes('http') &&
        !labelMatch[1].startsWith('**')
      ) {
        line = `**${labelMatch[1]}:** ${labelMatch[2]}`;
      }

      formattedLines.push(line);
    }

    formattedBlocks.push(formattedLines.join('\n'));
  }

  let result = formattedBlocks.join('\n\n');
  // Ensure clean double newlines
  result = result.replace(/\n{3,}/g, '\n\n');
  return result.trim();
}


/**
 * Offline fallback for Title extraction
 */
export function smartOfflineTitle(descriptionText) {
  if (!descriptionText) return '';
  const lines = descriptionText.split(/\r?\n/).map((l) => l.trim()).filter(Boolean);
  for (const line of lines) {
    const headingMatch = line.match(/^#{1,6}\s*(.*)/);
    if (headingMatch) {
      return headingMatch[1].replace(/[*_`]/g, '').trim().slice(0, 75);
    }
  }
  if (lines.length > 0) {
    const firstSentence = lines[0].split(/[.!?]/)[0];
    return firstSentence.replace(/[*_`#]/g, '').trim().slice(0, 75);
  }
  return '';
}

/**
 * Offline fallback for Excerpt extraction
 */
export function smartOfflineExcerpt(descriptionText) {
  if (!descriptionText) return '';
  const clean = descriptionText
    .replace(/^#{1,6}\s.*$/gm, '')
    .replace(/[*_`~>]/g, '')
    .replace(/\[([^\]]+)\]\([^)]+\)/g, '$1')
    .replace(/[-*+]\s+/g, '')
    .split(/\r?\n/)
    .map((l) => l.trim())
    .filter(Boolean);

  if (clean.length > 0) {
    let text = clean[0];
    if (text.length < 80 && clean[1]) text += ' ' + clean[1];
    return text.slice(0, 160).trim();
  }
  return '';
}

/**
 * Core multi-tier AI execution helper
 */
async function queryAI(systemPrompt, userText, onStatusUpdate) {
  const env = (typeof import.meta !== 'undefined' && import.meta.env) ? import.meta.env : {};
  const SUPABASE_URL = env.VITE_SUPABASE_URL;
  const SUPABASE_ANON_KEY = env.VITE_SUPABASE_ANON_KEY;

  const customGeminiKey =
    typeof window !== 'undefined'
      ? localStorage.getItem('gemini_api_key')
      : null;

  // 1. Direct Gemini API if custom key provided
  if (customGeminiKey) {
    try {
      if (onStatusUpdate) onStatusUpdate('Processing with Gemini API...');
      const endpoint = `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:generateContent?key=${customGeminiKey}`;
      const res = await fetch(endpoint, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          contents: [
            {
              role: 'user',
              parts: [{ text: `${systemPrompt}\n\nCONTENT:\n${userText}` }],
            },
          ],
          generationConfig: {
            temperature: 0.2,
          },
        }),
      });

      if (res.ok) {
        const json = await res.json();
        const candidateText = json.candidates?.[0]?.content?.parts?.[0]?.text;
        if (candidateText && candidateText.trim()) {
          return candidateText.trim();
        }
      }
    } catch (e) {
      console.warn('Direct Gemini API call failed, trying Supabase Edge Function...', e);
    }
  }

  // 2. Primary: Supabase Edge Function gemini-chat
  if (!SUPABASE_URL || !SUPABASE_ANON_KEY) {
    throw new Error('Supabase is not configured');
  }
  // Try 2 models max with fast fail to avoid hanging the UI
  const models = ['gemini-2.5-flash-lite', 'gemini-2.5-flash'];
  let lastError = null;

  for (const model of models) {
    try {
      if (onStatusUpdate) onStatusUpdate(`Structuring with AI (${model})...`);
      const response = await fetch(`${SUPABASE_URL}/functions/v1/gemini-chat`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${SUPABASE_ANON_KEY}`,
        },
        body: JSON.stringify({
          model: model,
          max_tokens: 4000,
          temperature: 0.2,
          messages: [
            { role: 'system', content: systemPrompt },
            { role: 'user', content: userText },
          ],
        }),
      });

      if (!response.ok) {
        const errJson = await response.json().catch(() => ({}));
        const errMsg = errJson.error || `HTTP ${response.status}`;
        // If quota exhausted (429), break immediately to use instant local formatter
        if (response.status === 429 || errMsg.includes('429') || errMsg.includes('RESOURCE_EXHAUSTED')) {
          throw new Error(`QUOTA_EXHAUSTED: ${errMsg}`);
        }
        throw new Error(errMsg);
      }

      const reader = response.body.getReader();
      const decoder = new TextDecoder();
      let fullContent = '';
      let buffer = '';

      while (true) {
        const { done, value } = await reader.read();
        if (done) break;
        buffer += decoder.decode(value, { stream: true });
        const lines = buffer.split('\n');
        buffer = lines.pop() || '';

        for (const line of lines) {
          const trimmed = line.trim();
          if (trimmed.startsWith('data: ')) {
            const dataStr = trimmed.slice(6).trim();
            if (dataStr === '[DONE]') continue;
            try {
              const d = JSON.parse(dataStr);
              const textChunk = d.choices?.[0]?.delta?.content || '';
              if (textChunk) {
                fullContent += textChunk;
              }
            } catch {
              // Ignore non-JSON lines
            }
          }
        }
      }

      if (fullContent && fullContent.trim()) {
        return fullContent.trim();
      }
    } catch (err) {
      console.warn(`Model ${model} failed:`, err);
      lastError = err;
      if (err.message && err.message.startsWith('QUOTA_EXHAUSTED')) {
        // Don't wait on rate limits, fall back immediately
        break;
      }
    }
  }

  throw lastError || new Error('All AI models failed');
}

/**
 * Format blog description with AI assistant
 */
export async function formatBlogDescriptionWithAI(rawText, onStatusUpdate) {
  if (!rawText || !rawText.trim()) {
    throw new Error('Please enter some plain text in the description editor first.');
  }

  try {
    const output = await queryAI(SEO_FORMATTING_SYSTEM_PROMPT, rawText, onStatusUpdate);
    return cleanMarkdownFences(output);
  } catch (err) {
    console.warn('AI formatting call failed or rate-limited, using smart SEO offline engine:', err);
    if (onStatusUpdate) onStatusUpdate('Applying smart SEO formatting...');
    return smartOfflineFormat(rawText);
  }
}

/**
 * Generate SEO blog title automatically from description
 */
export async function generateBlogTitleFromDescription(descriptionText, onStatusUpdate) {
  if (!descriptionText || !descriptionText.trim()) {
    throw new Error('Please enter a description first so the AI can generate a title.');
  }

  try {
    const output = await queryAI(TITLE_GENERATION_SYSTEM_PROMPT, descriptionText, onStatusUpdate);
    return cleanPlainOutput(output);
  } catch (err) {
    console.warn('AI title generation failed, using offline fallback:', err);
    return smartOfflineTitle(descriptionText);
  }
}

/**
 * Generate SEO blog excerpt hook automatically from description
 */
export async function generateBlogExcerptFromDescription(descriptionText, onStatusUpdate) {
  if (!descriptionText || !descriptionText.trim()) {
    throw new Error('Please enter a description first so the AI can generate an excerpt.');
  }

  try {
    const output = await queryAI(EXCERPT_GENERATION_SYSTEM_PROMPT, descriptionText, onStatusUpdate);
    return cleanPlainOutput(output);
  } catch (err) {
    console.warn('AI excerpt generation failed, using offline fallback:', err);
    return smartOfflineExcerpt(descriptionText);
  }
}
