import { ZodError } from 'zod';
import { productSchema, productType } from '../../schemas/product/create';
import ProductRepository from './products.repository';
import {
  productEditSchema,
  ProductEditType,
} from '../../schemas/product/update';

class ProductService {
  async getAllProducts(options: any) {
    return ProductRepository.findAndCountAll(options);
  }

  async getProductById(id: number) {
    return ProductRepository.findById(id);
  }

  async createProduct(data: productType) {
    try {
      // Валидируем входные данные с помощью схемы продукта
      const parsedData = productSchema.parse(data);
      // Создаём новый продукт с валидированными данными
      return ProductRepository.create(parsedData);
    } catch (error) {
      if (error instanceof ZodError) {
        // Преобразуем ошибки валидации в удобный формат для контроллера
        const validationErrors = error.errors.map((err) => ({
          path: err.path.join('.'),
          message: err.message,
        }));

        // Бросаем ошибку с деталями валидации
        throw {
          status: 400,
          message: 'Ошибка валидации',
          errors: validationErrors,
        };
      }
      // Пробрасываем остальные ошибки дальше
      throw error;
    }
  }

  async updateProduct(id: number, data: ProductEditType) {
    try {
      // Валидируем входные данные с помощью схемы обновления продукта
      const parsedData = productEditSchema.parse(data);

      // Обновляем продукт и получаем количество затронутых строк
      const updatedRowCount = await ProductRepository.update(id, parsedData);

      // Если ни одна строка не была обновлена, продукт не найден
      if (!updatedRowCount) {
        throw new Error('Продукт не найден');
      }

      // Получаем обновлённый продукт из базы данных
      const updatedProduct = await ProductRepository.findById(id);
      if (!updatedProduct) {
        // Если после обновления продукт не найден, бросаем ошибку
        throw new Error('Продукт не найден после обновления');
      }

      // Возвращаем обновлённый продукт
      return updatedProduct;
    } catch (error) {
      if (error instanceof ZodError) {
        // Преобразуем ошибки валидации в удобный формат для контроллера
        const validationErrors = error.errors.map((err) => ({
          path: err.path.join('.'),
          message: err.message,
        }));

        // Бросаем ошибку с деталями валидации
        throw {
          status: 400,
          message: 'Ошибка валидации',
          errors: validationErrors,
        };
      }
      // Пробрасываем остальные ошибки дальше
      throw error;
    }
  }

  async deleteProduct(id: number) {
    return ProductRepository.delete(id);
  }
}

export default new ProductService();
