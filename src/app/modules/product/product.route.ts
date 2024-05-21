import express from 'express';
import { ProductControllers } from './product.controller';


const router = express.Router();


// create route for products

router.post('/', ProductControllers.createProduct)




export const ProductRoutes = router;