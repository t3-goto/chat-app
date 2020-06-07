"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.app = void 0;
const tslib_1 = require("tslib");
const express_1 = tslib_1.__importDefault(require("express"));
const database = tslib_1.__importStar(require("./config/database"));
const env_1 = require("./config/env");
const routes = tslib_1.__importStar(require("./config/routes"));
const logger = tslib_1.__importStar(require("./helpers/logger"));
const error_handler_middleware_1 = require("./middlewares/error-handler-middleware");
const request_middleware_1 = require("./middlewares/request-middleware");
const response_middleware_1 = require("./middlewares/response-middleware");
const setMiddlewares = (app) => {
    request_middleware_1.setRequestMiddlewares(app);
    response_middleware_1.setResponseMiddlewares(app);
};
const setRoutes = (app) => {
    routes.setRoutes(app);
};
const setDatabase = () => {
    database.setDatabase();
};
const listen = (app) => {
    env_1.checkEnvVars();
    setDatabase();
    setMiddlewares(app);
    setRoutes(app);
    error_handler_middleware_1.setErrorHandlerMiddleware(app);
    if (!module.parent) {
        app.listen(env_1.envVars.APP_PORT, () => {
            logger.infoLog(`Node process is running at port : ${env_1.envVars.APP_PORT}`);
        });
    }
};
exports.app = express_1.default();
listen(exports.app);
