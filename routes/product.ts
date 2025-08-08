import express from 'express';
import { addProduct, addProductType, getProductList, getProductsByType, getProductTypeList } from '../controllers/product';

const router = express.Router();

// Routes
router.post('/create',                  addProduct);
router.post('/type/create',             addProductType);
router.get('/list',                     getProductList);
router.get('/type/list',                getProductTypeList);
router.get('list/:type',                getProductsByType);

export default router;