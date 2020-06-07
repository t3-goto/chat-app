"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.TokenInvalidError = void 0;
class TokenInvalidError extends Error {
    constructor(message = 'invalid token error occurs') {
        super(message);
        this.message = message;
        this.name = 'TokenInvalidError';
    }
}
exports.TokenInvalidError = TokenInvalidError;
