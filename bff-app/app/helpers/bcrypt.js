"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.genHash = exports.comparePlainWithHash = void 0;
const tslib_1 = require("tslib");
const bcrypt_1 = tslib_1.__importDefault(require("bcrypt"));
const systemError_1 = require("./../errors/systemError");
exports.comparePlainWithHash = (plainText, encryptedText) => {
    try {
        return bcrypt_1.default.compareSync(plainText, encryptedText);
    }
    catch (e) {
        throw new systemError_1.SystemError();
    }
};
exports.genHash = (plainText, saltRounds = 10) => {
    try {
        const salt = bcrypt_1.default.genSaltSync(saltRounds);
        return bcrypt_1.default.hashSync(plainText, salt);
    }
    catch (e) {
        throw new systemError_1.SystemError();
    }
};
