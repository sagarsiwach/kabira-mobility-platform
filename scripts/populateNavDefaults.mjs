// populateNavDefaults.mjs
import { createClient } from '@sanity/client';
import 'dotenv/config'; // To load .env variables (install with: bun add dotenv)

// --- Configuration ---
const projectId = process.env.SANITY_PROJECT_ID || 'vqqzvr1q'; // Replace with your actual Project ID
const dataset = process.env.SANITY_DATASET || 'production'; // Replace with your Dataset
const apiVersion = '2023-05-03'; // Use a recent, consistent API version
const token = process.env.SANITY_API_WRITE_TOKEN; // Read token from environment variable

if (!token) {
  console.error('Error: SANITY_API_WRITE_TOKEN is not defined in your environment variables.');
  process.exit(1);
}

const client = createClient({
  projectId,
  dataset,
  apiVersion,
  token, // Use the write token
  useCdn: false, // Always use fresh data for writes
});

// --- Default Navigation Data (Matches Schema Structure) ---
// Using random keys to ensure uniqueness on each run if needed
const defaultDesktopMenu = [
  {
    _key: `desk-item-${Math.random().toString(36).substring(2, 9)}`,
    _type: 'navMenuItem',
    label: 'Motorbike',
    linkType: 'dropdown',
    dropdownType: 'motorbikes',
    dropdownItems: [
      {_key: `desk-sub-1-1-${Math.random().toString(36).substring(2, 9)}`, _type: 'dropdownModelItem', overrideLabel: 'KM5000', model: null}, // model needs manual linking
      {_key: `desk-sub-1-2-${Math.random().toString(36).substring(2, 9)}`, _type: 'dropdownModelItem', overrideLabel: 'KM4000', model: null}, // model needs manual linking
      {_key: `desk-sub-1-3-${Math.random().toString(36).substring(2, 9)}`, _type: 'dropdownModelItem', overrideLabel: 'KM3000', model: null}, // model needs manual linking
      {_key: `desk-sub-1-5-${Math.random().toString(36).substring(2, 9)}`, _type: 'dropdownLinkItem', label: 'Test Ride', url: '/test-ride'},
      {_key: `desk-sub-1-6-${Math.random().toString(36).substring(2, 9)}`, _type: 'dropdownLinkItem', label: 'Locate Us', url: '/dealers'},
      {_key: `desk-sub-1-7-${Math.random().toString(36).substring(2, 9)}`, _type: 'dropdownLinkItem', label: 'Book Now', url: '/book'},
    ],
  },
  {
    _key: `desk-item-2-${Math.random().toString(36).substring(2, 9)}`,
    _type: 'navMenuItem',
    label: 'Scooter',
    linkType: 'dropdown',
    dropdownType: 'scooters',
    dropdownItems: [
      {_key: `desk-sub-2-1-${Math.random().toString(36).substring(2, 9)}`, _type: 'dropdownModelItem', overrideLabel: 'Hermes 75', model: null}, // model needs manual linking
      {_key: `desk-sub-2-2-${Math.random().toString(36).substring(2, 9)}`, _type: 'dropdownModelItem', overrideLabel: 'Intercity 350', model: null}, // model needs manual linking
      {_key: `desk-sub-2-3-${Math.random().toString(36).substring(2, 9)}`, _type: 'dropdownLinkItem', label: 'Test Ride', url: '/test-ride'},
      {_key: `desk-sub-2-4-${Math.random().toString(36).substring(2, 9)}`, _type: 'dropdownLinkItem', label: 'Locate Us', url: '/dealers'},
      {_key: `desk-sub-2-5-${Math.random().toString(36).substring(2, 9)}`, _type: 'dropdownLinkItem', label: 'Book Now', url: '/book'},
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
      {_key: `desk-sub-7-1-${Math.random().toString(36).substring(2, 9)}`, _type: 'dropdownMoreLinkItem', label: 'About Us', url: '/about', group: 1},
      {_key: `desk-sub-7-2-${Math.random().toString(36).substring(2, 9)}`, _type: 'dropdownMoreLinkItem', label: 'Press', url: '/press', group: 1},
      {_key: `desk-sub-7-3-${Math.random().toString(36).substring(2, 9)}`, _type: 'dropdownMoreLinkItem', label: 'Blog', url: '/blog', group: 1},
      {_key: `desk-sub-7-4-${Math.random().toString(36).substring(2, 9)}`, _type: 'dropdownMoreLinkItem', label: 'Become a Dealer', url: '/become-dealer', group: 1},
      {_key: `desk-sub-7-5-${Math.random().toString(36).substring(2, 9)}`, _type: 'dropdownMoreLinkItem', label: 'Support', url: '/support', group: 2},
       {_key: `desk-sub-7-6-${Math.random().toString(36).substring(2, 9)}`, _type: 'dropdownMoreLinkItem', label: 'Contact Us', url: '/contact', group: 2},
       {_key: `desk-sub-7-7-${Math.random().toString(36).substring(2, 9)}`, _type: 'dropdownMoreLinkItem', label: 'FAQ', url: '/faq', group: 2},
       {_key: `desk-sub-7-8-${Math.random().toString(36).substring(2, 9)}`, _type: 'dropdownMoreLinkItem', label: 'Compare Models', url: '/compare', group: 2},
    ],
  },
];

const defaultMobileMenu = [
    {_key: `mob-item-1-${Math.random().toString(36).substring(2, 9)}`, _type: 'mobileRootItem', label: 'Motorbike', hasChildren: true, icon: 'right'},
    {_key: `mob-item-2-${Math.random().toString(36).substring(2, 9)}`, _type: 'mobileRootItem', label: 'Scooter', hasChildren: true, icon: 'right'},
    {_key: `mob-item-3-${Math.random().toString(36).substring(2, 9)}`, _type: 'mobileRootItem', label: 'Micromobility', hasChildren: false, url: '/micromobility', icon: 'topRight'},
    {_key: `mob-item-4-${Math.random().toString(36).substring(2, 9)}`, _type: 'mobileRootItem', label: 'Fleet', hasChildren: false, url: '/fleet', icon: 'topRight'},
    {_key: `mob-item-5-${Math.random().toString(36).substring(2, 9)}`, _type: 'mobileRootItem', label: 'Dealers', hasChildren: false, url: '/dealers', icon: 'topRight'},
    {_key: `mob-item-6-${Math.random().toString(36).substring(2, 9)}`, _type: 'mobileRootItem', label: 'Contact', hasChildren: false, url: '/contact', icon: 'topRight'},
    {_key: `mob-item-7-${Math.random().toString(36).substring(2, 9)}`, _type: 'mobileRootItem', label: 'More', hasChildren: true, icon: 'more'},
 ];


// --- Main Script Logic ---
async function populateDefaults() {
  console.log('Attempting to populate default navigation settings...');

  // Define the patch operation
  const patch = client
    .patch('navigationSettings') // Target the singleton by its ID
    .set({
      // Completely overwrite the arrays with the default data
      desktopMenuItems: defaultDesktopMenu,
      mobileMenuItems: defaultMobileMenu,
      // Add siteTitle if it needs to be set/ensured, otherwise omit
      // siteTitle: 'Kabira Mobility'
    });

  try {
    // Execute the patch
    const result = await patch.commit({
       // Optional: Add visibility option if needed, default is usually fine
       // visibility: 'async',
       // Optional: Add returnDocuments option to see the result
       returnDocuments: true,
       // Ensure document is created if it doesn't exist (though it should for a singleton setup)
       // autoGenerateArrayKeys: true // Keys are provided manually, so not needed
    });

    console.log('Successfully patched navigationSettings:');
    // console.log(JSON.stringify(result, null, 2)); // Log the updated document if returnDocuments=true
    console.log('✅ Default navigation data applied.');
    console.warn('👉 Remember to manually link the Vehicle Model references in the Studio for dropdown items!');

  } catch (error) {
    console.error('Error patching navigationSettings document:', error);
    if (error.statusCode === 401) {
       console.error('Check if your SANITY_API_WRITE_TOKEN is correct and has write permissions.');
    } else if (error.statusCode === 404) {
        console.error('Error: The document with _id "navigationSettings" was not found. Ensure it exists or adjust the patch logic.');
        // You might want to use .createIfNotExists({...}) instead of .patch() if the document might truly be missing
        // Example:
        // await client.createIfNotExists({ _id: 'navigationSettings', _type: 'navigationSettings', siteTitle: 'Kabira Mobility', desktopMenuItems: ..., mobileMenuItems: ... });
    }
  }
}

// Run the function
populateDefaults();