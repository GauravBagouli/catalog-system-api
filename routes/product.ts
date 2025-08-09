import express from 'express';
import { addProduct, addProductType, getProductDetails, getProductList, getProductsByType, getProductTypeList } from '../controllers/product';

const router = express.Router();

// Routes
router.post('/create',                  addProduct);
router.post('/type/create',             addProductType);
router.get('/list',                     getProductList);
router.get('/type/list',                getProductTypeList);
router.get('list/:type',                getProductsByType);
router.get('/details',                  getProductDetails);

export default router;