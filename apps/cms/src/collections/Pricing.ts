// apps/cms/src/collections/Pricing.ts
import type { CollectionConfig } from 'payload/types';

export const Pricing: CollectionConfig = {
  slug: 'pricing',
  admin: {
    // Using ID might be clearer here, or combine fields for title
    // useAsTitle: 'id',
    defaultColumns: ['model', 'state', 'city', 'pincode_start', 'pincode_end', 'base_price'],
    description: 'Define base pricing rules for vehicles based on location.',
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
      name: 'state',
      type: 'text',
      required: true,
      index: true,
    },
    {
      name: 'city',
      type: 'text',
      admin: {
        description: 'Leave blank if price applies to the entire state (unless overridden by pincode).',
      },
      index: true,
    },
    {
      name: 'pincode_start',
      label: 'Pincode Range Start',
      type: 'number', // Use number for range checks
      required: true,
      min: 100000,
      max: 999999,
      index: true,
       admin: {
        description: 'Enter the 6-digit starting pincode for this price rule.',
      },
    },
     {
      name: 'pincode_end',
      label: 'Pincode Range End',
      type: 'number',
      required: true,
      min: 100000,
      max: 999999,
      index: true,
      admin: {
        description: 'Enter the 6-digit ending pincode for this price rule.',
      },
      // Add validation to ensure end >= start if needed via validate function
    },
    {
      name: 'base_price', // Price in smallest currency unit (Paise)
      label: 'Base Price (Paise)',
      type: 'number',
      required: true,
    },
    {
      name: 'fulfillment_fee', // Fee in smallest currency unit (Paise)
      label: 'Fulfillment Fee (Paise)',
      type: 'number',
      defaultValue: 0,
    },
  ],
  timestamps: true,
};

export default Pricing;