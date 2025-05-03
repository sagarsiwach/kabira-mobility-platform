// schema/index.ts

// --- Documents ---
import dealer from './documents/dealer'
import vehicleModel from './documents/vehicleModel'
import post from './documents/post'
import legalPage from './documents/legalPage'
import author from './documents/author'
import category from './documents/category'
import productPage from './documents/productPage'

// --- Singletons ---
import navigationSettings from './singletons/navigationSettings'

// --- Objects ---
// Core Objects
import address from './objects/address'
import contact from './objects/contact'
import seoSettings from './objects/seoSettings'
import blockContent from './objects/blockContent'
// Dealer Specific
import dealerHours from './objects/dealerHours'
// Vehicle Model Specific
import variant from './objects/variant'
import colorOption from './objects/colorOption'
import componentOption from './objects/componentOption'
import pricingRule from './objects/pricingRule'
// Product Page Sections
import heroSection from './objects/heroSection'
import configuratorData from './objects/configuratorData'
import featureCarousel from './objects/featureCarousel'
import techSpecsSection from './objects/techSpecsSection'
import faqSection from './objects/faqSection'
import videoSection from './objects/videoSection'
import testimonialSection from './objects/testimonialSection'
// Navigation Specific
import navMenuItem from './objects/navMenuItem'

export const schemaTypes = [
  // Documents
  dealer,
  vehicleModel,
  productPage,
  post,
  legalPage,
  author,
  category,

  // Singletons
  navigationSettings,

  // Objects
  address,
  contact,
  seoSettings,
  blockContent,
  dealerHours,
  variant,
  colorOption,
  componentOption,
  pricingRule,
  heroSection,
  configuratorData,
  featureCarousel,
  techSpecsSection,
  faqSection,
  videoSection,
  testimonialSection,
  navMenuItem,
]
