// apps/cms/src/collections/Colors.ts
import type { CollectionConfig, FieldHook } from 'payload/types';
import React from 'react'; // <--- ADD THIS IMPORT

// Utility to attempt parsing JSON color values
const parseColorValue = (value: unknown): { colorStart?: string; colorEnd?: string } | null => {
  // ... (keep the function as is) ...
   if (typeof value !== 'string') return null;
  try {
    const parsed = JSON.parse(value);
    if (typeof parsed === 'object' && parsed !== null) {
      return {
        colorStart: typeof parsed.colorStart === 'string' ? parsed.colorStart : undefined,
        colorEnd: typeof parsed.colorEnd === 'string' ? parsed.colorEnd : undefined,
      };
    }
  } catch (e) { }
  return null;
};

// Define types for the component props for clarity
interface ColorDisplayFieldProps {
    path: string;
    value: unknown; // Value of this UI field itself (likely undefined)
    data: Record<string, unknown>; // Sibling data for the current document
}

interface ColorDisplayCellProps {
    cellData: unknown; // Value of this cell (likely undefined for UI field)
    rowData: Record<string, unknown>; // Data for the entire row
}


export const Colors: CollectionConfig = {
  slug: 'colors',
  admin: {
    useAsTitle: 'name',
    defaultColumns: ['name', 'model', 'colorDisplay', 'is_default'],
    description: 'Define available colors for each vehicle model.',
  },
  access: {
    read: () => true,
    create: ({ req: { user } }) => user?.roles?.includes('admin'),
    update: ({ req: { user } }) => user?.roles?.includes('admin'),
    delete: ({ req: { user } }) => user?.roles?.includes('admin'),
  },
  fields: [
    {
      name: 'model',
      label: 'Vehicle Model',
      type: 'relationship',
      relationTo: 'vehicles',
      required: true,
      index: true,
    },
    {
      name: 'name',
      label: 'Color Name',
      type: 'text',
      required: true,
    },
    {
      name: 'color_value',
      label: 'Color Value (JSON or Hex)',
      type: 'textarea',
      required: true,
      admin: {
        description: 'Enter hex code (e.g., #FF0000) or JSON like {"colorStart":"#HEX", "colorEnd":"#HEX"} for gradients.',
      },
    },
    // Virtual UI field for display
    {
        name: 'colorDisplay',
        type: 'ui',
        admin: {
            components: {
                // --- Field Component ---
                Field: ({ path, value, data }: ColorDisplayFieldProps) => { // Added types
                    const rawValue = data?.color_value; // Access sibling data
                    const parsed = parseColorValue(rawValue);
                    let backgroundStyle = '#ccc'; // Default gray

                    if (parsed && parsed.colorStart) {
                       if (parsed.colorEnd) {
                           backgroundStyle = `linear-gradient(to right, ${parsed.colorStart}, ${parsed.colorEnd})`;
                       } else {
                           backgroundStyle = parsed.colorStart;
                       }
                    } else if (typeof rawValue === 'string' && rawValue.startsWith('#')) {
                        backgroundStyle = rawValue;
                    }

                    // Ensure proper JSX syntax with inline styles
                    return (
                         React.createElement('div', {
                           style: {
                             width: '50px',
                             height: '25px',
                             borderRadius: '4px',
                             border: '1px solid #ccc',
                             background: backgroundStyle
                           }
                         })
                    );
                 },
                 // --- Cell Component ---
                Cell: ({ cellData, rowData }: ColorDisplayCellProps) => { // Added types
                     const rawValue = rowData?.color_value; // Access row data
                     const parsed = parseColorValue(rawValue);
                     let backgroundStyle = '#ccc';

                     if (parsed && parsed.colorStart) {
                        if (parsed.colorEnd) {
                            backgroundStyle = `linear-gradient(to right, ${parsed.colorStart}, ${parsed.colorEnd})`;
                        } else {
                            backgroundStyle = parsed.colorStart;
                        }
                     } else if (typeof rawValue === 'string' && rawValue.startsWith('#')) {
                         backgroundStyle = rawValue;
                     }

                     // Ensure proper JSX syntax with inline styles
                     return (
                         React.createElement('div', {
                            style: {
                                width: '40px',
                                height: '20px',
                                borderRadius: '4px',
                                border: '1px solid #ccc',
                                background: backgroundStyle
                            }
                         })
                     );
                }
            }
        }
    },
    {
      name: 'is_default',
      label: 'Default Color for Model?',
      type: 'checkbox',
      defaultValue: false,
    },
  ],
  timestamps: true,
};

export default Colors;