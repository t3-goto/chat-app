"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.stripBearer = exports.verifyToken = exports.genToken = void 0;
const tslib_1 = require("tslib");
const jsonwebtoken_1 = tslib_1.__importDefault(require("jsonwebtoken"));
const env_1 = require("./../config/env");
const jwt_1 = require("./../config/jwt");
const systemError_1 = require("./../errors/systemError");
const tokenInvalidError_1 = require("./../errors/tokenInvalidError");
exports.genToken = (payload) => {
    return new Promise((resovle, reject) => {
        try {
            if (env_1.envVars.SECRET_KEY === undefined) {
                return reject(new systemError_1.SystemError());
            }
            const token = jsonwebtoken_1.default.sign({ payload }, env_1.envVars.SECRET_KEY, Object.assign({}, jwt_1.jwtConfigParam));
            return resovle(token);
        }
        catch (_a) {
            return reject(new systemError_1.SystemError());
        }
    });
};
exports.verifyToken = (token) => {
    return new Promise((resolve, reject) => {
        if (env_1.envVars.SECRET_KEY === undefined) {
            return reject(new systemError_1.SystemError());
        }
        jsonwebtoken_1.default.verify(token, env_1.envVars.SECRET_KEY, (err, decoded) => {
            if (err) {
                return reject(new tokenInvalidError_1.TokenInvalidError('token is invalid'));
            }
            if (decoded === undefined) {
                return reject(new tokenInvalidError_1.TokenInvalidError('decoded payload is not found'));
            }
            return resolve(decoded);
        });
    });
};
exports.stripBearer = (value) => {
    if (value === null) {
        throw new systemError_1.SystemError();
    }
    return value.replace(/Bearer\s/, '');
};
