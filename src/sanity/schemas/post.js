import { defineType, defineField } from 'sanity'

export default defineType({
  name: 'post',
  title: 'Blog Post',
  type: 'document',
  fields: [
    defineField({
      name: 'title',
      title: 'Title',
      type: 'string',
      validation: (Rule) => Rule.required().min(5).max(120),
    }),
    defineField({
      name: 'slug',
      title: 'Slug (URL pathname)',
      type: 'slug',
      options: {
        source: 'title',
        maxLength: 120,
      },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'excerpt',
      title: 'Excerpt / Summary',
      type: 'text',
      rows: 3,
      description: 'Short teaser displayed on the blog card and social meta tags.',
      validation: (Rule) => Rule.required().max(300),
    }),
    defineField({
      name: 'coverImage',
      title: 'Cover Image',
      type: 'image',
      options: {
        hotspot: true,
      },
      fields: [
        defineField({
          name: 'alt',
          type: 'string',
          title: 'Alternative text',
          description: 'Important for SEO and accessibility.',
        }),
      ],
    }),
    defineField({
      name: 'category',
      title: 'Category',
      type: 'string',
      options: {
        list: [
          { title: 'Projects', value: 'Projects' },
          { title: 'AI & Tech', value: 'AI & Tech' },
          { title: 'Tutorials', value: 'Tutorials' },
          { title: 'Career', value: 'Career' },
          { title: 'Others', value: 'Others' },
        ],
      },
      validation: (Rule) => Rule.required(),
      initialValue: 'Projects',
    }),
    defineField({
      name: 'tags',
      title: 'Tags',
      type: 'array',
      of: [{ type: 'string' }],
      options: {
        layout: 'tags',
      },
      initialValue: ['SahedAlomSumit', 'ProductDesign', 'ProductDevelopment'],
    }),
    defineField({
      name: 'publishedAt',
      title: 'Published At',
      type: 'datetime',
      initialValue: () => new Date().toISOString(),
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'isFeatured',
      title: 'Feature this post?',
      type: 'boolean',
      description: 'Highlights this post at the top of the blog page.',
      initialValue: false,
    }),
    defineField({
      name: 'readingTime',
      title: 'Reading Time (e.g. "5 min read")',
      type: 'string',
      description: 'Leave empty to automatically calculate from word count.',
    }),
    defineField({
      name: 'views',
      title: 'Views / Reader Count',
      type: 'number',
      description: 'Total number of readers / dynamic views.',
      initialValue: 0,
      readOnly: true,
    }),
    defineField({
      name: 'body',
      title: 'Body Content (Rich Text)',
      type: 'array',
      of: [
        {
          type: 'block',
          styles: [
            { title: 'Normal', value: 'normal' },
            { title: 'Heading 2', value: 'h2' },
            { title: 'Heading 3', value: 'h3' },
            { title: 'Heading 4', value: 'h4' },
            { title: 'Quote', value: 'blockquote' },
          ],
          lists: [
            { title: 'Bullet', value: 'bullet' },
            { title: 'Numbered', value: 'number' },
          ],
          marks: {
            decorators: [
              { title: 'Strong', value: 'strong' },
              { title: 'Emphasis', value: 'em' },
              { title: 'Code', value: 'code' },
              { title: 'Underline', value: 'underline' },
              { title: 'Strike', value: 'strike-through' },
            ],
            annotations: [
              {
                name: 'link',
                type: 'object',
                title: 'Link',
                fields: [
                  {
                    name: 'href',
                    type: 'url',
                    title: 'URL',
                    validation: (Rule) =>
                      Rule.uri({
                        scheme: ['http', 'https', 'mailto', 'tel'],
                      }),
                  },
                  {
                    name: 'blank',
                    type: 'boolean',
                    title: 'Open in new tab?',
                    initialValue: true,
                  },
                ],
              },
            ],
          },
        },
        {
          type: 'image',
          options: { hotspot: true },
          fields: [
            {
              name: 'alt',
              type: 'string',
              title: 'Alternative text',
            },
            {
              name: 'caption',
              type: 'string',
              title: 'Caption',
            },
          ],
        },
        {
          type: 'codeBlock',
        },
      ],
    }),
  ],
  preview: {
    select: {
      title: 'title',
      media: 'coverImage',
      date: 'publishedAt',
      views: 'views',
    },
    prepare({ title, media, date, views = 0 }) {
      const formattedDate = date ? new Date(date).toLocaleDateString() : 'Draft'
      const readsText = typeof views === 'number' ? `${views.toLocaleString()} ${views === 1 ? 'read' : 'reads'}` : '0 reads'
      return {
        title,
        subtitle: `${readsText} • ${formattedDate}`,
        media,
      }
    },
  },
})
