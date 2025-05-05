// schema/index.ts

// --- Documents ---
import author from './documents/author'
import category from './documents/category'
import dealer from './documents/dealer'
import faqCategory from './documents/faqCategory'
import faqItem from './documents/faqItem'
import genericPage from './documents/genericPage'
import legalPage from './documents/legalPage'
import post from './documents/post' // Use updated post schema
import pressRelease from './documents/pressRelease'
import productPage from './documents/productPage' // Use updated productPage schema
import vehicleModel from './documents/vehicleModel' // Use updated vehicleModel schema

// --- Singletons ---
import blogPage from './singletons/blogPage'
import faqPage from './singletons/faqPage'
import homePage from './singletons/homePage'
import navigationSettings from './singletons/navigationSettings'
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

// Vehicle Specific Objects
import colorOption from './objects/colorOption' // Use updated colorOption schema
import componentOption from './objects/componentOption'
import configuratorData from './objects/configuratorData' // For overrides
import configuratorSetup from './objects/configuratorSetup' // Use updated configuratorSetup schema
import pricingRule from './objects/pricingRule'
import variant from './objects/variant' // Use updated variant schema

// Page Builder & Content Blocks
import dealerHours from './objects/dealerHours' // Used in Dealer schema
import downloadItem from './objects/downloadItem'
import downloadList from './objects/downloadList'
import faqBlock from './objects/faqBlock' // Generic FAQ reference block
import productFaqs from './objects/productFaqs' // *** Ensure this file exists at this path ***
import featureCarousel from './objects/featureCarousel'
import gallerySection from './objects/gallerySection'
import heroSection from './objects/heroSection'
import specColorSwatchDisplay from './objects/specColorSwatchDisplay'
import specKeyValue from './objects/specKeyValue'
import specSimpleListItem from './objects/specSimpleListItem'
import techSpecsSection from './objects/techSpecsSection'
import testimonialSection from './objects/testimonialSection'
import textWithImageBlock from './objects/textWithImageBlock'
import videoSection from './objects/videoSection'

// Navigation Specific Objects
import dropdownItem from './objects/dropdownItem'
import mobileMenuItem from './objects/mobileMenuItem'
import moreDropdownItem from './objects/moreDropdownItem'
import navMenuItem from './objects/navMenuItem'

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
  productPage,
  vehicleModel,

  // === Singletons ===
  blogPage,
  faqPage,
  homePage,
  navigationSettings,
  siteSettings,
  testRidePage,

  // === Objects ===
  address,
  blockContent,
  colorOption,
  componentOption,
  configuratorData,
  configuratorSetup,
  contact,
  ctaBlock,
  dealerHours,
  downloadItem,
  downloadList,
  dropdownItem,
  faqBlock,
  productFaqs, // Include productFaqs block
  featureCarousel,
  gallerySection,
  heroSection,
  link,
  mobileMenuItem,
  moreDropdownItem,
  navMenuItem,
  pricingRule,
  seoSettings,
  specColorSwatchDisplay,
  specKeyValue,
  specSimpleListItem,
  techSpecsSection,
  testimonialSection,
  textWithImageBlock,
  variant,
  videoSection,
]
