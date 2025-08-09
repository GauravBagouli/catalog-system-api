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
exports.getOneVariant = exports.getAllVariants = exports.bulkCreateVariants = exports.createVariant = void 0;
const errorLib_1 = require("../../lib/errorLib");
const variant_1 = require("../models/variant");
/**
 * Creates a new varient
 * @param payload - Partial varient data for creation
 * @returns Created varient as plain JSON
 */
const createVariant = (payload) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const result = yield variant_1.Variant.create(payload);
        return result.get({ plain: true });
    }
    catch (err) {
        throw (0, errorLib_1.generateErrorMsg)('VariantManager.createVariant', err);
    }
});
exports.createVariant = createVariant;
/**
 * Creates multiple variants in bulk
 * @param payload - Array of variant data for creation
 * @returns Array of created variants as plain JSON
 */
const bulkCreateVariants = (payload) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const results = yield variant_1.Variant.bulkCreate(payload);
        return results.map(r => r.get({ plain: true }));
    }
    catch (err) {
        throw (0, errorLib_1.generateErrorMsg)('VariantManager.bulkCreateVariants', err);
    }
});
exports.bulkCreateVariants = bulkCreateVariants;
/**
 * Get all varient with optional filters
 * @param options - Sequelize find options (e.g., where, limit, order)
 * @returns Array of products as plain JSON
 */
const getAllVariants = (...args_1) => __awaiter(void 0, [...args_1], void 0, function* (options = {}) {
    try {
        const result = yield variant_1.Variant.findAll(options);
        return result.map(variant => variant.get({ plain: true }));
    }
    catch (err) {
        throw (0, errorLib_1.generateErrorMsg)('VariantManager.getAllVariants', err);
    }
});
exports.getAllVariants = getAllVariants;
/**
 * Get one variant with optional filters
 * @param options - Sequelize find options (e.g., where, limit, order)
 * @returns One variant as plain JSON
 */
const getOneVariant = (...args_1) => __awaiter(void 0, [...args_1], void 0, function* (options = {}) {
    try {
        const result = yield variant_1.Variant.findOne(options);
        if (!result)
            return null;
        return result.get({ plain: true });
    }
    catch (err) {
        throw (0, errorLib_1.generateErrorMsg)('VariantManager.getOneVariant', err);
    }
});
exports.getOneVariant = getOneVariant;
