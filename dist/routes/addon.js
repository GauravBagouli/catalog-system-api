"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const addon_1 = require("../controllers/addon");
const router = express_1.default.Router();
// Routes
router.post('/create', addon_1.addAddon);
exports.default = router;
