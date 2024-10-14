import z from 'zod';

const FIELD_REQUIRED_STR = 'This field is required';

export const modifyProfileSettingsSchema = z.object({
    displayName: z
      .string({
        invalid_type_error: 'Name must be a string',
        required_error: FIELD_REQUIRED_STR,
      })
      .min(3, 'Minimum 3 characters'),
    email: z
      .string({
        invalid_type_error: 'Name must be a string',
        required_error: FIELD_REQUIRED_STR,
      }),
    password: z
      .string({
        invalid_type_error: 'Name must be a string',
        required_error: FIELD_REQUIRED_STR,
      }),
    confirmPassword: z
      .string({
        invalid_type_error: 'Name must be a string',
        required_error: FIELD_REQUIRED_STR,
      }),
  
});

export type ModifyProfileSettingsSchema = z.infer<typeof modifyProfileSettingsSchema>;