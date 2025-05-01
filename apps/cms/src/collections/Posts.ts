// apps/cms/src/collections/Posts.ts
import { slugField } from '@/app/fields/slugField';
import type { CollectionConfig } from 'payload/types'


export const Posts: CollectionConfig = {
  slug: 'posts',
  admin: {
    useAsTitle: 'title',
    description: 'Blog posts content.',
    defaultColumns: ['title', 'slug', 'category', 'status', 'publishedDate', 'updatedAt'],
    listSearchableFields: ['title', 'category.name', 'tags.name'],
  },
  access: {
    read: ({ req }) => {
      if (req.user || req.query?.preview === 'true') return true;
      return { status: { equals: 'published' } };
    },
    create: ({ req: { user } }) => !!user,
    update: ({ req: { user } }) => !!user,
    delete: ({ req: { user } }) => user?.roles?.includes('admin'),
  },
  versions: { drafts: true },
  fields: [
    { name: 'title', type: 'text', required: true, localized: true },
    slugField('title'),
    { name: 'featuredImage', label: 'Featured Image', type: 'upload', relationTo: 'media', required: true },
    { name: 'content', type: 'richText', required: true, localized: true },
    { name: 'excerpt', label: 'Excerpt / Short Summary', type: 'textarea', maxLength: 300, localized: true, admin: { description: 'A short summary used for previews and SEO.' } },
    { name: 'author', type: 'relationship', relationTo: 'users', required: true, admin: { position: 'sidebar' }, defaultValue: ({ user }) => user?.id },
    { name: 'category', type: 'relationship', relationTo: 'categories', required: true, admin: { position: 'sidebar' } },
    { name: 'tags', type: 'relationship', relationTo: 'tags', hasMany: true, admin: { position: 'sidebar' } },
    { name: 'status', type: 'select', options: [ { label: 'Draft', value: 'draft' }, { label: 'Published', value: 'published' } ], defaultValue: 'draft', required: true, admin: { position: 'sidebar' }, index: true },
    { name: 'publishedDate', label: 'Published Date', type: 'date', admin: { date: { pickerAppearance: 'dayAndTime' }, position: 'sidebar', description: 'Post will not be public until this date (if status is published).' } },
    { label: 'SEO Meta', name: 'meta', type: 'group', fields: [ { name: 'title', label: 'Meta Title', type: 'text', localized: true, admin: { description: 'Leave blank to use post title.' } }, { name: 'description', label: 'Meta Description', type: 'textarea', maxLength: 160, localized: true, admin: { description: 'Leave blank to use excerpt.' } } ] },
  ],
  timestamps: true,
}

export default Posts;