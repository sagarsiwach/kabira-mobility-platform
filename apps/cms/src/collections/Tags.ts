// apps/cms/src/collections/Tags.ts
import { slugField } from '@/app/fields/slugField';
import type { CollectionConfig } from 'payload/types'


export const Tags: CollectionConfig = {
  slug: 'tags',
  admin: {
    useAsTitle: 'name',
    description: 'Add descriptive tags to blog posts for filtering.',
    defaultColumns: ['name', 'slug', 'updatedAt'],
  },
  access: {
    read: () => true,
    create: ({ req: { user } }) => user?.roles?.includes('admin'),
    update: ({ req: { user } }) => user?.roles?.includes('admin'),
    delete: ({ req: { user } }) => user?.roles?.includes('admin'),
  },
  fields: [
    {
      name: 'name',
      label: 'Tag Name',
      type: 'text',
      required: true,
      unique: true,
      localized: true,
    },
    slugField('name'),
  ],
  timestamps: true,
}

export default Tags;