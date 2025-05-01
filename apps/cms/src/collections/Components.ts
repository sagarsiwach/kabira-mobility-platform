// apps/cms/src/collections/Components.ts
import type { CollectionConfig } from 'payload/types';

export const Components: CollectionConfig = {
  slug: 'components',
  admin: {
    useAsTitle: 'title',
    defaultColumns: ['title', 'model', 'component_type', 'price', 'is_required'],
    description: 'Manage optional/required components, accessories, packages, etc.',
  },
  access: {
    read: () => true,
    create: ({ req: { user } }) => user?.roles?.includes('admin'),
    update: ({ req: { user } }) => user?.roles?.includes('admin'),
    delete: ({ req: { user } }) => user?.roles?.includes('admin'),
  },
  fields: [
    {
      name: 'model', // Relationship to the base vehicle model
      label: 'Vehicle Model',
      type: 'relationship',
      relationTo: 'vehicles',
      required: true,
      index: true,
    },
    // { name: 'model_name', type: 'text', admin: { readOnly: true }, hooks: { /* ... */ } },
    {
      name: 'component_type',
      label: 'Component Type',
      type: 'select',
      options: [
        { label: 'Accessory', value: 'ACCESSORY' },
        { label: 'Package', value: 'PACKAGE' },
        { label: 'Warranty', value: 'WARRANTY' },
        { label: 'Service', value: 'SERVICE' },
        { label: 'Insurance', value: 'INSURANCE' }, // Added Insurance type
        { label: 'Finance', value: 'FINANCE' }, // Added Finance type
      ],
      required: true,
    },
    {
      name: 'code',
      label: 'Component Code',
      type: 'text',
      unique: true, // Ensure codes are unique
    },
    {
      name: 'title',
      label: 'Component Title',
      type: 'text',
      required: true,
    },
    {
      name: 'subtitle',
      type: 'text',
    },
    {
      name: 'description',
      type: 'textarea',
    },
    {
      name: 'price', // Price in smallest currency unit (Paise)
      label: 'Price (Paise)',
      type: 'number',
      required: true,
      defaultValue: 0,
    },
    {
      name: 'is_required',
      label: 'Required Component?',
      type: 'checkbox',
      defaultValue: false,
      admin: {
        description: 'If checked, this component will be automatically included and cannot be removed.',
      },
    },
    // Optional: Add fields specific to certain types if needed
    // e.g., using admin.condition to show fields only for 'Warranty' type
    // {
    //   name: 'warrantyTenureMonths',
    //   label: 'Warranty Tenure (Months)',
    //   type: 'number',
    //   admin: {
    //     condition: (data) => data.component_type === 'WARRANTY',
    //   }
    // },
  ],
  timestamps: true,
};

export default Components;