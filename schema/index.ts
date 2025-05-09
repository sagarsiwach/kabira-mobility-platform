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
import productItem from './documents/productItem'
import vehicle from './documents/vehicle'

// --- Singletons ---
import blogPage from './singletons/blogPage'
import faqPage from './singletons/faqPage'
import homePage from './singletons/homePage'
import siteSettings from './singletons/siteSettings'
import testRidePage from './singletons/testRidePage'

// --- Objects ---
// Core Reusable Objects
import address from './objects/address'
import blockContent from './objects/blockContent' // Assuming this is your main rich text editor type
import contact from './objects/contact'
import ctaBlock from './objects/ctaBlock'
import link from './objects/link'
import seoSettings from './objects/seoSettings'

// Product Page Builder Blocks (Specific to sections like Hero, Configurator, etc.)
import heroSectionBlock from './objects/product/heroSectionBlock'
import configuratorSectionBlock from './objects/product/configuratorSectionBlock'
import featureSlide from './objects/product/featureSlide' // NEW: Individual slide definition
import featureCarouselBlock from './objects/product/featureCarouselBlock' // NEW: The carousel block itself

// Other Shared/Reusable Objects (Can be used in Page Builders)
import dealerHours from './objects/dealerHours'
import faqBlock from './objects/faqBlock'
import videoSection from './objects/videoSection'
import textWithImageBlock from './objects/textWithImageBlock'

// Vehicle / Booking Specific Objects (Primarily used within the 'vehicle' document type)
import colorOption from './objects/colorOption'
import componentOption from './objects/componentOption'
import pricingRule from './objects/pricingRule'
import variant from './objects/variant'

// Legacy/Potentially Obsolete objects (review if still needed or if functionality is covered by blocks)
// import heroSection from './objects/heroSection' // If different from heroSectionBlock
// import faqSection from './objects/faqSection'   // If different from faqBlock

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
  productItem,
  vehicle,

  // === Singletons ===
  blogPage,
  faqPage,
  homePage,
  siteSettings,
  testRidePage,

  // === Objects ===
  // Core & Reusable
  address,
  blockContent, // Crucial for featureSlide.popupContent and other rich text fields
  contact,
  ctaBlock,
  link,
  seoSettings,

  // Product Page Builder Blocks & Their Components
  heroSectionBlock,
  configuratorSectionBlock,
  featureSlide, // Definition for items within the carousel
  featureCarouselBlock, // The carousel block itself for page builder

  // Other Shared Objects for Page Builders or direct use
  dealerHours,
  faqBlock, // For embedding FAQs using references
  textWithImageBlock,
  videoSection,

  // Vehicle/Booking Related Objects
  colorOption,
  componentOption,
  pricingRule,
  variant,

  // Legacy / Obsolete (Remove if not used)
  // heroSection,
  // faqSection,
]
