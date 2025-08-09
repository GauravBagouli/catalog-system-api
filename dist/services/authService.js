"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.decryptData = exports.encryptData = void 0;
exports.getStringFromQuery = getStringFromQuery;
const encryptData = (data) => {
    try {
        const json = JSON.stringify(data);
        const uriEncoded = encodeURI(json);
        const base64Encoded = btoa(uriEncoded);
        return base64Encoded;
    }
    catch (error) {
        throw new Error('Data encryption failed');
    }
};
exports.encryptData = encryptData;
const decryptData = (data) => {
    try {
        const base64Decoded = atob(data);
        const uriDecoded = decodeURI(base64Decoded);
        return JSON.parse(uriDecoded);
    }
    catch (error) {
        throw new Error('Data decryption failed');
    }
};
exports.decryptData = decryptData;
function getStringFromQuery(queryParam, paramName) {
    if (typeof queryParam !== 'string') {
        throw new Error(`Query param '${paramName}' is not a string`);
    }
    return queryParam;
}
