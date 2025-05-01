// apps/cms/src/collections/LegalPages.ts
import { slugField } from '@/app/fields/slugField'
import type { CollectionConfig } from 'payload/types'


export const LegalPages: CollectionConfig = {
  slug: 'legal-pages',
  admin: {
    useAsTitle: 'title',
    description: 'Content for legal documents like Privacy Policy, Terms of Service.',
    defaultColumns: ['title', 'slug', 'status', 'updatedAt'],
  },
  access: {
    read: ({ req }) => {
      if (req.user || req.query?.preview === 'true') return true // Allow admins/preview
      return { status: { equals: 'published' } } // Public only sees published
    },
    create: ({ req: { user } }) => user?.roles?.includes('admin'),
    update: ({ req: { user } }) => user?.roles?.includes('admin'),
    delete: ({ req: { user } }) => user?.roles?.includes('admin'),
  },
  versions: { drafts: true },
  fields: [
    { name: 'title', type: 'text', required: true, localized: true },
    slugField('title'),
    { name: 'content', type: 'richText', required: true, localized: true },
    {
      name: 'status',
      type: 'select',
      options: [
        { label: 'Draft', value: 'draft' },
        { label: 'Published', value: 'published' },
      ],
      defaultValue: 'draft',
      admin: { position: 'sidebar' },
      index: true,
    },
  ],
  timestamps: true,
}

export default LegalPages
