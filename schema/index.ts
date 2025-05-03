// schema/index.ts

// --- Documents ---
import dealer from './documents/dealer'
import vehicleModel from './documents/vehicleModel'
import post from './documents/post'
import legalPage from './documents/legalPage'
import author from './documents/author'
import category from './documents/category' // Blog Category
import productPage from './documents/productPage'
import faqItem from './documents/faqItem' // Global FAQ Item
import faqCategory from './documents/faqCategory' // FAQ Category

// --- Singletons ---
import navigationSettings from './singletons/navigationSettings'

// --- Objects ---
// Core Objects
import address from './objects/address'
import contact from './objects/contact'
import seoSettings from './objects/seoSettings'
import blockContent from './objects/blockContent'
import link from './objects/link'
// Dealer Specific
import dealerHours from './objects/dealerHours'
// Vehicle Model Specific
import variant from './objects/variant'
import colorOption from './objects/colorOption'
import componentOption from './objects/componentOption'
import pricingRule from './objects/pricingRule'
// Product Page Sections & Components
import heroSection from './objects/heroSection'
import configuratorData from './objects/configuratorData'
import featureCarousel from './objects/featureCarousel'
import techSpecsSection from './objects/techSpecsSection' // Main Tech Specs container object
import videoSection from './objects/videoSection'
import testimonialSection from './objects/testimonialSection'
// Tech Spec Specific Item Types (used within techSpecsSection)
import specKeyValue from './objects/specKeyValue'
import specColorSwatchDisplay from './objects/specColorSwatchDisplay'
import specSimpleListItem from './objects/specSimpleListItem'
// Navigation Specific
import navMenuItem from './objects/navMenuItem'
import dropdownItem from './objects/dropdownItem'
import moreDropdownItem from './objects/moreDropdownItem'
import mobileMenuItem from './objects/mobileMenuItem'

// Note: The inline 'faqSection' object type has been removed as FAQs are now global documents.

export const schemaTypes = [
  // Documents
  dealer,
  vehicleModel,
  productPage,
  post,
  legalPage,
  author,
  category, // Blog Category
  faqItem, // Global FAQ Item
  faqCategory, // FAQ Category

  // Singletons
  navigationSettings,

  // Objects
  address,
  contact,
  seoSettings,
  blockContent,
  link,
  dealerHours,
  variant,
  colorOption,
  componentOption,
  pricingRule,
  heroSection,
  configuratorData,
  featureCarousel,
  techSpecsSection,
  videoSection,
  testimonialSection,
  specKeyValue, // Specific item type for Tech Specs
  specColorSwatchDisplay, // Specific item type for Tech Specs
  specSimpleListItem, // Specific item type for Tech Specs
  navMenuItem,
  dropdownItem,
  moreDropdownItem,
  mobileMenuItem,
]
