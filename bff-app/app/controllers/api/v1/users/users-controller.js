"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteUser = exports.updateUser = exports.getUser = exports.getUsers = exports.addUser = void 0;
const tslib_1 = require("tslib");
const moment_1 = tslib_1.__importDefault(require("moment"));
const databaseError_1 = require("./../../../../errors/databaseError");
const paramsValidationError_1 = require("./../../../../errors/paramsValidationError");
const recordNotFoundError_1 = require("./../../../../errors/recordNotFoundError");
const bcrypt_1 = require("./../../../../helpers/bcrypt");
const response_1 = require("./../../../../helpers/response");
const user_1 = require("./../../../../models/user");
const validate_1 = require("./../../../concerns/validate");
const users_response_1 = require("./users-response");
exports.addUser = (req, res) => tslib_1.__awaiter(void 0, void 0, void 0, function* () {
    try {
        yield validate_1.validateRequestBody(req, ['email', 'password', 'provider']);
        const today = moment_1.default().format('YYYYMMDD');
        const user = new user_1.User({
            email: req.body.email,
            password: bcrypt_1.genHash(req.body.password),
            firstName: req.body.firstName,
            lastName: req.body.lastName,
            provider: req.body.provider,
            loginDate: '',
            reqDate: today,
            modDate: today,
        });
        yield user_1.UserDbDao.insert(user);
        const response = new users_response_1.AddUserResponse({ data: user });
        return response_1.sendResponse(res, 201, response);
    }
    catch (e) {
        if (e instanceof paramsValidationError_1.ParamsValidationError) {
            const response = new users_response_1.AddUserResponse({
                error: {
                    code: 'COCOPO0001',
                    message: e.message !== null
                        ? e.message
                        : 'Some request parameter is invalid',
                },
            });
            return response_1.sendResponse(res, 422, response);
        }
        if (e instanceof databaseError_1.DatabaseError) {
            const response = new users_response_1.AddUserResponse({
                error: {
                    code: 'COUSPO0002',
                    message: e.message !== null
                        ? e.message
                        : 'Some internal server error occurs',
                },
            });
            return response_1.sendResponse(res, 500, response);
        }
        else {
            const response = new users_response_1.AddUserResponse({
                error: {
                    code: 'COUSPO0003',
                    message: 'Some internal server error occurs',
                },
            });
            return response_1.sendResponse(res, 500, response);
        }
    }
});
exports.getUsers = (req, res) => tslib_1.__awaiter(void 0, void 0, void 0, function* () {
    try {
        const users = yield user_1.UserDbDao.selectAll();
        const response = new users_response_1.GetUsersResponse({
            data: users,
        });
        return response_1.sendResponse(res, 200, response);
    }
    catch (e) {
        if (e instanceof databaseError_1.DatabaseError) {
            const response = new users_response_1.GetUsersResponse({
                error: {
                    code: 'COUSGE0001',
                    message: e.message !== null
                        ? e.message
                        : 'Some internal server error occurs',
                },
            });
            return response_1.sendResponse(res, 500, response);
        }
        {
            const response = new users_response_1.GetUsersResponse({
                error: {
                    code: 'COUSGE0002',
                    message: 'Some internal server error occurs',
                },
            });
            return response_1.sendResponse(res, 500, response);
        }
    }
});
exports.getUser = (req, res) => tslib_1.__awaiter(void 0, void 0, void 0, function* () {
    try {
        yield validate_1.validateRequestParams(req, ['id']);
        const userId = req.params.id;
        const user = yield user_1.UserDbDao.selectById(userId);
        const response = new users_response_1.GetUserResponse({
            data: user,
        });
        return response_1.sendResponse(res, 200, response);
    }
    catch (e) {
        if (e instanceof paramsValidationError_1.ParamsValidationError) {
            const response = new users_response_1.GetUserResponse({
                error: {
                    code: 'COUSGE1001',
                    message: e.message !== null
                        ? e.message
                        : 'Some request parameter is invalid',
                },
            });
            return response_1.sendResponse(res, 404, response);
        }
        if (e instanceof databaseError_1.DatabaseError) {
            const response = new users_response_1.GetUserResponse({
                error: {
                    code: 'COUSGE0002',
                    message: e.message !== null
                        ? e.message
                        : 'Some internal server error occurs',
                },
            });
            return response_1.sendResponse(res, 500, response);
        }
        else if (e instanceof recordNotFoundError_1.RecordNotFoundError) {
            const response = new users_response_1.GetUserResponse({
                error: {
                    code: 'COUSGE0003',
                    message: e.message !== null ? e.message : 'Target User IS Not Found',
                },
            });
            return response_1.sendResponse(res, 404, response);
        }
        else {
            const response = new users_response_1.GetUserResponse({
                error: {
                    code: 'COUSGE1004',
                    message: 'Some internal server error occurs',
                },
            });
            return response_1.sendResponse(res, 500, response);
        }
    }
});
exports.updateUser = (req, res) => tslib_1.__awaiter(void 0, void 0, void 0, function* () {
    try {
        yield validate_1.validateRequestParams(req, ['id']);
        yield validate_1.validateRequestBody(req, ['email', 'password', 'provider']);
        const userId = req.params.id;
        const user = yield user_1.UserDbDao.selectById(userId);
        const isModifiedObj = {
            email: false,
            password: false,
            firstName: false,
            lastName: false,
            provider: false,
        };
        if (user.email !== req.body.email) {
            isModifiedObj.email = true;
            user.email = req.body.email;
        }
        if (user.firstName !== req.body.firstName) {
            isModifiedObj.firstName = true;
            user.firstName = req.body.firstName;
        }
        if (user.lastName !== req.body.lastName) {
            isModifiedObj.lastName = true;
            user.lastName = req.body.lastName;
        }
        if (user.provider !== req.body.provider) {
            isModifiedObj.provider = true;
            user.provider = req.body.provider;
        }
        if (!bcrypt_1.comparePlainWithHash(req.body.password, user.password)) {
            isModifiedObj.password = true;
            console.log(user.password);
            user.password = bcrypt_1.genHash(req.body.password);
        }
        let isModified = false;
        for (const isModifiedObjKey in isModifiedObj) {
            if (isModifiedObj[isModifiedObjKey]) {
                isModified = true;
                break;
            }
        }
        if (isModified) {
            user.modDate = moment_1.default().format('YYYYMMDD');
            yield user_1.UserDbDao.update(user);
            const response = new users_response_1.UpdateUserResponse({
                data: user,
            });
            return response_1.sendResponse(res, 200, response);
        }
        {
            const response = new users_response_1.UpdateUserResponse({});
            return response_1.sendResponse(res, 304, response);
        }
    }
    catch (e) {
        if (e instanceof paramsValidationError_1.ParamsValidationError) {
            const response = new users_response_1.UpdateUserResponse({
                error: {
                    code: 'COUSPU0001',
                    message: e.message !== null
                        ? e.message
                        : 'Some request parameter is invalid',
                },
            });
            return response_1.sendResponse(res, 404, response);
        }
        if (e instanceof databaseError_1.DatabaseError) {
            const response = new users_response_1.UpdateUserResponse({
                error: {
                    code: 'COUSPU0002',
                    message: e.message !== null
                        ? e.message
                        : 'Some internal server error occurs',
                },
            });
            return response_1.sendResponse(res, 500, response);
        }
        else if (e instanceof recordNotFoundError_1.RecordNotFoundError) {
            const response = new users_response_1.UpdateUserResponse({
                error: {
                    code: 'COUSPU0003',
                    message: e.message !== null ? e.message : 'Target User IS Not Found',
                },
            });
            return response_1.sendResponse(res, 404, response);
        }
        else {
            const response = new users_response_1.UpdateUserResponse({
                error: {
                    code: 'COUSPU0004',
                    message: 'Some internal server error occurs',
                },
            });
            return response_1.sendResponse(res, 500, response);
        }
    }
});
exports.deleteUser = (req, res) => tslib_1.__awaiter(void 0, void 0, void 0, function* () {
    try {
        yield validate_1.validateRequestParams(req, ['id']);
        const userId = req.params.id;
        const user = yield user_1.UserDbDao.selectById(userId);
        yield user_1.UserDbDao.delete(user);
        const response = new users_response_1.DeleteUserResponse({});
        return response_1.sendResponse(res, 204, response);
    }
    catch (e) {
        if (e instanceof paramsValidationError_1.ParamsValidationError) {
            const response = new users_response_1.DeleteUserResponse({
                error: {
                    code: 'COUSDE0001',
                    message: e.message !== null
                        ? e.message
                        : 'Some request parameter is invalid',
                },
            });
            return response_1.sendResponse(res, 404, response);
        }
        if (e instanceof databaseError_1.DatabaseError) {
            const response = new users_response_1.DeleteUserResponse({
                error: {
                    code: 'COUSDE0002',
                    message: e.message !== null
                        ? e.message
                        : 'Some internal server error occurs',
                },
            });
            return response_1.sendResponse(res, 500, response);
        }
        else if (e instanceof recordNotFoundError_1.RecordNotFoundError) {
            const response = new users_response_1.DeleteUserResponse({
                error: {
                    code: 'COUSDE0003',
                    message: e.message !== null ? e.message : 'Target User IS Not Found',
                },
            });
            return response_1.sendResponse(res, 404, response);
        }
        else {
            const response = new users_response_1.DeleteUserResponse({
                error: {
                    code: 'COUSDE0004',
                    message: 'Some internal server error occurs',
                },
            });
            return response_1.sendResponse(res, 500, response);
        }
    }
});
