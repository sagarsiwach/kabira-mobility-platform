// apps/cms/src/collections/Users.ts
import type { CollectionConfig } from 'payload/types'

export const Users: CollectionConfig = {
  slug: 'users',
  auth: true,
  admin: {
    useAsTitle: 'name', // Use name as title
    defaultColumns: ['name', 'email', 'roles', 'createdAt'],
  },
  access: {
    read: () => true,
    create: () => true, // Adjust if sign-up needs restriction
    update: ({ req: { user } }) => !!user,
    delete: ({ req: { user } }) => user?.roles?.includes('admin'),
  },
  fields: [
    {
      name: 'name',
      type: 'text',
      required: true,
      saveToJWT: true,
    },
    // Email and password fields are added automatically by `auth: true`
    {
      name: 'roles',
      type: 'select',
      hasMany: true,
      defaultValue: ['public'],
      options: [
        { label: 'Admin', value: 'admin' },
        { label: 'Editor', value: 'editor' }, // Added Editor role for blog/pages maybe
        { label: 'Public', value: 'public' },
      ],
    },
    // Add other fields if needed (e.g., profile picture relationship)
  ],
  timestamps: true,
}

export default Users;