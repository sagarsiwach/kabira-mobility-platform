// apps/cms/schemas/index.ts

// Import Document Types
import dealer from './documents/dealer'
import vehicleModel from './documents/vehicleModel'
import post from './documents/post'
import legalPage from './documents/legalPage'
import author from './documents/author'
import category from './documents/category'

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

// Export ALL schema types in a single array
export const schemaTypes = [
  // Documents
  dealer,
  vehicleModel,
  post,
  legalPage,
  author,
  category,

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
]