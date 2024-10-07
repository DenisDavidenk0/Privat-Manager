import { categorySchema, CategoryType } from '../../schemas/category/create';
import {
  categoryEditSchema,
  CategoryEditType,
} from '../../schemas/category/update';
import CategoryRepository from './categories.repository';
import { ZodError } from 'zod';

class CategoryService {
  async getAllCategories(options: any) {
    return CategoryRepository.findAndCountAll(options);
  }

  async getCategoryById(id: number) {
    return CategoryRepository.findById(id);
  }

  async createCategory(data: CategoryType) {
    try {
      // Валидируем входные данные с помощью схемы категории
      const parsedData = categorySchema.parse(data);

      return CategoryRepository.create(parsedData);
    } catch (error) {
      if (error instanceof ZodError) {
        // Преобразуем ошибки валидации в удобный формат
        const validationErrors = error.errors.map((err) => ({
          path: err.path.join('.'),
          message: err.message,
        }));

        // Бросаем ошибку с деталями для обработки на уровне контроллера
        throw {
          status: 400,
          message: 'Validation failed',
          errors: validationErrors,
        };
      }
      throw error;
    }
  }

  async updateCategory(id: number, data: CategoryEditType) {
    try {
      // Валидируем входные данные с помощью схемы обновления клиента
      const parsedData = categoryEditSchema.parse(data);

      // Обновляем категорию и получаем обновлённую запись
      const updatedCategory = await CategoryRepository.update(id, parsedData);

      if (!updatedCategory) {
        throw new Error('Category not found after update');
      }

      return updatedCategory;
    } catch (error) {
      if (error instanceof ZodError) {
        // Преобразуем ошибки валидации в удобный формат
        const validationErrors = error.errors.map((err) => ({
          path: err.path.join('.'),
          message: err.message,
        }));

        // Бросаем ошибку с деталями для обработки на уровне контроллера
        throw {
          status: 400,
          message: 'Validation failed',
          errors: validationErrors,
        };
      }
      throw error;
    }
  }

  async deleteCategory(id: number) {
    return CategoryRepository.delete(id);
  }
}

export default new CategoryService();
