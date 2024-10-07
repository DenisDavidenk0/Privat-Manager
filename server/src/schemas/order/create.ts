import { z } from 'zod';

export const orderSchema = z.object({
  quantity: z
    .number({
      required_error: 'Укажите количество',
      invalid_type_error: 'Количество должно быть не менее 1',
    })
    .min(1, 'Количество должно быть не менее 1'),
  date: z
    .string({ required_error: 'Укажите дату' })
    .refine((date) => !isNaN(Date.parse(date)), 'Неверная дата'),
  clientId: z
    .number({
      required_error: 'Укажите клиента',
      invalid_type_error: 'Укажите клиента',
    })
    .int('ID клиента должен быть целым числом')
    .positive('ID клиента должен быть положительным числом'),
  productId: z
    .number({
      required_error: 'Укажите продукт',
      invalid_type_error: 'Укажите продукт',
    })
    .int('ID продукта должен быть целым числом')
    .positive('ID продукта должен быть положительным числом'),
});

export type orderType = z.infer<typeof orderSchema>;
