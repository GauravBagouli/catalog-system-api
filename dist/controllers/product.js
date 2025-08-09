"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getProductDetails = exports.getProductTypeList = exports.getProductsByType = exports.getProductList = exports.addProductType = exports.addProduct = void 0;
const authService_1 = require("../services/authService");
const product_1 = require("../data/managers/product");
const productType_1 = require("../data/managers/productType");
const productType_2 = require("../data/models/productType");
const variant_1 = require("../data/models/variant");
const addon_1 = require("../data/models/addon");
const addon_2 = require("../data/managers/addon");
const variant_2 = require("../data/managers/variant");
//This controller is used to add product
const addProduct = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _a, _b;
    try {
        if (!req.body.payload) {
            return res.status(406).json({ success: false, message: 'Request data missing or invalid' });
        }
        const params = (0, authService_1.decryptData)(req.body.payload);
        if (!params || !params.product_type_id || !params.name) {
            return res.status(406).json({ success: false, message: 'Request data missing or invalid' });
        }
        if (typeof params.product_type_id !== 'number' ||
            typeof params.name !== 'string') {
            return res.status(406).json({ success: false, message: 'Invalid product payload' });
        }
        const productTypeQuery = {
            where: {
                id: params.product_type_id
            },
            attributes: ['id']
        };
        let productType = yield (0, productType_1.getProductType)(productTypeQuery);
        if (productType === null) {
            return res.status(404).json({ success: false, message: 'Invalid product type' });
        }
        const productQuery = {
            where: {
                product_type_id: params.product_type_id,
                name: params.name
            },
            attributes: ['id']
        };
        let duplicateProduct = yield (0, product_1.getProduct)(productQuery);
        if (duplicateProduct !== null) {
            return res.status(409).json({ success: false, message: 'Product already exists' });
        }
        const payload = {
            product_type_id: params.product_type_id,
            name: params.name,
            description: params.description,
            product_images: params.product_images || []
        };
        let product = yield (0, product_1.createProduct)(payload);
        if ((params === null || params === void 0 ? void 0 : params.addons) && ((_a = params === null || params === void 0 ? void 0 : params.addons) === null || _a === void 0 ? void 0 : _a.length) > 0) {
            const addonPayload = params.addons.map((addon) => {
                return {
                    product_id: product.id,
                    name: addon.name,
                    price: addon.price
                };
            });
            yield (0, addon_2.bulkCreateAddons)(addonPayload);
        }
        if ((params === null || params === void 0 ? void 0 : params.variants) && ((_b = params === null || params === void 0 ? void 0 : params.variants) === null || _b === void 0 ? void 0 : _b.length) > 0) {
            const variantPayload = params.variants.map((variant) => {
                return {
                    product_id: product.id,
                    size: variant.size,
                    color: variant.color,
                    price: variant.price,
                    stock: variant.stock,
                    sku: variant.sku
                };
            });
            yield (0, variant_2.bulkCreateVariants)(variantPayload);
        }
        res.status(200).json({ success: true, message: 'Product added successfully' });
    }
    catch (error) {
        console.log("================ Error while adding product ================", error);
        if (error instanceof Error) {
            res.status(409).json({ success: false, message: error.message });
        }
        else {
            res.status(409).json({ success: false, message: 'Something went wrong' });
        }
    }
});
exports.addProduct = addProduct;
// This function is used to add product type
const addProductType = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        if (!req.body.payload) {
            return res.status(406).json({ success: false, message: 'Request data missing or invalid' });
        }
        let params = (0, authService_1.decryptData)(req.body.payload);
        if (!params || !params.name) {
            return res.status(406).json({ success: false, message: 'Request data missing or invalid' });
        }
        if (typeof params.name !== 'string') {
            return res.status(406).json({ success: false, message: 'Invalid product type name' });
        }
        const searchQuery = {
            where: {
                name: params.name
            },
            attributes: ['id']
        };
        let duplicateProduct = yield (0, productType_1.getProductType)(searchQuery);
        if (duplicateProduct !== null) {
            return res.status(409).json({ success: false, message: 'Product type name already exists' });
        }
        let payload = {
            name: params.name
        };
        yield (0, productType_1.createProductType)(payload);
        res.status(200).json({ success: true, message: 'Product type added successfully' });
    }
    catch (error) {
        console.log("================ Error while adding product type ================", error);
        if (error instanceof Error) {
            res.status(409).json({ success: false, message: error.message });
        }
        else {
            res.status(409).json({ success: false, message: 'Something went wrong' });
        }
    }
});
exports.addProductType = addProductType;
// This function is used to get product list
const getProductList = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        let searchQuery = {
            where: {
                status: 'Active'
            },
            order: [['created_at', 'DESC']],
        };
        if (req.query.payload) {
            const payloadStr = (0, authService_1.getStringFromQuery)(req.query.payload, 'payload');
            const params = (0, authService_1.decryptData)(payloadStr);
            if (params && params.product_type_id) {
                searchQuery.where.product_type_id = params.product_type_id;
            }
        }
        const products = yield (0, product_1.getProducts)(searchQuery);
        res.status(200).json({ success: true, data: products });
    }
    catch (error) {
        console.log("================ Error while getting product list ================", error);
        if (error instanceof Error) {
            res.status(409).json({ success: false, message: error.message });
        }
        else {
            res.status(409).json({ success: false, message: 'Something went wrong' });
        }
    }
});
exports.getProductList = getProductList;
// This function is used to get Products by Type
const getProductsByType = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        if (!req.query.payload) {
            return res.status(406).json({ success: false, message: 'Request data missing or invalid' });
        }
        const payloadStr = (0, authService_1.getStringFromQuery)(req.query.payload, 'payload');
        const params = (0, authService_1.decryptData)(payloadStr);
        if (!params || !params.product_type_id) {
            return res.status(406).json({ success: false, message: 'Request data missing or invalid' });
        }
        const searchQuery = {
            where: {
                product_type_id: params.product_type_id
            },
            order: [['created_at', 'DESC']],
        };
        const products = yield (0, product_1.getProducts)(searchQuery);
        res.status(200).json({ success: true, data: products });
    }
    catch (error) {
        console.log("================ Error while getting product list by type ================", error);
        if (error instanceof Error) {
            res.status(409).json({ success: false, message: error.message });
        }
        else {
            res.status(409).json({ success: false, message: 'Something went wrong' });
        }
    }
});
exports.getProductsByType = getProductsByType;
// This function is used to get product type list
const getProductTypeList = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const productTypes = yield (0, productType_1.getProductTypes)();
        res.status(200).json({ success: true, data: productTypes });
    }
    catch (error) {
        console.log("================ Error while getting product type list ================", error);
        if (error instanceof Error) {
            res.status(409).json({ success: false, message: error.message });
        }
        else {
            res.status(409).json({ success: false, message: 'Something went wrong' });
        }
    }
});
exports.getProductTypeList = getProductTypeList;
// 
const getProductDetails = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        if (!req.query.payload) {
            return res.status(406).json({ success: false, message: 'Request data missing or invalid' });
        }
        const payloadStr = (0, authService_1.getStringFromQuery)(req.query.payload, 'payload');
        const params = (0, authService_1.decryptData)(payloadStr);
        if (!params || !params.id) {
            return res.status(406).json({ success: false, message: 'Request data missing or invalid' });
        }
        const searchQuery = {
            where: {
                id: params.id
            },
            include: [
                { model: productType_2.ProductType, attributes: ['id', 'name'] },
                { model: variant_1.Variant, attributes: ['id', 'size', 'color', 'price', 'stock', 'sku'] },
                { model: addon_1.Addon, attributes: ['id', 'name', 'price'] }
            ]
        };
        const product = yield (0, product_1.getProduct)(searchQuery);
        res.status(200).json({ success: true, data: product });
    }
    catch (error) {
        console.log("================ Error while getting product details ================", error);
        if (error instanceof Error) {
            res.status(409).json({ success: false, message: error.message });
        }
        else {
            res.status(409).json({ success: false, message: 'Something went wrong' });
        }
    }
});
exports.getProductDetails = getProductDetails;
