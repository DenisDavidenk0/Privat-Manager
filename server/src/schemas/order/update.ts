import { z } from 'zod';
import { orderSchema } from './create';
import { clientEditSchema } from '../client/update';
import { productEditSchema } from '../product/update';

export const orderEditSchema = orderSchema.extend({
  id: z.number(),
  createdAt: z.string().refine((date) => !isNaN(Date.parse(date)), {
    message: 'Некорректный формат даты для createdAt',
  }),
  updatedAt: z.string().refine((date) => !isNaN(Date.parse(date)), {
    message: 'Некорректный формат даты для updatedAt',
  }),
  client: clientEditSchema,
  product: productEditSchema,
});

export type OrderEditType = z.infer<typeof orderEditSchema>;
