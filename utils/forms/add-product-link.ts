import z from 'zod';

const FIELD_REQUIRED_STR = 'This field is required';

export const addProductLinkSchema = z.object({
    name: z
      .string({
        invalid_type_error: 'Name must be a string',
        required_error: FIELD_REQUIRED_STR,
      })
      .min(3, 'Minimum 3 characters')
      .max(20, 'Maximum 20 characters')
      .trim(),
  
  });

  export type AddProductLinkSchema = z.infer<typeof addProductLinkSchema>;