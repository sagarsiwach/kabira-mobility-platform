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
import blockContent from './objects/blockContent'
import contact from './objects/contact'
import ctaBlock from './objects/ctaBlock'
import link from './objects/link'
import seoSettings from './objects/seoSettings'

// Vehicle / Booking Specific Objects
import colorOption from './objects/colorOption'
import componentOption from './objects/componentOption'
import pricingRule from './objects/pricingRule'
import variant from './objects/variant'

// Page Builder & Content Blocks
import dealerHours from './objects/dealerHours'
import faqBlock from './objects/faqBlock'
import faqSection from './objects/faqSection'
import heroSection from './objects/heroSection'
import textWithImageBlock from './objects/textWithImageBlock'
import videoSection from './objects/videoSection'

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
  blockContent,
  contact,
  ctaBlock,
  link,
  seoSettings,

  // Vehicle/Booking
  colorOption,
  componentOption,
  pricingRule,
  variant,

  // Page Builder & Content Blocks
  dealerHours,
  faqBlock,
  faqSection,
  heroSection,
  textWithImageBlock,
  videoSection,
]
