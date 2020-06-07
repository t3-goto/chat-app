"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CommentDbDao = exports.Comment = void 0;
const tslib_1 = require("tslib");
const mongoose_1 = tslib_1.__importDefault(require("mongoose"));
const databaseError_1 = require("./../errors/databaseError");
const recordNotFoundError_1 = require("./../errors/recordNotFoundError");
const CommentSchema = new mongoose_1.default.Schema({
    content: {
        type: String,
        required: true,
    },
    regDatetime: {
        type: Number,
        required: true,
    },
    modDatetime: {
        type: Number,
        required: true,
    },
    user: {
        fullName: { type: String, required: true },
        initial: { type: String, required: true },
        userId: { type: String, required: true },
    },
});
exports.Comment = mongoose_1.default.model('Comment', CommentSchema);
class CommentDbDao {
    static insert(comment) {
        return new Promise((resolve, reject) => {
            comment.save((err) => {
                if (err) {
                    return reject(new databaseError_1.DatabaseError('DBIN01: Some Database Error Occurs'));
                }
                return resolve(comment);
            });
        });
    }
    static selectAll() {
        return new Promise((resovle, reject) => {
            try {
                exports.Comment.find().then((comments) => {
                    return resovle(comments);
                });
            }
            catch (_a) {
                return reject(new databaseError_1.DatabaseError('DBSA01: Some Database Error Occurs'));
            }
        });
    }
    static selectById(commentId) {
        return new Promise((resovle, reject) => {
            try {
                exports.Comment.findById(commentId, (err, comment) => {
                    if (err) {
                        return reject(new recordNotFoundError_1.RecordNotFoundError('DBSB01: Target Comment Is Not Found'));
                    }
                    if (!comment) {
                        return reject(new recordNotFoundError_1.RecordNotFoundError('DBSB02: Target Comment Is Not Found'));
                    }
                    return resovle(comment);
                });
            }
            catch (_a) {
                return reject(new databaseError_1.DatabaseError('DBSB03: Some Database Error Occurs'));
            }
        });
    }
    static update(comment) {
        return new Promise((resolve, reject) => {
            comment.save((err) => {
                if (err) {
                    return reject(new databaseError_1.DatabaseError('DBUP01: Some Database Error Occurs'));
                }
                return resolve(comment);
            });
        });
    }
    static delete(comment) {
        return new Promise((resolve, reject) => {
            comment.remove((err) => {
                if (err) {
                    return reject(new databaseError_1.DatabaseError('DBDE01: Some Database Error Occurs'));
                }
                return resolve(comment);
            });
        });
    }
}
exports.CommentDbDao = CommentDbDao;
