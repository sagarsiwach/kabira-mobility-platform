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
import productPage from './documents/productPage' // **** ADD THIS IMPORT ****

// --- Singletons ---
import blogPage from './singletons/blogPage'
import faqPage from './singletons/faqPage'
import homePage from './singletons/homePage'
import navigationSettings from './singletons/navigationSettings'
import siteSettings from './singletons/siteSettings'
import testRidePage from './singletons/testRidePage'

// --- Objects ---
// ... (list all your object imports here - ensure no duplicates)
import address from './objects/address'
import blockContent from './objects/blockContent'
import colorOption from './objects/colorOption'
import componentOption from './objects/componentOption'
import configuratorData from './objects/configuratorData'
import contact from './objects/contact'
import ctaBlock from './objects/ctaBlock'
import dealerHours from './objects/dealerHours'
import downloadItem from './objects/downloadItem'
import downloadList from './objects/downloadList'
import dropdownItem from './objects/dropdownItem'
import featureCarousel from './objects/featureCarousel'
import heroSection from './objects/heroSection'
import link from './objects/link'
import mobileMenuItem from './objects/mobileMenuItem'
import moreDropdownItem from './objects/moreDropdownItem'
import navMenuItem from './objects/navMenuItem'
import pricingRule from './objects/pricingRule'
import seoSettings from './objects/seoSettings'
import specColorSwatchDisplay from './objects/specColorSwatchDisplay'
import specKeyValue from './objects/specKeyValue'
import specSimpleListItem from './objects/specSimpleListItem'
import techSpecsSection from './objects/techSpecsSection'
import testimonialSection from './objects/testimonialSection'
import textWithImageBlock from './objects/textWithImageBlock'
import variant from './objects/variant'
import videoSection from './objects/videoSection'
import gallerySection from './objects/gallerySection'

export const schemaTypes = [
  // Documents
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
  productPage, // **** ADD THIS ENTRY ****

  // Singletons
  blogPage,
  faqPage,
  homePage,
  navigationSettings,
  siteSettings,
  testRidePage,

  // Objects
  address,
  blockContent,
  colorOption,
  componentOption,
  configuratorData,
  contact,
  ctaBlock,
  dealerHours,
  downloadItem,
  downloadList,
  dropdownItem,
  featureCarousel,
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
  gallerySection,
  techSpecsSection,
  testimonialSection,
  textWithImageBlock,
  variant,
  videoSection,
]
