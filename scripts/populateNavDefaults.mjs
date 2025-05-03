// populateNavDefaults.mjs
import {createClient} from '@sanity/client'
import 'dotenv/config'

// --- Configuration (Keep as before) ---
const projectId = process.env.SANITY_PROJECT_ID || 'vqqzvr1q'
const dataset = process.env.SANITY_DATASET || 'production'
const apiVersion = '2023-05-03'
const token = process.env.SANITY_API_WRITE_TOKEN

if (!token) {
  console.error('Error: SANITY_API_WRITE_TOKEN is not defined in your environment variables.')
  process.exit(1)
}

const client = createClient({
  projectId,
  dataset,
  apiVersion,
  token,
  useCdn: false,
})

// --- Default Navigation Data (Keep as before) ---
const defaultDesktopMenu = [
  {
    _key: `desk-item-${Math.random().toString(36).substring(2, 9)}`,
    _type: 'navMenuItem',
    label: 'Motorbike',
    linkType: 'dropdown',
    dropdownType: 'motorbikes',
    dropdownItems: [
      {
        _key: `desk-sub-1-1-${Math.random().toString(36).substring(2, 9)}`,
        _type: 'dropdownModelItem',
        overrideLabel: 'KM5000',
        model: null,
      }, // model needs manual linking
      {
        _key: `desk-sub-1-2-${Math.random().toString(36).substring(2, 9)}`,
        _type: 'dropdownModelItem',
        overrideLabel: 'KM4000',
        model: null,
      }, // model needs manual linking
      {
        _key: `desk-sub-1-3-${Math.random().toString(36).substring(2, 9)}`,
        _type: 'dropdownModelItem',
        overrideLabel: 'KM3000',
        model: null,
      }, // model needs manual linking
      {
        _key: `desk-sub-1-5-${Math.random().toString(36).substring(2, 9)}`,
        _type: 'dropdownLinkItem',
        label: 'Test Ride',
        url: '/test-ride',
      },
      {
        _key: `desk-sub-1-6-${Math.random().toString(36).substring(2, 9)}`,
        _type: 'dropdownLinkItem',
        label: 'Locate Us',
        url: '/dealers',
      },
      {
        _key: `desk-sub-1-7-${Math.random().toString(36).substring(2, 9)}`,
        _type: 'dropdownLinkItem',
        label: 'Book Now',
        url: '/book',
      },
    ],
  },
  {
    _key: `desk-item-2-${Math.random().toString(36).substring(2, 9)}`,
    _type: 'navMenuItem',
    label: 'Scooter',
    linkType: 'dropdown',
    dropdownType: 'scooters',
    dropdownItems: [
      {
        _key: `desk-sub-2-1-${Math.random().toString(36).substring(2, 9)}`,
        _type: 'dropdownModelItem',
        overrideLabel: 'Hermes 75',
        model: null,
      }, // model needs manual linking
      {
        _key: `desk-sub-2-2-${Math.random().toString(36).substring(2, 9)}`,
        _type: 'dropdownModelItem',
        overrideLabel: 'Intercity 350',
        model: null,
      }, // model needs manual linking
      {
        _key: `desk-sub-2-3-${Math.random().toString(36).substring(2, 9)}`,
        _type: 'dropdownLinkItem',
        label: 'Test Ride',
        url: '/test-ride',
      },
      {
        _key: `desk-sub-2-4-${Math.random().toString(36).substring(2, 9)}`,
        _type: 'dropdownLinkItem',
        label: 'Locate Us',
        url: '/dealers',
      },
      {
        _key: `desk-sub-2-5-${Math.random().toString(36).substring(2, 9)}`,
        _type: 'dropdownLinkItem',
        label: 'Book Now',
        url: '/book',
      },
    ],
  },
  {
    _key: `desk-item-3-${Math.random().toString(36).substring(2, 9)}`,
    _type: 'navMenuItem',
    label: 'Micromobility',
    linkType: 'internal',
    internalLink: '/micromobility',
  },
  {
    _key: `desk-item-4-${Math.random().toString(36).substring(2, 9)}`,
    _type: 'navMenuItem',
    label: 'Fleet',
    linkType: 'internal',
    internalLink: '/fleet',
  },
  {
    _key: `desk-item-5-${Math.random().toString(36).substring(2, 9)}`,
    _type: 'navMenuItem',
    label: 'Dealers',
    linkType: 'internal',
    internalLink: '/dealers',
  },
  {
    _key: `desk-item-6-${Math.random().toString(36).substring(2, 9)}`,
    _type: 'navMenuItem',
    label: 'Contact',
    linkType: 'internal',
    internalLink: '/contact',
  },
  {
    _key: `desk-item-7-${Math.random().toString(36).substring(2, 9)}`,
    _type: 'navMenuItem',
    label: 'More',
    linkType: 'dropdown',
    dropdownType: 'more',
    dropdownItems: [
      {
        _key: `desk-sub-7-1-${Math.random().toString(36).substring(2, 9)}`,
        _type: 'dropdownMoreLinkItem',
        label: 'About Us',
        url: '/about',
        group: 1,
      },
      {
        _key: `desk-sub-7-2-${Math.random().toString(36).substring(2, 9)}`,
        _type: 'dropdownMoreLinkItem',
        label: 'Press',
        url: '/press',
        group: 1,
      },
      {
        _key: `desk-sub-7-3-${Math.random().toString(36).substring(2, 9)}`,
        _type: 'dropdownMoreLinkItem',
        label: 'Blog',
        url: '/blog',
        group: 1,
      },
      {
        _key: `desk-sub-7-4-${Math.random().toString(36).substring(2, 9)}`,
        _type: 'dropdownMoreLinkItem',
        label: 'Become a Dealer',
        url: '/become-dealer',
        group: 1,
      },
      {
        _key: `desk-sub-7-5-${Math.random().toString(36).substring(2, 9)}`,
        _type: 'dropdownMoreLinkItem',
        label: 'Support',
        url: '/support',
        group: 2,
      },
      {
        _key: `desk-sub-7-6-${Math.random().toString(36).substring(2, 9)}`,
        _type: 'dropdownMoreLinkItem',
        label: 'Contact Us',
        url: '/contact',
        group: 2,
      },
      {
        _key: `desk-sub-7-7-${Math.random().toString(36).substring(2, 9)}`,
        _type: 'dropdownMoreLinkItem',
        label: 'FAQ',
        url: '/faq',
        group: 2,
      },
      {
        _key: `desk-sub-7-8-${Math.random().toString(36).substring(2, 9)}`,
        _type: 'dropdownMoreLinkItem',
        label: 'Compare Models',
        url: '/compare',
        group: 2,
      },
    ],
  },
]

const defaultMobileMenu = [
  {
    _key: `mob-item-1-${Math.random().toString(36).substring(2, 9)}`,
    _type: 'mobileRootItem',
    label: 'Motorbike',
    hasChildren: true,
    icon: 'right',
  },
  {
    _key: `mob-item-2-${Math.random().toString(36).substring(2, 9)}`,
    _type: 'mobileRootItem',
    label: 'Scooter',
    hasChildren: true,
    icon: 'right',
  },
  {
    _key: `mob-item-3-${Math.random().toString(36).substring(2, 9)}`,
    _type: 'mobileRootItem',
    label: 'Micromobility',
    hasChildren: false,
    url: '/micromobility',
    icon: 'topRight',
  },
  {
    _key: `mob-item-4-${Math.random().toString(36).substring(2, 9)}`,
    _type: 'mobileRootItem',
    label: 'Fleet',
    hasChildren: false,
    url: '/fleet',
    icon: 'topRight',
  },
  {
    _key: `mob-item-5-${Math.random().toString(36).substring(2, 9)}`,
    _type: 'mobileRootItem',
    label: 'Dealers',
    hasChildren: false,
    url: '/dealers',
    icon: 'topRight',
  },
  {
    _key: `mob-item-6-${Math.random().toString(36).substring(2, 9)}`,
    _type: 'mobileRootItem',
    label: 'Contact',
    hasChildren: false,
    url: '/contact',
    icon: 'topRight',
  },
  {
    _key: `mob-item-7-${Math.random().toString(36).substring(2, 9)}`,
    _type: 'mobileRootItem',
    label: 'More',
    hasChildren: true,
    icon: 'more',
  },
]

// --- Updated Main Script Logic ---
async function populateDefaults() {
  console.log('Attempting to create or update navigation settings...')

  // Define the document structure
  const doc = {
    _id: 'navigationSettings', // The fixed ID for the singleton
    _type: 'navigationSettings', // The schema type
    siteTitle: 'Kabira Mobility', // Ensure this basic field is set
    desktopMenuItems: defaultDesktopMenu,
    mobileMenuItems: defaultMobileMenu,
  }

  try {
    // Use transaction with createIfNotExists and patch
    const transaction = client.transaction()

    // Step 1: Ensure the document exists
    transaction.createIfNotExists({
      _id: 'navigationSettings',
      _type: 'navigationSettings',
      siteTitle: 'Kabira Mobility', // Minimal creation payload
    })

    // Step 2: Patch the document (whether it was just created or already existed)
    // Pass the document ID and a function that receives the patch builder
    transaction.patch(
      'navigationSettings',
      (
        p, // <-- Correct syntax
      ) =>
        p.set({
          desktopMenuItems: defaultDesktopMenu,
          mobileMenuItems: defaultMobileMenu,
          // No need to set siteTitle again if createIfNotExists included it
          // siteTitle: 'Kabira Mobility'
        }),
    )

    // Commit the transaction
    const result = await transaction.commit({
      returnDocuments: false, // Don't need the doc returned necessarily
    })

    console.log('✅ Transaction committed successfully.')
    console.log('Navigation settings created or updated with default data.')
    console.warn(
      '👉 Remember to manually link the Vehicle Model references in the Studio for dropdown items!',
    )
  } catch (error) {
    console.error('Error creating/patching navigationSettings document:', error)
    if (error.statusCode === 401) {
      console.error('Check if your SANITY_API_WRITE_TOKEN is correct and has write permissions.')
    } else {
      console.error('Full error details:', error.details || error.message)
    }
  }
}

// Run the function
populateDefaults()
