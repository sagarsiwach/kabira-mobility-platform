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

// Product Page Builder Blocks
import heroSectionBlock from './objects/product/heroSectionBlock'
import configuratorSectionBlock from './objects/product/configuratorSectionBlock'
import featureSlide from './objects/product/featureSlide'
import featureCarouselBlock from './objects/product/featureCarouselBlock'
import videoBlock from './objects/product/videoBlock'
import galleryImage from './objects/product/galleryImage' // <<< NEWLY ADDED
import galleryBlock from './objects/product/galleryBlock' // <<< NEWLY ADDED

// Other Shared/Reusable Objects
import dealerHours from './objects/dealerHours'
import faqBlock from './objects/faqBlock'
// import videoSection from './objects/videoSection' // Decide if this is fully replaced by videoBlock
import textWithImageBlock from './objects/textWithImageBlock'

// Vehicle / Booking Specific Objects
import colorOption from './objects/colorOption'
import componentOption from './objects/componentOption'
import pricingRule from './objects/pricingRule'
import variant from './objects/variant'

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

  // Product Page Builder Blocks & Their Components
  heroSectionBlock,
  configuratorSectionBlock,
  featureSlide,
  featureCarouselBlock,
  videoBlock,
  galleryImage, // <<< NEWLY ADDED
  galleryBlock, // <<< NEWLY ADDED

  // Other Shared Objects for Page Builders or direct use
  dealerHours,
  faqBlock,
  textWithImageBlock,
  // videoSection, // Remove if videoBlock is the full replacement

  // Vehicle/Booking Related Objects
  colorOption,
  componentOption,
  pricingRule,
  variant,
]
