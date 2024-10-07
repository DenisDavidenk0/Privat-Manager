import { z } from "zod";
import { productSchema } from "./create";


export const productEditSchema = productSchema.extend({
  id: z.number(),
  createdAt: z
    .string()
    .refine((date) => !isNaN(Date.parse(date)), {
      message: 'Некорректный формат даты для createdAt',
    }),
  updatedAt: z
    .string()
    .refine((date) => !isNaN(Date.parse(date)), {
      message: 'Некорректный формат даты для updatedAt',
    }),
});

export type ProductEditType = z.infer<typeof productEditSchema>;