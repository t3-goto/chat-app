"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.setAuthMiddleware = void 0;
const tslib_1 = require("tslib");
const tokenInvalidError_1 = require("./../errors/tokenInvalidError");
const jwt_1 = require("./../helpers/jwt");
const response_1 = require("./../helpers/response");
const TOKEN_HEADER = 'x-auth-token';
const BEARER = 'Bearer';
const validateAuthHeader = (req) => {
    var _a;
    return (req.headers == null ||
        req.headers[TOKEN_HEADER] == null ||
        req.headers[TOKEN_HEADER] === undefined ||
        !((_a = req.headers[TOKEN_HEADER]) === null || _a === void 0 ? void 0 : _a.includes(BEARER)));
};
exports.setAuthMiddleware = (req, res, next) => tslib_1.__awaiter(void 0, void 0, void 0, function* () {
    try {
        if (validateAuthHeader(req)) {
            throw new tokenInvalidError_1.TokenInvalidError();
        }
        const token = jwt_1.stripBearer(req.headers[TOKEN_HEADER]);
        yield jwt_1.verifyToken(token).catch((err) => {
            throw new tokenInvalidError_1.TokenInvalidError(err.message);
        });
        next();
    }
    catch (e) {
        if (e instanceof tokenInvalidError_1.TokenInvalidError) {
            const response = new response_1.Response({
                error: {
                    code: 'MIAU000001',
                    message: 'Authentication error occurs',
                },
            });
            return response_1.sendResponse(res, 422, response);
        }
        {
            const response = new response_1.Response({
                error: {
                    code: 'MIAU000002',
                    message: 'Some internal server error occurs',
                },
            });
            return response_1.sendResponse(res, 500, response);
        }
    }
});
