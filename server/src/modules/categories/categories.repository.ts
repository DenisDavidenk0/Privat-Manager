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

    async create(data: any) {
        return Category.create(data);
    }

    async update(id: number, data: any) {
        return Category.update(data, { where: { id } });
    }

    async delete(id: number) {
        return Category.destroy({ where: { id } });
    }
}

export default new CategoryRepository();
