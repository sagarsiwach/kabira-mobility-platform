// schema/index.ts

// --- Documents ---
import author from './documents/author'
import bookingVehicle from './documents/bookingVehicle'
import category from './documents/category'
import dealer from './documents/dealer'
import faqCategory from './documents/faqCategory'
import faqItem from './documents/faqItem'
import genericPage from './documents/genericPage'
import legalPage from './documents/legalPage'
import post from './documents/post'
import pressRelease from './documents/pressRelease'
import productPage from './documents/productPage'
// No need for vehicleModel anymore since we're using bookingVehicle instead

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

// Booking Vehicle Specific Objects
import colorOption from './objects/colorOption'
import componentOption from './objects/componentOption'
import pricingRule from './objects/pricingRule'
import variant from './objects/variant'

// Page Builder & Content Blocks
import dealerHours from './objects/dealerHours'
import downloadItem from './objects/downloadItem'
import downloadList from './objects/downloadList'
import faqBlock from './objects/faqBlock'
import productFaqs from './objects/productFaqs'
import featureCarousel from './objects/featureCarousel'
import gallerySection from './objects/gallerySection'
import heroSection from './objects/heroSection'
import specColorSwatchDisplay from './objects/specColorSwatchDisplay'
import specKeyValue from './objects/specKeyValue'
import specSimpleListItem from './objects/specSimpleListItem'
import techSpecsSection from './objects/techSpecsSection'
import testimonialSection from './objects/testimonialSection'
import textWithImageBlock from './objects/textWithImageBlock'
import turntableSection from './objects/turntableSection' // Added new turntable section
import videoSection from './objects/videoSection'

// Navigation Specific Objects
import dropdownItem from './objects/dropdownItem'
import mobileMenuItem from './objects/mobileMenuItem'
import moreDropdownItem from './objects/moreDropdownItem'
import navMenuItem from './objects/navMenuItem'

export const schemaTypes = [
  // === Documents ===
  author,
  bookingVehicle,
  category,
  dealer,
  faqCategory,
  faqItem,
  genericPage,
  legalPage,
  post,
  pressRelease,
  productPage,
  // No vehicleModel in this list anymore

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
  contact,
  ctaBlock,
  dealerHours,
  downloadItem,
  downloadList,
  dropdownItem,
  faqBlock,
  productFaqs,
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
  turntableSection, // Added new turntable section
  variant,
  videoSection,
]
