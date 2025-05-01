// apps/cms/src/collections/Dealers.ts
import type { CollectionConfig } from 'payload/types'

export const Dealers: CollectionConfig = {
  slug: 'dealers',
  admin: {
    useAsTitle: 'name',
    defaultColumns: ['name', 'address.city', 'address.state', 'contact.phone', 'active'],
    description: 'Manage dealership locations, contact info, and services.',
  },
  access: {
    read: () => true, // Publicly readable
    create: ({ req: { user } }) => user?.roles?.includes('admin'), // Admins only
    update: ({ req: { user } }) => user?.roles?.includes('admin'), // Admins only
    delete: ({ req: { user } }) => user?.roles?.includes('admin'), // Admins only
  },
  fields: [
    {
      name: 'name',
      type: 'text',
      required: true,
      label: 'Dealer Name',
    },
    {
      name: 'address',
      type: 'group',
      label: 'Address',
      fields: [
        { name: 'line1', type: 'text', label: 'Address Line 1' },
        { name: 'line2', type: 'text', label: 'Address Line 2' },
        { name: 'city', type: 'text', required: true },
        { name: 'state', type: 'text', required: true },
        { name: 'pincode', type: 'text', required: true, label: 'Pincode' },
        { name: 'country', type: 'text', defaultValue: 'India' },
        // 'formatted' address is likely best generated on the fly or via a hook if needed
      ],
    },
    {
      name: 'coordinates',
      type: 'point', // Use Payload's point field for [lng, lat]
      label: 'GPS Coordinates (Longitude, Latitude)',
    },
    {
      name: 'contact',
      type: 'group',
      label: 'Contact Information',
      fields: [
        { name: 'phone', type: 'text', label: 'Phone Number' },
        { name: 'email', type: 'email', label: 'Email Address' },
        { name: 'website', type: 'text', label: 'Website URL' },
      ],
    },
    {
      name: 'hours',
      type: 'array',
      label: 'Opening Hours',
      minRows: 7,
      maxRows: 7,
      fields: [
        {
          name: 'day',
          type: 'select',
          options: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'],
          required: true,
        },
        {
          name: 'open',
          type: 'text', // Using text allows for "Closed" or time format like "HH:MM"
          label: 'Open Time (e.g., 10:00 or Closed)',
          defaultValue: '10:00',
        },
        {
          name: 'close',
          type: 'text',
          label: 'Close Time (e.g., 17:00 or Closed)',
          defaultValue: '17:00',
        },
      ],
      // Add default value hook if needed to pre-populate all 7 days
      // defaultValue: [ /* array of 7 day objects */ ]
    },
    {
      name: 'services',
      type: 'select',
      hasMany: true,
      label: 'Services Offered',
      options: [
        { label: 'Sales', value: 'sales' },
        { label: 'Service', value: 'service' },
        { label: 'Charging', value: 'charging' },
        { label: 'Test Rides', value: 'test_rides' },
      ],
    },
    {
      name: 'active',
      type: 'checkbox',
      label: 'Is Active?',
      defaultValue: false,
    },
    {
      name: 'featured',
      type: 'checkbox',
      label: 'Is Featured?',
      defaultValue: false,
    },
    {
      name: 'imageUrl', // Consider renaming to 'image' and using relationTo 'media'
      label: 'Image URL',
      type: 'text', // Or 'upload' type if using Payload storage
      // If using upload:
      // name: 'image',
      // type: 'upload',
      // relationTo: 'media',
    },
  ],
  timestamps: true,
}

export default Dealers;