import { Request, Response, NextFunction } from 'express';
import ProductService from './products.service';

class ProductController {
    // async getProducts(req: Request, res: Response, next: NextFunction) {
    //     try {
    //         const products = await ProductService.getAllProducts();
    //         res.json(products);
    //     } catch (error) {
    //         next(error);
    //     }
    // }



    async getProducts(req: Request, res: Response, next: NextFunction) {
        try {
          const { page = 1, limit = 10, sortField = 'id', sortOrder = 'ASC' } = req.query;
    
          const offset = (+page - 1) * +limit;
          const order = [[sortField as string, sortOrder as string]];
    
          const products = await ProductService.getAllProducts({
            limit: Number(limit),
            offset,
            order,
          });
    
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
            const product = await ProductService.getProductById(Number(req.params.id));
            if (!product) {
                res.status(404).json({ message: 'Product not found' });
            } else {
                res.json(product);
            }
        } catch (error) {
            next(error);
        }
    }

    async createProduct(req: Request, res: Response, next: NextFunction) {
        try {
            const newProduct = await ProductService.createProduct(req.body);
            res.status(201).json(newProduct);
        } catch (error) {
            next(error);
        }
    }

    async updateProduct(req: Request, res: Response, next: NextFunction) {
        try {
            const updatedProduct = await ProductService.updateProduct(Number(req.params.id), req.body);
            res.json(updatedProduct);
        } catch (error) {
            next(error);
        }
    }

    async deleteProduct(req: Request, res: Response, next: NextFunction) {
        try {
            await ProductService.deleteProduct(Number(req.params.id));
            res.status(204).send();
        } catch (error) {
            next(error);
        }
    }
}

export default new ProductController();
