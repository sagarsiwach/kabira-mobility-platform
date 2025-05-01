// apps/cms/src/collections/Bookings.ts
import type { CollectionConfig } from 'payload/types'

export const Bookings: CollectionConfig = {
  slug: 'bookings',
  admin: {
    useAsTitle: 'bookingId',
    description: 'Customer vehicle booking records.',
    defaultColumns: [
      'bookingId',
      'customerInfo.fullName',
      'vehicleConfig.vehicleSummary',
      'bookingStatus',
      'paymentStatus',
      'createdAt',
    ], // Adjusted column name
    // readOnly: true, // Maybe too restrictive
  },
  access: {
    read: ({ req: { user } }) => user?.roles?.includes('admin'),
    create: ({ req: { user } }) => user?.roles?.includes('admin'), // API creates these
    update: ({ req: { user } }) => user?.roles?.includes('admin'),
    delete: ({ req: { user } }) => user?.roles?.includes('admin'),
  },
  fields: [
    {
      name: 'bookingId',
      type: 'text',
      label: 'Booking ID',
      required: true,
      unique: true,
      index: true,
      admin: { readOnly: true },
    },
    {
      name: 'razorpayOrderId',
      type: 'text',
      label: 'Razorpay Order ID',
      index: true,
      admin: { readOnly: true },
    },
    {
      name: 'razorpayPaymentId',
      type: 'text',
      label: 'Razorpay Payment ID',
      index: true,
      admin: { readOnly: true },
    },
    {
      name: 'customerInfo',
      type: 'group',
      label: 'Customer Information',
      fields: [
        { name: 'fullName', type: 'text', required: true, label: 'Full Name' },
        { name: 'email', type: 'email', required: true, label: 'Email' },
        { name: 'phone', type: 'text', required: true, label: 'Phone' },
      ],
      admin: { readOnly: true },
    },
    {
      name: 'deliveryLocation',
      type: 'group',
      label: 'Delivery Location',
      fields: [
        { name: 'formatted', type: 'text', label: 'Selected Location String' },
        { name: 'pincode', type: 'text', label: 'Pincode' },
        { name: 'city', type: 'text', label: 'City' },
        { name: 'state', type: 'text', label: 'State' },
      ],
      admin: { readOnly: true },
    },
    {
      name: 'vehicleConfig',
      type: 'group',
      label: 'Vehicle Configuration',
      fields: [
        { name: 'vehicle', type: 'relationship', relationTo: 'vehicles', required: true },
        { name: 'variant', type: 'relationship', relationTo: 'variants', required: true },
        { name: 'color', type: 'relationship', relationTo: 'colors', required: true },
        { name: 'components', type: 'relationship', relationTo: 'components', hasMany: true },
        { name: 'vehicleSummary', type: 'text', label: 'Vehicle Name Summary' },
      ],
      admin: { readOnly: true },
    },
    {
      name: 'totalAmount',
      type: 'number',
      label: 'Total Amount Paid (Paise)',
      required: true,
      admin: { readOnly: true },
    },
    {
      name: 'bookingStatus',
      type: 'select',
      required: true,
      options: [
        { label: 'Pending Payment', value: 'pending_payment' },
        { label: 'Confirmed', value: 'confirmed' },
        { label: 'Processing', value: 'processing' },
        { label: 'Cancelled', value: 'cancelled' },
        { label: 'Failed', value: 'failed' },
      ],
      defaultValue: 'pending_payment',
      admin: { position: 'sidebar' },
      index: true,
    },
    {
      name: 'paymentStatus',
      type: 'select',
      required: true,
      options: [
        { label: 'Pending', value: 'pending' },
        { label: 'Success', value: 'success' },
        { label: 'Failed', value: 'failed' },
      ],
      defaultValue: 'pending',
      admin: { position: 'sidebar' },
      index: true,
    },
    { name: 'notes', type: 'textarea', label: 'Admin Notes', admin: { position: 'sidebar' } },
  ],
  timestamps: true,
}

export default Bookings
