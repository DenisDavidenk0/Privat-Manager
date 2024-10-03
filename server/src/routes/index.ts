import { Router } from 'express';
import categoryRoutes from './category.routes';
import clientRoutes from './client.routes';
import orderRoutes from './order.routes';
import productRoutes from './product.routes';


const router = Router();

router.use(productRoutes);
router.use(categoryRoutes);
router.use(clientRoutes);
router.use(orderRoutes);

export default router;
