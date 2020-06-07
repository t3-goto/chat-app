"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createSession = void 0;
const tslib_1 = require("tslib");
const moment_1 = tslib_1.__importDefault(require("moment"));
const databaseError_1 = require("./../../../../errors/databaseError");
const paramsNotIncorrectError_1 = require("./../../../../errors/paramsNotIncorrectError");
const paramsValidationError_1 = require("./../../../../errors/paramsValidationError");
const recordNotFoundError_1 = require("./../../../../errors/recordNotFoundError");
const bcrypt_1 = require("./../../../../helpers/bcrypt");
const jwt_1 = require("./../../../../helpers/jwt");
const response_1 = require("./../../../../helpers/response");
const user_1 = require("./../../../../models/user");
const validate_1 = require("./../../../concerns/validate");
const sessions_response_1 = require("./sessions-response");
exports.createSession = (req, res) => tslib_1.__awaiter(void 0, void 0, void 0, function* () {
    try {
        yield validate_1.validateRequestBody(req, ['email', 'password', 'provider']);
        const user = yield user_1.UserDbDao.selectByEmail(req.body.email);
        if (!bcrypt_1.comparePlainWithHash(req.body.password, user.password)) {
            throw new paramsNotIncorrectError_1.ParamsNotIncorrectError('Password Is Incorrect');
        }
        const today = moment_1.default().format('YYYYMMDD');
        if (user.loginDate !== today) {
            user.loginDate = today;
            yield user_1.UserDbDao.update(user);
        }
        const payload = {
            userId: user.id,
        };
        const token = yield jwt_1.genToken(payload);
        const response = new sessions_response_1.CreateSessionResponse({ data: { token } });
        return response_1.sendResponse(res, 200, response);
    }
    catch (e) {
        if (e instanceof paramsValidationError_1.ParamsValidationError) {
            const response = new sessions_response_1.CreateSessionResponse({
                error: {
                    code: 'COSEPO0001',
                    message: 'Some request parameter is invalid',
                },
            });
            return response_1.sendResponse(res, 422, response);
        }
        if (e instanceof databaseError_1.DatabaseError) {
            const response = new sessions_response_1.CreateSessionResponse({
                error: {
                    code: 'COSEPO0002',
                    message: e.message !== null
                        ? e.message
                        : 'Some internal server error occurs',
                },
            });
            return response_1.sendResponse(res, 500, response);
        }
        else if (e instanceof recordNotFoundError_1.RecordNotFoundError) {
            const response = new sessions_response_1.CreateSessionResponse({
                error: {
                    code: 'COSEPO0003',
                    message: e.message !== null ? e.message : 'Target User IS Not Found',
                },
            });
            return response_1.sendResponse(res, 404, response);
        }
        else if (e instanceof paramsNotIncorrectError_1.ParamsNotIncorrectError) {
            const response = new sessions_response_1.CreateSessionResponse({
                error: {
                    code: 'COSEPO0004',
                    message: e.message !== null ? e.message : 'Target Params Are Not Incorrect',
                },
            });
            return response_1.sendResponse(res, 404, response);
        }
        else {
            const response = new sessions_response_1.CreateSessionResponse({
                error: {
                    code: 'COSEPO0005',
                    message: 'Some internal server error occurs',
                },
            });
            return response_1.sendResponse(res, 500, response);
        }
    }
});
