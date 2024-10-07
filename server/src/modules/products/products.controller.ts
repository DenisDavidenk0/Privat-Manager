import { Request, Response, NextFunction } from 'express';
import { ValidationError } from '../categories/categories.controller';
import ProductService from './products.service';

class ProductController {
  async getProducts(req: Request, res: Response, next: NextFunction) {
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

      // Формируем массив для сортировки, совместимый с ORM (например, Sequelize)
      const order = [[sortField as string, sortOrder as string]];

      // Получаем продукты с учётом пагинации и сортировки
      const products = await ProductService.getAllProducts({
        limit: Number(limit),
        offset,
        order,
      });

      // Отправляем клиенту данные продуктов и общее количество записей
      res.json({
        data: products.rows,
        total: products.count,
      });
    } catch (error) {
      next(error);
    }
  }

  async getProductById(req: Request, res: Response, next: NextFunction) {
    try {
      // Получаем продукт по ID, преобразуя ID в число
      const product = await ProductService.getProductById(
        Number(req.params.id)
      );
      if (!product) {
        // Если продукт не найден, отправляем статус 404
        res.status(404).json({ message: 'Продукт не найден' });
      } else {
        // Отправляем данные найденного продукта
        res.json(product);
      }
    } catch (error) {
      next(error);
    }
  }

  async createProduct(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> {
    try {
      // Создаём новый продукт на основе данных из тела запроса
      const newProduct = await ProductService.createProduct(req.body);
      // Отправляем данные созданного продукта со статусом 201
      res.status(201).json(newProduct);
    } catch (error) {
      const err = error as ValidationError;
      if (err.status === 400 && err.errors) {
        // Обрабатываем ошибки валидации и отправляем их клиенту
        res.status(400).json({
          error: err.message,
          details: err.errors,
        });
        return; // Завершаем выполнение функции
      }
      next(error);
    }
  }

  async updateProduct(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> {
    try {
      // Обновляем продукт по ID с новыми данными из тела запроса
      const updatedProduct = await ProductService.updateProduct(
        Number(req.params.id),
        req.body
      );
      // Отправляем обновлённые данные продукта
      res.json(updatedProduct);
    } catch (error) {
      const err = error as ValidationError;
      if (err.status === 400 && err.errors) {
        // Обрабатываем ошибки валидации и отправляем их клиенту
        res.status(400).json({
          error: err.message,
          details: err.errors,
        });
        return; // Завершаем выполнение функции
      }
      next(error);
    }
  }

  async deleteProduct(req: Request, res: Response, next: NextFunction) {
    try {
      // Удаляем продукт по ID
      await ProductService.deleteProduct(Number(req.params.id));
      // Отправляем статус 204 No Content после успешного удаления
      res.status(204).send();
    } catch (error) {
      next(error);
    }
  }
}

export default new ProductController();
