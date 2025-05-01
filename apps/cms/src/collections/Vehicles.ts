// apps/cms/src/collections/Vehicles.ts
import type { CollectionConfig } from 'payload/types';

export const Vehicles: CollectionConfig = {
  slug: 'vehicles',
  admin: {
    useAsTitle: 'name',
    defaultColumns: ['name', 'model_code', 'updatedAt'],
    description: 'Manage base vehicle models.',
  },
  access: {
    read: () => true, // Publicly readable
    create: ({ req: { user } }) => user?.roles?.includes('admin'),
    update: ({ req: { user } }) => user?.roles?.includes('admin'),
    delete: ({ req: { user } }) => user?.roles?.includes('admin'),
  },
  fields: [
    {
      name: 'name',
      label: 'Model Name',
      type: 'text',
      required: true,
      unique: true,
    },
    {
      name: 'model_code',
      label: 'Model Code',
      type: 'text',
      required: true,
      unique: true,
    },
    {
      name: 'description',
      type: 'textarea',
    },
    {
      name: 'image', // Use relation to Media collection
      label: 'Primary Image',
      type: 'upload',
      relationTo: 'media',
      required: true,
    },
    // Store the image URL for easier frontend access if needed,
    // populated by a hook or retrieved via depth query
    // {
    //   name: 'image_url',
    //   type: 'text',
    //   admin: { readOnly: true },
    //   hooks: { afterRead: [ /* populate from image relation */ ] },
    // }
  ],
  timestamps: true,
};

export default Vehicles;