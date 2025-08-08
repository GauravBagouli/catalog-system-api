import express from 'express';
import { addProduct, addProductType, getProductList } from '../controllers/product';

const router = express.Router();

// Routes
router.post('/create',                  addProduct);
router.post('/type/create',             addProductType);
router.get('/list',                     getProductList);

export default router;