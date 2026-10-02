import { defineType, defineField } from 'sanity'

export default defineType({
  name: 'codeBlock',
  title: 'Code Block',
  type: 'object',
  fields: [
    defineField({
      name: 'language',
      title: 'Programming Language',
      type: 'string',
      options: {
        list: [
          { title: 'JavaScript / React', value: 'javascript' },
          { title: 'TypeScript', value: 'typescript' },
          { title: 'HTML / CSS', value: 'css' },
          { title: 'Python', value: 'python' },
          { title: 'Bash / Shell', value: 'bash' },
          { title: 'JSON', value: 'json' },
          { title: 'SQL', value: 'sql' },
        ],
      },
      initialValue: 'javascript',
    }),
    defineField({
      name: 'filename',
      title: 'Filename or Title (optional)',
      type: 'string',
      placeholder: 'e.g. App.jsx or config.js',
    }),
    defineField({
      name: 'code',
      title: 'Code Content',
      type: 'text',
      rows: 10,
      validation: (Rule) => Rule.required(),
    }),
  ],
  preview: {
    select: {
      title: 'filename',
      subtitle: 'language',
    },
    prepare({ title, subtitle }) {
      return {
        title: title || 'Code Snippet',
        subtitle: subtitle ? `Language: ${subtitle}` : 'Code Block',
      }
    },
  },
})
