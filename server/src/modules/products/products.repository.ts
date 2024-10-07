import { productType } from '../../schemas/product/create';
import { ProductEditType } from '../../schemas/product/update';
import { Product } from './products.model';

class ProductRepository {
  async findAll() {
    return Product.findAll();
  }

  async findAndCountAll(options: any) {
    return Product.findAndCountAll(options);
  }

  async findById(id: number) {
    return Product.findByPk(id);
  }

  async create(data: productType) {
    return Product.create(data);
  }

  async update(id: number, data: ProductEditType) {
    // Обновляем продукт и получаем количество обновлённых строк
    const [updatedRowCount] = await Product.update(data, {
      where: { id },
      returning: true,
    });

    // Если ни одна строка не была обновлена, значит продукт с данным ID не найден
    if (updatedRowCount === 0) {
      throw new Error('Продукт не найден');
    }

    // Возвращаем обновлённый продукт, чтобы предоставить актуальные данные
    return this.findById(id);
  }

  async delete(id: number) {
    return Product.destroy({ where: { id } });
  }
}

export default new ProductRepository();
