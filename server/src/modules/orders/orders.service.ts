import OrderRepository from './orders.repository';
import { ZodError } from 'zod';
import { orderSchema, orderType } from '../../schemas/order/create';
import { orderEditSchema, OrderEditType } from '../../schemas/order/update';

class OrderService {
  async getAllOrders(options: any) {
    return OrderRepository.findAndCountAll(options);
  }

  async getOrderById(id: number) {
    return OrderRepository.findById(id);
  }

  async createOrder(data: orderType) {
    try {
      // Валидируем данные заказа при создании
      const parsedData = orderSchema.parse(data);
      // Создаем новый заказ с валидированными данными
      return OrderRepository.create(parsedData);
    } catch (error) {
      if (error instanceof ZodError) {
        // Преобразуем ошибки валидации в удобный для клиента формат
        const validationErrors = error.errors.map((err) => ({
          path: err.path.join('.'),
          message: err.message,
        }));
        // Бросаем ошибку с деталями валидации
        throw {
          status: 400,
          message: 'Validation failed',
          errors: validationErrors,
        };
      }
      // Пробрасываем остальные ошибки дальше
      throw error;
    }
  }

  async updateOrder(id: number, data: OrderEditType) {
    try {
      // Валидируем данные заказа при обновлении
      const parsedData = orderEditSchema.parse(data);
      // Обновляем заказ и получаем обновленный объект
      const updatedOrder = await OrderRepository.update(id, parsedData);

      if (!updatedOrder) {
        // Если заказ не найден, выбрасываем ошибку
        throw new Error('Order not found');
      }

      return updatedOrder;
    } catch (error) {
      if (error instanceof ZodError) {
        // Преобразуем ошибки валидации в удобный для клиента формат
        const validationErrors = error.errors.map((err) => ({
          path: err.path.join('.'),
          message: err.message,
        }));
        // Бросаем ошибку с деталями валидации
        throw {
          status: 400,
          message: 'Validation failed',
          errors: validationErrors,
        };
      }
      // Пробрасываем остальные ошибки дальше
      throw error;
    }
  }

  async deleteOrder(id: number) {
    return OrderRepository.delete(id);
  }
}

export default new OrderService();
