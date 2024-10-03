import { Request, Response, NextFunction } from 'express';
import CategoryService from './categories.service';

class CategoryController {
    async getAllCategories(req: Request, res: Response, next: NextFunction) {
        try {
          const { page = 1, limit = 10, sortField = 'id', sortOrder = 'ASC' } = req.query;
    
          const offset = (+page - 1) * +limit;
          const order = [[sortField as string, sortOrder as string]];
    
          const categories = await CategoryService.getAllCategories({
            limit: Number(limit),
            offset,
            order,
          });
    
          res.json({
            data: categories.rows,
            total: categories.count,
          });
        } catch (error) {
          next(error);
        }
      }

    async getCategoryById(req: Request, res: Response, next: NextFunction) {
        try {
            const category = await CategoryService.getCategoryById(Number(req.params.id));
            if (!category) {
                res.status(404).json({ message: 'Category not found' });
            } else {
                res.json(category);
            }
        } catch (error) {
            next(error);
        }
    }

    async createCategory(req: Request, res: Response, next: NextFunction) {
        try {
            const newCategory = await CategoryService.createCategory(req.body);
            res.status(201).json(newCategory);
        } catch (error) {
            next(error);
        }
    }

    async updateCategory(req: Request, res: Response, next: NextFunction) {
        try {
            const updatedCategory = await CategoryService.updateCategory(Number(req.params.id), req.body);
            res.json(updatedCategory);
        } catch (error) {
            next(error);
        }
    }

    async deleteCategory(req: Request, res: Response, next: NextFunction) {
        try {
            await CategoryService.deleteCategory(Number(req.params.id));
            res.status(204).send();
        } catch (error) {
            next(error);
        }
    }
}

export default new CategoryController();
