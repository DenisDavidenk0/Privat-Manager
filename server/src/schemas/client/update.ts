import { z } from 'zod';
import { clientSchema } from './create';

export const clientEditSchema = clientSchema.extend({
  id: z.number(),
  updatedAt: z.string().refine((date) => !isNaN(Date.parse(date)), {
    message: 'Некорректный формат даты для updatedAt',
  }),
  createdAt: z.string().refine((date) => !isNaN(Date.parse(date)), {
    message: 'Некорректный формат даты для createdAt',
  }),
});

export type ClientEditType = z.infer<typeof clientEditSchema>;