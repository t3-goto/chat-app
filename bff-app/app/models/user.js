"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserDbDao = exports.User = void 0;
const tslib_1 = require("tslib");
const mongoose_1 = tslib_1.__importDefault(require("mongoose"));
const databaseError_1 = require("./../errors/databaseError");
const recordNotFoundError_1 = require("./../errors/recordNotFoundError");
const UserSchema = new mongoose_1.default.Schema({
    email: {
        type: String,
        required: true,
        unique: true,
    },
    password: {
        type: String,
        required: true,
    },
    firstName: {
        type: String,
    },
    lastName: {
        type: String,
    },
    provider: {
        type: String,
        required: true,
    },
    loginDate: {
        type: String,
    },
    reqDate: {
        type: String,
        required: true,
    },
    modDate: {
        type: String,
        required: true,
    },
});
exports.User = mongoose_1.default.model('User', UserSchema);
class UserDbDao {
    static insert(user) {
        return new Promise((resolve, reject) => {
            user.save((err) => {
                if (err) {
                    return reject(new databaseError_1.DatabaseError('DBIN01: Some Database Error Occurs'));
                }
                return resolve(user);
            });
        });
    }
    static selectAll() {
        return new Promise((resovle, reject) => {
            try {
                exports.User.find().then((users) => {
                    return resovle(users);
                });
            }
            catch (_a) {
                return reject(new databaseError_1.DatabaseError('DBSA01: Some Database Error Occurs'));
            }
        });
    }
    static selectById(userId) {
        return new Promise((resovle, reject) => {
            try {
                exports.User.findById(userId, (err, user) => {
                    if (err) {
                        return reject(new recordNotFoundError_1.RecordNotFoundError('DBSB01: Target User Is Not Found'));
                    }
                    if (!user) {
                        return reject(new recordNotFoundError_1.RecordNotFoundError('DBSB02: Target User Is Not Found'));
                    }
                    return resovle(user);
                });
            }
            catch (_a) {
                return reject(new databaseError_1.DatabaseError('DBSB03: Some Database Error Occurs'));
            }
        });
    }
    static selectByEmail(email) {
        return new Promise((resovle, reject) => {
            try {
                exports.User.findOne({ email }, (err, user) => {
                    if (err) {
                        return reject(new recordNotFoundError_1.RecordNotFoundError('DBSE01: Target User Is Not Found'));
                    }
                    if (!user) {
                        return reject(new recordNotFoundError_1.RecordNotFoundError('DBSE02: Target User Is Not Found'));
                    }
                    return resovle(user);
                });
            }
            catch (_a) {
                return reject(new databaseError_1.DatabaseError('DBSE03: Some Database Error Occurs'));
            }
        });
    }
    static update(user) {
        return new Promise((resolve, reject) => {
            user.save((err) => {
                if (err) {
                    return reject(new databaseError_1.DatabaseError('DBUP01: Some Database Error Occurs'));
                }
                return resolve(user);
            });
        });
    }
    static delete(user) {
        return new Promise((resolve, reject) => {
            user.remove((err) => {
                if (err) {
                    return reject(new databaseError_1.DatabaseError('DBDE01: Some Database Error Occurs'));
                }
                return resolve(user);
            });
        });
    }
}
exports.UserDbDao = UserDbDao;
