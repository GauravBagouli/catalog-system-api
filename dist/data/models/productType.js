"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ProductType = void 0;
const sequelize_1 = require("sequelize");
const connection_1 = __importDefault(require("../connection/connection"));
class ProductType extends sequelize_1.Model {
}
exports.ProductType = ProductType;
ProductType.init({
    id: {
        type: sequelize_1.DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
    },
    name: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: false,
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
    modelName: 'ProductType',
});
