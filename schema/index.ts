// schema/index.ts (CORRECTED - No broken imports)

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
import productPage from './documents/productPage' // Updated to link to 'vehicle'
import vehicle from './documents/vehicle'

// --- Singletons ---
import blogPage from './singletons/blogPage'
import faqPage from './singletons/faqPage'
import homePage from './singletons/homePage' // Updated to link to 'vehicle'
import navigationSettings from './singletons/navigationSettings' // Updated structure inside
import siteSettings from './singletons/siteSettings'
import testRidePage from './singletons/testRidePage'

// --- Objects ---
// Core Reusable Objects
import address from './objects/address'
import blockContent from './objects/blockContent'
import contact from './objects/contact'
import ctaBlock from './objects/ctaBlock'
import link from './objects/link' // Simplified version (external/path only)
import seoSettings from './objects/seoSettings'

// Vehicle / Booking / Configurator Specific Objects (Used by 'vehicle')
import colorOption from './objects/colorOption'
import componentOption from './objects/componentOption'
import configuratorData from './objects/configuratorData' // Keep if used by other blocks? Otherwise maybe remove.
import configuratorSetup from './objects/configuratorSetup'
import pricingRule from './objects/pricingRule'
import variant from './objects/variant'

// Page Builder & Content Blocks (Used by 'productPage', 'genericPage', etc.)
import dealerHours from './objects/dealerHours'
import downloadItem from './objects/downloadItem'
import downloadList from './objects/downloadList'
import faqBlock from './objects/faqBlock' // Generic FAQ block for page builder
import productFaqs from './objects/productFaqs' // Specific FAQ block for product pages (references global items)
import featureCarousel from './objects/featureCarousel'
import gallerySection from './objects/gallerySection'
import heroSection from './objects/heroSection' // Updated structure inside
import specColorSwatchDisplay from './objects/specColorSwatchDisplay'
import specKeyValue from './objects/specKeyValue'
import specSimpleListItem from './objects/specSimpleListItem'
import techSpecsSection from './objects/techSpecsSection' // Uses spec items
import testimonialSection from './objects/testimonialSection'
import textWithImageBlock from './objects/textWithImageBlock'
import turntableSection from './objects/turntableSection' // Updated structure inside (.ts)
import videoSection from './objects/videoSection'

// NEW Simplified Navigation Objects (Used by 'navigationSettings')
import basicNavItem from './objects/basicNavItem'
import vehicleDropdownLink from './objects/vehicleDropdownLink'
import groupedLink from './objects/groupedLink'

// REMOVED OLD NAVIGATION OBJECT IMPORTS:
// - dropdownItem, dropdownMenu, groupedLinkItem, linkItem, mobileMenuItem,
// - moreDropdownItem, navMenuItem, topLevelNavItem, vehicleDropdownItem

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
  productPage, // Connects to 'vehicle'
  vehicle, // Consolidated source of truth
  

  // === Singletons ===
  blogPage,
  faqPage,
  homePage, // Connects to 'vehicle'
  navigationSettings, // Uses new nav objects
  siteSettings,
  testRidePage,

  // === Objects ===
  // Core & Reusable
  address,
  blockContent,
  contact,
  ctaBlock,
  link, // Simplified
  seoSettings,
  // Vehicle/Booking/Configurator (used within 'vehicle')
  colorOption,
  componentOption,
  configuratorData, // Review if needed
  configuratorSetup,
  pricingRule,
  variant,
  // Page Builder & Content Blocks
  dealerHours,
  downloadItem,
  downloadList,
  faqBlock,
  productFaqs,
  featureCarousel,
  gallerySection,
  heroSection,
  specColorSwatchDisplay,
  specKeyValue,
  specSimpleListItem,
  techSpecsSection,
  testimonialSection,
  textWithImageBlock,
  turntableSection, // Updated
  videoSection,
  // NEW Navigation Objects (used within 'navigationSettings')
  basicNavItem,
  vehicleDropdownLink,
  groupedLink,

  // REMOVED OLD NAVIGATION OBJECTS FROM THIS LIST
]
