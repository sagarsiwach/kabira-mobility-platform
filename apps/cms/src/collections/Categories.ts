// apps/cms/src/collections/Categories.ts
import type { CollectionConfig } from 'payload/types'
import { slugField } from '@/app/fields/slugField';

export const Categories: CollectionConfig = {
  slug: 'categories',
  admin: {
    useAsTitle: 'name',
    description: 'Organize blog posts into categories.',
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
      label: 'Category Name',
      type: 'text',
      required: true,
      unique: true,
      localized: true,
    },
    slugField('name'),
  ],
  timestamps: true,
}

export default Categories;