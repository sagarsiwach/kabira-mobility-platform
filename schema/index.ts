// schema/index.ts
// --- Documents ---
import author from './documents/author'
import category from './documents/category'
import dealer from './documents/dealer'
import faqCategory from './documents/faqCategory'
import faqItem from './documents/faqItem'
import genericPage from './documents/genericPage'
import legalPage from './documents/legalPage'
import post from './documents/post'
import pressRelease from './documents/pressRelease'
import productItem from './documents/productItem' // Represents the Product Page
import vehicle from './documents/vehicle' // Represents core vehicle data (kept but decoupled)

// --- Singletons ---
import blogPage from './singletons/blogPage'
import faqPage from './singletons/faqPage'
import homePage from './singletons/homePage'
import siteSettings from './singletons/siteSettings'
import testRidePage from './singletons/testRidePage'

// --- Objects ---
// Core Reusable Objects
import address from './objects/address'
import blockContent from './objects/blockContent'
import contact from './objects/contact'
import ctaBlock from './objects/ctaBlock'
import link from './objects/link'
import seoSettings from './objects/seoSettings'

// Product Page Blocks (Now in subfolder)
import heroSectionBlock from './objects/product/heroSectionBlock' // Updated path
import configuratorSectionBlock from './objects/product/configuratorSectionBlock' // Updated path
// import featureCarouselBlock from './objects/product/featureCarouselBlock' // Example for later
// import techSpecsSectionBlock from './objects/product/techSpecsSectionBlock'  // Example for later
// import gallerySectionBlock from './objects/product/gallerySectionBlock'  // Example for later
// import testimonialSectionBlock from './objects/product/testimonialSectionBlock' // Example for later

// Other Shared/Reusable Objects
import dealerHours from './objects/dealerHours'
import faqBlock from './objects/faqBlock' // Used in Page Builder
import videoSection from './objects/videoSection' // Can be used in Page Builder
import textWithImageBlock from './objects/textWithImageBlock' // Used in Page Builder

// Vehicle / Booking Specific Objects (Keep if vehicle.ts still uses them)
import colorOption from './objects/colorOption'
import componentOption from './objects/componentOption'
import pricingRule from './objects/pricingRule'
import variant from './objects/variant'
// Note: heroSection.ts and faqSection.ts might be duplicates/obsolete if replaced by the Blocks
// Review and remove if necessary.

export const schemaTypes = [
  // === Documents ===
  author,
  category,
  dealer,
  faqCategory,
  faqItem,
  genericPage,
  legalPage,
  post,
  pressRelease,
  productItem, // The Product Page document
  vehicle, // The Vehicle Data document (decoupled)

  // === Singletons ===
  blogPage,
  faqPage,
  homePage,
  siteSettings,
  testRidePage,

  // === Objects ===
  // Core & Reusable
  address,
  blockContent,
  contact,
  ctaBlock,
  link,
  seoSettings,

  // Product Page Blocks
  heroSectionBlock,
  configuratorSectionBlock,
  // Add other product blocks here as they are created...

  // Other Shared Objects
  dealerHours,
  faqBlock,
  textWithImageBlock,
  videoSection,

  // Vehicle/Booking Related Objects (if still used by vehicle.ts)
  colorOption,
  componentOption,
  pricingRule,
  variant,
]
