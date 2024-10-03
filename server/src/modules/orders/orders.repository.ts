import { Client } from '../clients/clients.model';
import { Product } from '../products/products.model';
import { Order } from './orders.model';

class OrderRepository {
    async findAll() {
        return Order.findAll({ include: [Client, Product] });
    }
    async findAndCountAll(options: any) {
        return Order.findAndCountAll(options);
      }
    async findById(id: number) {
        return Order.findByPk(id, { include: [Client, Product] });
    }

    async create(data: any) {
        return Order.create(data);
    }

    async update(id: number, data: any) {
        return Order.update(data, { where: { id } });
    }

    async delete(id: number) {
        return Order.destroy({ where: { id } });
    }
}

export default new OrderRepository();
