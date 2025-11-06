"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.deepClone = deepClone;
function deepClone(obj) {
    return JSON.parse(JSON.stringify(obj));
}
