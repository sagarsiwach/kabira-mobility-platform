// schema/documents/bookingVehicle.ts
import {defineType, defineField} from 'sanity'
import {CogIcon} from '@sanity/icons'

export default defineType({
  name: 'bookingVehicle',
  title: 'Booking Vehicle',
  type: 'document',
  icon: CogIcon,
  groups: [
    {name: 'details', title: 'Vehicle Details', default: true},
    {name: 'pricing', title: 'Pricing & Availability'},
    {name: 'variants', title: 'Variants'},
    {name: 'specs', title: 'Specifications'},
    {name: 'seo', title: 'SEO'},
  ],
  fields: [
    // Basic Details Group
    defineField({
      name: 'name',
      title: 'Vehicle Name',
      type: 'string',
      group: 'details',
      description: 'The name of the vehicle as it should appear in booking forms and lists.',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'slug',
      title: 'Slug',
      type: 'slug',
      group: 'details',
      description: 'URL identifier for this vehicle in the booking system.',
      options: {
        source: 'name',
        maxLength: 96,
        isUnique: async (value, context) => {
          if (!value) return true

          const client = context.getClient({apiVersion: '2023-01-01'})
          const id = context.document?._id.replace(/^drafts\./, '')
          const currentSlug = context.document?.slug?.current

          if (!id && !currentSlug) return true

          const params = {draft: `drafts.${id}`, published: id, slug: value}
          const query = `!defined(*[_type == 'bookingVehicle' && !(_id in [$draft, $published]) && slug.current == $slug][0]._id)`

          try {
            return await client.fetch(query, params)
          } catch (error) {
            console.error('Uniqueness check failed:', error)
            return false
          }
        },
      },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'image',
      title: 'Vehicle Image',
      type: 'image',
      group: 'details',
      description: 'The main image shown in booking listings and forms.',
      options: {
        hotspot: true,
      },
      fields: [
        defineField({
          name: 'alt',
          type: 'string',
          title: 'Alternative Text',
          description: 'Important for accessibility and SEO.',
          validation: (Rule) => Rule.required(),
        }),
      ],
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'shortDescription',
      title: 'Short Description',
      type: 'text',
      rows: 3,
      group: 'details',
      description: 'Brief description shown in booking listings (max 150 chars).',
      validation: (Rule) => Rule.max(150),
    }),
    defineField({
      name: 'vehicleType',
      title: 'Vehicle Type',
      type: 'string',
      group: 'details',
      options: {
        list: [
          {title: 'Motorcycle', value: 'motorcycle'},
          {title: 'Scooter', value: 'scooter'},
          {title: 'Other', value: 'other'},
        ],
        layout: 'radio',
      },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'isBookable',
      title: 'Is Bookable',
      type: 'boolean',
      group: 'details',
      description: 'Whether this vehicle is currently available for booking.',
      initialValue: true,
    }),
    defineField({
      name: 'productPageLink',
      title: 'Product Page Reference',
      type: 'reference',
      to: [{type: 'productPage'}],
      group: 'details',
      description: 'Optional: Link to the marketing product page for this vehicle.',
    }),

    // Pricing & Availability Group
    defineField({
      name: 'basePrice',
      title: 'Base Price (₹)',
      type: 'number',
      group: 'pricing',
      description: 'The starting price for this vehicle (ex-showroom).',
      validation: (Rule) => Rule.required().min(0),
    }),
    defineField({
      name: 'bookingAmount',
      title: 'Booking Amount (₹)',
      type: 'number',
      group: 'pricing',
      description: 'The amount required to place a booking.',
      validation: (Rule) => Rule.required().min(0),
    }),
    defineField({
      name: 'estimatedDeliveryTime',
      title: 'Estimated Delivery Time',
      type: 'string',
      group: 'pricing',
      description: 'E.g., "2-3 weeks", "45-60 days"',
    }),
    defineField({
      name: 'availableInStates',
      title: 'Available In States',
      type: 'array',
      of: [{type: 'string'}],
      group: 'pricing',
      description: 'Select all states where this vehicle is available for booking.',
      options: {
        list: [
          {title: 'All India', value: 'all_india'},
          // You can add individual states here or import from constants
          {title: 'Maharashtra', value: 'maharashtra'},
          {title: 'Karnataka', value: 'karnataka'},
          {title: 'Kerala', value: 'kerala'},
          {title: 'Tamil Nadu', value: 'tamil_nadu'},
          {title: 'Andhra Pradesh', value: 'andhra_pradesh'},
          {title: 'Telangana', value: 'telangana'},
          {title: 'Gujarat', value: 'gujarat'},
          {title: 'Delhi', value: 'delhi'},
          // More states...
        ],
      },
      validation: (Rule) => Rule.required().min(1),
    }),
    defineField({
      name: 'taxPercentage',
      title: 'Tax Percentage (%)',
      type: 'number',
      group: 'pricing',
      description: 'The tax percentage applied to the base price.',
      initialValue: 18, // Default GST
      validation: (Rule) => Rule.min(0).max(100),
    }),

    // Variants Group
    defineField({
      name: 'bookingVariants',
      title: 'Booking Variants',
      type: 'array',
      group: 'variants',
      description: 'Different versions available for booking (if applicable).',
      of: [
        {
          type: 'object',
          name: 'bookingVariant',
          fields: [
            defineField({
              name: 'name',
              title: 'Variant Name',
              type: 'string',
              validation: (Rule) => Rule.required(),
            }),
            defineField({
              name: 'priceAdjustment',
              title: 'Price Adjustment (₹)',
              type: 'number',
              description: 'Amount added to base price for this variant.',
              initialValue: 0,
            }),
            defineField({
              name: 'isDefault',
              title: 'Is Default Variant',
              type: 'boolean',
              description: 'Mark ONE variant as default.',
              initialValue: false,
            }),
            defineField({
              name: 'specifications',
              title: 'Variant Specific Specifications',
              type: 'array',
              of: [
                {
                  type: 'object',
                  name: 'variantSpec',
                  fields: [
                    defineField({
                      name: 'label',
                      title: 'Label',
                      type: 'string',
                      validation: (Rule) => Rule.required(),
                    }),
                    defineField({
                      name: 'value',
                      title: 'Value',
                      type: 'string',
                      validation: (Rule) => Rule.required(),
                    }),
                  ],
                },
              ],
            }),
          ],
          preview: {
            select: {
              title: 'name',
              priceAdj: 'priceAdjustment',
              isDefault: 'isDefault',
            },
            prepare({title, priceAdj = 0, isDefault}) {
              return {
                title: `${title || 'Unnamed Variant'}${isDefault ? ' (Default)' : ''}`,
                subtitle:
                  priceAdj > 0
                    ? `+₹${priceAdj}`
                    : priceAdj < 0
                      ? `-₹${Math.abs(priceAdj)}`
                      : 'No price adjustment',
              }
            },
          },
        },
      ],
      validation: (Rule) =>
        Rule.custom((variants) => {
          if (!variants || variants.length === 0) return true
          const defaultVariants = variants.filter((v) => v.isDefault)
          if (variants.length > 0 && defaultVariants.length !== 1) {
            return 'If variants are defined, exactly one must be marked as default.'
          }
          return true
        }),
    }),

    // Specifications Group
    defineField({
      name: 'keySpecifications',
      title: 'Key Specifications',
      type: 'array',
      group: 'specs',
      description: 'Important specifications to show in the booking interface.',
      of: [
        {
          type: 'object',
          name: 'keySpec',
          fields: [
            defineField({
              name: 'label',
              title: 'Label',
              type: 'string',
              description: 'E.g., "Range", "Top Speed", "Battery Capacity"',
              validation: (Rule) => Rule.required(),
            }),
            defineField({
              name: 'value',
              title: 'Value',
              type: 'string',
              description: 'E.g., "180 km", "90 kmph", "4.5 kWh"',
              validation: (Rule) => Rule.required(),
            }),
            defineField({
              name: 'icon',
              title: 'Specification Icon (Optional)',
              type: 'string',
              description: 'Icon identifier for this specification (if supported by the frontend).',
            }),
          ],
          preview: {
            select: {
              label: 'label',
              value: 'value',
            },
            prepare({label, value}) {
              return {
                title: label || 'Unnamed Spec',
                subtitle: value,
              }
            },
          },
        },
      ],
    }),
    defineField({
      name: 'bookingEnabled',
      title: 'Booking Enabled',
      type: 'boolean',
      group: 'specs',
      description: 'Whether users can currently place bookings for this vehicle on the website.',
      initialValue: true,
    }),
    defineField({
      name: 'testRideEnabled',
      title: 'Test Ride Enabled',
      type: 'boolean',
      group: 'specs',
      description: 'Whether users can schedule a test ride for this vehicle.',
      initialValue: true,
    }),

    // SEO Group
    defineField({
      name: 'seo',
      title: 'SEO Settings',
      type: 'seoSettings',
      group: 'seo',
      description: 'Configure SEO for the booking page of this vehicle (if applicable).',
    }),
  ],
  preview: {
    select: {
      title: 'name',
      vehicleType: 'vehicleType',
      media: 'image',
      isBookable: 'isBookable',
    },
    prepare({title, vehicleType, media, isBookable}) {
      const type = vehicleType
        ? vehicleType.charAt(0).toUpperCase() + vehicleType.slice(1)
        : 'Vehicle'
      return {
        title: title || 'Unnamed Vehicle',
        subtitle: `${type}${isBookable === false ? ' (Not Bookable)' : ' (Bookable)'}`,
        media,
      }
    },
  },
})
