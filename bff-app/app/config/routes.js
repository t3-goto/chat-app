"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.setRoutes = exports.path = void 0;
const tslib_1 = require("tslib");
const comments = tslib_1.__importStar(require("./../controllers/api/v1/comments/comments-controller"));
const sessions = tslib_1.__importStar(require("./../controllers/api/v1/sessions/sessions-controller"));
const users = tslib_1.__importStar(require("./../controllers/api/v1/users/users-controller"));
const auth_middleware_1 = require("./../middlewares/auth-middleware");
exports.path = {
    v1: {
        users: '/api/v1/users',
        usersId: '/api/v1/users/:id',
        sessions: '/api/v1/sessions',
        comments: '/api/v1/comments',
        commentsId: '/api/v1/comments/:id',
    },
};
const setUsersRoutes = (app) => {
    app.post(exports.path.v1.users, users.addUser);
    app.get(exports.path.v1.users, auth_middleware_1.setAuthMiddleware, users.getUsers);
    app.get(exports.path.v1.usersId, auth_middleware_1.setAuthMiddleware, users.getUser);
    app.put(exports.path.v1.usersId, auth_middleware_1.setAuthMiddleware, users.updateUser);
    app.delete(exports.path.v1.usersId, auth_middleware_1.setAuthMiddleware, users.deleteUser);
};
const setSessionsRoutes = (app) => {
    app.post(exports.path.v1.sessions, sessions.createSession);
};
const setCommentsRoutes = (app) => {
    app.post(exports.path.v1.comments, auth_middleware_1.setAuthMiddleware, comments.addComment);
    app.get(exports.path.v1.comments, auth_middleware_1.setAuthMiddleware, comments.getComments);
    app.get(exports.path.v1.commentsId, auth_middleware_1.setAuthMiddleware, comments.getComment);
    app.put(exports.path.v1.commentsId, auth_middleware_1.setAuthMiddleware, comments.updateComment);
    app.delete(exports.path.v1.commentsId, auth_middleware_1.setAuthMiddleware, comments.deleteComment);
};
exports.setRoutes = (app) => {
    setUsersRoutes(app);
    setSessionsRoutes(app);
    setCommentsRoutes(app);
};
