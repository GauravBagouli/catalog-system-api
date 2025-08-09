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
exports.getProductTypes = exports.getProductType = exports.createProductType = void 0;
const productType_1 = require("../models/productType");
const errorLib_1 = require("../../lib/errorLib");
/**
 * Creates a new product type
 * @param payload - Partial product type data for creation
 * @returns Created product type as plain JSON
 */
const createProductType = (payload) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const result = yield productType_1.ProductType.create(payload);
        return result.get({ plain: true });
    }
    catch (err) {
        throw (0, errorLib_1.generateErrorMsg)('ProductTypeManager.createProductType', err);
    }
});
exports.createProductType = createProductType;
/**
 * Get a product type with optional filters
 * @param options - Sequelize find options (e.g., where, limit, order)
 * @returns One product type as plain JSON
 */
const getProductType = (...args_1) => __awaiter(void 0, [...args_1], void 0, function* (options = {}) {
    try {
        const result = yield productType_1.ProductType.findOne(options);
        if (!result)
            return null;
        return result.get({ plain: true });
    }
    catch (err) {
        throw (0, errorLib_1.generateErrorMsg)('ProductTypeManager.getProductType', err);
    }
});
exports.getProductType = getProductType;
/**
 * Get all product type with optional filters
 * @param options - Sequelize find options (e.g., where, limit, order)
 * @returns Array of product types as plain JSON
 */
const getProductTypes = (...args_1) => __awaiter(void 0, [...args_1], void 0, function* (options = {}) {
    try {
        const result = yield productType_1.ProductType.findAll(options);
        return result.map(productType => productType.get({ plain: true }));
    }
    catch (err) {
        throw (0, errorLib_1.generateErrorMsg)('ProductTypeManager.getProductTypes', err);
    }
});
exports.getProductTypes = getProductTypes;
