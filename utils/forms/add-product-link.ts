import z from 'zod';

const FIELD_REQUIRED_STR = 'This field is required';

export const PRIORITY_OPTIONS = ['High', 'Medium', 'Low'] as const;

export const addProductLinkSchema = z.object({
    productLink: z
      .string({
        invalid_type_error: 'Name must be a string',
        required_error: FIELD_REQUIRED_STR,
      })
      .min(3, 'Minimum 3 characters')
      .trim(),
  
});

export type AddProductLinkSchema = z.infer<typeof addProductLinkSchema>;

export const addProductInformationSchema = z.object({
    productName: z
      .string({
        invalid_type_error: 'Name must be a string',
        required_error: FIELD_REQUIRED_STR,
      })
      .min(3, 'Minimum 3 characters')
      .max(30, 'Maximum 30 characters')
      .trim(),
    productLink: z
      .string({
        invalid_type_error: 'Product link must be a string',
        required_error: FIELD_REQUIRED_STR,
      })
      .min(3, 'Minimum 3 characters'),
    shoppingPlatform: z
      .string({
        invalid_type_error: 'Shopping platform must be a string',
        required_error: FIELD_REQUIRED_STR,
      })
      .min(3, 'Minimum 3 characters')
      .max(20, 'Maximum 20 characters')
      .trim(),
    price: z
      .number({
        invalid_type_error: 'Name must be a number',
        required_error: FIELD_REQUIRED_STR,
      })
      .min(3, 'Minimum 3 characters')
      .max(20, 'Maximum 20 characters'),
    category: z
      .string({
        invalid_type_error: 'Category platform must be a string',
        required_error: FIELD_REQUIRED_STR,
      })
      .min(3, 'Minimum 3 characters')
      .max(20, 'Maximum 20 characters')
      .trim(),
    priority: z.enum(PRIORITY_OPTIONS, {
        required_error: FIELD_REQUIRED_STR,
        invalid_type_error: `Invalid priority, must be one of the followings: ${PRIORITY_OPTIONS.join(
            ', '
        )}`,
    }),
    notes: z
      .string({
        invalid_type_error: 'Category platform must be a string',
        required_error: FIELD_REQUIRED_STR,
      })
      .min(3, 'Minimum 3 characters')
      .max(100, 'Maximum 100 characters')
      .trim(),
    
})

export type AddProductInformationSchema = z.infer<typeof addProductInformationSchema>;