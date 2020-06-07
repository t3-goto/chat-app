"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.setDatabase = void 0;
const tslib_1 = require("tslib");
const mongoose_1 = tslib_1.__importDefault(require("mongoose"));
const env_1 = require("./../config/env");
const systemError_1 = require("./../errors/systemError");
const logger = tslib_1.__importStar(require("./../helpers/logger"));
const startDatabese = () => {
    try {
        if (env_1.envVars === undefined || env_1.envVars.dbUri === undefined) {
            throw new systemError_1.SystemError();
        }
        mongoose_1.default
            .connect(env_1.envVars.dbUri, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
            useCreateIndex: true,
        })
            .then(() => {
            logger.infoLog('Node process is connected to database');
        });
    }
    catch (err) {
        logger.errorLog('Node process can not connected to database');
        throw new systemError_1.SystemError();
    }
};
exports.setDatabase = () => {
    startDatabese();
};
