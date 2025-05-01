// apps/cms/src/payload.config.ts
import path from 'path'
import { postgresAdapter } from '@payloadcms/db-postgres'
import { lexicalEditor } from '@payloadcms/richtext-lexical'
// --- CHANGE THIS LINE ---
import { buildConfig } from 'payload' // Import directly from 'payload'
// --- END CHANGE ---
import sharp from 'sharp'
import { fileURLToPath } from 'url'

// Import ALL Collections
import { Users } from './collections/Users'
import { Media } from './collections/Media'
import { Categories } from './collections/Categories'
import { Tags } from './collections/Tags'
import { Posts } from './collections/Posts'
import { Dealers } from './collections/Dealers'
import { Bookings } from './collections/Bookings'
import { LegalPages } from './collections/LegalPages'
import { Vehicles } from './collections/Vehicles'
import { Variants } from './collections/Variants'
import { Colors } from './collections/Colors'
import { Components } from './collections/Components'
import { Pricing } from './collections/Pricing'

const filename = fileURLToPath(import.meta.url)
const dirname = path.dirname(filename)

export default buildConfig({
  // --- Admin UI ---
  admin: {
    user: Users.slug,
    meta: {
      titleSuffix: '- Kabira Mobility CMS',
      favicon: '/favicon.ico',
      ogImage: '/og-image.png',
    },
  },

  // --- Collections ---
  collections: [
    // Core
    Users,
    Media,
    // Booking Engine Core Data
    Vehicles,
    Variants,
    Colors,
    Components,
    Pricing,
    Dealers,
    // Transactional Data
    Bookings,
    // Content
    Posts,
    Categories,
    Tags,
    LegalPages,
  ],

  // --- Editor ---
  editor: lexicalEditor({}),

  // --- Database ---
  db: postgresAdapter({
    pool: {
      connectionString: process.env.DATABASE_URI,
    },
  }),

  // --- File Upload / Image Processing ---
  sharp,

  // --- General Config ---
  secret: process.env.PAYLOAD_SECRET || 'DEV_SECRET_CHANGE_THIS_IN_PROD',
  typescript: {
    outputFile: path.resolve(dirname, 'payload-types.ts'),
  },

  // --- CORS Configuration ---
  cors: [
    process.env.FRONTEND_URL || 'http://localhost:3000', // Allow frontend dev server
    'https://book.yourdomain.com', // Example production URL
    'https://*.vercel.app',
  ],
  csrf: [
    process.env.FRONTEND_URL || 'http://localhost:3000',
    'https://book.yourdomain.com',
    'https://*.vercel.app',
  ],
})
