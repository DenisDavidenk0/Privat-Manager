import ProductRepository from './products.repository';

class ProductService {
    async getAllProducts(options: any) {
        return ProductRepository.findAndCountAll(options);
      }

    async getProductById(id: number) {
        return ProductRepository.findById(id);
    }

    async createProduct(data: any) {
        return ProductRepository.create(data);
    }

    async updateProduct(id: number, data: any) {
        return ProductRepository.update(id, data);
    }

    async deleteProduct(id: number) {
        return ProductRepository.delete(id);
    }
}

export default new ProductService();
