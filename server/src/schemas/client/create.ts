import { z } from 'zod';

export const clientSchema = z.object({
  name: z
    .string()
    .min(6, 'Имя обязательно')
    .max(255, 'Имя слишком длинное, максимальная длина 255 символов'),
  email: z.string().email('Некорректный формат email'),
});

export type clientType = z.infer<typeof clientSchema>