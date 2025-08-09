"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const product_1 = require("../controllers/product");
const router = express_1.default.Router();
// Routes
router.post('/create', product_1.addProduct);
router.post('/type/create', product_1.addProductType);
router.get('/list', product_1.getProductList);
router.get('/type/list', product_1.getProductTypeList);
router.get('list/:type', product_1.getProductsByType);
router.get('/details', product_1.getProductDetails);
exports.default = router;
