"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ParamsNotIncorrectError = void 0;
class ParamsNotIncorrectError extends Error {
    constructor(message = 'Target Params are not incorrect') {
        super(message);
        this.message = message;
        this.name = 'ParamsNotIncorrectError';
    }
}
exports.ParamsNotIncorrectError = ParamsNotIncorrectError;
