import { z } from "zod";

export const categorySchema = z.object({
  name: z
    .string()
    .min(1, "Имя категории обязательно")
    .max(255, "Имя категории длинное, максимальная длина 255 символов"),
});


export type CategoryType = z.infer<typeof categorySchema>;
