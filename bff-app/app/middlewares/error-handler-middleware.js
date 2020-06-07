"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.setErrorHandlerMiddleware = void 0;
const tslib_1 = require("tslib");
const http_errors_1 = tslib_1.__importDefault(require("http-errors"));
const env_1 = require("./../config/env");
const logger = tslib_1.__importStar(require("./../helpers/logger"));
const response_1 = require("./../helpers/response");
const setDefaultHander = (app) => {
    app.use((req, res, next) => {
        next(http_errors_1.default(404));
    });
};
const setErrorHandler = (app) => {
    app.use((err, req, res, next) => {
        if (!env_1.envVars.isProduction) {
            logger.infoLog(err.message);
        }
        return response_1.sendResponse(res, err.status || 500, new response_1.Response({
            error: { code: 'CMN0000001', message: 'Your request is incorrect' },
        }));
    });
};
exports.setErrorHandlerMiddleware = (app) => {
    setDefaultHander(app);
    setErrorHandler(app);
};
