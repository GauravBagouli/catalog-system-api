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
exports.addVariant = void 0;
const authService_1 = require("../services/authService");
const product_1 = require("../data/managers/product");
const variant_1 = require("../data/managers/variant");
//This controller is used to add product
const addVariant = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        if (!req.body.payload) {
            return res.status(406).json({ success: false, message: 'Request data missing or invalid' });
        }
        const params = (0, authService_1.decryptData)(req.body.payload);
        if (!params || !params.product_id || !params.price || !params.stock || !params.size || !params.color || !params.sku) {
            return res.status(406).json({ success: false, message: 'Request data missing or invalid' });
        }
        if (typeof params.product_id !== 'number' ||
            typeof params.price !== 'number' ||
            typeof params.stock !== 'number') {
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
        const duplicateVarientQuery = {
            where: {
                product_id: params.product_id,
                size: params.size,
                color: params.color,
                sku: params.sku
            },
            attributes: ['id']
        };
        let duplicateVariant = yield (0, variant_1.getOneVariant)(duplicateVarientQuery);
        if (duplicateVariant !== null) {
            return res.status(409).json({ success: false, message: 'Variant already exists with same size, color and sku' });
        }
        const payload = {
            product_id: params.product_id,
            size: params.size,
            color: params.color,
            price: params.price,
            stock: params.stock,
            sku: params.sku
        };
        yield (0, variant_1.createVariant)(payload);
        res.status(200).json({ success: true, message: 'Variant added successfully' });
    }
    catch (error) {
        console.log("================ Error while adding variant ================", error);
        if (error instanceof Error) {
            res.status(409).json({ success: false, message: error.message });
        }
        else {
            res.status(409).json({ success: false, message: 'Something went wrong' });
        }
    }
});
exports.addVariant = addVariant;
