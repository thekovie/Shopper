import z from 'zod';

const FIELD_REQUIRED_STR = 'This field is required';


export const createAccountSchema = z.object({
  displayName: z
    .string({
      invalid_type_error: 'Display name must be a string',
      required_error: FIELD_REQUIRED_STR,
    })
    .min(6, 'Minimum 6 characters')
    .trim(),
  email: z
    .string({
      invalid_type_error: 'Email must be a string',
      required_error: FIELD_REQUIRED_STR,
    })
    .email('Invalid email address')
    .min(3, 'Minimum 3 characters')
    .trim(),
  password: z
    .string({
      invalid_type_error: 'Password must be a string',
      required_error: FIELD_REQUIRED_STR,
    })
    .min(6, 'Minimum 6 characters'),
  confirmPassword: z
    .string({
      invalid_type_error: 'Password must be a string',
      required_error: FIELD_REQUIRED_STR,
    })
    .min(6, 'Minimum 6 characters'),
}).refine((data) => data.password === data.confirmPassword, {
    message: 'Passwords do not match',
    path: ['confirmPassword'],
});

export type CreateAccountSchema = z.infer<typeof createAccountSchema>;

export const signInAccountSchema = z.object({
  email: z
    .string({
      invalid_type_error: 'Email must be a string',
      required_error: FIELD_REQUIRED_STR,
    })
    .email('Invalid email address')
    .min(3, 'Minimum 3 characters')
    .trim(),
  password: z
    .string({
      invalid_type_error: 'Password must be a string',
      required_error: FIELD_REQUIRED_STR,
    })
    .min(6, 'Minimum 6 characters'),
});

export type SignInAccountSchema = z.infer<typeof signInAccountSchema>;



export const modifyProfileSettingsSchema = z.object({
    displayName: z
      .string({
        invalid_type_error: 'Name must be a string',
        required_error: FIELD_REQUIRED_STR,
      })
      .min(3, 'Minimum 3 characters')
      .optional(),
    email: z
      .string({
        invalid_type_error: 'Name must be a string',
        required_error: FIELD_REQUIRED_STR,
      })
      .optional(),
    password: z
      .string({
        invalid_type_error: 'Name must be a string',
        required_error: FIELD_REQUIRED_STR,
      })
      .optional(),
    confirmPassword: z
      .string({
        invalid_type_error: 'Name must be a string',
        required_error: FIELD_REQUIRED_STR,
      })
      .optional(),
  
});

export type ModifyProfileSettingsSchema = z.infer<typeof modifyProfileSettingsSchema>;