"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteComment = exports.updateComment = exports.getComment = exports.getComments = exports.addComment = void 0;
const tslib_1 = require("tslib");
const databaseError_1 = require("./../../../../errors/databaseError");
const paramsValidationError_1 = require("./../../../../errors/paramsValidationError");
const recordNotFoundError_1 = require("./../../../../errors/recordNotFoundError");
const response_1 = require("./../../../../helpers/response");
const comment_1 = require("./../../../../models/comment");
const validate_1 = require("./../../../concerns/validate");
const comments_response_1 = require("./comments-response");
exports.addComment = (req, res) => tslib_1.__awaiter(void 0, void 0, void 0, function* () {
    try {
        yield validate_1.validateRequestBody(req, ['user', 'content']);
        const now = new Date().getTime();
        const comment = new comment_1.Comment({
            content: req.body.content,
            regDatetime: now,
            modDatetime: now,
            user: {
                userId: req.body.user._id,
                fullName: req.body.user.firstName + ' ' + req.body.user.lastName,
                initial: req.body.user.firstName[0].toUpperCase(),
            },
        });
        yield comment_1.CommentDbDao.insert(comment);
        const response = new comments_response_1.AddCommentResponse({ data: comment });
        return response_1.sendResponse(res, 201, response);
    }
    catch (e) {
        if (e instanceof paramsValidationError_1.ParamsValidationError) {
            const response = new comments_response_1.AddCommentResponse({
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
            const response = new comments_response_1.AddCommentResponse({
                error: {
                    code: 'COCOPO0002',
                    message: e.message !== null
                        ? e.message
                        : 'Some internal server error occurs',
                },
            });
            return response_1.sendResponse(res, 500, response);
        }
        else {
            const response = new comments_response_1.AddCommentResponse({
                error: {
                    code: 'COCOPO0003',
                    message: 'Some internal server error occurs',
                },
            });
            return response_1.sendResponse(res, 500, response);
        }
    }
});
exports.getComments = (req, res) => tslib_1.__awaiter(void 0, void 0, void 0, function* () {
    try {
        const comments = yield comment_1.CommentDbDao.selectAll();
        const response = new comments_response_1.GetCommentsResponse({
            data: comments,
        });
        return response_1.sendResponse(res, 200, response);
    }
    catch (e) {
        if (e instanceof databaseError_1.DatabaseError) {
            const response = new comments_response_1.GetCommentsResponse({
                error: {
                    code: 'COCOGE0001',
                    message: e.message !== null
                        ? e.message
                        : 'Some internal server error occurs',
                },
            });
            return response_1.sendResponse(res, 500, response);
        }
        {
            const response = new comments_response_1.GetCommentsResponse({
                error: {
                    code: 'COCOGE0002',
                    message: 'Some internal server error occurs',
                },
            });
            return response_1.sendResponse(res, 500, response);
        }
    }
});
exports.getComment = (req, res) => tslib_1.__awaiter(void 0, void 0, void 0, function* () {
    try {
        yield validate_1.validateRequestParams(req, ['id']);
        const commentId = req.params.id;
        const comment = yield comment_1.CommentDbDao.selectById(commentId);
        const response = new comments_response_1.GetCommentResponse({
            data: comment,
        });
        return response_1.sendResponse(res, 200, response);
    }
    catch (e) {
        if (e instanceof paramsValidationError_1.ParamsValidationError) {
            const response = new comments_response_1.GetCommentResponse({
                error: {
                    code: 'COCOGE1001',
                    message: e.message !== null
                        ? e.message
                        : 'Some request parameter is invalid',
                },
            });
            return response_1.sendResponse(res, 404, response);
        }
        if (e instanceof databaseError_1.DatabaseError) {
            const response = new comments_response_1.GetCommentResponse({
                error: {
                    code: 'COCOGE0002',
                    message: e.message !== null
                        ? e.message
                        : 'Some internal server error occurs',
                },
            });
            return response_1.sendResponse(res, 500, response);
        }
        else if (e instanceof recordNotFoundError_1.RecordNotFoundError) {
            const response = new comments_response_1.GetCommentResponse({
                error: {
                    code: 'COCOGE0003',
                    message: e.message !== null ? e.message : 'Target Comment Is Not Found',
                },
            });
            return response_1.sendResponse(res, 404, response);
        }
        else {
            const response = new comments_response_1.GetCommentResponse({
                error: {
                    code: 'COCOGE1004',
                    message: 'Some internal server error occurs',
                },
            });
            return response_1.sendResponse(res, 500, response);
        }
    }
});
exports.updateComment = (req, res) => tslib_1.__awaiter(void 0, void 0, void 0, function* () {
    try {
        yield validate_1.validateRequestParams(req, ['id']);
        yield validate_1.validateRequestBody(req, ['content']);
        const commentId = req.params.id;
        const comment = yield comment_1.CommentDbDao.selectById(commentId);
        const isModifiedObj = {
            content: false,
        };
        if (comment.content !== req.body.content) {
            isModifiedObj.content = true;
            comment.content = req.body.content;
        }
        let isModified = false;
        for (const isModifiedObjKey in isModifiedObj) {
            if (isModifiedObj[isModifiedObjKey]) {
                isModified = true;
                break;
            }
        }
        if (isModified) {
            comment.modDatetime = new Date().getTime();
            yield comment_1.CommentDbDao.update(comment);
            const response = new comments_response_1.UpdateCommentResponse({
                data: comment,
            });
            return response_1.sendResponse(res, 200, response);
        }
        {
            const response = new comments_response_1.UpdateCommentResponse({});
            return response_1.sendResponse(res, 304, response);
        }
    }
    catch (e) {
        if (e instanceof paramsValidationError_1.ParamsValidationError) {
            const response = new comments_response_1.UpdateCommentResponse({
                error: {
                    code: 'COCOPU0001',
                    message: e.message !== null
                        ? e.message
                        : 'Some request parameter is invalid',
                },
            });
            return response_1.sendResponse(res, 404, response);
        }
        if (e instanceof databaseError_1.DatabaseError) {
            const response = new comments_response_1.UpdateCommentResponse({
                error: {
                    code: 'COCOPU0002',
                    message: e.message !== null
                        ? e.message
                        : 'Some internal server error occurs',
                },
            });
            return response_1.sendResponse(res, 500, response);
        }
        else if (e instanceof recordNotFoundError_1.RecordNotFoundError) {
            const response = new comments_response_1.UpdateCommentResponse({
                error: {
                    code: 'COCOPU0003',
                    message: e.message !== null ? e.message : 'Target Comment Is Not Found',
                },
            });
            return response_1.sendResponse(res, 404, response);
        }
        else {
            const response = new comments_response_1.UpdateCommentResponse({
                error: {
                    code: 'COCOPU0004',
                    message: 'Some internal server error occurs',
                },
            });
            return response_1.sendResponse(res, 500, response);
        }
    }
});
exports.deleteComment = (req, res) => tslib_1.__awaiter(void 0, void 0, void 0, function* () {
    try {
        yield validate_1.validateRequestParams(req, ['id']);
        const commentId = req.params.id;
        const comment = yield comment_1.CommentDbDao.selectById(commentId);
        yield comment_1.CommentDbDao.delete(comment);
        const response = new comments_response_1.DeleteCommentResponse({});
        return response_1.sendResponse(res, 204, response);
    }
    catch (e) {
        if (e instanceof paramsValidationError_1.ParamsValidationError) {
            const response = new comments_response_1.DeleteCommentResponse({
                error: {
                    code: 'COCODE0001',
                    message: e.message !== null
                        ? e.message
                        : 'Some request parameter is invalid',
                },
            });
            return response_1.sendResponse(res, 404, response);
        }
        if (e instanceof databaseError_1.DatabaseError) {
            const response = new comments_response_1.DeleteCommentResponse({
                error: {
                    code: 'COCODE0002',
                    message: e.message !== null
                        ? e.message
                        : 'Some internal server error occurs',
                },
            });
            return response_1.sendResponse(res, 500, response);
        }
        else if (e instanceof recordNotFoundError_1.RecordNotFoundError) {
            const response = new comments_response_1.DeleteCommentResponse({
                error: {
                    code: 'COCODE0003',
                    message: e.message !== null ? e.message : 'Target Comment Is Not Found',
                },
            });
            return response_1.sendResponse(res, 404, response);
        }
        else {
            const response = new comments_response_1.DeleteCommentResponse({
                error: {
                    code: 'COCODE0004',
                    message: 'Some internal server error occurs',
                },
            });
            return response_1.sendResponse(res, 500, response);
        }
    }
});
