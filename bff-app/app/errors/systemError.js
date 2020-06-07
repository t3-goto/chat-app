"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SystemError = void 0;
class SystemError extends Error {
    constructor(message = 'system error occurs') {
        super(message);
        this.message = message;
        this.name = 'SystemError';
    }
}
exports.SystemError = SystemError;
