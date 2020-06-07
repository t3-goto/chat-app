"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.RecordNotFoundError = void 0;
class RecordNotFoundError extends Error {
    constructor(message = 'target record is not founc') {
        super(message);
        this.message = message;
        this.name = 'RecordNotFoundError';
    }
}
exports.RecordNotFoundError = RecordNotFoundError;
