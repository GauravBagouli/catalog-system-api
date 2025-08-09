"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Product = void 0;
const sequelize_1 = require("sequelize");
const productType_1 = require("./productType");
const connection_1 = __importDefault(require("../connection/connection"));
class Product extends sequelize_1.Model {
}
exports.Product = Product;
Product.init({
    id: {
        type: sequelize_1.DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
    },
    product_type_id: {
        type: sequelize_1.DataTypes.INTEGER,
        allowNull: false,
    },
    name: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: false,
    },
    description: {
        type: sequelize_1.DataTypes.TEXT,
        allowNull: true
    },
    product_images: {
        type: sequelize_1.DataTypes.ARRAY(sequelize_1.DataTypes.JSON),
        defaultValue: [],
    },
    status: {
        type: sequelize_1.DataTypes.STRING(25),
        allowNull: false,
        defaultValue: 'Active'
    },
    created_at: {
        type: sequelize_1.DataTypes.DATE,
        allowNull: false,
        defaultValue: sequelize_1.DataTypes.NOW,
    },
    updated_at: {
        type: sequelize_1.DataTypes.DATE,
        allowNull: false,
        defaultValue: sequelize_1.DataTypes.NOW,
    },
}, {
    createdAt: 'created_at',
    updatedAt: 'updated_at',
    sequelize: connection_1.default,
    modelName: 'Product',
});
Product.belongsTo(productType_1.ProductType, {
    foreignKey: 'product_type_id',
    targetKey: 'id'
});
productType_1.ProductType.hasMany(Product, {
    foreignKey: 'product_type_id',
    sourceKey: 'id'
});
