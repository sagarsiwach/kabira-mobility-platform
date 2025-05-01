// apps/cms/src/fields/slugField.ts
import type { Field } from 'payload/types'
import formatSlug from '../utils/formatSlug'

type Slug = (fieldToUse?: string, overrides?: Partial<Field>) => Field

export const slugField: Slug = (fieldToUse = 'title', overrides = {}) => ({
  name: 'slug',
  label: 'Slug',
  type: 'text',
  index: true,
  required: true,
  unique: true,
  admin: {
    position: 'sidebar',
    description: 'A unique identifier used in the URL. Usually generated automatically.',
    ...overrides?.admin,
  },
  hooks: {
    beforeValidate: [
      ({ value, originalDoc, data }) => formatSlug(value || data?.[fieldToUse] || originalDoc?.[fieldToUse] || ''),
    ],
  },
  ...overrides,
})