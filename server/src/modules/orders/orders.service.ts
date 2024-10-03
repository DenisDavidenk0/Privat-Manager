import OrderRepository from './orders.repository';

class OrderService {
    async getAllOrders(options: any) {
        return OrderRepository.findAndCountAll(options);
      }

    async getOrderById(id: number) {
        return OrderRepository.findById(id);
    }

    async createOrder(data: any) {
        return OrderRepository.create(data);
    }

    async updateOrder(id: number, data: any) {
        return OrderRepository.update(id, data);
    }

    async deleteOrder(id: number) {
        return OrderRepository.delete(id);
    }
}

export default new OrderService();
