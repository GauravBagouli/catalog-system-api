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
exports.bulkCreateAddons = exports.getOneAddon = exports.getAllAddons = exports.createAddon = void 0;
const errorLib_1 = require("../../lib/errorLib");
const addon_1 = require("../models/addon");
/**
 * Creates a new addon
 * @param payload - Partial addon data for creation
 * @returns Created addon as plain JSON
 */
const createAddon = (payload) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const result = yield addon_1.Addon.create(payload);
        return result.get({ plain: true });
    }
    catch (err) {
        throw (0, errorLib_1.generateErrorMsg)('AddonManager.createAddon', err);
    }
});
exports.createAddon = createAddon;
/**
 * Get all addon with optional filters
 * @param options - Sequelize find options (e.g., where, limit, order)
 * @returns Array of addon as plain JSON
 */
const getAllAddons = (...args_1) => __awaiter(void 0, [...args_1], void 0, function* (options = {}) {
    try {
        const result = yield addon_1.Addon.findAll(options);
        return result.map(addon => addon.get({ plain: true }));
    }
    catch (err) {
        throw (0, errorLib_1.generateErrorMsg)('AddonManager.getAllAddons', err);
    }
});
exports.getAllAddons = getAllAddons;
/**
 * Get one addon with optional filters
 * @param options - Sequelize find options (e.g., where, limit, order)
 * @returns One addon as plain JSON
 */
const getOneAddon = (...args_1) => __awaiter(void 0, [...args_1], void 0, function* (options = {}) {
    try {
        const result = yield addon_1.Addon.findOne(options);
        if (!result)
            return null;
        return result.get({ plain: true });
    }
    catch (err) {
        throw (0, errorLib_1.generateErrorMsg)('AddonManager.getOneAddon', err);
    }
});
exports.getOneAddon = getOneAddon;
/**
 * Creates multiple addons in bulk
 * @param payload - Array of addon data for creation
 * @returns Array of created addons as plain JSON
 */
const bulkCreateAddons = (payload) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const results = yield addon_1.Addon.bulkCreate(payload);
        return results.map(r => r.get({ plain: true }));
    }
    catch (err) {
        throw (0, errorLib_1.generateErrorMsg)('AddonManager.bulkCreateAddons', err);
    }
});
exports.bulkCreateAddons = bulkCreateAddons;
