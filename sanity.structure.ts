// sanity.structure.ts
import {StructureBuilder} from 'sanity/structure'
import {
  CogIcon,
  PinIcon,
  RocketIcon,
  ImagesIcon,
  DocumentTextIcon,
  TagIcon,
  UserIcon,
  BillIcon,
  MenuIcon,
} from '@sanity/icons' // Import relevant icons

export const structure = (S: StructureBuilder) =>
  S.list()
    .title('Kabira Mobility Content')
    .items([
      // --- Settings & Configuration ---
      S.listItem()
        .title('Site Settings')
        .icon(CogIcon)
        .child(
          S.list()
            .title('Settings')
            .items([
              S.listItem()
                .title('Navigation')
                .icon(MenuIcon)
                .id('navigationSettings')
                .child(
                  S.document()
                    .schemaType('navigationSettings')
                    .documentId('navigationSettings')
                    .title('Navigation Settings'),
                ),
              // Add other singletons/settings here later if needed
              // e.g., Global SEO, Social Links, etc.
            ]),
        ),

      S.divider(),

      // --- Core Business Data ---
      S.listItem()
        .title('Vehicles & Products')
        .icon(RocketIcon)
        .child(
          S.list()
            .title('Vehicles & Products')
            .items([
              S.documentTypeListItem('vehicleModel').title('Vehicle Models (Core Data)'),
              S.documentTypeListItem('productPage').title('Product Landing Pages'),
            ]),
        ),
      S.documentTypeListItem('dealer').title('Dealers').icon(PinIcon),

      S.divider(),

      // --- Website Content ---
      S.listItem()
        .title('Website Content')
        .icon(ImagesIcon)
        .child(
          S.list()
            .title('Content')
            .items([
              S.documentTypeListItem('post').title('Blog Posts').icon(DocumentTextIcon),
              S.documentTypeListItem('category').title('Blog Categories').icon(TagIcon),
              S.documentTypeListItem('author').title('Authors').icon(UserIcon),
              S.divider(),
              S.documentTypeListItem('legalPage').title('Legal Pages').icon(BillIcon),
            ]),
        ),
    ])
