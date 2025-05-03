// sanity.structure.ts
import {StructureBuilder} from 'sanity/structure'
import {
  CogIcon,
  PinIcon,
  CubeIcon,
  RocketIcon,
  BillIcon,
  ComposeIcon,
  DocumentTextIcon,
  TagIcon, // Re-used for FAQ Category
  UserIcon,
  HelpCircleIcon, // Re-used for FAQ Items list
} from '@sanity/icons' // Import necessary icons

export const structure = (S: StructureBuilder) =>
  S.list()
    .title('Kabira Mobility Content')
    .items([
      // --- 1. Site Settings ---
      S.listItem()
        .title('Site Settings')
        .icon(CogIcon)
        .child(
          S.list()
            .title('Settings')
            .items([
              S.listItem()
                .title('Navigation')
                .id('navigationSettings')
                .child(
                  S.document()
                    .schemaType('navigationSettings')
                    .documentId('navigationSettings')
                    .title('Navigation Settings'),
                ),
            ]),
        ),

      S.divider(),

      // --- 2. Dealers ---
      S.documentTypeListItem('dealer').title('Dealers').icon(PinIcon),

      S.divider(),

      // --- 3. Bookings (Vehicle Models) ---
      S.documentTypeListItem('vehicleModel').title('Bookings (Vehicle Models)').icon(CubeIcon),

      S.divider(),

      // --- 4. Product Pages ---
      S.documentTypeListItem('productPage').title('Product Pages').icon(RocketIcon),

      S.divider(),

      // --- 5. Legal Pages ---
      S.documentTypeListItem('legalPage').title('Legal Pages').icon(BillIcon),

      S.divider(),

      // --- 6. Blog ---
      S.listItem()
        .title('Blog')
        .icon(ComposeIcon)
        .child(
          S.list()
            .title('Blog Content')
            .items([
              S.documentTypeListItem('post').title('Posts').icon(DocumentTextIcon),
              S.documentTypeListItem('category').title('Categories').icon(TagIcon), // Blog Categories
              S.documentTypeListItem('author').title('Authors').icon(UserIcon),
            ]),
        ),

      S.divider(),

      // --- 7. FAQ (Folder Structure) ---
      S.listItem()
        .title('FAQ') // Main folder title
        .icon(HelpCircleIcon) // Icon for the FAQ section itself
        .child(
          S.list()
            .title('FAQ Management') // Title inside the folder
            .items([
              // Link to manage FAQ Items, sorted by category
              S.listItem()
                .title('All FAQs')
                .icon(HelpCircleIcon) // Icon for the list of FAQs
                .child(
                  S.documentList()
                    .title('FAQs by Category')
                    .schemaType('faqItem')
                    .filter('_type == "faqItem"')
                    // Use reference field for sorting if you updated faqItem schema
                    .defaultOrdering([
                      {field: 'category.title', direction: 'asc'},
                      {field: '_createdAt', direction: 'desc'},
                    ]),
                  // If still using string category, use: .defaultOrdering([{field: 'category', direction: 'asc'}])
                ),
              // Link to manage FAQ Categories
              S.documentTypeListItem('faqCategory').title('FAQ Categories').icon(TagIcon), // Use TagIcon for categories
            ]),
        ),
    ])
