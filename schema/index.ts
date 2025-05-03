// schema/index.ts

// Import Document Types
import dealer from './documents/dealer'
import vehicleModel from './documents/vehicleModel'
import post from './documents/post'
import legalPage from './documents/legalPage'
import author from './documents/author'
import category from './documents/category'
import productPage from './documents/productPage' // Add this new import

// Import Object Types
import address from './objects/address'
import contact from './objects/contact'
import dealerHours from './objects/dealerHours'
import seoSettings from './objects/seoSettings'
import blockContent from './objects/blockContent'
import variant from './objects/variant'
import colorOption from './objects/colorOption'
import componentOption from './objects/componentOption'
import pricingRule from './objects/pricingRule'

// Import Product Page Section Types
import heroSection from './objects/heroSection'
import configuratorData from './objects/configuratorData'
import featureCarousel from './objects/featureCarousel'
import techSpecsSection from './objects/techSpecsSection'
import faqSection from './objects/faqSection'
import videoSection from './objects/videoSection'
import testimonialSection from './objects/testimonialSection'

// Export ALL schema types in a single array
export const schemaTypes = [
  // Documents
  dealer,
  vehicleModel,
  post,
  legalPage,
  author,
  category,
  productPage, // Add the new document type

  // Objects
  address,
  contact,
  dealerHours,
  seoSettings,
  blockContent,
  variant,
  colorOption,
  componentOption,
  pricingRule,

  // Product Page Sections
  heroSection,
  configuratorData,
  featureCarousel,
  techSpecsSection,
  faqSection,
  videoSection,
  testimonialSection,
]
