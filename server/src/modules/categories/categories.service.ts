import CategoryRepository from './categories.repository';

class CategoryService {
    async getAllCategories(options: any) {
        return CategoryRepository.findAndCountAll(options);
      }

    async getCategoryById(id: number) {
        return CategoryRepository.findById(id);
    }

    async createCategory(data: any) {
        return CategoryRepository.create(data);
    }

    async updateCategory(id: number, data: any) {
        return CategoryRepository.update(id, data);
    }

    async deleteCategory(id: number) {
        return CategoryRepository.delete(id);
    }
}

export default new CategoryService();
