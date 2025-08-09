"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Variant = void 0;
const sequelize_1 = require("sequelize");
const connection_1 = __importDefault(require("../connection/connection"));
const product_1 = require("./product");
class Variant extends sequelize_1.Model {
}
exports.Variant = Variant;
Variant.init({
    id: {
        type: sequelize_1.DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
    },
    product_id: {
        type: sequelize_1.DataTypes.INTEGER,
        allowNull: false,
    },
    size: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: false
    },
    color: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: false
    },
    price: {
        type: sequelize_1.DataTypes.FLOAT,
        allowNull: false
    },
    stock: {
        type: sequelize_1.DataTypes.INTEGER,
        allowNull: false
    },
    sku: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: false
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
    modelName: 'Variant',
});
Variant.belongsTo(product_1.Product, {
    foreignKey: 'product_id',
    targetKey: 'id'
});
product_1.Product.hasMany(Variant, {
    foreignKey: 'product_id',
    sourceKey: 'id'
});
