"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.checkEnvVars = exports.envVars = void 0;
const systemError_1 = require("./../errors/systemError");
exports.envVars = {
    NODE_ENV: process.env.NODE_ENV,
    APP_PORT: process.env.APP_PORT,
    SECRET_KEY: process.env.SECRET_KEY,
    dbUri: process.env.DB_URI,
    isProduction: process.env.NODE_ENV === 'production',
    isDevelopment: process.env.NODE_ENV === 'development',
};
exports.checkEnvVars = () => {
    for (const key in exports.envVars) {
        if (key === null) {
            throw new systemError_1.SystemError();
        }
        if (exports.envVars[key] === undefined) {
            throw new systemError_1.SystemError(`${key} is not set. ${key} should be passed as the environment variable.`);
        }
    }
};
