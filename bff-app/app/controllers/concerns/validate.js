"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.validateRequestParams = exports.validateRequestBody = void 0;
const paramsValidationError_1 = require("./../../errors/paramsValidationError");
exports.validateRequestBody = (req, params) => {
    return new Promise((resolve, reject) => {
        if (!req.body == null) {
            return reject(new paramsValidationError_1.ParamsValidationError('Request body is not setted'));
        }
        params.forEach((param) => {
            if (req.body[param] == null) {
                return reject(new paramsValidationError_1.ParamsValidationError('Some required request body is not setted'));
            }
        });
        return resolve();
    });
};
exports.validateRequestParams = (req, params) => {
    return new Promise((resolve, reject) => {
        if (!req.params == null) {
            return reject(new paramsValidationError_1.ParamsValidationError('Request params is not setted'));
        }
        params.forEach((param) => {
            if (req.params[param] == null) {
                return reject(new paramsValidationError_1.ParamsValidationError('Some required request params is not setted'));
            }
        });
        return resolve();
    });
};
