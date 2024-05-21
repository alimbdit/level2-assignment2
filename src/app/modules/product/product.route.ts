import express from 'express';
import { ProductControllers } from './product.controller';

const router = express.Router();

// create route for products

router.post('/', ProductControllers.createProduct);
router.get('/', ProductControllers.getAllProducts);
router.get('/:productId', ProductControllers.getSingleProduct);

export const ProductRoutes = router;
