// sanity.structure.ts
// (Previous version provided was correct based on the refactoring plan)
// Keep the last provided version of sanity.structure.ts
import {StructureBuilder} from 'sanity/structure'
import {
  CogIcon,
  PinIcon,
  RocketIcon, // Using Rocket for Vehicle/Product focus
  CubeIcon, // Use Cube for Vehicle Data Section Title
  DocumentIcon,
  ComposeIcon,
  DocumentTextIcon,
  TagIcon,
  UserIcon,
  HelpCircleIcon,
  BillIcon,
  HomeIcon,
  MenuIcon,
} from '@sanity/icons'
import React from 'react' // Ensure React is imported if using JSX in helper

// Helper function to create singleton document nodes
const singletonListItem = (
  S: StructureBuilder,
  typeName: string,
  title?: string,
  icon?: React.ComponentType<any>, // Use React.ComponentType for icons
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
    .title('Kabira Mobility CMS')
    .items([
      // --- Section 1: Site Globals ---
      S.listItem()
        .title('Site Globals')
        .icon(CogIcon)
        .child(
          S.list()
            .title('Configuration')
            .items([
              singletonListItem(S, 'siteSettings', 'Global Site Settings', CogIcon),
              singletonListItem(S, 'navigationSettings', 'Navigation Menus', MenuIcon),
            ]),
        ),
      S.divider(),

      // --- Section 2: Pages ---
      S.listItem()
        .title('Website Pages')
        .icon(DocumentIcon)
        .child(
          S.list()
            .title('Manage Pages')
            .items([
              singletonListItem(S, 'homePage', 'Homepage', HomeIcon),
              S.documentTypeListItem('productPage') // Product Marketing Pages
                .title('Product Pages')
                .icon(RocketIcon),
              S.divider(),
              singletonListItem(S, 'testRidePage', 'Test Ride Page', RocketIcon), // Group related pages
              singletonListItem(S, 'faqPage', 'FAQ Page', HelpCircleIcon),
              singletonListItem(S, 'blogPage', 'Blog Listing Page', ComposeIcon),
              S.divider(),
              S.documentTypeListItem('genericPage')
                .title('Standard Pages (About, etc)')
                .icon(DocumentIcon),
              S.documentTypeListItem('legalPage') // Moved Legal Pages here
                .title('Legal Pages')
                .icon(BillIcon),
            ]),
        ),
      S.divider(),

      // --- Section 3: Vehicle Data ---
      S.listItem()
        .title('Vehicles & Data') // Changed Title
        .icon(CubeIcon) // Cube represents the 'data' aspect
        .child(
          S.list()
            .title('Manage Vehicle Models')
            .items([
              S.documentTypeListItem('vehicleModel') // Use the merged vehicleModel
                .title('All Vehicle Models')
                .icon(RocketIcon), // Use RocketIcon for the vehicle itself
              S.listItem() // Optional Filtered List
                .title('Bookable Models')
                .icon(RocketIcon) // Consistent icon
                .child(
                  S.documentList()
                    .title('Bookable Models')
                    .filter('_type == "vehicleModel" && isBookable == true')
                    .defaultOrdering([{field: 'name', direction: 'asc'}]),
                ),
              // Add other relevant filters if needed (e.g., by category if you add one)
            ]),
        ),
      S.divider(),

      // --- Section 4: Blog ---
      S.listItem()
        .title('Blog Content')
        .icon(ComposeIcon)
        .child(
          S.list()
            .title('Blog Management')
            .items([
              S.documentTypeListItem('post').title('Blog Posts').icon(DocumentTextIcon),
              S.documentTypeListItem('category').title('Blog Categories').icon(TagIcon),
              S.documentTypeListItem('author').title('Blog Authors').icon(UserIcon),
            ]),
        ),
      S.divider(),

      // --- Section 5: FAQ Content ---
      S.listItem()
        .title('FAQ Content')
        .icon(HelpCircleIcon)
        .child(
          S.list()
            .title('FAQ Management')
            .items([
              S.documentTypeListItem('faqItem') // Direct link to items
                .title('All FAQ Items')
                .icon(HelpCircleIcon),
              S.documentTypeListItem('faqCategory').title('FAQ Categories').icon(TagIcon),
            ]),
        ),
      S.divider(),

      // --- Section 6: Other Content Types ---
      S.listItem()
        .title('Other Content')
        .icon(DocumentTextIcon) // Generic icon for the section
        .child(
          S.list()
            .title('Manage Other Content')
            .items([
              S.documentTypeListItem('pressRelease').title('Press Releases').icon(BillIcon),
              S.documentTypeListItem('dealer').title('Dealers').icon(PinIcon),
              // Add any other distinct document types here in the future
            ]),
        ),
    ])
