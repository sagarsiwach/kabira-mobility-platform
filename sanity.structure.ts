// sanity.structure.ts
import {StructureBuilder} from 'sanity/structure'
import {
  CogIcon, // Site Settings Root, Global Site Settings
  PinIcon, // Dealers
  CubeIcon, // Booking Vehicles
  DocumentIcon, // Generic Pages, Pages Root, Legal Pages
  ComposeIcon, // Blog Root, Blog Page Settings
  DocumentTextIcon, // Blog Posts
  TagIcon, // Blog Categories, FAQ Categories
  UserIcon, // Authors
  HelpCircleIcon, // FAQ Root, FAQ Items, FAQ Page Settings
  BillIcon, // Press Releases, Legal Pages (Reused)
  HomeIcon, // Home Page
  RocketIcon, // Test Ride Page, Product Pages (Custom)
  MenuIcon, // Navigation
} from '@sanity/icons'

// Helper function to create singleton document nodes
const singletonListItem = (
  S: StructureBuilder,
  typeName: string,
  title?: string,
  icon?: React.ComponentType<any>,
) =>
  S.listItem()
    .title(title || typeName)
    .id(typeName) // Use typeName as ID for stability
    .icon(icon)
    .child(
      S.document()
        .schemaType(typeName)
        .documentId(typeName)
        .title(title || typeName),
    )

export const structure = (S: StructureBuilder) =>
  S.list()
    .title('Kabira Mobility Content')
    .items([
      // --- Section 1: Site Settings ---
      S.listItem()
        .title('Site Settings')
        .icon(CogIcon)
        .child(
          S.list()
            .title('Configuration')
            .items([
              singletonListItem(S, 'siteSettings', 'Global Site Settings', CogIcon),
              singletonListItem(S, 'navigationSettings', 'Navigation', MenuIcon),
            ]),
        ),

      S.divider(), //-----------------------------------

      // --- Section 2: Pages ---
      S.listItem()
        .title('Site Pages')
        .icon(DocumentIcon)
        .child(
          S.list()
            .title('Manage Pages')
            .items([
              singletonListItem(S, 'homePage', 'Homepage', HomeIcon),
              singletonListItem(S, 'faqPage', 'FAQ Page Settings', HelpCircleIcon),
              singletonListItem(S, 'testRidePage', 'Test Ride Page Settings', RocketIcon),
              singletonListItem(S, 'blogPage', 'Blog Page Settings', ComposeIcon),
              S.documentTypeListItem('productPage')
                .title('Product Marketing Pages')
                .icon(RocketIcon),
              S.documentTypeListItem('genericPage')
                .title('Standard Pages (About, etc)')
                .icon(DocumentIcon),
            ]),
        ),

      S.divider(), //-----------------------------------

      // --- Section 3: Blog ---
      S.listItem()
        .title('Blog') // <--- Dedicated Blog Section Title
        .icon(ComposeIcon)
        .child(
          S.list()
            .title('Blog Management') // Title inside the Blog section
            .items([
              S.documentTypeListItem('post').title('Blog Posts').icon(DocumentTextIcon),
              S.documentTypeListItem('category').title('Blog Categories').icon(TagIcon),
              S.documentTypeListItem('author').title('Blog Authors').icon(UserIcon),
            ]),
        ),

      S.divider(), //-----------------------------------

      // --- Section 4: Press Releases ---
      S.documentTypeListItem('pressRelease').title('Press Releases').icon(BillIcon), // <--- Direct Top-Level Item

      S.divider(), //-----------------------------------

      // --- Section 5: FAQ ---
      S.listItem()
        .title('FAQ') // <--- Dedicated FAQ Section Title
        .icon(HelpCircleIcon)
        .child(
          S.list()
            .title('FAQ Management') // Title inside the FAQ section
            .items([
              S.listItem()
                .title('All FAQ Items')
                .icon(HelpCircleIcon)
                .child(
                  S.documentList()
                    .title('FAQs by Category')
                    .schemaType('faqItem')
                    .filter('_type == "faqItem"')
                    .defaultOrdering([
                      {field: 'category.title', direction: 'asc'},
                      {field: '_createdAt', direction: 'desc'},
                    ]),
                ),
              S.documentTypeListItem('faqCategory').title('FAQ Categories').icon(TagIcon),
            ]),
        ),

      S.divider(), //-----------------------------------

      // --- Section 6: Legal Pages ---
      S.documentTypeListItem('legalPage').title('Legal Pages').icon(BillIcon), // <--- Direct Top-Level Item

      S.divider(), //-----------------------------------

      // --- Section 7: Dealers ---
      S.documentTypeListItem('dealer').title('Dealers').icon(PinIcon), // <--- Direct Top-Level Item

      S.divider(), //-----------------------------------

      // --- Section 8: Booking Vehicles ---
      S.documentTypeListItem('bookingVehicle').title('Booking').icon(CubeIcon), // <--- Direct Top-Level Item
    ])
