"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.generateErrorMsg = void 0;
const moment_timezone_1 = __importDefault(require("moment-timezone"));
const generateErrorMsg = (mgrName, err) => {
    if (err.parent && err.parent.message) {
        const message = typeof err.parent.message === 'string' ? err.parent.message : err.parent.message.join(' ');
        if (message.includes('Conversion failed')) {
            err.message = 'Invalid data type';
        }
        if (message.includes('duplicate key')) {
            err.message = 'Required Unique Data';
        }
        if (message.includes('Invalid column name')) {
            err.message = 'Invalid Column';
        }
        if (message.includes('Unclosed quotation mark') ||
            message.includes('Incorrect syntax near')) {
            err.message = 'Invalid Query';
        }
        console.log({
            Time: (0, moment_timezone_1.default)().toISOString(),
            MgrName: mgrName,
            error: message,
            sql: err.parent.sql,
        });
    }
    else {
        console.log({
            Time: (0, moment_timezone_1.default)().toISOString(),
            MgrName: mgrName,
            error: err,
        });
    }
    return err;
};
exports.generateErrorMsg = generateErrorMsg;
