import { z } from 'zod';

export const productSchema = z.object({
  name: z.string().min(1, 'Название продукта не должно быть пустым'),
  price: z.number().positive('Цена должна быть больше 0'),
  categoryId: z
    .number()
    .int()
    .positive('Название категории не должно быть пустым'),
  shops: z
    .array(
      z.object({
        name: z.string().min(1, 'Название магазина не должно быть пустым'),
      })
    )
    .optional(),
});

export type productType = z.infer<typeof productSchema>