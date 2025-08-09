"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Addon = void 0;
const sequelize_1 = require("sequelize");
const product_1 = require("./product");
const connection_1 = __importDefault(require("../connection/connection"));
class Addon extends sequelize_1.Model {
}
exports.Addon = Addon;
Addon.init({
    id: {
        type: sequelize_1.DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
    },
    product_id: {
        type: sequelize_1.DataTypes.INTEGER,
        allowNull: false,
    },
    name: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: false
    },
    price: {
        type: sequelize_1.DataTypes.FLOAT,
        allowNull: false
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
    modelName: 'Addon',
});
Addon.belongsTo(product_1.Product, {
    foreignKey: 'product_id',
    targetKey: 'id'
});
product_1.Product.hasMany(Addon, {
    foreignKey: 'product_id',
    sourceKey: 'id'
});
