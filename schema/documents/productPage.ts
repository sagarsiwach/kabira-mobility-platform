// schema/documents/productPage.ts

import {defineField, defineType} from 'sanity'
import {RocketIcon} from '@sanity/icons'

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
    {name: 'faqs', title: 'FAQ Section'},
    {name: 'videos', title: 'Video Section'},
    {name: 'testimonials', title: 'Testimonials'},
    {name: 'seo', title: 'SEO & Metadata'},
  ],
  fields: [
    // Basic Product Information
    defineField({
      name: 'title',
      title: 'Product Title',
      type: 'string',
      description: 'The main name of the product (e.g., KM4000)',
      validation: (Rule) => Rule.required(),
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
      validation: (Rule) => Rule.required(),
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
      description: 'Multiple feature carousels that can be added to different sections of the page',
      validation: (Rule) => Rule.required().min(1),
    }),

    // Tech Specs
    defineField({
      name: 'techSpecs',
      title: 'Technical Specifications',
      group: 'specifications',
      type: 'techSpecsSection',
      description: 'Detailed specifications presented in a structured format',
    }),

    // FAQ Section
    defineField({
      name: 'faqSection',
      title: 'FAQ Section',
      group: 'faqs',
      type: 'faqSection',
      description: 'Frequently asked questions about the product',
    }),

    // Video Section
    defineField({
      name: 'videoSection',
      title: 'Video Section',
      group: 'videos',
      type: 'videoSection',
      description: 'Product video showcase with hover-to-play functionality',
    }),

    // Testimonial Section
    defineField({
      name: 'testimonialSection',
      title: 'Testimonial Section',
      group: 'testimonials',
      type: 'testimonialSection',
      description: 'Customer reviews and testimonials',
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
      media: 'heroSection.image',
    },
    prepare({title, active, media}) {
      return {
        title: title || 'Untitled Product',
        subtitle: active ? 'Active' : 'Inactive',
        media: media || RocketIcon,
      }
    },
  },
})
