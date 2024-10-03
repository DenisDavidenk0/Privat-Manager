import { Request, Response, NextFunction } from 'express';
import OrderService from './orders.service';

class OrderController {
    async getOrders(req: Request, res: Response, next: NextFunction) {
        try {
          const { page = 1, limit = 10, sortField = 'id', sortOrder = 'ASC', clientId, productId } = req.query;
    
          const offset = (+page - 1) * +limit;
          const order = [[sortField as string, sortOrder as string]];
          const whereClause: any = {};
    
          if (clientId) {
            whereClause.clientId = clientId;
          }
    
          if (productId) {
            whereClause.productId = productId;
          }
    
          const orders = await OrderService.getAllOrders({
            limit: Number(limit),
            offset,
            order,
            where: whereClause,
          });
    
          res.json({
            data: orders.rows,
            total: orders.count,
          });
        } catch (error) {
          next(error);
        }
      }

    async getOrderById(req: Request, res: Response, next: NextFunction) {
        try {
            const order = await OrderService.getOrderById(Number(req.params.id));
            if (!order) {
                res.status(404).json({ message: 'Order not found' });
            } else {
                res.json(order);
            }
        } catch (error) {
            next(error);
        }
    }

    async createOrder(req: Request, res: Response, next: NextFunction) {
        try {
            const newOrder = await OrderService.createOrder(req.body);
            res.status(201).json(newOrder);
        } catch (error) {
            next(error);
        }
    }

    async updateOrder(req: Request, res: Response, next: NextFunction) {
        try {
            const updatedOrder = await OrderService.updateOrder(Number(req.params.id), req.body);
            res.json(updatedOrder);
        } catch (error) {
            next(error);
        }
    }

    async deleteOrder(req: Request, res: Response, next: NextFunction) {
        try {
            await OrderService.deleteOrder(Number(req.params.id));
            res.status(204).send();
        } catch (error) {
            next(error);
        }
    }
}

export default new OrderController();
