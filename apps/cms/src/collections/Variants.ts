// apps/cms/src/collections/Variants.ts
import type { CollectionConfig } from 'payload/types';

export const Variants: CollectionConfig = {
  slug: 'variants',
  admin: {
    useAsTitle: 'title',
    defaultColumns: ['title', 'model', 'code', 'price_addition', 'is_default'],
    description: 'Define variants for each vehicle model.',
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
    // Optional: Store model_name redundantantly if needed for simpler queries,
    // otherwise retrieve via relationship depth.
    // { name: 'model_name', type: 'text', admin: { readOnly: true }, hooks: { /* ... */ } },
    {
      name: 'code',
      label: 'Variant Code',
      type: 'text',
      required: true,
      unique: true, // Usually unique within a model, maybe enforce via hook
    },
    {
      name: 'title',
      label: 'Variant Title',
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
      name: 'price_addition',
      label: 'Price Addition (Paise)',
      type: 'number',
      required: true,
      defaultValue: 0,
      admin: {
        description: 'Amount added to the base vehicle price for this variant (in smallest currency unit, e.g., paise).',
      },
    },
    {
      name: 'battery_capacity',
      label: 'Battery Capacity (kWh)',
      type: 'number',
    },
    {
      name: 'range_km',
      label: 'Range (km, IDC)',
      type: 'number',
    },
    {
      name: 'is_default',
      label: 'Default Variant for Model?',
      type: 'checkbox',
      defaultValue: false,
      admin: {
        description: 'Is this the default variant selected when the model is chosen?',
      },
    },
  ],
  timestamps: true,
};

export default Variants;