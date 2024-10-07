import { z } from "zod";
import { categorySchema } from "./create";

export const categoryEditSchema = categorySchema.extend({
  id: z.number(),
  createdAt: z
    .string()
    .refine((date) => !isNaN(Date.parse(date)), {
      message: "Некорректный формат даты для createdAt",
    }),
  updatedAt: z
    .string()
    .refine((date) => !isNaN(Date.parse(date)), {
      message: "Некорректный формат даты для updatedAt",
    }),
});

export type CategoryEditType = z.infer<typeof categoryEditSchema>;