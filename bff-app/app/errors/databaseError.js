"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DatabaseError = void 0;
class DatabaseError extends Error {
    constructor(message = 'database connection error occurs') {
        super(message);
        this.message = message;
        this.name = 'DatabaseError';
    }
}
exports.DatabaseError = DatabaseError;
