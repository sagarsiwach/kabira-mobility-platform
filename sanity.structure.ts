// sanity.structure.ts (CORRECTED HELPER FUNCTION)
import {StructureBuilder} from 'sanity/structure'
import {
  CogIcon, // Settings
  PinIcon, // Dealer
  RocketIcon, // Vehicle, Product Page
  DocumentIcon, // Generic Page
  ComposeIcon, // Blog
  DocumentTextIcon, // Post, Other Content
  TagIcon, // Category
  UserIcon, // Author
  HelpCircleIcon, // FAQ
  BillIcon, // Legal, Press Release
  HomeIcon, // Homepage
  MenuIcon, // Navigation
} from '@sanity/icons'
import React from 'react'

/**
 * Helper function to create singleton document list items
 * Ensures a consistent ID and prevents creation of multiple instances.
 */
const singletonListItem = (
  S: StructureBuilder,
  typeName: string,
  title?: string,
  icon?: React.ComponentType<any>,
) => {
  // --- FIX HERE: Use a valid JavaScript variable name ---
  const documentId = typeName // Use the type name as the document ID for singletons

  return S.listItem()
    .title(title || typeName)
    .id(typeName) // Use typeName as the unique ID for this list item
    .icon(icon || DocumentIcon) // Default icon if none provided
    .child(
      S.document()
        .schemaType(typeName)
        .documentId(documentId) // Explicitly set the document ID using the corrected variable
        .title(title || typeName),
    )
}

/**
 * Defines the main structure of the Sanity Studio's desk tool.
 */
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
              singletonListItem(S, 'navigationSettings', 'Navigation Setup', MenuIcon),
            ]),
        ),
      S.divider(),

      // --- Section 2: Website Pages ---
      S.listItem()
        .title('Website Pages')
        .icon(DocumentIcon)
        .child(
          S.list()
            .title('Manage Pages')
            .items([
              singletonListItem(S, 'homePage', 'Homepage', HomeIcon),
              S.documentTypeListItem('productPage').title('Product Pages').icon(RocketIcon),
              S.divider(),
              singletonListItem(S, 'testRidePage', 'Test Ride Page', RocketIcon),
              singletonListItem(S, 'faqPage', 'FAQ Page', HelpCircleIcon),
              singletonListItem(S, 'blogPage', 'Blog Listing Page', ComposeIcon),
              S.divider(),
              S.documentTypeListItem('genericPage').title('Standard Pages').icon(DocumentIcon),
              S.documentTypeListItem('legalPage').title('Legal Pages').icon(BillIcon),
            ]),
        ),
      S.divider(),

      // --- Section 3: Vehicle Data ---
      S.listItem()
        .title('Vehicles')
        .icon(RocketIcon)
        .child(S.documentTypeList('vehicle').title('Manage Vehicles')),
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
              S.documentTypeListItem('faqItem').title('All FAQ Items').icon(HelpCircleIcon),
              S.documentTypeListItem('faqCategory').title('FAQ Categories').icon(TagIcon),
            ]),
        ),
      S.divider(),

      // --- Section 6: Other Content Types ---
      S.listItem()
        .title('Other Content')
        .icon(DocumentTextIcon)
        .child(
          S.list()
            .title('Manage Other Content')
            .items([
              S.documentTypeListItem('pressRelease').title('Press Releases').icon(BillIcon),
              S.documentTypeListItem('dealer').title('Dealers').icon(PinIcon),
            ]),
        ),
    ])
