import z from "zod";

const FIELD_REQUIRED_STR = "This field is required";

export const PRIORITY_OPTIONS = ["High", "Mid", "Low"] as const;

export const addProductLinkSchema = z.object({
  productLink: z
    .string({
      invalid_type_error: "Name must be a string",
      required_error: FIELD_REQUIRED_STR,
    })
    .min(3, "Minimum 3 characters")
    .trim(),
});

export type AddProductLinkSchema = z.infer<typeof addProductLinkSchema>;

export const addCategorySchema = z.object({
  category: z
    .string({
      invalid_type_error: "Name must be a string",
      required_error: FIELD_REQUIRED_STR,
    })
    .min(3, "Minimum 3 characters"),
});

export type AddCategorySchema = z.infer<typeof addCategorySchema>;

export const modifyCategorySchema = z.object({
  category: z
    .string({
      invalid_type_error: "Name must be a string",
      required_error: FIELD_REQUIRED_STR,
    })
    .min(3, "Minimum 3 characters"),
});

export type ModifyCategorySchema = z.infer<typeof modifyCategorySchema>;

export const addProductInformationSchema = z.object({
  productName: z
    .string({
      invalid_type_error: "Name must be a string",
      required_error: FIELD_REQUIRED_STR,
    })
    .min(3, "Minimum 3 characters")
    .max(50, "Maximum 50 characters")
    .trim(),
  productLink: z
    .string({
      invalid_type_error: "Product link must be a string",
      required_error: FIELD_REQUIRED_STR,
    })
    .url("Must be a valid URL"),
  shoppingPlatform: z
    .string({
      invalid_type_error: "Shopping platform must be a string",
      required_error: FIELD_REQUIRED_STR,
    })
    .min(3, "Minimum 3 characters")
    .max(20, "Maximum 20 characters")
    .trim(),
  price: z.number({
    invalid_type_error: "Name must be a number",
    required_error: FIELD_REQUIRED_STR,
  }),
  category: z
    .string({
      invalid_type_error: "Category platform must be a string",
      required_error: FIELD_REQUIRED_STR,
    })
    .min(3, "Minimum 3 characters")
    .trim()
    .optional(),
  priority: z
    .enum(PRIORITY_OPTIONS, {
      required_error: FIELD_REQUIRED_STR,
      invalid_type_error: `Invalid priority, must be one of the followings: ${PRIORITY_OPTIONS.join(
        ", ",
      )}`,
    })
    .optional(),
  notes: z
    .string({
      invalid_type_error: "Category platform must be a string",
      required_error: FIELD_REQUIRED_STR,
    })
    .min(3, "Minimum 3 characters")
    .max(100, "Maximum 100 characters")
    .trim()
    .optional(),
});

export type AddProductInformationSchema = z.infer<
  typeof addProductInformationSchema
>;
