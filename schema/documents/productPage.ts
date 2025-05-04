// schema/documents/productPage.ts
import {defineField, defineType} from 'sanity'
import {RocketIcon, HelpCircleIcon} from '@sanity/icons'

export default defineType({
  name: 'productPage',
  title: 'Product Page',
  type: 'document',
  icon: RocketIcon,
  groups: [
    {name: 'hero', title: 'Hero Section', default: true}, // Default group
    {name: 'configurator', title: 'Vehicle Configurator'},
    {name: 'features', title: 'Feature Carousels'},
    {name: 'specifications', title: 'Technical Specifications'},
    {name: 'faqs', title: 'FAQ Section'},
    {name: 'videos', title: 'Video Section'},
    {name: 'testimonials', title: 'Testimonials'},
    {name: 'seo', title: 'SEO & Metadata'},
  ],
  fields: [
    // Basic Product Information - Explicitly assign to default group 'hero'
    defineField({
      name: 'title',
      title: 'Product Title',
      type: 'string',
      group: 'hero', // Explicitly assign to default group
      description: 'The main name of the product (e.g., KM4000)',
    }),
    defineField({
      name: 'slug',
      title: 'Slug',
      type: 'slug',
      group: 'hero', // Explicitly assign to default group
      description: 'URL-friendly identifier for the product page',
      options: {
        source: 'title',
        maxLength: 96,
      },
    }),
    defineField({
      name: 'active',
      title: 'Active',
      type: 'boolean',
      group: 'hero', // Explicitly assign to default group
      description: 'Whether this product page should be publicly visible',
      initialValue: true,
    }),

    // Hero Section Content
    defineField({
      name: 'heroSection',
      title: 'Hero Section Content', // Renamed slightly for clarity
      group: 'hero', // Assign to 'hero' group
      type: 'heroSection',
      description: 'The main promotional section at the top of the page',
    }),

    // Configurator
    defineField({
      name: 'configurator',
      title: 'Vehicle Configurator',
      group: 'configurator', // Assign to 'configurator' group
      type: 'configuratorData',
      description: 'JSON data for the 3D configurator/turntable',
    }),

    // Feature Carousels (Multiple)
    defineField({
      name: 'featureCarousels',
      title: 'Feature Carousels',
      group: 'features', // Assign to 'features' group
      type: 'array',
      of: [{type: 'featureCarousel'}],
      description: 'Multiple feature carousels sections',
    }),

    // Technical Specifications
    defineField({
      name: 'techSpecs',
      title: 'Technical Specifications',
      group: 'specifications', // Assign to 'specifications' group
      type: 'techSpecsSection',
      description: 'Detailed specifications organized into groups.',
    }),

    // --- FAQ Section Fields ---
    defineField({
      name: 'faqSectionTitle',
      title: 'FAQ Section Title Override',
      type: 'string',
      group: 'faqs', // Assign to 'faqs' group
      description:
        'Optional: Title displayed above the FAQ list on this page (e.g., "KM4000 FAQs"). Defaults to "Frequently Asked Questions" if empty.',
    }),
    defineField({
      name: 'referencedFaqs',
      title: 'Select FAQs for this Page',
      type: 'array',
      group: 'faqs', // Assign to 'faqs' group
      description:
        'Choose relevant FAQs from the global library to display on this specific product page.',
      of: [
        {
          type: 'reference',
          to: [{type: 'faqItem'}],
        },
      ],
      validation: (Rule) => Rule.unique().error('Each FAQ can only be added once to this page.'),
    }),
    defineField({
      name: 'faqAllowMultipleOpen',
      title: 'Allow Multiple Open FAQs?',
      type: 'boolean',
      group: 'faqs', // Assign to 'faqs' group
      description: 'Allow users to expand multiple questions at once in the UI.',
      initialValue: false,
    }),
    defineField({
      name: 'faqInitialOpenIndex',
      title: 'Initially Open FAQ Index',
      type: 'number',
      group: 'faqs', // Assign to 'faqs' group
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
      group: 'videos', // Assign to 'videos' group
      type: 'videoSection',
      description: 'Product video showcase section',
    }),

    // Testimonial Section
    defineField({
      name: 'testimonialSection',
      title: 'Testimonial Section',
      group: 'testimonials', // Assign to 'testimonials' group
      type: 'testimonialSection',
      description: 'Customer reviews and testimonials section',
    }),

    // SEO & Metadata
    defineField({
      name: 'seo',
      title: 'SEO Settings',
      group: 'seo', // Assign to 'seo' group
      type: 'seoSettings',
      description: 'Search engine optimization settings for this product page',
    }),
  ],
  preview: {
    select: {
      title: 'title',
      active: 'active',
      media: 'heroSection.image',
    },
    prepare({title, active, media}) {
      return {
        title: title || 'Untitled Product Page',
        subtitle: active ? 'Status: Active' : 'Status: Inactive',
        media: media || RocketIcon,
      }
    },
  },
})
