import { CategoryType } from '../../schemas/category/create';
import { CategoryEditType } from '../../schemas/category/update';
import { Category } from './categories.model';

class CategoryRepository {
  async findAll() {
    return Category.findAll();
  }

  async findAndCountAll(options: any) {
    return Category.findAndCountAll(options);
  }

  async findById(id: number) {
    return Category.findByPk(id);
  }

  async create(data: CategoryType) {
    return Category.create(data);
  }

  async update(id: number, data: CategoryEditType) {
    // Обновляем категорию и получаем количество обновлённых строк
    const [updatedRowCount] = await Category.update(data, {
      where: { id },
      returning: true,
    });

    // Если ни одна строка не была обновлена, значит категория с данным ID не найдена
    if (updatedRowCount === 0) {
      throw new Error('Category not found');
    }

    // Получаем обновлённую категорию, чтобы вернуть актуальные данные
    const updatedCategory = await this.findById(id);
    return updatedCategory;
  }

  async delete(id: number) {
    return Category.destroy({ where: { id } });
  }
}

export default new CategoryRepository();
