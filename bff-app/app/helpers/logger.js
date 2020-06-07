"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.infoLog = exports.errorLog = void 0;
const tslib_1 = require("tslib");
const winston_1 = tslib_1.__importDefault(require("winston"));
const env_1 = require("./../config/env");
const buildProdLogger = () => {
    return winston_1.default.createLogger({
        level: 'info',
        format: winston_1.default.format.json(),
        transports: [
            new winston_1.default.transports.File({ filename: 'error.log', level: 'error' }),
            new winston_1.default.transports.File({ filename: 'combined.log' }),
        ],
    });
};
const buildDevLogger = () => {
    return winston_1.default.createLogger({
        level: 'debug',
        format: winston_1.default.format.json(),
        transports: [
            new winston_1.default.transports.Console({
                format: winston_1.default.format.simple(),
            }),
        ],
    });
};
const logger = env_1.envVars.isProduction ? buildProdLogger() : buildDevLogger();
exports.errorLog = (logMsg) => {
    logger.error(logMsg);
};
exports.infoLog = (logMsg) => {
    logger.info(logMsg);
};
