"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ParamsValidationError = void 0;
class ParamsValidationError extends Error {
    constructor(message = 'params are missing') {
        super(message);
        this.message = message;
        this.name = 'ParamsValidationError';
    }
}
exports.ParamsValidationError = ParamsValidationError;
