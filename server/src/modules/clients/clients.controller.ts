import { Request, Response, NextFunction } from 'express';
import { ValidationError } from '../categories/categories.controller';
import ClientService from './clients.service';

class ClientController {
  async getAllClients(req: Request, res: Response, next: NextFunction) {
    try {
      // Извлекаем параметры запроса с установкой значений по умолчанию
      const {
        page = 1,
        limit = 10,
        sortField = 'id',
        sortOrder = 'ASC',
      } = req.query;

      // Рассчитываем смещение для пагинации
      const offset = (+page - 1) * +limit;

      // Получаем список клиентов с учетом пагинации и сортировки
      const clients = await ClientService.getAllClients({
        limit: Number(limit),
        offset: Number(offset),
        sortField: String(sortField),
        sortOrder: String(sortOrder),
      });

      // Отправляем клиенту данные и общее количество записей
      res.json({
        data: clients.rows,
        total: clients.count,
      });
    } catch (error) {
      next(error); // Передаем ошибку в следующий middleware для обработки
    }
  }

  async getClientById(req: Request, res: Response, next: NextFunction) {
    try {
      // Получаем клиента по ID из параметров маршрута
      const client = await ClientService.getClientById(Number(req.params.id));
      if (!client) {
        // Если клиент не найден, отправляем 404 статус
        res.status(404).json({ message: 'Client not found' });
      } else {
        // Отправляем данные найденного клиента
        res.json(client);
      }
    } catch (error) {
      next(error);
    }
  }

  async createClient(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> {
    try {
      // Создаем нового клиента на основе данных из тела запроса
      const newClient = await ClientService.createClient(req.body);
      // Отправляем данные созданного клиента со статусом 201
      res.status(201).json(newClient);
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

  async updateClient(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> {
    try {
      // Обновляем клиента по ID с новыми данными из тела запроса
      const updatedClient = await ClientService.updateClient(
        Number(req.params.id),
        req.body
      );
      // Отправляем обновленные данные клиента
      res.json(updatedClient);
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

  async deleteClient(req: Request, res: Response, next: NextFunction) {
    try {
      // Удаляем клиента по ID
      await ClientService.deleteClient(Number(req.params.id));
      // Отправляем статус 204 No Content, так как тело ответа не предусмотрено
      res.status(204).send();
    } catch (error) {
      next(error);
    }
  }
}

export default new ClientController();
