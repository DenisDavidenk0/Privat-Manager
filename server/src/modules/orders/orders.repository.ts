import { orderType } from '../../schemas/order/create';
import { OrderEditType } from '../../schemas/order/update';
import { Client } from '../clients/clients.model';
import { Product } from '../products/products.model';
import { Order } from './orders.model';

class OrderRepository {
  async findAll() {
    // Получаем все заказы вместе с информацией о клиентах и продуктах
    return Order.findAll({ include: [Client, Product] });
  }

  async findAndCountAll(options: any) {
    return Order.findAndCountAll(options);
  }

  async findById(id: number) {
    // Находим заказ по ID, включая связанные модели Client и Product
    return Order.findByPk(id, { include: [Client, Product] });
  }

  async create(data: orderType) {
    return Order.create(data);
  }

  async update(id: number, data: OrderEditType) {
    // Обновляем заказ и получаем количество затронутых строк
    const [updatedRowCount] = await Order.update(data, {
      where: { id },
      returning: true,
    });

    // Если заказ не найден, выбрасываем ошибку
    if (updatedRowCount === 0) {
      throw new Error('Order not found');
    }

    // Возвращаем обновлённый заказ с включёнными данными клиента и продукта
    return this.findById(id);
  }

  async delete(id: number) {
    return Order.destroy({ where: { id } });
  }
}

export default new OrderRepository();
