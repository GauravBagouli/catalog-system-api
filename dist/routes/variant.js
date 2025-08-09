"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const variant_1 = require("../controllers/variant");
const router = express_1.default.Router();
// Routes
router.post('/create', variant_1.addVariant);
exports.default = router;
