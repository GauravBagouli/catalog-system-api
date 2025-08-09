"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
// server.ts
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const morgan_1 = __importDefault(require("morgan"));
const dotenv_1 = __importDefault(require("dotenv"));
const cookie_parser_1 = __importDefault(require("cookie-parser"));
const body_parser_1 = __importDefault(require("body-parser"));
dotenv_1.default.config();
require("./data/connection/connection");
require("./data/loadModels");
const product_1 = __importDefault(require("./routes/product"));
const variant_1 = __importDefault(require("./routes/variant"));
const addon_1 = __importDefault(require("./routes/addon"));
const app = (0, express_1.default)();
const PORT = process.env.PORT || 3001;
// Middlewares
app.use((0, cors_1.default)());
app.use((0, morgan_1.default)('dev'));
app.use((0, cookie_parser_1.default)());
app.use(body_parser_1.default.json({ limit: '50mb' }));
app.use(body_parser_1.default.urlencoded({ extended: true, limit: '50mb' }));
// Health check
app.get('/server/health', (req, res) => {
    res.json({ success: true, message: 'Catalog API running fine 🚀' });
});
// Routes
app.use('/api/product', product_1.default);
app.use('/api/variant', variant_1.default);
app.use('/api/addon', addon_1.default);
// Server start
app.listen(PORT, () => {
    console.log(`🚀 Server is live at port:${PORT}`);
});
