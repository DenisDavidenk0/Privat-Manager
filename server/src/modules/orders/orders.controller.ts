import { Request, Response, NextFunction } from 'express';
import { ValidationError } from '../categories/categories.controller';
import OrderService from './orders.service';

class OrderController {
  async getOrders(req: Request, res: Response, next: NextFunction) {
    try {
      const {
        page = 1,
        limit = 10,
        sortField = 'id',
        sortOrder = 'ASC',
        clientId,
        productId,
      } = req.query;

      // Вычисляем смещение для пагинации
      const offset = (+page - 1) * +limit;

      // Формируем массив сортировки для Sequelize
      const order = [[sortField as string, sortOrder as string]];

      // Инициализируем объект условий для фильтрации
      const whereClause: any = {};

      // Добавляем фильтрацию по clientId, если он указан
      if (clientId) {
        whereClause.clientId = clientId;
      }

      // Добавляем фильтрацию по productId, если он указан
      if (productId) {
        whereClause.productId = productId;
      }

      // Получаем заказы с учетом пагинации, сортировки и фильтрации
      const orders = await OrderService.getAllOrders({
        limit: Number(limit),
        offset,
        order,
        where: whereClause,
      });

      // Отправляем клиенту данные заказов и общее количество записей
      res.json({
        data: orders.rows,
        total: orders.count,
      });
    } catch (error) {
      next(error); // Передаем ошибку следующему middleware для обработки
    }
  }

  async getOrderById(req: Request, res: Response, next: NextFunction) {
    try {
      // Получаем заказ по ID
      const order = await OrderService.getOrderById(Number(req.params.id));
      if (!order) {
        // Если заказ не найден, отправляем статус 404
        res.status(404).json({ message: 'Order not found' });
      } else {
        // Отправляем данные заказа
        res.json(order);
      }
    } catch (error) {
      next(error);
    }
  }

  async createOrder(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> {
    try {
      // Создаем новый заказ на основе данных из тела запроса
      const newOrder = await OrderService.createOrder(req.body);
      // Отправляем созданный заказ со статусом 201
      res.status(201).json(newOrder);
    } catch (error) {
      const err = error as ValidationError;
      if (err.status === 400 && err.errors) {
        // Обработка ошибок валидации
        res.status(400).json({
          error: err.message,
          details: err.errors,
        });
        return; // Завершаем выполнение функции
      }
      next(error);
    }
  }

  async updateOrder(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> {
    try {
      // Обновляем заказ по ID с новыми данными из тела запроса
      const updatedOrder = await OrderService.updateOrder(
        Number(req.params.id),
        req.body
      );
      // Отправляем обновленные данные заказа
      res.json(updatedOrder);
    } catch (error) {
      const err = error as ValidationError;
      if (err.status === 400 && err.errors) {
        // Обработка ошибок валидации
        res.status(400).json({
          error: err.message,
          details: err.errors,
        });
        return; // Завершаем выполнение функции
      }
      next(error);
    }
  }

  async deleteOrder(req: Request, res: Response, next: NextFunction) {
    try {
      // Удаляем заказ по ID
      await OrderService.deleteOrder(Number(req.params.id));
      // Отправляем статус 204 No Content после успешного удаления
      res.status(204).send();
    } catch (error) {
      next(error);
    }
  }
}

export default new OrderController();
