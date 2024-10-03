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

    async create(data: any) {
        return Product.create(data);
    }

    async update(id: number, data: any) {
        return Product.update(data, { where: { id } });
    }

    async delete(id: number) {
        return Product.destroy({ where: { id } });
    }
}

export default new ProductRepository();
