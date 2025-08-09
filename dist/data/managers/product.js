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
exports.getProduct = exports.getProducts = exports.createProduct = void 0;
const product_1 = require("../models/product");
const errorLib_1 = require("../../lib/errorLib");
/**
 * Creates a new product
 * @param payload - Partial product data for creation
 * @returns Created product as plain JSON
 */
const createProduct = (payload) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const result = yield product_1.Product.create(payload);
        return result.get({ plain: true });
    }
    catch (err) {
        throw (0, errorLib_1.generateErrorMsg)('ProductManager.createProduct', err);
    }
});
exports.createProduct = createProduct;
/**
 * Get all products with optional filters
 * @param options - Sequelize find options (e.g., where, limit, order)
 * @returns Array of products as plain JSON
 */
const getProducts = (...args_1) => __awaiter(void 0, [...args_1], void 0, function* (options = {}) {
    try {
        const result = yield product_1.Product.findAll(options);
        return result.map(product => product.get({ plain: true }));
    }
    catch (err) {
        throw (0, errorLib_1.generateErrorMsg)('ProductManager.getProducts', err);
    }
});
exports.getProducts = getProducts;
/**
 * Get one product with optional filters
 * @param options - Sequelize find options (e.g., where, limit, order)
 * @returns One product as plain JSON
 */
const getProduct = (...args_1) => __awaiter(void 0, [...args_1], void 0, function* (options = {}) {
    try {
        const result = yield product_1.Product.findOne(options);
        if (!result)
            return null;
        return result.get({ plain: true });
    }
    catch (err) {
        throw (0, errorLib_1.generateErrorMsg)('ProductManager.getProduct', err);
    }
});
exports.getProduct = getProduct;
