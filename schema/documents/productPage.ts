// schema/documents/productPage.ts
import {defineField, defineType} from 'sanity'
import {RocketIcon, HelpCircleIcon} from '@sanity/icons' // Ensure HelpCircleIcon is imported

export default defineType({
  name: 'productPage',
  title: 'Product Page',
  type: 'document',
  icon: RocketIcon,
  groups: [
    {name: 'hero', title: 'Hero Section', default: true},
    {name: 'configurator', title: 'Vehicle Configurator'},
    {name: 'features', title: 'Feature Carousels'},
    {name: 'specifications', title: 'Technical Specifications'},
    {name: 'faqs', title: 'FAQ Section'}, // Group for FAQ related fields
    {name: 'videos', title: 'Video Section'},
    {name: 'testimonials', title: 'Testimonials'},
    {name: 'seo', title: 'SEO & Metadata'},
    // Add other groups as needed, e.g., {name: 'contentSections', title: 'Other Content'}
  ],
  fields: [
    // Basic Product Information
    defineField({
      name: 'title',
      title: 'Product Title',
      type: 'string',
      description: 'The main name of the product (e.g., KM4000)',
      // Keep optional as per original
    }),
    defineField({
      name: 'slug',
      title: 'Slug',
      type: 'slug',
      description: 'URL-friendly identifier for the product page',
      options: {
        source: 'title',
        maxLength: 96,
      },
      // Keep optional as per original
    }),
    defineField({
      name: 'active',
      title: 'Active',
      type: 'boolean',
      description: 'Whether this product page should be publicly visible',
      initialValue: true,
    }),

    // Hero Section
    defineField({
      name: 'heroSection',
      title: 'Hero Section',
      group: 'hero',
      type: 'heroSection',
      description: 'The main promotional section at the top of the page',
    }),

    // Configurator
    defineField({
      name: 'configurator',
      title: 'Vehicle Configurator',
      group: 'configurator',
      type: 'configuratorData',
      description: 'JSON data for the 3D configurator/turntable',
    }),

    // Feature Carousels (Multiple)
    defineField({
      name: 'featureCarousels',
      title: 'Feature Carousels',
      group: 'features',
      type: 'array',
      of: [{type: 'featureCarousel'}],
      description: 'Multiple feature carousels sections',
    }),

    // Technical Specifications (Using the updated object)
    defineField({
      name: 'techSpecs',
      title: 'Technical Specifications',
      group: 'specifications', // Assign to the 'specifications' group
      type: 'techSpecsSection', // Use the updated object type
      description: 'Detailed specifications organized into groups.',
    }),

    // --- FAQ Section Fields (Using Global FAQs) ---
    defineField({
      name: 'faqSectionTitle',
      title: 'FAQ Section Title Override',
      type: 'string',
      group: 'faqs', // Assign to the 'faqs' group
      description:
        'Optional: Title displayed above the FAQ list on this page (e.g., "KM4000 FAQs"). Defaults to "Frequently Asked Questions" if empty.',
    }),
    defineField({
      name: 'referencedFaqs',
      title: 'Select FAQs for this Page',
      type: 'array',
      group: 'faqs', // Assign to the 'faqs' group
      description:
        'Choose relevant FAQs from the global library to display on this specific product page.',
      of: [
        {
          type: 'reference',
          to: [{type: 'faqItem'}], // Reference the global FAQ document type
          options: {
            // You can add filters here later if needed, e.g., based on tags
            // filter: '_type == "faqItem" && "battery" in tags'
          },
        },
      ],
      validation: (Rule) => Rule.unique().error('Each FAQ can only be added once to this page.'),
    }),
    defineField({
      name: 'faqAllowMultipleOpen',
      title: 'Allow Multiple Open FAQs?',
      type: 'boolean',
      group: 'faqs', // Assign to the 'faqs' group
      description: 'Allow users to expand multiple questions at once in the UI.',
      initialValue: false,
    }),
    defineField({
      name: 'faqInitialOpenIndex',
      title: 'Initially Open FAQ Index',
      type: 'number',
      group: 'faqs', // Assign to the 'faqs' group
      description:
        'Index (0=first selected, 1=second selected, etc.) of the FAQ to show open by default. Use -1 or leave empty for none.',
      initialValue: -1,
      validation: (Rule) => Rule.integer(),
    }),
    // --- End FAQ Section Fields ---

    // Video Section
    defineField({
      name: 'videoSection',
      title: 'Video Section',
      group: 'videos',
      type: 'videoSection',
      description: 'Product video showcase section',
    }),

    // Testimonial Section
    defineField({
      name: 'testimonialSection',
      title: 'Testimonial Section',
      group: 'testimonials',
      type: 'testimonialSection',
      description: 'Customer reviews and testimonials section',
    }),

    // SEO & Metadata
    defineField({
      name: 'seo',
      title: 'SEO Settings',
      group: 'seo',
      type: 'seoSettings',
      description: 'Search engine optimization settings for this product page',
    }),
  ],
  preview: {
    select: {
      title: 'title',
      active: 'active',
      media: 'heroSection.image', // Use hero image for preview
    },
    prepare({title, active, media}) {
      return {
        title: title || 'Untitled Product Page',
        subtitle: active ? 'Status: Active' : 'Status: Inactive',
        media: media || RocketIcon, // Fallback to icon if no hero image
      }
    },
  },
})
