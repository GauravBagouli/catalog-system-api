"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = require("sequelize");
const { DB_NAME, DB_USERNAME, DB_PASSWORD, DB_HOST, DB_PORT, } = process.env;
if (!DB_NAME || !DB_USERNAME || !DB_PASSWORD || !DB_HOST || !DB_PORT) {
    throw new Error('⛔ Missing required database environment variables.');
}
const isProduction = process.env.NODE_ENV === 'production';
const sequelize = new sequelize_1.Sequelize(DB_NAME, DB_USERNAME, DB_PASSWORD, {
    logging: false,
    host: DB_HOST,
    dialect: 'postgres',
    ssl: false,
    port: Number(DB_PORT || 5432),
    dialectOptions: isProduction
        ? {
            ssl: {
                require: true,
                rejectUnauthorized: false,
            },
        }
        : {},
    define: {
        freezeTableName: true,
        schema: 'public'
    },
    pool: {
        max: 10,
        min: 1,
        acquire: 20000,
        idle: 20000
    }
});
sequelize.sync()
    .then(() => {
    console.log("Database Successfully Connected...");
})
    .catch((err) => {
    console.error("Database Connection Error:", err);
});
exports.default = sequelize;
