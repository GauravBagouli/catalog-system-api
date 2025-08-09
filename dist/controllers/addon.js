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
exports.addAddon = void 0;
const authService_1 = require("../services/authService");
const product_1 = require("../data/managers/product");
const addon_1 = require("../data/managers/addon");
//This controller is used to add product
const addAddon = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        if (!req.body.payload) {
            return res.status(406).json({ success: false, message: 'Request data missing or invalid' });
        }
        const params = (0, authService_1.decryptData)(req.body.payload);
        if (!params || !params.product_id || !params.price || !params.name) {
            return res.status(406).json({ success: false, message: 'Request data missing or invalid' });
        }
        if (typeof params.product_id !== 'number' ||
            typeof params.price !== 'number' ||
            typeof params.name !== 'string') {
            return res.status(406).json({ success: false, message: 'Invalid product payload' });
        }
        const productQuery = {
            where: {
                id: params.product_id
            },
            attributes: ['id']
        };
        let product = yield (0, product_1.getProduct)(productQuery);
        if (product === null) {
            return res.status(409).json({ success: false, message: 'Product not found' });
        }
        const duplicateAddonQuery = {
            where: {
                product_id: params.product_id,
                name: params.name,
                price: params.price
            },
            attributes: ['id']
        };
        let duplicateAddon = yield (0, addon_1.getOneAddon)(duplicateAddonQuery);
        if (duplicateAddon !== null) {
            return res.status(409).json({ success: false, message: 'Addon already exists with same name and price' });
        }
        const payload = {
            product_id: params.product_id,
            name: params.name,
            price: params.price
        };
        yield (0, addon_1.createAddon)(payload);
        res.status(200).json({ success: true, message: 'Addon added successfully' });
    }
    catch (error) {
        console.log("================ Error while adding addon ================", error);
        if (error instanceof Error) {
            res.status(409).json({ success: false, message: error.message });
        }
        else {
            res.status(409).json({ success: false, message: 'Something went wrong' });
        }
    }
});
exports.addAddon = addAddon;
